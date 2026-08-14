import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory } from '../types';
import { 
  Search, 
  Sparkles, 
  ShoppingBag, 
  Eye, 
  Check, 
  ShieldCheck, 
  Truck, 
  QrCode, 
  PhoneCall, 
  SlidersHorizontal,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Package
} from 'lucide-react';

const CATEGORIES: ('Tous' | ProductCategory)[] = [
  'Tous',
  'Robes & Soirée',
  'Tailleurs & Ensembles',
  'Chemisiers & Soie',
  'Manteaux & Vestes',
  'Chaussures & Maroquinerie',
  'Accessoires de Luxe'
];

export const ProductCatalog: React.FC = () => {
  const { 
    products, 
    setSelectedProduct, 
    addToCart, 
    formatPrice, 
    settings,
    setActiveView,
    setQuickTrackingOrderNumber
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<'Tous' | ProductCategory>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('Tous');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'Tous' && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesMaterial = product.material.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesMaterial) {
          return false;
        }
      }
      // Size filter
      if (selectedSizeFilter !== 'Tous') {
        if (!product.sizes.includes(selectedSizeFilter) || (product.stockPerSize[selectedSizeFilter] || 0) <= 0) {
          return false;
        }
      }
      // In stock only
      if (inStockOnly && product.totalStock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, selectedSizeFilter, inStockOnly, sortBy]);

  return (
    <div className="space-y-10 pb-16">
      {/* Luxury Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#171512] via-[#2A251E] to-[#171512] text-[#FAF8F5] border border-[#C5A059]/40 shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-12 sm:py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Collection Exclusive 2026</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              L’Art de l’Élégance <br />
              <span className="italic font-light text-[#E5C483]">Blanche & Royale.</span>
            </h1>
            
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              Découvrez des pièces d’exception confectionnées dans les plus belles soies, lins et cachemires. Paiement instantané et sécurisé par <strong className="text-[#E5C483] font-semibold">Mobile Money (M-Pesa, Orange Money, Airtel Money)</strong> avec suivi de commande en temps réel et QR Code unique de retrait.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button 
                onClick={() => {
                  const el = document.getElementById('catalog-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-[#D4AF37] text-stone-950 rounded-full font-serif font-bold text-xs uppercase tracking-wider hover:bg-[#E5C483] transition-all shadow-lg flex items-center gap-2"
              >
                <span>Explorer la Collection</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => setActiveView('tracking')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-sans font-medium text-xs tracking-wider transition-all border border-white/20 flex items-center gap-2"
              >
                <QrCode className="w-4 h-4 text-[#D4AF37]" />
                <span>Où est votre Colis ?</span>
              </button>
            </div>
          </div>

          {/* Luxury Highlights Box */}
          <div className="w-full md:w-80 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4 shrink-0">
            <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-serif font-bold border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Engagements Blanche Élégance</span>
              <ShieldCheck className="w-4 h-4" />
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Paiement Direct eMoney</div>
                  <div className="text-[11px] text-stone-400">Numéro Marchand : <span className="text-[#E5C483] font-mono font-bold">{settings.merchantPhone}</span></div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <QrCode className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-white">QR Code Sécurisé Unique</div>
                  <div className="text-[11px] text-stone-400">Garantit que seul le titulaire retire son colis</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Livraison Express Gombe & RDC</div>
                  <div className="text-[11px] text-stone-400">Suivi GPS et notifications SMS / Push en direct</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section id="catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Controls & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une robe, un tailleur, soie, matière..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2DAD0] rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Size filter */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#E2DAD0] text-xs">
                <span className="text-stone-500">Taille:</span>
                <select
                  value={selectedSizeFilter}
                  onChange={(e) => setSelectedSizeFilter(e.target.value)}
                  className="bg-transparent font-semibold text-stone-800 focus:outline-none cursor-pointer"
                >
                  <option value="Tous">Toutes</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#E2DAD0] text-xs">
                <span className="text-stone-500">Trier:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-semibold text-stone-800 focus:outline-none cursor-pointer"
                >
                  <option value="featured">En vedette</option>
                  <option value="newest">Nouveautés</option>
                  <option value="price-asc">Prix : croissant</option>
                  <option value="price-desc">Prix : décroissant</option>
                </select>
              </div>

              {/* In stock toggle */}
              <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-[#E2DAD0] text-xs text-stone-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#C5A059] focus:ring-[#C5A059]"
                />
                <span>En stock uniquement</span>
              </label>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-[#EDE6DA]">
            {CATEGORIES.map((cat) => {
              const count = cat === 'Tous' 
                ? products.length 
                : products.filter(p => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-serif tracking-wider whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedCategory === cat
                      ? 'bg-[#1C1A17] text-[#D4AF37] font-bold shadow-xs'
                      : 'bg-white text-stone-600 hover:text-stone-900 border border-[#E5DFD4] hover:border-stone-400'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat ? 'bg-[#332F29] text-[#D4AF37]' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <div>
            Affichage de <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong> pièce(s) d’élégance
          </div>
          <div className="flex items-center gap-1.5 text-[#8C7A58]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mise à jour des stocks en temps réel</span>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-8 space-y-3">
            <Package className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="text-base font-serif font-bold text-stone-800">Aucun vêtement trouvé</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Aucune pièce ne correspond à vos critères de recherche. Essayez de réinitialiser vos filtres.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
                setSelectedSizeFilter('Tous');
                setInStockOnly(false);
              }}
              className="px-4 py-2 bg-[#1C1A17] text-white rounded-lg text-xs font-serif uppercase tracking-wider"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const defaultSize = product.sizes[0] || 'M';
              const defaultColor = product.colors[0] || { name: 'Blanc', hex: '#FFFFFF' };
              const isOutOfStock = product.totalStock <= 0;
              const hasLowStock = product.totalStock > 0 && product.totalStock <= 5;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#EAE3D6] hover:border-[#D4AF37]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container with hover actions */}
                    <div className="relative aspect-3/4 bg-[#F5EFE6] overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Stock / New Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                        {product.isNew && (
                          <span className="bg-[#1C1A17] text-[#D4AF37] text-[10px] font-bold font-serif uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                            Nouveauté
                          </span>
                        )}
                        {isOutOfStock ? (
                          <span className="bg-rose-800 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                            Rupture de Stock
                          </span>
                        ) : hasLowStock ? (
                          <span className="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                            Plus que {product.totalStock} restants
                          </span>
                        ) : null}
                      </div>

                      {/* Quick view button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="absolute bottom-3 right-3 p-2.5 bg-white/90 hover:bg-white text-stone-900 rounded-full shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Aperçu Détaillé"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#8C7A58] font-serif uppercase tracking-wider font-semibold">
                          {product.category}
                        </span>
                        <span className="text-stone-400">
                          {product.material}
                        </span>
                      </div>

                      <h3 
                        onClick={() => setSelectedProduct(product)}
                        className="text-sm sm:text-base font-serif font-bold text-stone-900 hover:text-[#A37B24] cursor-pointer transition-colors line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      {/* Color Dots */}
                      <div className="flex items-center gap-1.5 pt-0.5">
                        {product.colors.slice(0, 4).map((c) => (
                          <span
                            key={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                        {product.colors.length > 4 && (
                          <span className="text-[10px] text-stone-400">+{product.colors.length - 4}</span>
                        )}
                      </div>

                      {/* Sizes Bar */}
                      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1">
                        {product.sizes.map((sz) => {
                          const szStock = product.stockPerSize[sz] ?? 0;
                          return (
                            <span
                              key={sz}
                              className={`text-[9px] px-1.5 py-0.5 rounded border ${
                                szStock > 0
                                  ? 'bg-[#F9F7F2] text-stone-700 border-stone-200'
                                  : 'bg-stone-50 text-stone-300 border-stone-100 line-through'
                              }`}
                            >
                              {sz}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Direct Buy Button */}
                  <div className="p-4 pt-0 border-t border-[#F5EFE6] mt-2 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-base sm:text-lg font-serif font-bold text-[#8C6B1C]">
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="text-[11px] line-through text-stone-400">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product, defaultSize, defaultColor)}
                      disabled={isOutOfStock}
                      className="px-3.5 py-2 rounded-xl bg-[#1C1A17] text-white hover:bg-stone-800 transition-all text-xs font-serif uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-sm disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed group/btn"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37] group-hover/btn:scale-110 transition-transform" />
                      <span>Ajouter</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Delivery Tracking Callout Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F0] border border-[#E0D7C4] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-serif uppercase tracking-widest text-[#8C7A58] font-bold">
              <QrCode className="w-4 h-4 text-[#C5A059]" />
              <span>Où est votre Commande Blanche Élégance ?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Suivi Logistique & Retrait Sécurisé par QR Code
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Consultez le statut de votre colis en direct de la couture à votre porte. Présentez votre QR code unique lors de la livraison ou du retrait en boutique.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                setQuickTrackingOrderNumber('BE-2026-8891');
                setActiveView('tracking');
              }}
              className="w-full sm:w-auto px-5 py-3 bg-[#1C1A17] text-[#D4AF37] hover:bg-stone-800 rounded-xl font-serif uppercase tracking-wider text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Tester la Commande Démo (BE-2026-8891)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveView('tracking')}
              className="w-full sm:w-auto px-5 py-3 bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 rounded-xl font-sans text-xs font-semibold shadow-xs transition-all"
            >
              Rechercher par Numéro
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
