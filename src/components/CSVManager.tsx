// src/components/CSVManager.tsx
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { downloadJobsCSV, downloadContactsCSV, downloadInteractionsCSV, parseCSV } from '@/lib/csvUtils'
import { 
  Download, 
  Upload, 
  FileText, 
  Users, 
  Briefcase, 
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react'

export default function CSVManager() {
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadResults, setUploadResults] = useState<{[key: string]: {success: boolean, count: number, message: string}} | null>(null)

  const handleFileUpload = async (file: File, type: 'jobs' | 'contacts' | 'interactions') => {
    setUploading(type)
    setUploadResults(null)
    
    try {
      const text = await file.text()
      const data = parseCSV(text)
      
      if (data.length === 0) {
        setUploadResults({
          [type]: { success: false, count: 0, message: 'No valid data found in CSV file' }
        })
        return
      }

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        setUploadResults({
          [type]: { success: false, count: 0, message: 'No authenticated user found' }
        })
        return
      }

      // Clean and prepare data for upload
      const cleanedData = data.map(item => {
        // Remove id, created_at, updated_at fields for new records
        const { id, created_at, updated_at, ...cleanItem } = item
        
        // Add user_id to each record
        return {
          ...cleanItem,
          user_id: user.id
        }
      })

      // Upload to Supabase
      const { error } = await supabase
        .from(type)
        .upsert(cleanedData)

      if (error) {
        console.error(`Error uploading ${type}:`, error)
        setUploadResults({
          [type]: { success: false, count: 0, message: `Error uploading: ${error.message}` }
        })
      } else {
        setUploadResults({
          [type]: { success: true, count: cleanedData.length, message: `Successfully uploaded ${cleanedData.length} records` }
        })
      }
    } catch (error) {
      console.error(`Error processing ${type} CSV:`, error)
      setUploadResults({
        [type]: { success: false, count: 0, message: `Error processing CSV: ${error}` }
      })
    } finally {
      setUploading(null)
    }
  }

  const dataTypes = [
    {
      id: 'jobs',
      title: 'Job Applications',
      description: 'Your job applications and opportunities',
      icon: Briefcase,
      color: 'blue',
      downloadFn: downloadJobsCSV,
      fields: ['job_title', 'company', 'location', 'salary', 'status', 'applied_date', 'notes']
    },
    {
      id: 'contacts',
      title: 'Professional Contacts',
      description: 'Your network of professional contacts',
      icon: Users,
      color: 'green',
      downloadFn: downloadContactsCSV,
      fields: ['name', 'email', 'phone', 'company', 'job_title', 'linkedin_url', 'notes']
    },
    {
      id: 'interactions',
      title: 'Contact Interactions',
      description: 'Your communication history',
      icon: MessageCircle,
      color: 'purple',
      downloadFn: downloadInteractionsCSV,
      fields: ['contact_id', 'type (email/phone/video_call/linkedin/meeting/other)', 'date', 'summary', 'notes']
    }
  ]

  const getColorClasses = (color: string, variant: 'primary' | 'secondary' = 'primary') => {
    const colors = {
      blue: {
        primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
        secondary: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
      },
      green: {
        primary: 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800',
        secondary: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
      },
      purple: {
        primary: 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800',
        secondary: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
      }
    }
    return colors[color as keyof typeof colors][variant]
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-slate-800">Data Import & Export</h2>
      </div>

      {/* Upload Results */}
      {uploadResults && (
        <div className="space-y-2">
          {Object.entries(uploadResults).map(([type, result]) => (
            <div key={type} className={`p-4 rounded-lg border flex items-center space-x-3 ${
              result.success 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className="font-medium">{result.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Data Type Cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {dataTypes.map((dataType) => {
          const Icon = dataType.icon
          const isUploading = uploading === dataType.id
          
          return (
            <div key={dataType.id} className="card p-6">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(dataType.color, 'secondary')} border`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{dataType.title}</h3>
                  <p className="text-sm text-slate-600">{dataType.description}</p>
                </div>
              </div>

              {/* Export Section */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Export Data</h4>
                <button
                  onClick={dataType.downloadFn}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${getColorClasses(dataType.color)}`}
                >
                  <Download className="w-4 h-4" />
                  <span>Download CSV</span>
                </button>
              </div>

              {/* Import Section */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Import Data</h4>
                <div className="relative">
                  <input
                    type="file"
                    accept=".csv"
                    disabled={isUploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file, dataType.id as 'jobs' | 'contacts' | 'interactions')
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm border-2 border-dashed transition-all duration-200 ${
                    isUploading 
                      ? 'border-slate-300 bg-slate-50 text-slate-400 cursor-not-allowed'
                      : `${getColorClasses(dataType.color, 'secondary')} border-current hover:bg-opacity-80 cursor-pointer`
                  }`}>
                    {isUploading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Choose CSV File</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Field Requirements */}
              <div className="text-xs text-slate-500">
                <p className="font-medium mb-1">Expected fields:</p>
                <p className="leading-relaxed">{dataType.fields.join(', ')}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Instructions */}
      <div className="card p-6 bg-slate-50/50">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">CSV Format Guidelines</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div>
                <p className="font-medium text-slate-700 mb-1">Best Practices:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Export your current data first to see the expected format</li>
                  <li>Use UTF-8 encoding for your CSV files</li>
                  <li>Avoid special characters in field names</li>
                  <li>Test with a small file first to ensure compatibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}