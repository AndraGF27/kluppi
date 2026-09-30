import type { Metadata } from "next";
import CookieBanner from "./CookieBanner";
import "./fonts.css";
import "./webflow.css";
import "./globals.css";

// Absolute base for OG/Twitter/icon URLs. Uses an explicit override if set,
// else Vercel's production domain (auto-injected), else localhost in dev — so
// the social-share tags resolve correctly in production without a hardcoded domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kluppi — Coduri și avantaje exclusive de la branduri",
  description:
    "Clubul de shopping unde primești coduri de reducere și beneficii reale, direct de la branduri. Rezervă-ți gratuit locul și află când lansăm.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="body">
        {/* Analytics & marketing (Google Analytics, Google Tag Manager,
            theMarketer, Vercel Web Analytics, Vercel Speed Insights) are NOT
            loaded here. They are injected by <CookieBanner> only after the
            visitor clicks "Accept", so none of them runs and no analytics cookie
            is set before consent. Vercel's two tools set no cookie, but the
            lawyer's advice (2026-09-29/30, Legea 506/2004 art. 4(5)–(6)) is that a
            script sending browser information needs consent all the same. Fonts
            are self-hosted (./fonts.css) — no third-party font requests either. */}
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
