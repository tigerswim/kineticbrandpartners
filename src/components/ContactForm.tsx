// src/components/ContactForm.tsx
'use client'

import { useState } from 'react'
import { Contact } from '@/lib/supabase'
import { createContact, updateContact } from '@/lib/contacts'
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Briefcase, 
  Linkedin, 
  FileText,
  Users,
  Save
} from 'lucide-react'
import ContactJobLinks from './ContactJobLinks'

interface ContactFormProps {
  contact?: Contact
  onSuccess: () => void
  onCancel: () => void
}

export default function ContactForm({ contact, onSuccess, onCancel }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    company: contact?.company || '',
    job_title: contact?.job_title || '',
    linkedin_url: contact?.linkedin_url || '',
    notes: contact?.notes || ''
  })
  const [loading, setLoading] = useState(false)
  const [jobLinksKey, setJobLinksKey] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result
      if (contact) {
        result = await updateContact(contact.id, formData)
      } else {
        result = await createContact(formData)
      }

      if (result) {
        onSuccess()
      } else {
        alert('Failed to save contact. Please check the console for details.')
      }
    } catch (error) {
      console.error('Error in form submission:', error)
      alert('An error occurred while saving the contact.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleJobLinksChanged = () => {
    setJobLinksKey(prev => prev + 1)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {contact ? 'Edit Contact' : 'New Professional Contact'}
                </h2>
                <p className="text-blue-100 text-sm">
                  {contact ? 'Update contact information' : 'Add someone to your professional network'}
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-slate-700 border-b border-slate-200 pb-2">
                <User className="w-5 h-5" />
                <h3 className="font-semibold">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label flex items-center space-x-2">
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="e.g., John Smith"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label flex items-center space-x-2">
                    <Linkedin className="w-4 h-4 text-slate-500" />
                    <span>LinkedIn Profile</span>
                  </label>
                  <input
                    type="url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://linkedin.com/in/johnsmith"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-slate-700 border-b border-slate-200 pb-2">
                <Building className="w-5 h-5" />
                <h3 className="font-semibold">Professional Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label flex items-center space-x-2">
                    <Building className="w-4 h-4 text-slate-500" />
                    <span>Company</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., Google, Microsoft, Acme Corp"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-slate-500" />
                    <span>Job Title</span>
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-slate-700 border-b border-slate-200 pb-2">
                <FileText className="w-5 h-5" />
                <h3 className="font-semibold">Additional Information</h3>
              </div>

              <div className="form-group">
                <label className="form-label">Notes & Context</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="input min-h-[120px] resize-none"
                  placeholder="Add context about how you met, shared connections, conversation topics, or other relevant details..."
                />
                <p className="form-help">
                  Include meeting context, mutual connections, or conversation highlights
                </p>
              </div>
            </div>

            {/* Job Links Section - Only show when editing existing contact */}
            {contact && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-slate-700 border-b border-slate-200 pb-2">
                  <Briefcase className="w-5 h-5" />
                  <h3 className="font-semibold">Associated Job Applications</h3>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <ContactJobLinks
                    key={jobLinksKey}
                    contactId={contact.id}
                    allowRemove={true}
                    onLinksChanged={handleJobLinksChanged}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>{contact ? 'Update Contact' : 'Save Contact'}</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}