"use client";

import { useEffect, useState } from "react";
import styles from "./cookie.module.css";

// Persists the visitor's choice so the banner shows only once. The same key is
// read by the GA consent-default script in layout.tsx, so a returning visitor
// who already accepted is tracked immediately on their next visit.
const CONSENT_KEY = "kluppi-cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  // Decide visibility on the client only (localStorage) to avoid SSR mismatch.
  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
    } catch {
      /* private mode / storage blocked — choice just won't persist */
    }
    // GA4 Consent Mode: flip analytics on/off for this session.
    window.gtag?.("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={styles.wrap}
      role="dialog"
      aria-live="polite"
      aria-label="Consimțământ cookie-uri"
    >
      <div className={styles.card}>
        <p className={styles.text}>
          🍪 Folosim cookie-uri pentru a analiza traficul și a-ți îmbunătăți
          experiența.{" "}
          <a
            href="/politica-cookies"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Află mai multe
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
  );
}
