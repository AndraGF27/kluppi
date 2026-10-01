// Builds the downloadable PDF of a dated legal archive from the SAME Markdown
// file the page renders, so the PDF and the web page are one text.
//
//   node scripts/build-legal-pdf.mjs <terms.md> <public/legal/out.pdf>
//
// Run once per approved version and commit the PDF (it is a static asset in
// public/, never regenerated at deploy). Needs Google Chrome installed locally;
// it prints the page with Chrome's headless "print to PDF".
//
// The Markdown handling mirrors src/app/(legal)/LegalDocument.tsx: headings,
// paragraphs (trailing double space = line break), `* `/`- ` lists, pipe
// tables, **bold**, *italic*, https links, backslash escapes and entities.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [, , mdPath, outPath] = process.argv;
if (!mdPath || !outPath) {
  console.error("usage: node scripts/build-legal-pdf.mjs <terms.md> <out.pdf>");
  process.exit(1);
}

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const FONTS = pathToFileURL(path.resolve("public/fonts")).href;

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function decode(text) {
  return text
    .replace(/\\([.+\-#*()[\]_!])/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function inline(text) {
  return escapeHtml(decode(text))
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\s][^*]*)\*/g, "<em>$1</em>")
    .replace(/(https:\/\/[^\s)<]+[^\s).,;<])/g, '<a href="$1">$1</a>');
}

const cells = (line) =>
  line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

function block(b) {
  const h = /^(#{1,2}) (.+)$/.exec(b);
  if (h) return h[1] === "#" ? `<h2>${inline(h[2])}</h2>` : `<h3>${inline(h[2])}</h3>`;
  const lines = b.split("\n");
  if (lines.every((l) => l.trim().startsWith("|"))) {
    const [head, , ...rows] = lines;
    return `<table><thead><tr>${cells(head).map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${rows
      .map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
      .join("")}</tbody></table>`;
  }
  if (lines.every((l) => /^[*-] /.test(l))) {
    return `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join("")}</ul>`;
  }
  return `<p>${inline(b.replace(/ {2,}\n/g, "\n").replace(/ +$/, "")).replace(/\n/g, "<br>")}</p>`;
}

const source = readFileSync(mdPath, "utf8").replace(/<!--[\s\S]*?-->/g, "").trim();
const [title, updated, ...blocks] = source.split(/\n\s*\n/);

const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8">
<title>${escapeHtml(decode(title.replace(/^# /, "").replace(/\*\*/g, "")))}</title>
<style>
@font-face{font-family:Switzer;src:url("${FONTS}/switzer-400.woff2") format("woff2");font-weight:400}
@font-face{font-family:Switzer;src:url("${FONTS}/switzer-600.woff2") format("woff2");font-weight:600}
@font-face{font-family:Bricolage;src:url("${FONTS}/bricolage-latin.woff2") format("woff2");font-weight:400 800}
@font-face{font-family:Bricolage;src:url("${FONTS}/bricolage-latinext.woff2") format("woff2");font-weight:400 800;unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@page{size:A4;margin:22mm 20mm 20mm}
body{font-family:Switzer,Helvetica,Arial,sans-serif;font-size:10pt;line-height:1.55;color:#351e28}
h1{font-family:Bricolage,Switzer,sans-serif;font-weight:700;color:#f5531c;font-size:20pt;line-height:1.15;margin:0 0 6pt}
h2{font-family:Bricolage,Switzer,sans-serif;font-weight:600;color:#f5531c;font-size:13pt;margin:18pt 0 6pt;break-after:avoid}
h3{font-family:Bricolage,Switzer,sans-serif;font-weight:600;font-size:11.5pt;margin:14pt 0 5pt;break-after:avoid}
.updated{opacity:.7;margin:0 0 14pt}
p{margin:0 0 7pt}
ul{margin:0 0 7pt;padding-left:14pt}
li{margin-bottom:3pt}
strong{font-weight:600}
a{color:#f5531c}
table{width:100%;border-collapse:collapse;margin:0 0 10pt;font-size:8.5pt}
th,td{border:1px solid #d9cfd3;padding:4pt 5pt;text-align:left;vertical-align:top}
</style></head><body>
<h1>${inline(title.replace(/^# /, ""))}</h1>
<p class="updated">${inline(updated)}</p>
${blocks.map(block).join("\n")}
</body></html>`;

const dir = mkdtempSync(path.join(tmpdir(), "legal-pdf-"));
const htmlPath = path.join(dir, "doc.html");
writeFileSync(htmlPath, html);
try {
  execFileSync(CHROME, [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--allow-file-access-from-files",
    `--print-to-pdf=${path.resolve(outPath)}`,
    pathToFileURL(htmlPath).href,
  ], { stdio: "ignore" });
} finally {
  rmSync(dir, { recursive: true, force: true });
}
console.log(`wrote ${outPath}`);
