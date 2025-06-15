import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Filter, X } from 'lucide-react';

interface JobFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  jobCount: number;
}

export interface FilterState {
  search: string;
  location: string;
  type: string;
  experience: string;
  skills: string[];
}

const JobFilters: React.FC<JobFiltersProps> = ({ onFilterChange, jobCount }) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    location: '',
    type: '',
    experience: '',
    skills: []
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const jobTypes = ['full-time', 'part-time', 'internship', 'contract'];
  const experienceLevels = ['0-1 years', '1-3 years', '3-5 years', '5+ years'];
  const popularSkills = ['React', 'JavaScript', 'Python', 'Java', 'Node.js', 'SQL', 'HTML', 'CSS', 'Git', 'Docker'];

  const handleFilterChange = (key: keyof FilterState, value: string | string[]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    handleFilterChange('skills', newSkills);
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      search: '',
      location: '',
      type: '',
      experience: '',
      skills: []
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = filters.search || filters.location || filters.type || filters.experience || filters.skills.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Find Your Perfect Job</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">{jobCount} jobs found</span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Job title, keyword..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Location..."
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Job Type */}
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            <option value="">All job types</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div>
          <select
            value={filters.experience}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All experience levels</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        <Filter className="h-4 w-4" />
        <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Filters</span>
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {popularSkills.map(skill => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filters.skills.includes(skill)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;