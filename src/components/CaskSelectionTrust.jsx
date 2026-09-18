import React from 'react';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/pureWhiskyFullData';
import { useLanguage } from '../context/LanguageContext';

export default function CaskSelectionTrust({ onOpenShop, onOpenAbout, onOpenSustainability }) {
  const { lang, t } = useLanguage();
  const testingImg = IMAGES.ines_testing || 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/Pure-Whisky-Testing.jpg';
  const barrelImg = IMAGES.ines_barrel || 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/ines-zager-fass-lager.webp';
  const stampingImg = IMAGES.saatenpapier_label || 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/packaging-saatenpapier-stempel.webp';

  return (
    <section id="trust-section" className="py-24 lg:py-36 bg-white border-b border-[#E2DDD5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-3">
          <span className="font-script text-3xl sm:text-4xl text-[#2D6A4F] block font-bold">
            {lang === 'de' ? 'Haltung & Handwerk' : 'Conviction & Craft'}
          </span>
          <h2 className="font-woodblock text-4xl sm:text-5xl lg:text-6xl text-[#181F1C] tracking-wide uppercase leading-tight">
            {lang === 'de' ? (
              <>
                Drei Werte. <br />
                <span className="text-[#B85D2C]">Ohne Kompromisse.</span>
              </>
            ) : (
              <>
                Three Pillars. <br />
                <span className="text-[#B85D2C]">Zero Compromise.</span>
              </>
            )}
          </h2>
          <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed pt-1">
            {lang === 'de'
              ? 'Als unabhängige Abfüllerin verknüpft Ines Zager die Leidenschaft für kompromisslose Single Cask Abfüllungen mit 20 Jahren fundierter Berufserfahrung im Umwelt- und Energiebereich.'
              : 'As an independent bottler, Ines Zager combines an uncompromising passion for single casks with two decades of legal and practical expertise in environmental sustainability.'}
          </p>
        </div>

        {/* 3 Expansive Editorial Rows */}
        <div className="space-y-24 sm:space-y-32 mb-20">
          
          {/* SÄULE 1: REINHEIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-[380px] sm:h-[460px] bg-[#FAF8F5] group">
                <img
                  src={testingImg}
                  alt="Ines Zager"
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.02] group-hover:scale-104 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 text-left">
              <h3 className="font-woodblock text-3xl sm:text-4xl lg:text-5xl text-[#181F1C] tracking-wide uppercase leading-tight">
                {lang === 'de' ? 'Reinheit' : 'Purity'}
              </h3>
              <p className="font-script text-2xl sm:text-3xl text-[#2D6A4F] leading-snug">
                {lang === 'de' ? 'Unverdünnt & in nativer Fassstärke.' : 'Undiluted at Natural Cask Strength.'}
              </p>
              <p className="text-[#3A4A40] text-base sm:text-lg font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Jede Flasche wird unverdünnt in natürlicher Fassstärke ohne Kühlfiltration und ohne Farbstoffe abgefüllt. Die verwendeten Fässer werden so ausgewählt, dass sie die eigentliche DNA der jeweiligen Brennerei unterstreichen und nicht verdecken.'
                  : 'Every bottle is drawn straight from the barrel without chill-filtration or caramel coloring. Each oak cask is selected to highlight rather than conceal the true DNA of the Scottish distillery.'}
              </p>
              <p className="text-[#55695E] text-sm sm:text-base font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Kein Verschnitt, keine Glättung durch Kältefiltration, keine künstliche Farbe mit Zuckerkulör. Sie schmecken das unverfälschte Destillat und die authentische Reifung im Holz.'
                  : 'No blending, no stripping away of natural flavor oils via cold filtration, no synthetic colouring. Experience the pure spirit and organic oak maturation.'}
              </p>
              
              <div className="pt-2">
                <button
                  onClick={onOpenShop}
                  className="inline-flex items-center space-x-2 font-woodblock text-base sm:text-lg uppercase tracking-wider text-[#B85D2C] hover:text-[#A04E24] group transition-colors cursor-pointer"
                >
                  <span>{t.hero.btnShop}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* SÄULE 2: NACHVOLLZIEHBARKEIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-4 text-left order-2 lg:order-1">
              <h3 className="font-woodblock text-3xl sm:text-4xl lg:text-5xl text-[#181F1C] tracking-wide uppercase leading-tight">
                {lang === 'de' ? 'Nachvollziehbarkeit' : 'Provenance'}
              </h3>
              <p className="font-script text-2xl sm:text-3xl text-[#2D6A4F] leading-snug">
                {lang === 'de' ? 'Fundiertes Umwelt- und Fachwissen.' : 'Rooted in Environmental Science & Law.'}
              </p>
              <p className="text-[#3A4A40] text-base sm:text-lg font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Die bewusste Auswahl der Brennereien steht im Vordergrund. Ines Zager beschäftigt sich seit rund 20 Jahren beruflich mit Nachhaltigkeits- und Umweltthemen und untersucht deshalb auch die Hintergründe der Brennereien, bevor sie ein Fass erwirbt. Dabei orientiert sie sich unter anderem an Kriterien etablierter Umweltmanagementsysteme wie EMAS und ISO 14001.'
                  : 'Conscious distillery vetting is paramount. Having worked with environmental management systems for 20 years, Ines Zager audits water usage, energy sourcing, and watershed stewardship before buying any cask, adhering to ISO 14001 and EMAS standards.'}
              </p>
              <p className="text-[#55695E] text-sm sm:text-base font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Keine anonymen Großhandelskataloge, keine Schein-Zertifikate. Echter Austausch vor Ort, genaue Kenntnis der Produktionsbedingungen und volle Transparenz für Whiskyliebhaber.'
                  : 'No anonymous commodity broking, no superficial paper certificates. Direct on-site dialogue, complete insight into distillation practices, and genuine transparency for connoisseurs.'}
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenSustainability}
                  className="inline-flex items-center space-x-2 font-woodblock text-base sm:text-lg uppercase tracking-wider text-[#B85D2C] hover:text-[#A04E24] group transition-colors cursor-pointer"
                >
                  <span>{lang === 'de' ? 'Mehr zu den Nachhaltigkeits-Dimensionen' : 'Explore the 3 Sustainability Pillars'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-[380px] sm:h-[460px] bg-[#FAF8F5] group">
                <img
                  src={barrelImg}
                  alt="Ines Zager im Fasslager"
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.02] group-hover:scale-104 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* SÄULE 3: WERTIGKEIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-[380px] sm:h-[460px] bg-[#FAF8F5] group">
                <img
                  src={stampingImg}
                  alt="Handgestempeltes Etikett"
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.02] group-hover:scale-104 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 text-left">
              <h3 className="font-woodblock text-3xl sm:text-4xl lg:text-5xl text-[#181F1C] tracking-wide uppercase leading-tight">
                {lang === 'de' ? 'Wertigkeit' : 'Craft Value'}
              </h3>
              <p className="font-script text-2xl sm:text-3xl text-[#2D6A4F] leading-snug">
                {lang === 'de' ? 'Ressourcenschonend bis ins Detail.' : 'Resource-conscious in Every Detail.'}
              </p>
              <p className="text-[#3A4A40] text-base sm:text-lg font-normal leading-relaxed">
                {lang === 'de'
                  ? 'PURE.WHISKY. setzt unter anderem auf recycelte Glasflaschen, ressourcenschonende Korken aus spanischem Naturkork, Kapselverschlüsse aus vollständig abbaubarem Biopolymer sowie auf mit biologisch abbaubarer Tinte handgestempelte Etiketten aus PFAS-freiem Büttenpapier.'
                  : 'PURE.WHISKY. relies on 100% post-consumer recycled glass bottles, Spanish natural cork, home-compostable biopolymer capsules, and hand-stamped seed paper labels crafted with non-toxic eco ink.'}
              </p>
              <p className="text-[#55695E] text-sm sm:text-base font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Jedes einzelne Verpackungselement wurde mit Bedacht gewählt. Kein Erdölplastik, kein chemischer Leim, kein schwerer Wegwerfkarton.'
                  : 'Every packaging component is consciously selected. Zero petroleum plastics, zero toxic glues, zero bulky gift boxes.'}
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenAbout}
                  className="inline-flex items-center space-x-2 font-woodblock text-base sm:text-lg uppercase tracking-wider text-[#B85D2C] hover:text-[#A04E24] group transition-colors cursor-pointer"
                >
                  <span>{lang === 'de' ? 'Über Ines Zager & ihre Haltung' : 'About Ines Zager & Her Vision'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Shop CTA Button */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenShop}
            className="inline-flex items-center space-x-3 px-10 py-4.5 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>{lang === 'de' ? 'Alle aktuellen Abfüllungen im Shop ansehen' : 'Explore All Current Releases'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
