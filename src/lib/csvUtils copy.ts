// src/lib/csvUtils.ts - Enhanced with flattened fields
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

// Enhanced CSV Download Functions with Flattened Fields
export async function downloadJobsCSV() {
  const jobs = await fetchJobs()
  const csvContent = convertToCSV(jobs, [
    'id', 'job_title', 'company', 'location', 'salary', 'job_url', 'status', 'applied_date', 'job_description', 'notes'
  ])
  downloadCSV(csvContent, 'jobs.csv')
}

export async function downloadContactsCSV() {
  const contacts = await getContacts()
  
  // Find the maximum number of experiences, education entries, and mutual connections
  const maxExperiences = Math.max(...contacts.map(c => c.experience?.length || 0), 0)
  const maxEducation = Math.max(...contacts.map(c => c.education?.length || 0), 0)
  const maxMutualConnections = Math.max(...contacts.map(c => c.mutual_connections?.length || 0), 0)
  
  // Create base fields
  const baseFields = [
    'id', 'name', 'email', 'phone', 'company', 'job_title', 'linkedin_url', 'notes'
  ]
  
  // Add flattened experience fields
  const experienceFields: string[] = []
  for (let i = 0; i < maxExperiences; i++) {
    experienceFields.push(
      `experience_${i + 1}_company`,
      `experience_${i + 1}_title`,
      `experience_${i + 1}_start_date`,
      `experience_${i + 1}_end_date`,
      `experience_${i + 1}_is_current`,
      `experience_${i + 1}_description`
    )
  }
  
  // Add flattened education fields
  const educationFields: string[] = []
  for (let i = 0; i < maxEducation; i++) {
    educationFields.push(
      `education_${i + 1}_institution`,
      `education_${i + 1}_degree_and_field`,
      `education_${i + 1}_year`,
      `education_${i + 1}_notes`
    )
  }
  
  // Add flattened mutual connection fields
  const mutualConnectionFields: string[] = []
  for (let i = 0; i < maxMutualConnections; i++) {
    mutualConnectionFields.push(`mutual_connection_${i + 1}`)
  }
  
  const allFields = [...baseFields, ...experienceFields, ...educationFields, ...mutualConnectionFields]
  
  // Transform contacts to include flattened fields
  const flattenedContacts = contacts.map(contact => {
    const flattened: any = { ...contact }
    
    // Flatten experiences
    if (contact.experience) {
      contact.experience.forEach((exp, index) => {
        flattened[`experience_${index + 1}_company`] = exp.company
        flattened[`experience_${index + 1}_title`] = exp.title
        flattened[`experience_${index + 1}_start_date`] = exp.start_date
        flattened[`experience_${index + 1}_end_date`] = exp.end_date || ''
        flattened[`experience_${index + 1}_is_current`] = exp.is_current
        flattened[`experience_${index + 1}_description`] = exp.description || ''
      })
    }
    
    // Flatten education
    if (contact.education) {
      contact.education.forEach((edu, index) => {
        flattened[`education_${index + 1}_institution`] = edu.institution
        flattened[`education_${index + 1}_degree_and_field`] = edu.degree_and_field
        flattened[`education_${index + 1}_year`] = edu.year
        flattened[`education_${index + 1}_notes`] = edu.notes || ''
      })
    }
    
    // Flatten mutual connections
    if (contact.mutual_connections) {
      contact.mutual_connections.forEach((conn, index) => {
        flattened[`mutual_connection_${index + 1}`] = conn
      })
    }
    
    return flattened
  })
  
  const csvContent = convertToCSV(flattenedContacts, allFields)
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
export function parseCSVForDataType(csvText: string, dataType: 'jobs' | 'contacts' | 'interactions'): any[] {
  // Remove BOM character if present
  const cleanedCsvText = csvText.replace(/^\uFEFF/, '');
  
  const lines = cleanedCsvText.split('\n').filter(line => line.trim())
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  const data = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length === headers.length) {
      let row: any = {}
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
      
      // For contacts, reconstruct complex fields from flattened data
      if (dataType === 'contacts') {
        row = reconstructContactFromFlattenedData(row, headers)
      }
      
      data.push(row)
    }
  }

  return data
}

// Helper function to reconstruct contact from flattened CSV data
function reconstructContactFromFlattenedData(row: any, headers: string[]) {
  const contact: any = { ...row }
  
  // Reconstruct experiences
  const experienceHeaders = headers.filter(h => h.startsWith('experience_'))
  const experienceNumbers = [...new Set(experienceHeaders.map(h => h.split('_')[1]))]
  
  if (experienceNumbers.length > 0) {
    contact.experience = experienceNumbers.map(num => {
      const exp: any = {
        id: `temp-${Date.now()}-${num}`,
        company: row[`experience_${num}_company`] || '',
        title: row[`experience_${num}_title`] || '',
        start_date: row[`experience_${num}_start_date`] || '',
        end_date: row[`experience_${num}_end_date`] || '',
        is_current: row[`experience_${num}_is_current`] === 'true' || row[`experience_${num}_is_current`] === true,
        description: row[`experience_${num}_description`] || ''
      }
      
      // Remove empty experiences
      if (exp.company || exp.title) {
        return exp
      }
      return null
    }).filter(Boolean)
    
    // Clean up flattened fields
    experienceHeaders.forEach(header => delete contact[header])
  }
  
  // Reconstruct education
  const educationHeaders = headers.filter(h => h.startsWith('education_'))
  const educationNumbers = [...new Set(educationHeaders.map(h => h.split('_')[1]))]
  
  if (educationNumbers.length > 0) {
    contact.education = educationNumbers.map(num => {
      const edu: any = {
        id: `temp-${Date.now()}-${num}`,
        institution: row[`education_${num}_institution`] || '',
        degree_and_field: row[`education_${num}_degree_and_field`] || '',
        year: row[`education_${num}_year`] || '',
        notes: row[`education_${num}_notes`] || ''
      }
      
      // Remove empty education entries
      if (edu.institution || edu.degree_and_field) {
        return edu
      }
      return null
    }).filter(Boolean)
    
    // Clean up flattened fields
    educationHeaders.forEach(header => delete contact[header])
  }
  
  // Reconstruct mutual connections
  const mutualConnectionHeaders = headers.filter(h => h.startsWith('mutual_connection_'))
  if (mutualConnectionHeaders.length > 0) {
    contact.mutual_connections = mutualConnectionHeaders
      .map(header => row[header])
      .filter(conn => conn && conn.trim() !== '')
    
    // Clean up flattened fields
    mutualConnectionHeaders.forEach(header => delete contact[header])
  }
  
  return contact
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