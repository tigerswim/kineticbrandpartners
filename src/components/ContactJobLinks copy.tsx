// src/components/ContactJobLinks.tsx
'use client'

import { useState, useEffect } from 'react'
import { Job } from '@/lib/supabase'
import { getContactJobs, unlinkJobFromContact } from '@/lib/jobContacts'
import { X } from 'lucide-react'

interface ContactJobLinksProps {
  contactId: string
  compact?: boolean
  allowRemove?: boolean
  onLinksChanged?: () => void
}

export default function ContactJobLinks({ 
  contactId, 
  compact = false, 
  allowRemove = false, 
  onLinksChanged 
}: ContactJobLinksProps) {
  const [linkedJobs, setLinkedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState<string | null>(null)

  useEffect(() => {
    loadLinkedJobs()
  }, [contactId])

  const loadLinkedJobs = async () => {
    setLoading(true)
    const jobs = await getContactJobs(contactId)
    setLinkedJobs(jobs as Job[])
    setLoading(false)
  }

  const handleRemoveJob = async (jobId: string) => {
    if (!confirm('Remove this job association?')) return
    
    setRemoving(jobId)
    const success = await unlinkJobFromContact(jobId, contactId)
    if (success) {
      loadLinkedJobs()
      onLinksChanged?.()
    }
    setRemoving(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interested': return 'bg-gray-100 text-gray-800'
      case 'applied': return 'bg-blue-100 text-blue-800'
      case 'interviewing': return 'bg-yellow-100 text-yellow-800'
      case 'onhold': return 'bg-orange-100 text-orange-800'
      case 'offered': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <div className="text-sm text-gray-500">Loading jobs...</div>
  }

  if (linkedJobs.length === 0) {
    return compact ? null : (
      <div className="text-sm text-gray-500">No jobs linked</div>
    )
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-1">
        {linkedJobs.map((job) => (
          <span
            key={job.id}
            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(job.status)}`}
            title={`${job.job_title} at ${job.company}`}
          >
            {job.company}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-sm">Linked Jobs ({linkedJobs.length})</h4>
      {linkedJobs.map((job) => (
        <div
          key={job.id}
          className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
        >
          <div className="flex-1">
            <div className="font-medium text-sm">{job.job_title}</div>
            <div className="text-sm text-gray-600">{job.company}</div>
            <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${getStatusColor(job.status)}`}>
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>
          {allowRemove && (
            <button
              onClick={() => handleRemoveJob(job.id)}
              disabled={removing === job.id}
              className="text-red-600 hover:text-red-800 p-1"
              title="Remove job association"
            >
              {removing === job.id ? (
                <div className="w-4 h-4 animate-spin border-2 border-red-600 border-t-transparent rounded-full" />
              ) : (
                <X size={16} />
              )}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
