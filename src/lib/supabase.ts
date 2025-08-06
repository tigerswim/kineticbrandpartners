// src/lib/supabase.ts - Updated Contact interface and types

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Contact {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  job_title?: string
  linkedin_url?: string
  notes?: string
  experience?: ExperienceEntry[]
  education?: EducationEntry[]
  mutual_connections?: string[]
  user_id: string
  created_at: string
  updated_at: string
}

export interface ExperienceEntry {
  id: string
  company: string
  title: string
  start_date: string // YYYY-MM format
  end_date?: string // YYYY-MM format or null for current
  is_current: boolean
  description?: string
}

export interface EducationEntry {
  id: string
  institution: string
  degree_and_field: string // e.g., "Bachelor's in Computer Science", "MBA"
  year: string // Can be graduation year or range like "2018-2022"
  notes?: string
}