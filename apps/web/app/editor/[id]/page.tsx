import { ResumeEditor } from '@/components/editor/resume-editor'
import { createDemoResumeData, createEmptyResumeData } from '@/lib/resume-data'
import { getResumeTemplate } from '@/lib/resume-templates'
import { getLocale } from '@/lib/i18n/server'

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const locale = await getLocale()
  const template = getResumeTemplate(undefined, locale)

  return (
    <ResumeEditor
      resumeId={id}
      mode="editor"
      initialData={
        createDemoResumeData(id, template.id, locale)
      }
    />
  )
}
