"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  "…cumpărat ceva redus „doar azi”, ca peste câteva zile să vezi un preț mai mic la același produs, fără să fie inclus în vreo ofertă?",
  "…dat click pe un banner care anunța reduceri de până la 80%, doar ca să descoperi că ceea ce cumperi tu de obicei nu intră în promoție?",
  "…adăugat în coș ceva de care chiar nu aveai nevoie doar ca să obții „transport gratuit”?",
  "…plasat o comandă mai repede decât voiai, pentru că un cronometru îți spunea că pierzi oferta?",
];

export default function PainPointsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const go = (i: number) => setIndex(Math.min(Math.max(i, 0), count - 1));

  // Auto-advance every 5s, looping back to the first slide. The timer re-arms on
  // each index/paused change (so manual nav also resets it); hovering either arrow
  // sets `paused`, which clears the pending timer until the cursor leaves.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), 5000);
    return () => window.clearTimeout(id);
  }, [index, paused, count]);

  return (
    <div className="kluppi-carousel">
      <div className="kluppi-carousel-viewport">
        <div
          className="kluppi-carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((text, i) => (
            <div className="kluppi-carousel-slide" key={i} aria-hidden={i !== index}>
              <div className="kluppi-carousel-card">
                <p className="kluppi-carousel-text">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="kluppi-carousel-arrows"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          type="button"
          className="kluppi-carousel-arrow"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Întrebarea anterioară"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          className="kluppi-carousel-arrow"
          onClick={() => go(index + 1)}
          disabled={index === count - 1}
          aria-label="Întrebarea următoare"
        >
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
