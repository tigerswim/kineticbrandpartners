'use client';

import React, { useState, useEffect } from 'react';
import { Plus, User, Calendar, MessageCircle, Building2, ExternalLink, Edit2, Trash2, X } from 'lucide-react';

// Types
interface Job {
  id: number;
  company: string;
  position: string;
  status: string;
  salary: string;
  location: string;
  job_url: string;
  notes: string;
  date_added: string;
}

interface Interaction {
  id: number;
  date: string;
  type: string;
  summary: string;
  notes: string;
}

interface Contact {
  id: number;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  linkedin: string;
  associated_job: string;
  notes: string;
  interactions: Interaction[];
}

const JobTracker = () => {
  // State for jobs and contacts
  const [jobs, setJobs] = useState<Job[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState('kanban');
  const [showJobModal, setShowJobModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Kanban columns
  const columns = [
    { id: 'interested', title: 'Interested', color: 'bg-blue-100 border-blue-300' },
    { id: 'applied', title: 'Applied', color: 'bg-yellow-100 border-yellow-300' },
    { id: 'interviewing', title: 'Interviewing', color: 'bg-purple-100 border-purple-300' },
    { id: 'onhold', title: 'On Hold', color: 'bg-orange-100 border-orange-300' },
    { id: 'offered', title: 'Offered', color: 'bg-green-100 border-green-300' },
    { id: 'rejected', title: 'Rejected', color: 'bg-red-100 border-red-300' }
  ];

  // Job form state
  const [jobForm, setJobForm] = useState({
    company: '',
    position: '',
    status: 'interested',
    salary: '',
    location: '',
    jobUrl: '',
    notes: '',
    dateAdded: new Date().toISOString().split('T')[0]
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    linkedin: '',
    associatedJob: '',
    notes: '',
    interactions: [] as Interaction[]
  });

  // Interaction form state
  const [interactionForm, setInteractionForm] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'email',
    summary: '',
    notes: ''
  });

  // API helper functions
  const apiCall = async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  // Load data from API on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Initialize database if needed
        try {
          await apiCall('/api/init-db', { method: 'POST' });
        } catch (error) {
          // Database might already be initialized, continue
        }
        
        // Load jobs and contacts
        const [jobsData, contactsData] = await Promise.all([
          apiCall('/api/jobs'),
          apiCall('/api/contacts')
        ]);
        
        setJobs(jobsData);
        setContacts(contactsData);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Add/Edit Job
  const handleJobSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (editingJob) {
        const updatedJob = await apiCall('/api/jobs', {
          method: 'PUT',
          body: JSON.stringify({
            id: editingJob.id,
            company: jobForm.company,
            position: jobForm.position,
            status: jobForm.status,
            salary: jobForm.salary,
            location: jobForm.location,
            jobUrl: jobForm.jobUrl,
            notes: jobForm.notes,
            dateAdded: jobForm.dateAdded
          })
        });
        setJobs(jobs.map(job => job.id === editingJob.id ? updatedJob : job));
        setEditingJob(null);
      } else {
        const newJob = await apiCall('/api/jobs', {
          method: 'POST',
          body: JSON.stringify({
            company: jobForm.company,
            position: jobForm.position,
            status: jobForm.status,
            salary: jobForm.salary,
            location: jobForm.location,
            jobUrl: jobForm.jobUrl,
            notes: jobForm.notes,
            dateAdded: jobForm.dateAdded
          })
        });
        setJobs([newJob, ...jobs]);
      }
      setJobForm({ company: '', position: '', status: 'interested', salary: '', location: '', jobUrl: '', notes: '', dateAdded: new Date().toISOString().split('T')[0] });
      setShowJobModal(false);
    } catch (error) {
      console.error('Error saving job:', error);
      setError('Failed to save job. Please try again.');
    }
  };

  // Add/Edit Contact
  const handleContactSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (editingContact) {
        const updatedContact = await apiCall('/api/contacts', {
          method: 'PUT',
          body: JSON.stringify({
            id: editingContact.id,
            name: contactForm.name,
            company: contactForm.company,
            position: contactForm.position,
            email: contactForm.email,
            phone: contactForm.phone,
            linkedin: contactForm.linkedin,
            associatedJob: contactForm.associatedJob,
            notes: contactForm.notes
          })
        });
        setContacts(contacts.map(contact => contact.id === editingContact.id ? updatedContact : contact));
        setEditingContact(null);
      } else {
        const newContact = await apiCall('/api/contacts', {
          method: 'POST',
          body: JSON.stringify({
            name: contactForm.name,
            company: contactForm.company,
            position: contactForm.position,
            email: contactForm.email,
            phone: contactForm.phone,
            linkedin: contactForm.linkedin,
            associatedJob: contactForm.associatedJob,
            notes: contactForm.notes
          })
        });
        setContacts([newContact, ...contacts]);
      }
      setContactForm({ name: '', company: '', position: '', email: '', phone: '', linkedin: '', associatedJob: '', notes: '', interactions: [] });
      setShowContactModal(false);
    } catch (error) {
      console.error('Error saving contact:', error);
      setError('Failed to save contact. Please try again.');
    }
  };

  // Add Interaction
  const handleInteractionSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!selectedContact) return;
    
    try {
      const newInteraction = await apiCall('/api/interactions', {
        method: 'POST',
        body: JSON.stringify({
          contactId: selectedContact.id,
          date: interactionForm.date,
          type: interactionForm.type,
          summary: interactionForm.summary,
          notes: interactionForm.notes
        })
      });
      
      // Reload contacts to get the updated data with interactions
      const updatedContacts = await apiCall('/api/contacts');
      setContacts(updatedContacts);
      
      setInteractionForm({ date: new Date().toISOString().split('T')[0], type: 'email', summary: '', notes: '' });
      setShowInteractionModal(false);
      setSelectedContact(null);
    } catch (error) {
      console.error('Error saving interaction:', error);
      setError('Failed to save interaction. Please try again.');
    }
  };

  // Delete functions
  const deleteJob = async (id: number) => {
    try {
      await apiCall(`/api/jobs?id=${id}`, { method: 'DELETE' });
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      setError('Failed to delete job. Please try again.');
    }
  };

  const deleteContact = async (id: number) => {
    try {
      await apiCall(`/api/contacts?id=${id}`, { method: 'DELETE' });
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('Failed to delete contact. Please try again.');
    }
  };

  // Edit functions
  const editJob = (job: Job) => {
    setJobForm({
      company: job.company,
      position: job.position,
      status: job.status,
      salary: job.salary || '',
      location: job.location || '',
      jobUrl: job.job_url || '',
      notes: job.notes || '',
      dateAdded: job.date_added
    });
    setEditingJob(job);
    setShowJobModal(true);
  };

  const editContact = (contact: Contact) => {
    setContactForm({
      name: contact.name,
      company: contact.company || '',
      position: contact.position || '',
      email: contact.email || '',
      phone: contact.phone || '',
      linkedin: contact.linkedin || '',
      associatedJob: contact.associated_job || '',
      notes: contact.notes || '',
      interactions: contact.interactions || []
    });
    setEditingContact(contact);
    setShowContactModal(true);
  };

  // Move job between columns
  const moveJob = async (jobId: number, newStatus: string) => {
    try {
      const job = jobs.find(j => j.id === jobId);
      if (!job) return;
      
      const updatedJob = await apiCall('/api/jobs', {
        method: 'PUT',
        body: JSON.stringify({
          id: job.id,
          company: job.company,
          position: job.position,
          status: newStatus,
          salary: job.salary,
          location: job.location,
          jobUrl: job.job_url,
          notes: job.notes,
          dateAdded: job.date_added
        })
      });
      
      setJobs(jobs.map(j => j.id === jobId ? updatedJob : j));
    } catch (error) {
      console.error('Error moving job:', error);
      setError('Failed to move job. Please try again.');
    }
  };

  // Get contacts for a specific job
  const getJobContacts = (jobId: number) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return [];
    return contacts.filter(contact => contact.associated_job === job.company);
  };

  // Modal component
  const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job tracker...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Job Tracker</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowJobModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Job</span>
              </button>
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <User size={16} />
                <span>Add Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 text-sm mt-2"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
              activeTab === 'kanban' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Kanban Board
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
              activeTab === 'contacts' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Contacts
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab === 'kanban' ? (
          // Kanban Board
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {columns.map(column => (
              <div key={column.id} className={`${column.color} rounded-lg p-4 border-2`}>
                <h3 className="font-semibold text-gray-800 mb-4">{column.title}</h3>
                <div className="space-y-3">
                  {jobs
                    .filter(job => job.status === column.id)
                    .map(job => (
                      <div key={job.id} className="bg-white rounded-lg p-3 shadow-sm border">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm text-gray-900">{job.position}</h4>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => editJob(job)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => deleteJob(job.id)}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{job.company}</p>
                        {job.location && (
                          <p className="text-xs text-gray-500 mb-2">{job.location}</p>
                        )}
                        {job.salary && (
                          <p className="text-xs text-green-600 font-medium">{job.salary}</p>
                        )}
                        {job.job_url && (
                          <a
                            href={job.job_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <ExternalLink size={12} className="mr-1" />
                            View Job
                          </a>
                        )}
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              {new Date(job.date_added).toLocaleDateString()}
                            </span>
                            <div className="flex space-x-1">
                              {columns.map(col => (
                                <button
                                  key={col.id}
                                  onClick={() => moveJob(job.id, col.id)}
                                  className={`w-2 h-2 rounded-full ${
                                    job.status === col.id ? 'bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
                                  }`}
                                  title={col.title}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Contacts List
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contacts</h2>
              <div className="space-y-4">
                {contacts.map(contact => (
                  <div key={contact.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.position} at {contact.company}</p>
                        {contact.email && (
                          <p className="text-sm text-gray-500">{contact.email}</p>
                        )}
                        {contact.phone && (
                          <p className="text-sm text-gray-500">{contact.phone}</p>
                        )}
                        {contact.linkedin && (
                          <a
                            href={contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            LinkedIn Profile
                          </a>
                        )}
                        {contact.notes && (
                          <p className="text-sm text-gray-600 mt-2">{contact.notes}</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedContact(contact);
                            setShowInteractionModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Add Interaction
                        </button>
                        <button
                          onClick={() => editContact(contact)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Interactions */}
                    {contact.interactions && contact.interactions.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Interactions</h4>
                        <div className="space-y-2">
                          {contact.interactions.map(interaction => (
                            <div key={interaction.id} className="bg-gray-50 rounded p-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-xs font-medium text-gray-700">
                                    {new Date(interaction.date).toLocaleDateString()} - {interaction.type}
                                  </p>
                                  <p className="text-xs text-gray-600">{interaction.summary}</p>
                                  {interaction.notes && (
                                    <p className="text-xs text-gray-500 mt-1">{interaction.notes}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Job Modal */}
      <Modal isOpen={showJobModal} onClose={() => setShowJobModal(false)} title={editingJob ? 'Edit Job' : 'Add Job'}>
        <form onSubmit={handleJobSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              value={jobForm.company}
              onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              value={jobForm.position}
              onChange={(e) => setJobForm({...jobForm, position: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={jobForm.status}
              onChange={(e) => setJobForm({...jobForm, status: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {columns.map(column => (
                <option key={column.id} value={column.id}>{column.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <input
              type="text"
              value={jobForm.salary}
              onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., $80,000 - $100,000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={jobForm.location}
              onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., San Francisco, CA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job URL</label>
            <input
              type="url"
              value={jobForm.jobUrl}
              onChange={(e) => setJobForm({...jobForm, jobUrl: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={jobForm.notes}
              onChange={(e) => setJobForm({...jobForm, notes: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Any additional notes..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Added</label>
            <input
              type="date"
              value={jobForm.dateAdded}
              onChange={(e) => setJobForm({...jobForm, dateAdded: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              {editingJob ? 'Update Job' : 'Add Job'}
            </button>
            <button
              type="button"
              onClick={() => setShowJobModal(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Contact Modal */}
      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title={editingContact ? 'Edit Contact' : 'Add Contact'}>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={contactForm.name}
              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              value={contactForm.company}
              onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              value={contactForm.position}
              onChange={(e) => setContactForm({...contactForm, position: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={contactForm.email}
              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={contactForm.phone}
              onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              type="url"
              value={contactForm.linkedin}
              onChange={(e) => setContactForm({...contactForm, linkedin: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Associated Job</label>
            <input
              type="text"
              value={contactForm.associatedJob}
              onChange={(e) => setContactForm({...contactForm, associatedJob: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company name or job title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={contactForm.notes}
              onChange={(e) => setContactForm({...contactForm, notes: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Any additional notes..."
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              {editingContact ? 'Update Contact' : 'Add Contact'}
            </button>
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Interaction Modal */}
      <Modal isOpen={showInteractionModal} onClose={() => setShowInteractionModal(false)} title="Add Interaction">
        <form onSubmit={handleInteractionSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={interactionForm.date}
              onChange={(e) => setInteractionForm({...interactionForm, date: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={interactionForm.type}
              onChange={(e) => setInteractionForm({...interactionForm, type: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="email">Email</option>
              <option value="phone">Phone Call</option>
              <option value="meeting">Meeting</option>
              <option value="interview">Interview</option>
              <option value="follow-up">Follow-up</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
            <input
              type="text"
              value={interactionForm.summary}
              onChange={(e) => setInteractionForm({...interactionForm, summary: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief summary of the interaction"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={interactionForm.notes}
              onChange={(e) => setInteractionForm({...interactionForm, notes: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Detailed notes about the interaction..."
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Add Interaction
            </button>
            <button
              type="button"
              onClick={() => setShowInteractionModal(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default JobTracker;
