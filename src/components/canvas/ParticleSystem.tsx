'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperience } from '@/context/ExperienceContext';
import { useResponsive } from '@/hooks/useResponsive';

export const ParticleSystem: React.FC = () => {
  const { scrollProgress, activeScene, reducedMotion } = useExperience();
  const { isMobile } = useResponsive();

  const pointsRef = useRef<THREE.Points>(null);

  // Scaled particle count for optimal 60 FPS
  const count = isMobile ? 250 : 800;

  const [positions, initialPositions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const violet = new THREE.Color('#a855f7');
    const cyan = new THREE.Color('#00f0ff');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Spread across volume
      pos[idx] = (Math.random() - 0.5) * 16;
      pos[idx + 1] = (Math.random() - 0.5) * 8;
      pos[idx + 2] = (Math.random() - 0.5) * 24;

      initPos[idx] = pos[idx];
      initPos[idx + 1] = pos[idx + 1];
      initPos[idx + 2] = pos[idx + 2];

      vel[idx] = (Math.random() - 0.5) * 0.02;
      vel[idx + 1] = (Math.random() - 0.5) * 0.02;
      vel[idx + 2] = Math.random() * 0.1;

      // Color distribution
      const r = Math.random();
      const c = r < 0.4 ? violet : r < 0.7 ? cyan : white;
      col[idx] = c.r;
      col[idx + 1] = c.g;
      col[idx + 2] = c.b;
    }

    return [pos, initPos, vel, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    const currentPositions = posAttr.array as Float32Array;

    // Determine particle mode based on scene
    const isSpeedTunnel = activeScene === 6 || activeScene === 7;
    const isEnergy = activeScene === 4 || activeScene === 5;
    const isFrozen = activeScene === 8;
    const isQuiet = activeScene === 1 || activeScene === 9 || activeScene === 10;

    // Speed multiplier
    let speed = 1.0;
    if (isSpeedTunnel) speed = 28.0;
    else if (isEnergy) speed = 5.0;
    else if (isFrozen) speed = 0.0;
    else if (isQuiet) speed = 0.3;

    if (reducedMotion) speed = Math.min(speed, 0.5);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      if (isSpeedTunnel) {
        // High speed tunnel streaks flying toward camera / backwards along Z
        currentPositions[idx + 2] += delta * speed * (1 + (i % 5) * 0.5);
        if (currentPositions[idx + 2] > 12) {
          currentPositions[idx + 2] = -24;
          currentPositions[idx] = (Math.random() - 0.5) * 10;
          currentPositions[idx + 1] = (Math.random() - 0.5) * 6;
        }
      } else if (isEnergy) {
        // Energy swirl around shoe sole
        const angle = state.clock.elapsedTime * 2 + i * 0.1;
        const radius = 1.2 + Math.sin(i * 0.5) * 0.8;
        currentPositions[idx] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.1;
        currentPositions[idx + 1] = -0.2 + Math.sin(angle * 2) * 0.3;
        currentPositions[idx + 2] = Math.sin(angle) * (radius * 0.8);
      } else if (!isFrozen) {
        // Gentle floating Brownian motion
        currentPositions[idx] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002 * speed;
        currentPositions[idx + 1] += Math.cos(state.clock.elapsedTime * 0.5 + i) * 0.002 * speed;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} name="STORY_PARTICLES">
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.04 : 0.06}
        vertexColors
        transparent
        opacity={activeScene === 8 ? 0.9 : activeScene === 6 ? 0.85 : 0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
