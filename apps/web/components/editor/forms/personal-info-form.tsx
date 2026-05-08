'use client'

import { useResume } from '@/lib/resume-context'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function PersonalInfoForm() {
  const { state, updatePersonalInfo } = useResume()
  const { personalInfo } = state.data

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">姓名</Label>
          <Input
            id="name"
            value={personalInfo.name}
            onChange={(e) => updatePersonalInfo({ name: e.target.value })}
            placeholder="请输入姓名"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">职位</Label>
          <Input
            id="title"
            value={personalInfo.title}
            onChange={(e) => updatePersonalInfo({ title: e.target.value })}
            placeholder="请输入职位"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            placeholder="your@email.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">电话</Label>
          <Input
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            placeholder="+86 138 0000 0000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">所在地</Label>
        <Input
          id="location"
          value={personalInfo.location}
          onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          placeholder="城市, 区域"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">个人网站</Label>
        <Input
          id="website"
          value={personalInfo.website || ''}
          onChange={(e) => updatePersonalInfo({ website: e.target.value })}
          placeholder="https://yourwebsite.com"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin || ''}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/username"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={personalInfo.github || ''}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
            placeholder="github.com/username"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">个人简介</Label>
        <Textarea
          id="summary"
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          placeholder="简要介绍你的职业背景和专业特长..."
          className="min-h-24 resize-none"
        />
      </div>
    </div>
  )
}
