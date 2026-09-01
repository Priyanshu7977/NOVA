'use client';

import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { NikeUniverseData } from '@/data/nikeUniverses';
import { audio } from '@/components/audio/NikeAudioEngine';
import {
  Layers,
  Sparkles,
  Zap,
  X,
  RotateCw,
  ShoppingBag,
  Sliders,
  MousePointer,
} from 'lucide-react';
import { useExperience } from '@/context/ExperienceContext';

interface SneakerMacroInspection3DProps {
  universe: NikeUniverseData | null;
  onClose: () => void;
}

// Reusable Layer Renderer with PBR shader and smooth interpolation
const ExplodedMeshLayer: React.FC<{
  scene: THREE.Group;
  offset: [number, number, number];
  rotationOffset?: [number, number, number];
  scaleModifier?: number;
  materialConfig: {
    color: string;
    roughness: number;
    metalness: number;
    clearcoat?: number;
    emissive?: string;
    emissiveIntensity?: number;
    opacity?: number;
  };
  isActive: boolean;
  explosionProgress: number;
}> = ({
  scene,
  offset,
  rotationOffset = [0, 0, 0],
  scaleModifier = 1.0,
  materialConfig,
  isActive,
  explosionProgress,
}) => {
  const meshRef = useRef<THREE.Group>(null);

  const cloned = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(materialConfig.color),
          roughness: materialConfig.roughness,
          metalness: materialConfig.metalness,
          clearcoat: materialConfig.clearcoat || 0.6,
          clearcoatRoughness: 0.1,
          emissive: new THREE.Color(materialConfig.emissive || '#000000'),
          emissiveIntensity: materialConfig.emissiveIntensity || 0,
          transparent: (materialConfig.opacity || 1) < 1,
          opacity: materialConfig.opacity || 1,
        });
      }
    });
    return s;
  }, [scene, materialConfig]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const exp = explosionProgress;

    // Displacement from center based on explosion progress
    const targetX = offset[0] * exp;
    const targetY = offset[1] * exp;
    const targetZ = offset[2] * exp;

    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, targetX, 7, delta);
    meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, targetY, 7, delta);
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, targetZ, 7, delta);

    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, rotationOffset[0] * exp, 7, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, rotationOffset[1] * exp, 7, delta);
    meshRef.current.rotation.z = THREE.MathUtils.damp(meshRef.current.rotation.z, rotationOffset[2] * exp, 7, delta);

    const activeScale = isActive ? scaleModifier * 1.04 : scaleModifier;
    meshRef.current.scale.lerp(new THREE.Vector3(activeScale, activeScale, activeScale), delta * 6);
  });

  return (
    <group ref={meshRef}>
      <primitive object={cloned} />
    </group>
  );
};

