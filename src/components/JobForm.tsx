"use client";

import { useState, useEffect } from "react";
import { Briefcase, Building, MapPin, DollarSign, FileText, Target, ClipboardList, ExternalLink } from "lucide-react";
import { createJob, updateJob, Job } from "@/lib/jobs";
import { supabase } from "@/lib/supabase";

const BLANK = {
  company: "",
  job_title: "",
  status: "interested" as const,
  salary: "",
  location: "",
  job_url: "",
  job_description: "",
  notes: "",
};

const statusOptions = [
  { 
    id: 'bookmarked', 
    title: 'Bookmarked',
    description: 'Review in more detail',
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200'
  },
  { 
    id: 'interested', 
    title: 'Interested',
    description: 'Job looks promising',
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200'
  },
  { 
    id: 'applied', 
    title: 'Applied',
    description: 'Application submitted',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  { 
    id: 'interviewing', 
    title: 'Interviewing',
    description: 'In interview process',
    color: 'text-blue-700',
    bg: 'bg-blue-100',
    border: 'border-blue-300'
  },
  { 
    id: 'offered', 
    title: 'Offered',
    description: 'Received job offer',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  { 
    id: 'onhold', 
    title: 'On Hold',
    description: 'Waiting for response',
    color: 'text-slate-500',
    bg: 'bg-slate-100',
    border: 'border-slate-300'
  },
    { 
    id: 'withdrawn', 
    title: 'Withdrawn',
    description: 'Waiting for response',
    color: 'text-slate-500',
    bg: 'bg-slate-100',
    border: 'border-slate-300'
  },
  { 
    id: 'rejected', 
    title: 'Rejected',
    description: 'Application declined',
    color: 'text-slate-500',
    bg: 'bg-slate-50',
    border: 'border-slate-200'
  },
  { 
    id: 'noresponse', 
    title: 'No Response',
    description: 'Ghosted',
    color: 'text-slate-500',
    bg: 'bg-slate-50',
    border: 'border-slate-200'
  }
];

// Updated interface to match JobList expectations
interface JobFormProps {
  job?: Job | null;
  onJobAdded: (job: Job) => void;
  onCancel: () => void;
}

export default function JobForm({ job: editingJob, onJobAdded, onCancel }: JobFormProps) {
  const [form, setForm] = useState(BLANK);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when editing job changes
  useEffect(() => {
    if (editingJob) {
      setForm({
        company: editingJob.company,
        job_title: editingJob.job_title,
        status: editingJob.status,
        salary: editingJob.salary || "",
        location: editingJob.location || "",
        job_url: editingJob.job_url || "",
        job_description: editingJob.job_description || "",
        notes: editingJob.notes || "",
      });
    } else {
      setForm(BLANK);
    }
    setError(null);
  }, [editingJob]);

  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [key]: e.target.value });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No authenticated user');
      }

      const payload = {
        ...form,
        user_id: user.id,
        salary: form.salary || null,
        location: form.location || null,
        job_url: form.job_url || null,
        job_description: form.job_description || null,
        notes: form.notes || null,
      };

      let result: Job | null = null;

      if (editingJob) {
        result = await updateJob(editingJob.id, payload);
      } else {
        result = await createJob(payload);
      }

      if (!result) {
        throw new Error(editingJob ? 'Failed to update job' : 'Failed to create job');
      }

      console.log('Job saved successfully:', result);
      onJobAdded(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error saving job:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <span className="font-medium">Error:</span>
            <span className="ml-2">{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company & Job Title Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label flex items-center space-x-2">
              <Building className="w-4 h-4 text-slate-500" />
              <span>Company Name *</span>
            </label>
            <input
              type="text"
              required
              value={form.company}
              onChange={handleChange('company')}
              className="input"
              placeholder="e.g., Google, Microsoft, Acme Corp"
            />
          </div>

          <div className="form-group">
            <label className="form-label flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span>Job Title *</span>
            </label>
            <input
              type="text"
              required
              value={form.job_title}
              onChange={handleChange('job_title')}
              className="input"
              placeholder="e.g., Software Engineer, Product Manager"
            />
          </div>
        </div>

        {/* Status Selection */}
        <div className="form-group">
          <label className="form-label flex items-center space-x-2">
            <Target className="w-4 h-4 text-slate-500" />
            <span>Application Status</span>
          </label>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
            {statusOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setForm({ ...form, status: option.id as any })}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  form.status === option.id
                    ? `${option.bg} ${option.border} ${option.color} border-opacity-100 shadow-sm transform scale-105`
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="font-semibold text-sm">{option.title}</div>
                <div className="text-xs opacity-75 mt-1">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Location & Salary Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>Location</span>
            </label>
            <input
              type="text"
              value={form.location}
              onChange={handleChange('location')}
              className="input"
              placeholder="e.g., San Francisco, CA or Remote"
            />
          </div>

          <div className="form-group">
            <label className="form-label flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-slate-500" />
              <span>Salary Range</span>
            </label>
            <input
              type="text"
              value={form.salary}
              onChange={handleChange('salary')}
              className="input"
              placeholder="e.g., $90,000 - $120,000 or $100k+"
            />
          </div>
        </div>

        {/* Job URL */}
        <div className="form-group">
          <label className="form-label flex items-center space-x-2">
            <ExternalLink className="w-4 h-4 text-slate-500" />
            <span>Job Posting URL</span>
          </label>
          <input
            type="url"
            value={form.job_url}
            onChange={handleChange('job_url')}
            className="input"
            placeholder="https://company.com/careers/job-posting or LinkedIn job link"
          />
          <p className="form-help">
            Link to the original job posting for easy reference
          </p>
        </div>

        {/* Job Description */}
        <div className="form-group">
          <label className="form-label flex items-center space-x-2">
            <ClipboardList className="w-4 h-4 text-slate-500" />
            <span>Job Description</span>
          </label>
          <textarea
            value={form.job_description}
            onChange={handleChange('job_description')}
            className="input min-h-[120px] resize-none"
            placeholder="Paste the job description, key requirements, or responsibilities..."
            rows={5}
          />
          <p className="form-help">
            Include the full job posting, requirements, or key details from the listing
          </p>
        </div>

        {/* Notes */}
        <div className="form-group">
          <label className="form-label flex items-center space-x-2">
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Personal Notes</span>
          </label>
          <textarea
            value={form.notes}
            onChange={handleChange('notes')}
            className="input min-h-[100px] resize-none"
            placeholder="Add your thoughts, research notes, or application strategy..."
            rows={4}
          />
          <p className="form-help">
            Include your research, application strategy, or interview preparation notes
          </p>
        </div>

        {/* Action Buttons */}
        <div className="modal-footer">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !form.company.trim() || !form.job_title.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            ) : (
              editingJob ? "Update Job" : "Add Job"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}