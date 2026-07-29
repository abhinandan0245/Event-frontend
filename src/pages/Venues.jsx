import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Heart,
  Users,
  Award,
  Shield,
  ArrowRight,
  Play,
  HeartHandshake,
  ConciergeBell,
  ChevronRight
} from "lucide-react";
import Button from "../components/ui/Button";

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
const Venues = () => {
  const compRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL VENUES");
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

      gsap.from(".filter-btn", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: ".filter-container", start: "top 90%" },
      });

      gsap.from(".why-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".why-container", start: "top 85%" },
      });
    }, compRef);
    return () => ctx.revert();
  }, []);

  // === DATA ===
  const categories = [
    "ALL VENUES", "PALACES", "RESORTS", "BEACHFRONT", "HERITAGE", "FARMS & GARDENS", "CITY HOTELS",
  ];

  const venues = [
    { id: 1, name: "The Leela Palace", location: "Udaipur, Rajasthan", category: "Palace", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80", capacity: "300 - 800" },
    { id: 2, name: "Taj Exotica Resort & Spa", location: "Goa", category: "Beachfront Resort", image: "https://images.unsplash.com/photo-1512343879784-9602d5de7a10?w=800&q=80", capacity: "150 - 500" },
    { id: 3, name: "Umaid Bhawan Palace", location: "Jodhpur, Rajasthan", category: "Heritage Palace", image: "https://images.unsplash.com/photo-1590582007337-f5d55ec5aaf0?w=800&q=80", capacity: "200 - 600" },
    { id: 4, name: "Alila Villas Uluwatu", location: "Bali, Indonesia", category: "Cliffside Resort", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80", capacity: "100 - 300" },
  ];

  const featuredExperiences = [
    { title: "Royal Palace Wedding", location: "Udaipur, Rajasthan", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80" },
    { title: "Beachside Celebration", location: "Phuket, Thailand", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80" },
    { title: "Heritage Fort Wedding", location: "Jaipur, Rajasthan", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80" },
    { title: "Luxury Resort Wedding", location: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80" },
  ];

  const filteredVenues = selectedCategory === "ALL VENUES" ? venues : venues.filter((v) => v.category.toUpperCase().includes(selectedCategory));

  return (
    <div ref={compRef} className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C58B48] selection:text-white pb-20 overflow-hidden md:cursor-none">
      
      

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[90vh] flex items-center pt-24 lg:pt-32 pb-32" style={{ perspective: 1200 }}>
        
        <motion.div style={{ x: bgX, y: bgY }} className="absolute top-0 right-[-5%] w-full lg:w-[70%] h-[110vh] z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop"
            alt="Extraordinary Venues"
            className="w-full h-full object-cover opacity-95 scale-110"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 35%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 35%)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
        </motion.div>

        {/* Explore Hover Zone */}
        <div 
          className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-10"
          onMouseEnter={() => handleCursorState("explore", "EXPLORE")}
          onMouseLeave={() => handleCursorState("default")}
        />

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col justify-center h-full">
          <motion.div style={{ x: heroX, y: heroY }} className="w-full lg:w-[45%] pt-10 pl-0 md:pl-10">
            <span className="hero-element font-montserrat text-[#C58B48] text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase block mb-6">
              EXTRAORDINARY VENUES
            </span>
            <h1 className="hero-element font-cormorant text-6xl lg:text-[80px] text-[#1F2937] leading-[1.1] mb-2 uppercase tracking-wide">
              Iconic Venues
            </h1>
            <p className="hero-element font-cormorant text-3xl lg:text-[40px] text-[#C58B48] italic mb-8">
              Unforgettable Celebrations.
            </p>

            <div className="hero-element flex items-center justify-start mb-6">
              <div className="w-4 h-4 rounded-full border border-[#C58B48]/50 flex items-center justify-center p-0.5">
                 <div className="w-full h-full bg-[#C58B48] rounded-full opacity-30"></div>
              </div>
            </div>

            <p className="hero-element font-inter text-gray-600 text-xs md:text-sm leading-[1.8] max-w-sm mb-10">
              From royal palaces and heritage forts to luxury resorts and modern
              marvels, we bring you a handpicked collection of venues that set
              the stage for your most precious moments.
            </p>

            <Button variant="champagne" size="md" className="hero-element font-montserrat text-[9px] tracking-[0.2em] shadow-none w-full sm:w-auto hover:scale-105 transition-transform">
              EXPLORE DESTINATIONS <ArrowRight size={14} className="ml-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ================= VENUES FILTER & GRID ================= */}
      <section className="py-16 lg:py-24 relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          
          <div className="text-center mb-16">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
              HANDPICKED VENUES
            </span>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-10 h-[1px] bg-[#C58B48]/40" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#C58B48]" />
              <div className="w-10 h-[1px] bg-[#C58B48]/40" />
            </div>
            <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937]">
              Discover Our Exclusive Venues
            </h2>
          </div>

          <div className="filter-container flex flex-wrap items-center justify-center gap-3 lg:gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`filter-btn px-5 lg:px-6 py-2.5 rounded-full font-montserrat text-[9px] font-bold tracking-[0.15em] transition-all duration-300 ${
                  selectedCategory === category
                    ? "border border-[#C58B48] text-[#1F2937] bg-white shadow-sm"
                    : "border border-transparent text-gray-400 hover:text-[#C58B48]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" style={{ perspective: 1500 }}>
            <AnimatePresence mode="popLayout">
              {filteredVenues.map((venue) => (
                <motion.div
                  key={venue.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                >
                  <Premium3DCard
                    onMouseEnter={() => handleCursorState("view", "VIEW")}
                    onMouseLeave={() => handleCursorState("default")}
                    className="h-full"
                  >
                    <div className="bg-white rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBE3D5] flex flex-col group h-full hover:border-[#C58B48]/40 transition-colors">
                      <div className="relative overflow-hidden aspect-[4/3] rounded-lg mb-5">
                        <img
                          src={venue.image}
                          alt={venue.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <button className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors z-10" onMouseEnter={(e) => e.stopPropagation()}>
                          <Heart className="w-5 h-5 drop-shadow-md" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="px-2 pb-2 flex flex-col flex-grow bg-white relative z-10">
                        <h3 className="font-cormorant text-2xl text-[#1F2937] mb-1 leading-tight">
                          {venue.name}
                        </h3>
                        <p className="font-inter text-[11px] text-gray-400 mb-1 flex items-center gap-1">
                          <MapPin size={10} className="text-[#C58B48]"/> {venue.location}
                        </p>
                        <p className="font-inter text-[11px] text-[#C58B48] mb-5 font-medium">
                          {venue.category}
                        </p>

                        <div className="mt-auto">
                          <div className="flex items-center gap-2 mb-5 font-montserrat text-[9px] font-bold tracking-widest text-[#1F2937] uppercase">
                            <Users size={14} className="text-[#C58B48]" strokeWidth={1.5} />
                            {venue.capacity} Guests
                          </div>

                          <Button
                            variant="outline"
                            size="md"
                            className="w-full font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] hover:bg-[#FDFBF7] hover:border-[#C58B48] group/btn"
                            onMouseEnter={(e) => { e.stopPropagation(); handleCursorState("default"); }}
                            onMouseLeave={(e) => { e.stopPropagation(); handleCursorState("view", "VIEW"); }}
                          >
                            VIEW VENUE <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Premium3DCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE OUR VENUES ================= */}
      <section className="py-20 relative z-10 border-t border-[#EBE3D5]/50 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center why-container">
          <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
            WHY CHOOSE OUR VENUES?
          </span>
          <h2 className="font-cormorant text-3xl lg:text-[40px] text-[#1F2937] mb-16">
            More Than Just a Venue
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { icon: Award, title: "HANDPICKED EXCELLENCE", desc: "Curated for luxury, beauty & exceptional experiences." },
              { icon: HeartHandshake, title: "PERFECTLY MATCHED", desc: "Venues that align with your vision & guest experience." },
              { icon: Shield, title: "EXCLUSIVE ACCESS", desc: "Special arrangements & privileges at top venues." },
              { icon: ConciergeBell, title: "END-TO-END SUPPORT", desc: "From booking to execution, we handle it all." },
            ].map((item, index) => (
              <div key={index} className="why-card flex flex-col items-center group cursor-default">
                <div className="mb-6 opacity-80 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500">
                  <item.icon className="w-10 h-10 text-[#C58B48]" strokeWidth={1} />
                </div>
                <h3 className="font-montserrat text-[10px] font-bold tracking-widest uppercase text-[#1F2937] mb-3">
                  {item.title}
                </h3>
                <p className="font-inter text-xs text-gray-500 leading-relaxed max-w-[240px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DREAM VENUE BANNER (3D) ================= */}
      <section className="py-16 px-6 lg:px-16 w-full max-w-[1400px] mx-auto" style={{ perspective: 1500 }}>
        <Premium3DCard>
          <div className="w-full bg-white rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-[#EBE3D5] overflow-hidden flex flex-col lg:flex-row relative z-10 group">
            
            <div className="w-full lg:w-[45%] p-10 lg:p-16 flex flex-col justify-center bg-white relative z-20">
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
                LET US FIND YOUR
              </span>
              <h2 className="font-cormorant text-4xl lg:text-[52px] text-[#1F2937] leading-none mb-6">
                Dream Venue
              </h2>
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-10 max-w-sm">
                Tell us your vision and our experts will help you find the perfect venue that matches your style and story.
              </p>
              <Button variant="champagne" size="md" className="font-montserrat text-[10px] w-fit shadow-none">
                SCHEDULE A CONSULTATION <ArrowRight size={14} className="ml-2" />
              </Button>
            </div>

            <div className="w-full lg:w-[55%] h-[350px] lg:h-auto relative z-10 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&q=80"
                alt="Lakeside setup"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent hidden lg:block" />
            </div>

          </div>
        </Premium3DCard>
      </section>

      {/* ================= FEATURED EXPERIENCES ================= */}
      <section className="py-16 lg:py-24 relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
            FEATURED VENUE EXPERIENCES
          </span>
          <h2 className="font-cormorant text-3xl lg:text-[40px] text-[#1F2937] mb-12">
            A Glimpse Into Unforgettable Celebrations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" style={{ perspective: 1200 }}>
            {featuredExperiences.map((exp, index) => (
              <Premium3DCard 
                key={index}
                onMouseEnter={() => handleCursorState("view", "PLAY")}
                onMouseLeave={() => handleCursorState("default")}
              >
                <div className="flex flex-col group cursor-pointer h-full">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5 shadow-sm border border-[#EBE3D5]">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-lg transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out">
                        <Play className="w-4 h-4 text-[#C58B48] fill-[#C58B48] ml-1" />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-montserrat text-[#1F2937] text-[11px] font-bold tracking-widest uppercase mb-1">
                    {exp.title}
                  </h3>
                  <p className="font-inter text-xs text-gray-500">
                    {exp.location}
                  </p>
                </div>
              </Premium3DCard>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="md"
              className="font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] hover:bg-[#FDFBF7] hover:border-[#C58B48] group"
            >
              VIEW OUR PORTFOLIO <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-12 px-6 lg:px-16 w-full max-w-[1400px] mx-auto mb-20" style={{ perspective: 1500 }}>
        <Premium3DCard>
          <div className="w-full bg-[#F5EFE6] rounded-2xl overflow-hidden flex flex-col-reverse lg:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/50 relative z-10 group">
            
            <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-20 bg-[#F5EFE6]">
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
                YOUR PERFECT VENUE AWAITS
              </span>
              <h2 className="font-cormorant text-4xl lg:text-[52px] text-[#1F2937] leading-[1.1] mb-6">
                Let's Create Something <br />
                <span className="italic">Extraordinary</span>
              </h2>
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-10 max-w-md">
                From the first conversation to the final celebration, we make every detail seamless and spectacular.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button 
                  variant="champagne" 
                  size="md" 
                  className="font-montserrat text-[10px] w-full sm:w-auto shadow-none hover:scale-105 transition-transform"
                  onMouseEnter={() => handleCursorState("default")}
                >
                  PLAN YOUR CELEBRATION <ArrowRight size={14} className="ml-2" />
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

            <div className="w-full lg:w-1/2 h-[350px] lg:h-auto relative z-10 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1000&q=80"
                alt="Perfect Celebration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F5EFE6] hidden lg:block" />
              
              {/* Gold Stamp Overlay */}
              <motion.div 
                 whileHover={{ scale: 1.1, rotate: 10 }}
                 className="absolute top-10 right-10 w-28 h-28 rounded-full border border-[#D4AF37]/40 flex items-center justify-center opacity-80 backdrop-blur-sm hidden md:flex cursor-pointer bg-white/10"
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

export default Venues;