'use client';

import React, { useMemo } from 'react';
import { ChevronDown, ArrowRight, Sparkles, Layers, RotateCw, Activity, Zap, Clock } from 'lucide-react';
import { NIKE_UNIVERSES, NikeUniverseData, CONTRAST_ROOM_PALETTES } from '@/data/nikeUniverses';
import { audio } from '@/components/audio/NikeAudioEngine';
import { MiniSneakerCanvas } from './MiniSneakerCanvas';

interface UniverseOverlayProps {
  currentUniverseIndex: number; // 0 to 7
  interactionProgress: number; // 0 to 1
  isInteracting: boolean;
  onOpenInnovationModal: (universe: NikeUniverseData) => void;
  onNavigateToUniverse: (index: number) => void;
  onTriggerInteractionStart: () => void;
  onTriggerInteractionEnd: () => void;
}

export const UniverseOverlay: React.FC<UniverseOverlayProps> = ({
  currentUniverseIndex,
  interactionProgress,
  isInteracting,
  onOpenInnovationModal,
  onNavigateToUniverse,
  onTriggerInteractionStart,
  onTriggerInteractionEnd,
}) => {
  const isIntro = currentUniverseIndex < 0.5;
  const isOutro = currentUniverseIndex > 6.5;

  const currentUniverse =
    !isIntro && !isOutro
      ? NIKE_UNIVERSES[Math.round(currentUniverseIndex) - 1]
      : null;

  // Active Contrast Typography Palette for Current Room
  const activePalette = useMemo(() => {
    const roomIdx = Math.max(0, Math.min(7, Math.round(currentUniverseIndex)));
    return CONTRAST_ROOM_PALETTES[roomIdx] || CONTRAST_ROOM_PALETTES[0];
  }, [currentUniverseIndex]);

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'pump':
        return <Activity className="w-4 h-4" style={{ color: activePalette.textAccent }} />;
      case 'rotate':
        return <RotateCw className="w-4 h-4" style={{ color: activePalette.textAccent }} />;
      case 'explode':
        return <Layers className="w-4 h-4" style={{ color: activePalette.textAccent }} />;
      case 'draw':
        return <Zap className="w-4 h-4" style={{ color: activePalette.textAccent }} />;
      case 'hold':
        return <Sparkles className="w-4 h-4" style={{ color: activePalette.textAccent }} />;
      case 'timeline':
        return <Clock className="w-4 h-4" style={{ color: activePalette.textAccent }} />;
      default:
        return <Sparkles className="w-4 h-4" style={{ color: activePalette.textAccent }} />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-12 md:p-16 transition-colors duration-500"
      style={{ color: activePalette.textHeading }}
    >
      {/* ========================================== */}
      {/* 1. INTRODUCTION OVERLAY (CTRL_ROOM_00)     */}
      {/* ========================================== */}
      {isIntro && (
        <div className="my-auto max-w-4xl pointer-events-auto animate-fade-in text-left">
          <div
            className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md mb-6 border transition-all duration-500"
            style={{
              backgroundColor: activePalette.badgeBg,
              borderColor: activePalette.badgeBorder,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: activePalette.textAccent }}
            />
            <span
              className="text-xs font-mono tracking-[0.25em] uppercase font-bold transition-colors duration-500"
              style={{ color: activePalette.textHeading }}
            >
              NIKE INNOVATION LAB
            </span>
          </div>

          {/* Dynamic Contrast Display Headline */}
          <h1
            className="font-display font-black text-6xl sm:text-8xl md:text-9xl uppercase leading-[0.88] tracking-tight mb-6 transition-colors duration-500"
            style={{ color: activePalette.textHeading }}
          >
            THE ART OF <br />
            <span style={{ color: activePalette.textAccent }} className="transition-colors duration-500">
              SPEED & AIR.
            </span>
          </h1>

          <p
            className="font-sans text-base sm:text-xl font-medium max-w-xl leading-relaxed mb-10 transition-colors duration-500"
            style={{ color: activePalette.textMuted }}
          >
            Speed is not just velocity. It is a metamorphosis of form, pressurized air, and human potential. Traverse the 7 chambers of innovation.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigateToUniverse(1)}
              style={{
                backgroundColor: activePalette.buttonBg,
                color: activePalette.buttonText,
              }}
              className="group flex items-center space-x-3 px-8 py-4 rounded-full font-sans font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-all hover:scale-105 shadow-xl"
            >
              <span>ENTER CHAMBER 01</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <span
              className="text-xs font-mono font-semibold tracking-widest uppercase flex items-center space-x-2 transition-colors duration-500"
              style={{ color: activePalette.textMuted }}
            >
              <ChevronDown className="w-4 h-4 animate-bounce" style={{ color: activePalette.textHeading }} />
              <span>SCROLL TO GLIDE</span>
            </span>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. ACTIVE UNIVERSE OVERLAY (ROOMS 01 TO 06)*/}
      {/* ========================================== */}
      {currentUniverse && (
        <div className="my-auto flex flex-col lg:flex-row lg:items-center justify-between w-full gap-8">
          {/* Left Column: Dynamic Typography Colors Matching Current Room */}
          <div className="max-w-2xl pointer-events-auto animate-fade-in text-left">
            {/* Room Index & Category Pill */}
            <div
              className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md mb-4 border transition-all duration-500"
              style={{
                backgroundColor: activePalette.badgeBg,
                borderColor: activePalette.badgeBorder,
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full transition-colors duration-500"
                style={{ backgroundColor: activePalette.textAccent }}
              />
              <span
                className="text-[11px] font-mono tracking-[0.2em] uppercase font-bold transition-colors duration-500"
                style={{ color: activePalette.textHeading }}
              >
                ROOM 0{currentUniverse.index} / {currentUniverse.category}
              </span>
            </div>

            {/* Dynamic Headline Color */}
            <h2
              className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-[0.9] mb-3 transition-colors duration-500"
              style={{ color: activePalette.textHeading }}
            >
              {currentUniverse.title}
            </h2>

            {/* Dynamic Subtitle Color */}
            <p
              className="font-sans text-xs sm:text-sm tracking-wider uppercase font-bold mb-4 transition-colors duration-500"
              style={{ color: activePalette.textAccent }}
            >
              {currentUniverse.subtitle}
            </p>

            {/* Dynamic Body Text Color */}
            <p
              className="font-sans text-sm sm:text-base font-medium leading-relaxed max-w-xl mb-8 line-clamp-3 sm:line-clamp-none transition-colors duration-500"
              style={{ color: activePalette.textMuted }}
            >
              {currentUniverse.introText}
            </p>

            {/* Interactive Controls & Innovation Modal Button */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Dynamic Gesture Action Button */}
              <button
                onPointerDown={onTriggerInteractionStart}
                onPointerUp={onTriggerInteractionEnd}
                onPointerLeave={onTriggerInteractionEnd}
                style={{
                  backgroundColor: activePalette.badgeBg,
                  borderColor: activePalette.badgeBorder,
                  color: activePalette.textHeading,
                }}
                className="relative group flex items-center space-x-3 px-7 py-3.5 rounded-full border transition-all overflow-hidden active:scale-95 shadow-md font-sans font-bold"
              >
                {/* Progress Background Fill */}
                <div
                  className="absolute inset-0 transition-all duration-75 opacity-20"
                  style={{
                    backgroundColor: activePalette.textAccent,
                    width: `${Math.round(interactionProgress * 100)}%`,
                  }}
                />

                <div className="relative z-10 flex items-center space-x-2.5">
                  {getInteractionIcon(currentUniverse.interactionType)}
                  <span
                    className="text-xs font-mono font-bold tracking-wider uppercase transition-colors duration-500"
                    style={{ color: activePalette.textHeading }}
                  >
                    {currentUniverse.interactionLabel}
                  </span>
                </div>
              </button>

              {/* Dynamic Explore Innovation CTA Button */}
              <button
                onClick={() => onOpenInnovationModal(currentUniverse)}
                style={{
                  backgroundColor: activePalette.buttonBg,
                  color: activePalette.buttonText,
                }}
                className="flex items-center space-x-2 px-7 py-3.5 rounded-full font-sans font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-all active:scale-95 shadow-xl"
              >
                <span>EXPLORE INNOVATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p
              className="text-[10px] font-mono tracking-wider uppercase mt-4 font-semibold transition-colors duration-500"
              style={{ color: activePalette.textMuted }}
            >
              {currentUniverse.interactionInstruction}
            </p>
          </div>

          {/* Right Column: Dynamic Real Product Hologram Card */}
          <div className="hidden lg:flex flex-col items-end pointer-events-auto animate-fade-in">
            <div
              onClick={() => {
                audio.playSonicBlast();
                onTriggerInteractionStart();
                setTimeout(() => onTriggerInteractionEnd(), 600);
              }}
              style={{
                backgroundColor: activePalette.badgeBg,
                borderColor: activePalette.badgeBorder,
              }}
              className="group relative w-64 p-4 rounded-3xl border shadow-xl backdrop-blur-xl transition-all cursor-pointer hover:scale-105"
            >
              <span
                className="text-[9px] font-mono uppercase tracking-widest block mb-2 font-bold transition-colors duration-500"
                style={{ color: activePalette.textMuted }}
              >
                GENUINE 3D SILHOUETTE
              </span>
              <div className="w-full h-32 flex items-center justify-center overflow-hidden">
                <MiniSneakerCanvas universe={currentUniverse} />
              </div>
              <div
                className="flex items-center justify-between mt-2 pt-2 border-t transition-colors duration-500"
                style={{ borderColor: activePalette.badgeBorder }}
              >
                <span
                  className="font-display text-sm font-black uppercase tracking-tight truncate transition-colors duration-500"
                  style={{ color: activePalette.textHeading }}
                >
                  {currentUniverse.productName}
                </span>
                <span
                  className="font-sans text-xs font-bold transition-colors duration-500"
                  style={{ color: activePalette.textAccent }}
                >
                  ₹{currentUniverse.priceINR.toLocaleString('en-IN')}
                </span>
              </div>
              <div
                className="mt-2 text-center font-sans text-[10px] font-black tracking-widest uppercase py-1.5 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: `${activePalette.textAccent}18`,
                  color: activePalette.textAccent,
                }}
              >
                ⚡ 360° DRAG / CLICK FLIP
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. BOTTOM UNIVERSE PROGRESS BAR            */}
      {/* ========================================== */}
      <footer
        className="w-full flex items-center justify-between pointer-events-auto border-t pt-4 transition-colors duration-500"
        style={{ borderColor: activePalette.badgeBorder }}
      >
        {/* Previous Room */}
        <button
          onClick={() => onNavigateToUniverse(Math.max(0, Math.round(currentUniverseIndex) - 1))}
          disabled={currentUniverseIndex < 0.5}
          style={{ color: activePalette.textMuted }}
          className="font-sans text-xs font-bold tracking-widest hover:opacity-100 uppercase disabled:opacity-20 transition-all"
        >
          ← PREV ROOM
        </button>

        {/* Room Dots Indicator (0 to 7) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
            const isSelected = Math.round(currentUniverseIndex) === idx;
            return (
              <button
                key={idx}
                onClick={() => onNavigateToUniverse(idx)}
                style={{
                  backgroundColor: isSelected ? activePalette.textHeading : `${activePalette.textHeading}33`,
                }}
                className={`transition-all duration-300 rounded-full ${
                  isSelected ? 'w-8 h-2.5' : 'w-2.5 h-2.5 hover:opacity-70'
                }`}
                title={`Room 0${idx}`}
              />
            );
          })}
        </div>

        {/* Next Room */}
        <button
          onClick={() => onNavigateToUniverse(Math.min(7, Math.round(currentUniverseIndex) + 1))}
          disabled={currentUniverseIndex > 6.5}
          style={{ color: activePalette.textMuted }}
          className="font-sans text-xs font-bold tracking-widest hover:opacity-100 uppercase disabled:opacity-20 transition-all"
        >
          NEXT ROOM →
        </button>
      </footer>
    </div>
  );
};
