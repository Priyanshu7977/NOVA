'use client';

import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { NikeUniverseData } from '@/data/nikeUniverses';
import { audio } from '@/components/audio/NikeAudioEngine';
import {
  Layers,
  Sparkles,
  Zap,
  X,
  Maximize2,
  Minimize2,
  Activity,
  RotateCw,
  Shield,
  ShoppingBag,
  Sliders,
} from 'lucide-react';
import { useExperience } from '@/context/ExperienceContext';

interface SneakerMacroInspection3DProps {
  universe: NikeUniverseData | null;
  onClose: () => void;
}

// 3D Exploded Layer Mesh
const ExplodedLayer: React.FC<{
  scene: THREE.Group;
  offset: [number, number, number];
  rotationOffset?: [number, number, number];
  scale?: number;
  materialConfig: {
    color: string;
    roughness: number;
    metalness: number;
    clearcoat?: number;
    wireframe?: boolean;
    emissive?: string;
    emissiveIntensity?: number;
    opacity?: number;
  };
  isActive: boolean;
  explosionProgress: number; // 0 to 1
}> = ({
  scene,
  offset,
  rotationOffset = [0, 0, 0],
  scale = 1.0,
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
          clearcoat: materialConfig.clearcoat || 0.5,
          clearcoatRoughness: 0.1,
          wireframe: materialConfig.wireframe || false,
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

    // Smoothly calculate layer displacement
    const targetX = offset[0] * exp;
    const targetY = offset[1] * exp;
    const targetZ = offset[2] * exp;

    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, targetX, 8, delta);
    meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, targetY, 8, delta);
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, targetZ, 8, delta);

    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, rotationOffset[0] * exp, 8, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, rotationOffset[1] * exp, 8, delta);
    meshRef.current.rotation.z = THREE.MathUtils.damp(meshRef.current.rotation.z, rotationOffset[2] * exp, 8, delta);

    // Dynamic Scale pulse if active layer
    const activeScale = isActive ? scale * 1.05 : scale;
    meshRef.current.scale.lerp(new THREE.Vector3(activeScale, activeScale, activeScale), delta * 6);
  });

  return (
    <group ref={meshRef}>
      <primitive object={cloned} />
    </group>
  );
};

// 3D Exploded Sneaker Assembly Scene
const ExplodedSneakerScene: React.FC<{
  universe: NikeUniverseData;
  explosionFactor: number;
  focusedLayer: number; // -1 for all, 0 = upper, 1 = carbon/air, 2 = midsole, 3 = outsole
}> = ({ universe, explosionFactor, focusedLayer }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/nike_shoe.glb');

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Slow ambient rotation when not dragging
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
  });

  return (
    <group ref={groupRef} scale={[3.6, 3.6, 3.6]} position={[0, -0.2, 0]}>
      {/* 1. LAYER 01: Upper Dynamic Haptic Mesh Shell */}
      <ExplodedLayer
        scene={scene}
        offset={[0, 0.85, 0.15]}
        rotationOffset={[0.2, 0.1, 0]}
        scale={1.0}
        materialConfig={{
          color: universe.accentColor,
          roughness: 0.15,
          metalness: 0.35,
          clearcoat: 0.9,
          emissive: universe.accentColor,
          emissiveIntensity: focusedLayer === 0 ? 0.45 : 0.08,
          opacity: focusedLayer === -1 || focusedLayer === 0 ? 1.0 : 0.25,
        }}
        isActive={focusedLayer === 0}
        explosionProgress={explosionFactor}
      />

      {/* 2. LAYER 02: Glowing Nitrogen Dual-Air Pods & Carbon Flyplate Core */}
      <ExplodedLayer
        scene={scene}
        offset={[0.2, 0.25, 0.05]}
        rotationOffset={[-0.1, 0.2, 0.1]}
        scale={0.98}
        materialConfig={{
          color: '#0f172a',
          roughness: 0.08,
          metalness: 0.95,
          clearcoat: 1.0,
          emissive: '#38bdf8',
          emissiveIntensity: focusedLayer === 1 ? 0.75 : 0.25,
          opacity: focusedLayer === -1 || focusedLayer === 1 ? 1.0 : 0.3,
        }}
        isActive={focusedLayer === 1}
        explosionProgress={explosionFactor}
      />

      {/* 3. LAYER 03: Sculpted Low-Density Cushioning Foam Midsole */}
      <ExplodedLayer
        scene={scene}
        offset={[-0.15, -0.35, 0]}
        rotationOffset={[0.1, -0.15, -0.05]}
        scale={0.97}
        materialConfig={{
          color: '#ffffff',
          roughness: 0.35,
          metalness: 0.05,
          clearcoat: 0.2,
          emissive: '#ffffff',
          emissiveIntensity: focusedLayer === 2 ? 0.3 : 0.02,
          opacity: focusedLayer === -1 || focusedLayer === 2 ? 1.0 : 0.25,
        }}
        isActive={focusedLayer === 2}
        explosionProgress={explosionFactor}
      />

      {/* 4. LAYER 04: High-Abrasion Traction Outsole Base with Flex Grooves */}
      <ExplodedLayer
        scene={scene}
        offset={[0, -0.85, -0.1]}
        rotationOffset={[-0.25, 0, 0]}
        scale={0.96}
        materialConfig={{
          color: universe.themeColor,
          roughness: 0.45,
          metalness: 0.2,
          wireframe: false,
          emissive: universe.themeColor,
          emissiveIntensity: focusedLayer === 3 ? 0.5 : 0.05,
          opacity: focusedLayer === -1 || focusedLayer === 3 ? 1.0 : 0.25,
        }}
        isActive={focusedLayer === 3}
        explosionProgress={explosionFactor}
      />
    </group>
  );
};

