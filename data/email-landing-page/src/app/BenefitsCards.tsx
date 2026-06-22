"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Calendar, UserStar, Gift } from "lucide-react";

const benefits = [
  {
    Icon: ShieldCheck,
    title: "Încredere la checkout",
    desc: "Nu ar trebui să te întrebi de fiecare dată dacă oferta este reală sau dacă prețul a fost umflat înainte să fie redus. Noi discutăm direct cu brandurile și verificăm fiecare beneficiu înainte să ajungă la tine.",
  },
  {
    Icon: Calendar,
    title: "Beneficii noi, în fiecare lună",
    desc: "Nu suntem un site de cupoane care adaugă oferte din când în când. Aducem periodic avantaje și branduri noi în club, pentru ca tu să poți cumpăra smart exact atunci când ai nevoie.",
  },
  {
    Icon: UserStar,
    title: "Oferte relevante pentru tine",
    desc: "Fiecare mesaj pe care îl primești trebuie să conteze. Tu alegi categoriile care te interesează, iar noi îți trimitem avantajele relevante pentru tine.",
  },
  {
    Icon: Gift,
    title: "Acces gratuit în club",
    desc: "Nu trebuie să plătești ca să îți rezervi locul sau să obții oferte din categoria preferată. Te înscrii rapid și ai acces gratuit la Kluppi odată ce lansăm. Și dacă te răzgândești, te dezabonezi și gata.",
  },
];

const PEEK = 90; // px of each card left visible when fully stacked

export default function BenefitsCards() {
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stackedDisabled = () =>
      reduce || window.matchMedia("(max-width: 991px)").matches; // no spread on mobile/reduced-motion

    let ticking = false;

    // Cards sit in a normal flex row (offsetLeft = their final positions, unaffected by
    // transforms). They start bunched on the left — each peeking PEEK px — and slide out
    // to their row positions as the row scrolls up through the viewport.
    const render = () => {
      ticking = false;
      const cards = cardRefs.current;
      const first = cards[0];
      const second = cards[1];
      if (!first || !second) return;

      if (stackedDisabled()) {
        cards.forEach((c) => c && (c.style.transform = ""));
        return;
      }

      const step = second.offsetLeft - first.offsetLeft; // column step
      const rect = row.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9; // progress 0 (stacked) when the row top is here
      const end = vh * 0.35; // progress 1 (spread) when the row top reaches here
      const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);

      const slide = Math.max(step - PEEK, 0);
      cards.forEach((c, i) => {
        if (c) c.style.transform = `translateX(${-(1 - progress) * i * slide}px)`;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };

    render();
    const settle = window.setTimeout(render, 300); // re-measure after fonts settle
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="kluppi-bcards" ref={rowRef}>
      {benefits.map((b, i) => {
        const Icon = b.Icon;
        return (
          <article
            key={b.title}
            className="kluppi-bcard"
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{ zIndex: i + 1 }} // later cards sit on top so each peeks from the left
          >
            <Icon className="kluppi-bcard-icon" aria-hidden="true" strokeWidth={1.5} />
            <div className="kluppi-bcard-text">
              <h3 className="kluppi-bcard-title">{b.title}</h3>
              <p className="kluppi-bcard-desc">{b.desc}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
