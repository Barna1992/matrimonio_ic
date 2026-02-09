import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { password } = req.body

  if (!password) {
    return res.status(400).json({ error: 'Password richiesta' })
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Password non valida' })
  }

  // Genera un token semplice basato su password + timestamp
  const token = crypto
    .createHmac('sha256', process.env.ADMIN_PASSWORD)
    .update('admin-session')
    .digest('hex')

  return res.status(200).json({ token })
}
