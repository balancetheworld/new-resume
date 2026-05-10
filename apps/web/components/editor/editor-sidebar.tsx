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
        <div className="border-b border-white/50 bg-[#e9f0f9] px-5 py-4">
          <TabsList className="grid w-full grid-cols-2 bg-white/72 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
            <TabsTrigger value="content">{dictionary.editor.content}</TabsTrigger>
            <TabsTrigger value="reorder">{dictionary.editor.reorder}</TabsTrigger>
          </TabsList>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-5">
            <TabsContent value="content" className="mt-0">
              <div className="space-y-6">
                <section className="rounded-2xl border border-white/55 bg-white/64 px-4 py-4 shadow-[0_10px_24px_rgba(52,78,118,0.05)]">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[#d4e2f4] bg-[#eef4fc] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
                      {dictionary.editor.basicInfo}
                    </span>
                    <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(79,134,223,0.22),rgba(79,134,223,0.04))]" />
                  </div>
                  <div className="mt-3">
                    <PersonalInfoForm />
                  </div>
                </section>

                <section className="rounded-2xl border border-white/55 bg-white/64 px-4 py-4 shadow-[0_10px_24px_rgba(52,78,118,0.05)]">
                  <div className="flex items-center justify-between">
                    <div className="flex min-w-0 flex-1 items-center gap-3 pr-3">
                      <span className="rounded-full border border-[#d4e2f4] bg-[#eef4fc] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
                        {dictionary.editor.practice}
                      </span>
                      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(79,134,223,0.22),rgba(79,134,223,0.04))]" />
                    </div>
                    <button type="button" className="text-[11px] font-medium text-[var(--folio-purple)]">
                      {dictionary.editor.addExperience}
                    </button>
                  </div>
                  <div className="mt-3">
                    <WorkExperienceForm experiences={state.data.workExperience} />
                  </div>
                </section>

                <section className="rounded-2xl border border-white/55 bg-white/64 px-4 py-4 shadow-[0_10px_24px_rgba(52,78,118,0.05)]">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[#d4e2f4] bg-[#eef4fc] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
                      {dictionary.editor.projects}
                    </span>
                    <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(79,134,223,0.22),rgba(79,134,223,0.04))]" />
                  </div>
                  <div className="mt-3">
                    <ProjectsForm projects={state.data.projects} />
                  </div>
                </section>

                <section className="rounded-2xl border border-white/55 bg-white/64 px-4 py-4 shadow-[0_10px_24px_rgba(52,78,118,0.05)]">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[#d4e2f4] bg-[#eef4fc] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
                      {dictionary.editor.abilities}
                    </span>
                    <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(79,134,223,0.22),rgba(79,134,223,0.04))]" />
                  </div>
                  <div className="mt-3">
                    <SkillsForm skills={state.data.skills} />
                  </div>
                </section>

                {isEmpty && (
                  <div className="rounded-2xl border border-dashed border-[rgba(83,116,173,0.24)] bg-[#eef4fc] px-4 py-4 text-[11px] text-muted-foreground">
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
                  <div key={item} className="rounded-2xl border border-white/55 bg-white/68 px-4 py-3 text-sm font-medium text-foreground shadow-[0_8px_20px_rgba(52,78,118,0.04)]">
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
