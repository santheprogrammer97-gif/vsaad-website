import React, { useEffect, useRef } from 'react';
import { MouseGlowRevealOverlay } from './MouseGlowRevealOverlay';
import { gsap, prefersReducedMotion } from './motion/motionConfig';

interface CinematicBackgroundProps {
  variant?: 'hero' | 'section' | 'subtle';
  className?: string;
  children?: React.ReactNode;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({
  variant = 'hero',
  className = '',
  children,
}) => {
  const isHero = variant === 'hero';
  const isSection = variant === 'section';

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);
  const contentLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isHero || prefersReducedMotion()) return;

    const container = containerRef.current;
    const bgLayer = bgLayerRef.current;
    const contentLayer = contentLayerRef.current;
    if (!container || !contentLayer) return;

    // 1. Subtle 3D Camera tilt & parallax responding to pointer movement
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) {
      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 .. 0.5

        // Subtle camera angle (max 2.2 deg)
        gsap.to(contentLayer, {
          rotateY: x * 3.5,
          rotateX: -y * 3.5,
          x: x * 15,
          y: y * 12,
          transformPerspective: 1200,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      const onMouseLeave = () => {
        gsap.to(contentLayer, {
          rotateY: 0,
          rotateX: 0,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      };

      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeave);

      // 2. Slow natural depth parallax on scroll
      if (bgLayer) {
        gsap.to(bgLayer, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      return () => {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, [isHero]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden [perspective:1200px] ${className}`}
    >
      {/* 
        LAYER 1 — Static Base Granite:
        Display the black and charcoal fractured granite image as the base background.
        Completely static, rock-solid, fully visible.
      */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 will-change-transform"
      >
        <img
          src={isHero ? '/images/vsaad-rock-base.jpg' : '/images/collection-granite.jpg'}
          alt="VSAAD Obsidian Fractured Granite"
          className={`w-full h-full object-cover object-center ${
            isHero ? 'opacity-100' : isSection ? 'opacity-35' : 'opacity-20'
          }`}
          loading={isHero ? 'eager' : 'lazy'}
          onError={e => {
            const target = e.currentTarget;
            if (isHero && !target.src.includes('vsaad-rock-base.png')) {
              target.src = '/images/vsaad-rock-base.png';
            }
          }}
        />

        {/* Ambient Darkened Shading Gradients for Contrast & Readability */}
        <div
          className={`absolute inset-0 ${
            isHero
              ? 'bg-gradient-to-b from-[#08080A]/60 via-transparent to-[#08080A]/90'
              : isSection
              ? 'bg-gradient-to-b from-[#08080A]/90 via-[#08080A]/75 to-[#08080A]/95'
              : 'bg-[#08080A]/90'
          }`}
        />

        {/* Radial Edge Vignette to keep editorial typography crisp and readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(8, 8, 10, 0.6) 80%, #08080A 100%)',
          }}
        />
      </div>

      {/*
        LAYER 2 — Mouse-Only Blue/Purple Glow Reveal Overlay (Hero Only):
        Separate electric purple cracks overlay with opacity: 0 by default.
        Smoothly revealed strictly around the cursor using a soft, feathered CSS radial mask.
        Zero automatic pulsing, breathing, flickering, or animation.
      */}
      {isHero && (
        <MouseGlowRevealOverlay />
      )}

      {/* 3. Seamless Bottom Gradient Transition into Page Content */}
      <div
        className="absolute bottom-0 inset-x-0 h-44 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(8, 8, 10, 0.35) 40%, rgba(8, 8, 10, 0.85) 75%, #08080A 100%)',
        }}
      />

      {/* 4. Hero Content Layer — Independent layer with subtle 3D camera depth response */}
      <div
        ref={contentLayerRef}
        className="relative z-20 w-full h-full transform-gpu will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  );
};
