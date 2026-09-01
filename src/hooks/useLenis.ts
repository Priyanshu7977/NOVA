'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useExperience } from '@/context/ExperienceContext';

export function useLenis() {
  const { setScrollProgress, reducedMotion } = useExperience();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Native scroll fallback listener
    const handleNativeScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.max(0, Math.min(1, window.scrollY / total)));
      }
    };

    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    try {
      lenis = new Lenis({
        duration: reducedMotion ? 0.2 : 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: !reducedMotion,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      lenis.on('scroll', (e: { progress?: number }) => {
        if (typeof e.progress === 'number') {
          setScrollProgress(Math.max(0, Math.min(1, e.progress)));
        }
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    } catch {
      // Lenis fallback to native smooth scroll
    }

    // Initial check
    handleNativeScroll();

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, [setScrollProgress, reducedMotion]);

  return lenisRef;
}
