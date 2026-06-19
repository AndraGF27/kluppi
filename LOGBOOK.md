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
