"use client";

import { useMemo, useState } from "react";

const formatEuro = (value: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

function roundToStep(value: number, step = 5000) {
  return Math.max(step, Math.round(value / step) * step);
}

export function MortgageSimulator({ price }: { price: number }) {
  const amountOptions = useMemo(() => {
    const percentages = [50, 60, 70, 80, 90, 100];
    return percentages.map((percentage) => ({
      label: `${formatEuro(roundToStep(price * (percentage / 100)))} (${percentage}%)`,
      value: roundToStep(price * (percentage / 100)),
    }));
  }, [price]);

  const [amount, setAmount] = useState(amountOptions.at(3)?.value || roundToStep(price * 0.8));
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(3.5);

  const monthlyPayment = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;
    if (!amount || !months) return 0;
    if (!monthlyRate) return amount / months;
    return amount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));
  }, [amount, rate, years]);

  if (!price || price <= 0) return null;

  return (
    <section className="mt-6 border border-gold/30 bg-sand p-6">
      <p className="eyebrow mb-2">Simulazione mutuo</p>
      <h3 className="font-serif text-2xl font-semibold">Stima la rata indicativa</h3>
      <p className="mt-2 text-sm leading-6 text-ink/55">
        Scegli importo, durata e tasso per avere una prima idea. Per una proposta reale ti mettiamo in contatto con partner esterni abilitati.
      </p>

      <div className="mt-5 grid gap-4">
        <div>
          <label className="label" htmlFor="mortgage-amount">Importo da finanziare</label>
          <select id="mortgage-amount" className="field" value={amount} onChange={(event) => setAmount(Number(event.target.value))}>
            {amountOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="mortgage-years">Durata</label>
            <select id="mortgage-years" className="field" value={years} onChange={(event) => setYears(Number(event.target.value))}>
              {[10, 15, 20, 25, 30].map((option) => <option key={option} value={option}>{option} anni</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="mortgage-rate">Tasso indicativo</label>
            <select id="mortgage-rate" className="field" value={rate} onChange={(event) => setRate(Number(event.target.value))}>
              {[2.5, 3, 3.5, 4, 4.5, 5].map((option) => <option key={option} value={option}>{option.toString().replace(".", ",")}%</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-5 bg-white p-5 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-ink/45">Rata mensile indicativa</span>
        <strong className="mt-1 block font-serif text-4xl text-ink">{formatEuro(monthlyPayment)}</strong>
      </div>
      <p className="mt-4 text-xs leading-5 text-ink/45">
        Calcolo puramente informativo, non costituisce offerta di finanziamento. Mutui e consulenze creditizie sono gestiti da partner esterni abilitati.
      </p>
    </section>
  );
}
