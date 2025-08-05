// src/lib/interactions.ts
import { supabase, Interaction } from './supabase'

export async function getInteractions(contactId?: string): Promise<Interaction[]> {
  try {
    // Get current user first
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return []
    }

    let query = supabase
      .from('interactions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })

    if (contactId) {
      query = query.eq('contact_id', contactId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching interactions:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Exception in getInteractions:', error)
    return []
  }
}

export async function createInteraction(
  interaction: Omit<Interaction, 'id' | 'created_at' | 'updated_at' | 'user_id'>
): Promise<Interaction | null> {
  console.log('=== DEBUG: createInteraction started ===')
  console.log('Interaction data received:', interaction)
  
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('❌ User error:', userError)
      return null
    }

    if (!user) {
      console.error('❌ No authenticated user')
      return null
    }

    console.log('✅ User authenticated:', user.email)

    // Prepare insert data with ALL required fields including summary
    const insertData = {
      contact_id: interaction.contact_id,
      type: interaction.type,
      date: interaction.date,
      summary: interaction.summary, // FIXED: Include the summary field
      notes: interaction.notes || null,
      user_id: user.id
    }

    console.log('🔧 Prepared insert data:', insertData)

    // Validate required fields
    if (!insertData.contact_id || !insertData.type || !insertData.date || !insertData.summary) {
      console.error('❌ Missing required fields:', {
        contact_id: !!insertData.contact_id,
        type: !!insertData.type,
        date: !!insertData.date,
        summary: !!insertData.summary
      })
      return null
    }

    // Attempt insert with better error handling
    const { data, error } = await supabase
      .from('interactions')
      .insert([insertData])
      .select()
      .single()

    if (error) {
      console.error('❌ Insert failed:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
      
      // Check for common RLS policy issues
      if (error.message?.includes('policy') || error.code === '42501') {
        console.error('🚨 RLS Policy Issue: Check your Supabase RLS policies for interactions table')
      }
      
      return null
    }

    console.log('✅ Interaction created successfully:', data)
    return data

  } catch (exception) {
    console.error('❌ Exception in createInteraction:', exception)
    return null
  }
}

export async function updateInteraction(
  id: string, 
  interactionData: Partial<Omit<Interaction, 'id' | 'created_at' | 'updated_at' | 'user_id'>>
): Promise<Interaction | null> {
  try {
    // Get current user for security
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return null
    }

    const { data, error } = await supabase
      .from('interactions')
      .update({ 
        ...interactionData, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .eq('user_id', user.id) // FIXED: Ensure user can only update their own interactions
      .select()
      .single()

    if (error) {
      console.error('Error updating interaction:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Exception in updateInteraction:', error)
    return null
  }
}

export async function deleteInteraction(id: string): Promise<boolean> {
  try {
    // Get current user for security
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return false
    }

    const { error } = await supabase
      .from('interactions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id) // FIXED: Ensure user can only delete their own interactions

    if (error) {
      console.error('Error deleting interaction:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Exception in deleteInteraction:', error)
    return false
  }
}