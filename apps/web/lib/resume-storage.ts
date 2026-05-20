'use client'

import type { ResumeData, ResumeStatus } from '@/lib/resume-context'

export interface ResumeListItem {
  id: string
  name: string
  templateId: string
  templateName: string
  status: ResumeStatus
  updatedAt: string
}

const STORAGE_PREFIX = 'resume-editor-data:'
const INDEX_STORAGE_KEY = 'resume-editor-index'
const LAST_RESUME_ID_KEY = 'resume-editor-last-id'

function generateResumeId() {
  return `resume-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function getResumeStorageKey(resumeId: string) {
  return `${STORAGE_PREFIX}${resumeId}`
}

export function createResumeId() {
  return generateResumeId()
}

export function readResumeIndex(): ResumeListItem[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(INDEX_STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw) as ResumeListItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeResumeIndex(items: ResumeListItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(items))
}

export function getLastResumeId() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(LAST_RESUME_ID_KEY)
}

export function setLastResumeId(resumeId: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(LAST_RESUME_ID_KEY, resumeId)
}

export function upsertResumeIndexItem(resumeId: string, data: ResumeData) {
  const items = readResumeIndex()
  const nextItem: ResumeListItem = {
    id: resumeId,
    name: data.resumeName,
    templateId: data.templateId,
    templateName: data.templateName,
    status: data.status,
    updatedAt: data.updatedAt,
  }
  const nextItems = [nextItem, ...items.filter((item) => item.id !== resumeId)]
  writeResumeIndex(nextItems)
  setLastResumeId(resumeId)
}

export function readResumeData(resumeId: string) {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(getResumeStorageKey(resumeId))
    return raw ? (JSON.parse(raw) as ResumeData) : null
  } catch {
    return null
  }
}

export function writeResumeData(resumeId: string, data: ResumeData) {
  if (typeof window === 'undefined') return
  localStorage.setItem(getResumeStorageKey(resumeId), JSON.stringify(data))
}

export function clearAllResumeData() {
  if (typeof window === 'undefined') return

  const keysToRemove: string[] = []

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i)

    if (!key) {
      continue
    }

    if (key.startsWith(STORAGE_PREFIX) || key === INDEX_STORAGE_KEY || key === LAST_RESUME_ID_KEY) {
      keysToRemove.push(key)
    }
  }

  keysToRemove.forEach((key) => {
    localStorage.removeItem(key)
  })
}

export function deleteResume(resumeId: string) {
  if (typeof window === 'undefined') return

  // 删除简历数据
  localStorage.removeItem(getResumeStorageKey(resumeId))

  // 从索引中移除
  const items = readResumeIndex()
  const nextItems = items.filter((item) => item.id !== resumeId)
  writeResumeIndex(nextItems)

  // 如果删除的是最后打开的简历，清除记录
  if (getLastResumeId() === resumeId) {
    localStorage.removeItem(LAST_RESUME_ID_KEY)
  }
}

export function renameResume(resumeId: string, newName: string) {
  if (typeof window === 'undefined') return

  const items = readResumeIndex()
  const item = items.find((i) => i.id === resumeId)

  if (!item) return

  // 更新索引中的名称
  const nextItems = items.map((i) =>
    i.id === resumeId ? { ...i, name: newName } : i
  )
  writeResumeIndex(nextItems)

  // 同时更新简历数据中的名称
  const data = readResumeData(resumeId)
  if (data) {
    data.resumeName = newName
    writeResumeData(resumeId, data)
  }
}
