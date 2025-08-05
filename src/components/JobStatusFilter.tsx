// src/components/JobStatusFilter.tsx
'use client'

import { Job } from '@/lib/supabase'

interface JobStatusFilterProps {
  jobs: Job[]
  selectedStatus: string | null
  onStatusChange: (status: string | null) => void
}

const statusOptions = [
  { 
    id: 'interested', 
    title: 'Interested', 
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    hoverBg: 'hover:bg-slate-100',
    activeBg: 'bg-slate-600',
    activeText: 'text-white',
    dot: 'bg-slate-400'
  },
  { 
    id: 'applied', 
    title: 'Applied', 
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    hoverBg: 'hover:bg-blue-100',
    activeBg: 'bg-blue-600',
    activeText: 'text-white',
    dot: 'bg-blue-500'
  },
  { 
    id: 'interviewing', 
    title: 'Interviewing', 
    color: 'text-blue-700',
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    hoverBg: 'hover:bg-blue-200',
    activeBg: 'bg-blue-700',
    activeText: 'text-white',
    dot: 'bg-blue-600'
  },
  { 
    id: 'onhold', 
    title: 'On Hold', 
    color: 'text-slate-500',
    bg: 'bg-slate-100',
    border: 'border-slate-300',
    hoverBg: 'hover:bg-slate-200',
    activeBg: 'bg-slate-500',
    activeText: 'text-white',
    dot: 'bg-slate-500'
  },
  { 
    id: 'offered', 
    title: 'Offered', 
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    hoverBg: 'hover:bg-blue-100',
    activeBg: 'bg-blue-600',
    activeText: 'text-white',
    dot: 'bg-blue-500'
  },
  { 
    id: 'rejected', 
    title: 'Rejected', 
    color: 'text-slate-500',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    hoverBg: 'hover:bg-slate-100',
    activeBg: 'bg-slate-500',
    activeText: 'text-white',
    dot: 'bg-slate-400'
  }
]

export default function JobStatusFilter({ jobs, selectedStatus, onStatusChange }: JobStatusFilterProps) {
  const getStatusCount = (statusId: string) => {
    return jobs.filter(job => job.status === statusId).length
  }

  const totalJobs = jobs.length

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-slate-200/60">
      <div className="flex flex-wrap gap-2">
        {/* All Jobs Filter */}
        <button
          onClick={() => onStatusChange(null)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            selectedStatus === null
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform -translate-y-0.5'
              : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-current opacity-70"></div>
          <span>All Jobs</span>
          <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            selectedStatus === null 
              ? 'bg-white/20 text-white' 
              : 'bg-slate-200 text-slate-600'
          }`}>
            {totalJobs}
          </div>
        </button>

        {/* Status-specific filters */}
        {statusOptions.map((status) => {
          const count = getStatusCount(status.id)
          const isSelected = selectedStatus === status.id
          
          return (
            <button
              key={status.id}
              onClick={() => onStatusChange(status.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 border ${
                isSelected
                  ? `${status.activeBg} ${status.activeText} shadow-lg transform -translate-y-0.5 border-transparent`
                  : `${status.bg} ${status.color} ${status.border} ${status.hoverBg} hover:shadow-sm`
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                isSelected ? 'bg-white/70' : status.dot
              }`}></div>
              <span>{status.title}</span>
              <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                isSelected 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/60 text-current'
              }`}>
                {count}
              </div>
            </button>
          )
        })}
      </div>
      
      {/* Active Filters Indicator */}
      {selectedStatus && (
        <div className="mt-3 pt-3 border-t border-slate-200/60">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Active filter applied</span>
            <button
              onClick={() => onStatusChange(null)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filter
            </button>
          </div>
        </div>
      )}
    </div>
  )
}