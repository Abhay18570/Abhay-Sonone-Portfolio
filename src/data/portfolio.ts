import udyamMitraImage from '../images/UdyamMitra.png'
import misImage from '../images/MIS.png'
import sahayakImage from '../images/Sahayak.png'

export type SocialPlatform = 'github' | 'linkedin' | 'instagram'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  url: string
}

export const socialLinks: SocialLink[] = [
  { platform: 'github', label: 'Visit my GitHub profile', url: 'https://github.com/Abhay18570' },
  { platform: 'linkedin', label: 'Visit my LinkedIn profile', url: 'https://www.linkedin.com/in/abhay-sonone-146a6b2b6/' },
  { platform: 'instagram', label: 'Visit my Instagram profile', url: 'https://www.instagram.com/abhay_sonone_18/' },
]

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
    'Full Stack Developer • Building practical web applications',
    'AI/ML Enthusiast • Exploring intelligent and data-driven solutions',
    'FinTech Enthusiast • Exploring technology in financial services',
    'Hackathon Builder • Turning ideas into working solutions',
  ],
  socials: socialLinks,
}

export type EducationEntry = {
  id: string
  degree: string
  field: string
  institution: string
  period: string
  result: string
  icon: 'degree' | 'diploma' | 'school'
  highlights: string[]
  current: boolean
}

