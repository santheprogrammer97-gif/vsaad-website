import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from './motionConfig';

interface TextRevealProps {
  children: React.ReactNode;
  variant?: 'line-mask' | 'words' | 'fade-up' | 'wipe';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  threshold?: string; // e.g. "top 85%"
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  variant = 'fade-up',
  as: Component = 'div',
  delay = 0,
  duration = 0.9,
  stagger = 0.04,
  className = '',
  threshold = 'top 88%',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      if (variant === 'words') {
        const words = el.querySelectorAll('.word-inner');
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { y: '115%', opacity: 0, rotateX: -15 },
            {
              y: '0%',
              opacity: 1,
              rotateX: 0,
              duration,
              delay,
              stagger,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: threshold,
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      } else if (variant === 'line-mask') {
        const lines = el.querySelectorAll('.line-inner');
        const targets = lines.length > 0 ? lines : [el];
        gsap.fromTo(
          targets,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: duration * 1.1,
            delay,
            stagger: stagger * 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: threshold,
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      } else if (variant === 'wipe') {
        gsap.fromTo(
          el,
          {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
            opacity: 0,
            x: -20,
          },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 1,
            x: 0,
            duration: duration * 1.2,
            delay,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: threshold,
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      } else {
        // 'fade-up' default
        gsap.fromTo(
          el,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: threshold,
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration, stagger, threshold]);

  // If words variant and children is a string, wrap each word in an overflow-hidden wrapper
  if (variant === 'words' && typeof children === 'string') {
    const wordList = children.split(' ');
    return (
      <Component
        ref={containerRef as any}
        className={`inline-block [perspective:800px] ${className}`}
      >
        {wordList.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-top mr-[0.28em] last:mr-0">
            <span className="word-inner inline-block transform will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  // If line-mask variant with string, split by lines if contains \n
  if (variant === 'line-mask' && typeof children === 'string' && children.includes('\n')) {
    const lines = children.split('\n');
    return (
      <Component ref={containerRef as any} className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span className="line-inner block transform will-change-transform">
              {line}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component ref={containerRef as any} className={className}>
      {children}
    </Component>
  );
};
