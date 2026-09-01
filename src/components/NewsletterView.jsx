import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';

export default function NewsletterView() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4A359', '#E9C68A', '#F6F4EE']
      });
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
      
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121722] border border-[#D4A359]/40 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A359]">
        <Sparkles className="w-4 h-4" />
        <span>Exklusiver Vorab-Zugriff</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F4EE] leading-tight">
        Verpassen Sie keine neuen Abfüllungen von PURE.WHISKY.
      </h1>

      <p className="text-sm sm:text-base text-[#D8D2C2] max-w-xl mx-auto leading-relaxed">
        Registrieren Sie sich für den Newsletter. Kein Spam, nur relevante Neuigkeiten zu meinen Whiskys und <strong>24 Stunden Vorabzugriff</strong> auf jeden limitierten Drop.
      </p>

      {submitted ? (
        <div className="p-8 rounded-3xl bg-[#121722] border border-[#D4A359] shadow-2xl">
          <CheckCircle className="w-12 h-12 text-[#D4A359] mx-auto mb-3" />
          <h2 className="font-serif text-2xl font-bold text-[#F6F4EE] mb-2">
            Vielen Dank für Ihre Anmeldung!
          </h2>
          <p className="text-xs text-[#A0AEC0]">
            Wir haben Ihnen eine Bestätigung an {email} gesendet. Ab sofort erfahren Sie vor allen anderen von neuen Einzelfass-Drops.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ihre E-Mail-Adresse..."
              className="w-full pl-12 pr-5 py-4 rounded-full bg-[#121722] border border-[#262F42] text-sm text-[#F6F4EE] placeholder-[#718096] focus:outline-none focus:border-[#D4A359]"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 rounded-full bg-[#D4A359] text-[#0B0E14] font-bold text-xs uppercase tracking-wider hover:bg-[#E9C68A] transition-all whitespace-nowrap"
          >
            Jetzt abonnieren
          </button>
        </form>
      )}

      <div className="flex items-center justify-center gap-4 text-xs text-[#718096]">
        <ShieldCheck className="w-4 h-4 text-[#5A7F63]" />
        <span>100% vertraulich · Jederzeit mit 1 Klick abmeldbar</span>
      </div>

    </div>
  );
}
