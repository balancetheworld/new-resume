'use client'

import { useResume, type WorkExperience } from '@/lib/resume-context'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Plus, Trash2, GripVertical } from 'lucide-react'

interface WorkExperienceFormProps {
  experiences: WorkExperience[]
}

export function WorkExperienceForm({ experiences }: WorkExperienceFormProps) {
  const { updateWorkExperience, addWorkExperience, removeWorkExperience } = useResume()

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
            className="rounded-lg border bg-card px-4"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <GripVertical className="size-4 text-muted-foreground" />
                <div className="text-left">
                  <div className="font-medium">
                    {exp.position || exp.company || `工作经历 ${index + 1}`}
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
                  <Label>公司名称</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                    placeholder="公司名称"
                  />
                </div>
                <div className="space-y-2">
                  <Label>职位</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateWorkExperience(exp.id, { position: e.target.value })}
                    placeholder="职位名称"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>工作地点</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateWorkExperience(exp.id, { location: e.target.value })}
                  placeholder="城市"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>开始时间</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateWorkExperience(exp.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>结束时间</Label>
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
                <Label>至今在职</Label>
              </div>

              <div className="space-y-2">
                <Label>工作描述</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateWorkExperience(exp.id, { description: e.target.value })}
                  placeholder="简要描述你的工作职责..."
                  className="min-h-20 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>工作亮点（每行一条）</Label>
                <Textarea
                  value={exp.highlights.join('\n')}
                  onChange={(e) => handleHighlightsChange(exp.id, e.target.value)}
                  placeholder="- 主导完成了xxx项目&#10;- 提升了xxx指标&#10;- 获得xxx奖项"
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
                删除此经历
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={addWorkExperience}>
        <Plus className="mr-2 size-4" />
        添加工作经历
      </Button>
    </div>
  )
}
