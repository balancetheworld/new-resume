'use client'

import Link from 'next/link'
import { ResumeProvider } from '@/lib/resume-context'
import { createDemoResumeData, createEmptyResumeData } from '@/lib/resume-data'
import { getResumeTemplate } from '@/lib/resume-templates'
import { ResumePreview } from './resume-preview'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import type { Locale } from '@/lib/i18n/config'

interface ResumePreviewScreenProps {
  resumeId: string
  locale: Locale
}

export function ResumePreviewScreen({ resumeId, locale }: ResumePreviewScreenProps) {
  const template = getResumeTemplate(undefined, locale)
  const { dictionary } = useI18n()

  return (
    <ResumeProvider
      initialData={
        createDemoResumeData(resumeId, template.id, locale)
      }
      storageKey={`resume-editor-data:${resumeId}`}
      resumeId={resumeId}
    >
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
          <ResumePreview />
        </main>
      </div>
    </ResumeProvider>
  )
}
