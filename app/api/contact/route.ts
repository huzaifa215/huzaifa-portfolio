import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { profile } from "@/lib/resume";

/**
 * Contact endpoint.
 * Email delivery is scaffolded via Resend and only runs when RESEND_API_KEY
 * is configured. Without a key, the submission is validated and logged so the
 * UX works end-to-end in any environment - no secrets required to develop.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { company_url, ...data } = parsed.data;

  // Honeypot tripped - pretend success, do nothing.
  if (company_url) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  // No key: only acceptable in local dev. In production this is a misconfig and
  // should surface as a real error instead of a fake "received".
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] RESEND_API_KEY is not set in production.");
      return NextResponse.json(
        { ok: false, error: "Email isn't configured yet. Please email me directly." },
        { status: 500 }
      );
    }
    console.info("[contact] (dev, no RESEND_API_KEY) inquiry received:", { ...data, to });
    return NextResponse.json({ ok: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    // NOTE: the Resend SDK returns { data, error } and does NOT throw on
    // API-level failures (e.g. unverified `from` domain). Must check `error`.
    const { data: sent, error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New inquiry - ${data.intent} - ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company ? `Company: ${data.company}` : null,
        `Intent: ${data.intent}`,
        "",
        data.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("[contact] Resend returned an error:", error, { from, to });
      return NextResponse.json(
        { ok: false, error: "Could not send right now. Please email me directly." },
        { status: 502 }
      );
    }

    console.info("[contact] email sent, id:", sent?.id, { from, to });
  } catch (err) {
    console.error("[contact] Resend threw:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
