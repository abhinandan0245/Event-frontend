import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowUpRight, ArrowRight } from "lucide-react";
import Button from "../ui/Button"; // Make sure this path is correct

gsap.registerPlugin(ScrollTrigger);

// --- DATA ARRAYS FOR 3 DIFFERENT ROWS (Varying counts: 5, 4, 5) ---

const row1Items = [
  {
    title: "Enchanted Forest Vows",
    location: "Lake Como, Italy",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
  },
  {
    title: "Intimate Garden Wedding",
    location: "Tuscany, Italy",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
  },
  {
    title: "Cliffside Celebration",
    location: "Amalfi Coast, Italy",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  },
  {
    title: "Heritage Wedding",
    location: "Rajasthan, India",
    image:
      "https://images.unsplash.com/photo-1526761122248-b31c93f8b2f9?w=800&q=80",
  },
  {
    title: "Vineyard Soirée",
    location: "Napa Valley, USA",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
  },
];

const row2Items = [
  {
    title: "Royal Palace Wedding",
    location: "Udaipur, India",
    image:
      "https://images.unsplash.com/photo-1583089892943-e02e5be026b9?w=1200&q=80",
  },
  {
    title: "Destination Wedding",
    location: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
  },
  {
    title: "Luxury Ballroom Celebration",
    location: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    title: "Lakeside Ceremony",
    location: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80",
  },
];

const row3Items = [
  {
    title: "Yacht Celebration",
    location: "Monaco",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
  },
  {
    title: "Desert Oasis Wedding",
    location: "Marrakech, Morocco",
    image:
      "https://images.unsplash.com/photo-1526761122248-b31c93f8b2f9?w=800&q=80",
  },
  {
    title: "Historic Chateau",
    location: "Loire Valley, France",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
  },
  {
    title: "Tropical Beach Vows",
    location: "Maldives",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  },
  {
    title: "Mountain Peak Vows",
    location: "Aspen, USA",
    image:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80",
  },
];

// ==========================================
// 1. INDIVIDUAL PORTFOLIO CARD
// ==========================================
const PortfolioCard = ({ item, isWider }) => {
  return (
    <div
      className={`
        relative cursor-pointer bg-[#1A1A1A] 
        /* Determine width based on the row to give visual variety */
        ${isWider ? "w-[400px] md:w-[500px] lg:w-[600px]" : "w-[300px] md:w-[350px] lg:w-[450px]"} 
        h-[260px] md:h-[300px] lg:h-[360px]
        transition-all duration-500 ease-out flex-shrink-0
        
        /* ZERO GAPS: No rounding, seamless touching. -ml-[1px] prevents double thick borders */
        rounded-none border-[1px] border-[#C58B48]/60 -ml-[1px]
        shadow-[0_0_15px_rgba(197,139,72,0.15)]
        
        /* HOVER STATE: Elevate Z-Index, Glow Golden Shadow, Solid Golden Border */
        z-10 hover:z-50 hover:scale-[1.03] hover:border-[#C58B48] 
        hover:shadow-[0_0_40px_rgba(197,139,72,0.7)]
        
        /* DIMMING EFFECT: Works with the 'group' class on the master wrapper */
        group-hover:opacity-50 hover:!opacity-100
      `}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
      />

      {/* Dark Gradient for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 pointer-events-none" />

      {/* Floating Link Icon */}
      <div
        className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#C58B48]/50 bg-black/60 backdrop-blur-md flex items-center justify-center text-[#E9C38A] opacity-0 transform translate-y-2 transition-all duration-300 hover:bg-[#C58B48] hover:text-white hover:opacity-100 hover:translate-y-0"
        style={{
          opacity:
            "" /* Handled by standard CSS hover via a wrapper class if needed, or we rely on the parent hover. Let's use peer/group if needed, but direct inline hover works for React */,
        }}
      >
        <ArrowUpRight size={18} strokeWidth={1.5} />
      </div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end pointer-events-none">
        <h3 className="font-serif text-xl lg:text-3xl font-medium text-white mb-2 drop-shadow-lg">
          {item.title}
        </h3>

        <div className="flex items-center gap-1.5 text-[#E9C38A] drop-shadow-md">
          <MapPin size={14} strokeWidth={2} />
          <span className="font-sans text-[10px] lg:text-xs font-semibold tracking-widest uppercase">
            {item.location}
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. SCROLLING MARQUEE ROW
// ==========================================
const MarqueeRow = ({
  items,
  direction = "left",
  speed = 40,
  isWider = false,
}) => {
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
      className="flex w-max"
      // Pauses ONLY this specific row on hover so the user can look/click
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
    >
      {/* Container with NO GAP to ensure cards touch perfectly */}
      <div ref={rowRef} className="flex gap-0">
        {/* Render items twice to create the seamless infinite loop */}
        {[...items, ...items].map((item, idx) => (
          <PortfolioCard key={idx} item={item} isWider={isWider} />
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
const PortfolioGallery = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF8F0] pt-24 pb-32 font-sans overflow-hidden"
    >
      {/* ==========================================
          TOP HEADER SECTION (Centered)
          ========================================== */}
      <div
        ref={headerRef}
        className="max-w-4xl mx-auto flex flex-col items-center text-center mb-20 px-6 relative z-20"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-[1px] bg-[#C58B48]" />
          <span className="text-[#C58B48] text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase">
            OUR PORTFOLIO
          </span>
          <div className="w-6 h-[1px] bg-[#C58B48]" />
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-[72px] font-serif text-[#1F2937] leading-[1.1] mb-6">
          Signature <br className="md:hidden" />
          <span className="italic text-[#C58B48] font-cormorant">
            Celebrations
          </span>
        </h2>

        <p className="font-sans text-sm lg:text-base font-medium leading-[1.7] text-gray-600 max-w-[500px] mb-8">
          A curated showcase of extraordinary celebrations we have designed &
          delivered across the world.
        </p>

        <Button variant="secondary" shape="pill" size="md">
          EXPLORE PORTFOLIO <ArrowRight size={14} />
        </Button>
      </div>

      {/* ==========================================
          STRAIGHT, ZERO-GAP MARQUEE GALLERY
          ========================================== */}
      {/* 
        The "group" class here allows the 'group-hover:opacity-50' in the PortfolioCard 
        to dim all cards EXCEPT the one you are currently hovering over.
      */}
      <div className="w-full overflow-hidden flex flex-col group border-y border-[#C58B48]/60">
        {/* Row 1: 5 Items moving Left */}
        <MarqueeRow items={row1Items} direction="left" speed={55} />

        {/* Row 2: 4 Wider Items moving Right */}
        {/* We use negative margin top to merge the top and bottom borders cleanly */}
        <div className="-mt-[1px]">
          <MarqueeRow
            items={row2Items}
            direction="right"
            speed={50}
            isWider={true}
          />
        </div>

        {/* Row 3: 5 Items moving Left */}
        <div className="-mt-[1px]">
          <MarqueeRow items={row3Items} direction="left" speed={60} />
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
