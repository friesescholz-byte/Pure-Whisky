import React from 'react';
import { X } from 'lucide-react';

export default function LegalModal({ type, onClose }) {
  if (!type) return null;

  const contentMap = {
    impressum: {
      title: 'Impressum',
      text: `Angaben gemäß § 5 TMG:

PURE.WHISKY.
Inhaberin: Ines Zager
Dürerring 1
31582 Nienburg
Deutschland

Kontakt:
Telefon: +49 163 8738824
E-Mail: info@pure-whisky.com
Website: pure-whisky.com

Umsatzsteuer-Identifikationsnummer:
Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
DE366683133

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV / § 18 Abs. 2 MStV:
Ines Zager
Dürerring 1
31582 Nienburg

EU-Streitschlichtung:
Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter https://ec.europa.eu/consumers/odr/ finden.
Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.

Jugendschutz:
Gemäß § 9 Jugendschutzgesetz geben wir keinen Alkohol an Kinder und Jugendliche unter 18 Jahren ab. Im Bestellprozess wird das Alter abgefragt. Die Zustellung erfolgt durch DHL GoGreen mit Alterssichtprüfung (18+).`
    },
    datenschutz: {
      title: 'Datenschutzerklärung',
      text: `1. Datenschutz auf einen Blick
Verantwortliche Stelle für die Datenverarbeitung auf dieser Website:
Ines Zager · PURE.WHISKY.
Dürerring 1, 31582 Nienburg
E-Mail: info@pure-whisky.com

2. Erfassung von Daten beim Besuch dieser Website
Beim Aufruf unserer Website werden durch den Webserver automatisch technische Server-Logfiles verarbeitet (Browsertyp, Betriebssystem, Referrer-URL, Uhrzeit, IP-Adresse). Dies dient der Wahrung unserer berechtigten Interessen an einer fehlerfreien Bereitstellung unseres Online-Angebots gemäß Art. 6 Abs. 1 lit. f DSGVO.

3. Vertragsabwicklung & Kundenkonto
Wir erheben und verarbeiten personenbezogene Daten (Name, Adresse, E-Mail-Adresse, Zahlungsdaten), wenn Sie eine Bestellung aufgeben oder ein Kundenkonto eröffnen (Art. 6 Abs. 1 lit. b DSGVO). Zur Vertragserfüllung geben wir Ihre Daten an das beauftragte Versandunternehmen (DHL GoGreen) sowie an den jeweiligen Zahlungsdienstleister (z.B. PayPal, Stripe, Klarna) weiter.

4. Altersverifikation (18+)
Aufgrund der Bestimmungen des Jugendschutzgesetzes (§ 9 JuSchG) verarbeiten wir Ihr Geburtsdatum bzw. Ihre Bestätigung der Volljährigkeit, um sicherzustellen, dass alkoholische Erzeugnisse ausschließlich an volljährige Personen abgegeben werden.

5. Ihre Rechte
Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten gemäß DSGVO.`
    },
    agb: {
      title: 'Allgemeine Geschäftsbedingungen (AGB)',
      text: `§ 1 Geltungsbereich
Für alle Bestellungen über unseren Online-Shop durch Verbraucher und Unternehmer gelten die nachfolgenden Allgemeinen Geschäftsbedingungen (AGB).

§ 2 Jugendschutz & Altersprüfung (§ 9 JuSchG)
(1) Der Verkauf von Spirituosen erfolgt ausschließlich an Personen ab dem vollendeten 18. Lebensjahr.
(2) Mit dem Absenden der Bestellung versichert der Kunde, dass er das 18. Lebensjahr vollendet hat und dass seine Angaben zu Name, Alter und Adresse zutreffend sind.
(3) Bei der Zustellung durch DHL erfolgt eine Alters- und Sichtprüfung. Die Ware wird nur an Personen übergeben, die ihre Volljährigkeit durch ein amtliches Ausweisdokument nachweisen können.

§ 3 Vertragsschluss & Bestellablauf
(1) Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung dar.
(2) Durch Anklicken des Bestellbuttons im Checkout gibt der Kunde eine verbindliche Bestellung der im Warenkorb enthaltenen Waren ab. Der Vertrag kommt mit unserer Auftragsbestätigung per E-Mail zustande.

§ 4 Preise, Versandkosten & Lieferung
(1) Alle angegebenen Preise verstehen sich in Euro inklusive der gesetzlichen Mehrwertsteuer.
(2) Der Versand erfolgt versichert und klimaneutral mit DHL GoGreen innerhalb Deutschlands für pauschal 6,90 €. Ab einem Bestellwert von 150,00 € liefern wir versandkostenfrei.
(3) Die Lieferzeit beträgt in der Regel 2 bis 4 Werktage nach Zahlungseingang.

§ 5 Zahlungsarten
Ihnen stehen folgende Zahlungsarten zur Verfügung: PayPal, Kreditkarte (Visa, Mastercard, American Express), Apple Pay, Google Pay, Klarna Sofortüberweisung und Vorkasse.`
    },
    widerruf: {
      title: 'Widerrufsbelehrung',
      text: `Widerrufsrecht
Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.

Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:
PURE.WHISKY. · Ines Zager
Dürerring 1, 31582 Nienburg
E-Mail: info@pure-whisky.com
Telefon: +49 163 8738824

mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.

Ausschluss des Widerrufsrechts:
Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von versiegelten Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe geeignet sind, wenn ihre Versiegelung (Korken / Biopolymer-Kapsel) nach der Lieferung entfernt oder beschädigt wurde.`
    },
    versand: {
      title: 'Versand- & Zahlungsbedingungen',
      text: `Klimaneutraler Versand mit DHL GoGreen:
Wir versenden alle Bestellungen bruchsicher und klimaneutral mit DHL GoGreen inklusive 18+ Alterssichtprüfung bei Zustellung.

Versandkosten:
• Innerhalb Deutschlands: 6,90 € pauschal
• Ab 150,00 € Bestellwert: Kostenfreier Versand
• Lieferzeit: 2–4 Werktage

Zahlungsarten:
• PayPal
• Kreditkarte (Visa, Mastercard, American Express)
• Apple Pay / Google Pay
• Klarna Sofortüberweisung
• Banküberweisung / Vorkasse`
    },
    barrierefreiheit: {
      title: 'Erklärung zur Barrierefreiheit',
      text: `Erklärung zur Barrierefreiheit

PURE.WHISKY. (Ines Zager) ist bestrebt, ihren Webauftritt im Einklang mit den Bestimmungen des Barrierefreiheitsstärkungsgesetzes (BFSG) sowie den internationalen Web Content Accessibility Guidelines (WCAG 2.1, Konformitätsstufe AA) barrierefrei zugänglich zu machen.

Stand der Vereinbarkeit:
Dieser Webauftritt ist mit den Richtlinien der WCAG 2.1 AA weitestgehend vereinbar.

Umgesetzte Barrierefreiheits-Standards:
• Hohe Kontrastwerte bei Typografie und interaktiven Steuerelementen (mindestens 4,5:1)
• Skalierbare Schriftgrößen ohne Verlust von Inhalt oder Funktionalität
• Vollständige Tastaturnavigation für alle Links, Buttons und Shop-Elemente
• Semantisch strukturierter HTML5-Code für Screenreader-Software
• Aussagekräftige Alternativtexte für alle Produkt- und Reportagebilder
• Verzicht auf unruhige, automatisierte Blitz- oder Flackereffekte

Feedback und Kontakt:
Sollten Sie auf Barrieren auf unserer Website stoßen oder Hinweise zur Verbesserung der Zugänglichkeit haben, freuen wir uns über Ihre Rückmeldung:

Ines Zager · PURE.WHISKY.
Dürerring 1, 31582 Nienburg
E-Mail: info@pure-whisky.com
Telefon: +49 163 8738824

Stand dieser Erklärung: September 2026`
    }
  };

  const item = contentMap[type] || { title: 'Rechtliches', text: '' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#D4C8B8] rounded-3xl overflow-hidden shadow-2xl text-left my-8 max-h-[85vh] flex flex-col">
        
        <div className="p-6 sm:p-7 border-b border-[#E2DDD5] flex items-center justify-between bg-[#FAF8F5]">
          <h3 className="font-woodblock text-3xl text-[#181F1C] uppercase tracking-wide">
            {item.title}
          </h3>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-white border border-[#D4C8B8] text-[#55695E] hover:text-[#181F1C] hover:bg-[#FAF8F5] transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto text-sm text-[#3A4A40] font-normal leading-relaxed whitespace-pre-line flex-1">
          {item.text}
        </div>

        <div className="p-5 border-t border-[#E2DDD5] bg-[#FAF8F5] flex justify-end">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 rounded-lg bg-[#181F1C] hover:bg-[#2C3831] text-white font-woodblock text-base tracking-wider uppercase transition-colors"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
}
