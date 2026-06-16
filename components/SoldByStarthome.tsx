import { soldCases } from "@/lib/market";

export function SoldByStarthome() {
  return (
    <section className="bg-mist py-24">
      <div className="container-site">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Venduta da STARTHOME</p>
            <h2 className="section-title">Risultati costruiti<br/>con metodo.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-ink/55">Esempi rappresentativi del nostro modo di lavorare: valorizzare, selezionare, accompagnare. Ogni incarico ha una strategia dedicata.</p>
        </div>
        <div className="grid gap-px bg-ink/10 md:grid-cols-3">
          {soldCases.map((item, index) => (
            <article key={item.title} className="bg-white p-8">
              <span className="font-serif text-5xl text-gold/35">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-8 text-xs font-bold uppercase tracking-widest text-gold">{item.zone}</p>
              <h3 className="mt-4 font-serif text-3xl font-semibold">{item.title}</h3>
              <p className="mt-4 font-bold text-ink">{item.result}</p>
              <p className="mt-4 text-sm leading-7 text-ink/60">{item.method}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
