import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Layers, ShieldCheck, Truck, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';

export const VsaadAboutPage: React.FC = () => {
  const { siteConfig } = useVsaad();

  return (
    <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
            About VSAAD
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-light text-vsaad-ivory mt-2">
            Stone, Considered.
          </h1>
          <p className="text-sm sm:text-base text-vsaad-ivory-muted font-sans mt-4 leading-relaxed font-light">
            A specialized architectural stone house dedicated to curating the world’s most dense plutonic granites and crystalline Italian marbles.
          </p>
        </div>

        {/* Narrative & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono tracking-widest text-vsaad-purple-light uppercase">
              Our Geological Foundation
            </span>
            <h2 className="text-3xl font-display text-vsaad-ivory leading-tight">
              From the Deepest Veins to Generational Architecture
            </h2>
            <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans leading-relaxed">
              At VSAAD, we believe natural granite is not merely a construction surface—it is a geological testament to timeless strength and enduring refinement. Founded with an uncompromising standard for natural stone curation, we bring architectural visionaries and homeowners a refined catalogue of natural granite, Italian marble, and dimensional surfaces extracted from the finest quarries across India and Europe.
            </p>
            <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans leading-relaxed">
              Every gangsaw slab entering our Chennai facility undergoes stringent digital inspection: checked for micro-fractures, verified for uniform mineral distribution, and diamond-calibrated to strict millimeter tolerances.
            </p>

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-[0.18em] rounded-xs transition-colors"
              >
                <span>View Stone Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden border border-[#22222E]">
            <img
              src="/images/collection-granite.jpg"
              alt="VSAAD Natural Granite Texture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-[#2A2A38] rounded-xs">
              <span className="text-[10px] font-mono tracking-wider uppercase text-vsaad-purple-light block">
                Showroom Calibration Facility
              </span>
              <p className="text-xs text-vsaad-ivory font-display mt-0.5">
                Precision Gangsaw Cutting & High-Mirror Diamond Finishing
              </p>
            </div>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="pt-10 border-t border-[#1C1C26]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
              Standards of Distinction
            </span>
            <h2 className="text-3xl font-display font-light text-vsaad-ivory mt-1">
              The Four Pillars of VSAAD
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-xs bg-vsaad-purple/10 border border-vsaad-purple/30 flex items-center justify-center text-vsaad-purple-light">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display text-vsaad-ivory">Quarry-Direct Curation</h3>
              <p className="text-xs text-vsaad-ivory-muted font-sans leading-relaxed">
                Direct partnerships with premier geological deposits in Chimakurthi, Ongole, Rajasthan, and Carrara. No brokers, no grading compromises.
              </p>
            </div>

            <div className="p-6 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-xs bg-vsaad-purple/10 border border-vsaad-purple/30 flex items-center justify-center text-vsaad-purple-light">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display text-vsaad-ivory">Millimeter Calibration</h3>
              <p className="text-xs text-vsaad-ivory-muted font-sans leading-relaxed">
                Diamond multi-disc planing ensures perfectly calibrated 18mm, 20mm, and 30mm thickness tolerances across entire gangsaw bundles.
              </p>
            </div>

            <div className="p-6 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-xs bg-vsaad-purple/10 border border-vsaad-purple/30 flex items-center justify-center text-vsaad-purple-light">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display text-vsaad-ivory">Master Masonry Advisory</h3>
              <p className="text-xs text-vsaad-ivory-muted font-sans leading-relaxed">
                In-house engineering support for cantilevered stairs, mitered waterfall islands, bookmatched living walls, and exterior rainscreens.
              </p>
            </div>

            <div className="p-6 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-xs bg-vsaad-purple/10 border border-vsaad-purple/30 flex items-center justify-center text-vsaad-purple-light">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display text-vsaad-ivory">Insured Pan-India Transit</h3>
              <p className="text-xs text-vsaad-ivory-muted font-sans leading-relaxed">
                Protected vertical timber A-frames and high-density foam cushioning ensure your slabs arrive on site without edge chipping or hairline fatigue.
              </p>
            </div>
          </div>
        </div>

        {/* Chennai Showroom Visit Banner */}
        <div className="p-8 sm:p-12 bg-[#0F0F14] border border-[#2A2A38] rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-vsaad-purple-light font-sans font-semibold">
              Experience the Stone in Person
            </span>
            <h2 className="text-2xl sm:text-3xl font-display text-vsaad-ivory">
              Visit our Chennai Showroom & Gallery
            </h2>
            <div className="flex flex-wrap gap-4 text-xs font-sans text-vsaad-ivory-muted pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-vsaad-purple" />
                {siteConfig?.contact.address || '123, Anna Salai, Chennai'}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-vsaad-purple" />
                {siteConfig?.contact.workingHours || 'Mon – Sat: 09:30 AM – 08:00 PM'}
              </span>
            </div>
          </div>

          <Link
            to="/contact"
            className="px-6 py-3 bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors"
          >
            Schedule a Private Visit
          </Link>
        </div>
      </div>
    </div>
  );
};
