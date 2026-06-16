import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { CareerForm } from "@/components/Forms";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Lavora con noi",
  description: "Candidati per entrare nel team STARTHOME REAL ESTATE: agenti immobiliari, consulenti, profili commerciali e figure junior.",
};

const profiles = [
  ["Agenti immobiliari", "Professionisti già attivi o in crescita, orientati ad acquisizione, vendita e relazione con il cliente."],
  ["Consulenti junior", "Persone ambiziose da formare sul territorio, con attitudine commerciale e voglia di costruire competenze solide."],
  ["Acquisitori", "Figure capaci di creare relazioni, leggere le opportunità e sviluppare incarichi in modo etico e organizzato."],
  ["Back office commerciale", "Profili precisi, ordinati e comunicativi per coordinare agenda, contatti, documenti e attività marketing."],
];

const values = [
  "Metodo, formazione e affiancamento operativo",
  "Brand moderno, premium e riconoscibile",
  "Strumenti digitali, gestionale e sito sincronizzato",
  "Territorio ad alto potenziale tra Padova, Riviera del Brenta e Miranese",
  "Ambiente ambizioso, diretto e orientato alla crescita",
];

export default function Page() {
  return (
    <>
      <section className="bg-ink py-20 text-white">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_470px] lg:items-center">
          <div>
            <p className="eyebrow">Lavora con noi</p>
            <h1 className="display-title">Cerchiamo persone<br/><span className="italic text-gold">che vogliono crescere davvero.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">STARTHOME REAL ESTATE sta costruendo una squadra giovane, preparata e ambiziosa. Cerchiamo nuove figure e agenti da inserire nell’organico per sviluppare il territorio con metodo, eleganza e risultati.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="btn-primary" href="#candidatura">Invia candidatura</a>
              <Link className="btn-outline border-white/25 bg-white/5 text-white" href="/chi-siamo">Conosci STARTHOME</Link>
            </div>
          </div>
          <div className="border border-white/10 bg-white/5 p-7 backdrop-blur sm:p-9">
            <p className="eyebrow">Perché ora</p>
            <h2 className="font-serif text-3xl font-semibold">Stiamo crescendo.</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">Il sito, il gestionale, gli strumenti e il posizionamento sono pronti. Ora vogliamo inserire persone giuste: serie, motivate, attente alla relazione e capaci di rappresentare il brand sul territorio.</p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-site">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow">Figure ricercate</p>
            <h2 className="section-title">Non cerchiamo numeri.<br/>Cerchiamo persone da far crescere.</h2>
          </div>
          <div className="grid gap-px bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
            {profiles.map(([title, text], index) => (
              <article key={title} className="bg-white p-8">
                <span className="font-serif text-5xl text-gold/35">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 font-serif text-3xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="eyebrow">Cosa offriamo</p>
            <h2 className="section-title">Un progetto serio,<br/>non una promessa vuota.</h2>
            <p className="mt-6 leading-8 text-ink/60">Entrare in STARTHOME significa lavorare dentro un’identità chiara: comunicazione premium, strumenti digitali, attenzione al cliente e una visione di crescita concreta sul territorio.</p>
          </div>
          <div className="grid gap-4">
            {values.map((value) => (
              <p key={value} className="flex gap-3 bg-white p-5 font-semibold shadow-soft">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-white"><Icon name="check" className="h-4 w-4"/></span>
                {value}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="candidatura" className="py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div>
            <p className="eyebrow">Candidatura</p>
            <h2 className="section-title">Raccontaci chi sei.</h2>
            <p className="mt-6 leading-8 text-ink/60">Non serve essere perfetti. Serve essere seri, curiosi, costanti e pronti a imparare. Se hai già esperienza, vogliamo capire dove puoi fare la differenza. Se parti da zero, vogliamo capire quanto vuoi crescere.</p>
          </div>
          <div className="bg-sand p-7 shadow-soft sm:p-10">
            <h3 className="font-serif text-3xl font-semibold">Invia la candidatura</h3>
            <p className="mb-7 mt-2 text-sm text-ink/55">Ti ricontatteremo se il profilo è coerente con il percorso di inserimento.</p>
            <CareerForm/>
          </div>
        </div>
      </section>

      <CTA title="Conosci qualcuno adatto a STARTHOME?" text="Condividi questa pagina con chi ha ambizione, talento commerciale e voglia di crescere nel settore immobiliare." button="Invia candidatura" href="/lavora-con-noi#candidatura"/>
    </>
  );
}
