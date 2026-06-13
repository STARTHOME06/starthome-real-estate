import Image from "next/image";
import Link from "next/link";
import { formatPrice, Property } from "@/lib/data";
import { Icon } from "./Icons";

export function PropertyCard({ property }: { property: Property }) {
  return <article className="group overflow-hidden bg-white shadow-soft">
    <Link href={`/immobili/${property.slug}`} className="relative block aspect-[4/3] overflow-hidden">
      <Image src={property.image} alt={property.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw"/>
      <span className="absolute left-4 top-4 bg-ink px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white">{property.contract}</span>
      <span className="absolute bottom-4 left-4 bg-white px-4 py-2 text-lg font-bold text-ink">{formatPrice(property)}</span>
    </Link>
    <div className="p-6">
      <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold"><Icon name="pin" className="h-4 w-4"/> {property.city} · {property.zone}</p>
      <h3 className="mb-5 font-serif text-2xl font-semibold"><Link href={`/immobili/${property.slug}`}>{property.title}</Link></h3>
      <div className="flex gap-5 border-t border-ink/10 pt-4 text-xs font-semibold text-ink/60"><span className="flex gap-2"><Icon name="area" className="h-4 w-4"/>{property.sqm} m²</span><span className="flex gap-2"><Icon name="bed" className="h-4 w-4"/>{property.rooms} locali</span><span className="flex gap-2"><Icon name="bath" className="h-4 w-4"/>{property.bathrooms}</span></div>
    </div>
  </article>;
}
