import React, { useEffect, useRef } from 'react';

interface MouseGlowRevealOverlayProps {
  className?: string;
  radius?: number;
}

export const MouseGlowRevealOverlay: React.FC<MouseGlowRevealOverlayProps> = ({
  className = '',
  radius = 260,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const parent = overlay.parentElement;
    if (!parent) return;

    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let targetOpacity = 0;
    let currentOpacity = 0;
    let isMoving = false;
    let animFrameId: number | null = null;

    const applyMask = (x: number, y: number, opacity: number) => {
      if (!overlay) return;
      if (opacity <= 0.001) {
        overlay.style.opacity = '0';
        overlay.style.webkitMaskImage = 'none';
        overlay.style.maskImage = 'none';
        return;
      }

      overlay.style.opacity = opacity.toFixed(3);
      // Soft, feathered radial mask around cursor with zero hard circular edge
      const mask = `radial-gradient(circle ${radius}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.3) 68%, transparent 100%)`;
      overlay.style.webkitMaskImage = mask;
      overlay.style.maskImage = mask;
    };

    const updateLoop = () => {
      // Smooth interpolation for fluid, natural cursor tracking
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const dOp = targetOpacity - currentOpacity;

      currentX += dx * 0.16;
      currentY += dy * 0.16;
      currentOpacity += dOp * 0.14;

      applyMask(currentX, currentY, currentOpacity);

      // Continue loop only while active or while smoothly fading in/out
      const hasPosDelta = Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3;
      const hasOpDelta = Math.abs(dOp) > 0.005;

      if (isMoving || hasPosDelta || hasOpDelta || currentOpacity > 0.005) {
        animFrameId = requestAnimationFrame(updateLoop);
      } else {
        animFrameId = null;
        if (targetOpacity === 0) {
          applyMask(currentX, currentY, 0);
        }
      }
    };

    const startLoopIfNeeded = () => {
      if (animFrameId === null) {
        animFrameId = requestAnimationFrame(updateLoop);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      targetX = px;
      targetY = py;

      // Snap immediately if first interaction to prevent jump from off-screen
      if (currentX < -500) {
        currentX = px;
        currentY = py;
      }

      targetOpacity = 1;
      isMoving = true;
      startLoopIfNeeded();
    };

    const handlePointerLeave = () => {
      targetOpacity = 0;
      isMoving = false;
      startLoopIfNeeded();
    };

    // Automated verification support
    (window as any).__vsaadReveal = {
      triggerReveal: (x: number, y: number) => {
        targetX = x;
        targetY = y;
        currentX = x;
        currentY = y;
        targetOpacity = 1;
        currentOpacity = 1;
        applyMask(x, y, 1);
      },
      hideReveal: () => {
        targetOpacity = 0;
        currentOpacity = 0;
        applyMask(0, 0, 0);
      },
    };

    // Test query support (e.g. ?testCursor=1)
    if (typeof window !== 'undefined' && window.location.search.includes('testCursor=1')) {
      setTimeout(() => {
        const rect = parent.getBoundingClientRect();
        const px = rect.width * 0.58;
        const py = rect.height * 0.52;
        targetX = px;
        targetY = py;
        currentX = px;
        currentY = py;
        targetOpacity = 1;
        currentOpacity = 1;
        applyMask(px, py, 1);
      }, 200);
    }

    parent.addEventListener('pointermove', handlePointerMove, { passive: true });
    parent.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }
      parent.removeEventListener('pointermove', handlePointerMove);
      parent.removeEventListener('pointerleave', handlePointerLeave);
      delete (window as any).__vsaadReveal;
    };
  }, [radius]);

  return (
    <>
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
        <filter id="vsaadElectricPurpleFilter" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="
              0.20  0     0.68  0  0
              0     0.25  0.15  0  0
              0     0     1.10  0  0
              0     0     0     1  0"
          />
        </filter>
      </svg>
      <div
        ref={overlayRef}
        className={`absolute inset-0 w-full h-full pointer-events-none select-none z-[2] ${className}`}
        style={{
          opacity: 0,
          WebkitMaskImage: 'none',
          maskImage: 'none',
          willChange: 'opacity, mask-image',
        }}
        aria-hidden="true"
      >
        <img
          src="/images/vsaad-blue-cracks.jpg"
          alt="VSAAD Electric Purple Mineral Veins"
          className="w-full h-full object-cover object-center mix-blend-screen pointer-events-none select-none"
          style={{
            filter: 'url(#vsaadElectricPurpleFilter)',
          }}
          loading="eager"
        />
      </div>
    </>
  );
};
