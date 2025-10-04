import { User } from '../types/user';

export interface InternshipListing {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  requirements: string[];
  skills: string[];
  status: string;
  postedBy: string;
  postedDate: string;
}

export const mockListings: InternshipListing[] = [
  {
    id: 'listing-1',
    title: 'Software Engineering Intern',
    company: 'TechCorp Solutions',
    location: 'Pune, Maharashtra',
    duration: 'Jun 2025 - Aug 2025',
    description: 'Join our dynamic development team to work on cutting-edge web applications. You will gain hands-on experience with modern frameworks and contribute to real-world projects.',
    requirements: [
      'Currently pursuing B.Tech/B.E. in Computer Science or related field',
      'Basic knowledge of JavaScript, React, or similar frameworks',
      'Understanding of database concepts',
      'Strong problem-solving skills'
    ],
    skills: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Git'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-01-20',
  },
  {
    id: 'listing-2',
    title: 'Data Science Intern',
    company: 'DataInsights Inc',
    location: 'Bangalore, Karnataka',
    duration: 'Jul 2025 - Sep 2025',
    description: 'Dive into the world of data analytics and machine learning. Work on real client projects involving data preprocessing, model building, and visualization.',
    requirements: [
      'Strong foundation in statistics and mathematics',
      'Programming experience in Python or R',
      'Knowledge of SQL databases',
      'Interest in machine learning concepts'
    ],
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-01-18',
  },
  {
    id: 'listing-3',
    title: 'Frontend Developer Intern',
    company: 'WebTech Innovations',
    location: 'Mumbai, Maharashtra',
    duration: 'May 2025 - Jul 2025',
    description: 'Create stunning user interfaces and enhance user experience. Work with the latest frontend technologies and design systems.',
    requirements: [
      'Knowledge of HTML, CSS, and JavaScript',
      'Familiarity with responsive design principles',
      'Basic understanding of version control (Git)',
      'Eye for design and attention to detail'
    ],
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Responsive Design', 'UI/UX'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-01-22',
  },
  {
    id: 'listing-4',
    title: 'Digital Marketing Intern',
    company: 'MarketPro Agency',
    location: 'Hyderabad, Telangana',
    duration: 'Jun 2025 - Aug 2025',
    description: 'Learn digital marketing strategies, social media management, and content creation. Gain experience with analytics tools and campaign optimization.',
    requirements: [
      'Pursuing degree in Marketing, Communications, or related field',
      'Creative thinking and writing skills',
      'Familiarity with social media platforms',
      'Basic understanding of digital marketing concepts'
    ],
    skills: ['Social Media Marketing', 'Content Creation', 'Google Analytics', 'SEO', 'Campaign Management'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-01-25',
  },
  {
    id: 'listing-5',
    title: 'Cloud DevOps Intern',
    company: 'CloudScale Systems',
    location: 'Chennai, Tamil Nadu',
    duration: 'Jul 2025 - Sep 2025',
    description: 'Work on cloud infrastructure, automation, and deployment pipelines. Learn AWS, Docker, and Kubernetes in a production environment.',
    requirements: [
      'Basic understanding of Linux systems',
      'Interest in cloud technologies',
      'Familiarity with programming/scripting',
      'Problem-solving mindset'
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'CI/CD'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-01-28',
  },
  {
    id: 'listing-6',
    title: 'Backend Developer Intern',
    company: 'ServerTech Solutions',
    location: 'Pune, Maharashtra',
    duration: 'Jun 2025 - Aug 2025',
    description: 'Build robust server-side applications and APIs. Work with databases, microservices, and scalable architecture patterns.',
    requirements: [
      'Knowledge of at least one backend language (Java, Python, Node.js)',
      'Understanding of database concepts',
      'Basic knowledge of REST APIs',
      'Strong logical thinking'
    ],
    skills: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'Microservices'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-01-30',
  },
  {
    id: 'listing-7',
    title: 'UX/UI Design Intern',
    company: 'DesignStudio Pro',
    location: 'Delhi, NCR',
    duration: 'May 2025 - Jul 2025',
    description: 'Create user-centered designs and prototypes. Learn design thinking, user research, and modern design tools.',
    requirements: [
      'Portfolio of design work (academic projects acceptable)',
      'Familiarity with design tools (Figma, Sketch, Adobe)',
      'Understanding of user experience principles',
      'Creative and analytical thinking'
    ],
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-01',
  },
  {
    id: 'listing-8',
    title: 'Mobile App Developer Intern',
    company: 'MobileFirst Technologies',
    location: 'Bangalore, Karnataka',
    duration: 'Jun 2025 - Aug 2025',
    description: 'Develop cross-platform mobile applications using React Native or Flutter. Work on user-friendly mobile experiences.',
    requirements: [
      'Basic knowledge of mobile development concepts',
      'Programming experience in JavaScript or Dart',
      'Understanding of mobile UI/UX principles',
      'Eagerness to learn new technologies'
    ],
    skills: ['React Native', 'Flutter', 'Mobile UI', 'API Integration', 'App Store Deployment'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-03',
  },
  {
    id: 'listing-9',
    title: 'Cybersecurity Intern',
    company: 'SecureNet Solutions',
    location: 'Mumbai, Maharashtra',
    duration: 'Jul 2025 - Sep 2025',
    description: 'Learn cybersecurity fundamentals, vulnerability assessment, and security monitoring. Gain hands-on experience with security tools.',
    requirements: [
      'Basic understanding of networking concepts',
      'Interest in cybersecurity and ethical hacking',
      'Knowledge of operating systems (Windows/Linux)',
      'Analytical and detail-oriented mindset'
    ],
    skills: ['Network Security', 'Vulnerability Assessment', 'Penetration Testing', 'Security Tools', 'Risk Analysis'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-05',
  },
  {
    id: 'listing-10',
    title: 'AI/ML Research Intern',
    company: 'InnovateTech Labs',
    location: 'Hyderabad, Telangana',
    duration: 'Jun 2025 - Aug 2025',
    description: 'Work on cutting-edge AI research projects. Implement machine learning algorithms and contribute to research publications.',
    requirements: [
      'Strong mathematical background',
      'Programming experience in Python',
      'Knowledge of machine learning concepts',
      'Research mindset and curiosity'
    ],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'Research Methodology'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-07',
  },
  {
    id: 'listing-11',
    title: 'Full Stack Developer Intern',
    company: 'TechVentures India',
    location: 'Pune, Maharashtra',
    duration: 'May 2025 - Aug 2025',
    description: 'Build end-to-end web applications using modern tech stack. Work on both frontend and backend development with mentorship from senior developers.',
    requirements: [
      'Knowledge of both frontend and backend technologies',
      'Understanding of REST APIs and databases',
      'Familiarity with version control (Git)',
      'Self-motivated and eager to learn'
    ],
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-08',
  },
  {
    id: 'listing-12',
    title: 'Business Analyst Intern',
    company: 'ConsultPro Services',
    location: 'Mumbai, Maharashtra',
    duration: 'Jun 2025 - Aug 2025',
    description: 'Analyze business requirements, create documentation, and support project management activities. Learn agile methodologies and business intelligence tools.',
    requirements: [
      'Pursuing MBA or B.Tech with interest in business analytics',
      'Strong analytical and communication skills',
      'Proficiency in Excel and PowerPoint',
      'Understanding of project management basics'
    ],
    skills: ['Business Analysis', 'Excel', 'Power BI', 'Agile', 'Documentation'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-09',
  },
  {
    id: 'listing-13',
    title: 'Game Development Intern',
    company: 'PixelPlay Studios',
    location: 'Bangalore, Karnataka',
    duration: 'Jul 2025 - Sep 2025',
    description: 'Join our game development team to create engaging mobile and PC games. Work with Unity or Unreal Engine and learn game design principles.',
    requirements: [
      'Basic knowledge of game development concepts',
      'Programming experience in C# or C++',
      'Creative thinking and problem-solving',
      'Passion for gaming and interactive media'
    ],
    skills: ['Unity', 'C#', 'Game Design', '3D Modeling', 'Animation'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-10',
  },
  {
    id: 'listing-14',
    title: 'Blockchain Developer Intern',
    company: 'CryptoTech Solutions',
    location: 'Delhi, NCR',
    duration: 'Jun 2025 - Aug 2025',
    description: 'Explore blockchain technology and develop smart contracts. Work on decentralized applications and learn about Web3 ecosystem.',
    requirements: [
      'Basic understanding of blockchain concepts',
      'Programming experience in JavaScript or Solidity',
      'Interest in cryptocurrency and DeFi',
      'Strong logical thinking'
    ],
    skills: ['Blockchain', 'Solidity', 'Ethereum', 'Web3', 'Smart Contracts'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-11',
  },
  {
    id: 'listing-15',
    title: 'IoT Developer Intern',
    company: 'SmartDevices Inc',
    location: 'Chennai, Tamil Nadu',
    duration: 'May 2025 - Jul 2025',
    description: 'Work on Internet of Things projects involving sensors, embedded systems, and cloud integration. Build smart solutions for real-world problems.',
    requirements: [
      'Knowledge of electronics and embedded systems',
      'Programming experience in Python or C',
      'Understanding of IoT protocols',
      'Hands-on mindset'
    ],
    skills: ['IoT', 'Arduino', 'Raspberry Pi', 'MQTT', 'Embedded C'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-12',
  },
  {
    id: 'listing-16',
    title: 'Content Writer Intern',
    company: 'ContentHub Media',
    location: 'Remote',
    duration: 'Jun 2025 - Aug 2025',
    description: 'Create engaging technical and marketing content. Write blogs, documentation, and social media posts for tech products.',
    requirements: [
      'Excellent written communication skills',
      'Interest in technology and trends',
      'Ability to research and adapt writing style',
      'Basic SEO knowledge is a plus'
    ],
    skills: ['Technical Writing', 'Content Creation', 'SEO', 'Blogging', 'Copywriting'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-13',
  },
  {
    id: 'listing-17',
    title: 'Quality Assurance Intern',
    company: 'TestPro Technologies',
    location: 'Pune, Maharashtra',
    duration: 'Jul 2025 - Sep 2025',
    description: 'Learn software testing methodologies and automation. Work on test case creation, execution, and bug reporting.',
    requirements: [
      'Understanding of software development lifecycle',
      'Attention to detail and analytical thinking',
      'Basic programming knowledge',
      'Interest in quality assurance'
    ],
    skills: ['Manual Testing', 'Selenium', 'Test Automation', 'Bug Tracking', 'API Testing'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-14',
  },
  {
    id: 'listing-18',
    title: 'AR/VR Developer Intern',
    company: 'ImmersiveTech Labs',
    location: 'Bangalore, Karnataka',
    duration: 'Jun 2025 - Aug 2025',
    description: 'Build immersive augmented and virtual reality experiences. Work with Unity, ARKit, and modern XR platforms.',
    requirements: [
      'Interest in AR/VR technologies',
      'Basic 3D programming knowledge',
      'Familiarity with Unity or Unreal Engine',
      'Creative problem-solving skills'
    ],
    skills: ['Unity', 'AR/VR', 'C#', '3D Graphics', 'ARKit/ARCore'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-15',
  },
  {
    id: 'listing-19',
    title: 'Product Management Intern',
    company: 'InnovateNow Ventures',
    location: 'Mumbai, Maharashtra',
    duration: 'May 2025 - Jul 2025',
    description: 'Learn product management fundamentals. Work on product roadmaps, user research, and feature prioritization with experienced PMs.',
    requirements: [
      'Strong analytical and communication skills',
      'Interest in product strategy and user experience',
      'Ability to work with cross-functional teams',
      'Problem-solving mindset'
    ],
    skills: ['Product Management', 'User Research', 'Roadmapping', 'Analytics', 'Stakeholder Management'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-16',
  },
  {
    id: 'listing-20',
    title: 'Site Reliability Engineer Intern',
    company: 'ScaleOps Systems',
    location: 'Hyderabad, Telangana',
    duration: 'Jun 2025 - Aug 2025',
    description: 'Ensure system reliability and performance. Learn monitoring, incident management, and infrastructure automation in production environments.',
    requirements: [
      'Understanding of Linux systems and networking',
      'Scripting experience (Python, Bash)',
      'Interest in system reliability and scalability',
      'Problem-solving and troubleshooting skills'
    ],
    skills: ['Linux', 'Monitoring', 'Scripting', 'Infrastructure', 'Kubernetes'],
    status: 'approved',
    postedBy: '3',
    postedDate: '2025-02-17',
  }
];

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  listingId: string;
  listingTitle: string;
  company: string;
  status: 'applied' | 'shortlisted' | 'interview-scheduled' | 'test-scheduled' | 'offered' | 'accepted' | 'rejected';
  appliedDate: string;
  resumeUrl?: string;
  interviewSlots?: string[];
  selectedSlot?: string;
  interviewDetails?: {
    scheduledDate: string;
    scheduledTime: string;
    meetingLink: string;
    platform: 'zoom' | 'google-meet' | 'teams' | 'skype';
    instructions: string;
    interviewers: string[];
  };
  onlineTest?: {
    testId: string;
    testName: string;
    platform: 'hackerrank' | 'codility' | 'leetcode' | 'custom';
    testLink: string;
    duration: number; // in minutes
    scheduledDate: string;
    deadline: string;
    instructions: string;
    topics: string[];
    status: 'pending' | 'completed' | 'expired';
    score?: number;
  };
}

export interface LogbookEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  skills: string[];
  hours: number;
}

export interface WeeklyReport {
  id: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  summary: string;
  fileUrl?: string;
  grade?: string;
  facultyFeedback?: string;
  industryFeedback?: string;
  status: 'pending' | 'graded';
}



export const mockApplications: Application[] = [
  {
    id: 'app-001',
    studentId: 'std-001',
    studentName: 'Shantanu Benake',
    listingId: 'listing-1',
    listingTitle: 'Software Engineering Intern',
    company: 'TechCorp Solutions',
    status: 'interview-scheduled',
    appliedDate: '2024-01-15',
    resumeUrl: '/sample-resume.pdf',
    interviewSlots: ['2024-01-20 10:00', '2024-01-20 14:00', '2024-01-21 11:00'],
    selectedSlot: '2024-01-20 14:00',
    interviewDetails: {
      scheduledDate: '2024-01-20',
      scheduledTime: '14:00',
      meetingLink: 'https://zoom.us/j/123456789',
      platform: 'zoom',
      instructions: 'Please join 5 minutes early. Prepare for technical questions on React, Node.js, and data structures.',
      interviewers: ['Sarah Johnson (Tech Lead)', 'Mike Chen (Senior Developer)']
    }
  },
  {
    id: 'app-002',
    studentId: 'std-002',
    studentName: 'Rohit Chavan',
    listingId: 'listing-2',
    listingTitle: 'Data Science Intern',
    company: 'DataInsights Inc',
    status: 'test-scheduled',
    appliedDate: '2024-01-16',
    resumeUrl: '/sample-resume.pdf',
    onlineTest: {
      testId: 'test-ds-001',
      testName: 'Data Science Assessment',
      platform: 'hackerrank',
      testLink: 'https://hackerrank.com/tests/ds-assessment-2024',
      duration: 120,
      scheduledDate: '2024-01-22',
      deadline: '2024-01-22 23:59',
      instructions: 'Complete all questions within 2 hours. Focus on Python, SQL, and machine learning concepts.',
      topics: ['Python Programming', 'SQL Queries', 'Machine Learning', 'Statistics', 'Data Visualization'],
      status: 'pending'
    }
  },
  {
    id: 'app-003',
    studentId: 'std-003',
    studentName: 'Mruganksha Kudake',
    listingId: 'listing-3',
    listingTitle: 'Frontend Developer Intern',
    company: 'WebTech Innovations',
    status: 'interview-scheduled',
    appliedDate: '2024-01-17',
    resumeUrl: '/sample-resume.pdf',
    interviewSlots: ['2024-01-23 09:00', '2024-01-23 15:00', '2024-01-24 10:00'],
    selectedSlot: '2024-01-23 15:00',
    interviewDetails: {
      scheduledDate: '2024-01-23',
      scheduledTime: '15:00',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      platform: 'google-meet',
      instructions: 'Be ready to code live. We will test your HTML, CSS, JavaScript, and React skills.',
      interviewers: ['Alex Rodriguez (Frontend Lead)', 'Emily Davis (UI/UX Designer)']
    },
    onlineTest: {
      testId: 'test-fe-001',
      testName: 'Frontend Coding Challenge',
      platform: 'codility',
      testLink: 'https://app.codility.com/c/start/frontend-challenge-2024',
      duration: 90,
      scheduledDate: '2024-01-21',
      deadline: '2024-01-21 18:00',
      instructions: 'Build a responsive web application as per requirements. Submit your code via GitHub.',
      topics: ['HTML/CSS', 'JavaScript ES6+', 'React', 'Responsive Design', 'Git'],
      status: 'completed',
      score: 85
    }
  },
  {
    id: 'app-004',
    studentId: 'std-004',
    studentName: 'Akansha Patil',
    listingId: 'listing-4',
    listingTitle: 'Digital Marketing Intern',
    company: 'MarketPro Agency',
    status: 'shortlisted',
    appliedDate: '2024-01-18',
    interviewSlots: ['2024-01-25 11:00', '2024-01-25 16:00', '2024-01-26 14:00']
  },
  {
    id: 'app-005',
    studentId: 'std-001',
    studentName: 'Shantanu Benake',
    listingId: 'listing-5',
    listingTitle: 'Cloud DevOps Intern',
    company: 'CloudScale Systems',
    status: 'test-scheduled',
    appliedDate: '2024-01-19',
    onlineTest: {
      testId: 'test-devops-001',
      testName: 'DevOps Technical Assessment',
      platform: 'custom',
      testLink: 'https://cloudscale-systems.com/assessment/devops-2024',
      duration: 150,
      scheduledDate: '2024-01-24',
      deadline: '2024-01-24 20:00',
      instructions: 'Complete Docker, Kubernetes, and AWS related tasks. You will be given access to a sandbox environment.',
      topics: ['Docker', 'Kubernetes', 'AWS Services', 'CI/CD Pipelines', 'Linux Administration'],
      status: 'pending'
    }
  },
  {
    id: 'app-006',
    studentId: 'std-002',
    studentName: 'Rohit Chavan',
    listingId: 'listing-6',
    listingTitle: 'Backend Developer Intern',
    company: 'ServerTech Solutions',
    status: 'offered',
    appliedDate: '2024-01-14',
    interviewDetails: {
      scheduledDate: '2024-01-19',
      scheduledTime: '11:00',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/19%3Ameeting',
      platform: 'teams',
      instructions: 'Interview completed successfully. Offer extended based on performance.',
      interviewers: ['David Kim (Backend Lead)', 'Lisa Zhang (System Architect)']
    },
    onlineTest: {
      testId: 'test-be-001',
      testName: 'Backend Development Challenge',
      platform: 'leetcode',
      testLink: 'https://leetcode.com/contest/servertech-backend-2024',
      duration: 180,
      scheduledDate: '2024-01-17',
      deadline: '2024-01-17 18:00',
      instructions: 'Solve algorithmic problems and design a REST API.',
      topics: ['Data Structures', 'Algorithms', 'Database Design', 'API Design', 'System Design'],
      status: 'completed',
      score: 92
    }
  },
  {
    id: 'app-007',
    studentId: 'std-003',
    studentName: 'Mruganksha Kudake',
    listingId: 'listing-7',
    listingTitle: 'UX/UI Design Intern',
    company: 'DesignStudio Pro',
    status: 'applied',
    appliedDate: '2024-01-20'
  },
  {
    id: 'app-008',
    studentId: 'std-005',
    studentName: 'Arjun Sharma',
    listingId: 'listing-8',
    listingTitle: 'Mobile App Developer Intern',
    company: 'MobileFirst Technologies',
    status: 'interview-scheduled',
    appliedDate: '2024-01-12',
    interviewSlots: ['2024-01-26 10:00', '2024-01-26 14:00', '2024-01-27 09:00'],
    selectedSlot: '2024-01-26 14:00',
    interviewDetails: {
      scheduledDate: '2024-01-26',
      scheduledTime: '14:00',
      meetingLink: 'https://skype.com/join/mobile-interview-2024',
      platform: 'skype',
      instructions: 'Prepare to discuss your mobile app projects. We will cover React Native, Flutter, and native development.',
      interviewers: ['Jennifer Wu (Mobile Lead)', 'Carlos Martinez (iOS Developer)']
    }
  }
];

export const mockLogbookEntries: LogbookEntry[] = [
  {
    id: 'log-1',
    date: '2025-06-02',
    title: 'Python Basics and Environment Setup',
    description: 'Learned Python command-line usage and set up development environment. Explored basic syntax and data types.',
    skills: ['Python'],
    hours: 6,
  },
  {
    id: 'log-2',
    date: '2025-06-09',
    title: 'API Development Fundamentals',
    description: 'Built a mini tool to fetch data from public APIs. Focused on parsing JSON responses and handling edge cases.',
    skills: ['Python', 'API Design'],
    hours: 8,
  },
  {
    id: 'log-3',
    date: '2025-06-16',
    title: 'Advanced Data Structures',
    description: 'Implemented complex data structures for efficient data handling. Worked on optimization techniques.',
    skills: ['Data Structures', 'Python'],
    hours: 7,
  },
];

export const mockWeeklyReports: WeeklyReport[] = [
  {
    id: 'report-1',
    weekNumber: 1,
    startDate: '2025-06-01',
    endDate: '2025-06-07',
    summary: 'Completed Python basics training and environment setup. Explored core concepts and started hands-on exercises.',
    fileUrl: '/reports/week1.pdf',
    grade: 'A',
    facultyFeedback: 'Excellent progress! Shows strong understanding of fundamentals. Keep up the systematic approach to learning.',
    industryFeedback: 'Quick learner. Adapted well to the development environment and tools. Good initiative in exploring beyond basics.',
    status: 'graded',
  },
  {
    id: 'report-2',
    weekNumber: 2,
    startDate: '2025-06-08',
    endDate: '2025-06-14',
    summary: 'Developed API integration skills. Successfully built a tool for fetching and parsing data from public APIs.',
    fileUrl: '/reports/week2.pdf',
    grade: 'A+',
    facultyFeedback: 'Outstanding work on the API project. Great attention to error handling. Demonstrated excellent problem-solving skills.',
    industryFeedback: 'Impressed with the quality of code and attention to edge cases. Shows professional approach to development.',
    status: 'graded',
  },
  {
    id: 'report-3',
    weekNumber: 3,
    startDate: '2025-06-15',
    endDate: '2025-06-21',
    summary: 'Working on data structures implementation and optimization techniques.',
    fileUrl: '/reports/week3.pdf',
    status: 'pending',
  },
];

export interface StudentProgress {
  studentId: string;
  studentName: string;
  company: string;
  position: string;
  mentor: string;
  weeklyReports: WeeklyReport[];
  logbookEntries: LogbookEntry[];
  overallGrade?: string;
  finalEvaluation?: {
    technical: number;
    communication: number;
    teamwork: number;
    problemSolving: number;
    overall: number;
    comments: string;
  };
}

export interface CurriculumFeedback {
  id: string;
  submittedBy: string;
  submitterType: 'student' | 'industry';
  company?: string;
  feedbackType: 'curriculum' | 'skills' | 'preparation';
  currentCurriculum: string[];
  suggestedChanges: string[];
  skillGaps: string[];
  industryTrends: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  submittedDate: string;
  status: 'pending' | 'reviewed' | 'implemented';
}

export interface SkillAnalytics {
  skill: string;
  demandScore: number;
  studentProficiency: number;
  industryExpectation: number;
  gapAnalysis: number;
  trendDirection: 'increasing' | 'decreasing' | 'stable';
  recommendedActions: string[];
}

export interface CurriculumInsight {
  id: string;
  category: 'skill-gap' | 'emerging-tech' | 'industry-demand' | 'student-performance';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  confidence: number;
  aiRecommendation: string;
  implementationPlan: string[];
  affectedStudents: number;
  industryPartners: string[];
  generatedDate: string;
}

export const mockStudentProgress: StudentProgress = {
  studentId: '1',
  studentName: 'Krushna Bankar',
  company: 'Main Flow Services and Technologies Pvt. Ltd.',
  position: 'Software Intern',
  mentor: 'Archit Shelar',
  weeklyReports: mockWeeklyReports,
  logbookEntries: mockLogbookEntries,
  overallGrade: 'A+',
  finalEvaluation: {
    technical: 5,
    communication: 5,
    teamwork: 5,
    problemSolving: 5,
    overall: 5,
    comments: 'Exceptional performance throughout the internship. Krushna demonstrated strong technical skills, excellent problem-solving abilities, and great teamwork. He consistently delivered high-quality work and showed enthusiasm for learning.',
  },
};

// Analytics and Feedback Mock Data
export const mockCurriculumFeedback: CurriculumFeedback[] = [
  {
    id: 'feedback-001',
    submittedBy: 'TechCorp Solutions',
    submitterType: 'industry',
    company: 'TechCorp Solutions',
    feedbackType: 'skills',
    currentCurriculum: ['Java Programming', 'Data Structures', 'Database Management', 'Software Engineering'],
    suggestedChanges: ['Add cloud computing modules', 'Include DevOps practices', 'Modern JavaScript frameworks', 'Agile methodologies'],
    skillGaps: ['Cloud platforms (AWS/Azure)', 'Container technologies (Docker)', 'CI/CD pipelines', 'Modern frontend frameworks'],
    industryTrends: ['Microservices architecture', 'Serverless computing', 'AI/ML integration', 'Cybersecurity awareness'],
    priority: 'high',
    description: 'Students have strong programming fundamentals but lack modern development practices and cloud technologies that are essential in current industry.',
    submittedDate: '2024-01-20',
    status: 'pending'
  },
  {
    id: 'feedback-002',
    submittedBy: 'DataInsights Inc',
    submitterType: 'industry',
    company: 'DataInsights Inc',
    feedbackType: 'curriculum',
    currentCurriculum: ['Statistics', 'Python Programming', 'Database Systems', 'Mathematics'],
    suggestedChanges: ['Advanced machine learning', 'Big data technologies', 'Data visualization tools', 'Business intelligence'],
    skillGaps: ['TensorFlow/PyTorch', 'Hadoop/Spark', 'Tableau/Power BI', 'Statistical modeling'],
    industryTrends: ['Deep learning applications', 'Real-time analytics', 'Edge computing', 'AutoML platforms'],
    priority: 'critical',
    description: 'Data science curriculum needs significant updates to match industry standards. Current focus is too theoretical.',
    submittedDate: '2024-01-18',
    status: 'reviewed'
  },
  {
    id: 'feedback-003',
    submittedBy: 'Shantanu Benake',
    submitterType: 'student',
    feedbackType: 'preparation',
    currentCurriculum: ['Programming Languages', 'System Design', 'Database Management'],
    suggestedChanges: ['More practical projects', 'Industry guest lectures', 'Soft skills training', 'Interview preparation'],
    skillGaps: ['Communication skills', 'Project management', 'Team collaboration', 'Technical presentation'],
    industryTrends: ['Remote work collaboration', 'Cross-functional teams', 'Continuous learning', 'Innovation mindset'],
    priority: 'medium',
    description: 'Need more practical exposure and soft skills development to be industry-ready.',
    submittedDate: '2024-01-19',
    status: 'pending'
  }
];

export const mockSkillAnalytics: SkillAnalytics[] = [
  {
    skill: 'React.js',
    demandScore: 92,
    studentProficiency: 65,
    industryExpectation: 85,
    gapAnalysis: 20,
    trendDirection: 'increasing',
    recommendedActions: ['Add advanced React patterns course', 'Include React Native basics', 'Focus on state management with Redux']
  },
  {
    skill: 'Cloud Computing',
    demandScore: 88,
    studentProficiency: 25,
    industryExpectation: 75,
    gapAnalysis: 50,
    trendDirection: 'increasing',
    recommendedActions: ['Introduce AWS/Azure fundamentals', 'Add hands-on cloud projects', 'Include DevOps practices']
  },
  {
    skill: 'Communication',
    demandScore: 95,
    studentProficiency: 45,
    industryExpectation: 90,
    gapAnalysis: 45,
    trendDirection: 'stable',
    recommendedActions: ['Mandatory presentation skills', 'Technical writing workshops', 'Group project collaborations']
  },
  {
    skill: 'Machine Learning',
    demandScore: 78,
    studentProficiency: 40,
    industryExpectation: 70,
    gapAnalysis: 30,
    trendDirection: 'increasing',
    recommendedActions: ['Add practical ML projects', 'Include popular frameworks', 'Focus on real-world applications']
  },
  {
    skill: 'Data Structures',
    demandScore: 85,
    studentProficiency: 80,
    industryExpectation: 85,
    gapAnalysis: 5,
    trendDirection: 'stable',
    recommendedActions: ['Maintain current standards', 'Add competitive programming', 'Include advanced algorithms']
  }
];

export const mockCurriculumInsights: CurriculumInsight[] = [
  {
    id: 'insight-001',
    category: 'skill-gap',
    title: 'Critical Cloud Computing Skills Gap',
    description: 'There is a significant 50-point gap between industry expectation (75%) and current student proficiency (25%) in cloud computing skills.',
    impact: 'high',
    confidence: 95,
    aiRecommendation: 'Immediately introduce cloud computing fundamentals course with hands-on AWS/Azure labs. Partner with cloud providers for certification programs.',
    implementationPlan: [
      'Design cloud computing curriculum with AWS/Azure focus',
      'Set up cloud lab environment for hands-on practice',
      'Partner with cloud providers for resources and certification',
      'Train faculty on cloud technologies',
      'Integrate cloud deployment in existing projects'
    ],
    affectedStudents: 250,
    industryPartners: ['TechCorp Solutions', 'CloudScale Systems', 'DataInsights Inc'],
    generatedDate: '2024-01-20'
  },
  {
    id: 'insight-002',
    category: 'industry-demand',
    title: 'Rising Demand for Full-Stack Development',
    description: 'Industry feedback shows 85% increase in demand for full-stack developers with React and Node.js skills.',
    impact: 'high',
    confidence: 88,
    aiRecommendation: 'Expand current web development curriculum to include comprehensive full-stack development track with modern frameworks.',
    implementationPlan: [
      'Update frontend curriculum with React advanced concepts',
      'Add Node.js and Express backend development',
      'Include database integration and API development',
      'Create full-stack capstone projects',
      'Establish industry mentorship program'
    ],
    affectedStudents: 180,
    industryPartners: ['WebTech Innovations', 'TechCorp Solutions', 'MobileFirst Technologies'],
    generatedDate: '2024-01-19'
  },
  {
    id: 'insight-003',
    category: 'student-performance',
    title: 'Strong Performance in Data Structures',
    description: 'Students consistently perform well in data structures with only 5-point gap from industry expectations.',
    impact: 'low',
    confidence: 92,
    aiRecommendation: 'Maintain current curriculum excellence while considering advanced algorithms and competitive programming additions.',
    implementationPlan: [
      'Continue current data structures curriculum',
      'Add advanced algorithms optional course',
      'Introduce competitive programming elements',
      'Create algorithm optimization workshops',
      'Share best practices with other technical courses'
    ],
    affectedStudents: 300,
    industryPartners: ['All Technical Companies'],
    generatedDate: '2024-01-18'
  },
  {
    id: 'insight-004',
    category: 'emerging-tech',
    title: 'AI/ML Integration Opportunity',
    description: 'Emerging trend shows 78% industry demand for AI/ML skills with growing market opportunities.',
    impact: 'medium',
    confidence: 82,
    aiRecommendation: 'Develop introductory AI/ML curriculum focusing on practical applications and popular frameworks.',
    implementationPlan: [
      'Create AI/ML fundamentals course',
      'Include hands-on projects with TensorFlow/PyTorch',
      'Add data science track for interested students',
      'Partner with AI companies for real-world projects',
      'Establish AI research lab for advanced students'
    ],
    affectedStudents: 120,
    industryPartners: ['DataInsights Inc', 'AI Innovation Labs'],
    generatedDate: '2024-01-17'
  }
];

export const mockUsers: User[] = [
  {
    id: 'std-001',
    name: 'Shantanu Benake',
    email: 'shantanu.benake@internconnect.com',
    role: 'student',
    profileImage: '/placeholder.svg',
    skills: ['React.js', 'Node.js', 'JavaScript', 'Python', 'MySQL'],
    bio: 'Passionate full-stack developer with experience in modern web technologies.',
    location: 'Pune, Maharashtra',
    graduationYear: 2024,
    cgpa: 8.5,
    department: 'Computer Science',
    phone: '+91 9876543210',
    portfolio: 'https://shantanu-portfolio.com',
    linkedin: 'https://linkedin.com/in/shantanu-benake',
    github: 'https://github.com/shantanu-benake'
  },
  {
    id: 'std-002',
    name: 'Rohit Chavan',
    email: 'rohit.chavan@internconnect.com',
    role: 'student',
    profileImage: '/placeholder.svg',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'TensorFlow'],
    bio: 'Data science enthusiast with strong analytical skills and programming background.',
    location: 'Mumbai, Maharashtra',
    graduationYear: 2024,
    cgpa: 8.2,
    department: 'Computer Science',
    phone: '+91 9876543211',
    portfolio: 'https://rohit-datascience.com',
    linkedin: 'https://linkedin.com/in/rohit-chavan',
    github: 'https://github.com/rohit-chavan'
  },
  {
    id: 'std-003',
    name: 'Mruganksha Kudake',
    email: 'mruganksha.kudake@internconnect.com',
    role: 'student',
    profileImage: '/placeholder.svg',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'UI/UX Design'],
    bio: 'Frontend developer with an eye for design and user experience.',
    location: 'Nagpur, Maharashtra',
    graduationYear: 2024,
    cgpa: 8.7,
    department: 'Computer Science',
    phone: '+91 9876543212',
    portfolio: 'https://mruganksha-designs.com',
    linkedin: 'https://linkedin.com/in/mruganksha-kudake',
    github: 'https://github.com/mruganksha-kudake'
  },
  {
    id: 'std-004',
    name: 'Akansha Patil',
    email: 'akansha.patil@internconnect.com',
    role: 'student',
    profileImage: '/placeholder.svg',
    skills: ['Digital Marketing', 'Content Creation', 'SEO', 'Social Media', 'Analytics'],
    bio: 'Creative digital marketer with expertise in social media and content strategy.',
    location: 'Pune, Maharashtra',
    graduationYear: 2024,
    cgpa: 8.4,
    department: 'Marketing',
    phone: '+91 9876543213',
    portfolio: 'https://akansha-marketing.com',
    linkedin: 'https://linkedin.com/in/akansha-patil',
    github: 'https://github.com/akansha-patil'
  },
  {
    id: 'std-005',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@internconnect.com',
    role: 'student',
    profileImage: '/placeholder.svg',
    skills: ['Java', 'Android', 'Kotlin', 'Firebase', 'Flutter'],
    bio: 'Mobile app developer specializing in Android development and cross-platform solutions.',
    location: 'Delhi, India',
    graduationYear: 2024,
    cgpa: 8.1,
    department: 'Computer Science',
    phone: '+91 9876543214',
    portfolio: 'https://arjun-mobile.com',
    linkedin: 'https://linkedin.com/in/arjun-sharma',
    github: 'https://github.com/arjun-sharma'
  },
  {
    id: 'faculty-001',
    name: 'Harish Gadade',
    email: 'harish.gadade@university.edu',
    role: 'faculty',
    profileImage: '/placeholder.svg',
    department: 'Computer Science',
    bio: 'Professor of Computer Science with expertise in software engineering and data structures.',
    phone: '+91 9876543215',
    linkedin: 'https://linkedin.com/in/harish-gadade'
  },
  {
    id: 'industry-001',
    name: 'Archit Shelar',
    email: 'archit.shelar@techcorp.com',
    role: 'industry',
    profileImage: '/placeholder.svg',
    company: 'TechCorp Solutions',
    position: 'Senior Software Engineer',
    bio: 'Experienced software engineer and mentor specializing in full-stack development.',
    phone: '+91 9876543216',
    linkedin: 'https://linkedin.com/in/archit-shelar'
  }
];
