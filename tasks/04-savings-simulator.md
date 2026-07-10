# Task 04 — Homepage savings simulator ("Cât ai economisi cu Kluppi?")

**Branch:** `kluppi-rebrand`
**Reviewer:** Claude (binding PASS/FAIL after your report)
**Pattern reference:** eMAG Genius's "Cât poți economisi cu Genius?" — per-row sliders, a live-updating total, one CTA. Ours is per-category (we don't name partners pre-launch).

## Goal

Add an interactive savings-simulator section to the homepage (`src/app/page.tsx`), slotted **between the `kluppi-reasons` section and the FAQ section**. Self-contained component; the page edit must be minimal (one import + one JSX block).

⚠️ **This task touches `src/app/page.tsx` — the live homepage. Your diff there must be EXACTLY two additions:** the import line and the `<SavingsSimulator />` element (with its section wrapper if needed). Nothing else in that file may change.

## Files

**Create:** `src/app/SavingsSimulator.tsx` — `"use client"` component (the homepage is already a client component, but keep the directive so the component stands alone).
**Modify:** `src/app/page.tsx` (2-line addition as above) · `LOGBOOK.md` (append, never read).
**Do NOT touch:** anything else — including `globals.css` (style via a `<style>`-free approach: reuse global classes + inline the few section-specific styles in a co-located `savings-simulator.module.css` — fine to CREATE that module file too).

## Component spec

- Section wrapper: `kluppi-section` idiom like the neighbors, `id="simulator"`, with `data-reveal` on heading and card (the homepage observer already picks up all `[data-reveal]` elements — do NOT add another observer).
- Heading (H2, same class as other section headings): **Cât ai economisi cu Kluppi?**
- Sub-line: **Mută cursoarele și vezi estimarea pentru un an de cumpărături.**
- One white card (like the screenshot's) containing **six slider rows**, one per category, each: category emoji + label, a `<input type="range">` 0–2000 step 50 (lei/month spend), and a live value bubble "X lei/lună". Categories with labels and emoji:
  1. 👗 Modă & accesorii
  2. 🌿 Îngrijire & sănătate
  3. 🏡 Casă & grădină
  4. 🚗 Tehnologie & auto
  5. 🍷 Gusturi & experiențe
  6. 🎡 Timp liber & ai tăi
- Defaults: all sliders start at 0 except Modă (300) and Îngrijire (200) — so the card never opens on an awkward "0 lei".
- **The math — all constants in ONE config block at the top of the file, marked `// PLACEHOLDER — Andra validates every number before launch`:**
  ```ts
  const AVG_BENEFIT = 0.10;        // PLACEHOLDER: average member benefit per category
  const ANNUAL_PLAN_RON = 220;     // real: annual Founding Price
  ```
  Yearly gross = (sum of monthly spends) × `AVG_BENEFIT` × 12. Displayed net = gross − `ANNUAL_PLAN_RON`, floored at 0.
- Result block, live-updating: label **Cu abonamentul anual de 220 lei, ai rămâne cu aproximativ** then the big number **`{net}` lei economisiți pe an** (format with `Intl.NumberFormat("ro-RO")`, no decimals). When net is 0 (spends too low), show instead: **La acest nivel de cumpărături, abonamentul gratuit e alegerea potrivită — începe cu el.** (brand honesty: never a negative or inflated number).
- Honesty footnote under the result (small, muted): **Estimare orientativă: am folosit un beneficiu mediu de 10% din valoarea cumpărăturilor. Cifrele finale depind de ofertele din club.**
- CTA under the card: button (`kluppi-btn`, `href="#contact"`) **Rezervă-ți locul în club** + trust line (`kluppi-hero-trust`) **Gratuit la înscriere. Decizi mai târziu dacă vrei mai mult.**
- Styling: design tokens/global classes only; slider accent color via `accent-color: var(--accent)`; the card white on the section background, rounded like the screenshot. Mobile: rows stack, sliders full-width, big number scales down (fluid type tokens).
- Accessibility: each range input labelled (`aria-label` = category), value bubble `aria-live="polite"` on the total only.

## Acceptance criteria
- [ ] `npx tsc --noEmit` + `npm run build` pass.
- [ ] `git diff src/app/page.tsx` shows exactly the import + the one JSX insertion between reasons and FAQ.
- [ ] Sliders update the total live; 0-spend state shows the free-plan line; no negative numbers ever.
- [ ] All assumption constants in the single marked PLACEHOLDER block.
- [ ] Copy verbatim (diacritics, ro-RO number formatting); reveal animation works via the existing observer; no raw hex.
- [ ] LOGBOOK entry; AGENTS.md-format report; NO commit/push (sandbox can't — reviewer commits after PASS).
