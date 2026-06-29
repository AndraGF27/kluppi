"use client";

import { useEffect, useRef, type ReactNode } from "react";

type SplitBannerProps = {
  line1?: string; // Switzer / light line
  line2?: string; // Bricolage / bold line
  reversed?: boolean; // render the Bricolage line above the Switzer line (order flipped)
  converge?: boolean; // lines start at the outer edges and drift to the centre (vs the default spread)
  cta?: ReactNode; // optional CTA block rendered (centred) under the lines
};

// Tagline banner. By default the two lines start pulled toward the centre and, as the
// section scrolls up, spread apart to the edges — the Switzer line (line1) to the left,
// the Bricolage line (line2) to the right. Pure scroll-driven transform (rAF-throttled).
// `reversed` flips their vertical order. `converge` inverts the motion: the lines begin
// at the outer edges and drift toward the centre as you scroll (alignment flipped via CSS).
export default function SplitBanner({
  line1 = "Cumpără ce voiai oricum.",
  line2 = "Doar mai smart.",
  reversed = false,
  converge = false,
  cta,
}: SplitBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!section || !l1 || !l2) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;

    const render = () => {
      ticking = false;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      // 0 when the section first enters at the bottom, 1 once it has scrolled past the top.
      const progress = reduce
        ? 1
        : Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      // Each line travels through exactly the whitespace it has on its row —
      // (container width − rendered text width), capped at ±30% of the viewport
      // (the old desktop drift). So the SAME spread gesture scales to every
      // width: small travel when the text nearly fills the row, full travel when
      // it's wide. Lines stay on one row (CSS nowrap), so the cap rarely bites.
      const inner = section.querySelector(".kluppi-banner-inner");
      const containerW = inner ? inner.clientWidth : window.innerWidth;
      const cap = window.innerWidth * 0.3;
      const freeTravel = (el: HTMLElement) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const textW = range.getBoundingClientRect().width;
        return Math.min(Math.max(containerW - textW, 0), cap);
      };
      if (converge) {
        // Lines start at the outer edges and drift inward as it scrolls up:
        // dark line1 (right) → centre, orange line2 (left) → centre.
        l1.style.transform = `translateX(${-progress * freeTravel(l1)}px)`;
        l2.style.transform = `translateX(${progress * freeTravel(l2)}px)`;
      } else {
        // Spread (every width): lines start pulled toward the centre and spread
        // to the edges (dark line1 → left, orange line2 → right) as it scrolls up.
        l1.style.transform = `translateX(${(1 - progress) * freeTravel(l1)}px)`;
        l2.style.transform = `translateX(${-(1 - progress) * freeTravel(l2)}px)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [converge]);

  const switzerLine = (
    <p className="kluppi-banner-line1" ref={line1Ref}>
      {line1}
    </p>
  );
  const bricolageLine = (
    <p className="kluppi-banner-line2" ref={line2Ref}>
      {line2}
    </p>
  );

  return (
    <section
      className={`kluppi-banner kluppi-section${converge ? " kluppi-banner--converge" : ""}`}
      ref={sectionRef}
    >
      <div className="kluppi-banner-inner">
        {reversed ? (
          <>
            {bricolageLine}
            {switzerLine}
          </>
        ) : (
          <>
            {switzerLine}
            {bricolageLine}
          </>
        )}
        {cta && (
          <div className="kluppi-banner-cta" data-reveal>
            {cta}
          </div>
        )}
      </div>
    </section>
  );
}
