import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 6.90;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E2DDD5] flex flex-col text-left shadow-2xl">
          
          <div className="p-6 border-b border-[#E2DDD5] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#B85D2C]" />
              <h2 className="font-serif text-2xl text-[#181F1C] font-normal">Ihr Warenkorb</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:text-neutral-900">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto" strokeWidth={1} />
                <p className="text-[#55695E] text-base">Ihr Warenkorb ist leer.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] flex items-center space-x-4">
                  <img src={item.product.image} alt={item.product.name} className="w-12 h-20 object-contain" />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#181F1C] truncate">{item.product.name}</h4>
                    <p className="text-xs text-[#55695E]">{item.product.abv} · {item.product.age}</p>
                    <p className="text-sm text-[#B85D2C] font-serif font-bold mt-1">{(item.product.price * item.quantity).toFixed(2)} €</p>
                  </div>

                  <div className="flex items-center space-x-1.5 bg-white border border-[#D4C8B8] rounded-lg p-1">
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="p-1 text-neutral-600 hover:text-neutral-900">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm text-[#181F1C] px-2 font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="p-1 text-neutral-600 hover:text-neutral-900">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button onClick={() => onRemoveItem(item.product.id)} className="text-neutral-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] text-xs text-[#3A4A40] space-y-1">
                <div className="flex items-center space-x-2 font-bold text-[#181F1C]">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Versicherter DHL GoGreen Versand</span>
                </div>
                <p className="text-[11px] text-[#55695E]">
                  Versand innerhalb von 2–4 Werktagen · Pauschal 6,90 € inkl. Alterssichtprüfung (ab 18 Jahren).
                </p>
              </div>
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
                <span>Ich bestätige, dass ich mindestens <strong>18 Jahre alt</strong> bin (Altersprüfung bei DHL-Zustellung).</span>
              </label>

              <div className="space-y-2 text-sm text-[#3A4A40] pt-2 border-t border-[#E2DDD5]">
                <div className="flex justify-between">
                  <span>Zwischensumme:</span>
                  <span className="font-semibold text-[#181F1C]">{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Versand (DHL GoGreen):</span>
                  <span className="font-semibold text-[#181F1C]">{shipping.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between font-serif text-lg text-[#181F1C] font-bold pt-2 border-t border-[#E2DDD5]">
                  <span>Gesamtbetrag:</span>
                  <span className="text-[#B85D2C]">{total.toFixed(2)} €</span>
                </div>
              </div>

              <button
                disabled={!ageConfirmed}
                onClick={() => alert('Vielen Dank für Ihre Bestellung bei PURE.WHISKY.!')}
                className={`w-full py-4.5 rounded-lg text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 transition-all ${
                  ageConfirmed
                    ? 'bg-[#B85D2C] hover:bg-[#A04E24] text-white shadow-md'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <span>Zur Kasse (Checkout)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
