import React, { useState, useMemo } from 'react';
import { ChevronRight, Search, Sparkles, Bell, CheckCircle2, X, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/pureWhiskyFullData';

export default function ShopView({ onOpenProduct, onAddToCart, onPreReserve, onNavigateHome }) {
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'upcoming' | 'available' | 'archive'
  const [searchQuery, setSearchQuery] = useState('');

  // Pre-reservation Modal State
  const [preReserveProduct, setPreReserveProduct] = useState(null);
  const [reserveName, setReserveName] = useState('');
  const [reserveEmail, setReserveEmail] = useState('');
  const [reserveSuccess, setReserveSuccess] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Region Filter
      if (regionFilter !== 'all' && p.region.toLowerCase() !== regionFilter.toLowerCase()) return false;
      
      // Status Filter
      if (statusFilter === 'upcoming' && !p.isUpcoming) return false;
      if (statusFilter === 'available' && (!p.isAvailable || p.isUpcoming)) return false;
      if (statusFilter === 'archive' && (p.isAvailable || p.isUpcoming)) return false;

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q) || p.fullName.toLowerCase().includes(q);
        const matchesDistillery = p.distillery.toLowerCase().includes(q);
        const matchesChar = p.character.some(c => c.toLowerCase().includes(q));
        if (!matchesName && !matchesDistillery && !matchesChar) return false;
      }
      return true;
    });
  }, [regionFilter, statusFilter, searchQuery]);

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

  const upcomingCount = PRODUCTS.filter(p => p.isUpcoming).length;
  const availableCount = PRODUCTS.filter(p => p.isAvailable && !p.isUpcoming).length;

  return (
    <div className="pt-32 pb-36 bg-[#FAF8F5] min-h-screen text-left">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Page Title Header */}
        <div className="mb-12 space-y-3">
          <span className="font-script text-3xl text-[#2D6A4F] block">
            Exklusive Einzelfässer & Vorab-Zuteilungen
          </span>
          <h1 className="font-woodblock text-5xl sm:text-6xl lg:text-7xl text-[#181F1C] tracking-wide uppercase">
            Alle aktuellen Abfüllungen.
          </h1>
          <p className="text-[#3A4A40] text-lg sm:text-xl max-w-3xl font-normal leading-relaxed">
            Unverdünnt in nativer Fassstärke, unfiltriert und ohne Farbstoffe. 
            Entdecken Sie unsere sofort lieferbaren Einzelfässer sowie den exklusiven Vorab-Zugriff auf die 4 neuen Releases ab dem 17. September 2026.
          </p>
        </div>

        {/* 17. September Release Highlight Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#B85D2C]/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-[#FAF0EB] text-[#B85D2C] text-xs font-craft-mono font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Herbst-Release · 17. September 2026</span>
              </span>
              <span className="text-xs font-craft-mono text-[#55695E] font-bold">
                4 neue Fässer eingetroffen
              </span>
            </div>
            <h2 className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] uppercase tracking-wide">
              Exklusiver Vorab-Zugriff für das Fass-Depot
            </h2>
            <p className="text-sm text-[#3A4A40] leading-relaxed">
              Glenburgie 11Y (Oloroso), Fettercairn 15Y (Rivesaltes), Aultmore 17Y (Red Wine Finish) und Highland Park 18Y (Orkney Cask) sind vorab im Shop einsehbar. Tragen Sie sich jetzt ein, um die Zuteilung vor dem öffentlichen Verkauf zu erhalten.
            </p>
          </div>

          <button
            onClick={() => setStatusFilter('upcoming')}
            className="px-6 py-3.5 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-base tracking-wider uppercase transition-all shadow-md shrink-0 flex items-center space-x-2"
          >
            <span>Die 4 neuen Fässer ansehen</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-[#D4C8B8] rounded-2xl p-5 mb-12 space-y-4 shadow-xs">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-[#E2DDD5]">
            <span className="font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mr-2">
              Status:
            </span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 font-woodblock text-sm tracking-wider uppercase rounded-xl transition-all ${
                statusFilter === 'all'
                  ? 'bg-[#181F1C] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#181F1C] hover:bg-[#E2DDD5]'
              }`}
            >
              Alle Abfüllungen ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setStatusFilter('upcoming')}
              className={`px-4 py-2 font-woodblock text-sm tracking-wider uppercase rounded-xl transition-all flex items-center space-x-1.5 ${
                statusFilter === 'upcoming'
                  ? 'bg-[#B85D2C] text-white shadow-xs'
                  : 'bg-[#FAF0EB] text-[#B85D2C] hover:bg-[#F2DDD2]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Release 17. Sept. ({upcomingCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter('available')}
              className={`px-4 py-2 font-woodblock text-sm tracking-wider uppercase rounded-xl transition-all ${
                statusFilter === 'available'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'bg-[#E8EFEA] text-[#2D6A4F] hover:bg-[#D5E6DC]'
              }`}
            >
              Sofort lieferbar ({availableCount})
            </button>
            <button
              onClick={() => setStatusFilter('archive')}
              className={`px-4 py-2 font-woodblock text-sm tracking-wider uppercase rounded-xl transition-all ${
                statusFilter === 'archive'
                  ? 'bg-[#181F1C] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#55695E] hover:bg-[#E2DDD5]'
              }`}
            >
              Archiv (Sold Out)
            </button>
          </div>

          {/* Region Tabs & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mr-2">
                Region:
              </span>
              {[
                { id: 'all', label: 'Alle Regionen' },
                { id: 'speyside', label: 'Speyside' },
                { id: 'highlands', label: 'Highlands' },
                { id: 'islands', label: 'Islands' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setRegionFilter(tab.id)}
                  className={`px-3.5 py-1.5 font-craft-mono text-xs font-bold uppercase rounded-lg transition-all ${
                    regionFilter === tab.id
                      ? 'bg-[#181F1C] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#181F1C] hover:bg-[#E2DDD5]'
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
                placeholder="Fass, Destillerie oder Aroma suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-[#181F1C] placeholder-[#7A8C82] focus:outline-none focus:border-[#B85D2C] focus:bg-white font-medium"
              />
            </div>
          </div>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className={`bg-white border rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-left transition-all duration-300 relative ${
                product.isUpcoming 
                  ? 'border-[#B85D2C]/40 shadow-sm hover:shadow-md' 
                  : 'border-[#D4C8B8] shadow-xs hover:shadow-md'
              }`}
            >
              {/* Upcoming Badge Strip */}
              {product.isUpcoming && (
                <div className="mb-4 -mt-2 -mx-2 px-4 py-2 rounded-2xl bg-[#FAF0EB] border border-[#F2DDD2] flex items-center justify-between">
                  <span className="font-craft-mono text-xs text-[#B85D2C] font-bold uppercase tracking-wider flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Release am 17. September 2026</span>
                  </span>
                  <span className="text-[11px] font-craft-mono text-[#55695E] font-bold">
                    Vorab-Zugriff
                  </span>
                </div>
              )}

              <div>
                {/* Cinematic Integrated Bottle Stage */}
                <div 
                  className="h-80 sm:h-96 relative flex items-center justify-center cursor-pointer rounded-2xl mb-6 p-6 overflow-hidden border border-[#D4C8B8] group shadow-inner bg-neutral-900"
                  onClick={() => onOpenProduct(product)}
                >
                  {/* Layer 1: Background Landscape */}
                  <img
                    src={product.cardBg}
                    alt="Schottische Landschaft"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.10] blur-[1.5px] scale-105 opacity-75 group-hover:scale-110 group-hover:opacity-85 transition-all duration-700"
                  />
                  
                  {/* Layer 2: Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,139,56,0.22)_0%,_transparent_65%)]" />

                  {/* Layer 3: Foreground Bottle */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.fullName}
                      className="max-h-[90%] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:scale-106 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="w-24 sm:w-28 h-3.5 bg-black/65 rounded-full blur-md -mt-2 opacity-80" />
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="font-script text-2xl text-white drop-shadow-md">
                      {product.region}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-[#E2DDD5] pb-2">
                    <span className="font-script text-2xl text-[#2D6A4F]">{product.distillery}</span>
                    <span className="font-craft-mono text-xs text-[#B85D2C] font-bold">VOL. {product.abv}</span>
                  </div>

                  <h3 className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] tracking-wide uppercase leading-tight">
                    {product.name}
                  </h3>

                  <p className="font-craft-mono text-xs text-[#55695E] font-bold">
                    {product.caskType} · {product.caskNumber}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.character.map((char, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E2DDD5] text-xs font-medium text-[#3A4A40] rounded-lg">
                        {char}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-[#2E3D35] font-normal leading-relaxed pt-2">
                    {product.intro}
                  </p>
                </div>
              </div>

              {/* Bottom Action Area */}
              <div className="pt-6 mt-6 border-t border-[#E2DDD5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] tracking-wide block">
                    {product.price.toFixed(2)} €
                  </span>
                  <span className="font-craft-mono text-[10px] text-[#55695E]">
                    {product.pricePerLiter} · inkl. MwSt.
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => onOpenProduct(product)}
                    className="px-4 py-3 rounded-xl bg-[#FAF8F5] hover:bg-[#E2DDD5] text-[#181F1C] font-woodblock text-base tracking-wider uppercase transition-colors border border-[#D4C8B8]"
                  >
                    Dossier
                  </button>

                  {/* ACTION BASED ON STATUS */}
                  {product.isUpcoming ? (
                    <button
                      onClick={(e) => handleOpenReserveModal(product, e)}
                      className="px-5 py-3 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-base tracking-wider uppercase transition-all shadow-md flex items-center space-x-1.5"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Vorabzugriff vormerken</span>
                    </button>
                  ) : product.isAvailable ? (
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-6 py-3 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-base tracking-wider uppercase transition-all shadow-md"
                    >
                      In den Korb
                    </button>
                  ) : (
                    <span className="px-5 py-3 rounded-xl bg-neutral-100 text-neutral-400 font-woodblock text-base tracking-wider uppercase">
                      Ausverkauft
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: EXKLUSIVE VORAB-ZUTEILUNG FÜR 17. SEPTEMBER             */}
      {/* ------------------------------------------------------------- */}
      {preReserveProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-[#D4C8B8] rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 relative text-left">
            
            <button
              onClick={() => setPreReserveProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#FAF8F5] text-[#181F1C]"
            >
              <X className="w-5 h-5" />
            </button>

            {reserveSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8EFEA] text-[#2D6A4F] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-woodblock text-3xl text-[#181F1C] uppercase">
                  Erfolgreich vorgemerkt!
                </h3>
                <p className="text-sm text-[#3A4A40] leading-relaxed max-w-md mx-auto">
                  Sie sind für den exklusiven Vorab-Zugriff auf <strong>{preReserveProduct.name}</strong> eingetragen.
                  Am <strong>17. September 2026</strong> erhalten Sie die Benachrichtigung mit Ihrem persönlichen Zuteilungs-Link direkt per E-Mail.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full bg-[#FAF0EB] text-[#B85D2C] text-xs font-craft-mono font-bold uppercase">
                    Release am 17. September 2026
                  </span>
                  <h3 className="font-woodblock text-3xl text-[#181F1C] uppercase pt-1">
                    Vorab-Zuteilung sichern
                  </h3>
                  <p className="text-sm text-[#55695E]">
                    {preReserveProduct.name} · {preReserveProduct.caskType} (Nur {preReserveProduct.bottlesTotal} Flaschen)
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2DDD5] text-xs text-[#3A4A40] leading-relaxed space-y-2">
                  <p>
                    Dieses Einzelfass wird vor dem offiziellen Verkauf exklusiv an eingetragene Mitglieder unseres Fass-Depots vergeben.
                  </p>
                  <div className="flex items-center space-x-2 font-craft-mono font-bold text-[#2D6A4F]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Unverbindliche Reservierung · Keine Kaufverpflichtung</span>
                  </div>
                </div>

                <form onSubmit={handleReserveSubmit} className="space-y-4">
                  <div>
                    <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1">
                      Ihr Name
                    </label>
                    <input
                      type="text"
                      placeholder="z.B. Martin Weber"
                      value={reserveName}
                      onChange={(e) => setReserveName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm text-[#181F1C] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1">
                      Ihre E-Mail-Adresse *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ihre.mail@beispiel.de"
                      value={reserveEmail}
                      onChange={(e) => setReserveEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm text-[#181F1C] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-lg tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Jetzt für 17. September vormerken</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[#55695E] text-center font-craft-mono">
                    🔒 Kein Spam. Sie erhalten ausschließlich Informationen zu dieser Zuteilung.
                  </p>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
