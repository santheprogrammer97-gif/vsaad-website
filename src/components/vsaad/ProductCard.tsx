import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, Check } from 'lucide-react';
import type { VsaadProduct } from '../../types/vsaadTypes';
import { useVsaad } from '../../context/VsaadContext';
import { TiltCard } from './motion/TiltCard';

interface ProductCardProps {
  product: VsaadProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { quoteCart, addToQuoteCart } = useVsaad();

  const isAlreadyInCart = quoteCart.some(i => i.product.id === product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToQuoteCart({
      product,
      quantitySqFt: 250,
      selectedFinish: product.defaultFinish || product.finishGroup || product.finishes[0] || 'Polished',
      selectedThickness: product.defaultThickness || product.thicknesses[0] || 'Custom Cut',
    });
  };

  const finishDisplay = product.finishGroup
    ? `${product.finishGroup} Finish`
    : product.defaultFinish || product.finishes[0] || 'Polished';

  return (
    <TiltCard className="h-full">
      <div className="group relative h-full bg-[#0F0F14] border border-[#22222E] hover:border-vsaad-purple/50 rounded-sm overflow-hidden transition-all duration-500 flex flex-col justify-between hover:shadow-[0_16px_36px_-8px_rgba(168,85,247,0.35)]">
      {/* Stone Image Preview Area */}
      <Link
        to={`/products/${product.slug}`}
        className="block relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0E]"
      >
        <img
          src={product.primaryImage}
          alt={`${product.name} (${finishDisplay})`}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
          loading="lazy"
          onError={e => {
            const target = e.currentTarget;
            if (!target.src.includes('collection-granite.jpg')) {
              target.src = '/images/collection-granite.jpg';
            }
          }}
        />

        {/* Ambient Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-transparent to-black/25 opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Finish & Category Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span
            className={`px-2.5 py-0.5 rounded-xs text-[10px] tracking-wider uppercase font-sans font-semibold backdrop-blur-md border ${
              product.finishGroup === 'Lapotra'
                ? 'bg-[#1F1824]/90 text-amber-300 border-amber-500/40'
                : 'bg-[#101018]/90 text-vsaad-purple-light border-vsaad-purple/40'
            }`}
          >
            {finishDisplay}
          </span>
          {product.featured && (
            <span className="px-2 py-0.5 rounded-xs text-[10px] tracking-wider uppercase font-sans font-medium bg-vsaad-purple/90 text-white">
              Signature
            </span>
          )}
        </div>

        {/* SKU Badge */}
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-mono tracking-wider text-vsaad-ivory-dark bg-black/75 px-1.5 py-0.5 rounded border border-white/10">
            {product.sku}
          </span>
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link to={`/products/${product.slug}`} className="group/title block">
            <h3 className="font-display text-lg sm:text-xl text-vsaad-ivory group-hover/title:text-vsaad-purple-light transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-vsaad-ivory-muted line-clamp-1 mt-1 font-sans">
            {product.tagline || product.color}
          </p>

          {/* Finish & Category Specs */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 text-[10px] font-sans">
            <span className="px-2 py-0.5 bg-[#171720] border border-[#2A2A38] text-vsaad-ivory-muted rounded-xs">
              {product.category === 'tiles' ? 'Architectural Tile' : 'Granite Slab'}
            </span>
            {product.origin && (
              <span className="px-2 py-0.5 bg-[#171720] border border-[#2A2A38] text-vsaad-ivory-dark rounded-xs">
                {product.origin}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-[#1C1C26] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-vsaad-ivory-dark block font-sans">
              Showroom Pricing
            </span>
            <span className="text-xs sm:text-sm font-semibold text-vsaad-purple-light font-mono">
              {product.priceDisplay || 'Request a Quote'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`px-2.5 py-1.5 rounded-xs border text-xs font-sans transition-all flex items-center gap-1 ${
                isAlreadyInCart
                  ? 'bg-vsaad-purple/20 border-vsaad-purple text-vsaad-purple-light'
                  : 'bg-[#171720] border-[#2A2A38] text-vsaad-ivory hover:border-vsaad-purple hover:text-vsaad-purple-light'
              }`}
              title={isAlreadyInCart ? 'In Quote Enquiry' : 'Add to Quote Enquiry'}
              aria-label={`Add ${product.name} to Quote`}
            >
              {isAlreadyInCart ? <Check className="w-3.5 h-3.5 text-vsaad-purple" /> : <Plus className="w-3.5 h-3.5" />}
              <span className="text-[11px] hidden sm:inline">{isAlreadyInCart ? 'Added' : 'Enquire'}</span>
            </button>

            <Link
              to={`/products/${product.slug}`}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xs bg-[#171720] border border-[#2A2A38] text-vsaad-ivory hover:text-vsaad-purple hover:border-vsaad-purple transition-all flex items-center gap-1"
              aria-label={`View Details for ${product.name}`}
            >
              <span className="text-[11px] hidden md:inline">Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </TiltCard>
);
};
