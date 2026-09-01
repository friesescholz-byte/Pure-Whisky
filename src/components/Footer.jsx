import React from 'react';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { IMAGES } from '../data/pureWhiskyFullData';

export default function Footer({ onOpenLegal, setActiveTab }) {
  const scrollToNewsletter = () => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById('newsletter-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <footer className="bg-white border-t border-[#E2DDD5] text-[#3A4A40] text-left pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* 4 Balanced Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#E2DDD5]">
          
          {/* Col 1: Brand & Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <img src={IMAGES.logo} alt="Logo" className="w-12 h-12 rounded-full border border-[#D4C8B8]" />
              <span className="font-woodblock text-3xl tracking-wider text-[#181F1C] uppercase leading-none">
                PURE.WHISKY.
              </span>
            </div>
            <p className="text-base text-[#55695E] leading-relaxed font-normal">
              Unabhängiger Abfüller für unberührten schottischen Single Cask Whisky in nativer Fassstärke. 
              Handverlesen und auditiert nach strengen Nachhaltigkeitskriterien von Juristin Ines Zager.
            </p>
            <div className="flex items-center space-x-2 text-xs font-craft-mono font-bold text-[#2D6A4F] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
              <span>Verkauf & Zustellung nur an Personen ab 18 Jahren</span>
            </div>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-woodblock text-2xl text-[#181F1C] uppercase tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2 text-base font-normal">
              <li><button onClick={() => { setActiveTab('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-[#B85D2C] transition-colors">Startseite</button></li>
              <li><button onClick={() => { setActiveTab('shop'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-[#B85D2C] transition-colors">Die 4 Fässer (Shop)</button></li>
              <li><button onClick={() => { setActiveTab('about'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-[#B85D2C] transition-colors">Über Ines Zager</button></li>
              <li><button onClick={() => { setActiveTab('sustainability'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-[#B85D2C] transition-colors">Nachhaltigkeit & Audit</button></li>
              <li><button onClick={() => { setActiveTab('blog'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-[#B85D2C] transition-colors">Journal & Messen</button></li>
              <li className="pt-1">
                <button 
                  onClick={scrollToNewsletter} 
                  className="font-craft-mono text-xs font-bold text-[#B85D2C] hover:underline flex items-center space-x-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Fass-Depot / Newsletter →</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Rechtliches (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-woodblock text-2xl text-[#181F1C] uppercase tracking-wide">
              Rechtliches
            </h4>
            <ul className="space-y-2 text-base font-normal">
              <li><button onClick={() => onOpenLegal('impressum')} className="hover:text-[#B85D2C] transition-colors">Impressum</button></li>
              <li><button onClick={() => onOpenLegal('datenschutz')} className="hover:text-[#B85D2C] transition-colors">Datenschutz</button></li>
              <li><button onClick={() => onOpenLegal('agb')} className="hover:text-[#B85D2C] transition-colors">AGB</button></li>
              <li><button onClick={() => onOpenLegal('widerruf')} className="hover:text-[#B85D2C] transition-colors">Widerrufsrecht</button></li>
              <li><button onClick={() => onOpenLegal('versand')} className="hover:text-[#B85D2C] transition-colors whitespace-nowrap">Versand & Zahlung</button></li>
              <li><button onClick={() => onOpenLegal('barrierefreiheit')} className="hover:text-[#B85D2C] transition-colors">Barrierefreiheit</button></li>
            </ul>
          </div>

          {/* Col 4: Kontakt (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-woodblock text-2xl text-[#181F1C] uppercase tracking-wide">
              Kontakt
            </h4>
            <div className="space-y-2 text-base font-normal text-[#3A4A40]">
              <p className="font-bold text-[#181F1C]">Ines Zager</p>
              <p className="text-[#55695E]">Dürerring 1</p>
              <p className="text-[#55695E]">31582 Nienburg</p>
              
              <div className="pt-2 space-y-1.5">
                <a 
                  href="mailto:info@pure-whisky.com" 
                  className="font-craft-mono text-sm font-bold text-[#B85D2C] hover:underline block"
                >
                  info@pure-whisky.com
                </a>
                <a 
                  href="tel:+491638738824" 
                  className="font-craft-mono text-sm text-[#3A4A40] hover:text-[#B85D2C] transition-colors block"
                >
                  +49 163 8738824
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Scholz & Friese Link & Discreet Admin Trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-[#55695E] gap-4">
          <div className="flex items-center space-x-3">
            <p>© {new Date().getFullYear()} PURE.WHISKY. · Ines Zager. Alle Rechte vorbehalten.</p>
            <button
              onClick={() => { setActiveTab('admin'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className="text-[#D4C8B8] hover:text-[#B85D2C] transition-colors p-1"
              title="Admin Command Hub öffnen"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="flex items-center space-x-1.5">
            <span>Gestaltet & Entwickelt von</span>
            <a 
              href="https://scholz-friese-webdesign.de/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#181F1C] font-bold hover:text-[#B85D2C] transition-colors underline decoration-[#D4C8B8] underline-offset-4 hover:decoration-[#B85D2C]"
            >
              Scholz & Friese Webdesign
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
