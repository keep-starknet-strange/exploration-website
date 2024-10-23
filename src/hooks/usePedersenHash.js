import axios from 'axios'
import { useEffect, useState } from 'react'
import { shortString } from 'starknet'

export function usePedersenHash(value) {
  const [credentialsHash, setCredentialsHash] = useState('')

  useEffect(() => {
    const fetchPedersenHash = async () => {
      if (value) {
        const valueAsHex = shortString.encodeShortString(value)
        try {
          const response = await axios.post('/api/pedersen-hash', {
            valueAsHex,
          })
          setCredentialsHash(response.data.hash)
        } catch (error) {
          console.error('Error fetching credential hash:', error)
        }
      }
    }
    fetchPedersenHash()
  }, [value])
  return credentialsHash
}
