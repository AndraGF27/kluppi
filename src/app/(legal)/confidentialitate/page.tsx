import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Politica de confidențialitate — Kluppi",
  robots: { index: false, follow: false }, // placeholder copy — don't index yet
};

export default function Confidentialitate() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Politica de confidențialitate</h1>
      <p className={styles.updated}>Ultima actualizare: 23 iunie 2026</p>
      <p className={styles.placeholderNote}>
        <strong>Text-machetă (placeholder).</strong> Conținutul de mai jos este
        provizoriu (lorem ipsum) și va fi înlocuit cu textul juridic final,
        conform GDPR.
      </p>

      <div className={styles.body}>
        <h2>1. Operatorul de date</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <h2>2. Ce date colectăm</h2>
        <ul>
          <li>Adresa de e-mail furnizată la înscrierea în club.</li>
          <li>Date tehnice de utilizare (lorem ipsum dolor sit amet).</li>
          <li>Cookie-uri și identificatori similari (consectetur adipiscing).</li>
        </ul>

        <h2>3. Scopul prelucrării</h2>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse.
        </p>

        <h2>4. Temeiul legal</h2>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>

        <h2>5. Drepturile tale (GDPR)</h2>
        <p>
          Ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate
          și opoziție. Sed ut perspiciatis unde omnis iste natus error sit
          voluptatem accusantium doloremque laudantium.
        </p>

        <h2>6. Păstrarea datelor</h2>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione.
        </p>

        <h2>7. Contact</h2>
        <p>
          Pentru exercitarea drepturilor tale sau orice întrebare, scrie-ne la{" "}
          <a href="mailto:hello@kluppi.com">hello@kluppi.com</a>.
        </p>
      </div>
    </main>
  );
}
