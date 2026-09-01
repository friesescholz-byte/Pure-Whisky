export const R2_BASE = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/website-datein/Pure-Whisky/';

export const WHISKY_RELEASES = [
  {
    id: 'glen-garioch-11',
    name: 'Glen Garioch 11 Jahre',
    fullName: 'Glen Garioch 11 Jahre 56,5% 1st Refill Bourbon Barrel 12/24',
    distillery: 'Glen Garioch',
    region: 'Highlands',
    vintage: '2012 / 2024',
    age: '11 Jahre',
    caskType: '1st Refill Bourbon Barrel',
    abv: '56,5% vol.',
    bottlesTotal: 237,
    bottlesRemaining: 18,
    price: 134.90,
    originalPrice: 144.90,
    pricePerLiter: '192,71 € / l',
    isAvailable: true,
    isFeatured: true,
    badge: 'Limited Drop · 18 Restflaschen',
    image: `${R2_BASE}glen-garioch-11.webp`,
    character: ['Samtig-Süß', 'Jasmin', 'Zuckerwatte', 'Fassstärke'],
    tastingNotes: {
      nose: 'Jahrmarktszuckerwatte, sanfte Bourbon-Vanille, blühender weißer Jasmin, süße reife Pflaume und eine feine, frische Ätherik.',
      palate: 'Cremiger roher Mürbeteig, frisch gebrannte Mandeln, feine asiatische süß-saure Fruchtnote, untermalt von einer Prise Meersalz.',
      finish: 'Außergewöhnlich lang, wärmend, elegant und mit samtig-zuckrigem Nachklang.'
    },
    sustainability: {
      title: 'Schwerpunkt: Wassermanagement & Quellenschutz',
      desc: 'Glengarioch („Kornkammer von Aberdeenshire“) zeigt ein vorbildliches Bewusstsein für die Ressource Wasser. Durch die 1972 entdeckte stumme Quelle der Coutens Farm und geschlossene Kühlwasserkreisläufe setzt die Brennerei Standards im verantwortungsvollen Wassermanagement.'
    }
  },
  {
    id: 'jura-15',
    name: 'Jura 15 Jahre',
    fullName: 'Jura 15 Jahre 53,9% Refill Bourbon Hogshead 08/24',
    distillery: 'Jura',
    region: 'Islands',
    vintage: '2008 / 2024',
    age: '15 Jahre',
    caskType: 'Refill Bourbon Hogshead',
    abv: '53,9% vol.',
    bottlesTotal: 247,
    bottlesRemaining: 34,
    price: 164.90,
    originalPrice: 179.90,
    pricePerLiter: '235,57 € / l',
    isAvailable: true,
    isFeatured: false,
    badge: 'Insel-Charakter · Reines Einzelfass',
    image: `${R2_BASE}jura-15.webp`,
    character: ['Saurer Apfel', 'Mandelkuchen', 'Minze', 'Schwarzer Tee'],
    tastingNotes: {
      nose: 'Fruchtiger grüner Sauer-Apfel, ostfriesische Kluntjes, buttriger Mandelkuchen und feine maritime Oliven-Noten.',
      palate: 'Knusprige Butterstreusel, aromatischer Assam-Schwarztee, Bittermandel und eine belebende Kräuterfrische mit buntem Pfeffer.',
      finish: 'Mittellang, frisch und mit bleibendem minzig-würzigen Hauch.'
    },
    sustainability: {
      title: 'Schwerpunkt: Soziale Nachhaltigkeit & Inselgemeinschaft',
      desc: 'Jura engagiert sich seit ihrer Wiederbelebung 1963 intensiv gegen die Entvölkerung der Insel und sichert verlässliche, ganzjährige Arbeitsplätze in der lokalen Gemeinschaft auf einer der entlegensten Inseln Schottlands.'
    }
  },
  {
    id: 'tomatin-16',
    name: 'Tomatin 16 Jahre',
    fullName: 'Tomatin 16 Jahre 53,2% Peated Expression matured in a Bourbon Barrel 08/25',
    distillery: 'Tomatin',
    region: 'Highlands',
    vintage: '2008 / 2024',
    age: '16 Jahre',
    caskType: 'Bourbon Barrel (Peated Expression)',
    abv: '53,2% vol.',
    bottlesTotal: 214,
    bottlesRemaining: 52,
    price: 129.90,
    originalPrice: null,
    pricePerLiter: '185,57 € / l',
    isAvailable: true,
    isFeatured: false,
    badge: 'Rauchige Eleganz · Neuer Release',
    image: `${R2_BASE}tomatin-16.webp`,
    character: ['Dezenter Torfrauch', 'Reife Birne', 'Vanillecreme', 'Eichenwürze'],
    tastingNotes: {
      nose: 'Subtiler, eleganter Hochland-Torfrauch, gedünstete Birnen, Akazienhonig und florale Heidekraut-Noten.',
      palate: 'Samtige Vanillecreme, gegrillte Zitrusfrüchte, geröstetes Eichenholz und feine weißer Pfeffer-Würze.',
      finish: 'Langanhaltend, cremig-rauchig und wunderbar balanciert.'
    },
    sustainability: {
      title: 'Schwerpunkt: Vorreiter der Energiewende',
      desc: 'Als eine der ersten schottischen Brennereien nutzt Tomatin eine hocheffiziente Biomasse-Heizungsanlage und modernste Energierückgewinnung zur signifikanten Reduzierung des CO2-Fußabdrucks.'
    }
  },
  {
    id: 'ardmore-11',
    name: 'Ardmore 11 Jahre (First Release)',
    fullName: 'Ardmore 11 Jahre 56,7% Ex-Laphroaig Oloroso Sherry Quarter Cask 12/24',
    distillery: 'Ardmore',
    region: 'Highlands',
    vintage: '2012 / 2024',
    age: '11 Jahre',
    caskType: 'Ex-Laphroaig Oloroso Sherry Quarter Cask',
    abv: '56,7% vol.',
    bottlesTotal: 109,
    bottlesRemaining: 0,
    price: 139.90,
    originalPrice: null,
    pricePerLiter: '199,86 € / l',
    isAvailable: false,
    isFeatured: false,
    badge: 'Ausverkauft · Sammler-Archiv',
    image: `${R2_BASE}ardmore-11.webp`,
    character: ['Lagerfeuerrauch', 'Früchtekuchen', 'Blutorange', 'Salzlakritz'],
    tastingNotes: {
      nose: 'Knisternder Lagerfeuerrauch, saftiger getränkter Früchtekuchen, sizilianische Blutorange und karamellisierter brauner Zucker.',
      palate: 'Volle Samtigkeit mit eleganter Rauchnote, Vollmilchschokolade, Orangeat und zartes Salzlakritz.',
      finish: 'Kraftvoll, dicht und mit ewigem Nachklang von geröstetem Anis.'
    },
    sustainability: {
      title: 'Schwerpunkt: Lokale Wasserquellen & Kreislaufwirtschaft',
      desc: 'Ardmore bezieht sein Brauwasser aus geschützten Quellen am Knockandy Hill und recycelt Treber und Pot Ale als nährstoffreiches Viehfutter für umliegende Bauernhöfe.'
    }
  }
];

