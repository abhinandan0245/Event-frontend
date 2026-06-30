import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Sky Background Component
const SkyBackground = () => {
  const groupRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.05) * 0.02;

      groupRef.current.position.x +=
        (mouseRef.current.x * 0.2 - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y +=
        (mouseRef.current.y * 0.2 - groupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} />

      <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Sphere args={[2, 64, 64]} position={[-4, 3, -3]}>
          <meshPhysicalMaterial
            color="#FFD700"
            metalness={0.1}
            roughness={0.2}
            transparent
            opacity={0.15}
            emissive="#FFD700"
            emissiveIntensity={0.1}
          />
        </Sphere>
      </Float>

      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
        <Sphere args={[1.5, 48, 48]} position={[4, -2, -4]}>
          <meshPhysicalMaterial
            color="#FF1493"
            metalness={0.3}
            roughness={0.4}
            transparent
            opacity={0.08}
          />
        </Sphere>
      </Float>

      <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.3}>
        <Sphere args={[1.8, 48, 48]} position={[-3, -1, -5]}>
          <meshPhysicalMaterial
            color="#8B5CF6"
            metalness={0.2}
            roughness={0.5}
            transparent
            opacity={0.06}
          />
        </Sphere>
      </Float>

      <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.1}>
        <Ring
          args={[3, 3.5, 64]}
          position={[0, 2, -6]}
          rotation={[Math.PI / 4, 0, 0]}
        >
          <meshPhysicalMaterial
            color="#FF6B6B"
            metalness={0.6}
            roughness={0.2}
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
          />
        </Ring>
      </Float>

      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <Ring
          args={[2.5, 3, 64]}
          position={[3, -1, -7]}
          rotation={[Math.PI / 3, 0.5, 0]}
        >
          <meshPhysicalMaterial
            color="#FFB6C1"
            metalness={0.4}
            roughness={0.3}
            transparent
            opacity={0.04}
            side={THREE.DoubleSide}
          />
        </Ring>
      </Float>

      <Stars
        radius={20}
        depth={10}
        count={500}
        factor={4}
        saturation={0.2}
        fade
        speed={0.5}
      />
    </group>
  );
};

// Image data
const celebrations = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    position: 1,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
    position: 2,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1592656094267-764a45160876?w=600&h=400&fit=crop",
    position: 3,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&h=400&fit=crop",
    position: 4,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&h=400&fit=crop",
    position: 5,
  },
];

