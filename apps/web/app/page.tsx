import Link from 'next/link'
import { SiteHeader } from '@/components/site/site-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const resumes = [
  {
    id: 'senior-frontend',
    name: 'Senior Frontend Resume',
    template: 'Modern Blue',
    updatedAt: '2 小时前',
    status: 'Draft',
    pages: '1 page',
  },
  {
    id: 'product-designer',
    name: 'Product Designer CV',
    template: 'Minimal',
    updatedAt: '昨天',
    status: 'Published',
    pages: '2 pages',
  },
  {
    id: 'golang-backend',
    name: 'Go Backend Profile',
    template: 'Classic',
    updatedAt: '3 天前',
    status: 'Draft',
    pages: '1 page',
  },
]

const activities = [
  '编辑了 Senior Frontend Resume 的工作经历',
  '导出了 Product Designer CV 的 PDF',
  '为 Go Backend Profile 切换到了 Classic 模板',
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader current="dashboard" />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8">
        <section className="flex flex-col gap-4 rounded-3xl border bg-card px-6 py-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-medium text-primary">Dashboard</div>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">My resumes</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              3 份简历，最近一次编辑发生在 2 小时前
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/templates">New from template</Link>
            </Button>
            <Button asChild>
              <Link href="/editor/new">New blank resume</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {resumes.map((resume, index) => (
              <Link key={resume.id} href={`/editor/${resume.id}`} className="group">
                <Card className="gap-0 overflow-hidden rounded-3xl border-border/80 py-0 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                  <div className="h-40 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-5">
                    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="h-3 w-24 rounded-full bg-slate-900/90" />
                      <div className="mt-3 h-2 w-20 rounded-full bg-blue-500/80" />
                      <div className="mt-5 space-y-2">
                        <div className="h-2 rounded-full bg-slate-200" />
                        <div className="h-2 w-11/12 rounded-full bg-slate-200" />
                        <div className="h-2 w-8/12 rounded-full bg-slate-200" />
                      </div>
                      <div className="mt-5 grid grid-cols-2 gap-2">
                        <div className="h-10 rounded-xl bg-slate-100" />
                        <div className="h-10 rounded-xl bg-slate-100" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-base">{resume.name}</CardTitle>
                      <Badge variant={index === 1 ? 'default' : 'secondary'}>{resume.status}</Badge>
                    </div>
                    <CardDescription>{resume.template}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between px-5 pb-5 text-xs text-muted-foreground">
                    <span>{resume.updatedAt}</span>
                    <span>{resume.pages}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="rounded-3xl border-amber-200 bg-amber-50 py-0 shadow-sm">
              <CardHeader className="px-5 py-5">
                <CardTitle className="text-base text-amber-900">Try DIY builder</CardTitle>
                <CardDescription className="text-amber-800/80">
                  自由组合组件、调整版式，构建自己的简历模板。
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <Button asChild>
                  <Link href="/builder">Open builder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl py-0 shadow-sm">
              <CardHeader className="px-5 py-5">
                <CardTitle className="text-base">Recent activity</CardTitle>
                <CardDescription>最近的编辑、导出和模板切换记录</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-5 pb-5">
                {activities.map((item, index) => (
                  <div key={item} className="flex gap-3">
                    <div className="mt-1 size-2 rounded-full bg-primary" />
                    <div>
                      <div className="text-sm text-foreground">{item}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{index + 1} 小时前</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
