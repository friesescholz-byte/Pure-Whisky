import React, { useState } from 'react';
import { Mail, ShieldCheck, Check, Save, Building, CreditCard, Bell, Key, ExternalLink } from 'lucide-react';

export default function SettingsManager({ 
  adminEmail = 'friese.scholz@gmail.com', 
  onSaveAdminEmail 
}) {
  const [emailInput, setEmailInput] = useState(adminEmail);
  const [mollieKey, setMollieKey] = useState(
    () => localStorage.getItem('pure_mollie_key') || 'test_757rbjSksxgtDCCAps98ThDSgpxCaz'
  );
  const [resendKey, setResendKey] = useState(
    () => localStorage.getItem('pure_resend_key') || (import.meta.env?.VITE_RESEND_API_KEY || '')
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    fetch('/api/settings/mollie')
      .then(r => r.json())
      .then(data => {
        if (data && data.key && data.key.trim()) {
          setMollieKey(data.key.trim());
          localStorage.setItem('pure_mollie_key', data.key.trim());
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveAdminEmail) {
      onSaveAdminEmail(emailInput.trim());
    }
    const cleanMollie = mollieKey.trim();
    localStorage.setItem('pure_mollie_key', cleanMollie);
    if (resendKey) {
      localStorage.setItem('pure_resend_key', resendKey.trim());
    }

    // Sync to Cloudflare KV for all customer checkouts
    fetch('/api/settings/mollie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: cleanMollie })
    }).catch(err => console.warn('Could not sync Mollie key to KV:', err));

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      
      {/* Admin Email Notification Settings */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="border-b border-[#E2DDD5] pb-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-[#B85D2C]" />
            <h2 className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] uppercase tracking-wide">
              Bestell-Benachrichtigungen & APIs
            </h2>
          </div>
          <p className="text-xs text-[#55695E] mt-1">
            Verwaltung der E-Mail-Routen, Mollie Payment Gateway und Resend Mailer für rechtssicheren Rechnungsversand.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
          <div>
            <label className="block text-xs font-craft-mono font-bold text-[#181F1C] uppercase tracking-wider mb-1.5">
              Admin-Empfängeradresse *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="friese.scholz@gmail.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D4C8B8] text-sm text-[#181F1C] bg-[#FAF8F5] focus:outline-none focus:border-[#B85D2C]"
              />
            </div>
            <p className="text-[11px] text-[#55695E] mt-1">
              Erhaelt bei jeder Shop-Bestellung sofort eine Benachrichtigungskopie.
            </p>
          </div>

          <div>
            <label className="block text-xs font-craft-mono font-bold text-[#181F1C] uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Mollie API-Schlüssel (Live oder Test)</span>
              {mollieKey.trim().startsWith('live_') ? (
                <span className="text-[10px] text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full font-craft-mono font-bold">
                  🟢 LIVE-MODUS AKTIV
                </span>
              ) : (
                <span className="text-[10px] text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full font-craft-mono font-bold">
                  🟡 TEST-MODUS (test_...)
                </span>
              )}
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={mollieKey}
                onChange={(e) => setMollieKey(e.target.value)}
                placeholder="live_... oder test_..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D4C8B8] text-xs font-mono text-[#181F1C] bg-[#FAF8F5] focus:outline-none focus:border-[#B85D2C]"
              />
            </div>
            <p className="text-[11px] text-[#55695E] mt-1 leading-relaxed">
              Tragen Sie hier Ihren <strong>Live-API-Key</strong> (beginnt mit <code>live_...</code>) aus Ihrem Mollie-Konto ein, um sofort echte Zahlungen zu empfangen. Für Testläufe kann ein <code>test_...</code> Key verwendet werden.
            </p>
          </div>

          <div>
            <label className="block text-xs font-craft-mono font-bold text-[#181F1C] uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Resend API Key</span>
              <span className="text-[10px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded font-mono font-normal">
                noreply@scholz-friese-webdesign.de
              </span>
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={resendKey}
                onChange={(e) => setResendKey(e.target.value)}
                placeholder="re_..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D4C8B8] text-xs font-mono text-[#181F1C] bg-[#FAF8F5] focus:outline-none focus:border-[#B85D2C]"
              />
            </div>
            <p className="text-[11px] text-[#55695E] mt-1">
              Versendet Rechnungs-PDFs an Kunden und Kopien an Admin. Antwort-Adresse: <code>info@pure-whisky.com</code>.
            </p>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#B85D2C] hover:bg-[#A04E24] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Einstellungen speichern</span>
            </button>

            {savedSuccess && (
              <span className="text-xs text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg flex items-center space-x-1 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>Gespeichert!</span>
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Two-step Legal Process Information */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-[#E2DDD5] pb-4">
          <ShieldCheck className="w-5 h-5 text-[#2D6A4F]" />
          <h3 className="font-woodblock text-xl sm:text-2xl text-[#181F1C] uppercase tracking-wide">
            Rechtswirksamer Kaufvertrags-Ablauf
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#3A4A40] leading-relaxed">
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E2DDD5] space-y-2">
            <div className="font-bold text-[#181F1C] flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px]">1</span>
              <span>Schritt 1: Bestelleingang im Shop</span>
            </div>
            <p>
              Gibt ein Kunde eine Bestellung auf, stellt dies ein rechtliches Kaufangebot dar. Das System versendet automatisch eine Bestelleingangsbestätigung an den Kunden und benachrichtigt Sie an <code>{adminEmail}</code>. Der Kaufvertrag ist zu diesem Zeitpunkt noch nicht geschlossen.
            </p>
          </div>

          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E2DDD5] space-y-2">
            <div className="font-bold text-[#181F1C] flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center text-[10px]">2</span>
              <span>Schritt 2: Kaufvertrag & Rechnungsversand</span>
            </div>
            <p>
              Prüfen Sie im Dashboard unter „Bestellungen & Rechnungen“ die Bestellung. Mit Klick auf <em>„Rechnung versenden“</em> wird die offizielle Rechnung an den Kunden generiert und versendet. Erst dadurch kommt der Kaufvertrag rechtswirksam zustande. Ein Lieferschein ist nicht erforderlich.
            </p>
          </div>
        </div>
      </div>

      {/* Company & Bank Stammdaten (Template Reference) */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-[#E2DDD5] pb-4">
          <Building className="w-5 h-5 text-[#55695E]" />
          <h3 className="font-woodblock text-xl sm:text-2xl text-[#181F1C] uppercase tracking-wide">
            Hinterlegte Stammdaten für Rechnungs-PDF
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#3A4A40]">
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E2DDD5] space-y-1">
            <span className="font-bold text-[#181F1C] block mb-1">Unternehmensanschrift (Rechnungsaussteller)</span>
            <div>PURE.WHISKY.</div>
            <div>Inhaberin: Ines Zager</div>
            <div>Dürerring 1</div>
            <div>31582 Nienburg</div>
            <div>Deutschland</div>
            <div>E-Mail: info@pure-whisky.com</div>
          </div>

          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E2DDD5] space-y-1">
            <span className="font-bold text-[#181F1C] block mb-1">Bankverbindung (Zahlungsempfänger)</span>
            <div>Kontoinhaber: Ines Zager</div>
            <div className="font-mono text-[11px]">IBAN: DE18 2707 0369 0056 5085 00</div>
            <div>Standard-Zahlungsfrist: 14 Tage netto</div>
            <div>Versandpartner: DHL GoGreen (6,90 € pauschal)</div>
          </div>
        </div>
      </div>

    </div>
  );
}
