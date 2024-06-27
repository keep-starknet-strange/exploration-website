import Image from 'next/image'
import Link from 'next/link'
import { LinkIcon } from '@heroicons/react/24/solid'

export function ProjectCard({ project }) {
  return (
    <div
      className="group h-[17.5rem] transform overflow-hidden rounded-4xl border border-slate-500 text-center transition-shadow"
      >
      <Image
        className="mx-auto transition duration-300 group-hover:scale-110"
        src={project.imageUrl}
        alt={project.name}
        width={150}
        height={150}
        priority
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold text-slate-300 transition duration-300 group-hover:scale-95">
          {project.name}
        </div>
      </div>

      <div className="px-6 pb-2 pt-4">
        <span className="inline-flex mx-2 items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
          <strong>{project.contribs}</strong>&nbsp;Contribs
        </span>
        <span className="inline-flex mx-2 items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
          <strong>${project.totalPaidK}K</strong>&nbsp;Paid
        </span>
      </div>

      <Link href={project.url}>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="p-4">{project.description}</div>
          <div>
            <LinkIcon className="h-5 w-5 text-white" />
          </div>
        </div>
      </Link>
    </div>
  )
}
