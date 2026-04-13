"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/stores/scrollStore";

const PARTICLE_COUNT = 400;

export default function SmokeParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const { positions, velocities, opacities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const opacities = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Spread particles in a wide areas
      positions[i3] = (Math.random() - 0.5) * 6;
      positions[i3 + 1] = (Math.random() - 0.5) * 6;
      positions[i3 + 2] = (Math.random() - 0.5) * 3 - 0.5;

      // Gentle upward drift for smoke effect
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = Math.random() * 0.003 + 0.001;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

      opacities[i] = Math.random();
    }

    return { positions, velocities, opacities };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Drift upward with sinusoidal sway
      posArr[i3] += velocities[i3] + Math.sin(time * 0.5 + i) * 0.0005;
      posArr[i3 + 1] += velocities[i3 + 1];
      posArr[i3 + 2] += velocities[i3 + 2];

      // Scroll influence: push particles sideway
      posArr[i3] += scrollState.speed * 0.005 * scrollState.direction;

      // Reset particles that drift too far
      if (posArr[i3 + 1] > 3.5) {
        posArr[i3] = (Math.random() - 0.5) * 6;
        posArr[i3 + 1] = -3.5;
        posArr[i3 + 2] = (Math.random() - 0.5) * 3 - 0.5;
      }
    }

    posAttr.needsUpdate = true;

    // Fade particles with scroll progress
    if (materialRef.current) {
      materialRef.current.opacity = 0.15 - scrollState.progress * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
