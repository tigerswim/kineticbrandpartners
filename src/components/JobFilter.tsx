// src/components/JobFilter.tsx
'use client'

import { useState } from 'react'

interface JobFilterProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export default function JobFilter({ searchTerm, onSearchChange }: JobFilterProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value)
    onSearchChange(value)
  }

  const clearSearch = () => {
    setLocalSearchTerm('')
    onSearchChange('')
  }

  return (
    <div className="mb-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search jobs by company, title, or notes..."
          value={localSearchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {localSearchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
