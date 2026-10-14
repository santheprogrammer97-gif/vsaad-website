import React, { useState, useMemo } from 'react';
import { Eye, MapPin } from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';
import { LightboxModal } from '../../components/vsaad/LightboxModal';

export const VsaadGalleryPage: React.FC = () => {
  const { gallery } = useVsaad();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Residential Interiors', value: 'interiors' },
    { label: 'Kitchens & Countertops', value: 'kitchens' },
    { label: 'Commercial Spaces', value: 'commercial' },
    { label: 'Flooring', value: 'flooring' },
    { label: 'Staircases', value: 'staircases' },
    { label: 'Wall Applications', value: 'cladding' },
    { label: 'Stone Close-ups', value: 'closeups' },
  ];

  const filteredGallery = useMemo(() => {
    if (activeCategory === 'all') return gallery;
    return gallery.filter(item => item.category === activeCategory);
  }, [gallery, activeCategory]);

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
            Realised Projects
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-2">
            Architectural Gallery
          </h1>
          <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans mt-2">
            Explore natural granite and architectural tile installations across residential and commercial spaces.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map(cat => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-1.5 rounded-xs text-xs font-sans uppercase tracking-wider transition-all ${
                  activeCategory === cat.value
                    ? 'bg-vsaad-purple text-white shadow-[0_0_12px_rgba(168,85,247,0.4)] font-medium'
                    : 'bg-[#121218] border border-[#2A2A38] text-vsaad-ivory-muted hover:text-white hover:border-[#3A3A4D]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative rounded-sm overflow-hidden bg-[#0A0A0E] border border-[#22222E] hover:border-vsaad-purple/50 cursor-pointer transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-vsaad-ivory opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4 text-vsaad-purple-light" />
                </div>

                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded-xs text-[10px] tracking-wider uppercase font-mono bg-black/70 text-vsaad-ivory border border-[#2A2A38]">
                    {item.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2 bg-[#0F0F14]">
                <h2 className="text-xl font-display text-vsaad-ivory group-hover:text-vsaad-purple-light transition-colors line-clamp-1">
                  {item.title}
                </h2>
                <p className="text-xs text-vsaad-ivory-muted font-sans line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-[#1C1C26] flex items-center justify-between text-[11px] font-sans text-vsaad-ivory-dark">
                  <span className="text-vsaad-purple-light font-medium truncate max-w-[170px]">
                    {item.material}
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1 shrink-0">
                      <MapPin className="w-3 h-3 text-vsaad-purple" />
                      {item.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <LightboxModal
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          items={filteredGallery}
          currentIndex={activeImageIndex}
          onNavigate={setActiveImageIndex}
        />
      </div>
    </div>
  );
};
