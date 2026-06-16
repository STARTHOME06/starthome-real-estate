"use client";

import { FormEvent, ReactNode, useState } from "react";

type LeadType = "contact" | "valuation" | "visit" | "buyer" | "alert";

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

  if (sent) return <div className="rounded-sm bg-green-50 p-6 text-green-900"><strong>Richiesta ricevuta.</strong><p className="mt-2 text-sm">Un consulente STARTHOME ti ricontatterà al più presto.</p></div>;
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
