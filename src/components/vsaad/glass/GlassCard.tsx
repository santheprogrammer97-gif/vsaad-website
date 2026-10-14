import React, { useRef, useEffect } from 'react';
import { gsap, prefersReducedMotion } from '../motion/motionConfig';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'card' | 'panel' | 'pill' | 'highlight' | 'subtle';
  glow?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * Premium Apple-inspired Glassmorphism Container
 * - Multi-layer translucent dark glass
 * - Hardware-accelerated backdrop blur
 * - Thin white/lavender border with low opacity
 * - Inset specular rim lighting
 * - Soft purple ambient diffusion
 * - Smooth pointer glare reaction
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'card',
  glow = false,
  interactive = false,
  onClick,
  style,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glareEl = glareRef.current;
    if (!card || !interactive || prefersReducedMotion()) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      if (glareEl) {
        gsap.to(glareEl, {
          opacity: 0.35,
          background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(196, 181, 253, 0.25) 0%, rgba(168, 85, 247, 0.12) 30%, transparent 65%)`,
          duration: 0.25,
        });
      }
    };

    const onMouseLeave = () => {
      if (glareEl) {
        gsap.to(glareEl, {
          opacity: 0,
          duration: 0.45,
        });
      }
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [interactive]);

  // Variant styles
  const variantStyles = {
    card: 'bg-[#101018]/65 backdrop-blur-xl border border-white/[0.08] hover:border-vsaad-purple/40 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.12)]',
    panel: 'bg-[#0E0E14]/75 backdrop-blur-2xl border border-white/[0.1] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),inset_0_1px_2px_0_rgba(255,255,255,0.15)]',
    pill: 'bg-[#12121A]/80 backdrop-blur-lg border border-white/[0.12] shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.18)] rounded-full',
    highlight: 'bg-gradient-to-b from-[#181824]/80 to-[#101018]/70 backdrop-blur-2xl border border-vsaad-purple/35 shadow-[0_20px_50px_rgba(168,85,247,0.15),inset_0_1px_1px_0_rgba(196,181,253,0.3)]',
    subtle: 'bg-[#0D0D12]/50 backdrop-blur-md border border-white/[0.05] shadow-[0_8px_20px_rgba(0,0,0,0.4)]',
  }[variant];

  const glowStyle = glow
    ? 'after:absolute after:inset-0 after:rounded-inherit after:pointer-events-none after:shadow-[0_0_35px_rgba(168,85,247,0.25)] after:opacity-100'
    : '';

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={style}
      className={`relative overflow-hidden transition-all duration-300 ${variantStyles} ${glowStyle} ${
        interactive ? 'cursor-pointer hover:-translate-y-1' : ''
      } ${className}`}
    >
      {/* Specular Glare Overlay */}
      {interactive && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10"
          aria-hidden="true"
        />
      )}

      {/* Internal ambient corner light */}
      <div
        className="absolute -top-16 -right-16 w-36 h-36 bg-vsaad-purple/10 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {children}
    </div>
  );
};
