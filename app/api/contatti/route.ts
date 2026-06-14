import { NextResponse } from "next/server";

const labels: Record<string, string> = {
  contact: "Richiesta informazioni",
  valuation: "Richiesta valutazione gratuita",
  visit: "Richiesta visita immobile",
};

function clean(value: unknown, maxLength = 2000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Campo esca invisibile: i bot tendono a compilarlo.
    if (clean(body.website)) return NextResponse.json({ ok: true });

    const type = clean(body.type, 20);
    const nome = clean(body.nome, 120);
    const telefono = clean(body.telefono, 50);
    const email = clean(body.email, 160);
    const immobile = clean(body.immobile || body.property, 200);
    const context = clean(body.context, 240);
    const comune = clean(body.comune, 120);
    const tipologia = clean(body.tipologia, 80);
    const messaggio = clean(body.messaggio);

    if (!nome || !telefono || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Dati mancanti o non validi" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL;
    const from = process.env.FROM_EMAIL || "STARTHOME sito <onboarding@resend.dev>";

    if (!apiKey || !to) {
      console.error("Configurazione email mancante: RESEND_API_KEY o CONTACT_EMAIL");
      return NextResponse.json({ error: "Servizio email non configurato" }, { status: 503 });
    }

    const subject = `${labels[type] || labels.contact} - ${nome}`;
    const details = [
      ["Tipo richiesta", labels[type] || labels.contact],
      ["Nome", nome],
      ["Telefono", telefono],
      ["Email", email],
      ["Immobile", immobile],
      ["Provenienza", context],
      ["Comune", comune],
      ["Tipologia", tipologia],
      ["Messaggio", messaggio],
    ].filter(([, value]) => value);

    const rows = details
      .map(([label, value]) => `<tr><td style="padding:8px;border-bottom:1px solid #ddd"><strong>${escapeHtml(label)}</strong></td><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(value).replaceAll("\n", "<br>")}</td></tr>`)
      .join("");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html: `<h2>Nuovo contatto dal sito STARTHOME</h2><table style="border-collapse:collapse;width:100%;max-width:700px">${rows}</table>`,
      }),
    });

    if (!response.ok) {
      console.error("Errore Resend", response.status, await response.text());
      return NextResponse.json({ error: "Invio email non riuscito" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Errore modulo contatti", error);
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
}