export const SneakerMacroInspection3D: React.FC<SneakerMacroInspection3DProps> = ({
  universe,
  onClose,
}) => {
  const { addToCart, setIsCartOpen, setIsCheckoutOpen } = useExperience();

  const [explosionFactor, setExplosionFactor] = useState<number>(0.75); // 0 (assembled) to 1 (fully exploded)
  const [focusedLayer, setFocusedLayer] = useState<number>(-1); // -1 = all
  const [isClosing, setIsClosing] = useState<boolean>(false);

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
    >
      {/* 1. Fullscreen 3D Three.js Studio Canvas */}
      <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0.5, 4.8], fov: 45, near: 0.1, far: 100 }}
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

          {/* 3D Exploded Sneaker Layers */}
          <Suspense fallback={null}>
            <ExplodedSneakerScene
              universe={universe}
              explosionFactor={explosionFactor}
              focusedLayer={focusedLayer}
            />
          </Suspense>

          {/* 360 Orbit Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2.5}
            maxDistance={7.5}
            rotateSpeed={0.8}
            dampingFactor={0.08}
          />
        </Canvas>
      </div>

      {/* 2. Top Luxury Navigation Header */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-6 pointer-events-auto border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-white/20"
            style={{ backgroundColor: `${universe.accentColor}25` }}
          >
            <Layers className="w-5 h-5 text-[#38bdf8]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display text-2xl font-black uppercase tracking-wider text-white">
                {universe.productName}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[9px] font-mono font-bold text-[#38bdf8] uppercase tracking-widest border border-white/15">
                3D DECONSTRUCTION MODE
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

      {/* 3. Interactive Layer Focus Switcher (Floating Cartier-Style Pills) */}
      <div className="relative z-20 flex-1 flex flex-col justify-between p-6 sm:px-12 pointer-events-none">
        {/* Left Layer Selectors */}
        <div className="flex flex-col space-y-2.5 max-w-sm pointer-events-auto mt-4">
          <span className="font-mono text-[10px] font-bold text-[#38bdf8] uppercase tracking-widest">
            SELECT ANATOMICAL LAYER TO INSPECT:
          </span>

          <button
            onClick={() => {
              setFocusedLayer(-1);
              audio.playClick();
            }}
            className={`px-4 py-2.5 rounded-2xl border text-left text-xs font-mono font-bold uppercase transition-all flex items-center justify-between ${
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
                audio.playChime(600 + layer.id * 100, 'sine', 0.15);
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                focusedLayer === layer.id
                  ? 'bg-white/95 text-black shadow-xl ring-2 ring-[#38bdf8] border-white scale-102'
                  : 'bg-black/60 text-gray-300 border-white/15 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold uppercase">
                  {layer.name}
                </span>
                <span className="text-[9px] font-mono text-gray-500">
                  0{layer.id + 1}
                </span>
              </div>
              <p className="font-sans text-[11px] leading-snug text-gray-600 font-medium">
                {layer.desc}
              </p>
              <span className="font-mono text-[9px] text-[#0284c7] block mt-1 font-bold">
                MATERIAL: {layer.material}
              </span>
            </button>
          ))}
        </div>

        {/* Center Prompt & 360 Drag Cue */}
        <div className="self-center flex items-center space-x-2 px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-gray-300 font-bold uppercase tracking-wider">
          <RotateCw className="w-3.5 h-3.5 text-[#38bdf8] animate-spin" />
          <span>DRAG 3D MODEL TO ROTATE 360° • PINCH TO ZOOM</span>
        </div>
      </div>

      {/* 4. Bottom Cartier-Style Layer Separation Slider & Instant Purchase Bar */}
      <footer className="relative z-20 p-6 sm:px-12 border-t border-white/10 bg-black/50 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto">
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
                setExplosionFactor(parseFloat(e.target.value));
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
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-gray-100 text-black font-sans font-black text-xs tracking-widest uppercase transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
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
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-sans font-black text-xs tracking-widest uppercase transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>BUY NOW • CHECKOUT</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
