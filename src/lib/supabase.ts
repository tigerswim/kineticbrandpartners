// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export interface Job {
  id: string
  job_title: string
  company: string
  location?: string
  salary?: string
  notes?: string
  status: 'interested' | 'applied' | 'interviewing' | 'onhold' | 'offered' | 'rejected'
  applied_date?: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  job_title?: string
  linkedin_url?: string
  notes?: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface Interaction {
  id: string
  contact_id: string
  type: 'email' | 'phone' | 'video_call' | 'linkedin' | 'meeting' | 'other'
  date: string
  notes?: string
  summary: string   // FIXED: Added required summary field
  user_id: string
  created_at: string
  updated_at: string
}

export const supabase = createClient(supabaseUrl, supabaseKey)