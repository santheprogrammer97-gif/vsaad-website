import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Package,
  ArrowRight,
  Eye,
  CheckCircle2,
  Box,
} from 'lucide-react';
import { TilesHero } from '../../components/vsaad/tiles/TilesHero';
import { TilesCategoryGlassGrid } from '../../components/vsaad/tiles/TilesCategoryGlassGrid';
import { TilesCatalogueGrid } from '../../components/vsaad/tiles/TilesCatalogueGrid';
import { TilesSpecSheetModal } from '../../components/vsaad/tiles/TilesSpecSheetModal';
import { GlassCard } from '../../components/vsaad/glass/GlassCard';
import { LightboxModal } from '../../components/vsaad/LightboxModal';
import type { VsaadGalleryItem } from '../../types/vsaadTypes';

// Dedicated Architectural Realized Tile Installations for the page gallery
const TILE_INSTALLATIONS: VsaadGalleryItem[] = [
  {
    id: 'tile-inst-01',
    title: 'Monolithic Obsidian Floor — Minimalist Penthouse',
    location: 'Banjara Hills, Hyderabad',
    category: 'flooring',
    categoryLabel: 'Flooring',
    image: '/images/gallery-living-flooring.jpg',
    material: 'Matte Satin (800×1600mm)',
    description: 'Ultra-thin 1mm rectified joints create an uninterrupted dark obsidian floor across open-concept living and dining zones.',
  },
  {
    id: 'tile-inst-02',
    title: 'Statuario Luxe Seamless Shower Cladding',
    location: 'Jubilee Hills, Hyderabad',
    category: 'cladding',
    categoryLabel: 'Wall Cladding',
    image: '/images/gallery-marble-wall.jpg',
    material: 'High-Gloss Glazed (1200×2400mm)',
    description: 'Full-height bookmatched porcelain slabs eliminating grout lines in master ensuite shower enclosure.',
  },
  {
    id: 'tile-inst-03',
    title: 'Basalt Grip R11 Cantilevered Terrace Deck',
    location: 'Gachibowli, Hyderabad',
    category: 'commercial',
    categoryLabel: 'Terraces & Exterior',
    image: '/images/gallery-exterior-facade.jpg',
    material: 'R11 Anti-Slip Structured (600×600mm)',
    description: '20mm thick self-supporting porcelain pavers set on adjustable pedestals for weather-proof exterior roof garden drainage.',
  },
  {
    id: 'tile-inst-04',
    title: 'Calacatta Oro Executive Reception Feature Wall',
    location: 'HITEC City, Hyderabad',
    category: 'interiors',
    categoryLabel: 'Feature Wall',
    image: '/images/product-calacatta-gold.jpg',
    material: 'Diamond Polished (1200×2400mm)',
    description: 'Mirror-matched architectural slabs delivering warm gold veining across a double-height corporate welcome lobby.',
  },
];

