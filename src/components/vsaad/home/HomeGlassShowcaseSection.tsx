import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Droplets,
  Infinity as InfinityIcon,
  Sparkles,
  Heart,
} from 'lucide-react';

interface SwatchItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  slug: string;
}

const SWATCH_ITEMS: SwatchItem[] = [
  {
    id: 'swatch-1',
    name: 'Nero Marquina',
    subtitle: 'Vitrified Tile',
    image: '/images/product-black-morquino-polished.jpg',
    slug: 'marquina-obsidian-floor-tile',
  },
  {
    id: 'swatch-2',
    name: 'Statuario Luxe',
    subtitle: 'Seamless Wall Slab',
    image: '/images/product-statuario-marble.jpg',
    slug: 'statuario-luxe-seamless-wall-slab',
  },
  {
    id: 'swatch-3',
    name: 'Steel Grey',
    subtitle: 'Architectural Porcelain',
    image: '/images/product-steel-grey-polished.jpg',
    slug: 'steel-grey-polished',
  },
  {
    id: 'swatch-4',
    name: 'Tan Brown',
    subtitle: 'High-Density Vitrified',
    image: '/images/product-tan-brown.jpg',
    slug: 'tan-brown-polished',
  },
  {
    id: 'swatch-5',
    name: 'Calacatta Gold',
    subtitle: 'Bookmatched Porcelain',
    image: '/images/product-calacatta-gold.jpg',
    slug: 'calacatta-oro-bookmatched-wall-tile',
  },
];

const CATEGORY_CARDS = [
  {
    id: 'all',
    title: 'All Tiles',
    subtitle: 'Explore Now',
    image: '/images/product-vitrified-tiles.jpg',
    link: '/tiles',
  },
  {
    id: 'floor',
    title: 'Floor Tiles',
    subtitle: 'Elegant & Durable',
    image: '/images/product-black-morquino-polished.jpg',
    link: '/tiles?sub=floor',
  },
  {
    id: 'wall',
    title: 'Wall Tiles',
    subtitle: 'Stylish Surfaces',
    image: '/images/product-statuario-marble.jpg',
    link: '/tiles?sub=wall',
  },
  {
    id: 'outdoor',
    title: 'Outdoor Tiles',
    subtitle: 'Built for Outdoors',
    image: '/images/product-flamed-cladding.jpg',
    link: '/tiles?sub=outdoor',
  },
  {
    id: 'decorative',
    title: 'Decorative Tiles',
    subtitle: 'Unique Patterns',
    image: '/images/product-copper-silk-polished.jpg',
    link: '/tiles?sub=decorative',
  },
];

