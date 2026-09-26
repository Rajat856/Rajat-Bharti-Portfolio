import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  service?: string;
  message?: string;
  /** Honeypot — real users never fill this. */
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Very small in-memory rate limit. Swap for Upstash/Redis on multi-instance hosting. */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages from this address. Try again shortly." },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't learn anything.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 20) errors.message = "Tell me a little more — at least 20 characters.";
  if (message.length > 5000) errors.message = "That's a bit long — please keep it under 5000 characters.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const submission = {
    name,
    email,
    company: body.company?.trim() || "—",
    budget: body.budget?.trim() || "—",
    service: body.service?.trim() || "—",
    message,
    receivedAt: new Date().toISOString(),
  };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  // Without a mail provider configured the submission is logged rather than
  // dropped, so local development and preview deploys still work end to end.
  if (!apiKey || !to) {
    console.info("[contact] New submission (no mail provider configured):", submission);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `New enquiry from ${name}${submission.company !== "—" ? ` (${submission.company})` : ""}`,
        text: [
          `Name: ${submission.name}`,
          `Email: ${submission.email}`,
          `Company: ${submission.company}`,
          `Service: ${submission.service}`,
          `Budget: ${submission.budget}`,
          "",
          submission.message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("[contact] Mail provider error:", res.status, await res.text());
      return NextResponse.json(
        { ok: false, error: "Couldn't send the message. Please email me directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please email me directly." },
      { status: 500 },
    );
  }
}
