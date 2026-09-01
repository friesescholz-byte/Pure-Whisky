import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/pureWhiskyFullData';

export default function ShopSection({ onOpenProduct, onAddToCart, onOpenShop }) {
  return (
    <section id="shop-section" className="py-28 lg:py-36 bg-[#FAF8F5] border-b border-[#E2DDD5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 space-y-4 md:space-y-0 text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="font-script text-3xl text-[#2D6A4F] block">
              Boutique Abfüllungen
            </span>
            <h2 className="font-woodblock text-4xl sm:text-5xl lg:text-6xl text-[#181F1C] tracking-wide uppercase">
              Die aktuellen 4 Einzelfässer.
            </h2>
            <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
              Jede Edition ist ein unberührtes Unikat. Reifung in traditionellen Eichenfässern, 
              ohne Farbstoffzusatz direkt in nativer Fassstärke abgefüllt.
            </p>
          </div>

          <button
            onClick={onOpenShop}
            className="inline-flex items-center space-x-2 font-woodblock text-xl tracking-wider uppercase text-[#B85D2C] hover:text-[#A04E24] transition-colors"
          >
            <span>Alle Fässer im Shop ansehen</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {PRODUCTS.map(product => (
            <div
              key={product.id}
              className="bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-left shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Bottle Card Stage with Scenic Scottish Background */}
                <div 
                  className="h-80 sm:h-96 relative flex items-center justify-center cursor-pointer rounded-2xl mb-6 p-6 overflow-hidden border border-[#E2DDD5] group"
                  onClick={() => onOpenProduct(product)}
                >
                  {/* Background Scenic Landscape Image */}
                  <img
                    src={product.cardBg}
                    alt="Schottische Landschaft"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.90] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Soft Luxury Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                  {/* Cut-Out Bottle Standing in Foreground */}
                  <img
                    src={product.image}
                    alt={product.fullName}
                    className="relative z-10 max-h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-[#E2DDD5] pb-2">
                    <span className="font-script text-2xl text-[#2D6A4F]">{product.region} Single Malt</span>
                    <span className="font-craft-mono text-xs text-[#B85D2C] font-bold">VOL. {product.abv}</span>
                  </div>

                  <h3 className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] tracking-wide uppercase">
                    {product.name}
                  </h3>

                  <p className="font-craft-mono text-xs text-[#55695E] font-bold">
                    {product.caskType} · {product.vintage}
                  </p>

                  <p className="text-base text-[#2E3D35] font-normal leading-relaxed pt-2">
                    {product.tastingNotes.nose}
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[#E2DDD5] flex items-center justify-between">
                <div>
                  <span className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] tracking-wide block">{product.price.toFixed(2)} €</span>
                  <span className="font-craft-mono text-[10px] text-[#55695E]">{product.pricePerLiter} · inkl. MwSt.</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onOpenProduct(product)}
                    className="px-5 py-3 rounded-lg bg-[#E8EFEA] hover:bg-[#D8E4DC] text-[#181F1C] font-woodblock text-lg tracking-wider uppercase transition-colors"
                  >
                    Dossier
                  </button>

                  {product.isAvailable ? (
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-6 py-3 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-lg tracking-wider uppercase transition-all shadow-sm hover:shadow-md"
                    >
                      In den Korb
                    </button>
                  ) : (
                    <span className="px-5 py-3 rounded-lg bg-neutral-100 text-neutral-400 font-woodblock text-lg tracking-wider uppercase">
                      Ausverkauft
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
