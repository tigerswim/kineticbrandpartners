// src/lib/csvUtils.ts
import { Job, Contact, Interaction } from './supabase'
import { fetchJobs } from './jobs'
import { getContacts } from './contacts'
import { getInteractions } from './interactions'

// Date field mappings for different data types
const DATE_FIELDS = {
  jobs: ['applied_date', 'created_at', 'updated_at'],
  contacts: ['created_at', 'updated_at'],
  interactions: ['date', 'created_at', 'updated_at']
}

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
    'id', 'contact_id', 'type', 'date', 'summary', 'notes'
  ])
  downloadCSV(csvContent, 'interactions.csv')
}

// Enhanced CSV Upload Functions with Date Conversion
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
        let value = values[index]
        
        // Check if this field is a date field and convert if necessary
        if (isDateField(header) && value && value.trim() !== '') {
          const convertedDate = convertDateToPostgreSQL(value.trim())
          if (convertedDate) {
            value = convertedDate
          } else {
            console.warn(`Invalid date format for field "${header}": "${value}". Skipping conversion.`)
          }
        }
        
        row[header] = value
      })
      data.push(row)
    }
  }

  return data
}

// Enhanced parseCSV with data type detection for better date conversion
export function parseCSVForDataType(csvText: string, dataType: 'jobs' | 'contacts' | 'interactions'): any[] {
  const lines = csvText.split('\n').filter(line => line.trim())
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  const data = []
  const dateFields = DATE_FIELDS[dataType] || []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length === headers.length) {
      const row: any = {}
      headers.forEach((header, index) => {
        let value = values[index]
        
        // Convert date fields for this specific data type
        if (dateFields.includes(header) && value && value.trim() !== '') {
          const convertedDate = convertDateToPostgreSQL(value.trim())
          if (convertedDate) {
            value = convertedDate
          } else {
            console.warn(`Invalid date format for field "${header}": "${value}". Skipping conversion.`)
          }
        }
        
        row[header] = value
      })
      data.push(row)
    }
  }

  return data
}

// Date Conversion Functions
function isDateField(fieldName: string): boolean {
  const commonDateFields = [
    'date', 'created_at', 'updated_at', 'applied_date', 'start_date', 'end_date',
    'birth_date', 'hire_date', 'termination_date', 'interview_date', 'offer_date',
    'deadline', 'due_date', 'schedule_date', 'follow_up_date'
  ]
  
  return commonDateFields.some(dateField => 
    fieldName.toLowerCase().includes(dateField.toLowerCase()) ||
    fieldName.toLowerCase().endsWith('_date') ||
    fieldName.toLowerCase().endsWith('_at') ||
    fieldName.toLowerCase() === 'date'
  )
}

