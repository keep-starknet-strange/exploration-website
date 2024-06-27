import { BackgroundImage } from '@/components/BackgroundImage'
import { Container } from '@/components/Container'
import { getMission } from '@/lib/exploration'
import Image from 'next/image'

export function Mission() {
  const missions = getMission()

  return (
    <section id="mission" aria-label="Mission">
      <div className="relative mt-14">
        {/* <BackgroundImage position="right" className="-bottom-32 -top-40" /> */}
        <Container className="relative">
          <div className="my-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text pb-2 text-4xl font-semibold tracking-tighter text-transparent">
            <span className="text-slate-50">Core</span> Mission
          </div>

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
                  <div className="text-2xl font-bold tracking-tighter text-violet-600">
                    <span className="text-slate-50">{missionIndex + 1}.</span>
                    &nbsp;&nbsp;{mission.title}
                  </div>
                  <div className="mt-6 text-base font-extralight text-slate-300">
                    {mission.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
