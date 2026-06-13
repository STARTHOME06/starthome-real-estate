import Link from "next/link";
export default function NotFound(){return <section className="grid min-h-[60vh] place-items-center px-5 text-center"><div><p className="eyebrow">Errore 404</p><h1 className="display-title">Pagina non trovata</h1><Link href="/" className="btn-dark mt-8">Torna alla home</Link></div></section>;}
