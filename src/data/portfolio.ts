export const portfolio = {
  name: 'Abhay Sonone',
  initials: 'AS',
  headline: 'Full Stack Developer | AI/ML & FinTech Enthusiast',
  role: 'Computer Engineering Student',
  college: 'Vidyalankar Institute of Technology, Mumbai',
  profileImage: '/images/profile.jpg',
  heroImages: Array.from({ length: 8 }, (_, index) => `/images/hero/hero-${index + 1}.jpg`),
  highlights: [
    'Building AI-powered, data-driven and full-stack applications',
    'Hackathon Builder • Problem Solver • Exploring FinTech & Applied AI',
  ],
  // Replace null with your real HTTPS profile URLs or a mailto: email link.
  socials: [
    { kind: 'github', label: 'GitHub profile', href: null },
    { kind: 'linkedin', label: 'LinkedIn profile', href: null },
    { kind: 'email', label: 'Send email', href: null },
  ] satisfies { kind: 'github' | 'linkedin' | 'email'; label: string; href: string | null }[],
}

export type EducationEntry = {
  id: string
  degree: string
  institution: string
  period: string
  icon: 'degree' | 'diploma' | 'school'
  highlights: string[]
  current: boolean
  detailsPending?: boolean
}

export const education: EducationEntry[] = [
  {
    id: 'bachelors',
    degree: 'Bachelor of Engineering in Computer Engineering',
    institution: 'Vidyalankar Institute of Technology, Mumbai',
    period: '2025 – Present',
    icon: 'degree',
    current: true,
    highlights: [
      'Third Year Computer Engineering Student',
      'Currently in Semester 5',
      'Building practical full-stack and AI-oriented projects',
      'Active participation in hackathons and technical projects',
    ],
  },
  {
    id: 'diploma',
    degree: 'Diploma in Information Technology',
    institution: 'Vidyalankar Polytechnic, Mumbai',
    period: '2022 – 2025',
    icon: 'diploma',
    current: false,
    highlights: [
      'Diploma in Information Technology',
      'Built a foundation in programming and software development',
      'Explored web and application development',
      'Developed interest in practical technology projects',
    ],
  },
  {
    id: 'ssc',
    degree: 'Secondary School Certificate (SSC)',
    // Replace these placeholders once the school and year are verified.
    institution: 'Add School Name',
    period: 'Add Year',
    icon: 'school',
    current: false,
    detailsPending: true,
    highlights: [
      'Completed Secondary School education',
      'Developed foundational interest in STEM and technology',
    ],
  },
]

// Broad areas of interest, not exact transcript course names.
export const studyAreas = [
  'Data Structures',
  'Database Systems',
  'Computer Networks',
  'Operating Systems',
  'Software Engineering',
  'Artificial Intelligence',
]

export type ExperienceEntry = {
  id: string
  category: string
  title: string
  context: string
  description: string
  icon: 'code' | 'idea' | 'team'
  highlights: string[]
  tags: string[]
}

// Student technical experience; these entries do not represent employment.
export const experience: ExperienceEntry[] = [
  {
    id: 'project-development',
    category: 'Project Development',
    title: 'Full Stack & AI Project Development',
    context: 'Personal & Academic Projects',
    description: 'Designing and developing practical software projects using frontend, backend, databases and AI-oriented features. My project work focuses on understanding real-world requirements and converting them into usable, structured applications.',
    icon: 'code',
    highlights: [
      'Building responsive frontend interfaces',
      'Developing backend APIs and application logic',
      'Working with databases and structured data',
      'Exploring AI/NLP integration in practical applications',
    ],
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'AI/ML'],
  },
  {
    id: 'hackathon-development',
    category: 'Hackathon Experience',
    title: 'Hackathon-Based Problem Solving',
    context: 'College & Technical Competitions',
    description: 'Working in time-constrained team environments to understand problem statements, design technical solutions, divide responsibilities and build working prototypes.',
    icon: 'idea',
    highlights: [
      'Problem statement analysis',
      'Rapid prototyping',
      'Team collaboration',
      'Technical presentation and solution explanation',
    ],
    tags: ['Problem Solving', 'Teamwork', 'Rapid Prototyping', 'Full Stack', 'Presentation'],
  },
  {
    id: 'technical-collaboration',
    category: 'Technical Collaboration',
    title: 'Academic & Team Project Collaboration',
    context: 'Computer Engineering',
    description: 'Collaborating on technical projects and academic development work while strengthening software engineering, communication and team-based problem-solving skills.',
    icon: 'team',
    highlights: [
      'Collaborative development',
      'Git-based project workflow',
      'Requirement analysis',
      'Documentation and technical communication',
    ],
    tags: ['Git', 'GitHub', 'Collaboration', 'Documentation', 'Software Engineering'],
  },
]

export type Project = {
  id: string
  title: string
  category?: string
  description: string
  image?: string
  imageAlt?: string
  technologies: string[]
  github?: string
  liveUrl?: string
  featured?: boolean
  placeholder?: boolean
}

export const projects: Project[] = [
  {
    id: 'udyammitra',
    title: 'UdyamMitra',
    category: 'AI-Powered Business Advisory Platform',
    description: 'An AI-powered multilingual business advisory platform designed to help rural and semi-urban entrepreneurs evaluate business opportunities, understand local market conditions and plan financing using data-driven analysis.',
    image: '/projects/udyammitra.webp',
    imageAlt: 'UdyamMitra business advisory platform preview',
    technologies: ['React', 'TypeScript', 'Vite', 'FastAPI', 'PostgreSQL', 'PostGIS', 'AI/NLP'],
    featured: true,
    // Add verified github and liveUrl values when available. Actions stay hidden until then.
  },
  {
    id: 'coming-soon-2',
    title: 'Project Coming Soon',
    description: 'Additional project details will be added here.',
    technologies: [],
    placeholder: true,
  },
  {
    id: 'coming-soon-3',
    title: 'Project Coming Soon',
    description: 'Additional project details will be added here.',
    technologies: [],
    placeholder: true,
  },
]

export type Testimonial = {
  id: string
  name: string
  role: string
  organization?: string
  quote: string
  image?: string
  linkedin?: string
}

// Add only verified recommendations with permission to publish.
export const testimonials: Testimonial[] = []

export const contact: {
  email: string
  socials: { platform: 'github' | 'linkedin' | 'instagram'; label: string; url: string }[]
} = {
  // Add a real email address without the mailto: prefix.
  email: '',
  socials: [
    { platform: 'github', label: 'GitHub profile', url: '' },
    { platform: 'linkedin', label: 'LinkedIn profile', url: '' },
    { platform: 'instagram', label: 'Instagram profile', url: '' },
  ],
}
