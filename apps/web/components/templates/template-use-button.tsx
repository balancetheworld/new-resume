'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createEmptyResumeData } from '@/lib/resume-data'
import { createResumeId, getResumeStorageKey, setLastResumeId, upsertResumeIndexItem } from '@/lib/resume-storage'
import type { Locale } from '@/lib/i18n/config'
import { Input } from '@/components/ui/input'
import { useI18n } from '@/lib/i18n/context'

export function TemplateUseButton({
  templateId,
  locale,
  label,
}: {
  templateId: string
  locale: Locale
  label: string
}) {
  const router = useRouter()
  const { dictionary } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [resumeName, setResumeName] = useState('')

  const handleUseTemplate = () => {
    const resumeId = createResumeId()
    const resumeData = createEmptyResumeData(templateId, locale)
    const nextResumeName = resumeName.trim()

    if (nextResumeName) {
      resumeData.resumeName = nextResumeName
    }

    localStorage.setItem(getResumeStorageKey(resumeId), JSON.stringify(resumeData))
    upsertResumeIndexItem(resumeId, resumeData)
    setLastResumeId(resumeId)
    setIsOpen(false)
    setResumeName('')
    router.push(`/editor/${resumeId}`)
  }

  return (
    <>
      <Button className="w-full" onClick={() => setIsOpen(true)}>
        {label}
      </Button>
      {isOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(15,23,42,0.22)] px-6 backdrop-blur-[3px]">
          <div className="w-full max-w-md rounded-3xl border border-white/55 bg-white/96 p-6 shadow-[0_28px_80px_rgba(39,72,126,0.18)]">
            <div className="text-lg font-semibold text-foreground">{dictionary.templates.createDialogTitle}</div>
            <div className="mt-2 text-sm leading-6 text-muted-foreground">
              {dictionary.templates.createDialogDescription}
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-foreground">
                {dictionary.templates.resumeNameLabel}
              </label>
              <Input
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                placeholder={dictionary.templates.resumeNamePlaceholder}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUseTemplate()
                  }
                }}
                autoFocus
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOpen(false)
                  setResumeName('')
                }}
              >
                {dictionary.common.cancel}
              </Button>
              <Button type="button" onClick={handleUseTemplate}>
                {dictionary.common.confirm}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
