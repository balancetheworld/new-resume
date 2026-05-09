'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/lib/i18n/context'
import { LanguageSwitcher } from './language-switcher'

interface SiteHeaderProps {
  current?: 'editor' | 'templates' | 'builder' | 'resumes'
}

export function SiteHeader({ current }: SiteHeaderProps) {
  const pathname = usePathname()
  const { dictionary } = useI18n()
  const navItems = [
    { href: '/', label: dictionary.nav.editor, key: 'editor' },
    { href: '/templates', label: dictionary.nav.templates, key: 'templates' },
    { href: '/builder', label: dictionary.nav.builder, key: 'builder' },
    { href: '/resumes', label: dictionary.nav.resumes, key: 'resumes' },
  ] as const

  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
              F
            </span>
            <span className="text-[14px] font-medium text-foreground">Folio.</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
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
                  className={`rounded-md px-3 py-1.5 text-[11px] font-medium ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-[rgba(58,58,74,0.45)] hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Badge variant="secondary" className="hidden rounded-md px-2 py-0.5 text-[10px] font-medium sm:inline-flex">
            {dictionary.common.autoSaved}
          </Badge>
          <Avatar className="size-7 bg-[var(--folio-purple-light)]">
            <AvatarFallback className="bg-[var(--folio-purple-light)] text-[11px] font-medium text-foreground">
              ZO
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
