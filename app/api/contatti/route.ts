import { NextResponse } from "next/server";
import { site, whatsappUrl } from "@/lib/site";
import { isWhatsAppConfigured, sendWhatsAppAutoReply } from "@/lib/whatsapp";

const labels: Record<string, string> = {
  contact: "Richiesta informazioni",
  valuation: "Richiesta valutazione gratuita",
  visit: "Richiesta visita immobile",
  buyer: "Richiesta ricerca casa",
  alert: "Richiesta alert nuovi immobili",
  career: "Candidatura lavora con noi",
};

const nextStepCopy: Record<string, { title: string; intro: string; steps: string[] }> = {
  valuation: {
    title: "Abbiamo ricevuto la tua richiesta di valutazione",
    intro: "Grazie per aver scelto STARTHOME REAL ESTATE. Ora analizziamo le informazioni che ci hai inviato e ti ricontattiamo per costruire una valutazione seria, realistica e utile per decidere il prossimo passo.",
    steps: [
      "Verifichiamo zona, caratteristiche e posizionamento dell'immobile.",
      "Ti contattiamo per eventuali dettagli mancanti o per fissare un sopralluogo.",
      "Prepariamo un'indicazione di valore chiara, con una strategia commerciale coerente.",
    ],
  },
  buyer: {
    title: "Abbiamo ricevuto la tua ricerca casa",
    intro: "Grazie per averci raccontato cosa stai cercando. Useremo queste informazioni per proporti immobili più coerenti con budget, zona e stile di vita, anche quando arrivano nuove opportunità.",
    steps: [
      "Analizziamo zone, budget, tipologia e priorità.",
      "Confrontiamo la richiesta con gli immobili disponibili e quelli in arrivo.",
      "Ti ricontattiamo con proposte selezionate, senza farti perdere tempo.",
    ],
  },
  visit: {
    title: "Abbiamo ricevuto la tua richiesta di visita",
    intro: "Grazie, abbiamo preso in carico la richiesta. Un consulente STARTHOME ti contatterà per concordare giorno e orario e darti tutte le informazioni utili sull'immobile.",
    steps: [
      "Verifichiamo disponibilità dell'immobile e agenda visite.",
      "Ti richiamiamo per fissare l'appuntamento.",
      "Ti accompagniamo con informazioni chiare su spazi, zona e passaggi successivi.",
    ],
  },
  alert: {
    title: "Il tuo alert immobili è attivo",
    intro: "Grazie, abbiamo registrato la tua richiesta. Ti avviseremo quando arriveranno soluzioni simili e coerenti con le caratteristiche che ci hai indicato.",
    steps: [
      "Salviamo le preferenze principali della tua ricerca.",
      "Monitoriamo le nuove disponibilità nelle zone di interesse.",
      "Ti contattiamo quando troviamo una soluzione davvero pertinente.",
    ],
  },
  career: {
    title: "Abbiamo ricevuto la tua candidatura",
    intro: "Grazie per l'interesse verso STARTHOME REAL ESTATE. Valuteremo il tuo profilo con attenzione e ti ricontatteremo se in linea con il percorso di crescita dell'agenzia.",
    steps: [
      "Leggiamo esperienza, disponibilità e zona di interesse.",
      "Valutiamo il profilo rispetto alle figure che stiamo inserendo.",
      "Ti contattiamo per un primo confronto conoscitivo se c'è coerenza.",
    ],
  },
  contact: {
    title: "Abbiamo ricevuto la tua richiesta",
    intro: "Grazie per aver contattato STARTHOME REAL ESTATE. Ti risponderemo con indicazioni chiare e concrete, in base all'obiettivo che ci hai raccontato.",
    steps: [
      "Leggiamo la tua richiesta.",
      "Individuiamo il consulente più adatto.",
      "Ti ricontattiamo via telefono o email il prima possibile.",
    ],
  },
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

function buildCustomerEmail(type: string, nome: string) {
  const copy = nextStepCopy[type] || nextStepCopy.contact;
  const safeName = escapeHtml(nome);
  const steps = copy.steps.map((step) => `<li style="margin:0 0 10px">${escapeHtml(step)}</li>`).join("");
  const waLink = whatsappUrl("Buongiorno STARTHOME REAL ESTATE, ho appena inviato una richiesta dal sito e vorrei parlarne con un consulente.");

  return {
    subject: `${copy.title} - STARTHOME REAL ESTATE`,
    html: `
      <div style="margin:0;background:#f5f2ec;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#171725">
        <div style="margin:0 auto;max-width:680px;background:#ffffff;border:1px solid #e7ddc6">
          <div style="background:#121522;padding:28px 32px;color:#ffffff">
            <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#c9a24f;font-weight:700">STARTHOME REAL ESTATE</div>
            <h1 style="margin:14px 0 0;font-size:28px;line-height:1.2;font-family:Georgia,serif">${escapeHtml(copy.title)}</h1>
          </div>
          <div style="padding:32px">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7">Buongiorno ${safeName},</p>
            <p style="margin:0 0 24px;font-size:16px;line-height:1.7">${escapeHtml(copy.intro)}</p>
            <h2 style="margin:0 0 14px;font-size:18px">Cosa succede ora</h2>
            <ol style="margin:0 0 28px;padding-left:22px;font-size:15px;line-height:1.6">${steps}</ol>
            <div style="background:#f5f2ec;border-left:4px solid #c9a24f;padding:18px 20px;margin:0 0 28px">
              <strong>Vuoi fare prima?</strong><br>
              Puoi chiamarci al <a style="color:#121522;font-weight:700" href="tel:${site.phoneHref}">${site.phoneDisplay}</a> oppure scriverci direttamente su WhatsApp.
            </div>
            <p style="margin:0 0 26px">
              <a href="${waLink}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;padding:14px 20px;border-radius:2px">Scrivi su WhatsApp</a>
            </p>
            <p style="margin:0;font-size:14px;line-height:1.7;color:#666">
              ${site.name}<br>
              ${site.postalAddress}<br>
              ${site.phoneDisplay} · ${site.email}
            </p>
          </div>
        </div>
      </div>
    `,
  };
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
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
    const budget = clean(body.budget, 80);
    const camere = clean(body.camere, 80);
    const urgenza = clean(body.urgenza, 120);
    const mutuo = clean(body.mutuo, 80);
    const mq = clean(body.mq, 80);
    const piano = clean(body.piano, 80);
    const stato = clean(body.stato, 120);
    const garage = clean(body.garage, 80);
    const giardino = clean(body.giardino, 80);
    const tempi = clean(body.tempi, 120);
    const ruolo = clean(body.ruolo, 120);
    const esperienza = clean(body.esperienza, 120);
    const provincia = clean(body.provincia, 120);
    const partitaIva = clean(body.partitaIva, 80);
    const disponibilita = clean(body.disponibilita, 120);
    const linkedin = clean(body.linkedin, 240);
    const whatsappConsent = clean(body.whatsappConsent, 20) === "si";
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
      ["Budget", budget],
      ["Camere", camere],
      ["Urgenza", urgenza],
      ["Mutuo", mutuo],
      ["MQ", mq],
      ["Piano", piano],
      ["Stato immobile", stato],
      ["Garage", garage],
      ["Giardino", giardino],
      ["Tempi", tempi],
      ["Ruolo", ruolo],
      ["Esperienza", esperienza],
      ["Provincia/Zona", provincia],
      ["Partita IVA", partitaIva],
      ["Disponibilità", disponibilita],
      ["LinkedIn / portfolio", linkedin],
      ["Preferenza contatto WhatsApp", whatsappConsent ? "Sì" : "No"],
      ["Messaggio", messaggio],
    ].filter(([, value]) => value);

    const rows = details
      .map(([label, value]) => `<tr><td style="padding:8px;border-bottom:1px solid #ddd"><strong>${escapeHtml(label)}</strong></td><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(value).replaceAll("\n", "<br>")}</td></tr>`)
      .join("");

    const response = await sendEmail(apiKey, {
      from,
      to: [to],
      reply_to: email,
      subject,
      html: `<h2>Nuovo contatto dal sito STARTHOME</h2><table style="border-collapse:collapse;width:100%;max-width:700px">${rows}</table>`,
    });

    if (!response.ok) {
      console.error("Errore Resend", response.status, await response.text());
      return NextResponse.json({ error: "Invio email non riuscito" }, { status: 502 });
    }

    const customerEmail = buildCustomerEmail(type, nome);
    const customerResponse = await sendEmail(apiKey, {
      from,
      to: [email],
      reply_to: to,
      subject: customerEmail.subject,
      html: customerEmail.html,
    });

    // La richiesta all'agenzia resta valida anche se l'autorisposta non parte
    // per limiti del dominio email o configurazioni Resend.
    const autoReplySent = customerResponse.ok;

    if (!autoReplySent) {
      console.error("Errore autorisposta Resend", customerResponse.status, await customerResponse.text());
    }

    const whatsappResult = whatsappConsent
      ? await sendWhatsAppAutoReply({ typeLabel: labels[type] || labels.contact, name: nome, phone: telefono })
      : { configured: isWhatsAppConfigured(), sent: false };

    return NextResponse.json({
      ok: true,
      autoReplySent,
      whatsappConfigured: whatsappResult.configured,
      whatsappAutoReplySent: whatsappResult.sent,
    });
  } catch (error) {
    console.error("Errore modulo contatti", error);
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
}
