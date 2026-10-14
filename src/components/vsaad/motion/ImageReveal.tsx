import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from './motionConfig';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  imgClassName?: string;
  aspect?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale-settle';
  parallax?: boolean;
  hoverScale?: boolean;
  scaleEffect?: boolean;
  loading?: 'lazy' | 'eager';
  children?: React.ReactNode;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  imgClassName = '',
  aspect,
  direction = 'up',
  parallax = true,
  hoverScale = true,
  scaleEffect,
  loading = 'lazy',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const effectiveImgClass = imgClassName || imageClassName;
  const effectiveHoverScale = scaleEffect !== undefined ? scaleEffect : hoverScale;

  useEffect(() => {
    const container = containerRef.current;
    const img = imageRef.current;
    if (!container || !img) return;

    if (prefersReducedMotion()) {
      gsap.set([container, img], { clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial clip-path or curtain entrance reveal
      let clipFrom = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
      let clipTo = 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)';

      if (direction === 'down') {
        clipFrom = 'polygon(0 0%, 100% 0%, 100% 0%, 0 0%)';
        clipTo = 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)';
      } else if (direction === 'left') {
        clipFrom = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';
        clipTo = 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)';
      } else if (direction === 'right') {
        clipFrom = 'polygon(0 0%, 0 0%, 0 100%, 0 100%)';
        clipTo = 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)';
      } else if (direction === 'scale-settle') {
        clipFrom = 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)';
        clipTo = 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)';
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      });

      // Reveal clip-path on container and settle scale on inner image
      tl.fromTo(
        container,
        { clipPath: clipFrom, opacity: direction === 'scale-settle' ? 0 : 1 },
        {
          clipPath: clipTo,
          opacity: 1,
          duration: 1.15,
          ease: 'power3.inOut',
        }
      );

      tl.fromTo(
        img,
        { scale: 1.15 },
        {
          scale: 1.0,
          duration: 1.35,
          ease: 'power2.out',
        },
        0
      );

      // 2. Subtle inside parallax on scroll
      if (parallax) {
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, [direction, parallax]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group select-none ${className}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform ${
          effectiveHoverScale ? 'group-hover:scale-105' : ''
        } ${effectiveImgClass}`}
      />
      {children}
    </div>
  );
};
