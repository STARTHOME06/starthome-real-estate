"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { Icon } from "./Icons";

const nav = [
  ["Vendita", "/immobili-in-vendita"], ["Affitto", "/immobili-in-affitto"],
  ["Valuta casa", "/valutazione"], ["Servizi", "/servizi"],
  ["Chi siamo", "/chi-siamo"], ["Guide", "/blog"], ["Contatti", "/contatti"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-white/10 bg-ink text-white shadow-lg">
    <div className="container-site flex h-24 items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
        <Image src="/images/starthome-mark.webp" width={680} height={485} alt="" priority className="h-[58px] w-[82px] object-cover object-center mix-blend-screen sm:h-[66px] sm:w-[92px]"/>
        <span>
          <strong className="block text-sm tracking-[.15em] sm:text-base">{site.shortName}</strong>
          <small className="block text-[8px] uppercase tracking-[.32em] text-gold sm:text-[9px]">Real Estate</small>
        </span>
      </Link>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigazione principale">
        {nav.map(([label, href]) => <Link key={href} href={href} className="text-xs font-semibold uppercase tracking-wider text-white/75 transition hover:text-gold">{label}</Link>)}
      </nav>
      <a href={`tel:${site.phoneHref}`} className="hidden items-center gap-2 text-sm font-bold xl:flex"><Icon name="phone" /> {site.phoneDisplay}</a>
      <button onClick={() => setOpen(!open)} className="p-2 lg:hidden" aria-label="Apri menu"><Icon name={open ? "close" : "menu"} /></button>
    </div>
    {open && <nav className="container-site grid gap-1 border-t border-white/10 py-4 lg:hidden">
      {nav.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="py-3 text-sm font-semibold text-white/85">{label}</Link>)}
    </nav>}
  </header>;
}
