import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowUpRight, ArrowRight } from "lucide-react";
import Button from "../ui/Button"; // Make sure this path is correct

gsap.registerPlugin(ScrollTrigger);

// --- 10 Images perfectly mapped to create exactly 3 rows in a 4-column grid ---
const portfolioItems = [
  {
    title: "Enchanted Forest Vows",
    location: "Lake Como, Italy",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    span: "col-span-1", // Row 1: Left
  },
  {
    title: "Royal Palace Wedding",
    location: "Udaipur, India",
    image: "https://images.unsplash.com/photo-1583089892943-e02e5be026b9?w=1200&q=80",
    span: "col-span-1 lg:col-span-2", // Row 1: Center (Wide)
  },
  {
    title: "Intimate Garden Wedding",
    location: "Tuscany, Italy",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    span: "col-span-1", // Row 1: Right
  },
  {
    title: "Luxury Ballroom Celebration",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    span: "col-span-1", // Row 2: Left
  },
  {
    title: "Destination Wedding",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
    span: "col-span-1 lg:col-span-2", // Row 2: Center (Wide)
  },
  {
    title: "Lakeside Ceremony",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80",
    span: "col-span-1", // Row 2: Right
  },
  {
    title: "Cliffside Celebration",
    location: "Amalfi Coast, Italy",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    span: "col-span-1", // Row 3: Column 1
  },
  {
    title: "Heritage Wedding",
    location: "Rajasthan, India",
    image: "https://images.unsplash.com/photo-1526761122248-b31c93f8b2f9?w=800&q=80",
    span: "col-span-1", // Row 3: Column 2
  },
  {
    title: "Vineyard Soirée",
    location: "Napa Valley, USA",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
    span: "col-span-1", // Row 3: Column 3
  },
  {
    title: "Yacht Celebration",
    location: "Monaco",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    span: "col-span-1", // Row 3: Column 4
  },
];

const PortfolioGallery = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const galleryRef = useRef(null);
  const cardsRef = useRef([]);

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
        }
      );

      // Grid Cards Animation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#FAF8F0] pt-24 pb-32 font-sans overflow-hidden">
      
      {/* ==========================================
          TOP HEADER SECTION (Centered)
          ========================================== */}
      <div ref={headerRef} className="max-w-4xl mx-auto flex flex-col items-center text-center mb-24 px-6 relative z-20">
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-[1px] bg-[#C58B48]" />
          <span className="text-[#C58B48] text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase">
            OUR PORTFOLIO
          </span>
          <div className="w-6 h-[1px] bg-[#C58B48]" />
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-[72px] font-serif text-[#1F2937] leading-[1.1] mb-6">
          Signature <br className="md:hidden" />
          <span className="italic text-[#C58B48] font-cormorant">Celebrations</span>
        </h2>

        <p className="font-sans text-sm lg:text-base font-medium leading-[1.7] text-gray-600 max-w-[500px] mb-8">
          A curated showcase of extraordinary celebrations we have designed & delivered across the world.
        </p>

        <Button variant="secondary" shape="pill" size="md">
          EXPLORE PORTFOLIO <ArrowRight size={14} />
        </Button>
      </div>

      {/* ==========================================
          ZERO-GAP TILTED BENTO GRID GALLERY
          ========================================== */}
      {/* The wrapper is tilted (-rotate-2) and scaled slightly so the edges don't show white gaps */}
      <div className="w-full overflow-hidden flex justify-center pb-12">
        <div 
          ref={galleryRef} 
          className="w-[105%] max-w-[1800px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 -rotate-2 scale-[1.02] transform-gpu group"
        >
          {portfolioItems.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`
                ${item.span} 
                relative cursor-pointer bg-[#1A1A1A] 
                h-[260px] md:h-[300px] lg:h-[360px]
                transition-all duration-500 ease-out
                
                /* ZERO GAPS: No rounding, seamless touching */
                rounded-none
                
                /* GOLDEN BORDER & BASE SHADOW */
                border-[1px] border-[#C58B48]/60 
                shadow-[0_0_15px_rgba(197,139,72,0.15)]
                
                /* HOVER STATE: Elevate Z-Index, Glow Golden Shadow, Solid Golden Border */
                z-10 hover:z-50 hover:scale-[1.02] hover:border-[#C58B48] 
                hover:shadow-[0_0_40px_rgba(197,139,72,0.7)]
                
                /* DIMMING EFFECT: Dim un-hovered cards slightly */
                group-hover:opacity-60 hover:!opacity-100
              `}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Dark Gradient for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

              {/* Floating Link Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#C58B48]/50 bg-black/60 backdrop-blur-md flex items-center justify-center text-[#E9C38A] opacity-0 transform translate-y-2 transition-all duration-300 hover:bg-[#C58B48] hover:text-white group-hover:opacity-100 group-hover:translate-y-0">
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end">
                <h3 className="font-serif text-xl lg:text-3xl font-medium text-white mb-2 drop-shadow-lg transition-transform duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-1.5 text-[#E9C38A] drop-shadow-md transition-transform duration-500 transform translate-y-2 group-hover:translate-y-0 delay-75">
                  <MapPin size={14} strokeWidth={2} />
                  <span className="font-sans text-[10px] lg:text-xs font-semibold tracking-widest uppercase">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default PortfolioGallery;