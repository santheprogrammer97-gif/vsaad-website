import React, { useRef, useEffect } from 'react';
import { gsap, prefersReducedMotion } from './motionConfig';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // degrees, e.g. 7
  glare?: boolean;
  glareColor?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 6.5,
  glare = true,
  glareColor = 'rgba(168,85,247,0.35)',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glareEl = glareRef.current;
    if (!card || prefersReducedMotion()) return;

    // Only enable on pointer-fine devices (desktop mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1

      const tiltX = (0.5 - y) * maxTilt * 2;
      const tiltY = (x - 0.5) * maxTilt * 2;

      gsap.to(card, {
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1000,
        duration: 0.35,
        ease: 'power2.out',
      });

      if (glareEl) {
        gsap.to(glareEl, {
          opacity: 0.35,
          background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${glareColor} 0%, transparent 60%)`,
          duration: 0.2,
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
      if (glareEl) {
        gsap.to(glareEl, {
          opacity: 0,
          duration: 0.4,
        });
      }
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
      gsap.set(card, { rotateX: 0, rotateY: 0, clearProps: 'transform' });
    };
  }, [maxTilt, glare, glareColor]);

  return (
    <div
      ref={cardRef}
      className={`relative transform-gpu will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-inherit opacity-0 transition-opacity duration-300 z-30"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