const FeaturedCelebrations = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.8, rotateY: 20 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 1,
          delay: i * 0.15,
          ease: "power3.out",
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

  const getCardSize = (position) => {
    if (position === 3) return "large";
    if (position === 2 || position === 4) return "medium";
    return "small";
  };

  const getWidthClass = (size) => {
    if (size === "large") return "w-[32%] md:w-[30%]";
    if (size === "medium") return "w-[28%] md:w-[22%]";
    return "w-[24%] md:w-[16%]";
  };

  const getHeightClass = (position) => {
    if (position === 3) return "h-[320px] sm:h-[380px] md:h-[420px]";
    if (position === 2 || position === 4)
      return "h-[280px] sm:h-[340px] md:h-[380px]";
    return "h-[240px] sm:h-[300px] md:h-[340px]";
  };

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

  const getTiltTransform = (index) => {
    if (hoveredIndex === index) {
      return `perspective(1000px) rotateY(${mousePosition.x * 25}deg) rotateX(${-mousePosition.y * 25}deg) scale(1.08) translateZ(30px)`;
    }
    return "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateZ(0px)";
  };

  // Mobile Slide Navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % celebrations.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + celebrations.length) % celebrations.length,
    );
  };

  // Get visible cards for mobile (showing 2 at a time)
  const getVisibleCards = () => {
    if (!isMobile) return celebrations;

    const visible = [];
    for (let i = 0; i < celebrations.length; i++) {
      const index = (currentSlide + i) % celebrations.length;
      visible.push(celebrations[index]);
      if (visible.length === 2) break;
    }
    return visible;
  };

  const visibleCards = getVisibleCards();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden py-12 sm:py-16 md:py-20"
    >
      {/* 3D Sky Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <SkyBackground />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.2}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />

      {/* Floating Sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400/20"
          style={{
            left: 5 + Math.random() * 90 + "%",
            top: 5 + Math.random() * 90 + "%",
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.6, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        >
          <Sparkles size={20 + Math.random() * 25} />
        </motion.div>
      ))}

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="text-pink-400 font-semibold text-xs sm:text-sm uppercase tracking-widest inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              FEATURED CELEBRATIONS
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-white mt-2">
              Our Most Memorable
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 block">
                Wedding Stories
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
              Each celebration is a unique masterpiece crafted with love and
              perfection
            </p>
          </motion.div>

          {/* Mobile Slide Controls - Only on Mobile */}
          {isMobile && (
            <div className="flex items-center justify-between gap-4 mb-4 sm:hidden">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1.5">
                {celebrations.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? "bg-pink-500 w-6" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* 3D Image Cards - Desktop: Single Row, Mobile: Slide */}
          <div className="flex justify-center items-end gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-8">
            {isMobile ? (
              // Mobile: Slide Cards (2 at a time)
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center items-end gap-3 w-full"
                >
                  {visibleCards.map((celebration, idx) => {
                    const size = getCardSize(celebration.position);
                    const isLarge = size === "large";
                    const isMedium = size === "medium";
                    const widthClass = "w-[48%]";
                    const heightClass = "h-[280px]";

                    return (
                      <motion.div
                        key={celebration.id}
                        className={`relative rounded-2xl overflow-hidden shadow-2xl ${widthClass} ${heightClass} group cursor-pointer flex-shrink-0`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={celebration.image}
                          alt={`Celebration ${celebration.id}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />

                        {/* Position Number */}
                        <div className="absolute bottom-3 right-3 z-20 text-white/20 text-4xl font-bold">
                          {String(celebration.position).padStart(2, "0")}
                        </div>

                        {/* Image Counter */}
                        <div className="absolute bottom-3 left-3 z-20 text-white/60 text-xs font-light">
                          <span className="bg-dark-900/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            {idx + 1} / {visibleCards.length}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            ) : (
              // Desktop: All 5 cards in a row
              celebrations.map((celebration, index) => {
                const size = getCardSize(celebration.position);
                const isLarge = size === "large";
                const isMedium = size === "medium";
                const widthClass = getWidthClass(size);
                const heightClass = getHeightClass(celebration.position);

                let visibilityClass = "";
                if (celebration.position === 3) {
                  visibilityClass = "flex";
                } else if (
                  celebration.position === 2 ||
                  celebration.position === 4
                ) {
                  visibilityClass = "hidden sm:flex";
                } else {
                  visibilityClass = "hidden md:flex";
                }

                return (
                  <motion.div
                    key={celebration.id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className={`relative rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl ${widthClass} ${heightClass} ${visibilityClass} group cursor-pointer flex-shrink-0`}
                    style={{
                      transform: getTiltTransform(index),
                      transition: "transform 0.3s ease-out",
                      transformStyle: "preserve-3d",
                    }}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{
                      scale: isLarge ? 1.06 : isMedium ? 1.08 : 1.1,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={celebration.image}
                        alt={`Celebration ${celebration.id}`}
                        className="w-full h-full object-cover transition-transform duration-700"
                        style={{
                          transform:
                            hoveredIndex === index ? "scale(1.15)" : "scale(1)",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
                    </div>

                    {/* Animated Border Glow */}
                    <motion.div
                      className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 opacity-0"
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      style={{ zIndex: -1 }}
                    />

                    {/* Floating Particles on Hover */}
                    {hoveredIndex === index && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                        {[...Array(10)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                              width: 2 + Math.random() * 4,
                              height: 2 + Math.random() * 4,
                              background: i % 2 === 0 ? "#EC4899" : "#F43F5E",
                            }}
                            initial={{
                              x: Math.random() * 100 + "%",
                              y: Math.random() * 100 + "%",
                              scale: 0,
                            }}
                            animate={{
                              x: `${Math.random() * 100}%`,
                              y: `${Math.random() * 100}%`,
                              scale: [0, 3, 0],
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

                    {/* Featured Badge for Center Card */}
                    {isLarge && (
                      <motion.div
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[8px] sm:text-[10px] font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg shadow-pink-500/40"
                        initial={{ opacity: 0, scale: 0, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.7, type: "spring" }}
                      >
                        ✨ FEATURED
                      </motion.div>
                    )}

                    {/* Position Number */}
                    <motion.div
                      className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 text-white/20 text-4xl sm:text-6xl font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      transition={{ delay: 0.5 }}
                    >
                      {String(celebration.position).padStart(2, "0")}
                    </motion.div>

                    {/* Hover Indicator Overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-dark-900/0"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="bg-white/10 backdrop-blur-sm rounded-full p-3 sm:p-4 border-2 border-white/40 shadow-2xl"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{
                          scale: hoveredIndex === index ? 1 : 0,
                          rotate: hoveredIndex === index ? 0 : -45,
                        }}
                        transition={{ duration: 0.4, type: "spring" }}
                      >
                        <Sparkles className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                      </motion.div>
                    </motion.div>

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
                            ? "inset 0 0 80px rgba(236, 72, 153, 0.15)"
                            : "inset 0 0 0px rgba(236, 72, 153, 0)",
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Image Counter on Hover */}
                    <motion.div
                      className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 text-white/60 text-[10px] sm:text-xs font-light"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <span className="bg-dark-900/50 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                        {index + 1} / {celebrations.length}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8 sm:mt-12"
          >
            <button className="relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-white border-2 border-pink-500/50 hover:border-pink-400 transition-all duration-300 group overflow-hidden text-sm sm:text-base">
              <span className="relative z-10 flex items-center gap-2">
                View All Celebrations
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCelebrations;
