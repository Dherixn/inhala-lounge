"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Navbar slides down on load
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      // Logo shimmer effect on hover via timeline
      const logoTl = gsap.timeline({ paused: true });
      logoTl.to(".nav-logo-text", {
        backgroundPosition: "200% center",
        duration: 0.8,
        ease: "power2.inOut",
      });

      const logo = logoRef.current;
      if (logo) {
        logo.addEventListener("mouseenter", () => logoTl.play());
        logo.addEventListener("mouseleave", () => logoTl.reverse());
      }

      // Hide navbar on scroll down, show on scroll up
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === -1) {
            gsap.to(navRef.current, {
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          } else if (self.progress > 0.05) {
            gsap.to(navRef.current, {
              y: -100,
              duration: 0.4,
              ease: "power2.in",
            });
          }
        },
      });
    },
    { scope: navRef }
  );

  const navLinks = ["Experiencia", "Nosotros", "Contacto"];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 mix-blend-difference"
    >
      <div ref={logoRef} className="cursor-pointer">
        <span
          className="nav-logo-text text-xl font-light tracking-[0.3em] uppercase text-white"
          style={{
            background:
              "linear-gradient(90deg, #fff 0%, #ffffff 50%, #fff 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          INHALA
        </span>
      </div>

      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link, i) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="nav-link relative text-sm font-light tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {link}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#ffffff] transition-all duration-500 hover:w-full" />
          </a>
        ))}
      </div>

      <a
        href="#contacto"
        className="text-sm font-light tracking-widest uppercase text-[#ffffff] border border-[#ffffff]/30 px-5 py-2 hover:bg-[#ffffff]/10 transition-all duration-300"
      >
        Reservar
      </a>
    </nav>
  );
}
