'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useExperience } from '@/context/ExperienceContext';

interface HeroVideoScrubberProps {
  onVideoLoaded?: () => void;
}

export const HeroVideoScrubber: React.FC<HeroVideoScrubberProps> = ({ onVideoLoaded }) => {
  const { scrollProgress, setUpperColor, setAccentColor } = useExperience();
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const [selectedCrateIndex, setSelectedCrateIndex] = useState<number>(2); // Green Crate by default

  // 9 Authentic Nike Colorways matching the 3x3 Grid in the Video
  const CRATE_COLORWAYS = [
    { id: 0, name: 'Goldenrod Yellow', hex: '#eab308', upper: 'solar', accent: 'orange' },
    { id: 1, name: 'Pink Foam', hex: '#ec4899', upper: 'ultraviolet', accent: 'violet' },
    { id: 2, name: 'Pine Green / Volt', hex: '#22c55e', upper: 'green', accent: 'green' },
    { id: 3, name: 'Lavender Court', hex: '#a855f7', upper: 'ultraviolet', accent: 'violet' },
    { id: 4, name: 'Chicago Red', hex: '#ef4444', upper: 'solar', accent: 'orange' },
    { id: 5, name: 'Tiffany Cyan', hex: '#06b6d4', upper: 'graphite', accent: 'cyan' },
    { id: 6, name: 'Electric Volt', hex: '#84cc16', upper: 'volt', accent: 'green' },
    { id: 7, name: 'Kentucky Blue', hex: '#3b82f6', upper: 'graphite', accent: 'cyan' },
    { id: 8, name: 'Court Purple', hex: '#7c3aed', upper: 'ultraviolet', accent: 'violet' },
  ];

  // High-Performance Smooth Video Seeking Engine
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      onVideoLoaded?.();
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };

    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('seeked', handleSeeked);

    const updateVideoTime = () => {
      const duration = video.duration || 8.04;
      // Map scrollProgress (0 to 0.70) smoothly across the video duration
      const clampedProgress = Math.max(0, Math.min(1.0, scrollProgress / 0.72));

      targetTimeRef.current = clampedProgress * (duration - 0.05);

      // Smooth damped lerp interpolation
      currentTimeRef.current += (targetTimeRef.current - currentTimeRef.current) * 0.12;

      // Non-blocking seek only when delta is noticeable and video is ready
      if (!isSeekingRef.current && Math.abs(video.currentTime - currentTimeRef.current) > 0.03) {
        isSeekingRef.current = true;
        if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
          (video as any).fastSeek(currentTimeRef.current);
        } else {
          video.currentTime = currentTimeRef.current;
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateVideoTime);
    };

    animationFrameRef.current = requestAnimationFrame(updateVideoTime);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [scrollProgress, onVideoLoaded]);

  // Handle Interactive Colorway Selection
  const handleSelectColorway = (cw: typeof CRATE_COLORWAYS[0]) => {
    setSelectedCrateIndex(cw.id);
    setUpperColor(cw.upper as any);
    setAccentColor(cw.accent as any);
  };

  // 3x3 Selector UI visible during selection phase (0.06 - 0.32)
  const showGridUI = scrollProgress >= 0.06 && scrollProgress <= 0.34;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
      {/* Background Video Player */}
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover pointer-events-none transform-gpu"
        style={{ willChange: 'transform' }}
      />

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none mix-blend-multiply opacity-35" />

      {/* Interactive 3x3 Floating Glass Colorway Selector */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-auto transition-all duration-500 ${
          showGridUI
            ? 'opacity-100 scale-100 blur-0 translate-y-0'
            : 'opacity-0 scale-95 blur-sm -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-black/50 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-4 max-w-sm sm:max-w-md w-full mx-4 text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold tracking-mega text-emerald-400 uppercase">
              SELECT NIKE COLORWAY CRATE
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
              CHOOSE YOUR LOADOUT
            </h3>
            <p className="text-xs font-mono text-white/60">
              Click a crate to customize the unboxing sneaker.
            </p>
          </div>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            {CRATE_COLORWAYS.map((cw) => {
              const isSelected = selectedCrateIndex === cw.id;
              return (
                <button
                  key={cw.id}
                  onClick={() => handleSelectColorway(cw)}
                  className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-2 group ${
                    isSelected
                      ? 'bg-white/25 border-white ring-2 ring-emerald-400 scale-105 shadow-lg shadow-emerald-500/25'
                      : 'bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-xl shadow-md border border-white/20 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: cw.hex }}
                  />
                  <span className="text-[10px] font-mono font-bold text-white/80 group-hover:text-white truncate max-w-full">
                    {cw.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <span className="text-[11px] font-mono text-emerald-400 font-bold tracking-wider animate-pulse">
              ↓ SCROLL TO UNBOX ON ALTAR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
