'use client'

import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react'
import { createEmptyResumeData } from '@/lib/resume-data'
import { setLastResumeId, upsertResumeIndexItem } from '@/lib/resume-storage'
import type { ResumeStyle } from '@/lib/resume-style'

// Types
export interface PersonalInfo {
  name: string
  jobTitle: string
  gender: string
  educationLevel: string
  school: string
  major: string
  qq: string
  wechat: string
  phone: string
  github: string
  portfolio: string
  photo: string
  campusExperience: string
  selfEvaluation: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  highlights: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  highlights: string[]
}

export interface Skill {
  id: string
  category: string
  items: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  highlights: string[]
}

export type ResumeStatus = 'editing' | 'draft' | 'exported'

export interface ResumeData {
  resumeName: string
  templateId: string
  templateName: string
  personalInfo: PersonalInfo
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  style: ResumeStyle
  status: ResumeStatus
  pages: number
  createdAt: string
  updatedAt: string
}

export type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error'

interface ResumeState {
  data: ResumeData
  saveStatus: SaveStatus
  lastSaved: Date | null
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'UPDATE_TEMPLATE'; payload: Pick<ResumeData, 'templateId' | 'templateName' | 'style'> }
  | { type: 'UPDATE_WORK_EXPERIENCE'; payload: { id: string; data: Partial<WorkExperience> } }
  | { type: 'ADD_WORK_EXPERIENCE' }
  | { type: 'REMOVE_WORK_EXPERIENCE'; payload: string }
  | { type: 'REORDER_WORK_EXPERIENCE'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'ADD_EDUCATION' }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'ADD_SKILL' }
  | { type: 'REMOVE_SKILL'; payload: string }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Project> } }
  | { type: 'ADD_PROJECT' }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'UPDATE_STYLE'; payload: Partial<ResumeStyle> }
  | { type: 'SET_SAVE_STATUS'; payload: SaveStatus }
  | { type: 'SET_LAST_SAVED'; payload: Date }
  | { type: 'LOAD_DATA'; payload: ResumeData }

const generateId = () => Math.random().toString(36).substring(2, 11)

