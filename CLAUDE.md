# Kluppi marketing site — kluppi.com

Single-page teaser/waitlist landing page for Kluppi — a shopping club with codes and benefits from brands. All site copy is in Romanian. Becomes the full marketing site at launch; roadmap: `~/Documents/Kluppi/WEBSITE_PLAN.md`. The product app is a separate repo (`~/Documents/kluppi-app`).

## Stack & how to run it
- **Next.js** (App Router) + TypeScript. The code lives at the repo root.
- Requires **Node 20+** (`nvm use 22`) — Node 17 fails to build.
- Dev: `npm install`, then `npm run dev` → http://localhost:3000

## Branch workflow (strict)
- All edits go on `kluppi-rebrand`. Preview: https://kluppi-git-kluppi-rebrand-kluppi.vercel.app (401 when logged out = correct; open it logged into Vercel).
- `main` = production www.kluppi.com and auto-deploys. Fast-forward `main` only when Andra explicitly says "ship it" — never otherwise.

## Where things live
- Main page: `src/app/page.tsx`. Sections: `BenefitsCards.tsx`, `HowItWorks.tsx`, `PainPointsCarousel.tsx`, `SplitBanner.tsx`. Legal pages: `src/app/(legal)/`. Cookie banner: `CookieBanner.tsx`.
- Signup form posts to `src/app/api/add-subscriber/route.ts` (theMarketer double opt-in, `Waitlist` tag). Sibling theMarketer wrappers: `remove-subscriber`, `update-tags`, `subscriber-status`. All need `THEMARKETER_REST_KEY` + `THEMARKETER_CUSTOMER_ID` (`.env.local` locally, Vercel in prod). (The old `/api/subscribe` Vercel KV route is gone.)
- Analytics are **consent-gated in `src/app/CookieBanner.tsx`**, not in `layout.tsx`: GA4 `G-LNKD7TBG3N`, GTM `GTM-5673VBFG` and the theMarketer loader mount only after the visitor accepts, so nothing fires and no cookie is set beforehand. Don't move them into `layout.tsx` — that would load them unconditionally and break consent. Only Vercel Analytics loads from `layout.tsx` (cookieless).

## Design tokens (in `:root`, `src/app/globals.css`)
- Accent: `#f5531c` (Dare Devil) · Background: `#fff0bc` (Lemon Sorbet) · Text: `#351e28` (Cassis).
- The accent is deliberately brighter than the brand-bible Dare Devil `#FF5B22` — don't "correct" it.
- Fonts: Bricolage Grotesque (display) · Switzer 300 (body). Typography is fluid (`clamp()`) via `--fs-*` tokens.
- Always style via the tokens (`var(--accent)` etc.), never raw hex in code.

## Rules
- **Don't read `LOGBOOK.md` unless explicitly asked.** It's a long history archive (~25k tokens); normal edits don't need it.
- `src/app/webflow.css` is CSS inherited from the original Webflow template — touch only on explicit request.

## Token-economy tip
Specific requests (e.g. "change the text in `HowItWorks.tsx`") cost far less than vague ones that force exploring the whole project. Use `/clear` between unrelated tasks.
