'use client'

import { useResume, type Project } from '@/lib/resume-context'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Plus, Trash2, GripVertical, X } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '@/lib/i18n/context'

interface ProjectsFormProps {
  projects: Project[]
}

export function ProjectsForm({ projects }: ProjectsFormProps) {
  const { updateProject, addProject, removeProject } = useResume()
  const [newTechInputs, setNewTechInputs] = useState<Record<string, string>>({})
  const { dictionary } = useI18n()

  const handleHighlightsChange = (id: string, value: string) => {
    const highlights = value.split('\n').filter((line) => line.trim() !== '')
    updateProject(id, { highlights })
  }

  const handleAddTech = (id: string) => {
    const input = newTechInputs[id]?.trim()
    if (!input) return

    const project = projects.find((p) => p.id === id)
    if (project) {
      updateProject(id, { technologies: [...project.technologies, input] })
      setNewTechInputs((prev) => ({ ...prev, [id]: '' }))
    }
  }

  const handleRemoveTech = (projectId: string, techIndex: number) => {
    const project = projects.find((p) => p.id === projectId)
    if (project) {
      updateProject(projectId, {
        technologies: project.technologies.filter((_, i) => i !== techIndex),
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTech(id)
    }
  }

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="space-y-3">
        {projects.map((project, index) => (
          <AccordionItem
            key={project.id}
            value={project.id}
            className="rounded-lg border bg-card px-4"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <GripVertical className="size-4 text-muted-foreground" />
                <div className="text-left">
                  <div className="font-medium">
                    {project.name || `${dictionary.form.accordion.project} ${index + 1}`}
                  </div>
                  {project.technologies.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {project.technologies.slice(0, 3).join(', ')}
                      {project.technologies.length > 3 && '...'}
                    </div>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>{dictionary.form.projectName}</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  placeholder={dictionary.form.placeholders.projectName}
                />
              </div>

              <div className="space-y-2">
                <Label>{dictionary.form.projectDescription}</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  placeholder={dictionary.form.placeholders.projectDescription}
                  className="min-h-20 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>{dictionary.form.projectLinkOptional}</Label>
                <Input
                  value={project.link || ''}
                  onChange={(e) => updateProject(project.id, { link: e.target.value })}
                  placeholder={dictionary.form.placeholders.projectLink}
                />
              </div>

              <div className="space-y-2">
                <Label>{dictionary.form.technologies}</Label>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="gap-1 pr-1">
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(project.id, techIndex)}
                        className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                      >
                        <X className="size-3" />
                        <span className="sr-only">
                          {dictionary.form.removeItem} {tech}
                        </span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTechInputs[project.id] || ''}
                    onChange={(e) =>
                      setNewTechInputs((prev) => ({ ...prev, [project.id]: e.target.value }))
                    }
                    onKeyDown={(e) => handleKeyDown(e, project.id)}
                    placeholder={dictionary.form.placeholders.addTechnology}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAddTech(project.id)}
                  >
                    {dictionary.form.addTechnology}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{dictionary.form.projectHighlights}</Label>
                <Textarea
                  value={project.highlights.join('\n')}
                  onChange={(e) => handleHighlightsChange(project.id, e.target.value)}
                  placeholder={dictionary.form.placeholders.projectHighlights}
                  className="min-h-20 resize-none"
                />
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="w-full"
              >
                <Trash2 className="mr-2 size-4" />
                {dictionary.form.deleteProject}
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={addProject}>
        <Plus className="mr-2 size-4" />
        {dictionary.editor.addProject}
      </Button>
    </div>
  )
}
