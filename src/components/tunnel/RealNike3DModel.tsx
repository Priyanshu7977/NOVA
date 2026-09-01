'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { NikeUniverseData } from '@/data/nikeUniverses';

interface RealNike3DModelProps {
  universe: NikeUniverseData;
  interactionProgress: number; // 0 to 1
  manualRotationY: number;
  scrollProgress: number;
  isHovered: boolean;
}

export const RealNike3DModel: React.FC<RealNike3DModelProps> = ({
  universe,
  interactionProgress,
  manualRotationY,
  scrollProgress,
  isHovered,
}) => {
  const modelRef = useRef<THREE.Group>(null);

  // Load the authentic 3D Nike Shoe GLB
  const { scene } = useGLTF('/nike_shoe.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Universe-specific 3D PBR Colorway Palette
  const colorwayPalette = useMemo(() => {
    switch (universe.id) {
      case 'air-max-dn':
        return {
          primary: '#1e3a8a', // Deep Royal / All Night
          accent: '#38bdf8',  // Sky Cyan
          sole: '#0f172a',
          roughness: 0.28,
          metalness: 0.25,
          clearcoat: 0.6,
        };
      case 'pegasus-41':
        return {
          primary: '#84cc16', // Electric Volt
          accent: '#65a30d',  // Sage
          sole: '#ffffff',
          roughness: 0.35,
          metalness: 0.1,
          clearcoat: 0.3,
        };
      case 'alphafly-3':
        return {
          primary: '#fafafa', // Proto White
          accent: '#f43f5e',  // Bright Crimson
          sole: '#ffffff',
          roughness: 0.2,
          metalness: 0.3,
          clearcoat: 0.8,
        };
      case 'mercurial-superfly':
        return {
          primary: '#0284c7', // Blueprint Racer Blue
          accent: '#ea580c',  // Safety Orange
          sole: '#f8fafc',
          roughness: 0.4,
          metalness: 0.35,
          clearcoat: 0.7,
        };
      case 'court-alchemy':
        return {
          primary: '#ca8a04', // Tahitian Pearl Gold
          accent: '#eab308',  // Nacre Iridescence
          sole: '#18181b',
          roughness: 0.18,
          metalness: 0.6,
          clearcoat: 0.95,
        };
      case 'icons-heritage':
      default:
        return {
          primary: '#ffffff', // Triple White Full-Grain
          accent: '#d97706',  // Heritage Amber
          sole: '#ffffff',
          roughness: 0.3,
          metalness: 0.05,
          clearcoat: 0.4,
        };
    }
  }, [universe.id]);

  // Apply Photorealistic PBR Materials and Textures to the 3D Model
  useEffect(() => {
    if (!clonedScene) return;

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const originalMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
          const stdMat = originalMat as THREE.MeshStandardMaterial;

          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(colorwayPalette.primary),
            map: stdMat.map || null,
            normalMap: stdMat.normalMap || null,
            roughnessMap: stdMat.roughnessMap || null,
            metalnessMap: stdMat.metalnessMap || null,
            aoMap: stdMat.aoMap || null,
            roughness: colorwayPalette.roughness,
            metalness: colorwayPalette.metalness,
            clearcoat: colorwayPalette.clearcoat,
            clearcoatRoughness: 0.15,
            emissive: new THREE.Color(colorwayPalette.accent),
            emissiveIntensity: 0.08 + interactionProgress * 0.35,
          });
        }
      }
    });
  }, [clonedScene, colorwayPalette, interactionProgress]);

  useFrame((state, delta) => {
    if (!modelRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Cartier-Style Scroll Choreography
    const roomOffset = scrollProgress - universe.index;
    const scrollAngleY = -roomOffset * Math.PI * 0.4;
    const scrollTiltX = Math.sin(roomOffset * Math.PI * 0.5) * 0.15;
    const scrollRollZ = -roomOffset * 0.08;

    // Combine Scroll Angle + User Manual 360° Drag Turntable + Idle Drift
    const targetRotY = manualRotationY + scrollAngleY + Math.sin(time * 0.6) * 0.04 - Math.PI * 0.35;
    const targetRotX = scrollTiltX + Math.sin(time * 1.0) * 0.02 + 0.05;
    const targetRotZ = scrollRollZ;

    modelRef.current.rotation.y = THREE.MathUtils.damp(
      modelRef.current.rotation.y,
      targetRotY,
      6,
      delta
    );
    modelRef.current.rotation.x = THREE.MathUtils.damp(
      modelRef.current.rotation.x,
      targetRotX,
      6,
      delta
    );
    modelRef.current.rotation.z = THREE.MathUtils.damp(
      modelRef.current.rotation.z,
      targetRotZ,
      6,
      delta
    );

    // Hover / Interaction Scale
    const targetScale = isHovered ? 3.4 : 3.1;
    modelRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 6 * delta);
  });

  return (
    <group ref={modelRef} scale={[3.1, 3.1, 3.1]} position={[0, -0.35, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
};

useGLTF.preload('/nike_shoe.glb');
