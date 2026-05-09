'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface SiteHeaderProps {
  current?: 'dashboard' | 'templates' | 'resumes' | 'builder'
}

const navItems = [
  { href: '/', label: 'Dashboard', key: 'dashboard' },
  { href: '/templates', label: 'Templates', key: 'templates' },
  { href: '/editor/new', label: 'My resumes', key: 'resumes' },
  { href: '/builder', label: 'Builder', key: 'builder' },
] as const

export function SiteHeader({ current }: SiteHeaderProps) {
  const pathname = usePathname()

  return (
    <header className="border-b bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold text-foreground">
            ResumeCraft
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const active = current
                ? current === item.key
                : item.href === '/'
                  ? pathname === item.href
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="hidden rounded-full px-3 sm:inline-flex">
            Synced
          </Badge>
          <Avatar>
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
