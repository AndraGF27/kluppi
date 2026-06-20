# Kluppi — Change Logbook

A running record of every change made to this project, in order. Each entry notes the date, the files touched, what changed, and why.

**Ground rules for this logbook:**
- Only changes that were explicitly requested get made.
- Nothing is deleted, edited, or added beyond the requested scope without asking first.
- Every applied change is recorded here.

---

## Baseline

- **Date:** 2026-06-19
- **State:** Repository cloned from `git@github.com:SkylineStudio12/kluppi.git` into `/Users/andra/Documents/Kluppi_repo`. Working tree clean, matching `origin/main`.
- **Note:** Two earlier exploratory rebrand attempts were made and then fully reverted at the user's request. No code changes from those remain. This logbook starts from the clean baseline.

---

## Changes

### 2026-06-20 — Pain-points: conclusion/outro headings → H3 + Cassis (requested)

**`src/app/page.tsx`**
- "Nu ți s-a întâmplat doar ție." and "Noi ne-am săturat de toate astea." changed from `<h2>` to `<h3>` (class `kluppi-painpoints-h2` kept as the styling hook).

**`src/app/globals.css`**
- `.kluppi-painpoints-h2`: added `color: #351E28` (Cassis), overriding the shared Dare Devil. Size (2rem) / weight (700) unchanged; main "De câte ori ai…" heading stays Dare Devil.

Typecheck (`tsc --noEmit`) passes.

### 2026-06-20 — Pain-points carousel: 5s autoplay loop, pauses on arrow hover (requested)

**`src/app/PainPointsCarousel.tsx`**
- Added a `paused` state + a `useEffect` autoplay: a 5s `setTimeout` advances to the next slide, looping with `(i + 1) % count`. It re-arms on every `index`/`paused` change, so manual arrow clicks also reset the 5s timer.
- The `.kluppi-carousel-arrows` row gets `onMouseEnter`/`onMouseLeave` → sets `paused`, which clears the pending timer while the cursor is over the arrows, and resumes on leave.
- Manual arrows left as-is (still disabled at the first/last slide). NOTE/flag: the autoplay loops past the last slide while the next arrow shows disabled there — left the arrow behaviour unchanged pending the user's call on whether to make the arrows wrap too.

Typecheck (`tsc --noEmit`) passes.

### 2026-06-20 — Pain-points: new bg image + type tweaks (requested)

**`public/`**
- Added `PainPoints2.jpg` (from `~/Downloads/`) — the new carousel band background.

**`src/app/globals.css`**
1. `.kluppi-carousel` background `url("/PainPoints.jpg")` → `url("/PainPoints2.jpg")`. (Old `PainPoints.jpg` left in place, now unused.)
2. `.kluppi-painpoints-h2` (the two cell headings "Nu ți s-a…" / "Noi ne-am săturat…"): `font-size: 2rem` fixed, overriding the shared `clamp(2rem,5vw,3.5rem)` (weight 700 unchanged; the main "De câte ori ai…" heading keeps the clamp).
3. Conclusion/outro body paragraphs: `margin-top` 1.25rem → 1rem; `font-family: Switzer`; `font-size: 1.3rem`; `font-weight: 300` (Light).
4. `.kluppi-carousel-text`: `font-size` clamp → `1.3rem`; `.kluppi-carousel-card` now `display:flex; flex-direction:column; justify-content:center` so the card text is vertically centered (cards are already equal-height). Mobile `≤767px` keeps its `1.125rem` carousel-text override (flagged).

Typecheck (`tsc --noEmit`) passes.

### 2026-06-20 — Pain-points: move closing copy + CTA into the grid as a 4th row (requested)

Restructured the bottom of the "De câte ori ai…" section: removed the separate centered `.kluppi-painpoints-cta-block` and folded its copy + CTA into the diagonal grid (now 2×**4**).

**`src/app/page.tsx`**
- `.kluppi-painpoints-conclusion` is now a div (was an `<h2>`): holds the H2 "Nu ți s-a întâmplat doar ție." **plus** the paragraph "A devenit din ce în ce mai rară…", left-aligned, in the same cell (col 2 / row 3).
- New `.kluppi-painpoints-outro` cell (col 1 / **row 4**): H2 "Noi ne-am săturat de toate astea." + the left-aligned remainder "Și am creat Kluppi: …" + a `.kluppi-painpoints-cta` group (CTA "Rezervă-ți locul în club" + microcopy "Rapid, doar cu nume și e-mail."). The right cell of row 4 is left empty.
- The old two-paragraph sentence was split: "Noi ne-am săturat de toate astea." → H2; the rest → body.

