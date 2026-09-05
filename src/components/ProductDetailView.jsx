import React, { useState } from 'react';
import { ChevronRight, ShoppingBag, ShieldCheck, ArrowRight, Droplets, Leaf, RefreshCw, Check, Sparkles, Bell, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../data/pureWhiskyFullData';

export default function ProductDetailView({ 
  product, 
  onAddToCart, 
  onPreReserve, 
  onNavigateShop, 
  onNavigateHome, 
  onSelectOtherProduct 
}) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Pre-reservation Form State for Upcoming Releases
  const [reserveName, setReserveName] = useState('');
  const [reserveEmail, setReserveEmail] = useState('');
  const [reserveSuccess, setReserveSuccess] = useState(false);

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

  const handleReserveSubmit = (e) => {
    e.preventDefault();
    if (!reserveEmail) return;

    if (onPreReserve) {
      onPreReserve({
        email: reserveEmail.trim(),
        name: reserveName.trim() || 'Whisky-Liebhaber',
        caskInterest: `${product.name} (Vorab-Zuteilung 17.09.)`,
        source: 'vorabzugriff-17september',
        date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
      });
    }

    setReserveSuccess(true);
  };

  return (
    <div className="pt-32 pb-36 bg-[#FAF8F5] min-h-screen text-left">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs font-craft-mono font-bold text-[#55695E] mb-8">
          <button onClick={onNavigateHome} className="hover:text-[#181F1C]">Startseite</button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D4C8B8]" />
          <button onClick={onNavigateShop} className="hover:text-[#181F1C]">Die Fässer</button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D4C8B8]" />
          <span className="text-[#B85D2C] truncate">{product.name}</span>
        </div>

        {/* Top Product Section: Gallery Left, Purchase Dossier Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Column: Interactive High-Res Bottle Stage & Thumbnails (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Stage Image with Cinematic Photographic Integration */}
            <div className="border border-[#D4C8B8] rounded-3xl h-[500px] sm:h-[580px] flex items-center justify-center shadow-md relative overflow-hidden group bg-neutral-900">
              
              {/* Layer 1: Background Landscape */}
              <img
                src={product.cardBg}
                alt="Schottische Landschaft"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.10] blur-[2px] scale-105 opacity-75 group-hover:scale-110 group-hover:opacity-85 transition-all duration-700"
              />
              
              {/* Layer 2: Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,139,56,0.25)_0%,_transparent_65%)]" />

              {/* Layer 3: Main Cut-out Bottle */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                <img
                  src={gallery[selectedImageIdx] || product.image}
                  alt={product.fullName}
                  className="max-h-[86%] w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.75)] transition-all duration-500 group-hover:scale-105"
                />
                <div className="w-32 sm:w-36 h-4 bg-black/70 rounded-full blur-md -mt-2 opacity-85" />
              </div>
              
              {/* Region Label Badge */}
              <div className="absolute top-6 left-6 z-20 font-script text-3xl text-white drop-shadow-md">
                {product.region} Single Cask
              </div>

              {product.isUpcoming && (
                <div className="absolute top-6 right-6 z-20 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D4C8B8] text-[#B85D2C] font-craft-mono text-xs font-bold uppercase shadow-sm">
                  Release 17.09.2026
                </div>
              )}
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

            {/* Price & Purchase / Pre-Reservation Box */}
            <div className="p-7 rounded-3xl bg-white border border-[#D4C8B8] shadow-xs space-y-6">
              
              <div className="flex items-baseline justify-between border-b border-[#E2DDD5] pb-4">
                <div>
                  <span className="font-woodblock text-4xl text-[#181F1C] block">{product.price.toFixed(2)} €</span>
                  <span className="font-craft-mono text-xs text-[#55695E] font-medium">{product.pricePerLiter} · inkl. MwSt.</span>
                </div>

                <div className="text-right font-craft-mono text-xs font-bold">
                  {product.isUpcoming ? (
                    <>
                      <span className="text-[#B85D2C] flex items-center space-x-1 justify-end">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>RELEASE: 17. SEPTEMBER 2026</span>
                      </span>
                      <span className="block text-[11px] text-[#55695E] mt-0.5">Limitierte Zuteilung: {product.bottlesTotal} Flaschen</span>
                    </>
                  ) : product.isAvailable ? (
                    <>
                      <span className="text-[#2D6A4F]">NOCH {product.bottlesRemaining} VON {product.bottlesTotal} FLASCHEN</span>
                      <span className="block text-[11px] text-[#55695E] mt-0.5">Streng limitiertes Einzelfass</span>
                    </>
                  ) : (
                    <>
                      <span className="text-rose-600">AUSVERKAUFT</span>
                      <span className="block text-[11px] text-[#55695E] mt-0.5">Sammler-Archiv</span>
                    </>
                  )}
                </div>
              </div>

              {/* ----------------------------------------------------------- */}
              {/* CASE 1: UPCOMING RELEASE (VORABZUGRIFF FORMULAR)             */}
              {/* ----------------------------------------------------------- */}
              {product.isUpcoming ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#FAF0EB] border border-[#F2DDD2] space-y-2">
                    <span className="font-craft-mono text-xs uppercase tracking-wider text-[#B85D2C] font-bold flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Exklusiver Vorab-Zugriff für Fass-Depot Abonnenten</span>
                    </span>
                    <p className="text-xs text-[#3A4A40] leading-relaxed">
                      Dieses Einzelfass kommt am <strong>17. September 2026</strong> in den Verkauf. Tragen Sie sich jetzt ein, um Ihren persönlichen Bestell-Link vor allen anderen zu erhalten.
                    </p>
                  </div>

                  {reserveSuccess ? (
                    <div className="p-6 rounded-2xl bg-[#E8EFEA] border border-[#C5D8CC] text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-[#2D6A4F] mx-auto" />
                      <h4 className="font-woodblock text-xl uppercase text-[#181F1C]">
                        Erfolgreich vorgemerkt!
                      </h4>
                      <p className="text-xs text-[#3A4A40]">
                        Vielen Dank! Wir senden Ihnen am 17. September 2026 pünktlich den exklusiven Zuteilungs-Link für <strong>{product.name}</strong> per E-Mail.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleReserveSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Ihr Name (optional)"
                          value={reserveName}
                          onChange={(e) => setReserveName(e.target.value)}
                          className="px-4 py-3 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-xs text-[#181F1C] focus:bg-white focus:outline-none"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Ihre E-Mail-Adresse *"
                          value={reserveEmail}
                          onChange={(e) => setReserveEmail(e.target.value)}
                          className="px-4 py-3 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-xs text-[#181F1C] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-lg tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2"
                      >
                        <Bell className="w-4 h-4" />
                        <span>Für Vorabzugriff am 17.09. vormerken</span>
                      </button>

                      <p className="text-[11px] text-[#55695E] text-center font-craft-mono">
                        🔒 Unverbindlich · Kein Spam · Sie erhalten rechtzeitig den Vorab-Link.
                      </p>
                    </form>
                  )}
                </div>
              ) : product.isAvailable ? (
                /* CASE 2: REGULAR AVAILABLE PRODUCT */
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#D4C8B8] rounded-xl bg-[#FAF8F5] p-1 font-craft-mono">
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
                      className="flex-1 py-4.5 px-8 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-3"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>In den Warenkorb</span>
                    </button>
                  </div>

                  {addedNotice && (
                    <div className="p-3 rounded-xl bg-[#E8EFEA] border border-[#C5D8CC] text-xs font-craft-mono font-bold text-[#2D6A4F] flex items-center justify-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>Flasche wurde zum Warenkorb hinzugefügt!</span>
                    </div>
                  )}
                </div>
              ) : (
                /* CASE 3: SOLD OUT */
                <div className="p-4 rounded-xl bg-neutral-100 text-neutral-500 font-woodblock text-xl uppercase text-center">
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
                  <Leaf className="w-4 h-4 text-[#2D6A4F]" />
                  <span>100% Estal Wild Glass aus Spanien & Naturkork</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* SENSORISCHES PROFIL (TASTING NOTES)                            */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-24 space-y-8">
          <div className="border-b border-[#E2DDD5] pb-4">
            <span className="font-script text-3xl text-[#2D6A4F] block">
              Sensorische Verkostung
            </span>
            <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase">
              Tasting Notes von Ines Zager.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#D4C8B8] shadow-xs space-y-3">
              <span className="font-craft-mono text-xs uppercase tracking-widest text-[#B85D2C] font-bold block">
                01 · Nase
              </span>
              <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                Aromatik & Bukett
              </h3>
              <p className="text-[#3A4A40] text-sm sm:text-base font-normal leading-relaxed">
                {product.tastingNotes.nose}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#D4C8B8] shadow-xs space-y-3">
              <span className="font-craft-mono text-xs uppercase tracking-widest text-[#B85D2C] font-bold block">
                02 · Gaumen
              </span>
              <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                Körper & Textur
              </h3>
              <p className="text-[#3A4A40] text-sm sm:text-base font-normal leading-relaxed">
                {product.tastingNotes.palate}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#D4C8B8] shadow-xs space-y-3">
              <span className="font-craft-mono text-xs uppercase tracking-widest text-[#B85D2C] font-bold block">
                03 · Nachklang
              </span>
              <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                Finish & Tiefe
              </h3>
              <p className="text-[#3A4A40] text-sm sm:text-base font-normal leading-relaxed">
                {product.tastingNotes.finish}
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* HERKUNFT & DESTILLERIE GESCHICHTE                              */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-24 bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="font-script text-3xl text-[#2D6A4F] block">
              Brennerei & Terroir
            </span>
            <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] uppercase tracking-wide leading-tight">
              {product.history.headline}
            </h2>
            <p className="text-[#3A4A40] text-base sm:text-lg font-normal leading-relaxed">
              {product.history.text}
            </p>
            <div className="pt-2 font-craft-mono text-xs text-[#55695E] space-y-1">
              <p>📍 Standort: <strong>{product.distilleryLocation}</strong></p>
              <p>🪵 Fasstyp: <strong>{product.caskType}</strong></p>
              <p>⚖️ Limitierung: <strong>Streng limitiert auf {product.bottlesTotal} Flaschen</strong></p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#D4C8B8] shadow-md h-72 sm:h-84">
              <img
                src={product.history.image}
                alt={product.distillery}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* UMWELT-JURISTISCHES AUDIT                                     */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-24 bg-[#FAF8F5] border border-[#D4C8B8] rounded-3xl p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-[#D4C8B8] shadow-md h-72 sm:h-84">
              <img
                src={product.sustainability.image || product.sustainability.story}
                alt="Audit vor Ort"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
            <span className="font-script text-3xl text-[#2D6A4F] block">
              Juristisches Nachhaltigkeits-Audit
            </span>
            <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] uppercase tracking-wide leading-tight">
              {product.sustainability.headline}
            </h2>
            <p className="text-[#3A4A40] text-base sm:text-lg font-normal leading-relaxed">
              {product.sustainability.story}
            </p>
            <p className="text-xs font-craft-mono text-[#55695E]">
              Auditiert und persönlich geprüft von Juristin Ines Zager vor Ort in Schottland.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* WEITERE ABFÜLLUNGEN                                           */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-4">
            <div>
              <span className="font-script text-3xl text-[#2D6A4F] block">
                Entdeckungen
              </span>
              <h2 className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] uppercase tracking-wide">
                Weitere handverlesene Einzelfässer.
              </h2>
            </div>
            <button
              onClick={onNavigateShop}
              className="font-craft-mono text-xs font-bold text-[#B85D2C] hover:underline"
            >
              Alle im Shop ansehen →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.slice(0, 3).map(other => (
              <div
                key={other.id}
                onClick={() => onSelectOtherProduct(other)}
                className="bg-white border border-[#D4C8B8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-4 text-left group"
              >
                <div className="h-48 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] flex items-center justify-center p-3 relative overflow-hidden">
                  <img
                    src={other.image}
                    alt={other.name}
                    className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform"
                  />
                  {other.isUpcoming && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#FAF0EB] text-[#B85D2C] text-[10px] font-craft-mono font-bold rounded">
                      Release 17.09.
                    </span>
                  )}
                </div>

                <div>
                  <span className="font-script text-xl text-[#2D6A4F]">{other.region}</span>
                  <h4 className="font-woodblock text-2xl text-[#181F1C] uppercase truncate group-hover:text-[#B85D2C] transition-colors">
                    {other.name}
                  </h4>
                  <p className="text-xs text-[#55695E] font-craft-mono truncate mt-0.5">
                    {other.caskType} · {other.abv}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E2DDD5]">
                  <span className="font-woodblock text-xl text-[#181F1C]">{other.price.toFixed(2)} €</span>
                  <span className="font-craft-mono text-xs text-[#B85D2C] font-bold group-hover:underline">
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
