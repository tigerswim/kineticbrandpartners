// src/components/ContactList.tsx - Enhanced with data-dense design and 3-column layout
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Contact } from '@/lib/supabase'
import { getContactsLite, getContactById, deleteContact } from '@/lib/contacts'
import { getJobsForContacts } from '@/lib/jobContacts'
import { 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Mail, 
  Phone, 
  Building, 
  Edit,
  Trash2,
  X,
  MessageCircle,
  Linkedin,
  User,
  GraduationCap,
  Briefcase,
  Network,
  ExternalLink,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import ContactForm from './ContactForm'
import InteractionList from './InteractionList'
import ContactJobLinks from './ContactJobLinks'
import ContactFilter from './ContactFilter'

// Contact Modal Component
interface ContactModalProps {
  contact: Contact
  onClose: () => void
  onEdit: (contact: Contact) => void
}

function ContactModal({ contact, onClose, onEdit }: ContactModalProps) {
  const formatExperience = (contact: Contact) => {
    if (!contact.experience || contact.experience.length === 0) return null
    
    // Show current role or most recent role
    const currentRole = contact.experience.find(exp => exp.is_current)
    const mostRecentRole = contact.experience[0] // Assuming sorted by recency
    const displayRole = currentRole || mostRecentRole
    
    if (displayRole) {
      return `${displayRole.title} at ${displayRole.company}`
    }
    return null
  }

  const formatEducation = (contact: Contact) => {
    if (!contact.education || contact.education.length === 0) return null
    
    // Show most recent or highest degree
    const recentEducation = contact.education[0] // Assuming sorted by recency
    return `${recentEducation.degree_and_field}, ${recentEducation.institution}`
  }

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
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(contact)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                title="Edit contact"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="space-y-6">
            {/* Current Role */}
            {(contact.job_title && contact.company) || formatExperience(contact) ? (
              <div>
                <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                  <Building className="w-4 h-4" />
                  <span>Current Role</span>
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  {contact.job_title && contact.company ? (
                    <p className="font-medium">{contact.job_title} at {contact.company}</p>
                  ) : (
                    formatExperience(contact) && (
                      <p className="font-medium">{formatExperience(contact)}</p>
                    )
                  )}
                </div>
              </div>
            ) : null}

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

            {/* Education */}
            {formatEducation(contact) && (
              <div>
                <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p>{formatEducation(contact)}</p>
                </div>
              </div>
            )}

            {/* Work Experience */}
            {contact.experience && contact.experience.length > 0 && (
              <div>
                <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Work Experience</span>
                </h3>
                <div className="space-y-3">
                  {contact.experience.map((exp, index) => (
                    <div key={exp.id || index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{exp.title}</h4>
                        {exp.is_current && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{exp.company}</p>
                      {(exp.start_date || exp.end_date) && (
                        <p className="text-xs text-slate-500 mb-2">
                          {exp.start_date} - {exp.is_current ? 'Present' : (exp.end_date || 'Present')}
                        </p>
                      )}
                      {exp.description && (
                        <p className="text-sm text-slate-700">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

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

            {/* Linked Jobs */}
            <div>
              <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Associated Job Applications</span>
              </h3>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <ContactJobLinks contactId={contact.id} compact={false} />
              </div>
            </div>

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

// Compact MutualConnections Component
interface MutualConnectionsProps {
  connections: string[]
  contactNameMap: Map<string, Contact>
  onConnectionClick: (connectionName: string) => void
  stopPropagation?: boolean
}

function MutualConnections({ connections, contactNameMap, onConnectionClick, stopPropagation = true }: MutualConnectionsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const maxInitialDisplay = 2 // Reduced for more compact display

  if (!connections || connections.length === 0) return null

  const initialConnections = connections.slice(0, maxInitialDisplay)
  const remainingConnections = connections.slice(maxInitialDisplay)
  const displayConnections = isExpanded ? connections : initialConnections

  const isContactInSystem = (connectionName: string): Contact | null => {
    return contactNameMap.get(connectionName.toLowerCase().trim()) || null
  }

  const handleConnectionClick = (e: React.MouseEvent, connectionName: string) => {
    if (stopPropagation) {
      e.stopPropagation()
    }
    const existingContact = isContactInSystem(connectionName)
    if (existingContact) {
      onConnectionClick(connectionName)
    }
  }

  const handleExpandClick = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation()
    }
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap gap-1">
        {displayConnections.map((connection, idx) => {
          const existingContact = isContactInSystem(connection)
          return (
            <span
              key={idx}
              onClick={(e) => handleConnectionClick(e, connection)}
              className={`px-1.5 py-0.5 rounded text-xs transition-all duration-200 ${
                existingContact
                  ? 'bg-blue-100 text-blue-700 border border-blue-300 cursor-pointer hover:bg-blue-200 font-medium'
                  : 'bg-slate-100 text-slate-600'
              }`}
              title={existingContact ? 'Click to view contact details' : connection}
            >
              {connection.length > 12 ? connection.substring(0, 12) + '...' : connection}
              {existingContact && (
                <ExternalLink className="w-2 h-2 inline ml-0.5" />
              )}
            </span>
          )
        })}
        
        {/* Expansion/Collapse Button */}
        {remainingConnections.length > 0 && (
          <button
            onClick={handleExpandClick}
            className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs transition-all duration-200 flex items-center space-x-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-2 h-2" />
                <span>less</span>
              </>
            ) : (
              <>
                <span>+{remainingConnections.length}</span>
                <ChevronDown className="w-2 h-2" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [modalContact, setModalContact] = useState<Contact | null>(null)
  const [contactIdToJobs, setContactIdToJobs] = useState<Record<string, any[]>>({})

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    setLoading(true)
    // Fetch a lightweight list first for fast render
    const data = await getContactsLite()
    setContacts(data as unknown as Contact[])
    // Batch fetch linked jobs for all contacts to avoid N+1 queries
    try {
      const map = await getJobsForContacts((data as any).map((c: any) => c.id))
      setContactIdToJobs(map)
    } catch (e) {
      console.error('Error fetching jobs for contacts:', e)
      setContactIdToJobs({})
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      const success = await deleteContact(id)
      if (success) {
        loadContacts()
        if (selectedContactId === id) {
          setSelectedContactId(null)
        }
      }
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingContact(null)
    loadContacts()
  }

  // Create a map for quick contact lookup by name
  const contactNameMap = useMemo(() => {
    const map = new Map<string, Contact>()
    contacts.forEach(contact => {
      map.set(contact.name.toLowerCase().trim(), contact)
    })
    return map
  }, [contacts])

  // Helper function to check if a mutual connection exists as a contact
  const isContactInSystem = (connectionName: string): Contact | null => {
    return contactNameMap.get(connectionName.toLowerCase().trim()) || null
  }

  // Handle clicking on mutual connection
  const handleMutualConnectionClick = async (connectionName: string) => {
    const contact = isContactInSystem(connectionName)
    if (contact) {
      const full = await getContactById(contact.id)
      setModalContact(full || contact)
    }
  }

  // Enhanced filter contacts based on search term (including linked jobs)
  const filteredContacts = useMemo(() => {
    if (!searchTerm.trim()) {
      return contacts
    }

    const term = searchTerm.toLowerCase()
    return contacts.filter(contact => {
      // Basic fields
      const basicMatch = contact.name.toLowerCase().includes(term) ||
        (contact.company && contact.company.toLowerCase().includes(term)) ||
        (contact.email && contact.email.toLowerCase().includes(term)) ||
        (contact.job_title && contact.job_title.toLowerCase().includes(term)) ||
        (contact.notes && contact.notes.toLowerCase().includes(term))

      // Experience search
      const experienceMatch = contact.experience?.some(exp =>
        exp.company.toLowerCase().includes(term) ||
        exp.title.toLowerCase().includes(term) ||
        (exp.description && exp.description.toLowerCase().includes(term))
      )

      // Education search
      const educationMatch = contact.education?.some(edu =>
        edu.institution.toLowerCase().includes(term) ||
        edu.degree_and_field.toLowerCase().includes(term) ||
        (edu.notes && edu.notes.toLowerCase().includes(term))
      )

      // Mutual connections search
      const connectionMatch = contact.mutual_connections?.some(conn =>
        conn.toLowerCase().includes(term)
      )

      return basicMatch || experienceMatch || educationMatch || connectionMatch
    })
  }, [contacts, searchTerm])

  const formatExperience = (contact: Contact) => {
    if (!contact.experience || contact.experience.length === 0) return null
    
    // Show current role or most recent role
    const currentRole = contact.experience.find(exp => exp.is_current)
    const mostRecentRole = contact.experience[0] // Assuming sorted by recency
    const displayRole = currentRole || mostRecentRole
    
    if (displayRole) {
      return `${displayRole.title} at ${displayRole.company}`
    }
    return null
  }

  const formatEducation = (contact: Contact) => {
    if (!contact.education || contact.education.length === 0) return null
    
    // Show most recent or highest degree
    const recentEducation = contact.education[0] // Assuming sorted by recency
    return `${recentEducation.degree_and_field}, ${recentEducation.institution}`
  }

  if (loading) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-8 bg-slate-200 rounded-full"></div>
            <div className="h-8 bg-slate-200 rounded w-32"></div>
          </div>
          <div className="h-10 bg-slate-200 rounded w-32"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="col-span-full lg:col-span-2 xl:col-span-2 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-3">
                <div className="animate-pulse space-y-2">
                  <div className="flex justify-between">
                    <div className="h-5 bg-slate-200 rounded w-32"></div>
                    <div className="flex space-x-1">
                      <div className="h-4 bg-slate-200 rounded w-8"></div>
                      <div className="h-4 bg-slate-200 rounded w-8"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-slate-200 rounded w-48"></div>
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <ContactForm
        contact={editingContact}
        onSuccess={handleFormSuccess}
        onCancel={() => {
          setShowForm(false)
          setEditingContact(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Contact Modal */}
      {modalContact && (
        <ContactModal
          contact={modalContact}
          onClose={() => setModalContact(null)}
          onEdit={(contact) => {
            setModalContact(null)
            setEditingContact(contact)
            setShowForm(true)
          }}
        />
      )}

      {/* Header - More compact */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-slate-800">Professional Network</h2>
          <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            {contacts.length} contacts
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2 px-3 py-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Search Filter */}
      <ContactFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Results Summary - More compact */}
      {searchTerm && (
        <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg">
          <Search className="w-3 h-3" />
          <span>
            {filteredContacts.length} of {contacts.length} contacts matching 
            <span className="font-medium"> "{searchTerm}"</span>
          </span>
          <button
            onClick={() => setSearchTerm('')}
            className="ml-2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {filteredContacts.length === 0 ? (
        <div className="card text-center py-8">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-2">
            {contacts.length === 0 ? "No contacts yet" : "No matching contacts"}
          </h3>
          <p className="text-slate-500 mb-4">
            {contacts.length === 0
              ? "Add your professional contacts to build your network!"
              : "Try adjusting your search terms."
            }
          </p>
          {contacts.length === 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Contact
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          {/* Contacts List - Now 3 columns on larger screens */}
          <div className="xl:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredContacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className={`card p-3 cursor-pointer transition-all duration-200 animate-slide-up relative ${
                    selectedContactId === contact.id
                      ? 'ring-2 ring-blue-500 border-blue-300 bg-blue-50/50'
                      : 'hover:shadow-lg hover:scale-[1.02]'
                  }`}
                  style={{ animationDelay: `${index * 30}ms` }}
                  onClick={() => setSelectedContactId(contact.id)}
                >
                  {/* Header with name and actions */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      {/* Compact Avatar */}
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-slate-800 truncate">{contact.name}</h3>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1">
                      <button
                        onClick={async (e) => {
                          e.stopPropagation()
                          const full = await getContactById(contact.id)
                          setEditingContact(full || contact)
                          setShowForm(true)
                        }}
                        className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200"
                        title="Edit contact"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(contact.id)
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all duration-200"
                        title="Delete contact"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Role Information - Condensed */}
                  {contact.job_title && contact.company ? (
                    <div className="flex items-center space-x-1 text-slate-600 mb-1">
                      <Building className="w-3 h-3 flex-shrink-0 text-slate-400" />
                      <p className="text-xs truncate">
                        {contact.job_title} at {contact.company}
                      </p>
                    </div>
                  ) : (
                    formatExperience(contact) && (
                      <div className="flex items-center space-x-1 text-slate-600 mb-1">
                        <Briefcase className="w-3 h-3 flex-shrink-0 text-slate-400" />
                        <p className="text-xs truncate">
                          {formatExperience(contact)}
                        </p>
                      </div>
                    )
                  )}

                  {/* Contact Details - Condensed */}
                  <div className="space-y-1 mb-2">
                    {contact.email && (
                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{contact.phone}</span>
                      </div>
                    )}
                    {contact.linkedin_url && (
                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <Linkedin className="w-3 h-3 text-slate-400" />
                        <span className="truncate">LinkedIn</span>
                      </div>
                    )}
                  </div>

                  {/* Education - Condensed */}
                  {formatEducation(contact) && (
                    <div className="flex items-center space-x-1 text-xs text-slate-500 mb-2">
                      <GraduationCap className="w-3 h-3 flex-shrink-0 text-slate-400" />
                      <p className="truncate">{formatEducation(contact)}</p>
                    </div>
                  )}

                  {/* Mutual Connections - Ultra Compact */}
                  {contact.mutual_connections && contact.mutual_connections.length > 0 && (
                    <div className="mb-2">
                      <div className="flex items-center space-x-1 mb-1">
                        <Network className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">
                          {contact.mutual_connections.length} mutual
                        </span>
                      </div>
                      <MutualConnections
                        connections={contact.mutual_connections}
                        contactNameMap={contactNameMap}
                        onConnectionClick={handleMutualConnectionClick}
                      />
                    </div>
                  )}

                  {/* Linked Jobs - Count Badge only (details load in modal) */}
                  {contactIdToJobs[contact.id] && contactIdToJobs[contact.id].length > 0 && (
                    <div className="mb-2">
                      <div className="inline-flex items-center gap-2 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-200">
                        <Briefcase className="w-3 h-3" />
                        <span>{contactIdToJobs[contact.id].length} linked job{contactIdToJobs[contact.id].length > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  )}

                  {/* Notes Preview - Condensed */}
                  {contact.notes && (
                    <div className="bg-slate-50 rounded p-2 border border-slate-100">
                      <p className="text-xs text-slate-700 line-clamp-2">{contact.notes}</p>
                    </div>
                  )}

                  {/* Selected Indicator */}
                  {selectedContactId === contact.id && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping absolute"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Compact Interaction Panel */}
          {selectedContactId ? (
            <div className="xl:col-span-1">
              <div className="xl:sticky xl:top-4">
                <div className="card p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-semibold text-slate-800">Interactions</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <InteractionList contactId={selectedContactId} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="xl:col-span-1">
              <div className="xl:sticky xl:top-4">
                <div className="card p-4 text-center">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500">Select a contact to view interactions</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}