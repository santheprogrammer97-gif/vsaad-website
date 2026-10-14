import React, { useEffect, useRef } from 'react';

interface InteractiveEnergyVeinsCanvasProps {
  className?: string;
}

interface Pulse {
  fromNode: number;
  toNode: number;
  progress: number; // 0..1
  speed: number;
  intensity: number;
}

interface Spark {
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

// Normalized coordinate topology of the natural fracture fissures in the granite rock (1024x576)
const VEIN_NODES = [
  // Upper chain
  { x: 0.10, y: 0.14 }, // 0
  { x: 0.23, y: 0.12 }, // 1: Upper-left intense knot
  { x: 0.35, y: 0.27 }, // 2: Junction
  { x: 0.48, y: 0.35 }, // 3
  { x: 0.63, y: 0.32 }, // 4
  { x: 0.79, y: 0.22 }, // 5: Right upper nexus
  { x: 0.92, y: 0.13 }, // 6

  // Mid-left chain
  { x: 0.12, y: 0.38 }, // 7
  { x: 0.24, y: 0.32 }, // 8
  { x: 0.33, y: 0.32 }, // 9

  // Central fissure super-line (primary energy artery through rock)
  { x: 0.46, y: 0.38 }, // 10: Central upper junction
  { x: 0.56, y: 0.53 }, // 11
  { x: 0.62, y: 0.63 }, // 12
  { x: 0.70, y: 0.73 }, // 13: Blazing core fissure
  { x: 0.77, y: 0.82 }, // 14
  { x: 0.85, y: 0.93 }, // 15

  // Lower chain
  { x: 0.10, y: 0.62 }, // 16: Lower-left knot
  { x: 0.21, y: 0.64 }, // 17
  { x: 0.30, y: 0.66 }, // 18
  { x: 0.43, y: 0.79 }, // 19
  { x: 0.50, y: 0.83 }, // 20
  { x: 0.64, y: 0.93 }, // 21

  // Right diagonal fault
  { x: 0.85, y: 0.49 }, // 22
  { x: 0.78, y: 0.68 }, // 23
  { x: 0.95, y: 0.63 }, // 24
];

// Fissure network connections [from, to] matching the rock fracture network
const VEIN_EDGES: Array<[number, number]> = [
  // Upper chain
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
  // Mid-left
  [7, 8], [8, 9], [9, 10], [1, 8],
  // Central artery
  [10, 11], [11, 12], [12, 13], [13, 14], [14, 15],
  // Lower chain
  [16, 17], [17, 18], [18, 19], [19, 20], [20, 21],
  [18, 10], [20, 13],
  // Right diagonal
  [5, 22], [22, 23], [23, 13], [23, 24],
];

/**
 * Derives a precision alpha mask of the natural granite cracks directly
 * from the charcoal granite background image pixels using multi-scale
 * crevice/bandpass analysis. Zero external veins PNG needed.
 */
function deriveCrackMaskFromGranite(img: HTMLImageElement): HTMLCanvasElement {
  const W = 1024;
  const H = 576;
  const tempC = document.createElement('canvas');
  tempC.width = W;
  tempC.height = H;
  const tCtx = tempC.getContext('2d', { willReadFrequently: true });
  if (!tCtx) return tempC;

  tCtx.drawImage(img, 0, 0, W, H);
  const imgData = tCtx.getImageData(0, 0, W, H);
  const pix = imgData.data;

  // 1. Luminance
  const lum = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) {
    lum[i] = 0.299 * pix[i * 4] + 0.587 * pix[i * 4 + 1] + 0.114 * pix[i * 4 + 2];
  }

