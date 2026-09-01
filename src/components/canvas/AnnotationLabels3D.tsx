'use client';

import React from 'react';
import { Html } from '@react-three/drei';

interface AnnotationLabels3DProps {
  explodeProgress: number;
}

export const AnnotationLabels3D: React.FC<AnnotationLabels3DProps> = ({ explodeProgress }) => {
  // Active when exploded
  const isVisible = explodeProgress > 0.2;
  if (!isVisible) return null;

  const opacity = Math.min(1, Math.max(0, (explodeProgress - 0.2) / 0.4));

  return (
    <group name="ANNOTATIONS_3D">
      {/* 1. FLYKNIT / ATOMKNIT UPPER LABEL */}
      <group position={[1.2, 0.4 + explodeProgress * 1.5, 0.6]}>
        <Html distanceFactor={10} center position={[0, 0, 0]}>
          <div
            className="flex items-center space-x-3 pointer-events-none select-none transition-opacity duration-300"
            style={{ opacity }}
          >
            <div className="w-16 h-[1px] bg-emerald-400/80" />
            <div className="bg-[#080808]/90 border border-emerald-500/30 px-3.5 py-2 rounded-xl backdrop-blur-md whitespace-nowrap shadow-xl">
              <div className="text-[10px] font-mono font-bold tracking-wider text-emerald-400">
                01 / ATOMKNIT UPPER
              </div>
              <div className="text-[9px] font-mono text-[#A1A1AA]">
                Micro-perforated breathable weave.
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* 2. DUAL ZOOM AIR PODS LABEL */}
      <group position={[-1.6, -0.1 - explodeProgress * 0.7, -0.6]}>
        <Html distanceFactor={10} center position={[0, 0, 0]}>
          <div
            className="flex items-center space-x-3 pointer-events-none select-none transition-opacity duration-300 flex-row-reverse"
            style={{ opacity }}
          >
            <div className="w-16 h-[1px] bg-emerald-400/80" />
            <div className="bg-[#080808]/90 border border-emerald-500/30 px-3.5 py-2 rounded-xl backdrop-blur-md whitespace-nowrap text-right shadow-xl">
              <div className="text-[10px] font-mono font-bold tracking-wider text-emerald-400">
                02 / DUAL ZOOM AIR
              </div>
              <div className="text-[9px] font-mono text-[#A1A1AA]">
                Pressurized metatarsal pods.
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* 3. FULL-LENGTH CARBON FLYPLATE */}
      <group position={[1.4, -0.15 - explodeProgress * 0.35, 0.6]}>
        <Html distanceFactor={10} center position={[0, 0, 0]}>
          <div
            className="flex items-center space-x-3 pointer-events-none select-none transition-opacity duration-300"
            style={{ opacity }}
          >
            <div className="w-20 h-[1px] bg-amber-400/80" />
            <div className="bg-[#080808]/90 border border-amber-400/30 px-3.5 py-2 rounded-xl backdrop-blur-md whitespace-nowrap shadow-xl">
              <div className="text-[10px] font-mono font-bold tracking-wider text-amber-400">
                03 / CARBON FLYPLATE
              </div>
              <div className="text-[9px] font-mono text-[#A1A1AA]">
                S-curved propulsion blade.
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* 4. SUPERCRITICAL ZOOM-X FOAM & OUTSOLE */}
      <group position={[-1.3, -0.4 - explodeProgress * 1.6, -0.6]}>
        <Html distanceFactor={10} center position={[0, 0, 0]}>
          <div
            className="flex items-center space-x-3 pointer-events-none select-none transition-opacity duration-300 flex-row-reverse"
            style={{ opacity }}
          >
            <div className="w-16 h-[1px] bg-white/60" />
            <div className="bg-[#080808]/90 border border-white/20 px-3.5 py-2 rounded-xl backdrop-blur-md whitespace-nowrap text-right shadow-xl">
              <div className="text-[10px] font-mono font-bold tracking-wider text-white">
                04 / SUPERCRITICAL FOAM
              </div>
              <div className="text-[9px] font-mono text-[#A1A1AA]">
                Maximal energy return wedge.
              </div>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
};
