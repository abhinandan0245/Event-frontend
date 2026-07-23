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
// 1. INDIVIDUAL PORTFOLIO CARD (RESIZED)
// ==========================================
const PortfolioCard = ({ item, isWider }) => {
  return (
    <div
      className={`
        relative cursor-pointer bg-[#1A1A1A] 
        /* UPDATED: Smaller widths to show 4-5 images per screen */
        ${isWider ? "w-[260px] md:w-[320px] lg:w-[380px]" : "w-[200px] md:w-[240px] lg:w-[280px]"} 
        
        /* UPDATED: Smaller heights so all 3 rows fit on screen */
        h-[180px] md:h-[200px] lg:h-[240px]
        
        transition-all duration-500 ease-out flex-shrink-0
        
        /* ZERO GAPS: No rounding, seamless touching. */
        rounded-none border-[1px] border-[#C58B48]/60 -ml-[1px]
        shadow-[0_0_15px_rgba(197,139,72,0.15)]
        
        /* HOVER STATE */
        z-10 hover:z-50 hover:scale-[1.05] hover:border-[#C58B48] 
        hover:shadow-[0_0_40px_rgba(197,139,72,0.8)]
        
        /* DIMMING EFFECT */
        group-hover:opacity-40 hover:!opacity-100
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
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#C58B48]/50 bg-black/60 backdrop-blur-md flex items-center justify-center text-[#E9C38A] opacity-0 transform translate-y-2 transition-all duration-300 hover:bg-[#C58B48] hover:text-white hover:opacity-100 hover:translate-y-0 group-hover/card:opacity-100">
        <ArrowUpRight size={16} strokeWidth={1.5} />
      </div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 lg:p-6 flex flex-col justify-end pointer-events-none">
        <h3 className="font-serif text-lg lg:text-2xl font-medium text-white mb-1 drop-shadow-lg leading-tight">
          {item.title}
        </h3>

        <div className="flex items-center gap-1.5 text-[#E9C38A] drop-shadow-md">
          <MapPin size={12} strokeWidth={2} />
          <span className="font-sans text-[9px] lg:text-[10px] font-semibold tracking-widest uppercase">
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

    const distance = direction === "left" ? -50 : 0;
    const startPos = direction === "left" ? 0 : -50;

    gsap.set(row, { xPercent: startPos });

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
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
    >
      <div ref={rowRef} className="flex gap-0">
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
      className="relative w-full bg-[#FAF8F0] pt-20 pb-28 font-sans overflow-hidden"
    >
      {/* ==========================================
          TOP HEADER SECTION (Centered)
          ========================================== */}
      <div
        ref={headerRef}
        className="max-w-4xl mx-auto flex flex-col items-center text-center mb-16 px-6 relative z-20"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-[1px] bg-[#C58B48]" />
          <span className="text-[#C58B48] text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase">
            OUR PORTFOLIO
          </span>
          <div className="w-6 h-[1px] bg-[#C58B48]" />
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif text-[#1F2937] leading-[1.1] mb-6">
          Signature <br className="md:hidden" />
          <span className="italic text-[#C58B48] font-cormorant">
            Celebrations
          </span>
        </h2>

        <p className="font-sans text-xs lg:text-sm font-medium leading-[1.7] text-gray-600 max-w-[500px] mb-8">
          A curated showcase of extraordinary celebrations we have designed &
          delivered across the world.
        </p>

        <Button variant="secondary" shape="pill" size="md">
          EXPLORE PORTFOLIO <ArrowRight size={14} />
        </Button>
      </div>

      {/* ==========================================
          PREMIUM 3D TAPERED MARQUEE GALLERY
          ========================================== */}
      {/* We make the container slightly wider than the screen (110vw) so the 3D edges don't show blank space */}
      <div className="w-[110vw] -ml-[5vw] overflow-visible flex flex-col items-center justify-center group pb-10">
        {/* ROW 1: Left side height is smaller, Right side is larger */}
        <div
          className="w-full relative z-10 border-y border-[#C58B48]/40 shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
          style={{ transform: "perspective(1200px) rotateY(-3.5deg)" }}
        >
          <MarqueeRow items={row1Items} direction="left" speed={60} />
        </div>

        {/* ROW 2: Left side height is larger, Right side is smaller */}
        {/* Negative top margin (-mt-4) makes it overlap row 1 slightly for a seamless premium look */}
        <div
          className="w-full relative z-20 -mt-4 border-b border-[#C58B48]/40 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
          style={{ transform: "perspective(1200px) rotateY(3.5deg)" }}
        >
          <MarqueeRow
            items={row2Items}
            direction="right"
            speed={55}
            isWider={true}
          />
        </div>

        {/* ROW 3: Left side height is smaller, Right side is larger */}
        <div
          className="w-full relative z-30 -mt-4 border-b border-[#C58B48]/40 shadow-[0_25px_40px_rgba(0,0,0,0.5)]"
          style={{ transform: "perspective(1200px) rotateY(-3.5deg)" }}
        >
          <MarqueeRow items={row3Items} direction="left" speed={65} />
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
