'use client'

import { useResume } from '@/lib/resume-context'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PersonalInfoForm } from './forms/personal-info-form'
import { WorkExperienceForm } from './forms/work-experience-form'
import { EducationForm } from './forms/education-form'
import { SkillsForm } from './forms/skills-form'
import { ProjectsForm } from './forms/projects-form'
import { User, Briefcase, GraduationCap, Wrench, FolderKanban } from 'lucide-react'

export function EditorSidebar() {
  const { state } = useResume()

  return (
    <div className="flex h-full flex-col bg-editor-sidebar">
      <Tabs defaultValue="personal" className="flex h-full flex-col">
        <div className="border-b px-4 py-3">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal" className="flex items-center justify-center">
              <User className="size-4" />
              <span className="sr-only">基本信息</span>
            </TabsTrigger>
            <TabsTrigger value="work" className="flex items-center justify-center">
              <Briefcase className="size-4" />
              <span className="sr-only">工作经历</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center justify-center">
              <GraduationCap className="size-4" />
              <span className="sr-only">教育背景</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center justify-center">
              <Wrench className="size-4" />
              <span className="sr-only">技能</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center justify-center">
              <FolderKanban className="size-4" />
              <span className="sr-only">项目</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="personal" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">基本信息</h3>
                  <p className="text-sm text-muted-foreground">编辑你的个人信息和联系方式</p>
                </div>
                <PersonalInfoForm />
              </div>
            </TabsContent>

            <TabsContent value="work" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">工作经历</h3>
                  <p className="text-sm text-muted-foreground">添加你的工作经验和成就</p>
                </div>
                <WorkExperienceForm experiences={state.data.workExperience} />
              </div>
            </TabsContent>

            <TabsContent value="education" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">教育背景</h3>
                  <p className="text-sm text-muted-foreground">添加你的教育经历</p>
                </div>
                <EducationForm education={state.data.education} />
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">技能</h3>
                  <p className="text-sm text-muted-foreground">展示你的专业技能</p>
                </div>
                <SkillsForm skills={state.data.skills} />
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">项目经历</h3>
                  <p className="text-sm text-muted-foreground">展示你的代表性项目</p>
                </div>
                <ProjectsForm projects={state.data.projects} />
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
