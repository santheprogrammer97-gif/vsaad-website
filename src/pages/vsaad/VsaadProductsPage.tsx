import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';
import { ProductCard } from '../../components/vsaad/ProductCard';

export const VsaadProductsPage: React.FC = () => {
  const { products } = useVsaad();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state synchronization
  const categoryParam = searchParams.get('category') || 'all';
  const finishParam = searchParams.get('finish') || 'all';
  const qParam = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(qParam);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedFinish, setSelectedFinish] = useState<string>(finishParam);
  const [sortBy, setSortBy] = useState<'default' | 'name-asc' | 'name-desc'>('default');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSelectedFinish(finishParam);
  }, [categoryParam, finishParam]);

  // Handle filter changes with smooth transition and URL persistence
  const updateFilters = (newCat: string, newFinish: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(newCat);
      setSelectedFinish(newFinish);
      const params: Record<string, string> = {};
      if (newCat !== 'all') params.category = newCat;
      if (newFinish !== 'all') params.finish = newFinish;
      if (searchQuery.trim()) params.q = searchQuery.trim();
      setSearchParams(params, { replace: true });
      setIsTransitioning(false);
    }, 150);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const params: Record<string, string> = {};
    if (selectedCategory !== 'all') params.category = selectedCategory;
    if (selectedFinish !== 'all') params.finish = selectedFinish;
    if (val.trim()) params.q = val.trim();
    setSearchParams(params, { replace: true });
  };

  const resetFilters = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSearchQuery('');
      setSelectedCategory('all');
      setSelectedFinish('all');
      setSortBy('default');
      setSearchParams({}, { replace: true });
      setIsTransitioning(false);
    }, 150);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.color.toLowerCase().includes(q) ||
            (p.finishGroup && p.finishGroup.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Finish filter: Polished vs Lapotra
        if (selectedFinish !== 'all') {
          if (p.finishGroup) {
            if (p.finishGroup.toLowerCase() !== selectedFinish.toLowerCase()) return false;
          } else if (!p.finishes.map(f => f.toLowerCase()).includes(selectedFinish.toLowerCase())) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        return 0; // Default curated order
      });
  }, [products, searchQuery, selectedCategory, selectedFinish, sortBy]);

  // Counts
  const graniteCount = products.filter(p => p.category === 'granite').length;
  const polishedCount = products.filter(p => p.category === 'granite' && p.finishGroup === 'Polished').length;
  const lapotraCount = products.filter(p => p.category === 'granite' && p.finishGroup === 'Lapotra').length;
  const tilesCount = products.filter(p => p.category === 'tiles').length;

  return (
    <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121218] border border-vsaad-purple/30 text-vsaad-purple-light text-[11px] font-sans tracking-[0.2em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-vsaad-purple" />
            <span>Official VSAAD Showroom Inventory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-1">
            Granite &amp; Tiles Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-vsaad-ivory-muted max-w-2xl font-sans mt-2 leading-relaxed">
            Explore 20 certified Indian granite varieties across mirror-polished and tactile Lapotra finishes, alongside large-format architectural porcelain tiles. Diamond-calibrated in Chennai.
          </p>
        </div>

        {/* Primary Classification Tabs: All, Granite, Polished, Lapotra, Tiles */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-[#22222E] pb-4">
          <button
            type="button"
            onClick={() => updateFilters('all', 'all')}
            className={`px-4 py-2 rounded-xs text-xs uppercase tracking-wider font-sans transition-all ${
              selectedCategory === 'all' && selectedFinish === 'all'
                ? 'bg-vsaad-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-medium'
                : 'bg-[#121218] text-vsaad-ivory-muted hover:text-white border border-[#22222E]'
            }`}
          >
            All Surfaces ({products.length})
          </button>

          <button
            type="button"
            onClick={() => updateFilters('granite', 'all')}
            className={`px-4 py-2 rounded-xs text-xs uppercase tracking-wider font-sans transition-all ${
              selectedCategory === 'granite' && selectedFinish === 'all'
                ? 'bg-vsaad-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-medium'
                : 'bg-[#121218] text-vsaad-ivory-muted hover:text-white border border-[#22222E]'
            }`}
          >
            All Granite ({graniteCount})
          </button>

          <button
            type="button"
            onClick={() => updateFilters('granite', 'Polished')}
            className={`px-4 py-2 rounded-xs text-xs uppercase tracking-wider font-sans transition-all ${
              selectedCategory === 'granite' && selectedFinish === 'Polished'
                ? 'bg-vsaad-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-medium'
                : 'bg-[#121218] text-vsaad-ivory-muted hover:text-vsaad-purple-light border border-[#22222E]'
            }`}
          >
            Polished Granite ({polishedCount})
          </button>

          <button
            type="button"
            onClick={() => updateFilters('granite', 'Lapotra')}
            className={`px-4 py-2 rounded-xs text-xs uppercase tracking-wider font-sans transition-all ${
              selectedCategory === 'granite' && selectedFinish === 'Lapotra'
                ? 'bg-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.4)] font-medium'
                : 'bg-[#121218] text-vsaad-ivory-muted hover:text-amber-300 border border-[#22222E]'
            }`}
          >
            Lapotra Granite ({lapotraCount})
          </button>

          <button
            type="button"
            onClick={() => updateFilters('tiles', 'all')}
            className={`px-4 py-2 rounded-xs text-xs uppercase tracking-wider font-sans transition-all ${
              selectedCategory === 'tiles'
                ? 'bg-vsaad-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-medium'
                : 'bg-[#121218] text-vsaad-ivory-muted hover:text-white border border-[#22222E]'
            }`}
          >
            Architectural Tiles ({tilesCount})
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#0F0F14] border border-[#22222E] rounded-sm p-4 sm:p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 text-vsaad-ivory-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => handleSearchChange(e.target.value)}
                placeholder="Search by granite name (e.g. Black Glaxay, Tan Brown, Steel Grey), SKU..."
                className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs pl-10 pr-4 py-2 text-xs text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600 font-sans"
              />
            </div>

            {/* Sort Order */}
            <div className="sm:col-span-4">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3 py-2 text-xs text-vsaad-ivory focus:border-vsaad-purple focus:outline-none font-sans"
              >
                <option value="default">Sort: Showroom Recommended</option>
                <option value="name-asc">Alphabetical (A – Z)</option>
                <option value="name-desc">Alphabetical (Z – A)</option>
              </select>
            </div>
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedFinish !== 'all') && (
            <div className="mt-3 pt-3 border-t border-[#1C1C26] flex items-center justify-between text-xs font-sans">
              <span className="text-vsaad-ivory-muted">
                Active Filter:{' '}
                <strong className="text-vsaad-purple-light uppercase">
                  {selectedCategory === 'all' ? 'All' : selectedCategory}
                  {selectedFinish !== 'all' ? ` • ${selectedFinish} Finish` : ''}
                  {searchQuery ? ` • "${searchQuery}"` : ''}
                </strong>
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-[11px] text-vsaad-purple-light hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Metadata Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-vsaad-ivory-dark font-sans">
          <span>Showing {filteredProducts.length} verified surface catalogue entries</span>
          <span className="text-[11px] uppercase tracking-wider">Diamond Calibrated • Custom Sizing</span>
        </div>

        {/* Product Grid with Smooth Staggered Animation */}
        <div
          className={`transition-all duration-300 ${
            isTransitioning ? 'opacity-30 translate-y-1' : 'opacity-100 translate-y-0'
          }`}
        >
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-[#0F0F14] border border-[#22222E] rounded-sm p-8">
              <SlidersHorizontal className="w-10 h-10 text-vsaad-ivory-dark mx-auto mb-3" />
              <h3 className="text-lg font-display text-vsaad-ivory">No Matching Surfaces Found</h3>
              <p className="text-xs text-vsaad-ivory-muted mt-1 max-w-sm mx-auto font-sans">
                Try searching for specific varieties such as "Black Glaxay", "Tan Brown", "Steel Grey", or "River Black".
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-[#171720] border border-[#2A2A38] text-vsaad-ivory text-xs uppercase tracking-wider rounded-xs hover:border-vsaad-purple"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
