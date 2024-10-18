import { pedersen_from_hex } from 'pedersen-fast'

const salt = process.env.REACT_APP_SALT
export default function handler(req, res) {
  const { nameHex, emailHex } = req.body

  if (!nameHex || !emailHex) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const saltHex = `0x${BigInt(salt).toString(16)}`
    const hash = pedersen_from_hex(
      nameHex,
      pedersen_from_hex(emailHex, saltHex),
    )
    return res.status(200).json({ hash })
  } catch (error) {
    return res.status(500).json({ error: 'Hashing failed' })
  }
}
