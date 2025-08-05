"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { Plus, User, Calendar, MessageCircle, Building2, ExternalLink, Edit2, Trash2, X, GripVertical, Download, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

// Types
type JobStatus = 'interested' | 'applied' | 'interviewing' | 'offered' | 'rejected';

interface Job {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  salary?: string;
  location?: string;
  jobUrl?: string;
  jobDescription?: string;
  notes?: string;
  stage: string;
  order?: number;
  dateAdded: string;
}

interface Contact {
  id: string;
  name: string;
  company: string;
  position: string;
  email?: string;
  phone?: string;
  notes?: string;
  dateAdded: string;
}

// Initial form state
const INITIAL_JOB_FORM: Omit<Job, 'id'> = {
  company: '',
  position: '',
  status: 'interested',
  salary: '',
  location: '',
  jobUrl: '',
  jobDescription: '',
  notes: '',
  dateAdded: new Date().toISOString().split('T')[0],
  stage: 'interested',
  order: 0
};

const INITIAL_CONTACT_FORM: Omit<Contact, 'id'> = {
  name: '',
  company: '',
  position: '',
  email: '',
  phone: '',
  notes: '',
  dateAdded: new Date().toISOString().split('T')[0]
};

// Kanban columns
const columns = [
  { id: 'interested' as JobStatus, title: 'Interested', color: 'bg-gray-50 border-gray-200' },
  { id: 'applied' as JobStatus, title: 'Applied', color: 'bg-blue-50 border-blue-200' },
  { id: 'interviewing' as JobStatus, title: 'Interviewing', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'offered' as JobStatus, title: 'Offered', color: 'bg-green-50 border-green-200' },
  { id: 'rejected' as JobStatus, title: 'Rejected', color: 'bg-red-50 border-red-200' }
];

// Helper functions
const getJobsForStage = (jobs: Job[], stage: string) => {
  return jobs
    .filter(job => job.status === stage)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
};

const reorderJobsInColumn = (jobs: Job[], draggedJobId: string, targetIndex: number, stage: string) => {
  const stageJobs = jobs.filter(job => job.status === stage);
  const otherJobs = jobs.filter(job => job.status !== stage);
  
  const currentIndex = stageJobs.findIndex(job => job.id === draggedJobId);
  if (currentIndex === -1) return jobs;
  
  const [movedJob] = stageJobs.splice(currentIndex, 1);
  const newIndex = Math.min(targetIndex, stageJobs.length);
  stageJobs.splice(newIndex, 0, movedJob);
  
  const updatedStageJobs = stageJobs.map((job, index) => ({
    ...job,
    order: index
  }));
  
  return [...otherJobs, ...updatedStageJobs];
};

