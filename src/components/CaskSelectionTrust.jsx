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
              ? 'Als unabhängige Abfüllerin verknüpfe ich die Leidenschaft für kompromisslose Single Cask Abfüllungen mit 20 Jahren fundierter Berufserfahrung im Umwelt- und Energiebereich.'
              : 'As an independent bottler, I combine my passion for uncompromising single cask releases with 20 years of sound professional experience in the environmental and energy sectors.'}
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
              <p className="text-[#222D27] text-base sm:text-lg font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Jede Flasche wird unverdünnt in natürlicher Fassstärke ohne Kühlfiltration und ohne Farbstoffe abgefüllt. Die verwendeten Fässer werden so ausgewählt, dass sie die eigentliche DNA der jeweiligen Brennerei unterstreichen und nicht verdecken.'
                  : 'Every bottle is filled undiluted at natural cask strength without chill-filtration and without colouring. The casks are selected specifically to highlight the authentic DNA of each distillery rather than cover it up.'}
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
              <p className="text-[#222D27] text-base sm:text-lg font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Die bewusste Auswahl der Brennereien steht im Vordergrund. Ich beschäftige mich seit rund 20 Jahren beruflich mit Nachhaltigkeits- und Umweltthemen und untersuche deshalb auch die Hintergründe der Brennereien, bevor ich ein Fass erwerbe. Dabei orientiere ich mich unter anderem an Kriterien etablierter Umweltmanagementsysteme wie EMAS und ISO 14001.'
                  : 'The conscious selection of distilleries takes precedence. Having worked professionally with sustainability and environmental topics for around 20 years, I examine the background of each distillery before acquiring a cask. I am guided, among other things, by the criteria of established environmental management systems such as EMAS and ISO 14001.'}
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
                {lang === 'de' ? 'Wertigkeit' : 'Craft & Value'}
              </h3>
              <p className="text-[#222D27] text-base sm:text-lg font-normal leading-relaxed">
                {lang === 'de'
                  ? 'PURE.WHISKY. setzt unter anderem auf recycelte Glasflaschen, ressourcenschonende Korken aus Korkgranulat-Aktivkohlegemisch, Kapselverschlüsse aus vollständig abbaubarem Biopolymer sowie auf mit biologisch abbaubarer Tinte handgestempelte Etiketten aus PFAS-freiem Büttenpapier.'
                  : 'PURE.WHISKY. relies on recycled glass bottles, resource-saving corks made from a cork granulate and activated carbon mix, capsules made from fully biodegradable biopolymer, and hand-stamped labels made of PFAS-free handmade paper printed with biodegradable ink.'}
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenAbout}
                  className="inline-flex items-center space-x-2 font-woodblock text-base sm:text-lg uppercase tracking-wider text-[#B85D2C] hover:text-[#A04E24] group transition-colors cursor-pointer"
                >
                  <span>{t.hero.btnStory}</span>
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
            <span>{t.hero.btnShop}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
