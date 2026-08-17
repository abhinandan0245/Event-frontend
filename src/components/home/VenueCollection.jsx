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
  Crown,
  MapPin,
} from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { venueApi } from "../../api/venueApi";
import VenuePopup from "../ui/VenuePopup";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ✅ Only FALLBACK_IMAGES for error handling (when image URL fails to load)
const FALLBACK_IMAGES = {
  default: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
};

// Icon mapping based on venue category
const getVenueIcon = (category) => {
  const categoryMap = {
    "Palace": Castle,
    "Palace Hotel": Castle,
    "Heritage Palace": Castle,
    "Luxury Hotel": Building2,
    "Hotel": Building2,
    "Private Estate": Landmark,
    "Estate": Landmark,
    "Beachfront": Waves,
    "Beachfront Resort": Waves,
    "Resort": Waves,
    "Vineyard": Grape,
    "Winery": Grape,
    "Mountain": Mountain,
    "Retreat": Mountain,
    "Desert": Tent,
    "Camp": Tent,
    "Yacht": Ship,
    "Cruise": Ship,
    "Island": Waves,
  };
  return categoryMap[category] || Building2;
};

// ==========================================
// 1. INDIVIDUAL CARD (3D Parallax Logic)
// ==========================================
const VenueCard = ({ venue, onCardClick }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 15;
    const y = (e.clientY - top - height / 2) / 15;

    gsap.to(cardRef.current, {
      rotateY: x,
      rotateX: -y,
      scale: 1.1,
      z: 50,
      boxShadow: "0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(197,139,72,0.2)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setIsHovered(false);
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

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(venue._id || venue.id);
    }
  };

  const Icon = getVenueIcon(venue.category);
  const imageSrc = venue.image || FALLBACK_IMAGES.default;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={handleCardClick}
      className="venue-card relative flex flex-col w-[280px] md:w-[320px] aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-[#E5E5E5] bg-white transition-all duration-500 ease-out z-10"
      style={{ transformStyle: "preserve-3d", transformPerspective: "1000px" }}
    >
      <img
        src={imageSrc}
        alt={venue.name || venue.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.target.src = FALLBACK_IMAGES.default;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/20 to-transparent pointer-events-none" />

      {/* Featured Badge */}
      {venue.featured && (
        <div className="absolute top-4 left-4 bg-[#C58B48] text-white px-3 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1.5 z-10">
          <Crown className="w-3 h-3" />
          Featured
        </div>
      )}

      {/* Icon */}
      <div className="absolute top-4 right-4 w-9 h-9 bg-white/95 rounded-full flex items-center justify-center border border-[#C58B48]/30 shadow-sm pointer-events-none translate-z-10">
        <Icon size={16} strokeWidth={1.5} className="text-[#C58B48]" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col justify-end pointer-events-none translate-z-10">
        <h3 className="font-serif text-lg lg:text-xl font-medium text-white mb-1 drop-shadow-md">
          {venue.name || venue.title}
        </h3>
        <p className="font-sans text-[10px] lg:text-xs font-medium text-[#E9C38A] drop-shadow-md flex items-center gap-1.5">
          <MapPin className="w-3 h-3" />
          {venue.location || venue.subtitle}
        </p>
        {venue.price && (
          <p className="font-sans text-[10px] text-white/70 mt-1">
            Starting from {venue.price}
          </p>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. SCROLLING ROW (Marquee Logic)
// ==========================================
const MarqueeRow = ({ items, direction = "left", speed = 40, onCardClick }) => {
  const rowRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || items.length === 0) return;

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
  }, [direction, speed, items.length]);

  // ✅ Create unique keys for duplicated items
  const duplicatedItems = items.length > 0 
    ? items.map((item, idx) => ({
        ...item,
        _key: `${item._id || item.id || idx}-first`
      })).concat(
        items.map((item, idx) => ({
          ...item,
          _key: `${item._id || item.id || idx}-second`
        }))
      )
    : [];

  return (
    <div
      className="flex w-max py-4"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
    >
      <div ref={rowRef} className="flex gap-6 px-3">
        {duplicatedItems.map((venue) => (
          <VenueCard 
            key={venue._key} 
            venue={venue} 
            onCardClick={onCardClick}
          />
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
  const navigate = useNavigate();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ✅ Fetch featured venues from API - NO FALLBACK DATA
  useEffect(() => {
    const fetchFeaturedVenues = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await venueApi.getFeatured();
        console.log("📡 Venue API Response:", response);
        
        if (response?.success && response?.data) {
          let venueData = [];
          
          // Handle different response formats
          if (Array.isArray(response.data)) {
            venueData = response.data;
          } else if (response.data.venues) {
            venueData = response.data.venues;
          } else if (response.data.data) {
            venueData = response.data.data;
          }

          // ✅ Filter to only show venues with images
          const validVenues = venueData.filter(venue => venue.image);
          
          if (validVenues.length > 0) {
            setVenues(validVenues);
          } else {
            setError("No featured venues with images available");
            setVenues([]);
          }
        } else {
          setError("Failed to load venues. Please try again later.");
          setVenues([]);
        }
      } catch (err) {
        console.error("❌ Error fetching featured venues:", err);
        setError("Failed to load venues. Please try again later.");
        setVenues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedVenues();
  }, []);

  // Handle card click to open popup
  const handleCardClick = (venueId) => {
    setSelectedVenueId(venueId);
    setIsPopupOpen(true);
  };

  // Handle popup close
  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedVenueId(null);
  };

  // GSAP Animations
  useEffect(() => {
    if (loading) return;

    let ctx = gsap.context(() => {
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      textTimeline
        .to(typingTextRef.current, {
          duration: 1.5,
          text: "CURATED VENUE COLLECTION",
          ease: "none",
        })
        .fromTo(
          [mainTitleRef.current, descRef.current, buttonsRef.current],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  // ✅ Loading State
  if (loading) {
    return (
      <section className="relative w-full bg-[#FAF8F0] py-24 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48] mb-4"></div>
          <p className="text-gray-500 font-inter text-sm">Loading venues...</p>
        </div>
      </section>
    );
  }

  // ✅ Error State - Show error message with retry button
  if (error) {
    return (
      <section className="relative w-full bg-[#FAF8F0] py-24 flex items-center justify-center">
        <div className="flex flex-col items-center text-center px-6 max-w-md">
          <div className="text-4xl mb-4">🏛️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Venues Available</h3>
          <p className="text-gray-500 font-inter text-sm mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="secondary"
            shape="pill"
            size="md"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  // ✅ No Data State - Show message when no venues
  if (venues.length === 0) {
    return (
      <section className="relative w-full bg-[#FAF8F0] py-24 flex items-center justify-center">
        <div className="flex flex-col items-center text-center px-6 max-w-md">
          <div className="text-4xl mb-4">🏛️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Venues Found</h3>
          <p className="text-gray-500 font-inter text-sm mb-6">
            We couldn't find any featured venues at the moment. Please check back later.
          </p>
          <Button
            onClick={() => navigate("/venues")}
            variant="secondary"
            shape="pill"
            size="md"
          >
            View All Venues
          </Button>
        </div>
      </section>
    );
  }

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
            <svg
              viewBox="0 0 100 100"
              className="absolute w-full h-full animate-[spin_12s_linear_infinite]"
            >
              <path
                id="textPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text
                fontSize="9.5"
                fill="#C58B48"
                letterSpacing="1.5"
                className="font-sans font-bold"
              >
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

          <p
            ref={descRef}
            className="font-sans text-xs lg:text-sm font-medium leading-[1.7] text-gray-600 max-w-[440px] mb-10 opacity-0"
          >
            Every celebration deserves a setting as remarkable as the occasion
            itself. Violin Events LLP curates an exclusive collection of
            heritage palaces, luxury resorts, private estates, vineyards,
            waterfront retreats, and architectural landmarks—each selected for
            its character, elegance, and unforgettable atmosphere.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center gap-4 opacity-0"
          >
            <Button
              onClick={() => navigate("/venues")}
              variant="primary"
              shape="pill"
              size="md"
              className="w-full sm:w-auto"
            >
              EXPLORE VENUES <ArrowRight size={14} />
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              variant="secondary"
              shape="pill"
              size="md"
              className="w-full sm:w-auto"
            >
              DISCUSS YOUR VISION
            </Button>
          </div>
        </div>
      </div>

      <div className="relative w-full flex justify-center mt-[-20px] mb-12 z-20">
        <div className="w-2 h-2 rotate-45 border border-[#C58B48] bg-[#FAF8F0]" />
      </div>

      {/* ==========================================
          BOTTOM SECTION: INFINITE MARQUEE
          ========================================== */}
      <div className="gallery-wrapper relative z-20 w-full overflow-hidden flex flex-col gap-2">
        <MarqueeRow 
          items={venues} 
          direction="left" 
          speed={60} 
          onCardClick={handleCardClick}
        />
      </div>

      {/* Venue Popup */}
      <VenuePopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        venueId={selectedVenueId}
      />
    </section>
  );
};

export default VenueCollection;