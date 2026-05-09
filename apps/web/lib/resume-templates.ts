import type { ResumeStyle } from '@/lib/resume-context'
import { getMessages } from '@/lib/i18n/messages'
import { defaultLocale, type Locale } from '@/lib/i18n/config'

export interface ResumeTemplateDefinition {
  id: string
  name: string
  description: string
  tags: string[]
  featured?: boolean
  previewTone: 'blue' | 'stone' | 'cyan'
  style: ResumeStyle
}

export function getResumeTemplates(locale: Locale = defaultLocale): ResumeTemplateDefinition[] {
  const dictionary = getMessages(locale)

  return [
    {
      id: 'default-cn',
      name: dictionary.data.templateNames.default,
      description: dictionary.data.templateDescriptions.default,
      tags: ['Popular', 'Modern', 'Tech'],
      featured: true,
      previewTone: 'blue',
      style: {
        accentColor: '#85B7EB',
        fontFamily: 'inter',
        density: 'fit',
        margin: 'normal',
        highlight: ['sections'],
      },
    },
    {
      id: 'classic-cn',
      name: dictionary.data.templateNames.classic,
      description: dictionary.data.templateDescriptions.classic,
      tags: ['Classic'],
      previewTone: 'stone',
      style: {
        accentColor: '#185FA5',
        fontFamily: 'georgia',
        density: 'fit',
        margin: 'wide',
        highlight: ['header'],
      },
    },
    {
      id: 'minimal-cn',
      name: dictionary.data.templateNames.minimal,
      description: dictionary.data.templateDescriptions.minimal,
      tags: ['Minimal'],
      previewTone: 'cyan',
      style: {
        accentColor: '#0F766E',
        fontFamily: 'noto-sans-sc',
        density: 'airy',
        margin: 'normal',
        highlight: ['sections'],
      },
    },
  ]
}

export const resumeTemplates = getResumeTemplates()

export function getResumeTemplate(templateId?: string, locale: Locale = defaultLocale) {
  const templates = getResumeTemplates(locale)

  return templates.find((template) => template.id === templateId) ?? templates[0]
}
