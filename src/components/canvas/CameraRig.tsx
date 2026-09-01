'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperience } from '@/context/ExperienceContext';

interface Keyframe {
  pos: [number, number, number];
  lookAt: [number, number, number];
  shoeRot: [number, number, number];
  shoePos: [number, number, number];
}

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const { scrollProgress, reducedMotion } = useExperience();

  // Mouse parallax state
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Defined camera keyframes across the 8 scenes of Act 01
  const getKeyframes = (p: number): { current: Keyframe; next: Keyframe; t: number } => {
    const stops: { p: number; kf: Keyframe }[] = [
      // SCENE 01: THE REVEAL (Hero 3/4 floating pose matching reference image)
      {
        p: 0.0,
        kf: {
          pos: [1.2, 0.6, 6.2],
          lookAt: [0.1, 0.1, 0.0],
          shoeRot: [0.15, 0.45, -0.05],
          shoePos: [0.3, 0.05, 0.0],
        },
      },
      // SCENE 02: PRECISION UPPER (Macro close-up on woven mesh, laces, eyelets)
      {
        p: 0.18,
        kf: {
          pos: [0.6, 0.8, 2.5],
          lookAt: [0.3, 0.5, 0.2],
          shoeRot: [0.22, 1.25, 0.08],
          shoePos: [-0.1, -0.15, 0.0],
        },
      },
      // SCENE 03: EXPLODED VIEW (Pulls back, angles up to view 7 separated layers)
      {
        p: 0.32,
        kf: {
          pos: [3.2, 1.4, 5.8],
          lookAt: [0.0, 0.0, 0.0],
          shoeRot: [0.12, 1.95, 0.0],
          shoePos: [0.0, 0.0, 0.0],
        },
      },
      // SCENE 04: ENTER THE CORE (Flies down between layers into midsole lattice)
      {
        p: 0.44,
        kf: {
          pos: [0.15, 0.05, 1.7],
          lookAt: [0.0, -0.05, 0.0],
          shoeRot: [0.02, 2.7, 0.0],
          shoePos: [0.0, 0.0, 0.0],
        },
      },
      // SCENE 05: THE ENERGY SYSTEM (Side profile framing dynamic compression & rebound)
      {
        p: 0.56,
        kf: {
          pos: [-1.8, 0.3, 4.2],
          lookAt: [0.0, -0.1, 0.0],
          shoeRot: [0.08, 3.35, 0.04],
          shoePos: [0.0, 0.0, 0.0],
        },
      },
      // SCENE 06: REASSEMBLY (Pulls backward as layers smoothly lock together)
      {
        p: 0.68,
        kf: {
          pos: [-0.5, 0.9, 5.2],
          lookAt: [0.2, 0.1, 0.0],
          shoeRot: [0.06, 4.35, -0.04],
          shoePos: [0.1, 0.0, 0.0],
        },
      },
      // SCENE 07: MOTION (Tracks alongside shoe down abstract futuristic running track)
      {
        p: 0.82,
        kf: {
          pos: [2.4, -0.2, 4.5],
          lookAt: [0.0, 0.2, 0.0],
          shoeRot: [-0.08, 5.2, 0.1],
          shoePos: [0.0, 0.1, 0.0],
        },
      },
      // SCENE 08: FINAL REVEAL (Motion stops, shoe centers, clean luxury hero pose)
      {
        p: 0.94,
        kf: {
          pos: [0.0, 0.5, 5.4],
          lookAt: [0.0, 0.0, 0.0],
          shoeRot: [0.08, 6.28, 0.0],
          shoePos: [0.0, 0.0, 0.0],
        },
      },
      {
        p: 1.0,
        kf: {
          pos: [0.0, 0.5, 5.4],
          lookAt: [0.0, 0.0, 0.0],
          shoeRot: [0.08, 6.28, 0.0],
          shoePos: [0.0, 0.0, 0.0],
        },
      },
    ];

    // Find bounding stops
    for (let i = 0; i < stops.length - 1; i++) {
      if (p >= stops[i].p && p <= stops[i + 1].p) {
        const segLen = stops[i + 1].p - stops[i].p;
        const localT = (p - stops[i].p) / segLen;
        // Smooth cubic easing
        const smoothT = localT * localT * (3 - 2 * localT);
        return { current: stops[i].kf, next: stops[i + 1].kf, t: smoothT };
      }
    }

    return { current: stops[0].kf, next: stops[1].kf, t: 0 };
  };

  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Parallax damping
    mouseRef.current.x = THREE.MathUtils.damp(mouseRef.current.x, mouseRef.current.targetX, 4, delta);
    mouseRef.current.y = THREE.MathUtils.damp(mouseRef.current.y, mouseRef.current.targetY, 4, delta);

    const parallaxMultiplier = reducedMotion ? 0 : 0.35;
    const px = mouseRef.current.x * parallaxMultiplier;
    const py = mouseRef.current.y * parallaxMultiplier;

    const { current, next, t } = getKeyframes(scrollProgress);

    // Interpolate target camera position
    const targetCamX = THREE.MathUtils.lerp(current.pos[0], next.pos[0], t) + px;
    const targetCamY = THREE.MathUtils.lerp(current.pos[1], next.pos[1], t) + py;
    const targetCamZ = THREE.MathUtils.lerp(current.pos[2], next.pos[2], t);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 6, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 6, delta);

    // Interpolate target lookAt
    const targetLookX = THREE.MathUtils.lerp(current.lookAt[0], next.lookAt[0], t);
    const targetLookY = THREE.MathUtils.lerp(current.lookAt[1], next.lookAt[1], t);
    const targetLookZ = THREE.MathUtils.lerp(current.lookAt[2], next.lookAt[2], t);

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookX, 6, delta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookY, 6, delta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookZ, 6, delta);

    camera.lookAt(currentLookAt.current);

    // Sneaker transform group handling
    const sneakerGroup = state.scene.getObjectByName('NOVA_X_SNEAKER_HERO');
    if (sneakerGroup) {
      const targetRotX = THREE.MathUtils.lerp(current.shoeRot[0], next.shoeRot[0], t);
      const targetRotY = THREE.MathUtils.lerp(current.shoeRot[1], next.shoeRot[1], t);
      const targetRotZ = THREE.MathUtils.lerp(current.shoeRot[2], next.shoeRot[2], t);

      sneakerGroup.rotation.x = THREE.MathUtils.damp(sneakerGroup.rotation.x, targetRotX, 6, delta);
      sneakerGroup.rotation.y = THREE.MathUtils.damp(sneakerGroup.rotation.y, targetRotY, 6, delta);
      sneakerGroup.rotation.z = THREE.MathUtils.damp(sneakerGroup.rotation.z, targetRotZ, 6, delta);

      const targetPosX = THREE.MathUtils.lerp(current.shoePos[0], next.shoePos[0], t);
      const targetPosY = THREE.MathUtils.lerp(current.shoePos[1], next.shoePos[1], t);
      const targetPosZ = THREE.MathUtils.lerp(current.shoePos[2], next.shoePos[2], t);

      sneakerGroup.position.x = THREE.MathUtils.damp(sneakerGroup.position.x, targetPosX, 6, delta);
      sneakerGroup.position.y = THREE.MathUtils.damp(sneakerGroup.position.y, targetPosY, 6, delta);
      sneakerGroup.position.z = THREE.MathUtils.damp(sneakerGroup.position.z, targetPosZ, 6, delta);
    }
  });

  return null;
};
