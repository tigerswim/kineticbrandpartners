// src/components/Reporting.tsx - Enhanced Data-Dense Version
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Contact, Interaction } from '@/lib/supabase'
import { getContacts } from '@/lib/contacts'
import { getInteractions } from '@/lib/interactions'
import { getContactJobs } from '@/lib/jobContacts'
import { 
  BarChart3, 
  Users, 
  MessageCircle, 
  Search, 
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Building,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  Video,
  Linkedin,
  User,
  Clock,
  Network,
  TrendingUp,
  Activity,
  UserPlus,
  MessageSquare,
  Target,
  Eye
} from 'lucide-react'

interface ContactWithJobs extends Contact {
  linkedJobsCount?: number
  linkedJobs?: any[]
  lastInteractionDate?: string
  interactionCount?: number
}

interface InteractionWithContact extends Interaction {
  contact?: Contact
}

interface InteractionStats {
  totalInteractions: number
  thisMonth: number
  lastMonth: number
  byType: { [key: string]: number }
  recentActivity: InteractionWithContact[]
}

interface ContactStats {
  totalContacts: number
  withJobs: number
  withMutualConnections: number
  topCompanies: { company: string; count: number }[]
  recentContacts: ContactWithJobs[]
}

type SortDirection = 'asc' | 'desc' | null
type ContactSortField = 'name' | 'company' | 'job_title' | 'mutual_connections_count' | 'linkedJobsCount' | 'lastInteraction'
type InteractionSortField = 'date' | 'contact_name' | 'type' | 'summary'

interface ContactModalProps {
  contact: Contact
  onClose: () => void
}

