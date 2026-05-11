import { EditorEntry } from '@/components/editor/editor-entry'
import { FloatingWorkspaceMenu } from '@/components/editor/floating-workspace-menu'
import { getLocale } from '@/lib/i18n/server'

export default async function Home() {
  const locale = await getLocale()

  return (
    <>
      <FloatingWorkspaceMenu variant="site" />
      <EditorEntry locale={locale} />
    </>
  )
}
