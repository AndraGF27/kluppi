"use client";

import React, { useEffect } from "react";
import { Handshake, MapPin, ShieldCheck } from "lucide-react";

import styles from "../despre.module.css";

const storyParagraphs = [
  "Am petrecut ani buni în marketing. Am stat în ședințele în care se planifică promoțiile, am văzut cum se decide ce primește un client nou și cum se construiește presiunea care te împinge să apeși „Cumpără acum”.",
  "Așa că știm exact ce poate oferi un brand atunci când își dorește cu adevărat un client. Și știm cât de departe e asta de ceea ce primește, de obicei, un cumpărător care intră de pe un banner.",
  "La un moment dat, întrebarea a devenit inevitabilă: dacă tot știm cum funcționează jocul, de ce să nu-l jucăm în favoarea noastră — a tuturor?",
  "Am pus la un loc experiența, relațiile din industrie și puterea de negociere a unei comunități întregi și le-am mutat de cealaltă parte a checkout-ului. A ta.",
  "I-am spus Kluppi. (Se citește klu-pi, dacă te întrebai.)",
];

const clubParagraphs = [
  "Pentru că un cod care ajunge peste tot nu mai valorează nimic.",
  "Când o reducere devine publică, ea devine, de fapt, parte din preț: brandul o calculează din start în marjă, agregatoarele o copiază, iar „oferta” ajunge doar un alt banner. Când un beneficiu rămâne într-un club închis, brandul și-l poate permite mai generos, iar codul își păstrează valoarea pentru fiecare membru care îl folosește.",
  "De asta beneficiile Kluppi sunt exclusive la sursă: negociate de noi, direct cu brandul, și de negăsit altundeva. Iar asta rămâne valabil indiferent câți suntem în club.",
];

const subscriptionParagraphs = [
  "Ca să fim sinceri până la capăt: nu plătești pentru că reducerile ar fi scumpe. Plătești pentru cineva care caută, negociază și verifică în locul tău, în fiecare lună. Cam ce ai face pentru un prieten care îți poartă mereu de grijă.",
  "Și, dacă tot vorbim despre bani: nu lucrăm pe comisioane de afiliere. Nu câștigăm absolut nimic din ceea ce cumperi tu. Singura noastră „vânzare” este clubul însuși — așa că singura noastră grijă este ca el să merite, lună de lună.",
  "Apropo, ai observat prețurile noastre? Numere rotunde. Fără 21,99, fără „reducere doar azi la abonament”. Un club care îți promite că nu te manipulează nu are voie să înceapă chiar cu propriul preț.",
];

const standards = [
  {
    title: "E reală?",
    body: "Beneficiul se raportează la prețul curent, nu la unul umflat special pentru ocazie.",
  },
  {
    title: "E exclusivă?",
    body: "Negociată pentru membri și imposibil de găsit cu o căutare pe Google.",
  },
  {
    title: "E corectă?",
    body: "Condiții clare, fără excluderi ascunse și fără asteriscuri care schimbă tot.",
  },
];

