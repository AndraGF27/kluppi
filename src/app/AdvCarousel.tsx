"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, Gift, Percent, Sparkles, Truck, type LucideIcon } from "lucide-react";
import "./adv-carousel.css";

// "Cât poți economisi cu Kluppi?" — a carousel of savings "receipts" (Andra's
// design, 2026-10-19: Home.html, `site/adv-carousel.js`). It replaces the
// savings simulator on the home page. Every figure is an illustrative example,
// as each receipt's own note says.

type Row = { label: string; value: string; struck?: string; kind?: "hl" | "tot" };
type Slide = {
  Icon: LucideIcon;
  eyebrow: string;
  title: string;
  rows: Row[];
  pill: string;
  amount: number;
  tail: string;
};

const SLIDES: Slide[] = [
  {
    Icon: Percent,
    eyebrow: "Reduceri de preț",
    title: "15% discount la cumpărături.",
    rows: [
      { label: "Subtotal", value: "300 lei" },
      { label: "Reducere de membru −15%", value: "−45 lei", kind: "hl" },
      { label: "Total", value: "255 lei", kind: "tot" },
    ],
    pill: "−15%",
    amount: 45,
    tail: "rămân la tine.",
  },
  {
    Icon: Truck,
    eyebrow: "Transport gratuit",
    title: "Livrare din partea brandului.",
    rows: [
      { label: "Subtotal", value: "180 lei" },
      { label: "Transport", struck: "25 lei", value: "0 lei", kind: "hl" },
      { label: "Total", value: "180 lei", kind: "tot" },
    ],
    pill: "Livrare 0 lei",
    amount: 25,
    tail: "rămân la tine.",
  },
  {
    Icon: Gift,
    eyebrow: "Cadou la comandă",
    title: "Un produs în plus, fără plată.",
    rows: [
      { label: "Subtotal", value: "250 lei" },
      { label: "Cadou: set de cești", struck: "60 lei", value: "0 lei", kind: "hl" },
      { label: "Total", value: "250 lei", kind: "tot" },
    ],
    pill: "Cadou inclus",
    amount: 60,
    tail: "în plus, la tine în colet.",
  },
  {
    Icon: Sparkles,
    eyebrow: "Alte avantaje exclusive",
    title: "Servicii incluse în preț.",
    rows: [
      { label: "Subtotal", value: "1.200 lei" },
      { label: "Montaj la domiciliu", struck: "150 lei", value: "0 lei", kind: "hl" },
      { label: "Total", value: "1.200 lei", kind: "tot" },
    ],
    pill: "Doar în club",
    amount: 150,
    tail: "rămân la tine.",
  },
];

const NOTE = "Exemplu ilustrativ. Fiecare ofertă se aplică potrivit condițiilor specifice.";
const SWIPE_PX = 50;
const COUNT_MS = 700;
// Moves on by itself every 5 seconds (Andra, 2026-10-19) — paused while the
// visitor hovers, touches or keyboard-focuses it, off with reduced motion.
const AUTOPLAY_MS = 5000;

