import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: "BALI",
    type: "Island Bliss",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop",
    description: "Island Paradise with stunning beaches and lush greenery",
    position: 1,
  },
  {
    name: "THAILAND",
    type: "Tropical Paradise",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop",
    description: "Exotic beaches, temples, and vibrant culture",
    position: 2,
  },
  {
    name: "INDIA",
    type: "Royal Heritage",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop",
    description: "Palaces, forts, and timeless royal traditions",
    position: 3,
  },
  {
    name: "UAE",
    type: "Majestic Luxury",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    description: "Modern luxury, desert landscapes, and iconic architecture",
    position: 4,
  },
  {
    name: "TURKEY",
    type: "Timeless Charm",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop",
    description: "Rich history, culture, and breathtaking landscapes",
    position: 5,
  },
];

const DestinationsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Get size based on position (center is largest)
  const getCardSize = (position) => {
    if (position === 3) return "large";
    if (position === 2 || position === 4) return "medium";
    return "small";
  };

  // Get width percentage based on size
  const getCardWidth = (size) => {
    if (size === "large") return "w-[30%]";
    if (size === "medium") return "w-[22%]";
    return "w-[16%]";
  };

  // Progressive Heights - Subtle differences
  const getMinHeight = (position) => {
    if (position === 3) return "min-h-[400px]"; // Center - Tallest
    if (position === 2 || position === 4) return "min-h-[380px]"; // Adjacent - Medium
    return "min-h-[360px]"; // Outer - Smallest
  };

  // Get text size based on position
  const getTextSize = (position) => {
    if (position === 3) return "text-2xl md:text-3xl";
    if (position === 2 || position === 4) return "text-xl md:text-2xl";
    return "text-lg md:text-xl";
  };

  // Get description text size based on position
  const getDescSize = (position) => {
    if (position === 3) return "text-xs md:text-sm";
    if (position === 2 || position === 4) return "text-xs";
    return "text-[10px]";
  };

  // Get padding based on position
  const getCardPadding = (position) => {
    if (position === 3) return "p-6";
    if (position === 2 || position === 4) return "p-5";
    return "p-4";
  };

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setMousePosition({ x: 0, y: 0 });
  };

  // Get 3D tilt transform
  const getTiltTransform = (index) => {
    if (hoveredIndex === index) {
      return `rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg) scale(1.05)`;
    }
    return "rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-pink-50/30 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionTitle
          subtitle="ICONIC DESTINATIONS"
          title="World's Finest Wedding Locations"
          description="From royal palaces to pristine beaches, discover the perfect backdrop for your special day"
          subtitleColor="text-pink-500"
        />

        {/* Single Row with 5 Cards - Subtle Progressive Heights */}
        <div className="flex justify-center items-end gap-4 mt-12">
          {destinations.map((dest, index) => {
            const size = getCardSize(dest.position);
            const isLarge = size === "large";
            const isMedium = size === "medium";
            const height = getMinHeight(dest.position);

            return (
              <motion.div
                key={dest.name}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 shadow-lg hover:shadow-2xl ${getCardWidth(size)} ${height}`}
                style={{
                  transform: getTiltTransform(index),
                  transition: "transform 0.3s ease-out",
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                whileHover={{
                  scale: isLarge ? 1.06 : isMedium ? 1.08 : 1.1,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{
                      transform:
                        hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/30 to-transparent" />
                </div>

                {/* Floating Particles on Hover */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white/50 rounded-full"
                        initial={{
                          x: Math.random() * 100 + "%",
                          y: Math.random() * 100 + "%",
                          scale: 0,
                        }}
                        animate={{
                          x: `${Math.random() * 100}%`,
                          y: `${Math.random() * 100}%`,
                          scale: [0, 2.5, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 0.5,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Content at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-10">
                  <div
                    className={`bg-white/95 backdrop-blur-sm rounded-t-2xl ${getCardPadding(dest.position)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Destination Name */}
                        <motion.h3
                          className={`font-bold text-dark-800 ${getTextSize(dest.position)}`}
                          animate={{
                            color:
                              hoveredIndex === index ? "#EC4899" : "#1A1A1A",
                          }}
                        >
                          {dest.name}
                        </motion.h3>

                        {/* Type */}
                        <p
                          className={`text-dark-500 font-medium ${getDescSize(dest.position)}`}
                        >
                          {dest.type}
                        </p>

                        {/* Description */}
                        <motion.p
                          className={`text-dark-600 mt-1 leading-relaxed ${getDescSize(dest.position)}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: hoveredIndex === index ? 1 : 0,
                            height: hoveredIndex === index ? "auto" : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {dest.description}
                        </motion.p>
                      </div>

                      {/* Explore Button */}
                      <motion.button
                        className={`flex-shrink-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg shadow-pink-500/30 ${
                          isLarge
                            ? "w-11 h-11"
                            : isMedium
                              ? "w-9 h-9"
                              : "w-8 h-8"
                        }`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: hoveredIndex === index ? 1 : 0,
                          scale: hoveredIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight
                          className={isLarge ? "w-5 h-5" : "w-4 h-4"}
                        />
                      </motion.button>
                    </div>

                    {/* Animated Bottom Border */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                </div>

                {/* Glow Ring on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-pink-400/0 pointer-events-none"
                  animate={{
                    borderColor:
                      hoveredIndex === index
                        ? "rgba(236, 72, 153, 0.5)"
                        : "rgba(236, 72, 153, 0)",
                    boxShadow:
                      hoveredIndex === index
                        ? "inset 0 0 60px rgba(236, 72, 153, 0.15)"
                        : "inset 0 0 0px rgba(236, 72, 153, 0)",
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Featured Badge for Center Card */}
                {isLarge && (
                  <motion.div
                    className="absolute top-4 right-4 z-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-pink-500/30"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    FEATURED
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="secondary"
            className=" border-pink-300 text-pink-600 hover:bg-pink-50 group"
          >
            Explore All Destinations
            <ChevronRight
              size={18}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .flex {
            gap: 0.5rem !important;
          }
          .flex > div {
            min-height: 280px !important;
          }
        }
        @media (max-width: 768px) {
          .flex > div:nth-child(1),
          .flex > div:nth-child(5) {
            display: none;
          }
          .flex > div {
            width: 33.33% !important;
            min-height: 260px !important;
          }
        }
        @media (max-width: 640px) {
          .flex > div:nth-child(2),
          .flex > div:nth-child(4) {
            display: none;
          }
          .flex > div:nth-child(3) {
            width: 85% !important;
            min-height: 340px !important;
          }
          .flex {
            gap: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DestinationsSection;
