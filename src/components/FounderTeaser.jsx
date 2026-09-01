import React from 'react';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/pureWhiskyFullData';

export default function FounderTeaser({ onOpenAbout, onOpenShop }) {
  return (
    <section className="py-28 lg:py-36 bg-[#FAF8F5] border-b border-[#E2DDD5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        <div className="bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#E2DDD5] shadow-md h-[420px] relative">
                <img
                  src={IMAGES.ines_portrait}
                  alt="Ines Zager Porträt"
                  className="w-full h-full object-cover object-top filter brightness-[0.95]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="font-script text-3xl text-[#2D6A4F] block">
                Die Gründerin · Ines Zager
              </span>
              <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase leading-tight">
                Vom Umwelt- & Energierecht zum Lebenstraum im Whisky.
              </h2>
              <blockquote className="font-script text-2xl text-[#181F1C] leading-snug border-l-2 border-[#B85D2C] pl-6 italic">
                „Ich glaube nicht an Dogmen wie ‚kein Eis im Whisky‘ oder Urteile nach dunkler Farbe. Gut ist, was gefällt.“
              </blockquote>
              <p className="text-[#3A4A40] text-base sm:text-lg font-normal leading-relaxed">
                Als Umweltjuristin bei großen Energiekonzernen fuhr Ines Zager 2023 ihre Karriere auf Teilzeit zurück, um PURE.WHISKY. zu gründen: Reine Fassstärke, 100% Einzelfass und persönliche Vor-Ort-Audits der Brennereien.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={onOpenAbout}
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-lg bg-[#181F1C] hover:bg-[#2C3831] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-xs"
                >
                  <span>Ganze Geschichte lesen</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenShop}
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-lg bg-[#E8EFEA] hover:bg-[#D8E4DC] text-[#181F1C] font-woodblock text-xl tracking-wider uppercase transition-all"
                >
                  <span>Die 4 Fässer im Shop</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
