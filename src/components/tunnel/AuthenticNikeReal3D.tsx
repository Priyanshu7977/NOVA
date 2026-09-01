'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { NikeUniverseData } from '@/data/nikeUniverses';

interface AuthenticNikeReal3DProps {
  universe: NikeUniverseData;
  interactionProgress: number; // 0 to 1
  manualRotationY: number;
  scrollProgress: number;
  isHovered: boolean;
}

export const AuthenticNikeReal3D: React.FC<AuthenticNikeReal3DProps> = ({
  universe,
  interactionProgress,
  manualRotationY,
  scrollProgress,
  isHovered,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);

  // Load the authentic official Nova high-res real shoe texture
  const texture = useLoader(THREE.TextureLoader, universe.realImageUrl);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  // Multi-layered depth volume materials
  const { frontMat, depthMat, backMat, glowMat } = useMemo(() => {
    // 1. Crystal-clear front lateral face
    const frontMat = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.02,
      roughness: 0.22,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    // 2. Inner volumetric core
    const depthMat = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.02,
      color: '#1e293b',
      roughness: 0.6,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });

    // 3. Back medial face
    const backMat = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.02,
      color: '#0f172a',
      roughness: 0.5,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });

    // 4. Soft ambient backlight glow
    const glowMat = new THREE.MeshBasicMaterial({
      color: universe.accentColor,
      transparent: true,
      opacity: 0.2 + interactionProgress * 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { frontMat, depthMat, backMat, glowMat };
  }, [texture, universe.accentColor, interactionProgress]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Cartier-Style Scroll Choreography
    const roomOffset = scrollProgress - universe.index;
    const scrollAngleY = -roomOffset * Math.PI * 0.45;
    const scrollTiltX = Math.sin(roomOffset * Math.PI * 0.5) * 0.14;
    const scrollRollZ = -roomOffset * 0.08;

    // Combine Scroll Angle + User Manual 360° Drag Turntable + Idle Breathing
    const targetRotY = manualRotationY + scrollAngleY + Math.sin(time * 0.6) * 0.04;
    const targetRotX = scrollTiltX + Math.sin(time * 1.0) * 0.02;
    const targetRotZ = scrollRollZ;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      6,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      6,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetRotZ,
      6,
      delta
    );

    // Hover scale interpolation
    const targetScale = isHovered ? 1.06 : 1.0;
    if (coreRef.current) {
      coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 6 * delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      <group ref={coreRef}>
        {/* Layer 1: Front Lateral Real Shoe Face */}
        <mesh position={[0, 0, 0.08]} castShadow receiveShadow material={frontMat}>
          <planeGeometry args={[3.4, 2.2]} />
        </mesh>

        {/* Layer 2: Mid-Forward Volumetric Extrusion */}
        <mesh position={[0, 0, 0.04]} material={depthMat}>
          <planeGeometry args={[3.4, 2.2]} />
        </mesh>

        {/* Layer 3: Central Structural Core */}
        <mesh position={[0, 0, 0]} material={depthMat}>
          <planeGeometry args={[3.4, 2.2]} />
        </mesh>

        {/* Layer 4: Mid-Back Volumetric Extrusion */}
        <mesh position={[0, 0, -0.04]} material={depthMat}>
          <planeGeometry args={[3.4, 2.2]} />
        </mesh>

        {/* Layer 5: Back Medial Real Shoe Face */}
        <mesh position={[0, 0, -0.08]} material={backMat}>
          <planeGeometry args={[3.4, 2.2]} />
        </mesh>

        {/* Layer 6: Soft Neon Ambient Aura Plane */}
        <mesh position={[0, 0, -0.12]} material={glowMat}>
          <planeGeometry args={[3.7, 2.5]} />
        </mesh>
      </group>
    </group>
  );
};
