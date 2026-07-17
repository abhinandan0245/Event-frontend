import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Globe, MapPin, Heart, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  {
    number: 10,
    label: "YEARS OF EXPERIENCE",
    suffix: "+",
    icon: Award,
  },
  {
    number: 500,
    label: "GLOBAL CELEBRATIONS",
    suffix: "+",
    icon: Globe,
  },
  {
    number: 20,
    label: "ICONIC DESTINATIONS",
    suffix: "+",
    icon: MapPin,
  },
  {
    number: 100,
    label: "CLIENT SATISFACTION",
    suffix: "%",
  },
];

const StatsSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Array states to safely track updated counters independent of DOM string mutators
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    // 1. Core structural reveal stagger animation
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power4.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 2. High-performance GSAP synchronized numerical count increments
    const targets = statsData.map((d) => d.number);
    const contextObject = { val0: 0, val1: 0, val2: 0, val3: 0 };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(contextObject, {
          val0: targets[0],
          val1: targets[1],
          val2: targets[2],
          val3: targets[3],
          duration: 2.2,
          ease: "power3.out",
          onUpdate: () => {
            setCounts([
              Math.floor(contextObject.val0),
              Math.floor(contextObject.val1),
              Math.floor(contextObject.val2),
              Math.floor(contextObject.val3),
            ]);
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden text-neutral-800"
      style={{
        backgroundColor: "#FAF9F5", // Dynamic warm light museum canvas tone
        paddingTop: "7rem",
        paddingBottom: "8rem",
      }}
    >
      {/* ─── BACKGROUND DECORATIVE GRID MASKS ─── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute rounded-full"
          style={{
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "700px",
            background: "radial-gradient(circle, rgba(245,238,220,0.45) 0%, rgba(245,238,220,0) 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Fine horizontal dividing rules */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-amber-900/15 to-transparent" />
      </div>

      {/* ─────────────────────────────────────── */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header Title layout */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <span className="text-amber-800 tracking-[0.35em] font-medium text-xs uppercase block mb-3 inline-flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-amber-700" /> INSTITUTIONAL MILESTONES
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-neutral-900 leading-tight">
            Redefining Luxury Weddings <br />
            <span className="italic font-normal text-amber-700">& Celebrations</span>
          </h2>
          <div className="w-12 h-[1px] bg-amber-700/40 mx-auto mt-6" />
        </div>

        {/* 3D Cylinder Matrix Grid Panel */}
        <div 
          ref={containerRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          style={{ perspective: "1600px" }}
        >
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            const isHovered = hoveredIndex === index;

            // Compute spatial 3D rotate strings safely using localized metrics
            const transformRotate = isHovered 
              ? `rotateY(${mousePos.x * 20}deg) rotateX(${-mousePos.y * 20}deg) scale(1.02)` 
              : "rotateY(0deg) rotateX(0deg) scale(1)";

            // Alternating layouts across grid structures
            const shapeClass = index % 2 === 0 ? "h-[365px]" : "h-[335px] lg:translate-y-4";

            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                className={`group relative rounded-full border border-neutral-200/60 bg-white/45 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-between p-8 text-center ${shapeClass}`}
                style={{
                  transform: transformRotate,
                  transformStyle: "preserve-3d",
                  backdropFilter: "blur(12px)",
                  transition: isHovered ? "none" : "transform 0.5s ease-out, shadow 0.5s ease",
                }}
              >
                {/* 1. Glare Reflection mapping */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{
                    background: isHovered 
                      ? `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)` 
                      : "none",
                  }}
                />

                {/* UPPER COMPONENT: Milestone Icon wrapper */}
                <div 
                  className="mt-4"
                  style={{
                    transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {IconComponent ? (
                    <div className="w-12 h-12 rounded-full bg-amber-950/5 text-amber-800 flex items-center justify-center shadow-inner transition-all duration-500 group-hover:bg-amber-800 group-hover:text-white">
                      <IconComponent className="w-5 h-5 stroke-[1.25]" />
                    </div>
                  ) : (
                    // Fallback visual token marker for rows with alternate schemas
                    <div className="text-amber-800/40 text-xs tracking-widest font-serif italic">✨</div>
                  )}
                </div>

                {/* CENTRAL COMPONENT: Metric Value presentation block */}
                <div 
                  style={{
                    transform: isHovered ? "translateZ(60px)" : "translateZ(0px)",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.02s",
                  }}
                >
                  <div className="text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 font-sans font-semibold">
                    {counts[index]}
                    <span className="text-amber-700 ml-0.5 font-normal">{stat.suffix}</span>
                  </div>
                </div>

                {/* LOWER COMPONENT: Explanatory text labels */}
                <div 
                  className="mb-6 px-3"
                  style={{
                    transform: isHovered ? "translateZ(35px)" : "translateZ(0px)",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.05s",
                  }}
                >
                  <div className="text-[10px] tracking-[0.2em] font-medium text-neutral-500 uppercase leading-relaxed">
                    {stat.label}
                  </div>
                </div>

                {/* Outer Golden Cap Framing Rim line */}
                <div
                  className={`absolute inset-0 rounded-full border-2 transition-all duration-700 pointer-events-none z-20 ${
                    isHovered ? "border-amber-700/30" : "border-transparent"
                  }`}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;