import Image from 'next/image'
import { Container } from '@/components/Container'
import { HeroBackground } from '@/components/HeroBackground'

export function Hero() {
  return (
    <div className="sm:pt-26 relative py-20 sm:pb-16">
      <div className="absolute inset-x-[-50vw] -bottom-4 -top-32 opacity-25 lg:-bottom-3 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
        <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <div className="font-display text-5xl font-bold tracking-tighter text-slate-50 sm:text-7xl">
            Build.
          </div>
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text pb-2 text-5xl font-bold tracking-tighter text-transparent sm:text-7xl">
            Together.
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              ['Repos', '71'],
              ['Unique Contribs', '316'],
              ['Merged PRs', '2,666'],
              ['Total Grants', '$592,529'],
            ].map(([name, value]) => (
              <div
                key={name}
                className="mx-auto flex max-w-xs flex-col gap-y-2"
              >
                <dt className="text-base leading-7 text-slate-600">{name}</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-slate-400">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  )
}
