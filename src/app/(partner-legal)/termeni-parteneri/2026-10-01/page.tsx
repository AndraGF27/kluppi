import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import LegalDocument from "../../../(legal)/LegalDocument";

// Dated archive of the partnership Terms ("Termeni și condiții de parteneriat"),
// linked from the Kluppi app's offer-approval page and confirmation e-mail
// (art. 4.2 / 4.7: a stable link from which the Terms can be read and
// downloaded). Never edit terms.md or the PDF by hand: a new approved version
// gets a new dated folder and a new PDF (scripts/build-legal-pdf.mjs), and this
// one stays exactly as partners accepted it.
export const metadata: Metadata = {
  title: "Termeni și condiții de parteneriat — Kluppi",
  robots: { index: false, follow: false },
};

const terms = readFileSync(
  path.join(process.cwd(), "src/app/(partner-legal)/termeni-parteneri/2026-10-01/terms.md"),
  "utf8",
);

export default function PartnerTermsArchive() {
  return (
    <LegalDocument
      markdown={terms}
      download={{
        href: "/legal/kluppi-termeni-parteneriat-2026-10-01.pdf",
        label: "Descarcă PDF",
      }}
    />
  );
}
