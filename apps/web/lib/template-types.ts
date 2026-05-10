import type { ComponentType } from 'react'
import type { Locale } from '@/lib/i18n/config'
import type { ResumeStyle } from '@/lib/resume-style'

export interface ResumeTemplateMeta {
  id: string
  name: string
  description: string
  tags: string[]
  featured?: boolean
  previewTone: 'blue' | 'stone' | 'cyan'
  style: ResumeStyle
}

export interface ResumeDocument<TData = unknown> {
  id: string
  templateId: string
  title: string
  status: 'draft' | 'editing' | 'exported'
  locale: Locale
  createdAt: string
  updatedAt: string
  data: TData
}

export interface ResumeTemplateEditorProps<TData = unknown> {
  data: TData
  onChange: (nextData: TData) => void
}

export interface ResumeTemplatePreviewProps<TData = unknown> {
  data: TData
}

export interface ResumeTemplateDefinition<TData = unknown> {
  meta: ResumeTemplateMeta
  createDefaultData?: () => TData
  Editor?: ComponentType
  Preview?: ComponentType
  validate?: (data: TData) => string[]
  getSummary?: (data: TData) => {
    title?: string
    subtitle?: string
  }
}
