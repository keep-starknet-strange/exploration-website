import { BackgroundImage } from '@/components/BackgroundImage'
import { Container } from '@/components/Container'

const missions = [
  {
    title: 'Dogfooding',
    description:
      'Hands-on use of the various products across Starknet, Cairo, and tooling to identify painpoints.',
    imageUrl: '/images/dogfooding.png',
  },
  {
    title: 'Best Practices',
    description:
      'We set out to bootstrap projects that enforce or create best development practices.',
    imageUrl: '/images/bestPractices.png',
  },
  {
    title: 'Ecosystem Quality',
    description:
      'Ensure code quality and create projects that can be used as reference implementations.',
    imageUrl: '/images/ecosystemQuality.png',
  },
]

export function Mission() {
  return (
    <section id="mission" aria-label="Mission">
      <div className="relative mt-4 sm:mt-24">
        {/* <BackgroundImage position="right" className="-bottom-32 -top-40" /> */}
        <Container className="relative">
          <div className="my-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text pb-2 text-4xl font-bold tracking-tighter text-transparent">
            <span className="text-slate-50">Core</span> Mission
          </div>
          <div className="grid grid-cols-1 gap-14 sm:grid-cols-3">
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
                <div className="bg-slate-700 p-12">
                  <h2 className="text-2xl font-bold tracking-tighter text-violet-600">
                    {mission.title}
                  </h2>
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
