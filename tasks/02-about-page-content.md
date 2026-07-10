# Task 02 — About page (`/despre`): real copy + homepage-style structure

**Branch:** `kluppi-rebrand`
**Reviewer:** Claude (binding PASS/FAIL after your report)
**Supersedes:** the placeholder content built in task 01. Keep the `SiteChrome` component and the `/despre` route; **replace the page's content** with the structure and copy below.

## Goal

Rebuild `/despre` so it (a) uses the **final approved Romanian copy** below, verbatim, and (b) **mirrors the visual rhythm of the homepage** (`src/app/page.tsx`) — full-bleed sections, the icon "band", a card grid, generous spacing, and the same scroll-reveal fade-in — rather than a plain text column. The hero, however, must stay **deliberately simple**: eyebrow + H1 + one short paragraph + CTA + **a single static image** (no multi-image parallax like the homepage hero).

The site is **pre-launch** (the homepage is still a waitlist). Every "Intră în club" CTA therefore links to the homepage waitlist anchor `/#contact` — do not link to any app domain.

## Architecture (read before coding)

The homepage's fade-in uses `data-reveal`, and `globals.css` sets `[data-reveal] { opacity: 0 }` until JS adds `.is-revealed`. **A static server component using `data-reveal` would render invisible text.** So split the page:

1. **`src/app/despre/page.tsx`** — stays a **server component**. Keeps `export const metadata` (below) and renders:
   ```tsx
   import SiteChrome from "../SiteChrome";
   import { AboutContent } from "./_components/about-content";

   export default function AboutPage() {
     return (
       <SiteChrome>
         <AboutContent />
       </SiteChrome>
     );
   }
   ```
2. **`src/app/despre/_components/about-content.tsx`** — a **`"use client"`** component holding all the JSX below **and** this reveal effect (copied verbatim from the homepage so behaviour matches exactly):
   ```tsx
   useEffect(() => {
     const targets = Array.from(
       document.querySelectorAll<HTMLElement>("[data-reveal]")
     );
     if (!("IntersectionObserver" in window)) {
       targets.forEach((el) => el.classList.add("is-revealed"));
       return;
     }
     const observer = new IntersectionObserver(
       (entries) => {
         entries.forEach((entry) => {
           if (entry.isIntersecting) {
             entry.target.classList.add("is-revealed");
             observer.unobserve(entry.target);
           }
         });
       },
       { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
     );
     targets.forEach((el) => observer.observe(el));
     return () => observer.disconnect();
   }, []);
   ```
   Put `data-reveal` on each section's heading and content blocks, as the homepage does. Stagger a few with `style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}` where it reads well.
3. **`src/app/despre/despre.module.css`** — page-specific layout only (hero layout, reading-column width, manifesto list, closing tagline). **Reuse existing global classes** from `globals.css` wherever they already cover the need — do not re-implement them:
   - Section wrappers: `kluppi-section`, `padding-global`, `container-large`, `section-padding-large`, `kluppi-section-content`.
   - Hero text: `kluppi-hero-eyebrow`, `kluppi-hero-body`, `kluppi-hero-trust`; button: `kluppi-btn`.
   - Band: `kluppi-band`, `kluppi-band-inner`, `kluppi-band-grid`, `kluppi-band-cell`, `kluppi-band-icon`, `kluppi-band-title`.
   - Card grid for the "standard" section: reuse the benefits pattern (`kluppi-benefits-grid` / `kluppi-benefit` / `kluppi-benefit-text` / `kluppi-benefit-title` / `kluppi-benefit-desc`) or a clean 3-card grid in the module — your call, but it must visually match the homepage cards.
   - Section headings: reuse a homepage heading class (e.g. `kluppi-steps-heading` / `kluppi-benefits-heading`) so the type scale matches.
   - Icons: import from `lucide-react` (already a dependency — see the homepage imports).

Never introduce raw hex colours; use the design tokens / existing classes.

