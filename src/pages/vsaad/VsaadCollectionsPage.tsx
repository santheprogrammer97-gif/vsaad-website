import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';
import { ProductCard } from '../../components/vsaad/ProductCard';

export const VsaadCollectionsPage: React.FC = () => {
  const { category: categorySlug } = useParams<{ category?: string }>();
  const { categories, products } = useVsaad();

  // Redirect obsolete categories to granite catalogue
  const obsoleteCategories = ['marble', 'countertops', 'staircase', 'cladding'];
  if (categorySlug && obsoleteCategories.includes(categorySlug.toLowerCase())) {
    return <Navigate to="/products?category=granite" replace />;
  }

  // If specific category view (Granite or Tiles)
  if (categorySlug) {
    const currentCategory = categories.find(c => c.slug === categorySlug);
    const categoryProducts = products.filter(p => p.category === categorySlug);

    if (!currentCategory) {
      return <Navigate to="/collections" replace />;
    }

    const isGranite = categorySlug === 'granite';
    const polishedProducts = categoryProducts.filter(p => p.finishGroup === 'Polished');
    const lapotraProducts = categoryProducts.filter(p => p.finishGroup === 'Lapotra');

    return (
      <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs font-sans text-vsaad-ivory-dark mb-8">
            <Link to="/" className="hover:text-vsaad-ivory transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/collections" className="hover:text-vsaad-ivory transition-colors">
              Collections
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-vsaad-purple-light font-medium">{currentCategory.name}</span>
          </nav>

          {/* Category Hero Banner */}
          <div className="relative aspect-[21/9] min-h-[260px] rounded-sm overflow-hidden border border-[#22222E] mb-12 flex items-end p-6 sm:p-10">
            <img
              src={currentCategory.image}
              alt={currentCategory.name}
              className="absolute inset-0 w-full h-full object-cover select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

            <div className="relative z-10 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
                Official VSAAD Collection
              </span>
              <h1 className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-1">
                {currentCategory.headline || currentCategory.name}
              </h1>
              <p className="text-xs sm:text-sm font-sans text-vsaad-ivory-muted mt-2 leading-relaxed">
                {currentCategory.description}
              </p>
            </div>
          </div>

          {/* If Granite, show both finish sections clearly */}
          {isGranite ? (
            <div className="space-y-16">
              {/* Polished Section */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-[#22222E] pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-vsaad-purple-light font-mono">
                      High-Mirror Reflective
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-light text-vsaad-ivory mt-1">
                      Polished Granite ({polishedProducts.length} Varieties)
                    </h2>
                  </div>
                  <Link
                    to="/products?category=granite&finish=Polished"
                    className="text-xs uppercase tracking-wider text-vsaad-purple-light hover:underline font-sans mt-2 sm:mt-0"
                  >
                    View All Polished
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {polishedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>

              {/* Lapotra Section */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-[#22222E] pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-300 font-mono">
                      Tactile Brushed Leathered
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-light text-vsaad-ivory mt-1">
                      Lapotra Granite ({lapotraProducts.length} Varieties)
                    </h2>
                  </div>
                  <Link
                    to="/products?category=granite&finish=Lapotra"
                    className="text-xs uppercase tracking-wider text-amber-300 hover:underline font-sans mt-2 sm:mt-0"
                  >
                    View All Lapotra
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lapotraProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-light text-vsaad-ivory">
                  Architectural Tiles ({categoryProducts.length})
                </h2>
                <Link
                  to="/products?category=tiles"
                  className="text-xs uppercase tracking-wider text-vsaad-purple-light hover:underline font-sans"
                >
                  View Full Tiles Catalogue
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Navigation to other collection */}
          <div className="mt-20 pt-10 border-t border-[#1C1C26]">
            <h3 className="text-xs uppercase tracking-[0.2em] text-vsaad-ivory-dark font-sans mb-6">
              Explore Our Other Collection
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories
                .filter(c => c.slug !== categorySlug)
                .map(cat => (
                  <Link
                    key={cat.id}
                    to={`/collections/${cat.slug}`}
                    className="p-4 bg-[#0F0F14] border border-[#22222E] hover:border-vsaad-purple/50 rounded-xs text-xs font-sans group transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="text-base text-vsaad-ivory group-hover:text-vsaad-purple-light block font-display">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-vsaad-ivory-muted font-sans mt-0.5 block">
                        {cat.headline}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-vsaad-purple-light group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // All Collections Overview (/collections)
  return (
    <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
            Specialist Showroom Collections
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-2">
            Granite &amp; Architectural Tiles
          </h1>
          <p className="text-xs sm:text-sm text-vsaad-ivory-muted max-w-xl font-sans mt-2">
            Explore our curated inventory of gangsaw granite slabs in Polished and Lapotra finishes, alongside precision-engineered large-format tiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/collections/${cat.slug}`}
              className="group bg-[#0F0F14] border border-[#22222E] hover:border-vsaad-purple/50 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-[0_12px_36px_-8px_rgba(168,85,247,0.3)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded font-mono text-[10px] text-vsaad-purple-light border border-vsaad-purple/30">
                  {cat.productCount} {cat.slug === 'granite' ? 'Varieties' : 'Products'}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display text-vsaad-ivory group-hover:text-vsaad-purple-light transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-vsaad-ivory-dark font-sans italic mt-1">
                    {cat.headline}
                  </p>
                  <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1C1C26] flex items-center justify-between text-xs text-vsaad-purple-light font-sans uppercase tracking-wider">
                  <span>Explore {cat.name} Catalogue</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
