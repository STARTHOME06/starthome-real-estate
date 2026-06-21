import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { LeadForm, PropertyAlertForm } from "@/components/Forms";
import { Icon } from "@/components/Icons";
import { MortgageSimulator } from "@/components/MortgageSimulator";
import { PropertyDetailGallery } from "@/components/PropertyDetailGallery";
import { PropertyFeatureBadges } from "@/components/PropertyFeatures";
import { SocialShare } from "@/components/SocialShare";
import { formatPrice, properties } from "@/lib/data";
import { googleMapsEmbedUrl, googleMapsLink } from "@/lib/maps";
import { nearbyServices } from "@/lib/market";
import { site, whatsappUrl } from "@/lib/site";

export function generateStaticParams() { return properties.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const { slug } = await params; const p = properties.find(x => x.slug === slug);
  if (!p) return {};
  const title = `${p.title} a ${p.city}`;
  const description = `${p.type} di ${p.sqm} m² ${p.contract === "vendita" ? "in vendita" : "in affitto"} a ${p.city}. ${p.rooms} locali, classe ${p.energy}.`;
  const canonical = `https://www.starthome.it/immobili/${p.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | STARTHOME REAL ESTATE`,
      description: `${formatPrice(p)} · ${description}`,
      url: canonical,
      siteName: site.name,
      locale: "it_IT",
      type: "website",
      images: [{ url: p.image, alt: p.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | STARTHOME REAL ESTATE`,
      description: `${formatPrice(p)} · ${description}`,
      images: [p.image],
    },
  };
}
export default async function Page({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params; const p = properties.find(x => x.slug === slug); if (!p) notFound();
  return <><section className="bg-sand py-8"><div className="container-site text-xs text-ink/45"><Link href="/">Home</Link> / <Link href={`/immobili-in-${p.contract}`}>{p.contract}</Link> / {p.title}</div></section>
    <section className="pb-20"><PropertyDetailGallery property={p}/>
    <div className="container-site grid gap-12 pt-12 lg:grid-cols-[1fr_380px]">
      <article><p className="eyebrow">{p.id} · {p.city}, {p.zone}</p><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><h1 className="font-serif text-4xl font-semibold sm:text-5xl">{p.title}</h1><p className="shrink-0 text-2xl font-bold">{formatPrice(p)}</p></div>
        <div className="my-9"><PropertyFeatureBadges property={p}/></div>
        <SocialShare url={`https://www.starthome.it/immobili/${p.slug}`} title={`${p.title} a ${p.city} · ${formatPrice(p)}`}/>
        <h2 className="font-serif text-3xl font-semibold">Descrizione</h2><p className="mt-5 max-w-3xl leading-8 text-ink/65">{p.description}</p>
        <div className="mt-10 grid gap-4 border-y border-ink/10 py-8 sm:grid-cols-2"><p><strong>Piano:</strong> {p.floor}</p><p><strong>Tipologia:</strong> {p.type}</p><p><strong>Zona:</strong> {p.zone}</p><p><strong>Classe energetica:</strong> {p.energy}</p><p><strong>Riferimento:</strong> {p.id}</p></div>
        {p.images && p.images.length > 1 && <div className="mt-10"><h2 className="font-serif text-3xl font-semibold">Tutte le foto</h2><p className="mt-2 text-sm text-ink/50">Puoi scorrerle anche dalla galleria principale in alto.</p><div className="mt-5 grid gap-4 sm:grid-cols-2">{p.images.map((image,index)=><div key={`${image}-${index}`} className="relative aspect-[4/3] overflow-hidden bg-mist"><Image src={image} alt={`${p.title}, foto ${index+1}`} fill className="object-cover transition duration-500 hover:scale-105" sizes="(max-width:640px) 100vw, 50vw"/></div>)}</div></div>}
        {p.floorplans && p.floorplans.length > 0 && <div className="mt-10"><div className="flex items-center gap-3"><Icon name="floorplan" className="h-7 w-7 text-gold"/><h2 className="font-serif text-3xl font-semibold">Planimetrie</h2></div><div className="mt-5 grid gap-4 sm:grid-cols-2">{p.floorplans.map((floorplan,index)=><a key={floorplan} href={floorplan} target="_blank" rel="noreferrer" className="group block overflow-hidden border border-ink/10 bg-white p-3"><div className="relative aspect-[4/3] overflow-hidden bg-mist"><Image src={floorplan} alt={`${p.title}, planimetria ${index+1}`} fill className="object-contain transition duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, 50vw"/></div><span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-ink group-hover:text-gold"><Icon name="floorplan" className="h-4 w-4"/> Apri planimetria {index+1}</span></a>)}</div></div>}
        <div className="mt-10">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-3xl font-semibold">Posizione</h2>
              <p className="mt-2 text-sm text-ink/55">{p.address ? `${p.address}, ` : ""}{p.city}</p>
            </div>
            <a className="btn-outline gap-2" href={googleMapsLink(p)} target="_blank" rel="noreferrer">
              <Icon name="pin" className="h-4 w-4"/> Apri su Google Maps
            </a>
          </div>
          <div className="overflow-hidden bg-mist"><iframe title={`Mappa ${p.city}`} className="h-80 w-full border-0 grayscale" loading="lazy" src={googleMapsEmbedUrl(p)}/></div>
        </div>
        <div className="mt-10 bg-sand p-7 sm:p-9">
          <p className="eyebrow">Servizi vicini</p>
          <h2 className="font-serif text-3xl font-semibold">Cosa valutare nella zona</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">{nearbyServices(p.city, p.zone).map((service)=><p key={service} className="flex gap-3 text-sm leading-7 text-ink/65"><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-white"><Icon name="check" className="h-3.5 w-3.5"/></span>{service}</p>)}</div>
          <p className="mt-5 text-xs leading-5 text-ink/45">Le informazioni sono indicative: durante la visita ti aiutiamo a leggere collegamenti, servizi e caratteristiche della microzona.</p>
        </div>
      </article>
      <aside><div className="sticky top-32"><div className="border border-ink/10 bg-white p-7 shadow-soft"><h2 className="font-serif text-3xl font-semibold">Vuoi visitarlo?</h2><p className="mb-6 mt-2 text-sm text-ink/55">Lascia i tuoi recapiti. Ti richiamiamo per concordare giorno e orario.</p><LeadForm type="visit" property={`${p.id} - ${p.title}`}/><div className="mt-4 grid grid-cols-2 gap-3"><a className="btn-outline gap-2 px-3" href={`tel:${site.phoneHref}`}><Icon name="phone"/> Chiama</a><a className="btn-dark px-3" target="_blank" rel="noreferrer" href={whatsappUrl(`Buongiorno STARTHOME REAL ESTATE, vorrei informazioni sull'immobile ${p.id}.`)}>WhatsApp</a></div></div><div className="mt-6 border border-gold/30 bg-sand p-6"><h2 className="font-serif text-2xl font-semibold">Vuoi immobili simili?</h2><p className="mb-5 mt-2 text-sm leading-6 text-ink/55">Ti avvisiamo quando arriva una soluzione coerente con questa.</p><PropertyAlertForm property={`${p.id} - ${p.title}`}/></div>{p.contract === "vendita" && <MortgageSimulator price={p.price}/>}</div></aside>
    </div></section><CTA/></>;
}
