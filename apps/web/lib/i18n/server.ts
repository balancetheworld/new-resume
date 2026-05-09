import { cookies } from 'next/headers'
import { defaultLocale, isLocale, localeCookieName, type Locale } from '@/lib/i18n/config'
import { getMessages, type Messages } from '@/lib/i18n/messages'

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const localeValue = cookieStore.get(localeCookieName)?.value

  if (isLocale(localeValue)) {
    return localeValue
  }

  return defaultLocale
}

export async function getI18n() {
  const locale = await getLocale()
  const dictionary = getMessages(locale)

  return {
    locale,
    dictionary,
  }
}

export type I18nDictionary = Messages
