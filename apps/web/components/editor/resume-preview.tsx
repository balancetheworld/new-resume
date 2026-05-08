'use client'

import { useResume } from '@/lib/resume-context'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  return `${year}.${month}`
}

export function ResumePreview() {
  const { state } = useResume()
  const { personalInfo, workExperience, education, skills, projects } = state.data

  return (
    <div className="flex h-full flex-col bg-editor-preview">
      <ScrollArea className="flex-1 p-6">
        <div className="resume-preview mx-auto max-w-[210mm] rounded-lg bg-resume-paper p-8 shadow-lg">
          {/* Header - Personal Info */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">{personalInfo.name}</h1>
            <p className="mt-1 text-lg text-primary">{personalInfo.title}</p>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-1.5 hover:text-foreground"
                >
                  <Mail className="size-4" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="size-4" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {personalInfo.location}
                </span>
              )}
            </div>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {personalInfo.website && (
                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground"
                >
                  <Globe className="size-4" />
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              {personalInfo.linkedin && (
                <a
                  href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground"
                >
                  <Linkedin className="size-4" />
                  {personalInfo.linkedin.replace(/^https?:\/\//, '')}
                </a>
              )}
              {personalInfo.github && (
                <a
                  href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground"
                >
                  <Github className="size-4" />
                  {personalInfo.github.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>

            {personalInfo.summary && (
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                {personalInfo.summary}
              </p>
            )}
          </header>

          <Separator className="my-6" />

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">工作经历</h2>
              <div className="space-y-5">
                {workExperience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{exp.position}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company}
                          {exp.location && ` · ${exp.location}`}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm text-muted-foreground">
                        {formatDate(exp.startDate)} - {exp.current ? '至今' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="mt-2 text-sm text-foreground/80">{exp.description}</p>
                    )}
                    {exp.highlights.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex text-sm text-foreground/80">
                            <span className="mr-2 text-primary">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">教育背景</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{edu.school}</h3>
                        <p className="text-sm text-muted-foreground">
                          {edu.degree} · {edu.field}
                          {edu.gpa && ` · GPA: ${edu.gpa}`}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm text-muted-foreground">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    {edu.highlights.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {edu.highlights.map((highlight, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">专业技能</h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <h3 className="mb-2 text-sm font-medium text-foreground">{skill.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-semibold text-foreground">项目经历</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {project.name}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-sm font-normal text-primary hover:underline"
                            >
                              查看项目
                            </a>
                          )}
                        </h3>
                      </div>
                    </div>
                    {project.description && (
                      <p className="mt-1 text-sm text-foreground/80">{project.description}</p>
                    )}
                    {project.technologies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, i) => (
                          <Badge key={i} className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {project.highlights.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="flex text-sm text-foreground/80">
                            <span className="mr-2 text-primary">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
