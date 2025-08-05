// src/components/JobContactLinks.tsx
'use client'

import { useState, useEffect } from 'react'
import { Contact } from '@/lib/supabase'
import { getJobContacts } from '@/lib/jobContacts'
import { Users } from 'lucide-react'

interface JobContactLinksProps {
  jobId: string
  compact?: boolean
}

export default function JobContactLinks({ jobId, compact = false }: JobContactLinksProps) {
  const [linkedContacts, setLinkedContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLinkedContacts()
  }, [jobId])

  const loadLinkedContacts = async () => {
    setLoading(true)
    const contacts = await getJobContacts(jobId)
    setLinkedContacts(contacts as Contact[])
    setLoading(false)
  }

  if (loading) {
    return <div className="text-sm text-gray-500">Loading contacts...</div>
  }

  if (linkedContacts.length === 0) {
    return compact ? null : (
      <div className="text-sm text-gray-500 flex items-center gap-1">
        <Users size={14} />
        No contacts linked
      </div>
    )
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1 text-blue-600">
          <Users size={14} />
          <span className="font-medium">Contacts:</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {linkedContacts.map((contact, index) => (
            <span key={contact.id} className="text-gray-700">
              {contact.name}
              {index < linkedContacts.length - 1 && ','}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-sm flex items-center gap-1">
        <Users size={16} />
        Linked Contacts ({linkedContacts.length})
      </h4>
      {linkedContacts.map((contact) => (
        <div
          key={contact.id}
          className="p-2 bg-gray-50 rounded-md"
        >
          <div className="font-medium text-sm">{contact.name}</div>
          {contact.job_title && contact.company && (
            <div className="text-sm text-gray-600">
              {contact.job_title} at {contact.company}
            </div>
          )}
          {contact.email && (
            <div className="text-xs text-gray-500">{contact.email}</div>
          )}
        </div>
      ))}
    </div>
  )
}
