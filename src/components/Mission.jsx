import { Container } from '@/components/Container'
import { getMission } from '@/lib/exploration'
import Image from 'next/image'

export function Mission() {
  const missions = getMission()

  return (
    <section id="mission" aria-label="Mission">
      <Container className="relative mt-10">
        <div className="col-end-auto grid grid-cols-1 gap-14 sm:grid-cols-3">
          {missions.map((mission, missionIndex) => (
            <div
              key={missionIndex}
              className="group relative overflow-hidden rounded-lg border border-slate-700 hover:drop-shadow-glow"
            >
              <Image
                src={mission.imageUrl}
                alt={mission.title}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                width={500}
                height={500}
              />
              <div className="mt-4 bg-slate-700 p-12">
                <div className="text-2xl font-bold tracking-tighter text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text">
                  {mission.title}
                </div>
                <div className="mt-6 text-base font-extralight text-slate-300">
                  {mission.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
