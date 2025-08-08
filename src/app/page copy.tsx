// src/app/page.tsx - Updated with Reporting section
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import JobList from '@/components/JobList'
import ContactList from '@/components/ContactList'
import CSVManager from '@/components/CSVManager'
import Reporting from '@/components/Reporting'
import LoginForm from '@/components/LoginForm'
import { 
  Briefcase, 
  Users, 
  Upload, 
  LogOut, 
  BarChart3
} from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'contacts' | 'reporting' | 'csv'>('jobs')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-slate-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!user) {
    return <LoginForm />
  }

  const navigationItems = [
    {
      id: 'jobs',
      label: 'Job Pipeline',
      icon: Briefcase,
      description: 'Track applications & opportunities',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'contacts',
      label: 'Network',
      icon: Users,
      description: 'Manage professional contacts',
      gradient: 'from-slate-500 to-slate-600'
    },
    {
      id: 'reporting',
      label: 'Reporting',
      icon: BarChart3,
      description: 'Analytics & insights',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'csv',
      label: 'Data Hub',
      icon: Upload,
      description: 'Import & export your data',
      gradient: 'from-blue-400 to-blue-500'
    }
  ]

  // Show main app if authenticated
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">CareerTracker</h1>
                <p className="text-xs text-slate-500 -mt-1">Professional Dashboard</p>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-700">Welcome back</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-200 hover:shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-2 border border-slate-200/60 shadow-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as 'jobs' | 'contacts' | 'reporting' | 'csv')}
                    className={`relative group p-4 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-white shadow-lg border border-slate-200/80'
                        : 'hover:bg-white/50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                          : 'bg-slate-100 group-hover:bg-slate-200'
                      }`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                      </div>
                      <div className="text-left flex-1">
                        <p className={`font-semibold transition-colors ${
                          isActive ? 'text-slate-800' : 'text-slate-600 group-hover:text-slate-700'
                        }`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r ${item.gradient} rounded-full`} />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm min-h-[600px]">
          <div className="p-6">
            {/* Content Header */}
            <div className="mb-6 pb-4 border-b border-slate-200/60">
              <div className="flex items-center space-x-3">
                {(() => {
                  const currentTab = navigationItems.find(item => item.id === activeTab)
                  const Icon = currentTab?.icon || Briefcase
                  return (
                    <>
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${currentTab?.gradient} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-800">{currentTab?.label}</h2>
                        <p className="text-sm text-slate-500">{currentTab?.description}</p>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'jobs' && <JobList />}
              {activeTab === 'contacts' && <ContactList />}
              {activeTab === 'reporting' && <Reporting />}
              {activeTab === 'csv' && <CSVManager />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}