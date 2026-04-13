"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ProductShowcase from "@/components/sections/ProductShowcase";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/sections/Footer";

// Dynamic import for 3D Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import("@/components/3d/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* 3D Canvas — lives behind all content */}
      <Scene />

      {/* DOM content — layered on top of canvas */}
      <main className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <ProductShowcase />
        <AboutSection />
        <Footer />
      </main>
    </>
  );
}
