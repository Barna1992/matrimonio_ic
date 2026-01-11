# 🎉 Benvenuti! - Getting Started

## Prima di iniziare

Questo sito web per il vostro matrimonio è **quasi pronto**! Seguite questi semplici passi per personalizzarlo e pubblicarlo.

---

## 📋 Passi da Completare (in ordine)

### 1️⃣ Personalizza i Contenuti (OBBLIGATORIO)

#### IBAN (Sezione "Per Noi")
📄 File: `src/components/GiftIBAN.jsx`

```javascript
// Linea 10-11
const ibanNumber = 'IT00 X000 0000 0000 0000 0000 000'  // ← Sostituisci con IBAN reale
const accountHolder = 'Ilaria Cognome & Cristian Cognome'  // ← Nomi completi
```

📖 Guida completa: `IBAN_CUSTOMIZATION.md`

---

#### Numeri di Telefono (Sezione "Contatti")
📄 File: `src/components/Contacts.jsx`

```javascript
// Linea 8-19
const contacts = {
  ilaria: {
    name: 'Ilaria',
    phone: '+39 123 456 7890',     // ← Numero con spazi (visibile)
    phoneRaw: '+39123456789',      // ← Numero senza spazi (per link tel:)
  },
  cristian: {
    name: 'Cristian',
    phone: '+39 098 765 4321',     // ← Numero con spazi
    phoneRaw: '+390987654321',     // ← Numero senza spazi
  },
}
```

📖 Guida completa: `CONTACTS_CUSTOMIZATION.md`

---

#### URL del Sito (Meta Tags SEO)
📄 File: `index.html`

```html
<!-- Linea 17, 24 - Sostituisci con il TUO URL reale -->
<meta property="og:url" content="https://ilaria-cristian.com/" />
<meta property="twitter:url" content="https://ilaria-cristian.com/" />
```

⚠️ **Importante**: Aggiorna DOPO aver deployato il sito e ottenuto l'URL definitivo.

---

### 2️⃣ Aggiungi Open Graph Image (CONSIGLIATO)

Crea un'immagine 1200x630px con:
- Foto di coppia
- Nomi degli sposi
- Data del matrimonio: "24 Ottobre 2025"

Salvala come: `public/og-image.jpg`

**Strumenti consigliati:**
- Canva: https://canva.com (template "Facebook Post")
- Photopea: https://photopea.com (alternativa gratuita a Photoshop)

Questa immagine apparirà quando condividi il link su WhatsApp, Facebook, Instagram, ecc.

---

### 3️⃣ Setup Form RSVP (OPZIONALE ma consigliato)

Il form è funzionante ma **non salva i dati**. Scegli una soluzione:

**Opzione A - Firebase (Gratuito, consigliato)**
- Database cloud gratis
- Setup in 15 minuti
- 📖 Guida completa: `RSVP_BACKEND_SETUP.md`

**Opzione B - Supabase (Gratuito)**
- Alternative a Firebase
- Database PostgreSQL
- 📖 Guida: `RSVP_BACKEND_SETUP.md`

**Opzione C - EmailJS (Solo email)**
- Ricevi RSVP via email
- Nessun database
- 📖 Guida: `RSVP_BACKEND_SETUP.md`

**Opzione D - Lascia così**
- Form funziona ma solo come "demo"
- Dati vanno in console (F12)
- ⚠️ Non salvati permanentemente

---

### 4️⃣ Test Locale

Prima di pubblicare, testa tutto:

```bash
# 1. Avvia server di sviluppo
npm run dev

# 2. Apri http://localhost:5173 nel browser

# 3. Testa:
✓ Menu hamburger apre/chiude
✓ Scroll tra sezioni fluido
✓ Countdown aggiorna ogni secondo
✓ Form RSVP valida campi
✓ Bottone "Copia IBAN" funziona
✓ Link telefono aprono app telefono
✓ Link Google Maps aprono mappe
✓ Su mobile: tutto leggibile e funzionante
```

---

### 5️⃣ Build e Deploy

#### Crea Build Produzione

```bash
npm run build
```

Questo crea la cartella `dist/` con i file ottimizzati.

#### Deploy su Netlify (GRATUITO - Consigliato)

1. Vai su https://netlify.com
2. Clicca "Add new site" → "Deploy manually"
3. Trascina la cartella `dist/`
4. ✨ Il tuo sito è online!
5. Ottieni URL tipo: `ilaria-cristian.netlify.app`

**Dominio personalizzato (opzionale):**
- Settings → Domain management → Add custom domain
- Es: `ilaria-cristian.com`

📖 Altre opzioni deploy: vedi `README.md`

---

## 🎨 Personalizzazioni Opzionali

### Cambia Colori
📄 File: `tailwind.config.js`

```javascript
colors: {
  gold: {
    DEFAULT: '#D4AF37',  // Colore principale
    light: '#E5C158',    // Variante chiara
    dark: '#B8941F',     // Variante scura
  },
}
```

### Aggiungi Storia degli Sposi
📄 File: `src/App.jsx` - linee 17-30

Sostituisci il placeholder con la vostra storia!

### Aggiungi Galleria Foto
📄 File: `src/App.jsx` - linee 44-57

Aggiungi componente Gallery con le vostre foto.

---

## 📱 Checklist Finale Pre-Pubblicazione

Prima di condividere il link:

**Contenuti:**
- [ ] IBAN aggiornato (file GiftIBAN.jsx)
- [ ] Numeri telefono aggiornati (file Contacts.jsx)
- [ ] URL aggiornato nei meta tags (file index.html)
- [ ] Open Graph image aggiunta (public/og-image.jpg)

**Funzionalità:**
- [ ] Countdown mostra data corretta (24/10/2025)
- [ ] Form RSVP backend configurato (o rimosso se non usato)
- [ ] Link Google Maps funzionanti
- [ ] Link telefono funzionanti su mobile
- [ ] Bottone "Copia IBAN" funziona

**Test:**
- [ ] Testato su smartphone reale
- [ ] Testato su computer
- [ ] Testato su tablet (opzionale)
- [ ] Nessun errore in console (F12)

**SEO & Performance:**
- [ ] Titolo pagina appropriato
- [ ] Meta description compilata
- [ ] Favicon visibile nel tab browser
- [ ] Test Lighthouse score > 80 (tutte metriche)

---

## 🆘 Aiuto Rapido

### Il countdown non parte
→ Verifica data in `src/components/Hero.jsx` linea 18

### Font non caricano
→ Controlla connessione internet. Font vengono da Google.

### Build fallisce
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### IBAN non si copia
→ Funziona solo su HTTPS (dopo deploy)

### Form RSVP non salva
→ Normale! Configura backend seguendo `RSVP_BACKEND_SETUP.md`

---

## 📚 Documentazione Completa

- **README.md** - Panoramica progetto e comandi
- **OPTIMIZATION_GUIDE.md** - Performance e testing avanzato
- **RSVP_BACKEND_SETUP.md** - Setup database per RSVP
- **IBAN_CUSTOMIZATION.md** - Dettagli sezione IBAN
- **CONTACTS_CUSTOMIZATION.md** - Dettagli sezione contatti

---

## 🎊 Congratulazioni!

Il vostro sito è quasi pronto! Seguite i passi sopra e avrete un sito professionale e bellissimo per il vostro matrimonio.

**Domande?** Cercate nella documentazione o contattate un developer.

**Buon matrimonio! 💍✨**

---

_Ultimo aggiornamento: Gennaio 2026_
