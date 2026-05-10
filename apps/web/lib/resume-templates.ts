import { defaultLocale, type Locale } from '@/lib/i18n/config'
import {
  getResumeTemplateDefinition,
  getResumeTemplateDefinitions,
  type ResumeTemplateMeta,
} from '@/lib/template-registry'

export type ResumeTemplateDefinition = ResumeTemplateMeta

export function getResumeTemplates(locale: Locale = defaultLocale): ResumeTemplateDefinition[] {
  return getResumeTemplateDefinitions(locale).map((template) => template.meta)
}

export const resumeTemplates = getResumeTemplates()

export function getResumeTemplate(templateId?: string, locale: Locale = defaultLocale) {
  return getResumeTemplateDefinition(templateId, locale).meta
}
