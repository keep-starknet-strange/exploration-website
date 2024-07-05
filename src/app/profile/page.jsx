'use client'

import { Profile } from '@/components/Profile'
import { StarknetProvider } from '@/components/StarknetProvider'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  })

  return (
    <StarknetProvider>
      {status === 'authenticated' && <Profile data={data.user} />}
    </StarknetProvider>
  )
}
