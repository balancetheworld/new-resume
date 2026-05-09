import type { ResumeData } from '@/lib/resume-context'
import { getResumeTemplate } from '@/lib/resume-templates'
import { getMessages } from '@/lib/i18n/messages'
import { defaultLocale, type Locale } from '@/lib/i18n/config'

const generateId = () => Math.random().toString(36).substring(2, 11)

export function createEmptyResumeData(templateId?: string, locale: Locale = defaultLocale): ResumeData {
  const now = new Date().toISOString()
  const template = getResumeTemplate(templateId, locale)
  const dictionary = getMessages(locale)

  return {
    resumeName: dictionary.data.resumes.defaultName,
    templateId: template.id,
    templateName: template.name,
    personalInfo: {
      name: '',
      jobTitle: '',
      gender: '',
      educationLevel: '',
      school: '',
      major: '',
      qq: '',
      wechat: '',
      phone: '',
      github: '',
      portfolio: '',
    },
    workExperience: [
      {
        id: generateId(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        highlights: [],
      },
    ],
    education: [],
    skills: [
      {
        id: generateId(),
        category: '个人能力',
        items: [],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: '',
        description: '',
        technologies: [],
        highlights: [],
      },
    ],
    style: template.style,
    status: 'draft',
    pages: 1,
    createdAt: now,
    updatedAt: now,
  }
}

export function createDemoResumeData(
  resumeId?: string,
  templateId?: string,
  locale: Locale = defaultLocale
): ResumeData {
  const now = new Date().toISOString()
  const template = getResumeTemplate(templateId, locale)
  const dictionary = getMessages(locale)

  return {
    resumeName:
      resumeId === 'new' || !resumeId
        ? dictionary.data.resumes.defaultName
        : dictionary.data.resumes.frontendName,
    templateId: template.id,
    templateName: template.name,
    personalInfo: {
      name: dictionary.data.demo.name,
      jobTitle: dictionary.data.demo.jobTitle,
      gender: dictionary.data.demo.gender,
      educationLevel: dictionary.data.demo.educationLevel,
      school: dictionary.data.demo.school,
      major: dictionary.data.demo.major,
      qq: '123456789',
      wechat: dictionary.data.demo.wechat,
      phone: '+86 138-0000-1234',
      github: 'github.com/resume-editor',
      portfolio: 'https://portfolio.example.com',
    },
    workExperience: [
      {
        id: generateId(),
        company: dictionary.data.demo.company,
        position: dictionary.data.demo.position,
        location: dictionary.data.demo.location,
        startDate: '2025-06',
        endDate: '',
        current: true,
        description: dictionary.data.demo.workDescription,
        highlights: [...dictionary.data.demo.workHighlights],
      },
    ],
    education: [],
    skills: [
      {
        id: generateId(),
        category: '个人能力',
        items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js'],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: dictionary.data.demo.projectName,
        description: dictionary.data.demo.projectDescription,
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        link: 'https://github.com/resume-editor',
        highlights: [...dictionary.data.demo.projectHighlights],
      },
    ],
    style: template.style,
    status: 'editing',
    pages: 1,
    createdAt: now,
    updatedAt: now,
  }
}
