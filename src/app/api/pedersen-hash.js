import { pedersen_from_hex } from 'pedersen-fast'

export default function handler(req, res) {
  const { nameHex, emailHex, salt } = req.body;
  
  if (!nameHex || !emailHex || !salt) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hash = pedersen_from_hex(nameHex, pedersen_from_hex(emailHex, salt));
    return res.status(200).json({ hash });
  } catch (error) {
    return res.status(500).json({ error: 'Hashing failed' });
  }
}
