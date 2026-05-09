'use client'

import Link from 'next/link'
import { useResume } from '@/lib/resume-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const accentColors = ['#378ADD', '#185FA5', '#0F766E', '#D97706', '#9333EA', '#DC2626']

const fontOptions = [
  { label: 'Inter', value: 'inter' as const },
  { label: 'Noto Sans SC', value: 'noto-sans-sc' as const },
  { label: 'Georgia', value: 'georgia' as const },
  { label: 'JetBrains Mono', value: 'jetbrains-mono' as const },
]

const spacingOptions = [
  { label: 'Compact', value: 'compact' as const },
  { label: 'Comfortable', value: 'comfortable' as const },
  { label: 'Airy', value: 'airy' as const },
]

const marginOptions = [
  { label: 'Narrow', value: 'narrow' as const },
  { label: 'Normal', value: 'normal' as const },
  { label: 'Wide', value: 'wide' as const },
]

export function EditorStylePanel() {
  const { state, updateStyle } = useResume()
  const { style } = state.data

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="border-b px-5 py-4">
        <div className="text-sm font-semibold text-foreground">Style</div>
        <div className="mt-1 text-xs text-muted-foreground">调整模板、颜色和排版密度</div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">Template</div>
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
                <div className="text-sm font-medium text-foreground">Modern Blue</div>
                <div className="text-xs text-muted-foreground">当前模板</div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/templates">Change</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">Accent color</div>
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
          <div className="text-sm font-medium text-foreground">Font</div>
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
          <div className="text-sm font-medium text-foreground">Spacing</div>
          <div className="grid grid-cols-3 gap-2">
            {spacingOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateStyle({ spacing: option.value })}
                className={`rounded-xl border px-3 py-2 text-sm ${
                  style.spacing === option.value
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
          <div className="text-sm font-medium text-foreground">Page margins</div>
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

        <div className="rounded-2xl border bg-background p-4">
          <Badge variant="secondary">Pro tip</Badge>
          <div className="mt-3 text-sm text-foreground">
            先确定模板和主色，再集中调整内容，能更快接近最终投递效果。
          </div>
        </div>
      </div>
    </div>
  )
}
