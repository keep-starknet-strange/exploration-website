const requestOpts = {
  method: 'GET',
  cache: 'force-cache',
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: 'Bearer ' + process.env.GH_API_TOKEN,
    'X-GitHub-Api-Version': '2022-11-28',
  },
}

export async function getRepositories() {
  const res = await fetch(
    'https://api.github.com/orgs/keep-starknet-strange/repos?type=sources',
    requestOpts,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function getRepositoryIssues(repo) {
  const res = await fetch(
    `https://api.github.com/repos/keep-starknet-strange/${repo}/issues?labels=good first issue&assignee=none`,
    requestOpts,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function getGoodFirstIssues() {
  const repos = await getRepositories()

  let issues = []
  for (let i = 0; i < repos.length; i++) {
    const resp = await getRepositoryIssues(repos[i].name)
    issues.push(...resp)
  }
  return issues.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}
