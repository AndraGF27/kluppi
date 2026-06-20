import type { Metadata } from "next";
import "./webflow.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kluppi — Branding expert and specialist",
  description:
    "Portfolio and waitlist for a branding expert and specialist. Showcasing creative design work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@200,300,400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="body">{children}</body>
    </html>
  );
}
