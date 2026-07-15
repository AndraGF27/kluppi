import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SiteChrome from "../SiteChrome";
import { AboutContent } from "./_components/about-content";

export const metadata: Metadata = {
  title: "Despre Kluppi — povestea clubului",
  description:
    "Kluppi e clubul construit de oameni din interiorul industriei de marketing, trecut de partea ta: beneficii reale, negociate direct cu brandurile, fără urgență falsă.",
  robots: { index: false, follow: false }, // pre-launch — do not index yet
};

export default function AboutPage() {
  if (process.env.VERCEL_ENV === "production") {
    notFound();
  }

  return (
    <SiteChrome>
      <AboutContent />
    </SiteChrome>
  );
}
