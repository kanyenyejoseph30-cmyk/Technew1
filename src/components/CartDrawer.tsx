import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  Truck,
  CheckCircle2
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    formatPrice,
    promoCode,
    discountAmount,
    applyPromoCode,
    setIsCheckoutOpen,
    settings
  } = useStore();

  const [inputPromo, setInputPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    const res = applyPromoCode(inputPromo);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setInputPromo('');
    }
  };

  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DFD4] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EDE6DA] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1C1A17] flex items-center justify-center text-[#D4AF37]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-stone-900">Votre Panier d’Élégance</h2>
              <p className="text-[11px] text-stone-500">{cart.length} article(s) sélectionné(s)</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-600 hover:text-stone-950 transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto stroke-[1.2]" />
              <div className="font-serif text-base font-bold text-stone-700">Votre panier est encore vide</div>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explorez notre somptueuse collection de robes, tailleurs et accessoires de luxe.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 bg-[#1C1A17] text-white rounded-full text-xs font-serif uppercase tracking-wider font-semibold hover:bg-stone-800 transition-all"
              >
                Découvrir la Boutique
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3.5 rounded-xl border border-[#EDE6DA] shadow-2xs flex gap-3 items-center"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 object-cover rounded-lg bg-stone-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-xs text-stone-900 truncate">
                      {item.product.name}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1">
                      <span className="bg-[#FAF7F0] px-1.5 py-0.5 rounded border border-stone-200">
                        Taille: <strong>{item.selectedSize}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <span 
                          className="w-2.5 h-2.5 rounded-full border border-stone-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="font-serif font-bold text-xs text-[#8C6B1C]">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="p-1 text-stone-600 hover:text-stone-950"
                          aria-label="Diminuer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-800">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="p-1 text-stone-600 hover:text-stone-950"
                          aria-label="Augmenter"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex justify-end pt-1">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-stone-500 hover:text-rose-600 underline"
                >
                  Vider le panier
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#EDE6DA] bg-white space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                  <input
                    type="text"
                    value={inputPromo}
                    onChange={(e) => setInputPromo(e.target.value)}
                    placeholder="Code Privilège (ex: ELEGANCE10)"
                    className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs uppercase text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Appliquer
                </button>
              </div>

              {promoMessage && (
                <div className={`text-[11px] font-medium flex items-center gap-1 ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {!promoMessage.isError && <CheckCircle2 className="w-3 h-3" />}
                  {promoMessage.text}
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Sous-total articles :</span>
                <span className="font-semibold text-stone-900">{formatPrice(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Remise ({promoCode}) :</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[11px] text-stone-500">
                <span>Paiement Mobile Money (M-Pesa / Orange / Airtel) :</span>
                <span className="text-emerald-700 font-bold">Sans frais</span>
              </div>

              <div className="flex justify-between text-sm font-serif font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Estimé :</span>
                <span className="text-base text-[#8C6B1C]">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3.5 bg-[#1C1A17] text-white hover:bg-stone-800 rounded-xl font-serif uppercase tracking-wider text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              <span>Commander & Payer en Toute Sécurité</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-center text-[10px] text-stone-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C7A58]" />
              <span>Garantie de livraison & Retrait par QR Code sécurisé</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
