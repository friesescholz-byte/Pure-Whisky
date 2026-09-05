import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { IMAGES, PRODUCTS } from '../data/pureWhiskyFullData';

export default function Navbar({ activeTab, setActiveTab, onSelectProduct, cartItemsCount, setIsCartOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/92 backdrop-blur-md border-b border-[#E2DDD5] transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center space-x-3 text-left focus:outline-none group"
        >
          <img
            src={IMAGES.logo}
            alt="PURE.WHISKY. Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-full border border-[#D4C8B8] shadow-xs group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] tracking-wider uppercase leading-none">
              PURE.WHISKY.
            </span>
            <span className="font-script text-base text-[#2D6A4F] leading-none mt-1">
              Single Cask Scotch Selection
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          
          {/* Startseite */}
          <button
            onClick={() => setActiveTab('home')}
            className={`font-woodblock text-lg tracking-wider uppercase transition-colors relative py-1 ${
              activeTab === 'home' ? 'text-[#B85D2C]' : 'text-[#181F1C] hover:text-[#B85D2C]'
            }`}
          >
            Startseite
            {activeTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B85D2C] rounded-full" />
            )}
          </button>

          {/* Die Fässer (Clean, Spacious Dropdown) */}
          <div 
            className="relative group py-6"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <button
              onClick={() => setActiveTab('shop')}
              className={`font-woodblock text-lg tracking-wider uppercase transition-colors flex items-center space-x-1.5 py-1 ${
                activeTab === 'shop' || activeTab === 'product' ? 'text-[#B85D2C]' : 'text-[#181F1C] hover:text-[#B85D2C]'
              }`}
            >
              <span>Die Fässer</span>
              <ChevronDown className="w-4 h-4 text-[#55695E] group-hover:text-[#B85D2C] group-hover:rotate-180 transition-transform duration-200" />
              {(activeTab === 'shop' || activeTab === 'product') && (
                <span className="absolute bottom-6 left-0 right-0 h-0.5 bg-[#B85D2C] rounded-full" />
              )}
            </button>

            {/* Dropdown Menu - Clean, Legible, All Casks Readable */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[420px] bg-white border border-[#D4C8B8] rounded-2xl shadow-xl p-4 space-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 text-left max-h-[80vh] overflow-y-auto">
              
              <div className="pb-3 border-b border-[#E2DDD5] flex items-center justify-between">
                <span className="font-woodblock text-sm uppercase tracking-wider text-[#181F1C]">
                  Alle Abfüllungen ({PRODUCTS.length})
                </span>
                <button
                  onClick={() => { setActiveTab('shop'); setShopDropdownOpen(false); }}
                  className="font-craft-mono text-xs text-[#B85D2C] font-bold hover:underline"
                >
                  Gesamten Shop öffnen →
                </button>
              </div>

              <div className="space-y-1.5 divide-y divide-[#FAF8F5]">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      setShopDropdownOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors flex items-center space-x-3 text-left group/item pt-2"
                  >
                    <div className="w-12 h-14 bg-[#FAF8F5] rounded-xl border border-[#E2DDD5] p-1 flex items-center justify-center shrink-0">
                      <img src={prod.image} alt={prod.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-woodblock text-base text-[#181F1C] uppercase truncate group-hover/item:text-[#B85D2C] transition-colors">
                          {prod.name}
                        </span>
                        <span className="font-woodblock text-sm text-[#181F1C] shrink-0 ml-2">
                          {prod.price.toFixed(2)} €
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-[#55695E] font-craft-mono mt-0.5">
                        <span className="truncate">{prod.region} · {prod.abv}</span>
                        {prod.isUpcoming ? (
                          <span className="text-[#B85D2C] font-bold shrink-0 ml-2">Ab 17.09.</span>
                        ) : !prod.isAvailable ? (
                          <span className="text-neutral-400 font-bold shrink-0 ml-2">Sold Out</span>
                        ) : null}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E2DDD5]">
                <button
                  onClick={() => { setActiveTab('shop'); setShopDropdownOpen(false); }}
                  className="w-full py-3 rounded-xl bg-[#181F1C] hover:bg-[#2C3831] text-white font-woodblock text-base tracking-wider uppercase text-center flex items-center justify-center space-x-2"
                >
                  <span>Alle Abfüllungen im Shop ansehen</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Über Ines Zager */}
          <button
            onClick={() => setActiveTab('about')}
            className={`font-woodblock text-lg tracking-wider uppercase transition-colors relative py-1 ${
              activeTab === 'about' ? 'text-[#B85D2C]' : 'text-[#181F1C] hover:text-[#B85D2C]'
            }`}
          >
            Über Ines Zager
            {activeTab === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B85D2C] rounded-full" />
            )}
          </button>

          {/* Nachhaltigkeit & Audit */}
          <button
            onClick={() => setActiveTab('sustainability')}
            className={`font-woodblock text-lg tracking-wider uppercase transition-colors relative py-1 ${
              activeTab === 'sustainability' ? 'text-[#B85D2C]' : 'text-[#181F1C] hover:text-[#B85D2C]'
            }`}
          >
            Nachhaltigkeit & Audit
            {activeTab === 'sustainability' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B85D2C] rounded-full" />
            )}
          </button>

          {/* Journal & Messen */}
          <button
            onClick={() => setActiveTab('blog')}
            className={`font-woodblock text-lg tracking-wider uppercase transition-colors relative py-1 ${
              activeTab === 'blog' ? 'text-[#B85D2C]' : 'text-[#181F1C] hover:text-[#B85D2C]'
            }`}
          >
            Journal & Messen
            {activeTab === 'blog' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B85D2C] rounded-full" />
            )}
          </button>
        </nav>

        {/* Right Action Icons: Cart & Mobile Hamburger */}
        <div className="flex items-center space-x-4">
          
          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-3 rounded-full bg-white border border-[#D4C8B8] hover:bg-[#FAF8F5] text-[#181F1C] relative transition-colors shadow-xs"
            aria-label="Warenkorb öffnen"
          >
            <ShoppingBag className="w-5 h-5 text-[#181F1C]" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#B85D2C] text-white text-[11px] font-craft-mono font-bold flex items-center justify-center shadow-xs">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 rounded-full bg-white border border-[#D4C8B8] text-[#181F1C] lg:hidden"
            aria-label="Menü umschalten"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#D4C8B8] px-6 py-8 space-y-4 text-left shadow-lg">
          {[
            { id: 'home', label: 'Startseite' },
            { id: 'shop', label: 'Die Fässer (Alle Abfüllungen)' },
            { id: 'about', label: 'Über Ines Zager' },
            { id: 'sustainability', label: 'Nachhaltigkeit & Audit' },
            { id: 'blog', label: 'Journal & Messen' },
          ].map(link => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left font-woodblock text-2xl uppercase tracking-wider py-2 ${
                activeTab === link.id ? 'text-[#B85D2C]' : 'text-[#181F1C]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
