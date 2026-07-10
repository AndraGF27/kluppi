# Task 03 — Partners page (`/parteneri`): full copy + application form

**Branch:** `kluppi-rebrand`
**Reviewer:** Claude (binding PASS/FAIL after your report)
**Model for structure:** the About page you built in task 02 (`src/app/despre/`) — same architecture: server `page.tsx` with metadata, `"use client"` content component owning the IntersectionObserver reveal effect (copy it verbatim from `src/app/despre/_components/about-content.tsx`), page-scoped CSS module reusing global classes. Read those three files first.

## Goal

Build `/parteneri` — the page brands see. Structure mirrors the homepage/About visual rhythm. It ends with a **partner application form** that POSTs to a new API route which emails the inquiry to Kluppi (Resend REST, no SDK). The site is pre-launch: page stays `noindex`.

## Files

**Create:**
1. `src/app/parteneri/page.tsx` — server component: metadata below + `<SiteChrome><PartnersContent /></SiteChrome>`.
2. `src/app/parteneri/_components/partners-content.tsx` — `"use client"`; all sections + the reveal `useEffect` (verbatim from About) + FAQ accordion state + the form (state, POST, success/error states).
3. `src/app/parteneri/parteneri.module.css` — page-scoped layout, tokens only, follow `despre.module.css` conventions.
4. `src/app/api/partner-inquiry/route.ts` — the form's API route (spec below).

**Modify:**
5. `src/app/despre/_components/about-content.tsx` — ONE line: the partner link `href="mailto:partners@kluppi.com"` becomes `href="/parteneri"` (text unchanged).
6. `LOGBOOK.md` — append entry (never read it).

**Do NOT touch:** `src/app/page.tsx` (homepage nav rewiring is a later task), `SiteChrome.tsx`, `globals.css`, `webflow.css`, `CookieBanner.tsx`, `(legal)/`, other `api/` routes, `CLAUDE.md`, `AGENTS.md`, `.claude/`, other `tasks/` files.

## Metadata (`page.tsx`)

```ts
export const metadata: Metadata = {
  title: "Pentru branduri — Kluppi",
  description:
    "Kluppi aduce brandul tău în fața unei comunități de membri care chiar vor să cumpere: fără taxe de listare, fără comisioane de afiliere, cu rezultate în propriul tău analytics.",
  robots: { index: false, follow: false }, // pre-launch — do not index yet
};
```

## API route spec (`src/app/api/partner-inquiry/route.ts`)

- `export const runtime = "nodejs";` POST only.
- Body: JSON `{ brandName, website, fullName, role, email, category, message, phone }`.
  - `phone` is a **honeypot**: it does NOT exist as a visible field in the form UI (render it as a visually hidden input, `tabIndex={-1}`, `autoComplete="off"`). If non-empty → respond `{ ok: true }` WITHOUT sending anything (silent drop; do not reveal the trap).
  - Server-side validation (no new deps, plain checks): `brandName`, `website`, `fullName`, `role`, `email`, `category` required non-empty strings; `message` optional; trim everything; max lengths 200 (message 2000); `email` must match a simple email regex; `category` must be one of the six values listed under FORM below; reject bodies > 16 KB early via content-length. Invalid → 400 `{ ok: false }`.
  - **Rate limit:** in-memory per-IP (from `x-forwarded-for` first value), max 5 requests per hour, prune empty buckets — same pattern as the app; on limit → 429 `{ ok: false }`.
- Email send via **Resend REST with plain `fetch`** (endpoint `https://api.resend.com/emails`, `Authorization: Bearer`, 10s `AbortSignal.timeout`) — **no SDK dependency**:
  - Env vars: `RESEND_API_KEY`, `EMAIL_FROM`, and `PARTNERS_INQUIRY_TO` (default `"partners@kluppi.com"` when unset). If `RESEND_API_KEY` or `EMAIL_FROM` is missing → 503 `{ ok: false }` (the UI shows the error state with the mailto fallback; never pretend success).
  - **Plain-text email only** (no HTML — nothing user-entered gets interpolated into markup): subject `Cerere parteneriat: <brandName>`, body = labeled lines with all fields. Set **`reply_to`** to the submitter's email so a reply goes straight to them.
  - Never log the submitted fields or the API key; log only a generic `[partner-inquiry] sent` / `[partner-inquiry] send failed (<status>)`.

## Copy & structure (Romanian — VERBATIM, diacritics + „ ” quotes + — and · exactly as written)

### 1. Hero (simple, text only — no image)
- Eyebrow: **Pentru branduri**
- H1: **Clienți noi, fără costuri de achiziție**
- Body: **Kluppi îți aduce brandul în fața unei comunități de membri care chiar vor să cumpere. Tu oferi un beneficiu dedicat membrilor, noi îl promovăm în club. Fără taxe de listare, fără bugete de promovare, fără comisioane de afiliere.**
- CTA button (`kluppi-btn`, `href="#formular"`): **Devino partener**
- Trust line: **Fără costuri · Fără obligații · Totul începe cu o discuție de 15 minute**

