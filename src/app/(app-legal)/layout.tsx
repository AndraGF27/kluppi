import type { ReactNode } from "react";
import SiteChrome from "../SiteChrome";

// The Kluppi APP's own legal documents — the dated archives of its Privacy
// Policy, Cookie Policy and Terms, linked from app.kluppi.com. Same chrome as
// the (legal) group, on a Lemon Sorbet 50 ground (Andra, 2026-10-01), which
// sets them apart from the WAITLIST's documents in (legal). A separate route
// group only for that; the URLs are unchanged.
export default function AppLegalLayout({ children }: { children: ReactNode }) {
  return <SiteChrome theme="app-legal">{children}</SiteChrome>;
}
