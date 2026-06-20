"use client";

import { useEffect, useRef } from "react";

// Tagline banner below the form. The two lines start pulled toward the centre and,
// as the section scrolls up through the viewport, spread apart to the edges — line 1
// to the left, line 2 to the right. Pure scroll-driven transform (rAF-throttled).
export default function SplitBanner() {
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
      // Inward pull (px) at progress 0, easing to 0 (edges) at progress 1.
      const pull = (1 - progress) * window.innerWidth * 0.3;
      l1.style.transform = `translateX(${pull}px)`; // left line: pulled right → settles left
      l2.style.transform = `translateX(${-pull}px)`; // right line: pulled left → settles right
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
  }, []);

  return (
    <section className="section-banner-cta kluppi-banner" ref={sectionRef}>
      <div className="kluppi-banner-inner">
        <p className="kluppi-banner-line1" ref={line1Ref}>
          Cumpără ce voiai oricum.
        </p>
        <p className="kluppi-banner-line2" ref={line2Ref}>
          Doar mai smart.
        </p>
      </div>
    </section>
  );
}
