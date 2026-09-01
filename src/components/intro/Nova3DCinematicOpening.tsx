'use client';

import React, { useRef, useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Zap, ArrowRight, Volume2, VolumeX, MousePointer, ShieldCheck } from 'lucide-react';
import { audio } from '@/components/audio/NikeAudioEngine';

interface Nova3DCinematicOpeningProps {
  onComplete: () => void;
}

// 3D Materializing Holographic Sneaker with Multi-Axis Choreography
const CinematicSneakerMesh: React.FC<{
  progress: number;
  isHolding: boolean;
}> = ({ progress, isHolding }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/nike_shoe.glb');

  const clonedScene = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.roughness = 0.15;
          mat.metalness = 0.7;
          mat.envMapIntensity = 2.5;
          mesh.material = mat;
        }
      }
    });
    return s;
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Cartier-Style Kinetic Choreography
    const spinMultiplier = isHolding ? 4.5 : 1.0;
    const p = Math.max(0, Math.min(1, progress));

    // Dynamic Scale & Position Lerp
    const targetScale = THREE.MathUtils.lerp(3.5, 7.8, p);
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);

    // Multi-Axis Cinematic Rotation
    const targetRotY = t * 0.8 * spinMultiplier + p * Math.PI * 3;
    const targetRotX = Math.sin(t * 1.2) * 0.2 + (isHolding ? 0.35 : 0.1);
    const targetRotZ = Math.cos(t * 0.9) * 0.15 - p * 0.3;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 6, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 6, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotZ, 6, delta);

    // Floating Levitation
    groupRef.current.position.y = Math.sin(t * 2.2) * 0.15;
    groupRef.current.position.z = THREE.MathUtils.lerp(-4, 0.4, p);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
};

