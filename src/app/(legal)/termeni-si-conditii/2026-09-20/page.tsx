import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import styles from "../../legal.module.css";

export const metadata: Metadata = {
  title: "Termeni și condiții — Kluppi",
  robots: { index: false, follow: false },
};

const terms = readFileSync(
  path.join(
    process.cwd(),
    "src/app/(legal)/termeni-si-conditii/2026-09-20/terms.md",
  ),
  "utf8",
).trim();
const [title, updated, ...sections] = terms.split(/\n\s*\n/);

function renderInline(text: string): ReactNode[] {
  return text
    .replace(/\\([.+])/g, "$1")
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
}

function renderSection(section: string, index: number): ReactNode {
  const heading = /^(#{1,2}) (.+)$/.exec(section);
  if (heading) {
    return heading[1] === "#" ? (
      <h2 key={index}>{renderInline(heading[2])}</h2>
    ) : (
      <h3 key={index}>{renderInline(heading[2])}</h3>
    );
  }

  const lines = section.split("\n");
  if (lines.every((line) => line.startsWith("* "))) {
    return (
      <ul key={index}>
        {lines.map((line, lineIndex) => (
          <li key={lineIndex}>{renderInline(line.slice(2))}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} style={{ whiteSpace: "pre-line" }}>
      {renderInline(section.replace(/ {2,}\n/g, "\n"))}
    </p>
  );
}

export default function SubscriptionTermsPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>{renderInline(title.replace(/^# /, ""))}</h1>
      <p className={styles.updated}>{renderInline(updated)}</p>
      <div className={styles.body}>{sections.map(renderSection)}</div>
    </main>
  );
}
