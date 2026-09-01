'use client';

import React, { useState, useMemo } from 'react';
import { Volume2, VolumeX, Compass, X, ExternalLink, Sparkles, Layers, ShoppingBag } from 'lucide-react';
import { NIKE_UNIVERSES, CONTRAST_ROOM_PALETTES } from '@/data/nikeUniverses';
import { audio } from '@/components/audio/NikeAudioEngine';
import { MiniSneakerCanvas } from './MiniSneakerCanvas';
import { useExperience } from '@/context/ExperienceContext';

interface NikeTunnelNavProps {
  currentUniverseIndex: number;
  onNavigateToUniverse: (index: number) => void;
  onOpenShoeModal?: (universe: any) => void;
  onReplayIntro?: () => void;
}

export const NikeTunnelNav: React.FC<NikeTunnelNavProps> = ({
  currentUniverseIndex,
  onNavigateToUniverse,
  onOpenShoeModal,
  onReplayIntro,
}) => {
  const { cartItems, setIsCartOpen } = useExperience();
  const [isMuted, setIsMuted] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleToggleSound = () => {
    const unmuted = audio.toggleMute();
    setIsMuted(!unmuted);
  };

  const currentUniverse =
    currentUniverseIndex >= 1 && currentUniverseIndex <= 6
      ? NIKE_UNIVERSES[Math.round(currentUniverseIndex) - 1]
      : null;

  // Active Contrast Typography Palette for Current Room
  const activePalette = useMemo(() => {
    const roomIdx = Math.max(0, Math.min(7, Math.round(currentUniverseIndex)));
    return CONTRAST_ROOM_PALETTES[roomIdx] || CONTRAST_ROOM_PALETTES[0];
  }, [currentUniverseIndex]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 pointer-events-auto backdrop-blur-xl border-b transition-all duration-500"
        style={{
          backgroundColor: activePalette.badgeBg,
          borderColor: activePalette.badgeBorder,
          color: activePalette.textHeading,
        }}
      >
        {/* Left: Nova Swoosh & Event Title */}
        <div className="flex items-center space-x-5">
          <button
            onClick={() => onNavigateToUniverse(0)}
            className="flex items-center space-x-3 group text-left"
          >
            {/* Iconic Nova Swoosh Vector */}
            <svg
              className="w-10 h-10 transition-colors duration-500"
              style={{ fill: activePalette.textHeading }}
              viewBox="0 0 24 24"
            >
              <path d="M21.707 5.293c-.201-.2-.472-.3-.748-.284-4.832.28-11.83 3.654-15.69 7.828-2.617 2.827-3.81 5.61-3.272 7.625.56 2.102 2.766 3.125 5.922 2.742 7.747-.94 15.088-8.257 15.088-16.911 0-.353-.139-.691-.3-1zm-14.73 15.6c-2.316.28-3.79-.34-4.14-1.652-.363-1.36.439-3.414 2.37-5.501 3.256-3.522 9.074-6.52 13.407-7.258-1.572 6.643-7.24 13.882-11.637 14.411z" />
            </svg>
            <div className="flex flex-col text-left">
              <span
                className="font-display text-sm font-black tracking-tight uppercase leading-none transition-colors duration-500"
                style={{ color: activePalette.textHeading }}
              >
                NOVA INNOVATION
              </span>
              <span
                className="font-sans text-[10px] font-bold tracking-widest uppercase transition-colors duration-500"
                style={{ color: activePalette.textMuted }}
              >
                HOUSE OF SPEED 2025/2026
              </span>
            </div>
          </button>
        </div>

        {/* Center: Current Universe Breadcrumb */}
        <div className="hidden lg:flex items-center space-x-3">
          {currentUniverse ? (
            <div
              className="flex items-center space-x-2.5 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border transition-all duration-500"
              style={{
                backgroundColor: activePalette.badgeBg,
                borderColor: activePalette.badgeBorder,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: activePalette.textAccent }}
              />
              <span
                className="font-display text-base font-black tracking-tight uppercase transition-colors duration-500"
                style={{ color: activePalette.textHeading }}
              >
                0{currentUniverse.index} / {currentUniverse.title}
              </span>
            </div>
          ) : (
            <div
              className="font-sans text-xs font-bold tracking-widest uppercase transition-colors duration-500"
              style={{ color: activePalette.textMuted }}
            >
              {currentUniverseIndex < 0.5 ? 'ENTRANCE PORTAL' : 'MEMBER ACCESS & ARCHIVES'}
            </div>
          )}
        </div>

        {/* Right: Audio Visualizer Toggle & Menu Button */}
        <div className="flex items-center space-x-3.5">
          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            style={{
              backgroundColor: activePalette.badgeBg,
              borderColor: activePalette.badgeBorder,
            }}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full border transition-all shadow-sm group"
            title="Toggle Sound"
          >
            {isMuted ? (
              <VolumeX
                className="w-4 h-4 transition-colors duration-500"
                style={{ color: activePalette.textMuted }}
              />
            ) : (
              <div className="flex items-center space-x-1">
                <Volume2 className="w-4 h-4" style={{ color: activePalette.textAccent }} />
                <div className="flex items-end space-x-0.5 h-3">
                  <span className="w-0.5 h-full animate-bounce" style={{ backgroundColor: activePalette.textAccent }} />
                  <span className="w-0.5 h-2 animate-pulse" style={{ backgroundColor: activePalette.textAccent }} />
                  <span className="w-0.5 h-3 animate-bounce delay-75" style={{ backgroundColor: activePalette.textAccent }} />
                </div>
              </div>
            )}
            <span
              className="hidden sm:inline font-sans text-xs font-bold tracking-wider uppercase transition-colors duration-500"
              style={{ color: activePalette.textMuted }}
            >
              {isMuted ? 'SOUND OFF' : 'SOUND ON'}
            </span>
          </button>

          {/* Shopping Bag Button with Live Item Badge */}
          <button
            onClick={() => {
              audio.playClick();
              setIsCartOpen(true);
            }}
            style={{
              backgroundColor: activePalette.badgeBg,
              borderColor: activePalette.badgeBorder,
              color: activePalette.textHeading,
            }}
            className="relative flex items-center space-x-2 px-4 py-2 rounded-full border font-sans font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-all active:scale-95 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">BAG</span>
            {totalCartCount > 0 && (
              <span
                className="w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center text-white"
                style={{ backgroundColor: activePalette.textAccent }}
              >
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Quick Universe Jump Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              backgroundColor: activePalette.buttonBg,
              color: activePalette.buttonText,
            }}
            className="flex items-center space-x-2 px-5 py-2 rounded-full font-sans font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-all active:scale-95 shadow-md"
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">EXPLORE ROOMS</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Universe Navigation Drawer with Real Product Images */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between backdrop-blur-2xl p-6 sm:p-10 md:p-12 animate-fade-in transition-all duration-500 overflow-y-auto"
          style={{
            backgroundColor: `${activePalette.bg}f8`,
            color: activePalette.textHeading,
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full mb-6">
            <div className="flex items-center space-x-3">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: activePalette.textAccent }}
              />
              <span
                className="font-sans text-xs font-bold tracking-[0.25em] uppercase"
                style={{ color: activePalette.textHeading }}
              >
                SELECT INNOVATION UNIVERSE (VISUAL DIRECTORY)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              {onReplayIntro && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full border text-xs font-mono font-bold uppercase transition-all hover:scale-105 shadow-sm"
                  style={{
                    backgroundColor: activePalette.buttonBg,
                    color: activePalette.buttonText,
                    borderColor: activePalette.badgeBorder,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>REPLAY 3D INTRO</span>
                </button>
              )}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                style={{ color: activePalette.textHeading }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Visual Cards Grid with Real Product Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-auto max-w-7xl mx-auto w-full py-4">
            {/* 00. Intro Room */}
            <button
              onClick={() => {
                onNavigateToUniverse(0);
                setIsMenuOpen(false);
              }}
              style={{
                backgroundColor: activePalette.badgeBg,
                borderColor: activePalette.badgeBorder,
              }}
              className="group relative flex flex-col justify-between p-5 rounded-3xl border text-left transition-all shadow-sm hover:shadow-xl hover:scale-105"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold" style={{ color: activePalette.textMuted }}>
                    ROOM 00
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                </div>
                <span className="font-display text-2xl font-black tracking-tight uppercase block leading-none" style={{ color: activePalette.textHeading }}>
                  PORTAL ENTRANCE
                </span>
                <span className="font-sans text-xs font-medium mt-1 block" style={{ color: activePalette.textMuted }}>
                  The Art of Speed & Air
                </span>
              </div>

              {/* Visual Icon Box */}
              <div className="w-full h-32 my-3 rounded-2xl bg-black/[0.03] flex items-center justify-center overflow-hidden">
                <svg
                  className="w-16 h-16 fill-[#0284c7] group-hover:scale-110 transition-transform duration-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.707 5.293c-.201-.2-.472-.3-.748-.284-4.832.28-11.83 3.654-15.69 7.828-2.617 2.827-3.81 5.61-3.272 7.625.56 2.102 2.766 3.125 5.922 2.742 7.747-.94 15.088-8.257 15.088-16.911 0-.353-.139-.691-.3-1zm-14.73 15.6c-2.316.28-3.79-.34-4.14-1.652-.363-1.36.439-3.414 2.37-5.501 3.256-3.522 9.074-6.52 13.407-7.258-1.572 6.643-7.24 13.882-11.637 14.411z" />
                </svg>
              </div>

              <span className="font-sans text-[11px] font-bold text-[#0284c7] uppercase">
                START SHOWCASE →
              </span>
            </button>

            {/* 01 to 06: Real Sneaker Silhouette Image Cards */}
            {NIKE_UNIVERSES.map((u) => (
              <button
                key={u.id}
                onClick={() => {
                  onNavigateToUniverse(u.index);
                  setIsMenuOpen(false);
                  onOpenShoeModal?.(u);
                }}
                style={{
                  backgroundColor: activePalette.badgeBg,
                  borderColor: activePalette.badgeBorder,
                }}
                className="group relative flex flex-col justify-between p-5 rounded-3xl border text-left transition-all shadow-sm hover:shadow-xl hover:scale-105"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold" style={{ color: activePalette.textMuted }}>
                      ROOM 0{u.index}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: u.accentColor }}
                    />
                  </div>
                  <span className="font-display text-2xl font-black tracking-tight uppercase block leading-none truncate" style={{ color: activePalette.textHeading }}>
                    {u.title}
                  </span>
                  <span className="font-sans text-xs font-medium mt-1 block truncate" style={{ color: activePalette.textMuted }}>
                    {u.category}
                  </span>
                </div>

                {/* Exact 3D Sneaker Model Canvas */}
                <div className="w-full h-36 my-2 rounded-2xl bg-black/[0.02] flex items-center justify-center overflow-hidden">
                  <MiniSneakerCanvas universe={u} heightClass="h-36" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/[0.06]">
                  <span className="font-sans text-xs font-bold" style={{ color: u.accentColor }}>
                    ₹{u.priceINR.toLocaleString('en-IN')}
                  </span>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#111111] group-hover:underline">
                    VIEW & ACQUIRE →
                  </span>
                </div>
              </button>
            ))}

            {/* 07. Outro Room */}
            <button
              onClick={() => {
                onNavigateToUniverse(7);
                setIsMenuOpen(false);
              }}
              style={{
                backgroundColor: activePalette.badgeBg,
                borderColor: activePalette.badgeBorder,
              }}
              className="group relative flex flex-col justify-between p-5 rounded-3xl border text-left transition-all shadow-sm hover:shadow-xl hover:scale-105"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold" style={{ color: activePalette.textMuted }}>
                    ROOM 07
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#111111]" />
                </div>
                <span className="font-display text-2xl font-black tracking-tight uppercase block leading-none" style={{ color: activePalette.textHeading }}>
                  MEMBER LAB
                </span>
                <span className="font-sans text-xs font-medium mt-1 block" style={{ color: activePalette.textMuted }}>
                  Community & Archives
                </span>
              </div>

              {/* Visual Icon Box */}
              <div className="w-full h-32 my-3 rounded-2xl bg-black/[0.03] flex items-center justify-center overflow-hidden">
                <Sparkles className="w-12 h-12 text-[#d97706] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              </div>

              <span className="font-sans text-[11px] font-bold text-[#111111] uppercase">
                JOIN INNER CIRCLE →
              </span>
            </button>
          </div>

          {/* Footer Bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t text-xs font-sans font-bold max-w-7xl mx-auto w-full mt-4"
            style={{
              borderColor: activePalette.badgeBorder,
              color: activePalette.textMuted,
            }}
          >
            <span>OFFICIAL SOURCE: NOVA.IN</span>
            <a
              href="https://nova-x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 font-bold hover:underline mt-2 sm:mt-0"
              style={{ color: activePalette.textHeading }}
            >
              <span>VISIT NOVA OFFICIAL FLAGSHIP STORE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
