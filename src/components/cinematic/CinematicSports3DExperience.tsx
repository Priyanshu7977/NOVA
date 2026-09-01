'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { PRODUCTS } from '@/data/products';
import { sounds } from '@/components/audio/SoundManager';
import { useExperience } from '@/context/ExperienceContext';
import { Eye, ShoppingBag } from 'lucide-react';

interface CinematicSports3DProps {
  scrollProgress: number; // 0 to 1 across the 4 scenes
}

// =============================================================================
// 1. SCENE 1: 3D FOOTBALL KICK (Nike Mercurial Boot + 3D Ball Physics)
// =============================================================================
const FootballKick3D: React.FC<{ progress: number }> = ({ progress }) => {
  const ballGroupRef = useRef<THREE.Group>(null);
  const bootGroupRef = useRef<THREE.Group>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);

  // s1: 0 to 1 within Scene 1 (scroll 0.00 to 0.28)
  const s1 = Math.max(0, Math.min(1, progress / 0.26));
  const kickPhase = Math.max(0, (s1 - 0.5) / 0.5); // 0 before kick, 0 to 1 during kick

  // 3D Football Mesh with Authentic Patchwork
  const ballGeo = useMemo(() => new THREE.SphereGeometry(1.2, 32, 32), []);

  useFrame((_, delta) => {
    // 3D Ball Movement
    if (ballGroupRef.current) {
      if (kickPhase === 0) {
        // Suspended floating ball
        ballGroupRef.current.position.set(0, 0, 0);
        ballGroupRef.current.rotation.y = s1 * Math.PI * 3;
        ballGroupRef.current.rotation.x = s1 * Math.PI * 1.5;
        ballGroupRef.current.scale.setScalar(1 + s1 * 0.3);
      } else {
        // Explosive kick trajectory flying past camera in 3D
        const flightX = kickPhase * 16;
        const flightY = kickPhase * 6 - kickPhase * kickPhase * 8;
        const flightZ = kickPhase * -12;
        ballGroupRef.current.position.set(flightX, flightY, flightZ);
        ballGroupRef.current.rotation.x += delta * 25;
        ballGroupRef.current.rotation.y += delta * 30;
      }
    }

    // 3D Nike Mercurial Boot Movement
    if (bootGroupRef.current) {
      if (s1 < 0.2) {
        bootGroupRef.current.position.set(-8, 3, 2);
      } else if (s1 <= 0.55) {
        const sweepIn = (s1 - 0.2) / 0.35;
        // Sweeps down and forward towards the ball
        bootGroupRef.current.position.set(
          THREE.MathUtils.lerp(-8, -1.2, sweepIn),
          THREE.MathUtils.lerp(3, -0.4, sweepIn),
          THREE.MathUtils.lerp(2, 0.5, sweepIn)
        );
        bootGroupRef.current.rotation.set(-0.2, 0.3, sweepIn * 0.8);
      } else {
        // Follow-through kick swing
        const follow = (s1 - 0.55) / 0.45;
        bootGroupRef.current.position.set(
          THREE.MathUtils.lerp(-1.2, 4, follow),
          THREE.MathUtils.lerp(-0.4, 2, follow),
          THREE.MathUtils.lerp(0.5, -1, follow)
        );
        bootGroupRef.current.rotation.set(0.1, 0.5, 0.8 + follow * 0.6);
      }
    }

    // Shockwave Ring
    if (shockwaveRef.current && kickPhase > 0) {
      const scale = kickPhase * 18;
      shockwaveRef.current.scale.set(scale, scale, scale);
      const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.9 - kickPhase * 1.8);
    }
  });

  if (progress > 0.32) return null;

  return (
    <group name="SCENE_01_FOOTBALL">
      {/* Suspended 3D Football */}
      <group ref={ballGroupRef}>
        <mesh geometry={ballGeo} castShadow receiveShadow>
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.25}
            metalness={0.05}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* 3D Black Pentagons & Curved Seams on the Ball */}
        <mesh position={[0, 0, 1.18]}>
          <circleGeometry args={[0.35, 5]} />
          <meshStandardMaterial color="#0F172A" roughness={0.4} />
        </mesh>
        <mesh position={[0.9, 0.5, 0.5]} rotation={[0.4, 0.8, 0]}>
          <circleGeometry args={[0.32, 5]} />
          <meshStandardMaterial color="#0F172A" roughness={0.4} />
        </mesh>
        <mesh position={[-0.9, -0.4, 0.5]} rotation={[-0.4, -0.8, 0]}>
          <circleGeometry args={[0.32, 5]} />
          <meshStandardMaterial color="#0F172A" roughness={0.4} />
        </mesh>
      </group>

      {/* 3D Nike Mercurial Football Boot + Striker Leg */}
      <group ref={bootGroupRef} scale={[1.4, 1.4, 1.4]}>
        {/* Striker Muscular Leg / Calf in Dark Athletic Sock */}
        <mesh position={[-0.6, 2.0, 0]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.4, 0.5, 3.2, 16]} />
          <meshStandardMaterial color="#0F172A" roughness={0.6} />
        </mesh>

        {/* Nike Mercurial Boot Main Body (Glacier Blue & Electric Volt) */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, -0.1]} castShadow>
          <boxGeometry args={[2.8, 0.9, 1.1]} />
          <meshStandardMaterial
            color="#0EA5E9"
            roughness={0.2}
            metalness={0.3}
            emissive="#0284C7"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Dynamic Fit High Ankle Collar */}
        <mesh position={[-0.8, 0.7, 0]}>
          <cylinderGeometry args={[0.55, 0.6, 0.8, 16]} />
          <meshStandardMaterial color="#0F172A" roughness={0.5} />
        </mesh>

        {/* Cleat FG Studs */}
        <mesh position={[-0.8, -0.65, 0.3]}>
          <coneGeometry args={[0.15, 0.4, 8]} />
          <meshStandardMaterial color="#22C55E" />
        </mesh>
        <mesh position={[-0.8, -0.65, -0.3]}>
          <coneGeometry args={[0.15, 0.4, 8]} />
          <meshStandardMaterial color="#22C55E" />
        </mesh>
        <mesh position={[0.8, -0.65, 0.3]}>
          <coneGeometry args={[0.15, 0.4, 8]} />
          <meshStandardMaterial color="#22C55E" />
        </mesh>
        <mesh position={[0.8, -0.65, -0.3]}>
          <coneGeometry args={[0.15, 0.4, 8]} />
          <meshStandardMaterial color="#22C55E" />
        </mesh>

        {/* Volt Electric Nike Swoosh */}
        <mesh position={[0.2, 0.1, 0.58]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[1.6, 0.3, 0.05]} />
          <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* Kinetic Impact 3D Shockwave Ring */}
      <mesh ref={shockwaveRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshBasicMaterial color="#0EA5E9" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// =============================================================================
// 2. SCENE 2: 3D BADMINTON GIRL JUMP SMASH (Nike Court Vapor Pro 2)
// =============================================================================
const BadmintonJumpSmash3D: React.FC<{ progress: number }> = ({ progress }) => {
  const girlGroupRef = useRef<THREE.Group>(null);
  const racketArmRef = useRef<THREE.Group>(null);
  const shuttleRef = useRef<THREE.Group>(null);

  // s2: 0 to 1 within Scene 2 (scroll 0.26 to 0.54)
  const s2 = Math.max(0, Math.min(1, (progress - 0.26) / 0.28));

  useFrame((_, delta) => {
    if (!girlGroupRef.current) return;

    // 3D Girl Jump Smash Dynamics:
    // 0.0 - 0.30: Deep athletic lunge on court floor
    // 0.30 - 0.70: Airborne high jump smash apex (elevation + rotation)
    // 0.70 - 1.00: Foot landing with friction and sole flex
    const jumpApex = Math.sin(s2 * Math.PI) * 4.2;
    const bodyRotY = Math.PI * 0.15 + s2 * 0.4;

    girlGroupRef.current.position.set(
      THREE.MathUtils.lerp(-4, 0, s2),
      jumpApex - 1.2,
      THREE.MathUtils.lerp(-2, 1, s2)
    );
    girlGroupRef.current.rotation.y = bodyRotY;

    // Smash Racket Swing Arc
    if (racketArmRef.current) {
      racketArmRef.current.rotation.z = -1.6 + s2 * 3.8;
    }

    // Shuttlecock flight
    if (shuttleRef.current) {
      const smashTrigger = Math.max(0, (s2 - 0.45) / 0.55);
      if (smashTrigger > 0) {
        shuttleRef.current.position.set(
          smashTrigger * 18,
          4 - smashTrigger * 9,
          smashTrigger * -10
        );
        shuttleRef.current.rotation.z += delta * 40;
      } else {
        shuttleRef.current.position.set(0.5, 3.8, 0);
      }
    }
  });

  if (progress < 0.24 || progress > 0.58) return null;

  return (
    <group name="SCENE_02_BADMINTON">
      {/* 3D Hardwood Badminton Court Floor */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.15} metalness={0.1} />
      </mesh>

      {/* Royal Blue Court Markings */}
      <mesh position={[0, -2.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.8, 6.0, 32]} />
        <meshBasicMaterial color="#2563EB" opacity={0.6} transparent />
      </mesh>

      {/* 3D Badminton Girl Athlete Model */}
      <group ref={girlGroupRef} scale={[1.2, 1.2, 1.2]}>
        {/* Torso & Athletic Top */}
        <mesh position={[0, 1.4, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.38, 1.3, 16]} />
          <meshStandardMaterial color="#0F172A" roughness={0.4} />
        </mesh>

        {/* Athletic Head & Hair Ponytail */}
        <mesh position={[0, 2.3, 0]}>
          <sphereGeometry args={[0.38, 16, 16]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.5} />
        </mesh>
        <mesh position={[-0.35, 2.5, 0]} rotation={[0, 0, 0.4]}>
          <coneGeometry args={[0.2, 0.7, 8]} />
          <meshStandardMaterial color="#09090B" />
        </mesh>

        {/* Athletic Legs & Lunge */}
        {/* Right Leg */}
        <mesh position={[0.4, 0.2, 0.3]} rotation={[0.4, 0, -0.2]} castShadow>
          <cylinderGeometry args={[0.22, 0.18, 1.6, 12]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        {/* Left Leg */}
        <mesh position={[-0.4, 0.1, -0.3]} rotation={[-0.5, 0, 0.3]} castShadow>
          <cylinderGeometry args={[0.22, 0.18, 1.6, 12]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>

        {/* 3D Nike Court Air Zoom Vapor Pro 2 Shoes on Feet */}
        {/* Right Shoe */}
        <group position={[0.7, -0.6, 0.6]} rotation={[0.3, 0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.1, 0.45, 0.55]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          {/* Blue Court Swoosh */}
          <mesh position={[0, 0.05, 0.29]}>
            <boxGeometry args={[0.7, 0.15, 0.02]} />
            <meshStandardMaterial color="#2563EB" />
          </mesh>
        </group>

        {/* Left Shoe */}
        <group position={[-0.8, -0.6, -0.5]} rotation={[-0.4, -0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.1, 0.45, 0.55]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.05, 0.29]}>
            <boxGeometry args={[0.7, 0.15, 0.02]} />
            <meshStandardMaterial color="#2563EB" />
          </mesh>
        </group>

        {/* Articulated Smash Arm + 3D Badminton Racket */}
        <group ref={racketArmRef} position={[0.4, 1.8, 0]}>
          <mesh position={[0.6, 0.5, 0]} rotation={[0, 0, -0.8]}>
            <cylinderGeometry args={[0.15, 0.14, 1.3, 12]} />
            <meshStandardMaterial color="#F1F5F9" />
          </mesh>

          {/* 3D Badminton Racket Shaft & Head */}
          <group position={[1.2, 1.1, 0]} rotation={[0, 0, -0.6]}>
            {/* Shaft */}
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 1.6, 8]} />
              <meshStandardMaterial color="#0284C7" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Oval Head */}
            <mesh position={[0, 2.0, 0]} rotation={[0, 0, 0]}>
              <torusGeometry args={[0.65, 0.04, 12, 24]} />
              <meshStandardMaterial color="#0284C7" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        </group>
      </group>

      {/* 3D High-Velocity Shuttlecock */}
      <group ref={shuttleRef}>
        <mesh>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.4, 0.7, 12]} />
          <meshStandardMaterial color="#FFFFFF" transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

