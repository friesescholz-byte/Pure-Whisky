import React from 'react';
import { X, Sparkles } from 'lucide-react';

export default function PillarModal({ pillar, onClose }) {
  if (!pillar) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md" />

      <div className="relative w-full max-w-3xl bg-[#121722] border border-[#D4A359]/40 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 text-left max-h-[88vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0B0E14] text-[#A0AEC0] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs font-bold uppercase tracking-wider text-[#D4A359] mb-1">
          {pillar.subtitle}
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F4EE] mb-4">
          {pillar.title}
        </h1>

        <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#D4A359]/20 font-serif italic text-sm text-[#D4A359] mb-6">
          {pillar.quote}
        </div>

        <div className="text-sm sm:text-base text-[#D8D2C2] leading-relaxed whitespace-pre-line space-y-4">
          {pillar.content}
        </div>
      </div>
    </div>
  );
}
