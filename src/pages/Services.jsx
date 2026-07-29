import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarDays,
  CheckCircle,
  ArrowRight,
  Play,
  Search,
  PenTool,
  GlassWater,
  ArrowDown
} from "lucide-react";
import Button from "../components/ui/Button";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);



// ================= ENHANCED PREMIUM 3D CARD WITH GLARE =================
const Premium3DCard = ({ children, className, onMouseEnter, onMouseLeave, borderRadiusClass = "rounded-xl" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
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
      <div style={{ transform: "translateZ(30px)" }} className={`w-full h-full relative ${borderRadiusClass} overflow-hidden group`}>
        {children}
        <motion.div
          className={`absolute inset-0 z-50 pointer-events-none ${borderRadiusClass} transition-opacity duration-300 mix-blend-overlay`}
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%)`
            )
          }}
        />
      </div>
    </motion.div>
  );
};

// ================= MAIN COMPONENT =================
const Services = () => {
  const compRef = useRef(null);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");

  const handleCursorState = (variant, text = "") => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  // Hero Parallax State
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

  // GSAP Animations
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Elements
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

      // Arched Services Grid
      gsap.from(".service-card-wrapper", {
        y: 100,
        opacity: 0,
        rotationY: 15,
        transformPerspective: 1000,
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        },
      });

      // Process Timeline
      gsap.from(".process-step", {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".process-container",
          start: "top 85%",
        },
      });
    }, compRef);

    return () => ctx.revert();
  }, []);

  // === DATA ARRAYS ===
  const servicesList = [
    {
      title: "PLANNING &\nMANAGEMENT",
      desc: "Strategic planning, timelines and flawless execution — handled with perfection.",
      img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    },
    {
      title: "DESIGN &\nDÉCOR",
      desc: "Bespoke themes, stunning décor and immersive designs that bring your story to life.",
      img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80",
    },
    {
      title: "HOSPITALITY &\nGUEST EXPERIENCE",
      desc: "Curated hospitality and guest experiences that make your loved ones feel special.",
      img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80",
    },
    {
      title: "ENTERTAINMENT &\nPRODUCTION",
      desc: "World-class entertainment and production for unforgettable celebrations.",
      img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
    },
    {
      title: "LOGISTICS &\nTRAVEL",
      desc: "Seamless travel, logistics and on-ground support, anywhere in the world.",
      img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    },
    {
      title: "BESPOKE SERVICES &\nCONCIERGE",
      desc: "Personalized services and thoughtful touches that go beyond expectations.",
      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    },
  ];

  const processSteps = [
    { step: "01", title: "DISCOVER", desc: "We get to know you and your vision.", icon: Search },
    { step: "02", title: "DESIGN", desc: "We conceptualize your dream celebration.", icon: PenTool },
    { step: "03", title: "PLAN", desc: "We plan every detail flawlessly.", icon: CalendarDays },
    { step: "04", title: "EXECUTE", desc: "We bring your dream to life.", icon: CheckCircle },
    { step: "05", title: "CELEBRATE", desc: "You live the moments, we handle the rest.", icon: GlassWater },
  ];

  return (
    <div ref={compRef} className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C58B48] selection:text-white pb-20 overflow-hidden md:cursor-none">

     

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-screen flex items-center pt-24 lg:pt-32 pb-16" style={{ perspective: 1200 }}>
        
        {/* Parallax Background Image */}
        <motion.div style={{ x: bgX, y: bgY }} className="absolute top-0 right-[-5%] w-full lg:w-[70%] h-[110vh] z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop"
            alt="Wedding Celebration Arch"
            className="w-full h-full object-cover opacity-90 scale-110"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 30%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
        </motion.div>

        {/* Decorative Floral Overlay Left */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] opacity-10 pointer-events-none z-0 mix-blend-multiply grayscale">
          <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80" alt="Floral Decor" className="w-full h-full object-cover" />
        </div>

        {/* Invisible Hover Zone for Cursor */}
        <div 
          className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-10"
          onMouseEnter={() => handleCursorState("explore", "EXPLORE")}
          onMouseLeave={() => handleCursorState("default")}
        />

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col justify-center h-full">
          
          {/* Side Indicator */}
          <div className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-30 hidden md:flex">
             <span className="font-montserrat text-[8px] font-bold tracking-widest text-[#1F2937]">01</span>
             <div className="w-[1px] h-8 bg-[#1F2937]"></div>
             <span className="font-montserrat text-[8px] font-bold tracking-widest text-[#1F2937]">07</span>
          </div>

          <motion.div style={{ x: heroX, y: heroY }} className="w-full lg:w-[50%] pt-10 pl-0 md:pl-10">
            <span className="hero-element font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              OUR SERVICES
            </span>
            <h1 className="hero-element font-cormorant text-5xl lg:text-[72px] text-[#1F2937] leading-[1.1] mb-6">
              End-to-End Wedding <br />
              <span className="italic text-[#C58B48]">& Celebration Solutions</span>
            </h1>
            
            <div className="hero-element flex items-center gap-2 mb-6 opacity-60">
               <div className="w-6 h-[1px] bg-[#C58B48]" />
               <div className="w-2 h-2 rotate-45 border border-[#C58B48]" />
               <div className="w-6 h-[1px] bg-[#C58B48]" />
            </div>

            <p className="hero-element font-inter text-gray-600 text-sm leading-[1.8] max-w-[400px] mb-10">
              At Violin Events, we take care of every detail so you can celebrate every moment. From the first idea to the final farewell, we create experiences that are seamless, stunning and unforgettable.
            </p>

            <Button 
              variant="champagne" 
              size="md" 
              className="hero-element font-montserrat tracking-[0.2em] shadow-none hover:scale-105 transition-transform group"
              onMouseEnter={() => handleCursorState("default")}
            >
              EXPLORE OUR SERVICES <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           transition={{ delay: 1.5, duration: 1 }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 opacity-60 z-20 pointer-events-none"
        >
           <span className="font-montserrat text-[8px] font-bold tracking-[0.2em] uppercase">SCROLL</span>
           <ArrowDown size={14} className="animate-bounce" strokeWidth={1.5} />
        </motion.div>
      </section>

      {/* ================= WHAT WE OFFER (ARCHED GRID 3D) ================= */}
      <section className="py-20 lg:py-32 relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          
          {/* Section Header */}
          <div className="mb-16">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
              WHAT WE OFFER
            </span>
            <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937] mb-4">
              Comprehensive Services for Extraordinary Celebrations
            </h2>
            <div className="flex items-center justify-center gap-2">
               <div className="w-12 h-[1px] bg-[#C58B48]/30" />
               <div className="w-1.5 h-1.5 rotate-45 border border-[#C58B48] bg-[#FDFBF7]" />
               <div className="w-12 h-[1px] bg-[#C58B48]/30" />
            </div>
          </div>

          {/* 3D Arched Cards Grid */}
          <div className="services-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6" style={{ perspective: 1500 }}>
            {servicesList.map((service, index) => (
              <div key={index} className="service-card-wrapper">
                <Premium3DCard 
                  borderRadiusClass="rounded-t-full rounded-b-xl"
                  onMouseEnter={() => handleCursorState("view", "VIEW")}
                  onMouseLeave={() => handleCursorState("default")}
                >
                  <div className="flex flex-col items-center text-center group cursor-pointer h-full bg-white border border-[#EBE3D5] rounded-t-full rounded-b-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-2 hover:border-[#C58B48]/40 transition-colors">
                    {/* Image Arch Container */}
                    <div className="w-full pt-[140%] relative rounded-t-full overflow-hidden mb-6 bg-gray-100 border border-[#EBE3D5]">
                      <div className="absolute inset-0 rounded-t-full overflow-hidden">
                        <img 
                          src={service.img} 
                          alt={service.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                        />
                        <div className="absolute inset-0 bg-[#FDFBF7]/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                    </div>

                    {/* Text Content */}
                    <h3 className="font-montserrat text-[10px] lg:text-[11px] font-bold tracking-[0.15em] text-[#1F2937] mb-3 uppercase leading-relaxed whitespace-pre-line h-8 flex items-center justify-center z-10">
                      {service.title}
                    </h3>
                    <p className="font-inter text-[10px] lg:text-[11px] text-gray-500 leading-relaxed mb-4 px-2 h-16 z-10">
                      {service.desc}
                    </p>
                    
                    <div className="w-1.5 h-1.5 rotate-45 border border-[#C58B48]/50 mb-4 group-hover:bg-[#C58B48] transition-colors z-10" />
                    
                    <button className="font-montserrat text-[9px] font-bold tracking-[0.2em] text-[#C58B48] group-hover:text-amber-900 transition-colors flex items-center gap-1 uppercase pb-4 z-10">
                      LEARN MORE <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </Premium3DCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR PROCESS TIMELINE ================= */}
      <section className="py-20 lg:py-28 relative z-10 border-t border-[#EBE3D5]/50 bg-white">
        <div className="process-container w-full max-w-[1200px] mx-auto px-6 text-center">
          
          <div className="mb-16">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
              OUR PROCESS
            </span>
            <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937] mb-4">
              Thoughtfully Crafted. Perfectly Planned.
            </h2>
            <div className="flex items-center justify-center gap-2">
               <div className="w-12 h-[1px] bg-[#C58B48]/30" />
               <div className="w-1.5 h-1.5 rotate-45 border border-[#C58B48]" />
               <div className="w-12 h-[1px] bg-[#C58B48]/30" />
            </div>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Connecting Dashed Line (Desktop) */}
            <div className="hidden md:block absolute top-[36px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-[#C58B48]/40 z-0" />
            
            {processSteps.map((step, index) => (
              <div key={index} className="process-step relative z-10 flex flex-col items-center text-center w-full md:w-[18%] mb-10 md:mb-0 group cursor-default">
                {/* 3D Hover Icon Badge */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotateY: 15, rotateX: 10 }}
                  className="w-[72px] h-[72px] rounded-full bg-[#FDFBF7] border border-[#EBE3D5] flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(0,0,0,0.03)] group-hover:border-[#C58B48]/50 transition-colors"
                >
                   <div className="w-[60px] h-[60px] rounded-full border border-[#C58B48]/30 flex items-center justify-center bg-white group-hover:bg-[#C58B48]/5 transition-colors">
                      <step.icon className="w-6 h-6 text-[#C58B48]" strokeWidth={1} />
                   </div>
                </motion.div>
                {/* Text Content */}
                <span className="font-cormorant text-2xl text-[#1F2937] mb-1">{step.step}</span>
                <h3 className="font-montserrat text-[10px] font-bold tracking-widest uppercase text-[#C58B48] mb-2">{step.title}</h3>
                <p className="font-inter text-[11px] text-gray-500 leading-relaxed max-w-[160px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION (3D) ================= */}
      <section className="py-12 px-6 lg:px-16 w-full max-w-[1400px] mx-auto mt-10" style={{ perspective: 1500 }}>
        <Premium3DCard>
          <div className="w-full bg-[#F5EFE6] rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#EBE3D5] relative z-10 group">
            
            {/* Left Text */}
            <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-20 bg-[#F5EFE6]">
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
                READY TO BEGIN?
              </span>
              <h2 className="font-cormorant text-4xl lg:text-[48px] text-[#1F2937] leading-[1.1] mb-6">
                Let's Create Something <br/>
                <span className="italic text-[#C58B48]">Extraordinary Together</span>
              </h2>
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-10 max-w-sm">
                Share your vision with us and let our experts craft a celebration that will be remembered for a lifetime.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button 
                  variant="champagne" 
                  size="md" 
                  className="font-montserrat text-[10px] w-full sm:w-max shadow-none hover:scale-105 transition-transform"
                  onMouseEnter={() => handleCursorState("default")}
                >
                  SCHEDULE A CONSULTATION <ArrowRight size={14} className="ml-2" />
                </Button>
                
                <button 
                  onMouseEnter={() => handleCursorState("view", "PLAY")}
                  onMouseLeave={() => handleCursorState("default")}
                  className="flex items-center gap-3 font-montserrat text-[10px] font-bold tracking-widest text-[#1F2937] hover:text-[#C58B48] transition-colors group/btn"
                >
                  <div className="w-8 h-8 rounded-full border border-[#1F2937] group-hover/btn:border-[#C58B48] flex items-center justify-center transition-colors">
                     <Play className="w-3 h-3 ml-0.5 fill-current" />
                  </div>
                  WATCH SHOWREEL
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 h-[300px] lg:h-auto relative z-10 overflow-hidden">
               <img 
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop" 
                  alt="Luxury Palace Celebration" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
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

export default Services;