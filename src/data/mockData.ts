import { Job, Application } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechCorp Solutions',
    location: 'Bangalore, India',
    type: 'internship',
    experience: '0-1 years',
    salary: '₹15,000 - ₹25,000/month',
    description: 'We are looking for a passionate Frontend Developer Intern to join our dynamic team. You will work on cutting-edge web applications using modern technologies like React, TypeScript, and Tailwind CSS.',
    requirements: [
      'Basic knowledge of HTML, CSS, and JavaScript',
      'Familiarity with React.js',
      'Understanding of responsive design principles',
      'Good problem-solving skills',
      'Excellent communication skills'
    ],
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
    postedBy: 'employer1',
    postedAt: '2024-01-15',
    deadline: '2024-02-15',
    status: 'active'
  },
  {
    id: '2',
    title: 'Software Engineer Trainee',
    company: 'InnovateTech Pvt Ltd',
    location: 'Hyderabad, India',
    type: 'full-time',
    experience: '0-2 years',
    salary: '₹3.5 - ₹5.5 LPA',
    description: 'Join our Software Engineer Trainee program and kickstart your career in software development. You will be working on real-world projects and receive mentorship from senior developers.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong programming fundamentals',
      'Knowledge of at least one programming language (Java, Python, C++)',
      'Understanding of data structures and algorithms',
      'Willingness to learn new technologies'
    ],
    skills: ['Java', 'Python', 'SQL', 'Problem Solving', 'Algorithms'],
    postedBy: 'employer2',
    postedAt: '2024-01-20',
    deadline: '2024-03-01',
    status: 'active'
  },
  {
    id: '3',
    title: 'Data Analyst Intern',
    company: 'DataDrive Analytics',
    location: 'Mumbai, India',
    type: 'internship',
    experience: '0-1 years',
    salary: '₹12,000 - ₹20,000/month',
    description: 'Exciting opportunity for a Data Analyst Intern to work with large datasets and create meaningful insights. You will learn data visualization, statistical analysis, and business intelligence tools.',
    requirements: [
      'Bachelor\'s degree in Statistics, Mathematics, or related field',
      'Basic knowledge of Excel and SQL',
      'Understanding of statistical concepts',
      'Analytical mindset',
      'Attention to detail'
    ],
    skills: ['Excel', 'SQL', 'Python', 'Statistics', 'Data Visualization'],
    postedBy: 'employer3',
    postedAt: '2024-01-18',
    deadline: '2024-02-28',
    status: 'active'
  },
  {
    id: '4',
    title: 'UI/UX Design Intern',
    company: 'Creative Studios',
    location: 'Pune, India',
    type: 'internship',
    experience: '0-1 years',
    salary: '₹10,000 - ₹18,000/month',
    description: 'Join our creative team as a UI/UX Design Intern. You will work on user interface design, user experience research, and create beautiful, functional designs for web and mobile applications.',
    requirements: [
      'Knowledge of design tools (Figma, Adobe XD, Sketch)',
      'Understanding of design principles',
      'Basic knowledge of user experience concepts',
      'Creative mindset',
      'Portfolio of design work'
    ],
    skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping'],
    postedBy: 'employer4',
    postedAt: '2024-01-22',
    deadline: '2024-02-25',
    status: 'active'
  },
  {
    id: '5',
    title: 'Marketing Associate',
    company: 'BrandBoost Marketing',
    location: 'Delhi, India',
    type: 'full-time',
    experience: '0-2 years',
    salary: '₹2.5 - ₹4 LPA',
    description: 'We are seeking a dynamic Marketing Associate to join our team. You will be involved in digital marketing campaigns, social media management, and market research activities.',
    requirements: [
      'Bachelor\'s degree in Marketing, Business, or related field',
      'Understanding of digital marketing concepts',
      'Knowledge of social media platforms',
      'Excellent written and verbal communication skills',
      'Creative thinking and problem-solving abilities'
    ],
    skills: ['Digital Marketing', 'Social Media', 'Content Writing', 'Analytics', 'SEO'],
    postedBy: 'employer5',
    postedAt: '2024-01-25',
    deadline: '2024-03-10',
    status: 'active'
  },
  {
    id: '6',
    title: 'Full Stack Developer',
    company: 'WebWorks Technologies',
    location: 'Chennai, India',
    type: 'full-time',
    experience: '1-3 years',
    salary: '₹4 - ₹7 LPA',
    description: 'Opportunity for a Full Stack Developer to work on exciting web applications. You will work with both frontend and backend technologies to create seamless user experiences.',
    requirements: [
      'Proficiency in JavaScript and TypeScript',
      'Experience with React.js and Node.js',
      'Knowledge of databases (MongoDB, PostgreSQL)',
      'Understanding of RESTful APIs',
      'Experience with version control (Git)'
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'REST APIs'],
    postedBy: 'employer1',
    postedAt: '2024-01-28',
    deadline: '2024-03-15',
    status: 'active'
  }
];

export const initializeMockData = () => {
  // Initialize jobs in localStorage if not present
  if (!localStorage.getItem('campushire_jobs')) {
    localStorage.setItem('campushire_jobs', JSON.stringify(mockJobs));
  }

  // Initialize empty applications array if not present
  if (!localStorage.getItem('campushire_applications')) {
    localStorage.setItem('campushire_applications', JSON.stringify([]));
  }

  // Initialize empty users array if not present
  if (!localStorage.getItem('campushire_users')) {
    localStorage.setItem('campushire_users', JSON.stringify([]));
  }
};