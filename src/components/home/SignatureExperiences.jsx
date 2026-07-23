import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CalendarDays,
  Flower2,
  ConciergeBell,
  Music,
  Car,
  Star,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// === CUSTOM 4-POINT STAR ===
const ElegantSparkle = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
  </svg>
);

// === DATA ARRAY (Y COORDINATES SHIFTED UP) ===
const experiences = [
  {
    num: "01",
    title: "DESTINATION WEDDING PLANNING",
    desc: "End-to-end destination wedding planning across India's most exclusive venues. From concept, timelines and budgeting to vendor management and flawless execution — we handle it all.",
    icon: CalendarDays,
    x: 8,
    y: 12, // Moved up from 25
  },
  {
    num: "02",
    title: "WEDDING DESIGN & LUXURY DECOR",
    desc: "Bespoke themes, exquisite décor, floral artistry and immersive design that transform your vision into a breathtaking celebration crafted with creativity and perfection.",
    icon: Flower2,
    x: 39,
    y: 16, // Moved up from 28
  },
  {
    num: "03",
    title: "GUEST HOSPITALITY & EXPERIENCE",
    desc: "VIP guest handling, accommodation, concierge services, travel coordination and personalized hospitality that make every guest feel truly special.",
    icon: ConciergeBell,
    x: 71,
    y: 12, // Moved up from 25
  },
  {
    num: "04",
    title: "ENTERTAINMENT & PRODUCTION",
    desc: "Celebrity artists, live performances, sound engineering, lighting design and stage production that create electrifying memories and unforgettable moments.",
    icon: Music,
    x: 71,
    y: 48, // Moved up from 65
  },
  {
    num: "05",
    title: "LOGISTICS & TRANSPORTATION",
    desc: "Seamless transportation, airport transfers, vendor logistics and guest movement management ensuring a smooth and stress-free celebration.",
    icon: Car,
    x: 39,
    y: 52, // Moved up from 68
  },
  {
    num: "06",
    title: "BEYOND SERVICES & SPECIAL EXPERIENCES",
    desc: "Curated experiences, surprise moments, premium gifting and bespoke services that go beyond expectations and create lifelong memories.",
    icon: Star,
    x: 8,
    y: 48, // Moved up from 65
  },
];

// === EXACT MATCH CARD COMPONENT ===
const ExperienceCard = ({ exp }) => {
  return (
    <div className="relative w-full h-full flex flex-col pt-8 group">
      {/* 1. SVG Background for the exact Arch Shape & Golden Glow */}
      <div className="absolute inset-0 top-8 drop-shadow-[0_12px_24px_rgba(200,165,110,0.15)] transition-all duration-500 group-hover:drop-shadow-[0_15px_30px_rgba(200,165,110,0.3)]">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8E5B9" />
              <stop offset="40%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9C7722" />
            </linearGradient>
            <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FCF9F2" />
            </linearGradient>
          </defs>
          <path
            d="M 0.5 15 C 20 15, 32 0.5, 50 0.5 C 68 0.5, 80 15, 99.5 15 L 99.5 99.5 L 0.5 99.5 Z"
            fill="url(#cardBg)"
            stroke="url(#goldBorder)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* 2. Floating Circular Icon */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-[52px] h-[52px] lg:w-[60px] lg:h-[60px] bg-white rounded-full flex items-center justify-center border border-[#D4AF37] shadow-[0_4px_10px_rgba(212,175,55,0.2)]">
          <exp.icon
            className="w-5 h-5 lg:w-6 lg:h-6 text-[#A67C27]"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* 3. Card Content (Padding tightened to ensure button visibility) */}
      <div className="relative z-10 flex flex-col h-full w-full px-5 lg:px-8 pt-8 lg:pt-10 pb-5 lg:pb-6">
        {/* Large Faint Number on the Right */}
        <div className="absolute top-4 right-6 text-6xl lg:text-7xl font-serif italic text-[#C5A880]/15 select-none pointer-events-none">
          {exp.num}
        </div>

        {/* Left-Aligned Title with Sparkle */}
        <div className="flex items-start gap-2 lg:gap-3 mt-2 lg:mt-4 relative z-20 pr-12">
          <ElegantSparkle className="w-3 h-3 lg:w-4 lg:h-4 text-[#C5A880] mt-1 shrink-0" />
          <h3 className="font-serif text-[11px] lg:text-[13px] font-semibold tracking-[0.1em] text-[#332D27] uppercase text-left leading-snug">
            {exp.title}
          </h3>
        </div>

        {/* Left-Aligned Description */}
        <p className="text-left text-[10px] lg:text-[11px] text-gray-500 font-sans leading-[1.7] mt-3 mb-6 relative z-20 pr-2">
          {exp.desc}
        </p>

        {/* Centered Button at Bottom */}
        <div className="mt-auto flex justify-center items-center gap-2 text-[9px] lg:text-[10px] font-bold tracking-widest uppercase text-[#B8860B] cursor-pointer hover:text-amber-900 transition-colors relative z-20 w-full">
          EXPLORE SERVICE{" "}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
};

