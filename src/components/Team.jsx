const members = [
  {
    name: 'Abdel',
    ghHandle: 'AbdelStark',
    twitterHandle: 'AbdelStark',
    tgHandle: 'AbdelStark',
    imageUrl: 'https://avatars.githubusercontent.com/u/45264458?v=4',
  },
  {
    name: 'Lucas',
    ghHandle: 'LucasLvy',
    twitterHandle: 'LucasLvy',
    tgHandle: 'LucasLvy',
    imageUrl: 'https://avatars.githubusercontent.com/u/70894690?v=4',
  },
  {
    name: 'Ben',
    ghHandle: 'drspacemn',
    twitterHandle: 'drspacemn',
    tgHandle: 'drspacemn',
    imageUrl: 'https://avatars.githubusercontent.com/u/16685321?v=4',
  },
  {
    name: 'Brandon',
    ghHandle: 'b-j-roberts',
    twitterHandle: 'b-j-roberts',
    tgHandle: 'b-j-roberts',
    imageUrl: 'https://avatars.githubusercontent.com/u/54774639?v=4',
  },
  {
    name: 'Chqrles',
    ghHandle: '0xChqrles',
    twitterHandle: '0xChqrles',
    tgHandle: '0xChqrles',
    imageUrl: 'https://avatars.githubusercontent.com/u/19663399?v=4',
  },
  {
    name: 'Lana',
    ghHandle: 'lana-shanghai',
    twitterHandle: 'lana-shanghai',
    tgHandle: 'lana-shanghai',
    imageUrl: 'https://avatars.githubusercontent.com/u/31368580?v=4',
  },
  {
    name: 'Maciej',
    ghHandle: 'maciejka',
    twitterHandle: 'maciejka',
    tgHandle: 'maciejka',
    imageUrl: 'https://avatars.githubusercontent.com/u/190855?v=4',
  },
]

function GitHubIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  )
}

function TelegramIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...props}>
      <path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z" />
    </svg>
  )
}

function TwitterIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...props}>
      <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z" />
    </svg>
  )
}

export function Team() {
  return (
    <section id="team" aria-label="Team">
      <div className="relative mt-10 sm:mt-24">
        <div className="mx-auto my-4 max-w-6xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text px-4 pb-2 text-4xl font-bold tracking-tighter text-transparent sm:px-8 lg:px-12">
          <span className="text-slate-50">Meet the</span> Team
        </div>
        <div className="relative mx-auto max-w-5xl p-10 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member, memberIndex) => (
              <div
                key={memberIndex}
                className="group relative overflow-hidden rounded-lg border border-slate-700"
              >
                <img
                  className="h-44 w-full object-cover"
                  src={member.imageUrl}
                  alt={member.name}
                />
                <div className="flex flex-row justify-between bg-slate-700 p-4">
                  <div className="text-large align text-slate-400">
                    {member.name}
                  </div>
                  <div className="flex flex-row gap-x-2">
                    <GitHubIcon className="h-5 w-5 fill-slate-400 hover:drop-shadow-glow" />
                    <TwitterIcon className="h-5 w-5 fill-slate-400 hover:drop-shadow-glow" />
                    <TelegramIcon className="h-5 w-5 fill-slate-400 hover:drop-shadow-glow" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
