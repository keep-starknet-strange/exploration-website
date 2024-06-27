import { BackgroundImage } from '@/components/BackgroundImage'
import { Container } from '@/components/Container'

const missions = [
  {
    id: 1,
    title: 'Dogfooding',
    description:
      'Hands-on use of the various products across Starknet, Cairo, and tooling to identify painpoints.',
    imageUrl: '/images/dogfooding.png',
  },
  {
    id: 2,
    title: 'Best Practices',
    description:
      'We set out to bootstrap projects that enforce or create best development practices.',
    imageUrl: '/images/bestPractices.png',
  },
  {
    id: 3,
    title: 'Ecosystem Quality',
    description:
      'Ensure code quality and create projects that can be used as reference implementations.',
    imageUrl: '/images/ecosystemQuality.png',
  },
]

export function Team() {
  return (
    <section id="team" aria-label="Team">
      <div className="relative mt-4 sm:mt-24">
        {/* <BackgroundImage position="right" className="-bottom-32 -top-40" /> */}
        <Container className="relative">

          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text pb-2 font-bold tracking-tighter text-transparent text-5xl my-4">
            <span className="text-slate-50">Meet the</span> Team
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {missions.map((mission, missionIndex) => (
              <div
                key={missionIndex}
                className="group relative overflow-hidden rounded-lg border border-slate-700 hover:drop-shadow-glow"
              >
                <img
                  className="h-54 w-full object-cover"
                  src={mission.imageUrl}
                  alt={mission.title}
                />
                <div className="p-12 bg-slate-700">
                  <h2 className="text-2xl text-violet-600 font-bold tracking-tighter">{mission.title}</h2>
                  <p className="mt-6 text-slate-50">{mission.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
