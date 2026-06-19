# Email Landing Page

A minimal landing page for collecting email addresses. Built with Next.js and ready for Vercel.

## What is included

- Landing page with responsive layout
- Email form with loading, success, and error states
- `/api/subscribe` API route
- Email validation
- Vercel KV / Redis storage support
- TypeScript

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy on Vercel

1. Push this project to GitHub.
2. Import the repo in Vercel.
3. Create a Vercel KV / Redis database in the Vercel dashboard.
4. Connect it to this project.
5. Redeploy.

Vercel will inject the needed KV environment variables automatically after you connect storage.

## Notes

This is intentionally simple. It stores unique emails in a Redis set called `waitlist:emails` and also stores each email with a timestamp under `waitlist:email:<email>`.

For a real product launch, add:

- Privacy policy link
- Consent checkbox if needed
- Double opt-in email flow
- Admin export endpoint or dashboard
- Basic rate limiting