**`src/app/globals.css`**
- `.kluppi-painpoints-inner` grid rows `auto auto auto` → `auto auto auto auto`.
- Heading font rule now targets `.kluppi-painpoints-heading, .kluppi-painpoints-h2` (the inner H2s); added `.kluppi-painpoints-outro { grid-column: 1/2; grid-row: 4 }`.
- Removed `.kluppi-painpoints-cta-block` rules; added left-aligned body spacing for the conclusion/outro cells and `.kluppi-painpoints-cta { display: inline-block; text-align: center }` so the microcopy stays centered under the button while the group sits left in the cell.
- `≤991px` collapse now also spans `.kluppi-painpoints-outro` full-width.

Typecheck (`tsc --noEmit`) passes.

### 2026-06-20 — "Kluppi este pentru tine dacă…" — duplicated benefits grid (requested)

Section #6. Per the user's revised plan (no longer the `section-about` 2×2 idea): **duplicated the benefits `section-stats` block** and placed the copy under `.kluppi-steps`. Same 3×3 layout/classes; only the copy changed. Copy is the exact RO from `Teaser Landing Page Copy.docx` (incl. the curly quotes “de neratat”).

**`src/app/page.tsx`**
- Inserted a second `<section className="section-stats background-black">` between the steps section and `.section-about`. **No `id`** (the original keeps `id="services"`; avoided a duplicate id).
- Reuses every `.kluppi-benefits-*` / `.kluppi-benefit*` class (identical layout), so **no CSS change**. Mapped the 4 items b1–b4 in reading order: "Îți place să cumperi, nu să fii influențat" / "Știi deja toate trucurile de marketing" / "Nu vrei motive să cumperi mai mult" / "Preferi să alegi tu momentul potrivit". Heading "Kluppi este pentru tine dacă…", CTA microcopy "Surpriză specială la lansare.".
- Left as-is from the duplicate (flagged to user): the `ShieldCheck` icon still sits on card b1 (was specific to "încredere la checkout"), and the 3 images are the same Unsplash placeholders as the benefits section.

Typecheck (`tsc --noEmit`) passes.

### 2026-06-20 — Steps timeline: fix invisible line + dead animation (bug fix, requested)

The line wasn't rendering and nothing animated. Root cause: positions were measured with `offsetTop`, but the step rows carry a CSS `transform` (from the `data-reveal` entrance), which makes `offsetTop` resolve against each step instead of the whole timeline — so every dot reported ~the same offset → a ~1px (invisible) track and all dots flipping together instead of in sequence. (Confirmed by the symptom: dots were getting coloured but uniformly, i.e. the scroll handler *was* running.)

**`src/app/HowItWorks.tsx`**
- `render()` now measures dot centres + track span with `getBoundingClientRect` relative to the timeline (transform-proof) instead of `offsetTop`. Fill % and each dot's ramp use the same coordinate space, so the line fills and dots brighten in order as you scroll.

**`src/app/globals.css`**
- `.kluppi-steps-line`: added `top: 0; bottom: 0;` as a visible fallback so the track shows even if the JS measurement ever bails (JS still overrides with the precise first→last-dot span).

