import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Sparkles, Maximize2 } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// ─── HIGH-VISIBILITY COLORFUL CONSTELLATION BACKGROUND ───
const ConstellationBackground = () => {
  const pointsRef = useRef();
  const linesMeshRef = useRef();
  const count = 45; 

  const jewelColors = useMemo(() => [
    new THREE.Color("#059669"), // Emerald
    new THREE.Color("#2563EB"), // Sapphire
    new THREE.Color("#D946EF"), // Magenta
    new THREE.Color("#7C3AED"), // Amethyst
    new THREE.Color("#EA580C")  // Tiger Eye Amber
  ], []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 10;      
      pos[i3 + 1] = (Math.random() - 0.5) * 6;  
      pos[i3 + 2] = (Math.random() - 0.5) * 4;  

      const randomColor = jewelColors[Math.floor(Math.random() * jewelColors.length)];
      cols[i3] = randomColor.r;
      cols[i3 + 1] = randomColor.g;
      cols[i3 + 2] = randomColor.b;
    }
    return [pos, cols];
  }, [jewelColors]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array;
    const cols = pointsRef.current.geometry.attributes.color.array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += Math.sin(time * 0.3 + pos[i3]) * 0.002; 
      pos[i3] += Math.cos(time * 0.2 + pos[i3 + 1]) * 0.001;  
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const lineCoords = [];
    const lineColors = [];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x1 = pos[i3];
      const y1 = pos[i3 + 1];
      const z1 = pos[i3 + 2];

      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const x2 = pos[j3];
        const y2 = pos[j3 + 1];
        const z2 = pos[j3 + 2];

        const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
        
        if (dist < 2.6) {
          lineCoords.push(x1, y1, z1, x2, y2, z2);
          lineColors.push(cols[i3], cols[i3 + 1], cols[i3 + 2]);
          lineColors.push(cols[j3], cols[j3 + 1], cols[j3 + 2]);
        }
      }
    }

    if (linesMeshRef.current && lineCoords.length > 0) {
      linesMeshRef.current.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(lineCoords, 3)
      );
      linesMeshRef.current.geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(lineColors, 3)
      );
      linesMeshRef.current.geometry.attributes.position.needsUpdate = true;
      linesMeshRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.12} vertexColors transparent opacity={0.65} sizeAttenuation />
      </points>

      <lineSegments ref={linesMeshRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.28} linewidth={1.5} />
      </lineSegments>
    </group>
  );
};

