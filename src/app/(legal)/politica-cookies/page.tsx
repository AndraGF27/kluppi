import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Politica de utilizare cookie-uri — Kluppi",
  robots: { index: false, follow: false }, // placeholder copy — don't index yet
};

export default function PoliticaCookies() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Politica de utilizare cookie-uri</h1>
      <p className={styles.updated}>Ultima actualizare: 23 iunie 2026</p>
      <p className={styles.placeholderNote}>
        <strong>Text-machetă (placeholder).</strong> Conținutul de mai jos este
        provizoriu (lorem ipsum) și va fi înlocuit cu textul final.
      </p>

      <div className={styles.body}>
        <h2>1. Ce sunt cookie-urile</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <h2>2. Tipuri de cookie-uri pe care le folosim</h2>
        <ul>
          <li><strong>Strict necesare</strong> — lorem ipsum dolor sit amet.</li>
          <li><strong>De analiză</strong> — consectetur adipiscing elit sed do.</li>
          <li><strong>De preferințe</strong> — tempor incididunt ut labore.</li>
        </ul>

        <h2>3. Cookie-uri de analiză (Google Analytics)</h2>
        <p>
          Folosim Google Analytics pentru statistici de utilizare. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>

        <h2>4. Gestionarea preferințelor</h2>
        <p>
          Îți poți gestiona preferințele oricând. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>

        <h2>5. Contact</h2>
        <p>
          Pentru întrebări despre cookie-uri, scrie-ne la{" "}
          <a href="mailto:hello@kluppi.com">hello@kluppi.com</a>.
        </p>
      </div>
    </main>
  );
}
