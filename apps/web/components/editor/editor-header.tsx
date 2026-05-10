'use client'

import Link from 'next/link'
import { useResume } from '@/lib/resume-context'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Download, Eye, Menu } from 'lucide-react'

interface EditorHeaderProps {
  resumeId: string
  mode: 'home' | 'editor'
  onMobileMenuClick?: () => void
}

export function EditorHeader({ resumeId, mode, onMobileMenuClick }: EditorHeaderProps) {
  const { state } = useResume()
  const { data } = state
  const { dictionary } = useI18n()

  const handleDownload = () => {
    window.print()
  }

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      <div className="flex min-w-0 items-center gap-4">
        {/* 移动端菜单按钮 */}
        {onMobileMenuClick && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden size-8"
            onClick={onMobileMenuClick}
          >
            <Menu className="size-5" />
          </Button>
        )}
        <div className="min-w-0">
          <div className="truncate text-[13px] font-medium text-[rgba(58,58,74,0.45)]">
            {data.resumeName}
          </div>
        </div>
        <span className="rounded-md bg-[var(--folio-primary-light)] px-2 py-0.5 text-[10px] font-medium text-[var(--folio-primary-dark)]">
          {dictionary.common.autoSaved}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {mode === 'editor' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" asChild className="h-7 px-2 text-[11px] shadow-none">
                <Link href={`/preview/${resumeId}`}>
                  <Eye className="size-4" />
                  <span className="hidden sm:inline">{dictionary.common.preview}</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{dictionary.editor.previewFullScreen}</p>
            </TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              onClick={handleDownload}
              className="h-7 bg-[var(--folio-purple)] px-3 text-[11px] text-white hover:bg-[var(--folio-purple)]"
            >
              <Download className="size-4" />
              <span className="hidden sm:inline">{dictionary.common.exportPdf}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{dictionary.common.exportPdf}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}
