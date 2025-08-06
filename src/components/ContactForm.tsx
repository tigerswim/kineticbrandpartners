// src/components/ContactForm.tsx
'use client'

import { useState } from 'react'
import { Contact, ExperienceEntry, EducationEntry } from '@/lib/supabase'
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
  Save,
  Plus,
  Minus,
  GraduationCap,
  Network,
  Calendar
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

  const [experience, setExperience] = useState<ExperienceEntry[]>(
    contact?.experience || []
  )

  const [education, setEducation] = useState<EducationEntry[]>(
    contact?.education || []
  )

  const [mutualConnections, setMutualConnections] = useState<string[]>(
    contact?.mutual_connections || []
  )

  const [newConnectionName, setNewConnectionName] = useState('')
  const [loading, setLoading] = useState(false)
  const [jobLinksKey, setJobLinksKey] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const contactData = {
        ...formData,
        experience,
        education,
        mutual_connections: mutualConnections
      }

      let result
      if (contact) {
        result = await updateContact(contact.id, contactData)
      } else {
        result = await createContact(contactData)
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

  // Experience handlers
  const addExperience = () => {
    const newExp: ExperienceEntry = {
      id: `temp-${Date.now()}`,
      company: '',
      title: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: ''
    }
    setExperience([...experience, newExp])
  }

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  const updateExperience = (index: number, field: keyof ExperienceEntry, value: string | boolean) => {
    const updated = experience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    )
    setExperience(updated)
  }

  // Education handlers
  const addEducation = () => {
    const newEdu: EducationEntry = {
      id: `temp-${Date.now()}`,
      institution: '',
      degree_and_field: '',
      year: '',
      notes: ''
    }
    setEducation([...education, newEdu])
  }

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const updateEducation = (index: number, field: keyof EducationEntry, value: string) => {
    const updated = education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    )
    setEducation(updated)
  }

  // Mutual connections handlers
  const addMutualConnection = () => {
    if (newConnectionName.trim() && !mutualConnections.includes(newConnectionName.trim())) {
      setMutualConnections([...mutualConnections, newConnectionName.trim()])
      setNewConnectionName('')
    }
  }

  const removeMutualConnection = (name: string) => {
    setMutualConnections(mutualConnections.filter(conn => conn !== name))
  }

  const handleConnectionKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addMutualConnection()
    }
  }

  const handleJobLinksChanged = () => {
    setJobLinksKey(prev => prev + 1)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
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
          <form onSubmit={handleSubmit} className="space-y-8">
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
                <h3 className="font-semibold">Current Role</h3>
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

            {/* Professional Background */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2 text-slate-700">
                  <Briefcase className="w-5 h-5" />
                  <h3 className="font-semibold">Work Experience</h3>
                </div>
                <button
                  type="button"
                  onClick={addExperience}
                  className="btn-secondary text-sm flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Role</span>
                </button>
              </div>

              {experience.map((exp, index) => (
                <div key={exp.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-slate-700">Role {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        className="input"
                        placeholder="Company name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Job Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => updateExperience(index, 'title', e.target.value)}
                        className="input"
                        placeholder="Job title"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Start Date</label>
                      <input
                        type="month"
                        value={exp.start_date}
                        onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                        className="input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <div className="space-y-2">
                        <input
                          type="month"
                          value={exp.end_date || ''}
                          onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                          className="input"
                          disabled={exp.is_current}
                        />
                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={exp.is_current}
                            onChange={(e) => {
                              updateExperience(index, 'is_current', e.target.checked)
                              if (e.target.checked) {
                                updateExperience(index, 'end_date', '')
                              }
                            }}
                            className="rounded"
                          />
                          <span>Current role</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      value={exp.description || ''}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      className="input min-h-[80px] resize-none"
                      placeholder="Key responsibilities, achievements, technologies used..."
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2 text-slate-700">
                  <GraduationCap className="w-5 h-5" />
                  <h3 className="font-semibold">Education</h3>
                </div>
                <button
                  type="button"
                  onClick={addEducation}
                  className="btn-secondary text-sm flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>

              {education.map((edu, index) => (
                <div key={edu.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-slate-700">Education {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-group">
                      <label className="form-label">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        className="input"
                        placeholder="University name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Degree & Field</label>
                      <input
                        type="text"
                        value={edu.degree_and_field}
                        onChange={(e) => updateEducation(index, 'degree_and_field', e.target.value)}
                        className="input"
                        placeholder="e.g., Bachelor's in Computer Science"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Year</label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => updateEducation(index, 'year', e.target.value)}
                        className="input"
                        placeholder="2018 or 2018-2022"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Notes</label>
                    <input
                      type="text"
                      value={edu.notes || ''}
                      onChange={(e) => updateEducation(index, 'notes', e.target.value)}
                      className="input"
                      placeholder="GPA, honors, activities, relevant coursework..."
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Network Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-slate-700 border-b border-slate-200 pb-2">
                <Network className="w-5 h-5" />
                <h3 className="font-semibold">Mutual Connections</h3>
              </div>

              <div className="form-group">
                <label className="form-label">Add Mutual Connection</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newConnectionName}
                    onChange={(e) => setNewConnectionName(e.target.value)}
                    onKeyPress={handleConnectionKeyPress}
                    className="input flex-1"
                    placeholder="Enter name of mutual connection"
                  />
                  <button
                    type="button"
                    onClick={addMutualConnection}
                    className="btn-secondary flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {mutualConnections.length > 0 && (
                <div className="space-y-2">
                  <p className="form-label">Connected through:</p>
                  <div className="flex flex-wrap gap-2">
                    {mutualConnections.map((connection, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200"
                      >
                        {connection}
                        <button
                          type="button"
                          onClick={() => removeMutualConnection(connection)}
                          className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
                  Include meeting context, conversation highlights, or other important notes
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