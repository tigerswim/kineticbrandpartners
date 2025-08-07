// src/components/JobContactLinks.tsx - Enhanced with clickable contact names
'use client'

import { useState, useEffect } from 'react'
import { Contact } from '@/lib/supabase'
import { getJobContacts } from '@/lib/jobContacts'
import { Users, User, ExternalLink } from 'lucide-react'

interface JobContactLinksProps {
  jobId: string
  compact?: boolean
  contactMap?: Map<string, Contact>
  onContactClick?: (contact: Contact) => void
}

export default function JobContactLinks({ 
  jobId, 
  compact = true, 
  contactMap,
  onContactClick 
}: JobContactLinksProps) {
  const [linkedContacts, setLinkedContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLinkedContacts()
  }, [jobId])

  const loadLinkedContacts = async () => {
    try {
      setLoading(true)
      const contacts = await getJobContacts(jobId)
      setLinkedContacts(contacts)
    } catch (error) {
      console.error('Error loading linked contacts:', error)
      setLinkedContacts([])
    } finally {
      setLoading(false)
    }
  }

  const handleContactClick = (e: React.MouseEvent, contact: Contact) => {
    e.stopPropagation()
    if (onContactClick) {
      onContactClick(contact)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-32"></div>
      </div>
    )
  }

  if (linkedContacts.length === 0) {
    return (
      <div className="flex items-center space-x-1 text-xs text-slate-500">
        <Users className="w-3 h-3" />
        <span>No linked contacts</span>
      </div>
    )
  }

  if (compact) {
    return (
      <div>
        <div className="flex items-center space-x-1 text-xs text-slate-500 mb-1">
          <Users className="w-3 h-3" />
          <span>Connected through:</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {linkedContacts.slice(0, 3).map((contact) => (
            <span
              key={contact.id}
              onClick={(e) => handleContactClick(e, contact)}
              className={`px-2 py-1 rounded-full text-xs transition-all duration-200 ${
                onContactClick
                  ? 'bg-green-100 text-green-700 border border-green-300 cursor-pointer hover:bg-green-200 hover:scale-105 font-medium'
                  : 'bg-green-100 text-green-700'
              }`}
              title={onContactClick ? 'Click to view contact details' : contact.name}
            >
              {contact.name}
              {onContactClick && (
                <ExternalLink className="w-3 h-3 inline ml-1" />
              )}
            </span>
          ))}
          {linkedContacts.length > 3 && (
            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
              +{linkedContacts.length - 3} more
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {linkedContacts.length > 0 ? (
        <div className="grid gap-2">
          {linkedContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={onContactClick ? (e) => handleContactClick(e, contact) : undefined}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                onContactClick
                  ? 'border-green-200 bg-green-50 cursor-pointer hover:bg-green-100 hover:border-green-300'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium truncate ${
                  onContactClick ? 'text-green-800 hover:text-green-900' : 'text-slate-800'
                }`}>
                  {contact.name}
                  {onContactClick && <ExternalLink className="w-3 h-3 inline ml-1" />}
                </h4>
                {contact.job_title && contact.company ? (
                  <p className="text-sm text-slate-600 truncate">
                    {contact.job_title} at {contact.company}
                  </p>
                ) : (
                  <p className="text-sm text-slate-600 truncate">
                    {contact.job_title || contact.company || contact.email || 'Contact'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
          <Users className="w-8 h-8 mx-auto mb-2 text-slate-400" />
          <p className="text-sm">No contacts linked to this job yet</p>
        </div>
      )}
    </div>
  )
}