/** Counts up to `to` (ease-out cubic) each time `run` changes; shows `to` at once with reduced motion. */
function CountUp({ to, run }: { to: number; run: number }) {
  const [value, setValue] = useState(to);
  useEffect(() => {
    if (run === 0) return; // first paint: the final figure, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let frame = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / COUNT_MS);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [to, run]);
  return <>{value}</>;
}

export default function AdvCarousel({ signupUrl }: { signupUrl: string }) {
  const [cur, setCur] = useState(0);
  // Bumped on every move to a new slide, so only the slide that just became
  // active re-runs its count-up.
  const [runs, setRuns] = useState<number[]>(() => SLIDES.map(() => 0));
  const [offset, setOffset] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointerX = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);

  const go = (i: number) => {
    const next = (i + SLIDES.length) % SLIDES.length;
    if (next === cur) return;
    setCur(next);
    setRuns((r) => r.map((n, k) => (k === next ? n + 1 : n)));
  };

  // The track slides so the active receipt sits at the start of the view; the
  // offset is the slide's own position, re-measured on resize and font load.
  useEffect(() => {
    const measure = () => setOffset(slideRefs.current[cur]?.offsetLeft ?? 0);
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [cur]);

  // Autoplay. Re-armed on every move (manual or automatic), so a click resets
  // the 5 seconds; never runs while paused, while the tab is hidden, or when
  // the visitor asked their device for reduced motion.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      if (document.visibilityState === "visible") go(cur + 1);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
    // `go` is recreated each render; `cur` is what the timer depends on.
  }, [cur, paused, runs]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(cur - 1);
    if (e.key === "ArrowRight") go(cur + 1);
  };
  const onPointerDown = (e: PointerEvent) => {
    pointerX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (pointerX.current === null) return;
    const dx = e.clientX - pointerX.current;
    pointerX.current = null;
    if (Math.abs(dx) > SWIPE_PX) go(cur + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      className="kluppi-section rcpt-section"
      id="simulator"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="rcpt-inner">
        <div className="rcpt-intro" data-reveal>
          <h2 className="kluppi-benefits-heading">Cât poți economisi cu Kluppi?</h2>
        </div>
        <div className="rcpt-view" data-reveal onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          <div className="rcpt-track" style={{ transform: `translateX(${-offset}px)` }}>
            {SLIDES.map((s, k) => {
              const active = k === cur;
              return (
                <div
                  key={s.eyebrow}
                  ref={(el) => {
                    slideRefs.current[k] = el;
                  }}
                  className={`rcpt-slide${active ? " is-active" : ""}`}
                  aria-hidden={!active}
                  onClick={active ? undefined : () => go(k)}
                >
                  <div className="rcpt-sh">
                    <article className="rcpt-tk">
                      <div className="rcpt-main">
                        <p className="rcpt-ey">
                          <span className="rcpt-ic">
                            <s.Icon aria-hidden="true" strokeWidth={1.5} />
                          </span>
                          {s.eyebrow}
                        </p>
                        <h3 className="rcpt-t">{s.title}</h3>
                        <div className="rcpt-rows">
                          {s.rows.map((r) => (
                            <div key={r.label} className={`rcpt-row${r.kind ? ` ${r.kind}` : ""}`}>
                              <span>{r.label}</span>
                              <span>
                                {r.struck && <s>{r.struck}</s>}
                                {r.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rcpt-stub">
                        <span className="rcpt-pill">{s.pill}</span>
                        <div>
                          <p className="rcpt-big">
                            <CountUp to={s.amount} run={runs[k]} /> lei
                          </p>
                          <p className="rcpt-tail">{s.tail}</p>
                        </div>
                        <p className="rcpt-note">{NOTE}</p>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rcpt-bar">
          <div className="rcpt-ctrl">
            <button type="button" className="rcpt-chev" aria-label="Avantajul anterior" onClick={() => go(cur - 1)}>
              <ChevronLeft aria-hidden="true" strokeWidth={1.5} />
            </button>
            <div className="rcpt-seg">
              {SLIDES.map((s, k) => (
                <button
                  key={s.eyebrow}
                  type="button"
                  className={k === cur ? "is-on" : undefined}
                  aria-label={`Avantajul ${k + 1}`}
                  aria-current={k === cur}
                  onClick={() => go(k)}
                />
              ))}
            </div>
            <button type="button" className="rcpt-chev" aria-label="Avantajul următor" onClick={() => go(cur + 1)}>
              <ChevronRight aria-hidden="true" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="rcpt-cta">
          <a href={signupUrl} className="kluppi-btn">Intră în club</a>
          <p className="kluppi-hero-trust">Te înscrii gratuit, fără card</p>
        </div>
      </div>
    </section>
  );
}
