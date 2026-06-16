import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { LeadForm } from "@/components/Forms";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Vendere casa con STARTHOME",
  description: "Metodo STARTHOME per vendere casa: valutazione, strategia, marketing premium, selezione acquirenti e trattativa guidata.",
};

const steps = [
  ["Analisi del valore", "Partiamo da dati reali, immobili comparabili e conoscenza della microzona. Il prezzo deve generare interesse senza svendere."],
  ["Strategia di lancio", "Definiamo target, punti di forza, tempi e canali. Ogni casa ha un pubblico: il nostro lavoro è raggiungerlo nel modo giusto."],
  ["Presentazione premium", "Foto, testi, planimetrie, scheda chiara e racconto dell’immobile. La prima impressione decide la qualità dei contatti."],
  ["Gestione dei contatti", "Filtriamo richieste, organizziamo visite e raccogliamo feedback. Meno curiosi, più persone realmente interessate."],
  ["Trattativa e firma", "Ti affianchiamo nella negoziazione, nella documentazione e nei passaggi fino al rogito, con comunicazione chiara."],
];

const reasons = [
  "Conoscenza locale tra Vigonza, Riviera del Brenta, Padova e Miranese",
  "Annunci collegati al gestionale, foto, dati tecnici e planimetrie quando disponibili",
  "Database clienti e contatti qualificati",
  "Approccio diretto, elegante e orientato al risultato",
];

export default function Page() {
  return (
    <>
      <section className="bg-ink py-20 text-white">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_460px] lg:items-center">
          <div>
            <p className="eyebrow">Metodo vendita STARTHOME</p>
            <h1 className="display-title">Vendere casa bene<br/><span className="italic text-gold">non è questione di fortuna.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">Serve una valutazione credibile, una presentazione forte, contatti selezionati e una trattativa gestita con lucidità. STARTHOME costruisce tutto questo intorno al tuo immobile.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="btn-primary" href="/valutazione">Richiedi una valutazione gratuita</Link>
              <Link className="btn-outline border-white/25 bg-white/5 text-white" href="/contatti">Parla con un consulente</Link>
            </div>
          </div>
          <div className="border border-white/10 bg-white/5 p-7 backdrop-blur sm:p-9">
            <h2 className="font-serif text-3xl font-semibold">Vuoi capire se è il momento giusto?</h2>
            <p className="mb-6 mt-3 text-sm leading-7 text-white/60">Lasciaci i dati principali: ti ricontattiamo con una prima lettura del mercato e dei prossimi passi.</p>
            <LeadForm type="valuation" context="Pagina vendere casa" messagePlaceholder="Comune, superficie, stato dell'immobile e tempi desiderati per vendere..."/>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="eyebrow">Il nostro metodo</p>
            <h2 className="section-title">Una vendita si prepara prima di andare online.</h2>
            <p className="mt-6 leading-8 text-ink/60">Il mercato premia gli immobili presentati bene, prezzati con intelligenza e seguiti con continuità. Per questo lavoriamo per fasi: ogni passaggio ha uno scopo preciso.</p>
          </div>
          <div className="grid gap-px bg-ink/10 md:grid-cols-2">
            {steps.map(([title, text], index) => (
              <article key={title} className="bg-white p-8">
                <span className="font-serif text-5xl text-gold/35">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-7 font-serif text-3xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Perché sceglierci</p>
            <h2 className="section-title">Ambizione alta, piedi nel territorio.</h2>
            <p className="mt-6 leading-8 text-ink/60">Vogliamo essere il riferimento immobiliare per chi cerca un servizio serio, moderno e umano. Non promettiamo scorciatoie: promettiamo presenza, metodo e cura del risultato.</p>
          </div>
          <div className="grid gap-4">
            {reasons.map((reason) => (
              <p key={reason} className="flex gap-3 bg-white p-5 font-semibold shadow-soft">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-white"><Icon name="check" className="h-4 w-4"/></span>
                {reason}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Vuoi vendere casa con una strategia chiara?" text="Richiedi una valutazione gratuita: ti diremo come posizionare l’immobile, quali leve usare e quali passi fare prima di pubblicarlo." button="Richiedi una valutazione gratuita" href="/valutazione"/>
    </>
  );
}
