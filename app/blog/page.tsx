import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/Forms";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Domande immobiliari", description: "Risposte chiare alle domande più frequenti su valutazione, vendita e acquisto casa." };

export default function Page() {
  return <>
    <section className="bg-sand py-20"><div className="container-site"><p className="eyebrow">Il Blog STARTHOME</p><h1 className="display-title">Le tue domande.<br/><span className="italic text-gold">Risposte concrete.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-ink/60">Partiamo dai dubbi reali di chi vende e compra casa. Leggi le risposte oppure raccontaci direttamente la tua situazione.</p></div></section>
    <section className="py-20"><div className="container-site grid gap-7 md:grid-cols-2 lg:grid-cols-3">{blogPosts.map((post,i)=><article key={post.slug} className="flex flex-col border border-ink/10 p-8"><p className="text-xs font-bold uppercase tracking-widest text-gold">Domanda {String(i+1).padStart(2,"0")}</p><h2 className="mt-6 font-serif text-3xl font-semibold">{post.title}</h2><p className="mt-4 flex-1 text-sm leading-7 text-ink/55">{post.excerpt}</p><Link className="mt-8 inline-block text-sm font-bold" href={`/blog/${post.slug}`}>Leggi la risposta →</Link></article>)}</div></section>
    <section className="bg-ink py-20 text-white"><div className="container-site grid gap-12 lg:grid-cols-[1fr_500px] lg:items-start"><div><p className="eyebrow">Parliamo della tua situazione</p><h2 className="section-title">Hai una domanda diversa?</h2><p className="mt-5 max-w-xl leading-8 text-white/65">Scrivila qui. Lasciaci i tuoi recapiti e un consulente STARTHOME ti risponderà con un primo orientamento concreto.</p></div><div className="bg-white p-7 text-ink shadow-soft sm:p-10"><LeadForm context="Domanda inviata dalla pagina Blog" messagePlaceholder="Qual è il tuo dubbio o progetto immobiliare?"/></div></div></section>
  </>;
}
