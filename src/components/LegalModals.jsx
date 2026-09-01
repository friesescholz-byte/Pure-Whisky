import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function LegalModals({ activeModal, onClose }) {
  if (!activeModal) return null;

  const content = {
    impressum: {
      title: 'Impressum',
      text: (
        <div className="space-y-4 text-xs sm:text-sm text-[#D8D2C2] leading-relaxed">
          <p><strong>Angaben gemäß § 5 TMG:</strong></p>
          <p>
            PURE.WHISKY.<br />
            Inhaberin: Ines Zager<br />
            Dürerring 1<br />
            31582 Nienburg / Weser<br />
            Deutschland
          </p>
          <p>
            <strong>Kontakt:</strong><br />
            Telefon: +49 163 8738824<br />
            E-Mail: info@pure-whisky.com
          </p>
          <p>
            <strong>Umsatzsteuer-Identifikationsnummer:</strong><br />
            DE366683133
          </p>
          <p>
            <strong>EU-Streitschlichtung:</strong><br />
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/
          </p>
        </div>
      )
    },
    datenschutz: {
      title: 'Datenschutzerklärung',
      text: (
        <div className="space-y-4 text-xs sm:text-sm text-[#D8D2C2] leading-relaxed">
          <p><strong>1. Datenschutz auf einen Blick</strong></p>
          <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO).</p>
          <p><strong>2. Datenerfassung auf dieser Website</strong></p>
          <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. im Bestellprozess oder bei der VIP Club Registrierung).</p>
        </div>
      )
    },
    versand: {
      title: 'Versand & Zahlung',
      text: (
        <div className="space-y-4 text-xs sm:text-sm text-[#D8D2C2] leading-relaxed">
          <p><strong>Versandinformationen:</strong></p>
          <p>• Verkauf und Versand nur an Personen ab 18 Jahren (Altersprüfung bei Zustellung).</p>
          <p>• Deutschlandweiter Versand: 6,90 € (Kostenfrei ab 150 € Bestellwert).</p>
          <p>• Zustellung: 2 – 4 Werktage mit versichertem DHL GoGreen Versand.</p>
          <p><strong>Zahlungsarten:</strong></p>
          <p>PayPal, Apple Pay, Google Pay, Kreditkarte (Visa, Mastercard, Amex), Klarna Sofortüberweisung.</p>
        </div>
      )
    }
  };

  const active = content[activeModal] || content.impressum;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md" />
      <div className="relative w-full max-w-2xl bg-[#121722] border border-[#262F42] rounded-3xl p-6 sm:p-10 z-10 text-left max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0B0E14] text-[#A0AEC0] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="font-serif text-2xl font-bold text-[#F6F4EE] mb-6">
          {active.title}
        </h2>
        {active.text}
      </div>
    </div>
  );
}
