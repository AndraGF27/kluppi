import type { Metadata } from "next";
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
  title: "Kluppi — Branding expert and specialist",
  description:
    "Portfolio and waitlist for a branding expert and specialist. Showcasing creative design work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@200,300,400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="body">{children}</body>
    </html>
  );
}
