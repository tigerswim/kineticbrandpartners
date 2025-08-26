// src/components/ContactForm.tsx
'use client'

import { useState, useCallback, useEffect } from 'react'
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
  Calendar,
  MapPin
} from 'lucide-react'
import ContactJobLinks from './ContactJobLinks'

interface ContactFormProps {
  contact?: Contact
  onSuccess: () => void
  onCancel: () => void
  allContacts?: Contact
}

// Helper function to get month options
const getMonthOptions = () => {
  const months = [
    { value: '01', label: 'Jan' },
    { value: '02', label: 'Feb' },
    { value: '03', label: 'Mar' },
    { value: '04', label: 'Apr' },
    { value: '05', label: 'May' },
    { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' },
    { value: '08', label: 'Aug' },
    { value: '09', label: 'Sep' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' }
  ]
  return months
}

// Helper function to get year options
const getYearOptions = () => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = 1970; year <= currentYear + 1; year++) {
    years.push({ value: year.toString(), label: year.toString() })
  }
  return years.reverse() // Most recent years first
}

// Date helper functions
const parseDate = (dateString: string | undefined | null): { month: string; year: string } => {
  if (!dateString || typeof dateString !== 'string') {
    return { month: '', year: '' }
  }
  
  // Handle partial dates like "2020-" or "-04"
  if (dateString.includes('-')) {
    const parts = dateString.split('-')
    return { 
      year: parts[0] || '', 
      month: parts[1] || '' 
    }
  }
  
  return { month: '', year: '' }
}

const combineDate = (month: string, year: string): string => {
  // If both are empty, return empty
  if (!month && !year) return ''
  
  // If one is missing, still create a partial date string
  const paddedMonth = month ? month.padStart(2, '0') : ''
  const yearPart = year || ''
  
  // Return in YYYY-MM format, even if one part is empty
  if (yearPart && paddedMonth) {
    return `${yearPart}-${paddedMonth}`
  } else if (yearPart) {
    return `${yearPart}-`
  } else if (paddedMonth) {
    return `-${paddedMonth}`
  }
  
  return ''
}

