# Task 05 — `/r/{code}` referral redirect

## Goal
Members will share referral links as `kluppi.com/r/ABC12345`. This route must
redirect to the app's signup page with the code attached:
`https://app.kluppi.com/signup?ref=ABC12345`.

## Files you may touch
- `src/app/r/[code]/route.ts` (new — this exact path, a route handler, NOT a page)
- `LOGBOOK.md` (append your entry at the end, as always)

Nothing else. No nav links, no sitemap entries, no other files.

## Requirements
1. **Route handler** at `src/app/r/[code]/route.ts` exporting `GET`.
2. **Validate the code before using it**: referral codes are exactly 8
   characters from `A-Z`, `a-z`, `2-9` (lookalike-free alphabet — no 0, 1, I,
   l, O). Regex: `/^[A-HJ-NP-Za-km-z2-9]{8}$/`.
   - Valid code → 307 redirect to
     `https://app.kluppi.com/signup?ref=${encodeURIComponent(code)}`.
   - Invalid code → 307 redirect to `https://app.kluppi.com/signup` (no `ref`
     param at all — never forward an unvalidated value).
3. **Production gate (AGENTS.md hard rule):** the app is not launched yet, so
   when `process.env.VERCEL_ENV === "production"`, respond with a 404 instead
   of redirecting. Use `notFound()` from `next/navigation` — same pattern as
   `src/app/despre/page.tsx`. The gate comes off in a future brief at launch.
4. No caching surprises: export `const dynamic = "force-dynamic";` so the gate
   check runs per-request.
5. Comments in English, concise. No new dependencies.

## Verification (before you report)
- `npm run build` passes (Node 20+, `nvm use 22`).
- `npx tsc --noEmit` passes.
- Manual check with `npm run dev`: `curl -sI localhost:3000/r/Abcd2345 | head -3`
  shows a 307 with the correct `location`; `curl -sI localhost:3000/r/bad!code`
  redirects to the bare signup URL; `curl -sI "localhost:3000/r/%2F..%2Fetc"`
  also falls back to bare signup.

## Report
Standard format per AGENTS.md (files changed, what, verification, out of
scope, commit). Work on `kluppi-rebrand`. Do NOT commit or push — leave the
working tree changes for Claude's review (fix rounds are cheaper that way).
