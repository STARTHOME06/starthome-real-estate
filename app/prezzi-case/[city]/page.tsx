import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { LeadForm } from "@/components/Forms";
import { PropertyCard } from "@/components/PropertyCard";
import { cities, properties, slugify } from "@/lib/data";
import { marketAreas } from "@/lib/market";

export function generateStaticParams() {
  return cities.map((city) => ({ city: slugify(city) }));
}

function resolveCity(slug: string) {
  return cities.find((city) => slugify(city) === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = resolveCity(citySlug);
  if (!city) return {};
  return {
    title: `Prezzi case a ${city}`,
    description: `Quanto valgono le case a ${city}? Richiedi una valutazione STARTHOME basata su zona, stato, metratura e domanda reale.`,
  };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = resolveCity(citySlug);
  if (!city) notFound();
  const market = marketAreas.find((area) => area.city === city);
  const localProperties = properties.filter((property) => property.city === city).slice(0, 3);

  return (
    <>
      <section className="bg-sand py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_440px] lg:items-start">
          <div>
            <p className="eyebrow">Prezzi case nelle zone</p>
            <h1 className="display-title">Quanto vale una casa<br/><span className="italic text-gold">a {city}?</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/60">Il valore non dipende solo dai metri quadri. Contano microzona, stato, piano, efficienza, spazi esterni, garage, domanda attiva e immobili comparabili realmente vendibili.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Stato e finiture", "Servizi e collegamenti", "Domanda reale", "Documentazione e tempi"].map((item) => <p key={item} className="bg-white p-5 font-semibold shadow-soft">{item}</p>)}
            </div>
            <p className="mt-7 text-sm leading-7 text-ink/55">A {city} osserviamo {market?.tone}. Per una stima utile serve leggere il tuo immobile nel dettaglio, non applicare una media generica.</p>
          </div>
          <div className="bg-white p-7 shadow-soft sm:p-9">
            <h2 className="font-serif text-3xl font-semibold">Richiedi il prezzo corretto</h2>
            <p className="mb-6 mt-2 text-sm text-ink/55">Ti aiutiamo a capire il range realistico e la strategia migliore prima di pubblicare.</p>
            <LeadForm type="valuation" context={`Prezzi case ${city}`} messagePlaceholder={`Vorrei capire il valore del mio immobile a ${city}.`}/>
          </div>
        </div>
      </section>
      {localProperties.length > 0 && <section className="py-20"><div className="container-site"><div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow">Mercato locale</p><h2 className="section-title">Immobili disponibili a {city}</h2></div><Link href="/immobili-in-vendita" className="text-sm font-bold text-gold">Vedi tutti gli immobili</Link></div><div className="grid gap-7 md:grid-cols-3">{localProperties.map((property) => <PropertyCard key={property.id} property={property}/>)}</div></div></section>}
      <CTA title={`Vuoi vendere casa a ${city}?`} text="Partiamo da una valutazione gratuita e da una strategia chiara per posizionare l’immobile nel modo giusto." href="/valutazione"/>
    </>
  );
}
