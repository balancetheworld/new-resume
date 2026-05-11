'use client'

import { useResume } from '@/lib/resume-context'
import { useI18n } from '@/lib/i18n/context'

const accentColors = ['#4F86DF', '#2563EB', '#5F82D8', '#3F8CFF', '#185FA5', '#0EA5E9']

const fontOptions = [
  { label: 'Inter', value: 'inter' as const },
  { label: 'Noto Sans SC', value: 'noto-sans-sc' as const },
  { label: 'Georgia', value: 'georgia' as const },
]

export function EditorStylePanel() {
  const { state, updateStyle } = useResume()
  const { style } = state.data
  const { dictionary } = useI18n()

  return (
    <div className="flex h-full flex-col bg-transparent">
      <div className="border-b border-white/45 bg-background/62 px-5 py-4 backdrop-blur-sm">
        <div className="text-sm font-semibold text-foreground">{dictionary.editor.style}</div>
        <div className="mt-1 text-xs text-muted-foreground">{dictionary.editor.styleDescription}</div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
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
