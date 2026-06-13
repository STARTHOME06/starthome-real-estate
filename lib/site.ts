export const site = {
  name: "STARTHOME REAL ESTATE",
  shortName: "STARTHOME",
  phoneDisplay: "351 476 9272",
  phoneHref: "+393514769272",
  whatsappNumber: "393514769272",
  email: "info@starthome.it",
  address: "Via Pastore 2",
  postalAddress: "Via Pastore 2, 35010 Vigonza (PD)",
  vatNumber: "05768080284",
  hours: {
    weekdays: "Lun–Ven 9:00–12:30 / 15:00–19:00",
    saturday: "Sabato 9:00–13:00; pomeriggio solo su appuntamento",
  },
} as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
