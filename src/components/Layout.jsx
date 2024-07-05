'use client'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SessionProvider } from 'next-auth/react'

export function Layout({ children, showFooter = true }) {
  return (
    <SessionProvider>
      <Header />
      <main className="flex-auto">{children}</main>
      {showFooter && <Footer />}
    </SessionProvider>
  )
}
