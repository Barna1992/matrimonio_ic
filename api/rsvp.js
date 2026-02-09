import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
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

  const { fullName, email, numberOfGuests, attendance, dietaryRestrictions, additionalNotes } = req.body

  // Validazione server-side
  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ error: 'Il nome completo è obbligatorio' })
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email non valida' })
  }
  if (!attendance || !['yes', 'no'].includes(attendance)) {
    return res.status(400).json({ error: 'Conferma presenza non valida' })
  }
  if (!numberOfGuests) {
    return res.status(400).json({ error: 'Numero ospiti obbligatorio' })
  }

  const { error } = await supabase.from('rsvp').insert({
    full_name: fullName.trim(),
    email: email.trim(),
    number_of_guests: numberOfGuests,
    attendance,
    dietary_restrictions: dietaryRestrictions || '',
    additional_notes: additionalNotes || '',
  })

  if (error) {
    console.error('Supabase insert error:', error)
    return res.status(500).json({ error: 'Errore nel salvataggio' })
  }

  return res.status(200).json({ success: true })

  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Errore interno del server' })
  }
}
