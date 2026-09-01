'use client';

import React, { useRef, useState, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { NikeUniverseData, NikeProductColorway } from '@/data/nikeUniverses';
import { RealNikeSneaker3D } from './RealNikeSneaker3D';
import { audio } from '@/components/audio/NikeAudioEngine';
import { Sparkles, Zap, Activity, Layers, X } from 'lucide-react';

interface NikeSneakerRendererProps {
  universe: NikeUniverseData;
  activeColorway?: NikeProductColorway;
  interactionProgress: number; // 0 to 1
  manualRotationY?: number;
  scrollProgress?: number;
  isHovered?: boolean;
}

// 3D Floating Interactive Telemetry Hotspot Pin & Expandable Card
const TechHotspotPin: React.FC<{
  position: [number, number, number];
  title: string;
  description: string;
  material: string;
  color: string;
  isActive: boolean;
  onToggle: () => void;
}> = ({ position, title, description, material, color, isActive, onToggle }) => {
  const [hovered, setHovered] = useState(false);
  const pinRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!pinRef.current) return;
    const t = state.clock.getElapsedTime();
    pinRef.current.position.y = position[1] + Math.sin(t * 3.5 + position[0] * 2) * 0.035;
  });

  return (
    <group
      ref={pinRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        audio.playChime(isActive ? 520 : 880, 'sine', 0.15);
        onToggle();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        audio.playChime(780, 'sine', 0.05);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer Pulsing Ring */}
      <mesh>
        <ringGeometry args={[0.065, 0.095, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isActive ? 1.0 : hovered ? 0.9 : 0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Glowing Center Dot */}
      <mesh>
        <circleGeometry args={[0.04, 32]} />
        <meshBasicMaterial color={isActive ? '#ffffff' : color} side={THREE.DoubleSide} />
      </mesh>

      {/* Interactive Floating HTML Luxury Card when active */}
      {isActive && (
        <Html position={[0.15, 0.1, 0]} center={false} distanceFactor={8} zIndexRange={[100, 0]}>
          <div className="w-56 p-3 rounded-2xl bg-[#0f172a]/95 text-white border border-white/20 shadow-2xl backdrop-blur-xl animate-fade-in select-none pointer-events-auto">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: color }} />
                <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-[#38bdf8]">
                  HOTSPOT TELEMETRY
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="font-display text-xs font-black uppercase block tracking-tight text-white mb-0.5">
              {title}
            </span>
            <p className="font-sans text-[10px] text-gray-300 leading-snug font-medium mb-1.5">
              {description}
            </p>
            <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[8px] font-mono text-[#38bdf8] font-bold">
              <span>TECH: {material}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

export const NikeSneakerRenderer: React.FC<NikeSneakerRendererProps> = ({
  universe,
  interactionProgress,
  manualRotationY = 0,
  scrollProgress = 0,
  isHovered = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const shoeMeshRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);

  // Active Selected Hotspot Index (-1 = none, 0, 1, 2)
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number>(-1);

  // Physics-based 3D Acrobatic Corkscrew Flip
  const [isFlipping, setIsFlipping] = useState(false);
  const flipProgressRef = useRef(0);
  const [shockwaveScale, setShockwaveScale] = useState(0);
  const [shockwaveOpacity, setShockwaveOpacity] = useState(0);

  // Realistic Soft Contact Drop Shadow
  const shadowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 110);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.45)');
      grad.addColorStop(0.4, 'rgba(15, 23, 42, 0.25)');
      grad.addColorStop(0.8, 'rgba(15, 23, 42, 0.06)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  // TRIGGER REALISTIC 3D ACROBATIC KICK-FLIP ON 3D SHOE CLICK
  const triggerRealisticFlip = (e?: any) => {
    if (e && e.stopPropagation) e.stopPropagation();
    audio.playSonicBlast();
    setIsFlipping(true);
    flipProgressRef.current = 0;
    setShockwaveScale(0.2);
    setShockwaveOpacity(0.9);
    setActiveHotspotIndex(-1); // Close any active hotspot during flip
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Natural Breathing & Floating Levitation
    const hoverScale = isHovered ? 1.05 : 1.0;
    const idleLevitation = Math.sin(time * 2.2) * 0.06;

    // 2. REALISTIC 3D ACROBATIC JUMP & CORKSCREW FLIP
    let jumpY = 0;
    let flipRotX = 0;
    let flipRotY = 0;
    let flipRotZ = 0;

    if (isFlipping) {
      flipProgressRef.current += delta * 1.65;
      const p = flipProgressRef.current;

      if (p >= 1.0) {
        setIsFlipping(false);
        flipProgressRef.current = 0;
      } else {
        // Parabolic Jump Arc
        jumpY = Math.sin(p * Math.PI) * 1.6;

        // Smooth 360° Acrobatic Tumbling Corkscrew Flip
        flipRotX = Math.sin(p * Math.PI) * Math.PI * 2;
        flipRotY = Math.sin(p * Math.PI * 2) * 0.8;
        flipRotZ = Math.sin(p * Math.PI * 2) * 0.45;

        // Expand floor shockwave
        setShockwaveScale((prev) => prev + delta * 6.5);
        setShockwaveOpacity((prev) => Math.max(0, prev - delta * 1.8));
      }
    }

    // Apply Vertical Float & Jump
    groupRef.current.position.y = idleLevitation + jumpY;

    // Apply Flip Rotations to Shoe Group
    if (shoeMeshRef.current) {
      shoeMeshRef.current.rotation.x = flipRotX;
      shoeMeshRef.current.rotation.y = flipRotY;
      shoeMeshRef.current.rotation.z = flipRotZ;
    }

    // Dynamic Contact Shadow on Floor
    if (shadowRef.current) {
      const shadowScale = (1 + jumpY * 0.45) * hoverScale;
      const shadowAlpha = Math.max(0.08, 0.45 - jumpY * 0.22);
      shadowRef.current.scale.set(shadowScale * 2.8, shadowScale * 1.5, 1);
      (shadowRef.current.material as THREE.MeshBasicMaterial).opacity = shadowAlpha;
    }

    if (shockwaveRef.current) {
      shockwaveRef.current.scale.set(shockwaveScale, shockwaveScale, 1);
    }
  });

  // Hotspots definitions for the shoe
  const hotspots = useMemo(() => {
    return [
      {
        id: 0,
        position: [0.72, 0.48, 0.22] as [number, number, number],
        title: universe.highlightTitle,
        description: universe.highlightDescription,
        material: universe.explodedLayers[0]?.material || 'Dynamic TPU Unit',
      },
      {
        id: 1,
        position: [-0.05, 0.08, 0.2] as [number, number, number],
        title: universe.knowHowTitle,
        description: universe.knowHowDescription,
        material: universe.explodedLayers[1]?.material || 'Propulsion Plate',
      },
      {
        id: 2,
        position: [0.22, 0.82, -0.15] as [number, number, number],
        title: 'ADAPTIVE HAPTIC CHASSIS',
        description: 'Micro-ribbed dimensional weave engineered for instant anatomical lockdown.',
        material: 'VaporWeave & Flyknit Mesh',
      },
    ];
  }, [universe]);

  return (
    <group ref={groupRef} scale={[1.45, 1.45, 1.45]} position={[0, 0, 0]}>
      {/* 1. REALISTIC SOFT CONTACT DROP SHADOW */}
      <mesh
        ref={shadowRef}
        position={[0, -0.98, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={shadowTexture}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* 2. EXPANDING SONIC SHOCKWAVE ON FLOOR */}
      {shockwaveOpacity > 0.01 && (
        <group position={[0, -0.96, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh ref={shockwaveRef}>
            <ringGeometry args={[0.8, 1.05, 48]} />
            <meshBasicMaterial
              color={universe.accentColor}
              transparent
              opacity={shockwaveOpacity}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}

      {/* 3. HERO AUTHENTIC REAL 3D PHYSICAL NOVA SNEAKER MODEL */}
      <group
        ref={shoeMeshRef}
        onClick={triggerRealisticFlip}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'grab';
        }}
      >
        <Suspense fallback={null}>
          <RealNikeSneaker3D
            universe={universe}
            interactionProgress={interactionProgress}
            manualRotationY={manualRotationY}
            scrollProgress={scrollProgress}
            isHovered={isHovered}
            activeHotspot={activeHotspotIndex}
          />
        </Suspense>

        {/* 4. INTERACTIVE 3D HOTSPOT TELEMETRY PINS (Cartier-Style Hotspots) */}
        {hotspots.map((hs) => (
          <TechHotspotPin
            key={hs.id}
            position={hs.position}
            title={hs.title}
            description={hs.description}
            material={hs.material}
            color={universe.accentColor}
            isActive={activeHotspotIndex === hs.id}
            onToggle={() => {
              setActiveHotspotIndex((prev) => (prev === hs.id ? -1 : hs.id));
            }}
          />
        ))}
      </group>
    </group>
  );
};
