'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale } from '@/lib/i18n/config'
import { createEmptyResumeData } from '@/lib/resume-data'
import { createResumeId, getResumeStorageKey, getLastResumeId, setLastResumeId, upsertResumeIndexItem } from '@/lib/resume-storage'

export function EditorEntry({
  locale,
}: {
  locale: Locale
}) {
  const router = useRouter()

  useEffect(() => {
    const lastResumeId = getLastResumeId()

    if (lastResumeId) {
      router.replace(`/editor/${lastResumeId}`)
      return
    }

    const resumeId = createResumeId()
    const resumeData = createEmptyResumeData(undefined, locale)

    localStorage.setItem(getResumeStorageKey(resumeId), JSON.stringify(resumeData))
    upsertResumeIndexItem(resumeId, resumeData)
    setLastResumeId(resumeId)
    router.replace(`/editor/${resumeId}`)
  }, [locale, router])

  return null
}
