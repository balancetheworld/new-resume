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
      <Tabs defaultValue="content" className="flex h-full flex-col">
        <div className="border-b px-4 py-3">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="reorder">Reorder</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="content" className="mt-0">
              <Tabs defaultValue="personal" className="flex flex-col gap-4">
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

                <TabsContent value="personal" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Personal info</h3>
                      <p className="text-sm text-muted-foreground">编辑姓名、职位和联系方式</p>
                    </div>
                    <PersonalInfoForm />
                  </div>
                </TabsContent>

                <TabsContent value="work" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Experience</h3>
                      <p className="text-sm text-muted-foreground">添加工作经历和项目成果</p>
                    </div>
                    <WorkExperienceForm experiences={state.data.workExperience} />
                  </div>
                </TabsContent>

                <TabsContent value="education" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Education</h3>
                      <p className="text-sm text-muted-foreground">维护学校、专业和时间信息</p>
                    </div>
                    <EducationForm education={state.data.education} />
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Skills</h3>
                      <p className="text-sm text-muted-foreground">按分类整理你的核心能力</p>
                    </div>
                    <SkillsForm skills={state.data.skills} />
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Projects</h3>
                      <p className="text-sm text-muted-foreground">补充代表性项目和技术栈</p>
                    </div>
                    <ProjectsForm projects={state.data.projects} />
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="sections" className="mt-0">
              <div className="space-y-3">
                {[
                  'Personal info',
                  'Summary',
                  'Experience',
                  'Education',
                  'Skills',
                  'Projects',
                ].map((item) => (
                  <div key={item} className="rounded-xl border bg-card px-4 py-3">
                    <div className="text-sm font-medium text-foreground">{item}</div>
                    <div className="mt-1 text-xs text-muted-foreground">已启用</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reorder" className="mt-0">
              <div className="space-y-3">
                {[
                  '01 Header',
                  '02 Summary',
                  '03 Experience',
                  '04 Education',
                  '05 Skills',
                  '06 Projects',
                ].map((item) => (
                  <div key={item} className="rounded-xl border bg-card px-4 py-3 text-sm font-medium text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
