import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Job, Application } from '../types';
import {
  Briefcase, Users, TrendingUp, Eye, Calendar, MapPin,
  CheckCircle, Clock, XCircle, AlertCircle, User
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      // Load jobs if employer
      if (user?.role === 'employer') {
        const storedJobs = localStorage.getItem('campushire_jobs');
        if (storedJobs) {
          const allJobs = JSON.parse(storedJobs);
          const userJobs = allJobs.filter((job: Job) => job.postedBy === user.id);
          setJobs(userJobs);
        }
      }

      // Load applications
      const storedApplications = localStorage.getItem('campushire_applications');
      if (storedApplications) {
        const allApplications = JSON.parse(storedApplications);
        
        if (user?.role === 'jobseeker') {
          // For job seekers, show their applications
          const userApplications = allApplications.filter((app: Application) => app.applicantId === user.id);
          setApplications(userApplications);
        } else if (user?.role === 'employer') {
          // For employers, show applications to their jobs
          const employerApplications = allApplications.filter((app: Application) => {
            const storedJobs = localStorage.getItem('campushire_jobs');
            if (storedJobs) {
              const allJobs = JSON.parse(storedJobs);
              const job = allJobs.find((j: Job) => j.id === app.jobId);
              return job && job.postedBy === user.id;
            }
            return false;
          });
          setApplications(employerApplications);
        }
      }
      
      setLoading(false);
    };

    if (user) {
      loadData();
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'shortlisted':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'hired':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const updateApplicationStatus = (applicationId: string, newStatus: string) => {
    const storedApplications = localStorage.getItem('campushire_applications');
    if (storedApplications) {
      const allApplications = JSON.parse(storedApplications);
      const updatedApplications = allApplications.map((app: Application) => {
        if (app.id === applicationId) {
          return { ...app, status: newStatus, updatedAt: new Date().toISOString() };
        }
        return app;
      });
      localStorage.setItem('campushire_applications', JSON.stringify(updatedApplications));
      
      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus, updatedAt: new Date().toISOString() }
          : app
      ));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">
                {user.role === 'employer' 
                  ? 'Manage your job postings and track applications'
                  : 'Track your job applications and discover new opportunities'
                }
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.role === 'employer' ? (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Jobs Posted</p>
                    <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Shortlisted</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {applications.filter(app => app.status === 'shortlisted').length}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hired</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {applications.filter(app => app.status === 'hired').length}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Applications Sent</p>
                    <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {applications.filter(app => app.status === 'pending').length}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Shortlisted</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {applications.filter(app => app.status === 'shortlisted').length}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {applications.length > 0 
                        ? Math.round((applications.filter(app => app.status === 'hired').length / applications.length) * 100)
                        : 0
                      }%
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications or Job Postings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {user.role === 'employer' ? 'Recent Applications' : 'Your Applications'}
              </h2>
              <Link
                to={user.role === 'employer' ? '/employer/applications' : '/job-seeker/applications'}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {applications.slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{application.jobTitle}</h3>
                    <p className="text-sm text-gray-600">{application.company}</p>
                    {user.role === 'employer' && (
                      <p className="text-sm text-gray-500">
                        Applied by: {application.applicantName}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span>{application.status.charAt(0).toUpperCase() + application.status.slice(1)}</span>
                    </span>
                    {user.role === 'employer' && application.status === 'pending' && (
                      <div className="flex space-x-1">
                        <button
                          onClick={() => updateApplicationStatus(application.id, 'shortlisted')}
                          className="text-green-600 hover:text-green-700 text-xs"
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(application.id, 'rejected')}
                          className="text-red-600 hover:text-red-700 text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {applications.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {user.role === 'employer' 
                      ? 'No applications received yet'
                      : 'No applications sent yet'
                    }
                  </p>
                  <Link
                    to={user.role === 'employer' ? '/post-job' : '/jobs'}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {user.role === 'employer' ? 'Post Your First Job' : 'Browse Jobs'}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="space-y-4">
              {user.role === 'employer' ? (
                <>
                  <Link
                    to="/post-job"
                    className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  >
                    <div className="bg-blue-600 p-2 rounded-lg mr-4">
                      <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Post New Job</h3>
                      <p className="text-sm text-gray-600">Create a new job posting</p>
                    </div>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                  >
                    <div className="bg-purple-600 p-2 rounded-lg mr-4">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Update Company Profile</h3>
                      <p className="text-sm text-gray-600">Manage your company information</p>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/jobs"
                    className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  >
                    <div className="bg-blue-600 p-2 rounded-lg mr-4">
                      <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Browse Jobs</h3>
                      <p className="text-sm text-gray-600">Find new opportunities</p>
                    </div>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
                  >
                    <div className="bg-green-600 p-2 rounded-lg mr-4">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Update Profile</h3>
                      <p className="text-sm text-gray-600">Keep your profile updated</p>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;