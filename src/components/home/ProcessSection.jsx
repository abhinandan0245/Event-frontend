import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  Palette,
  Calendar,
  PartyPopper,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    description: "Immersive consultations to capture your unique persona, spatial requirements, and design dream.",
    icon: Compass,
  },
  {
    number: "02",
    title: "DESIGN",
    description: "Architectural blueprints, sensory moodboards, and fully curated spatial customized rendering designs.",
    icon: Palette,
  },
  {
    number: "03",
    title: "PLAN",
    description: "Meticulous structural coordination, global vendor logistics, and precision timeline budgeting.",
    icon: Calendar,
  },
  {
    number: "04",
    title: "EXECUTE",
    description: "Flawless on-site direction where production blueprints transform into breathtaking physical spaces.",
    icon: PartyPopper,
  },
  {
    number: "05",
    title: "CELEBRATE",
    description: "Step into an uncompromised parallel reality. An unforgettable moment tailored exclusively for you.",
    icon: Sparkles,
  },
];

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const pointsRef = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // 1. Path Drawing Animation on Scroll (GSAP)
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      
      // Initial state of SVG path
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Animate stroke as we scroll down
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 1.5,
        },
      });
    }

    // 2. Animate nodes (Points) staggered reveal
    pointsRef.current.forEach((point, i) => {
      if (!point) return;
      gsap.fromTo(
        point,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: point,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden text-neutral-800"
      style={{
        backgroundColor: "#FAF9F5", // Elegant warm canvas white
        paddingTop: "7rem",
        paddingBottom: "8rem",
      }}
    >
      {/* Dynamic Blurred Lighting Orbs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-rose-50/40 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <span className="text-amber-800 tracking-[0.35em] font-medium text-xs uppercase block mb-3">
            METHODOLOGY
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-neutral-900 leading-tight">
            Thoughtfully Crafted, <br />
            <span className="italic font-normal text-amber-700">Perfectly Planned</span>
          </h2>
          <div className="w-12 h-[1px] bg-amber-700/40 mx-auto mt-6" />
        </div>

        {/* ─── GRAPHIC FLOW SYSTEM ─── */}
        <div className="relative w-full min-h-[420px] hidden lg:block">
          
          {/* Continuous Elegant SVG Connecting Path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            viewBox="0 0 1200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background static faint guide path */}
            <path
              d="M 50,100 C 150,100 200,50 300,50 C 400,50 450,150 550,150 C 650,150 700,50 800,50 C 900,50 950,100 1150,100"
              stroke="rgba(180, 140, 80, 0.12)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Active drawing path on scroll */}
            <path
              ref={pathRef}
              d="M 50,100 C 150,100 200,50 300,50 C 400,50 450,150 550,150 C 650,150 700,50 800,50 C 900,50 950,100 1150,100"
              stroke="url(#luxury-gold-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="luxury-gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#855F37" />
                <stop offset="50%" stopColor="#C5A880" />
                <stop offset="100%" stopColor="#E2D4C1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Points & Absolute Floating Details Positioning */}
          <div className="absolute inset-0 z-10 flex justify-between px-12">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              
              // Coordinates mapping roughly to the path shape curves
              const topOffsets = ["top-[100px]", "top-[50px]", "top-[150px]", "top-[50px]", "top-[100px]"];
              const hoverTheme = activeStep === idx ? "border-amber-700 bg-amber-800 text-white scale-110 shadow-lg shadow-amber-900/10" : "border-amber-900/20 bg-[#FAF9F5] text-amber-900";

              return (
                <div
                  key={idx}
                  ref={(el) => (pointsRef.current[idx] = el)}
                  className={`absolute w-[220px] -translate-x-1/2 flex flex-col items-center text-center ${topOffsets[idx]}`}
                  style={{
                    left: `${10 + idx * 20}%`, // Distribute across timeline width evenly
                  }}
                  onMouseEnter={() => setActiveStep(idx)}
                >
                  {/* Step Interactive Floating Node Button */}
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-500 z-20 ${hoverTheme}`}
                  >
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>

                  {/* Information Overlay floating smoothly on relative layers */}
                  <div className="mt-6 flex flex-col items-center">
                    <span className="text-[10px] font-semibold tracking-widest text-amber-800/40 mb-1">
                      PHASE {step.number}
                    </span>
                    <h3 className="text-xs font-semibold tracking-[0.2em] text-neutral-900 mb-2 uppercase">
                      {step.title}
                    </h3>
                    <p className="text-[11px] leading-relaxed text-neutral-500 font-light max-w-[170px] transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── MOBILE VIEW STYLING (Fall back to a beautiful Vertical Line) ─── */}
        <div className="relative pl-10 md:pl-16 block lg:hidden">
          
          {/* Vertical Connecting line */}
          <div className="absolute left-[14px] md:left-[17px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-800 via-amber-200 to-transparent" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative mb-14 last:mb-0 flex gap-6 items-start">
                {/* Node Dot marker */}
                <div className="absolute -left-[10px] md:-left-[13px] w-5 h-5 rounded-full bg-amber-800 border-4 border-[#FAF9F5] flex items-center justify-center shadow-md" />
                
                <div className="w-10 h-10 rounded-xl bg-amber-950/5 text-amber-800 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <span className="text-[9px] font-semibold tracking-wider text-amber-800/50 block mb-0.5">
                    PHASE {step.number}
                  </span>
                  <h3 className="text-xs font-semibold tracking-widest text-neutral-900 uppercase mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Redirect Call-to-Action Redirect Button */}
        <div className="text-center mt-20">
          <Link to="/portfolio" className="inline-block">
            <button className="group relative px-9 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 border border-neutral-300 hover:border-amber-700 hover:bg-neutral-900 hover:text-white shadow-sm transition-all duration-500">
              <span className="flex items-center gap-2.5">
                View Our Portfolio
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;