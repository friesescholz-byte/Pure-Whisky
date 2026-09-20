import React, { useState } from 'react';
import { ChevronRight, ShoppingBag, ShieldCheck, Droplets, Leaf, Check, Bell, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, IMAGES } from '../data/pureWhiskyFullData';
import { useLanguage } from '../context/LanguageContext';

export default function ProductDetailView({ 
  product, 
  onAddToCart, 
  onPreReserve, 
  onNavigateShop, 
  onNavigateHome, 
  onSelectOtherProduct,
  products = PRODUCTS 
}) {
  const { lang, t } = useLanguage();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Pre-reservation Form State for Upcoming Releases
  const [reserveName, setReserveName] = useState('');
  const [reserveEmail, setReserveEmail] = useState('');
  const [reserveSuccess, setReserveSuccess] = useState(false);

  if (!product) return null;

  const isSoldOut = product.soldOut === true || (product.isAvailable === false && !product.isUpcoming);
  const isUpcoming = product.isUpcoming === true;
  const isAvailable = !isSoldOut && !isUpcoming;
  const total = product.bottlesTotal || (product.bottleCount ? parseInt(product.bottleCount) : 240);
  const releaseDateStr = product.releaseDate || '17. September 2026';

  const otherProducts = products.filter(p => p.id !== product.id);
  const gallery = product.galleryImages || [product.image];
  const activeImage = gallery[selectedImageIdx] || product.image;

  const isCutoutBottle = 
    activeImage === product.cutoutImage ||
    (typeof activeImage === 'string' && (
      activeImage.includes('Pure-Whisky-Fass_0') ||
      activeImage.includes('Pure-Whisky0') ||
      (activeImage === product.image && !activeImage.includes('20241014') && !activeImage.includes('full') && !activeImage.includes('Testing') && !activeImage.includes('Single-Malt'))
    ));

  const isFullPhotograph = !isCutoutBottle;

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
        name: reserveName.trim() || (lang === 'de' ? 'Whisky-Liebhaber' : 'Whisky Enthusiast'),
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
          <button onClick={onNavigateHome} className="hover:text-[#181F1C] cursor-pointer">
            {lang === 'de' ? 'Startseite' : 'Home'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D4C8B8]" />
          <button onClick={onNavigateShop} className="hover:text-[#181F1C] cursor-pointer">
            {lang === 'de' ? 'Shop' : 'Shop'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D4C8B8]" />
          <span className="text-[#B85D2C] truncate">{product.name}</span>
        </div>

        {/* Top Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Column: Stage & Thumbnails (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="border border-[#D4C8B8] rounded-3xl h-[400px] sm:h-[500px] lg:h-[560px] flex items-center justify-center shadow-md relative overflow-hidden group bg-neutral-900">
              {isFullPhotograph ? (
                <div className="w-full h-full flex items-center justify-center relative p-3 sm:p-6 overflow-hidden">
                  {/* Atmospheric blurred ambient background so any aspect ratio fills the box smoothly */}
                  <img
                    src={activeImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-40 scale-125 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <img
                    src={activeImage}
                    alt={product.fullName}
                    className="relative z-10 max-h-full max-w-full object-contain rounded-2xl drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
              ) : (
                <>
                  <img
                    src={product.cardBg}
                    alt="Schottische Natur"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] contrast-[1.05] blur-[1px] scale-105 opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/35" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,139,56,0.22)_0%,_transparent_65%)]" />

                  <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-4 sm:p-8">
                    <img
                      src={activeImage}
                      alt={product.fullName}
                      className="max-h-[88%] max-w-[88%] w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                    <div className="w-32 h-4 bg-black/75 rounded-full blur-md -mt-2 opacity-85" />
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all p-1 shrink-0 bg-[#FAF8F5] cursor-pointer ${
                      selectedImageIdx === idx ? 'border-[#B85D2C] shadow-sm' : 'border-[#D4C8B8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-contain rounded-lg" />
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
            <div className="p-5 sm:p-7 rounded-3xl bg-white border border-[#D4C8B8] shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#E2DDD5] pb-4">
                <div className="shrink-0">
                  <span className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] block whitespace-nowrap">
                    {product.price.toFixed(2)} €
                  </span>
                  <span className="font-craft-mono text-xs text-[#55695E] font-medium block whitespace-nowrap">
                    {product.pricePerLiter} · {lang === 'de' ? 'inkl. MwSt.' : 'incl. VAT'}
                  </span>
                </div>

                <div className="sm:text-right font-craft-mono text-xs font-bold">
                  {isUpcoming ? (
                    <div className="sm:text-right">
                      <span className="text-[#B85D2C] text-sm block font-woodblock uppercase">
                        Release am {releaseDateStr}
                      </span>
                      <span className="text-[11px] text-[#55695E] mt-0.5 block">
                        {lang === 'de' ? `Vorab-Zuteilung: ${total} Flaschen` : `Pre-Allocation: ${total} Bottles`}
                      </span>
                    </div>
                  ) : isAvailable ? (
                    <div className="sm:text-right">
                      <span className="text-[#2D6A4F] text-sm block font-woodblock uppercase">
                        🟢 {product.isNew ? (lang === 'de' ? 'Neu erhältlich · Sofort lieferbar' : 'Newly Available · In Stock') : (lang === 'de' ? 'Sofort lieferbar' : 'In Stock')}
                      </span>
                      <span className="text-[11px] text-[#55695E] mt-0.5 block">
                        {lang === 'de' ? `Limitierte Einzelfassabfüllung (${total} Flaschen)` : `Limited Single Cask (${total} Bottles)`}
                      </span>
                    </div>
                  ) : (
                    <div className="sm:text-right">
                      <span className="text-rose-600 text-sm block font-woodblock uppercase">
                        🔴 {lang === 'de' ? 'Ausverkauft' : 'Sold Out'}
                      </span>
                      <span className="text-[11px] text-[#55695E] mt-0.5 block">
                        {lang === 'de' ? `Ausverkauft (${total} Flaschen)` : `Sold Out (${total} Bottles)`}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Purchase / Reserve Controls */}
              {isUpcoming ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#FAF0EB] border border-[#F2DDD2] space-y-2">
                    <span className="font-craft-mono text-xs uppercase tracking-wider text-[#B85D2C] font-bold">
                      {lang === 'de' ? 'Exklusiver Vorab-Zugriff für Fass-Depot Abonnenten' : 'Exclusive Priority Access for Allocation Members'}
                    </span>
                    <p className="text-xs text-[#3A4A40] leading-relaxed">
                      {lang === 'de'
                        ? `Dieses Einzelfass kommt am ${releaseDateStr} in den Verkauf. Tragen Sie sich jetzt ein, um Ihren persönlichen Bestell-Link vor allen anderen zu erhalten.`
                        : `This single cask will officially release on ${releaseDateStr}. Sign up now to receive your priority link prior to public availability.`}
                    </p>
                  </div>

                  {reserveSuccess ? (
                    <div className="p-6 rounded-2xl bg-[#E8EFEA] border border-[#C5D8CC] text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-[#2D6A4F] mx-auto" />
                      <h4 className="font-woodblock text-xl uppercase text-[#181F1C]">
                        {lang === 'de' ? 'Erfolgreich vorgemerkt!' : 'Successfully Registered!'}
                      </h4>
                      <p className="text-xs text-[#3A4A40]">
                        {lang === 'de'
                          ? `Vielen Dank! Ich sende Ihnen am ${releaseDateStr} pünktlich den exklusiven Zuteilungs-Link für ${product.name} per E-Mail.`
                          : `Thank you! I will email you the priority link for ${product.name} on ${releaseDateStr}.`}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleReserveSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder={lang === 'de' ? 'Ihr Name (optional)' : 'Your Name (optional)'}
                          value={reserveName}
                          onChange={(e) => setReserveName(e.target.value)}
                          className="px-4 py-3 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-xs text-[#181F1C] focus:bg-white focus:outline-none"
                        />
                        <input
                          type="email"
                          required
                          placeholder={lang === 'de' ? 'Ihre E-Mail-Adresse *' : 'Your Email Address *'}
                          value={reserveEmail}
                          onChange={(e) => setReserveEmail(e.target.value)}
                          className="px-4 py-3 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-xs text-[#181F1C] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-lg tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Bell className="w-4 h-4" />
                        <span>{lang === 'de' ? `Für Vorabzugriff (${releaseDateStr}) vormerken` : `Join Allocation List (${releaseDateStr})`}</span>
                      </button>
                    </form>
                  )}
                </div>
              ) : isAvailable ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 flex items-center border border-[#D4C8B8] rounded-xl bg-[#FAF8F5] p-1 font-craft-mono shrink-0">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-full flex items-center justify-center text-lg font-bold text-[#181F1C] hover:text-[#B85D2C] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-base font-bold text-[#181F1C]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.bottlesRemaining || 12, quantity + 1))}
                        className="w-9 h-full flex items-center justify-center text-lg font-bold text-[#181F1C] hover:text-[#B85D2C] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleBuy}
                      className="h-12 flex-1 px-4 sm:px-8 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-base sm:text-lg tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer text-center"
                    >
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span>{lang === 'de' ? 'In den Warenkorb' : 'Add to Cart'}</span>
                    </button>
                  </div>

                  {addedNotice && (
                    <div className="p-3 rounded-xl bg-[#E8EFEA] border border-[#C5D8CC] text-xs font-craft-mono font-bold text-[#2D6A4F] flex items-center justify-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>{lang === 'de' ? 'Flasche wurde zum Warenkorb hinzugefügt!' : 'Bottle added to cart!'}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-500 font-woodblock text-xl uppercase text-center">
                  {lang === 'de' ? 'Diese Abfüllung ist restlos ausverkauft' : 'This release is completely sold out'}
                </div>
              )}

              {/* Guarantees List */}
              <div className="pt-2 border-t border-[#E2DDD5] space-y-2 text-xs font-craft-mono text-[#55695E] font-bold">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                  <span>{lang === 'de' ? 'Klimaneutraler DHL GoGreen Versand (2–4 Werktage)' : 'Climate-neutral DHL GoGreen shipping (2–4 days)'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-[#B85D2C]" />
                  <span>{lang === 'de' ? '100% Cask Strength · Unfiltriert · Ohne Zuckerkulör' : '100% Cask Strength · Unchillfiltered · Natural Colour'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Leaf className="w-4 h-4 text-[#2D6A4F]" />
                  <span>{lang === 'de' ? 'Nachhaltig abgefüllt mit edlem Naturkork' : 'Sustainably bottled with natural cork'}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Sensory Notes */}
        <div className="mb-24 space-y-8">
          <div className="border-b border-[#E2DDD5] pb-4">
            <span className="font-script text-3xl text-[#2D6A4F] block">
              {lang === 'de' ? 'Sensorische Verkostung' : 'Sensory Evaluation'}
            </span>
            <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase">
              {lang === 'de' ? 'Tasting Notes von Ines Zager.' : 'Tasting Notes by Ines Zager.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#D4C8B8] shadow-xs space-y-3">
              <span className="font-craft-mono text-xs uppercase tracking-widest text-[#B85D2C] font-bold block">
                01 · {lang === 'de' ? 'Nase' : 'Nose'}
              </span>
              <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                {lang === 'de' ? 'Aromatik & Bukett' : 'Aroma & Bouquet'}
              </h3>
              <p className="text-[#3A4A40] text-sm sm:text-base font-normal leading-relaxed">
                {product.tastingNotes?.nose || (lang === 'de' ? 'Aromatische Verkostungsnotizen folgen in Kürze.' : 'Tasting notes coming soon.')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#D4C8B8] shadow-xs space-y-3">
              <span className="font-craft-mono text-xs uppercase tracking-widest text-[#B85D2C] font-bold block">
                02 · {lang === 'de' ? 'Gaumen' : 'Palate'}
              </span>
              <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                {lang === 'de' ? 'Körper & Textur' : 'Body & Texture'}
              </h3>
              <p className="text-[#3A4A40] text-sm sm:text-base font-normal leading-relaxed">
                {product.tastingNotes?.palate || (lang === 'de' ? 'Geschmacksnotizen folgen in Kürze.' : 'Palate notes coming soon.')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#D4C8B8] shadow-xs space-y-3">
              <span className="font-craft-mono text-xs uppercase tracking-widest text-[#B85D2C] font-bold block">
                03 · {lang === 'de' ? 'Nachklang' : 'Finish'}
              </span>
              <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                {lang === 'de' ? 'Finish & Tiefe' : 'Finish & Depth'}
              </h3>
              <p className="text-[#3A4A40] text-sm sm:text-base font-normal leading-relaxed">
                {product.tastingNotes?.finish || (lang === 'de' ? 'Nachklangnotizen folgen in Kürze.' : 'Finish notes coming soon.')}
              </p>
            </div>
          </div>
        </div>

        {/* Further Casks */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-4">
            <div>
              <span className="font-script text-3xl text-[#2D6A4F] block">
                {lang === 'de' ? 'Entdeckungen' : 'Discoveries'}
              </span>
              <h2 className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] uppercase tracking-wide">
                {lang === 'de' ? 'Weitere handverlesene Abfüllungen.' : 'Further Handpicked Releases.'}
              </h2>
            </div>
            <button
              onClick={onNavigateShop}
              className="font-craft-mono text-xs font-bold text-[#B85D2C] hover:underline cursor-pointer"
            >
              {lang === 'de' ? 'Alle im Shop ansehen →' : 'View all in shop →'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.slice(0, 3).map(other => {
              const otherBottle = other.cutoutImage || other.image;
              const isOtherFullPhoto = typeof otherBottle === 'string' && (
                otherBottle.includes('20241014') || 
                otherBottle.includes('full') || 
                otherBottle.includes('Testing') || 
                otherBottle.includes('Single-Malt')
              );
              const otherCardBg = other.cardBg || IMAGES.card_bg_speyside;

              return (
                <div
                  key={other.id}
                  onClick={() => onSelectOtherProduct(other)}
                  className="bg-white border border-[#D4C8B8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-4 text-left group"
                >
                  {/* Bottle Stage with Scottish Background */}
                  <div className="h-56 sm:h-64 relative flex items-center justify-center rounded-xl overflow-hidden border border-[#D4C8B8] shadow-inner bg-neutral-900 group">
                    {isOtherFullPhoto ? (
                      <div className="w-full h-full flex items-center justify-center relative p-3 overflow-hidden">
                        <img
                          src={otherBottle}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-40 scale-120 pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-black/25" />
                        <img
                          src={otherBottle}
                          alt={other.fullName || other.name}
                          className="relative z-10 max-h-full max-w-full object-contain rounded-lg drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] group-hover:scale-104 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <>
                        {/* Layer 1: Background Landscape */}
                        <img
                          src={otherCardBg}
                          alt="Schottische Landschaft"
                          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] contrast-[1.05] blur-[0.5px] scale-105 opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                        />
                        {/* Layer 2: Atmospheric Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/30" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,139,56,0.20)_0%,_transparent_65%)]" />

                        {/* Layer 3: Foreground Bottle */}
                        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-3">
                          <img
                            src={otherBottle}
                            alt={other.fullName || other.name}
                            className="max-h-[85%] max-w-[85%] w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.75)] group-hover:scale-106 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="w-20 h-3 bg-black/65 rounded-full blur-md -mt-1.5 opacity-80" />
                        </div>
                      </>
                    )}

                    {other.isUpcoming ? (
                      <span className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 bg-[#FAF0EB]/95 backdrop-blur-xs text-[#B85D2C] text-[10px] font-craft-mono font-bold rounded shadow-xs">
                        Release {other.releaseDate ? other.releaseDate.replace('September', '09.') : '17.09.'}
                      </span>
                    ) : !other.isAvailable ? (
                      <span className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 bg-rose-100/95 backdrop-blur-xs text-rose-700 text-[10px] font-craft-mono font-bold rounded shadow-xs">
                        {lang === 'de' ? 'Ausverkauft' : 'Sold Out'}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <span className="font-script text-xl text-[#2D6A4F]">{other.region} Single Malt</span>
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
                      {lang === 'de' ? 'Details ansehen →' : 'View details →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
