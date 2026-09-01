'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { NIKE_UNIVERSES } from '@/data/nikeUniverses';

interface TunnelRoomsProps {
  currentUniverseProgress: number; // float 0.0 to 7.0
}

export const TunnelRooms: React.FC<TunnelRoomsProps> = ({ currentUniverseProgress }) => {
  const roomDistance = 24;

  const roomConfigs = useMemo(() => {
    return [
      {
        index: 0,
        name: 'CTRL_ROOM_00_Introduction',
        z: 0,
        accentColor: '#0284c7',
        pastelBg: '#f0f9ff',
      },
      ...NIKE_UNIVERSES.map((u) => ({
        index: u.index,
        name: u.sceneRoom,
        z: -u.index * roomDistance,
        accentColor: u.accentColor,
        pastelBg: u.pastelBg,
      })),
      {
        index: 7,
        name: 'CTRL_ROOM_07_Outro',
        z: -7 * roomDistance,
        accentColor: '#0284c7',
        pastelBg: '#f8fafc',
      },
    ];
  }, []);

  return (
    <group>
      {roomConfigs.map((room) => {
        const distToCamera = Math.abs(currentUniverseProgress - room.index);
        const isNear = distToCamera < 1.4;

        return (
          <group key={room.index} position={[0, 0, room.z]}>
            {/* 1. Architectural Arches / Portals in Luxury Satin Titanium */}
            <mesh position={[0, 1.8, 0]}>
              <torusGeometry args={[4.8, 0.07, 16, 64, Math.PI]} />
              <meshStandardMaterial
                color="#cbd5e1"
                emissive={room.accentColor}
                emissiveIntensity={isNear ? 0.8 : 0.2}
                roughness={0.25}
                metalness={0.85}
              />
            </mesh>

            {/* Outer Architectural Ring */}
            <mesh position={[0, 1.8, -4]}>
              <torusGeometry args={[5.2, 0.04, 16, 64, Math.PI]} />
              <meshStandardMaterial
                color="#e2e8f0"
                roughness={0.4}
                metalness={0.7}
              />
            </mesh>

            {/* 2. Sleek Alabaster Oyster Showroom Pedestal */}
            <mesh position={[0, -1.8, 0]} receiveShadow>
              <cylinderGeometry args={[2.8, 3.2, 0.4, 48]} />
              <meshStandardMaterial
                color="#fdfcf9"
                roughness={0.2}
                metalness={0.15}
              />
            </mesh>

            {/* Pedestal Glowing Pastel Halo Rim */}
            <mesh position={[0, -1.58, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[2.7, 2.82, 48]} />
              <meshBasicMaterial
                color={room.accentColor}
                transparent
                opacity={isNear ? 0.85 : 0.25}
              />
            </mesh>

            {/* 3. Linear Pastel LED Floor Guideways */}
            <mesh position={[-3.2, -1.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.08, 16]} />
              <meshBasicMaterial color={room.accentColor} opacity={0.4} transparent />
            </mesh>
            <mesh position={[3.2, -1.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.08, 16]} />
              <meshBasicMaterial color={room.accentColor} opacity={0.4} transparent />
            </mesh>

            {/* 4. Soft Pastel Volumetric Mist Plane */}
            <mesh position={[0, 2.2, -10]}>
              <planeGeometry args={[18, 12]} />
              <meshBasicMaterial
                color={room.accentColor}
                transparent
                opacity={isNear ? 0.035 : 0.008}
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}

      {/* Continuous Polished Alabaster Porcelain Floor */}
      <mesh position={[0, -2.01, -3.5 * roomDistance]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 9 * roomDistance]} />
        <meshStandardMaterial
          color="#f4f3ef"
          roughness={0.12}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
};
