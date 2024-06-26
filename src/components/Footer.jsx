import { Container } from '@/components/Container'

export function Footer() {
  return (
    <footer className="flex-none py-16">
      <Container className="flex flex-col items-center justify-end md:flex-row">
        {/* <Logo className="h-12 w-auto text-slate-900" /> */}
        <p className="mt-6 text-sm text-slate-500 md:mt-0">
          StarkWare &copy; {new Date().getFullYear()} © 2024 All Rights
          Reserved
        </p>
      </Container>
    </footer>
  )
}
