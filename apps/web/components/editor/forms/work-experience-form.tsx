'use client'

import { useResume, type WorkExperience } from '@/lib/resume-context'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'

interface WorkExperienceFormProps {
  experiences: WorkExperience[]
}

export function WorkExperienceForm({ experiences }: WorkExperienceFormProps) {
  const { updateWorkExperience, addWorkExperience, removeWorkExperience } = useResume()
  const { dictionary } = useI18n()

  const handleHighlightsChange = (id: string, value: string) => {
    const highlights = value.split('\n').filter((line) => line.trim() !== '')
    updateWorkExperience(id, { highlights })
  }

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="space-y-3">
        {experiences.map((exp, index) => (
          <AccordionItem
            key={exp.id}
            value={exp.id}
            className="rounded-xl border border-[#d8e3f3] bg-[#f9fbff] px-4 shadow-[0_6px_18px_rgba(52,78,118,0.04)] data-[state=open]:border-primary"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <GripVertical className="size-4 text-muted-foreground" />
                <div className="text-left">
                  <div className="font-medium">
                    {exp.position || exp.company || `${dictionary.form.accordion.workExperience} ${index + 1}`}
                  </div>
                  {exp.company && exp.position && (
                    <div className="text-sm text-muted-foreground">{exp.company}</div>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{dictionary.form.company}</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                    placeholder={dictionary.form.placeholders.company}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{dictionary.form.position}</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateWorkExperience(exp.id, { position: e.target.value })}
                    placeholder={dictionary.form.placeholders.position}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{dictionary.form.location}</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateWorkExperience(exp.id, { location: e.target.value })}
                  placeholder={dictionary.form.placeholders.location}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{dictionary.form.startDate}</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateWorkExperience(exp.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{dictionary.form.endDate}</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateWorkExperience(exp.id, { endDate: e.target.value })}
                    disabled={exp.current}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={exp.current}
                  onCheckedChange={(checked) =>
                    updateWorkExperience(exp.id, { current: checked, endDate: checked ? '' : exp.endDate })
                  }
                />
                <Label>{dictionary.form.currentJob}</Label>
              </div>

              <div className="space-y-2">
                <Label>{dictionary.form.workDescription}</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateWorkExperience(exp.id, { description: e.target.value })}
                  placeholder={dictionary.form.placeholders.workDescription}
                  className="min-h-20 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>{dictionary.form.workHighlights}</Label>
                <Textarea
                  value={exp.highlights.join('\n')}
                  onChange={(e) => handleHighlightsChange(exp.id, e.target.value)}
                  placeholder={dictionary.form.placeholders.workHighlights}
                  className="min-h-24 resize-none"
                />
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeWorkExperience(exp.id)}
                className="w-full"
              >
                <Trash2 className="mr-2 size-4" />
                {dictionary.form.deleteExperience}
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={addWorkExperience}>
        <Plus className="mr-2 size-4" />
        {dictionary.editor.addExperience}
      </Button>
    </div>
  )
}
