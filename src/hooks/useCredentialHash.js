import { useEffect, useState } from 'react';
import { shortString } from 'starknet';
import axios from 'axios';

export function useCredentialHash(name, email) {
  const [credentialsHash, setCredentialsHash] = useState('');

  useEffect(() => {
    const fetchCredentialHash = async () => {
      if (name && email) {
        const nameHex = shortString.encodeShortString(name);
        const emailHex = shortString.encodeShortString(email);
        
        try {
          const response = await axios.post('/api/pedersen-hash', {
            nameHex,
            emailHex,
          });
          setCredentialsHash(response.data.hash);
        } catch (error) {
          console.error('Error fetching credential hash:', error);
        }
      }
    };

    fetchCredentialHash();
  }, [name, email]);
git 
  return credentialsHash;
}
