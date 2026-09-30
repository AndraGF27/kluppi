# Task 06 — Load Vercel Web Analytics only after "Accept"

> **DONE by Claude on `kluppi-rebrand`, 2026-10-01 — not handed to Cody** (Andra: "I think you can do this
> task yourself"). **Speed Insights was gated too**: after the lawyer's 2026-09-30 draft said it also needs
> consent or a documented exception, Andra decided "put it behind 'Accept'". The "Speed Insights is NOT part
> of this task" section below is superseded. Post-launch site only; `main` (the waitlist site) is unchanged.

**Owner:** Cody · **Reviewer:** Claude (PASS/FAIL on the diff) · **Approved by Andra:** 2026-09-30

## Why
The lawyer's answer (2026-09-29), verbatim: „Faptul că Vercel nu setează cookie nu rezolvă singur cerința
din art. 4(5)–(6) al Legii 506/2004: potrivit EDPB, și un script care cere browserului să trimită informații
poate intra sub această regulă. Am marcat aceeași verificare pentru Vercel pe site-ul public.” So Vercel Web
Analytics on kluppi.com needs the visitor's consent **before it loads**, like Google Analytics, Google Tag
Manager and theMarketer, which the cookie banner already holds back until "Accept". Today `<Analytics />` is
mounted unconditionally in `src/app/layout.tsx`, so it loads for every visitor. Andra approved gating it.

**Vercel Speed Insights is NOT part of this task.** The live cookie policy lists it as technical monitoring
that needs no consent, and the lawyer's new draft leaves its classification to be confirmed. Leave
`<SpeedInsights />` exactly where it is.

## What to change
1. Branch from `main`: `consent-gated-vercel-analytics`. Never push `main`.
2. In `src/app/layout.tsx`, remove `<Analytics />` and its import. In the comment block above the
   consent-gated scripts (the one listing Google Analytics, Google Tag Manager and theMarketer as loaded only
   after "Accept"), add Vercel Web Analytics to that list.
3. In `src/app/CookieBanner.tsx`, render `<Analytics />` (from `@vercel/analytics/next`) inside
   `ConsentedScripts`, i.e. only when `consent === "accepted"`. Add it to the file's header comment next to
   GA4, GTM and theMarketer.
4. Refusing ("Refuz") must not load it. A visitor who accepted on an earlier visit must get it on page load
   (the existing `consent === "accepted"` path already covers this — keep it that way).

## Out of scope — do NOT touch
- `<SpeedInsights />` (see above).
- The cookie-policy page and any other legal copy (`src/app/(legal)/**`). Where it now describes Vercel Web
  Analytics as loading without consent, leave it: legal text changes go to Andra's lawyer, not into code.
  List any such sentence in your report instead.
- A permanent "cookie settings" link: Andra decided it is not needed.
- Any other script, the banner's look, its wording, or the `kluppi-cookie-consent` storage key.

## Report back (required)
- Files touched, what changed, and how you verified it.
- `npm run build` result.
- The sentences in legal pages that no longer match (quote them, do not edit them).
- Add a LOGBOOK.md entry as usual.

## After PASS (Claude)
Merge into `main` (live) and into `kluppi-rebrand` (the post-launch site), so the fix survives the launch
cutover. Note for the app: the admin dashboard's "Visited the site" figure comes from Vercel Web Analytics on
kluppi.com. Once this ships it counts only visitors who accepted, like Google Analytics does — flag it to
Andra so the dashboard's wording can follow.
