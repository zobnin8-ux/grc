import { NextResponse } from "next/server";

// Server-side proxy: site contact form -> GRC intake.
// INTAKE_TOKEN lives only here (site env) and never reaches the browser.
export const runtime = "nodejs";

const INTAKE_URL =
  process.env.INTAKE_URL ??
  "https://kuuxaubnbwbwjdttvhom.supabase.co/functions/v1/intake";
const INTAKE_TOKEN = process.env.INTAKE_TOKEN;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: hidden field only bots fill in. Silently accept and drop.
  if (str(body.company_website) !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name);
  const company = str(body.company);
  const phone = str(body.phone);
  const email = str(body.email);
  const location = str(body.location);
  const urgency = str(body.urgency);
  const message = str(body.message);
  const form = str(body.form) || "contact";

  // intake requires source + at least one of email/phone.
  if (!phone && !email) {
    return NextResponse.json(
      { ok: false, error: "Please provide a phone number or email." },
      { status: 400 },
    );
  }

  const payload = {
    source: "web_form",
    email: email || undefined,
    phone: phone || undefined,
    name,
    company,
    location,
    urgency,
    message,
    form,
  };

  try {
    const res = await fetch(INTAKE_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(INTAKE_TOKEN ? { "x-intake-token": INTAKE_TOKEN } : {}),
      },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };

    if (!res.ok || !data.ok) {
      console.error("intake error", res.status, data);
      return NextResponse.json(
        { ok: false, error: "Could not submit your request. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("intake fetch failed", err);
    return NextResponse.json(
      { ok: false, error: "Service temporarily unavailable. Please try again later." },
      { status: 502 },
    );
  }
}
