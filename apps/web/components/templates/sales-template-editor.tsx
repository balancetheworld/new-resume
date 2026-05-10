'use client'

import { useResume } from '@/lib/resume-context'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/lib/i18n/context'

export function SalesTemplateEditor() {
  const { state, updatePersonalInfo } = useResume()
  const { personalInfo } = state.data
  const { dictionary } = useI18n()

  return (
    <div className="flex h-full flex-col bg-editor-sidebar">
      <div className="border-b border-white/50 bg-[#e9f0f9] px-5 py-4">
        <div className="text-sm font-semibold text-foreground">{dictionary.editor.content}</div>
        <div className="mt-1 text-xs text-muted-foreground">{dictionary.data.templateDescriptions.sales}</div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        <div className="space-y-6">
          <section className="rounded-2xl border border-white/55 bg-white/64 px-4 py-4 shadow-[0_10px_24px_rgba(52,78,118,0.05)]">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[#d4e2f4] bg-[#eef4fc] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
                {dictionary.editor.basicInfo}
              </span>
              <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(79,134,223,0.22),rgba(79,134,223,0.04))]" />
            </div>
            <div className="mt-3 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{dictionary.form.name}</Label>
                  <Input
                    value={personalInfo.name}
                    onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                    placeholder={dictionary.form.placeholders.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{dictionary.form.jobTitle}</Label>
                  <Input
                    value={personalInfo.jobTitle}
                    onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
                    placeholder={dictionary.form.placeholders.jobTitle}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{dictionary.form.phone}</Label>
                  <Input
                    value={personalInfo.phone}
                    onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                    placeholder={dictionary.form.placeholders.phone}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{dictionary.form.wechat}</Label>
                  <Input
                    value={personalInfo.wechat}
                    onChange={(e) => updatePersonalInfo({ wechat: e.target.value })}
                    placeholder={dictionary.form.placeholders.wechat}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{dictionary.form.photo}</Label>
                <Input
                  value={personalInfo.photo}
                  onChange={(e) => updatePersonalInfo({ photo: e.target.value })}
                  placeholder={dictionary.form.placeholders.photo}
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/55 bg-white/64 px-4 py-4 shadow-[0_10px_24px_rgba(52,78,118,0.05)]">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[#d4e2f4] bg-[#eef4fc] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
                {dictionary.form.campusExperience}
              </span>
              <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(79,134,223,0.22),rgba(79,134,223,0.04))]" />
            </div>
            <div className="mt-3 space-y-2">
              <Label>{dictionary.form.campusExperience}</Label>
              <Textarea
                value={personalInfo.campusExperience}
                onChange={(e) => updatePersonalInfo({ campusExperience: e.target.value })}
                placeholder={dictionary.form.placeholders.campusExperience}
                className="min-h-28 resize-none"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-white/55 bg-white/64 px-4 py-4 shadow-[0_10px_24px_rgba(52,78,118,0.05)]">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[#d4e2f4] bg-[#eef4fc] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
                {dictionary.form.selfEvaluation}
              </span>
              <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(79,134,223,0.22),rgba(79,134,223,0.04))]" />
            </div>
            <div className="mt-3 space-y-2">
              <Label>{dictionary.form.selfEvaluation}</Label>
              <Textarea
                value={personalInfo.selfEvaluation}
                onChange={(e) => updatePersonalInfo({ selfEvaluation: e.target.value })}
                placeholder={dictionary.form.placeholders.selfEvaluation}
                className="min-h-24 resize-none"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
