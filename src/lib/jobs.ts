// src/lib/jobs.ts
import { supabase, Job } from './supabase'

export async function fetchJobs(): Promise<Job[]> {
  try {
    // Get current user first
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return []
    }

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('user_id', user.id)  // Filter by user_id
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching jobs:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in fetchJobs:', error)
    return []
  }
}

export async function createJob(jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job | null> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('No authenticated user:', userError)
      return null
    }

    // Ensure user_id is set
    const jobWithUser = {
      ...jobData,
      user_id: user.id
    }

    console.log('Creating job with data:', jobWithUser)

    const { data, error } = await supabase
      .from('jobs')
      .insert([jobWithUser])
      .select()
      .single()

    if (error) {
      console.error('Error creating job:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Exception in createJob:', error)
    return null
  }
}

export async function updateJob(id: string, jobData: Partial<Omit<Job, 'id' | 'created_at' | 'updated_at'>>): Promise<Job | null> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .update({ ...jobData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating job:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Exception in updateJob:', error)
    return null
  }
}

export async function deleteJob(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting job:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Exception in deleteJob:', error)
    return false
  }
}