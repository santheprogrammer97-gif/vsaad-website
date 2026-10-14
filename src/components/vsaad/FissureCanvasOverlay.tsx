import React, { useEffect, useRef } from 'react';

interface FissureCanvasOverlayProps {
  className?: string;
  intensity?: 'high' | 'medium' | 'subtle';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  color: string;
}

export const FissureCanvasOverlay: React.FC<FissureCanvasOverlayProps> = ({
  className = '',
  intensity = 'medium',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return; // Do not animate for reduced motion users
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle density based on intensity
    const maxParticles = intensity === 'high' ? 45 : intensity === 'medium' ? 28 : 16;
    const particles: Particle[] = [];

    const colors = [
      'rgba(192, 132, 252, ', // purple.light
      'rgba(168, 85, 247, ',  // purple.electric
      'rgba(232, 121, 249, ', // fuchsia / magenta restrained
      'rgba(216, 180, 254, ', // violet soft
    ];

    // Branching fissure vector angles (simulating flow along diagonal fractures)
    const angles = [-0.65, -0.45, 0.55, 0.75, 2.35, 2.65];

    const createParticle = (): Particle => {
      const angle = angles[Math.floor(Math.random() * angles.length)] + (Math.random() * 0.2 - 0.1);
      const speed = 0.25 + Math.random() * 0.45;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 0.8 + Math.random() * 1.6,
        alpha: 0,
        maxAlpha: 0.35 + Math.random() * 0.45,
        life: 0,
        maxLife: 140 + Math.random() * 160,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    // Pre-populate particles
    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife; // Stagger lifecycle
      particles.push(p);
    }

    let isVisible = true;
    const observer = new IntersectionObserver(
      entries => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        // Fade in then fade out gently
        const halfLife = p.maxLife / 2;
        if (p.life < halfLife) {
          p.alpha = (p.life / halfLife) * p.maxAlpha;
        } else {
          p.alpha = ((p.maxLife - p.life) / halfLife) * p.maxAlpha;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Reset if expired or out of bounds
        if (p.life >= p.maxLife || p.x < -10 || p.x > width + 10 || p.y < -10 || p.y > height + 10) {
          particles[i] = createParticle();
          continue;
        }

        // Draw soft glowing mineral ember
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
        ctx.shadowBlur = p.size * 5;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full mix-blend-screen z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