function convertDateToPostgreSQL(dateString: string): string | null {
  if (!dateString || dateString.trim() === '') {
    return null
  }

  const trimmedDate = dateString.trim()
  
  // If already in PostgreSQL format (YYYY-MM-DD or YYYY-MM-DD HH:MM:SS), return as is
  if (/^\d{4}-\d{2}-\d{2}($|\s\d{2}:\d{2}:\d{2})/.test(trimmedDate)) {
    return trimmedDate
  }

  // Try to parse various date formats
  let parsedDate: Date | null = null
  
  // Common date patterns to try
  const datePatterns = [
    // MM/DD/YYYY formats
    {
      regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
      parser: (match: RegExpMatchArray) => new Date(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]))
    },
    // DD/MM/YYYY formats (European)
    {
      regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
      parser: (match: RegExpMatchArray) => {
        // Try DD/MM/YYYY if MM/DD/YYYY doesn't make sense
        const day = parseInt(match[1])
        const month = parseInt(match[2])
        if (day > 12 && month <= 12) {
          return new Date(parseInt(match[3]), month - 1, day)
        }
        return null
      }
    },
    // MM-DD-YYYY formats
    {
      regex: /^(\d{1,2})-(\d{1,2})-(\d{4})$/,
      parser: (match: RegExpMatchArray) => new Date(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]))
    },
    // DD-MM-YYYY formats
    {
      regex: /^(\d{1,2})-(\d{1,2})-(\d{4})$/,
      parser: (match: RegExpMatchArray) => {
        const day = parseInt(match[1])
        const month = parseInt(match[2])
        if (day > 12 && month <= 12) {
          return new Date(parseInt(match[3]), month - 1, day)
        }
        return null
      }
    },
    // YYYY/MM/DD formats
    {
      regex: /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/,
      parser: (match: RegExpMatchArray) => new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))
    },
    // MM.DD.YYYY formats
    {
      regex: /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/,
      parser: (match: RegExpMatchArray) => new Date(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]))
    },
    // YYYY-MM formats (month only)
    {
      regex: /^(\d{4})-(\d{1,2})$/,
      parser: (match: RegExpMatchArray) => new Date(parseInt(match[1]), parseInt(match[2]) - 1, 1)
    },
    // Month names formats like "Jan 2024", "January 2024"
    {
      regex: /^([A-Za-z]{3,9})\s+(\d{4})$/,
      parser: (match: RegExpMatchArray) => {
        const monthNames = [
          'january', 'february', 'march', 'april', 'may', 'june',
          'july', 'august', 'september', 'october', 'november', 'december'
        ]
        const shortMonthNames = [
          'jan', 'feb', 'mar', 'apr', 'may', 'jun',
          'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
        ]
        
        const monthStr = match[1].toLowerCase()
        let monthIndex = monthNames.indexOf(monthStr)
        if (monthIndex === -1) {
          monthIndex = shortMonthNames.indexOf(monthStr)
        }
        
        if (monthIndex !== -1) {
          return new Date(parseInt(match[2]), monthIndex, 1)
        }
        return null
      }
    },
    // ISO 8601 formats
    {
      regex: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?(?:Z|[+-]\d{2}:\d{2})?$/,
      parser: (match: RegExpMatchArray) => new Date(match[0])
    }
  ]

  // Try each pattern
  for (const pattern of datePatterns) {
    const match = trimmedDate.match(pattern.regex)
    if (match) {
      try {
        parsedDate = pattern.parser(match)
        if (parsedDate && !isNaN(parsedDate.getTime())) {
          break
        }
      } catch (e) {
        // Continue to next pattern
        continue
      }
    }
  }

  // If no pattern matched, try native Date parsing as last resort
  if (!parsedDate) {
    try {
      parsedDate = new Date(trimmedDate)
      if (isNaN(parsedDate.getTime())) {
        parsedDate = null
      }
    } catch (e) {
      parsedDate = null
    }
  }

  // Convert to PostgreSQL format (YYYY-MM-DD)
  if (parsedDate && !isNaN(parsedDate.getTime())) {
    const year = parsedDate.getFullYear()
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0')
    const day = parsedDate.getDate().toString().padStart(2, '0')
    
    // Validate the date makes sense
    if (year > 1900 && year < 2100 && month >= '01' && month <= '12' && day >= '01' && day <= '31') {
      return `${year}-${month}-${day}`
    }
  }

  return null
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

// Validation helper for date conversion results
export function validateDateConversions(data: any[], dataType: 'jobs' | 'contacts' | 'interactions'): {
  validCount: number
  invalidDates: Array<{row: number, field: string, originalValue: string}>
  totalRows: number
} {
  const dateFields = DATE_FIELDS[dataType] || []
  const invalidDates: Array<{row: number, field: string, originalValue: string}> = []
  let validCount = 0

  data.forEach((row, index) => {
    dateFields.forEach(field => {
      if (row[field]) {
        // Check if it's a valid PostgreSQL date format
        if (/^\d{4}-\d{2}-\d{2}($|\s\d{2}:\d{2}:\d{2})/.test(row[field])) {
          validCount++
        } else {
          invalidDates.push({
            row: index + 1,
            field: field,
            originalValue: row[field]
          })
        }
      }
    })
  })

  return {
    validCount,
    invalidDates,
    totalRows: data.length
  }
}