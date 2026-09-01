'use client';

import React, { useRef, useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Zap, ArrowRight, Volume2, VolumeX, Flame, Target } from 'lucide-react';
import { audio } from '@/components/audio/NikeAudioEngine';

interface Nova3DFootballKickOpeningProps {
  onComplete: () => void;
}

// 3D Realistic Kinetic Football Sphere with Procedural Leather Panels & Glowing Seams
const KineticFootball: React.FC<{ progress: number }> = ({ progress }) => {
  const ballRef = useRef<THREE.Group>(null);

  // Generate classic football texture
  const ballTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 512, 512);

      ctx.fillStyle = '#0f172a';
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#0284c7';

      // Draw pentagon patches
      const drawPatch = (x: number, y: number, r: number) => {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const px = x + r * Math.cos(a);
          const py = y + r * Math.sin(a);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      };

      drawPatch(256, 256, 65);
      drawPatch(100, 100, 50);
      drawPatch(412, 100, 50);
      drawPatch(100, 412, 50);
      drawPatch(412, 412, 50);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (!ballRef.current) return;
    const p = Math.max(0, Math.min(1, progress));

    if (p < 0.42) {
      // 1. BALL DROPS FROM SKY INTO STRIKE ZONE (0.0 to 0.42)
      const dropP = p / 0.42;
      // Parabolic gravity fall
      const startY = 4.5;
      const endY = 0.15;
      ballRef.current.position.set(0, THREE.MathUtils.lerp(startY, endY, dropP * dropP), 0.5);
      ballRef.current.rotation.x += delta * 4;
      ballRef.current.rotation.y += delta * 3;
      ballRef.current.scale.setScalar(1.0);
    } else if (p < 0.85) {
      // 2. BALL ROCKETS FORWARD INTO GOAL (0.42 to 0.85)
      const shotP = (p - 0.42) / 0.43;
      // Supersonic trajectory toward top corner of goal
      const startZ = 0.5;
      const endZ = -22.0;
      const startX = 0;
      const endX = 2.8; // Top right corner curve
      const startY = 0.15;
      const endY = 1.9; // Top bar height

      ballRef.current.position.set(
        THREE.MathUtils.lerp(startX, endX, shotP),
        THREE.MathUtils.lerp(startY, endY, Math.sin(shotP * Math.PI * 0.5)),
        THREE.MathUtils.lerp(startZ, endZ, shotP * shotP)
      );

      // High-speed spin on shot
      ballRef.current.rotation.x += delta * 25;
      ballRef.current.rotation.z -= delta * 20;

      // Motion stretch
      const stretch = 1.0 + Math.sin(shotP * Math.PI) * 0.45;
      ballRef.current.scale.set(1.0, 1.0, stretch);
    } else {
      // 3. BALL SMASHES GOAL NET (0.85 to 1.0)
      const goalP = (p - 0.85) / 0.15;
      ballRef.current.position.set(2.8, 1.9, -22.0 - goalP * 2.5);
      ballRef.current.rotation.x += delta * 8;
      ballRef.current.scale.setScalar(1.0);
    }
  });

  return (
    <group ref={ballRef} position={[0, 4.5, 0.5]}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial
          map={ballTexture}
          roughness={0.25}
          metalness={0.15}
          emissive="#0284c7"
          emissiveIntensity={progress > 0.42 ? 0.35 : 0.05}
        />
      </mesh>
    </group>
  );
};

// 3D Striking Nova Mercurial Football Boot
const StrikingBoot: React.FC<{ progress: number }> = ({ progress }) => {
  const bootRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/nike_shoe.glb');

  const clonedScene = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.roughness = 0.2;
          mat.metalness = 0.55;
          mesh.material = mat;
        }
      }
    });
    return s;
  }, [scene]);

  useFrame((_, delta) => {
    if (!bootRef.current) return;
    const p = Math.max(0, Math.min(1, progress));

    if (p < 0.42) {
      // 1. Boot winds up and swoops in for the volley kick
      const kickP = p / 0.42;
      const startPos = new THREE.Vector3(-2.8, -1.8, 1.8);
      const strikePos = new THREE.Vector3(-0.35, 0.1, 0.45);

      bootRef.current.position.lerpVectors(startPos, strikePos, kickP);
      bootRef.current.rotation.set(
        THREE.MathUtils.lerp(-0.6, 0.4, kickP),
        THREE.MathUtils.lerp(0.8, -0.4, kickP),
        THREE.MathUtils.lerp(-0.5, 0.2, kickP)
      );
      bootRef.current.scale.setScalar(5.5);
    } else if (p < 0.65) {
      // 2. Follow-through swing after strike
      const followP = (p - 0.42) / 0.23;
      bootRef.current.position.set(
        THREE.MathUtils.lerp(-0.35, 1.2, followP),
        THREE.MathUtils.lerp(0.1, 1.4, followP),
        THREE.MathUtils.lerp(0.45, 0.2, followP)
      );
      bootRef.current.rotation.set(0.4 + followP * 0.5, -0.4 - followP * 0.3, 0.2 + followP * 0.4);
    } else {
      // 3. Recede gracefully into background
      const fadeP = (p - 0.65) / 0.35;
      bootRef.current.position.y += delta * 1.5;
      bootRef.current.scale.setScalar(THREE.MathUtils.lerp(5.5, 0.01, fadeP));
    }
  });

  return (
    <group ref={bootRef} position={[-2.8, -1.8, 1.8]}>
      <primitive object={clonedScene} />
    </group>
  );
};

