
export const R2_BASE = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/';

export const IMAGES = {
  logo: `${R2_BASE}logo-pure-whisky.png`,
  hero_back: `${R2_BASE}Hero%20Back%20Pure%20Whisky_ergebnis.webp`,
  card_bg_islands: `${R2_BASE}Pure-Whisky-bILDER07.webp`,
  card_bg_highlands: `${R2_BASE}Pure-Whisky-bILDER01.webp`,
  tomatin: `${R2_BASE}Produkte/Pure-Whisky01.webp`,
  jura: `${R2_BASE}Produkte/Pure-Whisky02.webp`,
  glengarioch: `${R2_BASE}Produkte/Pure-Whisky03.webp`,
  ardmore: `${R2_BASE}Produkte/Pure-Whisky04.webp`,
  tomatin_label: `${R2_BASE}flasche-tomatin-16-jahre-full.webp`,
  jura_label: `${R2_BASE}flasche-jura-15-jahre-full.webp`,
  glengarioch_label: `${R2_BASE}flasche-glengarioch-11-jahre-full.webp`,
  ardmore_label: `${R2_BASE}flasche-ardmore-11-jahre-full.webp`,
  ines_portrait: `${R2_BASE}ines-zager-schottland-portrait.webp`,
  ines_barrel: `${R2_BASE}ines-zager-fass-lager.webp`,
  ines_islay: `${R2_BASE}ines-zager-islay-natur.webp`,
  messe_bottlemarket: `${R2_BASE}messe-bottlemarket-bremen-stand.webp`,
  messe_interwhisky: `${R2_BASE}messe-interwhisky-wiesbaden-stand.webp`,
  andre_session: `${R2_BASE}andre-lautensack-whisky-evening.webp`,
  tasting_springbank: `${R2_BASE}tasting-springbank-glasgow-frauen.webp`,
  scotland_coast: `${R2_BASE}schottland-landschaft-kueste-1.webp`,
  scotland_distillery: `${R2_BASE}schottland-brennerei-besuch-2.webp`,
  scotland_travel: `${R2_BASE}schottland-whisky-reisen-3.webp`,
  wild_glass: `${R2_BASE}packaging-wild-glass-detail.webp`,
  naturkork: `${R2_BASE}packaging-naturkork-spanien.webp`,
  biopolymer_kapsel: `${R2_BASE}packaging-biopolymer-kapsel.webp`,
  saatenpapier_label: `${R2_BASE}packaging-saatenpapier-stempel.webp`,
  frauenperspektive: `${R2_BASE}philosophie-frauenperspektive.webp`,
  mission: `${R2_BASE}philosophie-mission-fass.webp`,
  versprechen: `${R2_BASE}philosophie-versprechen-qualitaet.webp`,
};

