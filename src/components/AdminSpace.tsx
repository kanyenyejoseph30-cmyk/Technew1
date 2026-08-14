import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory, OrderStatus, DeliveryDriver } from '../types';
import { 
  Lock, 
  Unlock, 
  TrendingUp, 
  DollarSign, 
  Package, 
  ShoppingBag, 
  Plus, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  Upload, 
  Check, 
  PhoneCall, 
  Settings, 
  Download, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Eye, 
  AlertCircle,
  BarChart3,
  Layers,
  FileText,
  Search,
  KeyRound,
  UserPlus,
  Copy,
  CheckCheck,
  Globe,
  Sliders,
  Send,
  Calendar,
  CreditCard,
  Smartphone
} from 'lucide-react';

export const AdminSpace: React.FC = () => {
  const {
    isAdminAuthenticated,
    verifyAdminPhoneAndOtp,
    sendAdminOtp,
    logoutAdmin,
    settings,
    updateSettings,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    formatPrice,
    drivers,
    addDriver,
    updateDriver,
    deleteDriver,
    generateDriverPin
  } = useStore();

  // Auth form state
  const [adminPhone, setAdminPhone] = useState(settings.merchantPhone || '0991018186');
  const [adminOtp, setAdminOtp] = useState('');
  const [authError, setAuthError] = useState('');
  const [otpSentMessage, setOtpSentMessage] = useState('');

  // Active Admin Tab
  const [adminTab, setAdminTab] = useState<'analytics' | 'sales_history' | 'products' | 'orders' | 'settings'>('analytics');

  // Product Editing / Adding State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Robes & Soirée' as ProductCategory,
    price: 150,
    originalPrice: 180,
    description: '',
    material: 'Pure Soie & Satin',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanc Pur / Ivoire', hex: '#FDFBF7' },
      { name: 'Doré Champagne', hex: '#E5C483' }
    ],
    stockPerSize: { 'XS': 3, 'S': 5, 'M': 5, 'L': 4, 'XL': 2 },
    isFeatured: true,
    isNew: true,
    details: ['Couture haute précision', 'Nettoyage à sec uniquement']
  });

  // Settings form
  const [merchantPhoneInput, setMerchantPhoneInput] = useState(settings.merchantPhone);
  const [merchantNameInput, setMerchantNameInput] = useState(settings.merchantName);
  const [exchangeRateInput, setExchangeRateInput] = useState(settings.exchangeRateCDF.toString());
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Sales History Filters
  const [salesSearchQuery, setSalesSearchQuery] = useState('');
  const [salesStatusFilter, setSalesStatusFilter] = useState('all');
  const [salesPaymentFilter, setSalesPaymentFilter] = useState('all');

  // Driver Add Form
  const [isAddingDriver, setIsAddingDriver] = useState(false);
  const [newDriverName, setNewDriverName] = useState('');
  const [newDriverPhone, setNewDriverPhone] = useState('');
  const [newDriverZone, setNewDriverZone] = useState('Gombe - Lingwala');
  const [newDriverPin, setNewDriverPin] = useState(Math.floor(1000 + Math.random() * 9000).toString());
  const [copiedPinDriverId, setCopiedPinDriverId] = useState<string | null>(null);

  // Quick Preset demo login
  const handleQuickDemoLogin = () => {
    setAdminPhone('0991018186');
    setAdminOtp('1818');
    verifyAdminPhoneAndOtp('0991018186', '1818');
  };

  const handleSendOtp = () => {
    setAuthError('');
    const res = sendAdminOtp(adminPhone);
    if (res.success) {
      setOtpSentMessage(res.message);
      setAdminOtp(res.otp); // prefill for frictionless demo
    } else {
      setAuthError(res.message);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = verifyAdminPhoneAndOtp(adminPhone, adminOtp);
    if (!success) {
      setAuthError('Numéro de téléphone ou code OTP incorrect. Le numéro gérant autorisé est 0991018186 (Code OTP SMS: 1818).');
    }
  };

  // Image Upload handler (convert gallery image to Base64 data URL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        if (base64Url) {
          setProductForm(prev => ({
            ...prev,
            images: [base64Url, ...prev.images]
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    if (productToEdit) {
      updateProduct(productToEdit.id, {
        ...productForm,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice)
      });
    } else {
      addProduct({
        ...productForm,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        totalStock: Object.values(productForm.stockPerSize).reduce((a: number, b: number) => a + b, 0)
      });
    }

    setIsEditingProduct(false);
    setProductToEdit(null);
  };

  const openNewProductModal = () => {
    setProductToEdit(null);
    setProductForm({
      name: '',
      category: 'Robes & Soirée',
      price: 175,
      originalPrice: 210,
      description: 'Confection luxueuse réalisée à la main dans nos ateliers Blanche Élégance.',
      material: 'Pure Soie & Satin Duchesse',
      images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Blanc Nacre', hex: '#FDFBF7' },
        { name: 'Or Lumineux', hex: '#D4AF37' }
      ],
      stockPerSize: { 'XS': 2, 'S': 4, 'M': 6, 'L': 3, 'XL': 1 },
      isFeatured: true,
      isNew: true,
      details: ['Tissu noble importé d’Italie', 'Finition liseré or']
    });
    setIsEditingProduct(true);
  };

  const openEditProductModal = (prod: Product) => {
    setProductToEdit(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      description: prod.description,
      material: prod.material,
      images: [...prod.images],
      sizes: [...prod.sizes],
      colors: [...prod.colors],
      stockPerSize: { ...prod.stockPerSize },
      isFeatured: !!prod.isFeatured,
      isNew: !!prod.isNew,
      details: [...prod.details]
    });
    setIsEditingProduct(true);
  };

  const handleCreateDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDriverName.trim() || !newDriverPhone.trim()) return;

    addDriver({
      name: newDriverName.trim(),
      phone: newDriverPhone.trim(),
      zone: newDriverZone,
      activeDeliveries: 0,
      completedToday: 0,
      rating: 5.0,
      pinCode: newDriverPin || Math.floor(1000 + Math.random() * 9000).toString(),
      status: 'active'
    });

    setNewDriverName('');
    setNewDriverPhone('');
    setNewDriverPin(Math.floor(1000 + Math.random() * 9000).toString());
    setIsAddingDriver(false);
  };

  const handleCopyDriverInvite = (driver: DeliveryDriver) => {
    const text = `Bonjour ${driver.name}, voici vos identifiants pour l'Espace Livreur Blanche Élégance :\nNuméro : ${driver.phone}\nCode PIN : ${driver.pinCode}\nZone : ${driver.zone}`;
    navigator.clipboard.writeText(text);
    setCopiedPinDriverId(driver.id);
    setTimeout(() => setCopiedPinDriverId(null), 3000);
  };

  // Export sales CSV
  const handleExportSalesCsv = () => {
    const headers = ["N° Commande", "Date", "Client", "Telephone", "Adresse", "Mode Paiement", "Reference", "Montant USD", "Statut", "PIN Securite"];
    const rows = orders.map(o => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString('fr-FR'),
      `"${o.customer.name}"`,
      o.customer.phone,
      `"${o.customer.address}, ${o.customer.city}"`,
      o.paymentMethod,
      o.paymentReference || 'N/A',
      o.totalAmount,
      o.status,
      o.securityPin
    ]);

    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `blanche_elegance_ventes_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // Filtered Sales
  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(salesSearchQuery.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(salesSearchQuery.toLowerCase()) ||
      o.customer.phone.includes(salesSearchQuery) ||
      (o.paymentReference && o.paymentReference.toLowerCase().includes(salesSearchQuery.toLowerCase()));

    const matchesStatus = salesStatusFilter === 'all' || o.status === salesStatusFilter;
    const matchesPayment = salesPaymentFilter === 'all' || o.paymentMethod === salesPaymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Analytics Calculations
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalSalesCount = orders.length;
  const avgBasket = totalSalesCount > 0 ? totalRevenue / totalSalesCount : 0;
  const totalStockItems = products.reduce((acc, p) => acc + p.totalStock, 0);

  // Payment Breakdown
  const paymentBreakdown = {
    mpesa: orders.filter(o => o.paymentMethod === 'mpesa').reduce((a, b) => a + b.totalAmount, 0),
    orange_money: orders.filter(o => o.paymentMethod === 'orange_money').reduce((a, b) => a + b.totalAmount, 0),
    airtel_money: orders.filter(o => o.paymentMethod === 'airtel_money').reduce((a, b) => a + b.totalAmount, 0),
    card: orders.filter(o => o.paymentMethod === 'card').reduce((a, b) => a + b.totalAmount, 0),
    cash: orders.filter(o => o.paymentMethod === 'cash_delivery').reduce((a, b) => a + b.totalAmount, 0)
  };

  // -------------------------------------------------------------
  // If NOT Authenticated: Show Phone Auth Gate for 0991018186
  // -------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl p-8 border border-[#E8E2D5] shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#1C1A17] text-[#D4AF37] border-2 border-[#D4AF37]/50 mx-auto flex items-center justify-center shadow-lg">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <div className="text-[10px] text-[#A37B24] uppercase tracking-widest font-serif font-bold">
              Portail d’Administration Restreint
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-950 mt-1">
              Espace Gérant Blanche Élégance
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Authentification sécurisée par le numéro de téléphone autorisé (<strong className="font-mono text-stone-800">0991018186</strong>) et code SMS OTP.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs text-left flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {otpSentMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs text-left flex items-start gap-2">
              <Check className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{otpSentMessage}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Numéro Gérant Autorisé :
                </label>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-[11px] text-[#A37B24] hover:text-[#8C6B1C] font-semibold underline"
                >
                  Envoyer SMS OTP
                </button>
              </div>
              <input
                type="tel"
                value={adminPhone}
                onChange={(e) => setAdminPhone(e.target.value)}
                placeholder="0991018186"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono text-stone-950 focus:outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Code Secret SMS OTP (Démo : 1818) :
              </label>
              <input
                type="password"
                value={adminOtp}
                onChange={(e) => setAdminOtp(e.target.value)}
                placeholder="1818"
                maxLength={6}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono text-stone-950 focus:outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1C1A17] text-[#D4AF37] hover:bg-stone-800 rounded-xl font-serif uppercase tracking-wider text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Déverrouiller l’Espace Gérant</span>
            </button>
          </form>

          {/* Instant Demo Helper */}
          <div className="pt-3 border-t border-stone-100">
            <button
              onClick={handleQuickDemoLogin}
              className="w-full py-2 bg-[#FAF7F0] hover:bg-[#F3EFE6] text-stone-700 border border-[#E0D7C4] rounded-xl text-xs font-semibold transition-colors"
            >
              ✨ Connexion Rapide Démo (0991018186 - OTP 1818)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // If Authenticated: Complete Gérant Dashboard
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Admin Navigation Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="w-14 h-14 rounded-2xl bg-[#1C1A17] text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center font-serif font-bold text-2xl shadow-md shrink-0">
            BÉ
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] text-[#A37B24] font-serif uppercase tracking-widest font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Session Gérant Authentifiée • {settings.merchantPhone}
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
              Console de Gestion & Paramètres
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Supervision des ventes, gestion des stocks, expéditions et attribution des codes PIN livreurs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openNewProductModal}
            className="px-4 py-2.5 bg-[#1C1A17] text-[#D4AF37] hover:bg-stone-800 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Vêtement</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-[#EDE6DA] text-xs font-serif uppercase tracking-wider font-bold">
        <button
          onClick={() => setAdminTab('analytics')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'analytics' ? 'bg-[#1C1A17] text-[#D4AF37] shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Dashboard Global</span>
        </button>

        <button
          onClick={() => setAdminTab('sales_history')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'sales_history' ? 'bg-[#1C1A17] text-[#D4AF37] shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Historique des Ventes ({orders.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('products')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'products' ? 'bg-[#1C1A17] text-[#D4AF37] shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Catalogue & Stocks ({products.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('orders')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'orders' ? 'bg-[#1C1A17] text-[#D4AF37] shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Suivi des Commandes</span>
        </button>

        <button
          onClick={() => setAdminTab('settings')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'settings' ? 'bg-[#1C1A17] text-[#D4AF37] shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Paramètres & Gestion Livreurs (PIN)</span>
        </button>
      </div>

      {/* TAB 1: ANALYTICS & DASHBOARD */}
      {adminTab === 'analytics' && (
        <div className="space-y-8">
          {/* Metrics 4-Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="uppercase font-semibold tracking-wider">Chiffre d’Affaires Total</span>
                <DollarSign className="w-4 h-4 text-[#A37B24]" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                {formatPrice(totalRevenue)}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Règlements eMoney & Cartes
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="uppercase font-semibold tracking-wider">Commandes Enregistrées</span>
                <ShoppingBag className="w-4 h-4 text-[#A37B24]" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                {totalSalesCount}
              </div>
              <div className="text-[11px] text-stone-500">Colis tracés par QR & PIN</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="uppercase font-semibold tracking-wider">Panier Moyen</span>
                <Layers className="w-4 h-4 text-[#A37B24]" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                {formatPrice(avgBasket)}
              </div>
              <div className="text-[11px] text-stone-500">Vêtements de haute couture</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="uppercase font-semibold tracking-wider">Stock Global en Rayon</span>
                <Package className="w-4 h-4 text-[#A37B24]" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                {totalStockItems} pièces
              </div>
              <div className="text-[11px] text-amber-700 font-semibold">Synchronisé en temps réel</div>
            </div>
          </div>

          {/* Payment Method Breakdown Bar & Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Payment Methods Chart */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-5">
              <h3 className="font-serif font-bold text-base text-stone-950">
                Répartition des Règlements Mobile Money (N° Marchand : {settings.merchantPhone})
              </h3>

              <div className="space-y-4 text-xs">
                {/* M-Pesa */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-rose-700">M-Pesa (Vodacom)</span>
                    <span className="font-mono font-bold">{formatPrice(paymentBreakdown.mpesa)}</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rose-600 rounded-full" 
                      style={{ width: `${totalRevenue > 0 ? (paymentBreakdown.mpesa / totalRevenue) * 100 : 40}%` }}
                    />
                  </div>
                </div>

                {/* Orange Money */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-orange-600">Orange Money RDC</span>
                    <span className="font-mono font-bold">{formatPrice(paymentBreakdown.orange_money)}</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full" 
                      style={{ width: `${totalRevenue > 0 ? (paymentBreakdown.orange_money / totalRevenue) * 100 : 30}%` }}
                    />
                  </div>
                </div>

                {/* Airtel Money */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-red-600">Airtel Money RDC</span>
                    <span className="font-mono font-bold">{formatPrice(paymentBreakdown.airtel_money)}</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-600 rounded-full" 
                      style={{ width: `${totalRevenue > 0 ? (paymentBreakdown.airtel_money / totalRevenue) * 100 : 20}%` }}
                    />
                  </div>
                </div>

                {/* Card / Cash */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-stone-800">Cartes Bancaires & Cash</span>
                    <span className="font-mono font-bold">{formatPrice(paymentBreakdown.card + paymentBreakdown.cash)}</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-stone-800 rounded-full" 
                      style={{ width: `${totalRevenue > 0 ? ((paymentBreakdown.card + paymentBreakdown.cash) / totalRevenue) * 100 : 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-950">
                Meilleures Ventes & Pièces Phares
              </h3>

              <div className="space-y-3">
                {products.slice(0, 4).map((p, idx) => (
                  <div key={p.id} className="flex items-center gap-3 p-2.5 bg-stone-50 rounded-xl border border-stone-100 text-xs">
                    <span className="w-6 h-6 rounded-full bg-[#1C1A17] text-[#D4AF37] font-bold text-xs flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <img
                      src={p.images[0]}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-10 h-12 object-cover rounded bg-stone-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-serif font-bold text-stone-900 truncate">{p.name}</div>
                      <div className="text-[10px] text-stone-500">{p.category} • Stock: {p.totalStock} ex.</div>
                    </div>
                    <div className="font-serif font-bold text-[#8C6B1C]">
                      {formatPrice(p.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: HISTORIQUE DÉTAILLÉ DES VENTES & TRANSACTIONS */}
      {adminTab === 'sales_history' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-950">
                Historique Complet des Ventes & Transactions
              </h3>
              <p className="text-xs text-stone-500">
                Registre chronologique des commandes, références eMoney et statuts de délivrance.
              </p>
            </div>

            <button
              onClick={handleExportSalesCsv}
              className="px-4 py-2.5 bg-[#1C1A17] text-[#D4AF37] hover:bg-stone-800 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Exporter en CSV (Excel)</span>
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#EAE3D6] shadow-xs flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={salesSearchQuery}
                onChange={(e) => setSalesSearchQuery(e.target.value)}
                placeholder="Rechercher par N° commande, nom client, tél ou référence transaction..."
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <select
                value={salesStatusFilter}
                onChange={(e) => setSalesStatusFilter(e.target.value)}
                className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700 focus:outline-none font-medium"
              >
                <option value="all">Tous les Statuts</option>
                <option value="delivered">Colis Livrés</option>
                <option value="in_transit">En cours de livraison</option>
                <option value="in_preparation">En préparation</option>
                <option value="payment_confirmed">Paiement validé</option>
              </select>

              <select
                value={salesPaymentFilter}
                onChange={(e) => setSalesPaymentFilter(e.target.value)}
                className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700 focus:outline-none font-medium"
              >
                <option value="all">Tous les Paiements</option>
                <option value="mpesa">M-Pesa</option>
                <option value="orange_money">Orange Money</option>
                <option value="airtel_money">Airtel Money</option>
                <option value="card">Carte Bancaire</option>
                <option value="cash_delivery">Cash à la livraison</option>
              </select>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-3xl border border-[#E8E2D5] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-serif uppercase tracking-wider">
                    <th className="p-4">N° Commande & Date</th>
                    <th className="p-4">Client & Contact</th>
                    <th className="p-4">Articles Achetés</th>
                    <th className="p-4">Mode de Paiement</th>
                    <th className="p-4">Montant Total</th>
                    <th className="p-4">Statut & PIN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-stone-500 italic">
                        Aucune vente trouvée avec les filtres sélectionnés.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FCFAF7] transition-colors">
                        <td className="p-4">
                          <div className="font-mono font-bold text-stone-900">{order.orderNumber}</div>
                          <div className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-stone-950">{order.customer.name}</div>
                          <div className="text-[11px] text-stone-500 font-mono">{order.customer.phone}</div>
                          <div className="text-[10px] text-stone-400 truncate max-w-xs">{order.customer.address}, {order.customer.city}</div>
                        </td>

                        <td className="p-4">
                          <div className="space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="text-[11px] text-stone-700">
                                • {item.quantity}x {item.product.name} ({item.selectedSize})
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-1.5 font-bold uppercase text-[11px] text-stone-800">
                            <Smartphone className="w-3.5 h-3.5 text-[#A37B24]" />
                            <span>{order.paymentMethod.replace('_', ' ')}</span>
                          </div>
                          {order.paymentReference && (
                            <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                              Réf: {order.paymentReference}
                            </div>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="font-serif font-bold text-sm text-[#8C6B1C]">
                            {formatPrice(order.totalAmount)}
                          </div>
                        </td>

                        <td className="p-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === 'delivered' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : order.status === 'in_transit' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status === 'delivered' ? 'Livré' : order.status === 'in_transit' ? 'En livraison' : 'En cours'}
                          </span>
                          <div className="text-[10px] text-stone-500 font-mono mt-1">
                            PIN: <strong className="text-[#8C6B1C]">{order.securityPin}</strong>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCT MANAGEMENT & STOCK MODIFICATION */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Catalogue des Vêtements ({products.length} références)
            </h3>
            <button
              onClick={openNewProductModal}
              className="px-4 py-2 bg-[#1C1A17] text-[#D4AF37] hover:bg-stone-800 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une Pièce</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8E2D5] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-serif uppercase tracking-wider">
                    <th className="p-4">Vêtement</th>
                    <th className="p-4">Catégorie</th>
                    <th className="p-4">Prix Unitaire</th>
                    <th className="p-4">Stock par Taille</th>
                    <th className="p-4">Total Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-12 h-14 object-cover rounded-lg bg-stone-100"
                          />
                          <div>
                            <div className="font-serif font-bold text-stone-900">{p.name}</div>
                            <div className="text-[11px] text-stone-500">{p.material}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-semibold text-stone-700">{p.category}</td>

                      <td className="p-4">
                        <div className="font-serif font-bold text-sm text-[#8C6B1C]">{formatPrice(p.price)}</div>
                        {p.originalPrice && <div className="text-[10px] line-through text-stone-400">{formatPrice(p.originalPrice)}</div>}
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {p.sizes.map((sz) => (
                            <span key={sz} className="px-1.5 py-0.5 bg-[#FAF7F0] border border-stone-200 rounded text-[10px]">
                              {sz}: <strong>{p.stockPerSize[sz] || 0}</strong>
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          p.totalStock <= 0 ? 'bg-rose-100 text-rose-800' : p.totalStock <= 5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {p.totalStock} en stock
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditProductModal(p)}
                            className="p-2 bg-stone-100 hover:bg-[#1C1A17] hover:text-[#D4AF37] rounded-lg transition-colors"
                            title="Modifier Fiche & Prix"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Voulez-vous vraiment supprimer "${p.name}" ?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-2 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ORDER MANAGER WITH REALTIME STATUS UPDATE */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Gestionnaire des Expéditions Logistiques ({orders.length})
            </h3>
            <span className="text-xs text-stone-500">
              Chaque changement notifie immédiatement le client par Push & SMS
            </span>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 border border-[#EAE3D6] shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-stone-950">{order.orderNumber}</span>
                      <span className="text-[11px] text-stone-500">
                        PIN: <strong className="font-mono text-[#8C6B1C]">{order.securityPin}</strong>
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 mt-0.5">
                      Client : <strong>{order.customer.name}</strong> • Tél : <span className="font-mono">{order.customer.phone}</span>
                    </div>
                    <div className="text-[11px] text-stone-400">{order.customer.address}, {order.customer.city}</div>
                  </div>

                  <div className="text-right">
                    <div className="font-serif font-bold text-base text-[#8C6B1C]">{formatPrice(order.totalAmount)}</div>
                    <div className="text-[10px] text-stone-500 uppercase font-mono">
                      {order.paymentMethod} • Réf : {order.paymentReference || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Status Switcher & Driver assignment */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-stone-700">Statut de la commande :</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 font-bold text-stone-900 focus:outline-none focus:border-[#C5A059] cursor-pointer"
                    >
                      <option value="pending_payment">En attente de paiement</option>
                      <option value="payment_confirmed">Paiement validé</option>
                      <option value="in_preparation">En préparation atelier</option>
                      <option value="in_transit">En cours de livraison (Livreur)</option>
                      <option value="ready_for_pickup">Prêt en boutique</option>
                      <option value="delivered">Colis Livré / Remis</option>
                      <option value="cancelled">Annulé</option>
                    </select>
                  </div>

                  <div className="text-xs text-stone-500">
                    Livreur Assigné : <strong className="text-stone-800">{order.assignedCourierName || 'Junior Kalala'}</strong>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SETTINGS & DRIVER PIN MANAGEMENT */}
      {adminTab === 'settings' && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* SECTION 1: EMONEY PAYMENT PHONE NUMBER & STORE PARAMS */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <div className="text-xs font-serif uppercase tracking-widest text-[#A37B24] font-bold">
                  Configuration Mobile Money & Boutique
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-950 mt-1">
                  Numéro de Réception des Paiements (M-Pesa, Orange, Airtel)
                </h3>
              </div>
              <span className="text-xs bg-[#FAF7F0] text-[#8C6B1C] px-3 py-1 rounded-full font-bold border border-[#E0D7C4]">
                Actif : {settings.merchantPhone}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  Numéro Mobile Money Marchand :
                </label>
                <input
                  type="text"
                  value={merchantPhoneInput}
                  onChange={(e) => setMerchantPhoneInput(e.target.value)}
                  placeholder="0991018186"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono font-bold text-stone-950 focus:outline-none focus:border-[#C5A059]"
                />
                <p className="text-[10px] text-stone-400 mt-1">Sert aussi d'identifiant d'accès Gérant.</p>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  Nom Commercial de la Boutique :
                </label>
                <input
                  type="text"
                  value={merchantNameInput}
                  onChange={(e) => setMerchantNameInput(e.target.value)}
                  placeholder="Blanche Élégance"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-950 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  Taux CDF (1 USD = Francs Congolais) :
                </label>
                <input
                  type="number"
                  value={exchangeRateInput}
                  onChange={(e) => setExchangeRateInput(e.target.value)}
                  placeholder="2850"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-950 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {settingsSavedToast ? (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCheck className="w-4 h-4" /> Paramètres enregistrés avec succès !
                </span>
              ) : <div />}

              <button
                onClick={() => {
                  updateSettings({
                    merchantPhone: merchantPhoneInput,
                    merchantName: merchantNameInput,
                    exchangeRateCDF: Number(exchangeRateInput) || 2850
                  });
                  setSettingsSavedToast(true);
                  setTimeout(() => setSettingsSavedToast(false), 3000);
                }}
                className="px-6 py-2.5 bg-[#1C1A17] text-[#D4AF37] hover:bg-stone-800 rounded-xl font-serif uppercase tracking-wider text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Sauvegarder les Paramètres</span>
              </button>
            </div>
          </div>

          {/* SECTION 2: DRIVER PIN MANAGEMENT & ATTRIBUTION */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <div className="text-xs font-serif uppercase tracking-widest text-[#A37B24] font-bold">
                  Gestion & Sécurité de l'Espace Livreur
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-950 mt-1">
                  Attribution des Codes PIN aux Coursiers
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Chaque livreur se connecte uniquement avec son numéro et le code PIN généré et attribué par le Gérant.
                </p>
              </div>

              <button
                onClick={() => setIsAddingDriver(true)}
                className="px-4 py-2 bg-[#1C1A17] text-[#D4AF37] hover:bg-stone-800 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
              >
                <UserPlus className="w-4 h-4" />
                <span>Nouveau Livreur</span>
              </button>
            </div>

            {/* Modal / Inline form to add driver */}
            {isAddingDriver && (
              <form onSubmit={handleCreateDriver} className="p-4 bg-[#FAF7F0] border border-[#E0D7C4] rounded-2xl space-y-3 animate-in fade-in">
                <div className="font-serif font-bold text-sm text-[#191714]">Ajouter un Nouveau Coursier Express</div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-stone-600 uppercase block mb-1">Nom & Prénom</label>
                    <input
                      type="text"
                      required
                      value={newDriverName}
                      onChange={(e) => setNewDriverName(e.target.value)}
                      placeholder="ex: Patrick Ilunga"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-stone-600 uppercase block mb-1">Téléphone</label>
                    <input
                      type="tel"
                      required
                      value={newDriverPhone}
                      onChange={(e) => setNewDriverPhone(e.target.value)}
                      placeholder="0897744112"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-stone-600 uppercase block mb-1">Zone de Livraison</label>
                    <input
                      type="text"
                      value={newDriverZone}
                      onChange={(e) => setNewDriverZone(e.target.value)}
                      placeholder="Gombe - Limete"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-stone-600 uppercase block mb-1">Code PIN (4 chiffres)</label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={newDriverPin}
                        onChange={(e) => setNewDriverPin(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono font-bold text-center text-stone-900"
                      />
                      <button
                        type="button"
                        onClick={() => setNewDriverPin(Math.floor(1000 + Math.random() * 9000).toString())}
                        className="p-2 bg-stone-200 hover:bg-stone-300 rounded-xl text-xs"
                        title="Générer PIN aléatoire"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-stone-700" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingDriver(false)}
                    className="px-3 py-1.5 bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#1C1A17] text-[#D4AF37] rounded-lg text-xs font-serif font-bold uppercase tracking-wider"
                  >
                    Créer & Attribuer PIN
                  </button>
                </div>
              </form>
            )}

            {/* Drivers list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drivers.map((driver) => (
                <div 
                  key={driver.id} 
                  className="p-5 rounded-2xl border border-[#E8E2D5] bg-[#FCFAF7] space-y-4 shadow-xs hover:border-[#D4AF37] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-serif font-bold text-sm text-stone-950">{driver.name}</div>
                      <div className="text-[11px] text-stone-500 font-mono mt-0.5">Tél : {driver.phone}</div>
                      <div className="text-[10px] text-[#8C6B1C] font-semibold mt-0.5">Zone : {driver.zone}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Actif
                    </span>
                  </div>

                  {/* PIN Display & Regenerator */}
                  <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-500 flex items-center gap-1 font-semibold">
                        <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" /> Code PIN d'accès :
                      </span>
                      <span className="font-mono text-base font-bold text-[#191714] tracking-widest">
                        {driver.pinCode}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-stone-100 text-[11px]">
                      <button
                        onClick={() => generateDriverPin(driver.id)}
                        className="flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium flex items-center justify-center gap-1 transition-colors"
                        title="Régénérer un nouveau PIN"
                      >
                        <RefreshCw className="w-3 h-3 text-stone-600" />
                        <span>Nouveau PIN</span>
                      </button>

                      <button
                        onClick={() => handleCopyDriverInvite(driver)}
                        className={`flex-1 py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1 transition-colors ${
                          copiedPinDriverId === driver.id 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-[#1C1A17] text-[#D4AF37] hover:bg-stone-800'
                        }`}
                        title="Copier le message SMS d'invitation avec PIN"
                      >
                        {copiedPinDriverId === driver.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedPinDriverId === driver.id ? 'Copié !' : 'Envoyer SMS'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-stone-400 pt-1">
                    <span>Livraisons aujourd'hui : {driver.completedToday}</span>
                    <button
                      onClick={() => {
                        if (confirm(`Supprimer le livreur ${driver.name} ?`)) {
                          deleteDriver(driver.id);
                        }
                      }}
                      className="text-rose-600 hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: VERCEL HOSTING & CLOUD READINESS */}
          <div className="bg-gradient-to-r from-[#171A21] via-[#1E232F] to-[#171A21] text-white p-6 sm:p-8 rounded-3xl border border-blue-900/40 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center border border-blue-500/40">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-white">
                  Prêt pour Déploiement & Hébergement Vercel
                </h4>
                <p className="text-xs text-stone-300">
                  L'application Blanche Élégance est entièrement optimisée pour être hébergée sur Vercel, Netlify ou tout serveur Node.js avec persistance instantanée.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <div className="font-bold text-emerald-400 mb-0.5">✓ Routage Single-Page (SPA)</div>
                <div className="text-[11px] text-stone-300">Compatibilité totale avec vercel.json et fallbacks HTML5.</div>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <div className="font-bold text-emerald-400 mb-0.5">✓ Multi-Rôles & PINs</div>
                <div className="text-[11px] text-stone-300">Authentification OTP Client & Gérant (0991018186) et PINs Livreurs.</div>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <div className="font-bold text-emerald-400 mb-0.5">✓ Export des Données</div>
                <div className="text-[11px] text-stone-300">Sauvegardes CSV des ventes et réplication de base simplifiée.</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isEditingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div 
            className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E8E2D5] overflow-hidden my-auto p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-950">
                {productToEdit ? `Modifier : ${productToEdit.name}` : 'Ajouter une Nouvelle Pièce au Catalogue'}
              </h3>
              <button
                onClick={() => setIsEditingProduct(false)}
                className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Nom du Vêtement</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="ex: Robe de Bal en Soie Blanche"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Catégorie</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Robes & Soirée">Robes & Soirée</option>
                    <option value="Tailleurs & Ensembles">Tailleurs & Ensembles</option>
                    <option value="Chemisiers & Soie">Chemisiers & Soie</option>
                    <option value="Manteaux & Vestes">Manteaux & Vestes</option>
                    <option value="Chaussures & Maroquinerie">Chaussures & Maroquinerie</option>
                    <option value="Accessoires de Luxe">Accessoires de Luxe</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Matière / Tissu</label>
                  <input
                    type="text"
                    value={productForm.material}
                    onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                    placeholder="Pure Soie, Cachemire..."
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Prix de Vente ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 font-bold focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Prix d'Origine ($ USD)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Description Détaillée</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Décrivez la coupe, la texture et l'élégance de la pièce..."
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Image upload / Gallery importer */}
              <div className="space-y-2">
                <label className="font-bold text-stone-700 block">
                  Photos du Vêtement (Importation depuis la Galerie de l'appareil ou URL)
                </label>
                
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 bg-white border border-stone-300 rounded-xl cursor-pointer hover:bg-stone-50 flex items-center gap-2 font-semibold text-stone-800 shadow-2xs">
                    <Upload className="w-4 h-4 text-[#A37B24]" />
                    <span>Choisir un fichier image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>

                  <span className="text-stone-400">ou URL directe :</span>
                </div>

                <input
                  type="text"
                  value={productForm.images[0] || ''}
                  onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 text-[11px] focus:outline-none focus:border-[#C5A059]"
                />

                {productForm.images[0] && (
                  <div className="w-20 h-24 rounded-lg overflow-hidden border border-stone-300 bg-stone-100 mt-2">
                    <img src={productForm.images[0]} alt="Aperçu" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Stock per size */}
              <div className="space-y-2">
                <label className="font-bold text-stone-700 block">Stock par Taille en Rayon :</label>
                <div className="grid grid-cols-5 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((sz) => (
                    <div key={sz} className="p-2 bg-white rounded-lg border border-stone-200 text-center">
                      <div className="font-bold text-stone-800 mb-1">{sz}</div>
                      <input
                        type="number"
                        min="0"
                        value={productForm.stockPerSize[sz] ?? 0}
                        onChange={(e) => setProductForm({
                          ...productForm,
                          stockPerSize: { ...productForm.stockPerSize, [sz]: Number(e.target.value) }
                        })}
                        className="w-full text-center py-1 bg-stone-50 border border-stone-300 rounded text-xs font-bold"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsEditingProduct(false)}
                  className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1C1A17] text-[#D4AF37] hover:bg-stone-800 rounded-xl font-serif uppercase tracking-wider font-bold transition-all shadow-md"
                >
                  Enregistrer & Mettre en Vente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

