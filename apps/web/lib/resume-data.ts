import type { ResumeData } from '@/lib/resume-context'
import { getResumeTemplateDefinition } from '@/lib/template-registry'
import { getMessages } from '@/lib/i18n/messages'
import { defaultLocale, type Locale } from '@/lib/i18n/config'

const generateId = () => Math.random().toString(36).substring(2, 11)

export function createEmptyResumeData(templateId?: string, locale: Locale = defaultLocale): ResumeData {
  const now = new Date().toISOString()
  const template = getResumeTemplateDefinition(templateId, locale).meta
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
      photo: '',
      campusExperience: '',
      selfEvaluation: '',
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
