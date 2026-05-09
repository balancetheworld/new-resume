'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createDemoResumeData } from '@/lib/resume-data'
import { createResumeId, getResumeStorageKey, setLastResumeId, upsertResumeIndexItem } from '@/lib/resume-storage'
import type { Locale } from '@/lib/i18n/config'

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

  const handleUseTemplate = () => {
    const resumeId = createResumeId()
    const resumeData = createDemoResumeData(undefined, templateId, locale)

    localStorage.setItem(getResumeStorageKey(resumeId), JSON.stringify(resumeData))
    upsertResumeIndexItem(resumeId, resumeData)
    setLastResumeId(resumeId)
    router.push(`/editor/${resumeId}`)
  }

  return (
    <Button className="w-full" onClick={handleUseTemplate}>
      {label}
    </Button>
  )
}