// 3D Hyperspace Warp Tunnel Rings
const HyperspaceWarpRings: React.FC<{ progress: number; isHolding: boolean }> = ({ progress, isHolding }) => {
  const ringsRef = useRef<THREE.Group>(null);
  const ringCount = 20;

  useFrame((_, delta) => {
    if (!ringsRef.current) return;
    const speed = (progress * 30) + (isHolding ? 35 : 8);

    ringsRef.current.children.forEach((child, i) => {
      child.position.z += delta * speed;
      if (child.position.z > 6) {
        child.position.z = -40;
      }
      child.rotation.z += delta * (0.25 + (i % 3) * 0.15);
    });
  });

  return (
    <group ref={ringsRef}>
      {Array.from({ length: ringCount }).map((_, i) => {
        const z = -i * 2.0;
        const color = i % 3 === 0 ? '#0284c7' : i % 3 === 1 ? '#38bdf8' : '#e11d48';
        return (
          <mesh key={i} position={[0, 0, z]}>
            <torusGeometry args={[3.8 + (i % 4) * 0.25, 0.03, 16, 64]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Radiant Ground Shockwave Rings
const RadiantFloorGlow: React.FC<{ isHolding: boolean }> = ({ isHolding }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    const scale = (t * 2.5) % 3.0;
    ringRef.current.scale.set(1 + scale * 3, 1 + scale * 3, 1);
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(
      0,
      (isHolding ? 0.9 : 0.5) - scale * 0.28
    );
  });

  return (
    <group position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.8, 1.1, 48]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export const Nova3DCinematicOpening: React.FC<Nova3DCinematicOpeningProps> = ({ onComplete }) => {
  const [chargeProgress, setChargeProgress] = useState(0.15); // 0 to 1
  const [isHolding, setIsHolding] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLaunching, setIsLaunching] = useState(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleLaunch = useCallback(() => {
    audio.playSonicBlast();
    setIsLaunching(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [onComplete]);

  // Hold Gesture or Scroll Wheel Interaction (Cartier-Inspired)
  const startHolding = () => {
    setIsHolding(true);
    audio.playChime(440, 'triangle', 0.2);

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    holdIntervalRef.current = setInterval(() => {
      setChargeProgress((prev) => {
        const next = prev + 0.035;
        if (next >= 1.0) {
          clearInterval(holdIntervalRef.current!);
          handleLaunch();
          return 1.0;
        }
        return next;
      });
    }, 30);
  };

  const stopHolding = () => {
    setIsHolding(false);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  // Scroll wheel also drives progress
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaY) * 0.0018;
      setChargeProgress((prev) => {
        const next = prev + delta;
        if (next >= 1.0) {
          handleLaunch();
          return 1.0;
        }
        return next;
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleLaunch]);

  // Auto charge over time if left idle
  useEffect(() => {
    const timer = setInterval(() => {
      setChargeProgress((prev) => {
        if (prev >= 0.9) return prev;
        return prev + 0.01;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleToggleSound = () => {
    const unmuted = audio.toggleMute();
    setIsMuted(!unmuted);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#06080e] text-white flex flex-col justify-between transition-all duration-700 select-none ${
        isLaunching ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'
      }`}
      onPointerDown={startHolding}
      onPointerUp={stopHolding}
      onPointerLeave={stopHolding}
    >
      {/* 1. Fullscreen 3D Hyperspace Three.js Canvas */}
      <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0.2, 5.2], fov: 45, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#06080e']} />
          <fog attach="fog" args={['#06080e', 6, 30]} />

          {/* Dynamic Dramatic Cinematic Lighting */}
          <ambientLight intensity={0.9} />
          <directionalLight position={[6, 9, 6]} intensity={3.2} color="#ffffff" />
          <directionalLight position={[-6, 4, -4]} intensity={2.5} color="#0284c7" />
          <pointLight position={[0, -2, 2.5]} intensity={4.0} color="#38bdf8" distance={8} />
          <spotLight position={[0, 7, 2]} intensity={4.5} color="#f43f5e" angle={0.6} penumbra={0.8} />

          {/* Hyperspace Light Tunnel */}
          <HyperspaceWarpRings progress={chargeProgress} isHolding={isHolding} />

          {/* Sole Shockwaves */}
          <RadiantFloorGlow isHolding={isHolding} />

          {/* 3D Physical Sneaker Mesh */}
          <Suspense fallback={null}>
            <CinematicSneakerMesh progress={chargeProgress} isHolding={isHolding} />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. Top Luxury Header */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-6 pointer-events-auto">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
            <Zap className="w-5 h-5 text-[#38bdf8] fill-[#38bdf8] animate-pulse" />
          </div>
          <div>
            <span className="font-display text-xl font-black tracking-widest uppercase block leading-none text-white">
              NOVA
            </span>
            <span className="text-[10px] font-mono text-[#38bdf8] font-bold tracking-widest uppercase">
              SPEED & AIR ALCHEMY 2025/2026
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleSound();
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold uppercase backdrop-blur-md transition-all active:scale-95"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-[#38bdf8]" />}
            <span className="hidden sm:inline">{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLaunch();
            }}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold uppercase backdrop-blur-md transition-all hover:text-[#38bdf8] active:scale-95"
          >
            SKIP INTRO →
          </button>
        </div>
      </header>

      {/* 3. Center Cartier-Style Interactive Gesture Prompt & Monolithic Title */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        {/* Monolithic Luxury Headline */}
        <div className="space-y-3 mb-6">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#38bdf8]">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
            <span>INITIALIZING 3D SPEED DIMENSION</span>
          </span>

          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-white leading-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
            THE ART OF <br />
            <span className="bg-gradient-to-r from-[#38bdf8] via-[#ffffff] to-[#a3e635] bg-clip-text text-transparent">
              SPEED & AIR.
            </span>
          </h1>
        </div>

        {/* Cartier-Style Interactive Magnetic Hold / Scroll Dial */}
        <div className="relative flex items-center justify-center w-36 h-36 my-2">
          {/* Circular SVG Progress Ring */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="62"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="72"
              cy="72"
              r="62"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeDasharray={390}
              strokeDashoffset={390 - 390 * chargeProgress}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-75"
            />
          </svg>

          {/* Center Pulsing Prompt */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <Sparkles
              className={`w-6 h-6 text-[#38bdf8] transition-transform duration-300 ${
                isHolding ? 'scale-125 rotate-45' : 'animate-pulse'
              }`}
            />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white mt-1">
              {isHolding ? 'CHARGING...' : 'HOLD / SCROLL'}
            </span>
            <span className="text-[9px] font-mono font-semibold text-gray-400">
              {Math.round(chargeProgress * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Action Launch Bar */}
      <footer className="relative z-20 p-6 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto w-full pointer-events-auto">
        <div className="flex items-center space-x-4 text-[11px] font-mono text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>60+ FPS WEBGL GRAPHICS</span>
          </div>
          <span>•</span>
          <span>6 SPEED CHAMBERS READY</span>
        </div>

        {/* Enter Dimension CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLaunch();
          }}
          className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#0ea5e9] text-white font-sans font-black text-xs tracking-[0.25em] uppercase transition-all shadow-[0_0_40px_rgba(56,189,248,0.5)] hover:shadow-[0_0_60px_rgba(56,189,248,0.8)] hover:scale-105 active:scale-95 flex items-center space-x-3 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span>ENTER SPEED DIMENSION</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </footer>
    </div>
  );
};
