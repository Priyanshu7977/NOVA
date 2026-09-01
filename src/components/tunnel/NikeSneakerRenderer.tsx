'use client';

import React, { useRef, useState, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NikeUniverseData, NikeProductColorway } from '@/data/nikeUniverses';
import { RealNikeSneaker3D } from './RealNikeSneaker3D';
import { audio } from '@/components/audio/NikeAudioEngine';

interface NikeSneakerRendererProps {
  universe: NikeUniverseData;
  activeColorway?: NikeProductColorway;
  interactionProgress: number; // 0 to 1
  manualRotationY?: number;
  scrollProgress?: number;
  isHovered?: boolean;
  onClick?: () => void;
}

// 3D Floating Interactive Telemetry Badge Pin
const TechHotspotPin: React.FC<{
  position: [number, number, number];
  label: string;
  sublabel: string;
  color: string;
  onClick: () => void;
}> = ({ position, label, sublabel, color, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const pinRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!pinRef.current) return;
    const t = state.clock.getElapsedTime();
    pinRef.current.position.y = position[1] + Math.sin(t * 3 + position[0]) * 0.04;
  });

  return (
    <group
      ref={pinRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        audio.playChime(720, 'sine', 0.15);
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        audio.playChime(880, 'sine', 0.08);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer Pulsing Ring */}
      <mesh>
        <ringGeometry args={[0.07, 0.1, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.95 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Glowing Dot */}
      <mesh>
        <circleGeometry args={[0.045, 32]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const NikeSneakerRenderer: React.FC<NikeSneakerRendererProps> = ({
  universe,
  activeColorway,
  interactionProgress,
  manualRotationY = 0,
  scrollProgress = 0,
  isHovered = false,
  onClick,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const shoeMeshRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);

  // Physics-based 3D Acrobatic Corkscrew Flip
  const [isFlipping, setIsFlipping] = useState(false);
  const flipProgressRef = useRef(0);
  const [shockwaveScale, setShockwaveScale] = useState(0);
  const [shockwaveOpacity, setShockwaveOpacity] = useState(0);

  // Realistic Soft Contact Ambient Occlusion Drop Shadow
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

  // TRIGGER REALISTIC 3D KICK-FLIP ON CLICK
  const triggerRealisticFlip = () => {
    audio.playSonicBlast();
    setIsFlipping(true);
    flipProgressRef.current = 0;
    setShockwaveScale(0.2);
    setShockwaveOpacity(0.9);

    if (onClick) onClick();
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
          />
        </Suspense>

        {/* 4. INTERACTIVE 3D HOTSPOT TELEMETRY PIN */}
        <TechHotspotPin
          position={[0.75, 0.68, 0.18]}
          label={universe.highlightTitle}
          sublabel="CLICK TO LAUNCH FLIP"
          color={universe.accentColor}
          onClick={triggerRealisticFlip}
        />
      </group>
    </group>
  );
};
