# STARTHOME REAL ESTATE

Sito immobiliare professionale realizzato con Next.js, React, TypeScript e Tailwind CSS.

## Avvio locale

```bash
npm install
npm run dev
```

Aprire `http://localhost:3000`.

## Modifiche principali

- Immobili demo: `lib/data.ts`
- Contatti, navigazione e footer: `components/Header.tsx` e `components/Footer.tsx`
- Testi delle pagine: cartella `app`
- Immagini: `public/images`
- Colori e stile: `tailwind.config.ts` e `app/globals.css`

I moduli registrano i dati nella console del browser. Per la produzione, collegare la funzione `submit` in `components/Forms.tsx` a un endpoint API o servizio email.

## Pubblicazione su Vercel

1. Caricare il progetto in un repository GitHub, GitLab o Bitbucket.
2. Accedere a Vercel e scegliere **Add New > Project**.
3. Importare il repository.
4. Vercel riconoscerà automaticamente Next.js: lasciare i valori predefiniti e premere **Deploy**.
5. Collegare il dominio e aggiornare `metadataBase` in `app/layout.tsx`.

Prima della pubblicazione sostituire telefono, email, indirizzo, P.IVA, link social e testi legali dimostrativi.
