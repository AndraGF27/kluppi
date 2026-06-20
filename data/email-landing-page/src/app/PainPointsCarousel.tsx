"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  "…cumpărat ceva redus „doar azi”, ca peste câteva zile să vezi un preț mai mic la același produs, fără să fie inclus în vreo ofertă?",
  "…dat click pe un banner care anunța reduceri de până la 80%, doar ca să descoperi că ceea ce cumperi tu de obicei nu intră în promoție?",
  "…adăugat în coș ceva de care chiar nu aveai nevoie doar ca să obții „transport gratuit”?",
  "…plasat o comandă mai repede decât voiai, pentru că un cronometru îți spunea că pierzi oferta?",
];

export default function PainPointsCarousel() {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const go = (i: number) => setIndex(Math.min(Math.max(i, 0), count - 1));

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

      <div className="kluppi-carousel-arrows">
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
