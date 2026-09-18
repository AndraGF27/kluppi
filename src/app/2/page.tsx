import type { Metadata } from "next";
import HomePreview from "./HomePreview";

export const metadata: Metadata = {
  title: "Kluppi — pagină de previzualizare",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return <HomePreview />;
}
