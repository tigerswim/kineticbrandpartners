// src/lib/interactions.ts - Optimized with caching and batch operations
import { supabase, Interaction } from './supabase'

// Cache implementation for interactions
const CACHE_DURATION = 2 * 60 * 1000 // 2 minutes
const interactionsCache = new Map<string, { data: Interaction[], timestamp: number }>()

// Clear cache for a specific contact or all
export function clearInteractionsCache(contactId?: string) {
  if (contactId) {
    interactionsCache.delete(contactId)
  } else {
    interactionsCache.clear()
  }
}

// Optimized function to get interactions with caching
export async function getInteractions(contactId: string): Promise<Interaction[]> {
  if (!contactId) return []

  // Check cache first
  const cached = interactionsCache.get(contactId)
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log('Returning cached interactions for contact:', contactId)
    return cached.data
  }

  try {
    console.log('Fetching fresh interactions for contact:', contactId)
    
    // Use select with specific fields to reduce data transfer
    const { data, error } = await supabase
      .from('interactions')
      .select('id, type, date, summary, notes, contact_id, created_at, updated_at')
      .eq('contact_id', contactId)
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching interactions:', error)
      return []
    }

    const interactions = data || []
    
    // Cache the result
    interactionsCache.set(contactId, { 
      data: interactions, 
      timestamp: Date.now() 
    })

    return interactions
  } catch (error) {
    console.error('Exception in getInteractions:', error)
    return []
  }
}

// Optimized function to get interaction count (for badges)
export async function getInteractionCount(contactId: string): Promise<number> {
  if (!contactId) return 0

  try {
    // Use count query which is more efficient than fetching all data
    const { count, error } = await supabase
      .from('interactions')
      .select('*', { count: 'exact', head: true })
      .eq('contact_id', contactId)

    if (error) {
      console.error('Error getting interaction count:', error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error('Exception in getInteractionCount:', error)
    return 0
  }
}

// Batch function to get interaction counts for multiple contacts
export async function getInteractionCounts(contactIds: string[]): Promise<Record<string, number>> {
  if (!contactIds.length) return {}

  try {
    const { data, error } = await supabase
      .from('interactions')
      .select('contact_id')
      .in('contact_id', contactIds)

    if (error) {
      console.error('Error getting interaction counts:', error)
      return {}
    }

    // Count interactions per contact
    const counts: Record<string, number> = {}
    contactIds.forEach(id => counts[id] = 0) // Initialize all to 0

    if (data) {
      data.forEach(interaction => {
        counts[interaction.contact_id] = (counts[interaction.contact_id] || 0) + 1
      })
    }

    return counts
  } catch (error) {
    console.error('Exception in getInteractionCounts:', error)
    return {}
  }
}

export async function createInteraction(
  interactionData: Omit<Interaction, 'id' | 'created_at' | 'updated_at'>
): Promise<Interaction | null> {
  try {
    // Validate required fields
    if (!interactionData.contact_id || !interactionData.type || !interactionData.date || !interactionData.summary) {
      console.error('Missing required fields for interaction creation')
      return null
    }

    console.log('Creating interaction with data:', interactionData)

    const { data, error } = await supabase
      .from('interactions')
      .insert([interactionData])
      .select()
      .single()

    if (error) {
      console.error('Error creating interaction:', error)
      return null
    }

    // Clear cache for this contact after successful creation
    clearInteractionsCache(interactionData.contact_id)
    
    return data
  } catch (error) {
    console.error('Exception in createInteraction:', error)
    return null
  }
}

export async function updateInteraction(
  id: string, 
  interactionData: Partial<Omit<Interaction, 'id' | 'created_at' | 'updated_at'>>
): Promise<Interaction | null> {
  try {
    if (!id) {
      console.error('Missing interaction ID for update')
      return null
    }

    console.log('Updating interaction:', id, interactionData)

    const { data, error } = await supabase
      .from('interactions')
      .update({ 
        ...interactionData, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating interaction:', error)
      return null
    }

    // Clear cache for this contact after successful update
    if (data?.contact_id) {
      clearInteractionsCache(data.contact_id)
    }

    return data
  } catch (error) {
    console.error('Exception in updateInteraction:', error)
    return null
  }
}

export async function deleteInteraction(id: string): Promise<boolean> {
  try {
    if (!id) {
      console.error('Missing interaction ID for deletion')
      return false
    }

    // First get the contact_id for cache clearing
    const { data: interaction } = await supabase
      .from('interactions')
      .select('contact_id')
      .eq('id', id)
      .single()

    const { error } = await supabase
      .from('interactions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting interaction:', error)
      return false
    }

    // Clear cache for this contact after successful deletion
    if (interaction?.contact_id) {
      clearInteractionsCache(interaction.contact_id)
    }

    return true
  } catch (error) {
    console.error('Exception in deleteInteraction:', error)
    return false
  }
}

// Batch delete function for better performance when deleting multiple interactions
export async function deleteInteractions(ids: string[]): Promise<boolean> {
  if (!ids.length) return true

  try {
    // First get all contact_ids for cache clearing
    const { data: interactions } = await supabase
      .from('interactions')
      .select('contact_id')
      .in('id', ids)

    const { error } = await supabase
      .from('interactions')
      .delete()
      .in('id', ids)

    if (error) {
      console.error('Error deleting interactions:', error)
      return false
    }

    // Clear cache for all affected contacts
    if (interactions) {
      const contactIds = [...new Set(interactions.map(i => i.contact_id))]
      contactIds.forEach(contactId => {
        if (contactId) clearInteractionsCache(contactId)
      })
    }

    return true
  } catch (error) {
    console.error('Exception in deleteInteractions:', error)
    return false
  }
}

// Get recent interactions across all contacts (for dashboard)
export async function getRecentInteractions(limit: number = 10): Promise<Interaction[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    // Get interactions for user's contacts only
    const { data, error } = await supabase
      .from('interactions')
      .select(`
        *,
        contacts!inner (
          name,
          user_id
        )
      `)
      .eq('contacts.user_id', user.id)
      .order('date', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching recent interactions:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Exception in getRecentInteractions:', error)
    return []
  }
}

// Get interaction statistics for a contact
export async function getInteractionStats(contactId: string): Promise<{
  total: number
  byType: Record<string, number>
  lastInteraction?: string
}> {
  if (!contactId) return { total: 0, byType: {} }

  try {
    const interactions = await getInteractions(contactId)
    
    const stats = {
      total: interactions.length,
      byType: {} as Record<string, number>,
      lastInteraction: interactions[0]?.date
    }

    interactions.forEach(interaction => {
      stats.byType[interaction.type] = (stats.byType[interaction.type] || 0) + 1
    })

    return stats
  } catch (error) {
    console.error('Exception in getInteractionStats:', error)
    return { total: 0, byType: {} }
  }
}