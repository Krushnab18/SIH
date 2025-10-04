export type UserRole = 'student' | 'faculty' | 'industry';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  institution?: string;
  company?: string;
  designation?: string;
  position?: string;
  department?: string;
  bio?: string;
  location?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  skills?: string[];
  graduationYear?: number;
  cgpa?: number;
}

export interface DemoUser extends User {
  password: string;
}

export const demoUsers: DemoUser[] = [
  {
    id: '1',
    name: 'Krushna Bankar',
    email: 'krushnabankar79@email.com',
    password: 'student123',
    role: 'student',
    institution: 'COEP Technological University, Pune',
  },
  {
    id: '2',
    name: 'Harish Gadade',
    email: 'harishgadade@coep.ac.in',
    password: 'faculty123',
    role: 'faculty',
    institution: 'COEP Technological University, Pune',
    designation: 'Professor',
  },
  {
    id: '3',
    name: 'Archit Shelar',
    email: 'architshelar@mainflow.com',
    password: 'industry123',
    role: 'industry',
    company: 'Main Flow Services and Technologies Pvt. Ltd.',
    designation: 'Tech Recruitment Lead',
  },
];
