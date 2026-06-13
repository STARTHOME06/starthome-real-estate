import { Suspense } from "react";
import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PropertyGrid } from "@/components/PropertyGrid";
import { SearchPanel } from "@/components/SearchPanel";

export const metadata: Metadata = { title: "Appartamenti e case in affitto", description: "Trova appartamenti e case in affitto a Vigonza, Pianiga, Dolo e nei comuni vicini." };
export default function Page() { return <><section className="bg-sand py-20"><div className="container-site"><p className="eyebrow">La prossima casa ti aspetta</p><h1 className="display-title">Immobili in affitto</h1><p className="mt-5 max-w-2xl text-ink/60">Soluzioni selezionate, contratti chiari e assistenza in ogni passaggio.</p><div className="mt-10"><SearchPanel compact/></div></div></section><section className="py-20"><div className="container-site"><Suspense fallback={<p>Caricamento immobili...</p>}><PropertyGrid contract="affitto"/></Suspense></div></section><CTA title="Cerchi un immobile in affitto?" text="Lasciaci i tuoi criteri: ti contatteremo quando arriva la soluzione giusta." button="Parla con un consulente immobiliare" href="/contatti"/></>; }
