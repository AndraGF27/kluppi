import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Termeni și condiții — Kluppi",
  robots: { index: false, follow: false }, // placeholder copy — don't index yet
};

export default function TermeniSiConditii() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Termeni și condiții</h1>
      <p className={styles.updated}>Ultima actualizare: 23 iunie 2026</p>
      <p className={styles.placeholderNote}>
        <strong>Text-machetă (placeholder).</strong> Conținutul de mai jos este
        provizoriu (lorem ipsum) și va fi înlocuit cu textul juridic final.
      </p>

      <div className={styles.body}>
        <h2>1. Introducere</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>

        <h2>2. Definiții</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident.
        </p>
        <ul>
          <li><strong>Serviciul</strong> — lorem ipsum dolor sit amet.</li>
          <li><strong>Membru</strong> — consectetur adipiscing elit sed do.</li>
          <li><strong>Cont</strong> — tempor incididunt ut labore et dolore.</li>
        </ul>

        <h2>3. Utilizarea serviciului</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
          illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo.
        </p>

        <h2>4. Cont și înscriere</h2>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </p>

        <h2>5. Limitarea răspunderii</h2>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed quia non numquam eius modi tempora
          incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>

        <h2>6. Modificări ale termenilor</h2>
        <p>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
        </p>

        <h2>7. Contact</h2>
        <p>
          Pentru orice întrebări legate de acești termeni, ne poți scrie la{" "}
          <a href="mailto:hello@kluppi.com">hello@kluppi.com</a>.
        </p>
      </div>
    </main>
  );
}
