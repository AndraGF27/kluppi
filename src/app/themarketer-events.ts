// theMarketer on-site event tracking.
//
// Events are captured by pushing them into the Google Tag Manager dataLayer
// (GTM container GTM-5673VBFG is installed in layout.tsx). These helpers are the
// single place those pushes are defined — call them from the relevant UI.
//
// Requires GTM to be loaded; the GTM snippet initialises window.dataLayer, and
// we also guard here so an early call can't throw.

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// theMarketer is consent-gated (see CookieBanner.tsx). Until the visitor clicks
// "Accept", we don't push anything to the dataLayer — so no on-site event (and
// no email) is captured before consent, matching the gated tracking scripts.
function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem("kluppi-cookie-consent") !== "accepted") return;
  } catch {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export type SetEmailPayload = {
  email: string;
  phone?: string;
  firstname?: string;
  lastname?: string;
};

// __sm__set_email — call whenever a visitor provides their email address
// (registration, login, or any form such as Contact / Newsletter). Captures the
// contact in theMarketer even if they don't subscribe to the newsletter.
export function trackSetEmail({ email, phone, firstname, lastname }: SetEmailPayload): void {
  const trimmed = email?.trim();
  if (!trimmed) return;
  pushDataLayer({
    event: "__sm__set_email",
    email_address: trimmed,
    ...(phone ? { phone } : {}),
    ...(firstname ? { firstname } : {}),
    ...(lastname ? { lastname } : {}),
  });
}

// __sm__view_homepage — call once when a visitor lands on the homepage.
export function trackViewHomepage(): void {
  pushDataLayer({ event: "__sm__view_homepage" });
}
