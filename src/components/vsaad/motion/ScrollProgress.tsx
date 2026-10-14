import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from './motionConfig';

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const st = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (bar) {
          bar.style.transform = `scaleX(${self.progress})`;
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none origin-left overflow-hidden bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="w-full h-full bg-gradient-to-r from-vsaad-purple-deep via-vsaad-purple to-vsaad-purple-light shadow-[0_0_12px_rgba(168,85,247,0.7)] origin-left scale-x-0 will-change-transform"
      />
    </div>
  );
};
