'use client'

import { useResume, type Skill } from '@/lib/resume-context'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Plus, Trash2, GripVertical, X } from 'lucide-react'
import { useState } from 'react'

interface SkillsFormProps {
  skills: Skill[]
}

export function SkillsForm({ skills }: SkillsFormProps) {
  const { updateSkill, addSkill, removeSkill } = useResume()
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({})

  const handleAddSkillItem = (id: string) => {
    const input = newSkillInputs[id]?.trim()
    if (!input) return

    const skill = skills.find((s) => s.id === id)
    if (skill) {
      updateSkill(id, { items: [...skill.items, input] })
      setNewSkillInputs((prev) => ({ ...prev, [id]: '' }))
    }
  }

  const handleRemoveSkillItem = (skillId: string, itemIndex: number) => {
    const skill = skills.find((s) => s.id === skillId)
    if (skill) {
      updateSkill(skillId, {
        items: skill.items.filter((_, i) => i !== itemIndex),
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkillItem(id)
    }
  }

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="space-y-3">
        {skills.map((skill, index) => (
          <AccordionItem
            key={skill.id}
            value={skill.id}
            className="rounded-lg border bg-card px-4"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <GripVertical className="size-4 text-muted-foreground" />
                <div className="text-left">
                  <div className="font-medium">
                    {skill.category || `技能分类 ${index + 1}`}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {skill.items.length} 项技能
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>分类名称</Label>
                <Input
                  value={skill.category}
                  onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
                  placeholder="例如: 前端技术、工具与平台"
                />
              </div>

              <div className="space-y-2">
                <Label>技能列表</Label>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, itemIndex) => (
                    <Badge key={itemIndex} variant="secondary" className="gap-1 pr-1">
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkillItem(skill.id, itemIndex)}
                        className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                      >
                        <X className="size-3" />
                        <span className="sr-only">删除 {item}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSkillInputs[skill.id] || ''}
                    onChange={(e) =>
                      setNewSkillInputs((prev) => ({ ...prev, [skill.id]: e.target.value }))
                    }
                    onKeyDown={(e) => handleKeyDown(e, skill.id)}
                    placeholder="输入技能名称，按回车添加"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAddSkillItem(skill.id)}
                  >
                    添加
                  </Button>
                </div>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeSkill(skill.id)}
                className="w-full"
              >
                <Trash2 className="mr-2 size-4" />
                删除此分类
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={addSkill}>
        <Plus className="mr-2 size-4" />
        添加技能分类
      </Button>
    </div>
  )
}
