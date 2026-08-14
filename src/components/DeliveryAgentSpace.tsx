import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { 
  Truck, 
  QrCode, 
  Camera, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  AlertCircle, 
  Navigation, 
  FileText, 
  Sparkles, 
  Clock, 
  Search,
  Check,
  RotateCcw,
  Wifi,
  WifiOff,
  KeyRound,
  LogOut,
  UserCheck,
  Phone,
  Shield,
  ArrowRight
} from 'lucide-react';

export const DeliveryAgentSpace: React.FC = () => {
  const { 
    orders, 
    verifyAndCompleteDelivery, 
    formatPrice,
    isOfflineMode,
    setIsOfflineMode,
    settings,
    drivers,
    currentDriver,
    isDriverAuthenticated,
    verifyDriverLogin,
    logoutDriver
  } = useStore();

  // Login local states
  const [driverPhoneInput, setDriverPhoneInput] = useState('0829910011');
  const [driverPinInput, setDriverPinInput] = useState('7788');
  const [loginError, setLoginError] = useState('');

  // Scanning & delivery states
  const [scanInput, setScanInput] = useState('');
  const [signatureName, setSignatureName] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [scanResult, setScanResult] = useState<{ success: boolean; order?: Order; message: string } | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedDriverZone, setSelectedDriverZone] = useState('Gombe - Lingwala - Barumbu');

  const pendingDeliveries = orders.filter(o => o.status === 'in_transit' || o.status === 'in_preparation');
  const completedDeliveries = orders.filter(o => o.status === 'delivered');

  const handleDriverLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const res = verifyDriverLogin(driverPhoneInput, driverPinInput);
    if (!res.success) {
      setLoginError(res.message);
    }
  };

  const handleVerifyScan = (codeToVerify?: string) => {
    const code = codeToVerify || scanInput;
    if (!code.trim()) return;

    const result = verifyAndCompleteDelivery(code, {
      signature: signatureName || 'Signature Client Validée sur Scanner',
      notes: deliveryNotes || `Colis remis par le livreur ${currentDriver?.name || 'Express'}`
    });

    setScanResult(result);
    if (result.success) {
      setScanInput('');
      setSignatureName('');
      setDeliveryNotes('');
      setIsCameraActive(false);
    }
  };

  // DRIVER LOGIN GATE
  if (!isDriverAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 space-y-6 animate-in fade-in duration-300">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#191714] text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg">
            <Truck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#191714]">
            Espace Livreur Express
          </h1>
          <p className="text-xs text-[#7A7162] max-w-sm mx-auto">
            Accès sécurisé réservé aux coursiers officiels Blanche Élégance. La connexion s'effectue avec votre numéro et le <strong>code PIN attribué par le Gérant</strong>.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D6] shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F0EBE0] text-xs font-serif font-bold text-[#8C6B1C] uppercase tracking-wider">
            <KeyRound className="w-4 h-4 text-[#D4AF37]" />
            <span>Authentification par PIN Coursier</span>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleDriverLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-serif font-bold text-[#191714] uppercase tracking-wider mb-2">
                Numéro de Téléphone Livreur
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8070]" />
                <input
                  type="tel"
                  value={driverPhoneInput}
                  onChange={(e) => setDriverPhoneInput(e.target.value)}
                  placeholder="ex: 0829910011"
                  className="w-full pl-10 pr-4 py-3 bg-[#FCFAF7] border border-[#D8CEBE] rounded-xl text-sm font-mono text-[#191714] placeholder:text-[#A89F91] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-[#191714] uppercase tracking-wider mb-2">
                Code PIN Confidentiel (Généré par le Gérant)
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8070]" />
                <input
                  type="password"
                  maxLength={6}
                  value={driverPinInput}
                  onChange={(e) => setDriverPinInput(e.target.value)}
                  placeholder="PIN à 4 chiffres"
                  className="w-full pl-10 pr-4 py-3 bg-[#FCFAF7] border border-[#D8CEBE] rounded-xl text-center text-lg tracking-[0.5em] font-mono font-bold text-[#191714] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  required
                />
              </div>
              <p className="text-[10px] text-[#8C8070] mt-1">
                Le Gérant peut modifier ou régénérer votre PIN dans ses paramètres.
              </p>
            </div>

            {/* Quick courier presets */}
            <div className="space-y-2 pt-2 border-t border-[#F0EBE0]">
              <div className="text-[10px] font-serif uppercase tracking-widest text-[#8C8070] font-bold">
                Livreurs Autorisés (Sélection Rapide) :
              </div>
              <div className="space-y-1.5 text-xs">
                {drivers.map((drv) => (
                  <button
                    key={drv.id}
                    type="button"
                    onClick={() => {
                      setDriverPhoneInput(drv.phone);
                      setDriverPinInput(drv.pinCode);
                    }}
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E0D7C4] hover:border-[#D4AF37] text-left transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-serif font-bold text-xs text-[#191714] group-hover:text-[#8C6B1C]">
                        {drv.name} ({drv.zone})
                      </div>
                      <div className="text-[10px] text-[#7A7162] font-mono">
                        Tél: {drv.phone} • <span className="text-[#8C6B1C] font-bold">PIN: {drv.pinCode}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8C6B1C] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#191714] text-[#D4AF37] hover:bg-stone-800 rounded-xl font-serif font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Ouvrir le Terminal Scanner</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DRIVER CONSOLE
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#171A21] via-[#1E232F] to-[#171A21] text-white rounded-3xl p-6 sm:p-8 border border-blue-900/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="w-16 h-16 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-2xl shadow-lg shrink-0">
            <Truck className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] text-blue-400 font-mono uppercase tracking-widest font-bold">
              <Sparkles className="w-3 h-3" /> Terminal Coursier Officiel Blanche Élégance
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {currentDriver?.name || 'Coursier Express'}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-stone-300 mt-1">
              <span className="font-mono text-blue-300">Zone : {currentDriver?.zone || 'Kinshasa'}</span>
              <span>•</span>
              <span className="font-mono">Tél : {currentDriver?.phone}</span>
              <span>•</span>
              <span className="bg-blue-900/50 text-blue-200 px-2 py-0.5 rounded-full text-[10px] font-mono">
                PIN Actif : {currentDriver?.pinCode}
              </span>
            </div>
          </div>
        </div>

        {/* Offline sync & Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10">
            <div className="text-right">
              <div className="text-[10px] text-stone-400 uppercase tracking-wider">État Réseau :</div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5 justify-end">
                {isOfflineMode ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-amber-400">Hors-Ligne (Scan Local)</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">En Ligne Synchro</span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Basculer
            </button>
          </div>

          <button
            onClick={logoutDriver}
            className="p-3 bg-white/10 hover:bg-rose-900/60 border border-white/20 hover:border-rose-400/50 rounded-2xl text-xs font-serif text-white hover:text-rose-200 transition-colors flex items-center gap-1.5"
            title="Déconnexion livreur"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Quitter</span>
          </button>
        </div>
      </div>

      {/* Grid: Scanner Module (Left) & Active Deliveries & Tour Optimization (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SCANNER MODULE (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D5] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#A37B24]" />
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Scanner de Colis & Vérification
                </h3>
              </div>
              <span className="text-[10px] bg-[#D4AF37]/15 text-[#8C6B1C] font-bold px-2 py-0.5 rounded-full uppercase">
                Caméra / Code PIN
              </span>
            </div>

            {/* Camera Viewfinder Simulator */}
            <div className="relative aspect-square max-h-64 w-full bg-slate-950 rounded-2xl overflow-hidden border-2 border-dashed border-stone-700 flex flex-col items-center justify-center p-4 text-center text-white">
              {isCameraActive ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  {/* Scanner laser beam animation */}
                  <div className="absolute inset-x-4 h-0.5 bg-red-500 shadow-[0_0_12px_#ef4444] animate-bounce"></div>
                  <div className="w-44 h-44 border-2 border-emerald-400 rounded-xl relative flex items-center justify-center">
                    <div className="text-[10px] text-emerald-400 font-mono animate-pulse">Visez le QR Code client...</div>
                  </div>
                  <button
                    onClick={() => {
                      setIsCameraActive(false);
                      handleVerifyScan('BE-2026-8891');
                    }}
                    className="absolute bottom-2 px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-md"
                  >
                    Simuler Scan Réussi (BE-2026-8891)
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Camera className="w-10 h-10 text-[#D4AF37] mx-auto stroke-[1.5]" />
                  <div>
                    <div className="font-serif font-bold text-sm text-white">Scanner Optique Prêt</div>
                    <div className="text-[11px] text-stone-400 max-w-xs mt-1">
                      Activez la caméra pour scanner le QR Code sur le téléphone du client ou saisissez le code ci-dessous.
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCameraActive(true)}
                    className="px-4 py-2 bg-[#D4AF37] text-stone-950 hover:bg-[#E5C483] rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition-all shadow-md flex items-center gap-1.5 mx-auto"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Démarrer le Scanner Caméra</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Test Presets */}
            <div className="space-y-2">
              <div className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">
                Boutons de Scan Rapide pour Test :
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    setScanInput('BE-2026-8891');
                    handleVerifyScan('BE-2026-8891');
                  }}
                  className="p-2 bg-stone-50 hover:bg-[#1C1A17] hover:text-[#D4AF37] border border-stone-200 rounded-xl text-left transition-colors"
                >
                  <div className="font-mono font-bold">BE-2026-8891</div>
                  <div className="text-[10px] text-stone-400">Mireille K. (PIN: 7729)</div>
                </button>

                <button
                  onClick={() => {
                    setScanInput('BE-2026-8890');
                    handleVerifyScan('BE-2026-8890');
                  }}
                  className="p-2 bg-stone-50 hover:bg-[#1C1A17] hover:text-[#D4AF37] border border-stone-200 rounded-xl text-left transition-colors"
                >
                  <div className="font-mono font-bold">BE-2026-8890</div>
                  <div className="text-[10px] text-stone-400">Grace M. (PIN: 4491)</div>
                </button>
              </div>
            </div>

            {/* Manual Entry Form */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <div>
                <label className="text-[11px] text-stone-600 block mb-1 font-semibold">
                  Saisie Manuelle (N° Commande, Code PIN ou Données QR) :
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    placeholder="ex: BE-2026-8891 ou PIN 7729"
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    onClick={() => handleVerifyScan()}
                    className="px-4 py-2 bg-[#1C1A17] text-white hover:bg-stone-800 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition-all shadow-xs"
                  >
                    Vérifier
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-stone-600 block mb-1 font-semibold">
                  Nom / Signature du Destinataire :
                </label>
                <input
                  type="text"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="ex: Mireille Kankolongo"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* Result alert */}
            {scanResult && (
              <div className={`p-4 rounded-2xl border text-xs animate-in fade-in space-y-2 ${
                scanResult.success 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <div className="flex items-center gap-2 font-bold font-serif text-sm">
                  {scanResult.success ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-amber-600" />}
                  <span>{scanResult.success ? 'Colis Vérifié & Livré !' : 'Notification de Scan'}</span>
                </div>
                <p className="leading-relaxed">{scanResult.message}</p>
                {scanResult.order && (
                  <div className="p-2 bg-white/70 rounded-lg text-[11px] space-y-1">
                    <div><strong>Client :</strong> {scanResult.order.customer.name} ({scanResult.order.customer.phone})</div>
                    <div><strong>Total Réglé :</strong> {formatPrice(scanResult.order.totalAmount)} (Moyen: {scanResult.order.paymentMethod.toUpperCase()})</div>
                    <div><strong>Adresse :</strong> {scanResult.order.customer.address}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* TOUR OPTIMIZER & ACTIVE DELIVERIES (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Deliveries List */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D5] shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Tournée de Livraison en Cours ({pendingDeliveries.length} colis)
                </h3>
                <p className="text-xs text-stone-500">Trajets optimisés par quartier pour réduire les délais</p>
              </div>

              {/* Zone Filter */}
              <select
                value={selectedDriverZone}
                onChange={(e) => setSelectedDriverZone(e.target.value)}
                className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 font-medium text-stone-800"
              >
                <option>Gombe - Lingwala - Barumbu</option>
                <option>Ngaliema - Mont Fleury</option>
                <option>Limete - Lemba - Bandal</option>
              </select>
            </div>

            {pendingDeliveries.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <div className="font-serif font-bold text-sm text-stone-800">Toutes les livraisons sont terminées !</div>
                <p className="text-xs text-stone-500">Aucun colis en attente pour cette zone.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {pendingDeliveries.map((order, idx) => (
                  <div
                    key={order.id}
                    className="p-4 bg-[#FAF8F5] border border-[#E5DFD4] hover:border-[#D4AF37] rounded-2xl transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#1C1A17] text-[#D4AF37] font-bold text-xs flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-serif font-bold text-sm text-stone-950">
                            {order.customer.name}
                          </div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#A37B24]" />
                            <span>{order.customer.address}, {order.customer.city}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono text-xs font-bold text-stone-900">{order.orderNumber}</span>
                        <div className="text-[10px] text-stone-500">{formatPrice(order.totalAmount)}</div>
                      </div>
                    </div>

                    {order.customer.notes && (
                      <div className="text-[11px] bg-white p-2 rounded-lg border border-stone-200 text-stone-600 italic">
                        "{order.customer.notes}"
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <a
                        href={`tel:${order.customer.phone}`}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{order.customer.phone}</span>
                      </a>

                      <button
                        onClick={() => handleVerifyScan(order.orderNumber)}
                        className="px-3.5 py-1.5 bg-[#1C1A17] text-[#D4AF37] hover:bg-stone-800 rounded-lg font-serif uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Valider Remise</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recently Delivered Log */}
          {completedDeliveries.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-sm space-y-3">
              <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Colis Livrés Aujourd’hui ({completedDeliveries.length})</span>
              </h4>

              <div className="space-y-2 text-xs">
                {completedDeliveries.slice(0, 4).map((o) => (
                  <div key={o.id} className="flex items-center justify-between p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <div>
                      <span className="font-mono font-bold text-stone-900">{o.orderNumber}</span>
                      <span className="text-stone-500 ml-2">{o.customer.name}</span>
                    </div>
                    <span className="text-[10px] text-emerald-800 font-medium">Remis avec succès • {o.deliveredAt || '15:40'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

