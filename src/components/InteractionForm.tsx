// src/components/InteractionForm.tsx - Optimized version
'use client'
import { useState, useCallback, useMemo, memo } from 'react'
import { Interaction } from '@/lib/supabase'
import { createInteraction, updateInteraction } from '@/lib/interactions'
import { 
  Mail, 
  Phone, 
  Video, 
  Linkedin, 
  Calendar, 
  MessageSquare,
  Clock,
  FileText,
  Save,
  X
} from 'lucide-react'

interface InteractionFormProps {
  contactId: string
  interaction?: Interaction
  onSuccess: () => void
  onCancel: () => void
}

// Memoized constants to prevent recreation on every render
const INTERACTION_TYPES = [
  { 
    value: 'email' as const, 
    label: 'Email', 
    icon: Mail,
    description: 'Email conversation',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  { 
    value: 'phone' as const, 
    label: 'Phone Call', 
    icon: Phone,
    description: 'Phone conversation',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200'
  },
  { 
    value: 'video_call' as const, 
    label: 'Video Call', 
    icon: Video,
    description: 'Video meeting',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  { 
    value: 'linkedin' as const, 
    label: 'LinkedIn Message', 
    icon: Linkedin,
    description: 'LinkedIn interaction',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-300'
  },
  { 
    value: 'meeting' as const, 
    label: 'In-Person Meeting', 
    icon: Calendar,
    description: 'Face-to-face meeting',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200'
  },
  { 
    value: 'other' as const, 
    label: 'Other', 
    icon: MessageSquare,
    description: 'Other interaction type',
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200'
  }
] as const

// Memoized type selector component
const TypeSelector = memo(({ 
  selectedType, 
  onTypeChange 
}: { 
  selectedType: string
  onTypeChange: (type: string) => void 
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {INTERACTION_TYPES.map((type) => {
      const Icon = type.icon
      const isSelected = selectedType === type.value
      
      return (
        <button
          key={type.value}
          type="button"
          onClick={() => onTypeChange(type.value)}
          className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
            isSelected
              ? `${type.bg} ${type.border} ${type.color} border-opacity-100 shadow-sm transform scale-105`
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-2 mb-1">
            <Icon className="w-4 h-4" />
            <span className="font-semibold text-sm">{type.label}</span>
          </div>
          <div className="text-xs opacity-75">{type.description}</div>
        </button>
      )
    })}
  </div>
))

TypeSelector.displayName = 'TypeSelector'

// Memoized header component
const FormHeader = memo(({ 
  isEditing, 
  selectedTypeIcon: Icon, 
  onCancel 
}: { 
  isEditing: boolean
  selectedTypeIcon: React.ComponentType<{ className: string }>
  onCancel: () => void 
}) => (
  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white rounded-t-xl">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-lg font-bold">
            {isEditing ? 'Edit Interaction' : 'New Interaction'}
          </h3>
          <p className="text-blue-100 text-sm">
            {isEditing ? 'Update interaction details' : 'Record a new contact interaction'}
          </p>
        </div>
      </div>
      <button
        onClick={onCancel}
        className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
))

FormHeader.displayName = 'FormHeader'

export default function InteractionForm({ contactId, interaction, onSuccess, onCancel }: InteractionFormProps) {
  // Initialize form data with default values
  const [formData, setFormData] = useState(() => ({
    type: interaction?.type || 'email' as const,
    date: interaction?.date || new Date().toISOString().split('T')[0],
    summary: interaction?.summary || '',
    notes: interaction?.notes || ''
  }))
  const [loading, setLoading] = useState(false)

  // Memoized selected type configuration
  const selectedType = useMemo(() => {
    return INTERACTION_TYPES.find(type => type.value === formData.type) || INTERACTION_TYPES[0]
  }, [formData.type])

  // Optimized form handlers
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent double submission
    if (loading) return
    
    setLoading(true)

    try {
      if (interaction) {
        await updateInteraction(interaction.id, formData)
      } else {
        await createInteraction({
          ...formData,
          contact_id: contactId
        })
      }
      onSuccess()
    } catch (error) {
      console.error('Error saving interaction:', error)
      alert('Error saving interaction. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [formData, interaction, contactId, onSuccess, loading])

  // Optimized change handlers to prevent unnecessary re-renders
  const handleTypeChange = useCallback((type: string) => {
    setFormData(prev => ({ ...prev, type: type as any }))
  }, [])

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, date: e.target.value }))
  }, [])

  const handleSummaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, summary: e.target.value }))
  }, [])

  const handleNotesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, notes: e.target.value }))
  }, [])

  // Check if form is valid
  const isFormValid = useMemo(() => {
    return formData.date && formData.summary.trim()
  }, [formData.date, formData.summary])

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 animate-fade-in">
      {/* Header */}
      <FormHeader 
        isEditing={!!interaction}
        selectedTypeIcon={selectedType.icon}
        onCancel={onCancel}
      />

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Interaction Type Selection */}
          <div className="form-group">
            <label className="form-label">Interaction Type</label>
            <TypeSelector
              selectedType={formData.type}
              onTypeChange={handleTypeChange}
            />
          </div>

          {/* Date and Summary Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label flex items-center space-x-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Date *</span>
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={handleDateChange}
                className="input"
              />
            </div>

            <div className="form-group">
              <label className="form-label flex items-center space-x-2">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Summary *</span>
              </label>
              <input
                type="text"
                required
                value={formData.summary}
                onChange={handleSummaryChange}
                placeholder="Brief summary of the interaction"
                className="input"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="form-group">
            <label className="form-label">Detailed Notes</label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={handleNotesChange}
              placeholder="Add detailed notes about the conversation, outcomes, next steps, etc..."
              className="input min-h-[120px] resize-none"
            />
            <p className="form-help">
              Include key discussion points, decisions made, or follow-up actions needed
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>{interaction ? 'Update' : 'Save'} Interaction</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}