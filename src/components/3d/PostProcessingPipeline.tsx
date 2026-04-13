"use client";

import {
  EffectComposer,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { scrollState } from "@/stores/scrollStore";
import * as THREE from "three";

export default function PostProcessingPipeline() {
  const chromaticRef = useRef<{ offset: THREE.Vector2 }>(null);

  useFrame(() => {
    if (!chromaticRef.current) return;
    // Dynamic chromatic aberration based on scroll speed
    const speed = Math.min(scrollState.speed, 1);
    const baseOffset = 0.0008;
    const dynamicOffset = baseOffset + speed * 0.003;
    chromaticRef.current.offset = new THREE.Vector2(dynamicOffset, dynamicOffset);
  });

  return (
    <EffectComposer multisampling={0}>
      <ChromaticAberration
        ref={chromaticRef as unknown as any}
        offset={new THREE.Vector2(0.0008, 0.0008)}
        radialModulation={false}
        modulationOffset={0.0}
      />
      <Noise
        opacity={0.06}
        blendFunction={BlendFunction.SCREEN}
      />
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={1.2}
      />
    </EffectComposer>
  );
}
