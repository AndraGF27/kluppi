"use client";

import { useState } from "react";
import { Shirt, Leaf, House, Zap, Wine, Balloon, type LucideIcon } from "lucide-react";

// Savings estimate on the home page (Andra's design, 2026-10-06): yearly
// spending per category → what a member would keep after the annual Kluppi+
// price. The page states the assumption in the footnote below the result.
const AVG_BENEFIT = 0.1; // a benefit worth 10% of the purchases
const ANNUAL_PLAN_RON = 220; // annual Kluppi+ price (also shown in HomePlans)
const MAX_RON = 10000;
const STEP_RON = 100;

const categories: { Icon: LucideIcon; label: string; defaultValue: number }[] = [
  { Icon: Shirt, label: "Modă & accesorii", defaultValue: 3600 },
  { Icon: Leaf, label: "Îngrijire & sănătate", defaultValue: 2400 },
  { Icon: House, label: "Casă & grădină", defaultValue: 0 },
  { Icon: Zap, label: "Tehnologie & auto", defaultValue: 0 },
  { Icon: Wine, label: "Gusturi & experiențe", defaultValue: 0 },
  { Icon: Balloon, label: "Timp liber & familie", defaultValue: 0 },
];

const formatRon = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 });

export default function HomeSimulator({ signupUrl }: { signupUrl: string }) {
  const [spends, setSpends] = useState(() => categories.map((c) => c.defaultValue));

  const total = spends.reduce((sum, spend) => sum + spend, 0);
  const net = Math.max(0, Math.round(total * AVG_BENEFIT - ANNUAL_PLAN_RON));

  return (
    <section className="kluppi-section sim-section" id="simulator">
      <div className="sim-inner">
        <div className="sim-intro" data-reveal>
          <h2 className="kluppi-benefits-heading">Cât poți economisi cu Kluppi?</h2>
          <p className="sim-subline">
            Mută cursoarele în funcție de cumpărăturile pe care le faci într-un an.
          </p>
        </div>

        <div className="sim-grid" data-reveal>
          <div className="sim-sliders">
            {categories.map(({ Icon, label }, index) => {
              const value = spends[index];
              return (
                <label className="sim-row" key={label}>
                  <span className="sim-top">
                    <span className="sim-category">
                      <Icon aria-hidden="true" strokeWidth={1.5} />
                      {label}
                    </span>
                    <span className="sim-value">{formatRon.format(value)} lei/an</span>
                  </span>
                  <input
                    className="sim-slider"
                    type="range"
                    min={0}
                    max={MAX_RON}
                    step={STEP_RON}
                    value={value}
                    aria-label={`${label}, lei pe an`}
                    style={{ "--fill": `${(value / MAX_RON) * 100}%` } as React.CSSProperties}
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      setSpends((current) => current.map((s, i) => (i === index ? next : s)));
                    }}
                  />
                </label>
              );
            })}
          </div>

          <aside className="sim-result" aria-live="polite">
            {net > 0 ? (
              <div className="sim-yes">
                <p className="sim-resultLabel">
                  Luând în calcul costul abonamentului Kluppi+ anual, ai economisi aproximativ
                </p>
                <div className="sim-totalRow">
                  <p className="sim-total">{formatRon.format(net)} lei</p>
                  <p className="sim-per">pe an</p>
                </div>
              </div>
            ) : (
              <p className="sim-freePlan">
                La acest nivel de cumpărături, abonamentul gratuit e alegerea potrivită — începe cu el.
              </p>
            )}
            <div className="sim-cta">
              <a href={signupUrl} className="kluppi-btn">Intră în club</a>
              <p className="kluppi-hero-trust">Te înscrii gratuit, fără card</p>
            </div>
            <p className="sim-footnote">
              Estimare bazată pe un beneficiu echivalent cu o reducere de 10% din valoarea
              cumpărăturilor. Cifrele finale depind de ofertele din club și de frecvența
              utilizării lor.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