export const PRODUCTS = [
  {
    id: 'tomatin-16',
    name: 'Tomatin 16 Jahre',
    fullName: 'Tomatin 16 Jahre 53,2% Peated Expression matured in an Bourbon Barrel 08/25',
    region: 'Highlands',
    distillery: 'Tomatin Distillery',
    distilleryLocation: 'Inverness-shire, Monadhliath Mountains',
    age: '16 Jahre',
    abv: '53,2% vol.',
    vintage: '2008 / 2024',
    caskType: '1st Fill Bourbon Barrel (Peated Expression)',
    caskNumber: 'Cask #08/25',
    price: 129.90,
    originalPrice: null,
    pricePerLiter: '185,57 € / l',
    isAvailable: true,
    isFeatured: true,
    badge: 'Neuer Release · Peated Highland',
    bottlesTotal: 214,
    bottlesRemaining: 52,
    image: IMAGES.tomatin,
    cardBg: IMAGES.card_bg_highlands,
    galleryImages: [IMAGES.tomatin, IMAGES.tomatin_label, IMAGES.card_bg_highlands, IMAGES.ines_barrel],
    character: ['Subtiler Torfrauch', 'Gedünstete Birne', 'Akazienhonig', 'Vanillecreme'],
    intro: 'Ein extrem seltener, getorfter Hochland-Single-Malt aus der traditionsreichen Tomatin Brennerei. 16 Jahre Reifung in einem handverlesenen Bourbon-Fass verleihen ihm eine perfekte Balance aus cremigem Schmelz und zartem Rauch.',
    history: {
      headline: 'Die Magie der Monadhliath Mountains & Tomatin',
      text: 'Die 1897 gegründete Tomatin Brennerei liegt auf über 300 Metern Höhe in den rauen schottischen Highlands. Das weiche Quellwasser des Alt-na-Frith Flusses und die klare Bergluft schaffen ideale Bedingungen für eine langsame, gleichmäßige Reifung. Bei diesem Fass handelt es sich um eine der seltenen getorften Chargen („Cù Bòcan“-Stil), die bei Tomatin nur wenige Wochen im Jahr destilliert werden.',
      image: IMAGES.scotland_distillery
    },
    tastingNotes: {
      nose: 'Subtiler, eleganter Hochland-Torfrauch, gedünstete Birnen, Akazienhonig und florale Heidekraut-Noten.',
      palate: 'Samtige Vanillecreme, gegrillte Zitrusfrüchte, geröstetes Eichenholz und feine weißer Pfeffer-Würze.',
      finish: 'Langanhaltend, cremig-rauchig und wunderbar balanciert mit edler Eichenholznote.'
    },
    sustainability: {
      headline: 'Pionier der Energiewende & Umweltjuristisches Audit',
      story: 'Bereits 2013 installierte Tomatin als Pionier einen Holzpellet-Biomasse-Kessel, der rund 80% der gesamten Energie liefert und CO₂-Emissionen um über 80% senkt. Durch innovative Wehranlagen wurde der Wasserverbrauch halbiert, während Produktionsabwässer durch ein natürliches Schilf-Rieselfeld gereinigt werden. Juristin Ines Zager prüfte diese Anlagen persönlich vor Ort.',
      image: IMAGES.ines_barrel
    }
  },
  {
    id: 'jura-15',
    name: 'Jura 15 Jahre',
    fullName: 'Jura 15 Jahre 53,9% Refill Bourbon Hogshead 08/24',
    region: 'Islands',
    distillery: 'Jura Distillery',
    distilleryLocation: 'Craighouse, Isle of Jura, Inner Hebrides',
    age: '15 Jahre',
    abv: '53,9% vol.',
    vintage: '2008 / 2024',
    caskType: 'Refill Bourbon Hogshead',
    caskNumber: 'Cask #08/24',
    price: 164.90,
    originalPrice: 179.90,
    pricePerLiter: '235,57 € / l',
    isAvailable: true,
    isFeatured: false,
    badge: 'Insel-Charakter · 8% Vorteil',
    bottlesTotal: 247,
    bottlesRemaining: 34,
    image: IMAGES.jura,
    cardBg: IMAGES.card_bg_islands,
    galleryImages: [IMAGES.jura, IMAGES.jura_label, IMAGES.card_bg_islands, IMAGES.ines_islay],
    character: ['Saurer Apfel', 'Kluntjes', 'Mandelkuchen', 'Minze & Assam-Tee'],
    intro: 'Von der abgelegenen Hebrideninsel Jura mit nur einer einzigen Straße und rund 200 Einwohnern. 15 Jahre maritime Fassreife formten einen unverwechselbaren, frischen Single Cask Whisky mit maritimen Noten.',
    history: {
      headline: 'Eine Insel, eine Straße, eine Brennerei',
      text: 'Jura ist berühmt für seine wilden Berge (Paps of Jura) und die raue Atlantikbrandung. Die 1810 gegründete und 1963 wiedereröffnete Destillerie arbeitet mit den zweithöchsten Brennblasen Schottlands. Dies erzeugt ein besonders reines, fruchtiges Destillat, das in unserem Refill Hogshead über 15 Jahre ungestört mit der salzigen Meeresluft atmete.',
      image: IMAGES.scotland_coast
    },
    tastingNotes: {
      nose: 'Fruchtiger grüner Sauer-Apfel (Apfelkorn), ostfriesische Kluntjes, buttriger Mandelkuchen und feine maritime Oliven-Noten.',
      palate: 'Knusprige Butterstreusel, aromatischer Assam-Schwarztee, Bittermandel und eine belebende Kräuterfrische mit buntem Pfeffer.',
      finish: 'Mittellang, frisch und mit bleibendem minzig-würzigen Hauch.'
    },
    sustainability: {
      headline: 'Rettung der Inselgemeinschaft & Soziale Nachhaltigkeit',
      story: 'Als Brennerei Jura 1963 neu aufgebaut wurde, verhinderte sie die vollständige Entvölkerung der Insel. Bis heute sichert die Destillerie das wirtschaftliche Rückgrat der Inselbevölkerung. Bei Ines Zagers Besuch stand neben dem Quellenschutz vor allem die regionale Wertschöpfung im Fokus.',
      image: IMAGES.ines_islay
    }
  },
  {
    id: 'glengarioch-11',
    name: 'Glen Garioch 11 Jahre',
    fullName: 'Glen Garioch 11 Jahre 56,5% 1st Refill Bourbon Barrel 12/24',
    region: 'Highlands',
    distillery: 'Glen Garioch Distillery',
    distilleryLocation: 'Oldmeldrum, Aberdeenshire',
    age: '11 Jahre',
    abv: '56,5% vol.',
    vintage: '2012 / 2024',
    caskType: '1st Refill Bourbon Barrel',
    caskNumber: 'Cask #12/24',
    price: 134.90,
    originalPrice: 144.90,
    pricePerLiter: '192,71 € / l',
    isAvailable: true,
    isFeatured: true,
    badge: 'Bestseller · 7% Vorteil',
    bottlesTotal: 237,
    bottlesRemaining: 18,
    image: IMAGES.glengarioch,
    cardBg: IMAGES.card_bg_highlands,
    galleryImages: [IMAGES.glengarioch, IMAGES.glengarioch_label, IMAGES.card_bg_highlands, IMAGES.ines_barrel],
    character: ['Jahrmarktszuckerwatte', 'Vanille', 'Weißer Jasmin', 'Mürbeteig & Meersalz'],
    intro: 'Aus einer der ältesten funktionierenden Brennereien Schottlands (gegründet 1797). Dieser 11-jährige Single Malt besticht durch seine explosive Wucht von 56,5% vol. und ein bezaubernd süßes Mürbeteig- und Blütenaroma.',
    history: {
      headline: 'Die historische Kornkammer von Aberdeenshire',
      text: 'Glen Garioch liegt mitten im "Valley of the Garioch", das seit Jahrhunderten für die beste Braugerste Schottlands berühmt ist. Die Brennerei setzt auf traditionelle, schwere Kupferbrennblasen und direkte Kühlung, was dem Whisky seinen vollmundigen, wachsigen und cremigen Körper verleiht.',
      image: IMAGES.scotland_travel
    },
    tastingNotes: {
      nose: 'Jahrmarktszuckerwatte, sanfte Bourbon-Vanille, blühender weißer Jasmin, süße reife Pflaume und feine Ätherik.',
      palate: 'Cremiger roher Mürbeteig, frisch gebrannte Mandeln, süß-saure Fruchtnote, untermalt von einer Prise Meersalz.',
      finish: 'Außergewöhnlich lang, wärmend, elegant und mit samtig-zuckrigem Nachklang.'
    },
    sustainability: {
      headline: 'Quellenschutz auf der Coutens Farm & Kreislauf',
      story: 'Nachdem die Brennerei in den 1960er Jahren wegen Wassermangels schließen musste, erschloss man 1972 eine geheime Quelle auf der Coutens Farm. Seitdem investiert Glen Garioch in geschlossene Kühlwasserkreisläufe, um wertvolles Grundwasser zu schonen.',
      image: IMAGES.ines_barrel
    }
  },
  {
    id: 'ardmore-11',
    name: 'Ardmore 11 Jahre (First Release)',
    fullName: 'Ardmore 11 Jahre 56,7% Ex-Laphroaig Oloroso Sherry Cask 12/24',
    region: 'Highlands',
    distillery: 'Ardmore Distillery',
    distilleryLocation: 'Kennethmont, Aberdeenshire',
    age: '11 Jahre',
    abv: '56,7% vol.',
    vintage: '2012 / 2024',
    caskType: 'Ex-Laphroaig Oloroso Sherry Quarter Cask',
    caskNumber: 'Cask #01/24',
    price: 139.90,
    originalPrice: null,
    pricePerLiter: '199,86 € / l',
    isAvailable: false,
    isFeatured: false,
    badge: 'Sold Out · Sammler-Archiv',
    bottlesTotal: 109,
    bottlesRemaining: 0,
    image: IMAGES.ardmore,
    cardBg: IMAGES.card_bg_highlands,
    galleryImages: [IMAGES.ardmore, IMAGES.ardmore_label, IMAGES.card_bg_highlands, IMAGES.mission],
    character: ['Lagerfeuerrauch', 'Früchtekuchen', 'Blutorange', 'Milchschokolade & Salzlakritz'],
    intro: 'Das historische Premieren-Fass von PURE.WHISKY. Gereift in einem rauchigen Ex-Laphroaig Fass mit Oloroso Sherry Veredelung – ein gesuchtes Sammlerstück, das binnen kürzester Zeit restlos ausverkauft war.',
    history: {
      headline: 'Der First Release von Ines Zager',
      text: 'Mit dieser Abfüllung begann die Reise von PURE.WHISKY. Ardmore ist eine der wenigen Destillerien in den Highlands, die ihren Malz traditionell über schottischem Torf darren. Die Reifung im Quarter Cask sorgte für maximalen Holzkontakt und eine überwältigende Aromenintensität.',
      image: IMAGES.tasting_springbank
    },
    tastingNotes: {
      nose: 'Knisternder Lagerfeuerrauch, saftiger Früchtekuchen, sizilianische Blutorange und karamellisierter brauner Zucker.',
      palate: 'Volle Samtigkeit mit feinem Rauch, zarte Vollmilchschokolade, Orangeat und feines Salzlakritz.',
      finish: 'Voll, warm und lang mit einem Nachklang von geröstetem Anis.'
    },
    sustainability: {
      headline: 'Quellwasser vom Knockandy Hill & Lokale Landwirtschaft',
      story: 'Ardmore bezieht sein Brauwasser aus den unberührten Quellen des Knockandy Hill. Alle anfallenden Destillationsrückstände (Draff und Pot Ale) werden an lokale Farmen in Aberdeenshire als hochwertiges Viehfutter übergeben.',
      image: IMAGES.mission
    }
  }
];

