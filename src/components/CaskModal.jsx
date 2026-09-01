import React from 'react';
import { X, ShoppingBag, ShieldCheck, Award, Leaf, Droplet, Sparkles, Check } from 'lucide-react';

export default function CaskModal({ whisky, onClose, onAddToCart }) {
  if (!whisky) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#121722] border border-[#D4A359]/30 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 overflow-hidden text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0B0E14] border border-[#262F42] text-[#A0AEC0] hover:text-[#F6F4EE] hover:border-[#D4A359] transition-all"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Bottle Stage */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#1A2130]/60 to-[#0B0E14] border border-[#262F42]">
            <img
              src={whisky.image}
              alt={whisky.fullName}
              className="max-h-[340px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#0B0E14] text-[#D4A359] border border-[#D4A359]/40 mb-2">
                {whisky.badge}
              </span>
              <div className="text-xs text-[#A0AEC0]">
                Fass: {whisky.caskType}
              </div>
            </div>
          </div>

          {/* Right Column: Full Specifications & Sensorik */}
          <div className="lg:col-span-7 flex flex-col">
            
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A359] mb-1">
              Cask Passport & Dossier · {whisky.region}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F4EE] mb-3">
              {whisky.fullName}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-[#D4A359]">
                {whisky.price.toFixed(2).replace('.', ',')} €
              </span>
              {whisky.originalPrice && (
                <span className="text-sm text-[#718096] line-through">
                  {whisky.originalPrice.toFixed(2).replace('.', ',')} €
                </span>
              )}
              <span className="text-xs text-[#A0AEC0]">
                ({whisky.pricePerLiter} · inkl. MwSt.)
              </span>
            </div>

            {/* Sensorik Radar (Nose, Palate, Finish) */}
            <div className="space-y-3 mb-6 bg-[#0B0E14] p-5 rounded-2xl border border-[#262F42]">
              <div className="font-serif text-sm font-bold text-[#D4A359] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Sensorisches Geschmacksprofil</span>
              </div>
              
              <div className="text-xs">
                <strong className="text-[#F6F4EE] block mb-0.5">👃 Nase (Nose):</strong>
                <p className="text-[#D8D2C2] leading-relaxed">{whisky.tastingNotes.nose}</p>
              </div>

              <div className="text-xs">
                <strong className="text-[#F6F4EE] block mb-0.5">👅 Gaumen (Palate):</strong>
                <p className="text-[#D8D2C2] leading-relaxed">{whisky.tastingNotes.palate}</p>
              </div>

              <div className="text-xs">
                <strong className="text-[#F6F4EE] block mb-0.5">✨ Nachklang (Finish):</strong>
                <p className="text-[#D8D2C2] leading-relaxed">{whisky.tastingNotes.finish}</p>
              </div>
            </div>

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-[#0B0E14] border border-[#262F42]">
                <div className="text-[10px] text-[#718096] uppercase">Alkoholgehalt</div>
                <div className="text-xs font-bold text-[#F6F4EE]">{whisky.abv}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0B0E14] border border-[#262F42]">
                <div className="text-[10px] text-[#718096] uppercase">Destilliert / Reifung</div>
                <div className="text-xs font-bold text-[#F6F4EE]">{whisky.vintage}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0B0E14] border border-[#262F42]">
                <div className="text-[10px] text-[#718096] uppercase">Auflage</div>
                <div className="text-xs font-bold text-[#D4A359]">{whisky.bottlesTotal} Flaschen</div>
              </div>
            </div>

            {/* Sustainability Check */}
            <div className="p-4 rounded-xl bg-[#3E5C46]/15 border border-[#3E5C46]/40 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5A7F63] mb-1">
                <Leaf className="w-4 h-4" />
                <span>{whisky.sustainability.title}</span>
              </div>
              <p className="text-xs text-[#D8D2C2] leading-relaxed">
                {whisky.sustainability.desc}
              </p>
            </div>

            {/* CTA Buy Button */}
            {whisky.isAvailable ? (
              <button
                onClick={() => {
                  onAddToCart(whisky);
                  onClose();
                }}
                className="w-full py-4 rounded-xl bg-[#D4A359] text-[#0B0E14] font-bold text-sm uppercase tracking-wider hover:bg-[#E9C68A] hover:shadow-[0_0_25px_rgba(212,163,89,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>In den Warenkorb ({whisky.price.toFixed(2).replace('.', ',')} €)</span>
              </button>
            ) : (
              <div className="text-center py-3 rounded-xl bg-[#0B0E14] text-xs text-[#718096] border border-[#262F42]">
                Dieses Einzelfass ist vollständig vergriffen. Tragen Sie sich in den VIP Club ein für den nächsten Drop.
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
