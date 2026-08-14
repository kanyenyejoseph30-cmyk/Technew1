import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  MapPin, 
  User, 
  Truck, 
  Lock, 
  Bell, 
  Sparkles, 
  Wifi, 
  WifiOff, 
  RefreshCw,
  Search,
  CheckCircle2,
  PhoneCall,
  ChevronDown,
  KeyRound,
  ShieldAlert,
  Layers
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const {
    activeView,
    setActiveView,
    cartTotalCount,
    setIsCartOpen,
    currentCurrency,
    setCurrentCurrency,
    notifications,
    markNotificationRead,
    isOfflineMode,
    setIsOfflineMode,
    pendingOfflineSyncCount,
    syncOfflineData,
    settings,
    isAdminAuthenticated,
    isCustomerAuthenticated,
    isDriverAuthenticated,
    currentDriver,
    currentCustomerPhone
  } = useStore();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isEspacesDropdownOpen, setIsEspacesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsEspacesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAnySpaceActive = activeView === 'client' || activeView === 'courier' || activeView === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-[#EAE3D6] shadow-xs">
      {/* Top luxury announcement bar */}
      <div className="bg-[#191714] text-[#F3EAD8] text-xs py-1.5 px-4 font-serif tracking-widest text-center flex items-center justify-between">
        <div className="hidden md:flex items-center gap-3 text-[11px] text-[#D8C49E]">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Maison Haute Couture Kinshasa
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-sans">
            <PhoneCall className="w-3 h-3 text-[#D4AF37]" /> Paiement eMoney : {settings.merchantPhone}
          </span>
        </div>

        <div className="mx-auto md:mx-0 text-center tracking-normal font-sans text-[11px] flex items-center justify-center gap-2">
          <span className="font-serif italic text-[#D4AF37]">Blanche Élégance</span>
          <span>— Suivi de Colis par QR Code Unique & Expédition Express</span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          {/* Offline simulator switch */}
          <button
            onClick={() => {
              if (isOfflineMode && pendingOfflineSyncCount > 0) {
                syncOfflineData();
              } else {
                setIsOfflineMode(!isOfflineMode);
              }
            }}
            className={`px-2 py-0.5 rounded-full text-[10px] font-sans flex items-center gap-1 transition-all ${
              isOfflineMode 
                ? 'bg-amber-600/90 text-white animate-pulse' 
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
            title="Simulateur mode hors-ligne"
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-2.5 h-2.5" />
                <span>Hors-Ligne {pendingOfflineSyncCount > 0 ? `(${pendingOfflineSyncCount} à synchro)` : ''}</span>
              </>
            ) : (
              <>
                <Wifi className="w-2.5 h-2.5 text-emerald-400" />
                <span>En Ligne (Synchro Active)</span>
              </>
            )}
          </button>

          {/* Currency switch */}
          <div className="flex items-center bg-stone-800 rounded-md p-0.5 text-[10px] font-sans font-medium text-stone-300">
            {(['USD', 'CDF', 'EUR'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrentCurrency(curr)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  currentCurrency === curr ? 'bg-[#D4AF37] text-stone-950 font-bold' : 'hover:text-white'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setActiveView('catalog')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#191714] to-[#363028] flex items-center justify-center border border-[#D4AF37]/60 shadow-md group-hover:border-[#D4AF37] transition-all">
              <span className="font-serif text-[#D4AF37] font-bold text-xl tracking-tighter">BÉ</span>
            </div>
            <div>
              <div className="font-serif tracking-[0.2em] text-lg sm:text-xl font-bold text-[#191714] uppercase leading-none">
                Blanche Élégance
              </div>
              <div className="text-[10px] tracking-[0.3em] text-[#8C8070] uppercase font-sans mt-0.5">
                Haute Couture & Prêt-à-Porter
              </div>
            </div>
          </div>

          {/* Desktop Navigation Menu Links as requested */}
          <nav className="hidden lg:flex items-center space-x-2 font-sans text-xs uppercase tracking-wider font-semibold">
            {/* 1. Collections & Catalogue */}
            <button
              onClick={() => {
                setActiveView('catalog');
                setIsEspacesDropdownOpen(false);
              }}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeView === 'catalog'
                  ? 'text-[#191714] bg-[#EAE3D6] font-bold shadow-xs border border-[#D8CEBE]'
                  : 'text-[#595246] hover:text-[#191714] hover:bg-[#F2ECE1]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#A37B24]" />
              <span>Collections & Catalogue</span>
            </button>

            {/* 2. Où est votre Commande Blanche Élégance ? */}
            <button
              onClick={() => {
                setActiveView('tracking');
                setIsEspacesDropdownOpen(false);
              }}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeView === 'tracking'
                  ? 'text-[#191714] bg-[#EAE3D6] font-bold shadow-xs border border-[#D8CEBE]'
                  : 'text-[#595246] hover:text-[#191714] hover:bg-[#F2ECE1]'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#A37B24]" />
              <span>Où est votre Commande Blanche Élégance ?</span>
            </button>

            {/* 3. Connexions & Espaces Dédiés (Dropdown) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsEspacesDropdownOpen(!isEspacesDropdownOpen)}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 border ${
                  isAnySpaceActive
                    ? 'bg-[#191714] text-[#D4AF37] border-[#191714] shadow-sm font-bold'
                    : 'bg-white/80 border-[#D8CEBE] text-[#4A4337] hover:bg-[#F2ECE1]'
                }`}
              >
                <KeyRound className="w-4 h-4 text-[#D4AF37]" />
                <span>Connexions & Espaces Dédiés</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isEspacesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isEspacesDropdownOpen && (
                <div className="absolute right-0 mt-2 w-84 bg-[#FCFAF7] border border-[#EAE3D6] rounded-2xl shadow-2xl z-50 p-2.5 animate-in fade-in zoom-in-95 space-y-1.5">
                  <div className="px-3 py-2 text-[10px] font-serif uppercase tracking-widest text-[#8C8070] font-bold border-b border-[#F0EBE0]">
                    Accès Sécurisés & Rôles
                  </div>

                  {/* Espace Client & Historique */}
                  <button
                    onClick={() => {
                      setActiveView('client');
                      setIsEspacesDropdownOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${
                      activeView === 'client'
                        ? 'bg-[#EAE3D6] text-[#191714] font-bold border border-[#D8CEBE]'
                        : 'hover:bg-white text-[#3D372E]'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#8C6B1C] mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xs">Espace Client & Historique</span>
                        {isCustomerAuthenticated ? (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                            Connecté
                          </span>
                        ) : (
                          <span className="text-[9px] bg-stone-200 text-stone-700 font-medium px-1.5 py-0.5 rounded-full">
                            SMS OTP
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#7A7162] font-normal normal-case mt-0.5">
                        Commandes privées, factures & pass QR sécurisé
                      </p>
                    </div>
                  </button>

                  {/* Espace Livreur Express (Scanner QR) */}
                  <button
                    onClick={() => {
                      setActiveView('courier');
                      setIsEspacesDropdownOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${
                      activeView === 'courier'
                        ? 'bg-[#EAE3D6] text-[#191714] font-bold border border-[#D8CEBE]'
                        : 'hover:bg-white text-[#3D372E]'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-800 mt-0.5">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xs">Espace Livreur Express (Scanner QR)</span>
                        {isDriverAuthenticated ? (
                          <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded-full">
                            {currentDriver?.name.split(' ')[0] || 'Connecté'}
                          </span>
                        ) : (
                          <span className="text-[9px] bg-blue-50 text-blue-700 font-medium px-1.5 py-0.5 rounded-full">
                            Code PIN Gérant
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#7A7162] font-normal normal-case mt-0.5">
                        Scan des QR codes colis & validation de remise
                      </p>
                    </div>
                  </button>

                  {/* Espace Gérant (Accès 0991018186) */}
                  <button
                    onClick={() => {
                      setActiveView('admin');
                      setIsEspacesDropdownOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${
                      activeView === 'admin'
                        ? 'bg-[#191714] text-[#D4AF37] font-bold'
                        : 'hover:bg-white text-[#3D372E]'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-stone-900 text-[#D4AF37] mt-0.5">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xs">Espace Gérant (Accès 0991018186)</span>
                        {isAdminAuthenticated ? (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                            Déverrouillé
                          </span>
                        ) : (
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">
                            0991018186
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#7A7162] font-normal normal-case mt-0.5">
                        Stocks, gestion livreurs, ventes & paramètres
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Action icons (Notifications & Cart) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2.5 rounded-full text-[#4A4337] hover:text-[#191714] hover:bg-[#EAE3D6] transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#B83A2A] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FCFAF7] border border-[#EAE3D6] rounded-2xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE0] mb-3">
                    <div className="font-serif font-bold text-sm text-[#191714]">
                      Notifications & Alertes SMS
                    </div>
                    <span className="text-[11px] text-[#8C8070]">
                      {notifications.length} message(s)
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-stone-500 text-center py-4">Aucune notification pour le moment.</p>
                    ) : (
                      notifications.slice(0, 8).map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-2.5 rounded-xl text-xs transition-colors cursor-pointer border ${
                            notif.read
                              ? 'bg-stone-50/70 border-stone-100 text-stone-600'
                              : 'bg-white border-[#E5DAC8] text-stone-900 font-medium shadow-2xs'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-[#A37B24] flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              {notif.title}
                            </span>
                            <span className="text-[10px] text-stone-400">{notif.timestamp}</span>
                          </div>
                          <p className="text-[11px] leading-relaxed">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#191714] text-white hover:bg-stone-800 transition-all rounded-full px-4 py-2.5 flex items-center gap-2.5 shadow-md hover:shadow-lg group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-stone-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-serif tracking-wider font-semibold uppercase hidden sm:inline">
                Panier
              </span>
            </button>
          </div>

        </div>

        {/* Mobile menu navigation strip with clean layout */}
        <div className="lg:hidden flex flex-col py-2.5 border-t border-[#EAE3D6] gap-2 text-xs font-medium">
          <div className="flex items-center justify-between overflow-x-auto gap-2 no-scrollbar">
            <button
              onClick={() => setActiveView('catalog')}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
                activeView === 'catalog' ? 'bg-[#191714] text-white font-bold' : 'bg-[#EAE3D6] text-[#4A4337]'
              }`}
            >
              👗 Collections & Catalogue
            </button>
            <button
              onClick={() => setActiveView('tracking')}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
                activeView === 'tracking' ? 'bg-[#191714] text-white font-bold' : 'bg-[#EAE3D6] text-[#4A4337]'
              }`}
            >
              📍 Où est votre Commande ?
            </button>
          </div>

          <div className="flex items-center justify-between overflow-x-auto gap-2 no-scrollbar pt-1 border-t border-[#F0EBE0]">
            <span className="text-[10px] font-serif uppercase tracking-widest text-[#8C8070] shrink-0 font-bold">
              Espaces :
            </span>
            <button
              onClick={() => setActiveView('client')}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
                activeView === 'client' ? 'bg-[#191714] text-white font-bold' : 'bg-[#EAE3D6] text-[#4A4337]'
              }`}
            >
              👤 Espace Client {isCustomerAuthenticated ? '✓' : '(OTP)'}
            </button>
            <button
              onClick={() => setActiveView('courier')}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
                activeView === 'courier' ? 'bg-[#191714] text-white font-bold' : 'bg-[#EAE3D6] text-[#4A4337]'
              }`}
            >
              🛵 Espace Livreur {isDriverAuthenticated ? '✓' : '(PIN)'}
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap border ${
                activeView === 'admin' 
                  ? 'bg-[#D4AF37] text-stone-950 font-bold border-[#C5A059]' 
                  : 'bg-stone-900 text-[#D4AF37] border-stone-800'
              }`}
            >
              🔐 Gérant (0991018186)
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

