import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Droplets,
  Infinity as InfinityIcon,
  Sparkles,
  Layers,
  Box,
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

export const ReferenceHeroSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSwatch, setActiveSwatch] = useState<SwatchItem>(SWATCH_ITEMS[0]);
  const [activeFormat, setActiveFormat] = useState<string>('600 x 1200');
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <section className="relative bg-[#07070A] text-white overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Ambient Radial Deep Purple Lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-b from-[#8B5CF6]/20 via-[#6D28D9]/10 to-transparent rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-[600px] h-[400px] bg-[#9333EA]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16 lg:space-y-20">
        {/* ========================================================================= */}
        {/* TOP HERO STAGE: LEFT TYPOGRAPHY + CENTER/RIGHT 3D SLABS ON GLOWING PLINTH */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px] lg:min-h-[620px]">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-5 text-left space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181028]/85 border border-[#A855F7]/40 text-[#C084FC] text-xs font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.25)]">
              PREMIUM COLLECTION
            </div>

            {/* Main Headline matching reference */}
            <h1 className="font-display font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.02]">
              <span className="block">Tiles</span>
              <span className="block italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] via-[#A855F7] to-[#C084FC] drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]">
                Reimagined
              </span>
            </h1>

            {/* Narrative text */}
            <p className="text-sm sm:text-base text-vsaad-ivory-muted max-w-md font-sans font-light leading-relaxed">
              Explore a refined collection of tiles crafted for modern spaces. Inspired by nature, designed for a better tomorrow.
            </p>

            {/* CTA Button matching reference: purple circular icon + text */}
            <div className="pt-2">
              <Link
                to="/tiles"
                className="inline-flex items-center gap-3.5 group cursor-pointer focus:outline-none"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] shadow-[0_0_22px_rgba(139,92,246,0.65)] flex items-center justify-center text-white group-hover:scale-108 transition-transform duration-300">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span className="text-sm font-sans tracking-wide text-white group-hover:text-[#C084FC] transition-colors font-medium">
                  Explore Collection
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Upright Slabs on Glowing Plinth with Glass Badges */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] sm:min-h-[500px]">
            {/* The 3D Stage Container */}
            <div className="relative w-full max-w-[580px] h-[460px] sm:h-[500px] flex items-center justify-center">
              {/* Back Stone Cavern Ambience & Candle Warm Accent */}
              <div className="absolute top-1/2 left-8 w-8 h-8 rounded-full bg-amber-400/25 blur-xl pointer-events-none" />

              {/* Plinth Underlight: Intense Horizontal Purple Neon Beam */}
              <div className="absolute bottom-12 left-0 right-0 z-10 flex flex-col items-center pointer-events-none">
                <div className="w-4/5 h-[3px] bg-gradient-to-r from-transparent via-[#C084FC] to-transparent shadow-[0_0_35px_#A855F7,0_0_70px_#8B5CF6]" />
                <div className="w-3/5 h-[20px] bg-[#A855F7]/35 blur-xl -mt-2" />
              </div>

              {/* Upright Standing Slabs Stage */}
              <div className="relative w-full h-full flex items-end justify-center pb-12 z-20">
                {/* 1. Left Slab: Nero Marquina with Calcite Veining */}
                <div className="relative w-[150px] sm:w-[175px] h-[320px] sm:h-[360px] rounded-sm overflow-hidden border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.9)] -mr-8 mb-4 rotate-[-4deg] z-20 bg-black">
                  <img
                    src="/images/product-black-morquino-polished.jpg"
                    alt="Nero Marquina Upright Slab"
                    className="w-full h-full object-cover brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </div>

                {/* 2. Center Tall Slab: Calacatta Grey (Featured Monolith) */}
                <div className="relative w-[170px] sm:w-[200px] h-[370px] sm:h-[420px] rounded-sm overflow-hidden border border-white/20 shadow-[0_35px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(168,85,247,0.3)] z-30 bg-[#0E0E14]">
                  <img
                    src="/images/product-calacatta-gold.jpg"
                    alt="Calacatta Grey Monolithic Slab"
                    className="w-full h-full object-cover brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {/* Floating Translucent Glass Info Badge over Calacatta Slab */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] p-3.5 sm:p-4 rounded-2xl bg-[#13131F]/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] flex items-center justify-between gap-3 z-40">
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                        Calacatta Grey
                      </div>
                      <div className="text-[10px] text-vsaad-ivory-muted">
                        Premium Vitrified Tile
                      </div>
                      <div className="text-[9px] text-[#C084FC] font-mono mt-0.5">
                        600 x 1200 mm
                      </div>
                    </div>
                    <Link
                      to="/products/calacatta-oro-bookmatched-wall-tile"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-[#8B5CF6] border border-white/15 hover:border-[#8B5CF6] flex items-center justify-center text-white transition-all shadow-md shrink-0"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* 3. Right Slab: Dark Charcoal Polished Granite */}
                <div className="relative w-[150px] sm:w-[175px] h-[330px] sm:h-[370px] rounded-sm overflow-hidden border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.9)] -ml-8 mb-3 rotate-[3deg] z-20 bg-black">
                  <img
                    src="/images/product-steel-grey-polished.jpg"
                    alt="Dark Charcoal Granite Slab"
                    className="w-full h-full object-cover brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </div>
              </div>

              {/* Floating Vertical Feature Glass Card on Right */}
              <div className="absolute top-8 right-0 sm:-right-4 z-40 p-4 rounded-2xl bg-[#13131E]/75 backdrop-blur-2xl border border-white/12 shadow-[0_25px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.18)] space-y-3.5 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/35 flex items-center justify-center text-[#C084FC] shadow-[0_0_10px_rgba(139,92,246,0.25)]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Modern</div>
                    <div className="text-[10px] text-vsaad-ivory-dark font-sans">Designs</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/35 flex items-center justify-center text-[#C084FC] shadow-[0_0_10px_rgba(139,92,246,0.25)]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Premium</div>
                    <div className="text-[10px] text-vsaad-ivory-dark font-sans">Quality</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/35 flex items-center justify-center text-[#C084FC] shadow-[0_0_10px_rgba(139,92,246,0.25)]">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Wide</div>
                    <div className="text-[10px] text-vsaad-ivory-dark font-sans">Collection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW OF 5 FROSTED GLASS CATEGORY CARDS (DESKTOP GRID / MOBILE STACK)       */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          {/* Desktop Horizontal Row / Mobile Vertical Stack */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
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
                          onClick={() => setActiveSwatch(item)}
                          className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                            isSelected
                              ? 'border-[#A855F7] shadow-[0_0_12px_rgba(168,85,247,0.5)] scale-105'
                              : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                          }`}
                          title={item.name}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Caliber Format Selector Pills */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-vsaad-ivory-dark mb-2">
                    Dimensions &amp; Caliber
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {['600 x 600', '600 x 1200', '800 x 1600'].map((fmt) => {
                      const isFmtActive = activeFormat === fmt;
                      return (
                        <button
                          key={fmt}
                          onClick={() => setActiveFormat(fmt)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                            isFmtActive
                              ? 'bg-[#8B5CF6]/20 border border-[#A855F7] text-white shadow-[0_0_12px_rgba(168,85,247,0.35)] font-medium'
                              : 'bg-white/[0.04] border border-white/10 text-vsaad-ivory-muted hover:text-white'
                          }`}
                        >
                          {fmt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* View Details Pill Button */}
                <div className="pt-2">
                  <Link
                    to={`/products/${activeSwatch.slug}`}
                    className="inline-flex items-center justify-between px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 hover:border-[#A855F7]/60 text-xs font-sans font-medium text-white tracking-wide transition-all shadow-lg group w-full sm:w-auto gap-4"
                  >
                    <span>View Details</span>
                    <div className="w-7 h-7 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(139,92,246,0.6)]">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Glass Features Card & Modern Patterns Preview (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* 1. Translucent Features Card with Purple Glowing Border */}
            <div className="rounded-3xl bg-[#12121E]/80 backdrop-blur-3xl border border-[#A855F7]/40 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(168,85,247,0.2)] p-6 sm:p-7 relative overflow-hidden">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/35 flex items-center justify-center text-[#C084FC] shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.25)]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white leading-tight">
                    Scratch Resistant
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/35 flex items-center justify-center text-[#C084FC] shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.25)]">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white leading-tight">
                    Easy to Clean
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/35 flex items-center justify-center text-[#C084FC] shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.25)]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white leading-tight">
                    Premium Finish
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/35 flex items-center justify-center text-[#C084FC] shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.25)]">
                    <InfinityIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white leading-tight">
                    Long Lasting
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Modern Patterns Tile Installation Preview with Floating Glass Pill */}
            <div className="relative rounded-3xl overflow-hidden border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex-1 min-h-[180px] bg-[#0E0E14] group">
              <img
                src="/images/gallery-living-flooring.jpg"
                alt="Modern Patterns Tile Installation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Glass Pill matching reference */}
              <Link
                to="/gallery"
                className="absolute bottom-5 right-5 z-20 px-4 py-2.5 rounded-full bg-[#14141F]/80 backdrop-blur-2xl border border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.7)] flex items-center gap-3 hover:border-[#A855F7] transition-all group/pill"
              >
                <div>
                  <div className="text-xs font-semibold text-white tracking-wide">
                    Modern Patterns
                  </div>
                  <div className="text-[10px] text-vsaad-ivory-muted font-sans">
                    For Modern Living
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shadow-[0_0_10px_rgba(139,92,246,0.6)] group-hover/pill:scale-110 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
