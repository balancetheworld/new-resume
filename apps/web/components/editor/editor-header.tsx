'use client'

import Link from 'next/link'
import { useResume } from '@/lib/resume-context'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { FileText, Download, Eye, Cloud, CloudOff, Loader2, Undo2, Redo2 } from 'lucide-react'

interface EditorHeaderProps {
  resumeId: string
}

export function EditorHeader({ resumeId }: EditorHeaderProps) {
  const { state } = useResume()
  const { saveStatus, lastSaved, data } = state

  const formatLastSaved = () => {
    if (!lastSaved) return ''
    const now = new Date()
    const diff = now.getTime() - lastSaved.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)

    if (seconds < 60) return '刚刚保存'
    if (minutes < 60) return `${minutes} 分钟前保存`
    return lastSaved.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return <Loader2 className="size-4 animate-spin" />
      case 'saved':
        return <Cloud className="size-4" />
      case 'error':
        return <CloudOff className="size-4 text-destructive" />
      default:
        return <Cloud className="size-4 text-muted-foreground" />
    }
  }

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return '正在保存...'
      case 'saved':
        return formatLastSaved() || '已保存'
      case 'error':
        return '保存失败'
      default:
        return '未保存'
    }
  }

  const handleDownload = () => {
    window.print()
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-5">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
            <FileText className="size-4 text-primary-foreground" />
          </div>
          <div className="text-sm font-semibold text-foreground">ResumeCraft</div>
        </div>
        <div className="hidden h-5 w-px bg-border sm:block" />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-foreground">
            {data.personalInfo.name || '未命名简历'}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {getSaveStatusIcon()}
            <span>{getSaveStatusText() || 'Auto-saved'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" disabled>
          <Undo2 className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" disabled>
          <Redo2 className="size-4" />
        </Button>
        <div className="h-4 w-px bg-border" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/preview/${resumeId}`}>
                <Eye className="size-4" />
                <span className="hidden sm:inline">Preview</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>进入全屏预览</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" onClick={handleDownload}>
              <Download className="size-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>导出 PDF</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}
