// src/components/InteractionList.tsx - Fixed icon positioning, button size, and text sizing

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
const dateFormatCache = new Map()
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

// Memoized individual interaction item component - FIXED positioning and text sizing
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
    <div className={`card relative p-4 pt-12 ${config.bg} ${config.border} border-l-4 mb-3 group hover:shadow-md transition-all duration-200`}>
      {/* Action buttons - FIXED: positioned at top with proper spacing, always visible, smaller icons */}
      <div className="absolute top-3 right-3 flex gap-1">
        <button
          onClick={handleEdit}
          className="btn-ghost p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
          title="Edit interaction"
        >
          <Edit size={14} />
        </button>
        <button
          onClick={handleDelete}
          className="btn-ghost p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          title="Delete interaction"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Header with type and date - content pushed down from top */}
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${config.bg} ${config.border} border`}>
          <Icon size={16} className={config.text} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className={`font-medium text-sm ${config.text}`}>
              {typeLabel}
            </span>
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <Clock size={12} />
              {formattedDate}
            </div>
          </div>
        </div>
      </div>

      {/* Summary - FIXED: changed to text-xs to match contact card text */}
      <div className="mb-2">
        <p className="text-slate-800 font-medium text-xs line-clamp-2">
          {interaction.summary}
        </p>
      </div>

      {/* Notes - FIXED: changed to text-xs to match contact card text */}
      {interaction.notes && (
        <div className="text-slate-600 text-xs bg-white/60 rounded-lg p-3 border border-slate-200/60">
          <p className="line-clamp-3">{interaction.notes}</p>
        </div>
      )}
    </div>
  )
})

InteractionItem.displayName = 'InteractionItem'

// Memoized loading skeleton
const LoadingSkeleton = memo(() => (
  <div className="space-y-3">
    {[...Array(2)].map((_, i) => (
      <div key={i} className="card p-4 animate-pulse">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-slate-200 rounded-lg loading-skeleton"></div>
          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded loading-skeleton mb-1"></div>
            <div className="h-3 bg-slate-200 rounded loading-skeleton w-20"></div>
          </div>
        </div>
        <div className="h-4 bg-slate-200 rounded loading-skeleton mb-2"></div>
        <div className="h-16 bg-slate-200 rounded loading-skeleton"></div>
      </div>
    ))}
  </div>
))

LoadingSkeleton.displayName = 'LoadingSkeleton'

// Memoized empty state
const EmptyState = memo(({ onAddInteraction }: { onAddInteraction: () => void }) => (
  <div className="text-center py-12">
    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <MessageSquare size={32} className="text-slate-400" />
    </div>
    <p className="text-slate-500 mb-4">No interactions recorded yet</p>
    <button onClick={onAddInteraction} className="btn-primary">
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
        interaction={editingInteraction}
        onSuccess={handleFormSuccess}
        onCancel={handleCancel}
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Header - FIXED: made Add button more compact */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-800">Recent Activity</h3>
          <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
            {interactions.length}
          </span>
        </div>
        <button onClick={handleShowForm} className="btn-primary flex items-center gap-2 px-3 py-1.5 text-sm ml-6">
          <Plus size={14} />
          Add
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