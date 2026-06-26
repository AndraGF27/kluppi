"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import styles from "./cookie.module.css";

// Persists the visitor's choice so the banner shows only once, and gates all
// non-essential tracking. The scripts below (GA4, GTM, theMarketer) are injected
// ONLY when this is "accepted" — nothing analytics-related loads before that, so
// no GA/GTM request fires and no analytics cookie is set until the user opts in.
const CONSENT_KEY = "kluppi-cookie-consent";

type Consent = "accepted" | "denied" | null;

const GA_ID = "G-LNKD7TBG3N";
const GTM_ID = "GTM-5673VBFG";
const THEMARKETER_KEY = "ZZRAFU8W";

// Analytics + marketing scripts. Mounted only after explicit consent, so the
// browser makes no request to Google or theMarketer (and sets no cookie) until
// the visitor clicks "Accept". next/script injects these once this subtree
// renders, i.e. on Accept or on a later visit where consent is already stored.
function ConsentedScripts() {
  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      {/* theMarketer on-site tracking (sets __sm__c) */}
      <Script id="themarketer" strategy="afterInteractive">
        {`
          (function(){
              mktr_key = "${THEMARKETER_KEY}";
              var mktr = document.createElement("script");
              mktr.async = true;
              mktr.src = "https://t.themarketer.com/t/j/" + mktr_key;
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(mktr,s);
          })();
        `}
      </Script>

      {/* Google Analytics (GA4) — only loaded post-consent, so analytics_storage
          is granted from the start; ad_* stay denied (no ad consent collected). */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}

export default function CookieBanner() {
  // null until we've read localStorage on the client (avoids SSR mismatch).
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: Consent = null;
    try {
      const v = localStorage.getItem(CONSENT_KEY);
      if (v === "accepted" || v === "denied") stored = v;
    } catch {
      /* private mode / storage blocked — treat as no choice yet */
    }
    setConsent(stored);
    setReady(true);
  }, []);

  const choose = (accepted: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "denied");
    } catch {
      /* private mode / storage blocked — choice just won't persist */
    }
    setConsent(accepted ? "accepted" : "denied");
  };

  return (
    <>
      {consent === "accepted" && <ConsentedScripts />}

      {ready && consent === null && (
        <div
          className={styles.wrap}
          role="dialog"
          aria-live="polite"
          aria-label="Consimțământ cookie-uri"
        >
          <div className={styles.card}>
            <p className={styles.text}>
              🍪 Folosim cookies și tehnologii similare pentru a analiza traficul
              și a-ți îmbunătăți experiența.{" "}
              <a
                href="/politica-cookies"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Află mai multe.
              </a>
            </p>
            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.btn} ${styles.reject}`}
                onClick={() => choose(false)}
              >
                Refuz
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.accept}`}
                onClick={() => choose(true)}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
