// src/components/JobContactManager.tsx - Enhanced with comprehensive error handling

'use client'

import { useState, useEffect } from 'react'
import { Contact } from '@/lib/supabase'
import { getContacts } from '@/lib/contacts'
import { getJobContacts, linkJobToContact, unlinkJobFromContact } from '@/lib/jobContacts'
import { X, Plus, Users, AlertCircle, RefreshCw } from 'lucide-react'

interface JobContactManagerProps {
  jobId: string
  onClose: () => void
}

export default function JobContactManager({ jobId, onClose }: JobContactManagerProps) {
  const [allContacts, setAllContacts] = useState<Contact[]>([])
  const [linkedContacts, setLinkedContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [linking, setLinking] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [jobId])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!jobId) {
        throw new Error('Job ID is required')
      }

      console.log('Loading data for job:', jobId)

      const [contacts, jobContacts] = await Promise.all([
        getContacts(),
        getJobContacts(jobId)
      ])

      console.log('Loaded contacts:', contacts?.length || 0)
      console.log('Loaded job contacts:', jobContacts?.length || 0)

      setAllContacts(contacts || [])
      setLinkedContacts((jobContacts as Contact[]) || [])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error('Error in JobContactManager loadData:', {
        error: errorMessage,
        jobId,
        timestamp: new Date().toISOString(),
        stack: error instanceof Error ? error.stack : undefined
      })
      setError(`Failed to load contact data: ${errorMessage}`)
      setAllContacts([])
      setLinkedContacts([])
    } finally {
      setLoading(false)
    }
  }

  const handleLinkContact = async (contactId: string) => {
    try {
      setLinking(contactId)
      setError(null)

      if (!jobId || !contactId) {
        throw new Error('Job ID and Contact ID are required')
      }

      const result = await linkJobToContact(jobId, contactId)
      if (!result) {
        throw new Error('Failed to link contact to job')
      }

      console.log('Successfully linked contact:', contactId, 'to job:', jobId)
      await loadData() // Reload data to reflect changes
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error('Error linking contact:', {
        error: errorMessage,
        jobId,
        contactId,
        timestamp: new Date().toISOString()
      })
      setError(`Failed to link contact: ${errorMessage}`)
    } finally {
      setLinking(null)
    }
  }

  const handleUnlinkContact = async (contactId: string) => {
    try {
      setError(null)

      if (!jobId || !contactId) {
        throw new Error('Job ID and Contact ID are required')
      }

      const success = await unlinkJobFromContact(jobId, contactId)
      if (!success) {
        throw new Error('Failed to unlink contact from job')
      }

      console.log('Successfully unlinked contact:', contactId, 'from job:', jobId)
      await loadData() // Reload data to reflect changes
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error('Error unlinking contact:', {
        error: errorMessage,
        jobId,
        contactId,
        timestamp: new Date().toISOString()
      })
      setError(`Failed to unlink contact: ${errorMessage}`)
    }
  }

  const availableContacts = allContacts.filter(
    contact => !linkedContacts.some(linked => linked.id === contact.id)
  )

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-content">
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-500 mr-2" />
              <span>Loading contacts...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button
          onClick={onClose}
          className="modal-close-button"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="modal-content">
          <h2 className="text-xl font-semibold mb-4">Manage Job Contacts</h2>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Error:</span>
              </div>
              <p className="mt-1 text-sm">{error}</p>
              <button
                onClick={loadData}
                className="mt-2 text-sm underline hover:no-underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Linked Contacts */}
          <div className="mb-6">
            <h3 className="font-medium text-slate-700 mb-3">
              Linked Contacts ({linkedContacts.length})
            </h3>
            
            {linkedContacts.length === 0 ? (
              <div className="text-center py-4 text-slate-500 bg-slate-50 rounded-lg">
                <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm">No contacts linked to this job yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {linkedContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-slate-900">{contact.name}</div>
                      <div className="text-sm text-slate-600">
                        {contact.job_title && contact.company && 
                          `${contact.job_title} at ${contact.company}`
                        }
                      </div>
                    </div>
                    <button
                      onClick={() => handleUnlinkContact(contact.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1 rounded hover:bg-red-50"
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
            <h3 className="font-medium text-slate-700 mb-3">
              Available Contacts ({availableContacts.length})
            </h3>
            
            {availableContacts.length === 0 ? (
              <div className="text-center py-4 text-slate-500 bg-slate-50 rounded-lg">
                <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm">All contacts are already linked or no contacts exist.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {availableContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-slate-900">{contact.name}</div>
                      <div className="text-sm text-slate-600">
                        {contact.job_title && contact.company && 
                          `${contact.job_title} at ${contact.company}`
                        }
                      </div>
                    </div>
                    <button
                      onClick={() => handleLinkContact(contact.id)}
                      disabled={linking === contact.id}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {linking === contact.id ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Linking...
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          Link
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
