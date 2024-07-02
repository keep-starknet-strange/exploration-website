import { Container } from '@/components/Container'
import { UserCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="relative z-50 flex-none lg:pt-11">
      <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
          <Link href="/">
            <Image
              className="h-12 w-auto text-slate-900"
              src="/images/logos/swExplorationLogo.png"
              width={533}
              height={97}
              alt="Exploration Team"
            />
          </Link>
        </div>
        <div className="flex flex-row justify-end divide-x-2 divide-slate-700 pt-10 md:flex-grow md:pt-0">
          <div className="mr-4 flex flex-row gap-6">
            <Link href="/projects">
              <div className="text-md font-light tracking-tight text-slate-300 hover:text-slate-500">
                Projects
              </div>
            </Link>
            <Link href="issues">
              <div className="text-md font-light tracking-tight text-slate-300 hover:text-slate-500">
                Issues
              </div>
            </Link>
          </div>
          <div className="group flex flex-row gap-6 pl-4">
            <UserCircleIcon className="h-7 w-7 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
          </div>
        </div>
      </Container>
    </header>
  )
}
