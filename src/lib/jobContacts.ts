// src/lib/jobContacts.ts
import { supabase } from './supabase'

export interface JobContact {
  id: string
  job_id: string
  contact_id: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface LinkedJob {
  id: string
  job_title: string
  company: string
  status: string
  location: string | null
}

export async function linkJobToContact(jobId: string, contactId: string): Promise<JobContact | null> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return null
    }

    const { data, error } = await supabase
      .from('job_contacts')
      .insert([{
        job_id: jobId,
        contact_id: contactId,
        user_id: user.id
      }])
      .select()
      .single()

    if (error) {
      console.error('Error linking job to contact:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Exception in linkJobToContact:', error)
    return null
  }
}

export async function unlinkJobFromContact(jobId: string, contactId: string): Promise<boolean> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return false
    }

    const { error } = await supabase
      .from('job_contacts')
      .delete()
      .eq('job_id', jobId)
      .eq('contact_id', contactId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error unlinking job from contact:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Exception in unlinkJobFromContact:', error)
    return false
  }
}

export async function getJobContacts(jobId: string) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return []
    }

    const { data, error } = await supabase
      .from('job_contacts')
      .select(`
        id,
        contacts (
          id,
          name,
          email,
          phone,
          company,
          job_title
        )
      `)
      .eq('job_id', jobId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error fetching job contacts:', error)
      return []
    }

    return data?.map(item => item.contacts) || []
  } catch (error) {
    console.error('Exception in getJobContacts:', error)
    return []
  }
}

export async function getContactJobs(contactId: string) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return []
    }

    const { data, error } = await supabase
      .from('job_contacts')
      .select(`
        id,
        jobs (
          id,
          job_title,
          company,
          status,
          location
        )
      `)
      .eq('contact_id', contactId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error fetching contact jobs:', error)
      return []
    }

    return data?.map(item => item.jobs) || []
  } catch (error) {
    console.error('Exception in getContactJobs:', error)
    return []
  }
}

/**
 * Batch fetch jobs linked to multiple contacts to avoid N+1 queries.
 * Returns a map: contact_id -> LinkedJob[]
 */
export async function getJobsForContacts(
  contactIds: string[]
): Promise<Record<string, LinkedJob[]>> {
  try {
    if (!contactIds || contactIds.length === 0) {
      return {}
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return {}
    }

    // Fetch all links for the provided contacts in a single query
    const { data, error } = await supabase
      .from('job_contacts')
      .select(`
        contact_id,
        jobs (
          id,
          job_title,
          company,
          status,
          location
        )
      `)
      .in('contact_id', contactIds)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error fetching jobs for contacts:', error)
      return {}
    }

    const map: Record<string, LinkedJob[]> = {}
    for (const row of data || []) {
      const cid = (row as any).contact_id as string
      const job = (row as any).jobs as LinkedJob
      if (!cid || !job) continue
      if (!map[cid]) map[cid] = []
      map[cid].push(job)
    }

    return map
  } catch (error) {
    console.error('Exception in getJobsForContacts:', error)
    return {}
  }
}
