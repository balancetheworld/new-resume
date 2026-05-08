'use client'

import { useResume } from '@/lib/resume-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { FileText, Download, Share2, Cloud, CloudOff, Loader2 } from 'lucide-react'

export function EditorHeader() {
  const { state } = useResume()
  const { saveStatus, lastSaved } = state

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
    // TODO: Implement PDF download
    alert('PDF 下载功能即将上线')
  }

  const handleShare = () => {
    // TODO: Implement share functionality
    alert('分享功能即将上线')
  }

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <FileText className="size-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">简历编辑器</h1>
            <p className="text-xs text-muted-foreground">在线制作专业简历</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Save Status */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              {getSaveStatusIcon()}
              <span className="hidden sm:inline">{getSaveStatusText()}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>自动保存到本地存储</p>
          </TooltipContent>
        </Tooltip>

        <div className="h-4 w-px bg-border" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="size-4" />
                <span className="hidden sm:inline">下载 PDF</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>下载 PDF 格式简历</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" onClick={handleShare}>
                <Share2 className="size-4" />
                <span className="hidden sm:inline">发布分享</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>生成在线分享链接</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}
