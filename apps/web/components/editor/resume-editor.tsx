'use client'

import { useEffect } from 'react'
import { ResumeProvider } from '@/lib/resume-context'
import type { ResumeData } from '@/lib/resume-context'
import { EditorHeader } from './editor-header'
import { EditorSidebar } from './editor-sidebar'
import { ResumePreview } from './resume-preview'
import { EditorStylePanel } from './editor-style-panel'
import { SiteHeader } from '@/components/site/site-header'
import { useTemplateStore } from '@/lib/template-store'

interface ResumeEditorProps {
  resumeId: string
  mode?: 'home' | 'editor'
  initialData?: ResumeData
}

export function ResumeEditor({
  resumeId,
  mode = 'editor',
  initialData,
}: ResumeEditorProps) {
  const setSelectedTemplateId = useTemplateStore((state) => state.setSelectedTemplateId)

  useEffect(() => {
    if (initialData?.templateId) {
      setSelectedTemplateId(initialData.templateId)
    }
  }, [initialData?.templateId, setSelectedTemplateId])

  return (
    <ResumeProvider
      initialData={initialData}
      storageKey={`resume-editor-data:${resumeId}`}
      resumeId={resumeId}
    >
      <div className="flex h-screen min-h-0 flex-col bg-background">
        <div className="no-print">
          <SiteHeader current="editor" />
        </div>
        <div className="no-print">
          <EditorHeader resumeId={resumeId} mode={mode} />
        </div>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <aside className="no-print hidden min-h-0 shrink-0 overflow-hidden border-r lg:block lg:w-[255px]">
            <EditorSidebar />
          </aside>

          <main className="min-h-0 min-w-0 flex-1 overflow-hidden">
            <ResumePreview />
          </main>

          <aside className="no-print hidden min-h-0 shrink-0 overflow-hidden border-l xl:block xl:w-[240px]">
            <EditorStylePanel />
          </aside>
        </div>
      </div>
    </ResumeProvider>
  )
}
