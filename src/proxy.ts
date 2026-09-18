import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

const GATE_USERNAME = "SITE_GATE_PASSWORD";
const GATE_REALM = 'Basic realm="Kluppi preview", charset="UTF-8"';

function challenge(status: 401 | 503): NextResponse {
  return new NextResponse(
    status === 401 ? "Authentication required." : "Preview access is unavailable.",
    {
      status,
      headers: {
        ...(status === 401 ? { "WWW-Authenticate": GATE_REALM } : {}),
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
}

function validCredentials(header: string | null, password: string): boolean {
  if (!header?.startsWith("Basic ")) return false;

  let credentials: string;
  try {
    credentials = Buffer.from(header.slice(6), "base64").toString("utf8");
  } catch {
    return false;
  }

  const separator = credentials.indexOf(":");
  if (separator < 0 || credentials.slice(0, separator) !== GATE_USERNAME) return false;

  const given = createHash("sha256").update(credentials.slice(separator + 1)).digest();
  const expected = createHash("sha256").update(password).digest();
  return timingSafeEqual(given, expected);
}

export function proxy(request: NextRequest): NextResponse {
  const password = process.env.SITE_GATE_PASSWORD;
  if (!password) return challenge(503);
  if (!validCredentials(request.headers.get("authorization"), password)) {
    return challenge(401);
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/2/:path*", "/despre/:path*", "/parteneri/:path*", "/api/partner-inquiry"],
};
