import { DefaultTemplateEditor } from '@/components/templates/default-template-editor'
import { DefaultTemplatePreview } from '@/components/templates/default-template-preview'
import type { Messages } from '@/lib/i18n/messages'
import type { ResumeTemplateDefinition } from '@/lib/template-types'

export function createTechCnTemplate(dictionary: Messages): ResumeTemplateDefinition {
  return {
    meta: {
      id: 'tech-cn',
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
    Editor: DefaultTemplateEditor,
    Preview: DefaultTemplatePreview,
  }
}
