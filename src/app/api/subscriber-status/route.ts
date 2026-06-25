import { NextResponse } from "next/server";

// Server-side wrapper for theMarketer's "Subscriber Status" API.
// https://t.themarketer.com/api/v1/status_subscriber  (GET upstream)
//
// Returns which channels an email is subscribed / unsubscribed to, e.g.
// { subscribed: ["email"], unsubscribed: ["loyalty"] } — useful for reflecting
// a contact's real newsletter status in their account/profile.
//
// Exposed as POST (email in the JSON body) for consistency with the other
// theMarketer routes and to keep the email out of our access-log query strings;
// the upstream call to theMarketer is a GET. The REST key stays server-side.

const STATUS_SUBSCRIBER_URL = "https://t.themarketer.com/api/v1/status_subscriber";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const restKey = process.env.THEMARKETER_REST_KEY;
  const customerId = process.env.THEMARKETER_CUSTOMER_ID;

  if (!restKey || !customerId) {
    console.error(
      "theMarketer not configured: set THEMARKETER_REST_KEY and THEMARKETER_CUSTOMER_ID."
    );
    return NextResponse.json(
      { error: "Subscriber status is temporarily unavailable." },
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

  const params = new URLSearchParams({ k: restKey, u: customerId, email });

  let upstream: Response;
  try {
    upstream = await fetch(`${STATUS_SUBSCRIBER_URL}?${params.toString()}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    console.error("theMarketer status_subscriber request failed:", error);
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
      `theMarketer status_subscriber ${upstream.status}:`,
      (data as { message?: string }).message ?? data
    );
    return NextResponse.json(
      { error: "Could not fetch the subscriber status. Try again." },
      { status: 502 }
    );
  }

  // Forward only the status fields, normalized to arrays.
  const { subscribed, unsubscribed } = data as {
    subscribed?: unknown;
    unsubscribed?: unknown;
  };
  return NextResponse.json({
    subscribed: Array.isArray(subscribed) ? subscribed : [],
    unsubscribed: Array.isArray(unsubscribed) ? unsubscribed : [],
  });
}
