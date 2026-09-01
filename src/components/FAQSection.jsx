import React, { useState } from 'react';
import { FAQ_DATA } from '../data/pureWhiskyFullData';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq-section" className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-amber-800 font-semibold">
            Transparenz & Antworten
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 font-normal">
            Häufig gestellte Fragen.
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Alles über Fassstärke, 100% Wild Glass, Umwelt-Audits und Versand.
          </p>
        </div>

        <div className="space-y-3 text-left">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between text-neutral-900 hover:text-amber-800 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-medium pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-amber-800 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed border-t border-neutral-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
