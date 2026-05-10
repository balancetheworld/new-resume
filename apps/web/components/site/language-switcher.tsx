'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { locales, localeCookieName, type Locale } from '@/lib/i18n/config'
import { useI18n } from '@/lib/i18n/context'

export function LanguageSwitcher() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { locale, dictionary } = useI18n()

  const handleChange = (nextLocale: Locale) => {
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-[10px] font-medium text-muted-foreground sm:inline">
        {dictionary.language.label}
      </span>
      <div className="flex rounded-lg border bg-background p-0.5">
        {locales.map((item) => {
          const active = locale === item

          return (
            <button
              key={item}
              type="button"
              onClick={() => handleChange(item)}
              disabled={isPending || active}
              className={`rounded-md px-2 py-1 text-[10px] font-medium ${
                active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item === 'zh-CN' ? dictionary.language.zhCN : dictionary.language.en}
            </button>
          )
        })}
      </div>
    </div>
  )
}
