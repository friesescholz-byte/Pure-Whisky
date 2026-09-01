import React, { useState } from 'react';
import { ChevronRight, ShoppingBag, ShieldCheck, ArrowRight, Droplets, Leaf, RefreshCw, Check } from 'lucide-react';
import { PRODUCTS } from '../data/pureWhiskyFullData';

export default function ProductDetailView({ product, onAddToCart, onNavigateShop, onNavigateHome, onSelectOtherProduct }) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const otherProducts = PRODUCTS.filter(p => p.id !== product.id);
  const gallery = product.galleryImages || [product.image];

  const handleBuy = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div className="pt-32 pb-36 bg-[#FAF8F5] min-h-screen text-left">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        


        {/* Top Product Section: Gallery Left, Purchase Dossier Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Column: Interactive High-Res Bottle Stage & Thumbnails (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Stage Image with Cinematic Photographic Integration */}
            <div className="border border-[#D4C8B8] rounded-3xl h-[500px] sm:h-[580px] flex items-center justify-center shadow-md relative overflow-hidden group bg-neutral-900">
              
              {/* Layer 1: Background Landscape with Bokeh Blur & Controlled Lighting */}
              <img
                src={product.cardBg}
                alt="Schottische Landschaft"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.10] blur-[2px] scale-105 opacity-75 group-hover:scale-110 group-hover:opacity-85 transition-all duration-700"
              />
              
              {/* Layer 2: Atmospheric Lighting Vignette & Amber Ambient Backlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,139,56,0.25)_0%,_transparent_65%)]" />

              {/* Layer 3: Main Cut-out Bottle in Foreground */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                <img
                  src={gallery[selectedImageIdx] || product.image}
                  alt={product.fullName}
                  className="max-h-[86%] w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.75)] transition-all duration-500 group-hover:scale-105"
                />
                {/* Ground Contact Shadow */}
                <div className="w-32 sm:w-36 h-4 bg-black/70 rounded-full blur-md -mt-2 opacity-85" />
              </div>
              
              {/* Region Label Badge */}
              <div className="absolute top-6 left-6 z-20 font-script text-3xl text-white drop-shadow-md">
                {product.region} Single Cask
              </div>
            </div>

            {/* Gallery Thumbnail Strip */}
            {gallery.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-20 h-20 rounded-xl bg-white border p-1.5 transition-all overflow-hidden shrink-0 ${
                      selectedImageIdx === idx 
                        ? 'border-[#B85D2C] ring-2 ring-[#B85D2C]/30 shadow-xs' 
                        : 'border-[#E2DDD5] opacity-70 hover:opacity-100 hover:border-[#D4C8B8]'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Buying Box & Essential Specs (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="font-script text-3xl text-[#2D6A4F]">{product.region}</span>
                <span className="font-craft-mono text-xs uppercase tracking-widest text-[#55695E] font-bold">· {product.caskNumber}</span>
              </div>

              <h1 className="font-woodblock text-5xl sm:text-6xl text-[#181F1C] tracking-wide uppercase leading-tight">
                {product.name}
              </h1>

              <p className="font-craft-mono text-sm text-[#B85D2C] font-bold">
                VOL. {product.abv} · {product.vintage} · {product.caskType}
              </p>
            </div>

            <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
              {product.intro}
            </p>

            {/* Price & Purchase Box */}
            <div className="p-7 rounded-2xl bg-white border border-[#D4C8B8] shadow-xs space-y-6">
              
              <div className="flex items-baseline justify-between border-b border-[#E2DDD5] pb-4">
                <div>
                  <span className="font-woodblock text-4xl text-[#181F1C] block">{product.price.toFixed(2)} €</span>
                  <span className="font-craft-mono text-xs text-[#55695E] font-medium">{product.pricePerLiter} · inkl. MwSt.</span>
                </div>

                <div className="text-right font-craft-mono text-xs font-bold">
                  <span className={product.isAvailable ? 'text-[#2D6A4F]' : 'text-rose-600'}>
                    {product.isAvailable ? `NOCH ${product.bottlesRemaining} VON ${product.bottlesTotal} FLASCHEN` : 'AUSVERKAUFT'}
                  </span>
                  <span className="block text-[11px] text-[#55695E] mt-0.5">Streng limitiertes Einzelfass</span>
                </div>
              </div>

              {/* Purchase Controls */}
              {product.isAvailable ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#D4C8B8] rounded-lg bg-[#FAF8F5] p-1 font-craft-mono">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-lg font-bold text-[#181F1C] hover:text-[#B85D2C]"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-base font-bold text-[#181F1C]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.bottlesRemaining, quantity + 1))}
                        className="px-3 py-2 text-lg font-bold text-[#181F1C] hover:text-[#B85D2C]"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleBuy}
                      className="flex-1 py-4.5 px-8 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-3"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>In den Warenkorb</span>
                    </button>
                  </div>

                  {addedNotice && (
                    <div className="p-3 rounded-lg bg-[#E8EFEA] border border-[#C5D8CC] text-xs font-craft-mono font-bold text-[#2D6A4F] flex items-center justify-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>Flasche wurde zum Warenkorb hinzugefügt!</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-neutral-100 text-neutral-500 font-woodblock text-xl uppercase text-center">
                  Dieses Fass ist restlos ausverkauft
                </div>
              )}

              {/* Guarantees List */}
              <div className="pt-2 border-t border-[#E2DDD5] space-y-2 text-xs font-craft-mono text-[#55695E] font-bold">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Klimaneutraler DHL GoGreen Versand (2–4 Werktage)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-[#B85D2C]" />
                  <span>100% Cask Strength · Unfiltriert · Ohne Zuckerkulör</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 text-[#2D6A4F]" />
                  <span>100% PCR Estal Wild Glass & Spanischer Naturkork</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 1. SECTION: TASTING NOTES DEEP-DIVE */}
        <div className="mb-24 space-y-8">
          <div className="border-b border-[#E2DDD5] pb-4">
            <span className="font-script text-3xl text-[#2D6A4F] block">Sensorik & Charakter</span>
            <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase">
              Verkostungsnotizen des Einzelfasses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#D4C8B8] rounded-2xl p-7 space-y-3 shadow-xs">
              <span className="font-woodblock text-2xl text-[#B85D2C] tracking-wider uppercase block">
                01 · Nase (Nose)
              </span>
              <p className="text-[#3A4A40] text-base leading-relaxed font-normal">
                {product.tastingNotes.nose}
              </p>
            </div>

            <div className="bg-white border border-[#D4C8B8] rounded-2xl p-7 space-y-3 shadow-xs">
              <span className="font-woodblock text-2xl text-[#B85D2C] tracking-wider uppercase block">
                02 · Gaumen (Palate)
              </span>
              <p className="text-[#3A4A40] text-base leading-relaxed font-normal">
                {product.tastingNotes.palate}
              </p>
            </div>

            <div className="bg-white border border-[#D4C8B8] rounded-2xl p-7 space-y-3 shadow-xs">
              <span className="font-woodblock text-2xl text-[#B85D2C] tracking-wider uppercase block">
                03 · Nachklang (Finish)
              </span>
              <p className="text-[#3A4A40] text-base leading-relaxed font-normal">
                {product.tastingNotes.finish}
              </p>
            </div>
          </div>
        </div>

        {/* 2. SECTION: DIE GESCHICHTE DER BRENNEREI & DIESES FASSES */}
        <div className="mb-24 bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="font-script text-3xl text-[#2D6A4F] block">Herkunft & Brennerei</span>
              <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase leading-tight">
                {product.history.headline}
              </h2>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                {product.history.text}
              </p>
              <div className="pt-2 text-xs font-craft-mono font-bold text-[#55695E]">
                STANDORT: {product.distilleryLocation}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#E2DDD5] h-80">
                <img
                  src={product.history.image}
                  alt={product.distillery}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>

        {/* 3. SECTION: INES ZAGERS VOR-ORT UMWELT-AUDIT */}
        <div className="mb-24 bg-[#E8EFEA] border border-[#C5D8CC] rounded-3xl p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#C5D8CC] h-80">
                <img
                  src={product.sustainability.image}
                  alt="Ines Zager Vor-Ort Audit"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="flex items-center space-x-2 text-[#2D6A4F] text-xs font-craft-mono font-bold uppercase tracking-wider">
                <Leaf className="w-5 h-5" />
                <span>Vor-Ort Umwelt-Audit · Ines Zager</span>
              </div>
              <h2 className="font-woodblock text-4xl sm:text-5xl text-[#1B2B23] tracking-wide uppercase leading-tight">
                {product.sustainability.headline}
              </h2>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                {product.sustainability.story}
              </p>
            </div>

          </div>
        </div>

        {/* 4. SECTION: WEITERE EINZELFÄSSER ENTDECKEN */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-4">
            <div>
              <span className="font-script text-3xl text-[#2D6A4F] block">Kollektion</span>
              <h2 className="font-woodblock text-4xl text-[#181F1C] tracking-wide uppercase">
                Weitere handverlesene Abfüllungen
              </h2>
            </div>

            <button
              onClick={onNavigateShop}
              className="inline-flex items-center space-x-2 font-woodblock text-xl tracking-wider uppercase text-[#B85D2C] hover:text-[#A04E24] transition-colors"
            >
              <span>Alle Fässer im Shop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherProducts.map(other => (
              <div
                key={other.id}
                onClick={() => onSelectOtherProduct(other)}
                className="bg-white border border-[#D4C8B8] rounded-2xl p-6 flex flex-col justify-between text-left shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <div>
                  {/* Cinematic Integrated Bottle Stage */}
                  <div className="h-64 relative flex items-center justify-center rounded-xl mb-4 p-4 overflow-hidden border border-[#D4C8B8] bg-neutral-900">
                    <img
                      src={other.cardBg}
                      alt="Schottische Landschaft"
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.10] blur-[1.5px] opacity-75 group-hover:scale-108 group-hover:opacity-85 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,139,56,0.22)_0%,_transparent_65%)]" />

                    <div className="relative z-10 h-full flex flex-col items-center justify-center">
                      <img
                        src={other.image}
                        alt={other.name}
                        className="max-h-[88%] w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] group-hover:scale-108 transition-transform duration-300"
                      />
                      <div className="w-20 h-2.5 bg-black/65 rounded-full blur-xs -mt-1 opacity-80" />
                    </div>
                  </div>

                  <span className="font-script text-2xl text-[#2D6A4F]">{other.region}</span>
                  <h4 className="font-woodblock text-2xl text-[#181F1C] uppercase mt-0.5">{other.name}</h4>
                  <p className="font-craft-mono text-xs text-[#55695E] font-bold">VOL. {other.abv} · {other.caskType}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2DDD5] flex items-center justify-between">
                  <span className="font-woodblock text-2xl text-[#181F1C]">{other.price.toFixed(2)} €</span>
                  <span className="text-xs font-woodblock uppercase tracking-wider text-[#B85D2C] group-hover:underline">
                    Dossier öffnen →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
