// src/components/Reporting.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Contact, Interaction } from '@/lib/supabase'
import { getContacts } from '@/lib/contacts'
import { getInteractions } from '@/lib/interactions'
import { getContactJobs } from '@/lib/jobContacts'
import { 
  BarChart3, 
  Users, 
  MessageCircle, 
  Search, 
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Building,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  Video,
  Linkedin,
  User,
  Clock,
  Network
} from 'lucide-react'

interface ContactWithJobs extends Contact {
  linkedJobsCount?: number
  linkedJobs?: any[]
}

interface InteractionWithContact extends Interaction {
  contact?: Contact
}

type SortDirection = 'asc' | 'desc' | null
type ContactSortField = 'name' | 'company' | 'job_title' | 'mutual_connections_count' | 'linkedJobsCount'
type InteractionSortField = 'date' | 'contact_name' | 'type' | 'summary'

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
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="space-y-6">
            {/* Current Role */}
            {(contact.job_title || contact.company) && (
              <div>
                <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                  <Building className="w-4 h-4" />
                  <span>Current Role</span>
                </h3>
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
              <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                <Mail className="w-4 h-4" />
                <span>Contact Information</span>
              </h3>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                {contact.email && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {contact.linkedin_url && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Linkedin className="w-4 h-4 text-slate-400" />
                    <a 
                      href={contact.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Mutual Connections */}
            {contact.mutual_connections && contact.mutual_connections.length > 0 && (
              <div>
                <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                  <Network className="w-4 h-4" />
                  <span>Mutual Connections</span>
                </h3>
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
                <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Notes</span>
                </h3>
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

interface InteractionModalProps {
  interaction: InteractionWithContact
  onClose: () => void
}

function InteractionModal({ interaction, onClose }: InteractionModalProps) {
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail
      case 'phone': return Phone
      case 'video_call': return Video
      case 'linkedin': return Linkedin
      case 'meeting': return Calendar
      default: return MessageCircle
    }
  }

  const Icon = getInteractionIcon(interaction.type)

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Interaction Details</h2>
                <p className="text-green-100 text-sm">
                  {interaction.contact?.name} • {interaction.date}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Interaction Summary */}
            <div>
              <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                <MessageCircle className="w-4 h-4" />
                <span>Summary</span>
              </h3>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="font-medium text-slate-800">{interaction.summary}</p>
              </div>
            </div>

            {/* Interaction Details */}
            <div>
              <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                <Clock className="w-4 h-4" />
                <span>Details</span>
              </h3>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm capitalize">{interaction.type.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm">{new Date(interaction.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {interaction.notes && (
              <div>
                <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Notes</span>
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{interaction.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Reporting() {
  const [contacts, setContacts] = useState<ContactWithJobs[]>([])
  const [interactions, setInteractions] = useState<InteractionWithContact[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<'contacts' | 'interactions'>('contacts')
  
  // Search and filter states
  const [contactSearch, setContactSearch] = useState('')
  const [interactionSearch, setInteractionSearch] = useState('')
  
  // Sort states
  const [contactSort, setContactSort] = useState<{ field: ContactSortField; direction: SortDirection }>({ field: 'name', direction: 'asc' })
  const [interactionSort, setInteractionSort] = useState<{ field: InteractionSortField; direction: SortDirection }>({ field: 'date', direction: 'desc' })
  
  // Modal states
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [selectedInteraction, setSelectedInteraction] = useState<InteractionWithContact | null>(null)

  useEffect(() => {
    loadReportingData()
  }, [])

  const loadReportingData = async () => {
    setLoading(true)
    try {
      const [contactsData, interactionsData] = await Promise.all([
        getContacts(),
        getInteractions()
      ])

      // Enhance contacts with job information
      const enhancedContacts = await Promise.all(
        contactsData.map(async (contact) => {
          const linkedJobs = await getContactJobs(contact.id)
          return {
            ...contact,
            linkedJobs,
            linkedJobsCount: linkedJobs.length
          }
        })
      )

      // Enhance interactions with contact information
      const enhancedInteractions = interactionsData.map(interaction => {
        const contact = contactsData.find(c => c.id === interaction.contact_id)
        return {
          ...interaction,
          contact
        }
      })

      setContacts(enhancedContacts)
      setInteractions(enhancedInteractions)
    } catch (error) {
      console.error('Error loading reporting data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Contact filtering and sorting
  const filteredAndSortedContacts = useMemo(() => {
    let filtered = contacts

    if (contactSearch.trim()) {
      const search = contactSearch.toLowerCase()
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(search) ||
        (contact.company && contact.company.toLowerCase().includes(search)) ||
        (contact.job_title && contact.job_title.toLowerCase().includes(search)) ||
        (contact.mutual_connections && contact.mutual_connections.some(conn => 
          conn.toLowerCase().includes(search)
        ))
      )
    }

    // Sort contacts
    if (contactSort.field && contactSort.direction) {
      filtered.sort((a, b) => {
        let aValue: any
        let bValue: any

        switch (contactSort.field) {
          case 'name':
            aValue = a.name.toLowerCase()
            bValue = b.name.toLowerCase()
            break
          case 'company':
            aValue = (a.company || '').toLowerCase()
            bValue = (b.company || '').toLowerCase()
            break
          case 'job_title':
            aValue = (a.job_title || '').toLowerCase()
            bValue = (b.job_title || '').toLowerCase()
            break
          case 'mutual_connections_count':
            aValue = a.mutual_connections?.length || 0
            bValue = b.mutual_connections?.length || 0
            break
          case 'linkedJobsCount':
            aValue = a.linkedJobsCount || 0
            bValue = b.linkedJobsCount || 0
            break
          default:
            return 0
        }

        if (aValue < bValue) return contactSort.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return contactSort.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [contacts, contactSearch, contactSort])

  // Interaction filtering and sorting
  const filteredAndSortedInteractions = useMemo(() => {
    let filtered = interactions

    if (interactionSearch.trim()) {
      const search = interactionSearch.toLowerCase()
      filtered = filtered.filter(interaction =>
        (interaction.contact?.name || '').toLowerCase().includes(search) ||
        interaction.type.toLowerCase().includes(search) ||
        interaction.summary.toLowerCase().includes(search) ||
        (interaction.notes && interaction.notes.toLowerCase().includes(search))
      )
    }

    // Sort interactions
    if (interactionSort.field && interactionSort.direction) {
      filtered.sort((a, b) => {
        let aValue: any
        let bValue: any

        switch (interactionSort.field) {
          case 'date':
            aValue = new Date(a.date)
            bValue = new Date(b.date)
            break
          case 'contact_name':
            aValue = (a.contact?.name || '').toLowerCase()
            bValue = (b.contact?.name || '').toLowerCase()
            break
          case 'type':
            aValue = a.type.toLowerCase()
            bValue = b.type.toLowerCase()
            break
          case 'summary':
            aValue = a.summary.toLowerCase()
            bValue = b.summary.toLowerCase()
            break
          default:
            return 0
        }

        if (aValue < bValue) return interactionSort.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return interactionSort.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [interactions, interactionSearch, interactionSort])

  const handleContactSort = (field: ContactSortField) => {
    setContactSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleInteractionSort = (field: InteractionSortField) => {
    setInteractionSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const getSortIcon = (field: string, currentSort: { field: string; direction: SortDirection }) => {
    if (currentSort.field !== field) return <ArrowUpDown className="w-4 h-4" />
    return currentSort.direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />
      case 'phone': return <Phone className="w-4 h-4" />
      case 'video_call': return <Video className="w-4 h-4" />
      case 'linkedin': return <Linkedin className="w-4 h-4" />
      case 'meeting': return <Calendar className="w-4 h-4" />
      default: return <MessageCircle className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-8 bg-slate-200 rounded-full"></div>
          <div className="h-8 bg-slate-200 rounded w-32"></div>
        </div>
        <div className="card p-8 text-center">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-slate-600">Loading reporting data...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Reports & Analytics</h2>
        </div>

        {/* Section Navigation */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-2 border border-slate-200/60 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveSection('contacts')}
              className={`p-4 rounded-lg transition-all duration-300 ${
                activeSection === 'contacts'
                  ? 'bg-white shadow-lg border border-slate-200/80'
                  : 'hover:bg-white/50 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  activeSection === 'contacts' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg' 
                    : 'bg-slate-100 hover:bg-slate-200'
                }`}>
                  <Users className={`w-5 h-5 ${activeSection === 'contacts' ? 'text-white' : 'text-slate-600'}`} />
                </div>
                <div className="text-left flex-1">
                  <p className={`font-semibold transition-colors ${
                    activeSection === 'contacts' ? 'text-slate-800' : 'text-slate-600'
                  }`}>
                    Contacts Overview
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{contacts.length} total contacts</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('interactions')}
              className={`p-4 rounded-lg transition-all duration-300 ${
                activeSection === 'interactions'
                  ? 'bg-white shadow-lg border border-slate-200/80'
                  : 'hover:bg-white/50 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  activeSection === 'interactions' 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-lg' 
                    : 'bg-slate-100 hover:bg-slate-200'
                }`}>
                  <MessageCircle className={`w-5 h-5 ${activeSection === 'interactions' ? 'text-white' : 'text-slate-600'}`} />
                </div>
                <div className="text-left flex-1">
                  <p className={`font-semibold transition-colors ${
                    activeSection === 'interactions' ? 'text-slate-800' : 'text-slate-600'
                  }`}>
                    Interactions Log
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{interactions.length} total interactions</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Contacts Section */}
        {activeSection === 'contacts' && (
          <div className="space-y-6">
            {/* Search Filter */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts by name, company, title, or connections..."
                value={contactSearch}
                onChange={(e) => setContactSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
              />
            </div>

            {/* Contacts Table */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/80 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => handleContactSort('name')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                        >
                          <span>Name</span>
                          {getSortIcon('name', contactSort)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => handleContactSort('company')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                        >
                          <span>Current Company/Title</span>
                          {getSortIcon('company', contactSort)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => handleContactSort('mutual_connections_count')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                        >
                          <span>Mutual Connections</span>
                          {getSortIcon('mutual_connections_count', contactSort)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => handleContactSort('linkedJobsCount')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                        >
                          <span>Linked Jobs</span>
                          {getSortIcon('linkedJobsCount', contactSort)}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredAndSortedContacts.map((contact, index) => (
                      <tr 
                        key={contact.id} 
                        className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedContact(contact)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-slate-900 hover:text-blue-600 transition-colors">
                                {contact.name}
                              </div>
                              {contact.email && (
                                <div className="text-sm text-slate-500">{contact.email}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {contact.job_title && contact.company ? (
                              <div>
                                <div className="font-medium text-slate-900">{contact.job_title}</div>
                                <div className="text-slate-600">{contact.company}</div>
                              </div>
                            ) : (
                              <div className="text-slate-600">{contact.job_title || contact.company || '—'}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {contact.mutual_connections && contact.mutual_connections.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {contact.mutual_connections.slice(0, 3).map((conn, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                                >
                                  {conn}
                                </span>
                              ))}
                              {contact.mutual_connections.length > 3 && (
                                <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                                  +{contact.mutual_connections.length - 3} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {contact.linkedJobsCount && contact.linkedJobsCount > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {contact.linkedJobs?.slice(0, 2).map((job, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                                >
                                  {job.company}
                                </span>
                              ))}
                              {(contact.linkedJobsCount || 0) > 2 && (
                                <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                                  +{(contact.linkedJobsCount || 0) - 2} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredAndSortedContacts.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                {contactSearch ? 'No contacts match your search.' : 'No contacts found.'}
              </div>
            )}
          </div>
        )}

        {/* Interactions Section */}
        {activeSection === 'interactions' && (
          <div className="space-y-6">
            {/* Search Filter */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search interactions by contact, type, or summary..."
                value={interactionSearch}
                onChange={(e) => setInteractionSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
              />
            </div>

            {/* Interactions Table */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/80 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => handleInteractionSort('date')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                        >
                          <span>Date</span>
                          {getSortIcon('date', interactionSort)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => handleInteractionSort('contact_name')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                        >
                          <span>Contact Name</span>
                          {getSortIcon('contact_name', interactionSort)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => handleInteractionSort('type')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                        >
                          <span>Type</span>
                          {getSortIcon('type', interactionSort)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => handleInteractionSort('summary')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                        >
                          <span>Summary</span>
                          {getSortIcon('summary', interactionSort)}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredAndSortedInteractions.map((interaction) => (
                      <tr 
                        key={interaction.id} 
                        className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedInteraction(interaction)}
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-slate-900">
                              {new Date(interaction.date).toLocaleDateString()}
                            </div>
                            <div className="text-slate-500">
                              {new Date(interaction.date).toLocaleDateString('en-US', { 
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="font-medium text-slate-900 hover:text-blue-600 transition-colors">
                              {interaction.contact?.name || 'Unknown Contact'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {getInteractionIcon(interaction.type)}
                            <span className="text-sm font-medium text-slate-900 capitalize">
                              {interaction.type.replace('_', ' ')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-900 max-w-md truncate">
                            {interaction.summary}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredAndSortedInteractions.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                {interactionSearch ? 'No interactions match your search.' : 'No interactions found.'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {selectedContact && (
        <ContactModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}

      {/* Interaction Modal */}
      {selectedInteraction && (
        <InteractionModal
          interaction={selectedInteraction}
          onClose={() => setSelectedInteraction(null)}
        />
      )}
    </>
  )
}