import type { Metadata } from "next";

import SiteChrome from "../SiteChrome";
import { PartnersContent } from "./_components/partners-content";

export const metadata: Metadata = {
  title: "Pentru branduri — Kluppi",
  description:
    "Kluppi aduce brandul tău în fața unei comunități de membri care chiar vor să cumpere: fără taxe de listare, fără comisioane de afiliere, cu rezultate în propriul tău analytics.",
  robots: { index: false, follow: false }, // pre-launch — do not index yet
};

export default function PartnersPage() {
  return (
    <SiteChrome>
      <PartnersContent />
    </SiteChrome>
  );
}
