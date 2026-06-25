import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import CookieBanner from "./CookieBanner";
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
      <head>
        {/* Google Tag Manager — placed as high in <head> as possible, per GTM's
            install instructions. afterInteractive is Next's recommended strategy
            for GTM (loads right after hydration without blocking first paint). */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5673VBFG');
          `}
        </Script>
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
        {/* theMarketer tracking — async loader, fetches the per-account tracking
            script keyed by mktr_key. Loaded on every page view (not consent-gated),
            per theMarketer's standard integration instructions. */}
        <Script id="themarketer" strategy="afterInteractive">
          {`
            (function(){
                mktr_key = "ZZRAFU8W";
                var mktr = document.createElement("script");
                mktr.async = true;
                mktr.src = "https://t.themarketer.com/t/j/" + mktr_key;
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(mktr,s);
            })();
          `}
        </Script>
      </head>
      <body className="body">
        {/* Google Tag Manager (noscript) — must be immediately after <body>. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5673VBFG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Analytics />
        <CookieBanner />
        {/* Google Analytics (GA4) — gtag.js with Consent Mode.
            analytics_storage defaults to "denied" so GA doesn't track until the
            visitor accepts via the cookie banner; a returning visitor's stored
            "granted" choice is honored immediately. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LNKD7TBG3N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            var stored = 'denied';
            try { if (localStorage.getItem('kluppi-cookie-consent') === 'granted') stored = 'granted'; } catch (e) {}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: stored
            });
            gtag('config', 'G-LNKD7TBG3N');
          `}
        </Script>
      </body>
    </html>
  );
}