export const PHILOSOPHY_PILLARS = [
  {
    id: 'ueber-mich',
    title: 'Über Ines Zager',
    tag: 'Die Gründerin',
    subtitle: 'Vom Umwelt- & Energierecht zum Lebenstraum im Whisky',
    image: IMAGES.ines_portrait,
    quote: '„Heute, in meinen Vierzigern mit 20 Jahren Berufserfahrung, habe ich das Selbstvertrauen gewonnen, das zu tun, was ich schon immer tun wollte.“',
    paragraphs: [
      'Seit gut 20 Jahren bereise ich die Welt auf der Jagd nach den spannendsten Flaschen für meine Privatsammlung. Als 2020 persönlicher Austausch nicht mehr möglich war, startete ich einen Instagram-Blog und Zoom-Verkostungen. So entstand der Kontakt zum Fasseinkauf.',
      'In der Mitte des Lebens angekommen, beschloss ich 2023, volles Risiko zu gehen: Ich fuhr meine Karriere als auf Umwelt-, Genehmigungs- und Energierecht spezialisierte Juristin bei großen Energiekonzernen auf Teilzeit zurück, um mir meinen Lebenstraum zu erfüllen: PURE.WHISKY. – ein Unternehmen, das strikt meinen persönlichen Werten verpflichtet ist.',
      'Besonderer Dank gilt der weltweiten Our Whisky Foundation, die Frauen im Whisky fördert. Als Mentee wurde mir Rachel Vaughn Jones (Marketing Director von Compass Box Whisky) zur Seite gestellt. Ich freue mich sehr darauf, Sie mit auf meine Reise zu nehmen.'
    ]
  },
  {
    id: 'frauenperspektive',
    title: 'Frauenperspektive?',
    tag: 'Haltung',
    subtitle: 'Oder: Was mache ich anders?',
    image: IMAGES.frauenperspektive,
    quote: '„Ich glaube nicht an bestimmten Whisky für bestimmte Gruppen. Gut ist, was gefällt.“',
    paragraphs: [
      'Tatsächlich bin ich eine der sehr wenigen weiblichen unabhängigen Whiskyabfüllerinnen auf dem europäischen Markt.',
      'Was ist eine weibliche Perspektive auf Whisky? Was ich versprechen kann, ist ein vorurteilsfreier Blick auf Trends und Trinkgewohnheiten. Ich glaube nicht an Dogmen wie „kein Eis im Whisky“ oder elitäre Urteile nach Alter und dunkler Fassfarbe.',
      'Mir gefällt purer Whisky. PURE.WHISKY. steht für eine Abkehr von den auf dem deutschen Markt oft vorherrschenden, künstlich überladenen Sherry-Abfüllungen – zurück zur unverfälschten DNA der einzelnen Brennerei. Zudem auditiere ich die Brennereien nach handfesten Umweltstandards wie EMAS und ISO 14001.'
    ]
  },
  {
    id: 'meine-mission',
    title: 'Meine Mission',
    tag: 'Transparenz',
    subtitle: 'Reine Fassstärke ohne Versteckspiel',
    image: IMAGES.mission,
    quote: '„Single Cask Whisky direkt aus dem Fass – unverdünnt, ungefiltert und ohne Fantasienamen.“',
    paragraphs: [
      'Als unabhängiger Abfüller erwerbe ich einzelne Fässer bekannter Brennereien und fülle diese unter eigenem Namen ab: direkt aus dem Fass, nicht kühlgefiltert, ungefärbt und unverdünnt in Fassstärke.',
      'Jede Brennerei wird vor dem Kauf vor Ort besucht und anhand öffentlich zugänglicher und informeller Informationen nach Kriterien von EMAS und ISO 14001 bewertet.',
      'In der Konsequenz bedeutet dies: Ich kaufe nur Fässer, bei denen ich den echten Namen der Brennerei offiziell nennen darf. Bei mir gibt es kein „Secret Highland“ oder Versteckspiel, sondern 100% transparente Herkunft.'
    ]
  },
  {
    id: 'der-look',
    title: 'Der Look & Craft',
    tag: 'Packaging',
    subtitle: '100% Circular Packaging & Handarbeit',
    image: IMAGES.wild_glass,
    quote: '„Flaschen und Etiketten, die sich in Form, Haptik und Nachhaltigkeit spürbar abheben.“',
    paragraphs: [
      'Abgefüllt wird in echte Wild-Glass-Flaschen von Estal aus Spanien – gefertigt zu 100% aus recyceltem Glas (PCR), dem man seine faszinierende Geschichte ansieht.',
      'Der Verschluss besteht aus einem einzigen Stück unbehandeltem spanischem Naturkork aus 5. Familiengeneration bzw. Kork-Aktivkohle-Granulat. Die Kapsel ist zu 100% biologisch abbaubar aus Biopolymer – frei von Erdölplastik.',
      'Die Etiketten werden bei StamPamPam in Spanien von Hand mit biologisch abbaubarer Tinte auf recyceltes Saatenpapier gestempelt und mit kompostierbarem Leim aufgebracht.'
    ]
  },
  {
    id: 'mein-versprechen',
    title: 'Mein Versprechen',
    tag: 'Qualität',
    subtitle: 'Kompromisslose Qualität mit gutem Gewissen',
    image: IMAGES.versprechen,
    quote: '„Genuss mit gutem Gewissen – persönlich geprüft von der Juristin.“',
    paragraphs: [
      'PURE.WHISKY. hat es sich zum Ziel gesetzt, das pure Whiskyvergnügen wie kein anderer unabhängiger Abfüller zu bieten.',
      'Das bedeutet mein persönliches Qualitätsversprechen: Jedes Fass, jede Brennerei, jedes Material und jeder Partner werden von mir persönlich nicht nur auf sensorische Exzellenz, sondern auf Erfüllung harter Nachhaltigkeitskriterien ausgewählt.'
    ]
  }
];

