import type { ReactNode } from "react";

// Shared chrome for the site page templates: the site header + footer, using
// the same global classes as the homepage so the look matches 1:1. Static
// (no client state) — these pages don't need the mobile menu or scroll effects.

const socials = [
  { href: "https://www.facebook.com/joinkluppi", label: "Facebook" },
  { href: "https://www.instagram.com/joinkluppi", label: "Instagram" },
  { href: "https://www.linkedin.com/company/joinkluppi", label: "LinkedIn" },
];

// Legal links always open in a new tab (per spec).
const legalLinks = [
  { href: "/termeni-si-conditii", label: "Termeni și condiții" },
  { href: "/confidentialitate", label: "Politica de confidențialitate" },
  { href: "/politica-cookies", label: "Politica de cookies" },
];

export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="page-wrapper">
      <div className="navbar-component" role="banner">
        <div className="navbar-container">
          <a href="/" className="navbar-logo-link">
            <img src="/logo.svg" alt="Kluppi" className="navbar-logo" />
          </a>
        </div>
      </div>

      <div className="main-wrapper max-width-full">
        {children}

        <footer className="kluppi-footer">
          <div className="kluppi-footer-inner">
            <div className="kluppi-footer-divider" />
            <a href="/" className="kluppi-footer-logo-link">
              <img src="/logo.svg" alt="Kluppi" className="kluppi-footer-logo" />
            </a>
            <nav className="kluppi-footer-socials" aria-label="Rețele sociale">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="kluppi-footer-social">{s.label}</a>
              ))}
              <a href="mailto:hello@kluppi.com" className="kluppi-footer-social">Contact</a>
            </nav>
            <div className="kluppi-footer-divider" />
            <div className="kluppi-footer-bottom">
              <div className="kluppi-footer-legal">
                {legalLinks.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="kluppi-footer-link">{l.label}</a>
                ))}
              </div>
              <p className="kluppi-footer-copy">© Copyright {new Date().getFullYear()} · Toate drepturile rezervate</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
