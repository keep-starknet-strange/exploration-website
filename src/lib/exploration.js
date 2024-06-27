import mission from '@/lib/data/mission.json'
import onlyDust from '@/lib/data/onlyDust.json'
import projects from '@/lib/data/projects.json'
import resources from '@/lib/data/resources.json'
import team from '@/lib/data/team.json'

export function getProjectCategories() {
  return ['All', ...new Set(projects.map((project) => project.category))]
}

export function getProjectsByCategory() {
  const categoryLabels = getProjectCategories()

  return categoryLabels.reduce((accum, curr) => {
    accum[curr] = projects.filter((project) => project.category == curr)
    return accum
  }, {})
}

export function getAllProjects() {
  return projects.sort((a, b) => b.contribs - a.contribs)
}

export function getAllTeam() {
  return team
}

export function getMission() {
  return mission
}

export function getResources() {
  return resources
}

export function getOnlyDustData() {
  return onlyDust
}
