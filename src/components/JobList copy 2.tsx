// src/components/JobList.tsx - Updated for compact layout matching first screenshot
'use client'

import { useState, useEffect, useMemo, useRef, useCallback, memo } from 'react'
import { Job, Contact } from '@/lib/supabase'
import { fetchJobsWithContacts, deleteJob, JobWithContacts, clearJobsCache } from '@/lib/jobs'
import {
  Users, Plus, Search, Filter, Briefcase, MapPin, DollarSign, Edit, Trash2, X, User, MoreVertical, ChevronDown, ChevronRight, FileText
} from 'lucide-react'
import JobForm from './JobForm'
import JobContactManager from './JobContactManager'
import JobContactLinks from './JobContactLinks'

// Types
interface JobListState {
  jobs: JobWithContacts[]
  loading: boolean
  error: string | null
}

// Status configuration for tabs
const statusConfig = {
  all: { label: 'All Jobs', color: 'bg-blue-600 text-white', icon: '📋' },
  bookmarked: { label: 'Bookmarked', color: 'bg-slate-600 text-white', icon: '📌' },
  interested: { label: 'Interested', color: 'bg-slate-500 text-white', icon: '👀' },
  applied: { label: 'Applied', color: 'bg-blue-500 text-white', icon: '📤' },
  interviewing: { label: 'Interviewing', color: 'bg-blue-600 text-white', icon: '🎯' },
  onhold: { label: 'On Hold', color: 'bg-slate-400 text-white', icon: '⏸️' },
  offered: { label: 'Offered', color: 'bg-blue-500 text-white', icon: '🎉' },
  rejected: { label: 'Rejected', color: 'bg-slate-600 text-white', icon: '❌' },
  withdrawn: { label: 'Withdrawn', color: 'bg-slate-500 text-white', icon: '↩️' },
  noresponse: { label: 'No Response', color: 'bg-slate-500 text-white', icon: '🔇' }
}