export const BLOG_POSTS = [
  {
    id: 1096,
    title: 'PURE.WHISKY. ist auf der InterWhisky 2024 in Wiesbaden!',
    date: '12. Nov 2024',
    category: 'Messe',
    author: 'Ines Zager',
    image: IMAGES.messe_interwhisky,
    excerpt: 'Besuchen Sie mich vom 15. bis 17. November auf der traditionsreichen InterWhisky im Kurhaus Wiesbaden.',
    content: 'Vom 15. bis 17. November 2024 bin ich auf der traditionsreichen InterWhisky im Kurhaus Wiesbaden vertreten! Kommen Sie vorbei, verkosten Sie die aktuellen Single Cask Releases von Tomatin, Jura und Glen Garioch und lassen Sie uns über Brennerei-Audits, Fassreifung und nachhaltige Verpackung fachsimpeln. Ich freue mich auf viele persönliche Begegnungen!'
  },
  {
    id: 1089,
    title: 'Zu Gast bei André Lautensack: 2 Quasselstrippen unter sich',
    date: '12. Nov 2024',
    category: 'YouTube',
    author: 'Ines Zager',
    image: IMAGES.andre_session,
    videoUrl: 'https://youtu.be/N_4Z0DgVRts?si=1FD11Day3vrb54vd',
    excerpt: 'Zu Gast beim bekannten Whisky-Tasting-Kanal von André Lautensack im thüringischen Schleusingen.',
    content: 'Am Montag war ich bei André Lautensack („Whisky Evening“) im schönen Schleusingen in Thüringen zu Gast, um die Idee hinter PURE.WHISKY. vorzustellen und meine ersten Abfüllungen live zu verkosten. Und natürlich konnten wir beiden Quasselstrippen uns nicht kurz fassen! 🤣 Schauen Sie sich das Video gerne auf YouTube an und erleben Sie die ungeschminkte Live-Verkostung unserer Whiskys.'
  },
  {
    id: 1083,
    title: 'Das erste Mal …. Messe (Bottlemarket Bremen 2024)',
    date: '12. Nov 2024',
    category: 'Messe',
    author: 'Ines Zager',
    image: IMAGES.messe_bottlemarket,
    excerpt: 'Bottlemarket Bremen 2024: It’s a wrap! Überwältigendes Feedback für meinen Ein-Frau-Betrieb.',
    content: 'Bottlemarket Bremen 2024 – It’s a wrap! Am Wochenende konnte ich das erste Mal die Idee hinter PURE.WHISKY. und meine ersten 3 Abfüllungen auf einer großen Messe präsentieren. Ich bin überwältigt von dem durchgängig überragenden Feedback für meinen kleinen Ein-Frau-Betrieb. 😊 Vielen Dank an alle, die verkostet, zugehört, nachgehakt und vor allem weiterempfohlen haben. Gerade die Wirkung von Mund-zu-Mund-Propaganda hat mich tief berührt. DANKE! 🩷🫶'
  },
  {
    id: 965,
    title: 'First Release! (Ardmore 11 Tasting)',
    date: '11. Apr 2024',
    category: 'Abfüllungen',
    author: 'Ines Zager',
    image: IMAGES.tasting_springbank,
    excerpt: 'Er ist da: Mein allererster Release! Ardmore 11 Jahre im Ex-Laphroaig Oloroso Sherry Quarter Cask.',
    content: 'Er ist da! Meine allererste Abfüllung: Ardmore 11 Jahre alt, veredelt im Ex-Laphroaig Oloroso Sherry Quarter Cask. Und da ich natürlich etwas voreingenommen bin, wenn es um mein eigenes Produkt geht, ließ ich wunderbare Frauen aus Glasgow zu Wort kommen, die sich für ein spontanes morgendliches Tasting nach einer Tour in der Springbank Brennerei bereit erklärt haben. Vielen Dank an Melanie, Jen und Naomi!'
  },
  {
    id: 645,
    title: 'ARTE / ZDF TV-Reportage „Whiskyboom auf Islay“',
    date: '13. Jan 2024',
    category: 'Nachhaltigkeit',
    author: 'Ines Zager',
    image: IMAGES.scotland_coast,
    videoUrl: 'https://www.zdf.de/arte/arte-re/page-video-artede-re-whisky-boom-mit-schattenseiten-100.html',
    excerpt: 'Hinter den Kulissen der ARTE-Reportage über den Tourismusboom und die Belastungsgrenzen von Islay.',
    content: 'Im Oktober nahm ich an Rachel MacNeills Kurs an der Islay Whisky Academy teil und wurde von einem deutschen Fernsehteam begleitet. In der daraus entstandenen ARTE/ZDF-Reportage wird über die Schattenseiten des Whiskybooms auf Islay berichtet. Islay ist seit 2009 mein „Happy Place“. Doch die Insel gerät an Belastungsgrenzen. Kann ich das verurteilen? Nein, als Konsumentin und Fässtouristin bin ich Teil des Marktes. Aber genau deshalb setze ich mit PURE.WHISKY. auf radikale Nachhaltigkeit und echtes Ressourcenbewusstsein.'
  }
];

