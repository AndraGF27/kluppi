import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
            theMarketer) are NOT loaded here. They are injected by <CookieBanner>
            only after the visitor clicks "Accept", so no GA/GTM/theMarketer
            request fires and no analytics cookie is set before consent. Fonts are
            self-hosted (./fonts.css) — no third-party font requests either. */}
        {children}
        <Analytics />
        <SpeedInsights />
        <CookieBanner />
      </body>
    </html>
  );
}
