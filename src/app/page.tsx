"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Tickets, LockKeyhole, Heart } from "lucide-react";
import PainPointsCarousel from "./PainPointsCarousel";
import HowItWorks from "./HowItWorks";
import SplitBanner from "./SplitBanner";
import BenefitsCards from "./BenefitsCards";
import { trackViewHomepage } from "./themarketer-events";

const socials = [
  { href: "https://www.facebook.com/joinkluppi", label: "Facebook" },
  { href: "https://www.instagram.com/joinkluppi", label: "Instagram" },
  { href: "https://www.linkedin.com/company/joinkluppi", label: "LinkedIn" },
];

const faqs = [
  {
    q: "Ce este Kluppi?",
    a: "Kluppi este un club de shopping care îți oferă acces la coduri de reducere și alte avantaje obținute direct de la branduri, doar pentru membri.",
  },
  {
    q: "Trebuie să plătesc pentru a-mi rezerva locul?",
    a: "Nu. Înscrierea în club este complet gratuită.",
  },
  {
    q: "De ce informații am nevoie pentru înscriere?",
    a: "Doar de numele tău și de o adresă de e-mail.",
  },
  {
    q: "Îmi creez contul acum?",
    a: "Nu încă. Acum îți rezervi locul. Îți vei crea contul și îți vei configura preferințele când lansăm oficial Kluppi.",
  },
  {
    q: "Ce fel de avantaje voi putea accesa?",
    a: "În funcție de brand, poți accesa coduri de reducere, vouchere, transport gratuit, cadouri surpriză sau alte beneficii create pentru membrii Kluppi.",
  },
  {
    q: "Pot folosi Kluppi gratuit?",
    a: "Da. La lansare, vei putea intra gratuit în Kluppi și vei decide singur cum vrei să folosești clubul.",
  },
  {
    q: "Când se lansează?",
    a: "Foarte curând. Dacă îți rezervi locul, vei fi printre primii care află.",
  },
  {
    q: "Ce primesc dacă mă înscriu înainte de lansare?",
    a: "Dacă îți rezervi deja accesul, primești o surpriză din partea noastră în momentul lansării. Este felul nostru de a-ți mulțumi pentru susținere. Îți vom spune mai multe la momentul potrivit. (Și, da, abia așteptăm, suntem noi mai entuziasmați decât tine).",
  },
];

