import { Layout } from '@/components/Layout'
import '@/styles/tailwind.css'
import clsx from 'clsx'
import { DM_Sans, Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata = {
  title: {
    template: '%s - Exploration',
    default: 'StarkWare | Exploration',
  },
  description:
    'Our goal is to kickstart exciting projects and to work hands in hands with the community. ',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, dmSans.variable)}
    >
      <body className="flex min-h-full bg-slate-900 overflow-x-hidden">
        <div className="flex w-full flex-col">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  )
}
