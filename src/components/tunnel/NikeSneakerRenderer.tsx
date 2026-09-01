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
  onInspect?: () => void;
}

export const NikeSneakerRenderer: React.FC<NikeSneakerRendererProps> = ({
  universe,
  interactionProgress,
  manualRotationY = 0,
  scrollProgress = 0,
  isHovered = false,
  onInspect,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const shoeMeshRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);
  const shockwaveRef2 = useRef<THREE.Mesh>(null);

  // Individual Shoe Click Animation State
  const [isAnimating, setIsAnimating] = useState(false);
  const animProgressRef = useRef(0);
  const [shockwaveScale, setShockwaveScale] = useState(0);
  const [shockwaveOpacity, setShockwaveOpacity] = useState(0);

  // Realistic Soft Contact Drop Shadow Texture
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

  // TRIGGER UNIQUE CRAZY 3D ANIMATION FOR EACH INDIVIDUAL SHOE
  const triggerShoeSpecificAnimation = (e?: any) => {
    if (e && e.stopPropagation) e.stopPropagation();

    // Trigger individual shoe signature sound effect
    switch (universe.id) {
      case 'air-max-dn':
        audio.playAirPump(1.0);
        audio.playSonicBlast();
        break;
      case 'pegasus-41':
        audio.playSonicBlast();
        break;
      case 'alphafly-3':
        audio.playSpeedSprint();
        audio.playSonicBlast();
        break;
      case 'mercurial-superfly':
        audio.playKickImpact();
        audio.playSpeedSprint();
        break;
      case 'court-alchemy':
        audio.playTensionCable();
        audio.playSonicBlast();
        break;
      case 'icons-heritage':
      default:
        audio.playChime(520, 'sine', 0.4);
        audio.playSonicBlast();
        break;
    }

    setIsAnimating(true);
    animProgressRef.current = 0;
    setShockwaveScale(0.2);
    setShockwaveOpacity(1.0);

    setTimeout(() => {
      onInspect?.();
    }, 400);
  };

  useFrame((state, delta) => {
    if (!groupRef.current || !shoeMeshRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Natural Ambient Floating Levitation
    const hoverScale = isHovered ? 1.06 : 1.0;
    const idleLevitation = Math.sin(time * 2.2) * 0.06;

    // 2. INDIVIDUAL SHOE CUSTOM 3D ANIMATIONS (DIFFERENT FOR EACH SHOE!)
    let jumpY = 0;
    let jumpZ = 0;
    let jumpX = 0;
    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;
    let scaleModifierX = 1.0;
    let scaleModifierY = 1.0;
    let scaleModifierZ = 1.0;

    if (isAnimating) {
      // Speed multiplier for snappy high-energy animation
      const animSpeed = universe.id === 'icons-heritage' ? 1.2 : 1.55;
      animProgressRef.current += delta * animSpeed;
      const p = Math.min(1.0, animProgressRef.current);

      if (p >= 1.0) {
        setIsAnimating(false);
        animProgressRef.current = 0;
      } else {
        switch (universe.id) {
          // ==========================================
          // 01. AIR MAX DN: PNEUMATIC COMPRESSION & ROCKET BACKFLIP
          // ==========================================
          case 'air-max-dn': {
            if (p < 0.2) {
              // Compress downward like pressurized pneumatic spring
              const subP = p / 0.2;
              jumpY = -0.35 * Math.sin(subP * Math.PI);
              scaleModifierY = 0.82;
              scaleModifierX = 1.12;
              scaleModifierZ = 1.12;
            } else {
              // Massive rocket backflip launch into the air
              const subP = (p - 0.2) / 0.8;
              jumpY = Math.sin(subP * Math.PI) * 2.2;
              rotX = Math.sin(subP * Math.PI) * Math.PI * 2; // Full 360 loop
              rotY = Math.sin(subP * Math.PI * 2) * 0.6;
              rotZ = Math.sin(subP * Math.PI * 2) * 0.35;
            }
            break;
          }

          // ==========================================
          // 02. PEGASUS 41: DOUBLE 720° CORKSCREW BARREL ROLL
          // ==========================================
          case 'pegasus-41': {
            jumpY = Math.sin(p * Math.PI) * 1.6;
            rotY = p * Math.PI * 4; // High-speed 720° horizontal spin
            rotZ = Math.sin(p * Math.PI) * Math.PI * 1.2; // Barrel roll corkscrew tilt
            rotX = Math.sin(p * Math.PI * 2) * 0.4;
            break;
          }

          // ==========================================
          // 03. ALPHAFLY 3: CARBON SLINGSHOT & FORWARD SUPERSONIC SPRINT
          // ==========================================
          case 'alphafly-3': {
            if (p < 0.25) {
              // Slingshot pull back
              const subP = p / 0.25;
              jumpZ = subP * 0.8;
              jumpY = subP * 0.3;
              rotX = -subP * 0.5;
            } else {
              // Supersonic forward slingshot burst
              const subP = (p - 0.25) / 0.75;
              jumpZ = 0.8 - Math.sin(subP * Math.PI) * 2.5;
              jumpY = Math.sin(subP * Math.PI) * 1.7;
              rotX = Math.sin(subP * Math.PI) * Math.PI * 2;
              rotZ = Math.sin(subP * Math.PI) * 0.6;
              scaleModifierZ = 1.0 + Math.sin(subP * Math.PI) * 0.3; // Aero stretch
            }
            break;
          }

          // ==========================================
          // 04. MERCURIAL SUPERFLY 10: SCISSOR VOLLEY KICK & TRI-STAR SLICE
          // ==========================================
          case 'mercurial-superfly': {
            jumpY = Math.sin(p * Math.PI) * 2.0;
            jumpX = Math.sin(p * Math.PI * 2) * 0.5;
            rotX = Math.sin(p * Math.PI) * Math.PI * 2.5; // Radical bicycle volley angle
            rotY = -0.6 + Math.sin(p * Math.PI * 2) * 1.2;
            rotZ = Math.sin(p * Math.PI) * 1.1;
            break;
          }

          // ==========================================
          // 05. LEBRON XXI: 360° HIGH-TENSION LOCK & SEISMIC SLAM
          // ==========================================
          case 'court-alchemy': {
            if (p < 0.5) {
              // High levitation power charge
              const subP = p / 0.5;
              jumpY = subP * 1.6;
              rotY = subP * Math.PI * 2;
              rotX = Math.sin(subP * Math.PI) * 0.4;
            } else {
              // Thunderous downward power slam
              const subP = (p - 0.5) / 0.5;
              jumpY = 1.6 - subP * 2.0;
              rotY = Math.PI * 2 + Math.sin(subP * Math.PI) * 0.5;
              rotX = (1 - subP) * 0.4;
            }
            break;
          }

          // ==========================================
          // 06. THE ICONS: MAJESTIC TIME-WARP ORBITAL SHOWCASE
          // ==========================================
          case 'icons-heritage':
          default: {
            jumpY = Math.sin(p * Math.PI) * 1.3;
            rotY = p * Math.PI * 2;
            rotX = Math.sin(p * Math.PI) * 0.5;
            rotZ = Math.cos(p * Math.PI * 2) * 0.3;
            break;
          }
        }

        // Expand floor shockwaves
        setShockwaveScale((prev) => prev + delta * 6.5);
        setShockwaveOpacity((prev) => Math.max(0, prev - delta * 1.6));
      }
    }

    // Apply Position & Offsets
    groupRef.current.position.y = idleLevitation + jumpY;
    groupRef.current.position.z = jumpZ;
    groupRef.current.position.x = jumpX;

    // Apply Rotations to Shoe Group
    shoeMeshRef.current.rotation.x = rotX;
    shoeMeshRef.current.rotation.y = rotY;
    shoeMeshRef.current.rotation.z = rotZ;

    // Apply Scale Modifications (for compression/squash/stretch)
    shoeMeshRef.current.scale.set(scaleModifierX, scaleModifierY, scaleModifierZ);

    // Dynamic Contact Shadow on Floor
    if (shadowRef.current) {
      const shadowScale = (1 + jumpY * 0.35) * hoverScale;
      const shadowAlpha = Math.max(0.06, 0.42 - jumpY * 0.2);
      shadowRef.current.scale.set(shadowScale * 2.8, shadowScale * 1.5, 1);
      (shadowRef.current.material as THREE.MeshBasicMaterial).opacity = shadowAlpha;
    }

    // Expanding Floor Shockwave 1
    if (shockwaveRef.current) {
      shockwaveRef.current.scale.set(shockwaveScale, shockwaveScale, 1);
    }
    // Expanding Floor Shockwave 2
    if (shockwaveRef2.current) {
      const scale2 = Math.max(0, shockwaveScale - 0.4);
      shockwaveRef2.current.scale.set(scale2, scale2, 1);
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

      {/* 2. EXPANDING SONIC SHOCKWAVES ON FLOOR */}
      {shockwaveOpacity > 0.01 && (
        <group position={[0, -0.96, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh ref={shockwaveRef}>
            <ringGeometry args={[0.7, 0.95, 48]} />
            <meshBasicMaterial
              color={universe.accentColor}
              transparent
              opacity={shockwaveOpacity}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          <mesh ref={shockwaveRef2}>
            <ringGeometry args={[1.05, 1.25, 48]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={shockwaveOpacity * 0.6}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}

      {/* 3. HERO AUTHENTIC REAL 3D PHYSICAL NOVA SNEAKER MODEL (CLICK TO TRIGGER CRAZY ANIMATION) */}
      <group
        ref={shoeMeshRef}
        onClick={triggerShoeSpecificAnimation}
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
      </group>
    </group>
  );
};
