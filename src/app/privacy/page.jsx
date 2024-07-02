import { Container } from '@/components/Container'

export default function Home() {
  return (
    <Container className="relative mt-10 sm:mt-24">
      <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12 text-base text-slate-50">
        <div className="text-2xl font-bold mb-4">Privacy Policy</div>
        This is the privacy policy (“Privacy Policy”) that governs how we,
        StarkWare Ltd. (“StarkWare”, “we”, “our” or “us”), use Personal
        Information (defined below) that we collect, receive and store about
        individuals in connection with the use of the websites
        https://starknet.io and starkware.co and any other website that we
        operate (each, together with its sub-domains, content and services, a
        “Site”).{' '}
      </div>
    </Container>
  )
}
