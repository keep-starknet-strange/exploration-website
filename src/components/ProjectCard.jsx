import Image from 'next/image'
import clsx from 'clsx'

export function ProjectCard({ projectIndex, project }) {
  return (
      <div key={projectIndex} className="group h-[17.5rem] transform overflow-hidden rounded-4xl border border-slate-500">
        <Image
          className="transition duration-300 group-hover:scale-110"
          src={project.imageUrl}
          alt={project.name}
          fill={true}
          priority
        />
        <div class="px-6 py-4">
          <div class="transition duration-300 group-hover:scale-95 text-slate-300 font-bold text-xl mb-2">{project.name}</div>
        </div>

        <div class="px-6 pt-4 pb-2">
        <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
        Badge
      </span>
      <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
        Badge
      </span>
      <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">
        Badge
      </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="p-4">{project.description}</p>
        </div>

      </div>
  )
}
