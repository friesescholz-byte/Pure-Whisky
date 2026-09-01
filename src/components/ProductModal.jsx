import React from 'react';
import { X, ShoppingBag, Leaf, Droplet, ShieldCheck, Sparkles, Check } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md" />

      <div className="relative w-full max-w-4xl bg-[#121722] border border-[#D4A359]/40 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 text-left max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0B0E14] text-[#A0AEC0] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Bottle Image */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0B0E14] border border-[#262F42]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[320px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
            />
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#121722] text-[#D4A359] border border-[#D4A359]/40 mb-1">
                {product.badge}
              </span>
              <div className="text-[11px] text-[#A0AEC0]">Fassart: {product.caskType}</div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A359] mb-1">
                {product.region} · {product.age}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F4EE]">
                {product.title}
              </h2>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#D4A359]">
                {product.price.toFixed(2).replace('.', ',')} €
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#718096] line-through">
                  {product.originalPrice.toFixed(2).replace('.', ',')} €
                </span>
              )}
              <span className="text-xs text-[#A0AEC0]">
                ({product.pricePerLiter} · inkl. MwSt. zzgl. Versand)
              </span>
            </div>

            {/* Sensorik Tasting Notes */}
            <div className="p-4 rounded-2xl bg-[#0B0E14] border border-[#262F42] space-y-2 text-xs">
              <div className="font-serif text-xs font-bold text-[#D4A359] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sensorisches Tasting-Profil</span>
              </div>
              <div><strong className="text-[#F6F4EE]">👃 Nose:</strong> <span className="text-[#D8D2C2]">{product.tastingNotes.nose}</span></div>
              <div><strong className="text-[#F6F4EE]">👅 Palate:</strong> <span className="text-[#D8D2C2]">{product.tastingNotes.palate}</span></div>
              <div><strong className="text-[#F6F4EE]">✨ Finish:</strong> <span className="text-[#D8D2C2]">{product.tastingNotes.finish}</span></div>
            </div>

            {/* Sustainability Story */}
            <div className="p-4 rounded-2xl bg-[#3E5C46]/20 border border-[#3E5C46]/50 space-y-1 text-xs">
              <div className="font-bold text-[#5A7F63] flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" />
                <span>{product.sustainability.headline}</span>
              </div>
              <p className="text-[#D8D2C2] leading-relaxed">
                {product.sustainability.story}
              </p>
            </div>

            {/* Technical Data */}
            <div className="grid grid-cols-3 gap-2 text-[11px] bg-[#0B0E14] p-3 rounded-xl border border-[#262F42]">
              <div><span className="text-[#718096] block">Alkohol:</span> <strong className="text-[#F6F4EE]">{product.abv}</strong></div>
              <div><span className="text-[#718096] block">Vintage:</span> <strong className="text-[#F6F4EE]">{product.vintage}</strong></div>
              <div><span className="text-[#718096] block">Auflage:</span> <strong className="text-[#D4A359]">{product.bottlerInfo.bottlesTotal} Flaschen</strong></div>
            </div>

            {product.isAvailable ? (
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-4 rounded-xl bg-[#D4A359] text-[#0B0E14] font-bold text-xs uppercase tracking-wider hover:bg-[#E9C68A] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>In den Warenkorb ({product.price.toFixed(2).replace('.', ',')} €)</span>
              </button>
            ) : (
              <div className="text-center py-3 rounded-xl bg-[#0B0E14] text-xs text-[#718096] border border-[#262F42]">
                Dieses Einzelfass ist aktuell ausverkauft.
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
