import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    num: "01",
    title: "ROYAL WEDDINGS",
    desc: "Where timeless traditions meet modern luxury and elegance.",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80",
    x: 8,
    y: 30,
  },
  {
    num: "02",
    title: "DESTINATION WEDDINGS",
    desc: "Beautiful places. Beautiful beginnings. Celebrate love in breathtaking locations.",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80",
    x: 39,
    y: 32,
  },
  {
    num: "03",
    title: "LUXURY SOCIAL CELEBRATIONS",
    desc: "Milestones designed with elegance, sophistication, and soul.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    x: 71,
    y: 30,
  },
  {
    num: "04",
    title: "CORPORATE EXPERIENCES",
    desc: "Impactful events that inspire, connect, and elevate your brand.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
    x: 71,
    y: 70, 
  },
  {
    num: "05",
    title: "PRIVATE GATHERINGS",
    desc: "Intimate moments. Perfectly orchestrated for you and your special people.",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80",
    x: 39,
    y: 67,
  },
  {
    num: "06",
    title: "BRAND LAUNCHES",
    desc: "Launches that leave a lasting legacy and impressions that last forever.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80",
    x: 8,
    y: 70,
  },
];

const SignatureExperiences = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // The exact path data used for the ribbon
  const pathData = "M 150 350 C 350 480, 450 250, 700 370 C 950 490, 1050 250, 1250 350 C 1450 450, 1300 780, 1150 680 C 1000 580, 900 780, 700 680 C 500 580, 350 780, 150 680";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Select all 3 layers of our 3D ribbon
      const ribbons = gsap.utils.toArray(".ribbon-layer");
      // They all share the same path data, so length is identical
      const pathLength = ribbons[0].getTotalLength();

      // Reset ribbon layers and cards state
      gsap.set(ribbons, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.85,
        rotationX: 10, // Added slight 3D tilt initial state
      });

      // Pinned Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "center center",
          end: "+=4000",
        },
      });

      // Draw all layers of the ribbon simultaneously
      tl.to(
        ribbons,
        {
          strokeDashoffset: 0,
          duration: 10,
          ease: "none",
        },
        0
      );

      // Reveal cards sequentially with a 3D pop effect
      cardsRef.current.forEach((card, index) => {
        const revealTime = index * 1.8 + 0.5;

        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0, // Flattens out
            duration: 1.2,
            ease: "back.out(1.2)",
          },
          revealTime
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#FAF8F0] flex items-center justify-center font-sans pt-12 lg:pt-20 perspective-[1000px]"
    >
      {/* === PREMIUM BACKGROUND GRAPHICS === */}
      {/* 1. Soft Ambient Lighting Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-amber-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-[#C5A880]/20 rounded-full blur-[140px] pointer-events-none" />
      
      {/* 2. Luxury Dot Watermark Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#855F37_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      
      {/* 3. Vignette Edge Darkening */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.03)_100%)] pointer-events-none" />


      <div
        ref={containerRef}
        className="relative w-full max-w-[1400px] aspect-[14/9] max-h-[85vh] mx-auto origin-center flex-shrink-0 z-10"
      >
        {/* === HEADER SECTION === */}
        <div className="absolute top-0 left-[6%] z-20 pointer-events-none drop-shadow-sm">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-serif text-[#1F2937] leading-[1.1] mt-5 mb-2 lg:mb-3">
            Signature <br />
            Experiences
          </h2>
          <p className="text-xs lg:text-sm font-medium text-gray-700 max-w-[300px]">
            Curated experiences. Timeless moments. Impeccable execution.
          </p>
        </div>

        {/* === THE 3D MULTI-LAYER RIBBON SVG === */}
        <svg
          className="absolute top-0 left-0 w-full h-full z-0 overflow-visible"
          viewBox="0 0 1400 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Base Shadow Gradient */}
            <linearGradient id="ribbonShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A331C" />
              <stop offset="100%" stopColor="#2A1B0D" />
            </linearGradient>
            
            {/* Main Gold Gradient */}
            <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2D4C1" />
              <stop offset="25%" stopColor="#C5A880" />
              <stop offset="50%" stopColor="#F5E6CC" />
              <stop offset="75%" stopColor="#855F37" />
              <stop offset="100%" stopColor="#C5A880" />
            </linearGradient>

            {/* Specular Highlight Gradient */}
            <linearGradient id="lightHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* LAYER 1: Deep shadow line (creates physical thickness) */}
          <path
            d={pathData}
            stroke="url(#ribbonShadow)"
            strokeWidth="38" // Thicker than main ribbon
            strokeLinecap="round"
            className="ribbon-layer drop-shadow-[0_20px_15px_rgba(133,95,55,0.4)]"
            transform="translate(0, 4)" // Shifted down for 3D extrusion
          />

          {/* LAYER 2: Main Gold Ribbon */}
          <path
            d={pathData}
            stroke="url(#goldRibbon)"
            strokeWidth="32"
            strokeLinecap="round"
            filter="url(#glow)"
            className="ribbon-layer"
          />

          {/* LAYER 3: Specular Highlight (The shine on top of the ribbon) */}
          <path
            d={pathData}
            stroke="url(#lightHighlight)"
            strokeWidth="10"
            strokeLinecap="round"
            className="ribbon-layer mix-blend-overlay opacity-70"
            transform="translate(0, -6)" // Shifted to the top edge of the ribbon
          />
        </svg>

        {/* === THE 3D BEZEL CARDS === */}
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            // The Outer 3D Metallic Bezel and Deep Shadow
            className="absolute z-10 flex rounded-[18px] lg:rounded-[26px] shadow-[0_25px_50px_rgba(0,0,0,0.15),0_0_30px_rgba(197,139,72,0.15)] w-[24%] h-[18%]"
            style={{
              left: `${exp.x}%`,
              top: `${exp.y}%`,
              minWidth: "280px",
              minHeight: "140px",
              background: "linear-gradient(145deg, #FFF1D0 0%, #C5A880 40%, #855F37 100%)", // Metallic frame
              padding: "2px", // Thickness of the gold frame
            }}
          >
            {/* The Inner Card Canvas */}
            <div className="relative w-full h-full flex bg-white rounded-[16px] lg:rounded-[24px] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.05)]">
              
              {/* Card Image Left */}
              <div className="w-[45%] h-full relative">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover shadow-[inset_-10px_0_20px_rgba(0,0,0,0.1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              </div>

              {/* Card Content Right */}
              <div className="w-[55%] p-3 lg:p-5 flex flex-col justify-center relative bg-gradient-to-br from-white to-[#FDFBF7]">
                <span className="text-[#C58B48] font-serif text-xl lg:text-2xl mb-0.5 lg:mb-1 drop-shadow-sm">
                  {exp.num}
                </span>
                <h3 className="font-serif text-[10px] lg:text-sm font-semibold text-gray-900 mb-1 lg:mb-2 leading-tight uppercase">
                  {exp.title}
                </h3>
                <p className="text-[8px] lg:text-[10px] text-gray-600 leading-relaxed font-sans mb-3 lg:mb-4">
                  {exp.desc}
                </p>

                {/* Arrow Button */}
                <button className="absolute bottom-3 left-4 w-5 h-5 lg:w-6 lg:h-6 rounded-full border border-[#C58B48] shadow-sm flex items-center justify-center text-[#C58B48] hover:bg-[#C58B48] hover:text-white transition-all hover:scale-110">
                  <ArrowRight size={10} className="lg:w-3 lg:h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Bottom Text */}
        <div className="absolute -bottom-[2%] w-full text-center z-20">
          <p className="text-[8px] lg:text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-500 drop-shadow-sm">
            Experiences Designed. Memories Crafted. Legacies Created.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignatureExperiences;