import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { PRODUCTS, IMAGES, R2_BASE } from '../data/pureWhiskyFullData';

export default function HeroSection({ onOpenShop, onOpenAbout, onOpenProduct, products = PRODUCTS }) {
  // Show ONLY the 2 in-stock bottles + the 4 new September 17 releases (Total 6 bottles)
  // All using transparent cut-out images without background!
  const heroConfig = [
    { id: 'jura-15', defaultImage: `${R2_BASE}Produkte/Pure-Whisky04.webp` },
    { id: 'glengarioch-11', defaultImage: `${R2_BASE}Produkte/Pure-Whisky03.webp` },
    { id: 'glenburgie-11', defaultImage: `${R2_BASE}Produkte-2026/Pure-Whisky-Fass_01.webp` },
    { id: 'fettercairn-15', defaultImage: `${R2_BASE}Produkte-2026/Pure-Whisky-Fass_02.webp` },
    { id: 'aultmore-17', defaultImage: `${R2_BASE}Produkte-2026/Pure-Whisky-Fass_03.webp` },
    { id: 'highlandpark-18', defaultImage: `${R2_BASE}Produkte-2026/Pure-Whisky-Fass_04.webp` }
  ];

  const heroProducts = heroConfig.map(item => {
    const p = products.find(prod => prod.id === item.id) || {};
    const isSoldOut = p.soldOut === true || (p.isAvailable === false && !p.isUpcoming);
    const isUpcoming = p.isUpcoming === true;
    let tag = 'Sofort lieferbar';
    if (isUpcoming) {
      tag = p.releaseDate ? `Ab ${p.releaseDate}` : 'Ab 17. September';
    } else if (isSoldOut) {
      tag = 'Ausverkauft';
    }
    return {
      ...p,
      image: item.defaultImage,
      tagText: tag,
      isUpcoming,
      soldOut: isSoldOut,
      isAvailable: !isSoldOut && !isUpcoming
    };
  }).filter(p => p && p.id);

  const [activeIdx, setActiveIdx] = useState(0);
  // Auto-rotation disabled per user request: rotation only happens via explicit mouse click!

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % heroProducts.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
  };

  return (
    <section className="relative min-h-[95vh] pt-36 pb-24 lg:pt-40 lg:pb-32 flex items-center border-b border-[#E2DDD5] overflow-hidden bg-[#FAF8F5]">
      
      {/* Background Image: Hero Back with Ines & Scottish Warehouse */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero_back}
          alt="PURE.WHISKY. Hintergrund"
          className="w-full h-full object-cover object-right lg:object-center filter brightness-[0.92] contrast-[1.03]"
        />
        {/* Soft Organic Gradients for Perfect Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 via-55% to-[#FAF8F5]/20 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Pure Luxury Brand Story & CTAs (5 cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Clean Script Tagline */}
            <div>
              <span className="font-script text-3xl sm:text-4xl text-[#2D6A4F] leading-none block">
                Highland & Islands Single Cask
              </span>
            </div>

            {/* Woodblock Main Headline */}
            <h1 className="font-woodblock text-5xl sm:text-6xl lg:text-7xl text-[#181F1C] tracking-wide uppercase leading-[0.93]">
              SCHOTTISCHER WHISKY <br />
              <span className="text-[#B85D2C]">IN REINFORM.</span>
            </h1>

            {/* Script Subtitle */}
            <p className="font-script text-2xl sm:text-3xl text-[#3A4A40] leading-snug">
              Direkt aus dem Fass – unverdünnt, ungefiltert & ohne Farbstoffe.
            </p>

            {/* Pure Story & Philosophy Paragraph */}
            <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed max-w-xl">
              Keine künstliche Färbung, keine Kühlfiltration, kein Versteckspiel. 
              Handverlesene Einzelfässer in nativer Fassstärke – vor Ort in Schottland 
              nach strengen Umwelt- & Qualitätskriterien auditiert von Juristin Ines Zager.
            </p>

            {/* Primary Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onOpenShop}
                className="inline-flex items-center justify-center space-x-3 px-9 py-4.5 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Die Fässer im Shop entdecken</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenAbout}
                className="inline-flex items-center justify-center px-8 py-4.5 rounded-lg bg-white hover:bg-[#F2EFE9] border border-[#D4C8B8] text-[#181F1C] font-woodblock text-xl tracking-wider uppercase transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Über Ines Zager & Haltung</span>
              </button>
            </div>

          </div>

          {/* Right Column: Massive Smooth 3D Rotating Bottles (7 cols) */}
          <div 
            className="lg:col-span-7 flex flex-col items-center justify-center relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            
            {/* The 3D Rotating Carousel Container */}
            <div className="relative w-full h-[580px] sm:h-[660px] lg:h-[720px] flex items-center justify-center">
              
              {heroProducts.map((prod, idx) => {
                const offset = (idx - activeIdx + heroProducts.length) % heroProducts.length;
                let x = 0;
                let scale = 1;
                let zIndex = 30;
                let opacity = 1;
                let blur = 0;

                if (offset === 0) {
                  // Active center bottle (MASSIVE & PROMINENT)
                  x = 0;
                  scale = 1;
                  zIndex = 30;
                  opacity = 1;
                  blur = 0;
                } else if (offset === 1) {
                  // Next bottle to the right
                  x = 210;
                  scale = 0.74;
                  zIndex = 20;
                  opacity = 0.38;
                  blur = 1.5;
                } else if (offset === heroProducts.length - 1) {
                  // Previous bottle to the left
                  x = -210;
                  scale = 0.74;
                  zIndex = 20;
                  opacity = 0.38;
                  blur = 1.5;
                } else {
                  // Hidden back bottles
                  x = 0;
                  scale = 0.45;
                  zIndex = 10;
                  opacity = 0;
                  blur = 4;
                }

                return (
                  <motion.div
                    key={prod.id}
                    className="absolute cursor-pointer flex flex-col items-center justify-center"
                    animate={{
                      x: x,
                      scale: scale,
                      opacity: opacity,
                      zIndex: zIndex,
                      filter: `blur(${blur}px)`,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (offset === 0) {
                        onOpenProduct(prod);
                      } else {
                        setActiveIdx(idx);
                      }
                    }}
                  >
                    {/* Massive Full-Height Bottle Image with Status Badge */}
                    <div className="relative h-[500px] sm:h-[600px] lg:h-[660px] flex flex-col items-center justify-center">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="max-h-[86%] w-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.38)] hover:scale-105 transition-transform duration-300 pointer-events-auto"
                        loading="eager"
                      />

                      {/* Small Discreet Status Pill */}
                      {prod.isUpcoming ? (
                        <span className="mt-3 px-3 py-1 rounded-full bg-[#FAF0EB]/95 border border-[#F2DDD2] text-[#B85D2C] font-craft-mono text-xs font-bold uppercase tracking-wider shadow-sm flex items-center space-x-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Ab 17. September</span>
                        </span>
                      ) : (
                        <span className="mt-3 px-3 py-1 rounded-full bg-[#E8EFEA]/95 border border-[#C5D8CC] text-[#2D6A4F] font-craft-mono text-xs font-bold uppercase tracking-wider shadow-sm">
                          Sofort lieferbar
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Clean Minimalist Arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="group absolute -left-2 sm:left-1 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-3.5 rounded-full bg-white/80 hover:bg-white border border-[#D4C8B8] hover:border-[#B85D2C] text-[#2D6A4F] hover:text-[#B85D2C] shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer backdrop-blur-xs"
                aria-label="Vorherige Flasche"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={2.2} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="group absolute -right-2 sm:right-1 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-3.5 rounded-full bg-white/80 hover:bg-white border border-[#D4C8B8] hover:border-[#B85D2C] text-[#2D6A4F] hover:text-[#B85D2C] shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer backdrop-blur-xs"
                aria-label="Nächste Flasche"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.2} />
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
