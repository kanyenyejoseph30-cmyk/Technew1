import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Sparkles, 
  MapPin, 
  PhoneCall, 
  Mail, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  QrCode, 
  Lock 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActiveView } = useStore();

  return (
    <footer className="bg-[#141210] text-[#EDE7DA] border-t border-[#312B23] pt-14 pb-8 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4 Benefits / Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-[#2B251E]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">Livraison Express Gombe</h4>
              <p className="text-stone-400 text-[11px] mt-0.5 leading-relaxed">
                Suivi GPS en temps réel et notification SMS à chaque étape du colis.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">QR Code Unique Sécurisé</h4>
              <p className="text-stone-400 text-[11px] mt-0.5 leading-relaxed">
                Validation numérique inviolable lors de la remise du colis au destinataire.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">eMoney M-Pesa / Orange / Airtel</h4>
              <p className="text-stone-400 text-[11px] mt-0.5 leading-relaxed">
                Paiement direct sur le numéro officiel marchand : <span className="text-[#E5C483] font-mono">{settings.merchantPhone}</span>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">Haute Couture & Soies Rares</h4>
              <p className="text-stone-400 text-[11px] mt-0.5 leading-relaxed">
                Finitions d’exception, crêpe de soie italienne et coupes sur-mesure.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Presentation */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center font-serif text-stone-950 font-bold text-lg shadow-sm">
                BÉ
              </div>
              <span className="font-serif tracking-[0.2em] text-lg font-bold text-white uppercase">
                Blanche Élégance
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Maison de haute couture et prêt-à-porter haut de gamme. Chaque vêtement est une ode à la pureté, au raffinement et à la distinction.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-[#D4AF37]">
              Navigation Express
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => setActiveView('catalog')} className="hover:text-white transition-colors">
                  Collection Robes & Tailleurs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('tracking')} className="hover:text-white transition-colors">
                  Où est votre Commande Blanche Élégance
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('client')} className="hover:text-white transition-colors">
                  Espace Client & Historique d'Achats
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('courier')} className="hover:text-white transition-colors">
                  Espace Livreur Express (Scanner QR)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('admin')} className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#D4AF37]" />
                  <span>Espace Gérant (0991018186)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Boutique Contact & Addresses */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-[#D4AF37]">
              Boutique & Atelier Central
            </h4>
            <div className="space-y-2 text-stone-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{settings.storeAddress}, {settings.storeCity}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-mono">{settings.merchantPhone} / {settings.supportPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{settings.supportEmail}</span>
              </div>
              <div className="text-[11px] text-stone-500 pt-1">
                Ouvert du Lundi au Samedi : 09h00 - 19h30
              </div>
            </div>
          </div>

          {/* Payment Badges & eMoney */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-[#D4AF37]">
              Moyens de Paiement Agréés
            </h4>
            <p className="text-stone-400 text-[11px]">
              Transactions sécurisées sans frais supplémentaires via votre compte Mobile Money :
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 bg-red-950/80 border border-red-800/60 text-red-300 rounded-lg text-[10px] font-bold">
                M-Pesa
              </span>
              <span className="px-2.5 py-1 bg-orange-950/80 border border-orange-800/60 text-orange-300 rounded-lg text-[10px] font-bold">
                Orange Money
              </span>
              <span className="px-2.5 py-1 bg-rose-950/80 border border-rose-800/60 text-rose-300 rounded-lg text-[10px] font-bold">
                Airtel Money
              </span>
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-700 text-stone-300 rounded-lg text-[10px]">
                Visa / MasterCard
              </span>
            </div>
            <div className="text-[10px] text-stone-500 font-mono">
              Marchand Certifié : {settings.merchantPhone}
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#24201A] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Blanche Élégance SARL. Tous droits réservés. Haute Couture & Logistique Sécurisée.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-stone-400 cursor-pointer">Conditions Générales de Vente</span>
            <span>•</span>
            <span className="hover:text-stone-400 cursor-pointer">Politique de Confidentialité</span>
            <span>•</span>
            <span className="text-[#D4AF37] font-semibold">PostgreSQL & Vercel Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
