import { cities } from "./data";

export const soldCases = [
  {
    title: "Quadrilocale valorizzato a Vigonza",
    zone: "Vigonza centro",
    result: "Contatti selezionati in pochi giorni",
    method: "Prezzo corretto, servizio fotografico, annuncio premium e gestione visite su appuntamento.",
  },
  {
    title: "Casa indipendente in Riviera del Brenta",
    zone: "Dolo / Fiesso d'Artico",
    result: "Trattativa guidata fino al rogito",
    method: "Verifica documentale preventiva, presentazione degli spazi esterni e negoziazione ordinata.",
  },
  {
    title: "Appartamento recente nel Miranese",
    zone: "Noale / Scorze'",
    result: "Richieste qualificate da database e portali",
    method: "Target acquirenti definito, contenuti chiari e follow-up puntuale dopo ogni visita.",
  },
];

export const marketAreas = cities.map((city) => ({
  city,
  tone: city === "Vigonza" ? "domanda costante per appartamenti recenti e soluzioni familiari" : "interesse variabile in base a servizi, collegamenti e stato dell'immobile",
}));

export function nearbyServices(city: string, zone?: string) {
  const area = [zone, city].filter(Boolean).join(" ");
  return [
    `Scuole e servizi principali nell'area ${area}`,
    "Supermercati, negozi e attività quotidiane raggiungibili in zona",
    "Collegamenti verso Padova, Riviera del Brenta e comuni limitrofi",
    "Farmacie, verde e servizi di quartiere da verificare in visita",
  ];
}
