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
              Ți-ai confirmat adresa, iar{" "}
              <strong>locul tău pe lista de lansare e asigurat</strong>.
            </p>
            <p>
              Și ne bucurăm că ești aici. <strong>Sincer</strong>.
            </p>
            <p>Ca să știi exact unde ai intrat:</p>
            <p>
              Kluppi este acel prieten care îți spune:{" "}
              <strong>Stai, nu plăti încă, am eu un cod mai bun</strong>.
            </p>
            <p>
              Discutăm direct cu brandurile pe care le folosești deja și{" "}
              <strong>obținem coduri și beneficii reale, doar pentru membri</strong>.
              Genul de avantaje pe care nu le găsești pe site-urile de cupoane,
              nici în e-mailurile automate.
            </p>

            <h2 className={styles.subtitle}>Dar, de ce?</h2>
            <p>
              Am creat Kluppi pentru că ne-am săturat și noi de urgențe
              inventate, reduceri reciclate și prețuri care par să joace un joc
              în care noi aflăm regulile mult prea târziu.
            </p>
            <p>
              Și, sincer, avem prea multă experiență în industrie ca să ne
              prefacem că nu vedem cum funcționează lucrurile.
            </p>
            <p>
              Așa că am decis să folosim ce știm mai bine (relații, negocieri,
              context și un pic de încăpățânare), ca să aducem{" "}
              <strong>mai multe avantaje pentru tine</strong>.
            </p>

            <h2 className={styles.subtitle}>Bine...</h2>
            <p>
              Până lansăm oficial, noi facem partea mai puțin vizibilă:{" "}
              <strong>
                discutăm direct cu brandurile, alegem beneficiile care merită
                puse în club și pregătim tot arsenalul tehnic
              </strong>
              .
            </p>
            <p>
              În perioada următoare,{" "}
              <strong>îți scriem doar când avem ceva important de spus</strong>:
              când lansăm, cum îți creezi contul, cum alegi categoriile care te
              interesează și cum accesezi surpriza specială pregătită pentru cei
              care ni s-au alăturat devreme.
            </p>

            <h2 className={styles.subtitle}>Și până atunci?</h2>
            <p>
              Între timp, <strong>ținem legătura pe social media</strong>.
            </p>
            <p>
              Ne găsești pe{" "}
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
            <p>Pe cât mai curând!</p>
          </div>
        </div>
      </main>
    </SiteChrome>
  );
}
