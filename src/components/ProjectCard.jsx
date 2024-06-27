import { LinkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'

export function ProjectCard({ project }) {
  return (
    <div className="group h-[17rem] transform overflow-hidden rounded-4xl border border-slate-700 text-center hover:drop-shadow-glow">
      <Image
        className="mx-auto mt-2 transition duration-300 group-hover:scale-110"
        src={project.imageUrl}
        alt={project.name}
        width={125}
        height={125}
        priority
      />
      <div className="px-6 py-3">
        <div className="text-l mb-2 font-light tracking-widest text-slate-300 transition duration-300 group-hover:scale-95">
          {project.name}
        </div>
      </div>

      <div className="px-6 pb-2 pt-2">
        <span className="mx-2 inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs text-gray-400 ring-1 ring-inset ring-gray-400/20">
          <strong>{project.contribs}</strong>&nbsp;Contribs
        </span>
        <span className="mx-2 inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs text-green-400 ring-1 ring-inset ring-green-500/20">
          <strong>${project.totalPaidK}K</strong>
        </span>
      </div>

      <Link href={project.url}>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 bg-opacity-95 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="p-4">{project.description}</div>
          <div>
            <LinkIcon className="h-5 w-5 text-white" />
          </div>
        </div>
      </Link>
    </div>
  )
}
