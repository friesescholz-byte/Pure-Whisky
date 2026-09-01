import React, { useState } from 'react';
import { FAQ_DATA } from '../data/pureWhiskyFullData';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';

export default function FAQView({ setActiveTab }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12">
      
      {/* Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A359] mb-2">
          Häufige Fragen
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F4EE]">
          FAQ & Wissenswertes
        </h1>
        <p className="text-sm text-[#A0AEC0] mt-2">
          Hier finden Sie Antworten zu unseren Einzelfass-Abfüllungen, Fassstärke, Nachhaltigkeit und Bestellablauf.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {FAQ_DATA.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-[#121722] border border-[#262F42] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-lg font-bold text-[#F6F4EE] hover:text-[#D4A359] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#D4A359] shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-[#D8D2C2] leading-relaxed border-t border-[#262F42]/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Box */}
      <div className="p-8 rounded-3xl bg-[#121722] border border-[#D4A359]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#F6F4EE]">Noch offene Fragen?</h3>
          <p className="text-xs text-[#A0AEC0] mt-1">Schreiben Sie Ines Zager direkt an info@pure-whisky.com</p>
        </div>
        <a
          href="mailto:info@pure-whisky.com"
          className="px-6 py-3 rounded-full bg-[#D4A359] text-[#0B0E14] font-bold text-xs uppercase hover:bg-[#E9C68A] transition-all"
        >
          E-Mail senden
        </a>
      </div>

    </div>
  );
}
