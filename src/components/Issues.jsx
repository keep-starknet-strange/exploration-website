import { Container } from '@/components/Container'
import { HeroBackground } from '@/components/HeroBackground'
import { getGoodFirstIssues } from '@/lib/issues'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

const environments = {
  open: 'text-green-400 bg-green-400/10 ring-green-400/20',
  closed: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export async function Issues() {
  const issues = await getGoodFirstIssues()

  return (
    <section className="mt-24">
      <div className="absolute inset-x-[-50vw] -bottom-4 -top-32 opacity-15 lg:-bottom-3 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
        <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
      </div>
      <Container>
        <div className="mb-10 ml-10 inline-flex items-center rounded-full bg-purple-400/10 px-12 py-1 text-2xl font-light tracking-tighter text-purple-400 ring-1 ring-inset ring-purple-400/30">
          good first issues
        </div>
        <ul role="list" className="mx-20 divide-y divide-white/5">
          {issues.map((issue, issueIndex) => (
            <li
              key={issueIndex}
              className="relative flex items-center space-x-4 py-4 hover:shadow-xl"
            >
              <div className="min-w-0 flex-auto">
                <div className="flex items-center gap-x-3">
                  <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                    <div className="h-2 w-2 rounded-full bg-current" />
                  </div>
                  <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                    <a href={issue.html_url} className="flex gap-x-2">
                      <span className="truncate">
                        {issue.repository_url.split('/').splice(-1)}
                      </span>
                      <span className="text-gray-400">/</span>
                      <span className="whitespace-nowrap">
                        {issue.url.split('/').splice(-1)}
                      </span>
                      <span className="absolute inset-0" />
                    </a>
                  </h2>
                </div>
                <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                  <p className="truncate">{issue.title}</p>
                  <svg
                    viewBox="0 0 2 2"
                    className="h-0.5 w-0.5 flex-none fill-gray-300"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="whitespace-nowrap">
                    {new Date(issue.created_at).toLocaleDateString('en-US')}
                  </p>
                </div>
              </div>
              <div
                className={classNames(
                  environments[issue.state],
                  'flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
                )}
              >
                {issue.state}
              </div>
              <ChevronRightIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