// 3D Glowing Quantum Stadium Goal Post & Net
const QuantumGoalPost: React.FC<{ progress: number }> = ({ progress }) => {
  const netRef = useRef<THREE.Mesh>(null);
  const isGoal = progress >= 0.85;

  return (
    <group position={[0, 0, -22]}>
      {/* Top Crossbar */}
      <mesh position={[0, 2.44, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 7.32, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#38bdf8"
          emissiveIntensity={isGoal ? 1.5 : 0.4}
        />
      </mesh>

      {/* Left Post */}
      <mesh position={[-3.66, 1.22, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.44, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={0.4} />
      </mesh>

      {/* Right Post */}
      <mesh position={[3.66, 1.22, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.44, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={0.4} />
      </mesh>

      {/* Futuristic Hexagonal Goal Net Plane */}
      <mesh ref={netRef} position={[0, 1.22, -1.2]}>
        <planeGeometry args={[7.32, 2.44, 24, 12]} />
        <meshStandardMaterial
          color="#0284c7"
          wireframe
          transparent
          opacity={isGoal ? 0.9 : 0.45}
          emissive={isGoal ? '#f43f5e' : '#0284c7'}
          emissiveIntensity={isGoal ? 1.2 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Supersonic Ball Trail Particles & Speed Rings
const SupersonicShotTrail: React.FC<{ progress: number }> = ({ progress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const isFlying = progress >= 0.42 && progress <= 0.88;

  useFrame((_, delta) => {
    if (!groupRef.current || !isFlying) return;
    groupRef.current.children.forEach((child, i) => {
      child.position.z += delta * 30;
      if (child.position.z > 2) child.position.z = -20;
    });
  });

  if (!isFlying) return null;

  return (
    <group ref={groupRef}>
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[(i % 2 === 0 ? 1 : -1) * (i * 0.2), 0.5 + i * 0.1, -i * 1.8]}>
          <ringGeometry args={[0.4, 0.5, 24]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#38bdf8' : '#f43f5e'}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export const Nova3DFootballKickOpening: React.FC<Nova3DFootballKickOpeningProps> = ({
  onComplete,
}) => {
  const [animProgress, setAnimProgress] = useState(0.0); // 0.0 to 1.0
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasKickedRef = useRef(false);
  const hasScoredRef = useRef(false);

  const handleFinish = useCallback(() => {
    audio.playGoalExplosion();
    setIsTransitioning(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [onComplete]);

  // Handle Scroll to advance the strike
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaY) * 0.0018;
      setAnimProgress((prev) => {
        const next = Math.min(1.0, prev + delta);

        // Trigger kick sound right at impact (0.42)
        if (next >= 0.42 && !hasKickedRef.current) {
          hasKickedRef.current = true;
          audio.playKickImpact();
        }

        // Trigger goal explosion at net impact (0.85)
        if (next >= 0.85 && !hasScoredRef.current) {
          hasScoredRef.current = true;
          audio.playGoalExplosion();
        }

        if (next >= 1.0) {
          handleFinish();
        }
        return next;
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleFinish]);

  // Click or Drag to auto-strike
  const triggerAutoStrike = () => {
    if (animProgress >= 0.95) return;
    const startP = animProgress;
    const startTime = Date.now();
    const duration = 1400; // 1.4s power shot

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(1.0, startP + (1.0 - startP) * (elapsed / duration));
      setAnimProgress(p);

      if (p >= 0.42 && !hasKickedRef.current) {
        hasKickedRef.current = true;
        audio.playKickImpact();
      }
      if (p >= 0.85 && !hasScoredRef.current) {
        hasScoredRef.current = true;
        audio.playGoalExplosion();
      }

      if (p >= 1.0) {
        clearInterval(interval);
        handleFinish();
      }
    }, 20);
  };

  const handleToggleSound = () => {
    const unmuted = audio.toggleMute();
    setIsMuted(!unmuted);
  };

  // Phase Title text
  let statusBadge = 'PHASE 01 // BALL DROPPING (SCROLL TO STRIKE)';
  if (animProgress >= 0.42 && animProgress < 0.85) {
    statusBadge = 'PHASE 02 // VOLLEY STRIKE IMPACT • 124 KM/H';
  } else if (animProgress >= 0.85) {
    statusBadge = 'PHASE 03 // G O A L ! !  PORTAL UNLOCKED';
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#050811] text-white flex flex-col justify-between transition-all duration-700 select-none ${
        isTransitioning ? 'opacity-0 scale-125 pointer-events-none' : 'opacity-100'
      }`}
      onClick={triggerAutoStrike}
    >
      {/* 1. Fullscreen 3D Stadium & Kick Scene Canvas */}
      <div className="absolute inset-0 z-10 cursor-pointer">
        <Canvas
          camera={{ position: [0, 1.4, 4.2], fov: 52, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#050811']} />
          <fog attach="fog" args={['#050811', 8, 35]} />

          {/* Dynamic Stadium Floodlights */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[6, 12, 6]} intensity={3.5} color="#ffffff" />
          <directionalLight position={[-6, 8, -6]} intensity={2.8} color="#0284c7" />
          <spotLight position={[0, 8, 0]} intensity={4.5} color="#38bdf8" angle={0.8} penumbra={0.6} />

          {/* Stadium Pitch Floor Grid */}
          <mesh position={[0, -0.6, -10]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[40, 60, 20, 30]} />
            <meshStandardMaterial color="#0b1329" roughness={0.7} metalness={0.2} wireframe />
          </mesh>

          {/* 3D Kinetic Football */}
          <KineticFootball progress={animProgress} />

          {/* 3D Striking Nova Mercurial Football Boot */}
          <Suspense fallback={null}>
            <StrikingBoot progress={animProgress} />
          </Suspense>

          {/* 3D Stadium Goal Post & Net */}
          <QuantumGoalPost progress={animProgress} />

          {/* Supersonic Flight Trail */}
          <SupersonicShotTrail progress={animProgress} />
        </Canvas>
      </div>

      {/* 2. Top Luxury Navigation Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-6 pointer-events-auto">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
            <Flame className="w-5 h-5 text-[#f43f5e] fill-[#f43f5e] animate-pulse" />
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
              handleFinish();
            }}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold uppercase backdrop-blur-md transition-all hover:text-[#38bdf8] active:scale-95"
          >
            SKIP TO SHOWCASE →
          </button>
        </div>
      </header>

      {/* 3. Center Cinematic HUD & Big Goal Typography */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        {/* Phase Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#38bdf8]">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
            <span>{statusBadge}</span>
          </span>
        </div>

        {/* Dynamic Headline Based on Progress */}
        {animProgress < 0.85 ? (
          <div className="space-y-3">
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-white leading-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
              STRIKE WITH <br />
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#ffffff] to-[#f43f5e] bg-clip-text text-transparent">
                UNSTOPPABLE SPEED.
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-sans font-medium text-gray-300 max-w-lg mx-auto tracking-wide">
              Scroll or click to execute the kinetic volley kick and blast through the speed portal!
            </p>
          </div>
        ) : (
          /* Massive GOAL Typography Explosion */
          <div className="space-y-4 animate-scale-up">
            <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-[#f43f5e] text-white font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_30px_#f43f5e]">
              <Sparkles className="w-4 h-4" />
              <span>TOP CORNER UPPER 90 • 124 KM/H</span>
            </div>

            <h1 className="font-display font-black text-7xl sm:text-9xl md:text-[11rem] uppercase tracking-tighter text-white leading-none drop-shadow-[0_20px_60px_rgba(244,63,94,0.9)] animate-pulse">
              G O A L ! !
            </h1>

            <span className="text-sm font-mono tracking-[0.3em] uppercase text-[#38bdf8] font-bold block">
              ENTERING NOVA SPEED CHAMBERS...
            </span>
          </div>
        )}

        {/* Interactive Kinetic Strike Meter */}
        <div className="w-full max-w-md mt-8 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
            <span className="text-[#38bdf8]">KINETIC STRIKE VELOCITY</span>
            <span>{Math.round(animProgress * 124)} KM/H</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#f43f5e] transition-all duration-75 shadow-[0_0_15px_#38bdf8]"
              style={{ width: `${Math.round(animProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. Bottom Action & Scroll Prompt */}
      <footer className="relative z-20 p-6 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto w-full pointer-events-auto">
        <div className="flex items-center space-x-4 text-[11px] font-mono text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>3D PHYSICAL KINETIC COLLISION ACTIVE</span>
          </div>
          <span>•</span>
          <span>SCROLL WHEEL DRIVEN</span>
        </div>

        {/* Click to Smash Shot CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            triggerAutoStrike();
          }}
          className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-[#e11d48] via-[#f43f5e] to-[#fb7185] text-white font-sans font-black text-xs tracking-[0.25em] uppercase transition-all shadow-[0_0_40px_rgba(244,63,94,0.6)] hover:shadow-[0_0_60px_rgba(244,63,94,0.9)] hover:scale-105 active:scale-95 flex items-center space-x-3 cursor-pointer"
        >
          <Zap className="w-4 h-4 text-amber-300 fill-amber-300 group-hover:scale-125 transition-transform" />
          <span>{animProgress < 0.42 ? 'CLICK TO KICK SHOT' : 'POWER SHOT ACTIVE'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </footer>
    </div>
  );
};
