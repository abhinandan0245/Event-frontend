import { useRef } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  // const guitarRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      // 1. Background Ken Burns Zoom
      tl.fromTo(
        bgRef.current,
        {
          scale: 1.12,
        },
        {
          scale: 1,
          duration: 2.2,
          ease: "power3.out",
        },
        0,
      );

      // 2. Guitar Entrance
      // tl.from(
      //   guitarRef.current,
      //   {
      //     opacity: 0,
      //     scale: 0.75,
      //     y: 80,
      //     rotate: -8,
      //     duration: 1.5,
      //     ease: "power3.out",
      //   },
      //   0.3,
      // );

      // 3. Badge Reveal
      tl.from(
        ".hero-badge",
        {
          y: -30,
          opacity: 0,
          duration: 0.8,
        },
        0.2,
      );
      tl.fromTo(
        ".hero-badge-text",
        {
          text: "", // Start with nothing
        },
        {
          text: "Curators Of Timeless Experiences", // Type this out
          duration: 1.5, // How long the typing takes
          ease: "none", // Constant speed for a robotic typing feel
        },
        "-=0.4", // Start typing slightly before the badge fully fades in
      );

      // 4. Heading Word Reveal
      tl.from(
        ".hero-word",
        {
          y: 80,
          opacity: 0,
          rotateX: 30,
          stagger: 0.12,
          duration: 1.2,
        },
        0.3,
      );

      // Add this to your timeline
      // tl.to(".hero-word", {
      //   duration: 2,
      //   text: "Moments Of Distinction", // The text you want to animate
      //   ease: "none",
      // });

      // 5. Subtext
      tl.from(
        ".hero-sub",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6",
      );

      // 6. Description
      tl.from(
        ".hero-desc",
        {
          y: 25,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5",
      );

      // 7. Buttons
      tl.from(
        ".hero-btn",
        {
          y: 20,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
        },
        "-=0.4",
      );

      // 8. Guitar Floating Animation
      // gsap.to(guitarRef.current, {
      //   y: -18,
      //   rotate: 2,
      //   scale: 1.025,
      //   duration: 3,
      //   ease: "sine.inOut",
      //   repeat: -1,
      //   yoyo: true,
      // });

      // 9. Hero Content Scroll Fade
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

      // 10. Background Parallax
      gsap.to(bgRef.current, {
        y: 120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 11. Guitar Scroll Parallax
      // gsap.to(guitarRef.current, {
      //   y: 180,
      //   scale: 0.92,
      //   scrollTrigger: {
      //     trigger: sectionRef.current,
      //     start: "top top",
      //     end: "bottom top",
      //     scrub: true,
      //   },
      // });
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ backgroundColor: "#FAF9F5" }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div ref={bgRef} className="absolute inset-0 h-full w-full">
          {/* Desktop Background */}
          <img
            src="/assets/herodesktop.png"
            alt="Luxury Event Celebration"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
          />

          {/* Mobile Background */}
          <img
            src="/assets/heromobile.png"
            alt="Luxury Event Celebration"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 block h-full w-full object-cover object-center md:hidden"
          />
        </div>

        {/* Luxury Overlays */}
        <div className="absolute inset-0 bg-[#FAF9F5]/40 mix-blend-overlay" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-transparent to-transparent" />

        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#FAF9F5]/90 via-[#FAF9F5]/40 to-transparent lg:block" />

        <div className="absolute inset-0 block bg-gradient-to-b from-[#FAF9F5]/60 via-[#FAF9F5]/20 to-[#FAF9F5] lg:hidden" />
      </div>

      {/* GUITAR FOREGROUND */}
      {/* <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
        <img
          ref={guitarRef}
          src="/assets/gitar.png"
          alt="Golden Guitar"
          className="
            absolute
            w-[230px]
            object-contain
            drop-shadow-[0_25px_35px_rgba(90,55,10,0.35)]
            sm:w-[280px]
            md:w-[330px]
            lg:w-[390px]
            xl:w-[440px]
          "
        />
      </div> */}

      {/* CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="hero-inner max-w-full lg:pt-24  text-center sm:max-w-xl lg:max-w-2xl lg:py-0 lg:text-left">
          {/* Badge */}
          <div className="hero-badge mb-2 inline-block">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800 shadow-sm backdrop-blur-md sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-700" />

              <span className="font-montserrat hero-badge-text text-[10px] font-semibold uppercase text-[#A57A4B] tracking-[0.2em]  sm:text-xs">
                Curators Of Timeless Experiences
              </span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="space-y-1" style={{ perspective: "1000px" }}>
            <span className="block overflow-hidden">
              {/* Added mr-3 md:mr-4 lg:mr-6 here for responsive spacing */}
              <span className="hero-word inline-block font-playfair text-4xl font-light leading-none tracking-tight text-[#171717] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mr-3 md:mr-4 lg:mr-6">
                Moments
              </span>

              <span className="text-[#171717] font-cormorant italic text-4xl sm:text-5xl md:text-5xl lg:text-7xl xl:text-8xl leading-none tracking-tight">
                Of
              </span>
            </span>

            <span className="block overflow-hidden">
              <span className="hero-word inline-block font-cormorant italic text-4xl font-normal leading-none tracking-tight text-[#B5793F] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                Distinction
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="hero-desc mx-auto mt-6 max-w-lg font-manrope regular text-xs font-light leading-relaxed tracking-wide text-[#5B5B5B] sm:text-sm md:text-base lg:mx-0">
            We design and orchestrate refined celebrations with meticulous
            detail and a personal touch, creating experiences that are as unique
            as the people who celebrate them.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <div className="hero-btn">
              <Button
                variant="primary"
                size="md"
                shape="leaf"
                className="w-full rounded-[3px] sm:w-auto"
              >
                <span className="font-Manrope SemiBold text-[11px] tracking-[0.18em] uppercase sm:text-xs">
                  BEGIN YOUR JOURNEY
                </span>

                <ChevronRight size={14} className="stroke-[2.5]" />
              </Button>
            </div>

            <div className="hero-btn">
              <Button
                variant="secondary"
                size="md"
                shape="leaf"
                className="w-full rounded-[3px] bg-white/80 text-[#D8C7B3] backdrop-blur-md sm:w-auto font-Manrope Medium text-[11px] tracking-[0.18em] uppercase sm:text-xs"
              >
                EXPLORE PORTFOLIO
              </Button>
            </div>
          </div>
        </div>

        {/* BOTTOM FEATURES */}
        <div className="hero-features mt-4 grid grid-cols-2 gap-y-8 border-t border-neutral-300/60 pt-8 lg:mt-6 lg:grid-cols-4 lg:gap-0">
          {/* Feature 1 */}
          <div className="border-neutral-300/60 px-4 text-center first:pl-0 lg:border-r lg:text-left">
            <h3 className="font-Manrope SemiBold text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-800 sm:text-xs">
              Bespoke Planning
            </h3>

            <p className="mt-2 font-manrope regular text-[11px] font-light tracking-wide text-neutral-500 sm:text-xs">
              Tailored to your vision
            </p>
          </div>

          {/* Feature 2 */}
          <div className="border-neutral-300/60 px-4 text-center lg:border-r lg:text-left">
            <h3 className="font-Manrope SemiBold text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-800 sm:text-xs">
              Exclusive Venues
            </h3>

            <p className="mt-2 font-manrope regular text-[11px] font-light tracking-wide text-neutral-500 sm:text-xs">
              Handpicked with care
            </p>
          </div>

          {/* Feature 3 */}
          <div className="border-neutral-300/60 px-4 text-center lg:border-r lg:text-left">
            <h3 className="font-Manrope SemiBold text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-800 sm:text-xs">
              Design & Detail
            </h3>

            <p className="mt-2 font-manrope regular text-[11px] font-light tracking-wide text-neutral-500 sm:text-xs">
              Curated to perfection
            </p>
          </div>

          {/* Feature 4 */}
          <div className="px-4 text-center lg:text-left">
            <h3 className="font-Manrope SemiBold text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-800 sm:text-xs">
              Flawless Execution
            </h3>

            <p className="mt-2 font-manrope regular text-[11px] font-light tracking-wide text-neutral-500 sm:text-xs">
              Delivered with precision
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
