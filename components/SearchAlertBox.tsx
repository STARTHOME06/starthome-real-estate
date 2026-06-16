import { BuyerSearchForm } from "./Forms";

export function SearchAlertBox({ title = "Non hai trovato la casa giusta?", text = "Lasciaci i tuoi criteri: ti avvisiamo quando arriva una soluzione coerente, anche se non l'hai vista tra gli annunci." }) {
  return (
    <div className="bg-mist p-7 sm:p-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Alert nuovi immobili</p>
        <h3 className="font-serif text-3xl font-semibold">{title}</h3>
        <p className="mt-3 text-ink/60">{text}</p>
      </div>
      <div className="mx-auto mt-8 max-w-3xl bg-white p-6 shadow-soft sm:p-8">
        <BuyerSearchForm context="Alert ricerca da lista immobili"/>
      </div>
    </div>
  );
}
