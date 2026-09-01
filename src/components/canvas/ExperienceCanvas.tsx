'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useExperience } from '@/context/ExperienceContext';
import { useResponsive } from '@/hooks/useResponsive';
import { CameraRig } from './CameraRig';
import { LightingSystem } from './LightingSystem';
import { SneakerModel } from './SneakerModel';
import { ParticleSystem } from './ParticleSystem';
import { RunningEnvironment } from './RunningEnvironment';
import { AnnotationLabels3D } from './AnnotationLabels3D';

export const ExperienceCanvas: React.FC = () => {
  const { scrollProgress } = useExperience();
  const { isMobile } = useResponsive();

  // Calculate Explosion Progress (0 to 1) for Scene 03 (0.24 to 0.40)
  let explodeProgress = 0;
  if (scrollProgress >= 0.24 && scrollProgress <= 0.40) {
    if (scrollProgress < 0.30) {
      explodeProgress = (scrollProgress - 0.24) / 0.06;
    } else if (scrollProgress <= 0.34) {
      explodeProgress = 1.0;
    } else {
      explodeProgress = 1.0 - (scrollProgress - 0.34) / 0.06;
    }
  }

  // Energy Activity (Scene 04 & 05: 0.38 to 0.63)
  const energyActive = scrollProgress >= 0.38 && scrollProgress <= 0.63;

  // Dynamic Footstep Compression (Scene 05: 0.50 to 0.63)
  let compressionAmount = 0;
  if (scrollProgress >= 0.50 && scrollProgress <= 0.63) {
    const cycle = (scrollProgress - 0.50) * 45;
    compressionAmount = Math.max(0, Math.sin(cycle));
  }

  // Is Reconstructed (Scene 06 through 08: > 0.63)
  const isReconstructed = scrollProgress > 0.63;

  // Fade out canvas when moving past Act 01 into Act 02
  const canvasOpacity = scrollProgress >= 1.02 ? Math.max(0, 1 - (scrollProgress - 1.02) / 0.04) : 1;
  const isVisible = scrollProgress < 1.08;

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-10 w-full h-full bg-[#050505] touch-none select-none transition-opacity duration-300"
      style={{ opacity: canvasOpacity }}
    >
      <Canvas
        camera={{ position: [1.2, 0.6, 6.2], fov: 45, near: 0.1, far: 100 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 8, 26]} />

        {/* Ambient luxury light fill */}
        <hemisphereLight args={['#475569', '#09090b', 1.0]} />

        {/* Master Camera & Sneaker Choreography */}
        <CameraRig />

        {/* Storyboard-driven Studio Lighting System */}
        <LightingSystem />

        {/* Hero 3D Nova Sneaker in Performance Green with Exploded View */}
        <SneakerModel
          explodeProgress={explodeProgress}
          energyActive={energyActive}
          compressionAmount={compressionAmount}
          isReconstructed={isReconstructed}
        />

        {/* 3D Spatial Leader Callout Labels (Scene 03 Exploded View) */}
        <AnnotationLabels3D explodeProgress={explodeProgress} />

        {/* Instanced Dynamic Particles (Selective per scene) */}
        <ParticleSystem />

        {/* Futuristic Running Tunnel & Reflective Floor (Scene 07) */}
        <RunningEnvironment />
      </Canvas>
    </div>
  );
};