export const HomeGlassShowcaseSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSwatch, setActiveSwatch] = useState<SwatchItem>(SWATCH_ITEMS[0]);
  const [activeFormat, setActiveFormat] = useState<string>('600 x 1200');
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <section id="collections-section" className="relative bg-[#07070A] text-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1C1C26]">
      {/* Ambient Radial Deep Purple Lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-b from-[#8B5CF6]/15 via-[#6D28D9]/10 to-transparent rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-[600px] h-[400px] bg-[#9333EA]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-14 lg:space-y-16">
        {/* Section Header: Explore Collections */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C084FC] font-sans font-semibold">
              Curated Architectural Surfaces
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-light text-white mt-2">
              Explore Collections
            </h2>
          </div>
          <p className="text-sm text-vsaad-ivory-muted max-w-md font-sans leading-relaxed">
            Discover curated vitrified surfaces and large-format porcelain slabs designed for seamless interior and exterior planes.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* ROW OF 5 FROSTED GLASS CATEGORY CARDS (DESKTOP GRID / MOBILE STACK)       */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORY_CARDS.map((card) => {
              const isActive = activeCategory === card.id;

              return (
                <Link
                  key={card.id}
                  to={card.link}
                  onClick={() => setActiveCategory(card.id)}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-300 p-4 flex flex-col justify-between ${
                    isActive
                      ? 'border-2 border-[#A855F7] shadow-[0_0_28px_rgba(168,85,247,0.45),inset_0_0_14px_rgba(168,85,247,0.15)] bg-[#141220]/80 backdrop-blur-2xl'
                      : 'border border-white/10 hover:border-white/20 bg-[#12121A]/60 backdrop-blur-2xl hover:bg-[#161622]/70 shadow-[0_15px_35px_rgba(0,0,0,0.6)]'
                  }`}
                >
                  {/* Top Specular Rim Light */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  {/* Slab Preview Thumbnail */}
                  <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden mb-3 bg-[#0D0D12]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                  </div>

                  {/* Content & Action Arrow */}
                  <div className="flex items-end justify-between gap-2 mt-auto">
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#C084FC] transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-[11px] text-vsaad-ivory-muted font-sans mt-0.5">
                        {card.subtitle}
                      </p>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? 'bg-[#8B5CF6] text-white shadow-[0_0_12px_rgba(139,92,246,0.6)]'
                          : 'bg-white/10 text-vsaad-ivory-muted group-hover:bg-[#8B5CF6] group-hover:text-white'
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM SHOWCASE: DETAILED NERO MARQUINA CARD + FEATURES & LIVING PATTERNS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          {/* Left: Large Interactive Nero Marquina Frosted Glass Card (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#11111A]/75 backdrop-blur-3xl border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Purple Backlighting Inside Glass */}
            <div
              className="absolute -right-16 -top-16 w-64 h-64 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Large Realistic Stone Slab Preview (5 Cols) */}
              <div className="sm:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] bg-black">
                <img
                  src={activeSwatch.image}
                  alt={activeSwatch.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#C084FC]">
                  {activeFormat} • Polished
                </div>
              </div>

              {/* Product Specifications & Interactive Controls (7 Cols) */}
              <div className="sm:col-span-7 flex flex-col justify-between space-y-5">
                {/* Header with Wishlist Heart */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-light text-white">
                      {activeSwatch.name}
                    </h3>
                    <p className="text-xs text-vsaad-ivory-muted font-sans mt-0.5">
                      {activeSwatch.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    aria-label="Save to wishlist"
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                      isLiked
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                        : 'bg-white/5 border-white/12 text-vsaad-ivory-muted hover:text-white hover:border-white/25'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Stone Variant Swatches */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-vsaad-ivory-dark mb-2">
                    Stone Varieties ({SWATCH_ITEMS.length})
                  </div>
                  <div className="flex items-center gap-2">
                    {SWATCH_ITEMS.map((item) => {
                      const isSelected = activeSwatch.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveSwatch(item)}
                          className={`relative w-8 h-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#A855F7] scale-110 shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                              : 'border-white/20 opacity-70 hover:opacity-100 hover:border-white/50'
                          }`}
                          title={item.name}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dimensions & Caliber Selector */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-vsaad-ivory-dark mb-2">
                    Dimensions &amp; Caliber
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['600 x 600', '600 x 1200', '800 x 1600'].map((format) => {
                      const isFormatActive = activeFormat === format;
                      return (
                        <button
                          key={format}
                          type="button"
                          onClick={() => setActiveFormat(format)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all ${
                            isFormatActive
                              ? 'bg-[#8B5CF6]/30 border border-[#A855F7] text-white shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                              : 'bg-white/5 border border-white/10 text-vsaad-ivory-muted hover:text-white hover:border-white/25'
                          }`}
                        >
                          {format}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-2">
                  <Link
                    to={`/products/${activeSwatch.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-[#8B5CF6] border border-white/15 hover:border-[#8B5CF6] text-xs font-semibold text-white tracking-wide transition-all shadow-md group"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Features Card + Living Patterns (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Features Glass Card with Purple Glow Border */}
            <div className="rounded-3xl p-6 sm:p-7 bg-[#131220]/70 backdrop-blur-2xl border-2 border-[#8B5CF6]/40 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(139,92,246,0.1)] space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#C084FC] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">Scratch Resistant</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#C084FC] shrink-0">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">Easy to Clean</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#C084FC] shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">Premium Finish</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#C084FC] shrink-0">
                    <InfinityIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">Long Lasting</span>
                </div>
              </div>
            </div>

            {/* Living Patterns Preview with Floating Frosted Glass Badge */}
            <div className="relative rounded-3xl overflow-hidden border border-white/12 shadow-[0_25px_55px_rgba(0,0,0,0.7)] group flex-1 min-h-[220px]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Modern Living with VSAAD Tiles"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Floating Glass Pill Badge in Bottom Right */}
              <div className="absolute bottom-4 right-4 z-20">
                <Link
                  to="/tiles"
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#111118]/85 backdrop-blur-xl border border-white/18 shadow-[0_15px_30px_rgba(0,0,0,0.7)] hover:border-[#A855F7] transition-all group/badge"
                >
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white">Modern Patterns</div>
                    <div className="text-[10px] text-vsaad-ivory-dark font-sans">For Modern Living</div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