### 2. Band (3 cells, icons from lucide-react)
- `Percent` — **Zero comisioane**
- `Users` — **Audiență calificată**
- `ChartLine` — **Rezultate măsurabile**

### 3. Section — **Îți sună cunoscut?** (reading column)
1. Ca brand, devine tot mai complicat să atragi clienți noi prin canalele clasice.
2. Costurile de achiziție cresc de la an la an. Licitațiile din Meta și Google se scumpesc, iar rezultatele sunt tot mai greu de prezis. Comisioanele de afiliere se adună. Iar reducerile publice, aruncate în toate direcțiile, îți erodează marja și îți obișnuiesc clienții să aștepte mereu următoarea promoție.
3. Kluppi vine cu o alternativă: un canal de achiziție în care nu plătești pentru vizibilitate, ci oferi un beneficiu real unei comunități care apreciază exact asta.
- CTA button (`href="#formular"`): **Devino partener** · trust line: **Prima discuție durează 15 minute.**

### 4. Section — **Cum arată Kluppi din perspectiva brandului tău** (reading column)
1. Kluppi este un club privat de shopping cu două tipuri de membri: gratuiți și plătitori. La înscriere, fiecare membru își alege maximum două categorii de interes, iar beneficiile îi sunt prezentate în funcție de această alegere.
2. Pentru brandul tău, asta înseamnă că oferta nu se pierde într-un catalog nesfârșit: ajunge în fața unei liste de oameni care au cerut exact categoria ta. Iar codul nu circulă liber — este vizibil doar în portalul membrilor, după autentificare.
3. Contextul contează la fel de mult ca audiența: în Kluppi, brandul tău nu apare lângă „lichidări totale” și cronometre, ci într-un spațiu curatoriat, construit pe încredere.

### 5. Section — **Ce primești ca partener?** (6-card grid, homepage-card look; title + body per card)
1. **Un canal de achiziție fără costuri** — Nu există taxe de listare, bugete minime sau comisioane de afiliere. Investiția ta este beneficiul în sine, oferit pe o vânzare pe care oricum ți-o doreai.
2. **O audiență calificată, cu intenție reală** — Membrii plătitori sunt oameni care plătesc pentru acces la oferte bune — un semnal de intenție mai clar decât orice metrică de campanie. Membrii gratuiți sunt cumpărători care și-au declarat categoriile de interes. În ambele cazuri, ajungi la public calificat, nu la trafic întâmplător.
3. **Control total asupra ofertei** — Tu decizi beneficiul: o reducere procentuală, un voucher, transport gratuit, un cadou, acces anticipat — orice se potrivește marjei și calendarului tău. Poți oferi chiar condiții diferite membrilor gratuiți și celor plătitori.
4. **Protecție pentru valoarea brandului** — Oferta ta nu ajunge pe agregatoare de cupoane, nu apare în e-mailuri și nu intră în competiție cu propriile tale campanii. Reducerea rămâne un privilegiu pentru membri, nu o etichetă lipită public pe brandul tău.
5. **Rezultate pe care le vezi în propriul analytics** — Traficul din club ajunge la tine prin linkuri tagate UTM, așa că urmărești vizitele și conversiile direct în sistemele tale. Simplu și transparent.
6. **Flexibilitate completă** — Nu ești obligat să participi la fiecare ciclu de campanie și poți opri colaborarea oricând. Iar relația cu clienții rămâne integral a ta: comanda, plata și livrarea se întâmplă pe site-ul tău, ca de obicei.

### 6. Section — **Cum funcționează?** (numbered steps, 5 items: bold title + body)
1. **Ne scrii** — Completezi formularul de mai jos, cu câteva detalii despre brandul tău. Durează un minut.
2. **Discutăm 15 minute** — Îți arătăm exact cum ar funcționa Kluppi pentru brandul tău și stabilim împreună detaliile.
3. **Creezi beneficiul pentru membri** — Tu alegi oferta — similară, poate, cu ce oferi deja în fluxurile de bun venit sau afiliaților — dar dedicată membrilor Kluppi.
4. **Noi o promovăm în club** — O prezentăm membrilor din categoria potrivită, în comunicările clubului și în portalul membrilor.
5. **Urmărești rezultatele** — Vezi traficul și conversiile în propriul analytics, iar de la noi primești raportări agregate despre campanie.
- CTA button (`href="#formular"`): **Devino partener** · trust line: **Primul pas: un formular de un minut.**

### 7. Section — **Kluppi este pentru brandul tău dacă…** (4-card grid; title + body)
1. **Cauți alternative la licitațiile tot mai scumpe** — Meta și Google rămân utile, dar știi că ai nevoie și de canale care nu se scumpesc cu fiecare trimestru.
2. **Îți pasă cum arată brandul tău în piață** — Nu vrei să apari pe agregatoare de cupoane, lângă „mega reduceri” și cronometre. Vrei un context care respectă brandul.
3. **Oferi deja beneficii clienților noi** — Ai coduri în fluxurile de bun venit, de coș abandonat sau la afiliați. Kluppi este un canal în plus pentru un efort pe care îl faci deja.
4. **Preferi rezultate măsurabile** — Vrei să vezi în cifrele tale dacă un canal funcționează, nu doar să ne crezi pe cuvânt.

