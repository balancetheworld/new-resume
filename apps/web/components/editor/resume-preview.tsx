'use client'

import { cn } from '@/lib/utils'
import { useResume } from '@/lib/resume-context'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useI18n } from '@/lib/i18n/context'

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  return `${year}.${month}`
}

function normalizeLink(link: string) {
  if (!link) return ''
  if (link.startsWith('http://') || link.startsWith('https://')) return link
  return `https://${link}`
}

export function ResumePreview() {
  const { state } = useResume()
  const { personalInfo, workExperience, skills, projects, style } = state.data
  const { dictionary } = useI18n()
  const fontFamilyMap = {
    inter: '"Inter", system-ui, sans-serif',
    'noto-sans-sc': '"Noto Sans SC", "PingFang SC", sans-serif',
    georgia: 'Georgia, serif',
  }
  const spacingMap = {
    tight: {
      section: 'mb-5',
      sectionTitle: 'mb-3',
      list: 'space-y-3',
      card: 'space-y-2',
    },
    fit: {
      section: 'mb-6',
      sectionTitle: 'mb-4',
      list: 'space-y-4',
      card: 'space-y-3',
    },
    airy: {
      section: 'mb-8',
      sectionTitle: 'mb-5',
      list: 'space-y-5',
      card: 'space-y-4',
    },
  }
  const marginMap = {
    slim: 'p-6',
    normal: 'p-8',
    wide: 'p-10',
  }
  const previewStyle = spacingMap[style.density]
  const showSectionAccent = style.highlight.includes('sections')
  const showHeaderAccent = style.highlight.includes('header')
  const basicInfoItems = [
    { label: dictionary.preview.basicInfo.jobTitle, value: personalInfo.jobTitle },
    { label: dictionary.preview.basicInfo.gender, value: personalInfo.gender },
    { label: dictionary.preview.basicInfo.educationLevel, value: personalInfo.educationLevel },
    { label: dictionary.preview.basicInfo.school, value: personalInfo.school },
    { label: dictionary.preview.basicInfo.major, value: personalInfo.major },
    { label: dictionary.preview.basicInfo.phone, value: personalInfo.phone },
    { label: dictionary.preview.basicInfo.qq, value: personalInfo.qq },
    { label: dictionary.preview.basicInfo.wechat, value: personalInfo.wechat },
  ].filter((item) => item.value)
  const practiceExperiences = workExperience.filter(
    (exp) =>
      exp.company ||
      exp.position ||
      exp.location ||
      exp.startDate ||
      exp.endDate ||
      exp.current ||
      exp.description ||
      exp.highlights.length > 0
  )
  const projectItems = projects.filter(
    (project) =>
      project.name ||
      project.description ||
      project.link ||
      project.technologies.length > 0 ||
      project.highlights.length > 0
  )
  const abilityItems = skills.flatMap((skill) => skill.items.filter(Boolean))
  const hasPortfolio = !!personalInfo.portfolio

  return (
    <div className="folio-grid-bg flex h-full flex-col bg-editor-preview">
      <div className="flex-1 overflow-auto">
        <div className="flex min-h-full min-w-fit items-start justify-center px-4 py-6 sm:px-6 sm:py-8">
          <div
            className={cn(
              'resume-preview aspect-[210/297] w-[640px] min-w-[640px] rounded-[4px] bg-resume-paper shadow-[0_1px_6px_rgba(0,0,0,0.04)] sm:w-[720px] sm:min-w-[720px] xl:w-[820px] xl:min-w-[820px]',
              marginMap[style.margin],
            )}
            style={{
              ['--resume-accent' as string]: style.accentColor,
              fontFamily: fontFamilyMap[style.fontFamily],
            }}
          >
            <header className={previewStyle.section}>
              <h1 className="text-3xl font-bold text-foreground">{personalInfo.name || dictionary.preview.name}</h1>
              <p
                className={cn(
                  'mt-1 text-lg',
                  showHeaderAccent ? 'text-[var(--resume-accent)]' : 'text-foreground',
                )}
              >
                {personalInfo.jobTitle || dictionary.preview.jobTitle}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                {basicInfoItems.length > 0
                  ? basicInfoItems.map((item) => (
                      <span key={item.label}>
                        {item.label}：{item.value}
                      </span>
                    ))
                  : [
                      dictionary.preview.basicInfo.gender,
                      dictionary.preview.basicInfo.educationLevel,
                      dictionary.preview.basicInfo.school,
                      dictionary.preview.basicInfo.major,
                      dictionary.preview.basicInfo.phone,
                      dictionary.preview.basicInfo.qq,
                      dictionary.preview.basicInfo.wechat,
                    ].map((item) => (
                      <span key={item}>
                        {item}：{dictionary.preview.pending}
                      </span>
                    ))}
                <span>
                  {dictionary.preview.basicInfo.github}：
                  {personalInfo.github ? (
                    <a
                      href={normalizeLink(personalInfo.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground"
                    >
                      {personalInfo.github}
                    </a>
                  ) : (
                    dictionary.preview.pending
                  )}
                </span>
              </div>
            </header>

            <Separator className={cn('my-6', style.density === 'airy' && 'my-7')} />

            <section className={previewStyle.section}>
              <h2
                className={cn(
                  'text-lg font-semibold text-foreground',
                  previewStyle.sectionTitle,
                  showSectionAccent && 'text-[var(--resume-accent)]',
                )}
              >
                {dictionary.preview.practice}
              </h2>
              <div className={previewStyle.list}>
                {practiceExperiences.length > 0 ? (
                  practiceExperiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-foreground">
                            {exp.position || dictionary.preview.roleName}
                            {exp.company && ` / ${exp.company}`}
                          </h3>
                          {(exp.location || exp.description) && (
                            <p className="text-sm text-muted-foreground">
                              {[exp.location, exp.description].filter(Boolean).join(' · ')}
                            </p>
                          )}
                        </div>
                        {(exp.startDate || exp.endDate || exp.current) && (
                          <span className="shrink-0 text-sm text-muted-foreground">
                            {formatDate(exp.startDate)}
                            {exp.startDate || exp.endDate || exp.current ? ' - ' : ''}
                            {exp.current ? dictionary.preview.present : formatDate(exp.endDate)}
                          </span>
                        )}
                      </div>
                      {exp.highlights.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="flex text-sm text-foreground/80">
                              <span className="mr-2 text-[var(--resume-accent)]">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-sm leading-6 text-muted-foreground">
                    {dictionary.preview.fillPractice}
                  </div>
                )}
              </div>
            </section>

            <section className={previewStyle.section}>
              <h2
                className={cn(
                  'text-lg font-semibold text-foreground',
                  previewStyle.sectionTitle,
                  showSectionAccent && 'text-[var(--resume-accent)]',
                )}
              >
                {dictionary.preview.projects}
              </h2>
              <div className={previewStyle.list}>
                {projectItems.length > 0 ? (
                  projectItems.map((project) => (
                    <div key={project.id}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-foreground">{project.name || dictionary.preview.projectName}</h3>
                          {project.description && (
                            <p className="mt-1 text-sm text-foreground/80">{project.description}</p>
                          )}
                        </div>
                        {project.link && (
                          <a
                            href={normalizeLink(project.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 text-sm text-[var(--resume-accent)] hover:underline"
                          >
                            {dictionary.preview.viewProject}
                          </a>
                        )}
                      </div>
                      {project.technologies.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, i) => (
                            <Badge
                              key={i}
                              className="border-transparent bg-[color:var(--resume-accent)] text-xs text-white"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {project.highlights.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {project.highlights.map((highlight, i) => (
                            <li key={i} className="flex text-sm text-foreground/80">
                              <span className="mr-2 text-[var(--resume-accent)]">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-sm leading-6 text-muted-foreground">
                    {dictionary.preview.fillProjects}
                  </div>
                )}
              </div>
            </section>

            <section className={previewStyle.section}>
              <h2
                className={cn(
                  'text-lg font-semibold text-foreground',
                  previewStyle.sectionTitle,
                  showSectionAccent && 'text-[var(--resume-accent)]',
                )}
              >
                {dictionary.preview.portfolio}
              </h2>
              {hasPortfolio ? (
                <a
                  href={normalizeLink(personalInfo.portfolio)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--resume-accent)] hover:underline"
                >
                  {personalInfo.portfolio}
                </a>
              ) : (
                <div className="text-sm leading-6 text-muted-foreground">{dictionary.preview.fillPortfolio}</div>
              )}
            </section>

            <section>
              <h2
                className={cn(
                  'text-lg font-semibold text-foreground',
                  previewStyle.sectionTitle,
                  showSectionAccent && 'text-[var(--resume-accent)]',
                )}
              >
                {dictionary.preview.abilities}
              </h2>
              {abilityItems.length > 0 ? (
                <div className={previewStyle.card}>
                  <div className="flex flex-wrap gap-2">
                    {abilityItems.map((item, i) => (
                      <Badge
                        key={`${item}-${i}`}
                        variant="outline"
                        className="border-[color:var(--resume-accent)]/20 bg-[color:var(--resume-accent)]/6 text-xs text-foreground"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-sm leading-6 text-muted-foreground">{dictionary.preview.fillAbilities}</div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
