'use client'

import { useResume, type Education } from '@/lib/resume-context'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Plus, Trash2, GripVertical } from 'lucide-react'

interface EducationFormProps {
  education: Education[]
}

export function EducationForm({ education }: EducationFormProps) {
  const { updateEducation, addEducation, removeEducation } = useResume()

  const handleHighlightsChange = (id: string, value: string) => {
    const highlights = value.split('\n').filter((line) => line.trim() !== '')
    updateEducation(id, { highlights })
  }

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="space-y-3">
        {education.map((edu, index) => (
          <AccordionItem
            key={edu.id}
            value={edu.id}
            className="rounded-lg border bg-card px-4"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <GripVertical className="size-4 text-muted-foreground" />
                <div className="text-left">
                  <div className="font-medium">
                    {edu.school || `教育经历 ${index + 1}`}
                  </div>
                  {edu.degree && edu.field && (
                    <div className="text-sm text-muted-foreground">
                      {edu.degree} - {edu.field}
                    </div>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>学校名称</Label>
                <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                  placeholder="学校名称"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>学位</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="学士/硕士/博士"
                  />
                </div>
                <div className="space-y-2">
                  <Label>专业</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                    placeholder="专业名称"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>所在地</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                  placeholder="城市"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>入学时间</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>毕业时间</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>GPA（可选）</Label>
                <Input
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                  placeholder="3.8/4.0"
                />
              </div>

              <div className="space-y-2">
                <Label>荣誉/成就（每行一条）</Label>
                <Textarea
                  value={edu.highlights.join('\n')}
                  onChange={(e) => handleHighlightsChange(edu.id, e.target.value)}
                  placeholder="- 校级奖学金&#10;- 优秀毕业生"
                  className="min-h-20 resize-none"
                />
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="w-full"
              >
                <Trash2 className="mr-2 size-4" />
                删除此教育经历
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={addEducation}>
        <Plus className="mr-2 size-4" />
        添加教育经历
      </Button>
    </div>
  )
}
