# Kluppi

Pagină de landing (waitlist) pentru Kluppi — un club de shopping cu coduri și
beneficii de la branduri. Conținutul e în limba română.

## Stack & cum o rulezi
- **Next.js** (App Router) + TypeScript. Codul stă în rădăcina repo-ului.
- Necesită **Node 20+** (`nvm use 22`). Pe Node 17 dă eroare.
- Dezvoltare: `npm install`, apoi `npm run dev` → http://localhost:3000
- Pagina principală: `src/app/page.tsx`. Secțiuni: `BenefitsCards.tsx`,
  `HowItWorks.tsx`, `PainPointsCarousel.tsx`, `SplitBanner.tsx`.
- Formularul de înscriere: `src/app/api/subscribe/route.ts` (Vercel KV / Redis).

## Design tokens (în `:root`, `src/app/globals.css`)
- Accent: `#f5531c` (Dare Devil) · Fundal: `#fff0bc` (Lemon Sorbet) · Text: `#351e28` (Cassis)
- Font: Switzer 300. Tipografia e fluidă (`clamp()`), prin token-uri `--fs-*`.
- Folosește token-urile (`var(--accent)` etc.), nu culori scrise direct în cod.

## Reguli
- **Nu citi `LOGBOOK.md` decât dacă ți se cere explicit.** E o arhivă lungă de
  istoric (~25k tokeni). Pentru editări normale nu e nevoie de el.
- `src/app/webflow.css` e CSS moștenit din template — atinge-l doar la cerere.

## Sfat pentru economie de tokeni
Folosește `/clear` între task-uri diferite ca să resetezi contextul.
Cereri specifice (ex. „schimbă textul din `HowItWorks.tsx`") costă mult mai
puțin decât cele vagi care obligă o explorare a tot proiectul.
