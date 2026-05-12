'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FloatingWorkspaceMenu } from '@/components/editor/floating-workspace-menu'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getResumeTemplateDefinition } from '@/lib/template-registry'
import { useI18n } from '@/lib/i18n/context'
import { readResumeIndex, type ResumeListItem } from '@/lib/resume-storage'

const previewToneClassMap = {
  blue: 'bg-gradient-to-br from-blue-50 to-slate-100',
  stone: 'bg-gradient-to-br from-stone-50 to-slate-100',
  cyan: 'bg-gradient-to-br from-cyan-50 to-slate-100',
}

function formatUpdatedAt(updatedAt: string) {
  if (!updatedAt) return ''

  const date = new Date(updatedAt)
  if (Number.isNaN(date.getTime())) return ''

  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}`
}

export default function ResumesPage() {
  const { locale, dictionary } = useI18n()
  const [resumes, setResumes] = useState<ResumeListItem[]>([])

  useEffect(() => {
    setResumes(readResumeIndex())
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <FloatingWorkspaceMenu variant="site" />
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <section className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-medium text-primary">
              <span className="flex size-4 items-center justify-center rounded-full bg-[var(--folio-primary-light)] text-[10px] text-[var(--folio-primary-dark)]">
                ✓
              </span>
              {dictionary.resumes.title}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              {resumes.length > 0 ? `${resumes.length}` : '0'} {dictionary.resumes.subtitle}
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resumes.map((resume) => {
            const template = getResumeTemplateDefinition(resume.templateId, locale).meta

            return (
              <Link key={resume.id} href={`/editor/${resume.id}`}>
                <Card className="overflow-hidden rounded-xl py-0 shadow-none">
                  <div className={`h-40 p-5 ${previewToneClassMap[template.previewTone]}`}>
                    <div className="h-full rounded-lg border bg-white p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
                      <div className="h-3 w-24 rounded-full bg-foreground" />
                      <div
                        className="mt-3 h-2 w-16 rounded-full"
                        style={{ backgroundColor: template.style.accentColor }}
                      />
                      <div className="mt-5 space-y-2">
                        <div className="h-2 rounded-full bg-[rgba(58,58,74,0.08)]" />
                        <div className="h-2 w-10/12 rounded-full bg-[rgba(58,58,74,0.08)]" />
                        <div className="h-2 w-8/12 rounded-full bg-[rgba(58,58,74,0.08)]" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="space-y-2 p-4">
                    <div className="text-[14px] font-medium text-foreground">{resume.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {dictionary.resumes.onTemplate} {resume.templateName || template.name}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={resume.status === 'editing' ? 'folio-status-editing' : 'folio-status-draft'}
                      >
                        {resume.status === 'editing' ? dictionary.common.editing : dictionary.common.draft}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">{formatUpdatedAt(resume.updatedAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}

          {resumes.length === 0 && (
            <Link href="/templates">
              <Card className="flex h-full min-h-[220px] items-center justify-center rounded-xl border-dashed py-0 shadow-none">
                <div className="text-center">
                  <div className="text-[20px] text-muted-foreground">+</div>
                  <div className="mt-2 text-[12px] font-medium text-foreground">
                    {dictionary.resumes.createFirst}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    {dictionary.resumes.goToTemplates}
                  </div>
                </div>
              </Card>
            </Link>
          )}
        </section>
      </main>
    </div>
  )
}
