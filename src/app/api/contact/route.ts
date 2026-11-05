import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO ?? "TheBallinLeague1v1@gmail.com";
const FROM = process.env.CONTACT_FROM ?? "TBL Contact <contact@theballinleague.fr>";
const CATS: Record<string, string> = { joueur: "Joueur", partenaire: "Partenaire", sponsor: "Sponsor", media: "Média", general: "Demande générale" };
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "invalid" }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true });
  const category = String(b.category ?? "general");
  const name = String(b.name ?? "").trim();
  const email = String(b.email ?? "").trim();
  const message = String(b.message ?? "").trim();
  if (!CATS[category] || name.length < 1 || name.length > 120 || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 5 || message.length > 5000) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  let stored = false;
  let mailed = false;

  if (sbUrl && sbKey) {
    try {
      const r = await fetch(`${sbUrl}/rest/v1/contact_messages`, {
        method: "POST",
        headers: { apikey: sbKey, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({ category, name, email, message }),
      });
      stored = r.ok;
    } catch { /* on tente quand même l'e-mail */ }
  }

  if (resendKey) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM,
          to: [TO],
          reply_to: email,
          subject: `[TBL Contact] ${CATS[category]} — ${name}`,
          text: `Catégorie : ${CATS[category]}\nNom : ${name}\nE-mail : ${email}\n\n${message}`,
          html: `<p><b>Catégorie :</b> ${esc(CATS[category])}<br><b>Nom :</b> ${esc(name)}<br><b>E-mail :</b> ${esc(email)}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
        }),
      });
      mailed = r.ok;
    } catch { /* ignoré, la base reste la source de vérité */ }
  }

  if (!stored && !mailed) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  return NextResponse.json({ ok: true });
}
