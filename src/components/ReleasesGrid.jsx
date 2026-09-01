import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WHISKY_RELEASES, R2_BASE } from '../data/whiskyData';
import { ShoppingBag, Eye, Award, Sparkles, Check, Flame } from 'lucide-react';

export default function ReleasesGrid({ onOpenDossier, onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [addedId, setAddedId] = useState(null);

  const filteredReleases = WHISKY_RELEASES.filter(r => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'available') return r.isAvailable;
    if (activeFilter === 'highlands') return r.region === 'Highlands';
    if (activeFilter === 'islands') return r.region === 'Islands';
    return true;
  });

  const handleAddToCart = (whisky) => {
    onAddToCart(whisky);
    setAddedId(whisky.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="releases" className="py-24 sm:py-32 relative">
      
      {/* Background Accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D4A359]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A359] mb-3">
              <Flame className="w-4 h-4 text-[#D4A359]" />
              <span>Limitierte Fassabfüllungen</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F4EE] leading-tight">
              Aktuelle Einzelfass-Drops
            </h2>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#121722] border border-[#262F42]">
            {[
              { id: 'all', label: 'Alle Fässer' },
              { id: 'available', label: 'Sofort Lieferbar' },
              { id: 'highlands', label: 'Highlands' },
              { id: 'islands', label: 'Islands' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                  activeFilter === tab.id
                    ? 'bg-[#D4A359] text-[#0B0E14] shadow-md'
                    : 'text-[#A0AEC0] hover:text-[#F6F4EE]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredReleases.map((whisky) => {
            const percentageLeft = whisky.bottlesTotal > 0 ? (whisky.bottlesRemaining / whisky.bottlesTotal) * 100 : 0;
            
            return (
              <motion.div
                key={whisky.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col rounded-2xl bg-[#121722]/80 border border-[#262F42] hover:border-[#D4A359]/40 transition-all duration-400 overflow-hidden shadow-xl hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Image Stage */}
                <div className="relative aspect-[3/4] p-6 flex items-center justify-center bg-gradient-to-b from-[#1A2130]/40 to-[#0B0E14] overflow-hidden">
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      whisky.isAvailable
                        ? 'bg-[#0B0E14]/90 text-[#D4A359] border border-[#D4A359]/40'
                        : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                    }`}>
                      {whisky.badge}
                    </span>
                  </div>

                  {/* Bottle Image */}
                  <img
                    src={whisky.image}
                    alt={whisky.fullName}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    className="max-h-[260px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Fallback Graphic */}
                  <div className="hidden flex-col items-center justify-center py-10">
                    <div className="w-14 h-36 rounded-t-full rounded-b-md border border-[#D4A359] bg-[#D4A359]/20 flex items-center justify-center">
                      <span className="font-serif text-xs text-[#D4A359]">PURE</span>
                    </div>
                  </div>

                  {/* Quick View Overlay Trigger */}
                  <button
                    onClick={() => onOpenDossier(whisky)}
                    className="absolute inset-0 bg-[#0B0E14]/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold text-[#F6F4EE]"
                  >
                    <Eye className="w-4 h-4 text-[#D4A359]" />
                    <span>Cask Dossier öffnen</span>
                  </button>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Region & Vintage */}
                    <div className="text-[11px] font-semibold text-[#D4A359] uppercase tracking-wider mb-1">
                      {whisky.region} · {whisky.vintage}
                    </div>

                    {/* Bottle Name */}
                    <h3 className="font-serif text-xl font-bold text-[#F6F4EE] group-hover:text-[#D4A359] transition-colors mb-2 leading-snug">
                      {whisky.name}
                    </h3>

                    {/* Flavor Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {whisky.character.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-[#0B0E14] text-[10px] text-[#A0AEC0] border border-[#262F42]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Scarcity Bar */}
                    {whisky.isAvailable && (
                      <div className="mb-5">
                        <div className="flex justify-between text-[11px] text-[#A0AEC0] mb-1.5">
                          <span>Verfügbarkeit</span>
                          <span className="font-bold text-[#D4A359]">{whisky.bottlesRemaining} von {whisky.bottlesTotal} Flaschen</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#0B0E14] rounded-full overflow-hidden border border-[#262F42]">
                          <div
                            className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4A359] rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(percentageLeft, 8)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price & Add to Cart Footer */}
                  <div className="pt-4 border-t border-[#262F42]/80 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-[#F6F4EE]">
                          {whisky.price.toFixed(2).replace('.', ',')} €
                        </span>
                        {whisky.originalPrice && (
                          <span className="text-xs text-[#718096] line-through">
                            {whisky.originalPrice.toFixed(2).replace('.', ',')} €
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#718096]">
                        {whisky.pricePerLiter} · inkl. MwSt.
                      </div>
                    </div>

                    {whisky.isAvailable ? (
                      <button
                        onClick={() => handleAddToCart(whisky)}
                        disabled={addedId === whisky.id}
                        className={`p-3 rounded-full transition-all ${
                          addedId === whisky.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#D4A359] text-[#0B0E14] hover:bg-[#E9C68A] hover:shadow-[0_0_15px_rgba(212,163,89,0.4)]'
                        }`}
                        title="In den Warenkorb"
                      >
                        {addedId === whisky.id ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenDossier(whisky)}
                        className="px-3 py-1.5 rounded-lg bg-[#0B0E14] text-[11px] text-[#718096] border border-[#262F42]"
                      >
                        Archiv
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
