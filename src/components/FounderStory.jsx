import React from 'react';
import { Award, Tv, ExternalLink, HeartHandshake } from 'lucide-react';
import { R2_BASE } from '../data/whiskyData';

export default function FounderStory() {
  return (
    <section id="founder" className="py-24 sm:py-32 bg-[#121722]/40 relative border-t border-[#262F42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Founder Visual & Media Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4A359]/30 bg-[#0B0E14] shadow-2xl group">
              <img
                src={`${R2_BASE}ines-zager-portrait.webp`}
                alt="Ines Zager Gründerin PURE.WHISKY."
                className="w-full h-auto max-h-[460px] object-cover filter saturate-90 group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs uppercase tracking-widest text-[#D4A359] font-bold">Gründerin & Master Curator</div>
                <div className="font-serif text-2xl font-bold text-[#F6F4EE]">Ines Zager</div>
                <div className="text-xs text-[#A0AEC0] mt-1">Umweltjuristin & Independent Bottler</div>
              </div>
            </div>

            {/* Media Mention Pill */}
            <div className="p-4 rounded-2xl bg-[#0B0E14] border border-[#262F42] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#F6F4EE]">ARTE / ZDF Dokumentation</div>
                  <div className="text-[11px] text-[#A0AEC0]">„Whiskyboom auf Islay“</div>
                </div>
              </div>
              <a
                href="https://www.zdf.de/arte/arte-re/page-video-artede-re-whisky-boom-mit-schattenseiten-100.html"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#121722] text-[#D4A359] hover:text-white transition-colors"
                title="ZDF Mediathek öffnen"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Story & Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A359] mb-4">
              <HeartHandshake className="w-4 h-4 text-[#D4A359]" />
              <span>Die Gründerin & Mission</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F4EE] leading-tight mb-6">
              Vom Umweltrecht <br className="hidden sm:inline" />
              zum Lebenswerk im Whisky.
            </h2>

            <div className="space-y-4 text-[#D8D2C2] text-sm sm:text-base leading-relaxed mb-8">
              <p>
                Seit über 20 Jahren bereise ich Schottland auf der Suche nach den ehrlichsten Fässern. Nach zwei Jahrzehnten als spezialisierte Juristin für Umwelt- und Energierecht bei großen Energiekonzernen entschied ich 2023, meinem Lebenstraum zu folgen: <strong>PURE.WHISKY.</strong>
              </p>
              <p>
                Als eine der sehr wenigen unabhängigen Abfüllerinnen in Europa wähle ich jedes Fass persönlich aus. Ich besuche die Brennereien vor Ort und prüfe sie nach transparenten Nachhaltigkeitskriterien wie Wassermanagement und CO₂-Reduktion.
              </p>
              <p>
                Gefördert als Mentee der weltweiten <em>Our Whisky Foundation</em> durch Rachel Vaughn Jones (Marketing Director von Compass Box), steht PURE.WHISKY. für kompromisslose Single-Cask-Qualität ohne elitären Snobismus.
              </p>
            </div>

            {/* Our Whisky Foundation Badge */}
            <div className="p-5 rounded-2xl bg-[#0B0E14] border border-[#D4A359]/30 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-serif text-lg font-bold text-[#D4A359]">Our Whisky Foundation Mentee</div>
                <div className="text-xs text-[#A0AEC0]">Mentoring durch Rachel Vaughn Jones (Compass Box Whisky)</div>
              </div>
              <a
                href="https://www.ourwhiskyfoundation.org"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-[#121722] border border-[#262F42] text-xs text-[#F6F4EE] hover:text-[#D4A359] transition-colors whitespace-nowrap"
              >
                Mehr erfahren &rarr;
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
