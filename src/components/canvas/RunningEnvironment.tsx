'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperience } from '@/context/ExperienceContext';

export const RunningEnvironment: React.FC = () => {
  const { scrollProgress, activeScene } = useExperience();

  const groupRef = useRef<THREE.Group>(null);
  const floorRef = useRef<THREE.Mesh>(null);

  // Geometric light rings/ribs along the tunnel
  const ringCount = 16;
  const rings = useMemo(() => {
    const arr = [];
    for (let i = 0; i < ringCount; i++) {
      arr.push({
        z: -30 + i * 4,
        id: i,
      });
    }
    return arr;
  }, []);

  const ringGeo = useMemo(() => {
    // Hexagonal / arch ring
    return new THREE.TorusGeometry(3.5, 0.03, 8, 32);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Visibility: only during Scene 6 & 7 (0.60 to 0.82)
    const isVisible = scrollProgress >= 0.60 && scrollProgress <= 0.84;
    groupRef.current.visible = isVisible;

    if (!isVisible) return;

    // Translate geometric arches backward to simulate extreme forward motion
    const speed = (scrollProgress - 0.60) * 80 + 15;
    groupRef.current.children.forEach((child) => {
      if (child.name === 'TUNNEL_RING') {
        child.position.z += delta * speed;
        if (child.position.z > 10) {
          child.position.z = -30;
        }
      }
    });
  });

  return (
    <group ref={groupRef} name="FUTURISTIC_RUNNING_ENVIRONMENT" visible={false}>
      {/* Reflective Dark Floor with Geometric Grid */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.8, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 80, 20, 20]} />
        <meshStandardMaterial
          color="#08080a"
          roughness={0.12}
          metalness={0.9}
          wireframe={false}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* Speed Tunnel Light Arches */}
      {rings.map((r) => (
        <mesh
          key={r.id}
          name="TUNNEL_RING"
          geometry={ringGeo}
          position={[0, 0.5, r.z]}
        >
          <meshBasicMaterial
            color={r.id % 2 === 0 ? '#a855f7' : '#00f0ff'}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}

      {/* Speed Guide Ground Rails */}
      <mesh position={[-2.5, -1.78, -10]}>
        <boxGeometry args={[0.04, 0.02, 60]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>

      <mesh position={[2.5, -1.78, -10]}>
        <boxGeometry args={[0.04, 0.02, 60]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};
