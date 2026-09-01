import React, { useState } from 'react';
import { EVENTS_DATA } from '../data/whiskyData';
import { Calendar, MapPin, CheckCircle, Send } from 'lucide-react';

export default function EventsCalendar() {
  const [reserved, setReserved] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setReserved(true);
    }
  };

  return (
    <section id="events" className="py-24 bg-[#0B0E14] relative border-t border-[#262F42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121722] border border-[#D4A359]/40 text-xs font-semibold tracking-wider text-[#D4A359] uppercase mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Messen & Tastings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F4EE] mb-4">
            Ines Zager live treffen & verkosten
          </h2>
          <p className="text-[#D8D2C2] text-sm sm:text-base leading-relaxed">
            Erleben Sie PURE.WHISKY. auf den führenden Spirituosenmessen im deutschsprachigen Raum. Sichern Sie sich vorab eine persönliche Standverkostung.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {EVENTS_DATA.map((evt, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#121722] border border-[#262F42] flex flex-col justify-between text-left hover:border-[#D4A359]/50 transition-all shadow-lg"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0B0E14] text-[#D4A359] border border-[#D4A359]/30 mb-4">
                  {evt.badge}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#F6F4EE] mb-2">
                  {evt.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#D4A359] mb-2 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#A0AEC0] mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{evt.location}</span>
                </div>
                <p className="text-xs text-[#D8D2C2] leading-relaxed">
                  {evt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stand Tasting Pre-registration Box */}
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#121722] border border-[#D4A359]/40 text-center">
          <h3 className="font-serif text-2xl font-bold text-[#F6F4EE] mb-2">
            VIP-Verkostung am Messestand vormerken
          </h3>
          <p className="text-xs sm:text-sm text-[#A0AEC0] mb-6">
            Möchten Sie Ines Zager auf einer der kommenden Messen treffen? Hinterlassen Sie Ihre E-Mail und erhalten Sie rechtzeitig Standnummer & Verkostungszeiten.
          </p>

          {reserved ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Vielen Dank! Wir haben Ihre Verkostungs-Anfrage notiert.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ihre E-Mail-Adresse..."
                className="flex-1 px-5 py-3.5 rounded-full bg-[#0B0E14] border border-[#262F42] text-sm text-[#F6F4EE] placeholder-[#718096] focus:outline-none focus:border-[#D4A359]"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-[#D4A359] text-[#0B0E14] font-bold text-xs uppercase tracking-wider hover:bg-[#E9C68A] transition-all flex items-center justify-center gap-2"
              >
                <span>Vormerken</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
