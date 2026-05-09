'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/site/site-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n/context'

export default function BuilderPage() {
  const { dictionary } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader current="builder" />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Card className="rounded-3xl py-0 shadow-sm">
          <CardHeader className="px-6 py-6">
            <CardTitle className="text-2xl">{dictionary.builder.pageTitle}</CardTitle>
            <CardDescription>
              {dictionary.builder.pageDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3 px-6 pb-6">
            <Button asChild>
              <Link href="/builder/new">{dictionary.builder.startBuilding}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/templates">{dictionary.builder.backToTemplates}</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
