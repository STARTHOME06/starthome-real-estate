"use client";

import { FormEvent, ReactNode, useState } from "react";
import { site, whatsappUrl } from "@/lib/site";

type LeadType = "contact" | "valuation" | "visit" | "buyer" | "alert" | "career";

const successCopy: Record<LeadType, { title: string; message: string; whatsapp: string }> = {
  contact: {
    title: "Richiesta ricevuta.",
    message: "Un consulente STARTHOME ti ricontatterà al più presto.",
    whatsapp: "Buongiorno STARTHOME REAL ESTATE, ho appena inviato una richiesta dal sito e vorrei parlarne con un consulente.",
  },
  valuation: {
    title: "Valutazione richiesta.",
    message: "Abbiamo ricevuto i dati dell'immobile. Ti contatteremo per preparare una valutazione chiara e realistica.",
    whatsapp: "Buongiorno STARTHOME REAL ESTATE, ho richiesto una valutazione gratuita dal sito.",
  },
  visit: {
    title: "Visita richiesta.",
    message: "Ti richiamiamo per concordare giorno e orario della visita.",
    whatsapp: "Buongiorno STARTHOME REAL ESTATE, ho richiesto una visita dal sito.",
  },
  buyer: {
    title: "Ricerca ricevuta.",
    message: "Abbiamo registrato le tue preferenze e ti proporremo immobili coerenti con la tua richiesta.",
    whatsapp: "Buongiorno STARTHOME REAL ESTATE, ho compilato Trova la casa giusta per te.",
  },
  alert: {
    title: "Alert attivato.",
    message: "Ti avviseremo quando arrivano immobili simili e coerenti con la tua ricerca.",
    whatsapp: "Buongiorno STARTHOME REAL ESTATE, ho attivato un alert immobili dal sito.",
  },
  career: {
    title: "Candidatura ricevuta.",
    message: "Valuteremo il tuo profilo e ti ricontatteremo se in linea con il percorso STARTHOME.",
    whatsapp: "Buongiorno STARTHOME REAL ESTATE, ho inviato una candidatura dalla pagina Lavora con noi.",
  },
};

