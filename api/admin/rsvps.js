import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.ADMIN_PASSWORD) {
      return res.status(500).json({ error: 'Configurazione server mancante' })
    }

    // Verifica token
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Non autorizzato' })
    }

    const token = authHeader.split(' ')[1]
    const expectedToken = crypto
      .createHmac('sha256', process.env.ADMIN_PASSWORD)
      .update('admin-session')
      .digest('hex')

    if (token !== expectedToken) {
      return res.status(401).json({ error: 'Token non valido' })
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data, error } = await supabase
      .from('rsvp')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase query error:', error)
      return res.status(500).json({ error: 'Errore nel recupero dati' })
    }

    return res.status(200).json({ rsvps: data })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Errore interno del server' })
  }
}
