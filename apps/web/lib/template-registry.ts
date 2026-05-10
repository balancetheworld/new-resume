import { getConfiguredTemplates } from '@/config/templates'
import { getMessages } from '@/lib/i18n/messages'
import { defaultLocale, type Locale } from '@/lib/i18n/config'
export type {
  ResumeDocument,
  ResumeTemplateDefinition,
  ResumeTemplateEditorProps,
  ResumeTemplateMeta,
  ResumeTemplatePreviewProps,
} from '@/lib/template-types'
import type { ResumeTemplateDefinition } from '@/lib/template-types'

const templateIdAliases: Record<string, string> = {
  'default-cn': 'tech-cn',
}

export function resolveResumeTemplateId(templateId?: string) {
  if (!templateId) {
    return templateId
  }

  return templateIdAliases[templateId] ?? templateId
}

export function getResumeTemplateDefinitions(
  locale: Locale = defaultLocale
): ResumeTemplateDefinition[] {
  const dictionary = getMessages(locale)

  return getConfiguredTemplates(dictionary)
}

export function getResumeTemplateDefinition(
  templateId?: string,
  locale: Locale = defaultLocale
) {
  const templates = getResumeTemplateDefinitions(locale)
  const resolvedTemplateId = resolveResumeTemplateId(templateId)

  return templates.find((template) => template.meta.id === resolvedTemplateId) ?? templates[0]
}
