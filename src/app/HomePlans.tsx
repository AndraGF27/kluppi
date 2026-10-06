import { Check, Crown, Lock } from "lucide-react";

// The three ways to join, with their prices (Andra's design, 2026-10-06).
// Prices mirror the app's plans: free, Kluppi+ at 220 lei/year (18,33 lei a
// month, i.e. two months free against the monthly price) or 22 lei/month.
// If a price changes in the app, it changes here and in HomeSimulator too.
const PLUS_PERKS = [
  "Acces la toate ofertele și categoriile",
  "Oferte exclusive, disponibile doar pentru membrii Kluppi+",
  "Prioritate când ai nevoie de ajutor",
];

function Perk({ children }: { children: string }) {
  return (
    <li className="plan-perk">
      <span className="plan-check" aria-hidden="true">
        <Check />
      </span>
      <span>{children}</span>
    </li>
  );
}

function PlusTag() {
  return (
    <span className="plan-tag plan-tag--accent">
      <Crown aria-hidden="true" />
      Kluppi+
    </span>
  );
}

export default function HomePlans({ signupUrl }: { signupUrl: string }) {
  return (
    <section className="kluppi-section plans-section tone-alt" id="planuri" aria-labelledby="plans-heading">
      <div className="plans-inner">
        <div className="plans-intro" data-reveal>
          <h2 className="kluppi-benefits-heading" id="plans-heading">Alege cum vrei să începi</h2>
          <p className="sim-subline">
            Începe gratuit cu 2 oferte pe lună din categoriile alese de tine sau alege Kluppi+
            pentru acces la toate ofertele disponibile.
          </p>
        </div>

        <div className="plans-grid" data-reveal>
          <article className="plan-card">
            <div className="plan-tags">
              <span className="plan-tag plan-tag--lemon">Gratuit</span>
            </div>
            <p className="plan-price">
              <span className="plan-amount">0</span>
              <span className="plan-cur">lei</span>
              <span className="plan-per">/ lună</span>
            </p>
            <p className="plan-note">
              Fără card.
              <br />
              Fără obligații.
            </p>
            <ul className="plan-perks">
              <Perk>2 oferte noi în fiecare lună, din categoriile alese de tine</Perk>
            </ul>
            <a href={signupUrl} className="plan-btn plan-btn--outline">Continuă gratuit</a>
          </article>

          <article className="plan-card plan-card--featured">
            <div className="plan-tags">
              <PlusTag />
              <span className="plan-tag plan-tag--lemon">2 luni gratuite</span>
            </div>
            <p className="plan-price plan-price--accent">
              <span className="plan-amount">18,33</span>
              <span className="plan-cur">lei</span>
              <span className="plan-per">/ lună</span>
            </p>
            <p className="plan-note">
              Plătești 220 lei / an.
              <br />
              Economisești 44 lei.
            </p>
            <ul className="plan-perks">
              {PLUS_PERKS.map((perk) => (
                <Perk key={perk}>{perk}</Perk>
              ))}
            </ul>
            <a href={signupUrl} className="plan-btn plan-btn--accent">Alege Kluppi+ · 220 lei / an</a>
          </article>

          <article className="plan-card">
            <div className="plan-tags">
              <PlusTag />
            </div>
            <p className="plan-price">
              <span className="plan-amount">22</span>
              <span className="plan-cur">lei</span>
              <span className="plan-per">/ lună</span>
            </p>
            <p className="plan-note">
              Plătești lunar.
              <br />
              Ai mai multă flexibilitate.
            </p>
            <ul className="plan-perks">
              {PLUS_PERKS.map((perk) => (
                <Perk key={perk}>{perk}</Perk>
              ))}
            </ul>
            <a href={signupUrl} className="plan-btn plan-btn--lemon">Alege Kluppi+ · 22 lei / lună</a>
          </article>
        </div>

        <p className="plans-foot">
          <Lock aria-hidden="true" />
          <span>Plată securizată prin NETOPIA Payments.</span>
          <span className="plans-break" />
          <span>Poți opri reînnoirea oricând.</span>
        </p>
      </div>
    </section>
  );
}
