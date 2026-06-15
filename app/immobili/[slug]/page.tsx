import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { LeadForm } from "@/components/Forms";
import { Icon } from "@/components/Icons";
import { formatPrice, properties } from "@/lib/data";
import { site, whatsappUrl } from "@/lib/site";

export function generateStaticParams() { return properties.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params; const p = properties.find(x => x.slug === slug);
  return p ? { title: `${p.title} a ${p.city}`, description: `${p.type} di ${p.sqm} m² ${p.contract === "vendita" ? "in vendita" : "in affitto"} a ${p.city}. ${p.rooms} locali, classe ${p.energy}.` } : {};
}
export default async function Page({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params; const p = properties.find(x => x.slug === slug); if (!p) notFound();
  return <><section className="bg-sand py-8"><div className="container-site text-xs text-ink/45"><Link href="/">Home</Link> / <Link href={`/immobili-in-${p.contract}`}>{p.contract}</Link> / {p.title}</div></section>
    <section className="pb-20"><div className="relative h-[45vh] min-h-[420px] lg:h-[65vh]"><Image src={p.image} alt={p.title} fill priority className="object-cover" sizes="100vw"/></div>
    <div className="container-site grid gap-12 pt-12 lg:grid-cols-[1fr_380px]">
      <article><p className="eyebrow">{p.id} · {p.city}, {p.zone}</p><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><h1 className="font-serif text-4xl font-semibold sm:text-5xl">{p.title}</h1><p className="shrink-0 text-2xl font-bold">{formatPrice(p)}</p></div>
        <div className="my-9 grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-4">{[[p.sqm+" m²","Superficie"],[p.rooms,"Locali"],[p.bathrooms,"Bagni"],[p.energy,"Classe energetica"]].map(([v,l]) => <div key={l} className="bg-white py-5"><strong className="block text-xl">{v}</strong><span className="text-xs text-ink/45">{l}</span></div>)}</div>
        <h2 className="font-serif text-3xl font-semibold">Descrizione</h2><p className="mt-5 max-w-3xl leading-8 text-ink/65">{p.description}</p>
        <div className="mt-10 grid gap-4 border-y border-ink/10 py-8 sm:grid-cols-2"><p><strong>Piano:</strong> {p.floor}</p><p><strong>Tipologia:</strong> {p.type}</p><p><strong>Zona:</strong> {p.zone}</p><p><strong>Riferimento:</strong> {p.id}</p></div>
        {p.images && p.images.length > 1 && <div className="mt-10"><h2 className="font-serif text-3xl font-semibold">Galleria</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{p.images.slice(1,7).map((image,index)=><div key={image} className="relative aspect-[4/3] overflow-hidden bg-mist"><Image src={image} alt={`${p.title}, foto ${index+2}`} fill className="object-cover" sizes="(max-width:640px) 100vw, 50vw"/></div>)}</div></div>}
        <div className="mt-10 overflow-hidden bg-mist"><iframe title={`Mappa ${p.city}`} className="h-80 w-full border-0 grayscale" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent((p.address ? p.address+", " : "")+p.city+", Veneto")}&output=embed`}/></div>
      </article>
      <aside><div className="sticky top-32 border border-ink/10 bg-white p-7 shadow-soft"><h2 className="font-serif text-3xl font-semibold">Vuoi visitarlo?</h2><p className="mb-6 mt-2 text-sm text-ink/55">Lascia i tuoi recapiti. Ti richiamiamo per concordare giorno e orario.</p><LeadForm type="visit" property={`${p.id} - ${p.title}`}/><div className="mt-4 grid grid-cols-2 gap-3"><a className="btn-outline gap-2 px-3" href={`tel:${site.phoneHref}`}><Icon name="phone"/> Chiama</a><a className="btn-dark px-3" target="_blank" rel="noreferrer" href={whatsappUrl(`Buongiorno STARTHOME REAL ESTATE, vorrei informazioni sull'immobile ${p.id}.`)}>WhatsApp</a></div></div></aside>
    </div></section><CTA/></>;
}
