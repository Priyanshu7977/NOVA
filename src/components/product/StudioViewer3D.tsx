'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SneakerModel } from '@/components/canvas/SneakerModel';
import { ProductColorway } from '@/data/products';
import { RotateCw, ZoomIn, ZoomOut, Compass } from 'lucide-react';
import { sounds } from '@/components/audio/SoundManager';

interface StudioViewer3DProps {
  colorway: ProductColorway;
}

// Internal Interactive Orbit & Inertia Rig
const ShowroomOrbitController: React.FC<{
  colorway: ProductColorway;
  zoomLevel: number;
  resetTrigger: number;
}> = ({ colorway, zoomLevel, resetTrigger }) => {
  const { camera, gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Rotation & Inertia State
  const isPointerDown = useRef(false);
  const previousPointerPosition = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0.002 }); // subtle gentle ambient drift
  const currentRotation = useRef({ x: 0.15, y: 0.6 });

  // Reset view handler
  useEffect(() => {
    if (resetTrigger > 0) {
      currentRotation.current = { x: 0.15, y: 0.6 };
      velocity.current = { x: 0, y: 0 };
    }
  }, [resetTrigger]);

  // Pointer & Touch Event Handlers
  useEffect(() => {
    const domElement = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      isPointerDown.current = true;
      previousPointerPosition.current = { x: e.clientX, y: e.clientY };
      velocity.current = { x: 0, y: 0 };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown.current) return;

      const deltaX = e.clientX - previousPointerPosition.current.x;
      const deltaY = e.clientY - previousPointerPosition.current.y;

      const rotSpeed = 0.006;
      currentRotation.current.y += deltaX * rotSpeed;
      currentRotation.current.x += deltaY * rotSpeed;

      // Clamp X tilt to prevent flipping upside down
      currentRotation.current.x = Math.max(-0.6, Math.min(0.6, currentRotation.current.x));

      velocity.current = {
        x: deltaY * rotSpeed * 0.5,
        y: deltaX * rotSpeed * 0.5,
      };

      previousPointerPosition.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isPointerDown.current = false;
    };

    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [gl]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Apply Inertia with Smooth Damping
    if (!isPointerDown.current) {
      // Damping friction
      velocity.current.x *= 0.94;
      velocity.current.y *= 0.94;

      currentRotation.current.x += velocity.current.x;
      currentRotation.current.y += velocity.current.y;

      // Clamp X
      currentRotation.current.x = Math.max(-0.6, Math.min(0.6, currentRotation.current.x));
    }

    // Apply Rotation to Group
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      currentRotation.current.x,
      8,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      currentRotation.current.y,
      8,
      delta
    );

    // Apply Zoom to Camera Z
    const targetZ = THREE.MathUtils.clamp(4.8 - zoomLevel * 0.8, 3.2, 6.5);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 6, delta);
  });

  return (
    <group ref={groupRef}>
      <SneakerModel
        explodeProgress={0}
        energyActive={false}
        compressionAmount={0}
        isReconstructed={true}
        isCustomOrbit={true}
      />
    </group>
  );
};

export const StudioViewer3D: React.FC<StudioViewer3DProps> = ({ colorway }) => {
  const [zoomLevel, setZoomLevel] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleZoomIn = () => {
    sounds.playClick();
    setZoomLevel((prev) => Math.min(prev + 1, 2));
  };

  const handleZoomOut = () => {
    sounds.playClick();
    setZoomLevel((prev) => Math.max(prev - 1, -1));
  };

  const handleReset = () => {
    sounds.playClick();
    setZoomLevel(0);
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] bg-[#F7F7F5] rounded-3xl overflow-hidden border border-[#E5E5E2] flex flex-col justify-between p-6 select-none shadow-sm">
      {/* Top Controls: 360 Indicator & Reset View */}
      <div className="flex justify-between items-center z-10 font-mono text-xs text-[#6B6B6B]">
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E5E5E2] shadow-sm">
          <RotateCw size={13} className="text-[#111111] animate-spin" />
          <span className="font-bold text-[#111111]">360° INTERACTIVE STUDIO</span>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center space-x-1.5 bg-white/80 hover:bg-white backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E5E5E2] text-[#111111] font-bold shadow-sm transition-all"
        >
          <Compass size={13} />
          <span>RESET VIEW</span>
        </button>
      </div>

      {/* 3D Canvas with Studio Lighting */}
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [1.8, 0.6, 4.8], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          {/* Neutral studio lights */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[6, 10, 6]} intensity={2.8} />
          <directionalLight position={[-6, -2, -4]} intensity={1.2} />
          <spotLight
            position={[0, 6, 3]}
            intensity={18}
            angle={0.6}
            penumbra={0.8}
            color="#ffffff"
          />
          <pointLight position={[0, -0.4, 1.8]} intensity={2.5} color={colorway.accentColor} />

          <Suspense fallback={null}>
            <ShowroomOrbitController
              colorway={colorway}
              zoomLevel={zoomLevel}
              resetTrigger={resetTrigger}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Zoom Controls */}
      <div className="flex justify-between items-end z-10 font-mono text-xs">
        <div className="text-[11px] text-[#6B6B6B] bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5E5E2]">
          Drag to rotate · Pinch to zoom
        </div>

        <div className="flex items-center space-x-1.5 bg-white/80 backdrop-blur-md p-1 rounded-xl border border-[#E5E5E2] shadow-sm">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-lg hover:bg-[#F4F4F5] flex items-center justify-center text-[#111111] transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-lg hover:bg-[#F4F4F5] flex items-center justify-center text-[#111111] transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
