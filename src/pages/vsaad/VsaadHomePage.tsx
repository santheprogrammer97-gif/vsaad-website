import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Truck,
  Compass,
  ArrowUpRight,
  Eye,
  ChevronRight,
  ChevronDown,
  Check,
  Box,
} from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';
import { ProductCard } from '../../components/vsaad/ProductCard';
import { LightboxModal } from '../../components/vsaad/LightboxModal';
import { TextReveal } from '../../components/vsaad/motion/TextReveal';
import { ImageReveal } from '../../components/vsaad/motion/ImageReveal';
import { MagneticButton } from '../../components/vsaad/motion/MagneticButton';
import { TiltCard } from '../../components/vsaad/motion/TiltCard';
import { GraniteSlab3DViewer } from '../../components/vsaad/3d/GraniteSlab3DViewer';
import { gsap, prefersReducedMotion } from '../../components/vsaad/motion/motionConfig';
import { CinematicBackground } from '../../components/vsaad/CinematicBackground';
import { HomeGlassShowcaseSection } from '../../components/vsaad/home/HomeGlassShowcaseSection';

export const VsaadHomePage: React.FC = () => {
  const { products, gallery, blogPosts, faqs, siteConfig } = useVsaad();

  // Section 2: Tab for Granite Catalogue showcase ('all' | 'polished' | 'lapotra')
  const [activeCatalogueTab, setActiveCatalogueTab] = useState<'all' | 'polished' | 'lapotra'>('all');

  // Section 3: Interactive finish selector ('polished' | 'lapotra')
  const [activeFinish, setActiveFinish] = useState<'polished' | 'lapotra'>('polished');

  // Section 3: View mode for slab display ('3d' | 'photo')
  const [finishViewMode, setFinishViewMode] = useState<'3d' | 'photo'>('3d');

  // Hero section container ref for orchestrated entrance
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 22, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, delay: 0.15 }
      )
        .fromTo(
          '.hero-heading-line',
          { opacity: 0, y: 45, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.05, stagger: 0.14 },
          '-=0.55'
        )
        .fromTo(
          '.hero-subheading',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85 },
          '-=0.65'
        )
        .fromTo(
          '.hero-cta-btn',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 },
          '-=0.55'
        )
        .fromTo(
          '.hero-scroll-prompt',
          { opacity: 0, y: -10 },
          { opacity: 0.65, y: 0, duration: 0.7 },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get('scrollTo');
    if (scrollTarget) {
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) el.scrollIntoView({ behavior: 'auto' });
      }, 400);
    }
  }, []);

  // Section 7: FAQ accordion state
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || 'faq-1');

  // Lightbox state for gallery preview
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Granite products filter
  const isHideHero = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('hideHero') === '1';

  const graniteProducts = useMemo(() => {
    return products.filter(p => p.category === 'granite');
  }, [products]);

  // Displayed granite products based on active tab
  const displayedGranite = useMemo(() => {
    if (activeCatalogueTab === 'polished') {
      return graniteProducts.filter(p => p.finishGroup === 'Polished');
    }
    if (activeCatalogueTab === 'lapotra') {
      return graniteProducts.filter(p => p.finishGroup === 'Lapotra');
    }
    // 'all': Show a curated set of 8 distinct slabs covering both finishes
    return graniteProducts.slice(0, 8);
  }, [graniteProducts, activeCatalogueTab]);

  // Finishes data for Section 3 "Find Your Finish"
  const finishesData = {
    polished: {
      name: 'Polished Granite',
      title: 'High-Gloss Diamond Polished Granite',
      headline: 'Mirror Clarity, High Color Saturation & Natural Crystalline Depth',
      description:
        'Successive passes of diamond-impregnated resin discs buff the natural volcanic quartz, feldspar, and biotite crystals to an impervious mirror surface. Maximizes ambient light reflection, deepens the natural stone hues, and creates an opulent architectural presence.',
      reflectivity: '94% Specular Mirror Reflection',
      slipRating: 'R9 (Interior Dry Slip Resistance)',
      tactileProfile: 'Ultra-smooth, diamond-buffed mirror finish with glass-like planar uniformity.',
      applications: [
        'Luxury Kitchen Countertops & Islands',
        'Grand Living Hall & Lobby Flooring',
        'Executive Bathroom Vanities',
        'Statement Architectural Wall Panels',
      ],
      maintenance: 'Penetrating fluoropolymer sealer application recommended every 3 to 5 years.',
      previewImage: '/images/product-steel-grey-polished.jpg',
      specimenPair: [
        {
          name: 'Steel Grey (Polished)',
          slug: 'steel-grey-polished',
          image: '/images/product-steel-grey-polished.jpg',
          note: 'Deep charcoal tone with crisp specular reflections',
        },
        {
          name: 'Tan Brown (Polished)',
          slug: 'tan-brown-polished',
          image: '/images/product-tan-brown.jpg',
          note: 'Rich chocolate swirls with high-gloss crystalline luster',
        },
        {
          name: 'River Black (Polished)',
          slug: 'river-black-polished',
          image: '/images/product-river-black-polished.jpg',
          note: 'Glossy dark obsidian matrix with flowing mineral veining',
        },
      ],
    },
    lapotra: {
      name: 'Lapotra Granite',
      title: 'Tactile Diamond-Brushed Lapotra Granite',
      headline: 'Satin-Matte Organic Texture, Natural Grip & Fingerprint Immunity',
      description:
        'Engineered through precision diamond-filament abrasives that gently relieve softer minerals while leaving the quartz core raised in sensory texture. Provides an understated contemporary matte finish that diffuses light, hides everyday water spots, and provides superior non-slip traction.',
      reflectivity: '22% Diffuse Satin Sheen (Non-Glare)',
      slipRating: 'R11 (Natural Tactile Wet & Dry Traction)',
      tactileProfile: 'Velvety leathered grain with microscopic mineral relief; pleasant and soft to touch.',
      applications: [
        'Contemporary Minimalist Flooring',
        'Chef Kitchen Counters & Food Prep Areas',
        'Cantilevered Stair Treads & Risers',
        'Covered Patios & Semi-Outdoor Verandas',
      ],
      maintenance: 'Naturally masks fingerprints and water spots; annual penetrating impregnator suggested.',
      previewImage: '/images/product-steel-grey-lapotra.jpg',
      specimenPair: [
        {
          name: 'Steel Grey (Lapotra)',
          slug: 'steel-grey-lapotra',
          image: '/images/product-steel-grey-lapotra.jpg',
          note: 'Muted satin charcoal with anti-glare architectural softness',
        },
        {
          name: 'Tan Brown (Lapotra)',
          slug: 'tan-brown-lapotra',
          image: '/images/product-tan-brown-lapotra.jpg',
          note: 'Textured leathered cocoa grain with organic tactile grip',
        },
        {
          name: 'River Black (Lapotra)',
          slug: 'river-black-lapotra',
          image: '/images/product-river-black-lapotra.jpg',
          note: 'Matte obsidian with tactile river-stone wave texture',
        },
      ],
    },
  };

  const currentFinishInfo = finishesData[activeFinish];

  return (
    <div className="bg-[#08080A] text-vsaad-ivory min-h-screen">
      {/* 1. CINEMATIC HERO (Preserved approved purple energy crack background) */}
      {!isHideHero && (
        <section
          ref={heroRef}
          className="relative min-h-[92svh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        >
          <CinematicBackground variant="hero" className="absolute inset-0 w-full h-full">
            <div className="max-w-5xl mx-auto min-h-[92svh] lg:min-h-screen flex flex-col justify-center items-center text-center px-4 pt-28 pb-24 relative z-20">
              {/* Eyebrow */}
              <div className="hero-eyebrow inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121218]/85 border border-vsaad-purple/35 text-vsaad-purple-light text-[11px] sm:text-xs font-sans tracking-[0.28em] uppercase mb-6 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                <Sparkles className="w-3.5 h-3.5 text-vsaad-purple" />
                <span>{siteConfig?.heroEyebrow || 'NATURAL STONE COLLECTIONS'}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-vsaad-ivory leading-[1.08] mb-6 max-w-4xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] overflow-hidden">
                <span className="hero-heading-line block">Nature, Refined.</span>
                <span className="hero-heading-line block italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-vsaad-ivory via-vsaad-purple-light to-vsaad-purple">
                  Spaces, Reimagined.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="hero-subheading text-sm sm:text-lg md:text-xl text-vsaad-ivory-muted max-w-2xl font-sans font-light leading-relaxed mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                {siteConfig?.heroSubheadline ||
                  'Discover natural granite and architectural tiles selected for the spaces you live in. Precision cut and diamond-calibrated in Chennai.'}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-6">
                <div className="hero-cta-btn w-full sm:w-auto">
                  <MagneticButton strength={0.3}>
                    <Link
                      to="/products?category=granite"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xs bg-gradient-to-r from-vsaad-purple to-vsaad-purple-deep hover:from-vsaad-purple-light hover:to-vsaad-purple text-white text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
                    >
                      <span>Explore Granite</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </MagneticButton>
                </div>

                <div className="hero-cta-btn w-full sm:w-auto">
                  <MagneticButton strength={0.25}>
                    <Link
                      to="/tiles"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xs bg-[#13131A]/85 hover:bg-[#1A1A24] border border-[#2A2A38] hover:border-vsaad-purple/50 text-vsaad-ivory text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                    >
                      <span>Explore Tiles</span>
                      <ArrowRight className="w-4 h-4 text-vsaad-purple-light" />
                    </Link>
                  </MagneticButton>
                </div>

                <div className="hero-cta-btn w-full sm:w-auto">
                  <MagneticButton strength={0.2}>
                    <Link
                      to="/gallery"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xs bg-[#0F0F14]/75 hover:bg-[#1A1A24] border border-[#22222E] hover:border-vsaad-purple/40 text-vsaad-ivory-muted hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-1.5"
                    >
                      <span>View Gallery</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-vsaad-purple" />
                    </Link>
                  </MagneticButton>
                </div>
              </div>

              {/* Micro Scroll Prompt */}
              <div className="hero-scroll-prompt absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-[10px] tracking-[0.3em] uppercase text-vsaad-ivory-dark font-sans mb-1.5">
                  Scroll to Explore
                </span>
                <div className="w-[1px] h-7 bg-gradient-to-b from-vsaad-purple to-transparent animate-pulse" />
              </div>
            </div>
          </CinematicBackground>
        </section>
      )}

      {/* CURATED GLASSMORPHISM SURFACES & SHOWCASE SUITE */}
      <HomeGlassShowcaseSection />

      {/* SECTION 2: GRANITE CATALOGUE SHOWCASE (TABBED / FILTERABLE BY FINISH) */}
      <section id="catalogue-section" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F] border-t border-[#1C1C26]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
                Official Showroom Selection
              </span>
              <TextReveal
                as="h2"
                variant="line-mask"
                className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-2"
              >
                Granite Catalogue
              </TextReveal>
              <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans mt-2 max-w-xl">
                Explore the complete 20-stone VSAAD granite repertoire. Classified into mirror-gloss Polished and textured Lapotra surface treatments.
              </p>
            </div>

            {/* Finish Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-[#121218] p-1.5 rounded-sm border border-[#2A2A38] shrink-0">
              <button
                type="button"
                onClick={() => setActiveCatalogueTab('all')}
                className={`px-4 py-2 rounded-xs text-xs font-sans uppercase tracking-wider transition-all duration-300 ${
                  activeCatalogueTab === 'all'
                    ? 'bg-vsaad-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-medium'
                    : 'text-vsaad-ivory-muted hover:text-white'
                }`}
              >
                All Varieties (20)
              </button>

              <button
                type="button"
                onClick={() => setActiveCatalogueTab('polished')}
                className={`px-4 py-2 rounded-xs text-xs font-sans uppercase tracking-wider transition-all duration-300 ${
                  activeCatalogueTab === 'polished'
                    ? 'bg-vsaad-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-medium'
                    : 'text-vsaad-ivory-muted hover:text-white'
                }`}
              >
                Polished Granite (17)
              </button>

              <button
                type="button"
                onClick={() => setActiveCatalogueTab('lapotra')}
                className={`px-4 py-2 rounded-xs text-xs font-sans uppercase tracking-wider transition-all duration-300 ${
                  activeCatalogueTab === 'lapotra'
                    ? 'bg-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.4)] font-medium'
                    : 'text-vsaad-ivory-muted hover:text-white'
                }`}
              >
                Lapotra Granite (3)
              </button>
            </div>
          </div>

          {/* Product Cards Grid with smooth transition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300">
            {displayedGranite.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Direct Link to Full Catalogue */}
          <div className="mt-14 pt-8 border-t border-[#1C1C26] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-vsaad-ivory-muted font-sans">
              Showing {displayedGranite.length} of {graniteProducts.length} certified granite varieties. Diamond-calibrated to custom order thicknesses.
            </p>
            <MagneticButton strength={0.2}>
              <Link
                to="/products?category=granite"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xs bg-[#14141C] border border-[#2A2A38] hover:border-vsaad-purple/60 text-vsaad-ivory hover:text-vsaad-purple-light text-xs uppercase tracking-[0.2em] font-sans font-medium transition-colors"
              >
                <span>Explore All 20 Granite Slabs</span>
                <ArrowRight className="w-4 h-4 text-vsaad-purple" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* SECTION 3: FIND YOUR FINISH (INTERACTIVE FINISH SELECTOR: POLISHED VS LAPOTRA) */}
      <section id="finishes-section" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1C1C26]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
              Masonry Science
            </span>
            <TextReveal
              as="h2"
              variant="line-mask"
              className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-2"
            >
              Find Your Finish
            </TextReveal>
            <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans mt-3 leading-relaxed">
              Surface treatments dramatically alter how natural granite interacts with ambient light, daily tactile friction, and moisture. Compare our two signature finish profiles.
            </p>

            {/* Selector Buttons */}
            <div className="inline-flex flex-wrap justify-center p-1.5 mt-8 rounded-sm bg-[#121218] border border-[#2A2A38] gap-1">
              <button
                type="button"
                onClick={() => setActiveFinish('polished')}
                className={`px-6 sm:px-8 py-3 rounded-xs text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 flex items-center gap-2 ${
                  activeFinish === 'polished'
                    ? 'bg-vsaad-purple text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] font-semibold'
                    : 'text-vsaad-ivory-muted hover:text-vsaad-ivory'
                }`}
              >
                <span>Polished Granite</span>
                <span className="text-[10px] font-mono opacity-80">(17 Slabs)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFinish('lapotra')}
                className={`px-6 sm:px-8 py-3 rounded-xs text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 flex items-center gap-2 ${
                  activeFinish === 'lapotra'
                    ? 'bg-amber-600 text-white shadow-[0_0_20px_rgba(217,119,6,0.4)] font-semibold'
                    : 'text-vsaad-ivory-muted hover:text-vsaad-ivory'
                }`}
              >
                <span>Lapotra Granite</span>
                <span className="text-[10px] font-mono opacity-80">(3 Slabs)</span>
              </button>
            </div>

            {/* Display Mode Toggle */}
            <div className="flex items-center justify-center gap-2 mt-5">
              <span className="text-[11px] font-sans uppercase tracking-widest text-vsaad-ivory-dark mr-1">
                Visualizer:
              </span>
              <button
                type="button"
                onClick={() => setFinishViewMode('3d')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-300 ${
                  finishViewMode === '3d'
                    ? 'bg-vsaad-purple/30 border border-vsaad-purple text-vsaad-purple-light shadow-[0_0_15px_rgba(168,85,247,0.35)] font-medium'
                    : 'bg-[#121218] border border-[#2A2A38] text-vsaad-ivory-muted hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-vsaad-purple" />
                <span>3D Interactive Slab</span>
              </button>
              <button
                type="button"
                onClick={() => setFinishViewMode('photo')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-300 ${
                  finishViewMode === 'photo'
                    ? 'bg-vsaad-purple/30 border border-vsaad-purple text-vsaad-purple-light shadow-[0_0_15px_rgba(168,85,247,0.35)] font-medium'
                    : 'bg-[#121218] border border-[#2A2A38] text-vsaad-ivory-muted hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-vsaad-purple" />
                <span>High-Res Photo</span>
              </button>
            </div>
          </div>

          {/* Comparator Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#0F0F14] border border-[#22222E] rounded-sm p-6 sm:p-10">
            {/* Visual Image or 3D Preview */}
            <div className="lg:col-span-5 relative rounded-sm overflow-hidden bg-black border border-[#2A2A38] min-h-[380px] lg:min-h-[460px] flex flex-col justify-end">
              {finishViewMode === '3d' ? (
                <div className="absolute inset-0 w-full h-full">
                  <GraniteSlab3DViewer finish={activeFinish} className="w-full h-full" />
                </div>
              ) : (
                <>
                  <img
                    src={currentFinishInfo.previewImage}
                    alt={currentFinishInfo.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85" />
                </>
              )}

              <div className="relative z-10 p-6 space-y-3 pointer-events-none">
                <span
                  className={`inline-block px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider ${
                    activeFinish === 'polished'
                      ? 'bg-vsaad-purple/80 text-white'
                      : 'bg-amber-600/80 text-white'
                  }`}
                >
                  {currentFinishInfo.name}
                </span>
                <h4 className="text-xl font-display text-white">{currentFinishInfo.title}</h4>
                <div className="flex flex-wrap gap-2 text-xs font-mono pt-2">
                  <span className="bg-black/80 px-2.5 py-1 rounded text-vsaad-purple-light border border-vsaad-purple/30">
                    {currentFinishInfo.slipRating}
                  </span>
                  <span className="bg-black/80 px-2.5 py-1 rounded text-vsaad-ivory border border-white/10">
                    {currentFinishInfo.reflectivity}
                  </span>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono tracking-widest text-vsaad-purple-light uppercase">
                  Surface Profile & Characteristics
                </span>
                <h3 className="text-2xl sm:text-3xl font-display text-vsaad-ivory mt-1">
                  {currentFinishInfo.headline}
                </h3>
                <p className="text-sm text-vsaad-ivory-muted font-sans leading-relaxed mt-3">
                  {currentFinishInfo.description}
                </p>
              </div>

              {/* Tactical Spec Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xs bg-[#16161F] border border-[#262634]">
                  <span className="text-[10px] uppercase tracking-wider text-vsaad-ivory-dark block font-sans">
                    Recommended Environments
                  </span>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-vsaad-ivory">
                    {currentFinishInfo.applications.map(app => (
                      <li key={app} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-vsaad-purple shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xs bg-[#16161F] border border-[#262634] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-vsaad-ivory-dark block font-sans">
                      Tactile Sensory Feel
                    </span>
                    <p className="mt-2 text-xs text-vsaad-ivory leading-relaxed font-sans">
                      {currentFinishInfo.tactileProfile}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#262634]">
                    <span className="text-[10px] uppercase tracking-wider text-vsaad-ivory-dark block font-sans">
                      Maintenance Protocol
                    </span>
                    <p className="mt-1 text-[11px] text-vsaad-ivory-muted leading-relaxed font-sans">
                      {currentFinishInfo.maintenance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stone Twin Comparison Preview */}
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-vsaad-ivory-dark block font-sans mb-3">
                  Specimen Examples in {currentFinishInfo.name}:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {currentFinishInfo.specimenPair.map(specimen => (
                    <TiltCard key={specimen.slug} maxTilt={6} className="h-full">
                      <Link
                        to={`/products/${specimen.slug}`}
                        className="group/item block p-2.5 rounded-xs bg-[#13131A] border border-[#22222E] hover:border-vsaad-purple/50 transition-colors h-full"
                      >
                        <img
                          src={specimen.image}
                          alt={specimen.name}
                          className="w-full aspect-[4/3] object-cover rounded-xs mb-2 group-hover/item:scale-104 transition-transform"
                        />
                        <span className="text-xs font-display text-vsaad-ivory group-hover/item:text-vsaad-purple-light block truncate">
                          {specimen.name}
                        </span>
                        <span className="text-[10px] text-vsaad-ivory-dark block truncate mt-0.5">
                          {specimen.note}
                        </span>
                      </Link>
                    </TiltCard>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <MagneticButton strength={0.2}>
                  <Link
                    to={`/products?category=granite`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xs bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-wider font-medium transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    <span>Explore {currentFinishInfo.name} Catalogue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ARCHITECTURAL GALLERY (APPLICATIONS: KITCHENS, STAIRS, FLOORING, CLADDING, COMMERCIAL) */}
      <section id="gallery-section" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F] border-t border-[#1C1C26]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
                Realised Environments
              </span>
              <TextReveal
                as="h2"
                variant="line-mask"
                className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-2"
              >
                Architectural Gallery
              </TextReveal>
              <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans mt-2 max-w-xl">
                Showcasing natural granite and architectural tile applications: custom kitchen islands, cantilevered stair treads, large-format flooring, and exterior facades.
              </p>
            </div>

            <MagneticButton strength={0.2}>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-vsaad-ivory hover:text-vsaad-purple-light font-sans mt-4 md:mt-0 transition-colors"
              >
                <span>Explore All Projects ({gallery.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.slice(0, 6).map((item, idx) => (
              <TiltCard key={item.id} maxTilt={7} glareColor="rgba(168, 85, 247, 0.12)" className="rounded-sm h-full">
                <div
                  onClick={() => {
                    setActiveGalleryIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-[#0A0A0E] border border-[#22222E] hover:border-vsaad-purple/50 cursor-pointer transition-all duration-500 h-full"
                >
                  <div className="absolute inset-0">
                    <ImageReveal
                      src={item.image}
                      alt={item.title}
                      aspect="4/3"
                      direction="up"
                      scaleEffect
                      parallax
                      className="w-full h-full"
                      imgClassName="group-hover:scale-106 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-65 transition-opacity pointer-events-none" />

                  <div className="absolute inset-0 p-5 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded-xs text-[10px] tracking-wider uppercase font-mono bg-black/75 text-vsaad-purple-light border border-vsaad-purple/30">
                        {item.categoryLabel}
                      </span>
                      <div className="p-2 rounded-full bg-black/60 text-vsaad-ivory opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4 text-vsaad-purple-light" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-display text-vsaad-ivory group-hover:text-vsaad-purple-light transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-vsaad-ivory-dark font-sans mt-0.5">
                        {item.material} • {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE VSAAD (GROUND CREDIBILITY IN REAL OPERATIONS) */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1C1C26]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
              Operational Standards
            </span>
            <TextReveal
              as="h2"
              variant="line-mask"
              className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-2"
            >
              Why Choose VSAAD
            </TextReveal>
            <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans mt-3 leading-relaxed">
              Granite forms under subterranean pressures over millions of years. Our operations preserve that geological integrity from the quarry bed to your finished space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TiltCard maxTilt={8} className="rounded-sm">
              <div className="p-6 bg-[#0F0F14] border border-[#22222E] rounded-sm space-y-3 h-full hover:border-vsaad-purple/40 transition-colors">
                <div className="w-10 h-10 rounded-sm bg-vsaad-purple/10 border border-vsaad-purple/30 flex items-center justify-center text-vsaad-purple-light">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display text-vsaad-ivory">Direct Quarry Sourcing</h3>
                <p className="text-xs text-vsaad-ivory-muted font-sans leading-relaxed">
                  Direct partnerships with historic plutonic quarries across Chimakurthi, Ongole, Telangana, and Rajasthan. No intermediaries, strict single-grade block selection.
                </p>
              </div>
            </TiltCard>

            <TiltCard maxTilt={8} className="rounded-sm">
              <div className="p-6 bg-[#0F0F14] border border-[#22222E] rounded-sm space-y-3 h-full hover:border-vsaad-purple/40 transition-colors">
                <div className="w-10 h-10 rounded-sm bg-vsaad-purple/10 border border-vsaad-purple/30 flex items-center justify-center text-vsaad-purple-light">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display text-vsaad-ivory">Precision Diamond Calibration</h3>
                <p className="text-xs text-vsaad-ivory-muted font-sans leading-relaxed">
                  Multi-blade gangsaw processing and multi-head calibration to strict 18mm, 20mm, and 30mm uniform thickness tolerances to guarantee seamless on-site leveling.
                </p>
              </div>
            </TiltCard>

            <TiltCard maxTilt={8} className="rounded-sm">
              <div className="p-6 bg-[#0F0F14] border border-[#22222E] rounded-sm space-y-3 h-full hover:border-vsaad-purple/40 transition-colors">
                <div className="w-10 h-10 rounded-sm bg-vsaad-purple/10 border border-vsaad-purple/30 flex items-center justify-center text-vsaad-purple-light">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display text-vsaad-ivory">Showroom Consultation in Chennai</h3>
                <p className="text-xs text-vsaad-ivory-muted font-sans leading-relaxed">
                  Direct slab bundle inspection and physical tagging at our Anna Salai showroom. Dedicated consultation for architects, developers, and homeowners.
                </p>
              </div>
            </TiltCard>

            <TiltCard maxTilt={8} className="rounded-sm">
              <div className="p-6 bg-[#0F0F14] border border-[#22222E] rounded-sm space-y-3 h-full hover:border-vsaad-purple/40 transition-colors">
                <div className="w-10 h-10 rounded-sm bg-vsaad-purple/10 border border-vsaad-purple/30 flex items-center justify-center text-vsaad-purple-light">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display text-vsaad-ivory">Secured Vertical A-Frame Transit</h3>
                <p className="text-xs text-vsaad-ivory-muted font-sans leading-relaxed">
                  Insured freight transit utilizing heavy-duty vertical timber A-frames and high-density foam cushioning to prevent micro-fractures and edge chipping.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* SECTION 6: ENQUIRY CTA ("FIND THE RIGHT SURFACE FOR YOUR SPACE") */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#121218] via-[#1A1A26] to-[#121218] border-y border-vsaad-purple/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
            Architectural Inquiries
          </span>
          <TextReveal
            as="h2"
            variant="line-mask"
            className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory"
          >
            Find the Right Surface for Your Space
          </TextReveal>
          <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans max-w-xl mx-auto leading-relaxed">
            Connect with our stone specialists in Chennai for custom gangsaw bundle inspections, digital templating, and factory edge profiling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <MagneticButton strength={0.3}>
              <Link
                to="/products?category=granite"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xs bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
              >
                <span>Explore Granite</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <Link
                to="/products?category=tiles"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xs bg-[#1A1A24] hover:bg-[#222230] border border-[#2A2A38] text-vsaad-ivory text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>Explore Tiles</span>
                <ArrowRight className="w-4 h-4 text-vsaad-purple-light" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xs bg-[#13131A] border border-[#2A2A38] text-vsaad-ivory text-xs uppercase tracking-[0.2em] font-medium hover:border-vsaad-purple transition-colors flex items-center justify-center gap-2"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4 text-vsaad-purple" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* SECTION 7: JOURNAL & FAQ PREVIEW (3 POSTS + TOP 4 EXPANDABLE FAQS) */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1C1C26]">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Sub-part A: Journal Articles (3) */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
                  The VSAAD Journal
                </span>
                <TextReveal
                  as="h2"
                  variant="line-mask"
                  className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-2"
                >
                  Insights & Masonry Notes
                </TextReveal>
              </div>

              <MagneticButton strength={0.2}>
                <Link
                  to="/journal"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-vsaad-ivory hover:text-vsaad-purple-light font-sans mt-4 md:mt-0 transition-colors"
                >
                  <span>View All Articles</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map(post => (
                <TiltCard key={post.id} maxTilt={6} className="h-full">
                  <article className="group bg-[#0F0F14] border border-[#22222E] rounded-sm overflow-hidden flex flex-col justify-between hover:border-vsaad-purple/40 transition-colors h-full">
                    <Link to={`/journal/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-black">
                      <ImageReveal
                        src={post.image}
                        alt={post.title}
                        aspect="16/10"
                        direction="up"
                        scaleEffect
                        className="w-full h-full"
                        imgClassName="group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-3 text-[11px] font-sans text-vsaad-ivory-dark mb-2">
                          <span className="text-vsaad-purple-light uppercase tracking-wider">{post.category}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <Link to={`/journal/${post.slug}`} className="block">
                          <h3 className="text-xl font-display text-vsaad-ivory group-hover:text-vsaad-purple-light transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-vsaad-ivory-muted font-sans mt-2 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#1C1C26] flex items-center justify-between text-xs text-vsaad-ivory-dark">
                        <span>{post.date}</span>
                        <Link
                          to={`/journal/${post.slug}`}
                          className="inline-flex items-center gap-1 text-vsaad-purple-light hover:text-white transition-colors uppercase tracking-wider text-[11px]"
                        >
                          <span>Read Article</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Sub-part B: FAQ Preview (Top 4 Expandable FAQs) */}
          <div className="pt-12 border-t border-[#1C1C26]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
                  Frequently Asked Questions
                </span>
                <TextReveal
                  as="h3"
                  variant="line-mask"
                  className="text-3xl sm:text-4xl font-display font-light text-vsaad-ivory mt-2"
                >
                  Frequently Addressed Queries
                </TextReveal>
              </div>

              <MagneticButton strength={0.2}>
                <Link
                  to="/faq"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-vsaad-ivory hover:text-vsaad-purple-light font-sans mt-4 md:mt-0 transition-colors"
                >
                  <span>View Complete FAQ Knowledgebase ({faqs.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </div>

            <div className="space-y-3 max-w-4xl">
              {faqs.slice(0, 4).map(faq => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-[#22222E] bg-[#0F0F14] rounded-sm overflow-hidden transition-all duration-300 hover:border-vsaad-purple/30"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#13131A] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/60 border border-[#2A2A38] text-vsaad-purple-light shrink-0">
                          {faq.category}
                        </span>
                        <span className="font-display text-base sm:text-lg text-vsaad-ivory">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-vsaad-purple-light shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-vsaad-ivory-muted font-sans leading-relaxed border-t border-[#1C1C26]/60">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={gallery}
        currentIndex={activeGalleryIndex}
        onNavigate={setActiveGalleryIndex}
      />
    </div>
  );
};
