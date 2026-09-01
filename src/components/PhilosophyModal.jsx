import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PHILOSOPHY_PILLARS } from '../data/pureWhiskyFullData';

export default function PhilosophyModal({ isOpen, onClose }) {
  const [selectedId, setSelectedId] = useState(PHILOSOPHY_PILLARS[0].id);
  if (!isOpen) return null;

  const current = PHILOSOPHY_PILLARS.find(p => p.id === selectedId) || PHILOSOPHY_PILLARS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-2xl text-left my-8 max-h-[90vh] flex flex-col">
        
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-amber-800 font-bold">
              Haltung & Werte
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal">
              Die 5 Säulen von PURE.WHISKY.
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pt-4 border-b border-neutral-200 flex flex-wrap gap-2 bg-neutral-50">
          {PHILOSOPHY_PILLARS.map(pill => (
            <button
              key={pill.id}
              onClick={() => setSelectedId(pill.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-t border-b-2 font-medium transition-all ${
                selectedId === pill.id
                  ? 'border-amber-800 text-amber-900 bg-white font-bold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {pill.title}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-5 rounded-xl overflow-hidden border border-neutral-200">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>

            <div className="md:col-span-7 space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-amber-800 font-bold px-2 py-0.5 rounded bg-amber-50 border border-amber-200">
                {current.tag}
              </span>
              <h3 className="font-serif text-2xl text-neutral-900 font-medium">{current.subtitle}</h3>
              
              <blockquote className="p-4 rounded-lg bg-[#FAF8F5] border-l-2 border-amber-800 italic text-neutral-800 text-sm">
                {current.quote}
              </blockquote>

              <div className="space-y-3 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                {current.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="p-4 border-t border-neutral-200 bg-[#FAF8F5] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded bg-amber-800 hover:bg-amber-900 text-white text-xs uppercase tracking-wider font-semibold shadow-xs"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
}
