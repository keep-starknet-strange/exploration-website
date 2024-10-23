import axios from 'axios'
import { useEffect, useState } from 'react'
import { shortString } from 'starknet'

export function useCredentialHash(email) {
  const [credentialsHash, setCredentialsHash] = useState('')

  useEffect(() => {
    const fetchCredentialHash = async () => {
      if (email) {
        const emailHex = shortString.encodeShortString(email)

        try {
          const response = await axios.post('/api/pedersen-hash', {
            emailHex,
          })
          setCredentialsHash(response.data.hash)
        } catch (error) {
          console.error('Error fetching credential hash:', error)
        }
      }
    }
    fetchCredentialHash()
  }, [email])
  return credentialsHash
}
