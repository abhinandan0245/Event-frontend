import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Heart,
  Users,
  Building2,
  Camera,
  GlassWater,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Flower2,
  Music
} from "lucide-react";
import Button from "../components/ui/Button";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);



// ================= ENHANCED PREMIUM 3D CARD WITH GLARE =================
const Premium3DCard = ({ children, className, onMouseEnter, onMouseLeave }) => {
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
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full relative rounded-xl overflow-hidden group">
        {children}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none rounded-xl transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`
            )
          }}
        />
      </div>
    </motion.div>
  );
};

// ================= MAIN COMPONENT =================
const Portfolio = () => {
  const compRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All Celebrations");
  const [selectedProject, setSelectedProject] = useState(null);
  
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

      gsap.from(".portfolio-card", {
        y: 80,
        opacity: 0,
        rotationY: 15,
        transformPerspective: 1000,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 80%",
        },
      });

      gsap.from(".film-card", {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".films-grid",
          start: "top 85%",
        },
      });
    }, compRef);
    return () => ctx.revert();
  }, []);

  // === DATA ARRAYS ===
  const filters = [
    { name: "All Celebrations", icon: Sparkles },
    { name: "Weddings", icon: Heart },
    { name: "Pre Wedding", icon: Camera },
    { name: "Mehndi & Haldi", icon: Flower2 },
    { name: "Sangeet", icon: Music },
    { name: "Reception", icon: GlassWater },
    { name: "Corporate Events", icon: Building2 },
    { name: "Social Events", icon: Users },
  ];

  const featuredProjects = [
    { id: 1, title: "Ananya & Rohan", location: "Udaipur, Rajasthan", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80" },
    { id: 2, title: "Ishita & Arjun", location: "Phuket, Thailand", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" },
    { id: 3, title: "Meera & Karan", location: "Jaipur, Rajasthan", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80" },
  ];

  const experienceCategories = [
    { title: "Royal Weddings", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80" },
    { title: "Beach Weddings", image: "https://images.unsplash.com/photo-1512343879784-9602d5de7a10?w=400&q=80" },
    { title: "Destination Weddings", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80" },
    { title: "Intimate Weddings", image: "https://images.unsplash.com/photo-1592656094267-764a45160876?w=400&q=80" },
    { title: "Luxury Celebrations", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=400&q=80" },
    { title: "Cultural Weddings", image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400&q=80" },
  ];

  const films = [
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"
  ];

  return (
    <div ref={compRef} className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C58B48] selection:text-white pb-20 overflow-x-hidden md:cursor-none">

      

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[85vh] flex items-center pt-24 lg:pt-32 pb-24" style={{ perspective: 1200 }}>
        
        {/* Parallax Background Image */}
        <motion.div style={{ x: bgX, y: bgY }} className="absolute top-0 right-[-5%] w-full lg:w-[65%] h-[110vh] z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop"
            alt="Beautiful Wedding Setup"
            className="w-full h-full object-cover opacity-90 scale-110"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 35%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 35%)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
        </motion.div>

        {/* Invisible Hover Zone for Cursor */}
        <div 
          className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-10"
          onMouseEnter={() => handleCursorState("explore", "EXPLORE")}
          onMouseLeave={() => handleCursorState("default")}
        />

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col justify-center h-full">
          
          <div className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-30 hidden md:flex">
             <span className="font-montserrat text-[8px] font-bold tracking-widest text-[#1F2937]">01</span>
             <div className="w-[1px] h-8 bg-[#1F2937]"></div>
             <span className="font-montserrat text-[8px] font-bold tracking-widest text-[#1F2937]">06</span>
          </div>

          <motion.div style={{ x: heroX, y: heroY }} className="w-full lg:w-[50%] pt-10 pl-0 md:pl-10">
            <span className="hero-element font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              OUR PORTFOLIO
            </span>
            <h1 className="hero-element font-cormorant text-5xl lg:text-[72px] text-[#1F2937] leading-[1.1] mb-6">
              Stories we've <br />
              <span className="italic text-[#C58B48]">Beautifully Crafted</span>
            </h1>
            
            <p className="hero-element font-inter text-gray-600 text-sm leading-[1.8] max-w-[380px] mb-10">
              A glimpse of celebrations we've designed with passion, precision and perfection across breathtaking destinations.
            </p>

            <div className="hero-element flex flex-col sm:flex-row items-center gap-6">
              <Button 
                variant="champagne" 
                size="md" 
                className="font-montserrat tracking-[0.2em] shadow-none w-full sm:w-auto hover:scale-105 transition-transform"
                onMouseEnter={() => handleCursorState("default")}
              >
                EXPLORE OUR WORK <ArrowRight size={14} className="ml-1" />
              </Button>
              <button 
                onMouseEnter={() => handleCursorState("view", "PLAY")}
                onMouseLeave={() => handleCursorState("default")}
                className="flex items-center gap-3 font-montserrat text-[9px] font-bold tracking-[0.2em] text-[#1F2937] hover:text-[#C58B48] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full border border-[#EBE3D5] group-hover:border-[#C58B48] flex items-center justify-center transition-colors shadow-sm bg-white">
                   <Play className="w-3 h-3 ml-0.5 fill-[#C58B48] text-[#C58B48]" />
                </div>
                WATCH SHOWREEL
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           transition={{ delay: 1.5, duration: 1 }}
           className="absolute bottom-16 left-6 lg:left-24 flex flex-col items-center gap-2 text-gray-400 opacity-60 pointer-events-none"
        >
           <span className="font-montserrat text-[8px] font-bold tracking-[0.2em] uppercase">SCROLL</span>
           <ArrowDown size={14} className="animate-bounce" strokeWidth={1.5} />
        </motion.div>
      </section>

      {/* ================= FLOATING FILTER BAR ================= */}
      <div className="w-full px-4 lg:px-16 max-w-[1400px] mx-auto -mt-16 relative z-30 flex justify-center">
        <div className="bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#EBE3D5] p-2 flex items-center overflow-x-auto no-scrollbar w-full max-w-[1100px]">
          {filters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(filter.name)}
              className={`flex flex-col items-center justify-center min-w-[110px] px-4 py-3 rounded-full transition-all duration-300 ${
                activeFilter === filter.name
                  ? "text-[#C58B48]"
                  : "text-gray-400 hover:text-[#C58B48]"
              }`}
            >
              <filter.icon className="w-5 h-5 mb-1.5" strokeWidth={1.5} />
              <span className="font-montserrat text-[8px] font-bold tracking-widest uppercase whitespace-nowrap">
                {filter.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ================= FEATURED CELEBRATIONS ================= */}
      <section className="py-20 lg:py-32 relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="portfolio-grid grid grid-cols-1 lg:grid-cols-4 gap-12" style={{ perspective: 1500 }}>
            
            {/* Left Column (Sticky Text) */}
            <div className="lg:col-span-1 flex flex-col pt-10 relative">
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
                FEATURED CELEBRATIONS
              </span>
              <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937] leading-[1.1] mb-12">
                Timeless Moments <br/> Across the Globe
              </h2>
              
              <div className="absolute top-32 -left-10 w-64 h-64 opacity-20 pointer-events-none mix-blend-multiply grayscale">
                <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80" alt="Floral" className="w-full h-full object-cover" />
              </div>

              <div className="mt-auto relative z-10 hidden lg:block">
                <Button variant="outline" size="md" className="font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] hover:border-[#C58B48] w-fit">
                  VIEW FULL PORTFOLIO <ArrowRight size={12} className="ml-1" />
                </Button>
              </div>
            </div>

            {/* Right Columns (Projects) */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {featuredProjects.map((project, index) => (
                <div key={project.id} className="portfolio-card h-full">
                  <Premium3DCard 
                    onMouseEnter={() => handleCursorState("view", "VIEW")}
                    onMouseLeave={() => handleCursorState("default")}
                    className="h-full"
                  >
                    <div 
                      className="group bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBE3D5] flex flex-col h-full hover:border-[#C58B48]/40 transition-colors cursor-none"
                      onClick={() => {
                        setSelectedProject(project);
                        handleCursorState("default");
                      }}
                    >
                      <div className="relative overflow-hidden aspect-[3/4] rounded-lg mb-4 m-2">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <button className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-20">
                          <Heart className="w-5 h-5 drop-shadow-md" strokeWidth={1.5} />
                        </button>
                      </div>
                      
                      <div className="px-5 pb-5 flex items-center justify-between mt-auto bg-white z-10">
                        <div>
                          <h3 className="font-cormorant text-2xl text-[#1F2937] mb-1">
                            {project.title}
                          </h3>
                          <p className="font-inter text-[11px] text-gray-400">
                            {project.location}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-[#EBE3D5] flex items-center justify-center text-gray-400 group-hover:border-[#C58B48] group-hover:text-[#C58B48] transition-colors shrink-0">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Premium3DCard>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= EXPLORE BY EXPERIENCE (TIMELINE) ================= */}
      <section className="py-16 bg-white border-y border-[#EBE3D5]/50 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="w-full lg:w-[25%] flex flex-col">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
              EXPLORE BY EXPERIENCE
            </span>
            <h2 className="font-cormorant text-3xl lg:text-[40px] text-[#1F2937] leading-[1.1]">
              Find the Celebration that Inspires You
            </h2>
          </div>

          <div className="w-full lg:w-[75%] relative flex items-center justify-between pb-6 overflow-x-auto no-scrollbar pt-4">
             <div className="absolute top-[40px] left-0 w-full h-[1px] bg-[#C58B48]/30 z-0 hidden lg:block" />
             
             {experienceCategories.map((cat, idx) => (
               <motion.div 
                 key={idx}
                 whileHover={{ y: -10, scale: 1.05 }}
                 className="relative z-10 flex flex-col items-center min-w-[110px] cursor-pointer group px-2"
               >
                 <div className="w-20 h-20 rounded-full border-4 border-white shadow-[0_4px_15px_rgba(0,0,0,0.08)] overflow-hidden mb-4 relative bg-white">
                   <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-[#C58B48]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <h4 className="font-montserrat text-[8px] font-bold tracking-widest uppercase text-[#1F2937] text-center">
                   {cat.title}
                 </h4>
               </motion.div>
             ))}

             <button className="relative z-10 w-10 h-10 rounded-full border border-[#EBE3D5] flex items-center justify-center text-gray-400 hover:text-[#C58B48] hover:border-[#C58B48] transition-colors bg-white shadow-sm shrink-0 ml-4 hidden lg:flex">
               <ChevronRight size={16} />
             </button>
          </div>

        </div>
      </section>

      {/* ================= A CELEBRATION TO REMEMBER ================= */}
      <section className="py-20 lg:py-32" style={{ perspective: 1500 }}>
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <Premium3DCard>
            <div className="bg-[#FDFBF7] border border-[#EBE3D5] rounded-xl overflow-hidden p-4 lg:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.04)] relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FDFBF7]">
                
                {/* Left Large Video/Image */}
                <div 
                  className="lg:col-span-5 h-[400px] lg:h-[500px] relative rounded-lg overflow-hidden group cursor-none"
                  onMouseEnter={() => handleCursorState("view", "PLAY")}
                  onMouseLeave={() => handleCursorState("default")}
                >
                  <img src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80" alt="Couple" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden">
                    <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 text-[#C58B48] fill-[#C58B48] ml-1" />
                    </div>
                  </div>
                </div>

                {/* Center Text */}
                <div className="lg:col-span-4 flex flex-col justify-center px-4 lg:px-10 text-center lg:text-left py-10 lg:py-0">
                  <h2 className="font-cormorant text-4xl lg:text-[46px] text-[#1F2937] leading-[1.1] mb-6">
                    A Celebration to <br/>
                    <span className="italic text-[#C58B48]">Remember</span>
                  </h2>
                  <div className="w-10 h-[1px] bg-[#C58B48]/50 mx-auto lg:mx-0 mb-6" />
                  <p className="font-inter text-xs text-gray-500 leading-relaxed mb-8">
                    Every love story is unique. We bring your dreams to life with creativity, flawless execution and heartfelt moments.
                  </p>
                  <Button variant="outline" size="sm" className="font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] hover:border-[#C58B48] mx-auto lg:mx-0 w-fit">
                    VIEW STORY <ArrowRight size={12} className="ml-1" />
                  </Button>
                </div>

                {/* Right Stacked Images */}
                <div 
                  className="lg:col-span-3 flex flex-col gap-4 h-[400px] lg:h-[500px]"
                  onMouseEnter={() => handleCursorState("view", "VIEW")}
                  onMouseLeave={() => handleCursorState("default")}
                >
                  <div className="h-1/3 rounded-lg overflow-hidden relative group cursor-none">
                     <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80" alt="Moment 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="h-1/3 rounded-lg overflow-hidden relative group cursor-none">
                     <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80" alt="Moment 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="h-1/3 rounded-lg overflow-hidden relative group cursor-none">
                     <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80" alt="Moment 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>

              </div>
            </div>
          </Premium3DCard>
        </div>
      </section>

      {/* ================= CINEMATIC FILMS ================= */}
      <section className="py-16">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
                EXPERIENCE OUR CELEBRATIONS
              </span>
              <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937]">
                Cinematic Films
              </h2>
            </div>
            <Button variant="outline" size="sm" className="font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] hover:border-[#C58B48] mt-6 md:mt-0">
              VIEW ALL FILMS <ArrowRight size={12} className="ml-1" />
            </Button>
          </div>

          <div className="films-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: 1200 }}>
            {films.map((img, idx) => (
              <div key={idx} className="film-card">
                <Premium3DCard 
                  onMouseEnter={() => handleCursorState("view", "PLAY")}
                  onMouseLeave={() => handleCursorState("default")}
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden group cursor-none shadow-sm border border-[#EBE3D5] bg-white">
                    <img src={img} alt="Film Thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:hidden">
                      <div className="w-12 h-12 border border-white/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                </Premium3DCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-12 px-6 lg:px-16 w-full max-w-[1400px] mx-auto mt-10" style={{ perspective: 1500 }}>
        <Premium3DCard>
          <div className="w-full bg-[#F5EFE6] rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/50 relative z-10 group">
            
            {/* Left Text */}
            <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-20 bg-[#F5EFE6]">
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
                READY TO BEGIN YOUR JOURNEY?
              </span>
              <h2 className="font-cormorant text-4xl lg:text-[48px] text-[#1F2937] leading-[1.1] mb-6">
                Let's Create Your <br/>
                <span className="italic text-[#C58B48]">Unforgettable Story</span>
              </h2>
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-10 max-w-md">
                Share your vision with us and let our experts craft a celebration that reflects your style and story.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button 
                  variant="champagne" 
                  size="md" 
                  className="font-montserrat text-[10px] w-full sm:w-auto shadow-none hover:scale-105 transition-transform"
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

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2937]/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#FDFBF7] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#EBE3D5] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[300px] lg:h-[400px]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1F2937] hover:bg-[#C58B48] hover:text-white transition-colors border border-[#EBE3D5]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 lg:p-12 text-center">
                <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.2em] uppercase mb-3 block">
                  {selectedProject.location}
                </span>
                <h2 className="font-cormorant text-4xl lg:text-5xl text-[#1F2937] mb-6">
                  {selectedProject.title}
                </h2>
                <div className="w-12 h-[1px] bg-[#C58B48]/50 mx-auto mb-6" />
                <p className="font-inter text-sm text-gray-600 leading-[1.8] max-w-xl mx-auto mb-10">
                  A beautiful celebration filled with love, laughter, and unforgettable moments. This project highlights our dedication to flawless execution and bespoke luxury.
                </p>
                <Button variant="champagne" size="md" className="font-montserrat text-[10px] shadow-none">
                  VIEW FULL GALLERY
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Portfolio;