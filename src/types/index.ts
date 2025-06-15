export interface User {
  id: string;
  email: string;
  name: string;
  role: 'jobseeker' | 'employer';
  profile?: JobSeekerProfile | EmployerProfile;
  createdAt: string;
}

export interface JobSeekerProfile {
  skills: string[];
  experience: string;
  education: string;
  resumeUrl?: string;
  phone?: string;
  location?: string;
  bio?: string;
}

export interface EmployerProfile {
  companyName: string;
  companySize: string;
  industry: string;
  website?: string;
  description?: string;
  logo?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  experience: string;
  salary?: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedBy: string;
  postedAt: string;
  deadline?: string;
  status: 'active' | 'closed' | 'draft';
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: Partial<JobSeekerProfile | EmployerProfile>) => Promise<boolean>;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'jobseeker' | 'employer';
  companyName?: string;
}