export const VsaadTilesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const subCategoryParam = searchParams.get('sub') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>(subCategoryParam);
  const [isSpecSheetOpen, setIsSpecSheetOpen] = useState(false);

  // Lightbox for Tile Installations Gallery
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Sync state with URL search param
  useEffect(() => {
    setActiveCategory(subCategoryParam);
  }, [subCategoryParam]);

  useEffect(() => {
    document.title = 'Architectural Tiles & Large Format Porcelain | VSAAD Surfaces';
    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get('scrollTo');
    if (scrollTarget) {
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) el.scrollIntoView({ behavior: 'auto' });
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
    if (params.get('specs') === '1') {
      setIsSpecSheetOpen(true);
    }
  }, []);

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const params: Record<string, string> = {};
    if (categoryId !== 'all') {
      params.sub = categoryId;
    }
    setSearchParams(params, { replace: true });

    // Smooth scroll to catalogue grid
    const el = document.getElementById('catalogue-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExplore = () => {
    const el = document.getElementById('category-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHideHero = new URLSearchParams(window.location.search).get('hideHero') === '1';

  return (
    <div className="min-h-screen bg-[#07070A] text-vsaad-ivory font-sans selection:bg-vsaad-purple selection:text-white">
      {/* 1. Cinematic 3D Apple-Inspired Hero */}
      {!isHideHero && (
        <TilesHero
          onExploreClick={scrollToExplore}
          onSpecSheetClick={() => setIsSpecSheetOpen(true)}
        />
      )}

      {/* 2. Glassmorphism Category Cards Grid */}
      <div id="category-grid-section">
        <TilesCategoryGlassGrid
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* 3. Filterable Interactive Catalogue with Glass Cards */}
      <TilesCatalogueGrid
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onOpenSpecSheet={() => setIsSpecSheetOpen(true)}
      />

      {/* 4. Realized Architectural Environments Gallery */}
      <section className="relative py-24 bg-[#09090E] overflow-hidden border-t border-white/5">
        <div
          className="absolute -top-32 left-1/3 w-[600px] h-[500px] bg-vsaad-purple/8 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vsaad-purple/10 border border-vsaad-purple/25 backdrop-blur-md mb-3">
                <Eye className="w-3.5 h-3.5 text-vsaad-purple-light" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-vsaad-purple-light font-medium">
                  Realized Installations
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                Surfaces in <span className="text-vsaad-purple-light italic font-normal">Living Context.</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-vsaad-ivory-muted font-sans font-light max-w-xl">
                See how VSAAD vitrified porcelain slabs and precision tiles elevate luxury residences, master bathrooms, and architectural terraces.
              </p>
            </div>

            <Link
              to="/gallery"
              className="self-start md:self-auto inline-flex items-center gap-2 text-xs font-sans text-vsaad-purple-light hover:text-white uppercase tracking-[0.16em] transition-colors"
            >
              <span>Explore Master Project Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TILE_INSTALLATIONS.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveGalleryIndex(index);
                  setLightboxOpen(true);
                }}
                className="group cursor-pointer"
              >
                <GlassCard
                  variant="card"
                  interactive
                  className="h-full overflow-hidden flex flex-col justify-between border-white/10 group-hover:border-vsaad-purple/50 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-[#0F0F14]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10] via-transparent to-black/30" />
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/70 border border-white/10 text-[10px] font-sans font-medium text-vsaad-purple-light backdrop-blur-md">
                      {item.material}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-vsaad-ivory-dark block mb-1">
                        {item.location}
                      </span>
                      <h3 className="font-display text-base font-light text-white group-hover:text-vsaad-purple-light transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs text-vsaad-ivory-muted font-sans font-light line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-vsaad-purple-light font-medium">
                      <span>Inspect Space</span>
                      <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Apple-Style Sample Box & Consultation Callout */}
      <section className="relative py-24 bg-[#07070A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <GlassCard
            variant="highlight"
            glow
            className="p-8 sm:p-12 lg:p-16 relative overflow-hidden border-vsaad-purple/40 shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_50px_rgba(168,85,247,0.2)]"
          >
            {/* Ambient Radial Lighting Inside Glass */}
            <div
              className="absolute -right-20 -bottom-20 w-[450px] h-[450px] bg-vsaad-purple/20 rounded-full blur-[100px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vsaad-purple/15 border border-vsaad-purple/30 backdrop-blur-md mb-4">
                  <Box className="w-3.5 h-3.5 text-vsaad-purple-light" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-vsaad-purple-light font-medium">
                    Architectural Sample Service
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                  Request a Curated <span className="text-vsaad-purple-light italic font-normal">Tile Sample Box.</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-vsaad-ivory-muted font-sans font-light max-w-2xl leading-relaxed">
                  Experience the tactile satin touch, calibrated 90° diamond edge rectifications, and authentic mineral 
                  depth first-hand. We dispatch custom curated 150×150mm tile specimens directly to your architectural studio or residence.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-sans text-vsaad-ivory-light">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Complimentary for Architects &amp; Designers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Includes Complete ISO 10545 Spec Dossier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Fast Dispatch Across Telangana &amp; AP</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
                <Link
                  to="/contact?interest=sample-box"
                  className="px-6 py-3.5 rounded-xl text-center text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-white bg-vsaad-purple hover:bg-vsaad-purple-light transition-all shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  <span>Request Sample Box</span>
                </Link>

                <button
                  onClick={() => setIsSpecSheetOpen(true)}
                  className="px-6 py-3.5 rounded-xl text-center text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-vsaad-ivory hover:text-white bg-white/5 hover:bg-white/10 border border-white/12 transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-vsaad-purple-light" />
                  <span>Inspect Spec Sheet</span>
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Lightbox Modal for Realized Tile Installations */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={TILE_INSTALLATIONS}
        currentIndex={activeGalleryIndex}
        onNavigate={setActiveGalleryIndex}
      />

      {/* Technical Spec Sheet Modal */}
      <TilesSpecSheetModal
        isOpen={isSpecSheetOpen}
        onClose={() => setIsSpecSheetOpen(false)}
      />
    </div>
  );
};
