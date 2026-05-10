'use client'

import Link from 'next/link'
import { ResumeProvider } from '@/lib/resume-context'
import { createEmptyResumeData } from '@/lib/resume-data'
import { getResumeTemplateDefinition } from '@/lib/template-registry'
import { useResume } from '@/lib/resume-context'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
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
  const { dictionary } = useI18n()
  const templateDefinition = getResumeTemplateDefinition(state.data.templateId)
  const TemplatePreview = templateDefinition.Preview

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <header className="no-print flex h-16 items-center justify-between border-b bg-card px-5">
        <Button variant="outline" asChild>
          <Link href={`/editor/${resumeId}`}>
            <ArrowLeft className="size-4" />
            {dictionary.editor.backToEditor}
          </Link>
        </Button>
        <Button onClick={() => window.print()}>
          <Download className="size-4" />
          {dictionary.common.exportPdf}
        </Button>
      </header>
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
