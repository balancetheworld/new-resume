'use client'

import { create } from 'zustand'
import { getResumeTemplate } from '@/lib/resume-templates'

interface TemplateStoreState {
  selectedTemplateId: string
  setSelectedTemplateId: (templateId: string) => void
  resetSelectedTemplateId: () => void
}

const defaultTemplate = getResumeTemplate()

export const useTemplateStore = create<TemplateStoreState>((set) => ({
  selectedTemplateId: defaultTemplate.id,
  setSelectedTemplateId: (templateId) => set({ selectedTemplateId: templateId }),
  resetSelectedTemplateId: () => set({ selectedTemplateId: defaultTemplate.id }),
}))
