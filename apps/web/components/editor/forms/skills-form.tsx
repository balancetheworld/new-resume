'use client'

import { useResume, type Skill } from '@/lib/resume-context'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Plus, Trash2, GripVertical, X } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '@/lib/i18n/context'

interface SkillsFormProps {
  skills: Skill[]
}

export function SkillsForm({ skills }: SkillsFormProps) {
  const { updateSkill, addSkill, removeSkill } = useResume()
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({})
  const { dictionary } = useI18n()

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
            className="rounded-xl border border-[#d8e3f3] bg-[#f9fbff] px-4 shadow-[0_6px_18px_rgba(52,78,118,0.04)] data-[state=open]:border-primary"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <GripVertical className="size-4 text-muted-foreground" />
                <div className="text-left">
                  <div className="font-medium">
                    {dictionary.form.personalAbilities}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {skill.items.length} {dictionary.form.abilityCount}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
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
                        <span className="sr-only">
                          {dictionary.form.removeItem} {item}
                        </span>
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
                    placeholder={dictionary.form.placeholders.addAbility}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAddSkillItem(skill.id)}
                  >
                    {dictionary.form.addAbility}
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
                {dictionary.form.deleteCategory}
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={addSkill}>
        <Plus className="mr-2 size-4" />
        {dictionary.editor.addAbilityGroup}
      </Button>
    </div>
  )
}