// =============================================================================
// 3. SCENE 3: 3D MALE RUNNER IN NIKE ALPHAFLY 3 (Kinematic Stride)
// =============================================================================
const KineticRunner3D: React.FC<{ progress: number }> = ({ progress }) => {
  const runnerGroupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const trackRef = useRef<THREE.Group>(null);

  // s3: 0 to 1 within Scene 3 (scroll 0.50 to 0.78)
  const s3 = Math.max(0, Math.min(1, (progress - 0.50) / 0.28));

  useFrame((_, delta) => {
    if (!runnerGroupRef.current) return;

    // Running Stride Kinematics cycle
    const strideSpeed = 16;
    const stride = s3 * Math.PI * 8;
    const leg1 = Math.sin(stride) * 0.9;
    const leg2 = -Math.sin(stride) * 0.9;

    if (leftLegRef.current) leftLegRef.current.rotation.x = leg1;
    if (rightLegRef.current) rightLegRef.current.rotation.x = leg2;
    if (leftArmRef.current) leftArmRef.current.rotation.x = leg2 * 1.1;
    if (rightArmRef.current) rightArmRef.current.rotation.x = leg1 * 1.1;

    // Camera dolly tracking alongside feet
    runnerGroupRef.current.position.set(
      THREE.MathUtils.lerp(-3, 0, s3),
      -0.8 + Math.abs(Math.sin(stride)) * 0.25, // vertical bounce
      THREE.MathUtils.lerp(-1, 1.2, s3)
    );

    // Track motion
    if (trackRef.current) {
      trackRef.current.position.z = (s3 * 40) % 6;
    }
  });

  if (progress < 0.48 || progress > 0.82) return null;

  return (
    <group name="SCENE_03_RUNNER">
      {/* 3D Running Track Ground */}
      <group ref={trackRef}>
        <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 60]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Crisp White Track Lane Lines */}
        <mesh position={[-2.5, -2.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.15, 60]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[2.5, -2.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.15, 60]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* 3D Male Runner in Nike Alphafly 3 */}
      <group ref={runnerGroupRef} scale={[1.3, 1.3, 1.3]}>
        {/* Torso & Athletic Singlet (Forward sprint lean) */}
        <mesh position={[0, 1.5, 0]} rotation={[0.2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.48, 0.42, 1.4, 16]} />
          <meshStandardMaterial color="#0F172A" roughness={0.4} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 2.45, 0.2]}>
          <sphereGeometry args={[0.38, 16, 16]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.5} />
        </mesh>

        {/* Right Leg & Hero Nike Alphafly 3 */}
        <group ref={rightLegRef} position={[0.35, 0.8, 0]}>
          <mesh position={[0, -0.6, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.18, 1.4, 12]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>

          {/* 3D Nike Alphafly 3 (Electric Volt + Dual Zoom Air + ZoomX Cushion) */}
          <group position={[0, -1.4, 0.2]} rotation={[-0.1, 0, 0]}>
            {/* Volt Upper */}
            <mesh castShadow>
              <boxGeometry args={[0.55, 0.45, 1.3]} />
              <meshStandardMaterial
                color="#16A34A"
                roughness={0.25}
                emissive="#22C55E"
                emissiveIntensity={0.4}
              />
            </mesh>
            {/* Thick Sculpted ZoomX Midsole */}
            <mesh position={[0, -0.28, 0]}>
              <boxGeometry args={[0.6, 0.24, 1.35]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
            </mesh>
            {/* Dual Forefoot Zoom Air Pods (Cyan Glow) */}
            <mesh position={[0.22, -0.25, 0.35]}>
              <cylinderGeometry args={[0.12, 0.12, 0.2, 12]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
            </mesh>
            <mesh position={[-0.22, -0.25, 0.35]}>
              <cylinderGeometry args={[0.12, 0.12, 0.2, 12]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
            </mesh>
          </group>
        </group>

        {/* Left Leg & Nike Alphafly 3 */}
        <group ref={leftLegRef} position={[-0.35, 0.8, 0]}>
          <mesh position={[0, -0.6, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.18, 1.4, 12]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>

          <group position={[0, -1.4, 0.2]} rotation={[-0.1, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.55, 0.45, 1.3]} />
              <meshStandardMaterial
                color="#16A34A"
                roughness={0.25}
                emissive="#22C55E"
                emissiveIntensity={0.4}
              />
            </mesh>
            <mesh position={[0, -0.28, 0]}>
              <boxGeometry args={[0.6, 0.24, 1.35]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
            </mesh>
            <mesh position={[0.22, -0.25, 0.35]}>
              <cylinderGeometry args={[0.12, 0.12, 0.2, 12]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
            </mesh>
            <mesh position={[-0.22, -0.25, 0.35]}>
              <cylinderGeometry args={[0.12, 0.12, 0.2, 12]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
            </mesh>
          </group>
        </group>

        {/* Athletic Pumping Arms */}
        <group ref={rightArmRef} position={[0.55, 2.0, 0]}>
          <mesh position={[0, -0.6, 0]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.14, 1.2, 12]} />
            <meshStandardMaterial color="#F1F5F9" />
          </mesh>
        </group>

        <group ref={leftArmRef} position={[-0.55, 2.0, 0]}>
          <mesh position={[0, -0.6, 0]} rotation={[-0.4, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.14, 1.2, 12]} />
            <meshStandardMaterial color="#F1F5F9" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

// =============================================================================
// 4. SCENE 4: 3D HERO SNEAKER 360° REVEAL
// =============================================================================
const HeroProductReveal3D: React.FC<{ progress: number }> = ({ progress }) => {
  const shoeGroupRef = useRef<THREE.Group>(null);
  const s4 = Math.max(0, Math.min(1, (progress - 0.76) / 0.24));

  useFrame((_, delta) => {
    if (shoeGroupRef.current) {
      shoeGroupRef.current.rotation.y += delta * 0.8;
      shoeGroupRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.15;
    }
  });

  if (progress < 0.75) return null;

  return (
    <group name="SCENE_04_HERO_ORBIT" position={[0, 0.5, 0]} scale={[s4 * 1.6, s4 * 1.6, s4 * 1.6]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <group ref={shoeGroupRef}>
          {/* 3D Nike Alphafly 3 Hero Mesh */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.8, 0.9, 1.1]} />
            <meshStandardMaterial
              color="#16A34A"
              roughness={0.2}
              metalness={0.2}
              emissive="#22C55E"
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* ZoomX Midsole */}
          <mesh position={[0, -0.55, 0]}>
            <boxGeometry args={[2.9, 0.45, 1.15]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>

          {/* Dual Forefoot Air Pods */}
          <mesh position={[0.7, -0.45, 0.45]}>
            <cylinderGeometry args={[0.22, 0.22, 0.35, 16]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.5} />
          </mesh>
          <mesh position={[0.7, -0.45, -0.45]}>
            <cylinderGeometry args={[0.22, 0.22, 0.35, 16]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.5} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

// =============================================================================
// MASTER 3D CANVAS VIEWPORT
// =============================================================================
export const CinematicSports3DExperience: React.FC<CinematicSports3DProps> = ({ scrollProgress }) => {
  const { setSelectedProductForModal, addToCart } = useExperience();
  const heroProducts = PRODUCTS.slice(0, 3);
  const showProductCards = scrollProgress >= 0.82;

  return (
    <div className="relative w-full h-full bg-[#F7F7F5] select-none overflow-hidden">
      {/* Three.js 3D WebGL Scene */}
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 1.2, 9], fov: 45 }}
        className="absolute inset-0 w-full h-full"
      >
        <color attach="background" args={['#F7F7F5']} />
        <fog attach="fog" args={['#F7F7F5', 12, 35]} />

        {/* Studio Lighting */}
        <ambientLight intensity={1.4} />
        <directionalLight
          position={[6, 12, 8]}
          intensity={2.8}
          castShadow
          shadow-mapSize={[2048, 2048]}
          color="#FFFFFF"
        />
        <directionalLight position={[-6, -2, -4]} intensity={1.2} color="#E2E8F0" />
        <spotLight position={[0, 10, 4]} intensity={18} angle={0.6} penumbra={0.8} color="#FFFFFF" />

        {/* Scene 1: 3D Football Kick */}
        <FootballKick3D progress={scrollProgress} />

        {/* Scene 2: 3D Badminton Girl Jump Smash */}
        <BadmintonJumpSmash3D progress={scrollProgress} />

        {/* Scene 3: 3D Male Runner in Nike Alphafly 3 */}
        <KineticRunner3D progress={scrollProgress} />

        {/* Scene 4: 3D Hero Product 360° Orbit */}
        <HeroProductReveal3D progress={scrollProgress} />
      </Canvas>

      {/* ==================================================== */}
      {/* 2D EDITORIAL HEADLINES & CALLOUT OVERLAYS            */}
      {/* ==================================================== */}
      {/* Scene 1 Overlay */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-start pt-24 sm:pt-28 text-center pointer-events-none transition-all duration-500 ${
          scrollProgress < 0.26 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <span className="px-3.5 py-1 rounded-full bg-black/5 text-[10px] sm:text-xs font-mono font-bold tracking-mega text-[#6B6B6B] uppercase mb-2">
          3D SCENE 01 // FOOTBALL KICK & SPEED
        </span>
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#111111] uppercase leading-none">
          NOVA
        </h1>
        <p className="text-xs sm:text-sm font-mono font-semibold tracking-widest text-[#6B6B6B] uppercase mt-2">
          MOVE WITHOUT LIMITS.
        </p>
        <span className="text-xs font-mono text-emerald-600 font-bold mt-4 animate-bounce">
          ↓ SCROLL TO KICK THE BALL
        </span>
      </div>

      {/* Scene 2 Overlay */}
      <div
        className={`absolute inset-x-6 top-20 flex flex-col items-center text-center pointer-events-none transition-all duration-500 ${
          scrollProgress >= 0.26 && scrollProgress < 0.52
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <span className="px-3 py-1 rounded-full bg-blue-50 text-[10px] sm:text-xs font-mono font-bold tracking-mega text-blue-700 uppercase mb-1 border border-blue-200">
          3D SCENE 02 // BADMINTON GIRL JUMP SMASH
        </span>
        <h2 className="text-4xl sm:text-7xl font-black tracking-tight text-[#111111] uppercase">
          EXPLOSIVE SMASH
        </h2>
        <p className="text-xs font-mono text-[#6B6B6B] max-w-md mt-1">
          Nike Court Air Zoom Vapor Pro 2 // Hard Court Friction Control
        </p>
      </div>

      {/* Scene 3 Overlay */}
      <div
        className={`absolute inset-x-6 top-20 flex flex-col items-center text-center pointer-events-none transition-all duration-500 ${
          scrollProgress >= 0.52 && scrollProgress < 0.78
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-[10px] sm:text-xs font-mono font-bold tracking-mega text-emerald-700 uppercase mb-1 border border-emerald-200">
          3D SCENE 03 // GUY RUNNING IN NIKE ALPHAFLY 3
        </span>
        <h2 className="text-4xl sm:text-7xl font-black tracking-tight text-[#111111] uppercase">
          MARATHON STRIDE
        </h2>
        <p className="text-xs font-mono text-[#6B6B6B] max-w-md mt-1">
          Dual Forefoot Zoom Air Pods & Full-Length Carbon Flyplate Propulsion
        </p>
      </div>

      {/* Scene 4 Cards Overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-center px-6 max-w-7xl mx-auto z-40 transition-all duration-500 ${
          showProductCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <div className="text-center mb-8 space-y-1">
          <span className="text-[11px] font-mono font-bold tracking-mega text-[#6B6B6B] uppercase">
            3D SCENE 04 // FEATURED HERO LINEUP
          </span>
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111111] uppercase">
            THE PERFORMANCE SPECIFICATIONS
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {heroProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => {
                sounds.playClick();
                setSelectedProductForModal(prod);
              }}
              className="bg-white p-6 rounded-3xl border border-[#E5E5E2] hover:border-black/40 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold text-[#6B6B6B]">
                    {prod.number} // {prod.sport}
                  </span>
                  {prod.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#111111] text-white text-[9px] font-mono font-bold uppercase">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-xl font-black tracking-tight text-[#111111] mt-2 group-hover:text-emerald-700 transition-colors">
                  {prod.name}
                </h4>
                <p className="text-xs font-mono text-[#6B6B6B] mt-0.5">{prod.tagline}</p>
              </div>

              <div className="pt-8 border-t border-[#F0F0ED] space-y-3">
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-xs text-[#6B6B6B]">NIKE INDIA MRP</span>
                  <span className="text-base font-bold text-[#111111]">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playClick();
                      setSelectedProductForModal(prod);
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-black/10 hover:border-black text-xs font-mono font-bold uppercase transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye size={13} />
                    <span>VIEW 3D</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playClick();
                      addToCart(prod, prod.defaultColorway, 'UK 9');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-mono font-bold uppercase transition-all shadow-sm flex items-center justify-center space-x-1"
                  >
                    <ShoppingBag size={13} />
                    <span>ADD TO BAG</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
