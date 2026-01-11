# Personalizzazione Contatti

Per personalizzare le informazioni di contatto nella sezione "Contatti", modifica il file:

**`src/components/Contacts.jsx`**

## Dati da modificare

### Informazioni di contatto (linee 8-19)

```javascript
const contacts = {
  ilaria: {
    name: 'Ilaria',
    phone: '+39 123 456 7890',
    phoneRaw: '+39123456789', // Without spaces for tel: link
  },
  cristian: {
    name: 'Cristian',
    phone: '+39 098 765 4321',
    phoneRaw: '+390987654321',
  },
}
```

### Come personalizzare:

#### 1. Nome completo

Modifica il campo `name` per ciascuno:

```javascript
ilaria: {
  name: 'Ilaria Rossi',  // Aggiungi cognome se desiderato
  // ...
},
cristian: {
  name: 'Cristian Bianchi',
  // ...
}
```

#### 2. Numero di telefono

**IMPORTANTE:** Devi modificare ENTRAMBI i campi per ogni persona:

- `phone`: Numero con spazi (visibile sulla pagina)
- `phoneRaw`: Numero senza spazi (usato per il link tel:)

Esempio:
```javascript
ilaria: {
  name: 'Ilaria',
  phone: '+39 345 678 9012',      // Con spazi per leggibilità
  phoneRaw: '+393456789012',      // Senza spazi per tel: link
}
```

**Formato consigliato:**
- Includi sempre il prefisso internazionale (+39 per Italia)
- `phone`: Usa spazi per raggruppare le cifre
- `phoneRaw`: Nessuno spazio, solo numeri e +

### Aggiungere email (opzionale)

Se desideri aggiungere indirizzi email, puoi modificare la struttura:

```javascript
const contacts = {
  ilaria: {
    name: 'Ilaria',
    phone: '+39 123 456 7890',
    phoneRaw: '+39123456789',
    email: 'ilaria@example.com',  // Aggiungi questo
  },
  cristian: {
    name: 'Cristian',
    phone: '+39 098 765 4321',
    phoneRaw: '+390987654321',
    email: 'cristian@example.com',  // Aggiungi questo
  },
}
```

Poi aggiungi il link email nel corpo della card (dopo il telefono):

```javascript
{contacts.ilaria.email && (
  <div className="mb-6">
    <p className="text-gray-500 text-sm uppercase tracking-wider mb-3">
      Email
    </p>
    <a
      href={`mailto:${contacts.ilaria.email}`}
      className="inline-flex items-center justify-center text-gray-800 text-lg hover:text-gold transition-colors"
    >
      <FaEnvelope className="mr-3 text-gold" />
      {contacts.ilaria.email}
    </a>
  </div>
)}
```

### Personalizzare il testo introduttivo (opzionale)

Linea 78:
```javascript
<p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
  Per qualsiasi informazione o chiarimento non esitare a contattarci
</p>
```

Puoi modificarlo con il tuo messaggio personalizzato.

## Come funzionano i link tel:

Quando un visitatore clicca su un numero di telefono o sul bottone "Chiama":
- Su smartphone: Si apre l'app telefono con il numero già inserito
- Su desktop: Si apre l'applicazione predefinita (Skype, FaceTime, ecc.)

Il formato `tel:+393456789012` (senza spazi) è lo standard per i link telefonici.

## Testing

Prima di pubblicare il sito, testa i link:

1. **Desktop**: Clicca sui numeri per verificare che si apra l'app corretta
2. **Mobile**: Verifica che si apra l'app telefono
3. **Verifica visiva**: Assicurati che i numeri siano leggibili e formattati bene

## Rimuovere la sezione (se non desiderata)

Se preferisci non includere questa sezione:

1. Apri `src/App.jsx`
2. Rimuovi la riga:
   ```javascript
   import Contacts from './components/Contacts'
   ```
3. Rimuovi la sezione:
   ```javascript
   {/* Contact Section */}
   <Contacts />
   ```
4. Apri `src/components/Header.jsx`
5. Rimuovi dal menu:
   ```javascript
   { to: 'contact', label: 'Contatti' },
   ```

## Note sulla privacy

I numeri di telefono saranno visibili pubblicamente sul sito. Assicurati di:
- Usare numeri che siete disposti a condividere pubblicamente
- Considerare di usare numeri dedicati se ricevete molte chiamate
- Verificare che entrambi i numeri siano corretti prima della pubblicazione
