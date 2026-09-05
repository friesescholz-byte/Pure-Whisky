import React, { useState, useMemo } from 'react';
import { Search, X, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../data/pureWhiskyFullData';

export default function ShopView({ onOpenProduct, onAddToCart, onPreReserve, onNavigateHome }) {
  const [regionFilter, setRegionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Pre-reservation Modal State for Upcoming Releases
  const [preReserveProduct, setPreReserveProduct] = useState(null);
  const [reserveName, setReserveName] = useState('');
  const [reserveEmail, setReserveEmail] = useState('');
  const [reserveSuccess, setReserveSuccess] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (regionFilter !== 'all' && p.region.toLowerCase() !== regionFilter.toLowerCase()) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q) || p.fullName.toLowerCase().includes(q);
        const matchesDistillery = p.distillery.toLowerCase().includes(q);
        const matchesChar = p.character && p.character.some(c => c.toLowerCase().includes(q));
        if (!matchesName && !matchesDistillery && !matchesChar) return false;
      }
      return true;
    });
  }, [regionFilter, searchQuery]);

  const handleOpenReserveModal = (product, e) => {
    if (e) e.stopPropagation();
    setPreReserveProduct(product);
    setReserveName('');
    setReserveEmail('');
    setReserveSuccess(false);
  };

  const handleReserveSubmit = (e) => {
    e.preventDefault();
    if (!reserveEmail) return;

    if (onPreReserve) {
      onPreReserve({
        email: reserveEmail.trim(),
        name: reserveName.trim() || 'Whisky-Liebhaber',
        caskInterest: `${preReserveProduct.name} (Vorab-Zuteilung 17.09.)`,
        source: 'vorabzugriff-17september',
        date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
      });
    }

    setReserveSuccess(true);
    setTimeout(() => {
      setPreReserveProduct(null);
      setReserveSuccess(false);
    }, 2800);
  };

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

        {/* Clean Filter Bar as before */}
        <div className="bg-white border border-[#D4C8B8] rounded-xl p-5 mb-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Alle Regionen' },
              { id: 'highlands', label: 'Highlands' },
              { id: 'speyside', label: 'Speyside' },
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

        {/* Product Cards Grid - Clean, Spacious, No Clutter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {filteredProducts.map(product => {
            const displayBottle = product.cutoutImage || product.image;

            return (
              <div
                key={product.id}
                className="bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-left shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Bottle Stage */}
                  <div 
                    className="h-80 sm:h-96 relative flex items-center justify-center cursor-pointer rounded-2xl mb-6 p-6 overflow-hidden border border-[#D4C8B8] group shadow-inner bg-neutral-900"
                    onClick={() => onOpenProduct(product)}
                  >
                    {/* Layer 1: Background Landscape */}
                    <img
                      src={product.cardBg}
                      alt="Schottische Landschaft"
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] contrast-[1.05] blur-[1px] scale-105 opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                    />
                    
                    {/* Layer 2: Soft Atmospheric Lighting Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/30" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,139,56,0.20)_0%,_transparent_65%)]" />

                    {/* Layer 3: Foreground Bottle */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center">
                      <img
                        src={displayBottle}
                        alt={product.fullName}
                        className="max-h-[90%] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:scale-106 transition-transform duration-500"
                        loading="lazy"
                      />
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

                    {/* PROMINENT LARGE STOCK / AVAILABILITY STATUS DISPLAY */}
                    <div className="pt-2 pb-1">
                      {product.isAvailable ? (
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#E8EFEA] border border-[#C5D8CC]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] shrink-0 animate-pulse" />
                          <span className="font-woodblock text-sm sm:text-base text-[#2D6A4F] uppercase tracking-wider">
                            Noch {product.bottlesRemaining} von {product.bottlesTotal} Flaschen vorrätig
                          </span>
                        </div>
                      ) : product.isUpcoming ? (
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#FAF0EB] border border-[#F2DDD2]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#B85D2C] shrink-0" />
                          <span className="font-woodblock text-sm sm:text-base text-[#B85D2C] uppercase tracking-wider">
                            Release am 17. September · {product.bottlesTotal} Flaschen
                          </span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
                          <span className="font-woodblock text-sm sm:text-base text-rose-700 uppercase tracking-wider">
                            Ausverkauft · Sammler-Archiv
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-base text-[#2E3D35] font-normal leading-relaxed pt-1">
                      {product.tastingNotes.nose}
                    </p>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-8 mt-6 border-t border-[#E2DDD5] flex items-center justify-between">
                  <div>
                    <span className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] tracking-wide block">
                      {product.price.toFixed(2)} €
                    </span>
                    <span className="font-craft-mono text-[10px] text-[#55695E]">
                      {product.pricePerLiter} · inkl. MwSt.
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onOpenProduct(product)}
                      className="px-5 py-3 rounded-lg bg-[#E8EFEA] hover:bg-[#D8E4DC] text-[#181F1C] font-woodblock text-lg tracking-wider uppercase transition-colors"
                    >
                      Dossier
                    </button>

                    {product.isUpcoming ? (
                      <button
                        onClick={(e) => handleOpenReserveModal(product, e)}
                        className="px-6 py-3 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-lg tracking-wider uppercase transition-all shadow-sm"
                      >
                        Vorabzugriff
                      </button>
                    ) : product.isAvailable ? (
                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-6 py-3 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-lg tracking-wider uppercase transition-all shadow-sm"
                      >
                        In den Korb
                      </button>
                    ) : (
                      <span className="px-5 py-3 rounded-lg bg-neutral-100 text-neutral-400 font-woodblock text-lg tracking-wider uppercase border border-neutral-200">
                        Ausverkauft
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Clean Uncluttered Pre-reservation Modal */}
      {preReserveProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#D4C8B8] rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 relative text-left">
            
            <button
              onClick={() => setPreReserveProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#FAF8F5] text-[#181F1C]"
            >
              <X className="w-5 h-5" />
            </button>

            {reserveSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#E8EFEA] text-[#2D6A4F] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-woodblock text-2xl uppercase text-[#181F1C]">
                  Erfolgreich vorgemerkt!
                </h3>
                <p className="text-sm text-[#3A4A40] leading-relaxed">
                  Sie sind für den Vorab-Zugriff auf <strong>{preReserveProduct.name}</strong> am 17. September eingetragen.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="font-script text-2xl text-[#2D6A4F] block">
                    Release am 17. September 2026
                  </span>
                  <h3 className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] uppercase">
                    {preReserveProduct.name}
                  </h3>
                  <p className="text-xs text-[#55695E]">
                    {preReserveProduct.caskType} · {preReserveProduct.abv}
                  </p>
                </div>

                <p className="text-sm text-[#3A4A40] leading-relaxed">
                  Tragen Sie sich unverbindlich ein, um die Benachrichtigung am 17. September vor dem offiziellen Verkauf zu erhalten.
                </p>

                <form onSubmit={handleReserveSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ihr Name (optional)"
                    value={reserveName}
                    onChange={(e) => setReserveName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm text-[#181F1C] focus:bg-white focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Ihre E-Mail-Adresse *"
                    value={reserveEmail}
                    onChange={(e) => setReserveEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm text-[#181F1C] focus:bg-white focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-lg tracking-wider uppercase transition-all shadow-md mt-2"
                  >
                    Für Vorabzugriff vormerken
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
