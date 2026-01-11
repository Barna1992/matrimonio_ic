# 💍 Ilaria & Cristian - Wedding Website

Sito web elegante per il matrimonio del 24 Ottobre 2025.

## 🎨 Caratteristiche

- ✨ Design elegante con palette oro e bianco
- 📱 Completamente responsive (mobile-first)
- ⏱️ Countdown live al matrimonio
- 📍 Integrazione Google Maps per le location
- 📝 Form RSVP con validazione
- 💰 Box IBAN con copia facile
- 🎭 Animazioni smooth con Intersection Observer
- 🔍 SEO ottimizzato con meta tags
- ⚡ Performance elevate con Vite

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **Fonts**: Google Fonts (Cinzel, Great Vibes)
- **Icons**: React Icons
- **Smooth Scroll**: react-scroll
- **Date Utils**: date-fns

## 📂 Struttura Progetto

```
ilaria_cristian/
├── public/
│   ├── favicon.svg          # Favicon personalizzato
│   └── og-image.jpg         # (da aggiungere) Open Graph image
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Menu navigazione
│   │   ├── Hero.jsx         # Sezione hero con countdown
│   │   ├── CelebrationLocation.jsx  # Location matrimonio
│   │   ├── Timeline.jsx     # Timeline della giornata
│   │   ├── RSVP.jsx         # Form conferma presenza
│   │   ├── GiftIBAN.jsx     # Box IBAN regalo
│   │   ├── Contacts.jsx     # Contatti sposi
│   │   └── Footer.jsx       # Footer
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles + Tailwind
├── index.html               # HTML template
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies

Documentazione:
├── README.md                # Questo file
├── OPTIMIZATION_GUIDE.md    # Guida ottimizzazioni e testing
├── RSVP_BACKEND_SETUP.md    # Setup backend per RSVP
├── IBAN_CUSTOMIZATION.md    # Personalizzare sezione IBAN
└── CONTACTS_CUSTOMIZATION.md # Personalizzare contatti
```

## 🚀 Quick Start

### Prerequisiti

- Node.js 18+ installato
- npm o yarn

### Installazione

```bash
# Clona il repository (o scarica i file)
cd ilaria_cristian

# Installa dipendenze
npm install

# Avvia server di sviluppo
npm run dev
```

Il sito sarà disponibile su `http://localhost:5173`

### Build per produzione

```bash
# Crea build ottimizzata
npm run build

# Preview build produzione localmente
npm run preview
```

I file ottimizzati saranno nella cartella `dist/`

## ⚙️ Personalizzazione

### 1. Informazioni Base

**File**: `src/components/GiftIBAN.jsx`
- Aggiorna IBAN reale (linea 10-11)

**File**: `src/components/Contacts.jsx`
- Aggiorna nomi e numeri telefono (linea 8-19)

**File**: `index.html`
- Aggiorna URL del sito nei meta tags Open Graph (linea 17, 24)

### 2. Backend RSVP (opzionale)

Segui le istruzioni in `RSVP_BACKEND_SETUP.md` per configurare:
- Firebase
- Supabase
- API endpoint personalizzato
- EmailJS

### 3. Favicon e Open Graph Image

**Favicon**: Sostituisci `public/favicon.svg` con il tuo design

**Open Graph Image**: Aggiungi `public/og-image.jpg` (1200x630px)
- Consigliato: foto coppia + nomi + data
- Usato per preview su social media

### 4. Colori e Tema

**File**: `tailwind.config.js`

```javascript
colors: {
  gold: {
    DEFAULT: '#D4AF37',  // Oro principale
    light: '#E5C158',    // Oro chiaro
    dark: '#B8941F',     // Oro scuro
  },
}
```

## 📱 Sezioni del Sito

1. **Hero/Welcome** - Titolo, countdown live, testo introduttivo
2. **La Nostra Storia** - (placeholder - da personalizzare)
3. **Celebrazione & Location** - Chiesa e Castello con Google Maps
4. **Timeline** - Scaletta della giornata (4 eventi)
5. **RSVP** - Form conferma presenza con validazione
6. **Per Noi** - Box IBAN per regali
7. **Galleria** - (placeholder - da aggiungere foto)
8. **Contatti** - Card contatti con tel: links
9. **Footer** - Footer minimale con cuore

## 🌐 Deploy

### Netlify (consigliato - gratuito)

1. Crea account su [Netlify](https://netlify.com)
2. Connetti repository GitHub/GitLab
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

URL personalizzato disponibile (es: `ilaria-cristian.netlify.app`)

### Vercel

1. Crea account su [Vercel](https://vercel.com)
2. Import repository
3. Auto-detect React/Vite
4. Deploy!

### GitHub Pages

```bash
# Installa gh-pages
npm install --save-dev gh-pages

# Aggiungi in package.json:
"homepage": "https://tuousername.github.io/ilaria-cristian",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

### Hosting Tradizionale

1. Run `npm run build`
2. Upload contenuto cartella `dist/` via FTP
3. Configura dominio

## ✅ Checklist Pre-Deploy

- [ ] Aggiorna IBAN reale
- [ ] Aggiorna numeri telefono
- [ ] Aggiorna URL nei meta tags
- [ ] Aggiungi og-image.jpg
- [ ] Test form RSVP (se backend configurato)
- [ ] Verifica countdown con data corretta
- [ ] Test su mobile reale
- [ ] Run Lighthouse (score > 90)
- [ ] Rimuovi console.log
- [ ] Test link Google Maps
- [ ] Test link telefono

## 🔧 Troubleshooting

### Build fallisce

```bash
# Pulisci cache e reinstalla
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Countdown non funziona

Verifica la data in `src/components/Hero.jsx`:
```javascript
const weddingDate = new Date('2025-10-24T00:00:00')
```

### Font non caricano

Controlla connessione internet e Google Fonts CDN in `index.html`

### IBAN non si copia

- Usa HTTPS in produzione (required per Clipboard API)
- Test su browser moderni

## 📊 Analytics (opzionale)

Aggiungi Google Analytics in `index.html` prima di `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📝 License

Progetto personale per uso privato.

## 💝 Credits

Realizzato con amore per Ilaria & Cristian

---

**Buon matrimonio! 🎊✨💍**

Per domande o supporto: contatta gli sposi tramite i recapiti sul sito.
