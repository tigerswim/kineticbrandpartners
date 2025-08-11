// src/lib/jobs.ts - Simplified and optimized version
import { supabase, Job, Contact } from './supabase'

// Extended Job interface with contacts
export interface JobWithContacts extends Job {
  contacts: Contact[]
}

// Simplified function to fetch jobs with their contacts
export async function fetchJobsWithContacts(): Promise<JobWithContacts[]> {
  try {
    console.log('Starting fetchJobsWithContacts...')
    
    // Get current user first
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return []
    }

    console.log('User found, fetching jobs...')

    // Step 1: Fetch all jobs for the user (simple query first)
    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (jobsError) {
      console.error('Error fetching jobs:', jobsError)
      return []
    }

    if (!jobs || jobs.length === 0) {
      console.log('No jobs found for user')
      return []
    }

    console.log(`Found ${jobs.length} jobs, fetching contacts...`)

    // Step 2: Fetch all job_contacts relationships for these jobs
    const jobIds = jobs.map(job => job.id)
    const { data: jobContactsData, error: contactsError } = await supabase
      .from('job_contacts')
      .select(`
        job_id,
        contact_id,
        contacts (
          id,
          name,
          email,
          phone,
          company,
          job_title,
          linkedin_url,
          notes,
          experience,
          education,
          mutual_connections,
          created_at,
          updated_at
        )
      `)
      .in('job_id', jobIds)

    if (contactsError) {
      console.warn('Error fetching job contacts, continuing without contacts:', contactsError)
      // Return jobs without contacts rather than failing completely
      return jobs.map(job => ({ ...job, contacts: [] }))
    }

    console.log(`Found ${jobContactsData?.length || 0} job-contact relationships`)

    // Step 3: Group contacts by job_id
    const contactsByJobId: Record<string, Contact[]> = {}
    
    if (jobContactsData) {
      jobContactsData.forEach(item => {
        if (item.contacts) {
          if (!contactsByJobId[item.job_id]) {
            contactsByJobId[item.job_id] = []
          }
          contactsByJobId[item.job_id].push(item.contacts as Contact)
        }
      })
    }

    // Step 4: Combine jobs with their contacts
    const jobsWithContacts: JobWithContacts[] = jobs.map(job => ({
      ...job,
      contacts: contactsByJobId[job.id] || []
    }))

    console.log('Successfully fetched jobs with contacts')
    return jobsWithContacts

  } catch (error) {
    console.error('Error in fetchJobsWithContacts:', error)
    // Final fallback - return jobs without contacts
    try {
      const jobs = await fetchJobs()
      return jobs.map(job => ({ ...job, contacts: [] }))
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError)
      return []
    }
  }
}

// Cache implementation
const CACHE_DURATION = 2 * 60 * 1000 // 2 minutes (reduced from 5)
const jobsCache = new Map<string, { data: JobWithContacts[], timestamp: number }>()

export async function fetchJobsWithContactsCached(): Promise<JobWithContacts[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  
  const cacheKey = user.id
  const cached = jobsCache.get(cacheKey)
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log('Returning cached jobs data')
    return cached.data
  }
  
  console.log('Cache miss, fetching fresh data')
  const data = await fetchJobsWithContacts()
  
  if (data.length > 0) {
    jobsCache.set(cacheKey, { data, timestamp: Date.now() })
  }
  
  return data
}

// Clear cache function for when data is updated
export function clearJobsCache(userId?: string) {
  if (userId) {
    jobsCache.delete(userId)
  } else {
    jobsCache.clear()
  }
}

// Original simple function as fallback
export async function fetchJobs(): Promise<Job[]> {
  try {
    console.log('Fetching jobs (simple query)...')
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return []
    }

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching jobs:', error)
      return []
    }

    console.log(`Fetched ${data?.length || 0} jobs`)
    return data || []
  } catch (error) {
    console.error('Error in fetchJobs:', error)
    return []
  }
}

// Create job function with cache clearing
export async function createJob(jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job | null> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('No authenticated user:', userError)
      return null
    }

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

    // Clear cache after successful creation
    clearJobsCache(user.id)
    
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

    // Clear cache after successful update
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      clearJobsCache(user.id)
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

    // Clear cache after successful deletion
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      clearJobsCache(user.id)
    }

    return true
  } catch (error) {
    console.error('Exception in deleteJob:', error)
    return false
  }
}

// Optimized function to get job statistics
export async function getJobStats(): Promise<{
  total: number
  byStatus: Record<string, number>
  recentActivity: number
}> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return { total: 0, byStatus: {}, recentActivity: 0 }
    }

    // Use a more efficient query to get only what we need
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('status, created_at')
      .eq('user_id', user.id)

    if (error || !jobs) {
      console.error('Error getting job stats:', error)
      return { total: 0, byStatus: {}, recentActivity: 0 }
    }

    const total = jobs.length
    const byStatus: Record<string, number> = {}
    let recentActivity = 0
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    jobs.forEach(job => {
      byStatus[job.status] = (byStatus[job.status] || 0) + 1
      
      if (new Date(job.created_at) > oneWeekAgo) {
        recentActivity++
      }
    })

    return { total, byStatus, recentActivity }
  } catch (error) {
    console.error('Error getting job stats:', error)
    return { total: 0, byStatus: {}, recentActivity: 0 }
  }
}