import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS, IMAGES } from '../data/pureWhiskyFullData';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection({ onOpenShop, onOpenAbout, onOpenProduct, products = PRODUCTS }) {
  const { lang, t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 lg:pt-36 lg:pb-24 flex items-center border-b border-[#E2DDD5] overflow-hidden bg-[#FAF8F5]">
      
      {/* Background Image: Scottish Warehouse & Nature with gentle atmospheric gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={IMAGES.hero_back}
          alt="PURE.WHISKY. Hintergrund"
          className="w-full h-full object-cover object-right lg:object-center filter brightness-[0.93] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/92 via-55% to-[#FAF8F5]/30 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Tagline, Headline, Shortened Text & CTAs (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Tagline */}
            <div>
              <span className="font-script text-2xl sm:text-3xl text-[#2D6A4F] leading-none block font-bold">
                {t.hero.badge}
              </span>
            </div>

            {/* Woodblock Main Headline */}
            <h1 className="font-woodblock text-4xl sm:text-5xl lg:text-6xl text-[#181F1C] tracking-wide uppercase leading-[0.94]">
              {lang === 'de' ? (
                <>
                  SCHOTTISCHER WHISKY <br />
                  <span className="text-[#B85D2C]">IN REINFORM.</span>
                </>
              ) : (
                <>
                  SCOTCH WHISKY <br />
                  <span className="text-[#B85D2C]">IN ITS PUREST FORM.</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="font-script text-2xl sm:text-3xl text-[#3A4A40] leading-snug">
              {lang === 'de' ? 'Charaktervoll & nachhaltig.' : 'Characterful & sustainable.'}
            </p>

            {/* Shortened Positioning Paragraph */}
            <p className="text-[#3A4A40] text-sm sm:text-base font-normal leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* Primary Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3.5">
              <button
                onClick={onOpenShop}
                className="inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-base sm:text-lg tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{t.hero.btnShop}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAbout}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-[#F2EFE9] border border-[#D4C8B8] text-[#181F1C] font-woodblock text-base sm:text-lg tracking-wider uppercase transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{t.hero.btnStory}</span>
              </button>
            </div>

          </div>

          {/* Right Column: 4 Flaschen gestaffelt nebeneinander + Zitat */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full pt-4 lg:pt-0">
            {/* 1. Die 4 Flaschen horizontal nebeneinander mit Überlappung */}
            <div className="relative w-full flex flex-col items-center justify-center select-none">
              
              {/* Optionaler dezentester Lichtkegel hinter den Flaschen */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 md:w-[480px] h-64 sm:h-72 bg-[#D4C8B8]/30 blur-3xl rounded-full pointer-events-none" />

              {/* Flaschen-Reihe mit exakter Ebenen-Staffelung (-space-x) */}
              <div className="flex items-end justify-center -space-x-8 sm:-space-x-12 md:-space-x-14 lg:-space-x-16">
                {[
                  {
                    id: 'fettercairn-15',
                    name: 'Fettercairn 15Y',
                    caskInfo: '1st Fill Rivesaltes · 59,9%',
                    imgSrc: '/images/bottles/hero_fettercairn.webp',
                    fallbackImg: IMAGES.fettercairn_15_cutout,
                    glowClass: 'bg-[#0284C7]/12 group-hover:bg-[#0284C7]/18',
                    zIndex: 'z-10',
                    heightClass: 'h-64 sm:h-76 md:h-84 lg:h-[395px]',
                    baseOffset: 'mb-2 sm:mb-3',
                    shadowWidth: 'w-3/4',
                  },
                  {
                    id: 'glenburgie-11',
                    name: 'Glenburgie 11Y',
                    caskInfo: '1st Fill Oloroso · 59,2%',
                    imgSrc: '/images/bottles/hero_glenburgie.webp',
                    fallbackImg: IMAGES.glenburgie_11_cutout,
                    glowClass: 'bg-[#16A34A]/14 group-hover:bg-[#16A34A]/20',
                    zIndex: 'z-30',
                    heightClass: 'h-72 sm:h-84 md:h-96 lg:h-[445px]',
                    baseOffset: 'mb-0',
                    shadowWidth: 'w-4/5',
                  },
                  {
                    id: 'aultmore-17',
                    name: 'Aultmore 17Y',
                    caskInfo: 'Red Wine Finish · 54,5%',
                    imgSrc: '/images/bottles/hero_aultmore.webp',
                    fallbackImg: IMAGES.aultmore_17_cutout,
                    glowClass: 'bg-[#D97706]/14 group-hover:bg-[#D97706]/20',
                    zIndex: 'z-20',
                    heightClass: 'h-68 sm:h-80 md:h-92 lg:h-[420px]',
                    baseOffset: 'mb-1.5 sm:mb-2',
                    shadowWidth: 'w-3/4',
                  },
                  {
                    id: 'highlandpark-18',
                    name: 'Highland Park 18Y',
                    caskInfo: 'Bourbon Barrel · 54,3%',
                    imgSrc: '/images/bottles/hero_highlandpark.webp',
                    fallbackImg: IMAGES.highlandpark_18_cutout,
                    glowClass: 'bg-[#DB2777]/12 group-hover:bg-[#DB2777]/18',
                    zIndex: 'z-10',
                    heightClass: 'h-64 sm:h-76 md:h-84 lg:h-[395px]',
                    baseOffset: 'mb-2 sm:mb-3',
                    shadowWidth: 'w-3/4',
                  },
                ].map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      const prod = products.find((p) => p.id === b.id);
                      if (prod && onOpenProduct) {
                        onOpenProduct(prod);
                      } else if (onOpenShop) {
                        onOpenShop();
                      }
                    }}
                    className={`relative ${b.zIndex} ${b.baseOffset} group cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-2 focus:outline-none`}
                  >
                    {/* Sanfte, dezente Farb-Atmosphäre in der speziellen Farbe der Flasche */}
                    <div
                      className={`absolute inset-0 -inset-x-4 sm:-inset-x-8 ${b.glowClass} blur-3xl rounded-full pointer-events-none transition-all duration-500 scale-105`}
                    />

                    {/* Flaschenbild: Freigestellt, transparent, mit feinem Schatten */}
                    <img
                      src={b.imgSrc}
                      alt={b.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = b.fallbackImg;
                      }}
                      className={`${b.heightClass} w-auto object-contain block drop-shadow-[0_18px_22px_rgba(0,0,0,0.34)] filter brightness-[1.01] contrast-[1.02] group-hover:brightness-105 transition-all duration-300`}
                      loading="eager"
                    />

                    {/* Eigener Bodenschatten direkt unter dem Flaschenboden */}
                    <div
                      className={`${b.shadowWidth} h-3 bg-black/45 blur-xs rounded-full mx-auto -mt-2 group-hover:opacity-40 transition-opacity duration-300`}
                    />
                  </div>
                ))}
              </div>

              {/* Sanfter, breiter Gesamt-Bodenschatten */}
              <div className="w-11/12 max-w-lg h-7 bg-black/25 blur-xl rounded-full mx-auto -mt-3 pointer-events-none" />
            </div>

            {/* 2. Ines Zager Gründerinnen-Zitat: Schick in den Hintergrund eingearbeitet, groß & bestens lesbar */}
            <div className="w-full mt-6 sm:mt-8 pt-6 border-t border-[#D4C8B8]/60 flex items-start space-x-4 sm:space-x-5 text-left">
              <img
                src="/images/ines_portrait_round.webp"
                alt="Ines Zager"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = IMAGES.ines_portrait;
                }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#D4C8B8] shrink-0 mt-1 shadow-xs"
              />
              <div className="space-y-2 flex-1">
                <p className="font-serif italic text-base sm:text-lg lg:text-xl text-[#181F1C] leading-relaxed">
                  {t.hero.inesQuote}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 pt-1">
                  <span className="font-woodblock text-sm uppercase tracking-wider text-[#181F1C]">
                    {t.hero.inesName}
                  </span>
                  <span className="text-xs sm:text-sm font-craft-mono text-[#2D6A4F] font-bold">
                    · {t.hero.inesRole}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
