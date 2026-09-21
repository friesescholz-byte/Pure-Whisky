import React, { useState } from 'react';
import { X, ShieldCheck, Copy, Check, FileText, AlertTriangle, Truck, Lock, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LegalModal({ type, onClose }) {
  const { lang } = useLanguage();
  const [copiedForm, setCopiedForm] = useState(false);

  if (!type) return null;

  const handleCopyForm = () => {
    const formText = `Muster-Widerrufsformular
(Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es zurück.)

An:
PURE.WHISKY.
Inhaberin: Ines Zager
Dürerring 1
31582 Nienburg
Deutschland
E-Mail: info@pure-whisky.com

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*):
Bestellt am:
Erhalten am:
Name des/der Verbraucher(s):
Anschrift des/der Verbraucher(s):
Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):
Datum:

(*) Unzutreffendes streichen.`;

    navigator.clipboard.writeText(formText);
    setCopiedForm(true);
    setTimeout(() => setCopiedForm(false), 2500);
  };

  const titleMap = {
    impressum: 'Impressum',
    agb: 'Allgemeine Geschäftsbedingungen',
    widerruf: 'Widerrufsbelehrung',
    versand: 'Versand & Zahlung',
    datenschutz: 'Datenschutzerklärung',
    barrierefreiheit: 'Erklärung zur Barrierefreiheit'
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white border border-[#D4C8B8] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl text-left my-6 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        {/* Clean Minimal Header */}
        <div className="p-5 sm:p-7 border-b border-[#E2DDD5] bg-[#FAF8F5] flex items-center justify-between">
          <h3 id="legal-modal-title" className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] uppercase tracking-wide">
            {titleMap[type] || 'Rechtliches'}
          </h3>
          <button 
            onClick={onClose} 
            className="group p-2.5 rounded-full bg-white border border-[#D4C8B8] text-[#55695E] hover:text-white hover:bg-[#181F1C] hover:border-[#181F1C] hover:rotate-90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xs cursor-pointer"
            aria-label="Schließen"
          >
            <X className="w-5 h-5 transition-transform duration-300" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto text-sm text-[#3A4A40] leading-relaxed flex-1 space-y-6">
          
          {/* TAB 1: IMPRESSUM */}
          {type === 'impressum' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
                </h4>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] space-y-1.5 font-normal">
                  <p className="font-bold text-[#181F1C]">PURE.WHISKY.</p>
                  <p>Inhaberin: Ines Zager (Einzelunternehmen)</p>
                  <p>Dürerring 1</p>
                  <p>31582 Nienburg</p>
                  <p>Deutschland</p>
                </div>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Kontakt
                </h4>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] space-y-1.5 font-craft-mono text-xs sm:text-sm">
                  <p><span className="text-[#55695E]">Telefon:</span> <a href="tel:+491638738824" className="text-[#181F1C] hover:text-[#B85D2C] font-bold">+49 163 8738824</a></p>
                  <p><span className="text-[#55695E]">E-Mail:</span> <a href="mailto:info@pure-whisky.com" className="text-[#B85D2C] hover:underline font-bold">info@pure-whisky.com</a></p>
                  <p><span className="text-[#55695E]">Website:</span> <a href="https://pure-whisky.com" target="_blank" rel="noopener noreferrer" className="text-[#181F1C] hover:underline">pure-whisky.com</a></p>
                </div>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Umsatzsteuer-Identifikationsnummer
                </h4>
                <p className="text-sm">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz (UStG):<br />
                  <strong className="font-craft-mono text-base text-[#181F1C]">DE366683133</strong>
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Verantwortlich für den Inhalt nach § 18 Abs. 2 Medienstaatsvertrag (MStV)
                </h4>
                <p>
                  Ines Zager<br />
                  Dürerring 1<br />
                  31582 Nienburg
                </p>
              </div>

              {/* Jugendschutz Box */}
              <div className="p-4.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start space-x-3 text-amber-950">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm">
                  <strong className="font-semibold block text-amber-900">Jugendschutzhinweis (§ 9 Jugendschutzgesetz):</strong>
                  <p>
                    Wir verkaufen und liefern alkoholische Getränke ausschließlich an Personen ab dem vollendeten 18. Lebensjahr. Der Versand erfolgt ausschließlich über DHL GoGreen mit verbindlicher <strong>Alterssichtprüfung (18+)</strong> bei der Zustellung.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  EU-Streitschlichtung & Verbraucherstreitbeilegung
                </h4>
                <p className="mb-2">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter{' '}
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#B85D2C] underline hover:text-[#A04E24]">
                    https://ec.europa.eu/consumers/odr/
                  </a>{' '}
                  finden. Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
                <p className="text-xs text-[#55695E]">
                  Hinweis gemäß § 36 Verbraucherstreitbeilegungsgesetz (VSBG): Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: AGB */}
          {type === 'agb' && (
            <div className="space-y-6">

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">§ 1 Geltungsbereich</h4>
                <p>
                  (1) Für alle Lieferungen und Bestellungen über unseren Online-Shop gelten die nachfolgenden Allgemeinen Geschäftsbedingungen (AGB) in ihrer zum Zeitpunkt der Bestellung gültigen Fassung.
                </p>
                <p className="mt-2">
                  (2) Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbstständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 BGB). Unternehmer ist jede natürliche oder juristische Person oder eine rechtsfähige Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbstständigen beruflichen Tätigkeit handelt (§ 14 BGB).
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">§ 2 Vertragspartner</h4>
                <p>
                  Der Kaufvertrag kommt zustande mit:<br />
                  <strong>PURE.WHISKY. · Inhaberin Ines Zager (Einzelunternehmen)</strong><br />
                  Dürerring 1, 31582 Nienburg, Deutschland<br />
                  Telefon: +49 163 8738824 · E-Mail: info@pure-whisky.com<br />
                  Umsatzsteuer-Identifikationsnummer: DE366683133
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">§ 3 Jugendschutz & Altersprüfung (§ 9 JuSchG)</h4>
                <p>
                  (1) Der Verkauf von Spirituosen (Single Cask Scotch Whisky) erfolgt ausschließlich an Personen, die das 18. Lebensjahr vollendet haben.
                </p>
                <p className="mt-2">
                  (2) Der Kunde bestätigt im Rahmen des Bestellprozesses ausdrücklich durch Aktivierung der Altersbestätigung, dass er mindestens 18 Jahre alt ist. Der Kunde verpflichtet sich, dafür Sorge zu tragen, dass nur er selbst oder eine von ihm bevollmächtigte volljährige Person die Ware in Empfang nimmt.
                </p>
                <p className="mt-2">
                  (3) Der Versand erfolgt ausnahmslos mit DHL Paket inklusive persönlicher <strong>Alterssichtprüfung (18+)</strong>. Der Zusteller händigt die Ware nur an Personen aus, die sich durch einen amtlichen Lichtbildausweis als volljährig legitimieren können.
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">§ 4 Vertragsschluss & Bestellablauf (§ 312j BGB)</h4>
                <p>
                  (1) Die Präsentation der Produkte im Online-Shop stellt kein bindendes Angebot dar, sondern eine Aufforderung zur Abgabe einer Bestellung (invitatio ad offerendum).
                </p>
                <p className="mt-2">
                  (2) Durch das Anklicken des Buttons „Zahlungspflichtig bestellen“ gibt der Kunde ein verbindliches Kaufangebot für die im Warenkorb enthaltenen Artikel ab.
                </p>
                <p className="mt-2">
                  (3) Unmittelbar nach Absenden der Bestellung erhält der Kunde eine automatische Bestätigung über den Eingang seiner Bestellung per E-Mail. Diese Eingangsbestätigung stellt noch keine Annahme des Kaufangebots dar. Der Kaufvertrag kommt erst durch eine ausdrückliche Auftragsbestätigung bzw. Rechnungsübersendung per E-Mail innerhalb von 3 Werktagen oder durch Auslieferung der Ware zustande.
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">§ 5 Preise & Versandkosten</h4>
                <p>
                  (1) Alle im Online-Shop genannten Preise sind Endpreise in Euro (€) und enthalten die jeweils geltende gesetzliche Mehrwertsteuer (19%) sowie alle sonstigen Preisbestandteile.
                </p>
                <p className="mt-2">
                  (2) Zuzüglich zu den angegebenen Produktpreisen fallen Versandkosten an. Diese betragen für den versicherten und klimaneutralen Versand mit DHL GoGreen innerhalb Deutschlands pauschal <strong>6,90 €</strong> pro Bestellung (inkl. bruchsicherer Kartonage und 18+ Alterssichtprüfung).
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">§ 6 Zahlungsarten & Zahlungsdienstleister</h4>
                <p>
                  Im Online-Shop stehen Ihnen folgende sichere Zahlungsmöglichkeiten zur Verfügung:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>
                    <strong>Mollie Gateway (Mollie B.V., Keizersgracht 126, 1015 CW Amsterdam, Niederlande):</strong> Über das sichere Zahlungsgateway von Mollie können Sie per Kreditkarte (Visa, Mastercard, American Express), Apple Pay, Klarna (Sofortüberweisung/Rechnung), Bancontact, EPS oder iDEAL bezahlen. Die Belastung erfolgt unmittelbar mit Vertragsschluss bzw. Bestellausführung.
                  </li>
                  <li>
                    <strong>PayPal (PayPal Europe S.à r.l. et Cie, S.C.A.):</strong> Sie bezahlen direkt über Ihr PayPal-Konto über das gesicherte PayPal-Portal.
                  </li>
                  <li>
                    <strong>Vorkasse / Banküberweisung:</strong> Wir übermitteln Ihnen unsere Bankverbindung mit der Auftragsbestätigung bzw. Rechnung. Der Rechnungsbetrag ist binnen 7 Tagen auf unser Geschäftskonto zu überweisen. Der Versand erfolgt nach vollständigem Zahlungseingang.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">§ 7 Lieferbedingungen & Lieferzeit</h4>
                <p>
                  (1) Die Lieferung erfolgt ausschließlich innerhalb der Bundesrepublik Deutschland an die angegebene Lieferadresse. Die Lieferung an DHL-Packstationen und Postfilialen ist unter Beachtung der Alterssichtprüfung möglich.
                </p>
                <p className="mt-2">
                  (2) Die Lieferzeit beträgt 2 bis 4 Werktage nach vollständigem Zahlungseingang, es sei denn, auf der Produktseite ist ein anderes Veröffentlichungs- oder Release-Datum vermerkt.
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">§ 8 Eigentumsvorbehalt</h4>
                <p>
                  Bis zur vollständigen Begleichung aller offenen Forderungen verbleibt die gelieferte Ware im Eigentum von PURE.WHISKY. Ines Zager.
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">§ 9 Gewährleistung & Mängelhaftung</h4>
                <p>
                  Es gelten die gesetzlichen Bestimmungen zur Mängelhaftung gemäß §§ 434 ff. BGB.
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">§ 10 Anwendbares Recht & Gerichtsstand</h4>
                <p>
                  Für sämtliche Rechtsbeziehungen der Parteien gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Wenn der Kunde Kaufmann im Sinne des Handelsgesetzbuches ist, ist Nienburg/Weser ausschließlicher Gerichtsstand.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: WIDERRUFSBELEHRUNG */}
          {type === 'widerruf' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Widerrufsbelehrung für Verbraucher
                </h4>
                <p className="text-xs text-[#55695E] mb-3">
                  (Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbstständigen beruflichen Tätigkeit zugerechnet werden können.)
                </p>
                <p>
                  <strong>Widerrufsrecht:</strong><br />
                  Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
                </p>
                <p className="mt-2">
                  Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat (bei Teillieferungen ab dem Tag der Inbesitznahme der letzten Ware).
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Ausübung des Widerrufsrechts
                </h4>
                <p>
                  Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:
                </p>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] my-2 font-normal">
                  <p className="font-bold text-[#181F1C]">PURE.WHISKY. · Inhaberin Ines Zager</p>
                  <p>Dürerring 1, 31582 Nienburg, Deutschland</p>
                  <p>Telefon: +49 163 8738824</p>
                  <p>E-Mail: info@pure-whisky.com</p>
                </div>
                <p>
                  mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das unten bereitgestellte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
                </p>
                <p className="mt-2 text-xs text-[#55695E]">
                  Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
                </p>
              </div>

              {/* WESENTLICHE AUSNAHME FLASCHEN-VERSIEGELUNG */}
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-amber-950 space-y-2">
                <div className="flex items-center space-x-2 text-amber-900 font-bold">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>Besonderer Hinweis zum Ausschluss des Widerrufsrechts (§ 312g Abs. 2 Nr. 3 BGB):</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  Das Widerrufsrecht besteht <strong>nicht bzw. erlischt vorzeitig</strong> bei Verträgen zur Lieferung versiegelter Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe geeignet sind, wenn ihre Versiegelung nach der Lieferung entfernt oder beschädigt wurde.
                </p>
                <p className="text-xs sm:text-sm font-medium">
                  → Bei unseren Single Cask Abfüllungen handelt es sich um empfindliche Spirituosen mit nummerierten Siegelkapseln und Korkverschluss. Sobald die Schutzkapsel, das Siegelband oder der Korkverschluss geöffnet, eingerissen oder beschädigt wurde, ist das gesetzliche Widerrufsrecht ausgeschlossen.
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Folgen des Widerrufs
                </h4>
                <p>
                  Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
                </p>
                <p className="mt-2">
                  Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet. Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.
                </p>
                <p className="mt-2">
                  Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden.
                </p>
                <p className="mt-2 font-bold text-[#181F1C]">
                  Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.
                </p>
                <p className="mt-2 text-xs text-[#55695E]">
                  Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.
                </p>
              </div>

              {/* Muster Widerrufsformular Box */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#D4C8B8] space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-woodblock text-base text-[#181F1C] uppercase tracking-wide">
                    Muster-Widerrufsformular
                  </h5>
                  <button
                    onClick={handleCopyForm}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#181F1C] hover:bg-[#181F1C] hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedForm ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Kopiert!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Formular kopieren</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-[#55695E]">
                  (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)
                </p>
                <div className="font-mono text-xs bg-white p-4 rounded-xl border border-[#E2DDD5] leading-relaxed text-[#3A4A40] space-y-2 select-all">
                  <p>An:</p>
                  <p>PURE.WHISKY. · Ines Zager<br />Dürerring 1, 31582 Nienburg, Deutschland<br />E-Mail: info@pure-whisky.com</p>
                  <p className="pt-2">Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*):</p>
                  <p>Bestellt am (*) / erhalten am (*): __________________________</p>
                  <p>Name des/der Verbraucher(s): __________________________</p>
                  <p>Anschrift des/der Verbraucher(s): __________________________</p>
                  <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): __________________________</p>
                  <p>Datum: __________________________</p>
                  <p className="text-[10px] text-[#55695E]">(*) Unzutreffendes streichen.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VERSAND & ZAHLUNG */}
          {type === 'versand' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Klimaneutraler & Bruchsicherer Versand
                </h4>
                <p>
                  Wir versenden alle Bestellungen mit unserem Logistikpartner <strong>DHL Paket (DHL GoGreen)</strong> in zertifizierten, stoßdämpfenden Spezial-Flaschenkartons, die optimalen Schutz für die edlen Single Cask Flaschen bieten.
                </p>
              </div>

              {/* Jugendschutz Box */}
              <div className="p-4.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start space-x-3 text-amber-950">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm">
                  <strong className="font-semibold block text-amber-900">Altersprüfung bei Zustellung (18+):</strong>
                  <p>
                    Aufgrund der gesetzlichen Vorgaben des Jugendschutzgesetzes (§ 9 JuSchG) versenden wir Spirituosen ausschließlich mit <strong>DHL Alterssichtprüfung ab 18 Jahren</strong>. Die Zustellung erfolgt nur persönlich gegen Vorlage eines gültigen Lichtbildausweises. Eine Übergabe an Minderjährige oder eine Abstellung ohne Sichtprüfung ist ausgeschlossen.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Versandkosten & Lieferzeiten
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5]">
                    <div className="flex items-center space-x-2 text-[#B85D2C] font-bold text-xs uppercase font-craft-mono mb-1">
                      <Truck className="w-4 h-4" />
                      <span>Deutschland</span>
                    </div>
                    <p className="font-woodblock text-2xl text-[#181F1C] mb-1">6,90 €</p>
                    <p className="text-xs text-[#55695E]">
                      Pauschal pro Bestellung inkl. MwSt., Spezialverpackung und DHL GoGreen 18+ Alterssichtprüfung.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5]">
                    <div className="flex items-center space-x-2 text-[#2D6A4F] font-bold text-xs uppercase font-craft-mono mb-1">
                      <Truck className="w-4 h-4" />
                      <span>Lieferzeit</span>
                    </div>
                    <p className="font-woodblock text-2xl text-[#181F1C] mb-1">2 – 4 Werktage</p>
                    <p className="text-xs text-[#55695E]">
                      Nach Zahlungseingang. Sie erhalten einen automatischen DHL-Sendungsverfolgungslink per E-Mail.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#55695E] mt-3">
                  • <strong>Packstationen & Filialen:</strong> Eine Lieferung an DHL-Packstationen oder Filialen ist möglich, sofern die Sendung dort unter Vorlage eines Personalausweises bzw. Reisepasses zur Altersverifikation abgeholt werden kann.
                </p>

                <div className="mt-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#D4C8B8] text-xs space-y-1">
                  <div className="font-bold text-[#181F1C] flex items-center space-x-2">
                    <span className="text-sm">🇩🇪</span>
                    <span>Liefergebiet: Ausschließlich Deutschland</span>
                  </div>
                  <p className="text-[#55695E] leading-relaxed">
                    Aus zoll- und verbrauchsteuerrechtlichen Gründen für hochprozentige Spirituosen (Alkoholsteuergesetz) beliefern wir derzeit <strong>ausschließlich Lieferadressen innerhalb der Bundesrepublik Deutschland</strong>. Ein Versand ins Ausland (einschließlich EU-Ausland, Schweiz und Vereinigtes Königreich) ist ausgeschlossen.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-3">
                  Zahlungsoptionen
                </h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white border border-[#E2DDD5] space-y-1">
                    <p className="font-bold text-[#181F1C] flex items-center justify-between">
                      <span>Mollie Gateway</span>
                      <span className="text-[10px] font-craft-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Sicher & Verschlüsselt</span>
                    </p>
                    <p className="text-xs text-[#55695E]">
                      Zahlen Sie bequem und sicher per <strong>Kreditkarte</strong> (Visa, Mastercard, American Express), <strong>Apple Pay</strong> oder <strong>Klarna Sofortüberweisung</strong>. Die Übertragung erfolgt über das PCI-DSS-zertifizierte Gateway unseres europäischen Zahlungspartners Mollie B.V.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E2DDD5] space-y-1">
                    <p className="font-bold text-[#181F1C]">PayPal</p>
                    <p className="text-xs text-[#55695E]">
                      Zahlung über Ihr verknüpftes PayPal-Guthaben, Lastschrift oder hinterlegte Zahlungsmittel mit vollem Käuferschutz.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E2DDD5] space-y-1">
                    <p className="font-bold text-[#181F1C]">Vorkasse / Banküberweisung</p>
                    <p className="text-xs text-[#55695E]">
                      Klassische SEPA-Überweisung auf unser deutsches Geschäftskonto. Die Kontoverbindung erhalten Sie zusammen mit der Auftragsbestätigung und Rechnung per E-Mail. Der Versand erfolgt sofort nach Zahlungseingang.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DATENSCHUTZ */}
          {type === 'datenschutz' && (
            <div className="space-y-6">

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  1. Verantwortlicher für die Datenverarbeitung
                </h4>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] space-y-1 text-xs sm:text-sm">
                  <p className="font-bold text-[#181F1C]">PURE.WHISKY. · Inhaberin Ines Zager</p>
                  <p>Dürerring 1, 31582 Nienburg, Deutschland</p>
                  <p>Telefon: +49 163 8738824 · E-Mail: info@pure-whisky.com</p>
                </div>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  2. Hosting & Bereitstellung der Website (Cloudflare)
                </h4>
                <p>
                  Diese Website wird auf der Cloud-Infrastruktur von <strong>Cloudflare Pages</strong> bereitgestellt (Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA).
                </p>
                <p className="mt-2">
                  Beim Aufruf unserer Seiten verarbeitet Cloudflare technisch notwendige Zugriffsdaten (sogenannte Server-Logfiles: IP-Adresse, Datum und Uhrzeit des Abrufs, Browsertyp und Betriebssystem, übertragene Datenmenge und anfragender Provider). Dies dient der Wahrung unserer berechtigten Interessen an einer sicheren, schnellen und ausfallsicheren Bereitstellung unseres Onlineangebots gemäß Art. 6 Abs. 1 lit. f DSGVO.
                </p>
                <p className="mt-2 text-xs text-[#55695E]">
                  Cloudflare ist unter dem EU-U.S. Data Privacy Framework zertifiziert und bietet durch den Abschluss von EU-Standardvertragsklauseln eine Garantie für die Einhaltung europäischen Datenschutzrechts.
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  3. Lokaler Speicher (LocalStorage) & Keine Tracking-Cookies
                </h4>
                <p>
                  Unsere Website verzichtet bewusst auf Tracking- und Marketing-Cookies von Drittanbietern.
                </p>
                <p className="mt-2">
                  Zur Bereitstellung grundlegender Shop-Funktionen nutzen wir den lokalen Browserspeicher (LocalStorage) Ihres Endgeräts:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm mt-1">
                  <li><strong>Warenkorbinhalt (`pure_whisky_cart`):</strong> Speichert Ihre ausgewählten Flaschen während des Besuchs.</li>
                  <li><strong>Spracheinstellung (`pure_whisky_lang`):</strong> Merkt sich Ihre Sprachwahl (DE / EN).</li>
                  <li><strong>Altersprüfung:</strong> Bestätigung der Volljährigkeit während des Checkout-Prozesses.</li>
                </ul>
                <p className="mt-2 text-xs text-[#55695E]">
                  Die Speicherung dieser Daten ist technisch zwingend erforderlich, um den von Ihnen ausdrücklich gewünschten Telemediendienst zur Verfügung zu stellen (§ 25 Abs. 2 Nr. 2 TDDDG).
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  4. Datenverarbeitung bei Bestellungen & Jugendschutz
                </h4>
                <p>
                  Wenn Sie in unserem Shop eine Bestellung aufgeben, verarbeiten wir Ihre personenbezogenen Daten (Vor- und Nachname, Liefer- und Rechnungsadresse, E-Mail-Adresse und Bestelldetails) zur Vertragsanbahnung und Vertragserfüllung gemäß Art. 6 Abs. 1 lit. b DSGVO.
                </p>
                <p className="mt-2">
                  Aufgrund der zwingenden Vorgaben des Jugendschutzgesetzes (§ 9 JuSchG) verarbeiten wir zudem Ihre Bestätigung der Volljährigkeit (Art. 6 Abs. 1 lit. c DSGVO), um sicherzustellen, dass alkoholische Erzeugnisse ausschließlich an Personen über 18 Jahren abgegeben werden.
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  5. Weitergabe an Versanddienstleister (DHL)
                </h4>
                <p>
                  Zur Auslieferung Ihrer Ware geben wir Name und Anschrift an die <strong>DHL Paket GmbH</strong> (Sträßchensweg 10, 53113 Bonn) weiter (Art. 6 Abs. 1 lit. b DSGVO). Sofern Sie zugestimmt haben, übermitteln wir Ihre E-Mail-Adresse zur Paketverfolgung und Lieferankündigung (Art. 6 Abs. 1 lit. a DSGVO).
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  6. Weitergabe an Zahlungsdienstleister (Mollie & PayPal)
                </h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white border border-[#E2DDD5]">
                    <p className="font-bold text-[#181F1C]">Mollie B.V. (Gateway)</p>
                    <p className="text-xs text-[#55695E] mt-1">
                      Für Kartenzahlungen (Visa, Mastercard, American Express), Apple Pay und Klarna nutzen wir die Zahlungsplattform von <strong>Mollie B.V.</strong>, Keizersgracht 126, 1015 CW Amsterdam, Niederlande. Zur Abwicklung übermitteln wir Transaktionsdaten (Betrag, Währung, Bestellnummer, Kundenname und E-Mail) an Mollie. Mollie verarbeitet diese Daten als lizenzierter europäischer Zahlungsdienstleister. Weitere Informationen unter:{' '}
                      <a href="https://www.mollie.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-[#B85D2C] underline">
                        https://www.mollie.com/de/privacy
                      </a>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E2DDD5]">
                    <p className="font-bold text-[#181F1C]">PayPal (Europe)</p>
                    <p className="text-xs text-[#55695E] mt-1">
                      Bei Wahl von PayPal werden die zur Zahlung erforderlichen Daten an <strong>PayPal (Europe) S.à r.l. et Cie, S.C.A.</strong>, 22-24 Boulevard Royal, L-2449 Luxembourg übermittelt. Details finden Sie in der PayPal Datenschutzerklärung:{' '}
                      <a href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full" target="_blank" rel="noopener noreferrer" className="text-[#B85D2C] underline">
                        https://www.paypal.com/de/webapps/mpp/ua/privacy-full
                      </a>.
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-[#55695E]">
                  Rechtsgrundlage der Weitergabe ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO (sichere und betrugsfreie Zahlungsabwicklung).
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  7. VIP-Fass-Club & Newsletter
                </h4>
                <p>
                  Wenn Sie sich für unseren VIP-Fass-Club oder den Newsletter eintragen, nutzen wir Ihre E-Mail-Adresse ausschließlich, um Sie über neue Single Cask Releases und Events zu informieren (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft per E-Mail an info@pure-whisky.com widerrufen.
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  8. Ihre Rechte als betroffene Person
                </h4>
                <p>
                  Sie haben nach der DSGVO folgende Rechte:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm mt-2">
                  <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Auskunft über Ihre verarbeiteten Daten.</li>
                  <li><strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Berichtigung unrichtiger Daten.</li>
                  <li><strong>Löschungsrecht (Art. 17 DSGVO):</strong> Löschung Ihrer Daten, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen.</li>
                  <li><strong>Einschränkung der Verarbeitung (Art. 18 DSGVO).</strong></li>
                  <li><strong>Datenübertragbarkeit (Art. 20 DSGVO).</strong></li>
                  <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Widerspruch gegen die Datenverarbeitung aus Gründen Ihrer besonderen Situation.</li>
                </ul>
                <p className="mt-3 text-xs text-[#55695E]">
                  <strong>Beschwerderecht bei der Aufsichtsbehörde:</strong> Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Zuständig ist u.a.: Die Landesbeauftragte für den Datenschutz Niedersachsen, Prinzenstraße 5, 30159 Hannover, <a href="https://lfd.niedersachsen.de" target="_blank" rel="noopener noreferrer" className="underline text-[#181F1C]">https://lfd.niedersachsen.de</a>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: BARRIEREFREIHEIT (BFSG) */}
          {type === 'barrierefreiheit' && (
            <div className="space-y-6">

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Unser Anspruch an Zugänglichkeit
                </h4>
                <p>
                  PURE.WHISKY. (Inhaberin Ines Zager) ist bestrebt, ihren Webauftritt unter <strong>https://pure-whisky.com</strong> sowie den integrierten Online-Shop für alle Menschen barrierefrei, verständlich und intuitiv bedienbar zu gestalten.
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Stand der Vereinbarkeit mit den Anforderungen
                </h4>
                <p>
                  Dieser Webauftritt ist mit den Richtlinien für barrierefreie Webinhalte (<strong>Web Content Accessibility Guidelines – WCAG 2.1 Konformitätsstufe AA</strong>) sowie der harmonisierten europäischen Norm <strong>EN 301 549</strong> weitestgehend vereinbar.
                </p>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Bereits umgesetzte Maßnahmen
                </h4>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-white border border-[#E2DDD5] flex items-start space-x-3">
                    <Eye className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#181F1C] block">Hohe Kontraste & Klare Typografie:</strong>
                      <span className="text-[#55695E]">Alle Texte, Buttons und interaktiven Elemente erfüllen die strengen WCAG-Kontrastanforderungen (min. 4,5:1 bei Fließtext, min. 3:1 bei Headlines) im standardmäßigen, eleganten Light-Mode.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#E2DDD5] flex items-start space-x-3">
                    <FileText className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#181F1C] block">Vollständige Tastaturnavigation:</strong>
                      <span className="text-[#55695E]">Alle Schaltflächen, Menüs, Warenkorbfunktionen und Dialogfenster sind ohne Maus über die Tab-Taste und Tastenkombinationen bedienbar und verfügen über sichtbare Fokusringe.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#E2DDD5] flex items-start space-x-3">
                    <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#181F1C] block">Semantisches HTML5 & Screenreader-Optimierung:</strong>
                      <span className="text-[#55695E]">Saubere Überschriftenstrukturen (h1–h6), ARIA-Rollen (`role="dialog"`, `aria-label`, `aria-expanded`) und beschreibende Alt-Texte für Flaschen- und Fassmotive.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#E2DDD5] flex items-start space-x-3">
                    <Lock className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#181F1C] block">Barrierefreie Formulare:</strong>
                      <span className="text-[#55695E]">Eindeutige Beschriftungen aller Eingabefelder im Checkout- und Newsletterbereich mit sofort verständlichen Fehlerhinweisen.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Feedback & Kontaktmöglichkeit
                </h4>
                <p>
                  Sollten Sie auf unserer Website auf Barrieren stoßen oder Anregungen zur weiteren Verbesserung der Zugänglichkeit haben, kontaktieren Sie uns gern direkt:
                </p>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] my-2 text-xs sm:text-sm font-normal">
                  <p className="font-bold text-[#181F1C]">PURE.WHISKY. · Ines Zager</p>
                  <p>Dürerring 1, 31582 Nienburg, Deutschland</p>
                  <p>E-Mail: <a href="mailto:info@pure-whisky.com" className="text-[#B85D2C] underline">info@pure-whisky.com</a></p>
                  <p>Telefon: <a href="tel:+491638738824" className="text-[#181F1C]">+49 163 8738824</a></p>
                </div>
              </div>

              <div>
                <h4 className="font-woodblock text-lg text-[#181F1C] uppercase tracking-wide mb-2">
                  Durchsetzungsverfahren / Schlichtungsstelle
                </h4>
                <p className="text-xs text-[#55695E]">
                  Bei nicht zufriedenstellenden Antworten aus der Kontaktaufnahme können Sie sich an die Schlichtungsstelle nach dem Behindertengleichstellungsgesetz (BGG) wenden:{' '}
                  <a href="https://www.schlichtungsstelle-bgg.de" target="_blank" rel="noopener noreferrer" className="text-[#B85D2C] underline">
                    www.schlichtungsstelle-bgg.de
                  </a>.
                </p>
                <p className="text-xs text-[#55695E] mt-2">
                  Stand dieser Erklärung: September 2026.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E2DDD5] bg-[#FAF8F5] flex items-center justify-between">
          <div className="text-xs text-[#55695E] hidden sm:block">
            © {new Date().getFullYear()} PURE.WHISKY. · Ines Zager
          </div>
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 rounded-lg bg-[#181F1C] hover:bg-[#2C3831] text-white font-woodblock text-sm sm:text-base tracking-wider uppercase transition-colors cursor-pointer ml-auto"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
}
