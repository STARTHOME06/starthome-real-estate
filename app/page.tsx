import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icons";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchPanel } from "@/components/SearchPanel";
import { blogPosts } from "@/lib/blog";
import { cities, properties } from "@/lib/data";

const services = [
  ["Valutazione accurata", "Analisi comparativa, dati di mercato e conoscenza locale per definire il giusto posizionamento."],
  ["Vendita strategica", "Presentazione premium, promozione multicanale e gestione qualificata di ogni potenziale acquirente."],
  ["Ricerca su misura", "Ascoltiamo esigenze reali e selezioniamo solo opportunità coerenti con il tuo progetto."],
];

export default function Home() {
  return <>
    <section className="relative min-h-[720px] overflow-hidden bg-ink text-white">
      <Image src="/images/hero-starthome-v2.webp" alt="Architettura contemporanea italiana al tramonto" fill priority className="object-cover object-[78%_center] sm:object-center" sizes="100vw"/>
      <div className="absolute inset-0 bg-ink/55 sm:bg-gradient-to-r sm:from-ink sm:via-ink/70 sm:to-transparent"/>
      <div className="container-site relative flex min-h-[720px] items-center py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Immobiliare tra Padova e Venezia</p>
          <h1 className="display-title max-w-2xl">La tua casa.<br/><span className="italic text-gold">La nostra passione.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/75">Vendiamo, affittiamo e valorizziamo immobili con competenza locale, cura dei dettagli e una strategia costruita intorno a te.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link className="btn-primary" href="/immobili-in-vendita">Scopri gli immobili</Link><Link className="btn-outline border-white/30 bg-white/5 text-white backdrop-blur" href="/valutazione">Valuta la tua casa</Link></div>
        </div>
      </div>
      <div className="container-site relative -mt-24 translate-y-1/2"><SearchPanel/></div>
    </section>
    <section className="pb-24 pt-44 sm:pt-32">
      <div className="container-site">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Selezionati per te</p><h2 className="section-title">Immobili in evidenza</h2></div><Link className="flex items-center gap-2 text-sm font-bold" href="/immobili-in-vendita">Vedi tutti <Icon name="arrow"/></Link></div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{properties.filter(p => p.featured).map(p => <PropertyCard key={p.id} property={p}/>)}</div>
      </div>
    </section>
    <section className="bg-sand py-24"><div className="container-site grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
      <div><p className="eyebrow">Una scelta importante merita metodo</p><h2 className="section-title">Più valore alla tua casa, più serenità per te.</h2><p className="mt-6 leading-8 text-ink/60">STARTHOME nasce per offrire un modo più attento e trasparente di vivere l’immobiliare. Un unico consulente, un piano chiaro, aggiornamenti costanti.</p><Link href="/chi-siamo" className="btn-dark mt-8">Conosci STARTHOME</Link></div>
      <div className="grid gap-px bg-ink/10 sm:grid-cols-3">{services.map(([title,text], i) => <div key={title} className="bg-white p-7"><span className="font-serif text-5xl text-gold/35">0{i+1}</span><h3 className="mt-8 font-serif text-2xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-7 text-ink/55">{text}</p></div>)}</div>
    </div></section>
    <section className="bg-ink py-20 text-white"><div className="container-site">
      <div className="mb-10 max-w-3xl"><p className="eyebrow">Oltre la compravendita</p><h2 className="section-title">Tutto ciò che serve<br/>per il tuo progetto casa.</h2><p className="mt-5 leading-8 text-white/60">Quando serve, attiviamo una rete selezionata di professionisti esterni e competenze locali.</p></div>
      <div className="grid gap-px bg-white/10 md:grid-cols-2">
        <article className="bg-[#20212d] p-8 sm:p-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-gold">Partner finanziari</p><h3 className="mt-6 font-serif text-3xl font-semibold">Consulenza mutui</h3><p className="mt-4 max-w-xl text-sm leading-7 text-white/60">Facilitiamo il contatto con consulenti del credito e intermediari abilitati esterni, per valutare con chiarezza la sostenibilità e le possibili soluzioni di finanziamento.</p></article>
        <article className="bg-[#20212d] p-8 sm:p-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-gold">Saper fare locale</p><h3 className="mt-6 font-serif text-3xl font-semibold">Arredo casa su misura</h3><p className="mt-4 max-w-xl text-sm leading-7 text-white/60">Collaboriamo con artigiani locali e professionisti del territorio per progettare cucine, arredi e ambienti personalizzati, funzionali e coerenti con la tua casa.</p></article>
      </div>
      <Link href="/servizi" className="btn-primary mt-8">Scopri tutti i servizi</Link>
    </div></section>
    <section className="py-24"><div className="container-site text-center"><p className="eyebrow">Il nostro territorio</p><h2 className="section-title">Conosciamo ogni zona.<br/>Davvero.</h2><p className="mx-auto mt-5 max-w-2xl text-ink/60">Operiamo ogni giorno nei comuni tra Padova, la Riviera del Brenta e il Miranese.</p><div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">{cities.map(c => <span key={c} className="border border-ink/10 px-4 py-3 text-xs font-bold uppercase tracking-wider">{c}</span>)}</div></div></section>
    <section className="bg-sand py-24"><div className="container-site"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Il Blog STARTHOME</p><h2 className="section-title">Le domande che contano<br/>prima di decidere.</h2></div><Link className="flex items-center gap-2 text-sm font-bold" href="/blog">Tutte le risposte <Icon name="arrow"/></Link></div><div className="grid gap-px bg-ink/10 md:grid-cols-2 lg:grid-cols-5">{blogPosts.map((post,i)=><Link href={`/blog/${post.slug}`} key={post.slug} className="group bg-white p-6 transition hover:bg-ink hover:text-white"><span className="text-xs font-bold tracking-widest text-gold">0{i+1}</span><h3 className="mt-5 font-serif text-2xl font-semibold leading-tight">{post.title}</h3><span className="mt-7 inline-block text-xs font-bold uppercase tracking-wider text-ink/45 group-hover:text-white/60">Leggi e chiedi →</span></Link>)}</div></div></section>
    <section className="bg-mist py-24"><div className="container-site"><div className="mx-auto max-w-3xl text-center"><p className="eyebrow">Dicono di noi</p><h2 className="section-title">Relazioni che restano.</h2><blockquote className="mt-10 font-serif text-3xl italic leading-relaxed text-ink/80">“Ci siamo sentiti seguiti con precisione dal primo incontro al rogito. Comunicazione chiara, grande disponibilità e una vendita conclusa nei tempi previsti.”</blockquote><p className="mt-6 text-sm font-bold uppercase tracking-widest">Elena e Marco · Vigonza</p></div></div></section>
    <CTA/>
  </>;
}
