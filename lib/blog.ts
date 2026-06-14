export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  intro: string;
  sections: { title: string; text: string }[];
  formPrompt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "quanto-vale-casa-oggi",
    title: "Quanto vale davvero la mia casa oggi?",
    excerpt: "Una stima attendibile nasce dai dati, dalla microzona e dalle caratteristiche che rendono unico l’immobile.",
    intro: "Il prezzo visto online è solo un punto di partenza. Per capire il valore reale servono immobili comparabili, domanda attiva, stato della casa e conoscenza diretta della zona.",
    sections: [
      { title: "Non basta il prezzo al metro quadro", text: "Due case nella stessa via possono avere valori diversi per piano, esposizione, efficienza energetica, spazi esterni, distribuzione e qualità della ristrutturazione. La valutazione deve leggere questi elementi insieme." },
      { title: "Prezzo corretto significa più opportunità", text: "Un prezzo fuori mercato può ridurre le richieste e allungare i tempi. STARTHOME costruisce una fascia di valore motivata, confrontando dati recenti e interesse reale degli acquirenti nel territorio." },
    ],
    formPrompt: "Descrivici la tua casa e il comune: ti daremo un primo orientamento senza impegno.",
  },
  {
    slug: "momento-giusto-per-vendere",
    title: "È questo il momento giusto per vendere casa?",
    excerpt: "La risposta dipende dal mercato, ma soprattutto dai tuoi obiettivi, dai tempi e dal progetto successivo.",
    intro: "Non esiste un mese perfetto per tutti. Il momento giusto nasce dall’incontro tra domanda locale, condizioni dell’immobile e priorità personali.",
    sections: [
      { title: "Partiamo dal tuo obiettivo", text: "Vendere per acquistare un’altra casa, trasferirsi, dividere un patrimonio o liberare liquidità richiede strategie e tempi differenti. Prima del prezzo viene la pianificazione." },
      { title: "Leggere la domanda locale", text: "Monitoriamo quali tipologie vengono cercate, quanto restano sul mercato e quali fasce di prezzo generano visite concrete tra Padova, Riviera del Brenta e Miranese." },
    ],
    formPrompt: "Raccontaci perché stai pensando di vendere e quali tempi immagini.",
  },
  {
    slug: "documenti-per-vendere-casa",
    title: "Quali documenti servono per vendere casa?",
    excerpt: "Preparare la documentazione prima delle visite evita ritardi, dubbi e problemi durante la trattativa.",
    intro: "Una vendita serena comincia con una verifica preventiva. Individuare subito eventuali difformità permette di intervenire prima che arrivi una proposta.",
    sections: [
      { title: "La base documentale", text: "In genere servono titolo di provenienza, visura e planimetria catastale, attestato di prestazione energetica e documentazione urbanistica. Ogni immobile può richiedere verifiche ulteriori." },
      { title: "Controllare prima, non dopo", text: "STARTHOME coordina la raccolta iniziale e, quando necessario, coinvolge tecnici e professionisti qualificati. L’obiettivo è presentare l’immobile con informazioni chiare fin dal primo contatto." },
    ],
    formPrompt: "Hai dubbi sui documenti della tua casa? Indicaci tipologia e comune.",
  },
  {
    slug: "quanto-tempo-per-vendere-casa",
    title: "Quanto tempo serve per vendere una casa?",
    excerpt: "Prezzo, presentazione, documenti e qualità dei contatti incidono più di una promessa generica sui tempi.",
    intro: "I tempi cambiano da immobile a immobile. Una strategia corretta riduce l’incertezza e permette di capire presto come il mercato sta rispondendo.",
    sections: [
      { title: "Le quattro leve principali", text: "Posizionamento economico, qualità di foto e annuncio, regolarità documentale e selezione degli acquirenti lavorano insieme. Se una leva è debole, la vendita tende a rallentare." },
      { title: "Aggiornamenti concreti", text: "Condividiamo richieste ricevute, visite, riscontri e andamento della promozione. In questo modo le decisioni non si basano su sensazioni, ma su segnali verificabili." },
    ],
    formPrompt: "Dicci dove si trova l’immobile e quando vorresti concludere la vendita.",
  },
  {
    slug: "vendere-prima-di-comprare",
    title: "Conviene vendere prima di comprare la nuova casa?",
    excerpt: "Coordinare le due operazioni richiede una strategia finanziaria, contrattuale e organizzativa.",
    intro: "Vendere prima offre maggiore certezza sul budget; comprare prima può dare più libertà nella ricerca. La scelta dipende dalla liquidità disponibile e dalla flessibilità sui tempi.",
    sections: [
      { title: "Costruire un piano realistico", text: "Valutiamo valore atteso, eventuale mutuo, tempi di consegna e soluzioni temporanee. L’obiettivo è evitare decisioni affrettate o impegni economici non sostenibili." },
      { title: "Un solo percorso, due obiettivi", text: "STARTHOME può coordinare vendita e ricerca della nuova abitazione, mantenendo chiare priorità, condizioni e scadenze. Per il credito facilitiamo il contatto con partner esterni abilitati." },
    ],
    formPrompt: "Raccontaci la casa che vuoi vendere e quella che vorresti trovare.",
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
