import { pedersen_from_hex } from 'pedersen-fast'

const salt = process.env.REACT_APP_SALT
export default function handler(req, res) {
  const { valueAsHex } = req.body

  const isValidHex = (value) => {
    return typeof value === 'string' && /^0x[0-9a-fA-F]+$/.test(value)
  }
 
  if (!valueAsHex || !isValidHex(valueAsHex)) {
  }

  if (!valueAsHex || !isValidHex(valueAsHex)) {
    return res.status(400).json({ error: 'Invalid or missing hex value' })
  }
  try {
    const saltHex = `0x${BigInt(salt).toString(16)}`
    const hash = pedersen_from_hex(valueAsHex, saltHex)
    return res.status(200).json({ hash })
  } catch (error) {
    return res.status(500).json({ error: 'Hashing failed' })
  }
}
