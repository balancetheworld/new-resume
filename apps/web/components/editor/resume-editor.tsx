'use client'

import { useEffect, useState } from 'react'
import { ResumeProvider } from '@/lib/resume-context'
import type { ResumeData } from '@/lib/resume-context'
import { EditorHeader } from './editor-header'
import { EditorSidebar } from './editor-sidebar'
import { ResumePreview } from './resume-preview'
import { EditorStylePanel } from './editor-style-panel'
import { SiteHeader } from '@/components/site/site-header'
import { useTemplateStore } from '@/lib/template-store'
import { Button } from '@/components/ui/button'
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, Menu, X } from 'lucide-react'

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
  const [leftWidth, setLeftWidth] = useState(360)
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false)
  const [isStyleCollapsed, setIsStyleCollapsed] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    if (initialData?.templateId) {
      setSelectedTemplateId(initialData.templateId)
    }
  }, [initialData?.templateId, setSelectedTemplateId])

  useEffect(() => {
    if (!isResizing) return

    const handlePointerMove = (event: PointerEvent) => {
      const nextWidth = Math.min(640, Math.max(300, event.clientX))
      setLeftWidth(nextWidth)
    }

    const handlePointerUp = () => {
      setIsResizing(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [isResizing])

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
          <EditorHeader
            resumeId={resumeId}
            mode={mode}
            onMobileMenuClick={() => setIsMobileSidebarOpen(true)}
          />
        </div>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* 移动端遮罩层 */}
          {isMobileSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}

          {/* 移动端侧边栏 */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-[280px] transform border-r bg-card transition-transform duration-300 ease-in-out lg:hidden ${
              isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <div className="text-[11px] font-medium text-muted-foreground">Editor</div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <X className="size-4" />
              </Button>
            </div>
            <div className="min-h-0 h-[calc(100%-41px)] overflow-y-auto">
              <EditorSidebar />
            </div>
          </aside>

          {/* 桌面端左侧栏 - 始终显示，可调整宽度，自动扩展 */}
          <aside
            className="no-print hidden min-h-0 min-w-0 flex-1 overflow-hidden border-r bg-card lg:flex lg:flex-col"
            style={{ flexBasis: leftWidth, minWidth: 300 }}
          >
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <div className="text-[11px] font-medium text-muted-foreground">Editor</div>
            </div>
            <div className="min-h-0 flex-1">
              <EditorSidebar />
            </div>
          </aside>

          <button
            type="button"
            className={`no-print hidden relative w-1.5 shrink-0 cursor-col-resize bg-border transition-colors hover:bg-primary/40 lg:block group ${
              isResizing ? 'bg-primary' : ''
            }`}
            onPointerDown={() => setIsResizing(true)}
            aria-label="resize editor sidebar"
          >
            <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center gap-0.5 opacity-0 group-hover:opacity-100">
              <div className="h-2 w-0.5 rounded-full bg-primary" />
              <div className="h-2 w-0.5 rounded-full bg-primary" />
            </div>
          </button>

          {/* 中间预览区域 - 可收起 */}
          {!isPreviewCollapsed && (
            <main className="min-h-0 w-[920px] max-w-full shrink-0 overflow-hidden border-l bg-editor-preview">
              <div className="no-print flex items-center justify-between border-b bg-card px-4 py-2.5">
                <div className="text-[11px] font-medium text-muted-foreground">Preview</div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setIsPreviewCollapsed(true)}
                >
                  <PanelLeftClose className="size-4" />
                </Button>
              </div>
              <div className="min-h-0 h-[calc(100%-41px)]">
                <ResumePreview />
              </div>
            </main>
          )}

          {isPreviewCollapsed && (
            <div className="no-print flex flex-col border-l border-r bg-card">
              <div className="flex items-center justify-center border-b px-1 py-2.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setIsPreviewCollapsed(false)}
                >
                  <PanelLeftOpen className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {/* 右侧样式面板 - 可收起 */}
          {!isStyleCollapsed && (
            <aside className="no-print hidden min-h-0 shrink-0 overflow-hidden border-l xl:flex xl:w-[280px] xl:flex-col">
              <div className="flex items-center justify-between border-b px-4 py-2.5">
                <div className="text-[11px] font-medium text-muted-foreground">Inspector</div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setIsStyleCollapsed(true)}
                >
                  <PanelRightClose className="size-4" />
                </Button>
              </div>
              <div className="min-h-0 flex-1">
                <EditorStylePanel />
              </div>
            </aside>
          )}

          {isStyleCollapsed && (
            <div className="no-print hidden w-10 shrink-0 border-l bg-card xl:flex xl:flex-col">
              <div className="flex items-center justify-center border-b px-1 py-2.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setIsStyleCollapsed(false)}
                >
                  <PanelLeftOpen className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ResumeProvider>
  )
}
