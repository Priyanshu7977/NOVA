'use client';

import React, { useRef, useState, useEffect } from 'react';
import { CinematicSports3DExperience } from './CinematicSports3DExperience';

export const CinematicScrollContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScrolled = -rect.top;
      const progress = Math.max(0, Math.min(1.0, currentScrolled / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[550vh]">
      {/* Sticky Fullscreen 3D WebGL Viewport (Scenes 01 to 04) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <CinematicSports3DExperience scrollProgress={scrollProgress} />
      </div>
    </section>
  );
};
