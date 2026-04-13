"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: "cazoletas",
    name: "Cazoletas Premium",
    tagline: "Las mejores marcas",
    price: "Top",
    color: "#1a1a2e",
    accent: "#ffffff",
    description: "Trabajamos con tabaco rubio y negro. Déjate aconsejar en marcas y mixturas exóticas por nuestro maestro cachimbero.",
  },
  {
    id: "cocteles",
    name: "Cócteles y Batidos",
    tagline: "Sabor Insuperable",
    price: "Top",
    color: "#1c1c1c",
    accent: "#a3a3a3",
    description: "Desde opciones refrescantes hasta nuestro increíble Bombón Batido con una decoración espectacular para tus meriendas.",
  },
  {
    id: "terraza",
    name: "La Terraza del 501",
    tagline: "A Pie de Playa",
    price: "Top",
    color: "#0f0f1a",
    accent: "#cccccc",
    description: "Sofás cómodos, ambiente relajado, calor moderado en la terraza y musiquita agradable sin estridencias para conversar fácilmente.",
  },
  {
    id: "detalles",
    name: "Detalles que Suman",
    tagline: "Servicio de 10",
    price: "Top",
    color: "#1a150d",
    accent: "#ffffff",
    description: "Cambiamos los carbones y la purga proactivamente para que tu experiencia sea perfecta, extensa y libre de picores.",
  },
];

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Title reveal
      gsap.from(".showcase-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Horizontal scroll pinning - fixed to evaluate dynamically
      const container = containerRef.current;
      if (!container) return;

      const getScrollAmount = () => {
        let scrollWidth = container.scrollWidth;
        return -(scrollWidth - window.innerWidth);
      };

      gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true, // Crucial for dynamic sizing on resize
        },
      });

      // Each product card parallax & entry
      gsap.utils.toArray<HTMLElement>(".product-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.8,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });

        // Hover animations
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.02, duration: 0.4, ease: "power2.out" });
          gsap.to(card.querySelector(".product-line"), {
            scaleX: 1,
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.to(card.querySelector(".product-cta"), {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });

          // Custom visual animations based on ID
          const artId = card.getAttribute("data-art");
          if (artId === "cazoletas") {
            gsap.to(card.querySelectorAll(".smoke-path"), {
              y: -10,
              opacity: 1,
              stagger: 0.2,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          } else if (artId === "cocteles") {
            gsap.to(card.querySelectorAll(".cocktail-bubble"), {
              y: -20, opacity: 1, duration: 1.5, repeat: -1, stagger: 0.3, ease: "power1.out"
            });
            gsap.to(card.querySelector(".cocktail-liquid"), {
              rotate: 3, yoyo: true, repeat: -1, duration: 0.6, ease: "sine.inOut"
            });
          } else if (artId === "terraza") {
            gsap.to(card.querySelector(".terraza-sun"), {
              y: 5, scale: 1.1, duration: 2, yoyo: true, repeat: -1, ease: "sine.inOut"
            });
          } else if (artId === "detalles") {
            gsap.to(card.querySelector(".detalles-coal"), {
              scale: 1.05, duration: 1, yoyo: true, repeat: -1, ease: "sine.inOut"
            });
            gsap.to(card.querySelectorAll(".coal-spark"), {
              y: -8, opacity: 1, duration: 1.2, repeat: -1, stagger: 0.2, ease: "power1.out"
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(card.querySelector(".product-line"), {
            scaleX: 0,
            duration: 0.4,
            ease: "power2.in",
          });
          gsap.to(card.querySelector(".product-cta"), {
            opacity: 0,
            y: 10,
            duration: 0.3,
            ease: "power2.in",
          });

          gsap.killTweensOf(card.querySelectorAll(".smoke-path, .cocktail-bubble, .cocktail-liquid, .terraza-sun, .detalles-coal, .coal-spark"));
          gsap.to(card.querySelectorAll(".smoke-path, .cocktail-bubble, .cocktail-liquid, .terraza-sun, .detalles-coal, .coal-spark"), {
            clearProps: "all"
          });
        });
      });
    },
    { scope: sectionRef }
  );

  // Refresh ScrollTrigger when layout changes
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => ScrollTrigger.refresh(), 100);
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  const renderArt = (id: string, accent: string) => {
    switch (id) {
      case "cazoletas":
        return (
          <div className="relative flex items-center justify-center w-full h-40">
            <svg className="art-item w-20 h-20 drop-shadow-2xl" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: "visible" }}>
              <path className="caz-base" d="M9 20h6v2H9z" />
              <path className="caz-stem" d="M11 12v8M13 12v8" />
              <path className="caz-bowl" d="M7 6h10l-1 6H8z" />
              <path className="caz-top" d="M8 6V4a2 2 0 0 1 8 0v2" />
              {/* Smoke lines */}
              <path className="smoke-path opacity-0" d="M10 2s-2-2-1-4 2-2 1-4" />
              <path className="smoke-path opacity-0" d="M14 2s2-2 1-4-2-2-1-4" />
            </svg>
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 pointer-events-none" />
          </div>
        );
      case "cocteles":
        return (
          <div className="relative flex items-center justify-center w-full h-40">
            <svg className="art-item w-20 h-20 drop-shadow-2xl" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: "visible" }}>
              <path d="M22 3H2l10 10v8" />
              <path d="M8 21h8" />
              <path className="cocktail-liquid origin-bottom" d="M6.5 7.5h11" />
              <circle className="cocktail-bubble opacity-0" cx="12" cy="7" r="1.5" />
              <circle className="cocktail-bubble opacity-0" cx="14" cy="5" r="1" />
            </svg>
          </div>
        );
      case "terraza":
        return (
          <div className="relative flex items-center justify-center w-full h-40">
            <svg className="art-item w-24 h-24 drop-shadow-2xl" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: "visible" }}>
              <circle className="terraza-sun origin-bottom" cx="12" cy="12" r="5" fill={`${accent}1A`} />
              <path d="M2 16h20" />
              <path className="wave-1" d="M4 19h16" />
              <path className="wave-2" d="M7 22h10" />
            </svg>
          </div>
        );
      case "detalles":
        return (
          <div className="relative flex items-center justify-center w-full h-40">
            <svg className="art-item w-20 h-20 drop-shadow-2xl detalles-coal" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: "visible" }}>
              {/* Isometric Coal Cube */}
              <path d="M12 10 L18 13 L12 16 L6 13 Z" fill={`${accent}1A`} />
              <path d="M18 13 L18 19 L12 22 L12 16 Z" />
              <path d="M6 13 L6 19 L12 22 L12 16 Z" />
              
              {/* Heat Sparks */}
              <path className="coal-spark opacity-0" d="M12 7 L12 4" />
              <path className="coal-spark opacity-0" d="M8 9 L7 6" />
              <path className="coal-spark opacity-0" d="M16 9 L17 6" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section ref={sectionRef} id="experiencia" className="relative z-10 w-full overflow-hidden pb-0 flex flex-col items-center">
      {/* Title block centered properly */}
      <div className="showcase-title relative w-full text-center flex flex-col items-center pt-24 z-20 pointer-events-none">
        <span className="text-[#ffffff] text-xs tracking-[0.5em] uppercase font-light block mb-3">
          Nuestra Carta
        </span>
        <h2 className="text-3xl sm:text-4xl font-extralight text-white tracking-tight">
          La Excelencia
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div className="w-full flex justify-start items-center relative overflow-visible">
        <div
          ref={containerRef}
          className="flex items-center gap-16 min-h-[80vh] pt-12 md:pt-0 will-change-transform"
          style={{
            paddingLeft: "calc(50vw - 160px)", // 320px width / 2
            paddingRight: "calc(50vw - 160px)",
            width: "fit-content"
          }}
        >
          {products.map((product, i) => (
            <div
              key={product.name}
              data-art={product.id}
              className="product-card relative flex-shrink-0 w-[300px] sm:w-[320px] h-[460px] sm:h-[480px] rounded object-cover border border-white/[0.04] bg-[#050505]/60 backdrop-blur-md overflow-hidden cursor-pointer"
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-60 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${product.accent}33, transparent 80%)`,
                }}
              />

              {/* Product number */}
              <span className="absolute top-6 left-1/2 -translate-x-1/2 text-7xl font-extralight text-white/[0.02]">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 z-10 w-full items-center text-center">
                {/* Dynamically Rendered SVG/CSS Art */}
                <div className="flex-1 flex items-center justify-center pb-6">
                  {renderArt(product.id, product.accent)}
                </div>

                {/* Accent line */}
                <div
                  className="product-line h-px w-12 mb-6 scale-x-0"
                  style={{ background: product.accent }}
                />

                <span
                  className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3 opacity-90 transition-colors duration-300"
                  style={{ color: product.accent }}
                >
                  {product.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-white tracking-wide mb-4 transition-transform duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-6 font-light">
                  {product.description}
                </p>

                <div className="flex flex-col items-center justify-end mt-auto gap-2">
                  <span className="text-sm font-light text-white/70">
                    {product.price}
                  </span>
                  <span
                    className="product-cta text-[10px] tracking-widest uppercase opacity-0 translate-y-[10px] font-medium"
                    style={{ color: product.accent }}
                  >
                    Descubrir →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
