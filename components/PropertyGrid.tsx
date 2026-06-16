"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { properties } from "@/lib/data";
import { PropertyCard } from "./PropertyCard";
import { SearchAlertBox } from "./SearchAlertBox";

export function PropertyGrid({ contract }: { contract: "vendita" | "affitto" }) {
  const params = useSearchParams();
  const [sort, setSort] = useState("recent");
  const filtered = useMemo(() => {
    const city = params.get("city");
    const type = params.get("type");
    const rooms = Number(params.get("rooms") || 0);
    const maxPrice = Number(params.get("maxPrice") || Infinity);
    const list = properties.filter(p => p.contract === contract && (!city || p.city === city) && (!type || p.type === type) && p.rooms >= rooms && p.price <= maxPrice);
    return [...list].sort((a,b) => sort === "priceAsc" ? a.price-b.price : sort === "priceDesc" ? b.price-a.price : Number(b.featured)-Number(a.featured));
  }, [contract, params, sort]);
  return <div>
    <div className="mb-8 flex items-center justify-between"><p className="text-sm text-ink/55"><strong className="text-ink">{filtered.length}</strong> immobili trovati</p><select className="field w-auto" value={sort} onChange={e => setSort(e.target.value)} aria-label="Ordina risultati"><option value="recent">Più rilevanti</option><option value="priceAsc">Prezzo crescente</option><option value="priceDesc">Prezzo decrescente</option></select></div>
    {filtered.length ? <><div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{filtered.map(p => <PropertyCard key={p.id} property={p}/>)}</div><div className="mt-14"><SearchAlertBox/></div></> : <SearchAlertBox/>}
  </div>;
}
