import React, { useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Layers, ShieldCheck, Ruler, ArrowDown } from 'lucide-react';
import { GlassCard } from '../glass/GlassCard';
import { MagneticButton } from '../motion/MagneticButton';
import { gsap, prefersReducedMotion } from '../motion/motionConfig';

interface TilesHeroProps {
  onExploreClick?: () => void;
  onSpecSheetClick?: () => void;
}

export const TilesHero: React.FC<TilesHeroProps> = ({
  onExploreClick,
  onSpecSheetClick,
}) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  // Orchestrated entrance animation
  useEffect(() => {
    if (!heroRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.5 } });

      tl.from(
        '.tiles-hero-badge',
        { opacity: 0, y: 15, duration: 0.4 },
        0.05
      )
        .from(
          '.tiles-hero-title-line',
          { opacity: 0, y: 25, stagger: 0.08, duration: 0.5 },
          0.1
        )
        .from(
          '.tiles-hero-desc',
          { opacity: 0, y: 15, duration: 0.4 },
          0.2
        )
        .from(
          '.tiles-hero-cta',
          { opacity: 0, y: 15, duration: 0.4 },
          0.25
        )
        .from(
          '.tiles-slab-layer',
          { opacity: 0, y: 30, scale: 0.95, stagger: 0.08, duration: 0.5 },
          0.2
        )
        .from(
          '.tiles-floating-card',
          { opacity: 0, y: 15, stagger: 0.06, duration: 0.4 },
          0.3
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 3D Parallax & Depth Perspective on Mouse Move
  useEffect(() => {
    const stage = stageRef.current;
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!stage || !hero || prefersReducedMotion()) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      // Stage tilt
      gsap.to(stage, {
        rotateY: x * 14,
        rotateX: -y * 12,
        transformPerspective: 1200,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Ambient glow tracking
      if (glow) {
        gsap.to(glow, {
          x: x * 60,
          y: y * 50,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Parallax on layered slabs
      gsap.to('.tiles-slab-bg', {
        x: -x * 25,
        y: -y * 20,
        duration: 0.7,
      });

      gsap.to('.tiles-slab-main', {
        x: x * 15,
        y: y * 12,
        duration: 0.5,
      });

      gsap.to('.tiles-slab-fg', {
        x: x * 35,
        y: y * 30,
        duration: 0.65,
      });
    };

    const onMouseLeave = () => {
      gsap.to(stage, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
      if (glow) {
        gsap.to(glow, { x: 0, y: 0, duration: 1, ease: 'power3.out' });
      }
      gsap.to(['.tiles-slab-bg', '.tiles-slab-main', '.tiles-slab-fg'], {
        x: 0,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    };

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);

    return () => {
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const handleScrollToCatalogue = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('tiles-catalogue');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92svh] lg:min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#07070A]"
    >
      {/* Background Subtle Gradient & Grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(168,85,247,0.18),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14141E15_1px,transparent_1px),linear-gradient(to_bottom,#14141E15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Atmospheric Purple Luminescence (Behind slabs) */}
      <div
        ref={glowRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-vsaad-purple/35 via-vsaad-purple-deep/25 to-transparent rounded-full blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-7">
            {/* Pill Eyebrow Badge */}
            <div className="tiles-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12121A]/80 border border-vsaad-purple/30 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.15)] text-[11px] font-sans tracking-[0.25em] text-vsaad-purple-light uppercase">
              <Sparkles className="w-3.5 h-3.5 text-vsaad-purple" />
              <span>Architectural Vitrified Surfaces</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-display font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-vsaad-ivory leading-[1.05] drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)]">
              <span className="tiles-hero-title-line block">Tiles,</span>
              <span className="tiles-hero-title-line block italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-vsaad-ivory via-vsaad-purple-light to-vsaad-purple">
                Reimagined.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="tiles-hero-desc text-sm sm:text-base md:text-lg text-vsaad-ivory-muted max-w-xl mx-auto lg:mx-0 font-sans font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Engineered large-format vitrified porcelain and architectural stone surfaces. Diamond-calibrated planar precision, zero porosity, and enduring tactile luxury.
            </p>

            {/* Action CTAs */}
            <div className="tiles-hero-cta flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <MagneticButton strength={0.3}>
                <button
                  type="button"
                  onClick={handleScrollToCatalogue}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xs bg-gradient-to-r from-vsaad-purple to-vsaad-purple-deep hover:from-vsaad-purple-light hover:to-vsaad-purple text-white text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.45)] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <button
                  type="button"
                  onClick={onSpecSheetClick}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xs bg-[#12121A]/80 hover:bg-[#1A1A24] border border-[#2A2A38] hover:border-vsaad-purple/50 text-vsaad-ivory text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 backdrop-blur-xl flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-vsaad-purple-light" />
                  <span>Masonry Spec Sheet</span>
                </button>
              </MagneticButton>
            </div>

            {/* Quick Metrics Bar in Frosted Glass */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-mono text-vsaad-ivory-muted">
              <span className="px-3 py-1 rounded-full bg-[#101018]/60 border border-white/[0.08] backdrop-blur-md">
                10 Architectural Series
              </span>
              <span className="px-3 py-1 rounded-full bg-[#101018]/60 border border-white/[0.08] backdrop-blur-md">
                Up to 1200×2400 mm
              </span>
              <span className="px-3 py-1 rounded-full bg-[#101018]/60 border border-white/[0.08] backdrop-blur-md">
                Zero Water Absorption
              </span>
            </div>
          </div>

          {/* Right Column: Layered 3D Tile Slabs at Different Depths */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
            <div
              ref={stageRef}
              className="relative w-full max-w-[500px] h-[460px] sm:h-[500px] [transform-style:preserve-3d] flex items-center justify-center"
            >
              {/* Background Slab (Layer 1, Z: -50px, Rotated Left) */}
              <div
                className="tiles-slab-layer tiles-slab-bg absolute w-[260px] sm:w-[300px] aspect-[3/4] rounded-sm overflow-hidden border border-white/[0.1] shadow-[0_25px_50px_rgba(0,0,0,0.85)] -translate-x-16 -translate-y-6 rotate-[-7deg] bg-black [transform:translateZ(-50px)]"
              >
                <img
                  src="/images/product-statuario-marble.jpg"
                  alt="Statuario Wall Porcelain Slab"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-[10px] font-mono text-vsaad-purple-light">
                  Wall Slab • 1200×2400mm
                </div>
              </div>

              {/* Central Main Slab (Layer 2, Z: 40px, Center Stage) */}
              <div
                className="tiles-slab-layer tiles-slab-main relative z-20 w-[290px] sm:w-[340px] aspect-[3/4] rounded-sm overflow-hidden border border-white/[0.18] shadow-[0_35px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(168,85,247,0.25)] bg-[#0A0A0E] [transform:translateZ(40px)] group"
              >
                <img
                  src="/images/collection-tiles.jpg"
                  alt="VSAAD Architectural Porcelain Tile"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10" />

                {/* Slab Live Badge inside */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-xs bg-black/80 border border-vsaad-purple/40 text-[10px] font-mono uppercase tracking-wider text-vsaad-purple-light backdrop-blur-md">
                    Diamond Rectified
                  </span>
                  <span className="px-2 py-0.5 rounded-xs bg-black/60 border border-white/10 text-[9px] font-mono text-vsaad-ivory">
                    12mm Calibrated
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-lg text-white font-light">
                    Pietra Minimalist Porcelain
                  </h3>
                  <p className="text-[11px] text-vsaad-ivory-muted font-sans mt-0.5">
                    High-density architectural vitrified surface
                  </p>
                </div>
              </div>

              {/* Foreground Slab (Layer 3, Z: 80px, Rotated Right) */}
              <div
                className="tiles-slab-layer tiles-slab-fg absolute w-[240px] sm:w-[270px] aspect-[3/4] rounded-sm overflow-hidden border border-white/[0.12] shadow-[0_30px_60px_rgba(0,0,0,0.9)] translate-x-24 translate-y-12 rotate-[6deg] bg-black [transform:translateZ(80px)] z-30"
              >
                <img
                  src="/images/product-black-morquino-polished.jpg"
                  alt="Nero Marquina Vitrified Floor Tile"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-[10px] font-mono text-vsaad-ivory">
                  Marquina Obsidian • R10 Floor
                </div>
              </div>

              {/* Floating Translucent Glass Information Badges */}
              {/* Badge 1: Top Right */}
              <div className="tiles-floating-card absolute -top-4 -right-2 sm:-right-8 z-40">
                <GlassCard
                  variant="card"
                  interactive
                  className="px-3.5 py-2.5 rounded-sm flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-vsaad-purple/20 border border-vsaad-purple/40 flex items-center justify-center text-vsaad-purple-light shrink-0">
                    <Ruler className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-white tracking-wide">
                      1200 × 2400 mm
                    </div>
                    <div className="text-[9px] text-vsaad-ivory-dark uppercase tracking-wider font-mono">
                      Seamless Large Format
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Badge 2: Bottom Left */}
              <div className="tiles-floating-card absolute -bottom-4 -left-2 sm:-left-6 z-40">
                <GlassCard
                  variant="card"
                  interactive
                  className="px-3.5 py-2.5 rounded-sm flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-vsaad-purple/20 border border-vsaad-purple/40 flex items-center justify-center text-vsaad-purple-light shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-white tracking-wide">
                      &lt; 0.05% Absorption
                    </div>
                    <div className="text-[9px] text-vsaad-ivory-dark uppercase tracking-wider font-mono">
                      Zero-Porosity Core
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Badge 3: Center Bottom Floating Pill */}
              <div className="tiles-floating-card absolute -bottom-8 right-8 z-40 hidden sm:block">
                <GlassCard
                  variant="pill"
                  interactive
                  className="px-3 py-1.5 flex items-center gap-2"
                >
                  <Layers className="w-3 h-3 text-vsaad-purple-light" />
                  <span className="text-[10px] font-mono text-vsaad-ivory tracking-wider uppercase">
                    R11 Anti-Slip Traction
                  </span>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>

        {/* Micro Scroll Prompt */}
        <div className="mt-14 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={handleScrollToCatalogue}
            className="flex flex-col items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-vsaad-ivory-dark hover:text-vsaad-purple-light transition-colors cursor-pointer"
          >
            <span>Scroll to Explore</span>
            <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center">
              <ArrowDown className="w-3.5 h-3.5 text-vsaad-purple animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
