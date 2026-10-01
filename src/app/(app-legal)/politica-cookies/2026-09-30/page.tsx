import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import LegalDocument from "../../../(legal)/LegalDocument";

// Dated archive of the post-launch policy (app + site), linked from the Kluppi
// app footer. Never edit policy.md by hand: a new approved version gets a new
// dated folder, and this one stays as published.
export const metadata: Metadata = {
  title: "Politica de cookies — Kluppi",
  robots: { index: false, follow: false },
};

const policy = readFileSync(
  path.join(process.cwd(), "src/app/(app-legal)/politica-cookies/2026-09-30/policy.md"),
  "utf8",
);

export default function CookiePolicyArchive() {
  return <LegalDocument markdown={policy} />;
}