export default function ContactForm({ contact, onSuccess, onCancel, allContacts }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    current_location: contact?.current_location || '',
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


  const [connectionSuggestions, setConnectionSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Debug function to log current state
  const debugLog = (message: string, data?: any) => {
    console.log(`[ContactForm Debug] ${message}`, data)
  }

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

      debugLog('Submitting contact data:', contactData)

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
  const addExperience = useCallback(() => {
    const newExp: ExperienceEntry = {
      id: `temp-${Date.now()}`,
      company: '',
      title: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: ''
    }
    setExperience(prev => [...prev, newExp])
    debugLog('Added new experience entry', newExp)
  }, [])

  const removeExperience = useCallback((index: number) => {
    setExperience(prev => {
      const updated = prev.filter((_, i) => i !== index)
      debugLog(`Removed experience at index ${index}`, updated)
      return updated
    })
  }, [])

  const updateExperience = useCallback((index: number, field: keyof ExperienceEntry, value: string | boolean) => {
    setExperience(prev => {
      const updated = prev.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
      debugLog(`Updated experience[${index}].${field} to:`, value)
      debugLog('Full updated experience array:', updated)
      return updated
    })
  }, [])

  // Specific date update handlers for experience
  const updateExperienceDate = useCallback((
    index: number, 
    dateField: 'start_date' | 'end_date', 
    dateType: 'month' | 'year', 
    newValue: string
  ) => {
    setExperience(prev => {
      const updated = prev.map((exp, i) => {
        if (i !== index) return exp
        
        const currentDate = parseDate(exp[dateField])
        debugLog(`Current ${dateField} for exp[${index}]:`, currentDate)
        
        const updatedDate = {
          month: dateType === 'month' ? newValue : currentDate.month,
          year: dateType === 'year' ? newValue : currentDate.year
        }
        
        const newDateString = combineDate(updatedDate.month, updatedDate.year)
        debugLog(`New ${dateField} for exp[${index}]:`, newDateString)
        
        return { ...exp, [dateField]: newDateString }
      })
      
      debugLog('Updated experience array:', updated)
      return updated
    })
  }, [])

  // Education handlers
  const addEducation = useCallback(() => {
    const newEdu: EducationEntry = {
      id: `temp-${Date.now()}`,
      institution: '',
      degree_and_field: '',
      year: '',
      notes: ''
    }
    setEducation(prev => [...prev, newEdu])
    debugLog('Added new education entry', newEdu)
  }, [])

  const removeEducation = useCallback((index: number) => {
    setEducation(prev => {
      const updated = prev.filter((_, i) => i !== index)
      debugLog(`Removed education at index ${index}`, updated)
      return updated
    })
  }, [])

  const updateEducation = useCallback((index: number, field: keyof EducationEntry, value: string) => {
    setEducation(prev => {
      const updated = prev.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
      debugLog(`Updated education[${index}].${field} to:`, value)
      return updated
    })
  }, [])

  const updateEducationDate = useCallback((index: number, dateType: 'month' | 'year', newValue: string) => {
    setEducation(prev => {
      const updated = prev.map((edu, i) => {
        if (i !== index) return edu
        
        const currentDate = parseDate(edu.year)
        debugLog(`Current year for edu[${index}]:`, currentDate)
        
        const updatedDate = {
          month: dateType === 'month' ? newValue : currentDate.month,
          year: dateType === 'year' ? newValue : currentDate.year
        }
        
        const newDateString = combineDate(updatedDate.month, updatedDate.year)
        debugLog(`New year for edu[${index}]:`, newDateString)
        
        return { ...edu, year: newDateString }
      })
      
      debugLog('Updated education array:', updated)
      return updated
    })
  }, [])

  // Auto-suggestion functions
  const updateConnectionSuggestions = useCallback((input: string) => {
    if (!input.trim() || input.length < 2) {
      setConnectionSuggestions([])
      setShowSuggestions(false)
      return
    }

    const inputLower = input.toLowerCase().trim()
    
    // Filter out the current contact and already added connections
    const currentContactName = contact?.name?.toLowerCase()
    const existingConnections = mutualConnections.map(name => name.toLowerCase())
    
    const suggestions = allContacts
      .map(c => c.name)
      .filter(name => {
        const nameLower = name.toLowerCase()
        return nameLower.includes(inputLower) && 
               nameLower !== currentContactName && 
               !existingConnections.includes(nameLower)
      })
      .slice(0, 5) // Limit to 5 suggestions

    setConnectionSuggestions(suggestions)
    setShowSuggestions(suggestions.length > 0)
  }, [allContacts, contact?.name, mutualConnections])

  const selectSuggestion = useCallback((suggestion: string) => {
    setNewConnectionName(suggestion)
    setShowSuggestions(false)
    setConnectionSuggestions([])
  }, [])

  const handleConnectionInputChange = useCallback((value: string) => {
    setNewConnectionName(value)
    updateConnectionSuggestions(value)
  }, [updateConnectionSuggestions])

  // Add effect to clear suggestions when mutualConnections change
  useEffect(() => {
    if (newConnectionName.length >= 2) {
      updateConnectionSuggestions(newConnectionName)
    }
  }, [mutualConnections, newConnectionName, updateConnectionSuggestions])

  // Mutual connections handlers
  const addMutualConnection = () => {
    if (newConnectionName.trim() && !mutualConnections.includes(newConnectionName.trim())) {
      setMutualConnections([...mutualConnections, newConnectionName.trim()])
      setNewConnectionName('')
      setShowSuggestions(false)
      setConnectionSuggestions([])
    }
  }

const handleConnectionKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    if (showSuggestions && connectionSuggestions.length > 0) {
      selectSuggestion(connectionSuggestions[0])
    } else {
      addMutualConnection()
    }
  } else if (e.key === 'Escape') {
    setShowSuggestions(false)
    setConnectionSuggestions([])
  }
}

  const removeMutualConnection = (name: string) => {
    setMutualConnections(mutualConnections.filter(conn => conn !== name))
  }



  const handleJobLinksChanged = () => {
    setJobLinksKey(prev => prev + 1)
  }

  const monthOptions = getMonthOptions()
  const yearOptions = getYearOptions()

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 z-50" style={{ paddingTop: '2rem' }}>
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
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="contact-form"
                disabled={loading}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{contact ? 'Update Contact' : 'Save Contact'}</span>
                  </>
                )}
              </button>
              <button
                onClick={onCancel}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
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
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>Current Location</span>
                  </label>
                  <input
                    type="text"
                    name="current_location"
                    value={formData.current_location}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., San Francisco, CA"
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

              {experience.map((exp, index) => {
                const startDate = parseDate(exp.start_date)
                const endDate = parseDate(exp.end_date)
                
                debugLog(`Rendering experience ${index}:`, { exp, startDate, endDate })
                
                return (
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
                        <div className="flex gap-2">
                          <select
                            value={startDate.month}
                            onChange={(e) => {
                              debugLog(`Changing start month for exp[${index}] to:`, e.target.value)
                              updateExperienceDate(index, 'start_date', 'month', e.target.value)
                            }}
                            className="input flex-1"
                          >
                            <option value="">Select Month</option>
                            {monthOptions.map(month => (
                              <option key={month.value} value={month.value}>
                                {month.label}
                              </option>
                            ))}
                          </select>
                          <select
                            value={startDate.year}
                            onChange={(e) => {
                              debugLog(`Changing start year for exp[${index}] to:`, e.target.value)
                              updateExperienceDate(index, 'start_date', 'year', e.target.value)
                            }}
                            className="input flex-1"
                          >
                            <option value="">Select Year</option>
                            {yearOptions.map(year => (
                              <option key={year.value} value={year.value}>
                                {year.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">End Date</label>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <select
                              value={endDate.month}
                              onChange={(e) => {
                                debugLog(`Changing end month for exp[${index}] to:`, e.target.value)
                                updateExperienceDate(index, 'end_date', 'month', e.target.value)
                              }}
                              className="input flex-1"
                              disabled={exp.is_current}
                            >
                              <option value="">Select Month</option>
                              {monthOptions.map(month => (
                                <option key={month.value} value={month.value}>
                                  {month.label}
                                </option>
                              ))}
                            </select>
                            <select
                              value={endDate.year}
                              onChange={(e) => {
                                debugLog(`Changing end year for exp[${index}] to:`, e.target.value)
                                updateExperienceDate(index, 'end_date', 'year', e.target.value)
                              }}
                              className="input flex-1"
                              disabled={exp.is_current}
                            >
                              <option value="">Select Year</option>
                              {yearOptions.map(year => (
                                <option key={year.value} value={year.value}>
                                  {year.label}
                                </option>
                              ))}
                            </select>
                          </div>
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
                )
              })}
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

              {education.map((edu, index) => {
                const eduDate = parseDate(edu.year)
                
                debugLog(`Rendering education ${index}:`, { edu, eduDate })
                
                return (
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      
                      <div className="form-group md:col-span-2">
                        <label className="form-label">Graduation Date</label>
                        <div className="flex gap-2 max-w-md">
                          <select
                            value={eduDate.month}
                            onChange={(e) => {
                              debugLog(`Changing education month for edu[${index}] to:`, e.target.value)
                              updateEducationDate(index, 'month', e.target.value)
                            }}
                            className="input flex-1"
                          >
                            <option value="">Select Month</option>
                            {monthOptions.map(month => (
                              <option key={month.value} value={month.value}>
                                {month.label}
                              </option>
                            ))}
                          </select>
                          <select
                            value={eduDate.year}
                            onChange={(e) => {
                              debugLog(`Changing education year for edu[${index}] to:`, e.target.value)
                              updateEducationDate(index, 'year', e.target.value)
                            }}
                            className="input flex-1"
                          >
                            <option value="">Select Year</option>
                            {yearOptions.map(year => (
                              <option key={year.value} value={year.value}>
                                {year.label}
                              </option>
                            ))}
                          </select>
                        </div>
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
                )
              })}
            </div>

            {/* Network Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-slate-700 border-b border-slate-200 pb-2">
                <Network className="w-5 h-5" />
                <h3 className="font-semibold">Mutual Connections</h3>
              </div>

              <div className="form-group">
                <label className="form-label">Add Mutual Connection</label>
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={newConnectionName}
                        onChange={(e) => handleConnectionInputChange(e.target.value)}
                        onKeyPress={handleConnectionKeyPress}
                        onBlur={() => {
                          // Delay hiding suggestions to allow click events
                          setTimeout(() => setShowSuggestions(false), 200)
                        }}
                        onFocus={() => {
                          if (newConnectionName.length >= 2) {
                            updateConnectionSuggestions(newConnectionName)
                          }
                        }}
                        className="input w-full"
                        placeholder="Enter name of mutual connection"
                      />
                      
                      {/* Auto-suggestions dropdown */}
                      {showSuggestions && connectionSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 z-10 bg-white border border-slate-200 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                          {connectionSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => selectSuggestion(suggestion)}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-slate-100 last:border-b-0 flex items-center space-x-2"
                            >
                              <User className="w-3 h-3 text-slate-400" />
                              <span>{suggestion}</span>
                              <span className="ml-auto text-xs text-slate-400">existing contact</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={addMutualConnection}
                      className="btn-secondary flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                  
                  {newConnectionName.length >= 2 && connectionSuggestions.length === 0 && (
                    <p className="text-xs text-slate-500 mt-1">
                      No existing contacts found. Press Enter or click Add to create new connection.
                    </p>
                  )}
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
          </form>
        </div>
      </div>
    </div>
  )
}