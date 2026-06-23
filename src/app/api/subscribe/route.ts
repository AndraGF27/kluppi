import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const createdAt = new Date().toISOString();

    // Stores unique emails in a Redis set.
    // Connect Vercel KV / Redis Storage in the Vercel dashboard before production use.
    await kv.sadd("waitlist:emails", email);
    await kv.hset(`waitlist:email:${email}`, { email, createdAt });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not save your email. Check server configuration." },
      { status: 500 }
    );
  }
}
