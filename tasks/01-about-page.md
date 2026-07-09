# Task 01 — About page (`/despre`)

**Branch:** `kluppi-rebrand` (repo default — do not create a new branch)
**Reviewer:** Claude (binding PASS/FAIL after your report)

## Goal

Create the About page at `/despre` — brand story only, per the locked website plan (no team/founders section). The site is **pre-launch**, so the page must not claim the club is already open; its CTA points to the existing waitlist signup on the homepage.

Because the About page needs the site header/footer and the homepage keeps them inline, first extract the **static chrome** already duplicated in the legal layout into one shared component, then reuse it.

## Files

**Create:**
1. `src/app/SiteChrome.tsx` — static site chrome (simple logo header + full footer), extracted 1:1 from `src/app/(legal)/layout.tsx`. Props: `{ children: ReactNode }`. Keep the `socials` and `legalLinks` arrays with it. No client state ("use client" not needed).
2. `src/app/despre/page.tsx` — the About page (server component), wrapped in `SiteChrome`.
3. `src/app/despre/despre.module.css` — page-scoped styles; follow the conventions of `src/app/(legal)/legal.module.css` (CSS module, design tokens, `--fs-*` fluid type). Text-column layout, generous whitespace, Bricolage Grotesque for headings via the existing global font setup. No images in v1.

**Modify:**
4. `src/app/(legal)/layout.tsx` — replace its inline chrome with `<SiteChrome>` so legal pages render **byte-identical markup** to today. Do not touch the legal pages' content files.
5. `LOGBOOK.md` — append your entry (do not read the file).

**Do NOT touch:** `src/app/page.tsx` (nav link to /despre is a separate future task), `globals.css`, `webflow.css`, `CookieBanner.tsx`, anything else under `(legal)/`, `CLAUDE.md`, `.claude/`, `AGENTS.md`, `tasks/`.

## Page metadata

```ts
export const metadata: Metadata = {
  title: "Despre Kluppi — povestea clubului",
  description:
    "De ce există Kluppi: un club de shopping cu coduri reale de la branduri, fără urgență falsă și fără prețuri umflate artificial.",
  robots: { index: false, follow: false }, // pre-launch — don't index yet
};
```

## Copy (Romanian — use VERBATIM, diacritics included)

**Eyebrow:** Despre noi

**H1:** Clubul pornit dintr-o frustrare pe care o știi și tu

**Lead paragraph:**
Reduceri care nu reduc nimic. Cronometre care numără invers spre nicăieri. Prețuri umflate ieri ca să pară generoase azi. Am obosit și noi de ele — așa că am construit altceva.

**Section: „De unde a pornit Kluppi"**
Toți avem prietenul acela care lucrează la un brand și care, din când în când, îți dă codul lui de reducere de angajat. Fără artificii, fără condiții ascunse — doar un avantaj real, oferit cu încredere, pentru că știi pe cineva din interior.

Kluppi e exact acel prieten. Un club de shopping în care brandurile le oferă membrilor coduri și beneficii reale, negociate direct, lună de lună.

**Section: „În ce credem"** (4 sub-blocks, title + body)

1. **Reduceri reale, nu teatru.** Lucrăm direct cu brandurile și verificăm ca fiecare ofertă să fie un avantaj adevărat — nu un preț crescut ieri și „redus” azi.
2. **Fără urgență falsă.** Codurile lunii rămân valabile toată luna. Nu punem cronometre care să te grăbească să cumperi ce nu îți trebuie.
3. **Un club, nu o piață publică.** Codurile rămân între membri. Tocmai pentru că nu sunt aruncate pe tot internetul, brandurile își permit să ofere mai mult.
4. **Respect pentru decizia ta.** Îți arătăm avantajele, tu decizi în ritmul tău. Fără presiune, fără spam.

**Closing paragraph:**
Kluppi e clubul pe care ni l-am fi dorit noi înșine. Acum e al tău.

**CTA button:** Rezervă-ți locul în club → link to `/#contact`
**Trust line under CTA:** Înscriere gratuită · Fără obligații

## Acceptance criteria

- [ ] `npm run build` passes (Node 20+), `npx tsc --noEmit` passes.
- [ ] `/despre` renders: chrome + eyebrow + H1 + lead + 2 sections + closing + CTA, copy verbatim.
- [ ] Legal pages (`/termeni-si-conditii`, `/confidentialitate`, `/politica-cookies`) render exactly as before — same markup, same classes.
- [ ] CTA button uses the existing `kluppi-btn` global class (matches homepage buttons).
- [ ] No raw hex colors; tokens only.
- [ ] Nothing outside the listed files changed; pre-existing unstaged modifications left unstaged.
- [ ] LOGBOOK.md entry appended.
- [ ] Committed on `kluppi-rebrand` (message: `Add /despre About page; extract shared SiteChrome from legal layout`) and pushed to `origin/kluppi-rebrand`.
- [ ] End report in the AGENTS.md format.
