"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Gift, Target, Ticket, ChevronDown } from "lucide-react";
import PainPointsCarousel from "./PainPointsCarousel";
import HowItWorks from "./HowItWorks";
import SplitBanner from "./SplitBanner";

const socials = [
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    path: "M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z",
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    path: "M16 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3ZM19.25 16C19.2445 17.7926 17.7926 19.2445 16 19.25H8C6.20735 19.2445 4.75549 17.7926 4.75 16V8C4.75549 6.20735 6.20735 4.75549 8 4.75H16C17.7926 4.75549 19.2445 6.20735 19.25 8V16ZM16.75 8.25C17.3023 8.25 17.75 7.80228 17.75 7.25C17.75 6.69772 17.3023 6.25 16.75 6.25C16.1977 6.25 15.75 6.69772 15.75 7.25C15.75 7.80228 16.1977 8.25 16.75 8.25ZM12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5027 10.8057 16.0294 9.65957 15.1849 8.81508C14.3404 7.97059 13.1943 7.49734 12 7.5ZM9.25 12C9.25 13.5188 10.4812 14.75 12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25C10.4812 9.25 9.25 10.4812 9.25 12Z",
  },
  {
    href: "https://twitter.com/home",
    label: "X",
    path: "M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z",
  },
  {
    href: "https://www.linkedin.com/feed/",
    label: "LinkedIn",
    path: "M4.5 3C3.67157 3 3 3.67157 3 4.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67157 20.3284 3 19.5 3H4.5ZM8.52076 7.00272C8.52639 7.95897 7.81061 8.54819 6.96123 8.54397C6.16107 8.53975 5.46357 7.90272 5.46779 7.00413C5.47201 6.15897 6.13998 5.47975 7.00764 5.49944C7.88795 5.51913 8.52639 6.1646 8.52076 7.00272ZM12.2797 9.76176H9.7583V18.3216H12.4217V16.9819C12.4203 15.9674 12.4194 14.9532 12.4246 13.9397C12.426 13.6936 12.4372 13.4377 12.5005 13.2028C12.7381 12.3253 13.5271 11.7586 14.4074 11.8979C14.9727 11.9864 15.3467 12.3141 15.5042 12.8471C15.6013 13.1803 15.6449 13.5389 15.6491 13.8863C15.6605 14.9339 15.6589 15.9815 15.6573 17.0292V18.3202H18.328V16.7591C18.327 15.6293 18.3264 14.5001 18.3294 13.3702C18.3308 12.8597 18.276 12.3563 18.1508 11.8627C17.9638 11.1286 17.5771 10.5211 16.9485 10.0824C16.5027 9.77019 16.0133 9.5691 15.4663 9.5466C14.9984 9.52209 14.7141 9.50673 14.4467 9.56066C13.6817 9.71394 13.0096 10.0641 12.5019 10.6814C12.4429 10.7522 12.3852 10.8241 12.2991 10.9314L12.2797 10.9557V9.76176ZM5.68164 18.3244H8.33242V9.76733H5.68164V18.3244Z",
  },
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
                  <a href="#top" aria-current="page" className="navbar-link w-nav-link w--current" onClick={() => setMenuOpen(false)}>Home</a>
                  <a href="#about" className="navbar-link w-nav-link" onClick={() => setMenuOpen(false)}>About</a>
                  <a href="#work" className="navbar-link w-nav-link" onClick={() => setMenuOpen(false)}>Projects</a>
                  <a href="#contact" className="navbar-link w-nav-link" onClick={() => setMenuOpen(false)}>Contact</a>
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
                    <div className="header-image-wrapper is-image-5">
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
                      <h1 className="heading-style-h1 kluppi-hero-h1">
                        Coduri și avantaje exclusive, direct de la branduri, în fiecare lună
                      </h1>
                    </div>
                    <p className="text-size-large kluppi-hero-body z-index-2" data-reveal style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}>
                      Lucrăm direct cu brandurile și îți aducem, lună de lună, coduri de reducere și beneficii reale, create special pentru membrii Kluppi.
                    </p>
                    <div className="margin-top margin-medium z-index-2" data-reveal style={{ "--reveal-delay": "0.24s" } as React.CSSProperties}>
                      <a href="#contact" className="kluppi-hero-cta">Rezervă-ți locul în club</a>
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
            <p className="text-size-large kluppi-band-title" data-reveal>
              Coduri dedicate · Doar pentru membri · Exact pe gustul tău
            </p>
            <p className="kluppi-band-sub" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
              Te alături acum? Primești o surpriză specială la lansare.
            </p>
          </div>
        </section>

        <section className="kluppi-painpoints">
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
                <a href="#contact" className="kluppi-hero-cta">Rezervă-ți locul în club</a>
                <p className="kluppi-hero-trust">Rapid, doar cu nume și e-mail.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-stats background-black" id="services">
          <div className="padding-global">
            <div className="container-large">
              <div className="section-padding-large">
                <div className="stats-component">
                  <h2 className="kluppi-benefits-heading" data-reveal>Ce te așteaptă în Kluppi?</h2>
                  <div className="kluppi-benefits-grid" data-reveal>
                    <article className="kluppi-benefit kluppi-benefit--b1">
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Mai multă încredere la checkout</h3>
                        <p className="kluppi-benefit-desc">Nu ar trebui să te întrebi de fiecare dată dacă oferta este reală sau dacă prețul a fost umflat înainte să fie redus. Noi discutăm direct cu brandurile și verificăm fiecare beneficiu înainte să ajungă la tine.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img--i1 kluppi-benefit-icon-card">
                      <ShieldCheck className="kluppi-benefit-card-icon" aria-hidden="true" strokeWidth={1.5} />
                    </div>
                    <article className="kluppi-benefit kluppi-benefit--b2">
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Beneficii noi, în fiecare lună</h3>
                        <p className="kluppi-benefit-desc">Nu suntem un site de cupoane care adaugă oferte din când în când. Aducem periodic avantaje și branduri noi în club, pentru ca tu să poți cumpăra smart exact atunci când ai nevoie.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img--i2 kluppi-benefit-icon-card">
                      <Gift className="kluppi-benefit-card-icon" aria-hidden="true" strokeWidth={1.5} />
                    </div>
                    <article className="kluppi-benefit kluppi-benefit--b3">
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Oferte relevante pentru tine</h3>
                        <p className="kluppi-benefit-desc">Fiecare mesaj pe care îl primești trebuie să conteze. Tu alegi categoriile care te interesează, iar noi îți trimitem avantajele relevante pentru tine.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img--i3 kluppi-benefit-icon-card">
                      <Target className="kluppi-benefit-card-icon" aria-hidden="true" strokeWidth={1.5} />
                    </div>
                    <article className="kluppi-benefit kluppi-benefit--b4">
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Acces gratuit în club</h3>
                        <p className="kluppi-benefit-desc">Nu trebuie să plătești ca să îți rezervi locul sau să obții oferte din categoria preferată. Te înscrii rapid și ai acces gratuit la Kluppi odată ce lansăm. Și dacă te răzgândești, te dezabonezi și gata.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img--i4 kluppi-benefit-icon-card">
                      <Ticket className="kluppi-benefit-card-icon" aria-hidden="true" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="kluppi-benefits-cta-block" data-reveal>
                    <a href="#contact" className="kluppi-hero-cta">Rezervă-ți locul în club</a>
                    <p className="kluppi-hero-trust">Pleci oricând, fără explicații.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="kluppi-steps">
          <div className="kluppi-steps-inner">
            <h2 className="kluppi-steps-heading" data-reveal>Cum funcționează?</h2>
            <HowItWorks />
            <div className="kluppi-steps-cta-block" data-reveal>
              <a href="#contact" className="kluppi-hero-cta">Rezervă-ți locul în club</a>
              <p className="kluppi-hero-trust">În mai puțin de un minut.</p>
            </div>
          </div>
        </section>

        <section className="section-stats background-black">
          <div className="padding-global">
            <div className="container-large">
              <div className="section-padding-large">
                <div className="stats-component">
                  <h2 className="kluppi-benefits-heading" data-reveal>Kluppi este pentru tine dacă…</h2>
                  <div className="kluppi-benefits-grid" data-reveal>
                    <article className="kluppi-benefit kluppi-benefit--b1">
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Îți place să cumperi, nu să fii influențat</h3>
                        <p className="kluppi-benefit-desc">Nu vrei să renunți la lucrurile care îți plac. Ai nevoie doar să știi că ai făcut o alegere bună.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img kluppi-benefit-img--i1">
                      <img className="stat-image" src="https://cdn.prod.website-files.com/66aa5c84201514536a227e7c/66c35fc21fa23caa564836d4_lee-campbell-DtDlVpy-vvQ-unsplash.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 31vw" alt="" />
                    </div>
                    <article className="kluppi-benefit kluppi-benefit--b2">
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Știi deja toate trucurile de marketing</h3>
                        <p className="kluppi-benefit-desc">Ai văzut suficiente oferte și reduceri “de neratat” ca să te mai impresioneze ceva.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img kluppi-benefit-img--i2">
                      <img className="stat-image" src="https://cdn.prod.website-files.com/66aa5c84201514536a227e7c/66aba0a990cff59371467899_mk-2-yeQfucZ-g2I-unsplash.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 31vw" alt="" />
                    </div>
                    <article className="kluppi-benefit kluppi-benefit--b3">
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Nu vrei motive să cumperi mai mult</h3>
                        <p className="kluppi-benefit-desc">Nu îți place să cumperi impulsiv. Cauți doar un preț mai bun pentru ceea ce voiai deja.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img kluppi-benefit-img--i3">
                      <img className="stat-image" src="https://cdn.prod.website-files.com/66aa5c84201514536a227e7c/66c36022311552387248d6fa_ales-nesetril-Im7lZjxeLhg-unsplash.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 31vw" alt="" />
                    </div>
                    <article className="kluppi-benefit kluppi-benefit--b4">
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Preferi să alegi tu momentul potrivit</h3>
                        <p className="kluppi-benefit-desc">Iei decizii atunci când vrei tu, nu atunci când te grăbește cineva să acționezi.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img kluppi-benefit-img--i4">
                      <img className="stat-image" src="/Hero8.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 31vw" alt="" />
                    </div>
                  </div>
                  <div className="kluppi-benefits-cta-block" data-reveal>
                    <a href="#contact" className="kluppi-hero-cta">Rezervă-ți locul în club</a>
                    <p className="kluppi-hero-trust">Surpriză specială la lansare.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="kluppi-faq">
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

        <section className="section-contact background-black" id="contact">
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
                    <button className="kluppi-hero-cta kluppi-signup-cta" type="submit" disabled={status === "loading"}>
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

        <footer className="footer-component">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-top padding-xxlarge">
                <div className="padding-bottom padding-large">
                  <div className="w-layout-grid footer-top-wrapper">
                    <div className="footer-left-wrapper">
                      <div className="margin-bottom margin-medium">
                        <a href="#top" aria-current="page" className="footer-logo-link w-nav-brand w--current">
                          <img src="/logo.svg" loading="lazy" alt="Kluppi" className="footer-logo" />
                        </a>
                      </div>
                    </div>
                    <div className="w-layout-grid footer-menu-wrapper">
                      <div id="w-node-_5d53571d-05a3-3001-8aed-4eb278bd7ac9-78bd7aaf" className="footer-link-list">
                        <a href="#top" aria-current="page" className="footer-link w--current">Home</a>
                        <a href="#about" className="footer-link">About</a>
                        <a href="#work" className="footer-link">Projects</a>
                        <a href="#contact" className="footer-link">Contact</a>
                      </div>
                      <div id="w-node-_5d53571d-05a3-3001-8aed-4eb278bd7ad2-78bd7aaf" className="footer-link-list">
                        {socials.map((s) => (
                          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="footer-link">{s.label}</a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="line-divider" />
                <div className="padding-vertical padding-medium">
                  <div className="footer-bottom">
                    <div className="footer-credit-text">© {new Date().getFullYear()} Kluppi.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
