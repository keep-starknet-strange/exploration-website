'use client'

import { Container } from '@/components/Container'
import { HeroBackground } from '@/components/HeroBackground'
import { ProjectCard } from '@/components/ProjectCard'
import {
  getAllProjects,
  getProjectCategories,
  getProjectsByCategory,
} from '@/lib/exploration'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

function DiamondIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 6 6" {...props}>
      <path d="M3 0L6 3L3 6L0 3Z" strokeWidth={2} strokeLinejoin="round" />
    </svg>
  )
}

export function Projects() {
  const projectData = getProjectsByCategory()
  const categoryLabels = getProjectCategories()
  const allProjects = getAllProjects()

  return (
    <section id="projects" aria-labelledby="projects-title">
      <div className="absolute inset-x-[-50vw] -bottom-4 -top-32 opacity-10 lg:-bottom-3 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
        <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
      </div>
      <Container>
        <TabGroup className="mt-16 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:gap-y-16 lg:mt-40 lg:grid-cols-4">
          <div className="relative ml-6 flex overflow-x-auto pb-4 sm:block sm:overflow-visible sm:pb-0">
            <div className="absolute bottom-6 left-0.5 top-2 hidden w-px bg-slate-500 lg:block" />
            <TabList className="grid auto-cols-auto grid-flow-col justify-start gap-x-8 gap-y-10 whitespace-nowrap px-4 sm:mx-auto sm:max-w-2xl sm:grid-cols-3 sm:px-0 sm:text-center lg:grid-flow-row lg:grid-cols-1 lg:text-left">
              {({ selectedIndex }) => (
                <>
                  {categoryLabels.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="relative pb-4 lg:pl-8">
                      <DiamondIcon
                        className={clsx(
                          'absolute left-[-0.5px] top-[0.5625rem] hidden h-1.5 w-1.5 overflow-visible lg:block',
                          categoryIndex === selectedIndex
                            ? 'fill-slate-100 stroke-slate-600'
                            : 'stroke-slate-400',
                        )}
                      />
                      <div className="relative">
                        <div
                          className={clsx(
                            'font-mono text-sm',
                            categoryIndex === selectedIndex
                              ? 'text-slate-200'
                              : 'stroke-slate-100 text-slate-600',
                          )}
                        >
                          <Tab className="ui-not-focus-visible:outline-none">
                            <span className="absolute inset-0" />
                            {category}
                          </Tab>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </TabList>
          </div>
          <TabPanels className="lg:col-span-3">
            {categoryLabels.map((category, categoryIndex) => (
              <TabPanel
                key={categoryIndex}
                className="grid grid-cols-1 gap-x-8 gap-y-8 ui-not-focus-visible:outline-none sm:grid-cols-2 sm:gap-y-14 md:grid-cols-3"
                unmount={false}
              >
                {categoryIndex == 0
                  ? allProjects.map((project, projectIndex) => (
                      <div key={projectIndex}>
                        <ProjectCard project={project} />
                      </div>
                    ))
                  : projectData[category].map((project, projectIndex) => (
                      <div key={projectIndex}>
                        <ProjectCard project={project} />
                      </div>
                    ))}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </Container>
    </section>
  )
}
