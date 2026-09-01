import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle, ShieldCheck, Mail } from 'lucide-react';

export default function DropClub() {
  const [email, setEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (email) {
      setIsJoined(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4A359', '#E9C68A', '#F6F4EE']
      });
    }
  };

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-b from-[#0B0E14] to-[#121722] border-t border-[#262F42]">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4A359]/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121722] border border-[#D4A359]/50 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A359] mb-6">
          <Sparkles className="w-4 h-4 text-[#D4A359]" />
          <span>Exklusiver Sammler-Vorteil</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-6xl font-bold text-[#F6F4EE] leading-tight mb-6">
          Werden Sie Mitglied im <br />
          <span className="gold-gradient-text">VIP Cask Drop Club.</span>
        </h2>

        <p className="text-sm sm:text-base text-[#D8D2C2] max-w-2xl mx-auto leading-relaxed mb-10">
          Einzelfässer von PURE.WHISKY. sind auf wenige hundert Flaschen limitiert. Club-Mitglieder erhalten <strong>24 Stunden vor dem offiziellen Verkaufsstart</strong> exklusiven Vorab-Zugriff auf neue Releases.
        </p>

        {isJoined ? (
          <div className="p-8 rounded-3xl bg-[#121722] border border-[#D4A359] max-w-lg mx-auto shadow-2xl">
            <CheckCircle className="w-12 h-12 text-[#D4A359] mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-[#F6F4EE] mb-2">
              Willkommen im VIP Drop Club!
            </h3>
            <p className="text-xs text-[#A0AEC0]">
              Sie erhalten ab sofort Benachrichtigungen zu neuen Einzelfass-Releases 24 Stunden vor allen anderen.
            </p>
          </div>
        ) : (
          <form onSubmit={handleJoin} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ihre persönliche E-Mail-Adresse..."
                className="w-full pl-12 pr-5 py-4 rounded-full bg-[#121722] border border-[#262F42] text-sm text-[#F6F4EE] placeholder-[#718096] focus:outline-none focus:border-[#D4A359] shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-[#D4A359] text-[#0B0E14] font-bold text-xs uppercase tracking-wider hover:bg-[#E9C68A] hover:shadow-[0_0_25px_rgba(212,163,89,0.4)] transition-all whitespace-nowrap"
            >
              24h Vorabzugriff sichern
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-[#718096]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#3E5C46]" />
            <span>100% Spamfrei & jederzeit abmeldbar</span>
          </div>
        </div>

      </div>
    </section>
  );
}
