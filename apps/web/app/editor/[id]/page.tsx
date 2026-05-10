import { ResumeEditor } from '@/components/editor/resume-editor'
import { createEmptyResumeData } from '@/lib/resume-data'
import { getLocale } from '@/lib/i18n/server'

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const locale = await getLocale()

  return (
    <ResumeEditor
      resumeId={id}
      mode="editor"
      initialData={createEmptyResumeData(undefined, locale)}
    />
  )
}
