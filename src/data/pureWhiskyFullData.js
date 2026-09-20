
export const R2_BASE = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/';

export const IMAGES = {
  logo: `${R2_BASE}logo-pure-whisky.png`,
  hero_back: `${R2_BASE}Hero%20Back%20Pure%20Whisky_ergebnis.webp`,
  hero_artwork: `${R2_BASE}Pure-Whisky-Hero_01.webp`,
  
  // Specific Regional Backgrounds requested by user:
  card_bg_speyside: `${R2_BASE}Pure-Whisky-Hintergrund_01.webp`,
  card_bg_highlands: `${R2_BASE}Pure-Whisky-Fass_01_1.webp`,
  card_bg_islands: `${R2_BASE}Pure-Whisky-bILDER07.webp`,
  
  // Tasting Photo requested by user for new casks & sustainability:
  ines_testing: `${R2_BASE}Pure-Whisky-Testing.jpg`,
  
  // -------------------------------------------------------------
  // THE 4 ORIGINAL CASKS - VERIFIED CUT-OUT BOTTLES:
  // Pure-Whisky01 = Ardmore 11 (56.7%)
  // Pure-Whisky02 = Tomatin 16 (53.2%)
  // Pure-Whisky03 = Glen Garioch 11 (56.5%)
  // Pure-Whisky04 = Jura 15 (53.9%)
  // -------------------------------------------------------------
  ardmore: `${R2_BASE}Produkte/Pure-Whisky01.webp`,
  tomatin: `${R2_BASE}Produkte/Pure-Whisky02.webp`,
  glengarioch: `${R2_BASE}Produkte/Pure-Whisky03.webp`,
  jura: `${R2_BASE}Produkte/Pure-Whisky04.webp`,

  // Realistic In-Situ Photos
  jura_new: `${R2_BASE}Produkte/20241014_124522_04.webp`,
  glengarioch_new: `${R2_BASE}Produkte/20241014_124302_03.webp`,

  // Outdoor Full-Bottle Photos
  tomatin_label: `${R2_BASE}flasche-tomatin-16-jahre-full.webp`,
  jura_label: `${R2_BASE}flasche-jura-15-jahre-full.webp`,
  glengarioch_label: `${R2_BASE}flasche-glengarioch-11-jahre-full.webp`,
  ardmore_label: `${R2_BASE}flasche-ardmore-11-jahre-full.webp`,

  // -------------------------------------------------------------
  // 4 NEW CASKS - TRANSPARENT CUT-OUT BOTTLES (HERO & SHOP CARDS)
  // -------------------------------------------------------------
  glenburgie_11_cutout: `${R2_BASE}Produkte-2026/Pure-Whisky-Fass_01.webp`,
  fettercairn_15_cutout: `${R2_BASE}Produkte-2026/Pure-Whisky-Fass_02.webp`,
  aultmore_17_cutout: `${R2_BASE}Produkte-2026/Pure-Whisky-Fass_03.webp`,
  highlandpark_18_cutout: `${R2_BASE}Produkte-2026/Pure-Whisky-Fass_04.webp`,

  // Atmospheric Barrel Photos
  glenburgie_11_barrel: `${R2_BASE}Produkte-2026/Single-Malt-Scotch-Whisky11Y_11.webp`,
  fettercairn_15_barrel: `${R2_BASE}Produkte-2026/Single-Malt-Scotch-Whisky15Y_12.webp`,
  aultmore_17_barrel: `${R2_BASE}Produkte-2026/Single-Malt-Scotch-Whisky17Y_13.webp`,
  highlandpark_18_barrel: `${R2_BASE}Produkte-2026/Single-Malt-Scotch-Whisky18Y_14.webp`,

  ines_portrait: `${R2_BASE}ines-zager-schottland-portrait.webp`,
  ines_barrel: `${R2_BASE}ines-zager-fass-lager.webp`,
  ines_barrel_home: `${R2_BASE}Pure-Whisky-bILDER04.webp`,
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
  // 4 NEUE ABFÜLLUNGEN (JETZT ERHÄLTLICH · RELEASE SEPTEMBER 2026)
  // MIT TRANSPARENTEN FLASCHEN FÜR DEN SHOP UND REGIONS-HINTERGRÜNDEN
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
    caskNumber: '#Z15/63004',
    price: 104.90,
    originalPrice: null,
    pricePerLiter: '149,86 € / l',
    isAvailable: true,
    isUpcoming: false,
    isNew: true,
    releaseDate: '17. September 2026',
    badge: 'Neu erhältlich · Sofort lieferbar',
    bottlesTotal: 309,
    bottlesRemaining: 309,
    image: IMAGES.glenburgie_11_cutout,
    cutoutImage: IMAGES.glenburgie_11_cutout,
    cardBg: IMAGES.card_bg_speyside,
    galleryImages: [IMAGES.glenburgie_11_cutout, IMAGES.glenburgie_11_barrel, IMAGES.card_bg_speyside, IMAGES.ines_testing],
    character: ['Dunkle Oloroso-Rosinen', 'Getrocknete Feigen', 'Geröstete Haselnüsse', 'Warme Eichenholzwürze'],
    intro: 'Klassischer Oldschool-Sherrywhisky mit einem Spritzer Zitrusfrische. Fruchtige Süße, Schokolade und Haselnuss verbinden sich mit einer angenehmen Würze und geben dem 11-jährigen viel Tiefe.',
    history: {
      headline: 'Das verborgene Juwel von Morayshire',
      text: 'Gegründet 1810 nahe Alves, gehört Glenburgie zu den traditionsreichsten Brennereien der Speyside. Bekannt für ihre fruchtige und honigsüße Destillat-DNA, entfaltet dieser Single Malt durch die 11-jährige Vollreifung im First Fill Oloroso Barrique eine spektakuläre Komplexität ohne jeglichen Verschnitt.',
      image: IMAGES.scotland_distillery
    },
    tastingNotes: {
      nose: 'Klassiche Sherryaromen mit Rosinen, dunklen Kirschen und getrockneten Pflaumen. Dazu kommt eine angenehme Buttrigkeit mit etwas Limttenfrische. Süßes Malz, Vanille und dunkles Karamell sorgen für eine cremige Basis, während sich im Hintergrund dezente Nuss- und Gewürznoten zeigen.',
      palate: 'Vollmundig und intensiv. Dunkle Trockenfrüchte, Pflaumenmus und Sauerkirsche treffen auf Schokolade, Toffee und braunen Zucker. Dazu gesellen sich geröstete Mandeln, Zimt und eine feine Pfefferschärfe und frische grüne Zitrusnoten.',
      finish: 'Lang und wärmend mit Rosinen, dunkler Schokolade und Orangeat. Gegen Ende etwas trockener mit gerösteten Nüssen einer angenehmen Gewürznote.'
    },
    sustainability: {
      headline: 'Wasserkreislauf am Burgie Hill & Regionale Gerste',
      story: 'Glenburgie bezieht sein reines Brauwasser aus den geschützten Quellen der nahen Burgie Hills. Die Abwärme der Brennblasen wird über moderne Wärmetauscher rückgeführt, um den Primärenergiebedarf signifikant zu senken. Die Prüfung vor Ort bestätigte 100% sortenreine schottische Gerste.',
      image: IMAGES.ines_testing
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
    caskNumber: '#Z11/78005',
    price: 119.90,
    originalPrice: null,
    pricePerLiter: '171,29 € / l',
    isAvailable: true,
    isUpcoming: false,
    isNew: true,
    releaseDate: '17. September 2026',
    badge: 'Neu erhältlich · Sofort lieferbar',
    bottlesTotal: 302,
    bottlesRemaining: 302,
    image: IMAGES.fettercairn_15_cutout,
    cutoutImage: IMAGES.fettercairn_15_cutout,
    cardBg: IMAGES.card_bg_highlands,
    galleryImages: [IMAGES.fettercairn_15_cutout, IMAGES.fettercairn_15_barrel, IMAGES.card_bg_highlands, IMAGES.ines_testing],
    character: ['Kandierte Aprikosen', 'Rivesaltes-Süßwein', 'Sizilianische Blutorange', 'Frische Muskatblüte'],
    intro: 'Ein opulenter, likörig-fruchtiger Fettercairn, bei dem der Rivesaltes seine leichten Schokoladennoten mit dem Kokos des Fettercairn verbindet und so an eine bekannte Süßigkeit erinnert.',
    history: {
      headline: 'Die legendären Kühlringe der Cairngorms',
      text: 'Fettercairn kühlt den Hals seiner Kupferbrennblasen von außen mit eiskaltem Bergquellwasser ab. Dieser extreme Kupferkontakt erzeugt einen unvergleichlich feinen, tropisch-floralen Rohbrand. In der Kombination mit einem edlen First Fill Rivesaltes Barrique aus Südfrankreich entstand eine atemberaubende Geschmackssymbiose.',
      image: IMAGES.scotland_distillery
    },
    tastingNotes: {
      nose: 'Reife gelbe Pflaumen, dazu Rosinen und kandierte Orangenschale. Süße Honig- und Karamellnoten verbinden sich mit feiner Vanille und nussiger Würze. Im Hintergrund etwas Holz und dunkler Honig.',
      palate: 'Aprikosenmarmelade, trifft auf Toffee, Vanille und Milchschokolade. Dazu gesellen sich Orangenzeste, Kokos und eine feinsäuerliche, weinige Würze. Die Rivesaltes-Vollreifung verleiht ihm eine üppige, dessertartige Süße mit viel Tiefe.',
      finish: 'Lang und wärmend mit Schokolade, Honig und karamellisierter Orange. Etwas Eichenwürze und eine leicht nussige Trockenheit sorgen gegen Ende für Balance.'
    },
    sustainability: {
      headline: 'Wasserkreislauf der Cairngorms & Lokale Aufforstung',
      story: 'Das für die legendären Kühlringe genutzte Quellwasser wird in einem geschlossenen, natürlichen Beckensystem abgekühlt und wiederverwendet. Fettercairn pflanzte vor Ort einen eigenen Wald aus schottischer Stieleiche für zukünftige Fass-Generationen.',
      image: IMAGES.ines_testing
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
    caskNumber: '#302991',
    price: 109.90,
    originalPrice: null,
    pricePerLiter: '157,00 € / l',
    isAvailable: true,
    isUpcoming: false,
    isNew: true,
    releaseDate: '17. September 2026',
    badge: 'Neu erhältlich · Nur 156 Flaschen',
    bottlesTotal: 156,
    bottlesRemaining: 156,
    image: IMAGES.aultmore_17_cutout,
    cutoutImage: IMAGES.aultmore_17_cutout,
    cardBg: IMAGES.card_bg_speyside,
    galleryImages: [IMAGES.aultmore_17_cutout, IMAGES.aultmore_17_barrel, IMAGES.card_bg_speyside, IMAGES.ines_testing],
    character: ['Dunkle Waldbeeren', 'Samtige Weintannine', 'Reife Brombeere', 'Französische Eiche'],
    intro: 'Ein eleganter, fruchtbetonter Aultmore, bei dem das Rotweinfass für zusätzliche Tiefe, Beerenfrucht und Würze sorgt, ohne den heidehonigartigen Aultmore-Charakter zu überdecken.',
    history: {
      headline: 'Die Reinheit des Foggie Moss',
      text: 'Gegründet 1897 von Alexander Edward, galt Aultmore („der große Brand“) unter Kennern schon immer als „Top Dressing“. Die Brennerei liegt abgelegen im nebligen Moorland. Das durch dichten Torf und Heidekraut gefilterte Wasser des Auchinderran Burn verleiht dem Destillat eine kristalline Kräuterfrische, die durch das Rotweinfass meisterhaft abgerundet wird.',
      image: IMAGES.scotland_coast
    },
    tastingNotes: {
      nose: 'Fast pappsüß im ersten Eindruck. Bald treffen dann reife dunkle Beeren, Kirschen und Pflaumen auf die typische Aultmore-Charakteristik von Honig, Heu und leicht grasigen Noten. Dazu gesellen sich Vanille, etwas dunkle Schokolade und warme Gewürze.',
      palate: 'Cremig und vollmundig. Rote Trauben, Himbeeren und Sauerkirschen verbinden sich mit Toffee, Malz und Vanille. Dahinter zeigen sich würzige, herbere Noten von Holz und Leder. Die Rotweinfassreifung bringt eine angenehme Fruchtigkeit und leichte Tanninstruktur.',
      finish: 'Mittellang bis lang, warm und sehr würzig. Karamell, Trockenfrüchte und rote Beeren bleiben präsent, begleitet von etwas Eichenwürze und einer feinen, trockenen Rotwein-Note.'
    },
    sustainability: {
      headline: 'Moorschutz im Foggie Moss & Biodiversität',
      story: 'Das Quellgebiet des Foggie Moss steht unter strengem Naturschutz. Aultmore arbeitet aktiv an der Renaturierung der umgebenden Torfmoore mit, um CO₂ dauerhaft im Boden zu binden und das natürliche Ökosystem zu schützen.',
      image: IMAGES.ines_testing
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
    caskNumber: '#800429',
    price: 119.90,
    originalPrice: null,
    pricePerLiter: '171,29 € / l',
    isAvailable: true,
    isUpcoming: false,
    isNew: true,
    releaseDate: '17. September 2026',
    badge: 'Neu erhältlich · Orkney Single Cask',
    bottlesTotal: 210,
    bottlesRemaining: 210,
    image: IMAGES.highlandpark_18_cutout,
    cutoutImage: IMAGES.highlandpark_18_cutout,
    cardBg: IMAGES.card_bg_islands,
    galleryImages: [IMAGES.highlandpark_18_cutout, IMAGES.highlandpark_18_barrel, IMAGES.card_bg_islands, IMAGES.ines_testing],
    character: ['Heidetorf-Rauch', 'Bienenwachs', 'Meersalz-Gischt', 'Bourbon-Vanillemark'],
    intro: 'Ein ausgewogener Highland Park, bei dem das Bourbon-Fass die cremige, vanillige Seite betonen. Die charakteristische Kombination aus Heidekraut, Honigsüße und sanftem Rauch sorgt für die typische Orkney-DNA.',
    history: {
      headline: 'Wikinger-Erbe & der Hobbister-Moor-Torf',
      text: 'Highland Park brennt seit 1798 auf Orkney und ist eine der letzten Brennereien, die ihr Malz auf traditionellen Floor Maltings noch selbst wendet. Der hier verwendete Torf stammt aus dem Hobbister Moor – baumlos, dafür reich an jahrhundertealtem Heidekraut. Das Ergebnis ist kein beißender Rauch wie auf Islay, sondern ein sanfter, floral-aromatischer Heideduft.',
      image: IMAGES.tasting_springbank
    },
    tastingNotes: {
      nose: 'Honig, Vanille und cremiges Karamell treffen auf reife Birnen und gelbe Früchte. Dazu feine Heidekrautnoten, etwas Orangenabrieb und eine dezente, elegante Rauchigkeit. Im Hintergrund süßes Malz und leicht würzige Eiche.',
      palate: 'Klassisch Highland Park mit Vanillecreme, Honig und Toffee. Dazu kommen grüne Birne, Trockenkräuter, Bratapfel und etwas Zitrusfrucht. Der typische Highland-Park-Rauch bleibt eher im Hintergrund und verbindet sich mit Heidekraut, Malz und einer milden Pfeffernote. Das Bourbonfass bringt vor allem Vanille, Süße und weiche Holzwürze.',
      finish: 'Lang, warm und harmonisch. Honig, Vanille und Malz bleiben präsent, begleitet von trockenem Heidekraut, dezenter Eiche und einem feinen, leicht salzigen Rauch.'
    },
    sustainability: {
      headline: 'Handwerklicher Torfabbau & Windenergie auf Orkney',
      story: 'Der Torf im Hobbister Moor wird schonend und nach strengen Zyklen von Hand gestochen, sodass sich die Moorvegetation regenerieren kann. Zudem deckt die Insel Orkney über 100% ihres Strombedarfs aus erneuerbaren Wind- und Gezeitenenergien.',
      image: IMAGES.ines_testing
    }
  },

  // -------------------------------------------------------------
  // WEITERE VORRÄTIGE ABFÜLLUNGEN (JURA 15 & GLEN GARIOCH 11)
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
    isNew: false,
    isFeatured: true,
    badge: 'Sofort lieferbar · 8% Vorteil',
    bottlesTotal: 247,
    bottlesRemaining: 34,
    image: IMAGES.jura,
    cutoutImage: IMAGES.jura,
    cardBg: IMAGES.card_bg_islands,
    galleryImages: [IMAGES.jura, IMAGES.jura_new, IMAGES.card_bg_islands, IMAGES.ines_islay],
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
      story: 'Als Brennerei Jura 1963 neu aufgebaut wurde, verhinderte sie die vollständige Entvölkerung der Insel. Bis heute sichert die Destillerie das wirtschaftliche Rückgrat der Inselbevölkerung. Bei meinem Besuch stand neben dem Quellenschutz vor allem die regionale Wertschöpfung im Fokus.',
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
    isNew: false,
    isFeatured: true,
    badge: 'Bestseller · Sofort lieferbar',
    bottlesTotal: 237,
    bottlesRemaining: 18,
    image: IMAGES.glengarioch,
    cutoutImage: IMAGES.glengarioch,
    cardBg: IMAGES.card_bg_highlands,
    galleryImages: [IMAGES.glengarioch, IMAGES.glengarioch_new, IMAGES.card_bg_highlands, IMAGES.ines_testing],
    character: ['Jahrmarktszuckerwatte', 'Bourbon-Vanille', 'Weißer Jasmin', 'Mürbeteig & Meersalz'],
    intro: 'Aus einer der ältesten funktionierenden Brennereien Schottlands (gegründet 1797). Dieser 11-jährige Single Malt besticht durch seine explosive Wucht von 56,5% vol. und ein bezaubernd süßes Mürbeteig- und Blütenaroma.',
    history: {
      headline: 'Die historische Kornkammer von Aberdeenshire',
      text: 'Glen Garioch liegt mitten im "Valley of the Garioch", das seit Jahrhunderten für die beste Braugerste Schottlands berühmt ist. Die Brennerei setzt auf traditionelle, schwere Kupferbrennblasen und direkte Kühlung, was dem Whisky seinen vollmundigen, wachsigen und cremigen Körper verleiht.',
      image: IMAGES.ines_testing
    },
    tastingNotes: {
      nose: 'Jahrmarktszuckerwatte, sanfte Bourbon-Vanille, blühender weißer Jasmin, süße reife Pflaume und feine Ätherik.',
      palate: 'Cremiger roher Mürbeteig, frisch gebrannte Mandeln, süß-saure Fruchtnote, untermalt von einer Prise Meersalz.',
      finish: 'Außergewöhnlich lang, wärmend, elegant und mit samtig-zuckrigem Nachklang.'
    },
    sustainability: {
      headline: 'Quellenschutz auf der Coutens Farm & Kreislauf',
      story: 'Nachdem die Brennerei in den 1960er Jahren wegen Wassermangels schließen musste, erschloss man 1972 eine geheime Quelle auf der Coutens Farm. Seitdem investiert Glen Garioch in geschlossene Kühlwasserkreisläufe, um wertvolles Grundwasser zu schonen.',
      image: IMAGES.glengarioch_new
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
    isAvailable: true,
    isUpcoming: false,
    isNew: false,
    isFeatured: true,
    badge: 'Sofort lieferbar',
    bottlesTotal: 214,
    bottlesRemaining: 48,
    image: IMAGES.tomatin,
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
      headline: 'Pionier der Energiewende & Umweltmanagement',
      story: 'Bereits 2013 installierte Tomatin als Pionier einen Holzpellet-Biomasse-Kessel, der rund 80% der gesamten Energie liefert und CO₂-Emissionen um über 80% senkt. Durch innovative Wehranlagen wurde der Wasserverbrauch halbiert, während Produktionsabwässer durch ein natürliches Schilf-Rieselfeld gereinigt werden. Ich bewerte diese Maßnahmen als vorbildlich im Sinne moderner Umweltmanagementsysteme.',
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
    isNew: false,
    isFeatured: false,
    badge: 'Ausverkauft',
    bottlesTotal: 109,
    bottlesRemaining: 0,
    soldOut: true,
    image: IMAGES.ardmore,
    cutoutImage: IMAGES.ardmore,
    cardBg: IMAGES.card_bg_highlands,
    galleryImages: [IMAGES.ardmore_label, IMAGES.ardmore, IMAGES.card_bg_highlands, IMAGES.mission],
    character: ['Lagerfeuerrauch', 'Früchtekuchen', 'Blutorange', 'Milchschokolade & Salzlakritz'],
    intro: 'Das historische Premieren-Fass von PURE.WHISKY. Gereift in einem rauchigen Ex-Laphroaig Fass mit Oloroso Sherry Veredelung – ein gesuchtes Sammlerstück, das binnen kürzester Zeit restlos ausverkauft war.',
    history: {
      headline: 'Mein persönlicher First Release',
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
    subtitle: 'Weiblich. Unabhängig. Und vor allem: ohne Dogmen.',
    image: IMAGES.frauenperspektive,
    quote: '„Was ist eigentlich eine weibliche Perspektive auf Whisky? Keine Ahnung. Und genau das ist der Punkt.“',
    paragraphs: [
      'Was ist eigentlich eine weibliche Perspektive auf Whisky? Keine Ahnung. Und genau das ist der Punkt.',
      'Ich glaube nicht an Whisky für bestimmte Zielgruppen. Nicht an Regeln, wie man ihn trinken „muss“. Und nicht daran, dass Alter, Farbe oder ein möglichst dunkles Sherryfass automatisch für Qualität stehen. Gut ist, was gefällt.',
      'PURE.WHISKY. steht für meinen persönlichen Blick auf Scotch Whisky: unabhängig, neugierig und mit einem Faible für unverfälschten Charakter. Mich interessiert die DNA einer Brennerei – und ein Fass, das sie nicht überdeckt, sondern sichtbar macht.',
      'Geprägt hat mich dabei auch die OurWhisky Foundation, die Frauen in der Whiskywelt vernetzt und fördert. Im Rahmen ihres Mentoring-Programms hatte ich das Glück, Compass Box als Mentor an meiner Seite zu haben – ein Austausch, der meinen eigenen Weg als unabhängige Abfüllerin entscheidend mitgeprägt hat.',
      'PURE.WHISKY. will Whisky nicht komplizierter machen. Sondern ehrlicher, zugänglicher und ein bisschen weniger vorhersehbar.'
    ]
  },
  {
    id: 'mission',
    title: 'Unsere Mission',
    tag: 'Das Versprechen',
    subtitle: 'Ganzheitliche Nachhaltigkeit nach EMAS & ISO 14001',
    image: IMAGES.mission,
    quote: '„Als Umweltjuristin kann ich nicht anders: Jedes Fass, jedes Glas und jedes Etikett muss strengsten ökologischen Standards standhalten.“',
    paragraphs: [
      'Die schottische Whisky-Industrie steht vor gewaltigen ökologischen Herausforderungen – von hohem Wasserverbrauch bis zu CO₂-intensiven Transportwegen. Als Juristin für Umwelt- und Energierecht kenne ich die gesetzlichen Hebel und die praktischen Hürden.',
      'Deshalb wähle ich beispielsweise Brennereien aus, die aktiv in erneuerbare Energien (wie Biomasse bei Tomatin oder Abwärmenutzung bei Glenburgie), Quellenschutz und geschlossene Wasserkreisläufe investieren.',
      'Auch bei der Verpackung gehe ich keine Kompromisse ein: recyceltes Wild Glass aus Spanien, unlackierter Naturkork, kompostierbare Biopolymer-Kapseln und handgeschöpftes Saatenpapier mit Wildblumen-Samen. Luxus darf keinen Raubbau an der Natur bedeuten.'
    ]
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'PURE.WHISKY. ist auf der InterWhisky 2024 in Wiesbaden!',
    date: '12. Nov. 2024',
    category: 'Messe',
    author: 'Ines Zager',
    image: IMAGES.messe_interwhisky,
    images: [IMAGES.messe_interwhisky],
    videoUrl: '',
    excerpt: 'Besuchen Sie uns vom 15. bis 17. November 2024 im Kurhaus Wiesbaden. Erleben Sie unsere exklusiven Single Cask Abfüllungen in Fassstärke.',
    content: `PURE.WHISKY. ist auf der InterWhisky 2024 in Wiesbaden!

Besuchen Sie uns vom 15. bis 17. November 2024 im traditionsreichen Kurhaus Wiesbaden. 

Erleben Sie unsere exklusiven Single Cask Abfüllungen in nativer Fassstärke und probieren Sie unsere ersten drei limitierten Releases persönlich vor Ort. 

Ich freue mich auf den persönlichen Austausch mit Ihnen und spannende Fachgespräche über Fassreifung, schottische Brennereien und nachhaltige Whiskyproduktion!`
  },
  {
    id: 2,
    title: 'Zu Gast bei Andre Lautensack, Whisky Evening – oder 2 Quasselstrippen unter sich',
    date: '12. Nov. 2024',
    category: 'Tasting',
    author: 'Ines Zager',
    image: IMAGES.andre_session,
    images: [IMAGES.andre_session],
    videoUrl: 'https://www.youtube.com/watch?v=N_4Z0DgVRts',
    excerpt: 'Am Montag war ich beim André Lautensack, Whisky Evening, im schönen Schleusingen in Thüringen zu Gast um die Idee hinter Pure.Whisky. vorzustellen.',
    content: `Am Montag war ich beim André Lautensack, Whisky Evening, im schönen Schleusingen in Thüringen zu Gast um die Idee hinter Pure.Whisky. vorzustellen und meine ersten Abfüllungen zu verkosten – und natürlich konnten wir beiden Quasselstrippen uns nicht kurz fassen. 🤣

Wir haben ausführlich über meine Motivation, die Unabhängigkeit als Abfüllerin, Fassstärken und das sensorische Profil der ersten Fässer gesprochen.

Schaut gerne mal rein in das vollständige Video auf YouTube: 
https://youtu.be/N_4Z0DgVRts?si=1FD11Day3vrb54vd`
  },
  {
    id: 3,
    title: 'Das erste Mal …. Messe',
    date: '12. Nov. 2024',
    category: 'Messe',
    author: 'Ines Zager',
    image: IMAGES.messe_bottlemarket,
    images: [IMAGES.messe_bottlemarket],
    videoUrl: '',
    excerpt: 'Bottlemarket Bremen 2024 It’s a wrap! Am Wochenende konnte ich das erste Mal die Idee hinter Pure.Whisky. und meine ersten 3 Abfüllungen präsentieren.',
    content: `Bottlemarket Bremen 2024 It’s a wrap!

Am Wochenende konnte ich das erste Mal die Idee hinter Pure.Whisky. und meine ersten 3 Abfüllungen auf einer Messe, dem @bottlemarket_bremen präsentieren. 

Und ich bin überwältigt über das durchgängig überragend positive Feedback für meinen kleinen Ein-Frau-Betrieb. 😊

Vielen Dank an alle, die verkostet, zugehört, nachgehakt und vor allem weiterempfohlen haben. Gerade am Samstag war ich echt gerührt von der Wirkung von Mund-zu-Mund-Propaganda.

DANKE. 🩷🫶`
  },
  {
    id: 4,
    title: 'PURE.WHISKY. ist auf dem Bottlemarket 2024!',
    date: '16. Okt. 2024',
    category: 'Messe',
    author: 'Ines Zager',
    image: IMAGES.messe_bottlemarket,
    images: [IMAGES.messe_bottlemarket],
    videoUrl: '',
    excerpt: 'Vom 18. bis 20. Oktober 2024 in der Messe Bremen: PURE.WHISKY. feiert Messe-Premiere auf dem Bottlemarket!',
    content: `PURE.WHISKY. ist auf dem Bottlemarket 2024!

Vom 18. bis 20. Oktober 2024 in der Messe Bremen. 

Kommen Sie vorbei und verkosten Sie unsere ersten Einzelfass-Abfüllungen direkt am Stand! Ich freue mich auf Ihren Besuch in Halle 7.`
  },
  {
    id: 5,
    title: 'First Release!',
    date: '11. Apr. 2024',
    category: 'Abfüllungen',
    author: 'Ines Zager',
    image: IMAGES.tasting_springbank,
    images: [IMAGES.tasting_springbank],
    videoUrl: '',
    excerpt: 'Er ist da! Meine allererste Abfüllung: Ardmore 11 Jahre alt, Ex-Laphroaig Oloroso Sherry Quarter Cask Reifung.',
    content: `Er ist da! Meine allererste Abfüllung!

Ardmore, 11 Jahre alt, Ex-Laphroaig Oloroso Sherry Quarter Cask Reifung (56,7% vol.).

Und da ich natürlich etwas voreingenommen bin, wenn es um mein eigenes Produkt geht, lasse ich doch gerne diese wunderbaren Frauen aus Glasgow zu Wort kommen, die sich für ein spontanes morgendliches Tasting unmittelbar nach einer Tour in der Springbank Brennerei bereit erklärt haben.

Vielen Dank an Melanie, Jen und Naomi für das ehrliche, enthusiastische Feedback zu diesem rauchig-würzigen Einzelfass!`
  },
  {
    id: 6,
    title: 'TV Reportage „Whiskyboom auf Islay“',
    date: '13. Jan. 2024',
    category: 'Medien',
    author: 'Ines Zager',
    image: IMAGES.ines_islay,
    images: [IMAGES.ines_islay],
    videoUrl: '',
    excerpt: 'Vielleicht habt ihr mich gestern im Fernsehen erkannt. Bericht über die Schattenseiten des Whiskybooms auf Islay in der Arte Reportage.',
    content: `TV Reportage „Whiskyboom auf Islay“

Vielleicht habt ihr mich gestern im Fernsehen erkannt.

Im Oktober letzten Jahres habe ich in Rachel MacNeills Residential Course der Islay Whisky Academy gemeinsam mit Whiskyliebhabern aus der ganzen Welt meinen Whiskyhorizont erweitern können. Dabei wurden wir von einem deutschen Kamerateam begleitet.

In der daraus entstandenen Arte Reportage wird über die „Schattenseiten des Whiskybooms auf Islay“ berichtet: Die vorhandenen neun Brennereien erweitern kontinuierlich ihre Produktionskapazitäten. Fünf weitere sind geplant und zum Teil bereits im Bau. Die vorhandene Infrastruktur ist überlastet, die Bewohner genervt.

Die Reportage ist in der Mediathek abrufbar:
https://www.zdf.de/arte/arte-re/page-video-artede-re-whisky-boom-mit-schattenseiten-100.html`
  },
  {
    id: 7,
    title: 'Über mich',
    date: '12. Jan. 2024',
    category: 'Intro',
    author: 'Ines Zager',
    image: IMAGES.ines_portrait,
    images: [IMAGES.ines_portrait],
    videoUrl: '',
    excerpt: 'Seit gut 20 Jahren bereise ich die Welt auf der Jagd nach den spannendsten Flaschen für meine stetig wachsende Privatsammlung.',
    content: `Ines Zager

Seit gut 20 Jahren bereise ich die Welt auf der Jagd nach den spannendsten Flaschen für meine stetig wachsende Privatsammlung. Als dann 2020 Covid-19 zuschlug und ein persönlicher Austausch nicht mehr möglich war, startete ich einen Instagram Whisky-Blog, um mit der Whisky-Community in Verbindung zu bleiben und veranstaltete gelegentlich private Zoom-Verkostungen. So erfuhr ich auch von der Möglichkeit, in Fässer zu investieren, und fing an, Fässer zum Spaß zu kaufen.

Mit einem wachsenden Fassportfolio und Netzwerk, in der Mitte des Lebens angekommen und wie so viele mit dem Sinn des Lebens hadernd, beschloss ich 2023, volles Risiko zu gehen. Ich fuhr meine Karriere als auf Umwelt-, Genehmigungs- und Energierecht spezialisierte Juristin, tätig für große Energiekonzerne, auf Teilzeit zurück, um mir meinen Lebenstraum zu erfüllen in der Whiskyindustrie zu arbeiten. Dafür gründete ich mein eigenes Unternehmen, das strikt meinen persönlichen Werten verpflichtet ist.

Bis dato war ich als Mutter von zwei Jungs und einem sicheren, gut bezahlten Job, der mir zudem viel Spaß machte, nicht mutig genug gewesen etwas Neues zu beginnen. Heute, in meinen Vierzigern, mit fast 20 Jahren Berufserfahrung, einer langen Liste von privaten und beruflichen Erfolgen und Misserfolgen, habe ich jetzt das Selbstvertrauen gewonnen, das zu tun, was ich schon immer tun wollte.`
  },
  {
    id: 8,
    title: 'Frauenperspektive?',
    date: '11. Jan. 2024',
    category: 'Philosophie',
    author: 'Ines Zager',
    image: IMAGES.frauenperspektive,
    images: [IMAGES.frauenperspektive],
    videoUrl: '',
    excerpt: 'EINE ANDERE PERSPEKTIVE AUF WHISKY: Weiblich. Unabhängig. Und vor allem: ohne Dogmen. Was ist eigentlich eine weibliche Perspektive auf Whisky? Keine Ahnung.',
    content: `EINE ANDERE PERSPEKTIVE AUF WHISKY
Weiblich. Unabhängig. Und vor allem: ohne Dogmen.

Was ist eigentlich eine weibliche Perspektive auf Whisky? Keine Ahnung. Und genau das ist der Punkt.

Ich glaube nicht an Whisky für bestimmte Zielgruppen. Nicht an Regeln, wie man ihn trinken „muss“. Und nicht daran, dass Alter, Farbe oder ein möglichst dunkles Sherryfass automatisch für Qualität stehen. Gut ist, was gefällt.

PURE.WHISKY. steht für meinen persönlichen Blick auf Scotch Whisky: unabhängig, neugierig und mit einem Faible für unverfälschten Charakter. Mich interessiert die DNA einer Brennerei – und ein Fass, das sie nicht überdeckt, sondern sichtbar macht.

Geprägt hat mich dabei auch die OurWhisky Foundation, die Frauen in der Whiskywelt vernetzt und fördert. Im Rahmen ihres Mentoring-Programms hatte ich das Glück, Compass Box als Mentor an meiner Seite zu haben – ein Austausch, der meinen eigenen Weg als unabhängige Abfüllerin entscheidend mitgeprägt hat.

PURE.WHISKY. will Whisky nicht komplizierter machen. Sondern ehrlicher, zugänglicher und ein bisschen weniger vorhersehbar.`
  },
  {
    id: 9,
    title: 'Meine Mission',
    date: '11. Jan. 2024',
    category: 'Mission',
    author: 'Ines Zager',
    image: IMAGES.mission,
    images: [IMAGES.mission],
    videoUrl: '',
    excerpt: 'Was treibt mich an? Als unabhängiger Abfüller erwirbt PURE.WHISKY. einzelne Fässer bekannter Brennereien und füllt diese unberührt in Fassstärke ab.',
    content: `Was treibt mich an?

Als unabhängiger Abfüller erwirbt PURE.WHISKY. einzelne Fässer bekannter Brennereien und füllt diese unter eigenen Namen ohne weitere Verarbeitung/ – behandlung ab. Das heißt der Whisky wird direkt aus dem Fass, nicht kühlgefiltert, ungefärbt und unverdünnt in die verkaufsfertigen Flaschen abgefüllt. 

Dieser so genannte “Singlecaskwhisky” in Fassstärke ermöglicht nicht nur ein Whiskyerlebnis so nah am Fass und bei wenigen hundert Flaschen pro Abfüllung so exklusiv als möglich, sondern auch gerade Single Malts von Brennereien zu kosten, die weitgehend für Blends wie z.B. Johnnie Walker produzieren und daher keine und nur sehr eingeschränkt eigenständige Single Malts anbieten.

Der Fokus der Abfüllungen liegt dabei auf Brennereien, die bereits gute Schritte Richtung Nachhaltigkeit unternommen haben. Auch PURE.WHISKY. gestaltet sämtliche Prozesse so nachhaltig als möglich und legt diese transparent offen.`
  },
  {
    id: 10,
    title: 'Der Look',
    date: '11. Jan. 2024',
    category: 'Packaging',
    author: 'Ines Zager',
    image: IMAGES.wild_glass,
    images: [IMAGES.wild_glass],
    videoUrl: '',
    excerpt: 'Viele nachhaltige Bausteine: Abgefüllt wird in eine 100% recycelte Flasche aus spanischem Wild Glass mit unbehandeltem Naturkork.',
    content: `Viele nachhaltige Bausteine

Abgefüllt wird in eine 100% recycelte Flasche, der man ihre vorherigen Leben in schönster Weise ansieht. 

Der Stopper besteht aus einem einzelnem unbehandelten Stück Kork, geschnitten in örtlichen Wäldern von einem spanischen Familienunternehmen in 5. Generation bzw. einem Korkgranulat-Aktivkohle-Gemisch.

Der Kapselverschluss ist aus 100% abbaubarem Biopolymer gefertigt – gänzlich ohne giftige Weichmacher oder fossiles Plastik.`
  },
  {
    id: 11,
    title: 'Mein Versprechen',
    date: '11. Jan. 2024',
    category: 'Versprechen',
    author: 'Ines Zager',
    image: IMAGES.versprechen,
    images: [IMAGES.versprechen],
    videoUrl: '',
    excerpt: 'Qualität und Nachhaltigkeit: PURE.WHISKY. hat es sich zum Ziel gesetzt, dass “pure” Whiskyvergnügen wie kein anderer unabhängiger Abfüller zu bieten.',
    content: `Qualität und Nachhaltigkeit

PURE.WHISKY. hat es sich zum Ziel gesetzt, das “pure” Whiskyvergnügen wie kein anderer unabhängiger Abfüller zu bieten.

Das bedeutet nicht nur mein persönliches Qualitätsversprechen bezüglich jeder einzelnen Abfüllung, sondern Genuss mit gutem Gewissen.

Jedes einzelne Fass, jede Brennerei, eingesetzte Materialien, jeder Geschäftspartner, etc. werden von mir persönlich nicht nur hinsichtlich der Qualität der Leistung, sondern auch hinsichtlich der Erfüllung bestimmter Nachhaltigkeitskriterien ausgewählt.`
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
    a: 'PURE.WHISKY. setzt zu 100% auf recyceltes Wild Glass von Estal aus Spanien (PCR-Altglas), bei dem kleine Unregelmäßigkeiten den handwerklichen Charakter unterstreichen. Die Naturkorken stammen aus nachhaltigen spanischen Eichenforsten in 5. Familiengeneration bzw. bestehen aus einem Korkgranulat-Aktivkohlegemisch. Die Kapsel ist zu 100% aus biologisch abbaubarem Biopolymer (kein Erdölplastik), und das Etikett wird von Hand mit kompostierbarer Tinte auf PFAS-freiem Bütten- und Saatenpapier gestempelt.'
  },
  {
    q: 'Wie läuft die Auswahl der Brennereien nach Nachhaltigkeitskriterien ab?',
    a: 'Ich beschäftige mich seit rund 20 Jahren beruflich mit Nachhaltigkeits- und Umweltthemen und untersuche deshalb auch die Hintergründe der Brennereien, bevor ich ein Fass erwerbe. Dabei orientiere ich mich unter anderem an Kriterien etablierter Umweltmanagementsysteme wie EMAS und ISO 14001.'
  },
  {
    q: 'Wie funktioniert die Altersprüfung (18+) bei der Bestellung?',
    a: 'Der Verkauf und die Zustellung von Spirituosen erfolgen ausschließlich an Personen ab 18 Jahren. Im Checkout bestätigen Sie Ihre Volljährigkeit, und bei der Zustellung durch DHL GoGreen erfolgt eine kurze Alters- und Sichtprüfung.'
  },
  {
    q: 'Wie hoch sind die Versandkosten und wie läuft der Versand ab?',
    a: 'Der Versand erfolgt versichert und klimaneutral mit DHL GoGreen inklusive 18+ Alterssichtprüfung innerhalb von 2–4 Werktagen nach Bestellung bzw. Zahlungseingang. Die Versandkosten betragen pauschal 6,90 € innerhalb Deutschlands.'
  },
  {
    q: 'Welche Zahlungsmethoden stehen im Shop zur Verfügung?',
    a: 'Sie können bequem und sicher mit PayPal, Apple Pay, Google Pay, Kreditkarte (Visa, Mastercard, Amex), Klarna Sofortüberweisung oder iDEAL bezahlen.'
  }
];
