import React, { useState } from 'react';
import { FAQ_DATA } from '../data/pureWhiskyFullData';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FAQ_DATA_EN = [
  {
    q: 'What does "Natural Cask Strength" mean?',
    a: 'Our single casks are bottled straight from the barrel without dilution. The natural alcohol volume (often between 53% and 60% vol.) reflects the undiluted aroma and character shaped over years of oak maturation.'
  },
  {
    q: 'Why are the bottles not chill-filtered or artificially colored?',
    a: 'Chill-filtration strips away essential fatty acids and natural oils that carry rich mouthfeel and flavor. Artificial caramel coloring (E150a) merely simulates age. PURE.WHISKY. stands for 100% natural, authentic Scotch whisky.'
  },
  {
    q: 'What makes Estal Wild Glass and the closure sustainable?',
    a: 'Every bottle is manufactured in Spain from 100% post-consumer recycled glass (PCR), saving melting energy and virgin raw materials. The seal is made from 100% biodegradable plant polymer, sealed with untreated natural Spanish cork.'
  },
  {
    q: 'How does PURE.WHISKY. evaluate partner distilleries in Scotland?',
    a: 'Having worked with environmental management systems for around 20 years, I examine each distillery’s sustainability background prior to acquiring any cask. Key benchmarks adhere to recognized environmental management systems (such as EMAS and ISO 14001): river watershed protection, closed cooling loops, renewable biomass energy, and complete upcycling of spent grain.'
  },
  {
    q: 'How are orders shipped and insured?',
    a: 'All orders are dispatched via climate-neutral DHL GoGreen within 2–4 business days, securely packaged in plastic-free packaging. Delivery includes statutory age verification (18+).'
  }
];

export default function FAQSection() {
  const { lang, t } = useLanguage();
  const [openIdx, setOpenIdx] = useState(0);

  const items = lang === 'de' ? FAQ_DATA : FAQ_DATA_EN;

  return (
    <section id="faq-section" className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-amber-800 font-semibold">
            {t.faq.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 font-normal">
            {t.faq.heading}
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            {t.faq.subheading}
          </p>
        </div>

        <div className="space-y-3 text-left">
          {items.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between text-neutral-900 hover:text-amber-800 transition-colors cursor-pointer"
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
