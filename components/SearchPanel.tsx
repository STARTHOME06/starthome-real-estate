"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { cities } from "@/lib/data";
import { Icon } from "./Icons";

export function SearchPanel({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = new FormData(e.currentTarget);
    const contract = values.get("contract") || "vendita";
    const qs = new URLSearchParams();
    for (const [key, value] of values) if (key !== "contract" && value) qs.set(key, value.toString());
    router.push(`/immobili-in-${contract}?${qs}`);
  }
  return <form onSubmit={submit} className={`grid gap-3 bg-white p-4 shadow-soft ${compact ? "lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-6"}`}>
    <select name="contract" className="field" aria-label="Contratto"><option value="vendita">In vendita</option><option value="affitto">In affitto</option></select>
    <select name="city" className="field" aria-label="Città"><option value="">Tutte le città</option>{cities.map(c => <option key={c}>{c}</option>)}</select>
    {!compact && <select name="type" className="field" aria-label="Tipologia"><option value="">Tutte le tipologie</option><option>Appartamento</option><option>Villa</option><option>Attico</option><option>Casa indipendente</option></select>}
    <select name="rooms" className="field" aria-label="Locali"><option value="">Locali</option><option value="2">2+ locali</option><option value="3">3+ locali</option><option value="4">4+ locali</option></select>
    {!compact && <input name="maxPrice" type="number" className="field" placeholder="Prezzo massimo" aria-label="Prezzo massimo"/>}
    <button className="btn-primary gap-2" type="submit"><Icon name="search"/> Cerca immobili</button>
  </form>;
}
