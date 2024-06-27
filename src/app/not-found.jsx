import { Container } from '@/components/Container'

export default function NotFound() {
  return (
    <div className="relative flex h-full items-center py-20 sm:py-36">
      <Container className="relative flex w-full flex-col items-center">
        <p className="font-display text-2xl tracking-tight text-white">404</p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-lg tracking-tight text-white">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      </Container>
    </div>
  )
}
