// Resume Types - shared between frontend and backend

export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  summary: string
  avatar?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  highlights: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  highlights: string[]
}

export interface Skill {
  id: string
  category: string
  items: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  highlights: string[]
}

export interface ResumeData {
  id: string
  personalInfo: PersonalInfo
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  createdAt: string
  updatedAt: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface SaveResumeRequest {
  resume: ResumeData
}

export interface PublishResumeResponse {
  shareUrl: string
  publishedAt: string
}
