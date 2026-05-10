import { SalesTemplateEditor } from '@/components/templates/sales-template-editor'
import { SalesTemplatePreview } from '@/components/templates/sales-template-preview'
import type { Messages } from '@/lib/i18n/messages'
import type { ResumeTemplateDefinition } from '@/lib/template-types'

export function createSalesCnTemplate(dictionary: Messages): ResumeTemplateDefinition {
  return {
    meta: {
      id: 'sales-cn',
      name: dictionary.data.templateNames.sales,
      description: dictionary.data.templateDescriptions.sales,
      tags: ['Modern'],
      previewTone: 'blue',
      style: {
        accentColor: '#4F86DF',
        fontFamily: 'inter',
        density: 'fit',
        margin: 'normal',
        highlight: ['header'],
      },
    },
    Editor: SalesTemplateEditor,
    Preview: SalesTemplatePreview,
  }
}