  // 2. Macro plate baseline illumination (radius 16 separable blur)
  const macroBlur = new Float32Array(W * H);
  const hPass = new Float32Array(W * H);
  const r1 = 16;
  for (let y = 0; y < H; y++) {
    let sum = 0, count = 0;
    for (let x = -r1; x < W + r1; x++) {
      if (x >= 0 && x < W) { sum += lum[y * W + x]; count++; }
      if (x - r1 - 1 >= 0) { sum -= lum[y * W + (x - r1 - 1)]; count--; }
      if (x >= 0 && x < W) { hPass[y * W + x] = sum / count; }
    }
  }
  for (let x = 0; x < W; x++) {
    let sum = 0, count = 0;
    for (let y = -r1; y < H + r1; y++) {
      if (y >= 0 && y < H) { sum += hPass[y * W + x]; count++; }
      if (y - r1 - 1 >= 0) { sum -= hPass[(y - r1 - 1) * W + x]; count--; }
      if (y >= 0 && y < H) { macroBlur[y * W + x] = sum / count; }
    }
  }

  // 3. Micro detail illumination (radius 2 blur)
  const microBlur = new Float32Array(W * H);
  const r2 = 2;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let sum = 0, count = 0;
      for (let dy = -r2; dy <= r2; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= H) continue;
        for (let dx = -r2; dx <= r2; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= W) continue;
          sum += lum[ny * W + nx];
          count++;
        }
      }
      microBlur[y * W + x] = sum / count;
    }
  }

  // 4. Form precision crack alpha mask:
  // Cracks are deep, darker crevasses where micro luminance drops significantly below the macro stone plate
  const maskC = document.createElement('canvas');
  maskC.width = W;
  maskC.height = H;
  const mCtx = maskC.getContext('2d');
  if (!mCtx) return maskC;

  const mData = mCtx.createImageData(W, H);
  const mPix = mData.data;

  for (let i = 0; i < W * H; i++) {
    const drop = macroBlur[i] - microBlur[i];
    const darkness = Math.max(0, 100 - microBlur[i]);

    let val = 0;
    if (drop > 8.0 && darkness > 18) {
      val = Math.pow((drop - 8.0) / 18, 1.35) * 255 * (darkness / 65);
    }
    val = Math.min(255, Math.max(0, val));

    if (val > 18) {
      mPix[i * 4] = 255;
      mPix[i * 4 + 1] = 255;
      mPix[i * 4 + 2] = 255;
      mPix[i * 4 + 3] = Math.round(val);
    } else {
      mPix[i * 4 + 3] = 0;
    }
  }
  mCtx.putImageData(mData, 0, 0);
  return maskC;
}

