import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Globe,
  Briefcase,
  Crown,
  Compass,
} from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { destinationApi } from "../../api/destinationApi";

gsap.registerPlugin(ScrollTrigger);

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

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80";

const DestinationsSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const featuresRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch featured destinations from API
  useEffect(() => {
    const fetchFeaturedDestinations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await destinationApi.getFeatured();
        console.log("📡 Destinations API Response:", response);

        if (response?.success && response?.data) {
          let featuredData = [];

          if (Array.isArray(response.data)) {
            featuredData = response.data;
          } else if (response.data.destinations) {
            featuredData = response.data.destinations;
          } else if (response.data.data) {
            featuredData = response.data.data;
          }

          const formattedDestinations = featuredData.map((dest) => ({
            name: dest.country || dest.state || dest.city || "Destination",
            subtitle: dest.country || "Exclusive Destination",
            description:
              dest.description ||
              "Experience luxury and elegance at this stunning destination.",
            image: dest.image || FALLBACK_IMAGE,
            country: dest.country,
            id: dest._id || dest.id,
          }));

          setDestinations(formattedDestinations);
        } else {
          setError("No featured destinations found");
          setDestinations([]);
        }
      } catch (err) {
        console.error("❌ Error fetching featured destinations:", err);
        setError("Failed to load destinations. Please try again later.");
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedDestinations();
  }, []);

  // Auto-Carousel Logic
  useEffect(() => {
    if (destinations.length === 0) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [destinations]);

  // GSAP Scroll Animations
  useEffect(() => {
    if (loading) return;

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
  }, [loading]);

  // 3D Card Positioning
  const getCardStyle = (index) => {
    if (destinations.length === 0) return {};

    const total = destinations.length;
    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;

    if (index === activeIndex) {
      return {
        left: "50%",
        transform:
          "translateX(-50%) perspective(1200px) rotateY(0deg) scale(1)",
        zIndex: 30,
        opacity: 1,
        filter: "brightness(1)",
        boxShadow:
          "0 40px 80px -20px rgba(0,0,0,0.4), 0 0 60px rgba(217,177,124,0.25), 0 0 120px rgba(217,177,124,0.1)",
      };
    } else if (index === prevIndex) {
      return {
        left: "50%",
        transform:
          "translateX(-125%) perspective(1200px) rotateY(20deg) scale(0.85)",
        zIndex: 20,
        opacity: 0.7,
        filter: "brightness(0.7)",
        boxShadow: "-35px 25px 50px -15px rgba(0,0,0,0.5)",
      };
    } else if (index === nextIndex) {
      return {
        left: "50%",
        transform:
          "translateX(25%) perspective(1200px) rotateY(-20deg) scale(0.85)",
        zIndex: 20,
        opacity: 0.7,
        filter: "brightness(0.7)",
        boxShadow: "35px 25px 50px -15px rgba(0,0,0,0.5)",
      };
    } else {
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

  // Show loading state
  if (loading) {
    return (
      <section className="relative w-full bg-[#FAF9F5] px-6 py-20 lg:px-12">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B4874A] mb-4"></div>
          <p className="text-gray-500 font-manrope text-sm">
            Loading destinations...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative w-full bg-[#FAF9F5] px-6 py-20 lg:px-12">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Destinations Available</h3>
          <p className="text-gray-500 font-manrope text-sm max-w-md mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="primary"
            shape="shield"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  if (destinations.length === 0) {
    return (
      <section className="relative w-full bg-[#FAF9F5] px-6 py-20 lg:px-12">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Destinations Found</h3>
          <p className="text-gray-500 font-manrope text-sm max-w-md mb-6">
            We couldn't find any featured destinations at the moment. Please check back later.
          </p>
          <Button
            onClick={() => navigate("/destinations")}
            variant="primary"
            shape="shield"
          >
            Explore All Destinations
          </Button>
        </div>
      </section>
    );
  }

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
                onClick={() => navigate("/destinations")}
                variant="primary"
                shape="shield"
                className="h-[44px] px-5 text-[10px] md:h-[48px] md:px-7 md:text-xs"
              >
                Explore Destinations
                <ArrowRight size={14} />
              </Button>

              <Button
                onClick={() => navigate("/contact")}
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
                  key={dest.id || dest.name + index}
                  className="absolute top-1/2 flex w-[220px] sm:w-[240px] lg:w-[280px] xl:w-[320px] 2xl:w-[360px] h-[320px] sm:h-[360px] lg:h-[420px] 2xl:h-[460px] -translate-y-1/2 flex-col overflow-hidden rounded-2xl md:rounded-[2rem] transition-all duration-[1000ms] ease-[0.25,1,0.5,1] cursor-pointer"
                  style={{
                    ...getCardStyle(index),
                    border: "2px solid rgba(217, 177, 124, 0.4)",
                    boxShadow: getCardStyle(index).boxShadow,
                  }}
                  onClick={() => {
                    if (dest.id) {
                      navigate(`/destination/${dest.id}`);
                    }
                  }}
                >
                  {/* Golden Glow Effect - Outer */}
                  <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-[#D9B17C]/30 via-[#F5E6D0]/20 to-[#D9B17C]/30 blur-2xl opacity-50 -z-10" />

                  {/* Golden Border Glow - Inner */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] ring-2 ring-[#D9B17C]/40 ring-inset pointer-events-none z-20" />
                  
                  {/* Corner Accents */}
                  <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-2 border-l-2 border-[#D9B17C] rounded-tl-xl z-20 opacity-80" />
                  <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-2 border-r-2 border-[#D9B17C] rounded-tr-xl z-20 opacity-80" />
                  <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-2 border-l-2 border-[#D9B17C] rounded-bl-xl z-20 opacity-80" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-2 border-r-2 border-[#D9B17C] rounded-br-xl z-20 opacity-80" />

                  {/* Background Image - Clean with minimal gradient */}
                  <div className="absolute inset-0">
                    <img
                      src={dest.image || FALLBACK_IMAGE}
                      alt={dest.name}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
                    {/* Very subtle gradient at bottom ONLY for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* Subtle glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D9B17C]/5 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Card Content - Only Country and Description */}
                  <div className="relative z-10 mt-auto flex flex-col items-center p-4 text-center text-white pb-6">
                    {/* Country Name */}
                    <h3
                      className="mb-2 font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide lg:font-canela"
                      style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                    >
                      {dest.country || dest.name}
                    </h3>

                    {/* Description */}
                    <p className="font-manrope text-[10px] md:text-xs font-normal leading-[1.6] text-[#E8E8E8] max-w-[90%] line-clamp-3">
                      {dest.description}
                    </p>

                    {/* Decorative Line */}
                    <div className="mt-3 w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D9B17C] to-transparent" />
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