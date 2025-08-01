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
  jobUrl: string;
  notes: string;
  dateAdded: string;
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
  associatedJob: string;
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

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobTracker-jobs');
    const savedContacts = localStorage.getItem('jobTracker-contacts');
    
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Save data to localStorage whenever jobs or contacts change
  useEffect(() => {
    localStorage.setItem('jobTracker-jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('jobTracker-contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Add/Edit Job
  const handleJobSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (editingJob) {
      setJobs(jobs.map(job => job.id === editingJob.id ? { ...jobForm, id: editingJob.id } as Job : job));
      setEditingJob(null);
    } else {
      const newJob: Job = { ...jobForm, id: Date.now() } as Job;
      setJobs([...jobs, newJob]);
    }
    setJobForm({ company: '', position: '', status: 'interested', salary: '', location: '', jobUrl: '', notes: '', dateAdded: new Date().toISOString().split('T')[0] });
    setShowJobModal(false);
  };

  // Add/Edit Contact
  const handleContactSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (editingContact) {
      setContacts(contacts.map(contact => contact.id === editingContact.id ? { ...contactForm, id: editingContact.id } as Contact : contact));
      setEditingContact(null);
    } else {
      const newContact: Contact = { ...contactForm, id: Date.now(), interactions: [] } as Contact;
      setContacts([...contacts, newContact]);
    }
    setContactForm({ name: '', company: '', position: '', email: '', phone: '', linkedin: '', associatedJob: '', notes: '', interactions: [] });
    setShowContactModal(false);
  };

  // Add Interaction
  const handleInteractionSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!selectedContact) return;
    
    const newInteraction: Interaction = { ...interactionForm, id: Date.now() } as Interaction;
    setContacts(contacts.map(contact => 
      contact.id === selectedContact.id 
        ? { ...contact, interactions: [...contact.interactions, newInteraction] }
        : contact
    ));
    setInteractionForm({ date: new Date().toISOString().split('T')[0], type: 'email', summary: '', notes: '' });
    setShowInteractionModal(false);
    setSelectedContact(null);
  };

  // Delete functions
  const deleteJob = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // Edit functions
  const editJob = (job: Job) => {
    setJobForm(job);
    setEditingJob(job);
    setShowJobModal(true);
  };

  const editContact = (contact: Contact) => {
    setContactForm(contact);
    setEditingContact(contact);
    setShowContactModal(true);
  };

  // Drag and drop for kanban
  const moveJob = (jobId: number, newStatus: string) => {
    setJobs(jobs.map(job => job.id === jobId ? { ...job, status: newStatus } : job));
  };

  // Get contacts for a specific job
  const getJobContacts = (jobId: number) => {
    return contacts.filter(contact => contact.associatedJob === jobId.toString());
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Job Tracker</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowJobModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add Job</span>
              </button>
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <User size={20} />
                <span>Add Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'kanban'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contacts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contacts
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {columns.map(column => (
              <div key={column.id} className={`${column.color} rounded-lg p-4 min-h-96`}>
                <h3 className="font-semibold text-gray-800 mb-4">{column.title}</h3>
                <div className="space-y-3">
                  {jobs.filter(job => job.status === column.id).map(job => (
                    <div key={job.id} className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{job.position}</h4>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => editJob(job)}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <Building2 size={16} />
                        <span>{job.company}</span>
                      </div>
                      {job.location && (
                        <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                      )}
                      {job.salary && (
                        <p className="text-sm text-green-600 font-medium mb-2">{job.salary}</p>
                      )}
                      
                      {/* Associated Contacts */}
                      {getJobContacts(job.id).length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-xs text-gray-500 mb-2">Contacts:</p>
                          {getJobContacts(job.id).map(contact => (
                            <div key={contact.id} className="text-sm text-blue-600">
                              {contact.name} - {contact.position}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Status Change Buttons */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {columns.filter(col => col.id !== job.status).map(col => (
                          <button
                            key={col.id}
                            onClick={() => moveJob(job.id, col.id)}
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                          >
                            Move to {col.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map(contact => (
              <div key={contact.id} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.position}</p>
                    <p className="text-sm text-gray-500">{contact.company}</p>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => editContact(contact)}
                      className="text-gray-400 hover:text-blue-600"
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

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  {contact.email && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>📧</span>
                      <a href={`mailto:${contact.email}`} className="hover:text-blue-600">{contact.email}</a>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>📱</span>
                      <span>{contact.phone}</span>
                    </div>
                  )}
                  {contact.linkedin && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>💼</span>
                      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center space-x-1">
                        <span>LinkedIn</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Associated Job */}
                {contact.associatedJob && (
                  <div className="mb-4 p-2 bg-blue-50 rounded">
                    <p className="text-sm text-blue-800">
                      Associated Job: {jobs.find(job => job.id.toString() === contact.associatedJob)?.position} at {jobs.find(job => job.id.toString() === contact.associatedJob)?.company}
                    </p>
                  </div>
                )}

                {/* Interactions */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">Interactions</h4>
                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowInteractionModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                    >
                      <Plus size={16} />
                      <span>Add</span>
                    </button>
                  </div>
                  {contact.interactions && contact.interactions.length > 0 ? (
                    <div className="space-y-2">
                      {contact.interactions.slice(0, 2).map(interaction => (
                        <div key={interaction.id} className="text-sm bg-gray-50 p-2 rounded">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium capitalize">{interaction.type}</span>
                            <span className="text-gray-500">{new Date(interaction.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-700">{interaction.summary}</p>
                        </div>
                      ))}
                      {contact.interactions.length > 2 && (
                        <p className="text-sm text-gray-500">+{contact.interactions.length - 2} more interactions</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No interactions yet</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Job Modal */}
      <Modal
        isOpen={showJobModal}
        onClose={() => {
          setShowJobModal(false);
          setEditingJob(null);
          setJobForm({ company: '', position: '', status: 'interested', salary: '', location: '', jobUrl: '', notes: '', dateAdded: new Date().toISOString().split('T')[0] });
        }}
        title={editingJob ? 'Edit Job' : 'Add New Job'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name"
              value={jobForm.company}
              onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Position"
              value={jobForm.position}
              onChange={(e) => setJobForm({...jobForm, position: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={jobForm.status}
              onChange={(e) => setJobForm({...jobForm, status: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {columns.map(column => (
                <option key={column.id} value={column.id}>{column.title}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Salary (e.g., $80k - $100k)"
              value={jobForm.salary}
              onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Location"
              value={jobForm.location}
              onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="url"
              placeholder="Job URL"
              value={jobForm.jobUrl}
              onChange={(e) => setJobForm({...jobForm, jobUrl: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <textarea
            placeholder="Notes"
            value={jobForm.notes}
            onChange={(e) => setJobForm({...jobForm, notes: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowJobModal(false);
                setEditingJob(null);
                setJobForm({ company: '', position: '', status: 'interested', salary: '', location: '', jobUrl: '', notes: '', dateAdded: new Date().toISOString().split('T')[0] });
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleJobSubmit({ preventDefault: () => {} });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingJob ? 'Update Job' : 'Add Job'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => {
          setShowContactModal(false);
          setEditingContact(null);
          setContactForm({ name: '', company: '', position: '', email: '', phone: '', linkedin: '', associatedJob: '', notes: '', interactions: [] });
        }}
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={contactForm.name}
              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Position/Title"
              value={contactForm.position}
              onChange={(e) => setContactForm({...contactForm, position: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <input
            type="text"
            placeholder="Company"
            value={contactForm.company}
            onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              value={contactForm.email}
              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={contactForm.phone}
              onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={contactForm.linkedin}
            onChange={(e) => setContactForm({...contactForm, linkedin: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={contactForm.associatedJob}
            onChange={(e) => setContactForm({...contactForm, associatedJob: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Associate with a job (optional)</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>{job.position} at {job.company}</option>
            ))}
          </select>
          <textarea
            placeholder="Notes"
            value={contactForm.notes}
            onChange={(e) => setContactForm({...contactForm, notes: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowContactModal(false);
                setEditingContact(null);
                setContactForm({ name: '', company: '', position: '', email: '', phone: '', linkedin: '', associatedJob: '', notes: '', interactions: [] });
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleContactSubmit({ preventDefault: () => {} });
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {editingContact ? 'Update Contact' : 'Add Contact'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Interaction Modal */}
      <Modal
        isOpen={showInteractionModal}
        onClose={() => {
          setShowInteractionModal(false);
          setSelectedContact(null);
          setInteractionForm({ date: new Date().toISOString().split('T')[0], type: 'email', summary: '', notes: '' });
        }}
        title="Add Interaction"
      >
        {selectedContact && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-800">Adding interaction for: {selectedContact.name}</p>
          </div>
        )}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={interactionForm.date}
              onChange={(e) => setInteractionForm({...interactionForm, date: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <select
              value={interactionForm.type}
              onChange={(e) => setInteractionForm({...interactionForm, type: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="email">Email</option>
              <option value="phone">Phone Call</option>
              <option value="meeting">In-Person Meeting</option>
              <option value="linkedin">LinkedIn Message</option>
              <option value="coffee">Coffee Chat</option>
              <option value="networking">Networking Event</option>
              <option value="other">Other</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Brief summary (e.g., 'Discussed software engineering role')"
            value={interactionForm.summary}
            onChange={(e) => setInteractionForm({...interactionForm, summary: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <textarea
            placeholder="Detailed notes about the conversation..."
            value={interactionForm.notes}
            onChange={(e) => setInteractionForm({...interactionForm, notes: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowInteractionModal(false);
                setSelectedContact(null);
                setInteractionForm({ date: new Date().toISOString().split('T')[0], type: 'email', summary: '', notes: '' });
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleInteractionSubmit({ preventDefault: () => {} });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Interaction
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobTracker;
