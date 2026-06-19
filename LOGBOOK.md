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
