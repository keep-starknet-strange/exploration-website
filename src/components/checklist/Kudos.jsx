import { Container } from '@/components/Container'

const kudosTyped = {
  domain: {
    name: 'StarkWare Kudos',
    version: '1',
    chainId: 1,
  },
  types: {
    StarkNetDomain: [
      { name: 'name', type: 'felt' },
      { name: 'version', type: 'felt' },
      { name: 'chainId', type: 'felt' },
    ],
    Person: [
      { name: 'name', type: 'felt' },
      { name: 'wallet', type: 'felt' },
    ],
    Kudos: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'kudos', type: 'felt' },
    ],
  },
  primaryType: 'Kudos',
  message: {
    from: {
      name: '',
      wallet: '',
    },
    to: {
      name: '',
      wallet: '',
    },
    kudos: 0,
  },
}

export function Kudos() {
  return (
    <Container className="relative text-center mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
      <div className="text-slate-50 text-2xl font-semibold">Kudos</div>
    </Container>
  )
}
