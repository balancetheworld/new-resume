'use client'

import { useResume } from '@/lib/resume-context'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PersonalInfoForm } from './forms/personal-info-form'
import { WorkExperienceForm } from './forms/work-experience-form'
import { SkillsForm } from './forms/skills-form'
import { ProjectsForm } from './forms/projects-form'
import { useI18n } from '@/lib/i18n/context'

export function EditorSidebar() {
  const { state } = useResume()
  const { dictionary } = useI18n()
  const isEmpty =
    !state.data.personalInfo.name &&
    !state.data.personalInfo.jobTitle &&
    !state.data.personalInfo.phone &&
    !state.data.personalInfo.github &&
    !state.data.personalInfo.portfolio &&
    state.data.workExperience.length === 0 &&
    state.data.projects.length === 0 &&
    state.data.skills.every((skill) => skill.items.length === 0)

  return (
    <div className="flex h-full flex-col bg-editor-sidebar">
      <Tabs defaultValue="content" className="flex h-full flex-col">
        <div className="border-b px-5 py-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">{dictionary.editor.content}</TabsTrigger>
            <TabsTrigger value="reorder">{dictionary.editor.reorder}</TabsTrigger>
          </TabsList>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-5">
            <TabsContent value="content" className="mt-0">
              <div className="space-y-6">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-primary">
                    {dictionary.editor.basicInfo}
                  </div>
                  <div className="mt-3">
                    <PersonalInfoForm />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-primary">
                      {dictionary.editor.practice}
                    </div>
                    <button type="button" className="text-[11px] font-medium text-[var(--folio-purple)]">
                      {dictionary.editor.addExperience}
                    </button>
                  </div>
                  <div className="mt-3">
                    <WorkExperienceForm experiences={state.data.workExperience} />
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-primary">
                    {dictionary.editor.projects}
                  </div>
                  <div className="mt-3">
                    <ProjectsForm projects={state.data.projects} />
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-primary">
                    {dictionary.editor.abilities}
                  </div>
                  <div className="mt-3">
                    <SkillsForm skills={state.data.skills} />
                  </div>
                </div>

                {isEmpty && (
                  <div className="rounded-xl border border-dashed px-4 py-4 text-[11px] text-muted-foreground">
                    {dictionary.editor.sidebarEmpty}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="reorder" className="mt-0">
              <div className="space-y-3">
                {[
                  dictionary.editor.sectionOrderHeader,
                  dictionary.editor.sectionOrderBasicInfo,
                  dictionary.editor.sectionOrderPractice,
                  dictionary.editor.sectionOrderProjects,
                  dictionary.editor.sectionOrderPortfolio,
                  dictionary.editor.sectionOrderAbilities,
                ].map((item) => (
                  <div key={item} className="rounded-xl border bg-card px-4 py-3 text-sm font-medium text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
