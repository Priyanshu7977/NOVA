'use client';

import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Zap, ArrowRight, Volume2, VolumeX, Shield, Play } from 'lucide-react';
import { audio } from '@/components/audio/NikeAudioEngine';

interface Nova3DCinematicOpeningProps {
  onComplete: () => void;
}

// 3D Materializing Holographic Sneaker
const CinematicSneakerMesh: React.FC<{ progress: number }> = ({ progress }) => {
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
          mat.roughness = 0.18;
          mat.metalness = 0.65;
          mat.envMapIntensity = 2.0;
          mesh.material = mat;
        }
      }
    });
    return s;
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Stage 1 to Stage 3 Animation Timeline
    // 1. Initial Tumbling Materialization (0 to 0.4)
    // 2. High-Speed 360 Spin & Sonic Levitation (0.4 to 0.8)
    // 3. Hero Pose Lock with Dynamic Floating (0.8 to 1.0)

    if (progress < 0.4) {
      // Rapid holographic warp-in spin
      const p1 = progress / 0.4;
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.1, 7.5, p1));
      groupRef.current.rotation.y = t * 6 + p1 * Math.PI * 4;
      groupRef.current.rotation.x = Math.sin(t * 4) * 0.4;
      groupRef.current.rotation.z = Math.cos(t * 3) * 0.3;
      groupRef.current.position.z = THREE.MathUtils.lerp(-15, 0, p1);
    } else if (progress < 0.8) {
      // Powerful acrobatic corkscrew flip
      const p2 = (progress - 0.4) / 0.4;
      groupRef.current.scale.setScalar(7.5 + Math.sin(p2 * Math.PI) * 0.8);
      groupRef.current.rotation.y = p2 * Math.PI * 2 + Math.PI / 4;
      groupRef.current.rotation.x = Math.sin(p2 * Math.PI * 2) * 0.5;
      groupRef.current.rotation.z = Math.sin(p2 * Math.PI) * 0.25;
      groupRef.current.position.y = Math.sin(p2 * Math.PI) * 0.8;
      groupRef.current.position.z = 0;
    } else {
      // Hero levitating pose
      const p3 = (progress - 0.8) / 0.2;
      groupRef.current.scale.setScalar(7.5);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, -Math.PI / 5 + Math.sin(t * 1.5) * 0.25, delta * 3);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.15 + Math.sin(t * 2) * 0.08, delta * 3);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -0.1, delta * 3);
      groupRef.current.position.y = Math.sin(t * 2.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
};

