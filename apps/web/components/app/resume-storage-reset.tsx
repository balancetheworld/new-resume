'use client'

import { useEffect } from 'react'
import { clearAllResumeData } from '@/lib/resume-storage'

const RESUME_STORAGE_RESET_KEY = 'resume-storage-reset-v1'

export function ResumeStorageReset() {
  useEffect(() => {
    if (window.localStorage.getItem(RESUME_STORAGE_RESET_KEY) === 'done') {
      return
    }

    clearAllResumeData()
    window.localStorage.setItem(RESUME_STORAGE_RESET_KEY, 'done')
  }, [])

  return null
}
