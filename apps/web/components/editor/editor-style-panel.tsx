'use client'

import Link from 'next/link'
import { useResume } from '@/lib/resume-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useTemplateStore } from '@/lib/template-store'
import { getResumeTemplate } from '@/lib/resume-templates'
import { useI18n } from '@/lib/i18n/context'

const accentColors = ['#378ADD', '#185FA5', '#0F766E', '#D97706', '#9333EA', '#DC2626']

const fontOptions = [
  { label: 'Inter', value: 'inter' as const },
  { label: 'Noto Sans SC', value: 'noto-sans-sc' as const },
  { label: 'Georgia', value: 'georgia' as const },
]

const densityOptions = [
  { label: 'Tight', value: 'tight' as const },
  { label: 'Fit', value: 'fit' as const },
  { label: 'Airy', value: 'airy' as const },
]

const marginOptions = [
  { label: 'Slim', value: 'slim' as const },
  { label: 'Normal', value: 'normal' as const },
  { label: 'Wide', value: 'wide' as const },
]

export function EditorStylePanel() {
  const { state, updateStyle, updateTemplate } = useResume()
  const { style } = state.data
  const selectedTemplateId = useTemplateStore((store) => store.selectedTemplateId)
  const currentTemplate = getResumeTemplate(selectedTemplateId || state.data.templateId)
  const { dictionary } = useI18n()

  const handleApplyCurrentTemplate = () => {
    updateTemplate({
      templateId: currentTemplate.id,
      templateName: currentTemplate.name,
      style: currentTemplate.style,
    })
  }

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="border-b px-5 py-4">
        <div className="text-sm font-semibold text-foreground">{dictionary.editor.style}</div>
        <div className="mt-1 text-xs text-muted-foreground">{dictionary.editor.styleDescription}</div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">{dictionary.editor.template}</div>
          <div className="rounded-2xl border bg-background p-4">
            <div className="h-24 rounded-xl border bg-white p-3 shadow-sm">
              <div className="h-2.5 w-16 rounded-full bg-slate-900" />
              <div className="mt-2 h-2 w-12 rounded-full bg-primary/80" />
              <div className="mt-4 space-y-1.5">
                <div className="h-1.5 rounded-full bg-slate-200" />
                <div className="h-1.5 w-10/12 rounded-full bg-slate-200" />
                <div className="h-1.5 w-8/12 rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-foreground">{currentTemplate.name}</div>
                <div className="text-xs text-muted-foreground">{dictionary.editor.currentTemplate}</div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/templates">{dictionary.common.change}</Link>
              </Button>
            </div>
            <Button variant="secondary" size="sm" className="mt-3 w-full" onClick={handleApplyCurrentTemplate}>
              {dictionary.editor.applyCurrentTemplate}
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">{dictionary.editor.palette}</div>
          <div className="flex flex-wrap gap-3">
            {accentColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => updateStyle({ accentColor: color })}
                className="size-8 rounded-full border-2"
                style={{
                  backgroundColor: color,
                  borderColor: style.accentColor === color ? '#0f172a' : 'transparent',
                }}
                aria-label={color}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">{dictionary.editor.font}</div>
          <div className="grid gap-2">
            {fontOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateStyle({ fontFamily: option.value })}
                className={`rounded-xl border px-3 py-2 text-left text-sm ${
                  style.fontFamily === option.value
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'bg-background text-foreground'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">{dictionary.editor.density}</div>
          <div className="grid grid-cols-3 gap-2">
            {densityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateStyle({ density: option.value })}
                className={`rounded-xl border px-3 py-2 text-sm ${
                  style.density === option.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'bg-background text-foreground'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">{dictionary.editor.margins}</div>
          <div className="grid grid-cols-3 gap-2">
            {marginOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateStyle({ margin: option.value })}
                className={`rounded-xl border px-3 py-2 text-sm ${
                  style.margin === option.value
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'bg-background text-foreground'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">{dictionary.editor.highlight}</div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: dictionary.editor.highlightNone, value: 'none' as const },
              { label: dictionary.editor.highlightSections, value: 'sections' as const },
              { label: dictionary.editor.highlightHeader, value: 'header' as const },
            ].map((option) => {
              const selected = style.highlight.includes(option.value)

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    updateStyle({
                      highlight: selected
                        ? style.highlight.filter((item) => item !== option.value)
                        : [...style.highlight.filter((item) => item !== 'none'), option.value],
                    })
                  }
                  className={`rounded-md border px-3 py-1.5 text-[11px] font-medium ${
                    selected ? 'border-primary bg-primary/10 text-primary' : 'bg-background text-foreground'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl border-l-2 border-primary bg-[var(--folio-primary-light)] px-4 py-3">
          <Badge variant="secondary" className="folio-status-editing">
            {dictionary.editor.keepWriting}
          </Badge>
          <div className="mt-3 text-sm text-[var(--folio-primary-dark)]">
            {dictionary.editor.autoSavedHint}
          </div>
        </div>
      </div>
    </div>
  )
}