// =========================================================================
// UNIQUE 3D PROCEDURAL & EXPLODED ANATOMY FOR EVERY INDIVIDUAL SHOE
// =========================================================================
const ShoeSpecificExplodedScene: React.FC<{
  universe: NikeUniverseData;
  explosionFactor: number;
  focusedLayer: number;
}> = ({ universe, explosionFactor, focusedLayer }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/nike_shoe.glb');

  // Dynamic Camera Center Framing calculation so the shoe NEVER goes off screen
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Auto-center target Y depending on focused layer
    let targetCenterY = -0.1;
    if (focusedLayer === 0) {
      targetCenterY = -0.45 * explosionFactor; // Pull upper down to optical center
    } else if (focusedLayer === 1) {
      targetCenterY = -0.1 * explosionFactor; // Center core
    } else if (focusedLayer === 2) {
      targetCenterY = 0.15 * explosionFactor; // Midsole
    } else if (focusedLayer === 3) {
      targetCenterY = 0.45 * explosionFactor; // Pull outsole up to optical center
    } else {
      targetCenterY = -0.05; // Full view
    }

    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetCenterY + Math.sin(t * 1.5) * 0.04, 6, delta);
    groupRef.current.rotation.y += delta * 0.1;
  });

  // RENDER UNIQUE 3D DECONSTRUCTION LAYOUT PER SHOE MODEL
  switch (universe.id) {
    // -------------------------------------------------------------
    // 01. AIR MAX DN: 4-CHAMBER QUAD-POD RADIAL PNEUMATIC DISPERSAL
    // -------------------------------------------------------------
    case 'air-max-dn':
      return (
        <group ref={groupRef} scale={[2.65, 2.65, 2.65]}>
          {/* Upper Knit Shell */}
          <ExplodedMeshLayer
            scene={scene}
            offset={[0, 0.65, 0.15]}
            rotationOffset={[0.2, 0.1, 0]}
            scaleModifier={1.0}
            materialConfig={{
              color: '#e11d48',
              roughness: 0.18,
              metalness: 0.35,
              emissive: '#e11d48',
              emissiveIntensity: focusedLayer === 0 ? 0.5 : 0.08,
              opacity: focusedLayer === -1 || focusedLayer === 0 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 0}
            explosionProgress={explosionFactor}
          />

          {/* 4 Glowing Pressurized Nitrogen Pods */}
          <group position={[0, 0.1 * explosionFactor, 0]}>
            <ExplodedMeshLayer
              scene={scene}
              offset={[0.25, 0.2, 0.1]}
              rotationOffset={[-0.1, 0.25, 0.1]}
              scaleModifier={0.96}
              materialConfig={{
                color: '#0284c7',
                roughness: 0.05,
                metalness: 0.95,
                emissive: '#38bdf8',
                emissiveIntensity: focusedLayer === 1 ? 0.85 : 0.3,
                opacity: focusedLayer === -1 || focusedLayer === 1 ? 1.0 : 0.3,
              }}
              isActive={focusedLayer === 1}
              explosionProgress={explosionFactor}
            />
          </group>

          {/* Dual-Density Phylon Midsole Carrier */}
          <ExplodedMeshLayer
            scene={scene}
            offset={[-0.15, -0.25, 0]}
            rotationOffset={[0.1, -0.15, -0.05]}
            scaleModifier={0.95}
            materialConfig={{
              color: '#ffffff',
              roughness: 0.3,
              metalness: 0.05,
              emissive: '#ffffff',
              emissiveIntensity: focusedLayer === 2 ? 0.35 : 0.02,
              opacity: focusedLayer === -1 || focusedLayer === 2 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 2}
            explosionProgress={explosionFactor}
          />

          {/* Translucent Waffle Outsole */}
          <ExplodedMeshLayer
            scene={scene}
            offset={[0, -0.65, -0.1]}
            rotationOffset={[-0.2, 0, 0]}
            scaleModifier={0.94}
            materialConfig={{
              color: '#0f172a',
              roughness: 0.4,
              metalness: 0.3,
              emissive: '#0284c7',
              emissiveIntensity: focusedLayer === 3 ? 0.55 : 0.05,
              opacity: focusedLayer === -1 || focusedLayer === 3 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 3}
            explosionProgress={explosionFactor}
          />
        </group>
      );

    // -------------------------------------------------------------
    // 02. PEGASUS 41: DUAL ZOOM AIR & REACTX SPLIT AERO EXPANSION
    // -------------------------------------------------------------
    case 'pegasus-41':
      return (
        <group ref={groupRef} scale={[2.65, 2.65, 2.65]}>
          <ExplodedMeshLayer
            scene={scene}
            offset={[0, 0.6, 0.2]}
            rotationOffset={[0.15, -0.2, 0.1]}
            scaleModifier={1.0}
            materialConfig={{
              color: '#84cc16',
              roughness: 0.2,
              metalness: 0.2,
              emissive: '#84cc16',
              emissiveIntensity: focusedLayer === 0 ? 0.5 : 0.08,
              opacity: focusedLayer === -1 || focusedLayer === 0 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 0}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[0.3, 0.15, -0.1]}
            rotationOffset={[0.2, 0.3, -0.1]}
            scaleModifier={0.97}
            materialConfig={{
              color: '#65a30d',
              roughness: 0.08,
              metalness: 0.85,
              emissive: '#a3e635',
              emissiveIntensity: focusedLayer === 1 ? 0.8 : 0.25,
              opacity: focusedLayer === -1 || focusedLayer === 1 ? 1.0 : 0.3,
            }}
            isActive={focusedLayer === 1}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[-0.2, -0.25, 0.1]}
            rotationOffset={[-0.15, -0.2, 0]}
            scaleModifier={0.95}
            materialConfig={{
              color: '#ffffff',
              roughness: 0.25,
              metalness: 0.08,
              emissive: '#ffffff',
              emissiveIntensity: focusedLayer === 2 ? 0.35 : 0.02,
              opacity: focusedLayer === -1 || focusedLayer === 2 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 2}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[0, -0.65, -0.15]}
            rotationOffset={[-0.25, 0.1, 0]}
            scaleModifier={0.94}
            materialConfig={{
              color: '#1e293b',
              roughness: 0.5,
              metalness: 0.2,
              emissive: '#84cc16',
              emissiveIntensity: focusedLayer === 3 ? 0.5 : 0.05,
              opacity: focusedLayer === -1 || focusedLayer === 3 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 3}
            explosionProgress={explosionFactor}
          />
        </group>
      );

    // -------------------------------------------------------------
    // 03. ALPHAFLY 3: CARBON FLYPLATE SLINGSHOT & MARATHON DUAL PODS
    // -------------------------------------------------------------
    case 'alphafly-3':
      return (
        <group ref={groupRef} scale={[2.65, 2.65, 2.65]}>
          <ExplodedMeshLayer
            scene={scene}
            offset={[0, 0.7, 0.25]}
            rotationOffset={[0.25, 0.15, 0]}
            scaleModifier={1.02}
            materialConfig={{
              color: '#f43f5e',
              roughness: 0.15,
              metalness: 0.4,
              emissive: '#f43f5e',
              emissiveIntensity: focusedLayer === 0 ? 0.6 : 0.1,
              opacity: focusedLayer === -1 || focusedLayer === 0 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 0}
            explosionProgress={explosionFactor}
          />
          {/* Carbon Plate Cantilever Shift */}
          <ExplodedMeshLayer
            scene={scene}
            offset={[0.35, 0.2, -0.15]}
            rotationOffset={[-0.3, 0.35, 0.2]}
            scaleModifier={0.96}
            materialConfig={{
              color: '#09090b',
              roughness: 0.05,
              metalness: 0.98,
              emissive: '#e11d48',
              emissiveIntensity: focusedLayer === 1 ? 0.9 : 0.3,
              opacity: focusedLayer === -1 || focusedLayer === 1 ? 1.0 : 0.3,
            }}
            isActive={focusedLayer === 1}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[-0.25, -0.25, 0.1]}
            rotationOffset={[0.1, -0.25, -0.1]}
            scaleModifier={0.95}
            materialConfig={{
              color: '#ffffff',
              roughness: 0.2,
              metalness: 0.1,
              emissive: '#ffffff',
              emissiveIntensity: focusedLayer === 2 ? 0.35 : 0.02,
              opacity: focusedLayer === -1 || focusedLayer === 2 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 2}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[0, -0.65, -0.2]}
            rotationOffset={[-0.3, 0, 0]}
            scaleModifier={0.93}
            materialConfig={{
              color: '#111827',
              roughness: 0.4,
              metalness: 0.3,
              emissive: '#f43f5e',
              emissiveIntensity: focusedLayer === 3 ? 0.6 : 0.05,
              opacity: focusedLayer === -1 || focusedLayer === 3 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 3}
            explosionProgress={explosionFactor}
          />
        </group>
      );

    // -------------------------------------------------------------
    // 04. MERCURIAL SUPERFLY 10: TRI-STAR STUD MATRIX & SPEED CHASSIS
    // -------------------------------------------------------------
    case 'mercurial-superfly':
      return (
        <group ref={groupRef} scale={[2.65, 2.65, 2.65]}>
          <ExplodedMeshLayer
            scene={scene}
            offset={[0, 0.72, 0.2]}
            rotationOffset={[0.3, -0.15, 0.1]}
            scaleModifier={1.0}
            materialConfig={{
              color: '#0284c7',
              roughness: 0.16,
              metalness: 0.5,
              emissive: '#38bdf8',
              emissiveIntensity: focusedLayer === 0 ? 0.55 : 0.1,
              opacity: focusedLayer === -1 || focusedLayer === 0 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 0}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[0.2, 0.25, -0.1]}
            rotationOffset={[-0.2, 0.2, 0.15]}
            scaleModifier={0.97}
            materialConfig={{
              color: '#ea580c',
              roughness: 0.08,
              metalness: 0.9,
              emissive: '#ea580c',
              emissiveIntensity: focusedLayer === 1 ? 0.85 : 0.25,
              opacity: focusedLayer === -1 || focusedLayer === 1 ? 1.0 : 0.3,
            }}
            isActive={focusedLayer === 1}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[-0.15, -0.22, 0]}
            rotationOffset={[0.1, -0.2, 0]}
            scaleModifier={0.95}
            materialConfig={{
              color: '#ffffff',
              roughness: 0.25,
              metalness: 0.1,
              emissive: '#ffffff',
              emissiveIntensity: focusedLayer === 2 ? 0.35 : 0.02,
              opacity: focusedLayer === -1 || focusedLayer === 2 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 2}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[0, -0.68, -0.25]}
            rotationOffset={[-0.35, 0.1, 0]}
            scaleModifier={0.92}
            materialConfig={{
              color: '#0369a1',
              roughness: 0.3,
              metalness: 0.6,
              emissive: '#38bdf8',
              emissiveIntensity: focusedLayer === 3 ? 0.65 : 0.05,
              opacity: focusedLayer === -1 || focusedLayer === 3 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 3}
            explosionProgress={explosionFactor}
          />
        </group>
      );

    // -------------------------------------------------------------
    // 05. LEBRON XXI: 360° ZONAL FLYWIRE CAGE & PEARLIZED ARMOR
    // -------------------------------------------------------------
    case 'court-alchemy':
      return (
        <group ref={groupRef} scale={[2.65, 2.65, 2.65]}>
          <ExplodedMeshLayer
            scene={scene}
            offset={[0.2, 0.65, 0.2]}
            rotationOffset={[0.25, 0.3, 0]}
            scaleModifier={1.02}
            materialConfig={{
              color: '#ca8a04',
              roughness: 0.12,
              metalness: 0.75,
              emissive: '#eab308',
              emissiveIntensity: focusedLayer === 0 ? 0.6 : 0.1,
              opacity: focusedLayer === -1 || focusedLayer === 0 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 0}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[-0.2, 0.25, -0.1]}
            rotationOffset={[-0.15, -0.3, 0.1]}
            scaleModifier={0.98}
            materialConfig={{
              color: '#eab308',
              roughness: 0.05,
              metalness: 0.95,
              emissive: '#ca8a04',
              emissiveIntensity: focusedLayer === 1 ? 0.9 : 0.3,
              opacity: focusedLayer === -1 || focusedLayer === 1 ? 1.0 : 0.3,
            }}
            isActive={focusedLayer === 1}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[0.15, -0.25, 0.1]}
            rotationOffset={[0.1, 0.15, -0.05]}
            scaleModifier={0.95}
            materialConfig={{
              color: '#ffffff',
              roughness: 0.25,
              metalness: 0.08,
              emissive: '#ffffff',
              emissiveIntensity: focusedLayer === 2 ? 0.35 : 0.02,
              opacity: focusedLayer === -1 || focusedLayer === 2 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 2}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[0, -0.65, -0.15]}
            rotationOffset={[-0.25, 0, 0]}
            scaleModifier={0.93}
            materialConfig={{
              color: '#713f12',
              roughness: 0.45,
              metalness: 0.4,
              emissive: '#eab308',
              emissiveIntensity: focusedLayer === 3 ? 0.55 : 0.05,
              opacity: focusedLayer === -1 || focusedLayer === 3 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 3}
            explosionProgress={explosionFactor}
          />
        </group>
      );

    // -------------------------------------------------------------
    // 06. THE ICONS: 1987 VINTAGE VISIBLE AIR METAMORPHOSIS
    // -------------------------------------------------------------
    case 'icons-heritage':
    default:
      return (
        <group ref={groupRef} scale={[2.65, 2.65, 2.65]}>
          <ExplodedMeshLayer
            scene={scene}
            offset={[0, 0.6, 0.15]}
            rotationOffset={[0.15, 0.1, 0]}
            scaleModifier={1.0}
            materialConfig={{
              color: '#ffffff',
              roughness: 0.22,
              metalness: 0.1,
              emissive: '#d97706',
              emissiveIntensity: focusedLayer === 0 ? 0.45 : 0.06,
              opacity: focusedLayer === -1 || focusedLayer === 0 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 0}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[0.25, 0.2, 0]}
            rotationOffset={[-0.1, 0.2, 0.1]}
            scaleModifier={0.97}
            materialConfig={{
              color: '#d97706',
              roughness: 0.08,
              metalness: 0.85,
              emissive: '#d97706',
              emissiveIntensity: focusedLayer === 1 ? 0.8 : 0.25,
              opacity: focusedLayer === -1 || focusedLayer === 1 ? 1.0 : 0.3,
            }}
            isActive={focusedLayer === 1}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[-0.15, -0.22, 0]}
            rotationOffset={[0.1, -0.15, 0]}
            scaleModifier={0.95}
            materialConfig={{
              color: '#f8fafc',
              roughness: 0.35,
              metalness: 0.05,
              emissive: '#ffffff',
              emissiveIntensity: focusedLayer === 2 ? 0.35 : 0.02,
              opacity: focusedLayer === -1 || focusedLayer === 2 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 2}
            explosionProgress={explosionFactor}
          />
          <ExplodedMeshLayer
            scene={scene}
            offset={[0, -0.62, -0.1]}
            rotationOffset={[-0.2, 0, 0]}
            scaleModifier={0.94}
            materialConfig={{
              color: '#0f172a',
              roughness: 0.5,
              metalness: 0.2,
              emissive: '#d97706',
              emissiveIntensity: focusedLayer === 3 ? 0.5 : 0.05,
              opacity: focusedLayer === -1 || focusedLayer === 3 ? 1.0 : 0.25,
            }}
            isActive={focusedLayer === 3}
            explosionProgress={explosionFactor}
          />
        </group>
      );
  }
};

export const SneakerMacroInspection3D: React.FC<SneakerMacroInspection3DProps> = ({
  universe,
  onClose,
}) => {
  const { addToCart, setIsCartOpen, setIsCheckoutOpen } = useExperience();

  const [explosionFactor, setExplosionFactor] = useState<number>(0.65); // 0 (assembled) to 1 (fully exploded)
  const [focusedLayer, setFocusedLayer] = useState<number>(-1); // -1 = all
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const touchStartY = useRef(0);

  // SCROLL-DRIVEN 3D DECONSTRUCTION & REASSEMBLY (CARTIER STYLE)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.0016;
      setExplosionFactor((prev) => {
        const next = Math.max(0, Math.min(1.0, prev + delta));

        // Auto update focusedLayer based on scroll position
        if (next < 0.18) {
          setFocusedLayer(-1);
        } else if (next < 0.45) {
          setFocusedLayer(0);
        } else if (next < 0.70) {
          setFocusedLayer(1);
        } else if (next < 0.88) {
          setFocusedLayer(2);
        } else {
          setFocusedLayer(3);
        }
        return next;
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = (touchStartY.current - e.touches[0].clientY) * 0.004;
    touchStartY.current = e.touches[0].clientY;
    setExplosionFactor((prev) => Math.max(0, Math.min(1.0, prev + deltaY)));
  };

  if (!universe) return null;

  const handleClose = () => {
    audio.playTensionCable();
    // Magnetically snap shoe back together before closing
    setExplosionFactor(0);
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 450);
  };

  const layersInfo = [
    {
      id: 0,
      name: '01. UPPER HAPTIC KNIT SHELL',
      desc: 'Siliconized 3D micro-ribs woven directly into high-tensile filament for lightweight anatomical lockdown.',
      material: universe.explodedLayers[0]?.material || 'Flyknit & Haptic TPU',
    },
    {
      id: 1,
      name: '02. NITROGEN AIR & CARBON CORE',
      desc: 'Dual-chamber pressurized nitrogen air capsules anchored to full-length rigid carbon fiber Flyplate.',
      material: universe.explodedLayers[1]?.material || 'Pressurized TPU & Carbon Fiber',
    },
    {
      id: 2,
      name: '03. REACTX / PEBAX MIDSOLE',
      desc: 'Sculpted low-density polymer foam delivering 86%+ kinetic energy return with low carbon footprint.',
      material: universe.explodedLayers[2]?.material || 'Injection-Molded PEBA Foam',
    },
    {
      id: 3,
      name: '04. TRACTION OUTSOLE BASE',
      desc: 'Computational generative tread pattern mapped to human pressure heatmaps for instant multi-directional grip.',
      material: universe.explodedLayers[3]?.material || 'High-Abrasion Carbon Rubber',
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#07090e]/95 backdrop-blur-2xl text-white flex flex-col justify-between transition-all duration-500 select-none ${
        isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* 1. Fullscreen 3D Three.js Studio Canvas */}
      <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0.4, 4.4], fov: 44, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#07090e']} />
          <fog attach="fog" args={['#07090e', 6, 25]} />

          {/* Dynamic Cartier-Style Studio Lighting */}
          <ambientLight intensity={0.9} />
          <directionalLight position={[6, 9, 6]} intensity={3.5} color="#ffffff" />
          <directionalLight position={[-6, 4, -4]} intensity={2.8} color="#0284c7" />
          <pointLight position={[0, -2, 2.5]} intensity={4.5} color={universe.accentColor} distance={10} />
          <spotLight position={[0, 8, 2]} intensity={5.0} color="#ffffff" angle={0.7} penumbra={0.8} />

          {/* 3D Exploded Sneaker Layers with Custom Framing and Unique Anatomy */}
          <Suspense fallback={null}>
            <ShoeSpecificExplodedScene
              universe={universe}
              explosionFactor={explosionFactor}
              focusedLayer={focusedLayer}
            />
          </Suspense>

          {/* 360 Orbit Controls with Wheel mapped to Layer Explosion */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            rotateSpeed={0.8}
            dampingFactor={0.08}
          />
        </Canvas>
      </div>

      {/* 2. Top Luxury Navigation Header */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-5 pointer-events-auto border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-white/20"
            style={{ backgroundColor: `${universe.accentColor}25` }}
          >
            <Layers className="w-5 h-5 text-[#38bdf8]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                {universe.productName}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[9px] font-mono font-bold text-[#38bdf8] uppercase tracking-widest border border-white/15">
                SCROLLABLE 3D DECONSTRUCTION
              </span>
            </div>
            <span className="text-[11px] font-sans text-gray-400 font-medium">
              {universe.highlightTitle} • ₹{universe.priceINR.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleClose}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold uppercase transition-all hover:scale-105 active:scale-95 text-white"
          >
            <X className="w-4 h-4" />
            <span>SNAP ASSEMBLE & EXIT</span>
          </button>
        </div>
      </header>

      {/* 3. Interactive Layer Focus Switcher & Scroll Prompts */}
      <div className="relative z-20 flex-1 flex flex-col justify-between p-6 sm:px-12 pointer-events-none">
        {/* Left Layer Selectors */}
        <div className="flex flex-col space-y-2 max-w-sm pointer-events-auto mt-2">
          <span className="font-mono text-[10px] font-bold text-[#38bdf8] uppercase tracking-widest">
            SELECT ANATOMICAL LAYER TO INSPECT:
          </span>

          <button
            onClick={() => {
              setFocusedLayer(-1);
              audio.playClick();
            }}
            className={`px-4 py-2 rounded-2xl border text-left text-xs font-mono font-bold uppercase transition-all flex items-center justify-between ${
              focusedLayer === -1
                ? 'bg-white text-black shadow-lg scale-102 border-white'
                : 'bg-black/60 text-gray-300 border-white/15 hover:bg-white/10'
            }`}
          >
            <span>SHOW ALL 4 LAYERS</span>
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
          </button>

          {layersInfo.map((layer) => (
            <button
              key={layer.id}
              onClick={() => {
                setFocusedLayer(layer.id);
                const targetExp = 0.35 + layer.id * 0.2;
                setExplosionFactor(targetExp);
                audio.playChime(600 + layer.id * 100, 'sine', 0.15);
              }}
              className={`p-2.5 rounded-2xl border text-left transition-all ${
                focusedLayer === layer.id
                  ? 'bg-white/95 text-black shadow-xl ring-2 ring-[#38bdf8] border-white scale-102'
                  : 'bg-black/60 text-gray-300 border-white/15 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-mono text-[10px] font-bold uppercase">
                  {layer.name}
                </span>
                <span className="text-[9px] font-mono text-gray-500">
                  0{layer.id + 1}
                </span>
              </div>
              <p className="font-sans text-[11px] leading-snug text-gray-600 font-medium line-clamp-2">
                {layer.desc}
              </p>
              <span className="font-mono text-[9px] text-[#0284c7] block mt-0.5 font-bold">
                MATERIAL: {layer.material}
              </span>
            </button>
          ))}
        </div>

        {/* Center Prompt & Cartier-Style Scroll Prompt */}
        <div className="self-center flex flex-col items-center space-y-1.5 pointer-events-auto">
          <div className="flex items-center space-x-3 px-6 py-2 rounded-full bg-black/70 backdrop-blur-xl border border-white/20 text-xs font-mono text-white font-bold uppercase tracking-wider shadow-2xl">
            <MousePointer className="w-4 h-4 text-[#38bdf8] animate-bounce" />
            <span>SCROLL MOUSE WHEEL TO DECONSTRUCT & ASSEMBLE</span>
            <span className="px-2 py-0.5 rounded-full bg-[#0284c7] text-white text-[10px]">
              {Math.round(explosionFactor * 100)}%
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-400">
            <RotateCw className="w-3 h-3 text-[#38bdf8] animate-spin" />
            <span>DRAG 3D MODEL TO ROTATE 360°</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Cartier-Style Layer Separation Slider & Instant Purchase Bar */}
      <footer className="relative z-20 p-5 sm:px-12 border-t border-white/10 bg-black/50 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
        {/* Real-time Layer Exploded Distance Slider */}
        <div className="flex items-center space-x-4 w-full max-w-md">
          <Sliders className="w-5 h-5 text-[#38bdf8] flex-shrink-0" />
          <div className="w-full space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest">
              <span>EXPLODED SEPARATION DISTANCE</span>
              <span className="text-[#38bdf8]">{Math.round(explosionFactor * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explosionFactor}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setExplosionFactor(val);
                if (val < 0.18) setFocusedLayer(-1);
                else if (val < 0.45) setFocusedLayer(0);
                else if (val < 0.70) setFocusedLayer(1);
                else if (val < 0.88) setFocusedLayer(2);
                else setFocusedLayer(3);
              }}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
            />
          </div>
        </div>

        {/* Purchase Action Buttons */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={() => {
              audio.playSonicBlast();
              addToCart(universe as any, universe.colorways[0], 'UK 9');
              onClose();
              setIsCartOpen(true);
            }}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white hover:bg-gray-100 text-black font-sans font-black text-xs tracking-widest uppercase transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ADD TO BAG</span>
          </button>

          <button
            onClick={() => {
              audio.playSonicBlast();
              addToCart(universe as any, universe.colorways[0], 'UK 9');
              onClose();
              setIsCheckoutOpen(true);
            }}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-sans font-black text-xs tracking-widest uppercase transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>BUY NOW • CHECKOUT</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