function FormShell({ type, property, context, children, buttonLabel }: { type: LeadType; property?: string; context?: string; children: ReactNode; buttonLabel: string }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          property,
          context,
          ...Object.fromEntries(new FormData(e.currentTarget)),
        }),
      });

      if (!response.ok) throw new Error("Invio non riuscito");
      setSent(true);
    } catch {
      setError("Non è stato possibile inviare la richiesta. Riprova oppure contattaci tramite telefono o WhatsApp.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    const copy = successCopy[type];
    return <div className="rounded-sm bg-green-50 p-6 text-green-950">
      <strong>{copy.title}</strong>
      <p className="mt-2 text-sm leading-6">{copy.message} Ti abbiamo inviato anche una conferma automatica via email.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <a className="btn-outline justify-center bg-white" href={`tel:${site.phoneHref}`}>Chiama {site.phoneDisplay}</a>
        <a className="btn-primary justify-center bg-[#25D366] text-white hover:bg-[#1fb85a]" href={whatsappUrl(copy.whatsapp)} target="_blank" rel="noreferrer">Scrivi su WhatsApp</a>
      </div>
    </div>;
  }
  return <form onSubmit={submit} className="grid gap-4">
    {property && <input type="hidden" name="immobile" value={property}/>}
    <input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
    {children}
    <label className="flex gap-3 text-xs leading-5 text-ink/60"><input required type="checkbox" className="mt-1 accent-gold"/> Acconsento al trattamento dei dati personali secondo la Privacy Policy.</label>
    {error && <p role="alert" className="rounded-sm bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    <button className="btn-primary w-full disabled:cursor-wait disabled:opacity-60" type="submit" disabled={sending}>{sending ? "Invio in corso..." : buttonLabel}</button>
  </form>;
}

export function LeadForm({ type = "contact", property, context, messagePlaceholder }: { type?: "contact" | "valuation" | "visit"; property?: string; context?: string; messagePlaceholder?: string }) {
  return <FormShell type={type} property={property} context={context} buttonLabel={type === "valuation" ? "Richiedi la valutazione gratuita" : type === "visit" ? "Prenota la visita" : "Invia la richiesta"}>
    <div className="grid gap-4 sm:grid-cols-2"><div><label className="label" htmlFor={`${type}-name`}>Nome e cognome</label><input id={`${type}-name`} name="nome" className="field" required placeholder="Mario Rossi"/></div><div><label className="label" htmlFor={`${type}-phone`}>Telefono</label><input id={`${type}-phone`} name="telefono" className="field" required type="tel" placeholder="+39"/></div></div>
    <div><label className="label" htmlFor={`${type}-email`}>Email</label><input id={`${type}-email`} name="email" className="field" required type="email" placeholder="nome@email.it"/></div>
    {type === "valuation" && <><div className="grid gap-4 sm:grid-cols-2"><div><label className="label" htmlFor="city">Comune immobile</label><input id="city" name="comune" className="field" required placeholder="Es. Vigonza"/></div><div><label className="label" htmlFor="property-type">Tipologia</label><select id="property-type" name="tipologia" className="field"><option>Appartamento</option><option>Villa</option><option>Casa indipendente</option><option>Terreno</option><option>Altro</option></select></div></div><div className="grid gap-4 sm:grid-cols-3"><div><label className="label" htmlFor="mq">MQ indicativi</label><input id="mq" name="mq" className="field" placeholder="Es. 120"/></div><div><label className="label" htmlFor="rooms">Camere</label><select id="rooms" name="camere" className="field"><option>Non so</option><option>1</option><option>2</option><option>3</option><option>4+</option></select></div><div><label className="label" htmlFor="floor">Piano</label><input id="floor" name="piano" className="field" placeholder="Es. 2°"/></div></div><div className="grid gap-4 sm:grid-cols-3"><div><label className="label" htmlFor="state">Stato</label><select id="state" name="stato" className="field"><option>Da ristrutturare</option><option>Buono</option><option>Ristrutturato</option><option>Nuovo/recente</option></select></div><div><label className="label" htmlFor="garage">Garage</label><select id="garage" name="garage" className="field"><option>No</option><option>Sì</option><option>Doppio</option></select></div><div><label className="label" htmlFor="garden">Giardino/terrazza</label><select id="garden" name="giardino" className="field"><option>No</option><option>Giardino</option><option>Terrazza</option><option>Entrambi</option></select></div></div><div><label className="label" htmlFor="timeline">Tempi desiderati</label><select id="timeline" name="tempi" className="field"><option>Sto valutando</option><option>Entro 3 mesi</option><option>3-6 mesi</option><option>Oltre 6 mesi</option></select></div></>}
    <div><label className="label" htmlFor={`${type}-message`}>Messaggio</label><textarea id={`${type}-message`} name="messaggio" rows={4} className="field h-auto py-3" placeholder={messagePlaceholder || (type === "valuation" ? "Superficie, stato, piano e altre informazioni utili..." : "Come possiamo aiutarti?")}/></div>
  </FormShell>;
}

export function BuyerSearchForm({ context = "Trova la casa giusta" }: { context?: string }) {
  return <FormShell type="buyer" context={context} buttonLabel="Ricevi proposte su misura">
    <div className="grid gap-4 sm:grid-cols-2"><div><label className="label" htmlFor="buyer-name">Nome e cognome</label><input id="buyer-name" name="nome" className="field" required placeholder="Mario Rossi"/></div><div><label className="label" htmlFor="buyer-phone">Telefono</label><input id="buyer-phone" name="telefono" className="field" required type="tel" placeholder="+39"/></div></div>
    <div><label className="label" htmlFor="buyer-email">Email</label><input id="buyer-email" name="email" className="field" required type="email" placeholder="nome@email.it"/></div>
    <div className="grid gap-4 sm:grid-cols-2"><div><label className="label" htmlFor="buyer-city">Città o zone preferite</label><input id="buyer-city" name="comune" className="field" required placeholder="Es. Vigonza, Dolo, Pianiga"/></div><div><label className="label" htmlFor="buyer-type">Tipologia</label><select id="buyer-type" name="tipologia" className="field"><option>Appartamento</option><option>Casa indipendente</option><option>Villa / bifamiliare</option><option>Terreno</option><option>Affitto</option></select></div></div>
    <div className="grid gap-4 sm:grid-cols-3"><div><label className="label" htmlFor="buyer-budget">Budget</label><select id="buyer-budget" name="budget" className="field"><option>Fino a 150.000 €</option><option>150.000 - 250.000 €</option><option>250.000 - 400.000 €</option><option>Oltre 400.000 €</option></select></div><div><label className="label" htmlFor="buyer-rooms">Camere</label><select id="buyer-rooms" name="camere" className="field"><option>1+</option><option>2+</option><option>3+</option><option>4+</option></select></div><div><label className="label" htmlFor="buyer-mortgage">Mutuo</label><select id="buyer-mortgage" name="mutuo" className="field"><option>Da valutare</option><option>Sì, mi serve</option><option>No</option><option>Già pre-deliberato</option></select></div></div>
    <div><label className="label" htmlFor="buyer-urgency">Urgenza</label><select id="buyer-urgency" name="urgenza" className="field"><option>Sto iniziando a cercare</option><option>Entro 3 mesi</option><option>3-6 mesi</option><option>Appena trovo quella giusta</option></select></div>
    <div><label className="label" htmlFor="buyer-message">Cosa non deve mancare?</label><textarea id="buyer-message" name="messaggio" rows={3} className="field h-auto py-3" placeholder="Garage, giardino, piano, terrazza, scuole vicine..."/></div>
  </FormShell>;
}

export function PropertyAlertForm({ property }: { property: string }) {
  return <FormShell type="alert" property={property} context="Alert immobile simile" buttonLabel="Avvisami immobili simili">
    <div className="grid gap-4 sm:grid-cols-2"><div><label className="label" htmlFor="alert-name">Nome e cognome</label><input id="alert-name" name="nome" className="field" required placeholder="Mario Rossi"/></div><div><label className="label" htmlFor="alert-phone">Telefono</label><input id="alert-phone" name="telefono" className="field" required type="tel" placeholder="+39"/></div></div>
    <div><label className="label" htmlFor="alert-email">Email</label><input id="alert-email" name="email" className="field" required type="email" placeholder="nome@email.it"/></div>
    <div><label className="label" htmlFor="alert-message">Cosa cerchi di simile?</label><textarea id="alert-message" name="messaggio" rows={3} className="field h-auto py-3" placeholder="Zona, budget, camere, garage, tempi..."/></div>
  </FormShell>;
}

export function CareerForm() {
  return <FormShell type="career" context="Lavora con noi" buttonLabel="Invia la candidatura">
    <div className="grid gap-4 sm:grid-cols-2"><div><label className="label" htmlFor="career-name">Nome e cognome</label><input id="career-name" name="nome" className="field" required placeholder="Mario Rossi"/></div><div><label className="label" htmlFor="career-phone">Telefono</label><input id="career-phone" name="telefono" className="field" required type="tel" placeholder="+39"/></div></div>
    <div><label className="label" htmlFor="career-email">Email</label><input id="career-email" name="email" className="field" required type="email" placeholder="nome@email.it"/></div>
    <div className="grid gap-4 sm:grid-cols-2"><div><label className="label" htmlFor="career-role">Figura di interesse</label><select id="career-role" name="ruolo" className="field"><option>Agente immobiliare</option><option>Acquisitore / consulente vendite</option><option>Coordinatrice / segreteria commerciale</option><option>Collaboratore junior</option><option>Altro profilo</option></select></div><div><label className="label" htmlFor="career-experience">Esperienza</label><select id="career-experience" name="esperienza" className="field"><option>Prima esperienza</option><option>1-2 anni</option><option>3-5 anni</option><option>Oltre 5 anni</option></select></div></div>
    <div className="grid gap-4 sm:grid-cols-3"><div><label className="label" htmlFor="career-area">Zona/provincia</label><input id="career-area" name="provincia" className="field" placeholder="Es. Padova, Venezia"/></div><div><label className="label" htmlFor="career-vat">Partita IVA</label><select id="career-vat" name="partitaIva" className="field"><option>Da aprire</option><option>Già attiva</option><option>Non so</option></select></div><div><label className="label" htmlFor="career-availability">Disponibilità</label><select id="career-availability" name="disponibilita" className="field"><option>Immediata</option><option>Entro 30 giorni</option><option>Da valutare</option></select></div></div>
    <div><label className="label" htmlFor="career-linkedin">LinkedIn / portfolio / profilo online</label><input id="career-linkedin" name="linkedin" className="field" placeholder="Link facoltativo"/></div>
    <div><label className="label" htmlFor="career-message">Raccontaci chi sei</label><textarea id="career-message" name="messaggio" rows={4} className="field h-auto py-3" placeholder="Esperienze, obiettivi, zona in cui vuoi lavorare, perché STARTHOME..."/></div>
  </FormShell>;
}
