// src/lib/csvUtils.ts
import { Job, Contact, Interaction } from './supabase'
import { fetchJobs } from './jobs'
import { getContacts } from './contacts'
import { getInteractions } from './interactions'

// CSV Download Functions
export async function downloadJobsCSV() {
  const jobs = await fetchJobs()
  const csvContent = convertToCSV(jobs, [
    'id', 'job_title', 'company', 'location', 'salary', 'status', 'applied_date', 'notes'
  ])
  downloadCSV(csvContent, 'jobs.csv')
}

export async function downloadContactsCSV() {
  const contacts = await getContacts()
  const csvContent = convertToCSV(contacts, [
    'id', 'name', 'email', 'phone', 'company', 'job_title', 'linkedin_url', 'notes'
  ])
  downloadCSV(csvContent, 'contacts.csv')
}

export async function downloadInteractionsCSV() {
  const interactions = await getInteractions()
  const csvContent = convertToCSV(interactions, [
    'id', 'contact_id', 'type', 'date', 'summary', 'notes' // UPDATED: Added summary field
  ])
  downloadCSV(csvContent, 'interactions.csv')
}

// CSV Upload Functions
export function parseCSV(csvText: string): any[] {
  const lines = csvText.split('\n').filter(line => line.trim())
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  const data = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length === headers.length) {
      const row: any = {}
      headers.forEach((header, index) => {
        row[header] = values[index]
      })
      data.push(row)
    }
  }

  return data
}

// Helper Functions
function convertToCSV(data: any[], fields: string[]): string {
  if (data.length === 0) return ''

  const headers = fields.join(',')
  const rows = data.map(item => {
    return fields.map(field => {
      const value = item[field] || ''
      return `"${String(value).replace(/"/g, '""')}"`
    }).join(',')
  })

  return [headers, ...rows].join('\n')
}

function parseCSVLine(line: string): string[] {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current.trim())
  return result
}

function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}