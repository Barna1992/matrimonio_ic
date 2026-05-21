import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // Se CRON_SECRET è impostata, accetta solo le chiamate cron di Vercel
  if (process.env.CRON_SECRET) {
    const authHeader = req.headers.authorization
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ error: 'Non autorizzato' })
    }
  }

  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing SUPABASE env vars')
      return res.status(500).json({ error: 'Configurazione server mancante' })
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Query leggera: basta a contare come attività e resettare il timer di pausa
    const { error } = await supabase.from('rsvp').select('id').limit(1)

    if (error) {
      console.error('Keep-alive query error:', error)
      return res.status(500).json({ error: 'Errore nella query' })
    }

    return res.status(200).json({ ok: true, ts: new Date().toISOString() })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Errore interno del server' })
  }
}
