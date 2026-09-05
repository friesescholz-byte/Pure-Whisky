
export const R2_BASE = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/';

export const IMAGES = {
  logo: `${R2_BASE}logo-pure-whisky.png`,
  hero_back: `${R2_BASE}Hero%20Back%20Pure%20Whisky_ergebnis.webp`,
  card_bg_islands: `${R2_BASE}Pure-Whisky-bILDER07.webp`,
  card_bg_highlands: `${R2_BASE}Pure-Whisky-bILDER01.webp`,
  card_bg_speyside: `${R2_BASE}schottland-landschaft-kueste-1.webp`,
  
  // -------------------------------------------------------------
  // THE 4 ORIGINAL CASKS - 100% VERIFIED LABEL ASSIGNMENTS:
  // Pure-Whisky01 = Ardmore 11 (56.7%)
  // Pure-Whisky02 = Tomatin 16 (53.2%)
  // Pure-Whisky03 = Glen Garioch 11 (56.5%)
  // Pure-Whisky04 = Jura 15 (53.9%)
  // -------------------------------------------------------------
  ardmore: `${R2_BASE}Produkte/Pure-Whisky01.webp`,
  tomatin: `${R2_BASE}Produkte/Pure-Whisky02.webp`,
  glengarioch: `${R2_BASE}Produkte/Pure-Whisky03.webp`,
  jura: `${R2_BASE}Produkte/Pure-Whisky04.webp`,

  // Realistic In-Situ Photos of In-Stock Casks (Supplied by user)
  jura_new: `${R2_BASE}Produkte/20241014_124522_04.webp`,
  glengarioch_new: `${R2_BASE}Produkte/20241014_124302_03.webp`,

  // Outdoor Full-Bottle Photos
  tomatin_label: `${R2_BASE}flasche-tomatin-16-jahre-full.webp`,
  jura_label: `${R2_BASE}flasche-jura-15-jahre-full.webp`,
  glengarioch_label: `${R2_BASE}flasche-glengarioch-11-jahre-full.webp`,
  ardmore_label: `${R2_BASE}flasche-ardmore-11-jahre-full.webp`,

  // -------------------------------------------------------------
  // 4 NEW CASKS (RELEASE 17. SEPTEMBER 2026)
  // -------------------------------------------------------------
  glenburgie_11: `${R2_BASE}Produkte-2026/Single-Malt-Scotch-Whisky11Y_11.webp`,
  fettercairn_15: `${R2_BASE}Produkte-2026/Single-Malt-Scotch-Whisky15Y_12.webp`,
  aultmore_17: `${R2_BASE}Produkte-2026/Single-Malt-Scotch-Whisky17Y_13.webp`,
  highlandpark_18: `${R2_BASE}Produkte-2026/Single-Malt-Scotch-Whisky18Y_14.webp`,

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
  // -------------------------------------------------------------
  // NOCH VORRÄTIGE ALTE ABFÜLLUNGEN (JURA 15 & GLEN GARIOCH 11)
  // -------------------------------------------------------------
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
    isUpcoming: false,
    isFeatured: true,
    badge: 'Sofort lieferbar · 8% Vorteil',
    bottlesTotal: 247,
    bottlesRemaining: 34,
    image: IMAGES.jura_new,
    cutoutImage: IMAGES.jura,
    cardBg: IMAGES.card_bg_islands,
    galleryImages: [IMAGES.jura_new, IMAGES.jura, IMAGES.card_bg_islands, IMAGES.ines_islay],
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
    isUpcoming: false,
    isFeatured: true,
    badge: 'Bestseller · Nur noch 18 Flaschen',
    bottlesTotal: 237,
    bottlesRemaining: 18,
    image: IMAGES.glengarioch_new,
    cutoutImage: IMAGES.glengarioch,
    cardBg: IMAGES.card_bg_highlands,
    galleryImages: [IMAGES.glengarioch_new, IMAGES.glengarioch, IMAGES.card_bg_highlands, IMAGES.ines_barrel],
    character: ['Jahrmarktszuckerwatte', 'Bourbon-Vanille', 'Weißer Jasmin', 'Mürbeteig & Meersalz'],
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

  // -------------------------------------------------------------
  // AUSVERKAUFTE ALTE ABFÜLLUNGEN (TOMATIN 16 & ARDMORE 11)
  // -------------------------------------------------------------
  {
    id: 'tomatin-16',
    name: 'Tomatin 16 Jahre',
    fullName: 'Tomatin 16 Jahre 53,2% Peated Expression matured in a Bourbon Barrel 08/25',
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
    isAvailable: false,
    isUpcoming: false,
    isFeatured: false,
    badge: 'Ausverkauft · Sammler-Archiv',
    bottlesTotal: 214,
    bottlesRemaining: 0,
    image: IMAGES.tomatin_label,
    cutoutImage: IMAGES.tomatin,
    cardBg: IMAGES.card_bg_highlands,
    galleryImages: [IMAGES.tomatin_label, IMAGES.tomatin, IMAGES.card_bg_highlands, IMAGES.ines_barrel],
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
    isUpcoming: false,
    isFeatured: false,
    badge: 'Ausverkauft · Sammler-Archiv',
    bottlesTotal: 109,
    bottlesRemaining: 0,
    image: IMAGES.ardmore_label,
    cutoutImage: IMAGES.ardmore,
    cardBg: IMAGES.card_bg_highlands,
    galleryImages: [IMAGES.ardmore_label, IMAGES.ardmore, IMAGES.card_bg_highlands, IMAGES.mission],
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
  },

  // -------------------------------------------------------------
  // 4 NEUE FÄSSER (RELEASE AB 17. SEPTEMBER 2026 · VORABZUGRIFF)
  // -------------------------------------------------------------
  {
    id: 'glenburgie-11',
    name: 'Glenburgie 11 Jahre',
    fullName: 'Glenburgie 11 Jahre 59,2% 1st Fill Oloroso Barrique 2015/2026',
    region: 'Speyside',
    distillery: 'Glenburgie Distillery',
    distilleryLocation: 'Alves, Morayshire, Speyside',
    age: '11 Jahre',
    abv: '59,2% vol.',
    vintage: '2015 / 2026',
    caskType: '1st Fill Oloroso Barrique',
    caskNumber: 'Cask 308 of 309',
    price: 139.90,
    originalPrice: null,
    pricePerLiter: '199,86 € / l',
    isAvailable: false,
    isUpcoming: true,
    releaseDate: '17. September 2026',
    badge: 'Release am 17. September · Vorabzugriff',
    bottlesTotal: 309,
    bottlesRemaining: 309,
    image: IMAGES.glenburgie_11,
    cutoutImage: IMAGES.glenburgie_11,
    cardBg: IMAGES.card_bg_highlands,
    galleryImages: [IMAGES.glenburgie_11, IMAGES.card_bg_highlands, IMAGES.scotland_distillery, IMAGES.ines_barrel],
    character: ['Dunkle Oloroso-Rosinen', 'Getrocknete Feigen', 'Geröstete Haselnüsse', 'Warme Eichenholzwürze'],
    intro: 'Ein opulenter Speyside-Klassiker in nativer Fassstärke. Über 11 Jahre unberührt in einem handverlesenen First Fill Oloroso Barrique gereift – mit dichter Mahagonifarbe, tiefen Trockenfruchtaromen und samtig-nussigem Schmelz.',
    history: {
      headline: 'Das verborgene Juwel von Morayshire',
      text: 'Gegründet 1810 nahe Alves, gehört Glenburgie zu den traditionsreichsten Brennereien der Speyside. Bekannt für ihre fruchtige und honigsüße Destillat-DNA, entfaltet dieser Single Malt durch die 11-jährige Vollreifung im First Fill Oloroso Barrique eine spektakuläre Komplexität ohne jeglichen Verschnitt.',
      image: IMAGES.scotland_distillery
    },
    tastingNotes: {
      nose: 'Intensive Oloroso-Schokolade, sonnengetrocknete Sultaninen, reife dunkle Feigen, kandierte Orangenschale und geröstete Haselnüsse.',
      palate: 'Mächtiger Antritt bei 59,2% vol., samtige Dattelsüße, cremiges Toffee, feine Zedernholznoten und edle Sherry-Gewürze.',
      finish: 'Außerordentlich langanhaltend, wärmend und tief mit anhaltender Zartbitterschokolade und samtigen Holztanninen.'
    },
    sustainability: {
      headline: 'Wasserkreislauf am Burgie Hill & Regionale Gerste',
      story: 'Glenburgie bezieht sein reines Brauwasser aus den geschützten Quellen der nahen Burgie Hills. Die Abwärme der Brennblasen wird über moderne Wärmetauscher rückgeführt, um den Primärenergiebedarf signifikant zu senken. Das Audit vor Ort bestätigte 100% sortenreine schottische Gerste.',
      image: IMAGES.ines_barrel
    }
  },
  {
    id: 'fettercairn-15',
    name: 'Fettercairn 15 Jahre',
    fullName: 'Fettercairn 15 Jahre 59,9% 1st Fill Rivesaltes Barrique 2011/2026',
    region: 'Highlands',
    distillery: 'Fettercairn Distillery',
    distilleryLocation: 'Fettercairn, Laurencekirk, Aberdeenshire',
    age: '15 Jahre',
    abv: '59,9% vol.',
    vintage: '2011 / 2026',
    caskType: '1st Fill Rivesaltes Barrique',
    caskNumber: 'Cask 302 of 302',
    price: 169.90,
    originalPrice: null,
    pricePerLiter: '242,71 € / l',
    isAvailable: false,
    isUpcoming: true,
    releaseDate: '17. September 2026',
    badge: 'Release am 17. September · Vorabzugriff',
    bottlesTotal: 302,
    bottlesRemaining: 302,
    image: IMAGES.fettercairn_15,
    cutoutImage: IMAGES.fettercairn_15,
    cardBg: IMAGES.card_bg_highlands,
    galleryImages: [IMAGES.fettercairn_15, IMAGES.card_bg_highlands, IMAGES.scotland_travel, IMAGES.ines_barrel],
    character: ['Kandierte Aprikosen', 'Rivesaltes-Süßwein', 'Sizilianische Blutorange', 'Frische Muskatblüte'],
    intro: 'Aus der legendären Highland-Brennerei am Fuße der Grampian Mountains mit den weltweit einzigartigen Wasserkühlringen. Vollständig gereift in einem First Fill Barrique des französischen Edel-Süßweins Rivesaltes bei imposanten 59,9% vol.',
    history: {
      headline: 'Die legendären Kühlringe der Cairngorms',
      text: 'Fettercairn kühlt den Hals seiner Kupferbrennblasen von außen mit eiskaltem Bergquellwasser ab. Dieser extreme Kupferkontakt erzeugt einen unvergleichlich feinen, tropisch-floralen Rohbrand. In der Kombination mit einem edlen First Fill Rivesaltes Barrique aus Südfrankreich entstand eine atemberaubende Geschmackssymbiose.',
      image: IMAGES.scotland_travel
    },
    tastingNotes: {
      nose: 'Reife Nektarinen, kandierte Aprikose, zarter Waldblütenhonig, süßer französischer Vin Doux Naturel und feines Butter-Shortbread.',
      palate: 'Cremig und druckvoll mit 59,9% vol., saftige Blutorange, Maracuja-Creme, Toffee und eine subtile Würze von Muskatblüte und Nelke.',
      finish: 'Sehr elegant, mineralisch-frisch und mit langem, süßfruchtigem Nachhall.'
    },
    sustainability: {
      headline: 'Wasserkreislauf der Cairngorms & Lokale Aufforstung',
      story: 'Das für die legendären Kühlringe genutzte Quellwasser wird in einem geschlossenen, natürlichen Beckensystem abgekühlt und wiederverwendet. Fettercairn pflanzte vor Ort einen eigenen Wald aus schottischer Stieleiche für zukünftige Fass-Generationen.',
      image: IMAGES.ines_islay
    }
  },
  {
    id: 'aultmore-17',
    name: 'Aultmore 17 Jahre',
    fullName: 'Aultmore 17 Jahre 54,5% Red Wine Barrique Finish 2009/2026',
    region: 'Speyside',
    distillery: 'Aultmore Distillery',
    distilleryLocation: 'Keith, Banffshire, Speyside',
    age: '17 Jahre',
    abv: '54,5% vol.',
    vintage: '2009 / 2026',
    caskType: 'Finished in a Red Wine Barrique',
    caskNumber: 'Cask 156 of 156',
    price: 189.90,
    originalPrice: null,
    pricePerLiter: '271,29 € / l',
    isAvailable: false,
    isUpcoming: true,
    releaseDate: '17. September 2026',
    badge: 'Release am 17. September · Nur 156 Flaschen',
    bottlesTotal: 156,
    bottlesRemaining: 156,
    image: IMAGES.aultmore_17,
    cutoutImage: IMAGES.aultmore_17,
    cardBg: IMAGES.card_bg_highlands,
    galleryImages: [IMAGES.aultmore_17, IMAGES.card_bg_highlands, IMAGES.scotland_coast, IMAGES.mission],
    character: ['Dunkle Waldbeeren', 'Samtige Weintannine', 'Reife Brombeere', 'Französische Eiche'],
    intro: 'Aus dem geheimnisvollen „Foggie Moss“ bei Keith. Mit nur 156 handnummerierten Flaschen die seltenste Abfüllung dieses Herbstes. 17 Jahre Reife, vollendet in einem edlen französischen Rotwein-Barrique, verleihen diesem Single Malt ein tiefes rubingoldenes Funkeln.',
    history: {
      headline: 'Die Reinheit des Foggie Moss',
      text: 'Gegründet 1897 von Alexander Edward, galt Aultmore („der große Brand“) unter Kennern schon immer als „Top Dressing“. Die Brennerei liegt abgelegen im nebligen Moorland. Das durch dichten Torf und Heidekraut gefilterte Wasser des Auchinderran Burn verleiht dem Destillat eine kristalline Kräuterfrische, die durch das Rotweinfass meisterhaft abgerundet wird.',
      image: IMAGES.scotland_coast
    },
    tastingNotes: {
      nose: 'Schwarze Johannisbeere (Cassis), reife Wald-Brombeeren, feines Rosenholz, Bourbon-Vanille und edle Kakaobohne.',
      palate: 'Seidig-ölig auf der Zunge, delikate samtige Rotweintannine, Kirschkompott, feines Leder und zarte Nelkenwürze.',
      finish: 'Langanhaltend, trocken-elegant mit Noten von herber Zartbitterschokolade und roten Sommerfrüchten.'
    },
    sustainability: {
      headline: 'Moorschutz im Foggie Moss & Biodiversität',
      story: 'Das Quellgebiet des Foggie Moss steht unter strengem Naturschutz. Aultmore arbeitet aktiv an der Renaturierung der umgebenden Torfmoore mit, um CO₂ dauerhaft im Boden zu binden und das natürliche Ökosystem zu schützen.',
      image: IMAGES.mission
    }
  },
  {
    id: 'highlandpark-18',
    name: 'Highland Park 18 Jahre',
    fullName: 'Highland Park 18 Jahre 54,3% Fully Matured in a Bourbon Barrel 2007/2026',
    region: 'Islands',
    distillery: 'Highland Park Distillery',
    distilleryLocation: 'Kirkwall, Orkney Islands',
    age: '18 Jahre',
    abv: '54,3% vol.',
    vintage: '2007 / 2026',
    caskType: 'Fully Matured in a Bourbon Barrel',
    caskNumber: 'Cask 240 of 240',
    price: 219.90,
    originalPrice: null,
    pricePerLiter: '314,14 € / l',
    isAvailable: false,
    isUpcoming: true,
    releaseDate: '17. September 2026',
    badge: 'Release am 17. September · Orkney Single Cask',
    bottlesTotal: 240,
    bottlesRemaining: 240,
    image: IMAGES.highlandpark_18,
    cutoutImage: IMAGES.highlandpark_18,
    cardBg: IMAGES.card_bg_islands,
    galleryImages: [IMAGES.highlandpark_18, IMAGES.card_bg_islands, IMAGES.tasting_springbank, IMAGES.ines_barrel],
    character: ['Heidetorf-Rauch', 'Bienenwachs', 'Meersalz-Gischt', 'Bourbon-Vanillemark'],
    intro: 'Von den windgepeitschten Orkney-Inseln. 18 lange Jahre unberührt gereift in einem erstbefüllten Bourbon Barrel. Der unverwechselbare Hobbister Moor-Heidetorf verleiht diesem seltenen Einzelfass eine maritime, florale Rauchigkeit von monumentaler Tiefe.',
    history: {
      headline: 'Wikinger-Erbe & der Hobbister-Moor-Torf',
      text: 'Highland Park brennt seit 1798 auf Orkney und ist eine der letzten Brennereien, die ihr Malz auf traditionellen Floor Maltings noch selbst wendet. Der hier verwendete Torf stammt aus dem Hobbister Moor – baumlos, dafür reich an jahrhundertealtem Heidekraut. Das Ergebnis ist kein beißender Rauch wie auf Islay, sondern ein sanfter, floral-aromatischer Heideduft.',
      image: IMAGES.tasting_springbank
    },
    tastingNotes: {
      nose: 'Sanfter, süßer Heidetorfrauch, cremiges Bourbon-Vanillemark, Bienenwachs, blühendes Heidekraut und frische Meeresbrise.',
      palate: 'Ölig und vielschichtig bei 54,3% vol., reife Birne, getoastete Eiche, salziges Butter-Karamell und eine wärmende Torfglut.',
      finish: 'Monumental lang, maritim und trocken mit feinem Rauch und anhaltendem Honigwachs-Aroma.'
    },
    sustainability: {
      headline: 'Handwerklicher Torfabbau & Windenergie auf Orkney',
      story: 'Der Torf im Hobbister Moor wird schonend und nach strengen Zyklen von Hand gestochen, sodass sich die Moorvegetation regenerieren kann. Zudem deckt die Insel Orkney über 100% ihres Strombedarfs aus erneuerbaren Wind- und Gezeitenenergien.',
      image: IMAGES.ines_barrel
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
    subtitle: 'Keine Marketingfloskel, sondern pure Sensorik & Augenhöhe',
    image: IMAGES.frauenperspektive,
    quote: '„Frauen riechen und schmecken oft differenzierter – doch in der Whiskywelt wurden sie jahrzehntelang ignoriert. Zeit für einen echten Perspektivwechsel.“',
    paragraphs: [
      'Whisky galt lange Zeit als reine Männerdomäne mit dunklen Ledersesseln und schwerem Zigarrenrauch. Eine klischeehafte Vorstellung, die an der Realität längst vorbeigeht. Wissenschaftliche Studien zeigen, dass Frauen oft über einen sensibleren Geruchssinn und eine feinere Nuancierung bei Aromen verfügen.',
      'PURE.WHISKY. steht für einen modernen, sensorisch anspruchsvollen Zugang zu Single Cask Whiskys. Ich wähle Fässer nicht nach Alkoholprozenten oder wuchtigen Marketing-Storys aus, sondern nach Textur, Eleganz, Aromenvielfalt und Trinkfluss.',
      'Es geht nicht um „Frauen-Whisky“, sondern um Augenhöhe, Respekt vor dem Handwerk und das Aufbrechen überholter Branchenmuster. Jede Flasche lädt dazu ein, Whisky völlig unvoreingenommen neu zu entdecken.'
    ]
  },
  {
    id: 'mission',
    title: 'Unsere Mission',
    tag: 'Das Versprechen',
    subtitle: '100% Circular Craft & Umwelt-Juristisches Gewissen',
    image: IMAGES.mission,
    quote: '„Als Umweltjuristin kann ich nicht anders: Jedes Fass, jedes Glas und jedes Etikett muss strengsten ökologischen Standards standhalten.“',
    paragraphs: [
      'Die schottische Whisky-Industrie steht vor gewaltigen ökologischen Herausforderungen – von hohem Wasserverbrauch bis zu CO₂-intensiven Transportwegen. Als Juristin für Umwelt- und Energierecht kenne ich die gesetzlichen Hebel und die praktischen Hürden.',
      'Deshalb wähle ich ausschließlich Brennereien aus, die aktiv in erneuerbare Energien (wie Biomasse bei Tomatin oder Abwärmenutzung bei Glenburgie), Quellenschutz und geschlossene Wasserkreisläufe investieren.',
      'Auch bei der Verpackung gehe ich keine Kompromisse ein: 100% recyceltes Wild Glass aus Spanien, unlackierter Naturkork, kompostierbare Biopolymer-Kapseln und handgeschöpftes Saatenpapier mit Wildblumen-Samen. Luxus darf keinen Raubbau an der Natur bedeuten.'
    ]
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'Fass-Audits im Foggie Moss & Morayshire: Erste Proben der Herbst-Releases',
    date: '02. Sep. 2026',
    category: 'Messe',
    author: 'Ines Zager',
    image: IMAGES.scotland_distillery,
    images: [
      IMAGES.scotland_distillery,
      IMAGES.ines_barrel,
      IMAGES.scotland_coast
    ],
    videoUrl: '',
    excerpt: 'Direkt aus den schottischen Highlands: Exklusive Einblicke in die Fassproben für den Release am 17. September 2026 – von Glenburgie bis Highland Park.',
    content: `Liebe Whisky-Freunde,

in den letzten zwei Wochen war ich wieder intensiv in Schottland unterwegs. Mein Weg führte mich von den geschützten Tälern von Morayshire über das neblige Foggie Moss bis hinauf zu den rauen Orkney-Inseln. 

Dort habe ich vier außergewöhnliche Einzelfässer auditiert und für unsere Herbst-Zuteilung am 17. September 2026 versiegelt:

1. Ein vollmundiges Glenburgie 11 Jahre First Fill Oloroso Barrique (59,2% vol.) mit intensiven Rosinen- und Schokoladennoten.
2. Ein tropisch-fruchtiges Fettercairn 15 Jahre Rivesaltes Barrique (59,9% vol.), gekühlt mit dem legendären Cairngorms-Quellwasser.
3. Ein seltenes Aultmore 17 Jahre im Red Wine Barrique Finish (54,5% vol.) mit nur 156 Flaschen.
4. Ein monumentales Highland Park 18 Jahre First Fill Bourbon Barrel (54,3% vol.) mit maritimem Heidetorf.

Jedes Fass wurde vor Ort auf Quellenschutz, Reifung und aromatische Balance geprüft. Der Vorab-Zugriff für unser Fass-Depot startet pünktlich am 17. September.`
  },
  {
    id: 2,
    title: 'PURE.WHISKY. auf der Bottle Market Bremen & InterWhisky Wiesbaden',
    date: '28. Aug. 2026',
    category: 'Messe',
    author: 'Ines Zager',
    image: IMAGES.messe_bottlemarket,
    images: [
      IMAGES.messe_bottlemarket,
      IMAGES.messe_interwhisky,
      IMAGES.andre_session
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    excerpt: 'Treffen Sie mich persönlich im November auf der Messe Bremen und im Dezember in Wiesbaden. Mit dabei: Unsere neuen Einzelfass-Abfüllungen.',
    content: `Der persönliche Austausch mit Ihnen ist mir das Wichtigste. Nach Monaten der Fasssuche und sensorischen Prüfungen freue ich mich riesig darauf, Ihnen die neuen Abfüllungen persönlich einzuschenken.

Besuchen Sie mich an folgenden Terminen:
• Bottle Market Bremen (Halle 7, Stand C-14): 18. – 20. November 2026
• InterWhisky Wiesbaden (Kurhaus Wiesbaden): 02. – 04. Dezember 2026

Bringen Sie Zeit und Neugier mit. Ich freue mich auf intensive Fachgespräche über Fassstärken, Holzarten und nachhaltigen Brennereibetrieb.`
  },
  {
    id: 3,
    title: 'Frauen im Whisky: Masterclass mit Rachel Vaughn Jones (Compass Box)',
    date: '15. Aug. 2026',
    category: 'Tasting',
    author: 'Ines Zager',
    image: IMAGES.tasting_springbank,
    images: [
      IMAGES.tasting_springbank,
      IMAGES.ines_portrait,
      IMAGES.frauenperspektive
    ],
    videoUrl: '',
    excerpt: 'Über die OurWhisky Foundation durfte ich eine intensive Mentoring-Session mit Rachel Vaughn Jones in Glasgow erleben.',
    content: `Als Mentee der renommierten weltweiten OurWhisky Foundation hatte ich das Privileg, mehrere Tage mit Rachel Vaughn Jones, Marketing Director der innovativen Blend-Pioniere Compass Box, zusammenzuarbeiten.

Wir sprachen ausführlich über sensorische Schwellenwerte, das Vertrauen in den eigenen Gaumen und die Bedeutung von 100% Transparenz bei Single Cask Abfüllungen.

Diese wertvollen Impulse fließen unmittelbar in jede Fassauswahl von PURE.WHISKY. ein.`
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
