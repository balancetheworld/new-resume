export const locales = ['zh-CN', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'zh-CN'

export const localeCookieName = 'resume-editor-locale'

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && locales.includes(value as Locale)
}
