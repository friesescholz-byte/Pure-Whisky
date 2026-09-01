import React from 'react';
import { X, ShoppingBag, Leaf } from 'lucide-react';

export default function ProductDossierModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-[#D4C8B8] rounded-2xl overflow-hidden shadow-2xl my-8 text-left max-h-[90vh] flex flex-col">
        
        <div className="p-6 border-b border-[#E2DDD5] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#2D6A4F] font-bold">
              Cask Dossier · {product.region}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-normal">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-[#FAF8F5] p-6 rounded-xl border border-[#E2DDD5]">
              <img
                src={product.image}
                alt={product.fullName}
                className="max-h-80 w-auto object-contain drop-shadow-md"
              />
              <div className="mt-4 text-center">
                <span className="text-xs text-[#55695E] font-bold uppercase tracking-wider">100% Estal Wild Glass (PCR)</span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-6">
              <div>
                <h3 className="font-serif text-xl text-[#181F1C] font-bold mb-3">Spezifikationen</h3>
                <div className="space-y-2 text-sm text-[#3A4A40]">
                  <div className="flex justify-between py-2 border-b border-[#E2DDD5]">
                    <span className="text-[#55695E]">Brennerei:</span>
                    <span className="font-bold text-[#181F1C]">{product.distillery} ({product.region})</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E2DDD5]">
                    <span className="text-[#55695E]">Alkoholstärke:</span>
                    <span className="font-bold text-[#2D6A4F]">{product.abv} (Natives Einzelfass)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E2DDD5]">
                    <span className="text-[#55695E]">Fass-Typ:</span>
                    <span className="font-medium text-[#181F1C]">{product.caskType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E2DDD5]">
                    <span className="text-[#55695E]">Destillation & Abfüllung:</span>
                    <span className="font-medium text-[#181F1C]">{product.vintage}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E2DDD5]">
                    <span className="text-[#55695E]">Limitation:</span>
                    <span className="font-bold text-[#181F1C]">{product.bottlesTotal} Flaschen weltweit</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E2DDD5]">
                    <span className="text-[#55695E]">Filtration & Farbe:</span>
                    <span className="font-bold text-[#2D6A4F]">Ungefiltert · Ohne Farbstoff</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#181F1C] font-bold mb-3">Verkostungsnotizen</h3>
                <div className="space-y-3 text-sm leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5]">
                    <strong className="text-[#B85D2C] block mb-1 font-bold">Nase (Nose):</strong>
                    <span className="text-[#3A4A40]">{product.tastingNotes.nose}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5]">
                    <strong className="text-[#B85D2C] block mb-1 font-bold">Gaumen (Palate):</strong>
                    <span className="text-[#3A4A40]">{product.tastingNotes.palate}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5]">
                    <strong className="text-[#B85D2C] block mb-1 font-bold">Nachklang (Finish):</strong>
                    <span className="text-[#3A4A40]">{product.tastingNotes.finish}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#E8EFEA] border border-[#C5D8CC] space-y-2 text-left">
            <div className="flex items-center space-x-2 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-4 h-4" />
              <span>Vor-Ort Umwelt-Audit (Ines Zager)</span>
            </div>
            <h4 className="font-serif text-lg text-[#1B2B23] font-bold">{product.sustainability.headline}</h4>
            <p className="text-sm text-[#3A4A40] font-normal leading-relaxed">
              {product.sustainability.story}
            </p>
          </div>

        </div>

        <div className="p-6 border-t border-[#E2DDD5] bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <div className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-bold">{product.price.toFixed(2)} €</div>
            <div className="text-xs text-[#55695E]">{product.pricePerLiter} · inkl. MwSt. zzgl. Versand</div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-lg bg-white hover:bg-neutral-100 border border-[#D4C8B8] text-[#181F1C] text-xs uppercase tracking-wider font-bold flex-1 sm:flex-none shadow-xs"
            >
              Schließen
            </button>
            {product.isAvailable ? (
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="px-7 py-3 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white text-xs uppercase tracking-widest font-bold flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>In den Warenkorb</span>
              </button>
            ) : (
              <span className="text-xs uppercase tracking-wider text-neutral-400 py-3 px-4 bg-neutral-100 rounded-lg">
                Ausverkauft
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
