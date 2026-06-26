import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
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

// Image data - only images
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

  const getCardWidth = (size) => {
    if (size === "large") return "w-[30%]";
    if (size === "medium") return "w-[22%]";
    return "w-[16%]";
  };

  // Progressive heights: Center tallest, then medium, then small
  const getMinHeight = (position) => {
    if (position === 3) return "min-h-[420px]"; // Center - Tallest
    if (position === 2 || position === 4) return "min-h-[360px]"; // Adjacent - Medium
    return "min-h-[300px]"; // Outer - Smallest
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

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden"
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
      {[...Array(8)].map((_, i) => (
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

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-pink-400 font-semibold text-sm uppercase tracking-widest inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            FEATURED CELEBRATIONS
            <Sparkles className="w-4 h-4" />
          </span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mt-2">
            Our Most Memorable
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 block">
              Wedding Stories
            </span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Each celebration is a unique masterpiece crafted with love and
            perfection
          </p>
        </motion.div>

        {/* 3D Image Cards - Single Row with Progressive Heights */}
        <div className="flex justify-center items-end gap-3 mt-12">
          {celebrations.map((celebration, index) => {
            const size = getCardSize(celebration.position);
            const isLarge = size === "large";
            const isMedium = size === "medium";
            const height = getMinHeight(celebration.position);

            return (
              <motion.div
                key={celebration.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl ${getCardWidth(size)} ${height} group cursor-pointer`}
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
                {/* Image */}
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
                  {/* Subtle Gradient Overlay */}
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
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                          width: 2 + Math.random() * 5,
                          height: 2 + Math.random() * 5,
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
                          scale: [0, 3.5, 0],
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
                    className="absolute top-4 right-4 z-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-pink-500/40"
                    initial={{ opacity: 0, scale: 0, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.7, type: "spring" }}
                  >
                    ✨ FEATURED
                  </motion.div>
                )}

                {/* Position Number */}
                <motion.div
                  className="absolute bottom-4 right-4 z-20 text-white/20 text-6xl font-bold"
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
                    className="bg-white/10 backdrop-blur-sm rounded-full p-4 border-2 border-white/40 shadow-2xl"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{
                      scale: hoveredIndex === index ? 1 : 0,
                      rotate: hoveredIndex === index ? 0 : -45,
                    }}
                    transition={{ duration: 0.4, type: "spring" }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
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
                  className="absolute bottom-4 left-4 z-20 text-white/60 text-xs font-light"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <span className="bg-dark-900/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    {index + 1} / {celebrations.length}
                  </span>
                </motion.div>

                {/* Height Indicator Line */}
                <motion.div
                  className="absolute -right-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-400/0 via-pink-400/30 to-pink-400/0"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="relative px-8 py-3 rounded-full font-semibold text-white border-2 border-pink-500/50 hover:border-pink-400 transition-all duration-300 group overflow-hidden">
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
            min-height: 300px !important;
          }
          .flex {
            gap: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedCelebrations;
