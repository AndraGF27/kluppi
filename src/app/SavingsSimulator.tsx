"use client";

import { useState } from "react";
import styles from "./savings-simulator.module.css";

// PLACEHOLDER — Andra validates every number before launch
const AVG_BENEFIT = 0.10; // PLACEHOLDER: average member benefit per category
const ANNUAL_PLAN_RON = 220; // real: annual Founding Price

const categories = [
  { emoji: "👗", label: "Modă & accesorii", defaultValue: 300 },
  { emoji: "🌿", label: "Îngrijire & sănătate", defaultValue: 200 },
  { emoji: "🏡", label: "Casă & grădină", defaultValue: 0 },
  { emoji: "🚗", label: "Tehnologie & auto", defaultValue: 0 },
  { emoji: "🍷", label: "Gusturi & experiențe", defaultValue: 0 },
  { emoji: "🎡", label: "Timp liber & ai tăi", defaultValue: 0 },
];

const formatRon = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 });

export default function SavingsSimulator() {
  const [monthlySpends, setMonthlySpends] = useState(() =>
    categories.map((category) => category.defaultValue)
  );

  const monthlyTotal = monthlySpends.reduce((total, spend) => total + spend, 0);
  const annualGross = monthlyTotal * AVG_BENEFIT * 12;
  const net = Math.max(0, annualGross - ANNUAL_PLAN_RON);

  const updateSpend = (index: number, value: number) => {
    setMonthlySpends((currentSpends) =>
      currentSpends.map((spend, currentIndex) =>
        currentIndex === index ? value : spend
      )
    );
  };

  return (
    <section className={`kluppi-section ${styles.section}`} id="simulator">
      <div className={styles.inner}>
        <div className={styles.intro} data-reveal>
          <h2 className="kluppi-benefits-heading">Cât ai economisi cu Kluppi?</h2>
          <p className={styles.subline}>
            Mută cursoarele și vezi estimarea pentru un an de cumpărături.
          </p>
        </div>

        <div className={styles.card} data-reveal>
          <div className={styles.sliders}>
            {categories.map((category, index) => {
              const value = monthlySpends[index];

              return (
                <div className={styles.sliderRow} key={category.label}>
                  <span className={styles.category}>
                    <span aria-hidden="true">{category.emoji}</span>
                    {category.label}
                  </span>
                  <input
                    aria-label={category.label}
                    className={styles.slider}
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={value}
                    onChange={(event) => updateSpend(index, Number(event.target.value))}
                  />
                  <span className={styles.value}>{formatRon.format(value)} lei/lună</span>
                </div>
              );
            })}
          </div>

          <div className={styles.result} aria-live="polite">
            {net > 0 ? (
              <>
                <p className={styles.resultLabel}>
                  Cu abonamentul anual de 220 lei, ai rămâne cu aproximativ
                </p>
                <p className={styles.total}>{formatRon.format(net)} lei economisiți pe an</p>
              </>
            ) : (
              <p className={styles.freePlan}>
                La acest nivel de cumpărături, abonamentul gratuit e alegerea potrivită — începe cu el.
              </p>
            )}
          </div>

          <p className={styles.footnote}>
            Estimare orientativă: am folosit un beneficiu mediu de 10% din valoarea cumpărăturilor. Cifrele finale depind de ofertele din club.
          </p>
        </div>

        <div className={styles.cta}>
          <a href="#contact" className="kluppi-btn">Rezervă-ți locul în club</a>
          <p className="kluppi-hero-trust">
            Gratuit la înscriere. Decizi mai târziu dacă vrei mai mult.
          </p>
        </div>
      </div>
    </section>
  );
}
