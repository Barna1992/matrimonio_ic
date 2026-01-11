# Setup Backend per RSVP Form

Il form RSVP è attualmente configurato per fare il log dei dati nella console. Segui una di queste opzioni per salvare i dati degli ospiti.

## Opzione 1: Firebase (Consigliato)

### Setup Firebase

1. **Installa Firebase:**
```bash
npm install firebase
```

2. **Crea un progetto Firebase:**
   - Vai su https://console.firebase.google.com/
   - Crea un nuovo progetto
   - Abilita Firestore Database

3. **Configura Firebase nell'app:**

Crea il file `src/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
```

4. **Modifica il componente RSVP:**

Nel file `src/components/RSVP.jsx`, sostituisci la funzione `handleSubmit`:

```javascript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  setIsSubmitting(true)
  setSubmitStatus(null)

  try {
    // Salva su Firebase
    await addDoc(collection(db, 'rsvp'), {
      ...formData,
      timestamp: serverTimestamp(),
    })

    setSubmitStatus('success')
    setFormData({
      fullName: '',
      email: '',
      numberOfGuests: '1',
      attendance: '',
      dietaryRestrictions: '',
      allergies: '',
      additionalNotes: '',
    })

    setTimeout(() => {
      setSubmitStatus(null)
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
    setSubmitStatus('error')
  } finally {
    setIsSubmitting(false)
  }
}
```

## Opzione 2: Supabase

### Setup Supabase

1. **Installa Supabase:**
```bash
npm install @supabase/supabase-js
```

2. **Crea un progetto Supabase:**
   - Vai su https://supabase.com/
   - Crea un nuovo progetto
   - Crea una tabella `rsvp` con le seguenti colonne:
     - id (uuid, primary key)
     - full_name (text)
     - email (text)
     - number_of_guests (text)
     - attendance (text)
     - dietary_restrictions (text)
     - allergies (text)
     - additional_notes (text)
     - created_at (timestamp)

3. **Configura Supabase:**

Crea il file `src/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)
```

4. **Modifica il componente RSVP:**

```javascript
import { supabase } from '../supabase'

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  setIsSubmitting(true)
  setSubmitStatus(null)

  try {
    const { error } = await supabase.from('rsvp').insert([
      {
        full_name: formData.fullName,
        email: formData.email,
        number_of_guests: formData.numberOfGuests,
        attendance: formData.attendance,
        dietary_restrictions: formData.dietaryRestrictions,
        allergies: formData.allergies,
        additional_notes: formData.additionalNotes,
      },
    ])

    if (error) throw error

    setSubmitStatus('success')
    setFormData({
      fullName: '',
      email: '',
      numberOfGuests: '1',
      attendance: '',
      dietaryRestrictions: '',
      allergies: '',
      additionalNotes: '',
    })

    setTimeout(() => {
      setSubmitStatus(null)
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
    setSubmitStatus('error')
  } finally {
    setIsSubmitting(false)
  }
}
```

## Opzione 3: API Endpoint Personalizzato

Se hai già un backend, modifica la funzione `handleSubmit`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  setIsSubmitting(true)
  setSubmitStatus(null)

  try {
    const response = await fetch('https://your-api.com/api/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    setSubmitStatus('success')
    setFormData({
      fullName: '',
      email: '',
      numberOfGuests: '1',
      attendance: '',
      dietaryRestrictions: '',
      allergies: '',
      additionalNotes: '',
    })

    setTimeout(() => {
      setSubmitStatus(null)
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
    setSubmitStatus('error')
  } finally {
    setIsSubmitting(false)
  }
}
```

## Opzione 4: EmailJS (Solo notifiche email)

Per ricevere le conferme via email senza database:

1. **Installa EmailJS:**
```bash
npm install @emailjs/browser
```

2. **Configura EmailJS:**
   - Vai su https://www.emailjs.com/
   - Crea un account e configura il servizio email

3. **Usa EmailJS nel form:**

```javascript
import emailjs from '@emailjs/browser'

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  setIsSubmitting(true)
  setSubmitStatus(null)

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: formData.fullName,
        from_email: formData.email,
        number_of_guests: formData.numberOfGuests,
        attendance: formData.attendance,
        dietary_restrictions: formData.dietaryRestrictions,
        allergies: formData.allergies,
        additional_notes: formData.additionalNotes,
      },
      'YOUR_PUBLIC_KEY'
    )

    setSubmitStatus('success')
    setFormData({
      fullName: '',
      email: '',
      numberOfGuests: '1',
      attendance: '',
      dietaryRestrictions: '',
      allergies: '',
      additionalNotes: '',
    })

    setTimeout(() => {
      setSubmitStatus(null)
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
    setSubmitStatus('error')
  } finally {
    setIsSubmitting(false)
  }
}
```

## Variabili d'Ambiente

Per maggiore sicurezza, usa le variabili d'ambiente per le chiavi API.

Crea un file `.env`:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
# ... altre chiavi
```

Poi usale nel codice:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ...
}
```

**IMPORTANTE:** Aggiungi `.env` al file `.gitignore` per non committare le chiavi!
