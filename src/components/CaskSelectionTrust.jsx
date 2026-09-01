import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CaskSelectionTrust({ onOpenShop, onOpenAbout, onOpenSustainability }) {
  const testingImg = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/Pure-Whisky-Testing.jpg';
  const barrelImg = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/ines-zager-fass-lager.webp';

  return (
    <section id="trust-section" className="py-28 lg:py-40 bg-white border-b border-[#E2DDD5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-24 space-y-4">
          <span className="font-script text-3xl sm:text-4xl text-[#2D6A4F] block">
            Persönliche Fassauswahl
          </span>
          <h1 className="font-woodblock text-5xl sm:text-6xl lg:text-7xl text-[#181F1C] tracking-wide uppercase leading-tight">
            Vom Fasslager in Schottland <br />
            <span className="text-[#B85D2C]">direkt in dein Glas.</span>
          </h1>
          <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed pt-2">
            Ich kaufe keine Fässer aus anonymen Großhandelskatalogen. Als unabhängige Abfüllerin 
            stehe ich selbst in den schottischen Lagerhäusern, ziehe die Fassproben von Hand und 
            auditiere jede Brennerei persönlich vor Ort.
          </p>
        </div>

        {/* 2 Expansive Alternating Editorial Story Rows */}
        <div className="space-y-28 mb-24">
          
          {/* Row 1: Tasting & Sensory Excellence -> Links to Sustainability */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Huge Image (6 cols) */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-[440px] sm:h-[520px] bg-[#FAF8F5] group">
                <img
                  src={testingImg}
                  alt="Ines Zager bei der Fassverkostung"
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Narrative Text (6 cols) */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <span className="font-script text-3xl text-[#2D6A4F] block">
                Sensorische Fassauswahl
              </span>
              <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase leading-tight">
                Kein Verschnitt. <br />
                <span className="text-[#B85D2C]">Reine Fassstärke.</span>
              </h2>
              <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed">
                Nur Fässer, die durch eine außergewöhnliche Aromenvielfalt überzeugen, 
                erhalten das PURE.WHISKY. Siegel. Jede Abfüllung bleibt 100% naturbelassen – 
                ohne Kältefiltration und ohne künstliche Zuckerkulör-Färbung.
              </p>
              <p className="text-[#55695E] text-base font-normal leading-relaxed">
                Direkt mit dem Valinch aus dem Fass gezogen, unverdünnt mit 53,2% bis 56,7% vol. abgefüllt. 
                Sie schmecken die pure, unverfälschte Reifung in traditionellem Holz.
              </p>
              
              {/* Subtle Link to Sustainability Page */}
              <div className="pt-2">
                <button
                  onClick={onOpenSustainability}
                  className="inline-flex items-center space-x-2 font-woodblock text-lg uppercase tracking-wider text-[#B85D2C] hover:text-[#A04E24] group transition-colors"
                >
                  <span>Mehr zu Circular Craft & Nachhaltigkeit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>

          {/* Row 2: Warehouse Inspection & Audit -> Links to About Ines Zager */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Narrative Text (6 cols, order 2 on mobile, order 1 on desktop) */}
            <div className="lg:col-span-6 space-y-5 text-left order-2 lg:order-1">
              <span className="font-script text-3xl text-[#2D6A4F] block">
                Vor-Ort Umwelt-Audit
              </span>
              <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase leading-tight">
                Geprüfte Herkunft & <br />
                <span className="text-[#B85D2C]">Volle Transparenz.</span>
              </h2>
              <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed">
                Als Juristin für Umwelt- und Energierecht bewerte ich Quellenschutz, CO₂-Reduktion, 
                Biomasse-Nutzung und geschlossene Kreisläufe nach EMAS- und ISO-Kriterien.
              </p>
              <p className="text-[#55695E] text-base font-normal leading-relaxed">
                Bei mir gibt es keine Fantasienamen oder „Secret Highlands“. 
                Sie erfahren genau, aus welcher Brennerei Ihr Einzelfass stammt und wie vor Ort gearbeitet wird.
              </p>

              {/* Subtle Link to About Ines Zager Page */}
              <div className="pt-2">
                <button
                  onClick={onOpenAbout}
                  className="inline-flex items-center space-x-2 font-woodblock text-lg uppercase tracking-wider text-[#B85D2C] hover:text-[#A04E24] group transition-colors"
                >
                  <span>Mehr über Ines Zager & ihre Haltung</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Huge Image (6 cols, order 1 on mobile, order 2 on desktop) */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-[440px] sm:h-[520px] bg-[#FAF8F5] group">
                <img
                  src={barrelImg}
                  alt="Ines Zager im schottischen Fasslager"
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Clean, Centered Shop CTA Button */}
        <div className="text-center pt-6">
          <button
            onClick={onOpenShop}
            className="inline-flex items-center space-x-3 px-10 py-4.5 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-md hover:shadow-lg"
          >
            <span>Alle aktuellen Einzelfässer im Shop ansehen</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
