'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { NIKE_UNIVERSES, CONTRAST_ROOM_PALETTES, NikeUniverseData } from '@/data/nikeUniverses';
import { TunnelCanvas } from '@/components/tunnel/TunnelCanvas';
import { NikeTunnelNav } from '@/components/ui/NikeTunnelNav';
import { UniverseOverlay } from '@/components/ui/UniverseOverlay';
import { NikeAddToCartModal } from '@/components/ui/NikeAddToCartModal';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { NikeCheckoutModal } from '@/components/ui/NikeCheckoutModal';
import { OutroSection } from '@/components/ui/OutroSection';
import { CartierTimelineScrubber } from '@/components/ui/CartierTimelineScrubber';
import { Nova3DCinematicOpening } from '@/components/intro/Nova3DCinematicOpening';
import { audio } from '@/components/audio/NikeAudioEngine';
import { useExperience } from '@/context/ExperienceContext';

// Error Boundary for Three.js Canvas
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.error('Canvas Error:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#f4f3ee] text-[#0f172a]/60 font-mono text-xs">
          3D GRAPHICS ACCELERATOR INITIALIZING...
        </div>
      );
    }
    return this.props.children;
  }
}

export default function NikeInnovationPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0); // Continuous float (0.0 to 7.0)
  const [selectedUniverseModal, setSelectedUniverseModal] = useState<NikeUniverseData | null>(null);

  // Gesture Interaction States
  const [isInteracting, setIsInteracting] = useState(false);
  const [interactionProgress, setInteractionProgress] = useState(0);
  const [manualRotationY, setManualRotationY] = useState(0);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const interactionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartXRef = useRef(0);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate current contrast background color
  const activeBgColor = useMemo(() => {
    const clamped = Math.max(0, Math.min(7, Math.round(currentProgress)));
    return CONTRAST_ROOM_PALETTES[clamped]?.bg || '#f4f3ee';
  }, [currentProgress]);

  // Continuous Smooth Animation Loop (Buttery Gliding)
  useEffect(() => {
    let animationFrameId: number;

    const updateLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * 0.085;
        setCurrentProgress(currentProgressRef.current);
      }
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Handle URL Hash Deep Linking
  useEffect(() => {
    setIsMounted(true);
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = NIKE_UNIVERSES.find((u) => u.anchor === hash);
      if (match) {
        targetProgressRef.current = match.index;
        currentProgressRef.current = match.index;
        setCurrentProgress(match.index);
      }
    }

    const handleHashChange = () => {
      const h = window.location.hash.replace('#', '');
      const match = NIKE_UNIVERSES.find((u) => u.anchor === h);
      if (match) {
        navigateToUniverse(match.index);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigate directly to a specific universe
  const navigateToUniverse = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(7, index));
    targetProgressRef.current = clamped;
    audio.playChime(440 + clamped * 40, 'sine', 0.12);

    if (clamped >= 1 && clamped <= 6) {
      const u = NIKE_UNIVERSES[clamped - 1];
      if (u) {
        window.history.replaceState(null, '', `#${u.anchor}`);
      }
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Continuous Buttery Smooth Wheel Listener with Auto-Magnetic Snapping
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (selectedUniverseModal) return;

      const scrollSensitivity = 0.0018;
      const delta = e.deltaY * scrollSensitivity;

      targetProgressRef.current = Math.max(0, Math.min(7, targetProgressRef.current + delta));

      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = setTimeout(() => {
        const nearestRoom = Math.round(targetProgressRef.current);
        targetProgressRef.current = nearestRoom;

        if (nearestRoom >= 1 && nearestRoom <= 6) {
          const u = NIKE_UNIVERSES[nearestRoom - 1];
          if (u) window.history.replaceState(null, '', `#${u.anchor}`);
        } else {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }, 350);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, [selectedUniverseModal]);

  // Pointer Drag Gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    if (selectedUniverseModal) return;
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || selectedUniverseModal) return;

    const deltaX = e.clientX - dragStartXRef.current;
    const deltaY = e.clientY - dragStartYRef.current;

    setManualRotationY((prev) => prev + deltaX * 0.008);
    dragStartXRef.current = e.clientX;

    targetProgressRef.current = Math.max(0, Math.min(7, targetProgressRef.current - deltaY * 0.003));
    dragStartYRef.current = e.clientY;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    const nearestRoom = Math.round(targetProgressRef.current);
    targetProgressRef.current = nearestRoom;
  };

  // Interactive Action Button
  const handleTriggerInteractionStart = () => {
    setIsInteracting(true);
    const activeIndex = Math.round(currentProgress);
    const activeUniverse =
      activeIndex >= 1 && activeIndex <= 6 ? NIKE_UNIVERSES[activeIndex - 1] : null;

    if (!activeUniverse) return;

    if (activeUniverse.interactionType === 'pump') {
      audio.playAirPump(0.8);
    } else if (activeUniverse.interactionType === 'explode') {
      audio.playExplode();
    } else if (activeUniverse.interactionType === 'draw') {
      audio.playSpeedSprint();
    } else if (activeUniverse.interactionType === 'hold') {
      audio.playTensionCable();
    }

    if (interactionIntervalRef.current) clearInterval(interactionIntervalRef.current);

    interactionIntervalRef.current = setInterval(() => {
      setInteractionProgress((prev) => {
        if (prev >= 1) return 1;
        return prev + 0.05;
      });
    }, 30);
  };

  const handleTriggerInteractionEnd = () => {
    setIsInteracting(false);
    if (interactionIntervalRef.current) {
      clearInterval(interactionIntervalRef.current);
      interactionIntervalRef.current = null;
    }
    const resetInterval = setInterval(() => {
      setInteractionProgress((prev) => {
        if (prev <= 0.02) {
          clearInterval(resetInterval);
          return 0;
        }
        return prev * 0.85;
      });
    }, 25);
  };

  const roundedIndex = Math.round(currentProgress);

  return (
    <main
      className="relative text-[#18181b] w-full h-screen overflow-hidden select-none transition-colors duration-700"
      style={{ backgroundColor: activeBgColor }}
    >
      {/* 1. Top Luxury Navigation Bar with Bag Counter & Explore Rooms */}
      <NikeTunnelNav
        currentUniverseIndex={currentProgress}
        onNavigateToUniverse={navigateToUniverse}
        onOpenShoeModal={(u) => setSelectedUniverseModal(u)}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* 2. 3D WebGL Contrasty Tunnel Canvas (3D Kick-Flip Physics on Shoe Click) */}
      {isMounted && (
        <CanvasErrorBoundary>
          <TunnelCanvas
            currentUniverseProgress={currentProgress}
            isInteracting={isInteracting}
            interactionProgress={interactionProgress}
            manualRotationY={manualRotationY}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          />
        </CanvasErrorBoundary>
      )}

      {/* 3. Universe Editorial Typography Overlays (Rooms 00 to 06) */}
      <UniverseOverlay
        currentUniverseIndex={roundedIndex}
        interactionProgress={interactionProgress}
        isInteracting={isInteracting}
        onOpenInnovationModal={(u) => setSelectedUniverseModal(u)}
        onNavigateToUniverse={navigateToUniverse}
        onTriggerInteractionStart={handleTriggerInteractionStart}
        onTriggerInteractionEnd={handleTriggerInteractionEnd}
      />

      {/* 4. Outro & Nova Member Lab Section (Room 07) */}
      {currentProgress > 6.4 && (
        <OutroSection onNavigateToUniverse={navigateToUniverse} />
      )}

      {/* 5. Official Nova.in Add to Cart & Size Selection Modal */}
      <NikeAddToCartModal
        universe={selectedUniverseModal}
        onClose={() => setSelectedUniverseModal(null)}
      />

      {/* 6. Nova Slide-Out Bag / Cart Drawer */}
      <CartDrawer />

      {/* 7. Official Nova.in Multi-Step Checkout Modal with Real Payment Gateways */}
      <NikeCheckoutModal />

      {/* 8. Cartier-Inspired Luxury Bottom Timeline Scrubber */}
      {!showIntro && (
        <CartierTimelineScrubber
          currentUniverseIndex={currentProgress}
          onNavigateToUniverse={navigateToUniverse}
        />
      )}

      {/* 9. Fullscreen 3D Animated Cinematic Opening Experience */}
      {showIntro && (
        <Nova3DCinematicOpening onComplete={() => setShowIntro(false)} />
      )}
    </main>
  );
}
