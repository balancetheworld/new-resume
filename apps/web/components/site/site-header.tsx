'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import { LanguageSwitcher } from './language-switcher'
import { Menu, X } from 'lucide-react'

interface SiteHeaderProps {
  current?: 'editor' | 'templates' | 'builder' | 'resumes'
}

export function SiteHeader({ current }: SiteHeaderProps) {
  const pathname = usePathname()
  const { dictionary } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = useMemo(
    () =>
      [
        { href: '/', label: dictionary.nav.editor, key: 'editor' },
        { href: '/templates', label: dictionary.nav.templates, key: 'templates' },
        { href: '/builder', label: dictionary.nav.builder, key: 'builder' },
        { href: '/resumes', label: dictionary.nav.resumes, key: 'resumes' },
      ] as const,
    [dictionary]
  )

  const currentLabel =
    navItems.find((item) =>
      current
        ? current === item.key
        : item.href === '/'
          ? pathname === item.href
          : pathname.startsWith(item.href)
    )?.label ?? dictionary.nav.editor

  return (
    <header className="border-b bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="min-w-0">
          <div className="truncate text-[12px] font-medium tracking-[0.04em] text-foreground">
            {currentLabel}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t bg-card">
          <nav className="mx-auto flex max-w-[1440px] flex-col px-4 py-3 sm:px-6">
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
                  className={`rounded-lg px-3 py-2 text-[12px] font-medium ${
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
