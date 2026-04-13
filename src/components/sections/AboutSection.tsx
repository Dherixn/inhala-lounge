"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 110, suffix: "+", label: "Reseñas 5 Estrellas" },
  { value: 50, suffix: "+", label: "Sabores Mixtos" },
  { value: 100, suffix: "%", label: "Local Climatizado" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Word-by-word text reveal
      const words = document.querySelectorAll(".about-word");
      gsap.from(words, {
        opacity: 0.08,
        stagger: 0.04,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-text-block",
          start: "top 75%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      // Stats counter animation
      document.querySelectorAll(".stat-number").forEach((el) => {
        const target = parseInt(el.getAttribute("data-value") || "0", 10);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toString();
          },
        });
      });

      // Stats cards stagger
      gsap.from(".stat-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Decorative lines animation
      gsap.from(".about-deco-line", {
        scaleY: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Section label slide in
      gsap.from(".about-label", {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  // Refresh ScrollTrigger when layout changes (e.g., fonts loaded)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => ScrollTrigger.refresh(), 100);
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    // Also trigger on window load specifically for font rendering
    window.addEventListener("load", () => ScrollTrigger.refresh());
    return () => {
      observer.disconnect();
      window.removeEventListener("load", () => ScrollTrigger.refresh());
      clearTimeout(timeoutId);
    };
  }, []);

  const aboutText =
    "En Inhala no solo preparamos cachimbas, creamos experiencias. Un ritual al lado de la playa de Aguadulce donde la calidad del servicio, los detalles y el buen rollo son lo más importante. Descubre una amplia carta de cócteles y las mejores shishas.";
  const aboutWords = aboutText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top section: Title and Description */}
        <div className="mb-24 flex flex-col items-center">
          <div className="about-deco-line w-px h-16 bg-gradient-to-b from-[#d4a853] to-transparent origin-top mb-8" />
          
          <div className="about-label flex flex-col items-center">
            <span className="text-[#d4a853] text-xs tracking-[0.5em] uppercase font-light block mb-4">
              Nuestra Filosofía
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white tracking-tight mb-10">
              El Arte de <span className="italic font-normal text-gradient-gold">Fumar</span>
            </h2>
          </div>

          <p className="about-text text-lg sm:text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-3xl text-center text-balance flex flex-wrap justify-center gap-x-[0.25em] gap-y-2">
            {aboutWords.map((word, i) => (
              <span key={i} className="about-word inline-block">
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid flex flex-wrap justify-center items-center gap-12 sm:gap-20 w-full">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card flex flex-col items-center text-center">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-normal mb-2 flex items-center">
                <span className="stat-number tabular-nums text-gradient-gold" data-value={stat.value}>0</span>
                <span className="text-gradient-gold ml-1">{stat.suffix}</span>
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-white/40 font-light">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
