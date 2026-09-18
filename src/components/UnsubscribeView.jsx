import React, { useState, useEffect } from 'react';
import { CheckCircle2, Mail, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function UnsubscribeView({ onUnsubscribe, onResubscribe, onNavigateHome, onNavigateShop }) {
  const { lang } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [targetEmail, setTargetEmail] = useState('');
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [isReSubscribed, setIsReSubscribed] = useState(false);

  // Synchronize unsubscribe state with Pure-Whisky Cloudflare KV
  const callUnsubscribeApi = async (email) => {
    try {
      const endpoint = typeof window !== 'undefined' && window.location.origin.includes('workers.dev')
        ? '/api/unsubscribe'
        : 'https://pure-whisky.friese-scholz.workers.dev/api/unsubscribe';
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch (e) {
      console.warn('Pure-Whisky worker unsubscribe sync notice:', e);
    }
  };

  const callResubscribeApi = async (email) => {
    try {
      const endpoint = typeof window !== 'undefined' && window.location.origin.includes('workers.dev')
        ? '/api/resubscribe'
        : 'https://pure-whisky.friese-scholz.workers.dev/api/resubscribe';
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch (e) {
      console.warn('Pure-Whisky worker resubscribe sync notice:', e);
    }
  };

  useEffect(() => {
    // Check URL query parameters for ?email=...
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get('email');
      if (emailParam) {
        const decoded = decodeURIComponent(emailParam).trim().toLowerCase();
        setTargetEmail(decoded);
        setEmailInput(decoded);
        callUnsubscribeApi(decoded);
        if (onUnsubscribe) {
          onUnsubscribe(decoded);
        }
        setIsUnsubscribed(true);
      }
    }
  }, [onUnsubscribe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    if (!cleanEmail) return;
    setTargetEmail(cleanEmail);
    callUnsubscribeApi(cleanEmail);
    if (onUnsubscribe) {
      onUnsubscribe(cleanEmail);
    }
    setIsUnsubscribed(true);
    setIsReSubscribed(false);
  };

  const handleUndo = () => {
    if (targetEmail) {
      callResubscribeApi(targetEmail);
      if (onResubscribe) {
        onResubscribe(targetEmail);
      }
      setIsReSubscribed(true);
    }
  };

  return (
    <div className="min-h-[85vh] pt-36 pb-24 bg-[#FAF8F5] flex items-center justify-center px-4 sm:px-6 text-left">
      <div className="max-w-lg w-full bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2 border-b border-[#E2DDD5] pb-6">
          <span className="font-script text-2xl text-[#2D6A4F] block">
            PURE.WHISKY.
          </span>
          <h1 className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] uppercase tracking-wide">
            {lang === 'de' ? 'Newsletter-Abmeldung' : 'Unsubscribe from Newsletter'}
          </h1>
          <p className="text-xs text-[#55695E] font-craft-mono">
            {lang === 'de' ? '1-Klick Abmeldeverfahren gemäß DSGVO' : '1-Click Unsubscribe per GDPR'}
          </p>
        </div>

        {/* State 1: Successfully Unsubscribed */}
        {isUnsubscribed && !isReSubscribed && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#E8EFEA] border border-[#C5D8CC] text-[#2D6A4F] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                {lang === 'de' ? 'Erfolgreich abgemeldet' : 'Successfully Unsubscribed'}
              </h2>
              <p className="text-sm text-[#3A4A40] leading-relaxed">
                {lang === 'de' ? (
                  <>
                    Ihre E-Mail-Adresse <strong className="font-mono text-[#181F1C]">{targetEmail}</strong> wurde aus unserem Verteiler ausgetragen.
                  </>
                ) : (
                  <>
                    Your email address <strong className="font-mono text-[#181F1C]">{targetEmail}</strong> has been removed from our mailing list.
                  </>
                )}
              </p>
              <p className="text-xs text-[#55695E] pt-1">
                {lang === 'de' 
                  ? 'Sie erhalten ab sofort keine weiteren Mitteilungen zu neuen Fässern oder Tastings mehr.' 
                  : 'You will no longer receive any updates on new cask drops or tastings.'}
              </p>
            </div>

            {/* Accidental Unsubscribe Undo */}
            <div className="pt-2 border-t border-[#E2DDD5]/60">
              <button
                type="button"
                onClick={handleUndo}
                className="text-xs text-[#55695E] hover:text-[#B85D2C] underline underline-offset-4 transition-colors font-craft-mono inline-flex items-center space-x-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{lang === 'de' ? 'Versehentlich abgemeldet? Hier wieder anmelden' : 'Unsubscribed by mistake? Re-subscribe here'}</span>
              </button>
            </div>

            {/* Navigation CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onNavigateHome}
                className="flex-1 py-3.5 rounded-xl bg-[#FAF8F5] hover:bg-[#E2DDD5] border border-[#D4C8B8] text-xs font-woodblock uppercase tracking-wider text-[#181F1C] transition-all text-center"
              >
                {lang === 'de' ? 'Zur Startseite' : 'Back to Home'}
              </button>
              <button
                onClick={onNavigateShop}
                className="flex-1 py-3.5 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white text-xs font-woodblock uppercase tracking-wider transition-all text-center shadow-xs"
              >
                {lang === 'de' ? 'Zum Whisky-Shop' : 'Go to Shop'}
              </button>
            </div>
          </div>
        )}

        {/* State 2: Re-subscribed Undo */}
        {isReSubscribed && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#D4C8B8] text-[#B85D2C] flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                {lang === 'de' ? 'Wieder angemeldet' : 'Subscribed Again'}
              </h2>
              <p className="text-sm text-[#3A4A40]">
                {lang === 'de' 
                  ? `Willkommen zurück! ${targetEmail} erhält wieder die exklusiven Vorab-Mitteilungen.` 
                  : `Welcome back! ${targetEmail} will receive our exclusive preview releases again.`}
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={onNavigateShop}
                className="w-full py-3.5 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white text-xs font-woodblock uppercase tracking-wider transition-all text-center shadow-xs"
              >
                {lang === 'de' ? 'Zum Whisky-Shop' : 'Explore Casks'}
              </button>
            </div>
          </div>
        )}

        {/* State 3: Manual Input Form (if no ?email= in URL) */}
        {!isUnsubscribed && !isReSubscribed && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-sm text-[#3A4A40] leading-relaxed text-center">
              {lang === 'de' 
                ? 'Geben Sie Ihre E-Mail-Adresse ein, um sich mit einem Klick verbindlich aus allen Newsletter- und Mitteilungs-Verteilern abzumelden.' 
                : 'Enter your email address to unsubscribe from all newsletter and notification lists.'}
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-craft-mono font-bold uppercase tracking-wider text-[#55695E]">
                {lang === 'de' ? 'Ihre E-Mail-Adresse' : 'Your Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#55695E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@beispiel.de"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#181F1C] hover:bg-black text-white font-woodblock text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{lang === 'de' ? 'Jetzt mit einem Klick abmelden' : 'Unsubscribe with one click'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-[#55695E] font-craft-mono pt-2">
              🔒 {lang === 'de' ? 'Ihre Abmeldung wird sofort im System wirksam.' : 'Your unsubscribe will take effect immediately.'}
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
