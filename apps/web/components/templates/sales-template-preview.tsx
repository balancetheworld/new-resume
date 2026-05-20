'use client'

import { useResume } from '@/lib/resume-context'
import { useI18n } from '@/lib/i18n/context'

export function SalesTemplatePreview() {
  const { state } = useResume()
  const { personalInfo } = state.data
  const { dictionary } = useI18n()

  return (
    <div className="folio-grid-bg flex h-full flex-col bg-editor-preview">
      <div className="flex-1 overflow-auto">
        <div className="flex min-h-full min-w-fit items-start justify-center px-4 py-6 sm:px-6 sm:py-8">
          <div className="resume-preview aspect-[210/297] w-[640px] min-w-[640px] rounded-[4px] border border-[#d9e5f4] bg-resume-paper p-8 shadow-[0_16px_38px_rgba(59,87,133,0.12)] sm:w-[720px] sm:min-w-[720px] xl:w-[820px] xl:min-w-[820px]">
            <header className="flex items-start justify-between gap-6 border-b border-border pb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground">
                  {personalInfo.name || dictionary.preview.name}
                </h1>
                <p className="mt-2 text-lg text-primary">
                  {personalInfo.jobTitle || dictionary.preview.jobTitle}
                </p>
                <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                  <div>{dictionary.preview.basicInfo.phone}：{personalInfo.phone || dictionary.preview.pending}</div>
                  <div>{dictionary.preview.basicInfo.wechat}：{personalInfo.wechat || dictionary.preview.pending}</div>
                </div>
              </div>
              <div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-[#eef4fc] text-[11px] text-muted-foreground">
                {personalInfo.photo ? (
                  <img src={personalInfo.photo} alt={personalInfo.name || 'photo'} className="h-full w-full object-cover" />
                ) : (
                  dictionary.preview.photo
                )}
              </div>
            </header>

            <section className="mt-8">
              <h2 className="text-lg font-semibold text-primary">{dictionary.preview.campusExperience}</h2>
              <div className="mt-3 space-y-3">
                {personalInfo.campusExperiences.length > 0 ? (
                  personalInfo.campusExperiences.map((exp, index) => (
                    <div key={exp.id} className="text-sm leading-7 text-foreground/85">
                      {exp.content || dictionary.preview.fillCampusExperience}
                    </div>
                  ))
                ) : (
                  <div className="text-sm leading-7 text-foreground/85">
                    {dictionary.preview.fillCampusExperience}
                  </div>
                )}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-semibold text-primary">{dictionary.preview.selfEvaluation}</h2>
              <div className="mt-3 space-y-3">
                {personalInfo.selfEvaluations.length > 0 ? (
                  personalInfo.selfEvaluations.map((evaluation) => (
                    <div key={evaluation.id} className="text-sm leading-7 text-foreground/85">
                      {evaluation.content || dictionary.preview.fillSelfEvaluation}
                    </div>
                  ))
                ) : (
                  <div className="text-sm leading-7 text-foreground/85">
                    {dictionary.preview.fillSelfEvaluation}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
