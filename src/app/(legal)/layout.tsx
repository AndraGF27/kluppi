import type { ReactNode } from "react";
import SiteChrome from "../SiteChrome";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
