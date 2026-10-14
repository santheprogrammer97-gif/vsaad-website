import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Layers,
  Sparkles,
  ArrowRight,
  Plus,
  Check,
  Ruler,
  ShieldCheck,
} from 'lucide-react';
import { useVsaad } from '../../../context/VsaadContext';
import { GlassCard } from '../glass/GlassCard';
import type { VsaadProduct } from '../../../types/vsaadTypes';

interface TilesCatalogueGridProps {
  activeCategory: string; // 'all' | 'floor' | 'wall' | 'outdoor' | 'decorative'
  onSelectCategory: (category: string) => void;
  onOpenSpecSheet: () => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Tiles' },
  { id: 'floor', label: 'Floor Tiles' },
  { id: 'wall', label: 'Wall Slabs' },
  { id: 'outdoor', label: 'Outdoor Pavers' },
  { id: 'decorative', label: 'Decorative Accents' },
];

export const TilesCatalogueGrid: React.FC<TilesCatalogueGridProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenSpecSheet,
}) => {
  const { products, addToQuoteCart } = useVsaad();

  // Search and secondary filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Filter products by tiles category first
  const tileProducts = useMemo(() => {
    return products.filter((p) => p.category === 'tiles');
  }, [products]);

  // Extract unique finishes & formats for secondary dropdowns
  const availableFinishes = useMemo(() => {
    const set = new Set<string>();
    tileProducts.forEach((p) => {
      p.finishes?.forEach((f) => set.add(f));
    });
    return Array.from(set);
  }, [tileProducts]);

  const availableFormats = useMemo(() => {
    const set = new Set<string>();
    tileProducts.forEach((p) => {
      if (p.tileFormat) set.add(p.tileFormat);
    });
    return Array.from(set);
  }, [tileProducts]);

  // Filtered catalogue list
  const filteredProducts = useMemo(() => {
    return tileProducts.filter((product) => {
      // 1. Category Tab Filter
      if (activeCategory !== 'all') {
        if (product.subCategory !== activeCategory) {
          return false;
        }
      }

      // 2. Finish Filter
      if (selectedFinish !== 'all') {
        if (!product.finishes?.includes(selectedFinish)) {
          return false;
        }
      }

      // 3. Format Filter
      if (selectedFormat !== 'all') {
        if (product.tileFormat !== selectedFormat) {
          return false;
        }
      }

      // 4. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchTagline = product.tagline?.toLowerCase().includes(q);
        const matchDesc = product.description?.toLowerCase().includes(q);
        const matchColor = product.color?.toLowerCase().includes(q);
        const matchFormat = product.tileFormat?.toLowerCase().includes(q);
        if (!matchName && !matchTagline && !matchDesc && !matchColor && !matchFormat) {
          return false;
        }
      }

      return true;
    });
  }, [tileProducts, activeCategory, selectedFinish, selectedFormat, searchQuery]);

  const handleAddToCart = (e: React.MouseEvent, product: VsaadProduct) => {
    e.preventDefault();
    e.stopPropagation();

    addToQuoteCart({
      product,
      quantitySqFt: 120, // baseline architectural allowance
      selectedFinish: product.defaultFinish || product.finishes[0] || 'Matte',
      selectedThickness: product.defaultThickness || product.thicknesses[0] || '9mm',
    });

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2400);
  };

  const getSubCategoryLabel = (sub?: string) => {
    switch (sub) {
      case 'floor':
        return 'Floor Tile';
      case 'wall':
        return 'Wall Slab';
      case 'outdoor':
        return 'Outdoor Paver';
      case 'decorative':
        return 'Decorative';
      default:
        return 'Architectural Tile';
    }
  };

  return (
    <section id="catalogue-section" className="relative py-24 bg-[#08080C] overflow-hidden">
      {/* Background Subtle Gradient */}
      <div
        className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-vsaad-purple/8 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-vsaad-purple/6 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vsaad-purple/10 border border-vsaad-purple/20 backdrop-blur-md mb-3">
              <Sparkles className="w-3.5 h-3.5 text-vsaad-purple-light" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-vsaad-purple-light font-medium">
                Engineered Porcelain Masterworks
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
              Architectural <span className="text-vsaad-purple-light italic font-normal">Tile Repertoire.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-vsaad-ivory-muted font-sans font-light max-w-xl">
              Precision-calibrated large format porcelain slabs and vitrified tiles manufactured to ISO 10545 standards.
            </p>
          </div>

          {/* Quick Technical Spec Sheet Trigger Button */}
          <button
            onClick={onOpenSpecSheet}
            className="self-start lg:self-auto inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/12 hover:border-vsaad-purple/50 text-xs font-sans font-medium text-vsaad-ivory tracking-wide transition-all duration-300 shadow-lg group"
          >
            <ShieldCheck className="w-4 h-4 text-vsaad-purple-light group-hover:scale-110 transition-transform" />
            <span>View Technical Spec Sheet (ISO 10545)</span>
          </button>
        </div>

        {/* Filter Toolbar: Translucent Glass Dock */}
        <div className="mb-12 p-3 sm:p-4 rounded-2xl bg-[#0D0D14]/80 border border-white/10 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Segmented Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onSelectCategory(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-sans tracking-wide transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-vsaad-purple text-white font-medium shadow-[0_0_18px_rgba(168,85,247,0.4)]'
                        : 'text-vsaad-ivory-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Secondary Controls: Search, Finish, Format */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 text-vsaad-ivory-dark absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tile or format..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-vsaad-ivory placeholder-vsaad-ivory-dark focus:outline-none focus:border-vsaad-purple/60 focus:ring-1 focus:ring-vsaad-purple/50 transition-all font-sans"
                />
              </div>

              {/* Finish Selector */}
              <div className="relative">
                <select
                  value={selectedFinish}
                  onChange={(e) => setSelectedFinish(e.target.value)}
                  className="px-3 py-2 pr-7 rounded-xl bg-black/40 border border-white/10 text-xs text-vsaad-ivory focus:outline-none focus:border-vsaad-purple/60 transition-all font-sans appearance-none cursor-pointer"
                  aria-label="Filter by finish"
                >
                  <option value="all" className="bg-[#101018] text-white">All Finishes</option>
                  {availableFinishes.map((f) => (
                    <option key={f} value={f} className="bg-[#101018] text-white">
                      {f}
                    </option>
                  ))}
                </select>
                <Filter className="w-3 h-3 text-vsaad-ivory-dark absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Format Selector */}
              <div className="relative">
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="px-3 py-2 pr-7 rounded-xl bg-black/40 border border-white/10 text-xs text-vsaad-ivory focus:outline-none focus:border-vsaad-purple/60 transition-all font-sans appearance-none cursor-pointer"
                  aria-label="Filter by format"
                >
                  <option value="all" className="bg-[#101018] text-white">All Formats</option>
                  {availableFormats.map((fmt) => (
                    <option key={fmt} value={fmt} className="bg-[#101018] text-white">
                      {fmt}
                    </option>
                  ))}
                </select>
                <Ruler className="w-3 h-3 text-vsaad-ivory-dark absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Count & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-vsaad-ivory-dark font-sans mb-6">
          <span>
            Showing <strong className="text-white font-medium">{filteredProducts.length}</strong> architectural tile selections
          </span>
          {(searchQuery || selectedFinish !== 'all' || selectedFormat !== 'all' || activeCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFinish('all');
                setSelectedFormat('all');
                onSelectCategory('all');
              }}
              className="text-vsaad-purple-light hover:underline text-xs"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-16 rounded-2xl bg-white/[0.02] border border-white/10 text-center backdrop-blur-xl">
            <Layers className="w-10 h-10 text-vsaad-purple-light mx-auto mb-3 opacity-60" />
            <h3 className="font-display text-xl text-white font-light">No matching tile surfaces found</h3>
            <p className="mt-2 text-xs text-vsaad-ivory-muted font-sans max-w-md mx-auto">
              Try adjusting your search criteria or resetting filters to explore the full architectural repertoire.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFinish('all');
                setSelectedFormat('all');
                onSelectCategory('all');
              }}
              className="mt-5 px-5 py-2 rounded-xl text-xs font-medium text-white bg-vsaad-purple hover:bg-vsaad-purple-light transition-all"
            >
              View All 10 Tile Varieties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProducts.map((tile) => {
              const isAdded = addedIds[tile.id];

              return (
                <div key={tile.id} className="group text-left">
                  <GlassCard
                    variant="card"
                    interactive
                    className="h-full flex flex-col justify-between overflow-hidden relative border-white/10 group-hover:border-vsaad-purple/50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.18)] transition-all duration-300"
                  >
                    <div>
                      {/* Tile Visual Media Frame */}
                      <Link
                        to={`/products/${tile.slug}`}
                        className="block relative w-full h-64 overflow-hidden rounded-t-xl bg-[#0B0B10]"
                      >
                        <img
                          src={tile.primaryImage}
                          alt={tile.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 filter brightness-95 group-hover:brightness-105"
                          loading="lazy"
                        />
                        {/* Gradient Scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B11] via-transparent to-black/35" />

                        {/* Top Badges */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-sans font-medium uppercase tracking-[0.16em] bg-[#0A0A0F]/85 text-vsaad-ivory-light border border-white/10 backdrop-blur-md shadow-md">
                            {getSubCategoryLabel(tile.subCategory)}
                          </span>

                          {tile.slipRating && tile.slipRating !== 'N/A' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-vsaad-purple/20 text-vsaad-purple-light border border-vsaad-purple/40 backdrop-blur-md">
                              {tile.slipRating} Traction
                            </span>
                          )}
                        </div>

                        {/* Bottom Format Badge on Media */}
                        {tile.tileFormat && (
                          <div className="absolute bottom-3 left-3.5 px-2.5 py-1 rounded-lg bg-black/60 border border-white/15 text-[11px] font-mono text-vsaad-ivory backdrop-blur-md flex items-center gap-1.5">
                            <Ruler className="w-3 h-3 text-vsaad-purple-light" />
                            <span>{tile.tileFormat}</span>
                          </div>
                        )}
                      </Link>

                      {/* Card Information Body */}
                      <div className="p-6">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-vsaad-purple-light font-sans font-medium mb-1">
                          {tile.sku} • {tile.color}
                        </div>

                        <Link to={`/products/${tile.slug}`}>
                          <h3 className="font-display text-xl font-light text-white group-hover:text-vsaad-purple-light transition-colors duration-200">
                            {tile.name}
                          </h3>
                        </Link>

                        <p className="mt-2 text-xs text-vsaad-ivory-muted font-sans font-light leading-relaxed line-clamp-2">
                          {tile.tagline || tile.description}
                        </p>

                        {/* Finishes and Thickness Badges */}
                        <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[10px] font-sans">
                          {tile.finishes?.map((finish) => (
                            <span
                              key={finish}
                              className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-vsaad-ivory-light"
                            >
                              {finish}
                            </span>
                          ))}
                          {tile.thicknesses?.map((th) => (
                            <span
                              key={th}
                              className="px-2 py-0.5 rounded-md bg-vsaad-purple/[0.08] border border-vsaad-purple/20 text-vsaad-purple-light"
                            >
                              {th}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-6 pt-0">
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                        <Link
                          to={`/products/${tile.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs text-vsaad-ivory-muted hover:text-white transition-colors"
                        >
                          <span>Explore Specs</span>
                          <ArrowRight className="w-3.5 h-3.5 text-vsaad-purple-light" />
                        </Link>

                        <button
                          onClick={(e) => handleAddToCart(e, tile)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-medium flex items-center gap-1.5 transition-all duration-200 ${
                            isAdded
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                              : 'bg-white/5 hover:bg-vsaad-purple text-vsaad-ivory hover:text-white border border-white/10 hover:border-vsaad-purple/50'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added to Quote</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Project</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
