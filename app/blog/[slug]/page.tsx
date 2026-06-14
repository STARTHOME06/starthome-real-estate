import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LeadForm } from "@/components/Forms";
import { blogPosts, getBlogPost } from "@/lib/blog";

export function generateStaticParams(){return blogPosts.map(({slug})=>({slug}));}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const post=getBlogPost(slug);
  return post ? {title:post.title,description:post.excerpt} : {};
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const post=getBlogPost(slug);
  if(!post)notFound();
  return <>
    <article className="py-20"><div className="mx-auto max-w-3xl px-5"><Link href="/blog" className="text-xs font-bold uppercase tracking-widest text-gold">← Tutte le domande</Link><h1 className="display-title mt-8">{post.title}</h1><p className="mt-8 text-xl leading-9 text-ink/65">{post.intro}</p><div className="mt-12 space-y-10 leading-8 text-ink/70">{post.sections.map(section=><section key={section.title}><h2 className="font-serif text-3xl font-semibold text-ink">{section.title}</h2><p className="mt-4">{section.text}</p></section>)}</div><p className="mt-12 border-l-2 border-gold pl-6 text-lg italic leading-8 text-ink/70">Ogni situazione è diversa: una risposta utile parte sempre dall’ascolto e dai dati dell’immobile.</p></div></article>
    <section className="bg-sand py-20"><div className="container-site grid gap-12 lg:grid-cols-[1fr_500px] lg:items-start"><div><p className="eyebrow">Confrontiamoci</p><h2 className="section-title">Parliamo del tuo caso.</h2><p className="mt-5 max-w-xl leading-8 text-ink/60">{post.formPrompt}</p><p className="mt-5 text-sm leading-7 text-ink/50">Ti ricontatteremo direttamente. Nessuna risposta automatica e nessun impegno.</p></div><div className="bg-white p-7 shadow-soft sm:p-10"><LeadForm context={`Blog: ${post.title}`} messagePlaceholder={post.formPrompt}/></div></div></section>
  </>;
}