export const PACKAGING_HOTSPOTS = [
  {
    id: 'glass',
    title: '100% Estal Wild Glass',
    subtitle: 'Jede Flasche ein echtes Unikat',
    desc: 'Abgefüllt in echtes Wild Glass von Estal aus Spanien – gefertigt zu 100% aus recyceltem Glas (Post-Consumer-Recycled). Authentische Farb- und Strukturfacetten machen jede Flasche unverwechselbar.',
    x: '50%',
    y: '58%'
  },
  {
    id: 'cork',
    title: 'Spanischer Naturkorken',
    subtitle: '5. Generation Familienforst',
    desc: 'Geschnitten aus einem Stück unbehandeltem Naturkork aus nachhaltig bewirtschafteten spanischen Wäldern bzw. reinem Korkgranulat-Aktivkohle-Gemisch.',
    x: '50%',
    y: '14%'
  },
  {
    id: 'capsule',
    title: '100% Biopolymer-Kapsel',
    subtitle: 'Frei von Erdölkunststoffen',
    desc: 'Der Kapselverschluss besteht aus vollständig biologisch abbaubarem Biopolymer. Kein Plastikabfall, keine giftigen Weichmacher.',
    x: '50%',
    y: '26%'
  },
  {
    id: 'label',
    title: 'Handgestempeltes Naturpapier',
    subtitle: 'PFAS-frei & kompostierbar',
    desc: 'Die Etiketten werden bei StamPamPam in Spanien mit ungiftiger, bio-abbaubarer Tinte von Hand auf recyceltes Bütten- und Saatenpapier gestempelt. Verklebt mit biologisch abbaubarem Leim.',
    x: '50%',
    y: '72%'
  }
];

export const EVENTS_DATA = [
  {
    title: 'Bottlemarket Bremen 2026',
    location: 'Messehalle 7, Bürgerweide Bremen',
    date: '14. – 16. November 2026',
    desc: 'Treffen Sie Ines Zager persönlich und verkosten Sie die aktuellen Single Cask Releases direkt am Stand.',
    badge: 'Messe & Live Tasting'
  },
  {
    title: 'InterWhisky Wiesbaden 2026',
    location: 'Kurhaus Wiesbaden, Kurhausplatz 1',
    date: '28. – 30. November 2026',
    desc: 'Exklusives Master-Tasting mit Hintergrundberichten zu Brennerei-Audits und neuen Fassabfüllungen.',
    badge: 'Masterclass'
  },
  {
    title: 'Hanse Spirit Hamburg 2027',
    location: 'Hamburg Messe, Halle B2',
    date: '05. – 07. Februar 2027',
    desc: 'Die größte Messe für edle Spirituosen im Norden mit PURE.WHISKY. Tasting-Lounge.',
    badge: 'Messe-Highlight'
  }
];
