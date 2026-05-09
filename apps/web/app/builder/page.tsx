import Link from 'next/link'
import { SiteHeader } from '@/components/site/site-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader current="builder" />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Card className="rounded-3xl py-0 shadow-sm">
          <CardHeader className="px-6 py-6">
            <CardTitle className="text-2xl">DIY builder</CardTitle>
            <CardDescription>
              拖拽式画布和属性检查器的基础路由已经就位，下一步可以继续接入组件面板、拖拽排序和布局保存。
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3 px-6 pb-6">
            <Button asChild>
              <Link href="/builder/new">Start building</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/templates">Back to templates</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
