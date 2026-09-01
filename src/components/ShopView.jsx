import React, { useState, useMemo } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { PRODUCTS } from '../data/pureWhiskyFullData';

export default function ShopView({ onOpenProduct, onAddToCart, onNavigateHome }) {
  const [regionFilter, setRegionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (regionFilter !== 'all' && p.region.toLowerCase() !== regionFilter.toLowerCase()) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        if (!p.fullName.toLowerCase().includes(q) && !p.character.some(c => c.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [regionFilter, searchQuery]);

  return (
    <div className="pt-32 pb-36 bg-[#FAF8F5] min-h-screen text-left">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        


        {/* Page Title */}
        <div className="mb-12 space-y-2">
          <span className="font-script text-3xl text-[#2D6A4F] block">
            Exklusive Einzelfässer
          </span>
          <h1 className="font-woodblock text-5xl sm:text-6xl lg:text-7xl text-[#181F1C] tracking-wide uppercase">
            Alle aktuellen Abfüllungen.
          </h1>
          <p className="text-[#3A4A40] text-lg sm:text-xl max-w-2xl font-normal leading-relaxed">
            Unverdünnt in Fassstärke, unfiltriert und frei von Farbstoffen. Abgefüllt in 100% recyceltes Wild Glass.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-[#D4C8B8] rounded-xl p-5 mb-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center space-x-2">
            {[
              { id: 'all', label: 'Alle Regionen' },
              { id: 'highlands', label: 'Highlands' },
              { id: 'islands', label: 'Islands' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setRegionFilter(tab.id)}
                className={`px-5 py-2.5 font-woodblock text-lg tracking-wider uppercase rounded-lg transition-all ${
                  regionFilter === tab.id
                    ? 'bg-[#181F1C] text-white shadow-xs'
                    : 'bg-[#E8EFEA] text-[#181F1C] hover:bg-[#D8E4DC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative sm:w-72">
            <Search className="w-4 h-4 text-[#55695E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Suchen nach Fass oder Aroma..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#D4C8B8] rounded-lg text-[#181F1C] placeholder-[#7A8C82] focus:outline-none focus:border-[#B85D2C] focus:bg-white"
            />
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-left shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Cinematic Integrated Bottle Stage */}
                <div 
                  className="h-80 sm:h-96 relative flex items-center justify-center cursor-pointer rounded-2xl mb-6 p-6 overflow-hidden border border-[#D4C8B8] group shadow-inner bg-neutral-900"
                  onClick={() => onOpenProduct(product)}
                >
                  {/* Layer 1: Background Landscape with Depth-of-Field Blur & Lighting */}
                  <img
                    src={product.cardBg}
                    alt="Schottische Landschaft"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.10] blur-[1.5px] scale-105 opacity-75 group-hover:scale-110 group-hover:opacity-85 transition-all duration-700"
                  />
                  
                  {/* Layer 2: Soft Atmospheric Lighting Vignette & Amber Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,139,56,0.22)_0%,_transparent_65%)]" />

                  {/* Layer 3: Foreground Bottle with Multi-Layered Drop Shadow */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.fullName}
                      className="max-h-[90%] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:scale-106 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Realistic Ground Contact Shadow under Bottle Base */}
                    <div className="w-24 sm:w-28 h-3.5 bg-black/65 rounded-full blur-md -mt-2 opacity-80" />
                  </div>
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
                      className="px-6 py-3 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-lg tracking-wider uppercase transition-all shadow-sm"
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
    </div>
  );
}
