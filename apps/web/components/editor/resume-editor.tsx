'use client'

import { ResumeProvider } from '@/lib/resume-context'
import { EditorHeader } from './editor-header'
import { EditorSidebar } from './editor-sidebar'
import { ResumePreview } from './resume-preview'

export function ResumeEditor() {
  return (
    <ResumeProvider>
      <div className="flex h-screen flex-col bg-background">
        <EditorHeader />
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Form Editor */}
          <aside className="w-full max-w-md shrink-0 overflow-hidden border-r lg:w-[420px]">
            <EditorSidebar />
          </aside>

          {/* Main - Resume Preview */}
          <main className="flex-1 overflow-hidden">
            <ResumePreview />
          </main>
        </div>
      </div>
    </ResumeProvider>
  )
}
