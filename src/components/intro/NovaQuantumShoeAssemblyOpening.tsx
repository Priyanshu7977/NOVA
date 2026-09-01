'use client';

import React, { useRef, useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, ArrowRight, Volume2, VolumeX, Layers, MousePointer, ChevronDown } from 'lucide-react';
import { audio } from '@/components/audio/NikeAudioEngine';

interface NovaQuantumShoeAssemblyOpeningProps {
  onComplete: () => void;
}

// 3D Exploded & Reassembling Kinetic Shoe Assembly
const QuantumShoeAssembly: React.FC<{ progress: number }> = ({ progress }) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const upperRef = useRef<THREE.Group>(null);
  const soleRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF('/nike_shoe.glb');

  // Upper Mesh Layer Clone
  const upperScene = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        const mat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#0284c7'),
          roughness: 0.18,
          metalness: 0.45,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1,
          emissive: new THREE.Color('#38bdf8'),
          emissiveIntensity: 0.15,
        });
        mesh.material = mat;
      }
    });
    return s;
  }, [scene]);

  // Midsole / Cushioning Core Clone
  const coreScene = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        const mat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#111827'),
          roughness: 0.1,
          metalness: 0.85,
          wireframe: false,
          emissive: new THREE.Color('#e11d48'),
          emissiveIntensity: 0.25,
        });
        mesh.material = mat;
      }
    });
    return s;
  }, [scene]);

  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = Math.max(0, Math.min(1, progress));

    // Calm, luxurious orbit rotation
    const orbitSpeed = p < 0.6 ? 0.35 : 0.9;
    rootGroupRef.current.rotation.y = t * orbitSpeed + p * Math.PI * 1.5;
    rootGroupRef.current.position.y = Math.sin(t * 1.5) * 0.08;

    // Layer Displacement (Separation distance smoothly diminishes to 0 as user scrolls)
    const explosionFactor = Math.max(0, 1 - p * 1.4);

    if (upperRef.current) {
      upperRef.current.position.y = explosionFactor * 1.1;
      upperRef.current.position.z = explosionFactor * 0.35;
      upperRef.current.rotation.x = explosionFactor * 0.3;
    }

    if (soleRef.current) {
      soleRef.current.position.y = -explosionFactor * 1.1;
      soleRef.current.position.z = -explosionFactor * 0.25;
      soleRef.current.rotation.x = -explosionFactor * 0.2;
    }

    if (coreRef.current) {
      coreRef.current.position.x = explosionFactor * 0.5;
      coreRef.current.scale.setScalar(explosionFactor > 0.05 ? 1.0 + Math.sin(t * 4) * 0.06 : 1.0);
    }

    // Launch warp on final completion (p > 0.92)
    if (p > 0.92) {
      const launchP = (p - 0.92) / 0.08;
      rootGroupRef.current.position.z = -launchP * 14.0;
      rootGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(3.2, 0.2, launchP));
    } else {
      rootGroupRef.current.position.z = 0;
      rootGroupRef.current.scale.setScalar(3.2);
    }
  });

  return (
    <group ref={rootGroupRef} scale={[3.2, 3.2, 3.2]} position={[0, 0, 0]}>
      {/* 1. Upper Dynamic Knit Shell Layer */}
      <group ref={upperRef}>
        <primitive object={upperScene} />
      </group>

      {/* 2. Floating Nitrogen Air Pods / Carbon Core */}
      <group ref={coreRef} position={[0, -0.05, 0]}>
        <mesh>
          <torusGeometry args={[0.22, 0.045, 16, 32]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.8}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[0.4, 0.02, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.35, 16]} />
          <meshStandardMaterial
            color="#f43f5e"
            emissive="#f43f5e"
            emissiveIntensity={1.6}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>

      {/* 3. High-Abrasion Traction Outsole Base Layer */}
      <group ref={soleRef} position={[0, -0.2, 0]}>
        <primitive object={coreScene} />
      </group>
    </group>
  );
};

// 3D Quantum Laser Ring Particles
const QuantumLaserRings: React.FC<{ progress: number }> = ({ progress }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z += delta * 0.25;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.2;
  });

  const isAssembled = progress >= 0.7;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.22, 64]} />
        <meshBasicMaterial
          color={isAssembled ? '#a3e635' : '#38bdf8'}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[2.6, 2.62, 64]} />
        <meshBasicMaterial
          color="#f43f5e"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <ringGeometry args={[3.0, 3.02, 64]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Radiant Ground Shockwave Rings
const FloorShockwave: React.FC<{ progress: number }> = ({ progress }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    const wave = (t * 1.5) % 2.5;
    ringRef.current.scale.set(1 + wave * 3.0, 1 + wave * 3.0, 1);
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.65 - wave * 0.26);
  });

  return (
    <group position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.9, 1.15, 48]} />
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