function normalizeResumeData(data: Partial<ResumeData>): ResumeData {
  const defaultResumeData: ResumeData = {
    ...createEmptyResumeData(),
  }
  const legacyPersonalInfo = (data.personalInfo ?? {}) as Partial<PersonalInfo> & {
    title?: string
  }

  return {
    ...defaultResumeData,
    ...data,
    personalInfo: {
      ...defaultResumeData.personalInfo,
      ...data.personalInfo,
      jobTitle: data.personalInfo?.jobTitle ?? legacyPersonalInfo.title ?? defaultResumeData.personalInfo.jobTitle,
    },
    workExperience: data.workExperience ?? defaultResumeData.workExperience,
    education: data.education ?? defaultResumeData.education,
    skills: data.skills ?? defaultResumeData.skills,
    projects: data.projects ?? defaultResumeData.projects,
    style: {
      ...defaultResumeData.style,
      ...data.style,
      highlight: data.style?.highlight ?? defaultResumeData.style.highlight,
    },
  }
}

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          personalInfo: { ...state.data.personalInfo, ...action.payload },
        },
        saveStatus: 'unsaved',
      }
    case 'UPDATE_TEMPLATE':
      return {
        ...state,
        data: {
          ...state.data,
          templateId: action.payload.templateId,
          templateName: action.payload.templateName,
          style: action.payload.style,
        },
        saveStatus: 'unsaved',
      }
    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          workExperience: state.data.workExperience.map((exp) =>
            exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
          ),
        },
        saveStatus: 'unsaved',
      }
    case 'ADD_WORK_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          workExperience: [
            ...state.data.workExperience,
            {
              id: generateId(),
              company: '',
              position: '',
              location: '',
              startDate: '',
              endDate: '',
              current: false,
              description: '',
              highlights: [],
            },
          ],
        },
        saveStatus: 'unsaved',
      }
    case 'REMOVE_WORK_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          workExperience: state.data.workExperience.filter((exp) => exp.id !== action.payload),
        },
        saveStatus: 'unsaved',
      }
    case 'REORDER_WORK_EXPERIENCE': {
      const newExperience = [...state.data.workExperience]
      const [removed] = newExperience.splice(action.payload.fromIndex, 1)
      newExperience.splice(action.payload.toIndex, 0, removed)
      return {
        ...state,
        data: { ...state.data, workExperience: newExperience },
        saveStatus: 'unsaved',
      }
    }
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.map((edu) =>
            edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
          ),
        },
        saveStatus: 'unsaved',
      }
    case 'ADD_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: [
            ...state.data.education,
            {
              id: generateId(),
              school: '',
              degree: '',
              field: '',
              location: '',
              startDate: '',
              endDate: '',
              highlights: [],
            },
          ],
        },
        saveStatus: 'unsaved',
      }
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.filter((edu) => edu.id !== action.payload),
        },
        saveStatus: 'unsaved',
      }
    case 'UPDATE_SKILL':
      return {
        ...state,
        data: {
          ...state.data,
          skills: state.data.skills.map((skill) =>
            skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
          ),
        },
        saveStatus: 'unsaved',
      }
    case 'ADD_SKILL':
      return {
        ...state,
        data: {
          ...state.data,
          skills: [
            ...state.data.skills,
            {
              id: generateId(),
              category: '',
              items: [],
            },
          ],
        },
        saveStatus: 'unsaved',
      }
    case 'REMOVE_SKILL':
      return {
        ...state,
        data: {
          ...state.data,
          skills: state.data.skills.filter((skill) => skill.id !== action.payload),
        },
        saveStatus: 'unsaved',
      }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        data: {
          ...state.data,
          projects: state.data.projects.map((project) =>
            project.id === action.payload.id ? { ...project, ...action.payload.data } : project
          ),
        },
        saveStatus: 'unsaved',
      }
    case 'ADD_PROJECT':
      return {
        ...state,
        data: {
          ...state.data,
          projects: [
            ...state.data.projects,
            {
              id: generateId(),
              name: '',
              description: '',
              technologies: [],
              highlights: [],
            },
          ],
        },
        saveStatus: 'unsaved',
      }
    case 'REMOVE_PROJECT':
      return {
        ...state,
        data: {
          ...state.data,
          projects: state.data.projects.filter((project) => project.id !== action.payload),
        },
        saveStatus: 'unsaved',
      }
    case 'UPDATE_STYLE':
      return {
        ...state,
        data: {
          ...state.data,
          style: {
            ...state.data.style,
            ...action.payload,
          },
        },
        saveStatus: 'unsaved',
      }
    case 'SET_SAVE_STATUS':
      return { ...state, saveStatus: action.payload }
    case 'SET_LAST_SAVED':
      return { ...state, lastSaved: action.payload }
    case 'LOAD_DATA':
      return { ...state, data: action.payload, saveStatus: 'saved' }
    default:
      return state
  }
}

