'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface EditorGettingStartedProps {
  onDismiss: () => void
}

export function EditorGettingStarted({ onDismiss }: EditorGettingStartedProps) {
  return (
    <div className="flex h-full flex-col bg-card px-5 py-6">
      <div className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-md bg-[var(--folio-primary-light)] text-[13px] text-primary">
          ✦
        </span>
        <div>
          <h2 className="text-[14px] font-medium text-foreground">Getting started</h2>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Welcome to Folio. Let&apos;s build your resume.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[var(--folio-primary-light)] text-primary">
                ▦
              </span>
              <div>
                <div className="text-[12px] font-medium text-foreground">Choose a template</div>
                <div className="mt-1 text-[11px] text-muted-foreground">12 professional designs</div>
              </div>
            </div>
            <Link href="/templates" className="text-[11px] font-medium text-primary">
              Browse
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-10 w-8 rounded-md border bg-[var(--folio-primary-light)]/60" />
            ))}
            <span className="text-[11px] text-muted-foreground">+8</span>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[var(--folio-purple-bg)] text-[var(--folio-purple-dark)]">
                ☰
              </span>
              <div>
                <div className="text-[12px] font-medium text-foreground">Design from scratch</div>
                <div className="mt-1 text-[11px] text-muted-foreground">Drag-drop DIY builder</div>
              </div>
            </div>
            <Link href="/builder" className="text-[11px] font-medium text-[var(--folio-purple)]">
              Open
            </Link>
          </div>
          <p className="mt-4 text-[11px] leading-5 text-muted-foreground">
            Custom layout, any structure you want. No limits.
          </p>
        </div>
      </div>

      <div className="mt-auto border-t pt-4">
        <div className="rounded-xl bg-[var(--folio-primary-light)] px-4 py-3">
          <div className="text-[11px] font-medium text-[var(--folio-primary-dark)]">Pro tip</div>
          <div className="mt-1 text-[11px] leading-5 text-[var(--folio-primary-dark)]">
            Start with your summary first, then fill details section by section.
          </div>
        </div>
        <Button variant="ghost" size="sm" className="mt-3 px-0 text-[11px]" onClick={onDismiss}>
          Dismiss guide
        </Button>
      </div>
    </div>
  )
}
