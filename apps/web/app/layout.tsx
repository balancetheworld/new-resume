import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { getI18n } from '@/lib/i18n/server'
import { I18nProvider } from '@/lib/i18n/context'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Folio. - 在线简历编辑器',
  description: 'Folio. 是一个所见即所得的在线简历编辑器，支持模板选择、实时预览和自定义布局。',
  keywords: ['Folio', '简历编辑器', '在线简历', 'resume', 'CV'],
  authors: [{ name: 'Folio Team' }],
  openGraph: {
    title: 'Folio. - 在线简历编辑器',
    description: '所见即所得的在线简历编辑器',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { locale, dictionary } = await getI18n()

  return (
    <html lang={locale} className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <I18nProvider locale={locale} dictionary={dictionary}>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