## Page metadata (in `page.tsx`)

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Despre Kluppi — povestea clubului",
  description:
    "Kluppi e clubul construit de oameni din interiorul industriei de marketing, trecut de partea ta: beneficii reale, negociate direct cu brandurile, fără urgență falsă.",
  robots: { index: false, follow: false }, // pre-launch — do not index yet
};
```

## Copy & structure (Romanian — VERBATIM, keep every diacritic)

**Quotation marks:** use the Romanian convention exactly as written here — opening `„` (U+201E) and closing `”` (U+201D). Em dash `—` (U+2014) and middot `·` (U+00B7) as written. Paste as literal UTF-8 characters (the homepage does the same), not HTML entities.

### 1. Hero (simple — single image)
- Eyebrow (`kluppi-hero-eyebrow`): **Despre noi**
- H1: **Am văzut trucurile din culise. Apoi am trecut de partea ta.**
- Body (`kluppi-hero-body`): **Kluppi este clubul construit de oameni din interiorul industriei, pentru toți cei care s-au săturat să fie tratați ca ținte de marketing.**
- CTA button (`kluppi-btn`, `href="/#contact"`): **Intră în club**
- Trust line under CTA (`kluppi-hero-trust`): **Gratuit. Ca între prieteni.**
- **One image:** use `/Hero1.jpg` as a **placeholder** (Andra will pick the final one). Alt text: **Echipa Kluppi, de partea cumpărătorului.**

### 2. Band (three phrases, `kluppi-band` with icons)
Three `kluppi-band-cell`s, each an icon + `kluppi-band-title`:
- `MapPin` — **Un club românesc**
- `Handshake` — **Negociat direct la sursă**
- `ShieldCheck` — **De partea ta la checkout**

### 3. Section — heading **Povestea, pe scurt**
Paragraphs, in this order:
1. Am petrecut ani buni în marketing. Am stat în ședințele în care se planifică promoțiile, am văzut cum se decide ce primește un client nou și cum se construiește presiunea care te împinge să apeși „Cumpără acum”.
2. Așa că știm exact ce poate oferi un brand atunci când își dorește cu adevărat un client. Și știm cât de departe e asta de ceea ce primește, de obicei, un cumpărător care intră de pe un banner.
3. La un moment dat, întrebarea a devenit inevitabilă: dacă tot știm cum funcționează jocul, de ce să nu-l jucăm în favoarea noastră — a tuturor?
4. Am pus la un loc experiența, relațiile din industrie și puterea de negociere a unei comunități întregi și le-am mutat de cealaltă parte a checkout-ului. A ta.
5. I-am spus Kluppi. (Se citește klu-pi, dacă te întrebai.)

### 4. Section — heading **Manifestul Kluppi**
Render the four "Credem că…" lines as an emphasised list/stack, then the three closing statements with a bit more visual weight:
1. Credem că o reducere bună nu are nevoie de cronometru.
2. Credem că prețul corect nu ar trebui să fie o vânătoare.
3. Credem că nimeni nu ar trebui să se simtă păcălit după ce apasă „Plasează comanda”.
4. Credem că, dacă un brand spune „doar azi” de trei ori pe săptămână, e cazul să punem întrebări.
- Nu vânăm cupoane. Negociem acces.
- Nu postăm codurile public. Exact ăsta e scopul.
- Uneori, cel mai bun discount este liniștea că nu ești păcălit.

### 5. Section — heading **De ce un club? Și de ce privat?**
1. Pentru că un cod care ajunge peste tot nu mai valorează nimic.
2. Când o reducere devine publică, ea devine, de fapt, parte din preț: brandul o calculează din start în marjă, agregatoarele o copiază, iar „oferta” ajunge doar un alt banner. Când un beneficiu rămâne într-un club închis, brandul și-l poate permite mai generos, iar codul își păstrează valoarea pentru fiecare membru care îl folosește.
3. De asta beneficiile Kluppi sunt exclusive la sursă: negociate de noi, direct cu brandul, și de negăsit altundeva. Iar asta rămâne valabil indiferent câți suntem în club.

### 6. Section — heading **De ce există un abonament?**
1. Ca să fim sinceri până la capăt: nu plătești pentru că reducerile ar fi scumpe. Plătești pentru cineva care caută, negociază și verifică în locul tău, în fiecare lună. Cam ce ai face pentru un prieten care îți poartă mereu de grijă.
2. Și, dacă tot vorbim despre bani: nu lucrăm pe comisioane de afiliere. Nu câștigăm absolut nimic din ceea ce cumperi tu. Singura noastră „vânzare” este clubul însuși — așa că singura noastră grijă este ca el să merite, lună de lună.
3. Apropo, ai observat prețurile noastre? Numere rotunde. Fără 21,99, fără „reducere doar azi la abonament”. Un club care îți promite că nu te manipulează nu are voie să înceapă chiar cu propriul preț.

### 7. Section — heading **Standardul unei oferte Kluppi** (3-card grid)
Intro line above the cards: **Înainte să intre în club, fiecare ofertă trece prin trei întrebări:**
Three cards (title = question, body = answer):
- **E reală?** — Beneficiul se raportează la prețul curent, nu la unul umflat special pentru ocazie.
- **E exclusivă?** — Negociată pentru membri și imposibil de găsit cu o căutare pe Google.
- **E corectă?** — Condiții clare, fără excluderi ascunse și fără asteriscuri care schimbă tot.
Closing line below the cards: **Trei de „da” sau oferta nu intră. Da, asta înseamnă că vom refuza branduri. E în regulă: exact pentru asta suntem aici.**

### 8. Section — heading **Clubul îl construim împreună**
1. Kluppi nu e un catalog pe care îl primești. E un club pe care îl influențezi.
2. Membrii ne spun ce branduri își doresc, ce categorii îi interesează și ce beneficii merită negociate — iar lista noastră de negocieri se schimbă după ce cere comunitatea. Dacă ai un brand în minte, spune-ne. Citim fiecare cerere.

### 9. Final CTA — heading **Intră în club**
- Line: **Dacă ai citit până aici, probabil ești unul de-ai noștri.**
- CTA button (`kluppi-btn`, `href="/#contact"`): **Intră în club**
- Line under CTA: **Ne vedem înăuntru.**
- Partner line — render as: **Ai un brand?** followed by a link **Vezi cum devii partener →** with `href="mailto:partners@kluppi.com"` (the `/parteneri` page doesn't exist yet; this is a temporary target).

### 10. Closing tagline (in-page, just above the global footer)
A centered line: **Negociate de noi, pentru noi.**
Do **not** modify `SiteChrome` / the global footer — this tagline lives inside the About content, above where `SiteChrome`'s footer renders. (`SiteChrome` already provides logo, socials, legal links, Contact and the copyright line — do not duplicate those.)

## Do NOT touch
`src/app/page.tsx`, `src/app/SiteChrome.tsx`, `globals.css`, `webflow.css`, `CookieBanner.tsx`, anything under `src/app/(legal)/`, `CLAUDE.md`, `AGENTS.md`, `.claude/`, other files in `tasks/`.

## Git
Your sandbox cannot write `.git` or reach the network — **do not commit or push**. Edit the working tree only; the reviewer commits after PASS. Still append your **LOGBOOK.md** entry (do not read the file first).

## Acceptance criteria
- [ ] `npx tsc --noEmit` passes and `npm run build` passes (Node 20+); `/despre` builds.
- [ ] `page.tsx` is a server component exporting the metadata above (noindex kept); content lives in the `"use client"` `about-content.tsx` with the reveal observer; text is visible (not stuck at `opacity:0`).
- [ ] All copy present and **verbatim**, correct diacritics, Romanian `„ ”` quotes, `—` and `·` as specified.
- [ ] Hero is simple: eyebrow + H1 + one paragraph + CTA + trust line + a single image. No multi-image parallax.
- [ ] Visual rhythm matches the homepage (band, cards, section spacing, reveal fade-in) using existing global classes; no raw hex.
- [ ] Both "Intră în club" CTAs → `/#contact`; partner link → `mailto:partners@kluppi.com`.
- [ ] `SiteChrome` and all `(legal)/` pages unchanged; only the listed files touched; pre-existing unstaged changes left alone.
- [ ] LOGBOOK.md entry appended.
- [ ] End report in the AGENTS.md format (files changed / what / verification / out of scope / commit — state that commit+push were intentionally skipped per this brief).
