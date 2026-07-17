import { useRef } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Smooth Background Ken Burns Zoom (1.12 -> 1.0)
      tl.fromTo(
        bgRef.current,
        { scale: 1.12 },
        { scale: 1, duration: 2.2, ease: "power3.out" },
        0
      );

      // 2. Premium Light Badge Reveal
      tl.from(".hero-badge", { y: -30, opacity: 0, duration: 0.8 }, 0.2);

      // 3. Editorial Typography Word Rows Stagger
      tl.from(
        ".hero-word",
        {
          y: 80,
          opacity: 0,
          rotateX: 30,
          stagger: 0.12,
          duration: 1.2,
        },
        0.3
      );

      // 4. Subtext Row Entry
      tl.from(".hero-sub", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6");

      // 5. Main Content Description
      tl.from(".hero-desc", { y: 25, opacity: 0, duration: 0.8 }, "-=0.5");

      // 6. Luxury Capsule Buttons Reveal
      tl.from(
        ".hero-btn",
        {
          y: 20,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
        },
        "-=0.4"
      );

      // 7. Scroll-Driven Structural Content Fade-Out
      gsap.to(".hero-inner", {
        opacity: 0,
        y: -50,
        scale: 0.98,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 60%",
          scrub: true,
        },
      });

      // 8. Fluid Media Parallax Offset
      gsap.to(bgRef.current, {
        y: 120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen sm:min-h-[100svh] lg:min-h-screen items-center overflow-hidden"
      style={{ backgroundColor: "#FAF9F5" }} // Signature warm alabaster canvas
    >
      {/* ─── PREMIUM LAYERED BACKGROUND MEDIA ─── */}
      <div className="absolute inset-0 z-0">
        <div ref={bgRef} className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80"
            alt="Luxury Wedding Celebration"
            loading="eager"
            fetchPriority="high"
            className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
          />
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80"
            alt="Luxury Wedding Celebration"
            loading="eager"
            fetchPriority="high"
            className="block md:hidden absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* Crystalline Luxury Light Overlay Layers */}
        <div className="absolute inset-0 bg-[#FAF9F5]/45 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-transparent to-transparent" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#FAF9F5]/90 via-[#FAF9F5]/40 to-transparent" />
        <div className="absolute inset-0 block lg:hidden bg-gradient-to-b from-[#FAF9F5]/60 via-[#FAF9F5]/20 to-[#FAF9F5]" />
      </div>

      {/* ─── CONTENT CANVAS LAYER ─── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="hero-inner max-w-full sm:max-w-xl lg:max-w-2xl text-center lg:text-left pt-24 pb-16 lg:py-0">
          
          {/* Minimalist Floating Badge */}
          <div className="hero-badge mb-6 inline-block">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 backdrop-blur-md px-4 py-2 text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-amber-800 uppercase shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-700" />
              <span>Celebrating Perfect Moments</span>
            </span>
          </div>

          {/* Heading — Structural Word Masks */}
          <h1 className="space-y-1" style={{ perspective: "1000px" }}>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light leading-none tracking-tight text-neutral-900">
                Extraordinary
              </span>
            </span>

            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-amber-700 font-serif italic font-normal leading-none tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                Weddings
              </span>
            </span>

            <span className="hero-sub mt-4 block text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-[0.15em] uppercase text-neutral-500">
              in Incredible India
            </span>
          </h1>

          {/* Description */}
          <p className="hero-desc mt-6 max-w-lg mx-auto lg:mx-0 text-xs sm:text-sm md:text-base font-light leading-relaxed tracking-wide text-neutral-600">
            From majestic royal historic palaces to serene coastlines, we design immersive 
            wedding architectures that are as unique as your love story.
          </p>

          {/* Unified Architectural Pill Buttons Row */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <div className="hero-btn">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              >
                <span>Plan Your Celebration</span>
                <ChevronRight size={14} className="stroke-[2.5]" />
              </Button>
            </div>

            <div className="hero-btn">
              <Button
                variant="secondary"
                size="md"
                className="w-full sm:w-auto bg-white/80 backdrop-blur-md"
              >
                Our Story
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;