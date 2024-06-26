import Image from 'next/image'

export function Logo(props) {
  return (
    <Image
      src="/images/logos/explorationLogo.png"
      width={533}
      height={97}
      alt="Exploration Team"
    />
  )
}