// JobCard component
const JobCard = React.memo<{
  job: Job;
  index: number;
  stageJobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
  draggedJob: Job | null;
  dragOverIndex: number | null;
  onDragStart: (e: React.DragEvent, job: Job) => void;
  onDragOver: (e: React.DragEvent, index?: number) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number, status?: JobStatus) => void;
}>(({ 
  job, 
  index, 
  stageJobs, 
  onEdit, 
  onDelete, 
  draggedJob, 
  dragOverIndex,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop
}) => {
  const isDragging = draggedJob?.id === job.id;
  
  return (
    <div className="relative">
      {draggedJob && draggedJob.id !== job.id && (
        <div
          onDragOver={(e) => onDragOver(e, index)}
          onDragLeave={onDragLeave}
          onDrop={(e) => onDrop(e, index)}
          className={`
            h-2 mb-2 rounded border-2 border-dashed border-transparent
            transition-all duration-200
            ${dragOverIndex === index ? 'border-blue-300 bg-blue-50' : ''}
          `}
        />
      )}
    
      <div
        className={`
          bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all cursor-move
          ${isDragging ? 'opacity-50 scale-95' : ''}
        `}
        draggable
        onDragStart={(e) => onDragStart(e, job)}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-gray-400" />
            <h4 className="font-medium text-gray-900 text-sm leading-tight">
              {job.position}
            </h4>
          </div>
          <div className="flex gap-1 ml-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(job);
              }}
              className="text-gray-400 hover:text-blue-600 p-1"
              title="Edit job"
            >
              <Edit2 className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(job.id);
              }}
              className="text-gray-400 hover:text-red-600 p-1"
              title="Delete job"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">{job.company}</p>
        
        {job.salary && (
          <p className="text-green-600 text-sm font-medium mb-2">{job.salary}</p>
        )}
        
        {job.location && (
          <p className="text-gray-500 text-xs mb-2 flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            {job.location}
          </p>
        )}
        
        {job.jobUrl && (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-xs hover:text-blue-800 flex items-center gap-1 mb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3" />
            View Job
          </a>
        )}
        
        <p className="text-gray-400 text-xs">
          Added {new Date(job.dateAdded).toLocaleDateString()}
        </p>
        
        {job.notes && (
          <p className="text-gray-600 text-xs mt-2 italic line-clamp-2">
            {job.notes}
          </p>
        )}
      </div>

      {index === stageJobs.length - 1 && draggedJob && (
        <div
          onDragOver={(e) => onDragOver(e, index + 1)}
          onDragLeave={onDragLeave}
          onDrop={(e) => onDrop(e, index + 1, job.status)}
          className={`
            h-8 mt-2 rounded border-2 border-dashed border-transparent
            transition-all duration-200
            ${dragOverIndex === index + 1 ? 'border-blue-300 bg-blue-50' : ''}
          `}
        />
      )}
    </div>    
  );
});

JobCard.displayName = 'JobCard';

