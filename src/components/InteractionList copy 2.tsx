// src/components/InteractionList.tsx - Optimized version
'use client'
import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { Interaction } from '@/lib/supabase'
import { getInteractions, deleteInteraction, clearInteractionsCache } from '@/lib/interactions'
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

// Memoized constants to prevent recreation on every render
const INTERACTION_TYPE_CONFIG = {
  email: { 
    icon: Mail, 
    bg: 'bg-blue-50', 
    text: 'text-blue-700', 
    border: 'border-blue-200',
    dot: 'bg-blue-500'
  },
  phone: { 
    icon: Phone, 
    bg: 'bg-green-50', 
    text: 'text-green-700', 
    border: 'border-green-200',
    dot: 'bg-green-500'
  },
  video_call: { 
    icon: Video, 
    bg: 'bg-purple-50', 
    text: 'text-purple-700', 
    border: 'border-purple-200',
    dot: 'bg-purple-500'
  },
  linkedin: { 
    icon: Linkedin, 
    bg: 'bg-blue-50', 
    text: 'text-blue-700', 
    border: 'border-blue-200',
    dot: 'bg-blue-600'
  },
  meeting: { 
    icon: Calendar, 
    bg: 'bg-orange-50', 
    text: 'text-orange-700', 
    border: 'border-orange-200',
    dot: 'bg-orange-500'
  },
  other: { 
    icon: MessageSquare, 
    bg: 'bg-slate-50', 
    text: 'text-slate-700', 
    border: 'border-slate-200',
    dot: 'bg-slate-500'
  }
} as const

const INTERACTION_TYPE_LABELS = {
  video_call: 'Video Call',
  linkedin: 'LinkedIn',
  email: 'Email',
  phone: 'Phone',
  meeting: 'Meeting',
  other: 'Other'
} as const

// Memoized utility functions
const getInteractionTypeConfig = (type: string) => {
  return INTERACTION_TYPE_CONFIG[type as keyof typeof INTERACTION_TYPE_CONFIG] || INTERACTION_TYPE_CONFIG.other
}

const getInteractionTypeLabel = (type: string) => {
  return INTERACTION_TYPE_LABELS[type as keyof typeof INTERACTION_TYPE_LABELS] || 
    (type.charAt(0).toUpperCase() + type.slice(1))
}

// Memoized date formatter with caching
const dateFormatCache = new Map<string, string>()

const formatDate = (dateString: string): string => {
  if (dateFormatCache.has(dateString)) {
    return dateFormatCache.get(dateString)!
  }

  // Fix: Parse the date as local date instead of UTC
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day) // month is 0-indexed
  
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  let formatted: string
  if (date.toDateString() === today.toDateString()) {
    formatted = 'Today'
  } else if (date.toDateString() === yesterday.toDateString()) {
    formatted = 'Yesterday'  
  } else {
    formatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    })
  }
  
  dateFormatCache.set(dateString, formatted)
  return formatted
}


// Memoized individual interaction item component
const InteractionItem = memo(({ 
  interaction, 
  index, 
  onEdit, 
  onDelete 
}: {
  interaction: Interaction
  index: number
  onEdit: (interaction: Interaction) => void
  onDelete: (id: string) => void
}) => {
  const config = useMemo(() => getInteractionTypeConfig(interaction.type), [interaction.type])
  const typeLabel = useMemo(() => getInteractionTypeLabel(interaction.type), [interaction.type])
  const formattedDate = useMemo(() => formatDate(interaction.date), [interaction.date])
  
  const Icon = config.icon

  const handleEdit = useCallback(() => {
    onEdit(interaction)
  }, [interaction, onEdit])

  const handleDelete = useCallback(() => {
    onDelete(interaction.id)
  }, [interaction.id, onDelete])

  return (
  <div 
    className={`${config.bg} border ${config.border} p-4 rounded-lg transition-all duration-200 hover:shadow-sm animate-slide-up relative`}
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
                {typeLabel}
              </span>
              <div className={`w-1 h-1 rounded-full ${config.dot}`}></div>
              <div className="flex items-center space-x-1 text-slate-500">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{formattedDate}</span>
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
        <div className="flex space-x-1 ml-4 flex-shrink-0">
          <button
            onClick={handleEdit}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="Edit interaction"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete interaction"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
})

InteractionItem.displayName = 'InteractionItem'

// Memoized loading skeleton
const LoadingSkeleton = memo(() => (
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
))

LoadingSkeleton.displayName = 'LoadingSkeleton'

// Memoized empty state
const EmptyState = memo(({ onAddInteraction }: { onAddInteraction: () => void }) => (
  <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200">
    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
      <MessageSquare className="w-6 h-6 text-slate-400" />
    </div>
    <p className="text-slate-500 text-sm mb-4">No interactions recorded yet</p>
    <button
      onClick={onAddInteraction}
      className="btn-primary text-sm"
    >
      <Plus className="w-4 h-4 mr-1" />
      Add First Interaction
    </button>
  </div>
))

EmptyState.displayName = 'EmptyState'

export default function InteractionList({ contactId }: InteractionListProps) {
  const [interactions, setInteractions] = useState<Interaction[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingInteraction, setEditingInteraction] = useState<Interaction | null>(null)

  // Memoized sorted interactions to prevent re-sorting on every render
  const sortedInteractions = useMemo(() => {
    return [...interactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [interactions])

  // Optimized load function with better error handling
  const loadInteractions = useCallback(async () => {
    if (!contactId) return
    
    setLoading(true)
    try {
      const data = await getInteractions(contactId)
      setInteractions(data)
    } catch (error) {
      console.error('Error loading interactions:', error)
      // Don't show empty state on error, keep existing data
    } finally {
      setLoading(false)
    }
  }, [contactId])

  // Load interactions when contactId changes
  useEffect(() => {
    loadInteractions()
  }, [loadInteractions])

  // Memoized callbacks to prevent child re-renders
  const handleDelete = useCallback(async (id: string) => {
    if (confirm('Are you sure you want to delete this interaction?')) {
      const success = await deleteInteraction(id)
      if (success) {
        // Optimistic update - remove from local state immediately
        setInteractions(prev => prev.filter(interaction => interaction.id !== id))
      }
    }
  }, [])

  const handleFormSuccess = useCallback(() => {
    setShowForm(false)
    setEditingInteraction(null)
    loadInteractions()
  }, [loadInteractions])

  const handleShowForm = useCallback(() => {
    setShowForm(true)
  }, [])

  const handleCancel = useCallback(() => {
    setShowForm(false)
    setEditingInteraction(null)
  }, [])

  const handleEdit = useCallback((interaction: Interaction) => {
    setEditingInteraction(interaction)
    setShowForm(true)
  }, [])

  // Early returns for different states
  if (loading) {
    return <LoadingSkeleton />
  }

  if (showForm) {
    return (
      <InteractionForm
        contactId={contactId}
        interaction={editingInteraction || undefined}
        onSuccess={handleFormSuccess}
        onCancel={handleCancel}
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Header - memoized to prevent re-renders */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h4 className="font-semibold text-slate-800">Recent Activity</h4>
          <div className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
            {interactions.length}
          </div>
        </div>
        <button
          onClick={handleShowForm}
          className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Content */}
      {sortedInteractions.length === 0 ? (
        <EmptyState onAddInteraction={handleShowForm} />
      ) : (
        <div className="space-y-3">
          {sortedInteractions.map((interaction, index) => (
            <InteractionItem
              key={interaction.id}
              interaction={interaction}
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}