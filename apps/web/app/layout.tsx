import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '简历编辑器 - 在线制作专业简历',
  description: '免费在线简历编辑器，支持实时预览、自动保存、一键发布分享。轻松制作专业简历，助力职场发展。',
  keywords: ['简历', '简历编辑器', '在线简历', 'resume', 'CV', '求职'],
  authors: [{ name: 'Resume Editor Team' }],
  openGraph: {
    title: '简历编辑器 - 在线制作专业简历',
    description: '免费在线简历编辑器，支持实时预览、自动保存、一键发布分享',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
