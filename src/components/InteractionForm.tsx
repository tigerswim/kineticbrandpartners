// src/components/InteractionForm.tsx
'use client'
import { useState } from 'react'
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

const INTERACTION_TYPES = [
  { 
    value: 'email', 
    label: 'Email', 
    icon: Mail,
    description: 'Email conversation',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  { 
    value: 'phone', 
    label: 'Phone Call', 
    icon: Phone,
    description: 'Phone conversation',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200'
  },
  { 
    value: 'video_call', 
    label: 'Video Call', 
    icon: Video,
    description: 'Video meeting',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  { 
    value: 'linkedin', 
    label: 'LinkedIn Message', 
    icon: Linkedin,
    description: 'LinkedIn interaction',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-300'
  },
  { 
    value: 'meeting', 
    label: 'In-Person Meeting', 
    icon: Calendar,
    description: 'Face-to-face meeting',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200'
  },
  { 
    value: 'other', 
    label: 'Other', 
    icon: MessageSquare,
    description: 'Other interaction type',
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200'
  }
] as const

export default function InteractionForm({ contactId, interaction, onSuccess, onCancel }: InteractionFormProps) {
  const [formData, setFormData] = useState({
    type: interaction?.type || 'email' as const,
    date: interaction?.date || new Date().toISOString().split('T')[0],
    summary: interaction?.summary || '',
    notes: interaction?.notes || ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const selectedType = INTERACTION_TYPES.find(type => type.value === formData.type)

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white rounded-t-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              {selectedType && <selectedType.icon className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {interaction ? 'Edit Interaction' : 'New Interaction'}
              </h3>
              <p className="text-blue-100 text-sm">
                {interaction ? 'Update interaction details' : 'Record a new contact interaction'}
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

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Interaction Type Selection */}
          <div className="form-group">
            <label className="form-label">Interaction Type</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {INTERACTION_TYPES.map((type) => {
                const Icon = type.icon
                const isSelected = formData.type === type.value
                
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.value })}
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
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
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
                name="summary"
                required
                value={formData.summary}
                onChange={handleChange}
                placeholder="Brief summary of the interaction"
                className="input"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="form-group">
            <label className="form-label">Detailed Notes</label>
            <textarea
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
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
              disabled={loading}
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