export const NovaQuantumShoeAssemblyOpening: React.FC<NovaQuantumShoeAssemblyOpeningProps> = ({
  onComplete,
}) => {
  const [animProgress, setAnimProgress] = useState(0.0); // 0 to 1
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const targetProgressRef = useRef(0.0);
  const currentProgressRef = useRef(0.0);
  const hasSnappedRef = useRef(false);
  const isFinishedRef = useRef(false);
  const touchStartY = useRef(0);

  const handleFinish = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    audio.playSonicBlast();
    setIsTransitioning(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [onComplete]);

  // Silky Smooth Physics-Based Scroll Loop (Deliberate, Slow, Controlled)
  useEffect(() => {
    let animFrame: number;

    const updateLoop = () => {
      // Smooth Damping Lerp
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * 0.075; // Calm, gradual speed
        setAnimProgress(currentProgressRef.current);

        // Sound snap upon assembly convergence
        if (currentProgressRef.current >= 0.7 && !hasSnappedRef.current) {
          hasSnappedRef.current = true;
          audio.playTensionCable();
        } else if (currentProgressRef.current < 0.6) {
          hasSnappedRef.current = false;
        }

        // Complete when reached end
        if (currentProgressRef.current >= 0.98) {
          handleFinish();
        }
      }
      animFrame = requestAnimationFrame(updateLoop);
    };

    animFrame = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animFrame);
  }, [handleFinish]);

  // Calibrated, deliberate mouse wheel listener (NO jumping in one go)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Sensitivity: 0.00035 for fine, tactile control over multiple scrolls
      const delta = e.deltaY * 0.00035;
      targetProgressRef.current = Math.max(0.0, Math.min(1.0, targetProgressRef.current + delta));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Touch drag / swipe listener
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = (touchStartY.current - e.touches[0].clientY) * 0.0008;
    touchStartY.current = e.touches[0].clientY;
    targetProgressRef.current = Math.max(0.0, Math.min(1.0, targetProgressRef.current + deltaY));
  };

  const handleToggleSound = () => {
    const unmuted = audio.toggleMute();
    setIsMuted(!unmuted);
  };

  // Phase Title text
  let phaseBadge = 'PHASE 01 // DECONSTRUCTED CHASSIS (SCROLL DOWN)';
  if (animProgress >= 0.4 && animProgress < 0.78) {
    phaseBadge = 'PHASE 02 // NITROGEN CORE FUSION & LOCKDOWN';
  } else if (animProgress >= 0.78) {
    phaseBadge = 'PHASE 03 // 100% ASSEMBLED • ENTERING SPEED CHAMBERS';
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#07090f] text-white flex flex-col justify-between transition-all duration-700 select-none ${
        isTransitioning ? 'opacity-0 scale-125 pointer-events-none' : 'opacity-100'
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* 1. Fullscreen 3D Exploded Shoe Canvas */}
      <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0.4, 4.8], fov: 46, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#07090f']} />
          <fog attach="fog" args={['#07090f', 6, 28]} />

          {/* Luxury Studio Key & Rim Lights */}
          <ambientLight intensity={0.9} />
          <directionalLight position={[6, 8, 6]} intensity={3.5} color="#ffffff" />
          <directionalLight position={[-6, 4, -4]} intensity={2.8} color="#0284c7" />
          <pointLight position={[0, -2, 2]} intensity={4.0} color="#38bdf8" distance={8} />
          <spotLight position={[0, 7, 2]} intensity={4.8} color="#f43f5e" angle={0.6} penumbra={0.8} />

          {/* 3D Exploded & Reassembling Sneaker */}
          <Suspense fallback={null}>
            <QuantumShoeAssembly progress={animProgress} />
          </Suspense>

          {/* 3D Laser Measurement Rings */}
          <QuantumLaserRings progress={animProgress} />

          {/* Floor Shockwave */}
          <FloorShockwave progress={animProgress} />
        </Canvas>
      </div>

      {/* 2. Top Luxury Navigation Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-6 pointer-events-auto">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
            <Layers className="w-5 h-5 text-[#38bdf8] fill-[#38bdf8] animate-pulse" />
          </div>
          <div>
            <span className="font-display text-xl font-black tracking-widest uppercase block leading-none text-white">
              NOVA
            </span>
            <span className="text-[10px] font-mono text-[#38bdf8] font-bold tracking-widest uppercase">
              DECONSTRUCTED REVOLUTION 2025/2026
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleSound}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold uppercase backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-[#38bdf8]" />}
            <span className="hidden sm:inline">{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
          </button>

          <button
            onClick={handleFinish}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold uppercase backdrop-blur-md transition-all hover:text-[#38bdf8] active:scale-95 cursor-pointer"
          >
            SKIP TO SHOWCASE →
          </button>
        </div>
      </header>

      {/* 3. Center Luxury Headline & Assembly Telemetry */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        {/* Phase Indicator Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#38bdf8]">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
            <span>{phaseBadge}</span>
          </span>
        </div>

        {/* Monolithic Luxury Headline */}
        <div className="space-y-3">
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-white leading-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
            THE ANATOMY OF <br />
            <span className="bg-gradient-to-r from-[#38bdf8] via-[#ffffff] to-[#a3e635] bg-clip-text text-transparent">
              KINETIC SPEED.
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-sans font-medium text-gray-300 max-w-lg mx-auto tracking-wide">
            Scroll down slowly to deconstruct and assemble the 3D shoe chassis.
          </p>
        </div>

        {/* Real-time Assembly Progress Bar */}
        <div className="w-full max-w-md mt-8 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
            <span className="text-[#38bdf8]">3D CHASSIS INTEGRATION</span>
            <span>{Math.round(animProgress * 100)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#a3e635] transition-all duration-75 shadow-[0_0_15px_#38bdf8]"
              style={{ width: `${Math.round(animProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. Bottom Action Launch Bar (Purely Scroll-Driven) */}
      <footer className="relative z-20 p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto w-full pointer-events-auto">
        <div className="flex items-center space-x-4 text-[11px] font-mono text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>3D PHYSICAL MATRIX</span>
          </div>
          <span>•</span>
          <span>CALM SCROLL-DRIVEN SPEED</span>
        </div>

        {/* Interactive Scroll Cue */}
        <div className="flex items-center space-x-3 px-6 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-xs font-mono text-white font-bold uppercase tracking-wider shadow-2xl">
          <MousePointer className="w-4 h-4 text-[#38bdf8] animate-bounce" />
          <span>SCROLL DOWN TO ASSEMBLE</span>
          <ChevronDown className="w-4 h-4 text-[#38bdf8] animate-pulse" />
        </div>
      </footer>
    </div>
  );
};
