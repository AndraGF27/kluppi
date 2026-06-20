"use client";

import { useEffect, useRef, useState } from "react";
import PainPointsCarousel from "./PainPointsCarousel";

const LOGO =
  "https://cdn.prod.website-files.com/66aa5c84201514536a227e7c/66ac8dae2b34c047cf51afab_Profile%20X_Logo%20Light.svg";

function ButtonArrow() {
  return (
    <div className="button-arrow w-embed">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M128 26a102 102 0 1 0 102 102A102.2 102.2 0 0 0 128 26Zm0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90Zm34-118v48a6 6 0 0 1-12 0v-33.5l-45.8 45.7a5.9 5.9 0 0 1-8.4-8.4l45.7-45.8H108a6 6 0 0 1 0-12h48a6 6 0 0 1 6 6Z"
        />
      </svg>
    </div>
  );
}

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

type SubmitState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const leftListRef = useRef<HTMLDivElement>(null);
  const rightListRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

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
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list. Talk soon.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
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
            <h2 className="kluppi-painpoints-conclusion" data-reveal>Nu ți s-a întâmplat doar ție.</h2>
          </div>
          <div className="kluppi-painpoints-cta-block" data-reveal>
            <p className="text-size-large kluppi-hero-body">
              A devenit din ce în ce mai rară senzația că plătești prețul corect atunci când cumperi online.
            </p>
            <p className="text-size-large kluppi-hero-body">
              Noi ne-am săturat de toate astea. Și am creat Kluppi: prietenul care are mereu un cod de reducere bun, exact când îți trebuie.
            </p>
            <a href="#contact" className="kluppi-hero-cta">Rezervă-ți locul în club</a>
            <p className="kluppi-hero-trust">Rapid, doar cu nume și e-mail.</p>
          </div>
        </section>

        <section className="section-about background-black" id="about">
          <div className="padding-global">
            <div className="container-large">
              <div className="section-padding-large">
                <div className="w-layout-grid about-component">
                  <div className="about-content">
                    <div className="margin-bottom margin-small" data-reveal>
                      <h2 className="heading-style-h2 text-allcaps">A passionate designer with a creative flair like no other</h2>
                    </div>
                    <p className="text-size-medium text-colour-grey" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="margin-top margin-medium" data-reveal style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
                      <div className="button-group">
                        <a href="#contact" className="button is-alternate w-inline-block">
                          <div>Read more about us</div>
                          <ButtonArrow />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="about-image-wrapper" data-reveal style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}>
                    <img className="about-image" src="https://cdn.prod.website-files.com/66aa5c84201514536a227e7c/66aba0a990cff59371467899_mk-2-yeQfucZ-g2I-unsplash.jpg" alt="" sizes="(max-width: 991px) 90vw, 41vw" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-stats background-black" id="services">
          <div className="padding-global">
            <div className="container-large">
              <div className="section-padding-large">
                <div className="stats-component">
                  <div className="margin-bottom margin-xxlarge">
                    <div className="w-layout-grid stats-content">
                      <div id="w-node-_01fe231a-c26f-5431-a9d2-eb07c475ec63-6a227e7d" className="stats-content-left" data-reveal>
                        <h2 className="heading-style-h2 text-allcaps">based in the uk, working with clients globally</h2>
                      </div>
                      <div id="w-node-_01fe231a-c26f-5431-a9d2-eb07c475ec66-6a227e7d" className="stats-content-right" data-reveal style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}>
                        <p className="text-size-medium text-colour-grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-layout-grid stats-list" data-reveal>
                    <div id="w-node-_01fe231a-c26f-5431-a9d2-eb07c475ec6a-6a227e7d" className="stat-item">
                      <div className="margin-bottom margin-xxsmall">
                        <div className="stat-number">34<span className="text-span-7">%</span></div>
                      </div>
                      <h3 className="heading-style-h6 weight-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</h3>
                    </div>
                    <div className="stat-image-wrapper">
                      <img className="stat-image" src="https://cdn.prod.website-files.com/66aa5c84201514536a227e7c/66c35fc21fa23caa564836d4_lee-campbell-DtDlVpy-vvQ-unsplash.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 44vw, 28vw" alt="" />
                    </div>
                    <div className="stat-item">
                      <div className="margin-bottom margin-xxsmall">
                        <div className="stat-number">47<span className="text-span-7">%</span></div>
                      </div>
                      <h3 className="heading-style-h6 weight-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</h3>
                    </div>
                    <div id="w-node-_01fe231a-c26f-5431-a9d2-eb07c475ec78-6a227e7d" className="stat-item">
                      <div className="margin-bottom margin-xxsmall">
                        <div className="stat-number">71<span className="text-span-7">%</span></div>
                      </div>
                      <h3 className="heading-style-h6 weight-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</h3>
                    </div>
                    <div className="stat-image-wrapper">
                      <img className="stat-image" src="https://cdn.prod.website-files.com/66aa5c84201514536a227e7c/66c36022311552387248d6fa_ales-nesetril-Im7lZjxeLhg-unsplash.jpg" loading="lazy" sizes="(max-width: 767px) 90vw, (max-width: 991px) 44vw, 28vw" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-portfolio background-black" id="work">
          <div className="padding-global">
            <div className="container-large">
              <div className="section-padding-large">
                <div className="margin-bottom margin-xxlarge">
                  <div className="text-align-center">
                    <div className="max-width-large align-center" data-reveal>
                      <div className="margin-bottom margin-small">
                        <h2 className="heading-style-h2 text-allcaps">
                          <span className="mid-grey-span">Showcasing</span> my Creative Design Work
                        </h2>
                      </div>
                      <p className="text-size-medium text-colour-grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.</p>
                    </div>
                  </div>
                </div>
                <div className="portfolio-component">
                  <div className="portfolio-list-wrapper w-dyn-list">
                    <div role="list" className="portfolio-list w-dyn-items" data-reveal>
                      {[
                        { href: "#contact", title: "Vino Rosso", img: "https://cdn.prod.website-files.com/66aa5c84201514536a227e91/66aba3b2f07cc9d9bc6b9175_mk-2-P3OLWbU65po-unsplash%20(1).webp" },
                        { href: "#contact", title: "Soapbox", img: "https://cdn.prod.website-files.com/66aa5c84201514536a227e91/66c360e5d0bf609ded67a952_valeriia-miller--BQ08InEGLI-unsplash.jpg" },
                        { href: "#contact", title: "Castro Capital", img: "https://cdn.prod.website-files.com/66aa5c84201514536a227e91/66b09b478c4eac345a1793eb_1.webp" },
                        { href: "#contact", title: "Café Fugaz", img: "https://cdn.prod.website-files.com/66aa5c84201514536a227e91/66bb301d9cca853c5270cf95_66ab9b12d45388739dfb6323_mk-2-XoiBIpYkPJA-unsplash%20(1)%201.webp" },
                      ].map((p) => (
                        <div key={p.title} role="listitem" className="w-dyn-item">
                          <a href={p.href} className="portfolio-item w-inline-block">
                            <div className="portfolio-image-link">
                              <div className="portfolio-image-wrapper">
                                <img alt="" loading="lazy" src={p.img} sizes="(max-width: 479px) 86vw, (max-width: 991px) 88vw, 40vw" className="portfolio-image" />
                              </div>
                            </div>
                            <div className="portfolio-title-link">
                              <h3 className="heading-style-h5">{p.title}</h3>
                            </div>
                            <div className="text-size-regular text-colour-grey">Showcasing the Best of Design, Creativity, and Freelance Work</div>
                            <div className="portfolio-tag-list">
                              <div className="portfolio-tag-item"><div>Graphic Design</div></div>
                              <div className="portfolio-tag-item"><div>Web Development</div></div>
                              <div className="portfolio-tag-item"><div>Illustration</div></div>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="margin-top margin-xsmall">
                    <div className="button-group is-center">
                      <a href="#contact" className="button is-alternate w-inline-block">
                        <div>View all</div>
                        <ButtonArrow />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-banner-cta">
          <div className="section-padding-large">
            <a href="#contact" className="banner-cta-component w-inline-block" data-reveal>
              <h2 className="cta-heading-top">Showcasing Creative Excellence with Kluppi</h2>
              <h2 className="cta-heading-bottom">Unleash Your Creative Potential with Kluppi</h2>
            </a>
          </div>
        </section>

        <section className="section-contact background-black" id="contact">
          <div className="padding-global">
            <div className="container-large">
              <div className="section-padding-large">
                <div className="text-align-center margin-bottom margin-medium" data-reveal>
                  <div className="margin-bottom margin-small">
                    <h2 className="heading-style-h3 text-allcaps">Join the waitlist</h2>
                  </div>
                  <p className="text-size-medium text-colour-grey">Drop your email and I&apos;ll reach out about your next branding project.</p>
                </div>
                <div className="w-form waitlist-form-wrapper" data-reveal style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="waitlist-field-row">
                      <input
                        className="form-input"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        aria-label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === "loading"}
                      />
                      <button className="button is-form" type="submit" disabled={status === "loading"}>
                        <div className="button-text-item">
                          {status === "loading" ? "Sending…" : "Notify me"}
                        </div>
                        <ButtonArrow />
                      </button>
                    </div>
                  </form>
                  {message && (
                    <div className={`waitlist-message ${status === "error" ? "error-message" : "seccess-message"}`}>
                      <div className={status === "error" ? "error-text" : "success-text"}>{message}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer-component">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-top padding-xxlarge">
                <div className="padding-bottom padding-large">
                  <div className="w-layout-grid footer-top-wrapper">
                    <div className="footer-left-wrapper">
                      <div className="margin-bottom margin-medium">
                        <a href="#top" aria-current="page" className="footer-logo-link w-nav-brand w--current">
                          <img src={LOGO} loading="lazy" alt="" className="footer-logo" />
                        </a>
                      </div>
                      <div className="footer-details-wrapper">
                        <div className="margin-bottom margin-tiny">
                          <div className="text-size-regular weight-semibold text-colour-grey">Address:</div>
                        </div>
                        <div className="margin-bottom margin-small">
                          <div className="text-size-small">Office Complex, 13 Imaginary Street, Manchester</div>
                        </div>
                        <div className="margin-bottom margin-tiny">
                          <div className="text-size-regular weight-semibold text-colour-grey">Contact:</div>
                        </div>
                        <div className="text-size-small">
                          <a href="#contact" className="link-2">Email us now on </a>
                          <a href="mailto:info@profilex.com" className="link">info@profilex.com</a>
                        </div>
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
                    <div className="footer-credit-text">Branding expert and specialist.</div>
                  </div>
                </div>
                <img src="https://cdn.prod.website-files.com/66aa5c84201514536a227e7c/66ab52894b5a386eb15de47b_ProFile_Logo%20Footer.svg" loading="lazy" alt="" className="footer-bottom-logo" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
