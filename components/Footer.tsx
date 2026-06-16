import Image from "next/image";
import Link from "next/link";
import { cities, slugify } from "@/lib/data";
import { site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return <footer className="bg-ink text-white">
    <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <Image src="/images/starthome-real-estate-logo.webp" width={680} height={655} alt="STARTHOME REAL ESTATE" className="mb-5 h-auto w-44"/>
        <p className="text-sm leading-7 text-white/60">Persone, case, territorio. Consulenza immobiliare indipendente tra Padova e la Riviera del Brenta.</p>
      </div>
      <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-gold">Contatti</h3>
        <p className="text-sm leading-7 text-white/65">{site.postalAddress}<br/><a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a><br/><a href={whatsappUrl("Buongiorno STARTHOME REAL ESTATE, vorrei ricevere informazioni.")} target="_blank" rel="noreferrer">Scrivici su WhatsApp</a><br/><a href={`mailto:${site.email}`}>{site.email}</a><br/>P.IVA {site.vatNumber}</p>
      </div>
      <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-gold">Esplora</h3>
        <div className="grid gap-3 text-sm text-white/65"><Link href="/immobili-in-vendita">Immobili in vendita</Link><Link href="/immobili-in-affitto">Immobili in affitto</Link><Link href="/vendere-casa">Vendere casa</Link><Link href="/valutazione">Valutazione gratuita</Link><Link href="/prezzi-case/vigonza">Prezzi case nelle zone</Link><Link href="/lavora-con-noi">Lavora con noi</Link><Link href="/servizi">I nostri servizi</Link></div>
      </div>
      <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-gold">Zone principali</h3>
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-white/55">{cities.slice(0,8).map(city => <Link key={city} href={`/agenzia-immobiliare/${slugify(city)}`}>{city}</Link>)}</div>
      </div>
    </div>
    <div className="border-t border-white/10"><div className="container-site flex flex-col gap-3 py-6 text-xs text-white/40 sm:flex-row sm:justify-between"><p>© 2026 {site.name}. P.IVA {site.vatNumber}. Tutti i diritti riservati.</p><p><Link href="/privacy">Privacy policy</Link> · Cookie policy · Instagram · Facebook</p></div></div>
  </footer>;
}
