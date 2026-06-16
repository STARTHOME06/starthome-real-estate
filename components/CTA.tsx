import Link from "next/link";
import { Icon } from "./Icons";

export function CTA({ title = "Vuoi vendere o valorizzare casa?", text = "Partiamo da una valutazione gratuita e da un piano concreto: prezzo, tempi, marketing e strategia di trattativa.", button = "Richiedi una valutazione gratuita", href = "/valutazione" }) {
  return <section className="bg-ink py-16 text-white"><div className="container-site flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"><div><p className="eyebrow">Muoviti con metodo</p><h2 className="font-serif text-4xl font-semibold">{title}</h2><p className="mt-3 max-w-2xl text-white/60">{text}</p></div><div className="flex flex-wrap gap-3"><Link className="btn-primary shrink-0 gap-3" href={href}>{button}<Icon name="arrow"/></Link><Link className="btn-outline border-white/20 bg-white/5 text-white" href="/contatti">Parla con un consulente</Link></div></div></section>;
}
