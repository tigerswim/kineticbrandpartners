// src/components/modals/CreateReminderModal.tsx
'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { X, Calendar, Clock, User, Briefcase, Mail, MessageSquare, AlertCircle, Check } from 'lucide-react'
import { Contact, Job } from '@/lib/supabase'
import { 
  ReminderFormData, 
  COMMON_TIMEZONES, 
  REMINDER_VALIDATION,
  CreateReminderRequest 
} from '@/lib/types/reminders'

interface CreateReminderModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  contact?: Contact | null
  job?: Job | null
  contacts?: Contact[]
  jobs?: Job[]
}

export default function CreateReminderModal({
  isOpen,
  onClose,
  onSuccess,
  contact,
  job,
  contacts = [],
  jobs = []
}: CreateReminderModalProps) {
  const [formData, setFormData] = useState<ReminderFormData>({
    type: 'contact',
    contact_id: contact?.id || '',
    job_id: job?.id || '',
    scheduled_date: '',
    scheduled_time: '',
    user_timezone: 'America/New_York', // Default timezone
    email_subject: '',
    user_message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)

  // Initialize form data based on props
  useEffect(() => {
    if (contact) {
      setFormData(prev => ({
        ...prev,
        type: 'contact',
        contact_id: contact.id,
        job_id: '',
        email_subject: `Follow up with ${contact.name}${contact.company ? ` at ${contact.company}` : ''}`,
        user_message: `Hi ${contact.name},\n\nI wanted to follow up on our previous conversation. I'm very interested in ${contact.company ? `opportunities at ${contact.company}` : 'working together'} and would love to discuss next steps.\n\nThanks for your time!\n\nBest regards`
      }))
    } else if (job) {
      setFormData(prev => ({
        ...prev,
        type: 'job',
        contact_id: '',
        job_id: job.id,
        email_subject: `Follow up on ${job.job_title} position at ${job.company}`,
        user_message: `Hi,\n\nI wanted to follow up on my application for the ${job.job_title} position at ${job.company}. I'm very excited about this opportunity and would appreciate any updates on the hiring process.\n\nThank you for your time and consideration.\n\nBest regards`
      }))
    }
  }, [contact, job])

  // Set minimum date/time to 5 minutes from now
  const minDateTime = useMemo(() => {
    const now = new Date()
    const fiveMinutesFromNow = new Date(now.getTime() + REMINDER_VALIDATION.MIN_SCHEDULE_MINUTES * 60 * 1000)
    return {
      date: fiveMinutesFromNow.toISOString().split('T')[0],
      time: fiveMinutesFromNow.toTimeString().slice(0, 5)
    }
  }, [])

  // Auto-detect user timezone
  useEffect(() => {
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (COMMON_TIMEZONES.find(tz => tz.value === userTimezone)) {
        setFormData(prev => ({ ...prev, user_timezone: userTimezone }))
      }
    } catch (error) {
      console.log('Could not detect timezone, using default')
    }
  }, [])

  // Handle form field changes
  const handleFieldChange = useCallback((field: keyof ReminderFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }, [errors])

  // Handle type change
  const handleTypeChange = useCallback((type: 'contact' | 'job' | 'general') => {
    setFormData(prev => ({
      ...prev,
      type,
      contact_id: type === 'contact' ? prev.contact_id : '',
      job_id: type === 'job' ? prev.job_id : ''
    }))
  }, [])

  // Validation
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.scheduled_date) {
      newErrors.scheduled_date = 'Date is required'
    }

    if (!formData.scheduled_time) {
      newErrors.scheduled_time = 'Time is required'
    }

    if (formData.scheduled_date && formData.scheduled_time) {
      const scheduledDateTime = new Date(`${formData.scheduled_date}T${formData.scheduled_time}`)
      const now = new Date()
      const minTime = new Date(now.getTime() + REMINDER_VALIDATION.MIN_SCHEDULE_MINUTES * 60 * 1000)
      const maxTime = new Date(now.getTime() + REMINDER_VALIDATION.MAX_SCHEDULE_MONTHS * 30 * 24 * 60 * 60 * 1000)

      if (scheduledDateTime < minTime) {
        newErrors.scheduled_time = `Must be at least ${REMINDER_VALIDATION.MIN_SCHEDULE_MINUTES} minutes from now`
      }

      if (scheduledDateTime > maxTime) {
        newErrors.scheduled_date = `Cannot be more than ${REMINDER_VALIDATION.MAX_SCHEDULE_MONTHS} months from now`
      }
    }

    if (!formData.email_subject.trim()) {
      newErrors.email_subject = 'Subject is required'
    } else if (formData.email_subject.length > REMINDER_VALIDATION.EMAIL_SUBJECT_MAX_LENGTH) {
      newErrors.email_subject = `Subject too long (max ${REMINDER_VALIDATION.EMAIL_SUBJECT_MAX_LENGTH} characters)`
    }

    if (!formData.user_message.trim()) {
      newErrors.user_message = 'Message is required'
    } else if (formData.user_message.length > REMINDER_VALIDATION.USER_MESSAGE_MAX_LENGTH) {
      newErrors.user_message = `Message too long (max ${REMINDER_VALIDATION.USER_MESSAGE_MAX_LENGTH} characters)`
    }

    if (formData.type === 'contact' && !formData.contact_id) {
      newErrors.contact_id = 'Please select a contact'
    }

    if (formData.type === 'job' && !formData.job_id) {
      newErrors.job_id = 'Please select a job'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Combine date and time into ISO timestamp
      const scheduledDateTime = new Date(`${formData.scheduled_date}T${formData.scheduled_time}`)
      
      const requestData: CreateReminderRequest = {
        scheduled_time: scheduledDateTime.toISOString(),
        user_timezone: formData.user_timezone,
        email_subject: formData.email_subject.trim(),
        email_body: '', // This will be generated by the API
        user_message: formData.user_message.trim()
      }

      if (formData.contact_id) {
        requestData.contact_id = formData.contact_id
      }

      if (formData.job_id) {
        requestData.job_id = formData.job_id
      }

      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create reminder')
      }

      // Show success state
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onSuccess()
        onClose()
        // Reset form
        setFormData({
          type: 'contact',
          contact_id: '',
          job_id: '',
          scheduled_date: '',
          scheduled_time: '',
          user_timezone: formData.user_timezone, // Keep timezone
          email_subject: '',
          user_message: ''
        })
      }, 1500)

    } catch (error) {
      console.error('Error creating reminder:', error)
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to create reminder' })
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, validateForm, onSuccess, onClose])

  // Handle modal close
  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      onClose()
    }
  }, [isSubmitting, onClose])

  // ESC key handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, isSubmitting, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 z-50"
      style={{ paddingTop: '2rem' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                {showSuccess ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Mail className="w-5 h-5" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {showSuccess ? 'Reminder Created!' : 'Schedule Email Reminder'}
                </h2>
                <p className="text-purple-100 text-sm">
                  {showSuccess 
                    ? 'Your reminder has been scheduled successfully'
                    : 'Get reminded to follow up at the perfect time'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success State */}
        {showSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Reminder Scheduled!</h3>
            <p className="text-slate-600">
              You'll receive an email reminder at the scheduled time with your message ready to copy and send.
            </p>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
            <div className="space-y-6">
              {/* Error Alert */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-800 font-medium">Error</h4>
                    <p className="text-red-700 text-sm mt-1">{errors.submit}</p>
                  </div>
                </div>
              )}

              {/* Reminder Type Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Reminder Type
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('contact')}
                    disabled={!!contact}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
                      formData.type === 'contact'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    } ${contact ? 'opacity-75' : ''}`}
                  >
                    <User className="w-5 h-5 mx-auto mb-2 text-slate-600" />
                    <div className="text-sm font-medium text-slate-800">Contact</div>
                    <div className="text-xs text-slate-500">Follow up with a contact</div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleTypeChange('job')}
                    disabled={!!job}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
                      formData.type === 'job'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    } ${job ? 'opacity-75' : ''}`}
                  >
                    <Briefcase className="w-5 h-5 mx-auto mb-2 text-slate-600" />
                    <div className="text-sm font-medium text-slate-800">Job Application</div>
                    <div className="text-xs text-slate-500">Follow up on a job</div>
                  </button>
                </div>
              </div>

              {/* Contact/Job Selection */}
              {formData.type === 'contact' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Contact
                  </label>
                  <select
                    value={formData.contact_id}
                    onChange={(e) => handleFieldChange('contact_id', e.target.value)}
                    disabled={!!contact}
                    className={`input w-full ${errors.contact_id ? 'border-red-300' : ''}`}
                  >
                    <option value="">Choose a contact...</option>
                    {contacts.map(contact => (
                      <option key={contact.id} value={contact.id}>
                        {contact.name}{contact.company ? ` - ${contact.company}` : ''}
                      </option>
                    ))}
                  </select>
                  {errors.contact_id && (
                    <p className="text-red-600 text-sm mt-1">{errors.contact_id}</p>
                  )}
                </div>
              )}

              {formData.type === 'job' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Job Application
                  </label>
                  <select
                    value={formData.job_id}
                    onChange={(e) => handleFieldChange('job_id', e.target.value)}
                    disabled={!!job}
                    className={`input w-full ${errors.job_id ? 'border-red-300' : ''}`}
                  >
                    <option value="">Choose a job application...</option>
                    {jobs.map(job => (
                      <option key={job.id} value={job.id}>
                        {job.job_title} at {job.company}
                      </option>
                    ))}
                  </select>
                  {errors.job_id && (
                    <p className="text-red-600 text-sm mt-1">{errors.job_id}</p>
                  )}
                </div>
              )}

              {/* Schedule Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.scheduled_date}
                    onChange={(e) => handleFieldChange('scheduled_date', e.target.value)}
                    min={minDateTime.date}
                    className={`input w-full ${errors.scheduled_date ? 'border-red-300' : ''}`}
                  />
                  {errors.scheduled_date && (
                    <p className="text-red-600 text-sm mt-1">{errors.scheduled_date}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.scheduled_time}
                    onChange={(e) => handleFieldChange('scheduled_time', e.target.value)}
                    className={`input w-full ${errors.scheduled_time ? 'border-red-300' : ''}`}
                  />
                  {errors.scheduled_time && (
                    <p className="text-red-600 text-sm mt-1">{errors.scheduled_time}</p>
                  )}
                </div>
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Timezone
                </label>
                <select
                  value={formData.user_timezone}
                  onChange={(e) => handleFieldChange('user_timezone', e.target.value)}
                  className="input w-full"
                >
                  {COMMON_TIMEZONES.map(tz => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label} ({tz.offset})
                    </option>
                  ))}
                </select>
              </div>

              {/* Email Subject */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Subject
                </label>
                <input
                  type="text"
                  value={formData.email_subject}
                  onChange={(e) => handleFieldChange('email_subject', e.target.value)}
                  placeholder="Follow up with..."
                  maxLength={REMINDER_VALIDATION.EMAIL_SUBJECT_MAX_LENGTH}
                  className={`input w-full ${errors.email_subject ? 'border-red-300' : ''}`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.email_subject ? (
                    <p className="text-red-600 text-sm">{errors.email_subject}</p>
                  ) : (
                    <div />
                  )}
                  <p className="text-slate-400 text-sm">
                    {formData.email_subject.length}/{REMINDER_VALIDATION.EMAIL_SUBJECT_MAX_LENGTH}
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Your Message
                  <span className="text-slate-500 font-normal ml-2">(This will be ready to copy in your reminder email)</span>
                </label>
                <textarea
                  value={formData.user_message}
                  onChange={(e) => handleFieldChange('user_message', e.target.value)}
                  placeholder="Hi [Name],&#10;&#10;I wanted to follow up on..."
                  rows={6}
                  maxLength={REMINDER_VALIDATION.USER_MESSAGE_MAX_LENGTH}
                  className={`input w-full resize-none ${errors.user_message ? 'border-red-300' : ''}`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.user_message ? (
                    <p className="text-red-600 text-sm">{errors.user_message}</p>
                  ) : (
                    <div />
                  )}
                  <p className="text-slate-400 text-sm">
                    {formData.user_message.length}/{REMINDER_VALIDATION.USER_MESSAGE_MAX_LENGTH}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-6 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>Schedule Reminder</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}