function ContactModal({ contact, onClose }: ContactModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{contact.name}</h2>
                <p className="text-blue-100 text-sm">Contact Details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="space-y-6">
            {/* Current Role */}
            {(contact.job_title || contact.company) && (
              <div>
                <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                  <Building className="w-4 h-4" />
                  <span>Current Role</span>
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="font-medium">
                    {contact.job_title && contact.company 
                      ? `${contact.job_title} at ${contact.company}`
                      : contact.job_title || contact.company
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div>
              <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                <Mail className="w-4 h-4" />
                <span>Contact Information</span>
              </h3>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                {contact.email && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {contact.linkedin_url && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Linkedin className="w-4 h-4 text-slate-400" />
                    <a 
                      href={contact.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Mutual Connections */}
            {contact.mutual_connections && contact.mutual_connections.length > 0 && (
              <div>
                <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                  <Network className="w-4 h-4" />
                  <span>Mutual Connections</span>
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {contact.mutual_connections.map((connection, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {connection}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {contact.notes && (
              <div>
                <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Notes</span>
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{contact.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface InteractionModalProps {
  interaction: InteractionWithContact
  onClose: () => void
}

function InteractionModal({ interaction, onClose }: InteractionModalProps) {
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail
      case 'phone': return Phone
      case 'video_call': return Video
      case 'linkedin': return Linkedin
      case 'meeting': return Calendar
      default: return MessageCircle
    }
  }

  const Icon = getInteractionIcon(interaction.type)

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Interaction Details</h2>
                <p className="text-green-100 text-sm">
                  {interaction.contact?.name} • {interaction.date}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Interaction Summary */}
            <div>
              <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                <MessageCircle className="w-4 h-4" />
                <span>Summary</span>
              </h3>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="font-medium text-slate-800">{interaction.summary}</p>
              </div>
            </div>

            {/* Interaction Details */}
            <div>
              <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                <Clock className="w-4 h-4" />
                <span>Details</span>
              </h3>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm capitalize">{interaction.type.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm">{new Date(interaction.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {interaction.notes && (
              <div>
                <h3 className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Notes</span>
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{interaction.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Stats Card Component
interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ComponentType<any>
  trend?: { value: number; isPositive: boolean }
  color: string
}

function StatsCard({ title, value, subtitle, icon: Icon, trend, color }: StatsCardProps) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <TrendingUp className={`w-3 h-3 ${trend.isPositive ? '' : 'rotate-180'}`} />
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <div className="text-sm font-medium text-slate-600">{title}</div>
        {subtitle && <div className="text-xs text-slate-500">{subtitle}</div>}
      </div>
    </div>
  )
}

// Quick Actions Component
function QuickActions() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm p-4">
      <h3 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
        <Target className="w-4 h-4" />
        <span>Quick Actions</span>
      </h3>
      <div className="space-y-2">
        <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
          Schedule follow-ups
        </button>
        <button className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
          Export contact list
        </button>
        <button className="w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors">
          Generate reports
        </button>
      </div>
    </div>
  )
}

export default function Reporting() {
  const [contacts, setContacts] = useState<ContactWithJobs[]>([])
  const [interactions, setInteractions] = useState<InteractionWithContact[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<'overview' | 'contacts' | 'interactions'>('overview')
  
  // Search and filter states
  const [contactSearch, setContactSearch] = useState('')
  const [interactionSearch, setInteractionSearch] = useState('')
  
  // Sort states
  const [contactSort, setContactSort] = useState<{ field: ContactSortField; direction: SortDirection }>({ field: 'name', direction: 'asc' })
  const [interactionSort, setInteractionSort] = useState<{ field: InteractionSortField; direction: SortDirection }>({ field: 'date', direction: 'desc' })
  
  // Modal states
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [selectedInteraction, setSelectedInteraction] = useState<InteractionWithContact | null>(null)

  // Stats
  const [contactStats, setContactStats] = useState<ContactStats | null>(null)
  const [interactionStats, setInteractionStats] = useState<InteractionStats | null>(null)

  useEffect(() => {
    loadReportingData()
  }, [])

  const loadReportingData = async () => {
    setLoading(true)
    try {
      const [contactsData, interactionsData] = await Promise.all([
        getContacts(),
        getInteractions()
      ])

      // Enhance contacts with job information and interaction data
      const enhancedContacts = await Promise.all(
        contactsData.map(async (contact) => {
          const linkedJobs = await getContactJobs(contact.id)
          const contactInteractions = interactionsData.filter(int => int.contact_id === contact.id)
          const lastInteraction = contactInteractions.length > 0 
            ? contactInteractions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
            : null

          return {
            ...contact,
            linkedJobs,
            linkedJobsCount: linkedJobs.length,
            lastInteractionDate: lastInteraction?.date,
            interactionCount: contactInteractions.length
          }
        })
      )

      // Enhance interactions with contact information
      const enhancedInteractions = interactionsData.map(interaction => {
        const contact = contactsData.find(c => c.id === interaction.contact_id)
        return {
          ...interaction,
          contact
        }
      })

      // Calculate stats
      const now = new Date()
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

      const thisMonthInteractions = enhancedInteractions.filter(int => 
        new Date(int.date) >= thisMonth
      ).length

      const lastMonthInteractions = enhancedInteractions.filter(int => 
        new Date(int.date) >= lastMonth && new Date(int.date) <= lastMonthEnd
      ).length

      const interactionsByType = enhancedInteractions.reduce((acc, int) => {
        acc[int.type] = (acc[int.type] || 0) + 1
        return acc
      }, {} as { [key: string]: number })

      const companyCounts = enhancedContacts.reduce((acc, contact) => {
        if (contact.company) {
          acc[contact.company] = (acc[contact.company] || 0) + 1
        }
        return acc
      }, {} as { [key: string]: number })

      const topCompanies = Object.entries(companyCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([company, count]) => ({ company, count }))

      setContactStats({
        totalContacts: enhancedContacts.length,
        withJobs: enhancedContacts.filter(c => (c.linkedJobsCount || 0) > 0).length,
        withMutualConnections: enhancedContacts.filter(c => c.mutual_connections && c.mutual_connections.length > 0).length,
        topCompanies,
        recentContacts: enhancedContacts
          .filter(c => c.created_at)
          .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
          .slice(0, 5)
      })

      setInteractionStats({
        totalInteractions: enhancedInteractions.length,
        thisMonth: thisMonthInteractions,
        lastMonth: lastMonthInteractions,
        byType: interactionsByType,
        recentActivity: enhancedInteractions
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 8)
      })

      setContacts(enhancedContacts)
      setInteractions(enhancedInteractions)
    } catch (error) {
      console.error('Error loading reporting data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Contact filtering and sorting
  const filteredAndSortedContacts = useMemo(() => {
    let filtered = contacts

    if (contactSearch.trim()) {
      const search = contactSearch.toLowerCase()
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(search) ||
        (contact.company && contact.company.toLowerCase().includes(search)) ||
        (contact.job_title && contact.job_title.toLowerCase().includes(search)) ||
        (contact.mutual_connections && contact.mutual_connections.some(conn => 
          conn.toLowerCase().includes(search)
        ))
      )
    }

    // Sort contacts
    if (contactSort.field && contactSort.direction) {
      filtered.sort((a, b) => {
        let aValue: any
        let bValue: any

        switch (contactSort.field) {
          case 'name':
            aValue = a.name.toLowerCase()
            bValue = b.name.toLowerCase()
            break
          case 'company':
            aValue = (a.company || '').toLowerCase()
            bValue = (b.company || '').toLowerCase()
            break
          case 'job_title':
            aValue = (a.job_title || '').toLowerCase()
            bValue = (b.job_title || '').toLowerCase()
            break
          case 'mutual_connections_count':
            aValue = a.mutual_connections?.length || 0
            bValue = b.mutual_connections?.length || 0
            break
          case 'linkedJobsCount':
            aValue = a.linkedJobsCount || 0
            bValue = b.linkedJobsCount || 0
            break
          case 'lastInteraction':
            aValue = a.lastInteractionDate ? new Date(a.lastInteractionDate) : new Date(0)
            bValue = b.lastInteractionDate ? new Date(b.lastInteractionDate) : new Date(0)
            break
          default:
            return 0
        }

        if (aValue < bValue) return contactSort.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return contactSort.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [contacts, contactSearch, contactSort])

  // Interaction filtering and sorting
  const filteredAndSortedInteractions = useMemo(() => {
    let filtered = interactions

    if (interactionSearch.trim()) {
      const search = interactionSearch.toLowerCase()
      filtered = filtered.filter(interaction =>
        (interaction.contact?.name || '').toLowerCase().includes(search) ||
        interaction.type.toLowerCase().includes(search) ||
        interaction.summary.toLowerCase().includes(search) ||
        (interaction.notes && interaction.notes.toLowerCase().includes(search))
      )
    }

    // Sort interactions
    if (interactionSort.field && interactionSort.direction) {
      filtered.sort((a, b) => {
        let aValue: any
        let bValue: any

        switch (interactionSort.field) {
          case 'date':
            aValue = new Date(a.date)
            bValue = new Date(b.date)
            break
          case 'contact_name':
            aValue = (a.contact?.name || '').toLowerCase()
            bValue = (b.contact?.name || '').toLowerCase()
            break
          case 'type':
            aValue = a.type.toLowerCase()
            bValue = b.type.toLowerCase()
            break
          case 'summary':
            aValue = a.summary.toLowerCase()
            bValue = b.summary.toLowerCase()
            break
          default:
            return 0
        }

        if (aValue < bValue) return interactionSort.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return interactionSort.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [interactions, interactionSearch, interactionSort])

  const handleContactSort = (field: ContactSortField) => {
    setContactSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleInteractionSort = (field: InteractionSortField) => {
    setInteractionSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const getSortIcon = (field: string, currentSort: { field: string; direction: SortDirection }) => {
    if (currentSort.field !== field) return <ArrowUpDown className="w-4 h-4" />
    return currentSort.direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />
      case 'phone': return <Phone className="w-4 h-4" />
      case 'video_call': return <Video className="w-4 h-4" />
      case 'linkedin': return <Linkedin className="w-4 h-4" />
      case 'meeting': return <Calendar className="w-4 h-4" />
      default: return <MessageCircle className="w-4 h-4" />
    }
  }

  const getInteractionTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-700'
      case 'phone': return 'bg-green-100 text-green-700'
      case 'video_call': return 'bg-purple-100 text-purple-700'
      case 'linkedin': return 'bg-blue-100 text-blue-800'
      case 'meeting': return 'bg-orange-100 text-orange-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-8 bg-slate-200 rounded-full animate-pulse"></div>
          <div className="h-8 bg-slate-200 rounded w-40 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
                <div className="w-16 h-6 bg-slate-200 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-8 bg-slate-200 rounded"></div>
                <div className="w-20 h-4 bg-slate-200 rounded"></div>
                <div className="w-16 h-3 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-800">Reports & Analytics</h2>
          </div>
          <button
            onClick={() => setActiveSection('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'overview' 
                ? 'bg-purple-100 text-purple-700' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Overview
          </button>
        </div>

        {/* Compact Section Navigation */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm">
          <div className="grid grid-cols-3 divide-x divide-slate-200/60">
            <button
              onClick={() => setActiveSection('overview')}
              className={`p-3 text-center transition-all duration-200 ${
                activeSection === 'overview'
                  ? 'bg-white/80 text-purple-700 font-medium'
                  : 'text-slate-600 hover:bg-white/40'
              } ${activeSection === 'overview' ? 'rounded-l-xl' : ''}`}
            >
              <div className="flex items-center justify-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Overview</span>
                <span className="hidden sm:inline text-xs text-slate-500">
                  ({contactStats?.totalContacts || 0} contacts, {interactionStats?.totalInteractions || 0} interactions)
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('contacts')}
              className={`p-3 text-center transition-all duration-200 ${
                activeSection === 'contacts'
                  ? 'bg-white/80 text-blue-700 font-medium'
                  : 'text-slate-600 hover:bg-white/40'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">Contacts</span>
                <span className="hidden sm:inline text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                  {filteredAndSortedContacts.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('interactions')}
              className={`p-3 text-center transition-all duration-200 ${
                activeSection === 'interactions'
                  ? 'bg-white/80 text-green-700 font-medium'
                  : 'text-slate-600 hover:bg-white/40'
              } ${activeSection === 'interactions' ? 'rounded-r-xl' : ''}`}
            >
              <div className="flex items-center justify-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Interactions</span>
                <span className="hidden sm:inline text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                  {filteredAndSortedInteractions.length}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-4">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatsCard
                title="Total Contacts"
                value={contactStats?.totalContacts || 0}
                subtitle="Professional network"
                icon={Users}
                color="from-blue-500 to-blue-600"
              />
              
              <StatsCard
                title="With Job Links"
                value={contactStats?.withJobs || 0}
                subtitle={`${((contactStats?.withJobs || 0) / (contactStats?.totalContacts || 1) * 100).toFixed(0)}% of contacts`}
                icon={Briefcase}
                color="from-green-500 to-green-600"
              />
              
              <StatsCard
                title="This Month"
                value={interactionStats?.thisMonth || 0}
                subtitle="Interactions"
                icon={Activity}
                trend={{
                  value: interactionStats?.lastMonth ? 
                    Math.round(((interactionStats.thisMonth - interactionStats.lastMonth) / interactionStats.lastMonth) * 100) : 0,
                  isPositive: (interactionStats?.thisMonth || 0) >= (interactionStats?.lastMonth || 0)
                }}
                color="from-purple-500 to-purple-600"
              />
              
              <StatsCard
                title="Connected"
                value={contactStats?.withMutualConnections || 0}
                subtitle="Mutual connections"
                icon={Network}
                color="from-orange-500 to-orange-600"
              />
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm">
                <div className="p-4 border-b border-slate-200/60">
                  <h3 className="font-semibold text-slate-800 flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>Recent Activity</span>
                  </h3>
                </div>
                <div className="p-2">
                  <div className="space-y-1">
                    {interactionStats?.recentActivity.slice(0, 6).map((interaction) => (
                      <div
                        key={interaction.id}
                        onClick={() => setSelectedInteraction(interaction)}
                        className="p-3 rounded-lg hover:bg-slate-50/80 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getInteractionTypeColor(interaction.type)}`}>
                              {getInteractionIcon(interaction.type)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                                  {interaction.contact?.name || 'Unknown'}
                                </span>
                                <span className="text-xs text-slate-500">•</span>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getInteractionTypeColor(interaction.type)}`}>
                                  {interaction.type.replace('_', ' ')}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600 truncate mt-0.5">
                                {interaction.summary}
                              </p>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 text-right">
                            <div>{new Date(interaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-4">
                {/* Top Companies */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm p-4">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Top Companies</span>
                  </h3>
                  <div className="space-y-2">
                    {contactStats?.topCompanies.map((item, idx) => (
                      <div key={item.company} className="flex items-center justify-between">
                        <span className="text-sm text-slate-700 truncate">{item.company}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${(item.count / (contactStats?.totalContacts || 1)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-slate-600 w-6 text-right">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interaction Types Breakdown */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm p-4">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Interaction Types</span>
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(interactionStats?.byType || {})
                      .sort(([,a], [,b]) => b - a)
                      .map(([type, count]) => (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getInteractionIcon(type)}
                            <span className="text-sm text-slate-700 capitalize">{type.replace('_', ' ')}</span>
                          </div>
                          <span className="text-sm font-medium text-slate-600">{count}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>

                {/* Quick Actions */}
                <QuickActions />
              </div>
            </div>
          </div>
        )}

        {/* Contacts Section */}
        {activeSection === 'contacts' && (
          <div className="space-y-4">
            {/* Search Filter */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts by name, company, title, or connections..."
                value={contactSearch}
                onChange={(e) => setContactSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm"
              />
            </div>

            {/* Contacts Table */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/80 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleContactSort('name')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors text-sm"
                        >
                          <span>Contact</span>
                          {getSortIcon('name', contactSort)}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleContactSort('company')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors text-sm"
                        >
                          <span>Role & Company</span>
                          {getSortIcon('company', contactSort)}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleContactSort('mutual_connections_count')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors text-sm"
                        >
                          <span>Network</span>
                          {getSortIcon('mutual_connections_count', contactSort)}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleContactSort('linkedJobsCount')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors text-sm"
                        >
                          <span>Jobs</span>
                          {getSortIcon('linkedJobsCount', contactSort)}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleContactSort('lastInteraction')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors text-sm"
                        >
                          <span>Last Contact</span>
                          {getSortIcon('lastInteraction', contactSort)}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredAndSortedContacts.map((contact) => (
                      <tr 
                        key={contact.id} 
                        className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedContact(contact)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-slate-900 hover:text-blue-600 transition-colors text-sm">
                                {contact.name}
                              </div>
                              {contact.email && (
                                <div className="text-xs text-slate-500 truncate max-w-[150px]">{contact.email}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            {contact.job_title && (
                              <div className="font-medium text-slate-900 truncate">{contact.job_title}</div>
                            )}
                            {contact.company && (
                              <div className="text-slate-600 truncate text-xs">{contact.company}</div>
                            )}
                            {!contact.job_title && !contact.company && (
                              <span className="text-slate-400 text-xs">—</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <Network className="w-3 h-3 text-slate-400" />
                            <span className="text-sm text-slate-600">
                              {contact.mutual_connections?.length || 0}
                            </span>
                            {contact.mutual_connections && contact.mutual_connections.length > 0 && (
                              <div className="flex -space-x-1">
                                {contact.mutual_connections.slice(0, 2).map((conn, idx) => (
                                  <div
                                    key={idx}
                                    className="w-5 h-5 bg-blue-100 border border-white rounded-full flex items-center justify-center"
                                    title={conn}
                                  >
                                    <span className="text-xs text-blue-700 font-medium">
                                      {conn.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                ))}
                                {contact.mutual_connections.length > 2 && (
                                  <div className="w-5 h-5 bg-slate-100 border border-white rounded-full flex items-center justify-center">
                                    <span className="text-xs text-slate-600">
                                      +{contact.mutual_connections.length - 2}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <Briefcase className="w-3 h-3 text-slate-400" />
                            <span className="text-sm text-slate-600">
                              {contact.linkedJobsCount || 0}
                            </span>
                            {(contact.linkedJobsCount || 0) > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {contact.linkedJobs?.slice(0, 2).map((job, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs truncate max-w-[60px]"
                                    title={job.company}
                                  >
                                    {job.company}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            {contact.lastInteractionDate ? (
                              <div>
                                <div className="text-slate-900 font-medium">
                                  {new Date(contact.lastInteractionDate).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {contact.interactionCount} interaction{(contact.interactionCount || 0) !== 1 ? 's' : ''}
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-400 text-xs">Never</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredAndSortedContacts.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                {contactSearch ? 'No contacts match your search.' : 'No contacts found.'}
              </div>
            )}
          </div>
        )}

        {/* Interactions Section */}
        {activeSection === 'interactions' && (
          <div className="space-y-4">
            {/* Search Filter */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search interactions by contact, type, or summary..."
                value={interactionSearch}
                onChange={(e) => setInteractionSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm"
              />
            </div>

            {/* Interactions Table */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/80 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleInteractionSort('date')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors text-sm"
                        >
                          <span>Date</span>
                          {getSortIcon('date', interactionSort)}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleInteractionSort('contact_name')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors text-sm"
                        >
                          <span>Contact</span>
                          {getSortIcon('contact_name', interactionSort)}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleInteractionSort('type')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors text-sm"
                        >
                          <span>Type</span>
                          {getSortIcon('type', interactionSort)}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleInteractionSort('summary')}
                          className="flex items-center space-x-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors text-sm"
                        >
                          <span>Summary</span>
                          {getSortIcon('summary', interactionSort)}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredAndSortedInteractions.map((interaction) => (
                      <tr 
                        key={interaction.id} 
                        className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedInteraction(interaction)}
                      >
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            <div className="font-medium text-slate-900">
                              {new Date(interaction.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(interaction.date).toLocaleDateString('en-US', { 
                                weekday: 'short'
                              })}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                              <User className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="font-medium text-slate-900 hover:text-blue-600 transition-colors text-sm truncate">
                              {interaction.contact?.name || 'Unknown Contact'}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getInteractionTypeColor(interaction.type)}`}>
                            {getInteractionIcon(interaction.type)}
                            <span className="capitalize">
                              {interaction.type.replace('_', ' ')}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-slate-900 max-w-md truncate">
                            {interaction.summary}
                          </div>
                          {interaction.notes && (
                            <div className="text-xs text-slate-500 truncate mt-0.5">
                              {interaction.notes}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredAndSortedInteractions.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                {interactionSearch ? 'No interactions match your search.' : 'No interactions found.'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {selectedContact && (
        <ContactModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}

      {/* Interaction Modal */}
      {selectedInteraction && (
        <InteractionModal
          interaction={selectedInteraction}
          onClose={() => setSelectedInteraction(null)}
        />
      )}
    </>
  )
}