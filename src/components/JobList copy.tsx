// src/components/JobList.tsx - Enhanced with table/list view for data density
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Job, Contact } from '@/lib/supabase'
import { fetchJobs, deleteJob } from '@/lib/jobs'
import { getContacts } from '@/lib/contacts'
import { getJobContacts } from '@/lib/jobContacts'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Briefcase, 
  MapPin, 
  DollarSign,
  Edit,
  Trash2,
  X,
  User,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  FileText
} from 'lucide-react'
import JobForm from './JobForm'
import JobFilter from './JobFilter'
import JobStatusFilter from './JobStatusFilter'
import JobContactManager from './JobContactManager'
import JobContactLinks from './JobContactLinks'

// Contact Modal Component
interface ContactModalProps {
  contact: Contact
  onClose: () => void
}

function ContactModal({ contact, onClose }: ContactModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{contact.name}</h2>
                <p className="text-blue-100 text-sm">Contact Details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="space-y-6">
            {/* Current Role */}
            {(contact.job_title || contact.company) && (
              <div>
                <h3 className="text-slate-700 font-semibold mb-2">Current Role</h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="font-medium">
                    {contact.job_title && contact.company 
                      ? `${contact.job_title} at ${contact.company}`
                      : contact.job_title || contact.company
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div>
              <h3 className="text-slate-700 font-semibold mb-2">Contact Information</h3>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                {contact.email && (
                  <div className="text-sm">
                    <span className="font-medium">Email: </span>{contact.email}
                  </div>
                )}
                {contact.phone && (
                  <div className="text-sm">
                    <span className="font-medium">Phone: </span>{contact.phone}
                  </div>
                )}
                {contact.linkedin_url && (
                  <div className="text-sm">
                    <span className="font-medium">LinkedIn: </span>
                    <a 
                      href={contact.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Mutual Connections */}
            {contact.mutual_connections && contact.mutual_connections.length > 0 && (
              <div>
                <h3 className="text-slate-700 font-semibold mb-2">Mutual Connections</h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {contact.mutual_connections.map((connection, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {connection}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {contact.notes && (
              <div>
                <h3 className="text-slate-700 font-semibold mb-2">Notes</h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{contact.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Contacts Count Badge Component
interface ContactsBadgeProps {
  jobId: string
  onManageContacts: () => void
  onShowContacts: (contacts: Contact[]) => void
}

function ContactsBadge({ jobId, onManageContacts, onShowContacts }: ContactsBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [jobContacts, setJobContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    loadJobContacts()
  }, [jobId])

  const loadJobContacts = async () => {
    try {
      setLoading(true)
      const contacts = await getJobContacts(jobId)
      setJobContacts(contacts)
    } catch (error) {
      console.error('Error loading job contacts:', error)
      setJobContacts([])
    } finally {
      setLoading(false)
    }
  }

  const count = jobContacts.length

  const handleBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (count > 0) {
      setShowDropdown(!showDropdown)
    } else {
      onManageContacts()
    }
  }

  if (loading) {
    return (
      <div className="inline-flex items-center space-x-1 px-2 py-1 bg-slate-100 rounded-full text-xs animate-pulse">
        <Users className="w-3 h-3 text-slate-400" />
        <div className="w-2 h-3 bg-slate-300 rounded"></div>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={handleBadgeClick}
        onMouseEnter={() => !showDropdown && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
          count === 0 
            ? 'text-slate-400 hover:text-blue-600 hover:bg-blue-50' 
            : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
        }`}
      >
        <Users className="w-3 h-3" />
        <span>{count}</span>
      </button>
      
      {/* Tooltip for quick preview */}
      {showTooltip && count > 0 && !showDropdown && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap z-10">
          Click to see {count} contact{count !== 1 ? 's' : ''}
        </div>
      )}

      {/* Contact list dropdown */}
      {showDropdown && count > 0 && (
        <>
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute left-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-30 min-w-[240px] max-w-[300px]">
            <div className="px-3 py-1 text-xs font-semibold text-slate-600 border-b border-slate-100 mb-1">
              Contacts ({count})
            </div>
            <div className="max-h-48 overflow-y-auto">
              {jobContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => {
                    onShowContacts([contact])
                    setShowDropdown(false)
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 truncate">{contact.name}</div>
                      {(contact.job_title || contact.company) && (
                        <div className="text-xs text-slate-500 truncate">
                          {contact.job_title && contact.company 
                            ? `${contact.job_title} at ${contact.company}`
                            : contact.job_title || contact.company
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="border-t border-slate-100 mt-1 pt-1">
              <button
                onClick={() => {
                  onManageContacts()
                  setShowDropdown(false)
                }}
                className="w-full px-3 py-2 text-left text-xs text-blue-600 hover:bg-blue-50 transition-colors"
              >
                + Manage contacts
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Action Menu Component
interface ActionMenuProps {
  job: Job
  onEdit: () => void
  onDelete: () => void
  onManageContacts: () => void
}

function ActionMenu({ job, onEdit, onDelete, onManageContacts }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20 min-w-[140px]">
            <button
              onClick={() => {
                onManageContacts()
                setIsOpen(false)
              }}
              className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Contacts</span>
            </button>
            <button
              onClick={() => {
                onEdit()
                setIsOpen(false)
              }}
              className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => {
                onDelete()
                setIsOpen(false)
              }}
              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// Notes Cell Component
interface NotesCellProps {
  notes: string | null
}

function NotesCell({ notes }: NotesCellProps) {
  const [expanded, setExpanded] = useState(false)
  
  if (!notes) {
    return <span className="text-slate-400 text-sm">—</span>
  }

  const isLong = notes.length > 80
  const displayText = expanded || !isLong ? notes : notes.substring(0, 80) + '...'

  return (
    <div className="max-w-xs">
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-left text-sm text-slate-700 hover:text-slate-900"
      >
        <span>{displayText}</span>
        {isLong && (
          <span className="ml-1 text-blue-600 hover:text-blue-800">
            {expanded ? 'less' : 'more'}
          </span>
        )}
      </button>
    </div>
  )
}

// Mobile Card Component (for responsive collapse)
interface MobileJobCardProps {
  job: Job
  contactMap: Map<string, Contact>
  onEdit: (job: Job) => void
  onDelete: (id: string) => void
  onManageContacts: (jobId: string) => void
  onContactClick: (contact: Contact) => void
  index: number
}

function MobileJobCard({ job, contactMap, onEdit, onDelete, onManageContacts, onContactClick, index }: MobileJobCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'interested': 
        return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' }
      case 'applied': 
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' }
      case 'interviewing': 
        return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', dot: 'bg-blue-600' }
      case 'onhold': 
        return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300', dot: 'bg-slate-500' }
      case 'offered': 
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' }
      case 'rejected': 
        return { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200', dot: 'bg-slate-400' }
      default: 
        return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' }
    }
  }

  const statusConfig = getStatusConfig(job.status)

  return (
    <div 
      className="card p-4 animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 truncate">{job.job_title}</h3>
          <p className="text-slate-600 truncate">{job.company}</p>
        </div>
        <ActionMenu
          job={job}
          onEdit={() => onEdit(job)}
          onDelete={() => onDelete(job.id)}
          onManageContacts={() => onManageContacts(job.id)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-2 px-2 py-1 rounded-lg border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
            <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
            <span className="text-xs font-medium capitalize">{job.status.replace('_', ' ')}</span>
          </div>
          <ContactsBadge 
            jobId={job.id} 
            contactMap={contactMap}
            onManageContacts={() => onManageContacts(job.id)}
          />
        </div>

        {(job.location || job.salary) && (
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            {job.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{job.location}</span>
              </div>
            )}
            {job.salary && (
              <div className="flex items-center space-x-1">
                <DollarSign className="w-3 h-3" />
                <span>{job.salary}</span>
              </div>
            )}
          </div>
        )}

        {job.notes && (
          <div className="pt-2 border-t border-slate-100">
            <NotesCell notes={job.notes} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [managingContactsForJob, setManagingContactsForJob] = useState<string | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [jobsData, contactsData] = await Promise.all([
        fetchJobs(),
        getContacts()
      ])
      setJobs(jobsData || [])
      setContacts(contactsData || [])
    } catch (error) {
      console.error('Error loading data:', error)
      setJobs([])
      setContacts([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        const success = await deleteJob(id)
        if (success) {
          loadData()
        }
      } catch (error) {
        console.error('Error deleting job:', error)
      }
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingJob(null)
  }

  const handleFormSaved = () => {
    loadData()
    setShowForm(false)
    setEditingJob(null)
  }

  const handleContactsUpdated = () => {
    loadData()
  }

  // Create contact lookup map for quick access
  const contactMap = useMemo(() => {
    const map = new Map<string, Contact>()
    contacts.forEach(contact => {
      map.set(contact.id, contact)
    })
    return map
  }, [contacts])

  // Filter jobs based on search term and selected status
  const filteredJobs = useMemo(() => {
    let filtered = jobs

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(job =>
        job.company.toLowerCase().includes(term) ||
        job.job_title.toLowerCase().includes(term) ||
        (job.notes && job.notes.toLowerCase().includes(term))
      )
    }

    if (selectedStatus) {
      filtered = filtered.filter(job => job.status === selectedStatus)
    }

    return filtered
  }, [jobs, searchTerm, selectedStatus])

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'interested': 
        return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' }
      case 'applied': 
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' }
      case 'interviewing': 
        return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', dot: 'bg-blue-600' }
      case 'onhold': 
        return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300', dot: 'bg-slate-500' }
      case 'offered': 
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' }
      case 'rejected': 
        return { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200', dot: 'bg-slate-400' }
      default: 
        return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' }
    }
  }

  if (loading) {
    return (
      <div className="space-y-4 animate-fade-in">
        {/* Desktop table skeleton */}
        <div className="hidden md:block">
          <div className="card">
            <div className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {['Job Title', 'Company', 'Status', 'Location', 'Salary', 'Contacts', 'Notes', ''].map((header) => (
                      <th key={header} className="px-4 py-3 text-left">
                        <div className="h-4 bg-slate-200 rounded w-20 animate-pulse"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      {[...Array(8)].map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Mobile card skeletons */}
        <div className="md:hidden space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-4">
              <div className="animate-pulse space-y-3">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-5 bg-slate-200 rounded w-40"></div>
                    <div className="h-4 bg-slate-200 rounded w-32"></div>
                  </div>
                  <div className="h-6 bg-slate-200 rounded w-6"></div>
                </div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        {/* Contact Modal */}
        {selectedContact && (
          <ContactModal
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
          />
        )}

        {/* Header with Add Button */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-800">Job Applications</h2>
            <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              {jobs.length} total
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Job</span>
          </button>
        </div>

        {/* Status Filter Pills */}
        <JobStatusFilter
          jobs={jobs}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        {/* Search Filter */}
        <JobFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Results Summary */}
        {(searchTerm || selectedStatus) && (
          <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-lg">
            <Filter className="w-4 h-4" />
            <span>
              Showing {filteredJobs.length} of {jobs.length} jobs
              {searchTerm && <span className="font-medium"> matching "{searchTerm}"</span>}
              {selectedStatus && <span className="font-medium"> with status "{selectedStatus}"</span>}
            </span>
            {(searchTerm || selectedStatus) && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedStatus(null)
                }}
                className="ml-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Empty State */}
        {filteredJobs.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">
              {jobs.length === 0 ? "No jobs yet" : "No matching jobs"}
            </h3>
            <p className="text-slate-500 mb-6">
              {jobs.length === 0
                ? "Add your first job application to get started!"
                : "Try adjusting your filters or search terms."
              }
            </p>
            {jobs.length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Job
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Company</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Job Title</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Salary</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Contacts</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Notes</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider w-12">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {filteredJobs.map((job, index) => {
                      const statusConfig = getStatusConfig(job.status)
                      return (
                        <tr 
                          key={job.id}
                          className="hover:bg-slate-50/50 transition-colors duration-150 animate-slide-up"
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          <td className="px-4 py-3">
                            <div className="text-medium text-slate-800">{job.company}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-slate-600">{job.job_title}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-lg border text-xs font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                              <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
                              <span className="capitalize">{job.status.replace('_', ' ')}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-slate-500">
                              {job.location ? (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{job.location}</span>
                                </div>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-slate-600">
                              {job.salary ? (
                                <div className="flex items-center space-x-1">
                                  <DollarSign className="w-3 h-3" />
                                  <span className="font-medium">{job.salary}</span>
                                </div>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                          <ContactsBadge 
                            jobId={job.id} 
                            onManageContacts={() => setManagingContactsForJob(job.id)}
                            onShowContacts={(contacts) => setSelectedContact(contacts[0])}
                          />
                          </td>
                          <td className="px-4 py-3">
                            <NotesCell notes={job.notes} />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <ActionMenu
                              job={job}
                              onEdit={() => {
                                setEditingJob(job)
                                setShowForm(true)
                              }}
                              onDelete={() => handleDelete(job.id)}
                              onManageContacts={() => setManagingContactsForJob(job.id)}
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredJobs.map((job, index) => (
                <MobileJobCard
                  key={job.id}
                  job={job}
                  contactMap={contactMap}
                  onEdit={(job) => {
                    setEditingJob(job)
                    setShowForm(true)
                  }}
                  onDelete={handleDelete}
                  onManageContacts={setManagingContactsForJob}
                  onContactClick={setSelectedContact}
                  index={index}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* JobForm Modal */}
      <JobForm
        isOpen={showForm}
        onClose={handleFormClose}
        onSaved={handleFormSaved}
        editingJob={editingJob}
      />

      {/* Job Contacts Manager Modal */}
      {managingContactsForJob && (
        <JobContactManager
          jobId={managingContactsForJob}
          onClose={() => {
            setManagingContactsForJob(null)
            handleContactsUpdated()
          }}
        />
      )}
    </>
  )
}