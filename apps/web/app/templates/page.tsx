'use client'

import Link from 'next/link'
import { FloatingWorkspaceMenu } from '@/components/editor/floating-workspace-menu'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getResumeTemplateDefinitions } from '@/lib/template-registry'
import { useI18n } from '@/lib/i18n/context'
import { TemplateUseButton } from '@/components/templates/template-use-button'

const previewToneClassMap = {
  blue: 'bg-gradient-to-br from-blue-50 to-slate-100',
  stone: 'bg-gradient-to-br from-stone-50 to-slate-100',
  cyan: 'bg-gradient-to-br from-cyan-50 to-slate-100',
}

export default function TemplatesPage() {
  const { locale, dictionary } = useI18n()
  const filters = dictionary.templates.filters
  const resumeTemplates = getResumeTemplateDefinitions(locale).map((template) => template.meta)

  return (
    <div className="min-h-screen bg-background">
      <FloatingWorkspaceMenu variant="site" />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-medium text-primary">{dictionary.templates.pageTag}</div>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">{dictionary.templates.pageTitle}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {dictionary.templates.pageDescription}
            </p>
          </div>
          <div className="flex w-full max-w-md gap-3">
            <Input placeholder={dictionary.common.searchTemplates} />
            <Button variant="outline">{dictionary.common.newest}</Button>
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          {filters.map((filter, index) => (
            <Button key={filter} variant={index === 0 ? 'default' : 'outline'} size="sm">
              {filter}
            </Button>
          ))}
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resumeTemplates.map((template) => {
            return (
              <Card
                key={template.id}
                className={`overflow-hidden rounded-3xl py-0 shadow-sm ${template.featured ? 'border-primary/40 ring-1 ring-primary/20' : ''}`}
              >
                <div className={`h-52 p-5 ${previewToneClassMap[template.previewTone]}`}>
                  <div className="h-full rounded-2xl border bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-24 rounded-full bg-slate-900" />
                      <div className="flex items-center gap-2">
                        {template.featured && <Badge>{dictionary.common.popular}</Badge>}
                      </div>
                    </div>
                    <div
                      className="mt-3 h-2 w-20 rounded-full"
                      style={{ backgroundColor: template.style.accentColor }}
                    />
                    <div className="mt-5 space-y-2">
                      <div className="h-2 rounded-full bg-slate-200" />
                      <div className="h-2 w-10/12 rounded-full bg-slate-200" />
                      <div className="h-2 w-8/12 rounded-full bg-slate-200" />
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <div className="h-14 rounded-xl bg-slate-100" />
                      <div className="h-14 rounded-xl bg-slate-100" />
                    </div>
                  </div>
                </div>
                <CardHeader className="px-5 py-4">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-5 pb-5">
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {dictionary.templates.tags[tag as keyof typeof dictionary.templates.tags] ?? tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid gap-2">
                    <TemplateUseButton
                      templateId={template.id}
                      locale={locale}
                      label={dictionary.common.useTemplate}
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}

          <Card className="overflow-hidden rounded-3xl border-dashed py-0 shadow-sm">
            <div className="flex h-52 items-center justify-center bg-slate-50">
              <div className="flex size-16 items-center justify-center rounded-full border-2 border-dashed text-3xl text-muted-foreground">
                +
              </div>
            </div>
            <CardHeader className="px-5 py-4">
              <CardTitle className="text-base">{dictionary.templates.customLayout}</CardTitle>
              <CardDescription>{dictionary.templates.customLayoutDescription}</CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <Button variant="outline" asChild className="w-full">
                <Link href="/builder">{dictionary.common.openBuilder}</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
