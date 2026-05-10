'use client'

import Link from 'next/link'
import { useResume } from '@/lib/resume-context'
import { Button } from '@/components/ui/button'
import { getResumeTemplate } from '@/lib/resume-templates'
import { useI18n } from '@/lib/i18n/context'

const accentColors = ['#4F86DF', '#2563EB', '#5F82D8', '#3F8CFF', '#185FA5', '#0EA5E9']

const fontOptions = [
  { label: 'Inter', value: 'inter' as const },
  { label: 'Noto Sans SC', value: 'noto-sans-sc' as const },
  { label: 'Georgia', value: 'georgia' as const },
]

export function EditorStylePanel() {
  const { state, updateStyle, updateTemplate } = useResume()
  const { style } = state.data
  const currentTemplate = getResumeTemplate(state.data.templateId)
  const { dictionary } = useI18n()

  const handleApplyCurrentTemplate = () => {
    updateTemplate({
      templateId: currentTemplate.id,
      templateName: currentTemplate.name,
      style: currentTemplate.style,
    })
  }

  return (
    <div className="flex h-full flex-col bg-transparent">
      <div className="border-b border-white/45 bg-background/62 px-5 py-4 backdrop-blur-sm">
        <div className="text-sm font-semibold text-foreground">{dictionary.editor.style}</div>
        <div className="mt-1 text-xs text-muted-foreground">{dictionary.editor.styleDescription}</div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">{dictionary.editor.template}</div>
          <div className="rounded-2xl border border-white/45 bg-white/60 p-4 shadow-[0_12px_28px_rgba(59,87,133,0.07)] backdrop-blur-sm">
            <div className="h-24 rounded-xl border border-[#d9e5f6] bg-[#feffff] p-3 shadow-[0_8px_18px_rgba(83,116,173,0.06)]">
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
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="color"
                value={style.accentColor}
                onChange={(e) => updateStyle({ accentColor: e.target.value })}
                className="size-10 cursor-pointer overflow-hidden rounded-full border-2 border-white/80 bg-white/86 shadow-[0_6px_14px_rgba(83,116,173,0.06)]"
                style={{ backgroundColor: style.accentColor }}
              />
            </div>
            <div className="text-xs text-muted-foreground font-mono">{style.accentColor}</div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {accentColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => updateStyle({ accentColor: color })}
                className="size-6 rounded-full border-2 transition-transform hover:scale-110"
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
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-white/45 bg-white/58 text-foreground backdrop-blur-sm'
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
                    selected ? 'border-primary bg-primary/10 text-primary' : 'border-white/45 bg-white/58 text-foreground backdrop-blur-sm'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
