import { NextResponse } from "next/server";

// Server-side wrapper for theMarketer's "Update Tags" API.
// https://t.themarketer.com/api/v1/update-tags  (note: hyphen, unlike the
// underscore paths of add_subscriber / remove_subscriber)
//
// Adds and/or removes tags on a contact. Set overwriteExisting=true to replace
// the contact's tags with addTags instead of merging.
//
// Same secret-safe pattern as the other theMarketer routes: REST key stays
// server-side (THEMARKETER_REST_KEY); the request is made from here.

const UPDATE_TAGS_URL = "https://t.themarketer.com/api/v1/update-tags";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Accepts a string[], a single string, or a comma-separated string → clean string[].
function toTagList(value: unknown): string[] {
  if (value == null) return [];
  const raw = Array.isArray(value) ? value : String(value).split(",");
  return raw.map((t) => String(t).trim()).filter((t) => t !== "");
}

export async function POST(request: Request) {
  const restKey = process.env.THEMARKETER_REST_KEY;
  const customerId = process.env.THEMARKETER_CUSTOMER_ID;

  if (!restKey || !customerId) {
    console.error(
      "theMarketer not configured: set THEMARKETER_REST_KEY and THEMARKETER_CUSTOMER_ID."
    );
    return NextResponse.json(
      { error: "Tag update is temporarily unavailable." },
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

  const addTags = toTagList(body.addTags);
  const removeTags = toTagList(body.removeTags);
  if (addTags.length === 0 && removeTags.length === 0) {
    return NextResponse.json(
      { error: "Provide at least one tag to add or remove." },
      { status: 400 }
    );
  }

  // All theMarketer params travel in the query string (even for POST).
  // add_tags[] / remove_tags[] are repeated array params.
  const params = new URLSearchParams({ k: restKey, u: customerId, email });
  for (const tag of addTags) params.append("add_tags[]", tag);
  for (const tag of removeTags) params.append("remove_tags[]", tag);
  if (body.overwriteExisting) params.set("overwrite_existing", "1");

  let upstream: Response;
  try {
    upstream = await fetch(`${UPDATE_TAGS_URL}?${params.toString()}`, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    console.error("theMarketer update-tags request failed:", error);
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
      `theMarketer update-tags ${upstream.status}:`,
      (data as { message?: string }).message ?? data
    );
    return NextResponse.json(
      { error: "Could not update the tags. Try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
