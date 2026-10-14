import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Layers } from 'lucide-react';
import type { VsaadGalleryItem } from '../../types/vsaadTypes';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: VsaadGalleryItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}) => {
  const currentItem = items[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0); // loop
    }
  }, [currentIndex, items.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(items.length - 1); // loop
    }
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl"
    >
      {/* Top Controls */}
      <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between text-vsaad-ivory">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono tracking-widest text-vsaad-purple-light uppercase">
            {currentIndex + 1} / {items.length}
          </span>
          <span className="text-xs tracking-wider uppercase text-vsaad-ivory-muted px-2 py-0.5 rounded bg-[#171720] border border-[#2A2A38]">
            {currentItem.categoryLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-[#13131A] border border-[#2A2A38] text-vsaad-ivory hover:text-vsaad-purple hover:border-vsaad-purple transition-colors focus:outline-none"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image View */}
      <div className="relative w-full h-full max-w-6xl max-h-[85vh] p-4 flex items-center justify-center">
        <img
          src={currentItem.image}
          alt={currentItem.title}
          className="max-w-full max-h-[75vh] object-contain rounded-sm shadow-2xl select-none"
        />

        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#13131A]/80 border border-[#2A2A38] text-vsaad-ivory hover:text-vsaad-purple hover:border-vsaad-purple backdrop-blur-md transition-colors focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#13131A]/80 border border-[#2A2A38] text-vsaad-ivory hover:text-vsaad-purple hover:border-vsaad-purple backdrop-blur-md transition-colors focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Architectural Info Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-vsaad-ivory">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-light text-vsaad-ivory">
              {currentItem.title}
            </h2>
            <p className="text-xs sm:text-sm text-vsaad-ivory-muted mt-1 max-w-2xl font-sans">
              {currentItem.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-vsaad-ivory-dark shrink-0">
            {currentItem.material && (
              <div className="flex items-center gap-1.5 text-vsaad-purple-light">
                <Layers className="w-4 h-4" />
                <span>{currentItem.material}</span>
              </div>
            )}
            {currentItem.location && (
              <div className="flex items-center gap-1.5 text-vsaad-ivory-muted">
                <MapPin className="w-4 h-4 text-vsaad-purple" />
                <span>{currentItem.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
