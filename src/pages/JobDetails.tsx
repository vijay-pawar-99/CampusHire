import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Job, Application } from '../types';
import {
  MapPin, Clock, Briefcase, DollarSign, Calendar, Users, Building,
  CheckCircle, ArrowLeft, Share2, Bookmark, AlertCircle
} from 'lucide-react';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const loadJob = () => {
      const storedJobs = localStorage.getItem('campushire_jobs');
      if (storedJobs && id) {
        const jobs = JSON.parse(storedJobs);
        const foundJob = jobs.find((j: Job) => j.id === id);
        setJob(foundJob || null);
      }
      setLoading(false);
    };

    const checkApplicationStatus = () => {
      if (user && id) {
        const storedApplications = localStorage.getItem('campushire_applications');
        if (storedApplications) {
          const applications = JSON.parse(storedApplications);
          const applied = applications.some((app: Application) => 
            app.jobId === id && app.applicantId === user.id
          );
          setHasApplied(applied);
        }
      }
    };

    loadJob();
    checkApplicationStatus();
  }, [id, user]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'jobseeker') {
      alert('Only job seekers can apply to jobs');
      return;
    }

    setApplying(true);

    try {
      const storedApplications = localStorage.getItem('campushire_applications');
      const applications = storedApplications ? JSON.parse(storedApplications) : [];

      const newApplication: Application = {
        id: Date.now().toString(),
        jobId: job!.id,
        jobTitle: job!.title,
        company: job!.company,
        applicantId: user.id,
        applicantName: user.name,
        applicantEmail: user.email,
        status: 'pending',
        appliedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      applications.push(newApplication);
      localStorage.setItem('campushire_applications', JSON.stringify(applications));
      setHasApplied(true);
    } catch (error) {
      console.error('Error applying to job:', error);
      alert('Failed to apply. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/jobs')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Browse All Jobs
          </button>
        </div>
      </div>
    );
  }

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-blue-100 text-blue-800';
      case 'internship':
        return 'bg-purple-100 text-purple-800';
      case 'contract':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Jobs
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="h-5 w-5" />
                  <span className="text-xl font-medium">{job.company}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Posted {formatDate(job.postedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{job.experience}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-200">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-200">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                  <div className="prose prose-blue max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Job Details Card */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Job Type</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
                        {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-medium text-gray-900">{job.experience}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Salary</span>
                        <span className="font-medium text-gray-900">{job.salary}</span>
                      </div>
                    )}
                    {job.deadline && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Deadline</span>
                        <span className="font-medium text-gray-900">
                          {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="sticky top-4">
                  {hasApplied ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-green-800 font-medium">Application Submitted</p>
                      <p className="text-green-600 text-sm">We'll notify you about updates</p>
                    </div>
                  ) : (
                    <button
                      onClick={handleApply}
                      disabled={applying}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {applying ? 'Applying...' : 'Apply Now'}
                    </button>
                  )}
                  {!user && (
                    <p className="text-sm text-gray-600 text-center mt-2">
                      <button
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Sign in
                      </button>
                      {' '}to apply for this position
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;