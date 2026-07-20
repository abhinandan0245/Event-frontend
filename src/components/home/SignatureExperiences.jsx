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
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80",
    x: 8,
    y: 30,
  },
  {
    num: "02",
    title: "DESTINATION WEDDINGS",
    desc: "Beautiful places. Beautiful beginnings. Celebrate love in breathtaking locations.",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80",
    x: 39,
    y: 32,
  },
  {
    num: "03",
    title: "LUXURY SOCIAL CELEBRATIONS",
    desc: "Milestones designed with elegance, sophistication, and soul.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    x: 71,
    y: 30,
  },
  {
    num: "04",
    title: "CORPORATE EXPERIENCES",
    desc: "Impactful events that inspire, connect, and elevate your brand.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
    x: 71,
    y: 70,
  },
  {
    num: "05",
    title: "PRIVATE GATHERINGS",
    desc: "Intimate moments. Perfectly orchestrated for you and your special people.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80",
    x: 39,
    y: 67,
  },
  {
    num: "06",
    title: "BRAND LAUNCHES",
    desc: "Launches that leave a lasting legacy and impressions that last forever.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80",
    x: 8,
    y: 70,
  },
];

const SignatureExperiences = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);

  const pathData =
    "M 150 350 C 350 480, 450 250, 700 370 C 950 490, 1050 250, 1250 350 C 1450 450, 1300 780, 1150 680 C 1000 580, 900 780, 700 680 C 500 580, 350 780, 150 680";

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // ==========================================
      // DESKTOP ANIMATION (lg screens and up)
      // ==========================================
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

      // ==========================================
      // MOBILE ANIMATION (below lg screens)
      // ==========================================
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
      className="relative w-full min-h-screen overflow-hidden bg-[#FAF8F0] flex flex-col lg:flex-row items-center justify-center font-sans pt-12 lg:pt-20 perspective-[1000px]"
    >
      {/* === PREMIUM BACKGROUND GRAPHICS === */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-amber-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bg-[#C5A880]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#855F37_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.03)_100%)] pointer-events-none" />

      {/* ============================================================== */}
      {/* 1. DESKTOP VIEW */}
      {/* ============================================================== */}
      <div
        ref={containerRef}
        className="hidden lg:block relative w-full max-w-[1400px] aspect-[14/9] max-h-[85vh] mx-auto origin-center flex-shrink-0 z-10"
      >
        <div className="absolute top-0 left-[6%] z-20 pointer-events-none drop-shadow-sm">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-serif text-[#1F2937] leading-[1.1] mt-5 mb-2 lg:mb-3">
            Signature <br />
            Experiences
          </h2>
          <p className="text-xs lg:text-sm font-medium text-gray-700 max-w-[300px]">
            Curated experiences. Timeless moments. Impeccable execution.
          </p>
        </div>

        {/* CHANGED: z-index set to z-0 so it stays securely behind the cards */}
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
            className="absolute z-10 flex rounded-[18px] lg:rounded-[26px] shadow-[0_30px_60px_rgba(0,0,0,0.18),0_0_30px_rgba(197,139,72,0.15)] w-[24%] h-[18%]"
            style={{
              left: `${exp.x}%`,
              top: `${exp.y}%`,
              minWidth: "280px",
              minHeight: "140px",
              background:
                "linear-gradient(145deg, #FFF1D0 0%, #C5A880 40%, #855F37 100%)",
              padding: "2px",
            }}
          >
            <div className="relative w-full h-full flex bg-white rounded-[16px] lg:rounded-[24px] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.05)]">
              <div className="w-[45%] h-full relative">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover shadow-[inset_-10px_0_20px_rgba(0,0,0,0.1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              </div>
              <div className="w-[55%] p-3 lg:p-5 flex flex-col justify-center relative bg-gradient-to-br from-white to-[#FDFBF7]">
                <span className="text-[#C58B48] font-serif text-xl lg:text-2xl mb-0.5 lg:mb-1 drop-shadow-sm">
                  {exp.num}
                </span>
                <h3 className="font-serif text-[10px] lg:text-sm font-semibold text-gray-900 mb-1 lg:mb-2 leading-tight uppercase relative z-20">
                  {exp.title}
                </h3>
                <p className="text-[8px] lg:text-[10px] text-gray-600 leading-relaxed font-sans mb-3 lg:mb-4 relative z-20">
                  {exp.desc}
                </p>
                <button className="absolute bottom-3 left-4 w-5 h-5 lg:w-6 lg:h-6 rounded-full border border-[#C58B48] shadow-sm flex items-center justify-center text-[#C58B48] hover:bg-[#C58B48] hover:text-white transition-all hover:scale-110 relative z-20">
                  <ArrowRight size={10} className="lg:w-3 lg:h-3" />
                </button>
              </div>
            </div>
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

          <div className="flex flex-col gap-10">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                ref={(el) => (mobileCardsRef.current[idx] = el)}
                className="relative flex flex-col rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] w-full"
                style={{
                  background:
                    "linear-gradient(145deg, #FFF1D0 0%, #C5A880 40%, #855F37 100%)",
                  padding: "2px",
                }}
              >
                <div className="absolute top-1/2 -left-8 -translate-y-1/2 w-3 h-3 bg-[#C58B48] rounded-full border-2 border-[#FAF8F0] shadow-md z-20" />

                <div className="relative w-full h-full flex flex-col sm:flex-row bg-white rounded-[18px] overflow-hidden">
                  <div className="w-full sm:w-[40%] h-[160px] sm:h-auto relative">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="w-full sm:w-[60%] p-5 flex flex-col justify-center relative bg-[#FDFBF7]">
                    <span className="text-[#C58B48] font-serif text-2xl mb-1">
                      {exp.num}
                    </span>
                    <h3 className="font-serif text-sm font-semibold text-gray-900 mb-2 leading-tight uppercase">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans mb-4">
                      {exp.desc}
                    </p>
                    <button className="w-8 h-8 rounded-full border border-[#C58B48] flex items-center justify-center text-[#C58B48] hover:bg-[#C58B48] hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
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