### 8. Section — **FAQ** (accordion; mirror the homepage's `kluppi-faq` markup/classes: button question + expandable answer, chevron, one open at a time is fine)
1. **Cât costă participarea în Kluppi?** — Nimic. Nu există taxe de listare, bugete de promovare obligatorii sau comisioane de afiliere. Contribuția ta este beneficiul oferit membrilor.
2. **Ce fel de ofertă trebuie să ofer?** — Ce se potrivește brandului tău: o reducere procentuală, un voucher cu valoare fixă, transport gratuit, un cadou, acces anticipat la o colecție. Tu decizi mecanismul și condițiile; noi ne asigurăm doar că oferta este una corectă pentru membri.
3. **Cum ajung membrii la oferta mea?** — Prezentăm oferta în comunicările clubului, iar membrii accesează codul din contul lor. De acolo ajung direct pe site-ul tău și cumpără ca de obicei.
4. **Cine se ocupă de comenzi, plăți și livrare?** — Tu, ca până acum. Vânzarea se încheie direct între membru și brandul tău, pe site-ul tău. Kluppi promovează oferta și îți aduce clientul până la ușă.
5. **Cum măsor rezultatele?** — Linkurile din club sunt tagate UTM, deci vezi traficul și conversiile direct în analytics-ul tău. Raportarea noastră este la nivel de campanie — nu transmitem date personale ale membrilor.
6. **Brandul meu este mic sau de nișă. Are sens pentru mine?** — Da. Membrii își aleg categoriile care îi interesează și ne spun constant ce branduri vor în club. Relevanța contează mai mult decât dimensiunea.
7. **Pot renunța dacă nu funcționează?** — Da, oricând. Nu ești obligat să participi la fiecare ciclu de campanie, iar colaborarea poate fi oprită fără costuri.

### 9. Form section — `id="formular"` — heading **Adu brandul tău în club**
Intro: **Completează formularul, iar noi te contactăm pentru o discuție de 15 minute. Fără angajamente — doar ca să vedem împreună dacă ne potrivim.**

Fields (labels + placeholders verbatim; style inputs like the homepage signup form — `form-input` class):
- **Numele brandului** — placeholder: `Introdu numele brandului`
- **Website** — placeholder: `https://`
- **Numele tău** — placeholder: `Introdu numele și prenumele`
- **Rolul tău** — placeholder: `ex.: Marketing Manager, Fondator`
- **Adresă de e-mail** — placeholder: `Introdu adresa de e-mail`
- **Categoria principală** — `<select>` with exactly these six options: `Modă & accesorii`, `Îngrijire & sănătate`, `Casă & grădină`, `Tehnologie & auto`, `Gusturi & experiențe`, `Timp liber & ai tăi`
- **Mesajul tău (opțional)** — textarea, placeholder: `Spune-ne pe scurt ce ai în minte`
- Hidden honeypot input named `phone` (see route spec).
- Submit button (`kluppi-btn`): **Trimite**, disabled + text **Se trimite…** while pending.
- Line under button: **Îți răspundem în 1–2 zile lucrătoare.**
- Line below: **Preferi e-mailul? Scrie-ne la partners@kluppi.com.** (link the address with `mailto:`)
- Success state (replace/announce under the form): **Mulțumim! Am primit mesajul tău — îți răspundem în 1–2 zile lucrătoare.**
- Error state: **Ceva n-a mers. Încearcă din nou sau scrie-ne la partners@kluppi.com.**

### 10. Closing tagline (in-page, above the global footer, like About)
**Discounturile nu sunt problema. Distribuția lor este.**

## Git
Your sandbox cannot write `.git` or reach the network — **do not commit or push**. Working tree only; the reviewer commits after PASS. Append the LOGBOOK.md entry.

## Acceptance criteria
- [ ] `npx tsc --noEmit` and `npm run build` pass; `/parteneri` builds.
- [ ] All copy verbatim (diacritics, „ ”, —, ·); every CTA scrolls to `#formular`; About page partner link now `/parteneri`.
- [ ] Server `page.tsx` + client content component with the reveal observer (text never stuck invisible); noindex metadata.
- [ ] FAQ accordion works; form posts JSON to `/api/partner-inquiry`; pending/success/error states as specified.
- [ ] Route: honeypot silent-drop, per-IP rate limit, validation, plain-text email with `reply_to`, 503 when unconfigured, no user data or secrets in logs.
- [ ] No raw hex; global classes + tokens; only listed files touched; pre-existing unstaged changes left alone.
- [ ] LOGBOOK entry + AGENTS.md-format report (state commit/push intentionally skipped).
