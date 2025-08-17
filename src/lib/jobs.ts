// src/lib/jobs.ts - Fixed version with better error handling
import { supabase, Job, Contact } from './supabase'

// Extended Job interface with contacts
export interface JobWithContacts extends Job {
  contacts: Contact[]
}

// Helper function to safely log errors
function logError(message: string, error: any) {
  console.error(message)
  if (error) {
    if (error.message) console.error('Error message:', error.message)
    if (error.details) console.error('Error details:', error.details)
    if (error.hint) console.error('Error hint:', error.hint)
    if (error.code) console.error('Error code:', error.code)
    console.error('Full error:', JSON.stringify(error, null, 2))
  }
}

// Simplified function to fetch jobs with their contacts
export async function fetchJobsWithContacts(): Promise<JobWithContacts[]> {
  try {
    console.log('Starting fetchJobsWithContacts...')
    
    // Get current user first
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      logError('Error getting user:', userError)
      return []
    }

    if (!user) {
      console.log('No authenticated user found')
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
      logError('Error fetching jobs:', jobsError)
      throw new Error(`Failed to fetch jobs: ${jobsError.message || 'Unknown error'}`)
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
      logError('Error fetching job contacts, continuing without contacts:', contactsError)
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
    logError('Error in fetchJobsWithContacts:', error)
    
    // Final fallback - return jobs without contacts
    try {
      console.log('Attempting fallback to simple jobs fetch...')
      const jobs = await fetchJobs()
      return jobs.map(job => ({ ...job, contacts: [] }))
    } catch (fallbackError) {
      logError('Fallback also failed:', fallbackError)
      throw new Error('Failed to fetch jobs data')
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
    
    if (userError) {
      logError('Error getting user:', userError)
      throw new Error(`Authentication error: ${userError.message || 'Unknown error'}`)
    }

    if (!user) {
      console.log('No authenticated user found')
      return []
    }

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      logError('Error fetching jobs:', error)
      throw new Error(`Failed to fetch jobs: ${error.message || 'Unknown error'}`)
    }

    console.log(`Fetched ${data?.length || 0} jobs`)
    return data || []
  } catch (error) {
    logError('Error in fetchJobs:', error)
    throw error
  }
}

// Create job function with cache clearing
export async function createJob(jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job | null> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      logError('No authenticated user:', userError)
      return null
    }

    if (!user) {
      console.log('No authenticated user found')
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
      logError('Error creating job:', error)
      return null
    }

    // Clear cache after successful creation
    clearJobsCache(user.id)
    
    return data
  } catch (error) {
    logError('Exception in createJob:', error)
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
      logError('Error updating job:', error)
      return null
    }

    // Clear cache after successful update
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      clearJobsCache(user.id)
    }

    return data
  } catch (error) {
    logError('Exception in updateJob:', error)
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
      logError('Error deleting job:', error)
      return false
    }

    // Clear cache after successful deletion
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      clearJobsCache(user.id)
    }

    return true
  } catch (error) {
    logError('Exception in deleteJob:', error)
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
      logError('Error getting job stats:', error)
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
    logError('Error getting job stats:', error)
    return { total: 0, byStatus: {}, recentActivity: 0 }
  }
}