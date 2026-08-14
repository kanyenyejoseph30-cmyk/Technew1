import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PaymentMethodType, CustomerInfo } from '../types';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Store, 
  Copy, 
  Check, 
  PhoneCall, 
  Sparkles, 
  AlertCircle, 
  Lock,
  ArrowRight,
  QrCode
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    formatPrice,
    settings,
    createOrder,
    currentCustomerPhone,
    setActiveView,
    setQuickTrackingOrderNumber
  } = useStore();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [name, setName] = useState('Mireille Kankolongo');
  const [phone, setPhone] = useState(currentCustomerPhone || '0812345678');
  const [email, setEmail] = useState('mireille.kanko@gmail.com');
  const [address, setAddress] = useState('22 Avenue des Aviateurs, Résidence Horizon');
  const [city, setCity] = useState('Kinshasa - Gombe');
  const [notes, setNotes] = useState('Appeler dès votre arrivée devant le portail');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('mpesa');
  const [paymentRef, setPaymentRef] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (!isCheckoutOpen) return null;

  const shippingCost = deliveryType === 'delivery' 
    ? (cartSubtotal >= settings.freeShippingThreshold ? 0 : settings.standardShippingFee)
    : 0;

  const grandTotal = Math.max(0, cartSubtotal + shippingCost - discountAmount);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(settings.merchantPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 3000);
  };

  const handleGenerateSampleTxn = () => {
    const prefix = paymentMethod === 'mpesa' ? 'MP' : paymentMethod === 'orange_money' ? 'OM' : paymentMethod === 'airtel_money' ? 'AIR' : 'TX';
    setPaymentRef(`${prefix}-${Math.floor(10000000 + Math.random() * 90000000)}`);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!name.trim() || !phone.trim()) {
      setValidationError('Veuillez renseigner votre nom complet et numéro de téléphone.');
      return;
    }

    if (deliveryType === 'delivery' && !address.trim()) {
      setValidationError('Veuillez indiquer votre adresse complète de livraison.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const customer: CustomerInfo = {
        name,
        phone,
        email,
        address: deliveryType === 'delivery' ? address : `Retrait en Boutique Blanche Élégance (${settings.storeAddress})`,
        city,
        notes
      };

      const newOrder = createOrder({
        customer,
        paymentMethod,
        paymentReference: paymentRef || (paymentMethod === 'cash_delivery' ? 'PAIEMENT-LIVRAISON' : `TXN-${Date.now().toString().slice(-6)}`),
        deliveryType,
        shippingFee: shippingCost
      });

      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setQuickTrackingOrderNumber(newOrder.orderNumber);
      setActiveView('tracking');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E5DFD4] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#1C1A17] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center text-stone-950 font-serif font-bold">
              BÉ
            </div>
            <div>
              <h2 className="font-serif font-bold text-base sm:text-lg text-white">Finalisation Sécurisée de votre Commande</h2>
              <p className="text-[11px] text-[#D8C49E]">Paiement Mobile Money & Génération du QR Code Unique</p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCompleteOrder} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {validationError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Step 1: Mode de Réception */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-800 font-serif mb-3 block">
              1. Mode de Réception de vos Vêtements
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setDeliveryType('delivery')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  deliveryType === 'delivery'
                    ? 'border-[#D4AF37] bg-white shadow-xs'
                    : 'border-stone-200 bg-[#F9F7F2] opacity-75 hover:opacity-100'
                }`}
              >
                <Truck className={`w-5 h-5 mt-0.5 ${deliveryType === 'delivery' ? 'text-[#A37B24]' : 'text-stone-400'}`} />
                <div>
                  <div className="font-serif font-bold text-xs text-stone-900">Livraison Express à Domicile</div>
                  <div className="text-[11px] text-stone-500">Kinshasa & Environs (Suivi GPS en direct)</div>
                  <div className="text-[11px] text-[#8C6B1C] font-semibold mt-1">
                    {cartSubtotal >= settings.freeShippingThreshold ? 'Livraison Offerte dès 200 $' : `${formatPrice(settings.standardShippingFee)}`}
                  </div>
                </div>
              </div>

              <div
                onClick={() => setDeliveryType('pickup')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  deliveryType === 'pickup'
                    ? 'border-[#D4AF37] bg-white shadow-xs'
                    : 'border-stone-200 bg-[#F9F7F2] opacity-75 hover:opacity-100'
                }`}
              >
                <Store className={`w-5 h-5 mt-0.5 ${deliveryType === 'pickup' ? 'text-[#A37B24]' : 'text-stone-400'}`} />
                <div>
                  <div className="font-serif font-bold text-xs text-stone-900">Retrait en Boutique (Click & Collect)</div>
                  <div className="text-[11px] text-stone-500">{settings.storeAddress}, Gombe</div>
                  <div className="text-[11px] text-emerald-700 font-bold mt-1">Gratuit & Prêt en 2h</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Coordonnées du Client */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-800 font-serif block">
              2. Coordonnées de Contact & Destinataire
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-stone-600 block mb-1">Nom & Prénom complet</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  placeholder="ex: Mireille Kankolongo"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-600 block mb-1">Numéro de Téléphone (Pour notifications SMS)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  placeholder="ex: 0812345678"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-stone-600 block mb-1">Adresse Email (Reçu & Facture)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  placeholder="email@domaine.com"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-600 block mb-1">Commune / Ville</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  placeholder="Kinshasa - Gombe"
                />
              </div>
            </div>

            {deliveryType === 'delivery' && (
              <div>
                <label className="text-[11px] text-stone-600 block mb-1">Adresse exacte de livraison / Repères</label>
                <input
                  type="text"
                  required={deliveryType === 'delivery'}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  placeholder="Avenue, Numéro de parcelle, Immeuble, Étage"
                />
              </div>
            )}

            <div>
              <label className="text-[11px] text-stone-600 block mb-1">Instructions particulières pour le livreur (Optionnel)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
                placeholder="ex: Sonner à l’interphone ou laisser au gardien"
              />
            </div>
          </div>

          {/* Step 3: Moyen de Paiement eMoney & Carte */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800 font-serif block">
                3. Sélection du Mode de Règlement
              </label>
              <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <Lock className="w-3 h-3" /> Cryptage SSL Sécurisé
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {/* M-Pesa */}
              <div
                onClick={() => setPaymentMethod('mpesa')}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
                  paymentMethod === 'mpesa'
                    ? 'border-[#E60000] bg-rose-50/50 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-[#E60000] text-white flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <span className="text-xs font-bold text-stone-900 mt-1">M-Pesa</span>
                <span className="text-[9px] text-stone-500">Vodacom RDC</span>
              </div>

              {/* Orange Money */}
              <div
                onClick={() => setPaymentMethod('orange_money')}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
                  paymentMethod === 'orange_money'
                    ? 'border-[#FF6600] bg-orange-50/50 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-[#FF6600] text-white flex items-center justify-center font-bold text-xs">
                  O
                </div>
                <span className="text-xs font-bold text-stone-900 mt-1">Orange Money</span>
                <span className="text-[9px] text-stone-500">Orange RDC</span>
              </div>

              {/* Airtel Money */}
              <div
                onClick={() => setPaymentMethod('airtel_money')}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
                  paymentMethod === 'airtel_money'
                    ? 'border-[#ED1C24] bg-rose-50/50 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-[#ED1C24] text-white flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <span className="text-xs font-bold text-stone-900 mt-1">Airtel Money</span>
                <span className="text-[9px] text-stone-500">Airtel RDC</span>
              </div>

              {/* Carte Bancaire */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
                  paymentMethod === 'card'
                    ? 'border-[#1C1A17] bg-stone-100 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <CreditCard className="w-6 h-6 text-stone-800" />
                <span className="text-xs font-bold text-stone-900 mt-1">Carte Bancaire</span>
                <span className="text-[9px] text-stone-500">Visa / Mastercard</span>
              </div>

              {/* Cash à la livraison */}
              <div
                onClick={() => setPaymentMethod('cash_delivery')}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
                  paymentMethod === 'cash_delivery'
                    ? 'border-[#8C6B1C] bg-amber-50/50 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <Truck className="w-6 h-6 text-stone-800" />
                <span className="text-xs font-bold text-stone-900 mt-1">Cash au Colis</span>
                <span className="text-[9px] text-stone-500">À la remise</span>
              </div>
            </div>

            {/* Mobile Money Payment Instructions (M-Pesa / Orange / Airtel) */}
            {(paymentMethod === 'mpesa' || paymentMethod === 'orange_money' || paymentMethod === 'airtel_money') && (
              <div className="bg-[#FAF7F0] border border-[#E0D7C4] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-[#A37B24]" />
                    <span className="text-xs font-serif font-bold text-stone-900">
                      Instructions de Transfert eMoney
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#D4AF37]/20 text-[#8C6B1C] font-bold px-2 py-0.5 rounded-full uppercase">
                    Compte Officiel Vérifié
                  </span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#EAE3D6] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-wider">Numéro Marchand Blanche Élégance :</div>
                    <div className="text-base sm:text-lg font-mono font-bold text-stone-950 tracking-wider">
                      {settings.merchantPhone}
                    </div>
                    <div className="text-[10px] text-stone-400">Titulaire : {settings.merchantName}</div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="px-3 py-1.5 bg-[#1C1A17] text-white hover:bg-stone-800 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-stone-600 space-y-1">
                  <p>1. Effectuez le transfert du montant total de <strong className="text-stone-950 font-bold">{formatPrice(grandTotal)}</strong> vers le <strong className="font-mono">{settings.merchantPhone}</strong>.</p>
                  <p>2. Renseignez ci-dessous l'ID de transaction reçu par SMS pour validation immédiate :</p>
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={paymentRef}
                    onChange={(e) => setPaymentRef(e.target.value)}
                    placeholder="ex: MP-89210943 ou ID SMS"
                    className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateSampleTxn}
                    className="px-2.5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-[10px] font-semibold whitespace-nowrap"
                  >
                    Simuler ID Test
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recap & Total */}
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Articles ({cart.length}) :</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Remise VIP :</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Frais de livraison :</span>
              <span>{shippingCost === 0 ? <strong className="text-emerald-700">Gratuit</strong> : formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-base font-serif font-bold text-stone-950 pt-2 border-t border-stone-200">
              <span>Total à Payer :</span>
              <span className="text-[#8C6B1C]">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#1C1A17] text-white hover:bg-stone-800 transition-all rounded-xl font-serif uppercase tracking-widest text-xs font-bold shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Génération du QR Code & Enregistrement...</span>
            ) : (
              <>
                <QrCode className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span>Confirmer & Générer mon QR Code de Retrait</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
