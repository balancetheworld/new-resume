'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/site/site-header'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'

export default function BuilderDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { dictionary } = useI18n()
  const blocks = [
    dictionary.builder.blocks.header,
    dictionary.builder.blocks.text,
    dictionary.builder.blocks.experience,
    dictionary.builder.blocks.education,
    dictionary.builder.blocks.skills,
    dictionary.builder.blocks.divider,
    dictionary.builder.blocks.image,
    dictionary.builder.blocks.timeline,
  ]
  const { id } = params

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader current="builder" />
      <main className="grid min-h-[calc(100vh-4rem)] grid-cols-1 xl:grid-cols-[220px_1fr_260px]">
        <aside className="border-r bg-card px-4 py-5">
          <div className="text-sm font-semibold text-foreground">{dictionary.builder.components}</div>
          <div className="mt-4 space-y-2">
            {blocks.map((block) => (
              <Card key={block} className="rounded-2xl px-4 py-3 text-sm shadow-none">
                {block}
              </Card>
            ))}
          </div>
        </aside>
        <section className="bg-slate-100 px-6 py-6">
          <div className="mx-auto max-w-[820px] rounded-[28px] border bg-white p-8 shadow-lg">
            <div className="mb-4 h-1.5 w-20 rounded-full bg-primary" />
            <div className="rounded-2xl border-2 border-primary p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold text-foreground">{dictionary.builder.blocks.header}</div>
                  <div className="text-sm text-muted-foreground">{dictionary.builder.selectedState}</div>
                </div>
                <Badge>{dictionary.common.active}</Badge>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-dashed p-4 text-sm text-muted-foreground">
              {dictionary.builder.dropHere}
            </div>
          </div>
        </section>
        <aside className="border-l bg-card px-5 py-5">
          <div className="text-sm font-semibold text-foreground">
            {dictionary.builder.selected}: {dictionary.builder.blocks.header}
          </div>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <div>{dictionary.builder.editingLayout} {id}</div>
            <div>{dictionary.builder.nextStep}</div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button>{dictionary.common.saveAsTemplate}</Button>
            <Button variant="outline" asChild>
              <Link href={`/editor/${id}`}>{dictionary.common.continue}</Link>
            </Button>
          </div>
        </aside>
      </main>
    </div>
  )
}
