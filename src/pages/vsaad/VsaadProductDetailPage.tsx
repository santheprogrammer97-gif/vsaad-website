import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ShoppingBag,
  Sparkles,
  MapPin,
  ChevronRight,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';
import { QuoteRequestModal } from '../../components/vsaad/QuoteRequestModal';
import { ProductCard } from '../../components/vsaad/ProductCard';

export const VsaadProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, addToQuoteCart, loading } = useVsaad();

  const product = products.find(p => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState<string>(product?.primaryImage || '');
  const selectedFinish = product?.finishGroup || product?.defaultFinish || 'Polished';
  const [calcSqFt, setCalcSqFt] = useState<number>(300);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (product?.primaryImage) {
      setSelectedImage(product.primaryImage);
    }
  }, [product?.primaryImage]);

  // Loading state
  if (loading && !product) {
    return (
      <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-36 pb-20 px-4 flex flex-col items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-vsaad-purple border-t-transparent animate-spin mb-4" />
        <p className="text-xs text-vsaad-ivory-muted uppercase tracking-widest font-mono">
          Loading Stone Specifications...
        </p>
      </div>
    );
  }

  // If product not found
  if (!product) {
    return (
      <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-36 pb-20 px-4 text-center">
        <h2 className="text-2xl font-display">Stone Material Not Found</h2>
        <p className="text-xs text-vsaad-ivory-muted mt-2 font-sans">
          The requested slab or architectural material could not be located in our inventory.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-vsaad-purple text-white text-xs uppercase tracking-wider rounded-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Stone Catalogue</span>
        </Link>
      </div>
    );
  }

  const allImages = [product.primaryImage, ...(product.galleryImages || [])];
  const activeImage = selectedImage || product.primaryImage;

  const handleAddToCart = () => {
    addToQuoteCart({
      product,
      quantitySqFt: calcSqFt,
      selectedFinish,
      selectedThickness: product.defaultThickness || 'Custom Cut',
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  // Related granite products from the SAME finish group!
  const relatedProducts = products
    .filter(p => {
      if (p.id === product.id) return false;
      if (product.category === 'granite') {
        return p.category === 'granite' && p.finishGroup === product.finishGroup;
      }
      return p.category === product.category;
    })
    .slice(0, 4);

  const finishDisplayName = product.finishGroup
    ? `${product.finishGroup} Finish`
    : product.defaultFinish || 'Polished Finish';

  return (
    <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-sans text-vsaad-ivory-dark mb-8 overflow-x-auto">
          <Link to="/" className="hover:text-vsaad-ivory transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/products" className="hover:text-vsaad-ivory transition-colors shrink-0">
            Catalogue
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-vsaad-ivory transition-colors capitalize shrink-0"
          >
            {product.categoryName}
          </Link>
          {product.finishGroup && (
            <>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link
                to={`/products?category=${product.category}&finish=${product.finishGroup}`}
                className="hover:text-vsaad-ivory transition-colors shrink-0"
              >
                {product.finishGroup} Granite
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-vsaad-purple-light font-medium truncate">{product.name}</span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary High-Res Frame */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-black border border-[#22222E]">
              <img
                src={activeImage}
                alt={`${product.name} (${finishDisplayName})`}
                className="w-full h-full object-cover object-center select-none"
                onError={e => {
                  const target = e.currentTarget;
                  if (!target.src.includes('collection-granite.jpg')) {
                    target.src = '/images/collection-granite.jpg';
                  }
                }}
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-xs text-[10px] uppercase font-mono tracking-wider text-vsaad-purple-light border border-vsaad-purple/30 font-semibold">
                  {finishDisplayName}
                </span>
                {product.origin && (
                  <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-xs text-[10px] font-sans tracking-wider text-vsaad-ivory border border-white/10 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-vsaad-purple" />
                    {product.origin}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-24 aspect-[4/3] rounded-xs overflow-hidden shrink-0 border transition-all ${
                      activeImage === img
                        ? 'border-vsaad-purple shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                        : 'border-[#22222E] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumb ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Configuration & Ordering (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-vsaad-purple-light uppercase">
                  SKU: {product.sku}
                </span>
                <span className="text-xs font-sans text-green-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Showroom Slab Verified
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-light text-vsaad-ivory mt-1">
                {product.name}
              </h1>
              <p className="text-sm font-sans text-vsaad-ivory-dark mt-1 italic">
                {product.tagline}
              </p>
            </div>

            {/* Admin Commercial Spelling Review Note Flag (if applicable) */}
            {product.adminNote && (
              <div className="p-3 bg-[#171320] border border-vsaad-purple/30 rounded-xs flex items-start gap-2.5 text-xs text-vsaad-purple-light font-sans">
                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-vsaad-purple" />
                <p className="leading-relaxed">
                  <strong>Commercial Catalogue Note:</strong> {product.adminNote}
                </p>
              </div>
            )}

            {/* Showroom Pricing Card */}
            <div className="p-4 bg-[#0F0F14] border border-[#22222E] rounded-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-vsaad-ivory-dark uppercase tracking-wider block font-sans">
                  Showroom Pricing
                </span>
                <span className="text-xl sm:text-2xl font-mono font-semibold text-vsaad-purple-light">
                  {product.priceDisplay || 'Request a Quote'}
                </span>
              </div>
              <span className="text-[11px] text-vsaad-ivory-muted font-sans text-right max-w-[150px] leading-tight">
                Diamond calibrated gangsaw cuts • Custom site sizing
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm font-sans text-vsaad-ivory-muted leading-relaxed">
              {product.description}
            </p>

            {/* Architectural Finish Badge */}
            <div className="p-3.5 bg-[#121218] border border-[#262634] rounded-xs">
              <span className="block text-[11px] uppercase tracking-wider text-vsaad-ivory-dark font-sans mb-1.5">
                Architectural Finish Profile
              </span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xs text-xs font-sans font-semibold bg-vsaad-purple/20 text-vsaad-purple-light border border-vsaad-purple/40">
                  {finishDisplayName}
                </span>
                <span className="text-xs text-vsaad-ivory-muted font-sans">
                  {product.finishGroup === 'Lapotra'
                    ? 'Brushed leathered tactile satin surface'
                    : 'Diamond-calibrated high-mirror polish'}
                </span>
              </div>
            </div>

            {/* Custom Sizing & Quotation Area Calculator */}
            <div className="p-4 bg-[#121218] border border-[#262634] rounded-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-vsaad-ivory-dark flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-vsaad-purple" />
                  Estimated Project Area
                </span>
                <span className="font-mono text-vsaad-ivory font-semibold">{calcSqFt} sq.ft</span>
              </div>
              <input
                type="range"
                min={50}
                max={3000}
                step={25}
                value={calcSqFt}
                onChange={e => setCalcSqFt(Number(e.target.value))}
                className="w-full accent-vsaad-purple cursor-pointer"
              />
              <p className="text-[11px] text-vsaad-ivory-dark font-sans">
                Full gangsaw slab bundles or custom cut-to-size templating available.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 rounded-xs bg-gradient-to-r from-vsaad-purple to-vsaad-purple-deep hover:from-vsaad-purple-light hover:to-vsaad-purple text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedSuccess ? 'Added to Quote Request!' : 'Add to Quote Request'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full py-3 px-4 rounded-xs bg-[#121218] hover:bg-[#1A1A24] border border-[#2A2A38] hover:border-vsaad-purple/50 text-vsaad-ivory text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-vsaad-purple" />
                <span>Request a Quote / Showroom Inspection</span>
              </button>
            </div>
          </div>
        </div>

        {/* Technical Properties Matrix */}
        <div className="mt-20 pt-12 border-t border-[#1C1C26]">
          <h2 className="text-2xl font-display font-light text-vsaad-ivory mb-6">
            Verified Physical &amp; Geological Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-4 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-1">
              <span className="text-vsaad-ivory-dark uppercase tracking-wider text-[10px]">Quarry Origin</span>
              <p className="text-vsaad-ivory font-medium">{product.origin || 'South India'}</p>
            </div>
            <div className="p-4 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-1">
              <span className="text-vsaad-ivory-dark uppercase tracking-wider text-[10px]">Finish Type</span>
              <p className="text-vsaad-ivory font-medium">{finishDisplayName}</p>
            </div>
            <div className="p-4 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-1">
              <span className="text-vsaad-ivory-dark uppercase tracking-wider text-[10px]">Material Classification</span>
              <p className="text-vsaad-ivory font-medium capitalize">{product.categoryName}</p>
            </div>
            <div className="p-4 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-1">
              <span className="text-vsaad-ivory-dark uppercase tracking-wider text-[10px]">Recommended Applications</span>
              <p className="text-vsaad-ivory font-medium">{product.applications.join(', ')}</p>
            </div>
            <div className="p-4 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-1">
              <span className="text-vsaad-ivory-dark uppercase tracking-wider text-[10px]">Color / Matrix</span>
              <p className="text-vsaad-ivory font-medium">{product.color}</p>
            </div>
            <div className="p-4 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-1">
              <span className="text-vsaad-ivory-dark uppercase tracking-wider text-[10px]">Calibration Protocol</span>
              <p className="text-vsaad-ivory font-medium">Diamond Multi-Head Calibrated (Chennai)</p>
            </div>
          </div>
        </div>

        {/* Related Granite Products from the SAME finish group */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#1C1C26]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-light text-vsaad-ivory">
                Related {product.finishGroup || product.categoryName} Surfaces
              </h2>
              <Link
                to={`/products?category=${product.category}${product.finishGroup ? `&finish=${product.finishGroup}` : ''}`}
                className="text-xs uppercase tracking-wider text-vsaad-purple-light hover:underline font-sans"
              >
                View Full {product.finishGroup || product.categoryName} Collection
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quote Request Modal */}
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={product}
      />
    </div>
  );
};
