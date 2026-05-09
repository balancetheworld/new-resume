'use client'

import { useResume } from '@/lib/resume-context'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/lib/i18n/context'

export function PersonalInfoForm() {
  const { state, updatePersonalInfo } = useResume()
  const { personalInfo } = state.data
  const { dictionary } = useI18n()

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{dictionary.form.name}</Label>
          <Input
            id="name"
            value={personalInfo.name}
            onChange={(e) => updatePersonalInfo({ name: e.target.value })}
            placeholder={dictionary.form.placeholders.name}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">{dictionary.form.jobTitle}</Label>
          <Input
            id="jobTitle"
            value={personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
            placeholder={dictionary.form.placeholders.jobTitle}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="gender">{dictionary.form.gender}</Label>
          <Input
            id="gender"
            value={personalInfo.gender}
            onChange={(e) => updatePersonalInfo({ gender: e.target.value })}
            placeholder={dictionary.form.placeholders.gender}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="educationLevel">{dictionary.form.educationLevel}</Label>
          <Input
            id="educationLevel"
            value={personalInfo.educationLevel}
            onChange={(e) => updatePersonalInfo({ educationLevel: e.target.value })}
            placeholder={dictionary.form.placeholders.educationLevel}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="school">{dictionary.form.school}</Label>
          <Input
            id="school"
            value={personalInfo.school}
            onChange={(e) => updatePersonalInfo({ school: e.target.value })}
            placeholder={dictionary.form.placeholders.school}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="major">{dictionary.form.major}</Label>
          <Input
            id="major"
            value={personalInfo.major}
            onChange={(e) => updatePersonalInfo({ major: e.target.value })}
            placeholder={dictionary.form.placeholders.major}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="qq">{dictionary.form.qq}</Label>
          <Input
            id="qq"
            value={personalInfo.qq}
            onChange={(e) => updatePersonalInfo({ qq: e.target.value })}
            placeholder={dictionary.form.placeholders.qq}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wechat">{dictionary.form.wechat}</Label>
          <Input
            id="wechat"
            value={personalInfo.wechat}
            onChange={(e) => updatePersonalInfo({ wechat: e.target.value })}
            placeholder={dictionary.form.placeholders.wechat}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">{dictionary.form.phone}</Label>
          <Input
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            placeholder={dictionary.form.placeholders.phone}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">{dictionary.form.github}</Label>
          <Input
            id="github"
            value={personalInfo.github}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
            placeholder={dictionary.form.placeholders.github}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="portfolio">{dictionary.form.portfolio}</Label>
        <Input
          id="portfolio"
          value={personalInfo.portfolio}
          onChange={(e) => updatePersonalInfo({ portfolio: e.target.value })}
          placeholder={dictionary.form.placeholders.portfolio}
        />
      </div>
    </div>
  )
}
