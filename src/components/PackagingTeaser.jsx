import React from 'react';
import { ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';
import { IMAGES } from '../data/pureWhiskyFullData';

export default function PackagingTeaser({ onOpenSustainability, onOpenShop }) {
  return (
    <section className="py-28 lg:py-36 bg-[#FAF8F5] border-b border-[#E2DDD5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="font-script text-3xl text-[#2D6A4F] block">
              100% Circular Packaging
            </span>
            <h2 className="font-woodblock text-4xl sm:text-5xl lg:text-6xl text-[#181F1C] tracking-wide uppercase leading-tight">
              Radikal nachhaltig. <br />
              <span className="text-[#B85D2C]">Ohne Erdölplastik.</span>
            </h2>
            <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
              Jede PURE.WHISKY. Flasche ist ein handwerkliches Unikat: 100% recyceltes Wild Glass aus Spanien, unbehandelter Naturkork aus 5. Familiengeneration, kompostierbare Biopolymer-Kapseln und handgestempeltes Saatenpapier.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onOpenSustainability}
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-lg bg-[#181F1C] hover:bg-[#2C3831] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-xs"
              >
                <span>Alle Details zur Nachhaltigkeit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenShop}
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-lg bg-[#E8EFEA] hover:bg-[#D8E4DC] text-[#181F1C] font-woodblock text-xl tracking-wider uppercase transition-all"
              >
                <span>Flaschen ansehen</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-96 relative">
              <img
                src={IMAGES.wild_glass}
                alt="100% Wild Glass Estal Spanien"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/65 backdrop-blur-md text-white text-xs font-craft-mono font-bold">
                100% PCR Estal Wild Glass · Spanischer Naturkork · Saatenpapier
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
