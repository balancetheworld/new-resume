'use client'

import { useEffect, useState } from 'react'
import { ResumeProvider } from '@/lib/resume-context'
import type { ResumeData } from '@/lib/resume-context'
import { EditorSidebar } from './editor-sidebar'
import { ResumePreview } from './resume-preview'
import { EditorStylePanel } from './editor-style-panel'
import { FloatingWorkspaceMenu } from './floating-workspace-menu'
import { useTemplateStore } from '@/lib/template-store'
import { Button } from '@/components/ui/button'
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react'

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
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false)
  const [isStyleCollapsed, setIsStyleCollapsed] = useState(false)

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
        <FloatingWorkspaceMenu resumeId={resumeId} />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <aside className="no-print group relative hidden min-h-0 min-w-0 flex-1 overflow-hidden border-r border-white/45 bg-card/82 shadow-[inset_-1px_0_0_rgba(79,134,223,0.06)] backdrop-blur-sm lg:flex lg:flex-col">
            <div className="relative z-10 min-h-0 flex-1">
              <EditorSidebar />
            </div>
          </aside>

          {/* 中间预览区域 - 可收起 */}
          <main
            className={`group relative min-h-0 max-w-full shrink-0 overflow-hidden border-l transition-[width] duration-300 ease-out ${
              isPreviewCollapsed ? 'border-white/45 bg-card/78' : 'border-white/30 bg-editor-preview'
            }`}
            style={{
              width: isPreviewCollapsed ? 40 : 920,
              transitionDuration: isPreviewCollapsed ? '220ms' : '360ms',
              transitionTimingFunction: isPreviewCollapsed
                ? 'cubic-bezier(0.4, 0, 1, 1)'
                : 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div
              className={`absolute right-3 top-3 z-20 transition-opacity duration-200 ${
                isPreviewCollapsed ? 'pointer-events-none opacity-0' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-8 rounded-full border-white/50 bg-card/90 text-muted-foreground shadow-[0_8px_18px_rgba(59,87,133,0.1)] backdrop-blur hover:text-foreground"
                onClick={() => setIsPreviewCollapsed(true)}
              >
                <PanelLeftClose className="size-4" />
              </Button>
            </div>
            <div
              className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-200 ${
                isPreviewCollapsed ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-8 rounded-full border-white/50 bg-card/92 text-muted-foreground shadow-[0_8px_18px_rgba(59,87,133,0.1)] backdrop-blur hover:text-foreground"
                onClick={() => setIsPreviewCollapsed(false)}
              >
                <PanelLeftOpen className="size-4" />
              </Button>
            </div>
            <div
              className={`relative z-10 min-h-0 h-full transition-opacity duration-200 ${
                isPreviewCollapsed ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
            >
              <ResumePreview />
            </div>
          </main>

          {/* 右侧样式面板 - 可收起 */}
          <aside
            className="no-print group relative hidden min-h-0 shrink-0 overflow-hidden border-l border-white/45 bg-card/80 shadow-[inset_1px_0_0_rgba(79,134,223,0.06)] backdrop-blur-sm transition-[width] duration-300 ease-out xl:flex xl:flex-col"
            style={{
              width: isStyleCollapsed ? 40 : 280,
              transitionDuration: isStyleCollapsed ? '220ms' : '360ms',
              transitionTimingFunction: isStyleCollapsed
                ? 'cubic-bezier(0.4, 0, 1, 1)'
                : 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div
              className={`absolute right-3 top-3 z-20 transition-opacity duration-200 ${
                isStyleCollapsed ? 'pointer-events-none opacity-0' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-8 rounded-full border-white/50 bg-card/90 text-muted-foreground shadow-[0_8px_18px_rgba(59,87,133,0.1)] backdrop-blur hover:text-foreground"
                onClick={() => setIsStyleCollapsed(true)}
              >
                <PanelRightClose className="size-4" />
              </Button>
            </div>
            <div
              className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-200 ${
                isStyleCollapsed ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-8 rounded-full border-white/50 bg-card/92 text-muted-foreground shadow-[0_8px_18px_rgba(59,87,133,0.1)] backdrop-blur hover:text-foreground"
                onClick={() => setIsStyleCollapsed(false)}
              >
                <PanelRightOpen className="size-4" />
              </Button>
            </div>
            <div
              className={`relative z-10 min-h-0 flex-1 transition-opacity duration-200 ${
                isStyleCollapsed ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
            >
              <EditorStylePanel />
            </div>
          </aside>
        </div>
      </div>
    </ResumeProvider>
  )
}