export const InteractiveEnergyVeinsCanvas: React.FC<InteractiveEnergyVeinsCanvasProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Offscreen canvas for localized energy masking strictly to the natural cracks
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d', { alpha: true });
    if (!offCtx) return;

    // Motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    // Mask storage derived directly from the charcoal granite image
    let crackMaskCanvas: HTMLCanvasElement | null = null;
    let isMaskReady = false;

    // Load the existing charcoal granite background image to derive the mask
    const graniteImg = new Image();
    graniteImg.crossOrigin = 'anonymous';
    graniteImg.src = '/images/vsaad-rock-base.jpg';

    const onGraniteLoaded = () => {
      try {
        crackMaskCanvas = deriveCrackMaskFromGranite(graniteImg);
        isMaskReady = true;
      } catch (err) {
        console.warn('Could not derive crack mask dynamically:', err);
      }
    };

    graniteImg.onload = onGraniteLoaded;
    graniteImg.onerror = () => {
      // Fallback to png variant if needed
      if (!graniteImg.src.includes('vsaad-rock-base.png')) {
        graniteImg.src = '/images/vsaad-rock-base.png';
      }
    };

    if (graniteImg.complete && graniteImg.naturalWidth > 0) {
      onGraniteLoaded();
    }

    const IMG_ASPECT = 1024 / 576;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let renderW = 0;
    let renderH = 0;
    let offsetX = 0;
    let offsetY = 0;

    const updateProjection = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 320);
      height = Math.max(rect.height, 320);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      offCtx.resetTransform?.();
      offCtx.scale(dpr, dpr);

      // Exact CSS object-cover projection matching <img> tag alignment
      const contAspect = width / (height || 1);
      if (contAspect > IMG_ASPECT) {
        renderW = width;
        renderH = width / IMG_ASPECT;
        offsetX = 0;
        offsetY = (height - renderH) / 2;
      } else {
        renderW = height * IMG_ASPECT;
        renderH = height;
        offsetX = (width - renderW) / 2;
        offsetY = 0;
      }
    };

    updateProjection();
    window.addEventListener('resize', updateProjection);

    const toScreenX = (nx: number) => offsetX + nx * renderW;
    const toScreenY = (ny: number) => offsetY + ny * renderH;

    // Cursor state
    const cursor = {
      targetX: -1000,
      targetY: -1000,
      currentX: -1000,
      currentY: -1000,
      isActive: false,
      energy: 0.0,
      speed: 0,
      lastActiveTime: Date.now(),
    };

    const container = canvas.parentElement || canvas;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      const prevX = cursor.targetX < 0 ? px : cursor.targetX;
      const prevY = cursor.targetY < 0 ? py : cursor.targetY;
      const dx = px - prevX;
      const dy = py - prevY;
      cursor.speed = Math.sqrt(dx * dx + dy * dy);

      cursor.targetX = px;
      cursor.targetY = py;
      if (cursor.currentX < 0) {
        cursor.currentX = px;
        cursor.currentY = py;
      }
      cursor.isActive = true;
      cursor.lastActiveTime = Date.now();
    };

    const handlePointerLeave = () => {
      cursor.isActive = false;
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Traveling pulses
    const pulses: Pulse[] = [];

    const triggerPulse = (fromNode: number, toNode: number, intensity = 0.9) => {
      if (pulses.length >= 8) return;
      pulses.push({
        fromNode,
        toNode,
        progress: 0,
        speed: 0.7 + Math.random() * 0.5,
        intensity,
      });
    };

    // Initial ambient pulses
    triggerPulse(10, 13, 0.85);

    // Mineral spark particles
    const sparks: Spark[] = [];
    const spawnSpark = (x: number, y: number, intensity = 0.8) => {
      if (sparks.length >= 28) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.3 + Math.random() * 0.8) * (0.8 + intensity * 0.5);
      const colors = ['#FFFFFF', '#F0ABFC', '#C084FC', '#E879F9', '#D946EF'];
      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 0.8 + Math.random() * 1.6,
        alpha: 0,
        maxAlpha: 0.5 + Math.random() * 0.5,
        life: 0,
        maxLife: 24 + Math.floor(Math.random() * 26),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    // Helper: point to segment distance squared
    const distToSegmentSq = (
      px: number,
      py: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): { distSq: number; t: number } => {
      const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
      if (l2 === 0) return { distSq: (px - x1) * (px - x1) + (py - y1) * (py - y1), t: 0 };
      let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
      t = Math.max(0, Math.min(1, t));
      const projX = x1 + t * (x2 - x1);
      const projY = y1 + t * (y2 - y1);
      return {
        distSq: (px - projX) * (px - projX) + (py - projY) * (py - projY),
        t,
      };
    };

    // Autonomous pulse cycle
    let autonomousTimer = 0;
    let autonomousStep = 0;

    // Window test handles
    (window as any).__vsaadVeins = {
      setCursor: (nx: number, ny: number) => {
        const px = toScreenX(nx);
        const py = toScreenY(ny);
        cursor.targetX = px;
        cursor.targetY = py;
        cursor.currentX = px;
        cursor.currentY = py;
        cursor.isActive = true;
        cursor.energy = 1.0;
        cursor.lastActiveTime = Date.now();
      },
      injectPulse: (from = 10, to = 13) => {
        triggerPulse(from, to, 1.0);
      },
      getMetrics: () => ({ width, height, renderW, renderH, offsetX, offsetY, isMaskReady }),
    };

    if (typeof window !== 'undefined' && window.location.search.includes('testCursor=1')) {
      setTimeout(() => {
        const px = toScreenX(0.70);
        const py = toScreenY(0.73);
        cursor.targetX = px;
        cursor.targetY = py;
        cursor.currentX = px;
        cursor.currentY = py;
        cursor.isActive = true;
        cursor.energy = 1.0;
        triggerPulse(10, 11, 0.95);
        triggerPulse(12, 13, 0.95);
      }, 250);
    }

    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      // Cursor smooth easing
      if (cursor.isActive) {
        cursor.currentX += (cursor.targetX - cursor.currentX) * 0.16;
        cursor.currentY += (cursor.targetY - cursor.currentY) * 0.16;
        cursor.energy = Math.min(1.0, cursor.energy + dt * 4.0);
      } else {
        cursor.energy = Math.max(0.0, cursor.energy - dt * 1.5);
      }

      // Idle subtle autonomous traveling pulses
      const idleSeconds = (Date.now() - cursor.lastActiveTime) / 1000;
      if (idleSeconds > 2.0 || prefersReducedMotion) {
        autonomousTimer += dt;
        if (autonomousTimer > 3.8 && !prefersReducedMotion) {
          autonomousTimer = 0;
          autonomousStep = (autonomousStep + 1) % 3;
          if (autonomousStep === 0) {
            triggerPulse(10, 11, 0.85);
            triggerPulse(12, 13, 0.85);
          } else if (autonomousStep === 1) {
            triggerPulse(1, 2, 0.8);
            triggerPulse(2, 10, 0.8);
          } else {
            triggerPulse(18, 10, 0.8);
            triggerPulse(23, 13, 0.8);
          }
        }
      }

      // Proximity triggering along fissures when cursor moves
      if (cursor.isActive && cursor.speed > 8 && !prefersReducedMotion) {
        VEIN_EDGES.forEach(([u, v]) => {
          const x1 = toScreenX(VEIN_NODES[u].x);
          const y1 = toScreenY(VEIN_NODES[u].y);
          const x2 = toScreenX(VEIN_NODES[v].x);
          const y2 = toScreenY(VEIN_NODES[v].y);
          const { distSq, t } = distToSegmentSq(cursor.currentX, cursor.currentY, x1, y1, x2, y2);

          const RADIUS_SQ = 150 * 150;
          if (distSq < RADIUS_SQ && pulses.length < 5 && Math.random() < 0.12) {
            triggerPulse(u, v, 0.85);
            const sparkX = x1 + t * (x2 - x1);
            const sparkY = y1 + t * (y2 - y1);
            spawnSpark(sparkX, sparkY, 0.9);
          }
        });
      }

      // Update traveling pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed * dt;
        p.intensity *= Math.pow(0.93, dt * 60);

        // Emit occasional mineral spark at wavefront
        if (p.intensity > 0.45 && Math.random() < 0.16) {
          const n1 = VEIN_NODES[p.fromNode];
          const n2 = VEIN_NODES[p.toNode];
          const px = toScreenX(n1.x + (n2.x - n1.x) * p.progress);
          const py = toScreenY(n1.y + (n2.y - n1.y) * p.progress);
          spawnSpark(px, py, p.intensity);
        }

        // Branching at junctions
        if (p.progress >= 1.0) {
          const dest = p.toNode;
          if (p.intensity > 0.4 && pulses.length < 6) {
            const candidates = VEIN_EDGES.filter(([u, v]) => u === dest || v === dest);
            if (candidates.length > 0) {
              const [cu, cv] = candidates[Math.floor(Math.random() * candidates.length)];
              const nextTo = cu === dest ? cv : cu;
              if (nextTo !== p.fromNode) {
                triggerPulse(dest, nextTo, p.intensity * 0.7);
              }
            }
          }
          pulses.splice(i, 1);
        }
      }

      // Clear main canvas and offscreen buffer
      ctx.clearRect(0, 0, width, height);
      offCtx.clearRect(0, 0, width, height);

      // Render if crack mask is available
      if (isMaskReady && crackMaskCanvas) {
        // 1. Draw subtle ambient breathing violet glow along all cracks
        const breathing = 0.28 + 0.14 * Math.sin(currentTime * 0.0022);
        offCtx.fillStyle = `rgba(168, 85, 247, ${breathing * 0.65})`;
        offCtx.fillRect(offsetX, offsetY, renderW, renderH);

        // 2. Pulse wavefronts: concentrated electric violet & white light
        pulses.forEach(p => {
          const n1 = VEIN_NODES[p.fromNode];
          const n2 = VEIN_NODES[p.toNode];
          const px = toScreenX(n1.x + (n2.x - n1.x) * p.progress);
          const py = toScreenY(n1.y + (n2.y - n1.y) * p.progress);
          const pr = 140;

          const pg = offCtx.createRadialGradient(px, py, 0, px, py, pr);
          pg.addColorStop(0, `rgba(255, 235, 255, ${1.0 * p.intensity})`);
          pg.addColorStop(0.3, `rgba(216, 130, 255, ${0.85 * p.intensity})`);
          pg.addColorStop(0.6, `rgba(168, 85, 247, ${0.45 * p.intensity})`);
          pg.addColorStop(1, 'rgba(126, 34, 206, 0)');
          offCtx.fillStyle = pg;
          offCtx.beginPath();
          offCtx.arc(px, py, pr, 0, Math.PI * 2);
          offCtx.fill();
        });

        // 3. Cursor interaction proximity
        if (cursor.energy > 0.02) {
          const cr = 240;
          const cg = offCtx.createRadialGradient(
            cursor.currentX, cursor.currentY, 0,
            cursor.currentX, cursor.currentY, cr
          );
          cg.addColorStop(0, `rgba(255, 240, 255, ${0.9 * cursor.energy})`);
          cg.addColorStop(0.35, `rgba(216, 130, 255, ${0.75 * cursor.energy})`);
          cg.addColorStop(0.7, `rgba(147, 51, 234, ${0.35 * cursor.energy})`);
          cg.addColorStop(1, 'rgba(88, 28, 135, 0)');
          offCtx.fillStyle = cg;
          offCtx.beginPath();
          offCtx.arc(cursor.currentX, cursor.currentY, cr, 0, Math.PI * 2);
          offCtx.fill();
        }

        // 4. MASK STRICTLY TO THE DERIVED GRANITE CRACK MASK
        // 'destination-in' preserves the purple gradients strictly where
        // the derived crack mask has alpha, keeping the solid granite 100% dark.
        offCtx.globalCompositeOperation = 'destination-in';
        offCtx.drawImage(crackMaskCanvas, offsetX, offsetY, renderW, renderH);
        offCtx.globalCompositeOperation = 'source-over';

        // 5. Composite energized cracks to main screen canvas with bloom & flare
        ctx.save();

        // Layer 1: Ethereal violet bloom
        ctx.filter = 'blur(12px) brightness(1.6) saturate(1.5)';
        ctx.globalAlpha = 0.8;
        ctx.drawImage(offCanvas, 0, 0);

        // Layer 2: Focused vibrant glow
        ctx.filter = 'blur(3px) brightness(2.0)';
        ctx.globalAlpha = 0.9;
        ctx.drawImage(offCanvas, 0, 0);

        // Layer 3: Crisp electrical core
        ctx.filter = 'brightness(2.2) contrast(1.1)';
        ctx.globalAlpha = 1.0;
        ctx.drawImage(offCanvas, 0, 0);

        ctx.filter = 'none';
        ctx.globalAlpha = 1.0;

        // 6. Mineral sparks
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.life += dt * 60;
          s.x += s.vx;
          s.y += s.vy;
          const half = s.maxLife / 2;
          const alpha = s.life < half
            ? (s.life / half) * s.maxAlpha
            : Math.max(0, ((s.maxLife - s.life) / half) * s.maxAlpha);

          if (s.life >= s.maxLife || s.x < 0 || s.x > width || s.y < 0 || s.y > height) {
            sparks.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = alpha;
          ctx.shadowColor = '#C084FC';
          ctx.shadowBlur = s.size * 3;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1.0;
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateProjection);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
