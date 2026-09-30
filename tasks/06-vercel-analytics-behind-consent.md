# Task 06 — Vercel Web Analytics and Speed Insights only after "Accept" — DONE (record, not instructions)

**Done by Claude on `kluppi-rebrand`, 2026-09-30 (commit 3e0ecb2) — not handed to Cody.** Andra: "put it
behind 'Accept'. And I think you can do this task yourself" (2026-09-30).

## What was done
- `src/app/layout.tsx`: `<Analytics />` and `<SpeedInsights />` no longer mount for every visitor.
- `src/app/CookieBanner.tsx`: both mount inside `ConsentedScripts`, i.e. only when `consent === "accepted"`,
  alongside GA4, GTM and theMarketer. "Refuz" loads neither.

## Why
The lawyer (2026-09-29): „Faptul că Vercel nu setează cookie nu rezolvă singur cerința din art. 4(5)–(6) al
Legii 506/2004: potrivit EDPB, și un script care cere browserului să trimită informații poate intra sub
această regulă.” Their 2026-09-30 draft extended the same point to Speed Insights, and Andra agreed.

## Scope decision — post-launch site only
This lives on `kluppi-rebrand` (the post-launch site), which goes live with the new cookie policy. The live
waitlist site (`main`) is unchanged and still loads both tools for every visitor, under its own older
policy. **Open question for Andra (PLAN.md, G3):** the lawyer's advice names "site-ul public", so `main`
may need the same change before launch.

## Now out of date on this branch — for the lawyer, NOT edited here (legal copy)
`src/app/(legal)/politica-cookies/page.tsx` still describes Speed Insights as needing no consent:
- the table row "Vercel Speed Insights … Nu, în măsura în care este utilizat exclusiv pentru monitorizarea
  performanței tehnice …" (≈ lines 225–237);
- the paragraph "Vercel Speed Insights este utilizat pentru monitorizarea performanței tehnice a site-ului …"
  (≈ lines 255–258).
The new policy text from the lawyer replaces this page before launch.

## Still to build
- A permanent "Setări cookies" link in the footer that reopens the choice (Andra, 2026-09-30: "noted";
  the lawyer's draft requires it).
