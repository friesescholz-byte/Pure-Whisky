import React from 'react';

export default function PillarsStrip() {
  const pillars = [
    {
      scriptTag: 'Single Cask',
      title: 'Natives Einzelfass',
      desc: 'Jede Flasche stammt unverschnitten aus einem einzelnen Holzfass in nativer Fassstärke (53,2%–56,7% vol.) – ungefiltert und ohne Farbstoffe.',
      bgImage: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/Screenshot%202026-09-01%20124720.png'
    },
    {
      scriptTag: 'Umweltrecht',
      title: 'Juristisches Audit',
      desc: 'Ines Zager prüft jede Brennerei persönlich vor Ort auf Quellenschutz, Abwasserkreisläufe und nachhaltige Energiegewinnung.',
      bgImage: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/Pure-Whisky-bILDER04.webp'
    },
    {
      scriptTag: 'Estal PCR',
      title: '100% Wild Glass',
      desc: 'Gegossen aus spanischem PCR-Altglas, versiegelt mit spanischem Naturkork und veredelt mit biologisch abbaubarem Saatenpapier.',
      bgImage: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/biopolymer-kapsel.webp'
    }
  ];

  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-[#E2DDD5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 text-left">
          {pillars.map((p, idx) => (
            <div 
              key={idx} 
              className="relative p-8 sm:p-9 rounded-3xl bg-white border border-[#D4C8B8] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group min-h-[300px]"
            >
              
              {/* Right-Aligned Vivid Image with Smooth Leftward Gradient Fade */}
              {p.bgImage && (
                <div className="absolute top-0 right-0 bottom-0 w-3/5 pointer-events-none z-0 overflow-hidden">
                  <img
                    src={p.bgImage}
                    alt=""
                    className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.06] opacity-90 group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Smooth horizontal fade into white behind the text */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 via-35% to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/40" />
                </div>
              )}

              {/* Text Layer (Sitting on the clean left side with 100% contrast) */}
              <div className="relative z-10 space-y-3 max-w-[85%] sm:max-w-[78%]">
                <div className="border-b border-[#E2DDD5] pb-2">
                  <span className="font-script text-3xl text-[#2D6A4F] leading-none block font-bold">
                    {p.scriptTag}
                  </span>
                </div>

                <h3 className="font-woodblock text-3xl text-[#181F1C] tracking-wide uppercase pt-1">
                  {p.title}
                </h3>

                <p className="text-[#3A4A40] text-base leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
