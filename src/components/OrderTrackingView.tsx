import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Package, 
  QrCode, 
  PhoneCall, 
  ShieldCheck, 
  Download, 
  Share2, 
  Navigation,
  Sparkles,
  AlertCircle,
  Store,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { 
    orders, 
    quickTrackingOrderNumber, 
    setQuickTrackingOrderNumber, 
    formatPrice,
    settings,
    updateOrderStatus
  } = useStore();

  const [searchQuery, setSearchQuery] = useState(quickTrackingOrderNumber || 'BE-2026-8891');
  const [activeOrder, setActiveOrder] = useState(() => {
    return orders.find(o => o.orderNumber === (quickTrackingOrderNumber || 'BE-2026-8891')) || orders[0];
  });

  useEffect(() => {
    if (quickTrackingOrderNumber) {
      const match = orders.find(o => o.orderNumber.toUpperCase() === quickTrackingOrderNumber.toUpperCase());
      if (match) {
        setActiveOrder(match);
        setSearchQuery(quickTrackingOrderNumber);
      }
    }
  }, [quickTrackingOrderNumber, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchQuery.trim().toLowerCase();
    const found = orders.find(o => 
      o.orderNumber.toLowerCase() === clean ||
      o.customer.phone.toLowerCase().includes(clean) ||
      o.securityPin.toLowerCase() === clean ||
      o.id.toLowerCase() === clean
    );

    if (found) {
      setActiveOrder(found);
    } else {
      alert(`Aucune commande trouvée pour "${searchQuery}". Essayez avec le numéro démo BE-2026-8891 ou le téléphone 0812345678.`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_preparation':
        return <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Package className="w-3.5 h-3.5" /> En Préparation en Atelier</span>;
      case 'in_transit':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Truck className="w-3.5 h-3.5 animate-bounce" /> En Cours de Livraison</span>;
      case 'ready_for_pickup':
        return <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Store className="w-3.5 h-3.5" /> Prêt en Boutique Gombe</span>;
      case 'delivered':
        return <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Colis Livré & QR Vérifié</span>;
      default:
        return <span className="bg-stone-100 text-stone-800 px-3 py-1 rounded-full text-xs font-semibold">En Traitement</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Title & Lookup bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#8C7A58] font-bold mb-1">
              <QrCode className="w-4 h-4 text-[#C5A059]" />
              <span>Système de Traçabilité Haute Sécurité</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-950">
              Où est votre Commande Blanche Élégance ?
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Suivi logistique en direct, géolocalisation et QR Code d’authentification pour la remise de vos pièces de couture.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="N° Commande (ex: BE-2026-8891) ou Tél..."
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#1C1A17] text-white hover:bg-stone-800 rounded-xl text-xs font-serif uppercase tracking-wider font-semibold transition-all shadow-xs"
            >
              Rechercher
            </button>
          </form>
        </div>

        {/* Quick order picker pills if multiple */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-500 font-medium whitespace-nowrap">Commandes récentes :</span>
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setActiveOrder(o);
                setSearchQuery(o.orderNumber);
              }}
              className={`px-3 py-1 rounded-full border transition-all whitespace-nowrap ${
                activeOrder?.id === o.id
                  ? 'bg-[#1C1A17] text-[#D4AF37] border-[#1C1A17] font-bold'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
              }`}
            >
              {o.orderNumber} ({o.customer.name.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {activeOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tracking Details (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Status Card & Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <span className="text-[11px] text-stone-400 font-mono block">COMMANDE OFFICIELLE</span>
                  <h2 className="text-xl font-serif font-bold text-stone-900">{activeOrder.orderNumber}</h2>
                  <span className="text-xs text-stone-500">
                    Enregistrée le {new Date(activeOrder.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  {getStatusBadge(activeOrder.status)}
                  <span className="text-[11px] text-stone-500">
                    Mode : {activeOrder.deliveryType === 'delivery' ? 'Livraison Express à Domicile' : 'Retrait en Boutique'}
                  </span>
                </div>
              </div>

              {/* Interactive Live Timeline */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 font-serif flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#A37B24]" />
                  <span>Historique des Étapes en Temps Réel</span>
                </h3>

                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E2D5]">
                  {activeOrder.trackingSteps.map((step, idx) => {
                    const isCompleted = step.isCompleted;
                    const isCurrent = step.isCurrent;

                    return (
                      <div key={step.id || idx} className="relative group">
                        {/* Dot indicator */}
                        <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                          isCompleted
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : isCurrent
                              ? 'bg-[#D4AF37] border-[#1C1A17] ring-4 ring-[#D4AF37]/20 animate-pulse'
                              : 'bg-white border-stone-300'
                        }`}>
                          {isCompleted && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>

                        <div className={`p-3.5 rounded-xl border transition-all ${
                          isCurrent 
                            ? 'bg-[#FCF9F2] border-[#D4AF37]/60 shadow-xs' 
                            : isCompleted 
                              ? 'bg-stone-50/50 border-stone-100' 
                              : 'bg-white border-transparent opacity-60'
                        }`}>
                          <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                            <span className={`text-xs font-bold ${isCurrent ? 'text-stone-950 font-serif' : 'text-stone-800'}`}>
                              {step.title}
                            </span>
                            <span className="text-[10px] font-mono text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                              {step.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {step.description}
                          </p>
                          {step.location && (
                            <div className="flex items-center gap-1 text-[10px] text-stone-500 mt-1.5">
                              <MapPin className="w-3 h-3 text-[#A37B24]" />
                              <span>{step.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Courier & Delivery Driver Info */}
              {activeOrder.deliveryType === 'delivery' && activeOrder.assignedCourierName && (
                <div className="bg-[#FAF7F0] border border-[#E0D7C4] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-center sm:text-left">
                    <div className="w-11 h-11 rounded-full bg-[#1C1A17] flex items-center justify-center text-[#D4AF37] shrink-0 font-bold font-serif">
                      JK
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Livreur Express Assigné</div>
                      <div className="font-serif font-bold text-sm text-stone-900">{activeOrder.assignedCourierName}</div>
                      <div className="text-xs text-stone-500">Véhicule : Scooter Express Sécurisé Blanche Élégance</div>
                    </div>
                  </div>

                  <a
                    href={`tel:${activeOrder.courierPhone || '0812345678'}`}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Appeler le Livreur</span>
                  </a>
                </div>
              )}

              {/* Items in this order */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 font-serif">
                  Articles Confectionnés ({activeOrder.items.length})
                </h4>
                <div className="space-y-2">
                  {activeOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-14 object-cover rounded-lg bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-serif font-bold text-stone-900 truncate">{item.product.name}</div>
                        <div className="text-[11px] text-stone-500">
                          Taille: <strong>{item.selectedSize}</strong> • Qté: {item.quantity} • Couleur: {item.selectedColor.name}
                        </div>
                      </div>
                      <div className="text-xs font-serif font-bold text-[#8C6B1C]">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Simulated Live Route / Kinshasa GPS Map */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#A37B24]" />
                  <h3 className="font-serif font-bold text-sm text-stone-900">
                    Trajet Logistique & Position du Colis (Kinshasa)
                  </h3>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Signal GPS Actif
                </span>
              </div>

              {/* Simulated Map Graphic */}
              <div className="relative w-full h-52 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
                {/* Background grid lines simulating streets */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className="absolute inset-0 opacity-15">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10%" y1="30%" x2="90%" y2="70%" stroke="#4ade80" strokeWidth="3" strokeDasharray="6 6" />
                    <line x1="20%" y1="80%" x2="80%" y2="20%" stroke="#60a5fa" strokeWidth="2" />
                    <circle cx="20%" cy="35%" r="8" fill="#D4AF37" />
                    <circle cx="85%" cy="68%" r="8" fill="#ef4444" />
                  </svg>
                </div>

                <div className="relative z-10 text-center space-y-2">
                  <div className="inline-flex items-center gap-2 bg-stone-900/90 text-white px-3.5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-lg text-xs font-serif">
                    <Truck className="w-4 h-4 text-[#D4AF37] animate-bounce" />
                    <span>Livreur : Boulevard du 30 Juin → {activeOrder.customer.city}</span>
                  </div>
                  <p className="text-[11px] text-stone-300">
                    Temps estimé d’arrivée : <strong className="text-[#E5C483]">12 à 20 minutes</strong>
                  </p>
                </div>

                <div className="absolute bottom-2 right-2 text-[9px] text-stone-500 font-mono">
                  GPS: -4.3217° S, 15.3126° E (Kinshasa RDC)
                </div>
              </div>
            </div>

          </div>

          {/* QR Code & Security Pass (1 Column) */}
          <div className="space-y-6">
            
            {/* The Unique QR Code Ticket */}
            <div className="bg-gradient-to-b from-[#1C1A17] to-[#2B2721] text-white rounded-3xl p-6 sm:p-7 border border-[#D4AF37]/40 shadow-2xl space-y-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-serif uppercase tracking-widest font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Pass Sécurisé Unique</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white">QR Code de Retrait</h3>
                <p className="text-xs text-stone-300 mt-1">
                  Présentez ce QR Code au livreur ou à l’accueil de notre boutique pour réceptionner vos vêtements.
                </p>
              </div>

              {/* QR Code Graphic Box */}
              <div className="bg-white p-5 rounded-2xl inline-block shadow-xl border-4 border-[#D4AF37]/30 mx-auto">
                <QRCodeSVG
                  value={activeOrder.qrCodeString}
                  size={190}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=80&q=80",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              </div>

              {/* Security PIN code */}
              <div className="bg-white/10 rounded-xl p-3 border border-white/15">
                <div className="text-[10px] text-stone-400 uppercase tracking-widest">Code PIN de Sécurité :</div>
                <div className="text-2xl font-mono font-bold text-[#E5C483] tracking-widest">
                  {activeOrder.securityPin}
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">Destinataire : {activeOrder.customer.name}</div>
              </div>

              {/* Print / Save Ticket */}
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-[#D4AF37] text-stone-950 hover:bg-[#E5C483] rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Imprimer / PDF</span>
                </button>
              </div>
            </div>

            {/* Delivery address and payment summary box */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs space-y-4 text-xs">
              <h4 className="font-serif font-bold text-stone-900 text-sm border-b border-stone-100 pb-2">
                Détails du Paiement & Expédition
              </h4>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Moyen de règlement :</span>
                  <span className="font-bold text-stone-900 uppercase">{activeOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Compte marchand :</span>
                  <span className="font-mono text-stone-900">{settings.merchantPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Réf. Transaction :</span>
                  <span className="font-mono text-stone-900">{activeOrder.paymentReference || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Total payé :</span>
                  <span className="font-serif font-bold text-[#8C6B1C] text-sm">{formatPrice(activeOrder.totalAmount)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-100">
                  <span className="text-stone-500">Adresse :</span>
                  <span className="text-stone-900 text-right max-w-[180px] font-medium">{activeOrder.customer.address}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : null}
    </div>
  );
};
