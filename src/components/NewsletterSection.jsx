import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export default function NewsletterSection({ onSubscribe }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [caskInterest, setCaskInterest] = useState('Alle Fässer (Highland & Island)');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      if (onSubscribe) {
        onSubscribe({
          email: email.trim(),
          name: name.trim() || 'Whisky-Liebhaber',
          caskInterest,
          source: 'newsletter',
          date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
        });
      }
      setSubmitted(true);
    }
  };

  return (
    <section id="newsletter-section" className="py-28 lg:py-36 bg-[#FAF8F5] border-b border-[#E2DDD5]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8">
        
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="font-script text-3xl sm:text-4xl text-[#2D6A4F] block">
            Exklusive Fass-Zuteilung
          </span>
          <h2 className="font-woodblock text-4xl sm:text-5xl lg:text-6xl text-[#181F1C] tracking-wide uppercase leading-tight">
            Zugang zum Fass-Depot.
          </h2>
          <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
            Weil jedes Einzelfass auf maximal 100–240 Flaschen limitiert ist, 
            werden neue Releases zuerst an eingetragene Liebhaber per E-Mail vergeben.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-3xl bg-white border border-[#C5D8CC] shadow-md max-w-xl mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E8EFEA] text-[#2D6A4F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-woodblock text-3xl text-[#181F1C] uppercase">
              Erfolgreich vorgemerkt!
            </h3>
            <p className="text-sm text-[#3A4A40] leading-relaxed">
              Vielen Dank, <strong>{name || email}</strong>. Sie erhalten ab sofort vor allen anderen 
              persönliche Benachrichtigungen von Ines Zager, sobald ein neues Fass geöffnet wird.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1.5">
                  Ihr Name
                </label>
                <input
                  type="text"
                  placeholder="z.B. Martin Weber"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-[#D4C8B8] bg-white text-sm text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                />
              </div>

              <div>
                <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1.5">
                  Ihre E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ihre.mail@beispiel.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-[#D4C8B8] bg-white text-sm text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                />
              </div>
            </div>

            <div>
              <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1.5">
                Bevorzugte Fass-Kategorie
              </label>
              <select
                value={caskInterest}
                onChange={(e) => setCaskInterest(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-[#D4C8B8] bg-white text-sm text-[#181F1C] focus:outline-none focus:border-[#B85D2C] font-craft-mono"
              >
                <option value="Alle Fässer (Highland & Island)">Alle Fässer (Highland & Island)</option>
                <option value="Rauchige Islay & Peated Fässer">Rauchige Islay & Peated Fässer</option>
                <option value="Fruchtige Bourbon & Refill Fässer">Fruchtige Bourbon & Refill Fässer</option>
                <option value="Alte Jahrgänge (15+ Jahre)">Alte Jahrgänge (15+ Jahre)</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4.5 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Für exklusive Zuteilung vormerken</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[11px] text-[#55695E] text-center pt-1 font-craft-mono">
              🔒 Kein Spam. Abmeldung jederzeit mit 1 Klick möglich. Datenschutz gemäß DSGVO.
            </p>
          </form>
        )}

      </div>
    </section>
  );
}
