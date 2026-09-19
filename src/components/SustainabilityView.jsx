import React from 'react';
import { ArrowRight, Leaf, Scale, HeartHandshake, ShieldCheck } from 'lucide-react';
import { IMAGES } from '../data/pureWhiskyFullData';
import { useLanguage } from '../context/LanguageContext';

export default function SustainabilityView({ onNavigateShop, onNavigateHome, onOpenAbout }) {
  const { lang, t } = useLanguage();
  const inesPhoto = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/Pure-Whisky-bILDER02.webp';
  const wildGlassImg = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/packaging-wild-glass-detail.webp';
  const bottleWholeImg = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/packaging-biopolymer-kapsel.webp';
  const stampingImg = IMAGES.saatenpapier_label || 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/packaging-saatenpapier-stempel.webp';

  const scrollToDimension = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-32 pb-36 bg-[#FAF8F5] min-h-screen text-left">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Page Main Header */}
        <div className="mb-14 space-y-4 max-w-3xl">
          <span className="font-script text-3xl sm:text-4xl text-[#2D6A4F] block">
            {t.hero.badge}
          </span>
          <h1 className="font-woodblock text-5xl sm:text-6xl lg:text-7xl text-[#181F1C] tracking-wide uppercase leading-tight">
            {lang === 'de' ? 'Nachhaltigkeit' : 'Sustainability'}
          </h1>
          <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed pt-2">
            {lang === 'de' 
              ? 'Ein Handlungsprinzip zur Nutzung begrenzter Ressourcen. Ökologische, ökonomische und soziale Aspekte im Einklang – ohne Greenwashing, nachvollziehbar an jedem Fass.'
              : 'A governing framework for managing finite resources. Bringing ecological, economic, and social dimensions into harmony – transparent and verifiable in every single release.'}
          </p>
        </div>

        {/* 1. Ines an der Quelle mit weichem Verlauf nach links */}
        <div className="relative bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-12 mb-28 shadow-xs overflow-hidden group min-h-[520px] flex items-center">
          
          {/* Asymmetrisches Hintergrundbild */}
          <div className="absolute top-0 right-0 bottom-0 w-full sm:w-7/12 lg:w-3/5 pointer-events-none z-0 overflow-hidden">
            <img
              src={inesPhoto}
              alt="Ines Zager"
              className="w-full h-full object-cover object-right filter brightness-[0.98] contrast-[1.05] opacity-90 group-hover:scale-103 transition-transform duration-700"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-35% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/40" />
          </div>

          {/* Text-Ebene links */}
          <div className="relative z-10 max-w-xl lg:max-w-2xl space-y-6 text-left py-2">
            <div className="space-y-2">
              <span className="font-script text-3xl text-[#2D6A4F] block">
                {lang === 'de' ? 'Persönliche Haltung' : 'Personal Conviction'}
              </span>
              <h2 className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] tracking-wide uppercase leading-tight">
                {lang === 'de' ? 'Warum Nachhaltigkeit eine Grenze braucht.' : 'Why Sustainability Needs Real Boundaries.'}
              </h2>
            </div>

            <div className="space-y-3 font-serif text-base sm:text-lg text-[#181F1C] leading-relaxed border-l-3 border-[#B85D2C] pl-5 italic">
              {lang === 'de' ? (
                <>
                  <p>„Seien wir ehrlich, Whisky ist ein Geschäft. Und jeder versucht seinen Anteil vom Kuchen abzubekommen. Ich auch.</p>
                  <p>Ich bin mir jedoch meines Verhaltens und der dadurch verursachten Probleme bewusst. Daher versuche ich durch den Fokus auf Nachhaltigkeit meinen kleinen Beitrag zu einer besseren Whiskywelt zu leisten.</p>
                  <p>Nachhaltigkeit ist aber entgegen der landläufigen Meinung nicht allein gleichzusetzen mit Umweltschutz. Als Begriff, der ursprünglich aus der Forstwirtschaft stammt, geht es dabei um ein Handlungsprinzip zur Nutzung begrenzter Ressourcen. Dabei sind die ökologischen, ökonomischen und sozialen Aspekte in Einklang zu bringen.</p>
                  <p>Entsprechend bewerte ich jede Brennerei vor dem Erwerb eines Fasses nach ihrem individuellen Beitrag zur Nachhaltigkeit angelehnt an etablierte und mir wohlbekannte Umweltmanagementsysteme wie EMAS und ISO 14001.“</p>
                </>
              ) : (
                <>
                  <p>“Let’s be honest, whisky is a business. And everyone tries to get their share of the cake. Me too.</p>
                  <p>However, I am conscious of my actions and the consequences they cause. That is why I strive, through a dedicated focus on sustainability, to make my own small contribution toward a better whisky world.</p>
                  <p>Contrary to widespread belief, sustainability is not simply synonymous with environmental protection. Originating as a forestry principle, it defines a framework for managing finite resources by balancing ecological, economic, and social dimensions.</p>
                  <p>Accordingly, prior to acquiring any cask, I assess each distillery’s individual contribution to sustainability, guided by established environmental management systems well known to me, such as EMAS and ISO 14001.”</p>
                </>
              )}
            </div>

            <div className="pt-2 flex items-center space-x-3.5">
              <img
                src="/images/ines_portrait_round.webp"
                alt="Ines Zager"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = IMAGES.ines_portrait;
                }}
                className="w-13 h-13 rounded-full object-cover border-2 border-[#D4C8B8] shadow-2xs"
              />
              <div>
                <h4 className="font-woodblock text-xl text-[#181F1C] uppercase tracking-wide leading-tight">
                  Ines Zager
                </h4>
                <p className="text-xs font-craft-mono text-[#55695E]">
                  {lang === 'de' ? 'Gründerin von PURE.WHISKY. & Umweltjuristin' : 'Founder of PURE.WHISKY. & Environmental Jurist'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. DIE 3 DIMENSIONEN DER NACHHALTIGKEIT                       */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-32 space-y-16">
          
          {/* Main Title */}
          <div className="space-y-4 max-w-3xl text-left">
            <span className="font-script text-3xl sm:text-4xl text-[#2D6A4F] block">
              {t.sustainability.badge}
            </span>
            <h2 className="font-woodblock text-4xl sm:text-5xl lg:text-6xl text-[#181F1C] tracking-wide uppercase leading-tight">
              {lang === 'de' ? 'Die 3 Dimensionen echter Nachhaltigkeit.' : 'The 3 Pillars of True Sustainability.'}
            </h2>
            <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed">
              {lang === 'de'
                ? 'Whisky-Handwerk und Verantwortung sind bei PURE.WHISKY. kein Widerspruch. Echtes nachhaltiges Handeln gelingt nur, wenn Ökologie, Ökonomie und Soziales als harmonische Einheit zusammenwirken – ohne Greenwashing, nachvollziehbar an jedem Fass.'
                : 'Whisky craftsmanship and environmental responsibility are inseparable at PURE.WHISKY. Genuine sustainability is only achieved when ecology, economy, and social values act in harmony – without greenwashing, proven in every single cask.'}
            </p>
          </div>

          {/* Schickes Nachhaltigkeitsdreieck mit dynamischen Beschriftungen */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-full max-w-[460px] sm:max-w-[500px] select-none mx-auto">
              <svg viewBox="0 0 600 500" className="w-full h-auto drop-shadow-md">
                {/* Ökonomie (Links) */}
                <g
                  onClick={() => scrollToDimension('oekonomie')}
                  className="cursor-pointer group transition-all duration-300"
                >
                  <polygon
                    points="300,30 50,460 300,335"
                    fill="#00A389"
                    className="transition-all duration-300 group-hover:fill-[#00B89B] group-hover:opacity-95"
                  />
                  <g transform="translate(225, 215) scale(1.05)" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="0" cy="-11" r="5" strokeWidth="2" />
                    <path d="M0 -13v4M-1.5 -11h3" strokeWidth="2" />
                    <path d="M0 -6v10" />
                    <path d="M0 -1c-2-3-5-3-5-3s0 4 3 5" />
                    <path d="M0 -3c2-3 5-3 5-3s0 4-3 5" />
                    <path d="M-10 13h20M-12 9c2-2 5-2 8-1l2 1 6-2c2-1 4 1 4 2v2h-20z" />
                  </g>
                  <text x="225" y="274" fill="white" fontSize="22" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle" letterSpacing="0.02em">
                    {lang === 'de' ? 'Ökonomie' : 'Economy'}
                  </text>
                  <text x="225" y="296" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle" letterSpacing="0.06em">
                    {lang === 'de' ? 'WERTERHALT & FAIRNESS' : 'VALUE & FAIRNESS'}
                  </text>
                </g>

                {/* Ökologie (Rechts) */}
                <g
                  onClick={() => scrollToDimension('oekologie')}
                  className="cursor-pointer group transition-all duration-300"
                >
                  <polygon
                    points="300,30 550,460 300,335"
                    fill="#F3A712"
                    className="transition-all duration-300 group-hover:fill-[#F5B82A] group-hover:opacity-95"
                  />
                  <g transform="translate(375, 215) scale(1.05)" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="0" cy="0" r="12" />
                    <path d="M-12 0h24M0 -12a18 18 0 0 1 0 24M0 -12a18 18 0 0 0 0 24" />
                    <path d="M5 -7c2-2 5-2 5-2s0 3-2 5-5 2-5 2" />
                  </g>
                  <text x="375" y="274" fill="white" fontSize="22" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle" letterSpacing="0.02em">
                    {lang === 'de' ? 'Ökologie' : 'Ecology'}
                  </text>
                  <text x="375" y="296" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle" letterSpacing="0.06em">
                    {lang === 'de' ? 'QUELLEN & KREISLAUF' : 'SOURCES & CIRCULARITY'}
                  </text>
                </g>

                {/* Soziales (Unten) */}
                <g
                  onClick={() => scrollToDimension('soziales')}
                  className="cursor-pointer group transition-all duration-300"
                >
                  <polygon
                    points="50,460 550,460 300,335"
                    fill="#BA1368"
                    className="transition-all duration-300 group-hover:fill-[#CF1D77] group-hover:opacity-95"
                  />
                  <g transform="translate(300, 382) scale(1.05)" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="0" cy="-8" r="5" />
                    <path d="M-8 8c0-4 3.5-6 8-6s8 2 8 6" />
                    <circle cx="-15" cy="0" r="3.5" />
                    <path d="M-20 11c0-2.5 2-3.5 5-3.5" />
                    <circle cx="15" cy="0" r="3.5" />
                    <path d="M20 11c0-2.5-2-3.5-5-3.5" />
                  </g>
                  <text x="300" y="428" fill="white" fontSize="22" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle" letterSpacing="0.02em">
                    {lang === 'de' ? 'Soziales' : 'Social'}
                  </text>
                  <text x="300" y="448" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle" letterSpacing="0.06em">
                    {lang === 'de' ? 'MENSCH & HANDWERK' : 'PEOPLE & CRAFTSMANSHIP'}
                  </text>
                </g>

                {/* Trennlinien */}
                <line x1="300" y1="30" x2="300" y2="335" stroke="white" strokeWidth="8" strokeLinecap="round" />
                <line x1="50" y1="460" x2="300" y2="335" stroke="white" strokeWidth="8" strokeLinecap="round" />
                <line x1="550" y1="460" x2="300" y2="335" stroke="white" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* 3 Großzügige Abschnitte */}
          <div className="space-y-12 max-w-4xl mx-auto">
            
            {/* 1. Ökologie */}
            <div
              id="oekologie"
              className="scroll-mt-32 bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-12 shadow-xs space-y-6 text-left border-l-6 border-l-[#F3A712]"
            >
              <div className="flex items-center justify-between border-b border-[#EADFCB] pb-4">
                <span className="font-woodblock text-sm uppercase tracking-wider text-[#B88210] flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-[#B88210]" />
                  <span>{lang === 'de' ? 'Dimension 01 · Ökologie' : 'Pillar 01 · Ecology'}</span>
                </span>
                <span className="text-xs sm:text-sm font-craft-mono text-[#7A8C80]">
                  {lang === 'de' ? 'Schottische Quellen & Kreislauf' : 'Scottish Sources & Circularity'}
                </span>
              </div>

              <div>
                <h3 className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] uppercase tracking-wide leading-tight">
                  {lang === 'de' ? 'Ressourcenschutz direkt an der Quelle' : 'Resource Protection Directly at the Source'}
                </h3>
                <p className="font-script text-2xl sm:text-3xl text-[#2D6A4F] mt-1.5">
                  {lang === 'de' ? 'Quellwasser, Biomasse & Kreislaufwirtschaft' : 'Spring Water, Biomass & Circularity'}
                </p>
              </div>

              <div className="space-y-4 text-base sm:text-lg lg:text-xl text-[#2E3D35] leading-relaxed font-normal">
                <p>
                  {lang === 'de' 
                    ? 'Whisky entsteht aus drei elementaren Gaben der Natur: reinem Wasser, schottischer Gerste und Hefe. Echte Nachhaltigkeit muss daher unmittelbar an der Quelle ansetzen – in den geschützten Hochmooren und Flussläufen Schottlands.'
                    : 'Whisky is born from three fundamental gifts of nature: pristine spring water, Scottish barley, and yeast. Genuine sustainability must begin directly at the source – in Scotland’s protected moorlands and clear river basins.'}
                </p>
                <p>
                  {lang === 'de'
                    ? 'Ich wähle für PURE.WHISKY. beispielsweise Brennereien aus, die intakte Flussläufe bewahren, mit geschlossenen Kühlwasserkreisläufen arbeiten und ihren Primärenergiebedarf konsequent dekarbonisieren – wie Tomatin mit über 80 % CO₂-Einsparung durch regionale Holzpellet-Biomasse oder Glenburgie durch hocheffiziente Abwärmerückgewinnung. Auch Reststoffe wie Treber (Draff) und Pot Ale werden als nahrhaftes Futter an lokale Farmen übergeben.'
                    : 'For PURE.WHISKY., I select casks from distilleries that protect natural watersheds, utilize closed-loop cooling systems, and decarbonize distillation energy – such as Tomatin cutting over 80% CO₂ via local pellet biomass, or Glenburgie utilizing high-efficiency heat recovery. By-products like draff and pot ale are returned as nutrient-rich feed to local Scottish farms.'}
                </p>
              </div>

              <div className="pt-8 border-t border-[#EAE4D9] grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <h4 className="font-woodblock text-lg text-[#181F1C] tracking-wide uppercase">
                    {lang === 'de' ? 'Geschlossene Kreisläufe' : 'Closed Cooling Loops'}
                  </h4>
                  <p className="text-sm text-[#55695E] leading-relaxed">
                    {lang === 'de' ? 'Rezirkulierende Kühlsysteme und strenger Schutz natürlicher Quellbiotope direkt in Schottland.' : 'Recirculating cooling systems and strict protection of natural Scottish spring ecosystems.'}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-woodblock text-lg text-[#181F1C] tracking-wide uppercase">
                    {lang === 'de' ? 'Über 80% CO₂-Senkung' : 'Over 80% CO₂ Cut'}
                  </h4>
                  <p className="text-sm text-[#55695E] leading-relaxed">
                    {lang === 'de' ? 'Regenerative Holzpellet-Biomasse und Wärmerückgewinnung statt fossiler Energieträger.' : 'Renewable wood-pellet biomass boilers and waste-heat exchangers instead of fossil fuels.'}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-woodblock text-lg text-[#181F1C] tracking-wide uppercase">
                    {lang === 'de' ? 'Reststoff-Verwertung' : 'Upcycled Byproducts'}
                  </h4>
                  <p className="text-sm text-[#55695E] leading-relaxed">
                    {lang === 'de' ? 'Treber und Pot Ale gehen als hochwertiges Futter an umliegende schottische Bauernhöfe.' : 'Draff and pot ale are recycled as nutrient-rich feed for regional Scottish farms.'}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Ökonomie */}
            <div
              id="oekonomie"
              className="scroll-mt-32 bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-12 shadow-xs space-y-6 text-left border-l-6 border-l-[#00A389]"
            >
              <div className="flex items-center justify-between border-b border-[#C8E8E1] pb-4">
                <span className="font-woodblock text-sm uppercase tracking-wider text-[#00826D] flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-[#00826D]" />
                  <span>{lang === 'de' ? 'Dimension 02 · Ökonomie' : 'Pillar 02 · Economy'}</span>
                </span>
                <span className="text-xs sm:text-sm font-craft-mono text-[#7A8C80]">
                  {lang === 'de' ? 'Faire Werte & Partnerschaften' : 'Fair Values & Partnerships'}
                </span>
              </div>

              <div>
                <h3 className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] uppercase tracking-wide leading-tight">
                  {lang === 'de' ? 'Wertschätzung statt Spekulationsbasis' : 'Appreciation Instead of Speculation'}
                </h3>
                <p className="font-script text-2xl sm:text-3xl text-[#2D6A4F] mt-1.5">
                  {lang === 'de' ? 'Faire Werte, regionale Partnerschaften & Transparenz' : 'Fair Values, Regional Partnerships & Transparency'}
                </p>
              </div>

              <div className="space-y-4 text-base sm:text-lg lg:text-xl text-[#2E3D35] leading-relaxed font-normal">
                <p>
                  {lang === 'de'
                    ? 'In einer Whiskylandschaft, die zunehmend von Spekulation und künstlich getriebenen Preisen geprägt wird, setzt PURE.WHISKY auf einen bewussten und verantwortungsvollen Umgang mit wirtschaftlichen Ressourcen. Für mich bedeutet nachhaltiges Wirtschaften, den tatsächlichen Wert eines Whiskys anzuerkennen und langfristige Perspektiven für die schottische Whiskybranche zu fördern.'
                    : 'In a whisky landscape increasingly shaped by speculation and artificially driven prices, PURE.WHISKY focuses on a conscious and responsible use of economic resources. For me, sustainable business means recognising the true value of a whisky and fostering long-term perspectives for the Scottish whisky industry.'}
                </p>
                <p>
                  {lang === 'de'
                    ? 'Als unabhängiger Abfüller arbeite ich mit Brokern und weiteren Handelspartnern zusammen. Dabei lege ich Wert auf faire Geschäftsbeziehungen, nachvollziehbare Preise und einen respektvollen Umgang mit den Menschen hinter dem Whisky. Besonders wichtig ist mir, Brennereien zu unterstützen, die auf langfristige Zusammenarbeit mit lokalen Zulieferern und regionalen Partnern setzen.'
                    : 'As an independent bottler, I work with brokers and other trade partners. In doing so, I value fair business relationships, comprehensible pricing, and respectful collaboration with the people behind the whisky. It is particularly important to me to support distilleries that rely on long-term cooperation with local suppliers and regional partners.'}
                </p>
              </div>

              <div className="pt-8 border-t border-[#D5EBE5] grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <h4 className="font-woodblock text-lg text-[#181F1C] tracking-wide uppercase">
                    {lang === 'de' ? 'Regionale Wertschöpfung' : 'Regional Value Creation'}
                  </h4>
                  <p className="text-sm text-[#55695E] leading-relaxed">
                    {lang === 'de' ? 'Die schottische Whiskybranche lebt von ihren Regionen und den Menschen, die sie prägen. Ich schätze Brennereien, die lokale Zulieferer einbinden, regionale Wirtschaftskreisläufe stärken und Verantwortung für ihr Umfeld übernehmen.' : 'The Scottish whisky industry thrives on its regions and the people who shape them. I value distilleries that involve local suppliers, strengthen regional economic cycles, and take responsibility for their communities.'}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-woodblock text-lg text-[#181F1C] tracking-wide uppercase">
                    {lang === 'de' ? 'Faire Partnerschaften' : 'Fair Partnerships'}
                  </h4>
                  <p className="text-sm text-[#55695E] leading-relaxed">
                    {lang === 'de' ? 'Broker und Handelspartner sind ein wichtiger Bestandteil meiner Arbeit. Entscheidend sind für mich transparente Geschäftsbeziehungen, faire Konditionen und ein respektvoller Umgang mit allen Beteiligten entlang der Wertschöpfungskette.' : 'Brokers and trade partners are an essential part of my work. What matters most to me are transparent business relations, fair terms, and respectful dealings with everyone along the value chain.'}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-woodblock text-lg text-[#181F1C] tracking-wide uppercase">
                    {lang === 'de' ? 'Langfristiger Werterhalt' : 'Long-Term Value'}
                  </h4>
                  <p className="text-sm text-[#55695E] leading-relaxed">
                    {lang === 'de' ? 'Whisky braucht Zeit. Deshalb stehen für mich Qualität, Herkunft und die tatsächliche Reife eines Fasses im Mittelpunkt – nicht kurzfristige Spekulation. Ich möchte dazu beitragen, den Wert schottischen Whiskys langfristig zu bewahren und verantwortungsvoll weiterzugeben.' : 'Whisky takes time. That is why I focus on quality, provenance, and the authentic maturation of a cask – not short-term speculation. I want to contribute to preserving the value of Scotch whisky long-term and passing it on responsibly.'}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Soziales */}
            <div
              id="soziales"
              className="scroll-mt-32 bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-12 shadow-xs space-y-6 text-left border-l-6 border-l-[#BA1368]"
            >
              <div className="flex items-center justify-between border-b border-[#ECCADF] pb-4">
                <span className="font-woodblock text-sm uppercase tracking-wider text-[#9D174D] flex items-center space-x-2">
                  <HeartHandshake className="w-5 h-5 text-[#9D174D]" />
                  <span>{lang === 'de' ? 'Dimension 03 · Soziales' : 'Pillar 03 · Social'}</span>
                </span>
                <span className="text-xs sm:text-sm font-craft-mono text-[#7A8C80]">
                  {lang === 'de' ? 'Mensch & Gemeinschaft' : 'People & Community'}
                </span>
              </div>

              <div>
                <h3 className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] uppercase tracking-wide leading-tight">
                  {lang === 'de' ? 'Verantwortung für Menschen & Regionen' : 'Responsibility for People & Regions'}
                </h3>
                <p className="font-script text-2xl sm:text-3xl text-[#2D6A4F] mt-1.5">
                  {lang === 'de' ? 'Regionale Arbeitsplätze, faire Bedingungen & starke Gemeinschaften' : 'Regional Jobs, Fair Conditions & Resilient Communities'}
                </p>
              </div>

              <div className="space-y-4 text-base sm:text-lg lg:text-xl text-[#2E3D35] leading-relaxed font-normal">
                <p>
                  {lang === 'de'
                    ? 'Nachhaltigkeit bedeutet für mich auch, Verantwortung für die Menschen hinter dem Whisky zu übernehmen. Gerade in abgelegenen Regionen Schottlands können Brennereien eine wichtige Rolle als Arbeitgeber spielen und damit zum Erhalt lokaler Gemeinschaften beitragen.'
                    : 'For me, sustainability also means taking responsibility for the people behind the whisky. Particularly in remote regions of Scotland, distilleries can play a vital role as employers and help sustain local communities.'}
                </p>
                <p>
                  {lang === 'de'
                    ? 'Ein Beispiel ist die Jura Distillery auf der Isle of Jura. Als Arbeitgeber auf einer abgelegenen Insel ist sie Teil der lokalen Wirtschafts- und Sozialstruktur. Solche Betriebe können dazu beitragen, Arbeitsplätze vor Ort zu schaffen und Perspektiven für die Menschen in ihrer Heimat zu erhalten.'
                    : 'One example is Jura Distillery on the Isle of Jura. As an employer on a remote island, it is integral to the local economic and social fabric. Such businesses help generate local jobs and preserve perspectives for people in their homelands.'}
                </p>
                <p>
                  {lang === 'de'
                    ? 'Bei PURE.WHISKY möchte ich Brennereien und ihre soziale Verantwortung stärker in den Blick nehmen. Dazu gehören faire Arbeitsbedingungen, langfristige Beschäftigungsmöglichkeiten und ein respektvoller Umgang mit den Menschen und Gemeinden, die den schottischen Whisky prägen.'
                    : 'At PURE.WHISKY, I want to bring distilleries and their social responsibility into sharper focus. This includes fair working conditions, long-term employment opportunities, and respectful engagement with the people and communities who define Scotch whisky.'}
                </p>
              </div>

              <div className="pt-8 border-t border-[#F3D5E7] grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <h4 className="font-woodblock text-lg text-[#181F1C] tracking-wide uppercase">
                    {lang === 'de' ? 'Regionale Arbeitsplätze' : 'Regional Jobs'}
                  </h4>
                  <p className="text-sm text-[#55695E] leading-relaxed">
                    {lang === 'de' ? 'Brennereien können wichtige Arbeitgeber in ländlichen und abgelegenen Regionen sein. Lokale Beschäftigung stärkt Gemeinden und schafft Perspektiven vor Ort.' : 'Distilleries can be crucial employers in rural and remote areas. Local employment strengthens communities and builds local opportunities.'}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-woodblock text-lg text-[#181F1C] tracking-wide uppercase">
                    {lang === 'de' ? 'Faire Arbeitsbedingungen' : 'Fair Working Conditions'}
                  </h4>
                  <p className="text-sm text-[#55695E] leading-relaxed">
                    {lang === 'de' ? 'Wertschätzung zeigt sich im Umgang mit den Beschäftigten: durch faire Bedingungen, Sicherheit am Arbeitsplatz und Möglichkeiten zur persönlichen Weiterentwicklung.' : 'Appreciation is reflected in how employees are treated: through fair conditions, workplace safety, and avenues for personal growth.'}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-woodblock text-lg text-[#181F1C] tracking-wide uppercase">
                    {lang === 'de' ? 'Starke Gemeinschaften' : 'Strong Communities'}
                  </h4>
                  <p className="text-sm text-[#55695E] leading-relaxed">
                    {lang === 'de' ? 'Verantwortungsvolles Handeln bedeutet auch, die Bedürfnisse der Menschen vor Ort ernst zu nehmen und die Verbindung zwischen Brennerei und Gemeinschaft langfristig zu stärken.' : 'Responsible practice also means taking local needs seriously and strengthening the bond between distillery and community long-term.'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Central Synthesis Statement */}
          <div className="pt-8 border-t border-[#E2DDD5] text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-craft-mono font-bold text-[#2D6A4F] uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'de' ? 'Orientiert an anerkannten Standards (EMAS & ISO 14001)' : 'Rooted in Certified Frameworks (EMAS & ISO 14001)'}</span>
            </div>
            <p className="text-sm sm:text-base text-[#55695E] leading-relaxed">
              {lang === 'de' 
                ? 'Nur wenn alle drei Dimensionen in vollkommenem Einklang stehen, wird ein Einzelfass für PURE.WHISKY. freigegeben.'
                : 'Only when all three dimensions align without compromise is a single cask selected for PURE.WHISKY.'}
            </p>
          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. VERPACKUNGS-ANATOMIE                                        */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-32 mb-32">
          
          <div className="space-y-6 max-w-3xl border-b border-[#E2DDD5] pb-8">
            <span className="font-script text-3xl sm:text-4xl text-[#2D6A4F] block">
              {lang === 'de' ? 'Nachhaltiges Verpackungskonzept' : 'Sustainable Packaging Design'}
            </span>
            <h2 className="font-woodblock text-4xl sm:text-5xl lg:text-6xl text-[#181F1C] tracking-wide uppercase leading-tight">
              {lang === 'de' ? 'Jede Komponente nachhaltig durchdacht.' : 'Every Component Thoughtfully Sourced.'}
            </h2>
            <blockquote className="font-serif text-xl sm:text-2xl text-[#181F1C] italic border-l-3 border-[#B85D2C] pl-5 leading-relaxed">
              {lang === 'de'
                ? '„Durch die Verwendung von wertigen Materialien wie Recyclingflaschen, ressourcenschonenden Korken, biologisch abbaubaren Verschlusskapseln und PFAS-freiem Büttenpapier leiste ich meinen persönlichen Beitrag.“'
                : '“By choosing post-consumer recycled glass, sustainable corks, biodegradable capsules, and PFAS-free seed paper, I make my personal contribution to genuine circularity.”'}
            </blockquote>
          </div>

          {/* 1. Estal Wild Glass Flasche */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6 space-y-5 text-left order-2 lg:order-1">
              <span className="font-script text-3xl text-[#2D6A4F] block">
                100% PCR Altglas
              </span>
              <h3 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] uppercase leading-tight">
                Estal Wild Glass Flasche
              </h3>
              <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Abgefüllt in echtes Wild Glass von Estal aus Spanien – gegossen zu 100% aus recyceltem Altglas (Post-Consumer-Recycled).'
                  : 'Bottled into genuine Wild Glass crafted by Estal in Spain – produced from 100% post-consumer recycled glass.'}
              </p>
              <p className="text-[#55695E] text-base font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Natürliche Farb- und Strukturfacetten sowie winzige Lufteinschlüsse machen jede Flasche zu einem unverwechselbaren Unikat mit eigener Seele.'
                  : 'Subtle shade variations, tactile textures, and micro air bubbles make every bottle an authentic, distinct individual.'}
              </p>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-lg bg-white group">
                <img
                  src={wildGlassImg}
                  alt="Estal Wild Glass Flasche"
                  className="w-full h-auto object-contain block group-hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* 2. Flasche mit Naturkork & Biopolymer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-lg border border-[#D4C8B8] bg-white group flex items-center justify-center">
                <img
                  src={bottleWholeImg}
                  alt="Biopolymer-Kapsel und Naturkork"
                  className="w-full h-auto block object-contain group-hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-3">
                <span className="font-script text-3xl text-[#2D6A4F] block">
                  {lang === 'de' ? 'Verschluss & Versiegelung' : 'Closure & Seal'}
                </span>
                <h3 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] uppercase leading-tight">
                  {lang === 'de' ? 'Ressourcenschonender Korken & Biopolymer-Kapsel' : 'Resource-Conscious Cork & Biopolymer Capsule'}
                </h3>
              </div>

              <div className="space-y-6 pt-2">
                <div className="border-l-3 border-[#B85D2C] pl-6 space-y-1.5">
                  <h4 className="font-woodblock text-2xl text-[#181F1C] uppercase tracking-wide">
                    {lang === 'de' ? 'Ressourcenschonender Korken' : 'Resource-Conscious Cork'}
                  </h4>
                  <p className="text-[#3A4A40] text-base leading-relaxed font-normal">
                    {lang === 'de'
                      ? 'Ressourcenschonende Korken aus einem Korkgranulat-Aktivkohlegemisch und unbehandeltem Naturkork aus nachhaltig bewirtschafteten spanischen Wäldern. Frei von bedenklichen Klebstoffen oder synthetischen Dichtringen.'
                      : 'Resource-saving corks crafted from a cork granulate and activated carbon mix alongside untreated natural cork from sustainably managed Spanish forests. Free from harmful adhesives or synthetic seals.'}
                  </p>
                </div>

                <div className="border-l-3 border-[#B85D2C] pl-6 space-y-1.5">
                  <h4 className="font-woodblock text-2xl text-[#181F1C] uppercase tracking-wide">
                    {lang === 'de' ? '100% Biopolymer-Kapselverschluss' : '100% Biodegradable Capsule'}
                  </h4>
                  <p className="text-[#3A4A40] text-base leading-relaxed font-normal">
                    {lang === 'de'
                      ? 'Die Versiegelung besteht vollständig aus bio-basiertem Polymer ohne Erdölkunststoffe oder Weichmacher – vollständig biologisch abbaubar und kompostierbar.'
                      : 'Crafted entirely from bio-based plant polymer without petroleum-based plastics or phthalates – fully biodegradable and home-compostable.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Handgestempeltes Saatenpapier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6 space-y-5 text-left order-2 lg:order-1">
              <span className="font-script text-3xl text-[#2D6A4F] block">
                {lang === 'de' ? 'Das Etikett' : 'The Label'}
              </span>
              <h3 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] uppercase leading-tight">
                {lang === 'de' ? 'Handgestempeltes Saatenpapier' : 'Hand-Stamped Seed Paper'}
              </h3>
              <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Jedes Etikett wird in der traditionsreichen Manufaktur StamPamPam in Spanien mit echter Handarbeit gestempelt. Als Trägermaterial dient recyceltes Bütten- und Saatenpapier mit fühlbarer Haptik.'
                  : 'Every label is individually hand-stamped in Spain by the artisanal workshop StamPamPam onto recycled seed paper with a rich tactile texture.'}
              </p>
              <p className="text-[#55695E] text-base font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Gedruckt wird mit ungiftiger, bio-abbaubarer Tinte und verklebt mit kompostierbarem Leim – vollkommen frei von PFAS. Wenn die Flasche geleert ist, kann das Etikett eingepflanzt werden und Wildblumen hervorbringen.'
                  : 'Printed with non-toxic eco inks and bonded with compostable adhesive – strictly PFAS-free. Once the bottle is enjoyed, the label can be planted in soil to grow wild flowers.'}
              </p>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-lg bg-white group">
                <img
                  src={stampingImg}
                  alt="Handgestempeltes Saatenpapier"
                  className="w-full h-auto object-contain block group-hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>

        {/* 4. SHOP CTA BOX */}
        <div className="bg-[#E8EFEA] border border-[#C5D8CC] rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-xs">
          <span className="font-script text-3xl text-[#2D6A4F] block">
            {lang === 'de' ? 'Genuss mit bestem Gewissen' : 'Conscious Appreciation'}
          </span>
          <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase max-w-2xl mx-auto">
            {lang === 'de' ? 'Single Cask Sustainable Whisky im Glas erleben.' : 'Experience Single Cask Sustainable Whisky in Your Glass.'}
          </h2>
          <p className="text-[#3A4A40] text-base sm:text-lg max-w-xl mx-auto font-normal">
            {lang === 'de'
              ? 'Handverlesene Einzelfässer in nativer Fassstärke – unberührt, unfiltriert und kompromisslos nachhaltig.'
              : 'Handpicked single casks at natural cask strength – untouched, unfiltered, and uncompromisingly sustainable.'}
          </p>
          <div className="pt-4 flex justify-center">
            <button
              onClick={onNavigateShop}
              className="inline-flex items-center space-x-3 px-10 py-4.5 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>{t.hero.btnShop}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
