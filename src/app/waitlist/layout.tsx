import type { Metadata } from "next";

// The waitlist page keeps the description it had as the home page; the site's
// default (root layout) now describes the launched club.
export const metadata: Metadata = {
  title: "Kluppi — Coduri și avantaje exclusive de la branduri",
  description:
    "Clubul de shopping unde primești coduri de reducere și beneficii reale, direct de la branduri. Rezervă-ți gratuit locul și află când lansăm.",
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
