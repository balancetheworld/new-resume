'use client'

import { ResumeProvider } from '@/lib/resume-context'
import { createEmptyResumeData } from '@/lib/resume-data'
import { getResumeTemplateDefinition } from '@/lib/template-registry'
import { useResume } from '@/lib/resume-context'
import { FloatingWorkspaceMenu } from './floating-workspace-menu'
import type { Locale } from '@/lib/i18n/config'

interface ResumePreviewScreenProps {
  resumeId: string
  locale: Locale
}

function ResumePreviewScreenContent({
  resumeId,
}: {
  resumeId: string
}) {
  const { state } = useResume()
  const templateDefinition = getResumeTemplateDefinition(state.data.templateId)
  const TemplatePreview = templateDefinition.Preview

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <FloatingWorkspaceMenu resumeId={resumeId} variant="preview" />
      <main className="flex-1 overflow-hidden">
        {TemplatePreview ? <TemplatePreview /> : null}
      </main>
    </div>
  )
}

export function ResumePreviewScreen({ resumeId, locale }: ResumePreviewScreenProps) {
  return (
    <ResumeProvider
      initialData={createEmptyResumeData(undefined, locale)}
      storageKey={`resume-editor-data:${resumeId}`}
      resumeId={resumeId}
    >
      <ResumePreviewScreenContent resumeId={resumeId} />
    </ResumeProvider>
  )
}
