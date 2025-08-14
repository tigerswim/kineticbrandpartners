// src/components/InteractionList.tsx
'use client'
import { useState, useEffect } from 'react'
import { Interaction } from '@/lib/supabase'
import { getInteractions, deleteInteraction } from '@/lib/interactions'
import { 
  Plus, 
  Mail, 
  Phone, 
  Video, 
  Linkedin, 
  Calendar, 
  MessageSquare,
  Edit,
  Trash2,
  Clock
} from 'lucide-react'
import InteractionForm from './InteractionForm'

interface InteractionListProps {
  contactId: string
}

const getInteractionTypeConfig = (type: string) => {
  switch (type) {
    case 'email':
      return { 
        icon: Mail, 
        bg: 'bg-blue-50', 
        text: 'text-blue-700', 
        border: 'border-blue-200',
        dot: 'bg-blue-500'
      }
    case 'phone':
      return { 
        icon: Phone, 
        bg: 'bg-green-50', 
        text: 'text-green-700', 
        border: 'border-green-200',
        dot: 'bg-green-500'
      }
    case 'video_call':
      return { 
        icon: Video, 
        bg: 'bg-purple-50', 
        text: 'text-purple-700', 
        border: 'border-purple-200',
        dot: 'bg-purple-500'
      }
    case 'linkedin':
      return { 
        icon: Linkedin, 
        bg: 'bg-blue-50', 
        text: 'text-blue-700', 
        border: 'border-blue-200',
        dot: 'bg-blue-600'
      }
    case 'meeting':
      return { 
        icon: Calendar, 
        bg: 'bg-orange-50', 
        text: 'text-orange-700', 
        border: 'border-orange-200',
        dot: 'bg-orange-500'
      }
    case 'other':
      return { 
        icon: MessageSquare, 
        bg: 'bg-slate-50', 
        text: 'text-slate-700', 
        border: 'border-slate-200',
        dot: 'bg-slate-500'
      }
    default:
      return { 
        icon: MessageSquare, 
        bg: 'bg-slate-50', 
        text: 'text-slate-700', 
        border: 'border-slate-200',
        dot: 'bg-slate-500'
      }
  }
}

const getInteractionTypeLabel = (type: string) => {
  switch (type) {
    case 'video_call':
      return 'Video Call'
    case 'linkedin':
      return 'LinkedIn'
    default:
      return type.charAt(0).toUpperCase() + type.slice(1)
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    })
  }
}

export default function InteractionList({ contactId }: InteractionListProps) {
  const [interactions, setInteractions] = useState<Interaction[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingInteraction, setEditingInteraction] = useState<Interaction | null>(null)

  useEffect(() => {
    loadInteractions()
  }, [contactId])

  const loadInteractions = async () => {
    setLoading(true)
    const data = await getInteractions(contactId)
    // Sort by date, most recent first
    const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setInteractions(sortedData)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this interaction?')) {
      const success = await deleteInteraction(id)
      if (success) {
        loadInteractions()
      }
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingInteraction(null)
    loadInteractions()
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-slate-200 rounded w-24"></div>
          <div className="h-8 bg-slate-200 rounded w-32"></div>
        </div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-slate-50 p-4 rounded-lg animate-pulse">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-20"></div>
              <div className="h-4 bg-slate-200 rounded w-16"></div>
            </div>
            <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (showForm) {
    return (
      <InteractionForm
        contactId={contactId}
        interaction={editingInteraction || undefined}
        onSuccess={handleFormSuccess}
        onCancel={() => {
          setShowForm(false)
          setEditingInteraction(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h4 className="font-semibold text-slate-800">Recent Activity</h4>
          <div className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
            {interactions.length}
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {interactions.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-500 text-sm mb-4">No interactions recorded yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary text-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add First Interaction
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {interactions.map((interaction, index) => {
            const config = getInteractionTypeConfig(interaction.type)
            const Icon = config.icon
            
            return (
              <div 
                key={interaction.id} 
                className={`${config.bg} border ${config.border} p-4 rounded-lg transition-all duration-200 hover:shadow-sm animate-slide-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {/* Header with type and date */}
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-1.5 ${config.bg} border ${config.border} rounded-lg`}>
                        <Icon className={`w-4 h-4 ${config.text}`} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-semibold ${config.text} capitalize`}>
                          {getInteractionTypeLabel(interaction.type)}
                        </span>
                        <div className={`w-1 h-1 rounded-full ${config.dot}`}></div>
                        <div className="flex items-center space-x-1 text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{formatDate(interaction.date)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <h5 className="font-semibold text-slate-800 mb-1">{interaction.summary}</h5>
                    
                    {/* Notes */}
                    {interaction.notes && (
                      <p className="text-sm text-slate-700 leading-relaxed">{interaction.notes}</p>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-1 ml-4">
                    <button
                      onClick={() => {
                        setEditingInteraction(interaction)
                        setShowForm(true)
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Edit interaction"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(interaction.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete interaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}