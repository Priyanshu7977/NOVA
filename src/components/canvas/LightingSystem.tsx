'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperience } from '@/context/ExperienceContext';

export const LightingSystem: React.FC = () => {
  const { activeScene } = useExperience();

  const keySpotRef = useRef<THREE.SpotLight>(null);
  const upperFillRef = useRef<THREE.DirectionalLight>(null);
  const lowerBounceRef = useRef<THREE.DirectionalLight>(null);
  const greenAccentLightRef = useRef<THREE.PointLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);
  const tunnelLightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    // 1. Key Studio Spotlight (Angled directly onto upper for maximum crisp visibility)
    if (keySpotRef.current) {
      const targetIntensity = activeScene === 1 ? 52 : activeScene === 2 ? 60 : 45;
      keySpotRef.current.intensity = THREE.MathUtils.damp(
        keySpotRef.current.intensity,
        targetIntensity,
        4,
        delta
      );
    }

    // 2. Diffuse Upper Fill
    if (upperFillRef.current) {
      upperFillRef.current.intensity = THREE.MathUtils.damp(
        upperFillRef.current.intensity,
        2.8,
        4,
        delta
      );
    }

    // 3. Lower bounce light to illuminate sole arch and carbon plate
    if (lowerBounceRef.current) {
      lowerBounceRef.current.intensity = THREE.MathUtils.damp(
        lowerBounceRef.current.intensity,
        2.0,
        4,
        delta
      );
    }

    // 4. Electric Green Accent Core Light
    if (greenAccentLightRef.current) {
      const isEnergy = activeScene === 4 || activeScene === 5;
      const targetIntensity = isEnergy ? 70 : 22;
      greenAccentLightRef.current.intensity = THREE.MathUtils.damp(
        greenAccentLightRef.current.intensity,
        targetIntensity,
        5,
        delta
      );
      if (isEnergy) {
        greenAccentLightRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.2;
      }
    }

    // 5. Rim Light
    if (rimRef.current) {
      rimRef.current.intensity = THREE.MathUtils.damp(
        rimRef.current.intensity,
        3.5,
        4,
        delta
      );
    }

    // 6. Fast moving tunnel speed light (Scene 6-7)
    if (tunnelLightRef.current) {
      const isSpeed = activeScene === 6 || activeScene === 7;
      tunnelLightRef.current.intensity = isSpeed ? 35.0 : 0.0;
      if (isSpeed) {
        tunnelLightRef.current.position.z = ((state.clock.elapsedTime * 18) % 30) - 15;
        tunnelLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 8) * 3;
      }
    }
  });

  return (
    <group name="DYNAMIC_STUDIO_LIGHTING">
      {/* Balanced ambient base fill */}
      <ambientLight intensity={0.65} color="#18181b" />

      {/* Main Studio Spotlight (Angled onto upper mesh) */}
      <spotLight
        ref={keySpotRef}
        position={[2.5, 6.5, 5.0]}
        angle={0.65}
        penumbra={0.7}
        intensity={50}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* High-Angle Diffuse Upper Fill (Brightens tongue, collar, laces) */}
      <directionalLight
        ref={upperFillRef}
        position={[0, 5, 2]}
        intensity={2.8}
        color="#f0fdf4"
      />

      {/* Lower Upward Bounce Light (Illuminates sole and carbon plate) */}
      <directionalLight
        ref={lowerBounceRef}
        position={[0, -4, 2]}
        intensity={2.0}
        color="#dcfce7"
      />

      {/* Rim Light (Defines silhouette edge) */}
      <directionalLight
        ref={rimRef}
        position={[-4, 3, -4]}
        intensity={3.5}
        color="#86efac"
      />

      {/* Electric Green Accent Point Light (Matches light pipe glow) */}
      <pointLight
        ref={greenAccentLightRef}
        position={[0.2, -0.3, 1.2]}
        distance={6.0}
        color="#00ff66"
        intensity={22}
      />

      {/* Speed Tunnel Strobe Light (Scene 6) */}
      <pointLight
        ref={tunnelLightRef}
        position={[0, 1, 0]}
        distance={10}
        color="#00ff66"
        intensity={0}
      />
    </group>
  );
};
