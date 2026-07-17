import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, ChevronLeft } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

// ─── MODULAR IMPORT: IMPORT YOUR INDEPENDENT COMPONENT ───
// Adjust this relative file path strings matrix based on where your component file is saved
import EarthCanvas from "../../components/canvas/EarthCanvas";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ARRAY: THE 3 SEQUENTIAL CURIATIONS ───
const destinations = [
  {
    name: "BALI",
    type: "Island Bliss",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    description: "Island Paradise with stunning beaches and lush greenery",
    height: "h-[410px]",
  },
  {
    name: "THAILAND",
    type: "Tropical Paradise",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    description: "Exotic beaches, temples, and vibrant culture",
    height: "h-[460px]",
  },
  {
    name: "UAE",
    type: "Majestic Luxury",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    description: "Modern luxury, desert landscapes, and iconic architecture",
    height: "h-[510px]",
  },
];

const DestinationsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const gridLinesRef = useRef(null);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Progressive staggered reveals for the 3 image cards
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    if (gridLinesRef.current) {
      const lines = gridLinesRef.current.querySelectorAll(
        ".architectural-line",
      );
      gsap.fromTo(
        lines,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.8,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setMousePosition({ x: 0, y: 0 });
  };

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % destinations.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + destinations.length) % destinations.length,
    );

  const visibleCards = isMobile
    ? [
        destinations[currentSlide],
        destinations[(currentSlide + 1) % destinations.length],
      ]
    : destinations;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden text-neutral-800"
      style={{
        backgroundColor: "#FAF9F5",
        paddingTop: "7rem",
        paddingBottom: "7rem",
      }}
    >
      {/* Background Framing Accent Lines */}
      <div
        ref={gridLinesRef}
        className="absolute inset-0 pointer-events-none z-0 px-[8%]"
      >
        <div className="architectural-line absolute left-[8%] right-[8%] top-[15%] h-[1px] bg-amber-900/10 origin-left" />
        <div className="architectural-line absolute left-[8%] right-[8%] bottom-[15%] h-[1px] bg-amber-900/10 origin-right" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle
          subtitle="GLOBAL HUB"
          title="World's Finest Locations"
          description="A curation of magnificent destinations mapped cleanly to your journey parameters."
          subtitleColor="text-amber-800 tracking-[0.35em] font-medium text-xs uppercase"
          className="text-center mb-20"
        />

        {isMobile && (
          <div className="flex items-center justify-between gap-4 mb-8 md:hidden px-2">
            <button
              onClick={prevSlide}
              className="p-3.5 rounded-full bg-white border border-neutral-200 text-amber-800 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {destinations.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "bg-amber-600 w-6" : "bg-neutral-200 w-2"}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-3.5 rounded-full bg-white border border-neutral-200 text-amber-800 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ─── DESKTOP STEPISED LAYOUT MATRICES ─── */}
        <div
          className="flex justify-between items-center gap-8 lg:gap-12"
          style={{ perspective: "1500px" }}
        >
          {isMobile ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-end gap-4 w-full"
              >
                {visibleCards.map((dest) => (
                  <div
                    key={dest.name}
                    className="relative rounded-3xl overflow-hidden shadow-2xl w-1/2 h-[380px] border border-white/40"
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="backdrop-blur-md bg-white/90 rounded-2xl p-3.5 shadow-md">
                        <span className="text-[9px] tracking-widest text-amber-800 uppercase font-semibold">
                          {dest.type}
                        </span>
                        <h3 className="font-serif text-neutral-800 text-base mt-0.5">
                          {dest.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <>
              {/* LEFT COLUMN COMPOSITION BLOCK: The 3 Curations */}
              <div className="w-[62%] flex items-end gap-6">
                {destinations.map((dest, index) => {
                  const isHovered = hoveredIndex === index;
                  return (
                    <div
                      key={dest.name}
                      ref={(el) => (cardsRef.current[index] = el)}
                      onMouseMove={(e) => handleMouseMove(e, index)}
                      onMouseLeave={handleMouseLeave}
                      className={`relative rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer w-1/3 ${dest.height}`}
                      style={{
                        transform: isHovered
                          ? `rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 12}deg) scale(1.03)`
                          : "rotateY(0deg) rotateX(0deg) scale(1)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-[1.4s]"
                        style={{
                          transform: isHovered ? "scale(1.1)" : "scale(1)",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                      <div
                        className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 z-20 transition-transform duration-300"
                        style={{
                          transform: isHovered
                            ? "translateY(-6px) translateZ(25px)"
                            : "translateY(0px) translateZ(0px)",
                        }}
                      >
                        <div className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl p-4 shadow-xl">
                          <span className="text-[9px] tracking-widest font-semibold text-amber-800 uppercase block mb-0.5">
                            {dest.type}
                          </span>
                          <h3 className="font-serif text-neutral-800 text-lg">
                            {dest.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT COLUMN COMPOSITION BLOCK: MOUNTS YOUR DEDICATED INDEPENDENT EARTHCANVAS */}
              <div className="w-[38%] h-[510px] flex items-center justify-center relative z-10 overflow-visible">
                <div className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%]">
                  {/* Pulls directly from your separate EarthCanvas component */}
                  <EarthCanvas />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-20">
          <Button
            variant="secondary"
            className="border-neutral-300 text-amber-800 hover:bg-neutral-100 hover:border-amber-700 px-9 py-4 rounded-full text-xs font-semibold tracking-[0.2em] uppercase shadow-sm transition-all"
          >
            Explore All Horizons
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