// ─── GALLERY DATA ───
const galleryItems = [
  { id: 1, image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", title: "Palace Banquet Architecture" },
  { id: 2, image: "https://images.unsplash.com/photo-1545232979-8bf34eb9757b?w=800&q=80", title: "Royal Ceremonial Altar" },
  { id: 3, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", title: "Grand Reception Chandelier" },
  { id: 4, image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", title: "Sensory Floral Mandap" },
  { id: 5, image: "https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&q=80", title: "The Maharani Attire Detail" },
  { id: 6, image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80", title: "Sensory Reception Dining" },
  { id: 7, image: "https://images.unsplash.com/photo-1507504038482-7621c21ad22f?w=800&q=80", title: "Palatial Stage Decor Architecture" },
  { id: 8, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", title: "Scenic Valleys Horizon Vows" },
  { id: 9, image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", title: "Ethereal Illumination Canopy" },
  { id: 10, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", title: "Oceanic Island Fortress Marina" },
  { id: 11, image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80", title: "Velvet Couture Nocturne" },
  { id: 12, image: "https://images.unsplash.com/photo-1519225495810-7512c696505a?w=800&q=80", title: "Ethereal Glasshouse Banqueting" }
];

const FeaturedCelebrations = () => {
  const sectionRef = useRef(null);
  const flexContainerRef = useRef(null);
  const [activeLightbox, setActiveLightbox] = useState(null);

  useEffect(() => {
    const columns = flexContainerRef.current.querySelectorAll(".gallery-column");
    gsap.fromTo(
      columns,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: flexContainerRef.current,
          start: "top 85%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden text-neutral-800"
      style={{
        backgroundColor: "#FAF9F5",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      {/* Background WebGL Canvas Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ position: "absolute", inset: 0 }}>
          <ConstellationBackground />
        </Canvas>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wide text-neutral-900">
            A Glimpse of Our Work
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 max-w-xs mx-auto">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-amber-700/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-700/60 flex-shrink-0" />
            <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-amber-700/40" />
          </div>
        </div>

        {/* ─── ASYMMETRIC MAPPED COLUMNS SYSTEM ─── */}
        <div 
          ref={flexContainerRef}
          className="flex flex-col md:flex-row gap-3.5 items-start justify-center w-full"
          style={{ perspective: "1500px" }} // Globally scales perspective for the cards inside
        >
          {/* COLUMN 1 */}
          <div className="gallery-column w-full md:w-[13.5%] flex flex-col gap-3.5">
            <GalleryTile item={galleryItems[0]} onClick={() => setActiveLightbox(galleryItems[0])} className="aspect-[4/3]" />
            <GalleryTile item={galleryItems[1]} onClick={() => setActiveLightbox(galleryItems[1])} className="aspect-[3/4]" />
          </div>

          {/* COLUMN 2 */}
          <div className="gallery-column w-full md:w-[19.5%]">
            <GalleryTile item={galleryItems[2]} onClick={() => setActiveLightbox(galleryItems[2])} className="h-[420px] lg:h-[460px]" />
          </div>

          {/* COLUMN 3 */}
          <div className="gallery-column w-full md:w-[22.5%] flex flex-col gap-3.5">
            <GalleryTile item={galleryItems[3]} onClick={() => setActiveLightbox(galleryItems[3])} className="aspect-[4/3]" />
            <div className="flex gap-3.5 w-full">
              <GalleryTile item={galleryItems[4]} onClick={() => setActiveLightbox(galleryItems[4])} className="aspect-square w-1/2" />
              <GalleryTile item={galleryItems[5]} onClick={() => setActiveLightbox(galleryItems[5])} className="aspect-square w-1/2" />
            </div>
          </div>

          {/* COLUMN 4 */}
          <div className="gallery-column w-full md:w-[18%] flex flex-col gap-3.5">
            <GalleryTile item={galleryItems[6]} onClick={() => setActiveLightbox(galleryItems[6])} className="aspect-[3/4]" />
            <GalleryTile item={galleryItems[7]} onClick={() => setActiveLightbox(galleryItems[7])} className="aspect-[4/3]" />
          </div>

          {/* COLUMN 5 */}
          <div className="gallery-column w-full md:w-[12.5%] flex flex-col gap-3.5">
            <GalleryTile item={galleryItems[8]} onClick={() => setActiveLightbox(galleryItems[8])} className="aspect-square" />
            <GalleryTile item={galleryItems[9]} onClick={() => setActiveLightbox(galleryItems[9])} className="aspect-[3/4]" />
          </div>

          {/* COLUMN 6 */}
          <div className="gallery-column w-full md:w-[14%] flex flex-col gap-3.5">
            <GalleryTile item={galleryItems[10]} onClick={() => setActiveLightbox(galleryItems[10])} className="aspect-[4/3]" />
            <GalleryTile item={galleryItems[11]} onClick={() => setActiveLightbox(galleryItems[11])} className="aspect-[4/3]" />
          </div>
        </div>

      </div>

      {/* ─── LIGHTBOX MODAL WITH FULL SCREEN ZOOM ─── */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 w-full h-full z-[10000] bg-neutral-950/85 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/5 border border-white/10 p-3 rounded-full backdrop-blur-md"
              onClick={() => setActiveLightbox(null)}
            >
              <X className="w-4 h-4" />
            </button>

            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-neutral-200"
            >
              <img 
                src={activeLightbox.image} 
                alt={activeLightbox.title} 
                className="w-full h-auto max-h-[72vh] object-contain bg-neutral-50"
              />
              <div className="p-5 bg-white border-t border-neutral-100 flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-semibold tracking-widest text-amber-800 uppercase block mb-1">VIOLIN CURATED ARCHIVE</span>
                  <h3 className="font-serif font-light text-lg text-neutral-900">{activeLightbox.title}</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-950/5 flex items-center justify-center text-amber-800">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ─── HIGH-END INTERACTIVE 3D PERSPECTIVE TILE ───
const GalleryTile = ({ item, className = "", onClick }) => {
  const tileRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = tileRef.current.getBoundingClientRect();
    // Translate mouse positions to a relative matrix (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Compute live 3D matrix properties based on normalized vector position
  const tiltRotate = isHovered
    ? `rotateY(${coords.x * 24}deg) rotateX(${-coords.y * 24}deg) scale(1.04)`
    : "rotateY(0deg) rotateX(0deg) scale(1)";

  return (
    <div
      ref={tileRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`gallery-tile relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-neutral-200/40 cursor-zoom-in w-full ${className}`}
      style={{
        transform: tiltRotate,
        transformStyle: "preserve-3d",
        transition: isHovered ? "none" : "transform 0.5s ease-out, shadow 0.5s ease",
      }}
    >
      {/* Image layer inside 3D bounds */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-[1.2s]"
        style={{
          transform: isHovered ? "scale(1.05) translateZ(10px)" : "scale(1) translateZ(0px)",
        }}
      />

      {/* Dynamic Specular Light Glare Reflection Map */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isHovered
            ? `radial-gradient(circle at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 60%)`
            : "none",
        }}
      />

      {/* Bottom Information Title Reveal Layer */}
      <div 
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-4 z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translateZ(25px)" : "translateZ(0px)",
          transition: "transform 0.4s ease-out",
        }}
      >
        <div className="flex justify-between items-center w-full text-white">
          <span className="font-serif italic text-xs tracking-wide">{item.title}</span>
          <Maximize2 className="w-3.5 h-3.5 opacity-60" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedCelebrations;