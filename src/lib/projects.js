export const projects = [
  {
    name: 'Kakarot',
    category: 'infrastructure',
    description: 'zkEVM written in Cairo',
    contribs: 68,
    totalPaidK: 100,
    imageUrl: '/images/logos/projects/kakarotLogoSm.png',
    url: 'https://github.com/kkrt-labs/kakarot',
  },
  {
    name: 'Beerus',
    category: 'infrastructure',
    description: 'Light Client for Starknet',
    contribs: 42,
    totalPaidK: 72,
    imageUrl: '/images/logos/projects/beerusLogo.png',
    url: 'https://github.com/eigerco/beerus',
  },
  {
    name: 'Vault',
    category: 'infrastructure',
    description: 'Empower Your Assets, Redefine Control',
    contribs: 9,
    totalPaidK: 100,
    imageUrl: '/images/logos/projects/vaultLogo.png',
    url: 'https://github.com/keep-starknet-strange/vault',
  },
  {
    name: 'Alexandria',
    category: 'tooling',
    description: 'Extended Cairo Standard Library',
    contribs: 1,
    totalPaidK: 100,
    imageUrl: '/images/logos/projects/alexandriaLogo.png',
    url: 'https://github.com/keep-starknet-strange/alexandria',
  },
  {
    name: 'Satoru',
    category: 'defi',
    description: 'Synthetics platform for Starknet, inspired by GMX v2',
    contribs: 1,
    totalPaidK: 100,
    imageUrl: '/images/logos/projects/satoruLogo.png',
    url: 'https://github.com/keep-starknet-strange/satoru',
  },
  {
    name: 'art/peace',
    category: 'fun',
    description: 'Competitive art canvas on Starknet',
    contribs: 1,
    totalPaidK: 100,
    imageUrl: '/images/logos/projects/artPeaceLogo.png',
    url: 'https://github.com/keep-starknet-strange/art-peace',
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
