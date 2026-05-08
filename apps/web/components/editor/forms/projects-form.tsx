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

interface ProjectsFormProps {
  projects: Project[]
}

export function ProjectsForm({ projects }: ProjectsFormProps) {
  const { updateProject, addProject, removeProject } = useResume()
  const [newTechInputs, setNewTechInputs] = useState<Record<string, string>>({})

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
                    {project.name || `项目 ${index + 1}`}
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
                <Label>项目名称</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  placeholder="项目名称"
                />
              </div>

              <div className="space-y-2">
                <Label>项目描述</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  placeholder="简要描述项目内容和你的角色..."
                  className="min-h-20 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>项目链接（可选）</Label>
                <Input
                  value={project.link || ''}
                  onChange={(e) => updateProject(project.id, { link: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label>技术栈</Label>
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
                        <span className="sr-only">删除 {tech}</span>
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
                    placeholder="输入技术名称，按回车添加"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAddTech(project.id)}
                  >
                    添加
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>项目亮点（每行一条）</Label>
                <Textarea
                  value={project.highlights.join('\n')}
                  onChange={(e) => handleHighlightsChange(project.id, e.target.value)}
                  placeholder="- 实现了xxx功能&#10;- 提升了xxx效率"
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
                删除此项目
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={addProject}>
        <Plus className="mr-2 size-4" />
        添加项目经历
      </Button>
    </div>
  )
}
