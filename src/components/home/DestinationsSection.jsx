import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Globe, Briefcase, Crown, Compass } from "lucide-react";
import Button from "../ui/Button"; // Ensure this path is correct

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ARRAYS ───
const destinations = [
  {
    name: "BALI",
    subtitle: "Sacred Escapes",
    description:
      "Private villas, oceanfront ceremonies, and timeless island elegance.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  },
  {
    name: "THAILAND",
    subtitle: "Tropical Sophistication",
    description:
      "Luxury resorts, hidden beaches, and unforgettable celebrations.",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
  },
  {
    name: "UAE",
    subtitle: "Modern Grandeur",
    description:
      "Skyline weddings, iconic architecture, and world-class hospitality.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
  },
  {
    name: "ITALY",
    subtitle: "Romantic Heritage",
    description: "Historic villas, rolling vineyards, and Mediterranean charm.",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
  },
  {
    name: "MALDIVES",
    subtitle: "Oceanic Opulence",
    description: "Overwater bungalows, crystal waters, and intimate seclusion.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
  },
  {
    name: "FRANCE",
    subtitle: "Classic Elegance",
    description:
      "Grand châteaux, Parisian romance, and exquisite culinary arts.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
  },
];

const features = [
  {
    icon: Globe,
    title: "WORLDWIDE DESTINATION NETWORK",
    desc: "Luxury venues across six continents.",
  },
  {
    icon: Briefcase,
    title: "COMPLETE TRAVEL COORDINATION",
    desc: "Guests, logistics, and hospitality managed seamlessly.",
  },
  {
    icon: Crown,
    title: "EXCLUSIVE VENUE ACCESS",
    desc: "Private estates, heritage palaces, luxury resorts, and iconic landmarks.",
  },
  {
    icon: Compass,
    title: "TAILORED DESTINATION EXPERIENCES",
    desc: "Every journey designed exclusively around your celebration.",
  },
];

const DestinationsSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const featuresRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-Carousel Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // GSAP Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".fade-text", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      tl.from(
        ".feature-item",
        {
          y: 15,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 1. UPDATED: Flawless Responsive 3D Positioning
  const getCardStyle = (index) => {
    const total = destinations.length;
    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;

    // All cards are locked to the center (left: 50%).
    // We use translateX to move them relative to their own width!

    if (index === activeIndex) {
      // Center Card
      return {
        left: "50%",
        transform:
          "translateX(-50%) perspective(1200px) rotateY(0deg) scale(1)",
        zIndex: 30,
        opacity: 1,
        filter: "brightness(1)",
        boxShadow:
          "0 40px 80px -20px rgba(0,0,0,0.85), 0 0 40px rgba(217,177,124,0.15)",
      };
    } else if (index === prevIndex) {
      // Left Card: Pushed exactly 75% of its width to the left
      return {
        left: "50%",
        transform:
          "translateX(-125%) perspective(1200px) rotateY(20deg) scale(0.85)",
        zIndex: 20,
        opacity: 1,
        filter: "brightness(0.6)",
        boxShadow: "-35px 25px 50px -15px rgba(0,0,0,0.8)",
      };
    } else if (index === nextIndex) {
      // Right Card: Pushed exactly 75% of its width to the right
      return {
        left: "50%",
        transform:
          "translateX(25%) perspective(1200px) rotateY(-20deg) scale(0.85)",
        zIndex: 20,
        opacity: 1,
        filter: "brightness(0.6)",
        boxShadow: "35px 25px 50px -15px rgba(0,0,0,0.8)",
      };
    } else {
      // Hidden Cards
      return {
        left: "50%",
        transform:
          "translateX(-50%) perspective(1200px) rotateY(0deg) scale(0.5)",
        zIndex: 0,
        opacity: 0,
        pointerEvents: "none",
        boxShadow: "0 0 0 rgba(0,0,0,0)",
      };
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FAF9F5] px-6 py-10 md:py-12 lg:px-12 lg:py-16"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-4">
          {/* LEFT: TEXT CONTENT */}
          <div ref={textRef} className="lg:col-span-5">
            <h4 className="fade-text mb-3 font-manrope text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#B4874A]">
              Global Destinations. Limitless Possibilities.
            </h4>

            <h2 className="fade-text mb-4 flex flex-col">
              <span className="font-serif text-3xl md:text-4xl lg:text-[48px] xl:text-[56px] font-medium leading-[0.95] tracking-[-1px] text-[#171717] lg:font-canela">
                Where Every
                <br className="hidden lg:block" /> Destination
              </span>
              <span className="font-cormorant text-3xl md:text-4xl lg:text-[48px] xl:text-[56px] font-medium italic leading-[1] tracking-[-1px] text-[#B5793F]">
                Becomes Your Signature.
              </span>
            </h2>

            <p className="fade-text mb-6 max-w-[540px] font-manrope text-xs md:text-sm lg:text-base font-normal leading-[1.6] text-[#5E5E5E]">
              Whether exchanged beneath the domes of Rajasthan, along the shores
              of the Mediterranean, or within the skyline of Dubai, every
              destination is carefully chosen to reflect your story. We curate
              extraordinary venues and seamless experiences across the world's
              most celebrated locations.
            </p>

            <div className="fade-text flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant="primary"
                shape="shield"
                className="h-[44px] px-5 text-[10px] md:h-[48px] md:px-7 md:text-xs"
              >
                Explore Destinations
                <ArrowRight size={14} />
              </Button>

              <Button
                variant="wine"
                shape="shield"
                className="h-[44px] px-5 text-[10px] border-[#D6C2AA] md:h-[48px] md:px-7 md:text-xs"
              >
                Discuss Your Vision
                <ArrowRight size={14} className="text-[#B5793F]" />
              </Button>
            </div>
          </div>

          {/* RIGHT: 3D DESTINATION CAROUSEL */}
          <div className="relative flex h-[380px] sm:h-[420px] lg:h-[480px] 2xl:h-[550px] justify-center lg:col-span-7 overflow-visible mt-6 lg:mt-0">
            <div className="relative w-full h-full">
              {destinations.map((dest, index) => (
                <div
                  key={dest.name}
                  // 2. UPDATED: Added 2xl sizing for very large screens
                  className="absolute top-1/2 flex w-[220px] sm:w-[240px] lg:w-[280px] xl:w-[320px] 2xl:w-[360px] h-[320px] sm:h-[360px] lg:h-[420px] 2xl:h-[460px] -translate-y-1/2 flex-col overflow-hidden rounded-2xl md:rounded-[2rem] border-[3px] border-[#D9B17C]/60 bg-[#171717] ring-1 ring-inset ring-black/50 transition-all duration-[1000ms] ease-[0.25,1,0.5,1]"
                  style={getCardStyle(index)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/95" />
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 mt-auto flex flex-col items-center p-4 text-center text-white pb-6">
                    <div className="mb-2 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-[#D9B17C] bg-black/60 shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md">
                      <Crown className="h-4 w-4 md:h-5 md:w-5 text-[#D9B17C]" />
                    </div>

                    <h3
                      className="mb-1 font-serif text-xl md:text-2xl lg:text-3xl font-medium tracking-wide lg:font-canela"
                      style={{ textShadow: "0 4px 10px rgba(0,0,0,0.8)" }}
                    >
                      {dest.name}
                    </h3>
                    <h4
                      className="mb-2 font-cormorant text-sm md:text-base lg:text-lg font-medium italic text-[#D9B17C]"
                      style={{ textShadow: "0 2px 5px rgba(0,0,0,0.8)" }}
                    >
                      {dest.subtitle}
                    </h4>
                    <p className="font-manrope text-[10px] md:text-xs font-normal leading-[1.5] text-[#E8E8E8] max-w-[95%]">
                      {dest.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= BOTTOM AREA: FEATURES GRID ================= */}
        <div
          ref={featuresRef}
          className="mt-12 border-t border-[#D6C2AA]/50 pt-8 lg:mt-16"
        >
          <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 lg:divide-x lg:divide-[#D6C2AA]/50">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="feature-item flex flex-col items-center px-2 text-center"
              >
                <div className="mb-2 text-[#B4874A]">
                  <feature.icon
                    strokeWidth={1.2}
                    size={28}
                    className="md:w-8 md:h-8 lg:w-10 lg:h-10"
                  />
                </div>
                <h5 className="mb-1 font-manrope text-[10px] md:text-xs font-semibold uppercase tracking-wide text-[#171717]">
                  {feature.title}
                </h5>
                <p className="max-w-[220px] font-manrope text-[10px] md:text-xs font-normal leading-[1.5] text-[#5E5E5E]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
