import type { Messages } from '@/lib/i18n/messages'
import type { ResumeTemplateDefinition } from '@/lib/template-types'
import { createSalesCnTemplate } from '@/config/templates/sales-cn'
import { createTechCnTemplate } from '@/config/templates/tech-cn'

export function getConfiguredTemplates(dictionary: Messages): ResumeTemplateDefinition[] {
  return [createTechCnTemplate(dictionary), createSalesCnTemplate(dictionary)]
}
