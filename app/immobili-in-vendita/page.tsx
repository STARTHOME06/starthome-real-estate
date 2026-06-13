import { Suspense } from "react";
import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PropertyGrid } from "@/components/PropertyGrid";
import { SearchPanel } from "@/components/SearchPanel";

export const metadata: Metadata = { title: "Immobili e case in vendita", description: "Scopri case, appartamenti, ville e attici in vendita tra Vigonza, Dolo, Pianiga e Padova." };
export default function Page() { return <><section className="bg-sand py-20"><div className="container-site"><p className="eyebrow">Trova il tuo spazio</p><h1 className="display-title">Immobili in vendita</h1><p className="mt-5 max-w-2xl text-ink/60">Una selezione curata di case nel territorio che conosciamo meglio.</p><div className="mt-10"><SearchPanel compact/></div></div></section><section className="py-20"><div className="container-site"><Suspense fallback={<p>Caricamento immobili...</p>}><PropertyGrid contract="vendita"/></Suspense></div></section><CTA title="Non hai trovato la casa giusta?" text="Raccontaci cosa cerchi. Ti avviseremo in anteprima sulle nuove opportunità." button="Parla con un consulente immobiliare" href="/contatti"/></>; }
