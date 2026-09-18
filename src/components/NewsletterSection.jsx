import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NewsletterSection({ onSubscribe }) {
  const { lang, t } = useLanguage();
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
          name: name.trim() || (lang === 'de' ? 'Whisky-Liebhaber' : 'Whisky Enthusiast'),
          firstName: name.trim().split(' ')[0] || '',
          lastName: name.trim().split(' ').slice(1).join(' ') || '',
          caskInterest,
          source: 'newsletter',
          date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
        });
      }
      setSubmitted(true);
    }
  };

  return (
    <section id="newsletter-section" className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-[#E2DDD5]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8">
        
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="font-script text-2xl sm:text-3xl text-[#2D6A4F] block font-bold">
            {t.newsletter.badge}
          </span>
          <h2 className="font-woodblock text-3xl sm:text-4xl lg:text-5xl text-[#181F1C] tracking-wide uppercase leading-tight">
            {t.newsletter.title}
          </h2>
          <p className="text-[#3A4A40] text-base sm:text-lg font-normal leading-relaxed">
            {t.newsletter.subtitle}
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-3xl bg-white border border-[#C5D8CC] shadow-md max-w-xl mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E8EFEA] text-[#2D6A4F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
              {lang === 'de' ? 'Erfolgreich vorgemerkt!' : 'Successfully Subscribed!'}
            </h3>
            <p className="text-sm text-[#3A4A40] leading-relaxed">
              {lang === 'de' ? (
                <>Vielen Dank, <strong>{name || email}</strong>. Sie erhalten ab sofort vor allen anderen persönliche Benachrichtigungen von Ines Zager, sobald ein neues Fass geöffnet wird.</>
              ) : (
                <>Thank you, <strong>{name || email}</strong>. You will now receive priority notifications directly from Ines Zager whenever a new cask release becomes available.</>
              )}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1.5">
                  {lang === 'de' ? 'Ihr Name' : 'Your Name'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'de' ? 'z.B. Martin Weber' : 'e.g. Martin Weber'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D4C8B8] bg-white text-sm text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                />
              </div>

              <div>
                <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1.5">
                  {lang === 'de' ? 'Ihre E-Mail-Adresse *' : 'Your Email *'}
                </label>
                <input
                  type="email"
                  required
                  placeholder={t.newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D4C8B8] bg-white text-sm text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                />
              </div>
            </div>

            <div>
              <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1.5">
                {lang === 'de' ? 'Bevorzugte Fass-Kategorie' : 'Preferred Cask Profile'}
              </label>
              <select
                value={caskInterest}
                onChange={(e) => setCaskInterest(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#D4C8B8] bg-white text-sm text-[#181F1C] focus:outline-none focus:border-[#B85D2C] font-craft-mono"
              >
                <option value="Alle Fässer (Highland & Island)">{lang === 'de' ? 'Alle Fässer (Highland & Island)' : 'All Casks (Highland & Island)'}</option>
                <option value="Rauchige Islay & Peated Fässer">{lang === 'de' ? 'Rauchige Islay & Peated Fässer' : 'Peated & Smoky Casks'}</option>
                <option value="Fruchtige Bourbon & Refill Fässer">{lang === 'de' ? 'Fruchtige Bourbon & Refill Fässer' : 'Fruity Bourbon & Refill Casks'}</option>
                <option value="Alte Jahrgänge (15+ Jahre)">{lang === 'de' ? 'Alte Jahrgänge (15+ Jahre)' : 'Aged Expressions (15+ Years)'}</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-lg tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t.newsletter.button}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[11px] text-[#55695E] text-center pt-1 font-craft-mono">
              🔒 {t.newsletter.privacyNote}
            </p>
          </form>
        )}

      </div>
    </section>
  );
}