function ReadingSection({
  id,
  heading,
  paragraphs,
}: {
  id: string;
  heading: string;
  paragraphs: string[];
}) {
  return (
    <section className={`kluppi-section ${styles.readingSection}`} aria-labelledby={id}>
      <div className={styles.readingColumn}>
        <h2 id={id} className={`kluppi-benefits-heading ${styles.sectionHeading}`} data-reveal>
          {heading}
        </h2>
        {paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            data-reveal
            style={index === 1 ? ({ "--reveal-delay": "0.08s" } as React.CSSProperties) : undefined}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export function AboutContent() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <div className="padding-global">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className="kluppi-hero-eyebrow" data-reveal>Despre noi</p>
              <h1
                className={`kluppi-hero-h1 ${styles.heroTitle}`}
                data-reveal
                style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
              >
                Am văzut trucurile din culise. Apoi am trecut de partea ta.
              </h1>
              <p
                className={`kluppi-hero-body ${styles.heroBody}`}
                data-reveal
                style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}
              >
                Kluppi este clubul construit de oameni din interiorul industriei, pentru toți cei care s-au săturat să fie tratați ca ținte de marketing.
              </p>
              <div
                className={styles.heroCta}
                data-reveal
                style={{ "--reveal-delay": "0.24s" } as React.CSSProperties}
              >
                <a href="/#contact" className="kluppi-btn">Intră în club</a>
                <p className="kluppi-hero-trust">Gratuit. Ca între prieteni.</p>
              </div>
            </div>
            <div
              className={styles.heroImageFrame}
              data-reveal
              style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}
            >
              <img
                className={styles.heroImage}
                src="/Hero1.jpg"
                alt="Echipa Kluppi, de partea cumpărătorului."
              />
            </div>
          </div>
        </div>
      </header>

      <section className="kluppi-band" aria-label="Principiile Kluppi">
        <div className="kluppi-band-inner">
          <div className="kluppi-band-grid">
            <div className="kluppi-band-cell" data-reveal>
              <MapPin className="kluppi-band-icon" aria-hidden="true" strokeWidth={1.5} />
              <p className="kluppi-band-title">Un club românesc</p>
            </div>
            <div
              className="kluppi-band-cell"
              data-reveal
              style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
            >
              <Handshake className="kluppi-band-icon" aria-hidden="true" strokeWidth={1.5} />
              <p className="kluppi-band-title">Negociat direct la sursă</p>
            </div>
            <div
              className="kluppi-band-cell"
              data-reveal
              style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}
            >
              <ShieldCheck className="kluppi-band-icon" aria-hidden="true" strokeWidth={1.5} />
              <p className="kluppi-band-title">De partea ta la checkout</p>
            </div>
          </div>
        </div>
      </section>

      <ReadingSection id="povestea-pe-scurt" heading="Povestea, pe scurt" paragraphs={storyParagraphs} />

      <section className={`kluppi-section ${styles.readingSection}`} aria-labelledby="manifestul-kluppi">
        <div className={styles.readingColumn}>
          <h2 id="manifestul-kluppi" className={`kluppi-benefits-heading ${styles.sectionHeading}`} data-reveal>
            Manifestul Kluppi
          </h2>
          <div className={styles.manifesto}>
            <p className={styles.manifestoBelief} data-reveal>Credem că o reducere bună nu are nevoie de cronometru.</p>
            <p className={styles.manifestoBelief} data-reveal>Credem că prețul corect nu ar trebui să fie o vânătoare.</p>
            <p className={styles.manifestoBelief} data-reveal>Credem că nimeni nu ar trebui să se simtă păcălit după ce apasă „Plasează comanda”.</p>
            <p className={styles.manifestoBelief} data-reveal>Credem că, dacă un brand spune „doar azi” de trei ori pe săptămână, e cazul să punem întrebări.</p>
          </div>
          <div className={styles.manifestoClosing}>
            <p data-reveal>Nu vânăm cupoane. Negociem acces.</p>
            <p data-reveal>Nu postăm codurile public. Exact ăsta e scopul.</p>
            <p data-reveal>Uneori, cel mai bun discount este liniștea că nu ești păcălit.</p>
          </div>
        </div>
      </section>

      <ReadingSection
        id="de-ce-club-privat"
        heading="De ce un club? Și de ce privat?"
        paragraphs={clubParagraphs}
      />

      <ReadingSection
        id="de-ce-abonament"
        heading="De ce există un abonament?"
        paragraphs={subscriptionParagraphs}
      />

      <section className="kluppi-benefits" aria-labelledby="standardul-ofertei">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="kluppi-section-content">
                <h2 id="standardul-ofertei" className="kluppi-benefits-heading" data-reveal>
                  Standardul unei oferte Kluppi
                </h2>
                <p className={`kluppi-hero-body ${styles.standardsIntro}`} data-reveal>
                  Înainte să intre în club, fiecare ofertă trece prin trei întrebări:
                </p>
                <div className={styles.standardsGrid}>
                  {standards.map((standard, index) => (
                    <article
                      key={standard.title}
                      className={`kluppi-benefit ${styles.standardCard}`}
                      data-reveal
                      style={
                        index > 0
                          ? ({ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties)
                          : undefined
                      }
                    >
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">{standard.title}</h3>
                        <p className="kluppi-benefit-desc">{standard.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <p className={`kluppi-hero-body ${styles.standardsClosing}`} data-reveal>
                  Trei de „da” sau oferta nu intră. Da, asta înseamnă că vom refuza branduri. E în regulă: exact pentru asta suntem aici.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReadingSection
        id="clubul-impreuna"
        heading="Clubul îl construim împreună"
        paragraphs={[
          "Kluppi nu e un catalog pe care îl primești. E un club pe care îl influențezi.",
          "Membrii ne spun ce branduri își doresc, ce categorii îi interesează și ce beneficii merită negociate — iar lista noastră de negocieri se schimbă după ce cere comunitatea. Dacă ai un brand în minte, spune-ne. Citim fiecare cerere.",
        ]}
      />

      <section className={`kluppi-section ${styles.finalCta}`} aria-labelledby="intra-in-club">
        <div className={styles.finalCtaInner}>
          <h2 id="intra-in-club" className={`kluppi-benefits-heading ${styles.finalCtaHeading}`} data-reveal>
            Intră în club
          </h2>
          <p className={styles.finalCtaLine} data-reveal>
            Dacă ai citit până aici, probabil ești unul de-ai noștri.
          </p>
          <div className={styles.finalCtaButton} data-reveal>
            <a href="/#contact" className="kluppi-btn">Intră în club</a>
            <p className="kluppi-hero-trust">Ne vedem înăuntru.</p>
          </div>
          <p className={styles.partnerLine} data-reveal>
            <strong>Ai un brand?</strong>{" "}
            <a href="mailto:partners@kluppi.com">Vezi cum devii partener →</a>
          </p>
        </div>
      </section>

      <p className={styles.tagline} data-reveal>Negociate de noi, pentru noi.</p>
    </main>
  );
}
