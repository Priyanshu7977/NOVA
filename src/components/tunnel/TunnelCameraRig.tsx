'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface TunnelCameraRigProps {
  currentUniverseProgress: number; // continuous float (0.0 to 7.0)
  isInteracting: boolean;
  interactionProgress: number;
}

export const TunnelCameraRig: React.FC<TunnelCameraRigProps> = ({
  currentUniverseProgress,
  isInteracting,
  interactionProgress,
}) => {
  const { camera, pointer } = useThree();
  const roomDistance = 24;

  const targetPos = useRef(new THREE.Vector3(0, 0.4, 4.8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const prevProgress = useRef(currentUniverseProgress);

  useFrame((_, delta) => {
    // Calculate instantaneous velocity for dynamic flow physics
    const velocity = (currentUniverseProgress - prevProgress.current) / Math.max(0.001, delta);
    prevProgress.current = currentUniverseProgress;

    // Continuous room Z position along the spline
    const roomZ = -currentUniverseProgress * roomDistance;

    // Smooth camera distance and height interpolation
    const isIntro = currentUniverseProgress < 0.5;
    const isOutro = currentUniverseProgress > 6.5;

    let cameraDist = 5.2;
    let cameraY = 0.45;

    if (isIntro) {
      cameraDist = 6.0;
      cameraY = 0.7;
    } else if (isOutro) {
      cameraDist = 6.8;
      cameraY = 0.9;
    }

    // Dolly in slightly when user is actively interacting
    if (isInteracting) {
      cameraDist -= interactionProgress * 0.85;
    }

    // Subtle natural pointer parallax
    const parallaxX = pointer.x * 0.35;
    const parallaxY = pointer.y * 0.2;

    targetPos.current.set(
      parallaxX,
      cameraY + parallaxY,
      roomZ + cameraDist
    );

    targetLookAt.current.set(
      parallaxX * 0.25,
      0.1,
      roomZ
    );

    // Continuous buttery smooth camera translation
    camera.position.lerp(targetPos.current, 5.5 * delta);

    // Continuous lookAt dampening
    currentLookAt.current.lerp(targetLookAt.current, 5.5 * delta);
    camera.lookAt(currentLookAt.current);

    // Realistic Camera Roll Banking into Velocity
    const targetRoll = -THREE.MathUtils.clamp(velocity * 0.015, -0.08, 0.08);
    camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, targetRoll, 4, delta);
  });

  return null;
};
