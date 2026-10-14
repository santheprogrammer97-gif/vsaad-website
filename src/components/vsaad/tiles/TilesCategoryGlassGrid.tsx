import React from 'react';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { GlassCard } from '../glass/GlassCard';

export interface TileCategoryMeta {
  id: string; // 'all' | 'floor' | 'wall' | 'outdoor' | 'decorative'
  name: string;
  badge: string;
  count: number;
  image: string;
  tagline: string;
  description: string;
  specs: string;
}

export const TILE_CATEGORIES: TileCategoryMeta[] = [
  {
    id: 'all',
    name: 'All Architectural Tiles',
    badge: 'Complete Range',
    count: 10,
    image: '/images/product-vitrified-tiles.jpg',
    tagline: 'Precision Vitrified Porcelain & Slabs',
    description: 'The complete architectural tile repertoire engineered for contemporary residential and commercial commissions.',
    specs: 'Formats up to 1200×2400 mm • Zero-porosity vitrified body',
  },
  {
    id: 'floor',
    name: 'Floor Tiles',
    badge: 'High Traffic • R10',
    count: 3,
    image: '/images/product-black-morquino-polished.jpg',
    tagline: 'Monolithic Heavy-Duty Porcelain',
    description: 'Rectified vitrified slabs engineered for seamless living rooms, hotel lobbies, and high-footfall executive environments.',
    specs: 'R10 slip rating • 9mm & 12mm thickness • 800×1600mm & 1200×2400mm',
  },
  {
    id: 'wall',
    name: 'Wall Tiles',
    badge: 'Ultra-Slim • Zero Porosity',
    count: 3,
    image: '/images/product-statuario-marble.jpg',
    tagline: 'Seamless Vertical Cladding Slabs',
    description: 'Continuous large-format porcelain slabs offering mirror bookmatching, steam resistance, and groutless visual continuity.',
    specs: '6mm & 9mm slim profile • Impervious to humidity & soap film',
  },
  {
    id: 'outdoor',
    name: 'Outdoor Tiles',
    badge: 'All-Weather • R11 Grip',
    count: 2,
    image: '/images/product-flamed-cladding.jpg',
    tagline: 'Anti-Slip Architectural Pavers',
    description: 'Thermal-shock resistant, flamed textured slabs certified for pool surrounds, exposed courtyards, and rooftop terraces.',
    specs: 'R11 high-traction grip • 20mm & 15mm heavy load bearing',
  },
  {
    id: 'decorative',
    name: 'Decorative Tiles',
    badge: 'Sculptural • Statement',
    count: 2,
    image: '/images/product-copper-silk-polished.jpg',
    tagline: 'Fluted Textures & Jewel Mosaics',
    description: 'Tactile metallic lusters, fluted relief tiles, and jewel-tone accents crafted for bar fronts, niches, and feature powder rooms.',
    specs: 'Specular metallic & carved finishes • Bespoke statement walls',
  },
];

interface TilesCategoryGlassGridProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const TilesCategoryGlassGrid: React.FC<TilesCategoryGlassGridProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className="relative py-20 bg-[#07070A] overflow-hidden">
      {/* Background Soft Purple Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-vsaad-purple/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vsaad-purple/10 border border-vsaad-purple/25 backdrop-blur-md mb-4">
              <Layers className="w-3.5 h-3.5 text-vsaad-purple-light" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-vsaad-purple-light font-medium">
                Curation By Application
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
              Curated Surfaces for <span className="text-vsaad-purple-light italic font-normal">Every Plane.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-vsaad-ivory-muted font-sans font-light leading-relaxed">
              Explore purpose-engineered porcelain and vitrified stone solutions tailored for high-traffic floors, 
              dramatic feature walls, exterior terraces, and bespoke accents.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-vsaad-ivory-dark font-sans">
            <span>Select a category to filter the master catalogue below</span>
          </div>
        </div>

        {/* 5-Card Glassmorphism Grid: Top 2 large featured cards, bottom 3 balanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TILE_CATEGORIES.map((cat, idx) => {
            const isActive = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group cursor-pointer text-left transition-all duration-300 ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-2' : idx === 1 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <GlassCard
                  variant={isActive ? 'highlight' : 'card'}
                  glow={isActive}
                  interactive
                  className={`h-full overflow-hidden transition-all duration-300 relative ${
                    isActive
                      ? 'border-vsaad-purple/60 shadow-[0_0_35px_rgba(168,85,247,0.25)] ring-1 ring-vsaad-purple/50'
                      : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col h-full justify-between">
                    {/* Media Container with Frosted Glass Reveal */}
                    <div className="relative w-full h-52 sm:h-64 overflow-hidden rounded-t-xl bg-[#0F0F14]">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                        loading="lazy"
                      />
                      {/* Gradient Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10] via-transparent to-black/30" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full text-[10px] font-sans font-medium uppercase tracking-[0.16em] bg-[#0A0A0F]/80 text-vsaad-ivory-light border border-white/10 backdrop-blur-md shadow-lg">
                          {cat.badge}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium bg-vsaad-purple/20 text-vsaad-purple-light border border-vsaad-purple/40 backdrop-blur-md shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                          {cat.count} {cat.count === 1 ? 'Design' : 'Designs'}
                        </span>
                      </div>

                      {/* Active Status Badge if selected */}
                      {isActive && (
                        <div className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vsaad-purple text-white text-[11px] font-medium tracking-wide shadow-lg">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active Filter</span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-vsaad-purple-light font-sans font-medium mb-1">
                          {cat.tagline}
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-light text-white group-hover:text-vsaad-purple-light transition-colors duration-200">
                          {cat.name}
                        </h3>
                        <p className="mt-2.5 text-xs sm:text-sm text-vsaad-ivory-muted font-sans font-light leading-relaxed line-clamp-2">
                          {cat.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-vsaad-ivory-dark font-sans truncate mr-2">
                          {cat.specs}
                        </span>
                        <div className="flex items-center gap-1.5 font-medium text-vsaad-purple-light shrink-0 group-hover:translate-x-1 transition-transform duration-200">
                          <span>{isActive ? 'Filtered' : 'Filter'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
