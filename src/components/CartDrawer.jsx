import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CheckCircle2, ChevronLeft, CreditCard, Send, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { createMolliePayment, savePendingCheckout } from '../services/orderService';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCompleteOrder,
  onOpenLegal 
}) {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mollieCheckoutUrl, setMollieCheckoutUrl] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    zip: '',
    city: '',
    country: 'Deutschland',
    email: '',
    paymentMethod: 'Sichere Online-Zahlung'
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const requiresShipping = cartItems.some(item => !item.product.freeShipping && item.product.hasShipping !== false);
  const shipping = requiresShipping ? 6.90 : 0.00;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStartCheckout = () => {
    if (!ageConfirmed) return;
    setStep('checkout');
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setPaymentError(null);

    if (!formData.email || !formData.firstName || !formData.lastName || !formData.street || !formData.zip || !formData.city) {
      alert(lang === 'de' ? 'Bitte füllen Sie alle Adressfelder aus.' : 'Please fill in all address fields.');
      return;
    }

    const cleanZip = formData.zip.trim();
    if (!/^[0-9]{5}$/.test(cleanZip)) {
      alert(lang === 'de' 
        ? 'Bitte geben Sie eine gültige 5-stellige deutsche Postleitzahl ein. Eine Lieferung ins Ausland ist aus verbrauchsteuer- und zollrechtlichen Gründen für Spirituosen leider nicht möglich.' 
        : 'Please enter a valid 5-digit German postal code. International shipping is not available due to tax and customs regulations.');
      return;
    }

    if (!termsAccepted) {
      alert(lang === 'de' ? 'Bitte bestätigen Sie die AGB und die Widerrufsbelehrung.' : 'Please accept the Terms and Cancellation Policy.');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    // Step 1: Call Payments API Gateway (Mollie)
    const sessionId = 'chk_' + Math.random().toString(36).substring(2, 9) + Date.now();
    let mollieResult = null;
    try {
      mollieResult = await createMolliePayment({
        amount: total,
        customerEmail: formData.email.trim(),
        description: `PURE.WHISKY. Einzelfass-Bestellung`,
        redirectUrl: `${window.location.origin}/?order_return=1&session_id=${sessionId}`
      });
    } catch (mollieErr) {
      console.error('Payment checkout initiation error:', mollieErr);
      mollieResult = { success: false, error: mollieErr.message };
    }

    // STRICT CHECK: Mollie must never be bypassed!
    if (!mollieResult || !mollieResult.success || !mollieResult.checkoutUrl) {
      setIsProcessing(false);
      const errorMsg = mollieResult?.error || 'Zahlungsverbindung konnte nicht aufgebaut werden. Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es erneut.';
      setPaymentError(errorMsg);
      return;
    }

    const checkoutData = {
      customer: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        street: formData.street.trim(),
        zip: cleanZip,
        city: formData.city.trim(),
        country: 'Deutschland',
        email: formData.email.trim()
      },
      items: cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        caskInfo: `${item.product.abv || ''} · ${item.product.caskType || 'Single Cask'}`,
        quantity: item.quantity,
        price: item.product.price
      })),
      shipping,
      total,
      createdAt: new Date().toISOString()
    };

    // Store pending checkout session (temporary until paid - NEVER saved as order or shown in Admin!)
    await savePendingCheckout(mollieResult.paymentId, checkoutData, sessionId);

    // IMMEDIATELY REDIRECT TO MOLLIE
    window.location.href = mollieResult.checkoutUrl;
  };

  const handleResetAndClose = () => {
    setStep('cart');
    setPlacedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={handleResetAndClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-white border-l border-[#E2DDD5] flex flex-col text-left shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E2DDD5] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center space-x-2">
              {step === 'checkout' && (
                <button 
                  onClick={() => setStep('cart')}
                  className="mr-1 p-1 text-stone-500 hover:text-[#181F1C] rounded transition-colors"
                  title="Zurück zum Warenkorb"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <ShoppingBag className="w-5 h-5 text-[#B85D2C]" />
              <h2 className="font-serif text-2xl text-[#181F1C] font-normal">
                {step === 'cart' && t.cart.title}
                {step === 'checkout' && t.cart.checkoutTitle}
                {step === 'success' && (lang === 'de' ? 'Bestellbestätigung' : 'Order Confirmation')}
              </h2>
            </div>
            <button 
              onClick={handleResetAndClose} 
              className="group p-2 rounded-full bg-white border border-[#D4C8B8] text-stone-500 hover:text-[#181F1C] hover:border-[#B85D2C] transition-all duration-300 shadow-xs hover:scale-105 active:scale-95"
              title={t.cart.close}
            >
              <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <>
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto" strokeWidth={1} />
                    <p className="text-[#55695E] text-base">{t.cart.empty}</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] flex items-center space-x-4 hover:border-[#D4C8B8] transition-colors">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-20 object-contain drop-shadow-xs" />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#181F1C] truncate">{item.product.name}</h4>
                        <p className="text-xs text-[#55695E]">{item.product.abv} · {item.product.age}</p>
                        <p className="text-sm text-[#B85D2C] font-serif font-bold mt-1">{(item.product.price * item.quantity).toFixed(2)} €</p>
                      </div>

                      <div className="flex items-center space-x-1 bg-white border border-[#D4C8B8] rounded-lg p-1 shadow-2xs">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} 
                          className="p-1 text-neutral-500 hover:text-neutral-900 hover:bg-[#FAF8F5] rounded transition-all hover:scale-110 active:scale-90"
                          title="Menge verringern"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm text-[#181F1C] px-2 font-bold select-none">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} 
                          className="p-1 text-neutral-500 hover:text-neutral-900 hover:bg-[#FAF8F5] rounded transition-all hover:scale-110 active:scale-90"
                          title="Menge erhöhen"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button 
                        onClick={() => onRemoveItem(item.product.id)} 
                        className="p-1.5 text-neutral-400 hover:text-rose-600 hover:scale-115 active:scale-90 transition-all rounded-lg"
                        title="Entfernen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}

                {cartItems.length > 0 && (
                  shipping === 0 ? (
                    <div className="p-4 rounded-xl bg-[#E8EFEA] border border-[#C2D8C9] text-xs text-[#1B4332] space-y-1">
                      <div className="flex items-center space-x-2 font-bold text-[#1B4332]">
                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                        <span>Kostenloser Versand (0,00 €)</span>
                      </div>
                      <p className="text-[11px] text-[#2D6A4F]">
                        Für die Artikel in Ihrem Warenkorb fallen keine Versandkosten an.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] text-xs text-[#3A4A40] space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#181F1C]">
                        <div className="flex items-center space-x-2">
                          <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                          <span>Versicherter DHL GoGreen Versand</span>
                        </div>
                        <span className="text-[10px] font-craft-mono font-bold text-[#2D6A4F] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          🇩🇪 Nur Deutschland
                        </span>
                      </div>
                      <p className="text-[11px] text-[#55695E]">
                        Lieferung innerhalb von 2–4 Werktagen · Pauschal 6,90 € inkl. 18+ Alterssichtprüfung bei Zustellung.
                      </p>
                    </div>
                  )
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t border-[#E2DDD5] bg-[#FAF8F5] space-y-4">
                  
                  <label className="flex items-start space-x-2.5 text-xs text-[#3A4A40] cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={ageConfirmed}
                      onChange={(e) => setAgeConfirmed(e.target.checked)}
                      className="mt-0.5 rounded border-[#D4C8B8] text-[#B85D2C] focus:ring-0"
                    />
                    <span>{t.cart.ageConfirm}</span>
                  </label>

                  <div className="space-y-2 text-sm text-[#3A4A40] pt-2 border-t border-[#E2DDD5]">
                    <div className="flex justify-between">
                      <span>{t.cart.subtotal}</span>
                      <span className="font-semibold text-[#181F1C]">{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.cart.shipping}</span>
                      <span className={`font-semibold ${shipping === 0 ? 'text-[#2D6A4F]' : 'text-[#181F1C]'}`}>
                        {shipping === 0 ? 'Kostenlos (0,00 €)' : `${shipping.toFixed(2)} €`}
                      </span>
                    </div>
                    <div className="flex justify-between font-serif text-lg text-[#181F1C] font-bold pt-2 border-t border-[#E2DDD5]">
                      <span>{t.cart.total}</span>
                      <span className="text-[#B85D2C]">{total.toFixed(2)} €</span>
                    </div>
                  </div>

                  <button
                    disabled={!ageConfirmed}
                    onClick={handleStartCheckout}
                    className={`w-full py-4 rounded-lg text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 transition-all duration-200 ${
                      ageConfirmed
                        ? 'bg-[#B85D2C] hover:bg-[#A04E24] text-white shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{t.cart.checkoutBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT ADDRESS & PAYMENT FORM */}
          {step === 'checkout' && (
            <form onSubmit={handleSubmitOrder} className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                <div className="bg-[#FAF8F5] border border-[#E2DDD5] p-3 rounded-lg text-xs text-[#55695E]">
                  <p className="font-semibold text-[#181F1C] mb-1">
                    {lang === 'de' ? 'Hinweis zum Kaufvertragsabschluss:' : 'Contract Conclusion Notice:'}
                  </p>
                  <p>
                    {lang === 'de' 
                      ? 'Nach Eingang Ihrer Bestellung erhalten Sie eine Eingangsbestätigung. Der Kaufvertrag kommt rechtswirksam durch die gesonderte Zusendung der Rechnung zustande.'
                      : 'You will receive an order acknowledgment. The binding sales contract concludes upon issuance and receipt of the invoice.'}
                  </p>
                </div>

                <h3 className="font-serif text-lg text-[#181F1C] font-semibold pt-1">
                  {t.cart.customerDetails}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#55695E] mb-1">{t.cart.firstName} *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="Max"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full text-sm bg-white border border-[#D4C8B8] rounded-lg px-3 py-2 text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#55695E] mb-1">{t.cart.lastName} *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Mustermann"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full text-sm bg-white border border-[#D4C8B8] rounded-lg px-3 py-2 text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#55695E] mb-1">{t.cart.email} *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="max.mustermann@beispiel.de"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-sm bg-white border border-[#D4C8B8] rounded-lg px-3 py-2 text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                  />
                  <p className="text-[11px] text-[#55695E] mt-1">
                    {lang === 'de' ? 'Hierhin sende ich Bestätigung & Rechnung.' : 'Where your confirmation and invoice will be sent.'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs text-[#55695E] mb-1">{t.cart.street} *</label>
                  <input
                    type="text"
                    name="street"
                    required
                    placeholder="Musterstraße 1"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full text-sm bg-white border border-[#D4C8B8] rounded-lg px-3 py-2 text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-[#55695E] mb-1">{t.cart.zip} *</label>
                    <input
                      type="text"
                      name="zip"
                      required
                      placeholder="10115"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full text-sm bg-white border border-[#D4C8B8] rounded-lg px-3 py-2 text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-[#55695E] mb-1">{t.cart.city} *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="Berlin"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full text-sm bg-white border border-[#D4C8B8] rounded-lg px-3 py-2 text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                    />
                  </div>
                </div>

                {/* Country / Lieferland (Strictly DE only) */}
                <div>
                  <label className="block text-xs text-[#55695E] mb-1">
                    {lang === 'de' ? 'Lieferland' : 'Delivery Country'} *
                  </label>
                  <div className="flex items-center justify-between w-full text-sm bg-[#FAF8F5] border border-[#D4C8B8] rounded-lg px-3 py-2 text-[#181F1C]">
                    <div className="flex items-center space-x-2">
                      <span className="text-base">🇩🇪</span>
                      <span className="font-semibold">{lang === 'de' ? 'Deutschland' : 'Germany'}</span>
                    </div>
                    <span className="text-[10px] font-craft-mono font-bold text-[#2D6A4F] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {lang === 'de' ? 'Ausschließlich Deutschland' : 'Germany only'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#55695E] mt-1 leading-relaxed">
                    {lang === 'de' 
                      ? 'Lieferung ausschließlich innerhalb Deutschlands (DHL GoGreen inkl. 18+ Alterssichtprüfung).' 
                      : 'Delivery strictly within Germany (DHL GoGreen incl. 18+ age verification).'}
                  </p>
                </div>

                {/* Payment Information */}
                <div className="pt-2">
                  <label className="block text-xs text-[#55695E] mb-2 font-medium">{t.cart.paymentMethod}</label>
                  <div className="p-4 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] space-y-2.5">
                    <div className="flex items-center space-x-2.5">
                      <CreditCard className="w-4 h-4 text-[#B85D2C]" />
                      <span className="text-xs font-bold text-[#181F1C]">
                        {lang === 'de' ? 'Sichere Online-Zahlung' : 'Secure Online Payment'}
                      </span>
                    </div>

                    <p className="text-xs text-[#55695E] leading-relaxed">
                      {lang === 'de'
                        ? 'Sie werden nach Klick auf Bestellen direkt zur gesicherten Zahlungsseite weitergeleitet. Dort wählen Sie einfach Ihre bevorzugte Methode:'
                        : 'After placing your order, you will be redirected to the secure checkout page to choose your preferred method:'}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {['Kreditkarte', 'PayPal', 'Apple Pay', 'Klarna Sofortüberweisung', 'SEPA / iDEAL'].map((m) => (
                        <span key={m} className="px-2 py-0.5 bg-white border border-[#D4C8B8] text-[10px] font-craft-mono font-medium text-[#181F1C] rounded-md shadow-2xs">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Total, Legal Consent & Order Button */}
              <div className="p-6 border-t border-[#E2DDD5] bg-[#FAF8F5] space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#55695E]">{t.cart.total}</span>
                  <span className="font-serif text-xl font-bold text-[#B85D2C]">{total.toFixed(2)} €</span>
                </div>

                {/* Legal & Terms Checkbox */}
                <div className="space-y-2 pt-1 border-t border-[#E2DDD5]/70">
                  <label className="flex items-start space-x-2.5 text-xs text-[#55695E] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 rounded border-[#D4C8B8] text-[#B85D2C] focus:ring-0 cursor-pointer"
                    />
                    <span className="leading-snug">
                      {lang === 'de' ? (
                        <>
                          Ich habe die{' '}
                          <button
                            type="button"
                            onClick={() => onOpenLegal?.('agb')}
                            className="text-[#181F1C] font-semibold underline underline-offset-2 hover:text-[#B85D2C] cursor-pointer"
                          >
                            AGB
                          </button>{' '}
                          und die{' '}
                          <button
                            type="button"
                            onClick={() => onOpenLegal?.('widerruf')}
                            className="text-[#181F1C] font-semibold underline underline-offset-2 hover:text-[#B85D2C] cursor-pointer"
                          >
                            Widerrufsbelehrung
                          </button>{' '}
                          gelesen und erkläre mich mit deren Geltung einverstanden. Die{' '}
                          <button
                            type="button"
                            onClick={() => onOpenLegal?.('datenschutz')}
                            className="text-[#181F1C] font-semibold underline underline-offset-2 hover:text-[#B85D2C] cursor-pointer"
                          >
                            Datenschutzerklärung
                          </button>{' '}
                          habe ich zur Kenntnis genommen.
                        </>
                      ) : (
                        <>
                          I have read and accept the{' '}
                          <button
                            type="button"
                            onClick={() => onOpenLegal?.('agb')}
                            className="text-[#181F1C] font-semibold underline underline-offset-2 hover:text-[#B85D2C] cursor-pointer"
                          >
                            Terms & Conditions
                          </button>{' '}
                          and the{' '}
                          <button
                            type="button"
                            onClick={() => onOpenLegal?.('widerruf')}
                            className="text-[#181F1C] font-semibold underline underline-offset-2 hover:text-[#B85D2C] cursor-pointer"
                          >
                            Cancellation Policy
                          </button>
                          . I have taken note of the{' '}
                          <button
                            type="button"
                            onClick={() => onOpenLegal?.('datenschutz')}
                            className="text-[#181F1C] font-semibold underline underline-offset-2 hover:text-[#B85D2C] cursor-pointer"
                          >
                            Privacy Policy
                          </button>
                          .
                        </>
                      )}
                    </span>
                  </label>

                  <div className="flex items-center space-x-1.5 text-[11px] text-[#55695E]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                    <span>
                      {lang === 'de' 
                        ? 'Altersprüfung (18+) bei persönlicher DHL-Zustellung.' 
                        : 'Age verification (18+) upon DHL delivery.'}
                    </span>
                  </div>
                </div>

                {paymentError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs leading-relaxed text-left flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5">Zahlungsverbindung fehlgeschlagen:</span>
                      <span>{paymentError}</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing || !termsAccepted}
                  className={`w-full py-4 rounded-lg text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 shadow-md transition-all ${
                    termsAccepted && !isProcessing
                      ? 'bg-[#B85D2C] hover:bg-[#A04E24] text-white hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                      : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Weiterleitung zu Mollie...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t.cart.submitOrder}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER SUCCESS CONFIRMATION */}
          {step === 'success' && placedOrder && (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-5 overflow-y-auto">
              <div className="w-16 h-16 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-[#181F1C] font-semibold">
                  {t.cart.orderSuccessTitle}
                </h3>
                <p className="text-xs text-[#55695E] max-w-sm">
                  {t.cart.orderSuccessDesc}
                </p>
              </div>

              <div className="w-full bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#55695E]">Bestellnummer:</span>
                  <span className="font-bold font-mono text-[#181F1C]">#{placedOrder.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#55695E]">Empfänger:</span>
                  <span className="font-semibold text-[#181F1C]">{placedOrder.customer.firstName} {placedOrder.customer.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#55695E]">E-Mail:</span>
                  <span className="font-mono text-[#181F1C]">{placedOrder.customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#55695E]">Betrag:</span>
                  <span className="font-bold text-[#B85D2C]">{placedOrder.total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E2DDD5]">
                  <span className="text-[#55695E]">Status:</span>
                  <span className="text-amber-700 font-semibold">Eingegangen (Rechnung ausstehend)</span>
                </div>
              </div>

              {mollieCheckoutUrl && (
                <div className="w-full space-y-2">
                  <a
                    href={mollieCheckoutUrl}
                    className="w-full py-3.5 bg-[#B85D2C] hover:bg-[#A04E24] text-white rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 shadow-md transition-all hover:scale-[1.01]"
                  >
                    <span>Jetzt sicher online bezahlen</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-[10px] text-[#55695E]">
                    Kreditkarte, PayPal, Apple Pay oder Sofortüberweisung (SSL-verschlüsselt)
                  </p>
                </div>
              )}

              <div className="text-[11px] text-[#55695E] bg-blue-50 border border-blue-100 rounded-lg p-3 text-left w-full">
                <strong>Bestellbestätigung per Resend:</strong> Eine automatische Eingangsbestätigung wurde an <code>{placedOrder.customer.email}</code> und eine Benachrichtigungskopie an <code>friese.scholz@gmail.com</code> versendet. Im Admin-Bereich kann die offizielle Rechnung versendet werden, wodurch der Kaufvertrag rechtswirksam zustande kommt.
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full py-3 bg-[#181F1C] hover:bg-neutral-800 text-white rounded-lg text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                {t.cart.close}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