export const education: EducationEntry[] = [
  {
    id: 'bachelors',
    degree: 'Bachelor of Technology',
    field: 'Computer Engineering',
    institution: 'Vidyalankar Institute of Technology',
    period: '2025 – 2028',
    result: 'CGPA: 8.99',
    icon: 'degree',
    current: true,
    highlights: [
      'Current CGPA: 8.99',
      'Active in hackathons',
      'Web & AI projects',
    ],
  },
  {
    id: 'diploma',
    degree: 'Diploma in Information Technology',
    field: 'Information Technology',
    institution: 'Shivajirao S. Jondhle Polytechnic, Asangaon',
    period: '2022 – 2025',
    result: 'Percentage: 91.00%',
    icon: 'diploma',
    current: false,
    highlights: [
      'Graduated with distinction: 91.00%',
      'Java & Web experience',
      'Technical events',
    ],
  },
  {
    id: 'ssc',
    degree: 'Secondary School Certificate (SSC)',
    field: 'General Studies',
    institution: 'Sanskar English Medium School, Anjur',
    period: '2022',
    result: 'SSC Completed',
    icon: 'school',
    current: false,
    highlights: [
      'Strong Geography foundation',
      'STEM focused',
      'Cultural activities',
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
  role: string
  company: string
  type: 'Internship' | 'Part-time' | 'Full-time'
  period: string
  durationLabel?: string
  location?: string
  workMode?: 'Remote' | 'On-site' | 'Hybrid'
  current?: boolean
  description: string
  highlights: string[]
  tags: string[]
  icon: 'code' | 'web' | 'partner' | 'mobile'
}

export const experience: ExperienceEntry[] = [
  {
    id: 'code-b-solutions',
    role: 'Full Stack Developer Intern',
    company: 'Code-B Solutions Pvt. Ltd.',
    type: 'Internship',
    period: '23 Jul 2026 – 23 Sep 2026',
    location: 'Mulund, Mumbai',
    workMode: 'Remote',
    description: 'Worked as a Full Stack Developer Intern, contributing to web application development across frontend, backend, and database components.',
    highlights: [
      'Developed and maintained full-stack web application features',
      'Built responsive user interfaces and integrated APIs',
      'Worked across frontend, backend, and database components',
      'Debugged issues and improved application functionality',
    ],
    tags: ['Full Stack Development', 'Frontend', 'Backend', 'API Integration', 'Database'],
    icon: 'code',
  },
  {
    id: 'internship-studio',
    role: 'Web Development Intern',
    company: 'Internship Studio',
    type: 'Internship',
    period: 'Dec 2025 – Apr 2026',
    durationLabel: '5 mos',
    workMode: 'Remote',
    description: 'Completed an internship in website design and development, gaining practical exposure to building responsive and user-friendly web pages.',
    highlights: [
      'Developed responsive web pages and interfaces',
      'Worked with HTML, CSS and web development fundamentals',
      'Applied frontend development concepts to practical tasks',
      'Improved understanding of responsive and user-friendly design',
    ],
    tags: ['HTML5', 'CSS3', 'Web Development', 'Responsive Design', 'Frontend Development'],
    icon: 'web',
  },
  {
    id: 'internshala',
    role: 'Internshala Student Partner (ISP)',
    company: 'Internshala',
    type: 'Part-time',
    period: 'Feb 2026 – Mar 2026',
    durationLabel: '2 mos',
    location: 'Wadala, Mumbai',
    workMode: 'On-site',
    description: 'Selected as an Internshala Student Partner (ISP) to represent Internshala at the campus level and promote internship and online training opportunities among students.',
    highlights: [
      'Represented Internshala at the campus level',
      'Promoted internship and training opportunities among students',
      'Engaged with students through campus outreach',
      'Developed communication, promotion and leadership experience',
    ],
    tags: ['Communication', 'Brand Marketing', 'Campus Outreach', 'Leadership'],
    icon: 'partner',
  },
  {
    id: 'v2v-edtech',
    role: 'Mobile Application Developer Intern',
    company: 'V2V EdTech LLP',
    type: 'Internship',
    period: 'Jun 2024 – Jul 2024',
    durationLabel: '2 mos',
    location: 'Kalyan, Maharashtra, India',
    workMode: 'On-site',
    description: 'Worked as a Mobile Application Developer Intern and gained practical exposure to mobile application development and Android development.',
    highlights: [
      'Worked on mobile application development tasks',
      'Gained practical exposure to Android development',
      'Applied programming concepts to application development',
      'Strengthened understanding of software development workflows',
    ],
    tags: ['Mobile Application Development', 'Android Development', 'Java', 'Application Development'],
    icon: 'mobile',
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
    category: 'AI-POWERED BUSINESS ADVISORY PLATFORM',
    description: 'An AI-powered multilingual business advisory platform designed to help rural and semi-urban entrepreneurs evaluate business opportunities, understand local market conditions, and plan financing using data-driven analysis.',
    image: udyamMitraImage,
    imageAlt: 'UdyamMitra business advisory platform landing page',
    technologies: ['React', 'TypeScript', 'Vite', 'FastAPI', 'PostgreSQL', 'PostGIS', 'AI/NLP'],
    liveUrl: 'https://udyammitra-rural-business-advisor-w.vercel.app',
    featured: true,
  },
  {
    id: 'mis-invoicing',
    title: 'MIS & Invoicing System',
    category: 'BUSINESS MANAGEMENT & INVOICING PLATFORM',
    description: 'A centralized Management Information System for managing clients, estimates, invoices and payments, designed to simplify business workflows and provide clear payment visibility.',
    image: misImage,
    imageAlt: 'Code-B MIS and invoicing system landing page',
    technologies: ['React', 'Vite', 'JavaScript', 'Bootstrap', 'Axios', 'MySQL'],
    liveUrl: 'https://management-information-system-mis-lovat.vercel.app',
  },
  {
    id: 'sahayak',
    title: 'Sahayak',
    category: 'LOCAL SERVICE DISCOVERY PLATFORM',
    description: 'A local service discovery platform designed to help users find and connect with trusted service providers through a simple and accessible digital experience.',
    image: sahayakImage,
    imageAlt: 'Sahayak local service platform landing page',
    technologies: ['React', 'Java', 'Spring Boot', 'MySQL', 'Google Maps API'],
    liveUrl: 'https://sahayak-your-trusted-local-service.vercel.app',
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
  socials: SocialLink[]
} = {
  // Add a real email address without the mailto: prefix.
  email: '',
  socials: socialLinks,
}
