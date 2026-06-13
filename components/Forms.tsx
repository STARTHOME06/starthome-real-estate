"use client";

import { FormEvent, useState } from "react";

export function LeadForm({ type = "contact", property }: { type?: "contact" | "valuation" | "visit"; property?: string }) {
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
    <div className="grid gap-4 sm:grid-cols-2"><div><label className="label" htmlFor={`${type}-name`}>Nome e cognome</label><input id={`${type}-name`} name="nome" className="field" required placeholder="Mario Rossi"/></div><div><label className="label" htmlFor={`${type}-phone`}>Telefono</label><input id={`${type}-phone`} name="telefono" className="field" required type="tel" placeholder="+39"/></div></div>
    <div><label className="label" htmlFor={`${type}-email`}>Email</label><input id={`${type}-email`} name="email" className="field" required type="email" placeholder="nome@email.it"/></div>
    {type === "valuation" && <div className="grid gap-4 sm:grid-cols-2"><div><label className="label" htmlFor="city">Comune immobile</label><input id="city" name="comune" className="field" required placeholder="Es. Vigonza"/></div><div><label className="label" htmlFor="property-type">Tipologia</label><select id="property-type" name="tipologia" className="field"><option>Appartamento</option><option>Villa</option><option>Casa indipendente</option><option>Terreno</option><option>Altro</option></select></div></div>}
    <div><label className="label" htmlFor={`${type}-message`}>Messaggio</label><textarea id={`${type}-message`} name="messaggio" rows={4} className="field h-auto py-3" placeholder={type === "valuation" ? "Superficie, stato, piano e altre informazioni utili..." : "Come possiamo aiutarti?"}/></div>
    <label className="flex gap-3 text-xs leading-5 text-ink/60"><input required type="checkbox" className="mt-1 accent-gold"/> Acconsento al trattamento dei dati personali secondo la Privacy Policy.</label>
    {error && <p role="alert" className="rounded-sm bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    <button className="btn-primary w-full disabled:cursor-wait disabled:opacity-60" type="submit" disabled={sending}>
      {sending ? "Invio in corso..." : type === "valuation" ? "Richiedi la valutazione gratuita" : type === "visit" ? "Prenota la visita" : "Invia la richiesta"}
    </button>
  </form>;
}
