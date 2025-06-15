import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../types';
import { MapPin, Clock, Briefcase, DollarSign, Calendar } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
          </h3>
          <p className="text-lg text-gray-700 font-medium mb-2">{job.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
          {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase className="h-4 w-4 text-gray-400" />
          <span>{job.experience}</span>
        </div>
        {job.salary && (
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span>{job.salary}</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>Posted {formatDate(job.postedAt)}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
            +{job.skills.length - 4} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Link
          to={`/jobs/${job.id}`}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
        >
          View Details →
        </Link>
        {job.deadline && (
          <div className="text-xs text-gray-500">
            Deadline: {new Date(job.deadline).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;