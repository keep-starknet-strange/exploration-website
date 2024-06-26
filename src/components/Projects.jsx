'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import { Container } from '@/components/Container'
import { DiamondIcon } from '@/components/DiamondIcon'
import { ProjectCard } from '@/components/ProjectCard'
import { getProjectsByCategory, getProjectCategories } from '@/lib/projects'

export function Projects() {
  const projectData = getProjectsByCategory()
  const categoryLabels = getProjectCategories()

  return (
    <section id="projects" aria-labelledby="projects-title">
      <Container>
        <TabGroup className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-4">
          <div className="relative -mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:block sm:overflow-visible sm:pb-0">
            <div className="absolute bottom-0 left-0.5 top-2 hidden w-px bg-slate-200 lg:block" />
            <TabList className="grid auto-cols-auto grid-flow-col justify-start gap-x-8 gap-y-10 whitespace-nowrap px-4 sm:mx-auto sm:max-w-2xl sm:grid-cols-3 sm:px-0 sm:text-center lg:grid-flow-row lg:grid-cols-1 lg:text-left">
              {({ selectedIndex }) => (
                <>
                  {categoryLabels.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="relative lg:pl-8">
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
                              ? 'text-slate-300'
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
                className="grid grid-cols-1 gap-x-8 gap-y-10 ui-not-focus-visible:outline-none sm:grid-cols-2 sm:gap-y-16 md:grid-cols-3"
                unmount={false}
              >
                {projectData[category].map((project, projectIndex) => (
                  <ProjectCard project={project} projectIndex={projectIndex} />
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </Container>
    </section>
  )
}
