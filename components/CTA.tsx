import Link from "next/link";
import { Icon } from "./Icons";

export function CTA({ title = "Vuoi conoscere il valore della tua casa?", text = "Ricevi una prima valutazione gratuita, basata su dati reali e conoscenza diretta del territorio.", button = "Richiedi una valutazione gratuita", href = "/valutazione" }) {
  return <section className="bg-ink py-16 text-white"><div className="container-site flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"><div><p className="eyebrow">Il primo passo, senza impegno</p><h2 className="font-serif text-4xl font-semibold">{title}</h2><p className="mt-3 max-w-2xl text-white/60">{text}</p></div><Link className="btn-primary shrink-0 gap-3" href={href}>{button}<Icon name="arrow"/></Link></div></section>;
}
