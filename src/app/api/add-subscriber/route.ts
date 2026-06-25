import { NextResponse } from "next/server";

// Server-side wrapper for theMarketer's "Add Subscriber" API.
// https://t.themarketer.com/api/v1/add_subscriber
//
// Call this ONLY when the user has explicitly opted in to promotional emails.
// theMarketer accounts default to double opt-in, so a successful call here
// triggers theMarketer to send the confirmation email — the subscriber isn't
// active on the newsletter until they click it. Visitors who DON'T opt in are
// still captured client-side via the __sm_set_email tracking event, so they
// must not be sent through this endpoint.
//
// The REST key is a secret and must never reach the browser: it lives in the
// server-only THEMARKETER_REST_KEY env var and the request is made from here.

const ADD_SUBSCRIBER_URL = "https://t.themarketer.com/api/v1/add_subscriber";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const restKey = process.env.THEMARKETER_REST_KEY;
  const customerId = process.env.THEMARKETER_CUSTOMER_ID;

  if (!restKey || !customerId) {
    console.error(
      "theMarketer not configured: set THEMARKETER_REST_KEY and THEMARKETER_CUSTOMER_ID."
    );
    return NextResponse.json(
      { error: "Newsletter signup is temporarily unavailable." },
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
  // URLSearchParams handles the URL-encoding (e.g. "+" in phone numbers).
  const params = new URLSearchParams({ k: restKey, u: customerId, email });

  // Optional passthrough fields — only sent when provided.
  const optional: Record<string, string> = {
    firstname: "firstName",
    lastname: "lastName",
    phone: "phone",
    city: "city",
    country: "country",
    channels: "channels", // e.g. "email,sms"
    add_tags: "tags",
    birthday: "birthday", // YYYY-MM-DD
  };
  for (const [apiKey, bodyKey] of Object.entries(optional)) {
    const value = body[bodyKey];
    if (value != null && String(value).trim() !== "") {
      params.set(apiKey, String(value).trim());
    }
  }

  // Custom attributes: { attributes: { attribute_name: "value" } }
  if (body.attributes && typeof body.attributes === "object") {
    for (const [name, value] of Object.entries(body.attributes as Record<string, unknown>)) {
      if (value != null && String(value).trim() !== "") {
        params.set(`attributes[${name}]`, String(value).trim());
      }
    }
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${ADD_SUBSCRIBER_URL}?${params.toString()}`, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    console.error("theMarketer add_subscriber request failed:", error);
    return NextResponse.json(
      { error: "Could not reach the newsletter service. Try again." },
      { status: 502 }
    );
  }

  const data = await upstream.json().catch(() => ({}));

  if (!upstream.ok) {
    // Surface theMarketer's status to the server logs, but keep the client
    // message generic so REST-key / config details never leak to the browser.
    console.error(
      `theMarketer add_subscriber ${upstream.status}:`,
      (data as { message?: string }).message ?? data
    );
    return NextResponse.json(
      { error: "Could not complete the subscription. Try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
