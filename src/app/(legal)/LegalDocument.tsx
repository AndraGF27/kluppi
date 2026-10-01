import type { ReactNode } from "react";
import styles from "./legal.module.css";

// Renders a dated, lawyer-approved policy archive (e.g.
// /confidentialitate/2026-10-01) from the Markdown file the lawyer delivered,
// so the published text is the approved text byte for byte — nothing is
// retyped into JSX. Handles exactly the Markdown those files use: `#`/`##`
// headings, paragraphs (trailing double-space = line break), `* `/`- ` lists,
// pipe tables, **bold**, *italic*, backslash escapes and &lt;/&gt;/&amp;.
//
// HTML comments are dropped: in the lawyer's files they are internal notes
// marked "de eliminat înainte de publicare". A final version has none.
//
// The Terms archives (termeni-si-conditii/2026-09-*) keep their own renderer;
// they are published and approved as they are.

function decode(text: string): string {
  return text
    .replace(/\\([.+\-#*()[\]_!])/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|https:\/\/[^\s)]+[^\s).,;])/g;

function renderInline(text: string): ReactNode[] {
  return decode(text)
    .split(INLINE)
    .filter((part) => part !== "")
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("https://")) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
}

function tableCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderBlock(block: string, index: number): ReactNode {
  const heading = /^(#{1,2}) (.+)$/.exec(block);
  if (heading) {
    return heading[1] === "#" ? (
      <h2 key={index}>{renderInline(heading[2])}</h2>
    ) : (
      <h3 key={index}>{renderInline(heading[2])}</h3>
    );
  }

  const lines = block.split("\n");

  if (lines.every((line) => line.trim().startsWith("|"))) {
    const [head, , ...rows] = lines; // second line is the | --- | separator
    return (
      <div key={index} className={styles.tableWrap}>
        <table style={{ tableLayout: "fixed", width: "88rem" }}>
          <thead>
            <tr>
              {tableCells(head).map((cell, i) => (
                <th key={i}>{renderInline(cell)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {tableCells(row).map((cell, i) => (
                  <td key={i}>{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (lines.every((line) => /^[*-] /.test(line))) {
    return (
      <ul key={index}>
        {lines.map((line, i) => (
          <li key={i}>{renderInline(line.slice(2))}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} style={{ whiteSpace: "pre-line" }}>
      {renderInline(block.replace(/ {2,}\n/g, "\n").replace(/ +$/, ""))}
    </p>
  );
}

/**
 * `markdown` is the policy file's contents. Each page reads its own file with a
 * literal path (as the Terms archives do): a path built from a prop here makes
 * the bundler trace — and deploy — the whole project.
 */
export default function LegalDocument({ markdown }: { markdown: string }) {
  const source = markdown.replace(/<!--[\s\S]*?-->/g, "").trim();
  const [title, updated, ...blocks] = source.split(/\n\s*\n/);

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>{renderInline(title.replace(/^# /, ""))}</h1>
      <p className={styles.updated}>{renderInline(updated)}</p>
      <div className={styles.body}>{blocks.map(renderBlock)}</div>
    </main>
  );
}
