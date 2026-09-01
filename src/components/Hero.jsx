import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Compass, Droplets } from 'lucide-react';
import { R2_BASE } from '../data/whiskyData';

export default function Hero({ onOpenVIP, onSelectFeatured }) {
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 flex items-center justify-center overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-br from-[#D4A359]/12 via-[#B8860B]/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#3E5C46]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121722] border border-[#D4A359]/40 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4A359] animate-ping" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4A359]">
                Single Cask · Fassstärke · Circular Packaging
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#F6F4EE] leading-[1.1] mb-6">
              The Purest Expression <br className="hidden sm:inline" />
              of <span className="gold-gradient-text">Scottish Whisky.</span>
            </h1>

            {/* Subline */}
            <p className="text-base sm:text-lg text-[#D8D2C2] max-w-2xl font-normal leading-relaxed mb-8">
              Handverlesene Einzelfässer bekannter Brennereien in unverdünnter Fassstärke. Radikal nachhaltig abgefüllt in 100% Wild Glass – persönlich kuratiert und auditiert von Umweltjuristin Ines Zager.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#releases"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D4A359] text-[#0B0E14] font-bold text-sm uppercase tracking-wider hover:bg-[#E9C68A] hover:shadow-[0_0_30px_rgba(212,163,89,0.4)] transition-all duration-300"
              >
                <span>Aktuelle Fässer entdecken</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenVIP}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#121722] border border-[#262F42] text-[#F6F4EE] hover:border-[#D4A359] hover:text-[#D4A359] font-medium text-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#D4A359]" />
                <span>VIP Drop Club (24h Early Access)</span>
              </button>
            </div>

            {/* Trust Signale Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#262F42]/80 w-full max-w-xl">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A359]">100%</div>
                <div className="text-xs text-[#A0AEC0] uppercase tracking-wider mt-0.5">Fassstärke & Pur</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F4EE]">Zero Waste</div>
                <div className="text-xs text-[#A0AEC0] uppercase tracking-wider mt-0.5">Recyceltes Wild Glass</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A359]">ZDF / ARTE</div>
                <div className="text-xs text-[#A0AEC0] uppercase tracking-wider mt-0.5">Bekannt aus Doku</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Bottle Showcase */}
          <motion.div 
            className="lg:col-span-5 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            {/* Ambient Background Aura */}
            <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#121722]/90 to-[#0B0E14] border border-[#D4A359]/20 p-8 shadow-2xl overflow-hidden group">
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,163,89,0.15),transparent_70%)]" />
              
              {/* Bottle Graphic / Placeholder with Real Asset Mapping */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <img
                  src={`${R2_BASE}glen-garioch-11.webp`}
                  alt="Glen Garioch 11 Jahre Single Cask PURE.WHISKY."
                  onError={(e) => {
                    // Graceful fallback display if asset is uploading
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                  className="max-h-[380px] sm:max-h-[440px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Fallback Graphic (hidden by default unless image 404s) */}
                <div className="hidden flex-col items-center justify-center py-12 px-6">
                  <div className="w-20 h-44 rounded-t-full rounded-b-lg border-2 border-[#D4A359] bg-gradient-to-b from-[#D4A359]/30 to-[#0B0E14] flex items-center justify-center mb-4 shadow-xl">
                    <span className="font-serif text-2xl font-bold text-[#D4A359]">PURE</span>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#D8D2C2]">Glen Garioch 11 Jahre</span>
                </div>

                {/* Floating Batch Pill */}
                <div className="mt-4 px-4 py-2 rounded-full bg-[#0B0E14]/90 border border-[#D4A359]/40 backdrop-blur-md flex items-center gap-2.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-[#F6F4EE]">
                    Glen Garioch · Nur noch 18 Flaschen
                  </span>
                </div>
              </div>

              {/* Interactive Quick Dossier Button */}
              <button
                onClick={() => onSelectFeatured('glen-garioch-11')}
                className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-lg bg-[#121722]/90 border border-[#262F42] hover:border-[#D4A359] text-[11px] text-[#D8D2C2] hover:text-[#D4A359] transition-all flex items-center gap-1.5"
              >
                <span>Tasting Notes ansehen</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
