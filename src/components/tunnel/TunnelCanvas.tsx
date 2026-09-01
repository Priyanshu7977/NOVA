'use client';

import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { NIKE_UNIVERSES, CONTRAST_ROOM_PALETTES } from '@/data/nikeUniverses';
import { TunnelRooms } from './TunnelRooms';
import { TunnelCameraRig } from './TunnelCameraRig';
import { NikeSneakerRenderer } from './NikeSneakerRenderer';

interface TunnelCanvasProps {
  currentUniverseProgress: number; // continuous float (0.0 to 7.0)
  isInteracting: boolean;
  interactionProgress: number;
  manualRotationY: number;
  onPointerDown?: (e: React.PointerEvent) => void;
  onPointerMove?: (e: React.PointerEvent) => void;
  onPointerUp?: (e: React.PointerEvent) => void;
  onSelectUniverse?: (universe: any) => void;
}

// Dynamic Real-Time Color Interpolator for 3D Background & Fog
const DynamicSceneAtmosphere: React.FC<{ currentUniverseProgress: number }> = ({
  currentUniverseProgress,
}) => {
  const { scene } = useThree();
  const currentBgColor = useRef(new THREE.Color('#f4f3ee'));
  const currentFogColor = useRef(new THREE.Color('#e8e6dc'));
  const targetBgColor = useRef(new THREE.Color());
  const targetFogColor = useRef(new THREE.Color());

  useFrame((_, delta) => {
    // Determine the lower and upper room palette indices
    const clampedProgress = Math.max(0, Math.min(7, currentUniverseProgress));
    const lowerIdx = Math.floor(clampedProgress);
    const upperIdx = Math.min(7, Math.ceil(clampedProgress));
    const factor = clampedProgress - lowerIdx;

    const lowerPal = CONTRAST_ROOM_PALETTES[lowerIdx] || CONTRAST_ROOM_PALETTES[0];
    const upperPal = CONTRAST_ROOM_PALETTES[upperIdx] || lowerPal;

    const c1Bg = new THREE.Color(lowerPal.bg);
    const c2Bg = new THREE.Color(upperPal.bg);
    targetBgColor.current.copy(c1Bg).lerp(c2Bg, factor);

    const c1Fog = new THREE.Color(lowerPal.fog);
    const c2Fog = new THREE.Color(upperPal.fog);
    targetFogColor.current.copy(c1Fog).lerp(c2Fog, factor);

    // Smoothly interpolate scene background and fog
    currentBgColor.current.lerp(targetBgColor.current, 6 * delta);
    currentFogColor.current.lerp(targetFogColor.current, 6 * delta);

    if (scene.background instanceof THREE.Color) {
      scene.background.copy(currentBgColor.current);
    }
    if (scene.fog) {
      scene.fog.color.copy(currentFogColor.current);
    }
  });

  return null;
};

// Soft Dynamic Speed Dust / Motes
const TunnelPastelParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 800;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const radius = 1.2 + Math.random() * 4.2;
      const angle = Math.random() * Math.PI * 2;
      const z = -(Math.random() * 180);

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = z;

      // Dynamic glowing pastel motes
      color.setHSL(0.55 + Math.random() * 0.2, 0.5, 0.65);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 2] += delta * 8;
      if (posArray[i * 3 + 2] > 10) {
        posArray[i * 3 + 2] = -180;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
};

export const TunnelCanvas: React.FC<TunnelCanvasProps> = ({
  currentUniverseProgress,
  isInteracting,
  interactionProgress,
  manualRotationY,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onSelectUniverse,
}) => {
  const roomDistance = 24;

  return (
    <div
      className="fixed inset-0 z-10 w-full h-full touch-none select-none cursor-grab active:cursor-grabbing transition-colors duration-500"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <Canvas
        camera={{ position: [0, 0.5, 5.2], fov: 45, near: 0.1, far: 250 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        {/* Dynamic Contrasty Background & Depth Fog */}
        <color attach="background" args={['#f4f3ee']} />
        <fog attach="fog" args={['#e8e6dc', 8, 52]} />

        {/* Real-Time Background & Fog Color Interpolator */}
        <DynamicSceneAtmosphere currentUniverseProgress={currentUniverseProgress} />

        {/* Global Studio Daylight Lighting */}
        <ambientLight intensity={1.25} />
        <directionalLight position={[4, 8, 5]} intensity={1.6} castShadow />
        <directionalLight position={[-4, 6, -5]} intensity={0.7} color="#ffffff" />

        {/* Continuous Camera Spline Rig */}
        <TunnelCameraRig
          currentUniverseProgress={currentUniverseProgress}
          isInteracting={isInteracting}
          interactionProgress={interactionProgress}
        />

        <Suspense fallback={null}>
          {/* 3D Contrasty Architectural Rooms (00 to 07) */}
          <TunnelRooms currentUniverseProgress={currentUniverseProgress} />

          {/* Floating Speed Motes */}
          <TunnelPastelParticles />

          {/* Product Renders at their respective Room Positions */}
          {NIKE_UNIVERSES.map((universe) => {
            const zPos = -universe.index * roomDistance;
            const dist = Math.abs(currentUniverseProgress - universe.index);
            const isCurrent = dist < 0.6;

            return (
              <group key={universe.id} position={[0, 0, zPos]}>
                {/* Studio Key Spotlight */}
                <spotLight
                  position={[0, 5, 3]}
                  intensity={isCurrent ? 4.5 : 1.5}
                  color={universe.accentColor}
                  angle={0.65}
                  penumbra={0.9}
                />
                <pointLight
                  position={[0, -0.6, 1.2]}
                  intensity={isCurrent ? 2.2 : 0.4}
                  color={universe.accentColor}
                  distance={6}
                />

                {/* Sneaker 3D Physical Object with Scroll Choreography, 360 Turntable Play, and Shockwave Physics */}
                <NikeSneakerRenderer
                  universe={universe}
                  interactionProgress={isCurrent ? interactionProgress : 0}
                  manualRotationY={isCurrent ? manualRotationY : 0}
                  scrollProgress={currentUniverseProgress}
                  isHovered={isCurrent && isInteracting}
                />
              </group>
            );
          })}
        </Suspense>
      </Canvas>
    </div>
  );
};
