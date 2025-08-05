// src/components/ContactList.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Contact } from '@/lib/supabase'
import { getContacts, deleteContact } from '@/lib/contacts'
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
  User
} from 'lucide-react'
import ContactForm from './ContactForm'
import InteractionList from './InteractionList'
import ContactJobLinks from './ContactJobLinks'
import ContactFilter from './ContactFilter'

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    setLoading(true)
    const data = await getContacts()
    setContacts(data)
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

  // Filter contacts based on search term
  const filteredContacts = useMemo(() => {
    if (!searchTerm.trim()) {
      return contacts
    }

    const term = searchTerm.toLowerCase()
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(term) ||
      (contact.company && contact.company.toLowerCase().includes(term)) ||
      (contact.email && contact.email.toLowerCase().includes(term)) ||
      (contact.job_title && contact.job_title.toLowerCase().includes(term)) ||
      (contact.notes && contact.notes.toLowerCase().includes(term))
    )
  }, [contacts, searchTerm])

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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card p-4">
                <div className="animate-pulse space-y-3">
                  <div className="flex justify-between">
                    <div className="h-6 bg-slate-200 rounded w-32"></div>
                    <div className="flex space-x-2">
                      <div className="h-4 bg-slate-200 rounded w-12"></div>
                      <div className="h-4 bg-slate-200 rounded w-12"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-slate-200 rounded w-48"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Professional Network</h2>
          <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
            {contacts.length} contacts
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
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

      {/* Results Summary */}
      {searchTerm && (
        <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-lg">
          <Search className="w-4 h-4" />
          <span>
            Showing {filteredContacts.length} of {contacts.length} contacts matching 
            <span className="font-medium"> "{searchTerm}"</span>
          </span>
          <button
            onClick={() => setSearchTerm('')}
            className="ml-2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {filteredContacts.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-2">
            {contacts.length === 0 ? "No contacts yet" : "No matching contacts"}
          </h3>
          <p className="text-slate-500 mb-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contacts List */}
          <div className="space-y-4">
            {filteredContacts.map((contact, index) => (
              <div
                key={contact.id}
                className={`card p-4 cursor-pointer transition-all duration-200 animate-slide-up ${
                  selectedContactId === contact.id
                    ? 'ring-2 ring-blue-500 border-blue-300 bg-blue-50/50'
                    : 'hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedContactId(contact.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-800 truncate">{contact.name}</h3>
                      {contact.job_title && contact.company && (
                        <div className="flex items-center space-x-1 text-slate-600 mb-1">
                          <Building className="w-4 h-4 flex-shrink-0" />
                          <p className="text-sm truncate">
                            {contact.job_title} at {contact.company}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingContact(contact)
                        setShowForm(true)
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Edit contact"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(contact.id)
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete contact"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-2 mb-3">
                  {contact.email && (
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                  {contact.linkedin_url && (
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Linkedin className="w-4 h-4 text-slate-400" />
                      <span className="truncate">LinkedIn Profile</span>
                    </div>
                  )}
                </div>

                {/* Linked Jobs */}
                <div className="mb-3">
                  <ContactJobLinks contactId={contact.id} compact={true} />
                </div>

                {/* Notes Preview */}
                {contact.notes && (
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <p className="text-sm text-slate-700 line-clamp-2">{contact.notes}</p>
                  </div>
                )}

                {/* Selected Indicator */}
                {selectedContactId === contact.id && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interaction Panel */}
          {selectedContactId && (
            <div className="lg:sticky lg:top-4 lg:h-fit">
              <div className="card p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Contact Interactions</h3>
                </div>
                <InteractionList contactId={selectedContactId} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}