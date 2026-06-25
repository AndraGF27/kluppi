import { NextResponse } from "next/server";

// Server-side wrapper for theMarketer's "Remove Subscriber" API.
// https://t.themarketer.com/api/v1/remove_subscriber
//
// Call this when a user unsubscribes on our side (e.g. from their account /
// profile) so the email is also unsubscribed in theMarketer. Pass `channels`
// (e.g. "email,sms") to unsubscribe from specific channels; omit it to remove
// the subscriber entirely.
//
// Like /api/add-subscriber, the REST key is a secret and stays server-side
// (THEMARKETER_REST_KEY); the request is made from here, never the browser.

const REMOVE_SUBSCRIBER_URL = "https://t.themarketer.com/api/v1/remove_subscriber";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const restKey = process.env.THEMARKETER_REST_KEY;
  const customerId = process.env.THEMARKETER_CUSTOMER_ID;

  if (!restKey || !customerId) {
    console.error(
      "theMarketer not configured: set THEMARKETER_REST_KEY and THEMARKETER_CUSTOMER_ID."
    );
    return NextResponse.json(
      { error: "Unsubscribe is temporarily unavailable." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  // All theMarketer params travel in the query string (even for POST).
  const params = new URLSearchParams({ k: restKey, u: customerId, email });

  // Optional: limit the unsubscribe to specific channels, e.g. "email,sms".
  const channels = body.channels;
  if (channels != null && String(channels).trim() !== "") {
    params.set("channels", String(channels).trim());
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${REMOVE_SUBSCRIBER_URL}?${params.toString()}`, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    console.error("theMarketer remove_subscriber request failed:", error);
    return NextResponse.json(
      { error: "Could not reach the newsletter service. Try again." },
      { status: 502 }
    );
  }

  const data = await upstream.json().catch(() => ({}));

  if (!upstream.ok) {
    // Log theMarketer's real status server-side; keep the client message generic
    // so REST-key / config details never leak to the browser.
    console.error(
      `theMarketer remove_subscriber ${upstream.status}:`,
      (data as { message?: string }).message ?? data
    );
    return NextResponse.json(
      { error: "Could not complete the unsubscribe. Try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
