# Personalizzazione IBAN

Per personalizzare le informazioni IBAN nella sezione "Per Noi", modifica il file:

**`src/components/GiftIBAN.jsx`**

## Dati da modificare

### 1. Numero IBAN (linea 10)

```javascript
const ibanNumber = 'IT00 X000 0000 0000 0000 0000 000'
```

Sostituisci con il tuo IBAN reale. Puoi formattarlo con gli spazi per renderlo più leggibile, oppure senza spazi. Esempio:

```javascript
const ibanNumber = 'IT60 X054 2811 1010 0000 0123 456'
```

### 2. Intestatario del conto (linea 11)

```javascript
const accountHolder = 'Ilaria Cognome & Cristian Cognome'
```

Sostituisci con i nomi completi degli sposi. Esempio:

```javascript
const accountHolder = 'Ilaria Rossi & Cristian Bianchi'
```

### 3. Personalizzare i testi (opzionale)

Puoi modificare i testi della sezione per adattarli al vostro stile:

**Testo introduttivo (linee 88-94):**
```javascript
<p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
  La vostra presenza è il regalo più grande che potremmo desiderare.
</p>
<p className="text-gray-600 text-base sm:text-lg leading-relaxed">
  Se desiderate contribuire al nostro viaggio insieme, sarà per noi un gesto prezioso e gradito.
</p>
```

**Messaggio di ringraziamento (linea 142):**
```javascript
<p className="text-gray-500 text-sm text-center mt-6 italic">
  Grazie di cuore per il vostro pensiero
</p>
```

## Funzionalità del bottone "Copia IBAN"

Il bottone copia automaticamente l'IBAN senza spazi negli appunti del visitatore. Quando l'utente clicca:

1. L'IBAN viene copiato negli appunti (senza spazi)
2. Il bottone diventa verde con il testo "IBAN COPIATO!"
3. Dopo 3 secondi torna allo stato normale

Questa funzionalità rende facile per gli ospiti copiare l'IBAN per fare un bonifico.

## Note importanti

- **Privacy:** L'IBAN è visibile pubblicamente sul sito, assicurati che sia quello corretto
- **Sicurezza:** Un IBAN da solo non permette prelievi, solo versamenti
- **Testing:** Testa sempre la funzionalità "Copia IBAN" prima di pubblicare il sito

## Rimuovere la sezione (se non desiderata)

Se preferisci non includere questa sezione, puoi:

1. Aprire `src/App.jsx`
2. Rimuovere la riga:
   ```javascript
   import GiftIBAN from './components/GiftIBAN'
   ```
3. Rimuovere la sezione:
   ```javascript
   {/* Gift/IBAN Section */}
   <GiftIBAN />
   ```
4. Aprire `src/components/Header.jsx`
5. Rimuovere dal menu:
   ```javascript
   { to: 'gift', label: 'Per Noi' },
   ```
