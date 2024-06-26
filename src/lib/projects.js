export const projects = [
  {
    name: 'Kakarot',
    description: 'zkEVM written in Cairo',
    imageUrl: '/images/logos/projects/kakarotLogo.svg',
    category: 'infrastructure',
  },
  {
    name: 'Beerus',
    description: 'Light Client for Starknet',
    imageUrl: '/images/logos/projects/beerusLogo.png',
    category: 'infrastructure',
  },
  {
    name: 'Vault',
    description: 'Empower Your Assets, Redefine Control.',
    imageUrl: '/images/logos/projects/vaultLogo.png',
    category: 'infrastructure',
  },
  {
    name: 'Alexandria',
    description: 'Extended Cairo Standard Library',
    imageUrl: '/images/logos/projects/alexandriaLogo.png',
    category: 'tooling',
  },
  {
    name: 'Satoru',
    description: 'Synthetics platform for Starknet, inspired by GMX v2',
    imageUrl: '/images/logos/projects/satoruLogo.png',
    category: 'defi',
  },
  {
    name: 'Art/Peace',
    description: 'Competitive art canvas on Starknet',
    imageUrl: '/images/logos/projects/artPeaceLogo.png',
    category: 'fun',
  },
]

export function getProjectCategories() {
  return [...new Set(projects.map((project) => project.category))]
}

export function getProjectsByCategory() {
  const categoryLabels = getProjectCategories()

  return categoryLabels.reduce((accum, curr) => {
    accum[curr] = projects.filter((project) => project.category == curr)
    return accum
  }, {})
}