// 3D Hyperspace Warp Tunnel Particle Rings
const HyperspaceWarpRings: React.FC<{ progress: number }> = ({ progress }) => {
  const ringsRef = useRef<THREE.Group>(null);
  const ringCount = 18;

  useFrame((_, delta) => {
    if (!ringsRef.current) return;
    ringsRef.current.children.forEach((child, i) => {
      const speed = progress < 0.5 ? 25 : 8;
      child.position.z += delta * speed;
      if (child.position.z > 6) {
        child.position.z = -35;
      }
      child.rotation.z += delta * (0.2 + (i % 3) * 0.1);
    });
  });

  return (
    <group ref={ringsRef}>
      {Array.from({ length: ringCount }).map((_, i) => {
        const z = -i * 2.2;
        const color = i % 3 === 0 ? '#0284c7' : i % 3 === 1 ? '#e11d48' : '#84cc16';
        return (
          <mesh key={i} position={[0, 0, z]}>
            <torusGeometry args={[3.6 + (i % 4) * 0.3, 0.035, 16, 64]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.45}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Radiant Sonic Shockwaves from Sneaker Sole
const SonicPulseRings: React.FC<{ progress: number }> = ({ progress }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, idx) => {
      const ring = child as THREE.Mesh;
      const wave = (t * 2 + idx * 0.7) % 2.5;
      ring.scale.set(1 + wave * 3.5, 1 + wave * 3.5, 1);
      (ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.8 - wave * 0.32);
    });
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i}>
          <ringGeometry args={[0.8, 0.92, 48]} />
          <meshBasicMaterial
            color="#0284c7"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export const Nova3DCinematicOpening: React.FC<Nova3DCinematicOpeningProps> = ({ onComplete }) => {
  const [animProgress, setAnimProgress] = useState(0); // 0.0 to 1.0
  const [isMuted, setIsMuted] = useState(true);
  const [phaseText, setPhaseText] = useState('INITIALIZING QUANTUM TELEMETRY');
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 4800; // 4.8 seconds opening sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(1, elapsed / duration);
      setAnimProgress(p);

      if (p < 0.3) {
        setPhaseText('STAGE 01 // MATERIALIZING 3D SILHOUETTE...');
      } else if (p < 0.65) {
        setPhaseText('STAGE 02 // PRESSURIZING DUAL-AIR CHAMBERS [15 PSI]');
      } else if (p < 0.95) {
        setPhaseText('STAGE 03 // 3D SPEED DIMENSION UNLOCKED');
      } else {
        setPhaseText('SYSTEM SYNCHRONIZED • READY FOR LAUNCH');
      }

      if (p >= 1) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleLaunch = () => {
    audio.playSonicBlast();
    setIsLaunching(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  const handleToggleSound = () => {
    const unmuted = audio.toggleMute();
    setIsMuted(!unmuted);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#07090e] text-white flex flex-col justify-between transition-all duration-700 select-none ${
        isLaunching ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Fullscreen 3D Three.js Hyperspace Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0.2, 4.8], fov: 48, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#07090e']} />
          <fog attach="fog" args={['#07090e', 6, 28]} />

          {/* Dynamic Dramatic Key & Rim Lights */}
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 8, 5]} intensity={2.8} color="#ffffff" />
          <directionalLight position={[-6, 4, -4]} intensity={2.2} color="#0284c7" />
          <pointLight position={[0, -2, 2]} intensity={3.5} color="#38bdf8" distance={8} />
          <spotLight position={[0, 6, 2]} intensity={4.0} color="#f43f5e" angle={0.6} penumbra={0.8} />

          {/* Hyperspace Light Tunnel */}
          <HyperspaceWarpRings progress={animProgress} />

          {/* Sonic Shockwaves */}
          <SonicPulseRings progress={animProgress} />

          {/* Hero 3D Sneaker Materializing & Flipping */}
          <Suspense fallback={null}>
            <CinematicSneakerMesh progress={animProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. Top Cinematic HUD Header */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-6">
        <div className="flex items-center space-x-4">
          {/* Nova Kinetic Brand Mark */}
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
            <Zap className="w-5 h-5 text-[#38bdf8] fill-[#38bdf8] animate-pulse" />
          </div>
          <div>
            <span className="font-display text-xl font-black tracking-wider uppercase block leading-none text-white">
              NOVA
            </span>
            <span className="text-[10px] font-mono text-[#38bdf8] font-bold tracking-widest uppercase">
              HOUSE OF SPEED 2025/2026
            </span>
          </div>
        </div>

        {/* Right Controls: Sound & Skip */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleSound}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold uppercase backdrop-blur-md transition-all active:scale-95"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-[#38bdf8]" />}
            <span className="hidden sm:inline">{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
          </button>

          <button
            onClick={handleLaunch}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold uppercase backdrop-blur-md transition-all hover:text-[#38bdf8] active:scale-95"
          >
            SKIP INTRO →
          </button>
        </div>
      </header>

      {/* 3. Center Holographic Crosshairs & Telemetry */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        {/* Animated Phase Progress Bar */}
        <div className="w-full max-w-md space-y-2 mb-4">
          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
            <span className="text-[#38bdf8] flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
              <span>{phaseText}</span>
            </span>
            <span>{Math.round(animProgress * 100)}%</span>
          </div>
          <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#a3e635] transition-all duration-75 shadow-[0_0_12px_#38bdf8]"
              style={{ width: `${Math.round(animProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* Giant Futuristic Headline (Fades in dynamically) */}
        {animProgress > 0.35 && (
          <div className="space-y-2 animate-fade-in">
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-white leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              THE ART OF <br />
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#ffffff] to-[#a3e635] bg-clip-text text-transparent">
                SPEED & AIR.
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-sans font-medium text-gray-300 max-w-lg mx-auto tracking-wide">
              Pressurized nitrogen cells. Carbon-fiber propulsion. Traversal through 6 rooms of next-generation performance alchemy.
            </p>
          </div>
        )}
      </div>

      {/* 4. Bottom Action Launch Bar */}
      <footer className="relative z-20 p-6 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center space-x-6 text-[11px] font-mono text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>3D WEBGL GRAPHICS ACCELERATED</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">6 INNOVATION CHAMBERS READY</span>
        </div>

        {/* Enter Dimension CTA Button */}
        <button
          onClick={handleLaunch}
          className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#0ea5e9] text-white font-sans font-black text-sm tracking-[0.25em] uppercase transition-all shadow-[0_0_40px_rgba(56,189,248,0.5)] hover:shadow-[0_0_60px_rgba(56,189,248,0.8)] hover:scale-105 active:scale-95 flex items-center space-x-3 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span>ENTER SPEED DIMENSION</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </footer>
    </div>
  );
};
