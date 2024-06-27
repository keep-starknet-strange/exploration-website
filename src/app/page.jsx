import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { Mission } from '@/components/Mission'
import { Team } from '@/components/Team'
import { FirstIssues } from '@/components/FirstIssues'

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      {/* <Projects />
      <FirstIssues /> */}
      <Team />
    </>
  )
}