interface ResumeContextValue {
  state: ResumeState
  dispatch: React.Dispatch<ResumeAction>
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void
  updateTemplate: (data: Pick<ResumeData, 'templateId' | 'templateName' | 'style'>) => void
  updateWorkExperience: (id: string, data: Partial<WorkExperience>) => void
  addWorkExperience: () => void
  removeWorkExperience: (id: string) => void
  updateEducation: (id: string, data: Partial<Education>) => void
  addEducation: () => void
  removeEducation: (id: string) => void
  updateSkill: (id: string, data: Partial<Skill>) => void
  addSkill: () => void
  removeSkill: (id: string) => void
  updateProject: (id: string, data: Partial<Project>) => void
  addProject: () => void
  removeProject: (id: string) => void
  updateStyle: (data: Partial<ResumeStyle>) => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

const STORAGE_KEY = 'resume-editor-data'

export function ResumeProvider({
  children,
  initialData,
  storageKey,
  resumeId,
}: {
  children: React.ReactNode
  initialData?: ResumeData
  storageKey?: string
  resumeId?: string
}) {
  const [state, dispatch] = useReducer(resumeReducer, {
    data: normalizeResumeData(initialData ?? createEmptyResumeData()),
    saveStatus: 'saved',
    lastSaved: null,
  })

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeStorageKey = storageKey || STORAGE_KEY

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(activeStorageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        dispatch({ type: 'LOAD_DATA', payload: normalizeResumeData(parsed) })
      }
    } catch (e) {
      console.error('Failed to load saved resume data:', e)
    }
  }, [activeStorageKey])

  // Auto-save with debounce
  useEffect(() => {
    if (state.saveStatus === 'unsaved') {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        dispatch({ type: 'SET_SAVE_STATUS', payload: 'saving' })

        try {
          localStorage.setItem(activeStorageKey, JSON.stringify(state.data))
          if (resumeId) {
            upsertResumeIndexItem(resumeId, {
              ...state.data,
              updatedAt: new Date().toISOString(),
            })
            setLastResumeId(resumeId)
          }
          dispatch({ type: 'SET_SAVE_STATUS', payload: 'saved' })
          dispatch({ type: 'SET_LAST_SAVED', payload: new Date() })
        } catch (e) {
          console.error('Failed to save resume data:', e)
          dispatch({ type: 'SET_SAVE_STATUS', payload: 'error' })
        }
      }, 1500)
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [activeStorageKey, resumeId, state.saveStatus, state.data])

  const updatePersonalInfo = useCallback((data: Partial<PersonalInfo>) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: data })
  }, [])

  const updateTemplate = useCallback((data: Pick<ResumeData, 'templateId' | 'templateName' | 'style'>) => {
    dispatch({ type: 'UPDATE_TEMPLATE', payload: data })
  }, [])

  const updateWorkExperience = useCallback((id: string, data: Partial<WorkExperience>) => {
    dispatch({ type: 'UPDATE_WORK_EXPERIENCE', payload: { id, data } })
  }, [])

  const addWorkExperience = useCallback(() => {
    dispatch({ type: 'ADD_WORK_EXPERIENCE' })
  }, [])

  const removeWorkExperience = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_WORK_EXPERIENCE', payload: id })
  }, [])

  const updateEducation = useCallback((id: string, data: Partial<Education>) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data } })
  }, [])

  const addEducation = useCallback(() => {
    dispatch({ type: 'ADD_EDUCATION' })
  }, [])

  const removeEducation = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_EDUCATION', payload: id })
  }, [])

  const updateSkill = useCallback((id: string, data: Partial<Skill>) => {
    dispatch({ type: 'UPDATE_SKILL', payload: { id, data } })
  }, [])

  const addSkill = useCallback(() => {
    dispatch({ type: 'ADD_SKILL' })
  }, [])

  const removeSkill = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_SKILL', payload: id })
  }, [])

  const updateProject = useCallback((id: string, data: Partial<Project>) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: { id, data } })
  }, [])

  const addProject = useCallback(() => {
    dispatch({ type: 'ADD_PROJECT' })
  }, [])

  const removeProject = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_PROJECT', payload: id })
  }, [])

  const updateStyle = useCallback((data: Partial<ResumeStyle>) => {
    dispatch({ type: 'UPDATE_STYLE', payload: data })
  }, [])

  return (
    <ResumeContext.Provider
      value={{
        state,
        dispatch,
        updatePersonalInfo,
        updateTemplate,
        updateWorkExperience,
        addWorkExperience,
        removeWorkExperience,
        updateEducation,
        addEducation,
        removeEducation,
        updateSkill,
        addSkill,
        removeSkill,
        updateProject,
        addProject,
        removeProject,
        updateStyle,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}
