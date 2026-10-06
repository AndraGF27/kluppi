"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ChevronDown,
  Tickets,
  LockKeyhole,
  Heart,
  ShieldCheck,
  Calendar,
  UserStar,
  Gift,
} from "lucide-react";
import PainPointsCarousel from "./PainPointsCarousel";
import HowItWorks from "./HowItWorks";
import SplitBanner from "./SplitBanner";
import BenefitsCards from "./BenefitsCards";
import HomeSimulator from "./HomeSimulator";
import HomePlans from "./HomePlans";
import HomeFooter from "./HomeFooter";
import { trackViewHomepage } from "./themarketer-events";
import "./home.css";

// The kluppi.com home page — the post-launch page (Andra's design, 2026-10-06).
// The waitlist it replaced lives at /waitlist with its own header, footer and
// the only signup form; this page collects nothing and links the APP's legal
// documents. Every call to action leads to the app's signup.
const SIGNUP_URL = "https://app.kluppi.com/signup";

const linkStyle = { color: "var(--accent)", textDecoration: "underline" } as const;

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Ce este Kluppi?",
    a: "Kluppi este un club de shopping care îți oferă acces la coduri de reducere și alte avantaje obținute direct de la branduri, doar pentru membri.",
  },
  {
    q: "Cât costă să intru în club?",
    a: "Nimic. Contul Kluppi este gratuit și îți oferă acces la avantaje din categoriile tale preferate. Dacă vrei mai mult, poți activa oricând un abonament Kluppi+, direct din cont.",
  },
  {
    q: "Ce fel de avantaje găsesc în club?",
    a: "În funcție de brand, găsești coduri de reducere, vouchere, transport gratuit, cadouri surpriză sau alte beneficii create pentru membrii Kluppi.",
  },
  {
    q: "Cum folosesc un cod?",
    a: "În contul tău, dai click pe oferta care te interesează și găsești acolo toate detaliile. Comanda și plata se fac direct cu brandul, ca de obicei.",
  },
  {
    q: "Nu găsesc un anumit brand. Ce fac?",
    a: (
      <>
        Căutăm mereu să ne extindem portofoliul de parteneri, ca să vă aducem mai multe oferte și beneficii mai bune. Dacă ai o sugestie, ne-ar plăcea să o auzim. Scrie-ne la{" "}
        <a href="mailto:hello@kluppi.com" style={linkStyle}>hello@kluppi.com</a>.
      </>
    ),
  },
  {
    q: "Pot renunța oricând?",
    a: "Da. Te dezabonezi sau îți închizi contul oricând, fără explicații.",
  },
  {
    q: "Am un brand. Cum ajung în Kluppi?",
    a: (
      <>
        {/* The design links the /parteneri page here ("Găsești aici
            informații…"); while that page is hidden the answer gives the
            partners address instead (wording approved by Andra, 2026-10-06). */}
        Ne bucurăm să te cunoaștem! Scrie-ne la{" "}
        <a href="mailto:partners@kluppi.com" style={linkStyle}>partners@kluppi.com</a>{" "}
        și îți spunem cum funcționează colaborarea.
      </>
    ),
  },
];