Typecheck passes. (Verification note: tried to drive the running dev server via the preview tool but it couldn't attach cleanly — nvm's node wasn't on the spawned shell's PATH and port 3000 was taken; relied on the screenshot's diagnostic signature instead.)

### 2026-06-20 — Steps timeline: more visible line + scroll-progress recolour (requested)

**`src/app/globals.css`**
- `.kluppi-steps-line` (track): width `3px` → `5px`; colour faded Dare Devil `rgba(255,91,34,0.2)` → **Cassis-tint `rgba(53,30,40,0.22)`** so the unfilled line is clearly visible and the Dare Devil fill reads as progress. Fill radius bumped to match.
- `.kluppi-step-dot`: removed the binary `.is-active` rule + its CSS transition (the dot colour/scale is now driven per-frame by JS); base background set to `rgba(255,91,34,0.25)`.

**`src/app/HowItWorks.tsx`**
- Dots now ramp **smoothly** instead of snapping: each dot interpolates its background `rgba` alpha `0.25 → 1` and scales `1 → 1.15` over a 160px window as the scroll "scan line" approaches and reaches it (mirrors the fractional-opacity gradient in the user's reference snippet).

Typecheck (`tsc --noEmit`) passes.

### 2026-06-20 — "Cum funcționează?" steps timeline (new section, requested)

Section #5 of the teaser build — a brand-new section (no template equivalent), inspired by a reference insurance "Secure Your Policy" stepper the user shared. Adapted from the reference's 3-card zig-zag to a **5-step alternating timeline** with a **scroll-filled** centre line + dots that brighten as you scroll (user chose animated; cards Cassis / copy Lemon). Inserted between the benefits section (`section-stats`) and `.section-about`, per the section plan order. Copy is the exact RO from `Teaser Landing Page Copy.docx`.

**`src/app/HowItWorks.tsx`** (new client component)
- Renders the 5 steps (Pasul 01–05) alternating left/right of a centre line. A scroll handler (rAF-throttled, like the hero parallax) sets the line track to span first→last dot centre, grows a Dare Devil fill as a "scan line" (60% down the viewport) descends, and toggles `.is-active` on each dot as the fill reaches it. Respects `prefers-reduced-motion` (fills fully, no motion). Steps use the existing `data-reveal` entrance with a per-step stagger.

**`src/app/page.tsx`**
- Imported `HowItWorks`; added `<section className="kluppi-steps">` (between benefits and About): centered H2 "Cum funcționează?", `<HowItWorks />`, and a CTA block ("Rezervă-ți locul în club" + microcopy "În mai puțin de un minut.", reusing `.kluppi-hero-cta` / `.kluppi-hero-trust`).

**`src/app/globals.css`** (appended a scoped `.kluppi-steps*` block)
- Section Lemon Sorbet, centered Bricolage/Dare Devil heading. Timeline = flex column of step rows; absolute line track (`--line-x: 50%`) with a Dare Devil fill. Each step a 3-col grid (`1fr auto 1fr`): card left (odd) / right (even), dot in the centre column. Dots: faded Dare Devil → solid + slight scale when `.is-active`, Lemon ring. Cards Cassis with Dare Devil "Pasul 0X" label + Lemon title/desc.
- `≤767px`: line moves to the left (`--line-x: 1.25rem`), grid → `2.5rem 1fr` so every card stacks to the right of the line.

Typecheck (`tsc --noEmit`) passes. (No new deps; the step cards have no icons, matching the reference.)

### 2026-06-20 — Benefits section: move + restyle pass (requested)

Five tweaks to the benefits section built earlier today.

**`src/app/page.tsx`**
1. **Moved** the whole `<section className="section-stats" id="services">` from between `.section-about` and `.section-portfolio` to immediately **after `.kluppi-painpoints`** (now: painpoints → benefits → about → …). Markup moved verbatim aside from the changes below.
2. **Icon on b1:** imported `ShieldCheck` from `lucide-react`; added `<ShieldCheck className="kluppi-benefit-icon" …>` as the first child of card b1 (top-left).
3. Wrapped each card's `h3 + p` in a `.kluppi-benefit-text` div (lets the icon sit top while text sits bottom).
4. **Swapped b2 ↔ b3 copy:** b2 now "Beneficii noi, în fiecare lună"; b3 now "Oferte relevante pentru tine" (grid positions unchanged).

**`src/app/globals.css`** (`.kluppi-benefit*` rules)
- Cards: background `#FFFFFF` → **Cassis `#351E28`**; title + description color Cassis → **Lemon Sorbet `#FFF0BC`**.
- `justify-content: flex-end` so card text sits **bottom-left**; b1 uses `space-between` (icon top, text bottom). Added `.kluppi-benefit-icon` (2.5rem, Dare Devil) and `.kluppi-benefit-text` (flex column). Shadow nudged 0.08 → 0.12.

Typecheck (`tsc --noEmit`) passes. (`lucide-react` already a dependency from the carousel — no new install.)

### 2026-06-20 — Benefits section ("Ce te așteaptă în Kluppi?") — repurposed stats grid (requested)

Section #4 of the teaser build. The `section-stats` block was repurposed per the user's layout sketch: drop the big-number stat cards; turn the grid into a 3×3 arrangement of 4 benefit cards + 3 images, with two tall cells (benefit 1 spans col 1 / rows 1–2; image 3 spans col 3 / rows 2–3 — the user's "merge cells 6 and 9"). Copy is the exact RO from `Teaser Landing Page Copy.docx`.

**`src/app/page.tsx`** (inside the existing `<section className="section-stats" id="services">`, `.stats-component` only — wrapper/section/id untouched)
- Replaced the `stats-content` intro grid + `stats-list` (stat-numbers + 2 images, all Webflow node-ID placements) with:
  - H2 `.kluppi-benefits-heading` "Ce te așteaptă în Kluppi?".
  - `.kluppi-benefits-grid` with 4 `<article className="kluppi-benefit">` cards (title + description) and 3 `.kluppi-benefit-img` cells. Source order = desktop reading order (b1, i1, b2, b3, i3, i2, b4).
  - `.kluppi-benefits-cta-block`: CTA "Rezervă-ți locul în club" (reuses `.kluppi-hero-cta`) + microcopy "Pleci oricând, fără explicații." (reuses `.kluppi-hero-trust`).
- **Images are placeholders** (user still sourcing): reused the two existing stats Unsplash photos (lee-campbell → i1, ales-nesetril → i3) + the About photo (mk-2 → i2). `.stat-image` class kept on the `<img>`s for object-fit.
- No icons on the benefit cards (matches the spec; can add Lucide ones if wanted).

**`src/app/globals.css`** (appended a scoped `.kluppi-benefits-*` block)
- Heading typography matches `.kluppi-painpoints-heading` (Bricolage 700, Dare Devil, clamp size).
- `.kluppi-benefits-grid`: `grid-template-areas` `"b1 i1 b2" / "b1 b3 i3" / "i2 b4 i3"`, 3 equal cols, 1.5rem gap.
- `.kluppi-benefit` cards: white, 6px radius, soft shadow; title Cassis (Bricolage 700), description Cassis (Switzer 400).
- `.kluppi-benefit-img`: fills its (sometimes tall) cell — overrides `.stat-image`'s `aspect-ratio:3/2` to `auto` + `object-fit:cover`, `min-height:14rem`.
- `≤991px`: grid collapses to a single stacked column (areas cleared, items `grid-area:auto`).

Typecheck (`tsc --noEmit`) passes.

### 2026-06-20 — Pain-points carousel section ("De câte ori ai…") (requested)

New section inserted under `.kluppi-band`, built in the style of the Webflow `w-slider` the user referenced (centered slide, side arrows, dots) but as a working React carousel (Webflow's slider JS isn't in this project). Background adapted to Cassis for contrast (user granted latitude on bg/fonts/colors).

**`src/app/PainPointsCarousel.tsx`** (new file, client component)
- React carousel: 4 slides (the teaser pain points), `translateX` track with 0.5s transition, prev/next arrows (disabled at ends, non-infinite like the reference), dot nav. Each slide has a Lucide icon (`Tag`, `BadgePercent`, `Truck`, `Timer`) + the question text. Arrows use Lucide `ArrowLeft`/`ArrowRight`. Inactive slides `aria-hidden`.

**`src/app/page.tsx`**
- Imported `PainPointsCarousel`; added `<section className="kluppi-painpoints">` between `.kluppi-band` and `.section-about`: H2 "De câte ori ai…", the carousel, the two closing paragraphs, and a CTA ("Rezervă-ți locul în club" reusing `.kluppi-hero-cta`) + note "Rapid, doar cu nume și e-mail.".

**`src/app/globals.css`**
- `.kluppi-painpoints` (Cassis bg, 6rem padding / 4rem mobile) + heading (Bricolage 700, Dare Devil), carousel (viewport/track/slide, Dare Devil arrows & active dot, Lemon Sorbet text & muted dots), and outro/CTA/note styling.

Typecheck (`tsc --noEmit`) passes. Note: lucide-react is a new import — dev server may need a restart to resolve it.

### 2026-06-20 — Pain-points: conclusion H2 + hero-style CTA block + 6px radius (requested)

**`src/app/page.tsx`**
- Bottom-right grid cell is now an H2 "Nu ți s-a întâmplat doar ție." (`.kluppi-painpoints-conclusion`); removed the old outro paragraphs/CTA from the grid.
- Added a centered block below the grid (`.kluppi-painpoints-cta-block`) holding the remaining two paragraphs ("A devenit din ce în ce mai rară…" / "Noi ne-am săturat…") + CTA + note, reusing the hero classes `text-size-large kluppi-hero-body`, `kluppi-hero-cta`, `kluppi-hero-trust`.

**`src/app/globals.css`**
- Shared the H2 typography across `.kluppi-painpoints-heading` + `.kluppi-painpoints-conclusion`; conclusion placed bottom-right (`grid-column 2/3`, row 3).
- Added `.kluppi-painpoints-cta-block` (max-width 44rem, centered, margin-top 3.5rem) with paragraph/CTA spacing.
- Removed the now-unused `.kluppi-painpoints-outro/-lead/-note` rules; updated the ≤991 collapse and ≤767 query accordingly.
- Added `border-radius: 6px` to `.kluppi-carousel` (band) and `.kluppi-carousel-card`.

### 2026-06-20 — Pain-points section as a diagonal 2×3 grid (requested)

**`src/app/globals.css`** (CSS only; markup unchanged)
- Made `.kluppi-painpoints-inner` a 2-col × 3-row grid (`1fr 1fr`, column-gap 5rem, row-gap 2.5rem, align-items start), echoing the stats-content diagonal:
  - `.kluppi-painpoints-heading` → top-left cell (`grid-column 1/2`, row 1); removed its `margin-bottom` (row-gap handles spacing).
  - `.kluppi-carousel` → full middle row (`grid-column 1/-1`, row 2).
  - `.kluppi-painpoints-outro` → bottom-right cell (`grid-column 2/3`, row 3); removed its `margin-top`.
- Added a `≤991px` collapse: grid → single column, all three children full-width (stacks heading → carousel → outro on tablet/mobile).

### 2026-06-20 — Redesign pain-points carousel to match reference (requested)

Reworked the carousel aesthetic to match the Webflow testimonial example the user shared.

**`public/`**
- Added `PainPoints.jpg` (shopping-bags lifestyle photo) from `~/Downloads/`.

**`src/app/PainPointsCarousel.tsx`**
- Removed per-slide Lucide icons and the dot nav. Slides are now plain text in white cards. Kept one-card-at-a-time `translateX` track + prev/next arrows; arrows moved into a bottom-left row (`.kluppi-carousel-arrows`).

**`src/app/globals.css`** (replaced the whole pain-points block)
- Section background Cassis → Lemon Sorbet; everything left-aligned. Heading left-aligned, Dare Devil, sized to match `heading-style-h2` (clamp → 3.5rem).
- Carousel band now uses `/PainPoints.jpg` as `background-size: cover` background; white left-aligned cards (`max-width: 40rem`, shadow) slide over it. Arrows are circular, light, bottom-left.
- Outro/lead/CTA/note left-aligned, Cassis on Lemon, `text-size-medium` sizing (like the stats intro paragraph).

Typecheck passes. (Page markup in `page.tsx` unchanged — only styling + component internals.)

### 2026-06-20 — Intro band tweaks + lighten 200 weights (requested)

**`src/app/globals.css`**
1. All extra-light `font-weight: 200` → `300` (light) for readability: `.kluppi-hero-eyebrow` and `.kluppi-hero-trust`. (Switzer 300 already loaded.)
2. `.kluppi-band-title` font-size → `2rem` desktop/tablet, `1.5rem` ≤767px (keeps ~0.75 proportion; overrides the inherited `.text-size-large` size).
3. `.kluppi-band-sub` font-size `1rem` → `1.3rem`.
4. `.kluppi-band` padding `5rem` → `7.5rem` (≤767px `3.5rem` → `5.25rem`, scaled ×1.5 to match).

### 2026-06-20 — New minimal intro band above About (requested)

First section of the teaser rebuild (see the section plan). New section inserted between the hero and `section-about`.

**`src/app/page.tsx`**
- Added `<section className="kluppi-band">` above `.section-about`, with two centered lines: title "Coduri dedicate · Doar pentru membri · Exact pe gustul tău" (`.text-size-large kluppi-band-title`) and sub "Te alături acum? Primești o surpriză specială la lansare." (`.kluppi-band-sub`). Both use the existing `data-reveal` entrance.

**`src/app/layout.tsx`**
- Added weight `300` to the Switzer font load (`switzer@200,400,500,600` → `…200,300,400,500,600`) for the Light sub-line.

**`src/app/globals.css`**
- `.kluppi-band`: Lemon Sorbet background, centered, `5rem` vertical padding (`3.5rem` ≤767px). `.kluppi-band-inner` max-width 60rem, centered.
- `.kluppi-band-title`: Bricolage Grotesque bold (700), Cassis; size inherited from `.text-size-large` (matches the hero body under the H1).
- `.kluppi-band-sub`: Switzer Light (300), Dare Devil, `1rem` (matches the hero eyebrow).

### 2026-06-19 — Hero section rebrand (requested)

Scope: hero `<header id="top">` only. Background, copy, H1/body typography, and CTA changed per request. Nothing outside the hero was altered. The template's parallax image columns inside the hero were left untouched (pending decision).

**`src/app/page.tsx`**
- Hero `<header>` class `section-header background-black` → `section-header kluppi-hero` (removed the black background from this one element; added a hook class for the new background). The `.background-black` rule itself was not touched, so other sections still using it are unaffected.
- Replaced the hero `.header-content` inner copy:
  - Added eyebrow "Lansăm în curând".
  - H1 → "Coduri și avantaje exclusive, direct de la branduri, în fiecare lună" (removed `text-allcaps` and the `mid-grey-span`; added `kluppi-hero-h1`).
  - Body → "Lucrăm direct cu brandurile și îți aducem, lună de lună, coduri de reducere și beneficii reale, create special pentru membrii Kluppi." (added `kluppi-hero-body`).
  - Replaced the two-button group (Discover / Learn more, each with `<ButtonArrow />`) with a single icon-free CTA "Rezervă-ți locul în club" (`kluppi-hero-cta`, href `#contact`) plus a trust line "Înscriere gratuită · Fără obligații" (`kluppi-hero-trust`).
  - Kept `z-index-2` on the text wrappers so copy stays above the retained parallax images.
- The `ButtonArrow` component is still used by other sections, so it remains in the file.

**`src/app/layout.tsx`**
- Added two `<link>` tags loading Bricolage Grotesque (Google Fonts) and Switzer (Fontshare). The existing Inter/Manrope link and both CSS imports were left in place.

**`src/app/globals.css`**
- Appended a "Kluppi hero" block (scoped to `.kluppi-hero` / `.kluppi-hero-*`): Lemon Sorbet `#FFF0BC` background; H1 = Bricolage Grotesque 700, Dare Devil `#FF5B22`, sentence case; body = Switzer 400, Cassis `#351E28`; solid Dare Devil pill CTA; eyebrow + trust line styling; and a `z-index` rule keeping hero text above the parallax images. No existing rules were modified or removed.

**Files created earlier (project setup, not template code):** `public/logo.svg` (copied from the supplied Kluppi Dare Devil logo).

### 2026-06-19 — Navbar logo swap (requested)

Scope: navbar logo only. Parallax photo columns left exactly as in the original Profile X code (confirmed by user — placeholders for now).

**`public/logo.svg`**
- (Re-)copied the supplied `Kluppi Logo Dare Devil.svg` to `public/logo.svg`.

**`src/app/page.tsx`**
- Navbar logo `<img>` `src={LOGO}` → `src="/logo.svg"`, and `alt=""` → `alt="Kluppi"`. Edited the navbar `<img>` directly (not the shared `LOGO` constant), so the footer logo, which also uses `LOGO`, is unchanged.

### 2026-06-19 — Navbar restyle + eyebrow weight + desktop H1 size (requested)

**`src/app/page.tsx`**
- Removed the navbar "Get in touch" button (the `<a class="button is-alternate is-navbar">` with its `<ButtonArrow />`) from `.navbar-wrapper`. `ButtonArrow` is still used elsewhere, so the component remains.

**`src/app/layout.tsx`**
- Added weight `200` to the Switzer font load (`switzer@400,500,600` → `switzer@200,400,500,600`) so the eyebrow can use extra light.

**`src/app/globals.css`**
- `.kluppi-hero-eyebrow` font-weight `500` → `200` (extra light). Font (Switzer), color (Cassis), and uppercase were already in place, so only the weight changed.
- Added `.navbar-component { background-color: #FFF0BC }` (Lemon Sorbet) — overrides the template's dark background by source order. The template's `border-bottom` and backdrop blur were left as-is.
- Added Dare Devil (`#FF5B22`) `background-color` to the hamburger lines (`.navbar-menu-button .menu-icon-line-top/-middle/-middle-base/-bottom`); 2-class selectors override the template's `var(--white)`.
- Added `@media (min-width: 992px) { .kluppi-hero-h1 { font-size: 3.5rem } }` — half of the template's desktop `.heading-style-h1` size (`7rem`). Smaller breakpoints are unchanged.

### 2026-06-19 — H1 sizes per breakpoint (requested)

**`src/app/globals.css`**
- Replaced the single desktop-only H1 override with four mutually-exclusive breakpoint ranges on `.kluppi-hero-h1`:
  - `≥992px` (desktop): `4.9rem`
  - `768–991px` (tablet): `3.9rem`
  - `480–767px` (mobile landscape): `2.9rem`
  - `≤479px` (mobile portrait): `2.3rem`
- Breakpoints match Webflow's; ranges are mutually exclusive so each band resolves to one value (no cascade-order/`vw` ambiguity). Nothing else changed.

### 2026-06-19 — H1 switched to fluid clamp() (requested)

**`src/app/globals.css`**
- Replaced the four H1 breakpoint media queries with a single fluid declaration on the base `.kluppi-hero-h1` rule: `font-size: clamp(2.3rem, 6.75vw + 0.72rem, 4.9rem)`. Anchored to ≈2.3rem at 375px and ≈4.9rem at 992px, matching the previously dialed-in endpoints while scaling smoothly between. Removed the four `@media` blocks. No other rules touched.

### 2026-06-19 — H1 re-anchored to cap ~4 lines on small phones (requested)

**`src/app/globals.css`**
- Re-anchored the H1 `clamp()` so the small-screen value drops from `2.3rem` to ~`2rem` at 375px, letting the headline wrap to ~4 lines on iPhone SE instead of 5: `clamp(2.3rem, 6.75vw + 0.72rem, 4.9rem)` → `clamp(2rem, 7.52vw + 0.24rem, 4.9rem)`. Desktop ceiling unchanged (4.9rem); mid-range values barely shift.

### 2026-06-19 — Removed navbar bottom border (requested)

**`src/app/globals.css`**
- Added `border-bottom: none` to the `.navbar-component` rule to remove the template's `1px solid #363636` divider under the navbar.

### 2026-06-19 — Replaced hero images with Kluppi photos (requested)

**`public/`**
- Added `Hero1.jpg`–`Hero6.jpg` (copied from the user's `~/Downloads/Hero Images/`, ~290–420KB each).

**`src/app/page.tsx`** (hero `<img>` tags only)
- Repointed all six hero images from the Webflow CDN Unsplash URLs to the local files, arranged to alternate tone (light/dark) per column and spread the two orange-heavy shots diagonally:
  - Left column: `is-image-1`→Hero1 (light), `is-image-2`→Hero5 (dark), `is-image-3`→Hero2 (light), `is-image-4`→Hero6 (vibrant orange)
  - Right column: `is-image-5`→Hero3 (light/orange), `is-image-6`→Hero4 (dark)
- _Superseded by the swap below._

### 2026-06-19 — Swapped two hero image pairs (requested)

**`src/app/page.tsx`** (hero `<img>` srcs only)
- Swapped Hero4 ↔ Hero5 and Hero3 ↔ Hero1 at their slots. Resulting arrangement:
  - Left column: `is-image-1`→Hero3, `is-image-2`→Hero4, `is-image-3`→Hero2, `is-image-4`→Hero6
  - Right column: `is-image-5`→Hero1, `is-image-6`→Hero5

### 2026-06-19 — Hero image reshuffle + added Hero8 (requested)

**`public/`**
- Added `Hero8.jpg` (the "%" voucher gift-bag flat lay) from `~/Downloads/Hero Images/`. `Hero7.png` exists in that folder but is not used in the layout yet.

**`src/app/page.tsx`** (hero `<img>` srcs only)
- Applied: swap Hero5 ↔ Hero1, replace Hero1 with Hero8, swap Hero4 ↔ Hero6 (the last per the user's clarification that step 3 was a Hero4/Hero6 position swap). Resulting arrangement:
  - Left column: `is-image-1`→Hero3, `is-image-2`→Hero6, `is-image-3`→Hero2, `is-image-4`→Hero4
  - Right column: `is-image-5`→Hero5, `is-image-6`→Hero8

### 2026-06-19 — Recolour below-hero sections to Kluppi (requested)

**`src/app/globals.css`**
- For the five non-footer sections below the hero (`.section-about`, `.section-stats`, `.section-portfolio`, `.section-banner-cta`, `.section-contact`): background → Lemon Sorbet `#FFF0BC`, default text → Cassis `#351E28` (overrides the template's `.background-black` black/white and `.section-banner-cta` black).
- Headings → Dare Devil `#FF5B22`: `.heading-style-h2/-h3/-h5/-h6`, `.cta-heading-top`, `.cta-heading-bottom`, and `.mid-grey-span` (the grey heading accent), scoped within those sections.
- Grey body copy (`.text-colour-grey`) within those sections → Cassis.
- Footer (`.footer-component`) and the hero left untouched. Left as-is (not "text", own backgrounds): `.portfolio-tag-item` grey pills (white text), the `.form-input` field (white/black), and `.error-text` (red error state) — flagged to the user.

### 2026-06-19 — Nav menu: remove socials + restyle (requested)

**`src/app/page.tsx`**
- Removed the socials block (`.navbar-bottom` → `.navbar-social-list` with the `socials.map(...)`) from the full-screen nav menu. The `socials` const is kept — the footer still renders it.

**`src/app/globals.css`**
- `.navbar-menu`: background → Lemon Sorbet `#FFF0BC` (was black), color → Cassis `#351E28` (was white).
- `.navbar-menu .navbar-link`: color → Cassis, font-family → Switzer, `text-transform: none` (sentence case). Overrides the template's white/uppercase/Manrope and the `.w--current` color by source order. Link labels (Home/About/Projects/Contact) left unchanged per request — to be revisited.

### 2026-06-19 — Animated hamburger → X on click (requested)

**`src/app/globals.css`**
- Added a CSS hamburger→X animation on `.navbar-menu-button`, driven by the `w--open` class that `page.tsx` already toggles via the `menuOpen` state — no JS change needed. Mirrors the original Webflow motion: top/bottom bars collapse onto the middle (forming a single line), then `.menu-icon-line-middle` rotates 45° and `.menu-icon-line-middle-base` rotates 90° (→135°) to form the X; reverses on close. Two-stage sequencing via transition delays (0.2s) on transform/opacity, set per direction. Additive; nothing existing removed.

### 2026-06-19 — Hero trust line tweaks (requested)

**`src/app/globals.css`**
- `.kluppi-hero-trust`: `margin-top` `1.25rem` → `1rem` (−20%); `font-weight` `400` → `200` (Switzer 200 already loaded).

### 2026-06-19 — Hero CTA size 1.25rem on desktop (requested)

**`src/app/globals.css`**
- Added `@media (min-width: 992px) { .kluppi-hero-cta { font-size: 1.25rem } }`. The base CTA font-size (`1.0625rem`) is kept for tablet/mobile; desktop bumps to `1.25rem`. Padding unchanged.

### 2026-06-19 — Reduced hero content padding 25% (requested)

**`src/app/globals.css`**
- Added a scoped `.kluppi-hero .header-content` override reducing the template's vertical padding by 25% at each breakpoint: desktop `7rem`→`5.25rem`, `≤991px` `6rem`→`4.5rem`, `≤767px` `4rem`→`3rem` (top only; bottom stays `4.5rem`, mirroring the template). 2-class selector wins over the template's 1-class rule; `webflow.css` untouched, nothing removed.

### 2026-06-19 — Swapped Hero2 ↔ Hero4 (requested)

**`src/app/page.tsx`** (hero `<img>` srcs only)
- Swapped Hero2 and Hero4 positions: `is-image-3` Hero2→Hero4, `is-image-4` Hero4→Hero2. Current arrangement:
  - Left column: `is-image-1`→Hero3, `is-image-2`→Hero6, `is-image-3`→Hero4, `is-image-4`→Hero2
  - Right column: `is-image-5`→Hero5, `is-image-6`→Hero8
- Removed the stale `srcSet` on `is-image-1` (it still pointed at CDN variants). `alt`/`sizes` left as-is.
- Scoped edits with the `header-image` class so the reused `ales-nesetril` photo in the stats section was left untouched.

### 2026-06-19 — Fixed hero parallax image animation (requested)

**`src/app/page.tsx`** (parallax `useEffect` only)
- Reworked the scroll handler so each image column drifts by exactly its own overflow past the viewport (`offsetHeight − innerHeight`), recomputed each frame, instead of fixed viewport multiples (`vh × 1.7` / `vh × 2.05`). The old multiples shifted the shorter 2-image right column by ~1.4× its own height, so it scrolled fully off and left an empty gap — the "not seamless" behaviour. The new approach matches the original Webflow model (movement proportional to each column's height) and keeps both columns drifting smoothly through the sticky viewport.
- Throttled scroll updates with `requestAnimationFrame` for smoother motion; recomputing heights each frame keeps it correct as the lazy-loaded images finish loading. No markup, CSS, or other logic changed.
