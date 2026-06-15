import giProperties from "@/data/gi-properties.json";

export const cities = [
  "Vigonza", "Pianiga", "Dolo", "Campodarsego", "Cadoneghe",
  "Noventa Padovana", "Villanova di Camposampiero", "Noale", "Scorze'",
  "Fiesso d'Artico", "Stra", "Martellago", "Vigonovo", "Saonara", "Borgoricco",
] as const;

export type Property = {
  id: string;
  slug: string;
  title: string;
  city: string;
  zone: string;
  contract: "vendita" | "affitto";
  type: string;
  price: number;
  sqm: number;
  rooms: number;
  bathrooms: number;
  floor: string;
  energy: string;
  image: string;
  images?: string[];
  floorplans?: string[];
  featured?: boolean;
  description: string;
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
  updatedAt?: string;
  source?: "gestionale";
};

const demoProperties: Property[] = [
  {
    id: "SH-101", slug: "appartamento-design-centro-vigonza",
    title: "Appartamento di design in centro", city: "Vigonza", zone: "Centro",
    contract: "vendita", type: "Appartamento", price: 285000, sqm: 118, rooms: 4,
    bathrooms: 2, floor: "2° con ascensore", energy: "A4",
    image: "/images/appartamento-vigonza.webp", featured: true,
    description: "Una casa luminosa e contemporanea, progettata per unire comfort, efficienza e qualità dei materiali. L'ampia zona giorno si apre sulla terrazza abitabile; la zona notte offre tre camere e due bagni.",
  },
  {
    id: "SH-102", slug: "villa-veneta-ristrutturata-dolo",
    title: "Dimora veneta ristrutturata", city: "Dolo", zone: "Arino",
    contract: "vendita", type: "Villa", price: 590000, sqm: 260, rooms: 7,
    bathrooms: 3, floor: "Su 2 livelli", energy: "B",
    image: "/images/casale-dolo.webp", featured: true,
    description: "Il fascino dell'architettura veneta incontra una ristrutturazione accurata. Grandi spazi, giardino riservato e ambienti pensati per una vita familiare elegante e autentica.",
  },
  {
    id: "SH-103", slug: "attico-terrazza-noventa-padovana",
    title: "Attico con terrazza panoramica", city: "Noventa Padovana", zone: "Oltrebrenta",
    contract: "vendita", type: "Attico", price: 445000, sqm: 155, rooms: 5,
    bathrooms: 2, floor: "Ultimo piano", energy: "A3",
    image: "/images/attico-padova.webp", featured: true,
    description: "Spazi aperti, luce e privacy. Un attico recente con zona living affacciata su una terrazza generosa, finiture selezionate e distribuzione interna razionale.",
  },
  {
    id: "SH-104", slug: "trilocale-arredato-pianiga",
    title: "Trilocale arredato con terrazzo", city: "Pianiga", zone: "Mellaredo",
    contract: "affitto", type: "Appartamento", price: 920, sqm: 82, rooms: 3,
    bathrooms: 2, floor: "1° con ascensore", energy: "A2",
    image: "/images/appartamento-vigonza.webp",
    description: "Trilocale recente, completamente arredato, con terrazzo, garage e posto auto. Soluzione efficiente e pronta da abitare.",
  },
  {
    id: "SH-105", slug: "casa-indipendente-campodarsego",
    title: "Casa indipendente con giardino", city: "Campodarsego", zone: "Fiumicello",
    contract: "vendita", type: "Casa indipendente", price: 349000, sqm: 180, rooms: 6,
    bathrooms: 2, floor: "Su 2 livelli", energy: "C",
    image: "/images/casale-dolo.webp",
    description: "Abitazione indipendente dagli spazi generosi, circondata da un giardino curato. Ideale per chi cerca tranquillità e collegamenti comodi.",
  },
  {
    id: "SH-106", slug: "bilocale-moderno-cadoneghe",
    title: "Bilocale moderno e luminoso", city: "Cadoneghe", zone: "Mejaniga",
    contract: "affitto", type: "Appartamento", price: 760, sqm: 58, rooms: 2,
    bathrooms: 1, floor: "3° con ascensore", energy: "B",
    image: "/images/attico-padova.webp",
    description: "Bilocale moderno con ottima esposizione, arredamento completo e posto auto. Perfetto per professionisti.",
  },
];

const syncedProperties = giProperties as Property[];

export const properties: Property[] = syncedProperties.length ? syncedProperties : demoProperties;

export const formatPrice = (property: Property) =>
  property.contract === "affitto"
    ? `${new Intl.NumberFormat("it-IT").format(property.price)} €/mese`
    : `${new Intl.NumberFormat("it-IT").format(property.price)} €`;

export const slugify = (value: string) =>
  value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/'/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const seoServices = [
  { slug: "agenzia-immobiliare", label: "Agenzia immobiliare", intro: "Il tuo riferimento immobiliare locale" },
  { slug: "case-in-vendita", label: "Case in vendita", intro: "Trova la casa giusta, con una guida esperta" },
  { slug: "appartamenti-in-affitto", label: "Appartamenti in affitto", intro: "Affitta con chiarezza e serenità" },
  { slug: "valutazione-casa", label: "Valutazione casa", intro: "Scopri il valore reale del tuo immobile" },
  { slug: "vendere-casa", label: "Vendere casa", intro: "Un metodo preciso per vendere meglio" },
] as const;
