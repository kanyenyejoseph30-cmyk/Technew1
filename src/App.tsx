import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingView } from './components/OrderTrackingView';
import { ClientSpace } from './components/ClientSpace';
import { DeliveryAgentSpace } from './components/DeliveryAgentSpace';
import { AdminSpace } from './components/AdminSpace';
import { NotificationToast } from './components/NotificationToast';
import { Footer } from './components/Footer';

const MainAppContent: React.FC = () => {
  const { activeView, selectedProduct, setSelectedProduct } = useStore();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F1D1A] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-stone-950">
      {/* Header */}
      <Header />

      {/* Main View Display */}
      <main className="flex-1">
        {activeView === 'catalog' && <ProductCatalog />}
        {activeView === 'tracking' && <OrderTrackingView />}
        {activeView === 'client' && <ClientSpace />}
        {activeView === 'courier' && <DeliveryAgentSpace />}
        {activeView === 'admin' && <AdminSpace />}
      </main>

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer />
      <CheckoutModal />
      <NotificationToast />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
