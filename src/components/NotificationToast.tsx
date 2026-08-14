import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, X, Truck, Package, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { activeToast, dismissActiveToast, setActiveView, setQuickTrackingOrderNumber } = useStore();

  if (!activeToast) return null;

  const getIcon = () => {
    switch (activeToast.type) {
      case 'delivery':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'order':
        return <Package className="w-5 h-5 text-[#D4AF37]" />;
      case 'stock':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'payment':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <div className="fixed top-24 right-4 z-50 max-w-sm sm:max-w-md w-full animate-in slide-in-from-top-4 duration-300">
      <div className="bg-[#1C1A17] text-white p-4 rounded-2xl shadow-2xl border border-[#D4AF37]/40 flex items-start gap-3.5 backdrop-blur-md">
        <div className="p-2 rounded-xl bg-white/10 shrink-0">
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-bold text-xs text-[#E5C483] uppercase tracking-wider">
              {activeToast.title}
            </h4>
            <span className="text-[10px] text-stone-400 font-mono">{activeToast.timestamp}</span>
          </div>
          <p className="text-xs text-stone-200 mt-1 leading-relaxed">
            {activeToast.message}
          </p>

          {activeToast.orderId && (
            <button
              onClick={() => {
                dismissActiveToast();
                setActiveView('tracking');
              }}
              className="mt-2 text-[11px] text-[#D4AF37] underline hover:text-white font-serif uppercase tracking-wider font-bold block"
            >
              Voir le suivi en direct →
            </button>
          )}
        </div>

        <button
          onClick={dismissActiveToast}
          className="p-1 rounded-lg hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