// === MAIN SECTION COMPONENT ===
const SignatureExperiences = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);

  // Y-Coordinates of the ribbon path shifted UP by ~150px to perfectly match the new card positions
  const pathData =
    "M 150 200 C 350 330, 450 100, 700 220 C 950 340, 1050 100, 1250 200 C 1450 300, 1300 630, 1150 530 C 1000 430, 900 630, 700 530 C 500 430, 350 630, 150 530";

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // DESKTOP ANIMATION
      mm.add("(min-width: 1024px)", () => {
        const ribbons = gsap.utils.toArray(".ribbon-layer");
        const pathLength = ribbons[0].getTotalLength();

        gsap.set(ribbons, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.set(cardsRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.85,
          rotationX: 10,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "center center",
            end: "+=4000",
          },
        });

        tl.to(ribbons, { strokeDashoffset: 0, duration: 10, ease: "none" }, 0);

        cardsRef.current.forEach((card, index) => {
          const revealTime = index * 1.8 + 0.5;
          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: 1.2,
              ease: "back.out(1.2)",
            },
            revealTime,
          );
        });
      });

      // MOBILE ANIMATION
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          ".mobile-line-draw",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".mobile-timeline-container",
              start: "top 60%",
              end: "bottom 90%",
              scrub: true,
            },
          },
        );

        mobileCardsRef.current.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: 30, y: 30 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#FDFBF7] flex flex-col lg:flex-row items-center justify-center font-sans pt-12 lg:pt-16 perspective-[1000px]"
    >
      {/* PREMIUM BACKGROUND GRAPHICS */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-amber-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.02)_100%)] pointer-events-none" />

      {/* ============================================================== */}
      {/* 1. DESKTOP VIEW */}
      {/* ============================================================== */}
      <div
        ref={containerRef}
        className="hidden lg:block relative w-full max-w-[1400px] aspect-[14/9] max-h-[85vh] mx-auto origin-center flex-shrink-0 z-10"
      >
        {/* Header shifted up slightly to accommodate the raised cards */}
        <div className="absolute top-0 left-[6%] -mt-4 lg:-mt-2 z-20 pointer-events-none drop-shadow-sm">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-serif text-[#1F2937] leading-[1.1] mb-2 lg:mb-3">
            Signature <br />
            Experiences
          </h2>
          <p className="text-xs lg:text-sm font-medium text-gray-700 max-w-[300px]">
            Curated experiences. Timeless moments. Impeccable execution.
          </p>
        </div>

        <svg
          className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-visible"
          viewBox="0 0 1400 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="ribbonShadow"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#4A331C" />
              <stop offset="100%" stopColor="#2A1B0D" />
            </linearGradient>
            <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2D4C1" />
              <stop offset="25%" stopColor="#C5A880" />
              <stop offset="50%" stopColor="#F5E6CC" />
              <stop offset="75%" stopColor="#855F37" />
              <stop offset="100%" stopColor="#C5A880" />
            </linearGradient>
            <linearGradient
              id="lightHighlight"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path
            d={pathData}
            stroke="url(#ribbonShadow)"
            strokeWidth="38"
            strokeLinecap="round"
            className="ribbon-layer drop-shadow-[0_25px_20px_rgba(133,95,55,0.6)]"
            transform="translate(0, 4)"
          />
          <path
            d={pathData}
            stroke="url(#goldRibbon)"
            strokeWidth="32"
            strokeLinecap="round"
            filter="url(#glow)"
            className="ribbon-layer"
          />
          <path
            d={pathData}
            stroke="url(#lightHighlight)"
            strokeWidth="10"
            strokeLinecap="round"
            className="ribbon-layer mix-blend-overlay opacity-70"
            transform="translate(0, -6)"
          />
        </svg>

        {experiences.map((exp, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="absolute z-10 flex w-[26%] h-auto min-h-[220px]"
            style={{
              left: `${exp.x}%`,
              top: `${exp.y}%`,
              minWidth: "300px",
            }}
          >
            <ExperienceCard exp={exp} />
          </div>
        ))}

        <div className="absolute -bottom-[2%] w-full text-center z-20">
          <p className="text-[8px] lg:text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-500 drop-shadow-sm">
            Experiences Designed. Memories Crafted. Legacies Created.
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. MOBILE VIEW */}
      {/* ============================================================== */}
      <div className="block lg:hidden relative w-full px-5 py-10 z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-serif text-[#1F2937] leading-[1.1] mb-3">
            Signature <br /> Experiences
          </h2>
          <p className="text-xs font-medium text-gray-700 max-w-[280px] mx-auto">
            Curated experiences. Timeless moments. Impeccable execution.
          </p>
        </div>

        <div className="mobile-timeline-container relative max-w-[400px] mx-auto pl-8">
          <div className="absolute top-4 bottom-4 left-3 w-1 bg-amber-900/10 rounded-full" />
          <div className="mobile-line-draw absolute top-4 bottom-4 left-3 w-1 bg-gradient-to-b from-[#C5A880] to-[#855F37] rounded-full origin-top" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                ref={(el) => (mobileCardsRef.current[idx] = el)}
                className="relative w-full"
              >
                <div className="absolute top-1/2 -left-[2.1rem] -translate-y-1/2 w-[14px] h-[14px] bg-[#C58B48] rounded-full border-[3px] border-[#FDFBF7] shadow-sm z-30" />
                <ExperienceCard exp={exp} />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full text-center mt-12">
          <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-gray-500 max-w-[200px] mx-auto drop-shadow-sm">
            Experiences Designed. Memories Crafted. Legacies Created.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignatureExperiences;
