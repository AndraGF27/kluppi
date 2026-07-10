import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATEGORIES = new Set(["Modă & accesorii", "Îngrijire & sănătate", "Casă & grădină", "Tehnologie & auto", "Gusturi & experiențe", "Timp liber & ai tăi"]);
const requestsByIp = new Map<string, number[]>();

function getClientIp(request: Request) { return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"; }

function isRateLimited(ip: string) {
  const now = Date.now();
  for (const [bucketIp, timestamps] of requestsByIp) {
    const currentTimestamps = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
    if (currentTimestamps.length === 0) requestsByIp.delete(bucketIp);
    else requestsByIp.set(bucketIp, currentTimestamps);
  }
  const timestamps = requestsByIp.get(ip) ?? [];
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) return true;
  requestsByIp.set(ip, [...timestamps, now]);
  return false;
}

function readString(value: unknown, maxLength = 200) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length <= maxLength ? trimmed : null;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return NextResponse.json({ ok: false }, { status: 400 });
  if (isRateLimited(getClientIp(request))) return NextResponse.json({ ok: false }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  const phone = readString(body.phone);
  if (phone === null) return NextResponse.json({ ok: false }, { status: 400 });
  if (phone) return NextResponse.json({ ok: true });

  const brandName = readString(body.brandName);
  const website = readString(body.website);
  const fullName = readString(body.fullName);
  const role = readString(body.role);
  const email = readString(body.email)?.toLowerCase() ?? null;
  const category = readString(body.category);
  const message = body.message === undefined ? "" : readString(body.message, 2000);
  if (!brandName || !website || !fullName || !role || !email || !EMAIL_REGEX.test(email) || !category || !CATEGORIES.has(category) || message === null) return NextResponse.json({ ok: false }, { status: 400 });

  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;
  const recipient = process.env.PARTNERS_INQUIRY_TO || "partners@kluppi.com";
  if (!resendApiKey || !emailFrom) return NextResponse.json({ ok: false }, { status: 503 });

  const text = [`Brand: ${brandName}`, `Website: ${website}`, `Nume: ${fullName}`, `Rol: ${role}`, `E-mail: ${email}`, `Categorie: ${category}`, `Mesaj: ${message || "—"}`].join("\n");
  let response: Response;
  try {
    response = await fetch(RESEND_EMAILS_URL, { method: "POST", headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: emailFrom, to: [recipient], subject: `Cerere parteneriat: ${brandName.replace(/[\r\n]+/g, " ")}`, text, reply_to: email }), signal: AbortSignal.timeout(10_000) });
  } catch {
    console.error("[partner-inquiry] send failed (network)");
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  if (!response.ok) {
    console.error(`[partner-inquiry] send failed (${response.status})`);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  console.info("[partner-inquiry] sent");
  return NextResponse.json({ ok: true });
}
