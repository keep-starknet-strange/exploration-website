'use client'

import { StarknetProvider } from '@/components/StarknetProvider'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()

  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/')
    },
  })
  //   return <StarknetProvider>{status === 'authenticated' && <Profile data={data.user} />}</StarknetProvider>
  return <>dis</>
}