export const PACKAGING_HOTSPOTS = [
  {
    id: 'glass',
    title: '100% Estal Wild Glass',
    subtitle: 'Jede Flasche ein Unikat',
    image: IMAGES.wild_glass,
    desc: 'Abgefüllt in echtes Wild Glass von Estal aus Spanien – gefertigt zu 100% aus recyceltem Glas (PCR). Authentische Farb- und Strukturfacetten machen jede Flasche unverwechselbar.'
  },
  {
    id: 'cork',
    title: 'Spanischer Naturkorken',
    subtitle: '5. Generation Familienforst',
    image: IMAGES.naturkork,
    desc: 'Geschnitten aus einem Stück unbehandeltem Naturkork aus nachhaltig bewirtschafteten spanischen Wäldern bzw. reinem Korkgranulat-Aktivkohle-Gemisch.'
  },
  {
    id: 'capsule',
    title: '100% Biopolymer-Kapsel',
    subtitle: 'Frei von Erdölkunststoffen',
    image: IMAGES.biopolymer_kapsel,
    desc: 'Der Kapselverschluss besteht aus vollständig biologisch abbaubarem Biopolymer. Kein Plastikabfall, keine giftigen Weichmacher.'
  },
  {
    id: 'label',
    title: 'Handgestempeltes Naturpapier',
    subtitle: 'PFAS-frei & kompostierbar',
    image: IMAGES.saatenpapier_label,
    desc: 'Die Etiketten werden bei StamPamPam in Spanien mit ungiftiger, bio-abbaubarer Tinte von Hand auf recyceltes Bütten- und Saatenpapier gestempelt. Verklebt mit biologisch abbaubarem Leim.'
  }
];

