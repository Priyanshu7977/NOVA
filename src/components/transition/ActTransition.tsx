'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';
import { sounds } from '@/components/audio/SoundManager';

export const ActTransition: React.FC = () => {
  const handleExploreClick = () => {
    sounds.playClick();
    const collectionEl = document.getElementById('nova-collection');
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full z-30 pointer-events-auto select-none">
      {/* 1. Multi-tone smooth physical gradient transition from #030303 to #F7F7F5 */}
      <div className="w-full h-40 md:h-64 overflow-hidden relative -mb-1 bg-[#030303]">
        <svg
          viewBox="0 0 1440 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          <defs>
            <linearGradient id="transitionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#030303" />
              <stop offset="25%" stopColor="#161616" />
              <stop offset="55%" stopColor="#555555" />
              <stop offset="82%" stopColor="#DCDCD8" />
              <stop offset="100%" stopColor="#F7F7F5" />
            </linearGradient>
          </defs>

          {/* Physical curved wave contour */}
          <path
            d="M 0,260 L 0,90 Q 720,0 1440,90 L 1440,260 Z"
            fill="url(#transitionGradient)"
          />
        </svg>
      </div>

      {/* 2. Transition Hand-off Banner */}
      <div className="bg-[#F7F7F5] pt-6 pb-12 text-center flex flex-col items-center justify-center space-y-4 px-6 border-b border-[#E5E5E2]">
        <span className="text-[11px] font-mono tracking-mega text-[#6B6B6B] uppercase font-bold">
          ACT II // THE SHOWROOM
        </span>
        <button
          onClick={handleExploreClick}
          className="group inline-flex items-center space-x-3 text-xs md:text-sm font-mono tracking-widest text-[#111111] hover:text-accent transition-colors uppercase font-bold"
        >
          <span>EXPLORE THE 2026 COLLECTION</span>
          <div className="w-7 h-7 rounded-full border border-[#111111]/30 group-hover:border-accent flex items-center justify-center transition-colors">
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};
