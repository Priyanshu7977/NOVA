'use client';

import React from 'react';
import { NIKE_UNIVERSES, CONTRAST_ROOM_PALETTES } from '@/data/nikeUniverses';
import { audio } from '@/components/audio/NikeAudioEngine';
import { Sparkles, ChevronRight, MousePointer } from 'lucide-react';

interface CartierTimelineScrubberProps {
  currentUniverseIndex: number;
  onNavigateToUniverse: (index: number) => void;
}

export const CartierTimelineScrubber: React.FC<CartierTimelineScrubberProps> = ({
  currentUniverseIndex,
  onNavigateToUniverse,
}) => {
  const activeRoomIdx = Math.max(0, Math.min(7, Math.round(currentUniverseIndex)));
  const activePalette = CONTRAST_ROOM_PALETTES[activeRoomIdx] || CONTRAST_ROOM_PALETTES[0];

  // Normalized global progress 0 to 1 across 7 sections
  const globalProgress = Math.max(0, Math.min(1, currentUniverseIndex / 7));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex flex-col items-center select-none w-full max-w-2xl px-4">
      {/* Floating Minimalist Scrubber Container */}
      <div
        className="w-full flex items-center justify-between px-5 py-2.5 rounded-full border shadow-xl backdrop-blur-xl transition-all duration-500"
        style={{
          backgroundColor: activePalette.badgeBg,
          borderColor: activePalette.badgeBorder,
        }}
      >
        {/* Left: Interactive Room Progress Pills */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => {
              audio.playClick();
              onNavigateToUniverse(0);
            }}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all ${
              activeRoomIdx === 0
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a] hover:bg-black/5'
            }`}
          >
            00 INTRO
          </button>

          {NIKE_UNIVERSES.map((u) => {
            const isActive = activeRoomIdx === u.index;
            return (
              <button
                key={u.id}
                onClick={() => {
                  audio.playClick();
                  onNavigateToUniverse(u.index);
                }}
                className={`relative px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all flex items-center space-x-1 ${
                  isActive
                    ? 'text-white shadow-xs scale-105'
                    : 'text-[#64748b] hover:text-[#0f172a] hover:bg-black/5'
                }`}
                style={{
                  backgroundColor: isActive ? u.themeColor : 'transparent',
                }}
              >
                <span>0{u.index}</span>
                <span className="hidden md:inline text-[9px] font-sans font-semibold opacity-90">
                  {u.title.split(' ')[0]}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => {
              audio.playClick();
              onNavigateToUniverse(7);
            }}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all ${
              activeRoomIdx === 7
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a] hover:bg-black/5'
            }`}
          >
            07 LAB
          </button>
        </div>

        {/* Right: Real-time Telemetry Percentage & Scroll Prompt */}
        <div className="flex items-center space-x-3 pl-3 border-l border-black/10">
          <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold" style={{ color: activePalette.textHeading }}>
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: activePalette.textAccent }} />
            <span>{Math.round(globalProgress * 100)}%</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1 text-[9px] font-mono font-bold tracking-widest text-[#64748b] uppercase">
            <span>SCROLL</span>
            <ChevronRight className="w-3 h-3 animate-pulse text-[#0284c7]" />
          </div>
        </div>
      </div>

      {/* Cartier-Style Continuous Fine Line Track */}
      <div className="w-48 h-0.5 rounded-full bg-black/10 mt-2 overflow-hidden">
        <div
          className="h-full transition-all duration-150 rounded-full"
          style={{
            width: `${Math.round(globalProgress * 100)}%`,
            backgroundColor: activePalette.textAccent,
          }}
        />
      </div>
    </div>
  );
};
