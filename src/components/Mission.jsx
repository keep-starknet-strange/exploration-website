'use client'

import { BackgroundImage } from '@/components/BackgroundImage'
import { Container } from '@/components/Container'
import { MissionCard } from '@/components/MissionCard'

const applications = [
  {
    id: 1,
    title: 'Application 1',
    description:
      'A brief description of Application 1. Highlight its features and functionality.',
    imageUrl: '/images/logos/projects/beerusLogo.png',
  },
  {
    id: 2,
    title: 'Application 2',
    description:
      'A brief description of Application 2. Highlight its features and functionality.',
    imageUrl: '/images/logos/projects/satoruLogo.png',
  },
  {
    id: 3,
    title: 'Application 3',
    description:
      'A brief description of Application 3. Highlight its features and functionality.',
    imageUrl: '/images/logos/projects/vaultLogo.png',
  },
]

export function Mission() {
  return (
    <section id="mission" aria-label="Mission" className="py-20 sm:py-32">
      <div className="relative mt-14 sm:mt-24">
        <BackgroundImage position="right" className="-bottom-32 -top-40" />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((app) => (
              <MissionCard key={app.id} app={app} />
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