// Post-launch wording for the two sections shared with the waitlist page,
// which keeps its own (the components' defaults).
const steps = [
  { label: "Pasul 01", title: "Intri în club", desc: "Îți creezi contul gratuit, în doar câteva minute." },
  { label: "Pasul 02", title: "Alegi ce te interesează", desc: "Selectezi categoriile tale preferate, iar noi îți arătăm oferte care chiar contează pentru tine." },
  { label: "Pasul 03", title: "Accesezi avantajele lunii", desc: "Descoperi beneficii speciale și coduri exclusive de la branduri." },
  { label: "Pasul 04", title: "Cumperi când ești pregătit", desc: "Fără presiune. Fără artificii de marketing. Tu alegi ce, când și dacă merită." },
];

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
    desc: "Fiecare beneficiu pe care îl vezi și mesaj pe care îl primești trebuie să conteze. Tu alegi categoriile care te interesează, iar noi îți trimitem avantajele relevante pentru tine.",
  },
  {
    Icon: Gift,
    title: "Acces gratuit în club",
    desc: "Nu plătești nimic ca să intri în club sau ca să primești oferte din categoriile tale preferate. Îți faci cont în câteva minute. Și dacă te răzgândești sau nu te mai interesează, pleci oricând.",
  },
];

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

  // Contact + partner emails assembled client-side from parts, so the literal
  // addresses are in neither the server-rendered HTML nor a single JS string —
  // stops the naive HTML-scraping bots that harvest most spam targets. (Set after
  // mount, so the first client render matches the server: no href → no hydration
  // mismatch.)
  const [contactHref, setContactHref] = useState<string>();
  // theMarketer: fire the __sm__view_homepage event once on landing.
  useEffect(() => {
    trackViewHomepage();
  }, []);

  useEffect(() => {
    setContactHref(`mailto:${["hello", "kluppi.com"].join("@")}`);
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
      let leftShift = Math.max(0, left.offsetHeight - vh);
      let rightShift = Math.max(0, right.offsetHeight - vh);

      // Phones (≤479): the columns are barely taller than the viewport, so the
      // overflow-based drift above is tiny (≈150px) and the shorter right column
      // doesn't move at all — the parallax can't key off overflow here. Instead,
      // drive the LEFT list far enough to bring its top image (Hero1) up to the
      // navbar by the time the pin releases, then move the RIGHT list a fraction
      // of that so the two lists travel at different speeds — mirroring the
      // desktop feel where the collage shears/layers as it rises rather than
      // moving as one rigid block. (Hero5 then gets its extra drift below.)
      const phone = window.matchMedia("(max-width: 479px)").matches;
      if (phone) {
        const navH =
          document.querySelector<HTMLElement>(".navbar-component")?.offsetHeight ?? 0;
        const topImg = left.firstElementChild as HTMLElement | null;
        const startTop = topImg ? topImg.offsetTop : 0; // = the list's padding-top
        leftShift = Math.max(0, startTop - navH); // anchor: Hero1 reaches the navbar
        const RIGHT_RATIO = 0.5; // right list noticeably slower than the left (tuning knob)
        rightShift = leftShift * RIGHT_RATIO;
      }

      left.style.transform = `translate3d(0, ${-progress * leftShift}px, 0)`;
      right.style.transform = `translate3d(0, ${-progress * rightShift}px, 0)`;

      // Hero5 (is-image-5) drifts a touch more than the rest of the right list,
      // composing on top of the right-list transform so it ends higher than its
      // sibling (Hero8) — the third speed in the collage. On desktop it's 12vw
      // (and pairs with the CSS `top` offset on is-image-5); on phones it's a
      // slightly smaller 10vw so Hero5 ≠ Hero8 there too. The 480–991 band keeps
      // no extra drift (transform cleared).
      const hero5 = hero5Ref.current;
      if (hero5) {
        const extraVw = window.matchMedia("(min-width: 992px)").matches
          ? 12
          : phone
          ? 10
          : 0;
        if (extraVw) {
          const extra = (progress * extraVw * window.innerWidth) / 100;
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

  return (
    <div className="page-wrapper navbar-on-page">
      <div className="navbar-component w-nav" data-collapse="all" role="banner">
        <div className="navbar-container">
          <a href="#top" aria-current="page" className="navbar-logo-link w-nav-brand w--current">
            <img src="/logo.svg" alt="Kluppi" className="navbar-logo" />
          </a>
          <div className="navbar-wrapper">
            {/* Hidden while the menu is open, so it never sits on top of it. */}
            <div className="navbar-actions" style={menuOpen ? { visibility: "hidden" } : undefined}>
              <a className="navbar-pill" href={SIGNUP_URL}>Intră în club</a>
            </div>
            <nav
              role="navigation"
              className="navbar-menu w-nav-menu"
              style={{ display: menuOpen ? "flex" : "none" }}
            >
              <div className="navbar-menu-wrapper">
                <div className="navbar-links-wrapper">
                  <a href="#cum-functioneaza" className="navbar-link w-nav-link" onClick={() => setMenuOpen(false)}>Cum funcționează</a>
                  {/* "Parteneri" (/parteneri) and "Despre noi" (/despre) are in the
                      design but hidden for now (Andra, 2026-10-06): both pages are
                      still behind the preview password on the live site. */}
                  <a href="#intrebari-frecvente" className="navbar-link w-nav-link" onClick={() => setMenuOpen(false)}>Întrebări frecvente</a>
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
                  <a href={SIGNUP_URL} className="navbar-link navbar-cta w-nav-link" onClick={() => setMenuOpen(false)}>Intră în club</a>
                </div>
              </div>
            </nav>
            <div
              className={`navbar-menu-button w-nav-button${menuOpen ? " w--open" : ""}`}
              role="button"
              tabIndex={0}
              aria-label="Meniu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setMenuOpen((v) => !v);
                }
              }}
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
                      <img className="header-image" src="/Hero3.jpg" alt="Femeie care sugerează discreție, asociată cu avantaje exclusive pentru cumpărături online." sizes="(max-width: 767px) 30vw, (max-width: 991px) 28vw, 22vw" loading="lazy" />
                    </div>
                    <div className="header-image-wrapper is-image-2">
                      <img className="header-image" src="/Hero6.jpg" alt="Bărbat relaxat care descoperă beneficii online potrivite pentru stilul lui." sizes="(max-width: 767px) 30vw, (max-width: 991px) 28vw, 22vw" loading="lazy" />
                    </div>
                    <div className="header-image-wrapper is-image-3">
                      <img className="header-image" src="/Hero4.jpg" loading="lazy" sizes="(max-width: 767px) 28vw, (max-width: 991px) 26vw, 20vw" alt="Două tinere zâmbind în timp ce caută inspirație pentru cumpărături online." />
                    </div>
                    <div className="header-image-wrapper is-image-4">
                      <img className="header-image" src="/Hero2.jpg" loading="lazy" sizes="(max-width: 767px) 26vw, (max-width: 991px) 24vw, 18vw" alt="Persoană care ține mai multe carduri, simbolizând opțiuni și avantaje la cumpărături." />
                    </div>
                  </div>
                </div>
                <div className="header-images-wrapper images-wrapper-right">
                  <div className="header-image-list image-list-right" ref={rightListRef}>
                    <div className="header-image-wrapper is-image-5" ref={hero5Ref}>
                      <img className="header-image" src="/Hero5.jpg" alt="Sandală albastră prezentată ca produs de shopping fashion." sizes="(max-width: 767px) 28vw, (max-width: 991px) 26vw, 20vw" loading="lazy" />
                    </div>
                    <div className="header-image-wrapper is-image-6">
                      <img className="header-image" src="/Hero8.jpg" alt="Produse din categorii diferite, de la sport și gaming până la îngrijire personală." sizes="(max-width: 767px) 26vw, (max-width: 991px) 24vw, 18vw" loading="lazy" />
                    </div>
                  </div>
                </div>
                <div className="header-content">
                  <div className="text-align-center">
                    <p className="kluppi-hero-eyebrow z-index-2" data-reveal>Clubul tău de shopping</p>
                    <div className="margin-bottom margin-small z-index-2" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
                      <h1 className="kluppi-hero-h1">Oferte și coduri exclusive, direct de la branduri</h1>
                    </div>
                    <p className="kluppi-hero-body z-index-2" data-reveal style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}>
                      Lucrăm direct cu brandurile și îți aducem, lună de lună, coduri de reducere și beneficii reale, create special pentru membrii Kluppi.
                    </p>
                    <div className="margin-top margin-medium z-index-2" data-reveal style={{ "--reveal-delay": "0.24s" } as React.CSSProperties}>
                      <a href={SIGNUP_URL} className="kluppi-btn">Intră gratuit în club</a>
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

        <section className="kluppi-painpoints kluppi-section tone-alt">
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
                <a href={SIGNUP_URL} className="kluppi-btn">Intră în club</a>
                <p className="kluppi-hero-trust">Coduri noi în fiecare lună</p>
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
                  <BenefitsCards items={benefits} />
                  <div className="kluppi-benefits-cta-block" data-reveal>
                    <a href={SIGNUP_URL} className="kluppi-btn">Intră în club</a>
                    <p className="kluppi-hero-trust">Acces instant la oferte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="kluppi-steps kluppi-section tone-alt" id="cum-functioneaza">
          <div className="kluppi-steps-inner">
            <h2 className="kluppi-steps-heading" data-reveal>Cum funcționează?</h2>
            <HowItWorks steps={steps} />
            <div className="kluppi-steps-cta-block" data-reveal>
              <a href={SIGNUP_URL} className="kluppi-btn">Intră în club</a>
              <p className="kluppi-hero-trust">Pe loc, fără aprobări</p>
            </div>
          </div>
        </section>

        <HomeSimulator signupUrl={SIGNUP_URL} />

        <HomePlans signupUrl={SIGNUP_URL} />

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
                      <img className="stat-image" src="/Reasons1.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 31vw" alt="Persoană care evită zgomotul ofertelor insistente." />
                    </div>
                    <article className="kluppi-benefit kluppi-benefit--b2" data-reveal>
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Știi deja toate trucurile de marketing</h3>
                        <p className="kluppi-benefit-desc">Ai văzut suficiente oferte și reduceri “de neratat” ca să te mai impresioneze ceva.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img kluppi-benefit-img--i2" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
                      <img className="stat-image" src="/Reasons2.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 31vw" alt="Persoană sceptică în fața trucurilor de marketing." />
                    </div>
                    <article className="kluppi-benefit kluppi-benefit--b3" data-reveal>
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Nu vrei motive să cumperi mai mult</h3>
                        <p className="kluppi-benefit-desc">Nu îți place să cumperi impulsiv. Cauți doar un preț mai bun pentru ceea ce voiai deja.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img kluppi-benefit-img--i3" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
                      <img className="stat-image" src="/Reasons3.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 31vw" alt="Două persoane relaxate care cumpără fără presiune." />
                    </div>
                    <article className="kluppi-benefit kluppi-benefit--b4" data-reveal>
                      <div className="kluppi-benefit-text">
                        <h3 className="kluppi-benefit-title">Preferi să alegi tu momentul potrivit</h3>
                        <p className="kluppi-benefit-desc">Iei decizii atunci când vrei tu, nu atunci când te grăbește cineva să acționezi.</p>
                      </div>
                    </article>
                    <div className="kluppi-benefit-img kluppi-benefit-img--i4" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
                      <img className="stat-image" src="/Reasons4.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 31vw" alt="Persoană relaxată care își alege singură momentul potrivit." />
                    </div>
                  </div>
                  <div className="kluppi-benefits-cta-block" data-reveal>
                    <a href={SIGNUP_URL} className="kluppi-btn">Intră în club</a>
                    <p className="kluppi-hero-trust">Pleci oricând, fără obligații</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="kluppi-faq kluppi-section tone-alt" id="intrebari-frecvente">
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

        <SplitBanner />

        <HomeFooter />
      </div>
    </div>
  );
}
