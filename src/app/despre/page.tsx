import type { Metadata } from "next";

import SiteChrome from "../SiteChrome";
import styles from "./despre.module.css";

export const metadata: Metadata = {
  title: "Despre Kluppi — povestea clubului",
  description:
    "De ce există Kluppi: un club de shopping cu coduri reale de la branduri, fără urgență falsă și fără prețuri umflate artificial.",
  robots: { index: false, follow: false }, // pre-launch — do not index yet
};

const beliefs = [
  {
    title: "Reduceri reale, nu teatru.",
    body: "Lucrăm direct cu brandurile și verificăm ca fiecare ofertă să fie un avantaj adevărat — nu un preț crescut ieri și „redus” azi.",
  },
  {
    title: "Fără urgență falsă.",
    body: "Codurile lunii rămân valabile toată luna. Nu punem cronometre care să te grăbească să cumperi ce nu îți trebuie.",
  },
  {
    title: "Un club, nu o piață publică.",
    body: "Codurile rămân între membri. Tocmai pentru că nu sunt aruncate pe tot internetul, brandurile își permit să ofere mai mult.",
  },
  {
    title: "Respect pentru decizia ta.",
    body: "Îți arătăm avantajele, tu decizi în ritmul tău. Fără presiune, fără spam.",
  },
];

export default function AboutPage() {
  return (
    <SiteChrome>
      <main className={styles.main}>
        <p className={styles.eyebrow}>Despre noi</p>
        <h1 className={styles.h1}>Clubul pornit dintr-o frustrare pe care o știi și tu</h1>
        <p className={styles.lead}>
          Reduceri care nu reduc nimic. Cronometre care numără invers spre nicăieri. Prețuri umflate ieri ca să pară generoase azi. Am obosit și noi de ele — așa că am construit altceva.
        </p>

        <section className={styles.section} aria-labelledby="de-unde-a-pornit-kluppi">
          <h2 id="de-unde-a-pornit-kluppi">De unde a pornit Kluppi</h2>
          <p>
            Toți avem prietenul acela care lucrează la un brand și care, din când în când, îți dă codul lui de reducere de angajat. Fără artificii, fără condiții ascunse — doar un avantaj real, oferit cu încredere, pentru că știi pe cineva din interior.
          </p>
          <p>
            Kluppi e exact acel prieten. Un club de shopping în care brandurile le oferă membrilor coduri și beneficii reale, negociate direct, lună de lună.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="in-ce-credem">
          <h2 id="in-ce-credem">În ce credem</h2>
          <div className={styles.beliefs}>
            {beliefs.map((belief) => (
              <section key={belief.title} className={styles.belief}>
                <h3>{belief.title}</h3>
                <p>{belief.body}</p>
              </section>
            ))}
          </div>
        </section>

        <p className={styles.closing}>Kluppi e clubul pe care ni l-am fi dorit noi înșine. Acum e al tău.</p>

        <div className={styles.cta}>
          <a href="/#contact" className="kluppi-btn">Rezervă-ți locul în club</a>
          <p>Înscriere gratuită · Fără obligații</p>
        </div>
      </main>
    </SiteChrome>
  );
}