// Main component
export default function JobTrackerPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState<'kanban' | 'list' | 'contacts'>('kanban');
  const [showJobForm, setShowJobForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [jobForm, setJobForm] = useState(INITIAL_JOB_FORM);
  const [contactForm, setContactForm] = useState(INITIAL_CONTACT_FORM);

  // Drag and drop state
  const [draggedJob, setDraggedJob] = useState<Job | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<JobStatus | null>(null);

  // Initialize sample data
  useEffect(() => {
    const sampleJobs: Job[] = [
      {
        id: '1',
        company: 'TechCorp',
        position: 'Senior Developer',
        status: 'interviewing',
        salary: '$90k - $110k',
        location: 'San Francisco, CA',
        jobUrl: 'https://techcorp.com/jobs/senior-dev',
        jobDescription: 'Building scalable web applications...',
        notes: 'Great team culture, modern tech stack',
        dateAdded: '2024-12-01',
        stage: 'interviewing',
        order: 0
      },
      {
        id: '2',
        company: 'StartupXYZ',
        position: 'Full Stack Engineer',
        status: 'applied',
        salary: '$80k - $100k',
        location: 'Remote',
        jobUrl: '',
        jobDescription: 'Join our growing team...',
        notes: 'Early stage startup, equity opportunity',
        dateAdded: '2024-12-03',
        stage: 'applied',
        order: 0
      }
    ];

    const sampleContacts: Contact[] = [
      {
        id: '1',
        name: 'Jane Smith',
        company: 'TechCorp',
        position: 'Engineering Manager',
        email: 'jane.smith@techcorp.com',
        phone: '(555) 123-4567',
        notes: 'Met at tech conference, very helpful',
        dateAdded: '2024-12-01'
      }
    ];

    setJobs(sampleJobs);
    setContacts(sampleContacts);
  }, []);

  // Drag handlers
  const handleDragStart = useCallback((e: React.DragEvent, job: Job) => {
    setDraggedJob(job);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', job.id);
    
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    setDraggedJob(null);
    setDragOverColumn(null);
    setDragOverIndex(null);
    
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (targetIndex !== undefined) {
      setDragOverIndex(targetIndex);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverIndex(null);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetIndex: number, targetStatus?: JobStatus) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedJob) return;
    
    const sourceStatus = draggedJob.status;
    const destinationStatus = targetStatus || sourceStatus;
    
    if (sourceStatus === destinationStatus) {
      setJobs(prevJobs => reorderJobsInColumn(prevJobs, draggedJob.id, targetIndex, sourceStatus));
    } else {
      setJobs(prevJobs =>
        prevJobs.map(job =>
          job.id === draggedJob.id
            ? { ...job, status: destinationStatus }
            : job
        )
      );
    }
    
    setDraggedJob(null);
    setDragOverColumn(null);
    setDragOverIndex(null);
  }, [draggedJob]);

  // Job CRUD operations
  const addJob = () => {
    const newJob: Job = {
      ...jobForm,
      id: Date.now().toString(),
      stage: jobForm.status
    };
    setJobs([...jobs, newJob]);
    setJobForm(INITIAL_JOB_FORM);
    setShowJobForm(false);
  };

  const editJob = (job: Job) => {
    setEditingJob(job);
    setJobForm(job);
    setShowJobForm(true);
  };

  const updateJob = () => {
    setJobs(jobs.map(job => 
      job.id === editingJob?.id 
        ? { ...jobForm, id: editingJob.id, stage: jobForm.status }
        : job
    ));
    setJobForm(INITIAL_JOB_FORM);
    setEditingJob(null);
    setShowJobForm(false);
  };

  const deleteJob = (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  // Contact CRUD operations
  const addContact = () => {
    const newContact: Contact = {
      ...contactForm,
      id: Date.now().toString()
    };
    setContacts([...contacts, newContact]);
    setContactForm(INITIAL_CONTACT_FORM);
    setShowContactForm(false);
  };

  const editContact = (contact: Contact) => {
    setEditingContact(contact);
    setContactForm(contact);
    setShowContactForm(true);
  };

  const updateContact = () => {
    setContacts(contacts.map(contact => 
      contact.id === editingContact?.id 
        ? { ...contactForm, id: editingContact.id }
        : contact
    ));
    setContactForm(INITIAL_CONTACT_FORM);
    setEditingContact(null);
    setShowContactForm(false);
  };

  const deleteContact = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Application Tracker</h1>
          <p className="text-gray-600">Manage your job applications and networking contacts</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'kanban' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Kanban Board
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'list' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Job List
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'contacts' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Contacts
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setShowJobForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Job
          </button>
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Add Contact
          </button>
        </div>

        {/* Main Content */}
        {activeTab === 'kanban' && (
          <div className="overflow-x-auto">
            <div className="flex gap-6 min-w-max">
              {columns.map(column => {
                const columnJobs = getJobsForStage(jobs, column.id);
                const isDropTarget = dragOverColumn === column.id;
                
                return (
                  <div 
                    key={column.id} 
                    className="flex-shrink-0 w-80"
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setDragOverColumn(column.id);
                    }}
                    onDragLeave={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setDragOverColumn(null);
                      }
                    }}
                    onDrop={(e) => {
                      if (columnJobs.length === 0) {
                        handleDrop(e, 0, column.id);
                      }
                    }}
                  >
                    <div className={`rounded-lg border-2 ${column.color} h-full transition-all duration-200 ${
                      isDropTarget ? 'ring-2 ring-blue-400 ring-offset-2 scale-105' : ''
                    }`}>
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-gray-800">{column.title}</h3>
                          <span className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded-full">
                            {columnJobs.length}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`p-4 space-y-3 min-h-[400px] transition-colors duration-200 ${
                        isDropTarget ? 'bg-blue-50' : ''
                      }`}>
                        {columnJobs.length === 0 ? (
                          <div className={`text-center py-8 transition-colors duration-200 ${
                            isDropTarget ? 'text-blue-600' : 'text-gray-400'
                          }`}>
                            <Building2 className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm">
                              {isDropTarget ? 'Drop job here' : 'No jobs in this stage'}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {draggedJob && (
                              <div
                                onDragOver={(e) => handleDragOver(e, 0)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, 0, column.id)}
                                className={`
                                  h-8 rounded border-2 border-dashed border-transparent
                                  transition-all duration-200
                                  ${dragOverIndex === 0 ? 'border-blue-300 bg-blue-50' : ''}
                                `}
                              />
                            )}
                            
                            {columnJobs.map((job, index) => (
                              <JobCard
                                key={job.id}
                                job={job}
                                index={index}
                                stageJobs={columnJobs}
                                onEdit={editJob}
                                onDelete={deleteJob}
                                draggedJob={draggedJob}
                                dragOverIndex={dragOverIndex}
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'list' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{job.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          job.status === 'offered' ? 'bg-green-100 text-green-800' :
                          job.status === 'interviewing' ? 'bg-yellow-100 text-yellow-800' :
                          job.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                          job.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {job.salary || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {job.location || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(job.dateAdded).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => editJob(job)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.position}</p>
                    <p className="text-sm text-gray-600">{contact.company}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => editContact(contact)}
                      className="text-gray-400 hover:text-blue-600 p-1"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="text-gray-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {contact.email && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Email:</span> {contact.email}
                  </p>
                )}
                
                {contact.phone && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Phone:</span> {contact.phone}
                  </p>
                )}
                
                {contact.notes && (
                  <p className="text-sm text-gray-600 mt-3 italic">
                    {contact.notes}
                  </p>
                )}
                
                <p className="text-xs text-gray-400 mt-3">
                  Added {new Date(contact.dateAdded).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Job Form Modal */}
        {showJobForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingJob ? 'Edit Job' : 'Add New Job'}
                </h2>
                <button
                  onClick={() => {
                    setShowJobForm(false);
                    setEditingJob(null);
                    setJobForm(INITIAL_JOB_FORM);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                editingJob ? updateJob() : addJob();
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position *
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.position}
                      onChange={(e) => setJobForm({...jobForm, position: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.company}
                      onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      value={jobForm.status}
                      onChange={(e) => setJobForm({...jobForm, status: e.target.value as JobStatus})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="interested">Interested</option>
                      <option value="applied">Applied</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="offered">Offered</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary
                    </label>
                    <input
                      type="text"
                      value={jobForm.salary}
                      onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                      placeholder="e.g., $80k - $100k"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={jobForm.location}
                      onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                      placeholder="e.g., San Francisco, CA"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job URL
                    </label>
                    <input
                      type="url"
                      value={jobForm.jobUrl}
                      onChange={(e) => setJobForm({...jobForm, jobUrl: e.target.value})}
                      placeholder="https://..."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                  </label>
                  <textarea
                    value={jobForm.jobDescription}
                    onChange={(e) => setJobForm({...jobForm, jobDescription: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={jobForm.notes}
                    onChange={(e) => setJobForm({...jobForm, notes: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowJobForm(false);
                      setEditingJob(null);
                      setJobForm(INITIAL_JOB_FORM);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingJob ? 'Update Job' : 'Add Job'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingContact ? 'Edit Contact' : 'Add New Contact'}
                </h2>
                <button
                  onClick={() => {
                    setShowContactForm(false);
                    setEditingContact(null);
                    setContactForm(INITIAL_CONTACT_FORM);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                editingContact ? updateContact() : addContact();
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.company}
                      onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      value={contactForm.position}
                      onChange={(e) => setContactForm({...contactForm, position: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={contactForm.notes}
                    onChange={(e) => setContactForm({...contactForm, notes: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowContactForm(false);
                      setEditingContact(null);
                      setContactForm(INITIAL_CONTACT_FORM);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    {editingContact ? 'Update Contact' : 'Add Contact'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}