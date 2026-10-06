// The home page's footer (Andra's design, 2026-10-06): the same content as the
// app's "Planul meu" footer — payment and consumer-protection badges, the
// trader's identification, and the APP's legal documents (dated archives).
// The waitlist page keeps its own footer with the waitlist documents.
//
// Company details and link targets mirror `src/lib/legal.ts` in the app repo
// (kluppi-app); a change there is a change here.
const socials = [
  { href: "https://www.facebook.com/joinkluppi", label: "Facebook" },
  { href: "https://www.instagram.com/joinkluppi", label: "Instagram" },
  { href: "https://www.linkedin.com/company/joinkluppi", label: "LinkedIn" },
];

const legalLinks = [
  { href: "/termeni-si-conditii/2026-09-20", label: "Termeni și condiții" },
  { href: "/confidentialitate/2026-10-01", label: "Politica de confidențialitate" },
  { href: "/politica-cookies/2026-09-30", label: "Politica de cookies" },
  { href: "https://anpc.ro/", label: "ANPC" },
];

export default function HomeFooter() {
  return (
    <footer className="kluppi-footer">
      <div className="kluppi-footer-inner">
        <div className="kluppi-footer-divider" />
        <a href="#top" className="kluppi-footer-logo-link">
          <img src="/logo.svg" loading="lazy" alt="Kluppi" className="kluppi-footer-logo" />
        </a>
        <nav className="kluppi-footer-socials" aria-label="Rețele sociale">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="kluppi-footer-social">
              {s.label}
            </a>
          ))}
          <a href="mailto:hello@kluppi.com" className="kluppi-footer-social">Contact</a>
        </nav>
        <div className="kluppi-footer-divider" />

        <div className="kluppi-footer-info">
          <div className="kluppi-footer-company">
            <div className="kluppi-footer-badges">
              <a
                href="https://netopia-payments.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Plăți securizate prin Netopia"
                className="kluppi-footer-badge"
              >
                <img src="/netopia-payments.svg" alt="Plăți securizate prin Netopia" width={223} height={40} loading="lazy" />
              </a>
              <a
                href="https://reclamatiisal.anpc.ro/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Soluționarea Alternativă a Litigiilor (SAL) — ANPC"
                className="kluppi-footer-badge"
              >
                <img src="/anpc-sal.png" alt="Soluționarea Alternativă a Litigiilor (SAL) — ANPC" width={162} height={40} loading="lazy" />
              </a>
            </div>
            <p className="kluppi-footer-meta">
              Serviciu operat de <strong>DRMX KALEIDOSCOPE LUX DIGITAL S.R.L.</strong>
              <br />
              Reg. Com. J2020000816159 · CUI 42919124
              <br />
              Sediu social: str. Col. Ion Nicolin, nr. 2A, bl. 61B, sc. A, et. 2, ap. 10, Târgoviște, jud. Dâmbovița
              <br />
              <a href="mailto:hello@kluppi.com" className="kluppi-footer-link">hello@kluppi.com</a>
              {" · Tel: "}
              <a href="tel:0731394895" className="kluppi-footer-link">0731 394 895</a>
            </p>
          </div>
          <div className="kluppi-footer-legalCol">
            <span className="kluppi-footer-label">Legal</span>
            {legalLinks.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="kluppi-footer-link">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="kluppi-footer-divider" />
        <p className="kluppi-footer-copy kluppi-footer-copyCenter">
          © Copyright {new Date().getFullYear()} · Toate drepturile rezervate
        </p>
      </div>
    </footer>
  );
}
