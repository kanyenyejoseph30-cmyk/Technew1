import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { QRCodeSVG } from 'qrcode.react';
import { 
  User, 
  Package, 
  Clock, 
  MapPin, 
  QrCode, 
  ChevronRight, 
  Sparkles, 
  Phone, 
  Mail, 
  ShoppingBag, 
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Lock,
  MessageSquare,
  LogOut,
  Send,
  Shield,
  ArrowRight,
  Truck,
  Search,
  Layers,
  Compass,
  CreditCard,
  Check
} from 'lucide-react';

export const ClientSpace: React.FC = () => {
  const { 
    orders, 
    currentCustomerPhone, 
    setCurrentCustomerPhone,
    isCustomerAuthenticated,
    sendCustomerOtp,
    verifyCustomerOtp,
    logoutCustomer,
    formatPrice, 
    setActiveView, 
    setQuickTrackingOrderNumber,
    addToCart
  } = useStore();

  // Auth local states
  const [phoneInput, setPhoneInput] = useState(currentCustomerPhone || '0812345678');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');
  const [selectedQrOrder, setSelectedQrOrder] = useState<string | null>(null);
  const [quickTrackInput, setQuickTrackInput] = useState('');

  // Send SMS OTP handler
  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError('');
    setAuthSuccessMsg('');

    if (!phoneInput.trim()) {
      setAuthError('Veuillez saisir votre numéro de téléphone.');
      return;
    }

    const result = sendCustomerOtp(phoneInput.trim());
    if (result.success) {
      setOtpSent(true);
      setAuthSuccessMsg(`Code SMS OTP envoyé au ${phoneInput.trim()} (Code démo : ${result.otp})`);
    } else {
      setAuthError(result.message);
    }
  };

  // Verify SMS OTP handler
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!otpInput.trim()) {
      setAuthError('Veuillez saisir le code OTP reçu par SMS.');
      return;
    }

    const success = verifyCustomerOtp(phoneInput.trim(), otpInput.trim());
    if (!success) {
      setAuthError('Code OTP incorrect ou expiré. Essayez 2430 ou renvoyez un code.');
    } else {
      setOtpInput('');
      setOtpSent(false);
    }
  };

  // Filter orders by customer phone or show orders corresponding to this client
  const customerOrders = orders.filter(o => {
    const cleanPhone = phoneInput.trim().replace(/\s+/g, '');
    const orderPhone = o.customer.phone.replace(/\s+/g, '');
    return orderPhone.includes(cleanPhone) || 
           cleanPhone.includes(orderPhone) ||
           (cleanPhone === '0812345678' && o.customer.name.toLowerCase().includes('mireille'));
  });

  const activeCustomer = customerOrders[0]?.customer || {
    name: 'Mireille Kankolongo',
    phone: phoneInput || '0812345678',
    email: 'mireille.kanko@gmail.com',
    address: '22 Avenue des Aviateurs, Gombe, Kinshasa',
    city: 'Kinshasa'
  };

  const totalSpent = customerOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach(item => {
      addToCart(item.product, item.selectedSize, item.selectedColor, item.quantity);
    });
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackInput.trim()) {
      setQuickTrackingOrderNumber(quickTrackInput.trim());
      setActiveView('tracking');
    }
  };

  // Active in-transit or latest order
  const latestActiveOrder = customerOrders.find(o => o.status !== 'delivered') || customerOrders[0];

  // If NOT authenticated, display the SMS OTP authentication screen
  if (!isCustomerAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 animate-in fade-in duration-300">
        {/* Quick Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
          <button
            onClick={() => setActiveView('catalog')}
            className="px-4 py-2 bg-white hover:bg-[#FAF7F0] border border-[#E0D7C4] text-[#191714] rounded-full text-xs font-serif font-semibold transition-all flex items-center gap-2 shadow-2xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Collections & Catalogue</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
          </button>

          <button
            onClick={() => setActiveView('tracking')}
            className="px-4 py-2 bg-white hover:bg-[#FAF7F0] border border-[#E0D7C4] text-[#191714] rounded-full text-xs font-serif font-semibold transition-all flex items-center gap-2 shadow-2xs"
          >
            <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Où est votre Commande ?</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
          </button>

          <div className="px-4 py-2 bg-[#191714] text-[#D4AF37] rounded-full text-xs font-serif font-bold flex items-center gap-2 shadow-xs">
            <User className="w-3.5 h-3.5" />
            <span>Espace Client (Actif)</span>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#191714] text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg">
              <User className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#191714]">
              Espace Client & Historique
            </h1>
            <p className="text-xs text-[#7A7162] max-w-sm mx-auto">
              Authentifiez-vous avec votre numéro de téléphone mobile pour accéder à vos commandes et vos pass QR de livraison.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D6] shadow-xl space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F0EBE0] text-xs font-serif font-bold text-[#8C6B1C] uppercase tracking-wider">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span>Authentification Sécurisée par SMS OTP</span>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {authError}
              </div>
            )}

            {authSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                {authSuccessMsg}
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-serif font-bold text-[#191714] uppercase tracking-wider mb-2">
                    Numéro de Téléphone Mobile
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8070]" />
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="ex: 0812345678"
                      className="w-full pl-10 pr-4 py-3 bg-[#FCFAF7] border border-[#D8CEBE] rounded-xl text-sm font-mono text-[#191714] placeholder:text-[#A89F91] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-[#8C8070] mt-1.5">
                    Format local : 0812345678 ou +243...
                  </p>
                </div>

                {/* Demo button */}
                <button
                  type="button"
                  onClick={() => {
                    setPhoneInput('0812345678');
                    handleSendOtp();
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E0D7C4] hover:border-[#D4AF37] text-xs text-[#615A4C] flex items-center justify-between group transition-colors"
                >
                  <span className="font-serif">
                    Compte Démo : <strong className="font-mono text-[#191714]">0812345678</strong> (Mireille)
                  </span>
                  <span className="text-[10px] text-[#8C6B1C] font-bold group-hover:underline flex items-center gap-1">
                    Tester <ArrowRight className="w-3 h-3" />
                  </span>
                </button>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#191714] text-[#D4AF37] hover:bg-stone-800 rounded-xl font-serif font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Recevoir Code SMS OTP</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E0D7C4] text-xs space-y-1">
                  <div className="text-[11px] text-[#8C8070]">Code envoyé au numéro :</div>
                  <div className="font-mono font-bold text-sm text-[#191714] flex items-center justify-between">
                    <span>{phoneInput}</span>
                    <button 
                      type="button" 
                      onClick={() => setOtpSent(false)} 
                      className="text-[11px] text-[#8C6B1C] underline font-sans"
                    >
                      Modifier
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-[#191714] uppercase tracking-wider mb-2">
                    Code SMS OTP (4 Chiffres)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8070]" />
                    <input
                      type="text"
                      maxLength={4}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="ex: 2430"
                      autoFocus
                      className="w-full pl-10 pr-4 py-3 bg-[#FCFAF7] border border-[#D8CEBE] rounded-xl text-center text-lg tracking-[0.5em] font-mono font-bold text-[#191714] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-[#8C8070] mt-1.5 text-center">
                    Vérifiez votre notification SMS au haut de l'écran (ex: 2430).
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="flex-1 py-3 bg-[#FAF7F0] border border-[#E0D7C4] text-[#4A4337] rounded-xl text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#EAE3D6]"
                  >
                    Renvoyer SMS
                  </button>
                  <button
                    type="submit"
                    className="flex-2 py-3 bg-[#191714] text-[#D4AF37] hover:bg-stone-800 rounded-xl text-xs font-serif font-bold uppercase tracking-widest shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Valider & Accéder</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Direct Links to Other Views */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setActiveView('catalog')}
              className="p-4 bg-white hover:bg-[#FAF7F0] border border-[#E0D7C4] rounded-2xl text-left transition-all group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#191714] group-hover:text-[#A37B24]">
                  Collections & Catalogue
                </span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-[#7A7162] mt-1">
                Découvrir nos créations de mode, robes de mariée et pièces haute couture.
              </p>
            </button>

            <button
              onClick={() => setActiveView('tracking')}
              className="p-4 bg-white hover:bg-[#FAF7F0] border border-[#E0D7C4] rounded-2xl text-left transition-all group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#191714] group-hover:text-[#A37B24]">
                  Où est votre Commande ?
                </span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-[#7A7162] mt-1">
                Suivre l'acheminement et la position GPS de votre colis à Kinshasa.
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED CUSTOMER VIEW
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Quick Navigation Hub Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-[#EAE3D6] shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveView('catalog')}
            className="px-4 py-2 bg-[#FAF7F0] hover:bg-[#191714] hover:text-[#D4AF37] text-[#191714] border border-[#E0D7C4] rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all flex items-center gap-2 group shadow-2xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#A37B24] group-hover:text-[#D4AF37]" />
            <span>Collections & Catalogue</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => setActiveView('tracking')}
            className="px-4 py-2 bg-[#FAF7F0] hover:bg-[#191714] hover:text-[#D4AF37] text-[#191714] border border-[#E0D7C4] rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all flex items-center gap-2 group shadow-2xs"
          >
            <Truck className="w-3.5 h-3.5 text-[#A37B24] group-hover:text-[#D4AF37]" />
            <span>Où est votre Commande Blanche Élégance ?</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-serif text-[#8C6B1C] font-semibold px-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Espace Membre Privilège</span>
        </div>
      </div>

      {/* Client Profile Header */}
      <div className="bg-gradient-to-r from-[#191714] via-[#2D2720] to-[#191714] text-white rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-stone-950 font-serif font-bold text-2xl flex items-center justify-center shadow-lg">
            {activeCustomer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-[10px] text-[#D4AF37] font-serif uppercase tracking-widest font-bold">
              <Sparkles className="w-3 h-3" /> Membre Privilège Authentifié (SMS OTP)
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {activeCustomer.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-stone-300">
              <span className="flex items-center gap-1 font-mono"><Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> {currentCustomerPhone}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> {activeCustomer.email}</span>
            </div>
          </div>
        </div>

        {/* Stats & Logout Button */}
        <div className="flex items-center gap-4">
          <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-right">
            <div className="text-[10px] text-[#D8C49E] uppercase tracking-wider">Total Dépensé :</div>
            <div className="font-serif font-bold text-lg text-[#D4AF37]">{formatPrice(totalSpent)}</div>
          </div>

          <button
            onClick={logoutCustomer}
            className="p-3 bg-white/10 hover:bg-rose-900/60 border border-white/20 hover:border-rose-400/50 rounded-2xl text-xs font-serif text-white hover:text-rose-200 transition-colors flex items-center gap-1.5"
            title="Se déconnecter de l'espace client"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* DEDICATED CARDS: 1) COLLECTIONS & CATALOGUE | 2) OÙ EST VOTRE COMMANDE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CARD 1: COLLECTIONS & CATALOGUE */}
        <div className="bg-gradient-to-br from-white to-[#FAF7F0] p-6 sm:p-7 rounded-3xl border border-[#E8E2D5] shadow-xs hover:border-[#D4AF37] transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-[10px] text-[#A37B24] font-serif uppercase tracking-widest font-bold bg-[#FAF2DE] px-3 py-1 rounded-full border border-[#E6D5AC]">
                <Sparkles className="w-3 h-3" /> Haute Couture & Nouveautés
              </div>
              <span className="text-[11px] text-stone-500 font-serif">Maison Blanche Élégance</span>
            </div>

            <h3 className="text-xl font-serif font-bold text-[#191714]">
              Collections & Catalogue
            </h3>

            <p className="text-xs text-[#615A4C] leading-relaxed">
              Explorez nos créations exclusives : robes de mariée d'exception, tenues de soirée & cocktail, tailleurs sur-mesure et maroquinerie de luxe confectionnées avec passion.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2.5 py-1 bg-white border border-[#E0D7C4] rounded-lg text-[11px] text-[#4A4337] font-medium">
                👰 Robes de Mariée
              </span>
              <span className="px-2.5 py-1 bg-white border border-[#E0D7C4] rounded-lg text-[11px] text-[#4A4337] font-medium">
                ✨ Soirée & Gala
              </span>
              <span className="px-2.5 py-1 bg-white border border-[#E0D7C4] rounded-lg text-[11px] text-[#4A4337] font-medium">
                👗 Prêt-à-Porter Chic
              </span>
              <span className="px-2.5 py-1 bg-white border border-[#E0D7C4] rounded-lg text-[11px] text-[#4A4337] font-medium">
                👜 Maroquinerie
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EDE6DA] flex items-center justify-between">
            <span className="text-xs text-stone-500 font-serif">Articles disponibles à Kinshasa</span>
            <button
              onClick={() => setActiveView('catalog')}
              className="px-4 py-2.5 bg-[#191714] text-[#D4AF37] hover:bg-stone-800 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition-all shadow-xs flex items-center gap-2 group"
            >
              <span>Explorer le Catalogue</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* CARD 2: OÙ EST VOTRE COMMANDE BLANCHE ÉLÉGANCE */}
        <div className="bg-gradient-to-br from-white to-[#FAF7F0] p-6 sm:p-7 rounded-3xl border border-[#E8E2D5] shadow-xs hover:border-[#D4AF37] transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-[10px] text-emerald-800 font-serif uppercase tracking-widest font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Truck className="w-3 h-3 text-emerald-600" /> Suivi GPS & Expédition Express
              </div>
              <span className="text-[11px] text-stone-500 font-mono">Kinshasa Express</span>
            </div>

            <h3 className="text-xl font-serif font-bold text-[#191714]">
              Où est votre Commande ?
            </h3>

            <p className="text-xs text-[#615A4C] leading-relaxed">
              Consultez en direct la géolocalisation de votre coursier, l'étape de livraison de votre colis et préparez votre pass QR unique ou code PIN pour la réception.
            </p>

            {/* Quick Track Input Form */}
            <form onSubmit={handleTrackSubmit} className="flex gap-2 pt-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                <input
                  type="text"
                  value={quickTrackInput}
                  onChange={(e) => setQuickTrackInput(e.target.value)}
                  placeholder={latestActiveOrder ? `ex: ${latestActiveOrder.orderNumber}` : "Entrez votre N° de commande..."}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#1C1A17] text-[#D4AF37] hover:bg-stone-800 rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-colors shrink-0"
              >
                Localiser
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-[#EDE6DA] flex items-center justify-between">
            {latestActiveOrder ? (
              <div className="text-[11px] text-stone-600 truncate max-w-xs">
                Dernière commande : <strong className="font-mono text-stone-900">{latestActiveOrder.orderNumber}</strong>
              </div>
            ) : (
              <span className="text-xs text-stone-500">Service actif 7j/7</span>
            )}

            <button
              onClick={() => {
                if (latestActiveOrder) {
                  setQuickTrackingOrderNumber(latestActiveOrder.orderNumber);
                }
                setActiveView('tracking');
              }}
              className="px-4 py-2.5 bg-[#FAF7F0] hover:bg-[#191714] text-[#191714] hover:text-[#D4AF37] border border-[#E0D7C4] rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition-all shadow-2xs flex items-center gap-2 group"
            >
              <span>Suivre en Direct</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Orders History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#A37B24]" />
            <h2 className="text-xl font-serif font-bold text-[#191714]">
              Historique de vos Commandes & Pass QR ({customerOrders.length})
            </h2>
          </div>
          <button
            onClick={() => setActiveView('catalog')}
            className="text-xs font-serif uppercase tracking-wider text-[#8C6B1C] hover:text-[#191714] font-bold flex items-center gap-1"
          >
            <span>Nouvel Achat dans le Catalogue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {customerOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE3D6] space-y-3">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-serif font-bold text-base text-[#191714]">Aucune commande enregistrée pour ce numéro</h3>
            <p className="text-xs text-[#7A7162] max-w-sm mx-auto">
              Commandez vos premières créations Blanche Élégance pour générer votre QR code de livraison.
            </p>
            <button
              onClick={() => setActiveView('catalog')}
              className="px-5 py-2.5 bg-[#191714] text-[#D4AF37] rounded-full text-xs font-serif uppercase tracking-wider font-bold"
            >
              Voir le Catalogue
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {customerOrders.map((order) => {
              const isDelivered = order.status === 'delivered';
              const isInTransit = order.status === 'in_transit';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 border border-[#EAE3D6] shadow-xs hover:border-[#D4AF37] transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0EBE0]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#191714]">{order.orderNumber}</span>
                        {isDelivered ? (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Livrée & Scannée
                          </span>
                        ) : isInTransit ? (
                          <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full animate-pulse">
                            En Cours de Livraison
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                            En Préparation Atelier
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#8C8070]">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} • {order.items.length} article(s)
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-serif font-bold text-base text-[#8C6B1C]">{formatPrice(order.totalAmount)}</div>
                        <div className="text-[10px] text-[#8C8070] uppercase font-mono">{order.paymentMethod}</div>
                      </div>

                      {/* View QR Code Button */}
                      <button
                        onClick={() => setSelectedQrOrder(selectedQrOrder === order.id ? null : order.id)}
                        className="px-3.5 py-2 bg-[#FAF7F0] border border-[#E0D7C4] text-[#191714] hover:bg-[#191714] hover:text-[#D4AF37] rounded-xl text-xs font-serif uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
                      >
                        <QrCode className="w-4 h-4 text-[#A37B24]" />
                        <span>Pass QR Retrait</span>
                      </button>

                      {/* Track Button */}
                      <button
                        onClick={() => {
                          setQuickTrackingOrderNumber(order.orderNumber);
                          setActiveView('tracking');
                        }}
                        className="px-3.5 py-2 bg-[#191714] text-[#D4AF37] hover:bg-stone-800 rounded-xl text-xs font-serif uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Où est la commande ?</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* QR Code Expanded Drawer */}
                  {selectedQrOrder === order.id && (
                    <div className="p-5 bg-gradient-to-br from-[#191714] to-[#2E2822] text-white rounded-2xl border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-6 animate-in fade-in">
                      <div className="space-y-2 text-center sm:text-left">
                        <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-serif font-bold">
                          Pass Sécurisé • {order.orderNumber}
                        </div>
                        <h4 className="text-lg font-serif font-bold text-white">QR Code Unique de Vérification</h4>
                        <p className="text-xs text-stone-300 max-w-sm">
                          Présentez ce QR Code au livreur express lors de la livraison. Code PIN de secours : <strong className="text-[#E5C483] font-mono text-sm">{order.securityPin}</strong>
                        </p>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border-2 border-[#D4AF37]/50 shrink-0">
                        <QRCodeSVG
                          value={order.qrCodeString}
                          size={130}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                    </div>
                  )}

                  {/* Items snapshot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-2 bg-[#FCFAF7] rounded-xl border border-[#EAE3D6] text-xs">
                        <img
                          src={it.product.images[0]}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="w-10 h-12 object-cover rounded bg-stone-200"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-serif font-bold text-[#191714] truncate">{it.product.name}</div>
                          <div className="text-[10px] text-[#8C8070]">Taille: {it.selectedSize} • {it.quantity} ex.</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleReorder(order)}
                      className="text-xs text-[#595246] hover:text-[#191714] flex items-center gap-1 font-medium"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#8C6B1C]" />
                      <span>Commander à nouveau ces articles</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

