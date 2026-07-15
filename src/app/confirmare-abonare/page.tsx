import type { Metadata } from "next";

import SiteChrome from "../SiteChrome";
import styles from "./confirmare-abonare.module.css";

export const metadata: Metadata = {
  title: "Vești bune — Kluppi",
  description: "Adresa ta a fost confirmată, iar locul pe lista de lansare Kluppi este asigurat.",
  robots: { index: false, follow: false },
};

export default function ConfirmareAbonarePage() {
  return (
    <SiteChrome>
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>Vești bune</h1>
          <div className={styles.body}>
            <p>
              Ți-ai confirmat adresa, iar locul tău pe lista de lansare e
              asigurat.
            </p>
            <p>
              Până lansăm, ținem legătura pe social media. Ne găsești pe{" "}
              <a
                href="https://www.instagram.com/joinkluppi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>{" "}
              și{" "}
              <a
                href="https://www.facebook.com/joinkluppi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </SiteChrome>
  );
}
