// src/components/JobList.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Job } from '@/lib/supabase'
import { fetchJobs, deleteJob } from '@/lib/jobs'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Briefcase, 
  MapPin, 
  DollarSign,
  Edit,
  Trash2,
  X
} from 'lucide-react'
import JobForm from './JobForm'
import JobFilter from './JobFilter'
import JobStatusFilter from './JobStatusFilter'
import JobContactManager from './JobContactManager'
import JobContactLinks from './JobContactLinks'

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [managingContactsForJob, setManagingContactsForJob] = useState<string | null>(null)

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      setLoading(true)
      const data = await fetchJobs()
      setJobs(data || [])
    } catch (error) {
      console.error('Error loading jobs:', error)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        const success = await deleteJob(id)
        if (success) {
          loadJobs()
        }
      } catch (error) {
        console.error('Error deleting job:', error)
      }
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingJob(null)
  }

  const handleFormSaved = () => {
    loadJobs()
    setShowForm(false)
    setEditingJob(null)
  }

  const handleContactsUpdated = () => {
    loadJobs()
  }

  // Filter jobs based on search term and selected status
  const filteredJobs = useMemo(() => {
    let filtered = jobs

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(job =>
        job.company.toLowerCase().includes(term) ||
        job.job_title.toLowerCase().includes(term) ||
        (job.notes && job.notes.toLowerCase().includes(term))
      )
    }

    if (selectedStatus) {
      filtered = filtered.filter(job => job.status === selectedStatus)
    }

    return filtered
  }, [jobs, searchTerm, selectedStatus])

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'interested': 
        return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' }
      case 'applied': 
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' }
      case 'interviewing': 
        return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', dot: 'bg-blue-600' }
      case 'onhold': 
        return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300', dot: 'bg-slate-500' }
      case 'offered': 
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' }
      case 'rejected': 
        return { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200', dot: 'bg-slate-400' }
      default: 
        return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' }
    }
  }

  if (loading) {
    return (
      <div className="space-y-4 animate-fade-in">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-6">
            <div className="animate-pulse space-y-4">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-6 bg-slate-200 rounded w-48"></div>
                  <div className="h-5 bg-slate-200 rounded w-32"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-8 bg-slate-200 rounded w-20"></div>
                  <div className="h-8 bg-slate-200 rounded w-16"></div>
                </div>
              </div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-800">Job Applications</h2>
            <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              {jobs.length} total
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Job</span>
          </button>
        </div>

        {/* Status Filter Pills */}
        <JobStatusFilter
          jobs={jobs}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        {/* Search Filter */}
        <JobFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Results Summary */}
        {(searchTerm || selectedStatus) && (
          <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-lg">
            <Filter className="w-4 h-4" />
            <span>
              Showing {filteredJobs.length} of {jobs.length} jobs
              {searchTerm && <span className="font-medium"> matching "{searchTerm}"</span>}
              {selectedStatus && <span className="font-medium"> with status "{selectedStatus}"</span>}
            </span>
            {(searchTerm || selectedStatus) && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedStatus(null)
                }}
                className="ml-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Job Cards Grid */}
        {filteredJobs.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">
              {jobs.length === 0 ? "No jobs yet" : "No matching jobs"}
            </h3>
            <p className="text-slate-500 mb-6">
              {jobs.length === 0
                ? "Add your first job application to get started!"
                : "Try adjusting your filters or search terms."
              }
            </p>
            {jobs.length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Job
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredJobs.map((job, index) => {
              const statusConfig = getStatusConfig(job.status)
              return (
                <div 
                  key={job.id} 
                  className="card p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      {/* Job Title & Company */}
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-slate-800 mb-1">{job.job_title}</h3>
                        <p className="text-lg text-slate-600 font-medium">{job.company}</p>
                      </div>
                      
                      {/* Job Details Row */}
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        {job.location && (
                          <div className="flex items-center space-x-1 text-slate-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{job.location}</span>
                          </div>
                        )}
                        {job.salary && (
                          <div className="flex items-center space-x-1 text-slate-600">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-sm font-medium">{job.salary}</span>
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                          <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
                          <span className="text-sm font-medium capitalize">{job.status.replace('_', ' ')}</span>
                        </div>
                      </div>

                      {/* Linked Contacts */}
                      <div className="mb-3">
                        <JobContactLinks jobId={job.id} compact={true} />
                      </div>

                      {/* Notes */}
                      {job.notes && (
                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                          <p className="text-sm text-slate-700">{job.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 ml-6">
                      <button
                        onClick={() => setManagingContactsForJob(job.id)}
                        className="flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
                        title="Manage Contacts"
                      >
                        <Users className="w-4 h-4" />
                        <span>Contacts</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditingJob(job)
                          setShowForm(true)
                        }}
                        className="flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 hover:border-slate-300 transition-all duration-200"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(job.id)}
                        className="flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* JobForm Modal */}
      <JobForm
        isOpen={showForm}
        onClose={handleFormClose}
        onSaved={handleFormSaved}
        editingJob={editingJob}
      />

      {/* Job Contacts Manager Modal */}
      {managingContactsForJob && (
        <JobContactManager
          jobId={managingContactsForJob}
          onClose={() => {
            setManagingContactsForJob(null)
            handleContactsUpdated()
          }}
        />
      )}
    </>
  )
}