type SubmitState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const leftListRef = useRef<HTMLDivElement>(null);
  const rightListRef = useRef<HTMLDivElement>(null);
  const hero5Ref = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const answerRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [, remeasureFaqs] = useState(0);
  const toggleFaq = (i: number) =>
    setOpenFaqs((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  // Keep open answers' pinned heights correct when the viewport (and thus text wrap) changes.
  useEffect(() => {
    const onResize = () => remeasureFaqs((t) => t + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  // Contact + partner emails assembled client-side from parts, so the literal
  // addresses are in neither the server-rendered HTML nor a single JS string —
  // stops the naive HTML-scraping bots that harvest most spam targets. (Set after
  // mount, so the first client render matches the server: no href → no hydration
  // mismatch.)
  const [contactHref, setContactHref] = useState<string>();
  const [partnersHref, setPartnersHref] = useState<string>();
  // theMarketer: fire the __sm__view_homepage event once on landing.
  useEffect(() => {
    trackViewHomepage();
  }, []);

  useEffect(() => {
    setContactHref(`mailto:${["hello", "kluppi.com"].join("@")}`);
    setPartnersHref(`mailto:${["partners", "kluppi.com"].join("@")}`);
  }, []);

  useEffect(() => {
    const wrapper = componentRef.current;
    const left = leftListRef.current;
    const right = rightListRef.current;
    if (!wrapper || !left || !right) return;

    let ticking = false;

    const render = () => {
      ticking = false;
      const vh = window.innerHeight;
      const rect = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - vh;
      const progress =
        scrollable <= 0 ? 0 : Math.min(Math.max(-rect.top / scrollable, 0), 1);

      // Drift each column by exactly its own overflow past the viewport,
      // recomputed every frame so it stays correct as the lazy images finish
      // loading. Tying the distance to each column's real height keeps the
      // images scrolling through seamlessly without over-running — the fixed
      // viewport multiples used before pushed the shorter right column right
      // off the screen, leaving an empty gap.
      const leftShift = Math.max(0, left.offsetHeight - vh);
      const rightShift = Math.max(0, right.offsetHeight - vh);
      left.style.transform = `translate3d(0, ${-progress * leftShift}px, 0)`;
      right.style.transform = `translate3d(0, ${-progress * rightShift}px, 0)`;

      // Hero5 (is-image-5) drifts a touch more than the rest of the right
      // column: it now starts lower (CSS `top` on is-image-5) but this extra
      // upward travel lands its end point higher on the page. 0 at the top of
      // the page → 12vw by the end. Desktop only (matches the CSS offsets).
      const hero5 = hero5Ref.current;
      if (hero5) {
        if (window.matchMedia("(min-width: 992px)").matches) {
          const extra = (progress * 12 * window.innerWidth) / 100; // 12vw over the scroll
          hero5.style.transform = `translate3d(0, ${-extra}px, 0)`;
        } else {
          hero5.style.transform = "";
        }
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
  }, []);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Ceva n-a mers. Mai încearcă o dată.");
        return;
      }
      setStatus("success");
      setMessage("Gata! Ți-ai rezervat locul. Ne auzim curând.");
      setFirstName("");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Eroare de rețea. Mai încearcă o dată.");
    }
  };

  return (
    <div className="page-wrapper navbar-on-page">
      <div
        className="navbar-component w-nav"
        data-collapse="all"
        role="banner"
      >
        <div className="navbar-container">
          <a href="#top" aria-current="page" className="navbar-logo-link w-nav-brand w--current">
            <img src="/logo.svg" loading="lazy" alt="Kluppi" className="navbar-logo" />
          </a>
          <div className="navbar-wrapper">
            <nav
              role="navigation"
              className="navbar-menu w-nav-menu"
              style={{ display: menuOpen ? "flex" : "none" }}
            >
              <div className="navbar-menu-wrapper">
                <div className="navbar-links-wrapper">
                  <a href="#contact" className="navbar-link w-nav-link" onClick={() => setMenuOpen(false)}>Înscrie-te în club</a>
                  <a href="#cum-functioneaza" className="navbar-link w-nav-link" onClick={() => setMenuOpen(false)}>Cum funcționează</a>
                  <a href="#intrebari-frecvente" className="navbar-link w-nav-link" onClick={() => setMenuOpen(false)}>Întrebări frecvente</a>
                  <a
                    href={partnersHref}
                    className="navbar-link w-nav-link"
                    onClick={(e) => {
                      // Fallback for the (tiny) window before the effect sets the href.
                      if (!partnersHref) {
                        e.preventDefault();
                        window.location.href = `mailto:${["partners", "kluppi.com"].join("@")}`;
                      }
                      setMenuOpen(false);
                    }}
                  >
                    Devino partener
                  </a>
                  <a
                    href={contactHref}
                    className="navbar-link w-nav-link"
                    onClick={(e) => {
                      if (!contactHref) {
                        e.preventDefault();
                        window.location.href = `mailto:${["hello", "kluppi.com"].join("@")}`;
                      }
                      setMenuOpen(false);
                    }}
                  >
                    Contact
                  </a>
                </div>
              </div>
            </nav>
            <div
              className={`navbar-menu-button w-nav-button${menuOpen ? " w--open" : ""}`}
              role="button"
              tabIndex={0}
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <div className="menu-icon">
                <div className="menu-icon-wrapper">
                  <div className="menu-icon-line-top" />
                  <div className="menu-icon-line-middle">
                    <div className="menu-icon-line-middle-top" />
                    <div className="menu-icon-line-middle-base" />
                  </div>
                  <div className="menu-icon-line-bottom" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-wrapper max-width-full">
        <header className="section-header kluppi-hero" id="top">
          <div className="padding-global">
            <div className="header-component" ref={componentRef}>
              <div className="header-content-wrapper">
                <div className="header-images-wrapper">
                  <div className="header-image-list" ref={leftListRef}>
                    <div className="header-image-wrapper is-image-1">
                      <img className="header-image" src="/Hero3.jpg" alt="" sizes="(max-width: 767px) 30vw, (max-width: 991px) 28vw, 22vw" loading="lazy" />
                    </div>
                    <div className="header-image-wrapper is-image-2">
                      <img className="header-image" src="/Hero6.jpg" alt="" sizes="(max-width: 767px) 30vw, (max-width: 991px) 28vw, 22vw" loading="lazy" />
                    </div>
                    <div className="header-image-wrapper is-image-3">
                      <img className="header-image" src="/Hero4.jpg" loading="lazy" sizes="(max-width: 767px) 28vw, (max-width: 991px) 26vw, 20vw" alt="" />
                    </div>
                    <div className="header-image-wrapper is-image-4">
                      <img className="header-image" src="/Hero2.jpg" loading="lazy" sizes="(max-width: 767px) 26vw, (max-width: 991px) 24vw, 18vw" alt="" />
                    </div>
                  </div>
                </div>
                <div className="header-images-wrapper images-wrapper-right">
                  <div className="header-image-list image-list-right" ref={rightListRef}>
                    <div className="header-image-wrapper is-image-5" ref={hero5Ref}>
                      <img className="header-image" src="/Hero5.jpg" alt="" sizes="(max-width: 767px) 28vw, (max-width: 991px) 26vw, 20vw" loading="lazy" />
                    </div>
                    <div className="header-image-wrapper is-image-6">
                      <img className="header-image" src="/Hero8.jpg" alt="" sizes="(max-width: 767px) 26vw, (max-width: 991px) 24vw, 18vw" loading="lazy" />
                    </div>
                  </div>
                </div>
                <div className="header-content">
                  <div className="text-align-center">
                    <p className="kluppi-hero-eyebrow z-index-2" data-reveal>Lansăm în curând</p>
                    <div className="margin-bottom margin-small z-index-2" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
                      <h1 className="kluppi-hero-h1">
                        Coduri și avantaje exclusive, direct de la branduri, în fiecare lună
                      </h1>
                    </div>
                    <p className="kluppi-hero-body z-index-2" data-reveal style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}>
                      Lucrăm direct cu brandurile și îți aducem, lună de lună, coduri de reducere și beneficii reale, create special pentru membrii Kluppi.
                    </p>
                    <div className="margin-top margin-medium z-index-2" data-reveal style={{ "--reveal-delay": "0.24s" } as React.CSSProperties}>
                      <a href="#contact" className="kluppi-btn">Rezervă-ți locul în club</a>
                      <p className="kluppi-hero-trust">Înscriere gratuită · Fără obligații</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="header-ix-trigger" />
            </div>
          </div>
        </header>

        <section className="kluppi-band">
          <div className="kluppi-band-inner">
            <div className="kluppi-band-grid">
              <div className="kluppi-band-cell" data-reveal>
                <Tickets className="kluppi-band-icon" aria-hidden="true" strokeWidth={1.5} />
                <p className="text-size-large kluppi-band-title">Coduri dedicate</p>
              </div>
              <div className="kluppi-band-cell" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
                <LockKeyhole className="kluppi-band-icon" aria-hidden="true" strokeWidth={1.5} />
                <p className="text-size-large kluppi-band-title">Doar pentru membri</p>
              </div>
              <div className="kluppi-band-cell" data-reveal style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}>
                <Heart className="kluppi-band-icon" aria-hidden="true" strokeWidth={1.5} />
                <p className="text-size-large kluppi-band-title">Exact pe gustul tău</p>
              </div>
            </div>
          </div>
        </section>

        <SplitBanner
          line1="Primești o surpriză specială la lansare."
          line2="Te alături acum?"
          reversed
          converge
          cta={
            <>
              <a href="#contact" className="kluppi-btn">Rezervă-ți locul în club</a>
              <p className="kluppi-hero-trust">Îți scriem mereu cu rost.</p>
            </>
          }
        />

        <section className="kluppi-painpoints kluppi-section">
          <div className="kluppi-painpoints-inner">
            <h2 className="kluppi-painpoints-heading" data-reveal>De câte ori ai…</h2>
            <PainPointsCarousel />
            <div className="kluppi-painpoints-conclusion" data-reveal>
              <h3 className="kluppi-painpoints-h2">Nu ți s-a întâmplat doar ție.</h3>
              <p className="text-size-large kluppi-hero-body">
                A devenit din ce în ce mai rară senzația că plătești prețul corect atunci când cumperi online.
              </p>
            </div>
            <div className="kluppi-painpoints-outro" data-reveal>
              <h3 className="kluppi-painpoints-h2">Noi ne-am săturat de toate astea.</h3>
              <p className="text-size-large kluppi-hero-body">
                Și am creat Kluppi: prietenul care are mereu un cod de reducere bun, exact când îți trebuie.
              </p>
              <div className="kluppi-painpoints-cta">
                <a href="#contact" className="kluppi-btn">Rezervă-ți locul în club</a>
                <p className="kluppi-hero-trust">Rapid, doar cu nume și e-mail.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="kluppi-benefits" id="services">
          <div className="padding-global">
            <div className="container-large">
              <div className="section-padding-large">
                <div className="kluppi-section-content">
                  <h2 className="kluppi-benefits-heading" data-reveal>Ce te așteaptă în Kluppi?</h2>
                  <BenefitsCards />
                  <div className="kluppi-benefits-cta-block" data-reveal>
                    <a href="#contact" className="kluppi-btn">Rezervă-ți locul în club</a>
                    <p className="kluppi-hero-trust">Pleci oricând, fără explicații.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="kluppi-steps kluppi-section" id="cum-functioneaza">
          <div className="kluppi-steps-inner">
            <h2 className="kluppi-steps-heading" data-reveal>Cum funcționează?</h2>
            <HowItWorks />
            <div className="kluppi-steps-cta-block" data-reveal>
              <a href="#contact" className="kluppi-btn">Rezervă-ți locul în club</a>
              <p className="kluppi-hero-trust">În mai puțin de un minut.</p>
            </div>
          </div>
        </section>

        <section className="kluppi-reasons">
          <div className="padding-global">
            <div className="container-large">
              <div className="section-padding-large">
                <div className="kluppi-section-content">
                  <h2 className="kluppi-benefits-heading" data-reveal>Kluppi este pentru tine dacă…</h2>
                  <div className="kluppi-benefits-grid">
                    <article className="kluppi-benefit kluppi-benefit--b1" data-reveal>
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Îți place să cumperi, nu să fii influențat</h3>
                        <p className="kluppi-benefit-desc">Nu vrei să renunți la lucrurile care îți plac. Ai nevoie doar să știi că ai făcut o alegere bună.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img kluppi-benefit-img--i1" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
                      <img className="stat-image" src="/Reasons1.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 31vw" alt="" />
                    </div>
                    <article className="kluppi-benefit kluppi-benefit--b2" data-reveal>
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Știi deja toate trucurile de marketing</h3>
                        <p className="kluppi-benefit-desc">Ai văzut suficiente oferte și reduceri “de neratat” ca să te mai impresioneze ceva.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img kluppi-benefit-img--i2" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
                      <img className="stat-image" src="/Reasons2.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 31vw" alt="" />
                    </div>
                    <article className="kluppi-benefit kluppi-benefit--b3" data-reveal>
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Nu vrei motive să cumperi mai mult</h3>
                        <p className="kluppi-benefit-desc">Nu îți place să cumperi impulsiv. Cauți doar un preț mai bun pentru ceea ce voiai deja.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img kluppi-benefit-img--i3" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
                      <img className="stat-image" src="/Reasons3.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 31vw" alt="" />
                    </div>
                    <article className="kluppi-benefit kluppi-benefit--b4" data-reveal>
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Preferi să alegi tu momentul potrivit</h3>
                        <p className="kluppi-benefit-desc">Iei decizii atunci când vrei tu, nu atunci când te grăbește cineva să acționezi.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img kluppi-benefit-img--i4" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
                      <img className="stat-image" src="/Reasons4.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 31vw" alt="" />
                    </div>
                  </div>
                  <div className="kluppi-benefits-cta-block" data-reveal>
                    <a href="#contact" className="kluppi-btn">Rezervă-ți locul în club</a>
                    <p className="kluppi-hero-trust">Surpriză specială la lansare.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="kluppi-faq kluppi-section" id="intrebari-frecvente">
          <div className="kluppi-faq-inner">
            <h2 className="kluppi-faq-heading" data-reveal>Întrebări frecvente</h2>
            <div className="kluppi-faq-list" data-reveal>
              {faqs.map((item, i) => {
                const open = openFaqs.includes(i);
                return (
                  <div className={`kluppi-faq-item${open ? " is-open" : ""}`} key={item.q}>
                    <button
                      type="button"
                      className="kluppi-faq-question"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={open}
                    >
                      {item.q}
                      <ChevronDown className="kluppi-faq-chevron" aria-hidden="true" strokeWidth={2} />
                    </button>
                    <div
                      className="kluppi-faq-answer-wrap"
                      style={{ height: open ? answerRefs.current[i]?.scrollHeight ?? 0 : 0 }}
                    >
                      <p
                        ref={(el) => {
                          answerRefs.current[i] = el;
                        }}
                        className="kluppi-faq-answer"
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="kluppi-signup-section" id="contact">
          <div className="padding-global">
            <div className="container-large">
              <div className="section-padding-large">
                <div className="kluppi-signup">
                  <h2 className="kluppi-signup-heading" data-reveal>
                    Fii printre primii care află când lansăm.
                  </h2>
                  <p
                    className="kluppi-signup-text"
                    data-reveal
                    style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
                  >
                    Rezervă-ți gratuit locul în Kluppi, iar noi îți spunem când vine ziua cea mare.
                  </p>
                  <form
                    className="kluppi-signup-form"
                    onSubmit={handleSubmit}
                    noValidate
                    data-reveal
                    style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}
                  >
                    <input
                      className="form-input kluppi-signup-input"
                      type="text"
                      name="firstName"
                      placeholder="Introdu prenumele"
                      aria-label="Prenume"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      disabled={status === "loading"}
                    />
                    <input
                      className="form-input kluppi-signup-input"
                      type="email"
                      name="email"
                      placeholder="Introdu adresa de e-mail"
                      aria-label="Adresă de e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={status === "loading"}
                    />
                    <button className="kluppi-btn kluppi-signup-cta" type="submit" disabled={status === "loading"}>
                      {status === "loading" ? "Se trimite…" : "Rezervă-ți locul în club"}
                    </button>
                  </form>
                  {message && (
                    <p className={`kluppi-signup-message ${status === "error" ? "is-error" : "is-success"}`}>
                      {message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <SplitBanner />

        <footer className="kluppi-footer">
          <div className="kluppi-footer-inner">
            <div className="kluppi-footer-divider" />
            <a href="#top" aria-current="page" className="kluppi-footer-logo-link">
              <img src="/logo.svg" loading="lazy" alt="Kluppi" className="kluppi-footer-logo" />
            </a>
            <nav className="kluppi-footer-socials" aria-label="Rețele sociale">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="kluppi-footer-social">{s.label}</a>
              ))}
              <a
                href={contactHref}
                className="kluppi-footer-social"
                onClick={(e) => {
                  // Fallback for the (tiny) window before the effect sets the href.
                  if (!contactHref) {
                    e.preventDefault();
                    window.location.href = `mailto:${["hello", "kluppi.com"].join("@")}`;
                  }
                }}
              >
                Contact
              </a>
            </nav>
            <div className="kluppi-footer-divider" />
            <div className="kluppi-footer-bottom">
              <div className="kluppi-footer-legal">
                <a href="/termeni-si-conditii" target="_blank" rel="noopener noreferrer" className="kluppi-footer-link">Termeni și condiții</a>
                <a href="/confidentialitate" target="_blank" rel="noopener noreferrer" className="kluppi-footer-link">Politica de confidențialitate</a>
                <a href="/politica-cookies" target="_blank" rel="noopener noreferrer" className="kluppi-footer-link">Politica de utilizare cookie-uri</a>
              </div>
              <p className="kluppi-footer-copy">© Copyright {new Date().getFullYear()} · Toate drepturile rezervate</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
