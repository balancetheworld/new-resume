import { EditorEntry } from '@/components/editor/editor-entry'
import { getLocale } from '@/lib/i18n/server'

export default async function Home() {
  const locale = await getLocale()

  return <EditorEntry locale={locale} />
}