// Memoized Contact Modal Component
const ContactModal = memo(({ contact, onClose }: { contact: Contact; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Contact Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <p className="font-medium">{contact.name}</p>
            <p className="text-sm text-gray-600">
              {contact.job_title && contact.company 
                ? `${contact.job_title} at ${contact.company}` 
                : contact.job_title || contact.company
              }
            </p>
          </div>
          {contact.email && (
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-gray-600">{contact.email}</p>
            </div>
          )}
          {contact.phone && (
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-gray-600">{contact.phone}</p>
            </div>
          )}
          {contact.notes && (
            <div>
              <p className="text-sm font-medium">Notes</p>
              <p className="text-sm text-gray-600">{contact.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

ContactModal.displayName = 'ContactModal'

// Memoized Job Table Row - Compact version
const JobTableRow = memo(({ 
  job, 
  onEdit, 
  onDelete, 
  onManageContacts, 
  onContactClick 
}: {
  job: JobWithContacts
  onEdit: (job: Job) => void
  onDelete: (jobId: string) => void
  onManageContacts: (job: Job) => void
  onContactClick: (contact: Contact) => void
}) => {
  return (
    <tr className="hover:bg-slate-50/50">
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        {job.job_title}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {job.company}
      </td>
      <td className="px-4 py-3">
        <span className={`status-badge status-${job.status?.toLowerCase()?.replace(/\s+/g, '-')}`}>
          {job.status?.replace('_', ' ')}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {job.location || '—'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {job.salary || '—'}
      </td>
      <td className="px-4 py-3 hidden lg:table-cell">
        <JobContactLinks 
          jobId={job.id}
          contacts={job.contacts || []}
          onContactClick={onContactClick}
        />
      </td>
      <td className="px-4 py-3 hidden xl:table-cell">
        <div className="max-w-xs truncate text-sm text-gray-500">
          {job.notes || '—'}
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end space-x-1">
          <button
            onClick={() => onManageContacts(job)}
            className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
            title="Manage contacts"
          >
            <Users className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(job)}
            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
            title="Edit job"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
            title="Delete job"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
})

JobTableRow.displayName = 'JobTableRow'

export default function JobList() {
  // State management
  const [state, setState] = useState<JobListState>({
    jobs: [],
    loading: true,
    error: null
  })
  
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showJobForm, setShowJobForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [showContactManager, setShowContactManager] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)

  // Memoized callbacks to prevent unnecessary re-renders
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleStatusFilterChange = useCallback((status: string) => {
    setStatusFilter(status)
  }, [])

  const handleEditJob = useCallback((job: Job) => {
    setSelectedJob(job)
    setShowJobForm(true)
  }, [])

  const handleDeleteJob = useCallback(async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job application?')) {
      return
    }

    try {
      const success = await deleteJob(jobId)
      
      if (success) {
        setState(prev => ({
          ...prev,
          jobs: prev.jobs.filter(job => job.id !== jobId)
        }))
      } else {
        setState(prev => ({
          ...prev,
          error: 'Failed to delete job'
        }))
      }
    } catch (error) {
      console.error('Error deleting job:', error)
      setState(prev => ({
        ...prev,
        error: 'Failed to delete job'
      }))
    }
  }, [])

  const handleManageContacts = useCallback((job: Job) => {
    setSelectedJob(job)
    setShowContactManager(true)
  }, [])

  const handleContactClick = useCallback((contact: Contact) => {
    setSelectedContact(contact)
  }, [])

  const handleCloseContactManager = useCallback(() => {
    setShowContactManager(false)
    setSelectedJob(null)
    // Reload data to get updated contacts
    loadJobs()
  }, [])

  const handleJobFormSubmit = useCallback((job: Job) => {
    if (selectedJob) {
      // Update existing job
      setState(prev => ({
        ...prev,
        jobs: prev.jobs.map(j => j.id === job.id ? { ...j, ...job, contacts: j.contacts } : j)
      }))
    } else {
      // Add new job (will be reloaded)
      loadJobs()
    }
    setShowJobForm(false)
    setSelectedJob(null)
  }, [selectedJob])

  // Simplified data loading function
  const loadJobs = useCallback(async () => {
    console.log('Loading jobs...')
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const jobsWithContacts = await fetchJobsWithContacts()
      console.log('Loaded jobs:', jobsWithContacts.length)
      
      setState(prev => ({
        ...prev,
        jobs: jobsWithContacts,
        loading: false,
        error: null
      }))
    } catch (error) {
      console.error('Error loading jobs:', error)
      setState(prev => ({
        ...prev,
        error: 'Failed to load jobs. Please try refreshing the page.',
        loading: false
      }))
    }
  }, [])

  // Load data on component mount
  useEffect(() => {
    loadJobs()
  }, [loadJobs])

  // Memoized filtered jobs
  const filteredJobs = useMemo(() => {
    if (!state.jobs || !Array.isArray(state.jobs) || state.jobs.length === 0) {
      return []
    }
    
    const searchLower = searchTerm.toLowerCase().trim()
    
    return state.jobs.filter(job => {
      if (!job) return false
      
      // Search filter
      const matchesSearch = !searchLower || (
        job.company?.toLowerCase().includes(searchLower) ||
        job.job_title?.toLowerCase().includes(searchLower) ||
        job.notes?.toLowerCase().includes(searchLower) ||
        job.location?.toLowerCase().includes(searchLower)
      )
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [state.jobs, searchTerm, statusFilter])

  // Memoized status counts
  const statusCounts = useMemo(() => {
    if (!state.jobs || !Array.isArray(state.jobs)) return {}
    
    const counts: Record<string, number> = { all: state.jobs.length }
    state.jobs.forEach(job => {
      if (job && job.status) {
        counts[job.status] = (counts[job.status] || 0) + 1
      }
    })
    return counts
  }, [state.jobs])

  // ESC key handling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showJobForm) {
          setShowJobForm(false)
          setSelectedJob(null)
        }
        if (selectedContact) {
          setSelectedContact(null)
        }
        if (showContactManager) {
          setShowContactManager(false)
          setSelectedJob(null)
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showJobForm, selectedContact, showContactManager])

  // Loading state
  if (state.loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Job Pipeline</h1>
          </div>
        </div>
        <div className="glass rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading jobs...</p>
        </div>
      </div>
    )
  }

  // Error state with retry option
  if (state.error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Job Pipeline</h1>
          </div>
        </div>
        <div className="glass rounded-xl p-8 text-center">
          <p className="text-red-500 mb-4">{state.error}</p>
          <div className="space-x-4">
            <button 
              onClick={loadJobs}
              className="btn-primary"
            >
              Retry
            </button>
            <button 
              onClick={() => {
                clearJobsCache()
                loadJobs()
              }}
              className="btn-secondary"
            >
              Clear Cache & Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with inline search and Add Job button */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Briefcase className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Job Pipeline</h1>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {filteredJobs.length} applications
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs by company, title, or notes..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="input pl-10 w-80"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <button
            onClick={() => setShowJobForm(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Job
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = statusCounts[status] || 0
          if (status !== 'all' && count === 0) return null
          
          const isActive = statusFilter === status
          const displayCount = status === 'all' ? statusCounts.all || 0 : count
          
          return (
            <button
              key={status}
              onClick={() => handleStatusFilterChange(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? config.color
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {config.label} {displayCount}
            </button>
          )
        })}
      </div>

      {/* Jobs Table */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12 glass rounded-xl">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {state.jobs.length === 0 ? 'No jobs yet' : 'No matching jobs'}
          </h3>
          <p className="text-gray-500 mb-6">
            {state.jobs.length === 0 
              ? "Add your first job application to get started!" 
              : "Try adjusting your search terms or status filter."
            }
          </p>
          {state.jobs.length === 0 && (
            <button
              onClick={() => setShowJobForm(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Job
            </button>
          )}
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Contacts
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                    Notes
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <JobTableRow
                    key={job.id}
                    job={job}
                    onEdit={handleEditJob}
                    onDelete={handleDeleteJob}
                    onManageContacts={handleManageContacts}
                    onContactClick={handleContactClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {selectedContact && (
        <ContactModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}

      {/* Contact Manager Modal */}
      {showContactManager && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <JobContactManager
              jobId={selectedJob.id}
              onClose={handleCloseContactManager}
            />
          </div>
        </div>
      )}

      {/* Job Form Modal */}
      {showJobForm && (
        <div
          className="modal-overlay animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowJobForm(false)
              setSelectedJob(null)
            }
          }}
        >
          <div
            ref={modalRef}
            className="modal-container animate-scale-in"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-button"
              onClick={() => {
                setShowJobForm(false)
                setSelectedJob(null)
              }}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className="modal-content">
              <div className="modal-header">
                <h2 id="modal-title" className="modal-title">
                  {selectedJob ? 'Edit Job Application' : 'Add New Job Application'}
                </h2>
              </div>
              <div className="modal-body">
                <JobForm
                  job={selectedJob}
                  onJobAdded={handleJobFormSubmit}
                  onCancel={() => {
                    setShowJobForm(false)
                    setSelectedJob(null)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}