import { ResumePreviewScreen } from '@/components/editor/resume-preview-screen'
import { getLocale } from '@/lib/i18n/server'

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const locale = await getLocale()

  return <ResumePreviewScreen resumeId={id} locale={locale} />
}
