'use client';

import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { NikeUniverseData } from '@/data/nikeUniverses';

const MiniShoeMesh: React.FC<{ universe: NikeUniverseData }> = ({ universe }) => {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/nike_shoe.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Exact 3D PBR Colorway matching RealNikeSneaker3D
  const colorwayPalette = useMemo(() => {
    switch (universe.id) {
      case 'air-max-dn':
        return {
          primary: '#e11d48', // Crimson Red Dynamic Air
          accent: '#0284c7',
          roughness: 0.25,
          metalness: 0.15,
          clearcoat: 0.65,
        };
      case 'pegasus-41':
        return {
          primary: '#84cc16', // Electric Volt
          accent: '#65a30d',
          roughness: 0.35,
          metalness: 0.1,
          clearcoat: 0.3,
        };
      case 'alphafly-3':
        return {
          primary: '#f43f5e', // Proto Racing Crimson
          accent: '#e11d48',
          roughness: 0.18,
          metalness: 0.3,
          clearcoat: 0.85,
        };
      case 'mercurial-superfly':
        return {
          primary: '#0284c7', // Blueprint Racer Blue
          accent: '#ea580c',
          roughness: 0.28,
          metalness: 0.45,
          clearcoat: 0.75,
        };
      case 'court-alchemy':
        return {
          primary: '#ca8a04', // Tahitian Pearl Gold
          accent: '#eab308',
          roughness: 0.15,
          metalness: 0.65,
          clearcoat: 0.95,
        };
      case 'icons-heritage':
      default:
        return {
          primary: '#ffffff', // Triple White Full-Grain
          accent: '#d97706',
          roughness: 0.22,
          metalness: 0.05,
          clearcoat: 0.4,
        };
    }
  }, [universe.id]);

  useEffect(() => {
    if (!clonedScene) return;

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
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
            emissiveIntensity: 0.1,
          });
        }
      }
    });
  }, [clonedScene, colorwayPalette]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.85 - Math.PI * 0.35;
    meshRef.current.position.y = -0.55 + Math.sin(time * 2.2) * 0.03;
  });

  return (
    <group ref={meshRef} scale={[6.2, 6.2, 6.2]} position={[0, -0.55, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
};

export const MiniSneakerCanvas: React.FC<{ universe: NikeUniverseData; heightClass?: string }> = ({
  universe,
  heightClass = 'h-36',
}) => {
  return (
    <div className={`w-full ${heightClass} relative pointer-events-none flex items-center justify-center`}>
      <Canvas
        camera={{ position: [0, 0.05, 2.2], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[4, 5, 4]} intensity={2.6} />
        <directionalLight position={[-4, 2, -3]} intensity={1.4} />
        <pointLight position={[0, 2, 2]} intensity={1.2} color="#ffffff" />
        <Suspense fallback={null}>
          <MiniShoeMesh universe={universe} />
        </Suspense>
      </Canvas>
    </div>
  );
};
