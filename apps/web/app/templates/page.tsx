import Link from 'next/link'
import { SiteHeader } from '@/components/site/site-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const filters = ['All', 'Classic', 'Modern', 'Minimal', 'Creative', 'Tech']

const templates = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: '平衡招聘友好性与视觉识别度',
    tags: ['Popular', 'Modern', 'Tech'],
    featured: true,
  },
  {
    id: 'classic-serif',
    name: 'Classic Serif',
    description: '适合法务、咨询和传统行业岗位',
    tags: ['Classic'],
  },
  {
    id: 'minimal-grid',
    name: 'Minimal Grid',
    description: '干净克制，适合产品和设计岗位',
    tags: ['Minimal'],
  },
  {
    id: 'creative-split',
    name: 'Creative Split',
    description: '更强的版式变化和卡片式信息结构',
    tags: ['Creative'],
  },
  {
    id: 'engineering-dark',
    name: 'Engineering',
    description: '突出技术栈、项目亮点和性能指标',
    tags: ['Tech'],
  },
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader current="templates" />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-medium text-primary">Templates</div>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">Choose a layout</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              从不同风格模板开始，然后在编辑器里继续微调样式。
            </p>
          </div>
          <div className="flex w-full max-w-md gap-3">
            <Input placeholder="Search templates" />
            <Button variant="outline">Newest</Button>
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
          {templates.map((template, index) => (
            <Card
              key={template.id}
              className={`overflow-hidden rounded-3xl py-0 shadow-sm ${template.featured ? 'border-primary/40 ring-1 ring-primary/20' : ''}`}
            >
              <div
                className={`h-52 p-5 ${
                  index % 3 === 0
                    ? 'bg-gradient-to-br from-blue-50 to-slate-100'
                    : index % 3 === 1
                      ? 'bg-gradient-to-br from-stone-50 to-slate-100'
                      : 'bg-gradient-to-br from-cyan-50 to-slate-100'
                }`}
              >
                <div className="h-full rounded-2xl border bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-24 rounded-full bg-slate-900" />
                    {template.featured && <Badge>Popular</Badge>}
                  </div>
                  <div className="mt-3 h-2 w-20 rounded-full bg-blue-500/80" />
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
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <Link href={`/editor/${template.id}`}>Use this template</Link>
                </Button>
              </CardContent>
            </Card>
          ))}

          <Card className="overflow-hidden rounded-3xl border-dashed py-0 shadow-sm">
            <div className="flex h-52 items-center justify-center bg-slate-50">
              <div className="flex size-16 items-center justify-center rounded-full border-2 border-dashed text-3xl text-muted-foreground">
                +
              </div>
            </div>
            <CardHeader className="px-5 py-4">
              <CardTitle className="text-base">Custom layout</CardTitle>
              <CardDescription>进入 DIY builder，自定义区块和排版结构</CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <Button variant="outline" asChild className="w-full">
                <Link href="/builder">Open builder</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
