import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import {
  ArrowRightEndOnRectangleIcon,
  ChevronDownIcon,
} from '@heroicons/react/20/solid'
import { HeartIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

const options = [
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  { name: 'Kudos', href: '/kudos', icon: HeartIcon },
]

export function ProfileMenu({ data }) {
  return (
    <Popover className="relative" transition>
      <PopoverButton className="inline-flex outline-none items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <Image
          className="inline-block h-6 w-6 rounded-full"
          src={data.image}
          alt="profile-icon"
        />
        {console.log('IMAGE URL: ', data.image)}
        <ChevronDownIcon
          className="h-4 w-4 text-slate-300"
          aria-hidden="true"
        />
      </PopoverButton>
      <PopoverPanel
        transition
        className="absolute left-0 z-10 mt-2 flex w-scree -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-48 max-w-sm flex-auto overflow-hidden rounded-3xl bg-slate-200 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          {options.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative flex gap-x-4 rounded-lg p-3 hover:bg-gray-50"
            >
              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-300">
                <item.icon
                  className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  aria-hidden="true"
                />
              </div>
              <div href={item.href} className="text-gray-900 pt-3">
                {item.name}
              </div>
            </Link>
          ))}
          <div className="bg-slate-400">
            <div
              className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-slate-300"
              onClick={() => signOut()}
            >
              <ArrowRightEndOnRectangleIcon
                className="h-5 w-5 flex-none text-slate-700"
                aria-hidden="true"
              />
              logout
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
