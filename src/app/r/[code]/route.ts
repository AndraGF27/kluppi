import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const REFERRAL_CODE_REGEX = /^[A-HJ-NP-Za-km-z2-9]{8}$/;
const SIGNUP_URL = "https://app.kluppi.com/signup";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  if (process.env.VERCEL_ENV === "production") {
    notFound();
  }

  const { code } = await params;

  if (!REFERRAL_CODE_REGEX.test(code)) {
    return NextResponse.redirect(SIGNUP_URL, 307);
  }

  return NextResponse.redirect(
    `${SIGNUP_URL}?ref=${encodeURIComponent(code)}`,
    307
  );
}
