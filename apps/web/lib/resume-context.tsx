'use client'

import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react'

// Types
export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  summary: string
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

export interface ResumeStyle {
  accentColor: string
  fontFamily: 'inter' | 'noto-sans-sc' | 'georgia' | 'jetbrains-mono'
  spacing: 'compact' | 'comfortable' | 'airy'
  margin: 'narrow' | 'normal' | 'wide'
}

export interface ResumeData {
  personalInfo: PersonalInfo
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  style: ResumeStyle
}

export type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error'

interface ResumeState {
  data: ResumeData
  saveStatus: SaveStatus
  lastSaved: Date | null
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
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

const defaultResumeData: ResumeData = {
  personalInfo: {
    name: '张三',
    title: '高级前端工程师',
    email: 'zhangsan@example.com',
    phone: '+86 138 0000 0000',
    location: '北京市朝阳区',
    website: 'https://zhangsan.dev',
    linkedin: 'linkedin.com/in/zhangsan',
    github: 'github.com/zhangsan',
    summary: '拥有 5 年以上前端开发经验，专注于 React 生态系统和现代 Web 技术。善于将复杂的业务需求转化为优雅的技术方案，对代码质量和用户体验有极高的追求。',
  },
  workExperience: [
    {
      id: generateId(),
      company: '科技创新有限公司',
      position: '高级前端工程师',
      location: '北京',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description: '负责公司核心产品的前端架构设计与开发',
      highlights: [
        '主导设计并实现了新一代设计系统，提升团队开发效率 40%',
        '优化核心页面性能，首屏加载时间从 3s 降低至 1.2s',
        '搭建前端监控体系，错误发现率提升 80%',
      ],
    },
    {
      id: generateId(),
      company: '互联网科技公司',
      position: '前端工程师',
      location: '上海',
      startDate: '2019-07',
      endDate: '2022-02',
      current: false,
      description: '参与多个 B 端和 C 端项目的开发',
      highlights: [
        '开发并维护公司内部组件库，被 10+ 个项目使用',
        '负责移动端 H5 项目开发，用户量达到 100 万+',
      ],
    },
  ],
  education: [
    {
      id: generateId(),
      school: '清华大学',
      degree: '硕士',
      field: '计算机科学与技术',
      location: '北京',
      startDate: '2017-09',
      endDate: '2019-06',
      gpa: '3.8/4.0',
      highlights: ['校级奖学金', '优秀毕业论文'],
    },
    {
      id: generateId(),
      school: '北京理工大学',
      degree: '学士',
      field: '软件工程',
      location: '北京',
      startDate: '2013-09',
      endDate: '2017-06',
      gpa: '3.6/4.0',
      highlights: [],
    },
  ],
  skills: [
    {
      id: generateId(),
      category: '前端技术',
      items: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS'],
    },
    {
      id: generateId(),
      category: '工具与平台',
      items: ['Git', 'Docker', 'CI/CD', 'AWS', 'Vercel'],
    },
    {
      id: generateId(),
      category: '其他技能',
      items: ['Node.js', 'GraphQL', 'PostgreSQL', 'Redis'],
    },
  ],
  projects: [
    {
      id: generateId(),
      name: '企业级设计系统',
      description: '为公司构建的完整设计系统，包含 50+ 组件',
      technologies: ['React', 'TypeScript', 'Storybook', 'Testing Library'],
      link: 'https://github.com/example/design-system',
      highlights: [
        '支持主题定制和国际化',
        '完善的无障碍访问支持',
        '100% TypeScript 类型覆盖',
      ],
    },
  ],
  style: {
    accentColor: '#378ADD',
    fontFamily: 'inter',
    spacing: 'comfortable',
    margin: 'normal',
  },
}

function normalizeResumeData(data: Partial<ResumeData>): ResumeData {
  return {
    ...defaultResumeData,
    ...data,
    personalInfo: {
      ...defaultResumeData.personalInfo,
      ...data.personalInfo,
    },
    workExperience: data.workExperience ?? defaultResumeData.workExperience,
    education: data.education ?? defaultResumeData.education,
    skills: data.skills ?? defaultResumeData.skills,
    projects: data.projects ?? defaultResumeData.projects,
    style: {
      ...defaultResumeData.style,
      ...data.style,
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

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, {
    data: defaultResumeData,
    saveStatus: 'saved',
    lastSaved: null,
  })

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        dispatch({ type: 'LOAD_DATA', payload: normalizeResumeData(parsed) })
      }
    } catch (e) {
      console.error('Failed to load saved resume data:', e)
    }
  }, [])

  // Auto-save with debounce
  useEffect(() => {
    if (state.saveStatus === 'unsaved') {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        dispatch({ type: 'SET_SAVE_STATUS', payload: 'saving' })

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data))
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
  }, [state.saveStatus, state.data])

  const updatePersonalInfo = useCallback((data: Partial<PersonalInfo>) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: data })
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
