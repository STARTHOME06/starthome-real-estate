import type { Metadata } from "next";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = { title: "Servizi immobiliari", description: "Vendita, locazione, valutazione, accesso a consulenza mutui tramite partner esterni e arredo casa su misura con artigiani locali." };
const items = [
  ["Vendere casa","Valutazione, home staging, servizio fotografico, promozione mirata, selezione acquirenti e assistenza fino al rogito."],
  ["Affittare casa","Analisi del canone, presentazione, verifica affidabilità, contratto e gestione degli adempimenti."],
  ["Comprare casa","Ricerca, visite organizzate, verifica documentale, negoziazione e coordinamento tecnico-finanziario."],
  ["Valutazione immobiliare","Una stima motivata da dati comparabili, domanda locale e caratteristiche specifiche dell’immobile."],
  ["Consulenza documentale","Controlli catastali e urbanistici con professionisti qualificati, per arrivare preparati alla firma."],
  ["Marketing immobiliare","Immagini professionali, testi, portali, social e database proprietario per dare all’immobile la visibilità corretta."],
  ["Mutui tramite partner esterni","Ti mettiamo in contatto con consulenti del credito e intermediari abilitati esterni, per valutare soluzioni di finanziamento coerenti con il tuo progetto e il tuo profilo."],
  ["Arredo casa su misura","Dalla cucina agli ambienti completi, selezioniamo artigiani locali e professionisti del territorio per creare soluzioni personalizzate, funzionali e curate nei dettagli."],
];
export default function Page(){ return <><section className="bg-sand py-20"><div className="container-site"><p className="eyebrow">Competenza in ogni passaggio</p><h1 className="display-title">Servizi immobiliari<br/>costruiti intorno a te.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-ink/60">Dalla ricerca dell’immobile fino al momento in cui diventa davvero casa, coordiniamo competenze selezionate e relazioni di fiducia sul territorio.</p></div></section><section className="py-20"><div className="container-site grid gap-px bg-ink/10 md:grid-cols-2 lg:grid-cols-3">{items.map(([t,d],i)=><article key={t} className="bg-white p-8 sm:p-10"><span className="font-serif text-5xl text-gold/35">{String(i+1).padStart(2,"0")}</span><h2 className="mt-8 font-serif text-3xl font-semibold">{t}</h2><p className="mt-4 text-sm leading-7 text-ink/60">{d}</p></article>)}</div><p className="container-site mt-8 text-xs leading-6 text-ink/45">I servizi finanziari sono erogati esclusivamente da soggetti esterni abilitati. STARTHOME REAL ESTATE facilita il contatto e non svolge attività di mediazione creditizia.</p></section><CTA title="Hai un progetto casa da realizzare?" text="Parla con un consulente: coordineremo il percorso immobiliare e ti presenteremo i professionisti più adatti alle tue esigenze." button="Parla con un consulente immobiliare" href="/contatti"/></>; }
