import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { VsaadProvider } from './context/VsaadContext';
import { VsaadNavbar } from './components/vsaad/VsaadNavbar';
import { VsaadFooter } from './components/vsaad/VsaadFooter';
import { ScrollToTop } from './components/common/ScrollToTop';
import { SmoothScrollProvider } from './components/vsaad/motion/SmoothScrollProvider';
import { ScrollProgress } from './components/vsaad/motion/ScrollProgress';

// VSAAD Cinematic Pages
import { VsaadHomePage } from './pages/vsaad/VsaadHomePage';
import { VsaadProductsPage } from './pages/vsaad/VsaadProductsPage';
import { VsaadProductDetailPage } from './pages/vsaad/VsaadProductDetailPage';
import { VsaadTilesPage } from './pages/vsaad/VsaadTilesPage';
import { VsaadCollectionsPage } from './pages/vsaad/VsaadCollectionsPage';
import { VsaadGalleryPage } from './pages/vsaad/VsaadGalleryPage';
import { VsaadQuoteCartPage } from './pages/vsaad/VsaadQuoteCartPage';
import { VsaadAboutPage } from './pages/vsaad/VsaadAboutPage';
import { VsaadJournalPage } from './pages/vsaad/VsaadJournalPage';
import { VsaadJournalDetailPage } from './pages/vsaad/VsaadJournalDetailPage';
import { VsaadFaqPage } from './pages/vsaad/VsaadFaqPage';
import { VsaadContactPage } from './pages/vsaad/VsaadContactPage';
import { VsaadLegalPage } from './pages/vsaad/VsaadLegalPage';
import { VsaadAdminPage } from './pages/vsaad/admin/VsaadAdminPage';

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="relative min-h-screen bg-[#08080A] text-vsaad-ivory flex flex-col font-sans selection:bg-vsaad-purple selection:text-white">
      <ScrollProgress />
      <ScrollToTop />

      {/* Public VSAAD Navigation Header */}
      {!isAdmin && <VsaadNavbar />}

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          {/* VSAAD Public Routes */}
          <Route path="/" element={<VsaadHomePage />} />
          <Route path="/products" element={<VsaadProductsPage />} />
          <Route path="/products/:slug" element={<VsaadProductDetailPage />} />

          {/* Direct Granite & Tiles Routes */}
          <Route path="/granite" element={<Navigate to="/products?category=granite" replace />} />
          <Route path="/tiles" element={<VsaadTilesPage />} />

          {/* Collections / Categories */}
          <Route path="/collections" element={<VsaadCollectionsPage />} />
          <Route path="/collections/:category" element={<VsaadCollectionsPage />} />
          <Route path="/spaces" element={<Navigate to="/collections" replace />} />

          {/* Surface Category Redirects */}
          <Route path="/collections/marble" element={<Navigate to="/products?category=granite" replace />} />
          <Route path="/collections/countertops" element={<Navigate to="/products?category=granite" replace />} />
          <Route path="/collections/staircase" element={<Navigate to="/products?category=granite" replace />} />
          <Route path="/collections/cladding" element={<Navigate to="/products?category=granite" replace />} />
          <Route path="/marble" element={<Navigate to="/products?category=granite" replace />} />
          <Route path="/countertops" element={<Navigate to="/products?category=granite" replace />} />
          <Route path="/staircase" element={<Navigate to="/products?category=granite" replace />} />
          <Route path="/cladding" element={<Navigate to="/products?category=granite" replace />} />

          {/* Architectural Gallery */}
          <Route path="/gallery" element={<VsaadGalleryPage />} />

          {/* Quotation Cart / Order Workflow */}
          <Route path="/quote-cart" element={<VsaadQuoteCartPage />} />
          <Route path="/cart" element={<VsaadQuoteCartPage />} />
          <Route path="/enquiry-cart" element={<VsaadQuoteCartPage />} />

          {/* About Showroom */}
          <Route path="/about" element={<VsaadAboutPage />} />

          {/* Journal / Blog */}
          <Route path="/journal" element={<VsaadJournalPage />} />
          <Route path="/journal/:slug" element={<VsaadJournalDetailPage />} />
          <Route path="/blog" element={<VsaadJournalPage />} />
          <Route path="/blog/:slug" element={<VsaadJournalDetailPage />} />

          {/* FAQ */}
          <Route path="/faq" element={<VsaadFaqPage />} />

          {/* Contact & Showroom Enquiries */}
          <Route path="/contact" element={<VsaadContactPage />} />

          {/* Policies & Legal */}
          <Route path="/privacy-policy" element={<VsaadLegalPage />} />
          <Route path="/terms-and-conditions" element={<VsaadLegalPage />} />
          <Route path="/shipping-policy" element={<VsaadLegalPage />} />
          <Route path="/refund-policy" element={<VsaadLegalPage />} />

          {/* Private Admin Console */}
          <Route path="/admin" element={<VsaadAdminPage />} />
          <Route path="/admin/*" element={<VsaadAdminPage />} />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <span className="text-xs uppercase font-mono tracking-widest text-vsaad-purple-light">
                  404 Error
                </span>
                <h1 className="text-4xl font-display text-vsaad-ivory mt-2">Surface Not Found</h1>
                <p className="text-xs text-vsaad-ivory-muted max-w-sm mt-2 font-sans">
                  The slab or architectural page you are looking for does not exist or has been relocated.
                </p>
                <Link
                  to="/"
                  className="mt-6 px-6 py-2.5 bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-wider rounded-xs transition-colors"
                >
                  Return to VSAAD Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Public Luxury Footer */}
      {!isAdmin && <VsaadFooter />}
    </div>
  );
}

export function App() {
  return (
    <Router>
      <VsaadProvider>
        <SmoothScrollProvider>
          <AppLayout />
        </SmoothScrollProvider>
      </VsaadProvider>
    </Router>
  );
}

export default App;
