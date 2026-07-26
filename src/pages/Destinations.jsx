import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Play,
  Palmtree,
  ConciergeBell,
  Landmark,
  Gem,
  ShieldCheck,
} from "lucide-react";
import Button from "../components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

// ================= CUSTOM CONTEXTUAL CURSOR =================
const CustomCursor = ({ cursorVariant, cursorText }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "#C58B48",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "normal",
    },
    explore: {
      width: 80,
      height: 80,
      backgroundColor: "#FDFBF7",
      color: "#1F2937",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "normal",
    },
    view: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(197, 139, 72, 0.9)",
      color: "#FDFBF7",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "normal",
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden hidden md:flex shadow-lg"
      variants={variants}
      animate={cursorVariant}
      style={{
        x: springX,
        y: springY,
      }}
    >
      <AnimatePresence mode="wait">
        {cursorText && (
          <motion.span
            key={cursorText}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="font-montserrat text-[8px] font-bold tracking-widest uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ================= ENHANCED PREMIUM 3D CARD WITH GLARE =================
const Premium3DCard = ({ children, className, onMouseEnter, onMouseLeave }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Tilt calculations
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);

    // Glare calculations
    glareX.set((mouseX / width) * 100);
    glareY.set((mouseY / height) * 100);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        glareOpacity.set(1);
        if (onMouseEnter) onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        x.set(0);
        y.set(0);
        glareOpacity.set(0);
        if (onMouseLeave) onMouseLeave(e);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full relative rounded-xl overflow-hidden group">
        {children}
        
        {/* Dynamic Glare Overlay */}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none rounded-xl transition-opacity duration-300"
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`
            )
          }}
        />
      </div>
    </motion.div>
  );
};

// ================= MAIN COMPONENT =================
const Destinations = () => {
  const compRef = useRef(null);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");

  const handleCursorState = (variant, text = "") => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  // Global Mouse Position for Hero Parallax
  const globalX = useMotionValue(0);
  const globalY = useMotionValue(0);
  const heroX = useTransform(globalX, [0, window.innerWidth], [15, -15]);
  const heroY = useTransform(globalY, [0, window.innerHeight], [15, -15]);
  const bgX = useTransform(globalX, [0, window.innerWidth], [-15, 15]);
  const bgY = useTransform(globalY, [0, window.innerHeight], [-15, 15]);

  useEffect(() => {
    const handleGlobalMouse = (e) => {
      globalX.set(e.clientX);
      globalY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleGlobalMouse);
    return () => window.removeEventListener("mousemove", handleGlobalMouse);
  }, [globalX, globalY]);

  // GSAP Scroll Animations
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 60,
        opacity: 0,
        rotationX: -20,
        transformPerspective: 1000,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".floating-banner", {
        y: 100,
        opacity: 0,
        rotationX: 20,
        transformPerspective: 1000,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".floating-banner",
          start: "top 95%",
        },
      });

      gsap.from(".dest-card-wrapper", {
        y: 80,
        opacity: 0,
        rotationY: 15,
        transformPerspective: 1000,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".dest-grid",
          start: "top 80%",
        },
      });

      gsap.from(".venue-card-wrapper", {
        y: 80,
        opacity: 0,
        rotationY: 15,
        transformPerspective: 1000,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".venue-grid",
          start: "top 80%",
        },
      });
    }, compRef);

    return () => ctx.revert();
  }, []);

  const popularDestinations = [
    { name: "PHUKET", tag: "Vibrant & Exotic", img: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&q=80" },
    { name: "KOH SAMUI", tag: "Tropical & Serene", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80" },
    { name: "KRABI", tag: "Scenic & Tranquil", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80" },
    { name: "BANGKOK", tag: "Modern & Dynamic", img: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&q=80" },
    { name: "CHIANG MAI", tag: "Cultural & Charming", img: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=600&q=80" },
  ];

  const exclusiveVenues = [
    { name: "ANANTARA\nKOH SAMUI", img: "https://images.unsplash.com/photo-1584132967335-2d5a7bda06f0?w=600&q=80" },
    { name: "ROSEWOOD\nPHUKET", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80" },
    { name: "JW MARRIOTT\nPHUKET", img: "https://images.unsplash.com/photo-1571896349842-33c89424ffe2?w=600&q=80" },
    { name: "SIX SENSES\nYAO NOI", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80" },
    { name: "BANYAN TREE\nPHUKET", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80" },
  ];

  return (
    <div ref={compRef} className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C58B48] selection:text-white pb-20 overflow-hidden md:cursor-none">
      <CustomCursor cursorVariant={cursorVariant} cursorText={cursorText} />

      <style>
        {`
          .font-cormorant { font-family: 'Cormorant Garamond', serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          .font-montserrat { font-family: 'Montserrat', sans-serif; }
        `}
      </style>

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[90vh] flex items-center pt-24 lg:pt-32 pb-32" style={{ perspective: 1200 }}>
        
        {/* Parallax Background */}
        <motion.div 
          style={{ x: bgX, y: bgY }}
          className="absolute top-0 right-[-5%] w-full lg:w-[70%] h-[110vh] z-0 pointer-events-none"
        >
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop"
            alt="Thailand Beach Wedding"
            className="w-full h-full object-cover opacity-95 scale-110"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 35%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 35%)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
        </motion.div>

        {/* Invisible Hover Zone for Hero Explore Cursor */}
        <div 
          className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-10"
          onMouseEnter={() => handleCursorState("explore", "EXPLORE")}
          onMouseLeave={() => handleCursorState("default")}
        />

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col justify-center h-full">
          
          <div className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-30 hidden md:flex">
             <span className="font-montserrat text-[8px] font-bold tracking-widest text-[#1F2937]">01</span>
             <div className="w-[1px] h-8 bg-[#1F2937]"></div>
             <span className="font-montserrat text-[8px] font-bold tracking-widest text-[#1F2937]">05</span>
          </div>

          {/* Parallax Text */}
          <motion.div 
            style={{ x: heroX, y: heroY }}
            className="w-full lg:w-[45%] pt-10 pl-0 md:pl-10"
          >
            <span className="hero-element font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              DESTINATION WEDDINGS IN
            </span>
            <h1 className="hero-element font-cormorant text-6xl lg:text-[80px] text-[#1F2937] leading-[1.1] mb-2 uppercase tracking-wide">
              Thailand
            </h1>
            <p className="hero-element font-cormorant text-3xl lg:text-[40px] text-[#C58B48] italic mb-8">
              Where Romance Meets Paradise
            </p>

            <div className="hero-element flex items-center justify-start mb-6">
              <div className="w-4 h-4 rounded-full border border-[#C58B48]/50 flex items-center justify-center p-0.5">
                 <div className="w-full h-full bg-[#C58B48] rounded-full opacity-30"></div>
              </div>
            </div>

            <p className="hero-element font-inter text-gray-600 text-[13px] leading-[1.8] max-w-[380px] mb-10">
              From turquoise waters to golden sunsets, Thailand offers the perfect backdrop for your dream wedding. Celebrate your love in a land of breathtaking beauty, warm hospitality and unforgettable experiences.
            </p>

            <div className="hero-element flex flex-col sm:flex-row items-center gap-6">
              <Button variant="champagne" size="md" className="font-montserrat text-[9px] tracking-[0.2em] shadow-none w-full sm:w-auto hover:scale-105 transition-transform">
                PLAN YOUR THAILAND WEDDING <ArrowRight size={14} className="ml-1" />
              </Button>
              <button 
                onMouseEnter={() => handleCursorState("view", "PLAY")}
                onMouseLeave={() => handleCursorState("default")}
                className="flex items-center gap-3 font-montserrat text-[9px] font-bold tracking-[0.2em] text-[#1F2937] hover:text-[#C58B48] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full border border-[#EBE3D5] group-hover:border-[#C58B48] flex items-center justify-center transition-colors shadow-sm bg-white">
                   <Play className="w-3 h-3 ml-0.5 fill-[#C58B48] text-[#C58B48]" />
                </div>
                WATCH THAILAND FILM
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY THAILAND (3D FLOATING BANNER) ================= */}
      <div className="w-full px-4 lg:px-16 max-w-[1400px] mx-auto -mt-20 relative z-30 flex justify-center" style={{ perspective: 1500 }}>
        <Premium3DCard className="w-full max-w-[1100px] floating-banner">
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#EBE3D5] p-8 lg:p-10 w-full flex flex-col items-center relative overflow-hidden">
            
            <div className="flex items-center justify-center gap-3 mb-8 w-full relative z-10">
              <div className="w-20 h-[1px] bg-[#C58B48]/30" />
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase">WHY THAILAND?</span>
              <div className="w-20 h-[1px] bg-[#C58B48]/30" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 w-full divide-x divide-transparent md:divide-[#EBE3D5]/50 relative z-10">
              {[
                { icon: Palmtree, title: "Stunning\nBeach Destinations" },
                { icon: ConciergeBell, title: "World Class\nHospitality" },
                { icon: Landmark, title: "Rich Culture &\nTraditions" },
                { icon: Gem, title: "Luxury Venues &\nResorts" },
                { icon: ShieldCheck, title: "Seamless Planning\n& Experiences" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ translateZ: 30, scale: 1.05 }}
                  className="flex flex-col items-center text-center px-2 group cursor-default"
                >
                  <div className="mb-4 opacity-80">
                    <item.icon className="w-10 h-10 text-[#C58B48]" strokeWidth={1} />
                  </div>
                  <span className="font-montserrat text-[10px] font-bold tracking-widest text-[#1F2937] whitespace-pre-line leading-relaxed">
                    {item.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Premium3DCard>
      </div>

      {/* ================= POPULAR DESTINATIONS ================= */}
      <section className="py-24 relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          
          <div className="flex flex-col items-center justify-center mb-16">
            <h2 className="font-cormorant text-4xl text-[#1F2937] mb-4 uppercase tracking-widest">
              Popular Destinations
            </h2>
            <div className="w-4 h-4 rounded-full border border-[#C58B48]/50 flex items-center justify-center p-0.5">
               <div className="w-full h-full bg-[#C58B48] rounded-full opacity-30"></div>
            </div>
          </div>

          <div className="dest-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6" style={{ perspective: 1200 }}>
            {popularDestinations.map((dest, idx) => (
              <div key={idx} className="dest-card-wrapper">
                <Premium3DCard 
                  onMouseEnter={() => handleCursorState("view", "VIEW")}
                  onMouseLeave={() => handleCursorState("default")}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBE3D5] flex flex-col h-full group hover:border-[#C58B48]/40 transition-colors">
                    <div className="w-full aspect-[4/5] relative overflow-hidden">
                      <img
                        src={dest.img}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6 text-center flex-grow flex flex-col justify-center bg-white z-10">
                      <h3 className="font-montserrat text-[11px] font-bold tracking-widest text-[#1F2937] mb-2 uppercase">
                        {dest.name}
                      </h3>
                      <p className="font-inter text-[10px] text-gray-500">
                        {dest.tag}
                      </p>
                    </div>
                  </div>
                </Premium3DCard>
              </div>
            ))}
          </div>

          <button className="mt-16 font-montserrat text-[9px] font-bold tracking-[0.2em] text-[#C58B48] hover:text-amber-900 transition-colors flex items-center justify-center w-full gap-2 uppercase group">
            EXPLORE ALL DESTINATIONS <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </section>

      {/* ================= EXCLUSIVE VENUES ================= */}
      <section className="py-16 relative z-10 border-t border-[#EBE3D5]/50">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          
          <div className="flex flex-col items-center justify-center mb-16">
            <h2 className="font-cormorant text-4xl text-[#1F2937] mb-4 uppercase tracking-widest">
              Exclusive Venues
            </h2>
            <div className="w-4 h-4 rounded-full border border-[#C58B48]/50 flex items-center justify-center p-0.5">
               <div className="w-full h-full bg-[#C58B48] rounded-full opacity-30"></div>
            </div>
          </div>

          <div className="venue-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6" style={{ perspective: 1200 }}>
            {exclusiveVenues.map((venue, idx) => (
              <div key={idx} className="venue-card-wrapper">
                <Premium3DCard
                  onMouseEnter={() => handleCursorState("view", "VIEW")}
                  onMouseLeave={() => handleCursorState("default")}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBE3D5] flex flex-col h-full group hover:border-[#C58B48]/40 transition-colors">
                    <div className="w-full aspect-video relative overflow-hidden">
                      <img
                        src={venue.img}
                        alt={venue.name.replace('\n', ' ')}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-5 text-center flex-grow flex flex-col justify-center bg-white z-10">
                      <h3 className="font-montserrat text-[10px] font-bold tracking-widest text-[#1F2937] uppercase whitespace-pre-line leading-relaxed">
                        {venue.name}
                      </h3>
                    </div>
                  </div>
                </Premium3DCard>
              </div>
            ))}
          </div>

          <button className="mt-16 font-montserrat text-[9px] font-bold tracking-[0.2em] text-[#C58B48] hover:text-amber-900 transition-colors flex items-center justify-center w-full gap-2 uppercase group">
            VIEW ALL VENUES <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-12 px-6 lg:px-16 w-full max-w-[1400px] mx-auto mt-10">
        <Premium3DCard>
          <div className="w-full bg-[#F5EFE6] rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/50 relative z-10">
            
            {/* Left Text */}
            <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-20 bg-[#F5EFE6]">
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
                LET US PLAN YOUR
              </span>
              <h2 className="font-cormorant text-4xl lg:text-[48px] text-[#1F2937] leading-[1.1] mb-6">
                Dream Wedding <br/>
                <span className="italic">in Thailand</span>
              </h2>
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-10 max-w-sm">
                Our experts are here to curate a celebration that reflects your love story.
              </p>
              
              <Button 
                variant="champagne" 
                size="md" 
                className="font-montserrat text-[10px] w-full sm:w-max shadow-none hover:scale-105 transition-transform"
                onMouseEnter={() => handleCursorState("default")}
              >
                SCHEDULE A CONSULTATION <ArrowRight size={14} className="ml-2" />
              </Button>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 h-[350px] lg:h-auto relative z-10">
               <img 
                  src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=1000&auto=format&fit=crop" 
                  alt="Happy Indian Couple" 
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F5EFE6] hidden lg:block" />
               
               {/* Gold Stamp Overlay */}
               <motion.div 
                 whileHover={{ scale: 1.1, rotate: 10 }}
                 className="absolute top-10 right-10 w-28 h-28 rounded-full border border-[#D4AF37]/40 flex items-center justify-center opacity-80 backdrop-blur-md hidden md:flex cursor-pointer bg-white/10"
               >
                  <span className="font-cormorant text-4xl text-[#D4AF37]">V</span>
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]">
                    <path id="curve" d="M 50 15 A 35 35 0 1 1 49.9 15" fill="transparent" />
                    <text className="font-montserrat text-[8.5px] uppercase tracking-[0.2em] fill-[#D4AF37]">
                      <textPath href="#curve">Violin Events LLP • Crafting Timeless Celebrations •</textPath>
                    </text>
                  </svg>
               </motion.div>
            </div>

          </div>
        </Premium3DCard>
      </section>

    </div>
  );
};

export default Destinations;