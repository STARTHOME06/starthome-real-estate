import Link from "next/link";
import { Property } from "@/lib/data";
import { Icon } from "./Icons";
import { PropertyFeatureBadges } from "./PropertyFeatures";
import { PropertyImageCarousel } from "./PropertyImageCarousel";

export function PropertyCard({ property }: { property: Property }) {
  return <article className="group overflow-hidden bg-white shadow-soft">
    <PropertyImageCarousel property={property}/>
    <div className="p-6">
      <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold"><Icon name="pin" className="h-4 w-4"/> {property.city} · {property.zone}</p>
      <h3 className="mb-5 font-serif text-2xl font-semibold"><Link href={`/immobili/${property.slug}`}>{property.title}</Link></h3>
      <div className="border-t border-ink/10 pt-4"><PropertyFeatureBadges property={property} compact/></div>
    </div>
  </article>;
}
