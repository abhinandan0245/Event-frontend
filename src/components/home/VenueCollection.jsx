import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import {
  Sparkles,
  Play,
  Castle,
  Building2,
  Landmark,
  Waves,
  Grape,
  Mountain,
  Tent,
  Ship,
  ArrowRight,
} from "lucide-react";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// --- DATA ARRAY ---
const venues = [
  { title: "Heritage Palaces", subtitle: "Royal Grandeur", icon: Castle, image: "https://images.unsplash.com/photo-1583089892943-e02e5be026b9?w=800&q=80" },
  { title: "Luxury Hotels", subtitle: "Refined Hospitality", icon: Building2, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" },
  { title: "Private Estates", subtitle: "Exclusive Privacy", icon: Landmark, image: "https://images.unsplash.com/photo-1613490908592-5b927361a913?w=800&q=80" },
  { title: "Beachfront Venues", subtitle: "Coastal Elegance", icon: Waves, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80" },
  { title: "Vineyards & Wineries", subtitle: "Countryside Charm", icon: Grape, image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80" },
  { title: "Mountain Retreats", subtitle: "Elevated Escapes", icon: Mountain, image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80" },
  { title: "Desert Camps", subtitle: "Golden Serenity", icon: Tent, image: "https://images.unsplash.com/photo-1526761122248-b31c93f8b2f9?w=800&q=80" },
  { title: "Yachts & Cruises", subtitle: "Celebrations at Sea", icon: Ship, image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80" },
];

// Split data for the 3 rows to look organic
const row1Data = [...venues.slice(0, 4), ...venues.slice(4, 8)];
const row2Data = [...venues.slice(4, 8), ...venues.slice(0, 4)];
const row3Data = [...venues.slice(2, 8), ...venues.slice(0, 2)];

// ==========================================
// 1. INDIVIDUAL CARD (3D Parallax Logic)
// ==========================================
const VenueCard = ({ venue }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    // Calculate cursor position relative to card center
    const x = (e.clientX - left - width / 2) / 15; 
    const y = (e.clientY - top - height / 2) / 15;

    // Apply smooth 3D tilt and 1.1x zoom
    gsap.to(cardRef.current, {
      rotateY: x,
      rotateX: -y,
      scale: 1.1,
      z: 50, // Pops out
      boxShadow: "0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(197,139,72,0.2)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    // Reset smoothly to original state
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      z: 0,
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="venue-card relative flex flex-col w-[280px] md:w-[320px] aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-[#E5E5E5] bg-white transition-all duration-500 ease-out z-10"
      style={{ transformStyle: "preserve-3d", transformPerspective: "1000px" }}
    >
      <img
        src={venue.image}
        alt={venue.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/20 to-transparent pointer-events-none" />
      
      <div className="absolute top-4 left-4 w-9 h-9 bg-white/95 rounded-full flex items-center justify-center border border-[#C58B48]/30 shadow-sm pointer-events-none translate-z-10">
        <venue.icon size={16} strokeWidth={1.5} className="text-[#C58B48]" />
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col justify-end pointer-events-none translate-z-10">
        <h3 className="font-serif text-lg lg:text-xl font-medium text-white mb-1 drop-shadow-md">
          {venue.title}
        </h3>
        <p className="font-sans text-[10px] lg:text-xs font-medium text-[#E9C38A] drop-shadow-md">
          {venue.subtitle}
        </p>
      </div>
    </div>
  );
};

// ==========================================
// 2. SCROLLING ROW (Marquee Logic)
// ==========================================
const MarqueeRow = ({ items, direction = "left", speed = 40 }) => {
  const rowRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    // Set initial position based on direction
    const distance = direction === "left" ? -50 : 0;
    const startPos = direction === "left" ? 0 : -50;
    
    gsap.set(row, { xPercent: startPos });

    // Infinite continuous scroll
    tweenRef.current = gsap.to(row, {
      xPercent: distance,
      repeat: -1,
      duration: speed,
      ease: "none",
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [direction, speed]);

  return (
    <div 
      className="flex w-max py-4"
      // Pauses ONLY this specific row on hover
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
    >
      <div ref={rowRef} className="flex gap-6 px-3">
        {/* Render items twice to create the seamless infinite loop */}
        {[...items, ...items].map((venue, idx) => (
          <VenueCard key={idx} venue={venue} />
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
const VenueCollection = () => {
  const sectionRef = useRef(null);
  const typingTextRef = useRef(null);
  const mainTitleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Top Section Animation (Typing + Slide Up)
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      textTimeline.to(typingTextRef.current, {
        duration: 1.5,
        text: "CURATED VENUE COLLECTION",
        ease: "none",
      })
      .fromTo(
        [mainTitleRef.current, descRef.current, buttonsRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.5" 
      );
    }, sectionRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF8F0] font-sans pb-24 pt-16 overflow-hidden"
    >
      {/* ==========================================
          TOP SECTION: TEXT & BLENDED HERO IMAGE
          ========================================== */}
      <div className="relative w-full max-w-[1600px] mx-auto min-h-[500px] lg:min-h-[550px] flex items-center px-6 lg:px-12">
        <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
          <div className="absolute top-[-10%] right-[5%] w-[80%] h-[110%] border-t-[1px] border-r-[1px] border-[#C58B48]/40 rounded-tr-[500px] z-0 pointer-events-none" />

          <img
            src="https://images.unsplash.com/photo-1625076932159-61a032e2b7ad?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=1600&q=80"
            alt="Luxury Heritage Palace"
            className="absolute inset-0 w-full h-full object-cover object-center z-10"
          />

          <div className="absolute inset-y-0 left-0 w-[40%] lg:w-[50%] bg-gradient-to-r from-[#FAF8F0] via-[#FAF8F0]/90 to-transparent z-20" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#FAF8F0] via-[#FAF8F0]/80 to-transparent z-20" />
          <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#FAF8F0] to-transparent z-20" />

          <div className="absolute bottom-[10%] right-[10%] z-30 flex items-center justify-center w-28 h-28 lg:w-32 lg:h-32 cursor-pointer group">
            <svg viewBox="0 0 100 100" className="absolute w-full h-full animate-[spin_12s_linear_infinite]">
              <path id="textPath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text fontSize="9.5" fill="#C58B48" letterSpacing="1.5" className="font-sans font-bold">
                <textPath href="#textPath" startOffset="0%">
                  CURATED FOR YOU • CURATED FOR YOU •
                </textPath>
              </text>
            </svg>
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Play className="w-4 h-4 lg:w-5 lg:h-5 text-[#C58B48] ml-1 fill-current" />
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full lg:w-[50%] pt-10 pb-20">
          <div className="flex items-center gap-2 mb-6 text-[#C58B48]">
            <Sparkles size={16} className="stroke-[1.5]" />
            <span
              ref={typingTextRef}
              className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase min-w-[220px] inline-block"
            >
              &nbsp;
            </span>
          </div>

          <h2 ref={mainTitleRef} className="flex flex-col mb-6 opacity-0">
            <span className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-medium leading-[1.1] text-[#1F2937] lg:font-canela">
              Spaces That Define
            </span>
            <span className="font-cormorant text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-medium italic leading-[1.1] text-[#C58B48]">
              Extraordinary Celebrations.
            </span>
          </h2>

          <p ref={descRef} className="font-sans text-xs lg:text-sm font-medium leading-[1.7] text-gray-600 max-w-[440px] mb-10 opacity-0">
            Every celebration deserves a setting as remarkable as the occasion
            itself. Violin Events LLP curates an exclusive collection of
            heritage palaces, luxury resorts, private estates, vineyards,
            waterfront retreats, and architectural landmarks—each selected for
            its character, elegance, and unforgettable atmosphere.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-4 opacity-0">
            <Button variant="primary" shape="pill" size="md" className="w-full sm:w-auto">
              EXPLORE VENUES <ArrowRight size={14} />
            </Button>
            <Button variant="secondary" shape="pill" size="md" className="w-full sm:w-auto">
              DISCUSS YOUR VISION
            </Button>
          </div>
        </div>
      </div>

      <div className="relative w-full flex justify-center mt-[-20px] mb-12 z-20">
        <div className="w-2 h-2 rotate-45 border border-[#C58B48] bg-[#FAF8F0]" />
      </div>

      {/* ==========================================
          BOTTOM SECTION: 3-ROW INFINITE MARQUEE
          ========================================== */}
      {/* 
        The "gallery-wrapper" class uses the CSS group-hover technique. 
        When hovered, all cards fade/blur slightly. 
        The specific card being hovered stays fully opaque and pops out.
      */}
      <div className="gallery-wrapper relative z-20 w-full overflow-hidden flex flex-col gap-2">
        <MarqueeRow items={row1Data} direction="left" speed={45} />
        <MarqueeRow items={row2Data} direction="right" speed={40} />
        <MarqueeRow items={row3Data} direction="left" speed={50} />
      </div>

      
    </section>
  );
};

export default VenueCollection;