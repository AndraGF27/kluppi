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
      // Cap the drift on tablet/phone so the lines barely move (~12px) instead of
      // ±30% of the width — at small widths the full drift shoves text off-centre
      // and can spill past the viewport. Desktop (≥992) keeps the full motion.
      const maxDrift = window.innerWidth < 992 ? 24 : Infinity;
      const base = Math.min(window.innerWidth * 0.3, maxDrift);
      if (converge) {
        // Lines start at the outer edges and drift inward as it scrolls up.
        // line2 ("Te alături acum?") drifts right by the standard amount. line1
        // ("Primești…") drifts left ONLY until its text's left edge reaches the
        // inner-left — i.e. where line2 starts — so it stops there instead of
        // overshooting (a shorter, slower drift). Distance = block width − text width.
        const range = document.createRange();
        range.selectNodeContents(l1);
        const l1Drift = Math.min(
          Math.max(l1.clientWidth - range.getBoundingClientRect().width, 0),
          maxDrift,
        );
        l1.style.transform = `translateX(${-progress * l1Drift}px)`;
        l2.style.transform = `translateX(${progress * base}px)`;
      } else {
        // Lines start pulled toward the centre and spread to the edges. On
        // mobile/tablet the CSS flips the layout (orange line2 → left, dark line1
        // → right), so flip the drift direction too — otherwise the lines push
        // *past* the screen edges and get clipped instead of easing inward.
        const dir = window.innerWidth < 992 ? -1 : 1;
        const pull = (1 - progress) * base;
        l1.style.transform = `translateX(${dir * pull}px)`; // left line: pulled right → settles left
        l2.style.transform = `translateX(${-dir * pull}px)`; // right line: pulled left → settles right
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
