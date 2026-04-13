"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Line grow
      gsap.from(".footer-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Content fade up
      gsap.from(".footer-content > *", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // CTA text shimmer
      gsap.to(".footer-cta-text", {
        backgroundPosition: "200% center",
        duration: 3,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      id="contacto"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full bg-transparent overflow-hidden flex flex-col items-center"
    >
      <div className="footer-line w-full max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-[#ffffff]/30 to-transparent mb-16 origin-center" />

      <div className="footer-content w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Big CTA */}
        <span className="text-[#ffffff] text-xs tracking-[0.5em] uppercase font-light block mb-6">
          Visítanos en Aguadulce
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-extralight text-white tracking-tight mb-8">
          ¿Listo para{" "}
          <span
            className="footer-cta-text italic"
            style={{
              background:
                "linear-gradient(90deg, #ffffff, #d4d4d4, #a3a3a3, #ffffff)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Desconectar
          </span>
          ?
        </h2>
        <p className="text-white/40 font-light text-base sm:text-lg max-w-md mx-auto mb-12 tracking-wide">
          Reserva tu mesa mandando un mensaje por Instagram o visítanos en Roquetas de Mar, Almería. ¡Te esperamos!
        </p>

        <a
          href="https://instagram.com/Inhala501aguadulce"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-sm tracking-[0.25em] uppercase text-[#ffffff] border border-[#ffffff]/30 px-8 py-4 hover:bg-[#ffffff]/10 transition-all duration-500"
        >
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            Reservar por Instagram
          </span>
          <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </a>

        {/* Social links */}
        <div className="flex items-center justify-center gap-8 mt-16">
          {["Instagram", "Twitter", "LinkedIn"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-xs tracking-[0.2em] uppercase text-white/25 hover:text-[#ffffff] transition-colors duration-300 font-light"
            >
              {social}
            </a>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.04]">
          <p className="text-[11px] text-white/15 tracking-widest uppercase font-light mb-2">
            Inhala Shisha & Lounge | 04720 Roquetas de Mar, Almería | Tel: 601 00 08 91
          </p>
          <p className="text-[11px] text-white/15 tracking-widest uppercase font-light">
            © 2026 INHALA. All rights reserved. Vente al 501.
          </p>
        </div>
      </div>
    </footer>
  );
}
