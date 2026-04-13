"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: "◇",
    title: "Variedad de Sabores",
    description:
      "Las mejores mezclas de rubio y negro. Nuestro cachimbero te aconsejará la combinación perfecta para una fumada duradera.",
    number: "01",
  },
  {
    icon: "◈",
    title: "Cocktails & Crepes",
    description:
      "Acompaña tu shisha con nuestra amplia carta de bebidas premium, fantásticos cócteles y nuestros espectaculares bombón batido.",
    number: "02",
  },
  {
    icon: "◆",
    title: "El Mejor Ambiente",
    description:
      "Ubicados a pie de playa en el 501 de Aguadulce. Un espacio cuidado, música ideal y un trato 100% personalizado.",
    number: "03",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Section title reveal
      gsap.from(".features-title", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Cards stagger entrance
      gsap.from(".feature-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Horizontal line grows on scroll
      gsap.from(".features-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Each card icon rotates on hover via GSAP
      document.querySelectorAll(".feature-card").forEach((card) => {
        const icon = card.querySelector(".feature-icon");
        const line = card.querySelector(".feature-accent-line");

        card.addEventListener("mouseenter", () => {
          gsap.to(icon, { rotate: 180, scale: 1.2, duration: 0.6, ease: "power2.out" });
          gsap.to(line, { scaleX: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(card, { y: -8, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(icon, { rotate: 0, scale: 1, duration: 0.6, ease: "power2.out" });
          gsap.to(line, { scaleX: 0, duration: 0.4, ease: "power2.out" });
          gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out" });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full min-h-screen flex flex-col justify-center items-center"
    >
      {/* Horizontal line */}
      <div className="features-line w-full max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-[#ffffff]/30 to-transparent mb-16 origin-left" />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <div className="features-title text-center mb-20 flex flex-col items-center w-full">
          <span className="text-[#d4a853] text-xs tracking-[0.5em] uppercase font-light block mb-4">
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white tracking-tight">
            Experiencia <span className="italic font-normal text-gradient-gold">Inhala</span>
          </h2>
        </div>

        <div className="features-grid w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 justify-center items-center">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="feature-card flex flex-col items-center text-center group relative p-8 sm:p-10 border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm cursor-pointer w-full"
            >
              {/* Number */}
              <span className="absolute top-6 right-6 text-xs font-mono tracking-widest text-gradient-gold opacity-30 group-hover:opacity-60 transition-opacity">
                {feature.number}
              </span>

              {/* Icon */}
              <div className="feature-icon text-3xl text-[#ffffff] mb-6">
                {feature.icon}
              </div>

              {/* Accent line */}
              <div className="feature-accent-line h-px w-12 bg-[#ffffff] mb-6 origin-center scale-x-0" />

              <h3 className="text-lg font-light text-white tracking-wide mb-4">
                {feature.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