export const FAQ_DATA = [
  {
    q: 'Was genau bedeutet „Single Cask Whisky in Fassstärke“?',
    a: 'Single Cask bedeutet, dass jede Flasche ausschließlich aus einem einzigen, individuellen Holzfass stammt und nicht mit anderen Fässern verschnitten wird. „Fassstärke“ (Cask Strength) heißt, dass der Whisky nach der Reifung direkt unverdünnt mit seinem natürlichen Alkoholgehalt (meist zwischen 53% und 57% vol.) abgefüllt wird – unfiltriert und ohne Farbstoffe.'
  },
  {
    q: 'Was macht die PURE.WHISKY. Flaschen so besonders nachhaltig?',
    a: 'Wir nutzen zu 100% recyceltes Wild Glass von Estal aus Spanien (PCR-Glas), bei dem kleine Unregelmäßigkeiten den handwerklichen Charakter unterstreichen. Unser Korken stammt aus nachhaltigen spanischen Eichenforsten in 5. Familiengeneration. Die Kapsel ist zu 100% aus biologisch abbaubarem Biopolymer (kein Erdölplastik), und das Etikett wird von Hand mit kompostierbarer Tinte auf Saatenpapier gestempelt.'
  },
  {
    q: 'Wie läuft die Prüfung der Brennereien auf Nachhaltigkeit ab?',
    a: 'Als langjährige Umweltjuristin für Energiekonzerne auditiere ich Brennereien vor Fasseinkauf persönlich vor Ort. Ich bewerte Wassermanagement, Quellenschutz, CO2-Reduktionsmaßnahmen (z.B. Biomasse bei Tomatin) und soziale Faktoren angelehnt an EMAS- und ISO 14001 Standards.'
  },
  {
    q: 'Wie funktioniert die Altersprüfung (18+) bei der Bestellung?',
    a: 'Der Verkauf und die Zustellung von Spirituosen erfolgen ausschließlich an Personen ab 18 Jahren. Im Checkout bestätigen Sie Ihre Volljährigkeit, und bei der Zustellung durch DHL GoGreen erfolgt eine kurze Alters- und Sichtprüfung.'
  },
  {
    q: 'Wie hoch sind die Versandkosten und wie schnell wird geliefert?',
    a: 'Wir versenden versichert und klimaneutral mit DHL GoGreen innerhalb von 2–4 Werktagen. Innerhalb Deutschlands betragen die Versandkosten pauschal 6,90 € – ab 150 € Bestellwert liefern wir versandkostenfrei.'
  },
  {
    q: 'Welche Zahlungsmethoden stehen im Shop zur Verfügung?',
    a: 'Sie können bequem und sicher mit PayPal, Apple Pay, Google Pay, Kreditkarte (Visa, Mastercard, Amex), Klarna Sofortüberweisung oder iDEAL bezahlen.'
  }
];
