import React from 'react';
import { PACKAGING_HOTSPOTS } from '../data/pureWhiskyFullData';

export default function PackagingAnatomy() {
  return (
    <section id="packaging-section" className="py-28 lg:py-36 bg-[#FAF8F5] border-b border-[#E2DDD5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        <div className="max-w-3xl mb-20 space-y-2">
          <span className="font-script text-3xl text-[#2D6A4F] block">
            100% Circular Craft
          </span>
          <h2 className="font-woodblock text-4xl sm:text-5xl lg:text-6xl text-[#181F1C] tracking-wide uppercase leading-tight">
            Die Anatomie nachhaltiger Handwerkskunst.
          </h2>
          <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed">
            Vom geschmolzenen Altglas bis zum handgestempelten Saatenpapier – jedes Material 
            wurde ausgewählt, um den ökologischen Fußabdruck auf ein Minimum zu reduzieren.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PACKAGING_HOTSPOTS.map((spot, idx) => (
            <div key={spot.id} className="bg-white border border-[#D4C8B8] rounded-2xl p-7 space-y-5 shadow-xs flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="h-56 rounded-xl overflow-hidden bg-[#FAF8F5] border border-[#E2DDD5]">
                  <img
                    src={spot.image}
                    alt={spot.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-1">
                    <span className="font-woodblock text-2xl text-[#B85D2C] leading-none">0{idx + 1}</span>
                    <span className="font-script text-xl text-[#2D6A4F]">{spot.subtitle}</span>
                  </div>
                  <h3 className="font-woodblock text-2xl text-[#181F1C] tracking-wide uppercase leading-snug">{spot.title}</h3>
                  <p className="text-sm sm:text-base text-[#3A4A40] font-normal leading-relaxed pt-1">{spot.desc}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
