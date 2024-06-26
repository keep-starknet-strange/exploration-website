import Image from 'next/image'
import { Container } from '@/components/Container'

export function Hero() {
  return (
    <div className="sm:pt-26 relative py-20 sm:pb-16">
      {/* <BackgroundImage className="-bottom-14 -top-36" /> */}
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <Image
            className="absolute inset-0 opacity-50"
            src="/images/blur-cyan.png"
            alt=""
            width={530}
            height={530}
            unoptimized
            priority
          />
          <h1 className="font-display text-5xl font-bold tracking-tighter text-white sm:text-7xl">
            Build.
          </h1>
          <h1 className="font-display text-5xl font-bold tracking-tighter text-white sm:text-7xl">
            Together.
          </h1>
          <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              ['Repositories', '71'],
              ['Unique Contributors', '316'],
              ['Merged PRs', '2,666'],
              ['Grants Distributed', '$592,529'],
            ].map(([name, value]) => (
              <div key={name}>
                <dt className="font-mono text-sm text-slate-600">{name}</dt>
                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-slate-400">
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
