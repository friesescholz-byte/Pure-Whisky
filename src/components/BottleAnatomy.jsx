import React, { useState } from 'react';
import { PACKAGING_HOTSPOTS, R2_BASE } from '../data/whiskyData';
import { Sparkles, Trees, Leaf, Stamp, CheckCircle } from 'lucide-react';

export default function BottleAnatomy() {
  const [selectedSpot, setSelectedSpot] = useState(PACKAGING_HOTSPOTS[0]);

  const getIcon = (id) => {
    switch (id) {
      case 'glass': return Sparkles;
      case 'cork': return Trees;
      case 'capsule': return Leaf;
      case 'label': return Stamp;
      default: return Sparkles;
    }
  };

  return (
    <section id="packaging" className="py-24 bg-[#0B0E14] relative border-t border-[#262F42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121722] border border-[#3E5C46]/50 text-xs font-semibold tracking-wider text-[#5A7F63] uppercase mb-4">
            <Leaf className="w-3.5 h-3.5" />
            <span>100% Circular Crafting</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F4EE] mb-4">
            Die Anatomie einer nachhaltigen Flasche
          </h2>
          <p className="text-[#D8D2C2] text-sm sm:text-base leading-relaxed">
            Jede Komponente wird nach strengsten ökologischen Kriterien ausgewählt – von 100% recyceltem Wild Glass bis zum biologisch abbaubaren Etikettenkleber.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left / Center: Interactive Bottle Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center p-8 rounded-3xl bg-[#121722]/60 border border-[#262F42]">
            <div className="relative">
              <img
                src={`${R2_BASE}glen-garioch-11.webp`}
                alt="PURE.WHISKY. Nachhaltige Flasche"
                className="max-h-[460px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-24 h-64 border-2 border-[#D4A359] rounded-t-full bg-gradient-to-b from-[#D4A359]/20 to-transparent items-center justify-center">
                <span className="text-xs text-[#D4A359]">Wild Glass</span>
              </div>

              {/* Hotspot Pulsing Buttons */}
              {PACKAGING_HOTSPOTS.map((spot) => {
                const isSelected = selectedSpot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot)}
                    style={{ top: spot.y, left: spot.x }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#D4A359] text-[#0B0E14] scale-125 shadow-[0_0_20px_rgba(212,163,89,0.8)]'
                        : 'bg-[#121722] border-2 border-[#D4A359] text-[#D4A359] hover:scale-110'
                    }`}
                    title={spot.title}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Hotspot Info Cards */}
          <div className="lg:col-span-6 space-y-4 text-left">
            {PACKAGING_HOTSPOTS.map((spot) => {
              const isSelected = selectedSpot.id === spot.id;
              const Icon = getIcon(spot.id);

              return (
                <div
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-[#121722] border-[#D4A359] shadow-xl'
                      : 'bg-[#0B0E14] border-[#262F42] hover:border-[#D4A359]/40 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      isSelected ? 'bg-[#D4A359] text-[#0B0E14]' : 'bg-[#121722] text-[#D4A359]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-lg font-bold text-[#F6F4EE]">
                          {spot.title}
                        </h3>
                        {isSelected && (
                          <span className="text-[10px] uppercase font-bold text-[#D4A359] tracking-wider">Aktiv</span>
                        )}
                      </div>
                      <div className="text-xs text-[#D4A359] mb-2 font-medium">
                        {spot.subtitle}
                      </div>
                      <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed">
                        {spot.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
