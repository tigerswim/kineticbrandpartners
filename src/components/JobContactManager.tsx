// src/components/JobContactManager.tsx
'use client'

import { useState, useEffect } from 'react'
import { Contact } from '@/lib/supabase'
import { getContacts } from '@/lib/contacts'
import { getJobContacts, linkJobToContact, unlinkJobFromContact } from '@/lib/jobContacts'
import { X, Plus, Users } from 'lucide-react'

interface JobContactManagerProps {
  jobId: string
  onClose: () => void
}

export default function JobContactManager({ jobId, onClose }: JobContactManagerProps) {
  const [allContacts, setAllContacts] = useState<Contact[]>([])
  const [linkedContacts, setLinkedContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [linking, setLinking] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [jobId])

  const loadData = async () => {
    setLoading(true)
    const [contacts, jobContacts] = await Promise.all([
      getContacts(),
      getJobContacts(jobId)
    ])
    setAllContacts(contacts)
    setLinkedContacts(jobContacts as Contact[])
    setLoading(false)
  }

  const handleLinkContact = async (contactId: string) => {
    setLinking(contactId)
    const result = await linkJobToContact(jobId, contactId)
    if (result) {
      loadData()
    }
    setLinking(null)
  }

  const handleUnlinkContact = async (contactId: string) => {
    const success = await unlinkJobFromContact(jobId, contactId)
    if (success) {
      loadData()
    }
  }

  const availableContacts = allContacts.filter(
    contact => !linkedContacts.some(linked => linked.id === contact.id)
  )

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div>Loading contacts...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5" />
            Manage Job Contacts
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Linked Contacts */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Linked Contacts ({linkedContacts.length})</h4>
          {linkedContacts.length === 0 ? (
            <p className="text-gray-500 text-sm">No contacts linked to this job yet.</p>
          ) : (
            <div className="space-y-2">
              {linkedContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-gray-600">
                      {contact.job_title && contact.company && `${contact.job_title} at ${contact.company}`}
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnlinkContact(contact.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Contacts */}
        <div>
          <h4 className="font-medium mb-2">Available Contacts ({availableContacts.length})</h4>
          {availableContacts.length === 0 ? (
            <p className="text-gray-500 text-sm">All contacts are already linked or no contacts exist.</p>
          ) : (
            <div className="space-y-2">
              {availableContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-gray-600">
                      {contact.job_title && contact.company && `${contact.job_title} at ${contact.company}`}
                    </div>
                  </div>
                  <button
                    onClick={() => handleLinkContact(contact.id)}
                    disabled={linking === contact.id}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                    {linking === contact.id ? 'Linking...' : 'Link'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
