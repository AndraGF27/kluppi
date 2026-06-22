"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    label: "Pasul 01",
    title: "Îți rezervi locul",
    desc: "Completezi formularul cu numele și adresa ta de e-mail. Atât.",
  },
  {
    label: "Pasul 02",
    title: "Rămâi la curent",
    desc: "Până la lansare, primești noutățile importante despre club și afli exact când intrăm în pâine.",
  },
  {
    label: "Pasul 03",
    title: "Îți configurezi contul",
    desc: "La lansare, îți creezi contul, alegi categoriile care te interesează și felul în care vrei să folosești Kluppi.",
  },
  {
    label: "Pasul 04",
    title: "Accesezi avantajele disponibile",
    desc: "Descoperi codurile și beneficiile lunii + pentru că ai fost alături de noi de la bun început, primești și o surpriză specială din partea noastră.",
  },
  {
    label: "Pasul 05",
    title: "Cumperi când ești pregătit",
    desc: "Fără presiune. Fără artificii de marketing. Tu alegi ce, când și dacă merită.",
  },
];

export default function HowItWorks() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timeline = timelineRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!timeline || !track || !fill) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;

    // Span the line track from the first dot's centre to the last dot's centre,
    // then fill it as a horizontal "scan line" (60% down the viewport) passes
    // each dot — lighting the dots up in turn. All positions are remeasured each
    // frame so it stays correct as fonts/images settle and on resize.
    const render = () => {
      ticking = false;
      const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[];
      if (dots.length < 2) return;

      // Measure with getBoundingClientRect relative to the timeline. offsetTop is
      // unreliable here: the step rows carry a CSS transform from the data-reveal
      // entrance, which throws off offsetParent-based offsets (every dot reports
      // nearly the same offset → a zero-height line and dots that all flip at once).
      const tRect = timeline.getBoundingClientRect();
      const centers = dots.map((d) => {
        const r = d.getBoundingClientRect();
        return r.top + r.height / 2 - tRect.top; // dot centre, timeline-relative
      });
      const trackTop = centers[0];
      const trackBottom = centers[centers.length - 1];
      const trackHeight = Math.max(trackBottom - trackTop, 1);
      track.style.top = `${trackTop}px`;
      track.style.height = `${trackHeight}px`;

      // Scan line = 60% down the viewport, expressed in timeline coords.
      const scan = reduce ? trackBottom + 1 : window.innerHeight * 0.6 - tRect.top;
      const within = Math.min(Math.max(scan - trackTop, 0), trackHeight);
      fill.style.height = `${(within / trackHeight) * 100}%`;

      // Each dot ramps from faded → solid Dare Devil (and scales up a touch) as the
      // scan line approaches and reaches it, so the line's progress reads as a smooth
      // colour gradient rather than a hard on/off.
      const ramp = 160; // px before a dot over which it brightens
      dots.forEach((dot, i) => {
        const t = Math.min(Math.max((scan - (centers[i] - ramp)) / ramp, 0), 1);
        dot.style.setProperty("--dot-fill", `rgba(255, 91, 34, ${0.25 + 0.75 * t})`); // colours the ::after face, not the dot's opaque Lemon base
        dot.style.transform = `scale(${1 + 0.15 * t})`;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };

    render();
    const settle = window.setTimeout(render, 300); // re-measure after fonts load
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
    };
  }, []);

  return (
    <div className="kluppi-steps-timeline" ref={timelineRef}>
      <div className="kluppi-steps-line" ref={trackRef} aria-hidden="true">
        <div className="kluppi-steps-line-fill" ref={fillRef} />
      </div>
      {steps.map((step, i) => (
        <div
          key={step.label}
          className={`kluppi-step kluppi-step--${i % 2 === 0 ? "left" : "right"}`}
          data-reveal
          style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
        >
          <div
            className="kluppi-step-dot"
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            aria-hidden="true"
          />
          <div className="kluppi-step-card">
            <p className="kluppi-step-label">{step.label}</p>
            <h3 className="kluppi-step-title">{step.title}</h3>
            <p className="kluppi-step-desc">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
