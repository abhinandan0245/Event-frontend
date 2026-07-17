import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  Palette,
  Users,
  Music,
  Truck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import SectionTitle from "../ui/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    icon: Calendar,
    title: "PLANNING & MANAGEMENT",
    description:
      "End-to-end wedding planning with meticulous attention to every logistical and structural detail.",
  },
  {
    id: 2,
    icon: Palette,
    title: "DESIGN & DECOR",
    description:
      "Stunning sensory decor landscapes that transform heritage venues into absolute dream settings.",
  },
  {
    id: 3,
    icon: Users,
    title: "HOSPITALITY & GUEST EXPERIENCE",
    description:
      "Impeccable white-glove hospitality ensuring your guests feel truly celebrated throughout the experience.",
  },
  {
    id: 4,
    icon: Music,
    title: "ENTERTAINMENT & PRODUCTION",
    description:
      "Curated global entertainment acts and high-fidelity production setups that captivate your audience.",
  },
  {
    id: 5,
    icon: Truck,
    title: "LOGISTICS & TRANSPORT",
    description:
      "Seamless, stress-free fleet coordination and transit management for your distinguished attendees.",
  },
  {
    id: 6,
    icon: Sparkles,
    title: "BEYOND SERVICES",
    description:
      "Going above and beyond to personalize custom requests and resolve unexpected complexities gracefully.",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Filter out empty entries from refs array
    const validCards = cardsRef.current.filter(Boolean);

    // ─── STICT ONE-BY-ONE SCROLL TIMELINE REVEAL ───
    if (validCards.length > 0) {
      gsap.fromTo(
        validCards,
        {
          opacity: 0,
          y: 90,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: {
            amount: 0.8, // Total time distributed across all elements during scroll
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%", // Triggers when the top of the grid hits the screen bottom
            end: "bottom 40%", // Concludes smoothly as cards transition fully into screen space
            scrub: 1.5, // Smooth lag catch-up that forces cards to load exactly on scroll progression
          },
        },
      );
    }

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
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#FAF9F5",
        paddingTop: "7rem",
        paddingBottom: "9rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle
          subtitle="END-TO-END SOLUTIONS"
          title="Comprehensive Services For Your Perfect Day"
          description="From conceptual blueprints to flawless execution, we curate every detail."
          subtitleColor="text-amber-800 tracking-[0.35em] font-medium text-xs uppercase"
          className="text-center mb-24"
        />

        {/* 3D Perspective Grid Matrix */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-10"
          style={{ perspective: "1500px" }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isHovered = hoveredIndex === index;

            // Interactive 3D Perspective Rotation Math Matrix
            const transformRotate = isHovered
              ? `rotateY(${mousePos.x * 18}deg) rotateX(${-mousePos.y * 18}deg) scale(1.02)`
              : "rotateY(0deg) rotateX(0deg) scale(1)";

            const heightClass = index % 2 === 0 ? "h-[450px]" : "h-[410px]";
            const offsetClass =
              index % 3 === 1
                ? "lg:translate-y-4"
                : index % 3 === 2
                  ? "lg:translate-y-8"
                  : "";

            return (
              <motion.div
                key={service.id}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                // ─── FRAMER MOTION SMOOTH HARDWARE INVERSION ───
                animate={{
                  backgroundColor: isHovered
                    ? "#1C1917"
                    : "rgba(255, 255, 255, 0.6)", // Transparent paper to deep obsidian black
                  borderColor: isHovered
                    ? "#78350F"
                    : "rgba(229, 231, 235, 0.5)", // Highlights with premium amber gold on hover
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-full border flex flex-col items-center text-center justify-between p-8 lg:p-10 cursor-pointer shadow-md ${heightClass} ${offsetClass}`}
                style={{
                  transform: transformRotate,
                  transformStyle: "preserve-3d",
                  backdropFilter: "blur(12px)",
                  transition: isHovered
                    ? "none"
                    : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), shadow 0.6s ease",
                }}
              >
                {/* Dynamic Glass Specular Light Glare Overlay Map */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{
                    background: isHovered
                      ? `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60%)`
                      : "none",
                  }}
                />

                {/* UPPER DECK: Counter and Capsule Icon */}
                <div
                  className="flex flex-col items-center select-none pointer-events-none"
                  style={{
                    transform: isHovered
                      ? "translateZ(50px)"
                      : "translateZ(0px)",
                    transition: "transform 0.4s ease-out",
                  }}
                >
                  {/* Dynamic Color text logic synchronized via the parent group hover states */}
                  <span className="font-serif italic text-4xl text-amber-900/10 mb-4 block group-hover:text-amber-500/20 transition-colors duration-500">
                    {String(service.id).padStart(2, "0")}
                  </span>

                  <div className="w-16 h-16 rounded-full bg-amber-950/5 text-amber-800 flex items-center justify-center mb-6 shadow-inner transition-all duration-500 group-hover:bg-amber-600 group-hover:text-white group-hover:scale-105">
                    <IconComponent className="w-6 h-6 stroke-[1.25]" />
                  </div>
                </div>

                {/* MIDDLE DECK: Description Details */}
                <div
                  className="flex flex-col items-center px-4 select-none pointer-events-none"
                  style={{
                    transform: isHovered
                      ? "translateZ(30px)"
                      : "translateZ(0px)",
                    transition: "transform 0.4s ease-out 0.05s",
                  }}
                >
                  {/* Removed absolute text-neutral classes from inner tags to enable seamless color cascading */}
                  <h3 className="text-xs font-semibold tracking-[0.25em] mb-3 uppercase text-neutral-900 group-hover:text-white transition-colors duration-500">
                    {service.title}
                  </h3>

                  <p className="text-[11px] leading-relaxed max-w-[200px] font-light tracking-wide text-neutral-500 group-hover:text-neutral-300 transition-colors duration-500">
                    {service.description}
                  </p>
                </div>

                {/* LOWER DECK: Navigation Link Redirect Arrow */}
                <div
                  className="flex items-center font-semibold text-[10px] tracking-widest uppercase mt-4 text-amber-800 group-hover:text-amber-400 transition-colors duration-500"
                  style={{
                    transform: isHovered
                      ? "translateZ(40px)"
                      : "translateZ(0px)",
                    transition: "transform 0.4s ease-out 0.1s",
                  }}
                >
                  <span className="mr-2">Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>

                {/* Fine Outer Gold Halo Border */}
                <div
                  className={`absolute inset-0 rounded-full border transition-all duration-700 pointer-events-none z-20 ${
                    isHovered ? "border-amber-500/30" : "border-transparent"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
