import type { ReactNode } from "react";
import SiteChrome from "../SiteChrome";

// Legal pages addressed to PARTNERS (the partnership Terms archive). Same
// chrome as the (legal) group, in the partner palette — Arctic 50 + Electric
// (Andra, 2026-10-01). A separate route group only so the theme applies to
// these pages and no others; the URL is unchanged.
export default function PartnerLegalLayout({ children }: { children: ReactNode }) {
  return <SiteChrome theme="partner">{children}</SiteChrome>;
}
