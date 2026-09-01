'use client';

import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useExperience } from '@/context/ExperienceContext';

interface SneakerModelProps {
  explodeProgress: number; // 0 to 1
  energyActive: boolean;
  compressionAmount: number; // 0 to 1
  isReconstructed: boolean;
  isCustomOrbit?: boolean;
}

if (typeof window !== 'undefined') {
  useGLTF.preload('/nike_shoe.glb');
}

const RealNikeSneakerInner: React.FC<SneakerModelProps> = ({
  explodeProgress,
  energyActive,
  compressionAmount,
  isCustomOrbit = false,
}) => {
  const { config, userRotation } = useExperience();
  const groupRef = useRef<THREE.Group>(null);
  const accentLightRef = useRef<THREE.Mesh>(null);

  // Exploded layer refs
  const upperRef = useRef<THREE.Group>(null);
  const lacesRef = useRef<THREE.Group>(null);
  const plateRef = useRef<THREE.Group>(null);
  const midsoleRef = useRef<THREE.Group>(null);
  const airPodsRef = useRef<THREE.Group>(null);
  const outsoleRef = useRef<THREE.Group>(null);

  // Load the 3D GLB model
  const { scene } = useGLTF('/nike_shoe.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Color mapping
  const primaryColorHex = useMemo(() => {
    switch (config.upperColor) {
      case 'green':
      case 'volt':
        return '#16a34a'; // Vibrant Nova Green
      case 'midnight':
        return '#111827';
      case 'graphite':
        return '#1e293b';
      case 'ultraviolet':
        return '#7c3aed';
      case 'solar':
        return '#ea580c';
      case 'white':
      case 'ice':
      default:
        return '#16a34a';
    }
  }, [config.upperColor]);

  const accentColorHex = useMemo(() => {
    switch (config.accentColor) {
      case 'green':
        return '#00ff66';
      case 'cyan':
        return '#00f0ff';
      case 'violet':
        return '#a855f7';
      case 'orange':
        return '#ff5722';
      default:
        return '#00ff66';
    }
  }, [config.accentColor]);

  // Apply PBR Materials & Textures
  useEffect(() => {
    if (!clonedScene) return;

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const originalMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
          const standardMat = originalMat as THREE.MeshStandardMaterial;

          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(primaryColorHex),
            map: standardMat.map || null,
            normalMap: standardMat.normalMap || null,
            roughnessMap: standardMat.roughnessMap || null,
            metalnessMap: standardMat.metalnessMap || null,
            aoMap: standardMat.aoMap || null,
            roughness: 0.35,
            metalness: 0.1,
            envMapIntensity: 2.2,
          });
        }
      }
    });
  }, [clonedScene, primaryColorHex]);

  // 3D Exploded Layer Geometries for the disassembling scroll stage
  const explodedGeometries = useMemo(() => {
    // 1. Carbon Flyplate Spoon Blade
    const plateCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 0.05, 0),
      new THREE.Vector3(-0.6, -0.15, 0),
      new THREE.Vector3(0.6, -0.05, 0),
      new THREE.Vector3(1.7, 0.25, 0),
    ]);
    const plateGeo = new THREE.TubeGeometry(plateCurve, 40, 0.12, 16, false);

    // 2. Dual Pressurized Forefoot Zoom Air Pods
    const airPodGeo1 = new THREE.CylinderGeometry(0.24, 0.24, 0.35, 24);
    const airPodGeo2 = new THREE.CylinderGeometry(0.22, 0.22, 0.35, 24);

    // 3. Supercritical Foam Midsole Slices
    const foamShape = new THREE.Shape();
    foamShape.moveTo(-2.0, 0.1);
    foamShape.quadraticCurveTo(-2.1, -0.15, -1.8, -0.25);
    foamShape.lineTo(1.8, -0.25);
    foamShape.quadraticCurveTo(2.1, -0.1, 2.0, 0.1);
    foamShape.lineTo(-2.0, 0.1);

    const foamGeo = new THREE.ExtrudeGeometry(foamShape, {
      depth: 1.0,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.05,
      bevelThickness: 0.06,
    });
    foamGeo.center();

    // 4. Outsole Waffle Traction Layer
    const outsoleShape = new THREE.Shape();
    outsoleShape.moveTo(-2.0, 0.0);
    outsoleShape.lineTo(2.0, 0.0);
    outsoleShape.quadraticCurveTo(2.1, -0.08, 1.9, -0.15);
    outsoleShape.lineTo(-1.9, -0.15);
    outsoleShape.quadraticCurveTo(-2.1, -0.08, -2.0, 0.0);

    const outsoleGeo = new THREE.ExtrudeGeometry(outsoleShape, {
      depth: 1.02,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    outsoleGeo.center();

    // 5. Floating Speed Laces
    const laceCables: THREE.BufferGeometry[] = [];
    const lacePoints = [
      [new THREE.Vector3(-0.4, 0.6, 0.35), new THREE.Vector3(-0.2, 0.7, 0.0), new THREE.Vector3(-0.4, 0.6, -0.35)],
      [new THREE.Vector3(0.0, 0.52, 0.36), new THREE.Vector3(0.2, 0.62, 0.0), new THREE.Vector3(0.0, 0.52, -0.36)],
      [new THREE.Vector3(0.4, 0.42, 0.36), new THREE.Vector3(0.6, 0.52, 0.0), new THREE.Vector3(0.4, 0.42, -0.36)],
    ];

    lacePoints.forEach((pts) => {
      const curve = new THREE.CatmullRomCurve3(pts);
      laceCables.push(new THREE.TubeGeometry(curve, 20, 0.035, 8, false));
    });

    return { plateGeo, airPodGeo1, airPodGeo2, foamGeo, outsoleGeo, laceCables };
  }, []);

  // Speed Light Piping Curve
  const lightGeo = useMemo(() => {
    const lightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.2, 0.1, 0.75),
      new THREE.Vector3(-0.8, -0.05, 0.8),
      new THREE.Vector3(0.6, 0.05, 0.78),
      new THREE.Vector3(1.8, 0.2, 0.65),
    ]);
    return new THREE.TubeGeometry(lightCurve, 32, 0.038, 8, false);
  }, []);

  // Frame Loop for Smooth Physics & Layer Separation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isCustomOrbit) {
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        userRotation.y * 0.02,
        6,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        userRotation.x * 0.02,
        6,
        delta
      );
    }

    // Exploded Vertical Offsets
    const exp = explodeProgress;

    if (upperRef.current) {
      upperRef.current.position.y = THREE.MathUtils.damp(upperRef.current.position.y, exp * 1.6, 8, delta);
    }
    if (lacesRef.current) {
      lacesRef.current.position.y = THREE.MathUtils.damp(lacesRef.current.position.y, exp * 2.2, 8, delta);
    }
    if (plateRef.current) {
      plateRef.current.position.y = THREE.MathUtils.damp(plateRef.current.position.y, -exp * 0.4, 8, delta);
    }
    if (airPodsRef.current) {
      airPodsRef.current.position.y = THREE.MathUtils.damp(airPodsRef.current.position.y, -exp * 0.8, 8, delta);
    }
    if (midsoleRef.current) {
      midsoleRef.current.position.y = THREE.MathUtils.damp(midsoleRef.current.position.y, -exp * 1.2, 8, delta);
    }
    if (outsoleRef.current) {
      outsoleRef.current.position.y = THREE.MathUtils.damp(outsoleRef.current.position.y, -exp * 1.8, 8, delta);
    }

    // Dynamic Compression Reaction
    if (compressionAmount > 0.01) {
      const comp = compressionAmount * 0.18;
      groupRef.current.scale.y = 2.4 * (1.0 - comp);
      groupRef.current.scale.x = 2.4 * (1.0 + comp * 0.2);
      groupRef.current.scale.z = 2.4 * (1.0 + comp * 0.15);
    } else {
      groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, 2.4, 10, delta);
      groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, 2.4, 10, delta);
      groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, 2.4, 10, delta);
    }

    // Pulsing Speed Guide
    if (accentLightRef.current) {
      const mat = accentLightRef.current.material as THREE.MeshStandardMaterial;
      const pulseSpeed = energyActive ? 8 : 2.5;
      mat.emissiveIntensity = 3.5 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 1.4;
    }
  });

  return (
    <group ref={groupRef} scale={[2.4, 2.4, 2.4]} position={[0, 0.1, 0]}>
      {/* ---------------------------------------------------- */}
      {/* 1. Main Unified 3D Model (visible when unexploded)  */}
      {/* ---------------------------------------------------- */}
      <group visible={explodeProgress < 0.2}>
        <primitive object={clonedScene} />
      </group>

      {/* ---------------------------------------------------- */}
      {/* 2. Exploded 5-Layer Engineering Breakdown (Scene 3) */}
      {/* ---------------------------------------------------- */}
      {explodeProgress >= 0.15 && (
        <group name="EXPLODED_LAYERS">
          {/* Layer 1: Upper Mesh */}
          <group ref={upperRef}>
            <primitive object={clonedScene} />
          </group>

          {/* Layer 2: Floating Laces */}
          <group ref={lacesRef}>
            {explodedGeometries.laceCables.map((geo, i) => (
              <mesh key={i} geometry={geo} castShadow>
                <meshStandardMaterial color="#ffffff" roughness={0.4} />
              </mesh>
            ))}
          </group>

          {/* Layer 3: Full-Length Carbon Flyplate Blade */}
          <group ref={plateRef}>
            <mesh geometry={explodedGeometries.plateGeo} castShadow>
              <meshStandardMaterial
                color="#09090b"
                roughness={0.15}
                metalness={0.9}
                envMapIntensity={2.5}
              />
            </mesh>
          </group>

          {/* Layer 4A: Pressurized Dual Zoom Air Pods */}
          <group ref={airPodsRef}>
            <mesh geometry={explodedGeometries.airPodGeo1} position={[0.7, -0.05, 0.25]} rotation={[0, 0, Math.PI / 2]}>
              <meshPhysicalMaterial
                color={accentColorHex}
                transmission={0.85}
                roughness={0.1}
                ior={1.4}
                thickness={0.5}
                emissive={accentColorHex}
                emissiveIntensity={0.6}
              />
            </mesh>
            <mesh geometry={explodedGeometries.airPodGeo2} position={[0.7, -0.05, -0.25]} rotation={[0, 0, Math.PI / 2]}>
              <meshPhysicalMaterial
                color={accentColorHex}
                transmission={0.85}
                roughness={0.1}
                ior={1.4}
                thickness={0.5}
                emissive={accentColorHex}
                emissiveIntensity={0.6}
              />
            </mesh>
          </group>

          {/* Layer 4B: Supercritical Foam Midsole */}
          <group ref={midsoleRef}>
            <mesh geometry={explodedGeometries.foamGeo} castShadow receiveShadow>
              <meshStandardMaterial color="#f8fafc" roughness={0.5} metalness={0.05} />
            </mesh>
          </group>

          {/* Layer 5: Waffle Rubber Outsole */}
          <group ref={outsoleRef}>
            <mesh geometry={explodedGeometries.outsoleGeo} castShadow receiveShadow>
              <meshStandardMaterial color="#18181b" roughness={0.6} metalness={0.1} />
            </mesh>
          </group>
        </group>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. Glowing Neon Green Lateral Speed Light Pipe       */}
      {/* ---------------------------------------------------- */}
      <mesh ref={accentLightRef} geometry={lightGeo} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={accentColorHex}
          emissive={accentColorHex}
          emissiveIntensity={3.5}
          roughness={0.1}
          metalness={0.8}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

export const SneakerModel: React.FC<SneakerModelProps> = (props) => {
  return (
    <Suspense fallback={null}>
      <RealNikeSneakerInner {...props} />
    </Suspense>
  );
};
