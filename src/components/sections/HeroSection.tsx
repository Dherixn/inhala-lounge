"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.8,
      });

      // Title lines reveal with stagger
      const titleWords = titleRef.current?.querySelectorAll(".hero-word");
      if (titleWords) {
        gsap.set(titleWords, { y: 120, opacity: 0 });
        tl.to(titleWords, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "power4.out",
        });
      }

      // Subtitle fade in
      tl.from(
        subtitleRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 1,
        },
        "-=0.6"
      );

      // CTA scale in
      tl.from(
        ctaRef.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      );

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 12,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Parallax on scroll — push hero content up faster
      gsap.to(".hero-content", {
        yPercent: -30,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  const titleText = "INHALA LOUNGE";
  const words = titleText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center z-10 overflow-hidden"
    >
      <div className="hero-content w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-4 sm:px-6">
        {/* Decorative line */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#ffffff] to-transparent mb-8 opacity-60" />

        <h1
          ref={titleRef}
          className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[9rem] font-extralight tracking-tighter text-white leading-[1.1] mb-8 flex flex-wrap justify-center gap-x-[0.2em] w-full"
        >
          {words.map((word, i) => (
            <span key={i} className="hero-word inline-block">
              {i === words.length - 1 ? (
                <span className="text-gradient-gold font-normal">
                  {word}
                </span>
              ) : (
                word
              )}
              {i < words.length - 1 && "\u00A0"}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-white/50 font-light tracking-widest uppercase max-w-xl mb-12"
        >
          El mejor ambiente del 501 en Aguadulce. Cocktails y Shishas.
        </p>

        <a
          ref={ctaRef}
          href="#collection"
          className="group relative px-10 py-4 border border-[#ffffff]/40 text-[#ffffff] text-sm font-light tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 hover:border-[#ffffff]"
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
            Ver la Carta
          </span>
          <div className="absolute inset-0 bg-[#ffffff] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-light">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#ffffff]/50 to-transparent" />
      </div>
    </section>
  );
}
