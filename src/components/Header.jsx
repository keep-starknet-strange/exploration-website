'use client'

import { Container } from '@/components/Container'
import { ProfileMenu } from '@/components/ProfileMenu'
import { UserCircleIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavItem({ href, children }) {
  let isActive = usePathname() === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-4 py-2 transition',
          isActive ? 'text-slate-200' : 'hover:text-slate-300 text-slate-500',
        )}
      >
        {children}
      </Link>
    </li>
  )
}

export function Header() {
  const { data, status } = useSession()

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
              priority
            />
          </Link>
        </div>
        <ul className="flex items-center gap-x-2 rounded-full divide-x divide-slate-700 bg-slate-800 bg-opacity-15 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
          <div className="flex flex-row">
            <NavItem href="/projects">Projects</NavItem>
            <NavItem href="/issues">Issues</NavItem>
          </div>
          <li className="group relative block py-2 pl-4 transition">
            {status === 'authenticated' ? (
              <ProfileMenu data={data.user} />
            ) : (
              <UserCircleIcon
                className="h-7 w-7 fill-slate-400 group-hover:fill-slate-500"
                onClick={() => signIn('google')}
              />
            )}
          </li>
        </ul>
      </Container>
    </header>
  )
}
