import { ResumeEditor } from '@/components/editor/resume-editor'

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <ResumeEditor resumeId={id} />
}
