"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState, mouseState } from "@/stores/scrollStore";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
    });

    // Sync Lenis scroll events with ScrollTrigger
    lenis.on("scroll", (e: { velocity: number; direction: number; progress: number }) => {
      ScrollTrigger.update();
      scrollState.speed = Math.abs(e.velocity) * 0.01;
      scrollState.direction = e.direction;
    });

    // Drive Lenis from GSAP's ticker for unified animation loop
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Update scroll progress based on document height
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollState.progress = docHeight > 0 ? scrollTop / docHeight : 0;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseState.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseState.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseState.clientX = e.clientX;
      mouseState.clientY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <>{children}</>;
}
