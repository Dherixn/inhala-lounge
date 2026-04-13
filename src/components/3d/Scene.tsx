"use client";

import { Canvas } from "@react-three/fiber";
import HeroShaderPlane from "./HeroShaderPlane";
import SmokeParticles from "./SmokeParticles";
import PostProcessingPipeline from "./PostProcessingPipeline";

export default function Scene() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 2.5], fov: 75 }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "auto" }}
      >
        <HeroShaderPlane />
        <SmokeParticles />
        <PostProcessingPipeline />
      </Canvas>
    </div>
  );
}
