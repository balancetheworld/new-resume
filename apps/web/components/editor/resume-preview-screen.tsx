'use client'

import Link from 'next/link'
import { ResumeProvider } from '@/lib/resume-context'
import { ResumePreview } from './resume-preview'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download } from 'lucide-react'

interface ResumePreviewScreenProps {
  resumeId: string
}

export function ResumePreviewScreen({ resumeId }: ResumePreviewScreenProps) {
  return (
    <ResumeProvider>
      <div className="flex min-h-screen flex-col bg-slate-100">
        <header className="no-print flex h-16 items-center justify-between border-b bg-card px-5">
          <Button variant="outline" asChild>
            <Link href={`/editor/${resumeId}`}>
              <ArrowLeft className="size-4" />
              返回编辑器
            </Link>
          </Button>
          <Button onClick={() => window.print()}>
            <Download className="size-4" />
            Export PDF
          </Button>
        </header>
        <main className="flex-1 overflow-hidden">
          <ResumePreview />
        </main>
      </div>
    </ResumeProvider>
  )
}
