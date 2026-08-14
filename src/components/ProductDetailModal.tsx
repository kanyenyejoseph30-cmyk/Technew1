import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { 
  X, 
  Check, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  AlertCircle,
  PhoneCall
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, formatPrice, settings } = useStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) return null;

  // Initialize selected values if not set
  const currentSize = selectedSize || product.sizes[0] || 'M';
  const currentColor = selectedColor || product.colors[0] || { name: 'Ivoire', hex: '#FAF9F6' };
  const currentStockForSize = product.stockPerSize[currentSize] ?? 0;

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Media Gallery */}
          <div className="p-6 bg-[#F5EFE3] flex flex-col justify-between">
            <div className="relative aspect-3/4 rounded-xl overflow-hidden shadow-md bg-stone-100 mb-4 group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              {product.isNew && (
                <span className="absolute top-3 left-3 bg-[#1C1A17] text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs">
                  Nouveauté 2026
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx ? 'border-[#D4AF37] scale-105 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      referrerPolicy="no-referrer" 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Selection */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-serif uppercase tracking-widest text-[#8C7A58] font-bold">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400 font-normal">({product.reviewCount} avis)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1A17] mb-3 leading-tight">
                {product.name}
              </h2>

              {/* Price & Currency */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl sm:text-3xl font-bold font-serif text-[#997324]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm line-through text-stone-400">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                  TVA & Emballage Inclus
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 font-sans">
                    Couleur : <span className="font-serif italic font-normal text-stone-900">{currentColor.name}</span>
                  </label>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform ${
                        currentColor.name === color.name 
                          ? 'border-[#D4AF37] scale-110 shadow-sm' 
                          : 'border-stone-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {currentColor.name === color.name && (
                        <Check className={`w-4 h-4 ${color.hex === '#FFFFFF' || color.hex === '#FAF9F6' || color.hex === '#FDFBF7' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Live Stock */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 font-sans">
                    Taille : <span className="text-stone-900">{currentSize}</span>
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-xs text-[#8C7A58] underline hover:text-[#1C1A17] font-medium"
                  >
                    Guide des tailles
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => {
                    const stock = product.stockPerSize[size] ?? 0;
                    const isAvailable = stock > 0;
                    const isSelected = currentSize === size;

                    return (
                      <button
                        key={size}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-[#1C1A17] text-[#D4AF37] border-[#1C1A17] shadow-sm'
                            : isAvailable
                              ? 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                              : 'bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed line-through'
                        }`}
                      >
                        <div>{size}</div>
                        <div className="text-[9px] font-normal opacity-80 mt-0.5">
                          {isAvailable ? `${stock} dispo` : 'Épuisé'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Live Stock Alert Badge */}
                <div className="mt-3 flex items-center gap-2 text-xs">
                  {currentStockForSize > 0 ? (
                    currentStockForSize <= 3 ? (
                      <span className="text-amber-700 font-medium flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        Stock faible : plus que {currentStockForSize} article(s) en taille {currentSize} !
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-medium flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        En stock ({currentStockForSize} disponibles en taille {currentSize})
                      </span>
                    )
                  ) : (
                    <span className="text-rose-700 font-medium flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-md border border-rose-200">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      Taille {currentSize} temporairement épuisée
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Quantité :</span>
                <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(currentStockForSize, quantity + 1))}
                    disabled={quantity >= currentStockForSize}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Size Guide Modal Overlay */}
              {showSizeGuide && (
                <div className="mb-6 p-4 bg-white rounded-xl border border-stone-200 text-xs">
                  <div className="font-bold text-stone-900 mb-2 font-serif">Guide des Tailles Blanche Élégance (Femme & Homme)</div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-500">
                        <th className="py-1">Taille</th>
                        <th className="py-1">Tour Poitrine</th>
                        <th className="py-1">Tour Taille</th>
                        <th className="py-1">Tour Hanches</th>
                      </tr>
                    </thead>
                    <tbody className="text-stone-700">
                      <tr className="border-b border-stone-100">
                        <td className="py-1 font-bold">XS (34)</td>
                        <td>80-84 cm</td>
                        <td>60-64 cm</td>
                        <td>86-90 cm</td>
                      </tr>
                      <tr className="border-b border-stone-100">
                        <td className="py-1 font-bold">S (36-38)</td>
                        <td>85-89 cm</td>
                        <td>65-69 cm</td>
                        <td>91-95 cm</td>
                      </tr>
                      <tr className="border-b border-stone-100">
                        <td className="py-1 font-bold">M (40)</td>
                        <td>90-94 cm</td>
                        <td>70-74 cm</td>
                        <td>96-100 cm</td>
                      </tr>
                      <tr className="border-b border-stone-100">
                        <td className="py-1 font-bold">L (42)</td>
                        <td>95-100 cm</td>
                        <td>75-80 cm</td>
                        <td>101-106 cm</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-bold">XL (44)</td>
                        <td>101-106 cm</td>
                        <td>81-86 cm</td>
                        <td>107-112 cm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Actions */}
            <div>
              <button
                onClick={handleAddToCart}
                disabled={currentStockForSize <= 0}
                className="w-full py-4 rounded-xl bg-[#1C1A17] text-white hover:bg-stone-800 transition-all font-serif uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 shadow-lg disabled:bg-stone-300 disabled:cursor-not-allowed group"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span>Ajouter à mon Panier d’Élégance</span>
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-stone-200 text-center text-[10px] text-stone-500">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#8C7A58]" />
                  <span>Livraison Express par QR Code</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#8C7A58]" />
                  <span>Paiement Sécurisé ({settings.merchantPhone})</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#8C7A58]" />
                  <span>Haute Couture 100% Authentique</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
