import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SustainabilityView({ onNavigateShop, onNavigateHome, onOpenAbout }) {
  const auditImg = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/Pure-Whisky-bILDER02.webp';
  const wildGlassImg = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/packaging-wild-glass-detail.webp';
  const bottleWholeImg = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/packaging-biopolymer-kapsel.webp';
  const paperLabelImg = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/packaging-naturkork-spanien.webp';

  return (
    <div className="pt-32 pb-36 bg-[#FAF8F5] min-h-screen text-left">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Page Main Headline */}
        <div className="mb-20 space-y-4 max-w-3xl">
          <span className="font-script text-3xl sm:text-4xl text-[#2D6A4F] block">
            100% Circular Craft & Umwelt-Audit
          </span>
          <h1 className="font-woodblock text-5xl sm:text-6xl lg:text-7xl text-[#181F1C] tracking-wide uppercase leading-tight">
            Verantwortung ohne Greenwashing.
          </h1>
          <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed pt-2">
            Als Umweltjuristin reicht mir kein oberflächliches Marketing-Versprechen. 
            Von der regenerativen Energieversorgung der schottischen Brennerei bis zum 
            biologisch abbaubaren Etikettenleim prüfen wir jeden Schritt nach EMAS- und ISO-14001-Kriterien.
          </p>
        </div>

        {/* 1. DIE GELIEBTE AUDIT-KACHEL (Mit Bild im Hintergrund: Rechts Ines am Baum, links weicher Verlauf) */}
        <div className="relative bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-12 mb-32 shadow-xs overflow-hidden group min-h-[580px] flex items-center">
          
          {/* Asymmetrisches Hintergrundbild: Rechts Ines am Baum (90% Opacity), links Weißverlauf */}
          <div className="absolute top-0 right-0 bottom-0 w-full sm:w-7/12 lg:w-3/5 pointer-events-none z-0 overflow-hidden">
            <img
              src={auditImg}
              alt="Ines Zager an der schottischen Naturquelle und Baum"
              className="w-full h-full object-cover object-right filter brightness-[0.98] contrast-[1.05] opacity-90 group-hover:scale-104 transition-transform duration-700"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-35% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/40" />
          </div>

          {/* Text- & Kriterien-Ebene (Ohne Nummern) */}
          <div className="relative z-10 max-w-xl lg:max-w-2xl space-y-8 text-left py-2">
            
            <div className="space-y-3">
              <span className="font-script text-3xl text-[#2D6A4F] block">
                Juristisches Audit vor Ort
              </span>
              <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase leading-tight">
                Wie Ines Zager Brennereien auditiert.
              </h2>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                Bevor ein Fass für PURE.WHISKY. erworben wird, reist Ines Zager persönlich in die Highlands und auf die Inseln. Bewertet werden drei handfeste Umweltkriterien:
              </p>
            </div>

            {/* Die 3 edel gestalteten Audit-Säulen */}
            <div className="space-y-3.5 pt-1">
              
              {/* CO2-Reduktion */}
              <div className="flex items-start space-x-4 p-4.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#E2DDD5] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] border border-[#C5D8CC] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-[#2D6A4F]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase tracking-wide">
                    CO₂-Reduktion & Biomasse
                  </h3>
                  <p className="text-[#3A4A40] text-base leading-relaxed font-normal">
                    Nutzung regenerativer Energien wie Holzpellet-Biomasse (z. B. bei Tomatin mit über 80 % CO₂-Senkung in der Destillation).
                  </p>
                </div>
              </div>

              {/* Quellenschutz & Wasser */}
              <div className="flex items-start space-x-4 p-4.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#E2DDD5] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] border border-[#C5D8CC] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-[#2D6A4F]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase tracking-wide">
                    Quellenschutz & Wasser
                  </h3>
                  <p className="text-[#3A4A40] text-base leading-relaxed font-normal">
                    Geschlossene Kühlkreisläufe, Erhalt natürlicher Flussbetten und biologische Klärung durch traditionelle Schilf-Rieselfelder.
                  </p>
                </div>
              </div>

              {/* Kreislaufwirtschaft */}
              <div className="flex items-start space-x-4 p-4.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#E2DDD5] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] border border-[#C5D8CC] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-[#2D6A4F]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase tracking-wide">
                    Kreislaufwirtschaft
                  </h3>
                  <p className="text-[#3A4A40] text-base leading-relaxed font-normal">
                    100% Verwertung von Nebenprodukten wie Treber (Draff) und Pot Ale als nährstoffreiches Futter für lokale Farmbetriebe in Schottland.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 2. VERPACKUNGS-ANATOMIE (FREI, EDITORIAL, OHNE NUMMERIERUNG & OHNE FETTE KACHEL-RÄNDER) */}
        <div className="space-y-36 mb-32">
          
          {/* Section Main Title */}
          <div className="space-y-4 max-w-3xl border-b border-[#E2DDD5] pb-6">
            <span className="font-script text-3xl sm:text-4xl text-[#2D6A4F] block">
              Circular Packaging
            </span>
            <h2 className="font-woodblock text-4xl sm:text-5xl lg:text-6xl text-[#181F1C] tracking-wide uppercase leading-tight">
              Jede Komponente nachhaltig durchdacht.
            </h2>
            <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed">
              Wir verzichten konsequent auf schwere Geschenkkartons und Erdölplastik. 
              Flasche, Naturkorken, Kapsel und handgestempeltes Saatenpapier bilden einen geschlossenen, ökologischen Kreislauf.
            </p>
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
                Abgefüllt in echtes Wild Glass von Estal aus Spanien – gegossen zu 100% aus recyceltem Altglas (Post-Consumer-Recycled).
              </p>
              <p className="text-[#55695E] text-base font-normal leading-relaxed">
                Natürliche Farb- und Strukturfacetten sowie winzige Lufteinschlüsse machen jede Flasche zu einem unverwechselbaren Unikat mit eigener Seele.
              </p>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-lg bg-white group">
                <img
                  src={wildGlassImg}
                  alt="Estal Wild Glass Flasche Detail"
                  className="w-full h-auto object-contain block group-hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* 2. Die Ganze Flasche mit Korken & Biopolymer-Kapsel (SCHLANK & OHNE FETTE KACHELRÄNDER) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Foto der Flasche frei stehend ohne fette weiße Kastenränder */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-lg border border-[#D4C8B8] bg-white group flex items-center justify-center">
                <img
                  src={bottleWholeImg}
                  alt="PURE.WHISKY. Flasche mit Kapsel, Korken und Wild Glass"
                  className="w-full h-auto block object-contain group-hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Zugeordnete Texte: Naturkorken & Kapsel (7 cols) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              <div className="space-y-3">
                <span className="font-script text-3xl text-[#2D6A4F] block">
                  Verschluss & Versiegelung
                </span>
                <h3 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] uppercase leading-tight">
                  Spanischer Naturkork & Biopolymer-Kapsel
                </h3>
              </div>

              <div className="space-y-6 pt-2">
                
                <div className="border-l-3 border-[#B85D2C] pl-6 space-y-1.5">
                  <h4 className="font-woodblock text-2xl text-[#181F1C] uppercase tracking-wide">
                    Spanischer Naturkorken
                  </h4>
                  <p className="text-[#3A4A40] text-base leading-relaxed font-normal">
                    Geschnitten aus einem Stück unbehandeltem Naturkork aus nachhaltig bewirtschafteten spanischen Wäldern in 5. Familiengeneration bzw. reinem Korkgranulat-Aktivkohle-Gemisch. 
                    Vollkommen frei von chemischen Klebstoffen oder synthetischen Dichtringen.
                  </p>
                </div>

                <div className="border-l-3 border-[#B85D2C] pl-6 space-y-1.5">
                  <h4 className="font-woodblock text-2xl text-[#181F1C] uppercase tracking-wide">
                    100% Biopolymer-Kapselverschluss
                  </h4>
                  <p className="text-[#3A4A40] text-base leading-relaxed font-normal">
                    Die Versiegelung besteht vollständig aus bio-basiertem Polymer ohne Erdölkunststoffe oder giftige Weichmacher – 
                    zu 100 % biologisch abbaubar und rückstandslos kompostierbar.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* 3. Das Handgestempelte Saatenpapier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            <div className="lg:col-span-6 space-y-5 text-left order-2 lg:order-1">
              <span className="font-script text-3xl text-[#2D6A4F] block">
                Das Etikett
              </span>
              <h3 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] uppercase leading-tight">
                Handgestempeltes Saatenpapier
              </h3>
              <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed">
                Jedes Etikett wird in der traditionsreichen Manufaktur <strong>StamPamPam in Spanien</strong> von Hand gestempelt. 
                Als Trägermaterial dient recyceltes Bütten- und Saatenpapier mit echter Haptik und Struktur.
              </p>
              <p className="text-[#55695E] text-base font-normal leading-relaxed">
                Gedruckt wird mit ungiftiger, bio-abbaubarer Tinte und verklebt mit kompostierbarem Leim – vollkommen frei von PFAS-Chemikalien. 
                Wenn die Flasche geleert ist, kann das Etikett eingepflanzt werden und neue Wildblumen hervorbringen.
              </p>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-lg bg-white group">
                <img
                  src={paperLabelImg}
                  alt="Handgestempeltes Saatenpapier Etikett Detail"
                  className="w-full h-auto object-contain block group-hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

        </div>

        {/* 3. Chic CTA Box to Shop */}
        <div className="bg-[#E8EFEA] border border-[#C5D8CC] rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-xs">
          <span className="font-script text-3xl text-[#2D6A4F] block">
            Genuss mit bestem Gewissen
          </span>
          <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase max-w-2xl mx-auto">
            Erlebe echten Single Cask Whisky in 100% Wild Glass.
          </h2>
          <div className="pt-4 flex justify-center">
            <button
              onClick={onNavigateShop}
              className="inline-flex items-center space-x-3 px-10 py-4.5 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-md hover:shadow-lg"
            >
              <span>Zu den 4 Fässern im Shop</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
