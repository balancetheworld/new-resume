'use client'

import { ResumeProvider } from '@/lib/resume-context'
import { EditorHeader } from './editor-header'
import { EditorSidebar } from './editor-sidebar'
import { ResumePreview } from './resume-preview'
import { EditorStylePanel } from './editor-style-panel'

interface ResumeEditorProps {
  resumeId: string
}

export function ResumeEditor({ resumeId }: ResumeEditorProps) {
  return (
    <ResumeProvider>
      <div className="flex h-screen flex-col bg-background">
        <div className="no-print">
          <EditorHeader resumeId={resumeId} />
        </div>
        <div className="flex flex-1 overflow-hidden">
          <aside className="no-print hidden shrink-0 overflow-hidden border-r lg:block lg:w-[320px] xl:w-[340px]">
            <EditorSidebar />
          </aside>

          <main className="min-w-0 flex-1 overflow-hidden">
            <ResumePreview />
          </main>

          <aside className="no-print hidden shrink-0 overflow-hidden border-l xl:block xl:w-[260px]">
            <EditorStylePanel />
          </aside>
        </div>
      </div>
    </ResumeProvider>
  )
}
