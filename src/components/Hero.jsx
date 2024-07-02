import { Container } from '@/components/Container'
import { HeroBackground } from '@/components/HeroBackground'
import { getOnlyDustData } from '@/lib/exploration'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export function Hero() {
  const onlyDustData = getOnlyDustData()

  return (
    <div className="sm:pt-26 relative py-20 sm:pb-16">
      <div className="absolute inset-x-[-50vw] -bottom-4 -top-32 opacity-35 lg:-bottom-3 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
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
          <div className="flex mt-10 ml-4">
            <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-slate-300/10 hover:ring-slate-100/20">
              <span className="font-semibold text-violet-600">
                Contribute today
              </span>
              <Link
                href="https://app.onlydust.com/ecosystems/starknet"
                className="flex items-center gap-x-1"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                <ChevronRightIcon
                  className="-mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-10 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {onlyDustData.map(([name, value]) => (
              <div
                key={name}
                className="mx-auto flex max-w-xs flex-col gap-y-2"
              >
                <dt className="text-base leading-7 text-slate-600">{name}</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-slate-300">
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
