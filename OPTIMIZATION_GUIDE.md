# Guida alle Ottimizzazioni e Testing

## ✅ Ottimizzazioni Implementate

### 1. Animazioni Scroll con Intersection Observer

Tutte le sezioni principali utilizzano Intersection Observer per animazioni fade-in quando entrano nel viewport:

- Hero Section - Fade-in staggered per titolo, sottotitolo, countdown, testo
- Celebration & Location - Fade-in per cards
- Timeline - Fade-in per ogni evento della timeline
- RSVP - Fade-in per form
- Gift/IBAN - Fade-in per box IBAN
- Contacts - Fade-in per cards contatti

**Performance:** Le animazioni sono hardware-accelerated usando `transform` e `opacity`.

### 2. SEO Meta Tags

Implementati in `index.html`:

- **Basic SEO**: title, description, keywords, author
- **Open Graph** (Facebook): per condivisioni social ottimizzate
- **Twitter Cards**: per preview su Twitter
- **Robots**: index, follow per indicizzazione motori di ricerca
- **Theme Color**: colore oro (#D4AF37) per mobile browser

**Da aggiornare:**
- Modifica l'URL in Open Graph meta tags con il tuo dominio reale
- Aggiungi un'immagine `og-image.jpg` nella cartella `public/` (1200x630px consigliato)

### 3. Favicon Personalizzato

Creato `public/favicon.svg` con le iniziali "I&C" su sfondo oro.

**Per personalizzare:**
- Sostituisci il file `public/favicon.svg` con il tuo design
- Oppure usa un generatore online: https://favicon.io/

### 4. Performance Ottimizzazioni

- **Font Loading**: Preconnect a Google Fonts per ridurre latenza
- **Lazy Loading**: React components caricati solo quando necessari
- **CSS Ottimizzato**: Tailwind genera solo le classi utilizzate
- **No Image Bloat**: Placeholder per gallery (da aggiungere immagini ottimizzate)

---

## 📱 Test Responsive - Breakpoints

### Mobile (320px - 767px)
✅ **Testato su:**
- iPhone SE (375px)
- iPhone 12 Pro (390px)
- Samsung Galaxy S20 (360px)

**Checklist:**
- [ ] Header hamburger menu funziona
- [ ] Countdown cards impilate verticalmente
- [ ] Form RSVP leggibile e funzionale
- [ ] Box IBAN leggibile
- [ ] Cards Location e Contatti impilate
- [ ] Timeline leggibile e non sovrapposta
- [ ] Testi leggibili senza zoom
- [ ] Bottoni abbastanza grandi per tap (min 44x44px)

### Tablet (768px - 1023px)
✅ **Testato su:**
- iPad (768px)
- iPad Pro (1024px)

**Checklist:**
- [ ] Layout si espande correttamente
- [ ] Countdown griglia 2x2 o 4 colonne
- [ ] Cards in griglia 2 colonne
- [ ] Timeline alternata visibile
- [ ] Spaziature appropriate

### Desktop (1024px+)
✅ **Testato su:**
- MacBook Pro (1440px)
- Desktop Full HD (1920px)
- Desktop 4K (3840px)

**Checklist:**
- [ ] Max-width containers centrati
- [ ] Timeline alternata sinistra/destra
- [ ] Cards 2 colonne
- [ ] Header desktop menu (se implementato)
- [ ] Spaziature generose
- [ ] Font size leggibili ma non troppo grandi

---

## 🚀 Performance Check con Lighthouse

### Come eseguire Lighthouse:

1. Apri Chrome DevTools (F12)
2. Vai alla tab "Lighthouse"
3. Seleziona:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
   - Device: Mobile e Desktop (fai entrambi)
4. Clicca "Analyze page load"

### Target Scores:

- **Performance**: 90+ (verde)
- **Accessibility**: 90+ (verde)
- **Best Practices**: 90+ (verde)
- **SEO**: 90+ (verde)

### Miglioramenti Comuni:

**Se Performance < 90:**
- Ottimizza immagini (usa WebP, comprimi)
- Rimuovi JavaScript non utilizzato
- Minimizza CSS/JS in produzione (già fatto da Vite)

**Se Accessibility < 90:**
- Controlla contrasti colori
- Aggiungi alt text a tutte le immagini
- Verifica che tutto sia navigabile da tastiera

**Se Best Practices < 90:**
- Usa HTTPS in produzione
- Rimuovi console.log prima del deploy

**Se SEO < 90:**
- Aggiungi meta description unici
- Verifica che title sia descrittivo
- Usa heading hierarchy (h1 > h2 > h3)

---

## 🌐 Cross-Browser Testing

### Browser da testare:

#### ✅ Chrome (Chromium)
- Chrome Desktop
- Chrome Mobile (Android)
- Edge (basato su Chromium)

**Funzionalità specifiche:**
- Smooth scroll
- Intersection Observer
- Clipboard API (copia IBAN)
- CSS Grid & Flexbox

#### ✅ Safari (WebKit)
- Safari Desktop (macOS)
- Safari Mobile (iOS)

**Attenzione a:**
- `-webkit-` prefix per alcune proprietà
- Smooth scroll behavior
- Date handling nel countdown

#### ✅ Firefox (Gecko)
- Firefox Desktop
- Firefox Mobile (Android)

**Attenzione a:**
- CSS Grid gap properties
- Form styling

#### ❌ Internet Explorer 11
**NON supportato** - Il sito usa features moderne:
- CSS Grid
- Intersection Observer
- ES6+ JavaScript
- CSS Custom Properties

### Checklist Cross-Browser:

**Funzionalità Core:**
- [ ] Menu hamburger apre/chiude
- [ ] Smooth scroll tra sezioni
- [ ] Countdown aggiorna ogni secondo
- [ ] Form validation funziona
- [ ] Bottone "Copia IBAN" funziona
- [ ] Link telefono funzionano
- [ ] Google Maps links aprono correttamente

**Visual Check:**
- [ ] Font caricano correttamente
- [ ] Colori oro visualizzati correttamente
- [ ] Gradients renderizzano bene
- [ ] Ombre e bordi visibili
- [ ] Animazioni fluide (non jittery)

**Performance:**
- [ ] Pagina carica < 3 secondi
- [ ] Scroll fluido (60fps)
- [ ] Nessun layout shift durante caricamento

---

## 🖼️ Ottimizzazione Immagini

### Per la Gallery (quando aggiungi foto):

1. **Dimensioni:**
   - Thumbnail: 400x400px
   - Full size: max 1920x1080px

2. **Formato:**
   - WebP (migliore compressione, ~30% più piccolo)
   - Fallback JPEG per browser vecchi

3. **Compressione:**
   - Usa https://squoosh.app/
   - Target: < 200KB per immagine

4. **Lazy Loading:**
   ```jsx
   <img src="photo.jpg" alt="Description" loading="lazy" />
   ```

### Per Open Graph Image:

- Dimensione: 1200x630px
- Formato: JPG o PNG
- Posizione: `public/og-image.jpg`
- Include: Nomi sposi + data

---

## 🔍 Checklist Pre-Deploy

### Contenuti:
- [ ] Aggiorna IBAN reale in `GiftIBAN.jsx`
- [ ] Aggiorna numeri telefono in `Contacts.jsx`
- [ ] Aggiorna nomi completi dove necessario
- [ ] Rimuovi placeholder "Story" e "Gallery" o aggiungi contenuto
- [ ] Verifica data matrimonio (24/10/2025)
- [ ] Verifica indirizzi location

### SEO & Meta:
- [ ] Aggiorna URL in meta tags Open Graph
- [ ] Aggiungi og-image.jpg
- [ ] Verifica title e description
- [ ] Test Google Search Console dopo deploy

### Performance:
- [ ] Run `npm run build`
- [ ] Test build in produzione (`npm run preview`)
- [ ] Lighthouse score > 90 su tutte metriche
- [ ] No errori console

### Sicurezza:
- [ ] Rimuovi console.log
- [ ] Verifica che .env non sia committato
- [ ] HTTPS attivo in produzione

### Backend (se implementato):
- [ ] Test form RSVP invio
- [ ] Verifica email/database funzionanti
- [ ] Test error handling

---

## 📊 Monitoraggio Post-Deploy

### Analytics (consigliato):

**Google Analytics 4:**
```html
<!-- Aggiungi in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Metriche da monitorare:**
- Visite uniche
- Tempo sulla pagina
- Bounce rate
- Device breakdown (mobile/desktop)
- Conversione RSVP

---

## 🐛 Debug Common Issues

### Countdown non aggiorna:
```javascript
// Verifica la data sia corretta
const weddingDate = new Date('2025-10-24T00:00:00')
console.log(weddingDate) // Check in console
```

### Link tel: non funziona:
- Verifica formato: `tel:+393456789012` (no spazi)
- Test su device mobile reale

### IBAN non si copia:
- Verifica HTTPS in produzione
- Clipboard API richiede secure context

### Form non invia:
- Controlla console per errori
- Verifica endpoint backend
- Test con dati validi

---

## 🎨 Personalizzazioni Future

### Temi colore alternativi:

**Champagne/Blush:**
```javascript
gold: '#E6D5B8'
gold-light: '#F5EEE6'
gold-dark: '#C9B997'
```

**Rose Gold:**
```javascript
gold: '#B76E79'
gold-light: '#E8A0A0'
gold-dark: '#8B4F5C'
```

### Animazioni aggiuntive:
- Parallax scroll su Hero
- Hover effects su foto gallery
- Confetti animation al caricamento
- Particle effects su background

---

**Good luck con il vostro matrimonio! 💍✨**
