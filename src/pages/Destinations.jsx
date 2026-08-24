import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Play,
  Palmtree,
  ConciergeBell,
  Landmark,
  Gem,
  ShieldCheck,
  FilterX,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Crown,
  Users,
} from "lucide-react";
import Button from "../components/ui/Button";
import { destinationApi } from "../api/destinationApi";
import { venueApi } from "../api/venueApi";
import VenuePopup from "../components/ui/VenuePopup";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop";
const VENUE_FALLBACK =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80";

// ================= ENHANCED PREMIUM 3D CARD WITH GLARE =================
const Premium3DCard = ({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        cursor: "pointer",
      }}
      className={`relative ${className}`}
    >
      <div
        style={{ transform: "translateZ(30px)" }}
        className="w-full h-full relative rounded-xl overflow-hidden group"
      >
        {children}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none rounded-xl transition-opacity duration-300"
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`,
            ),
          }}
        />
      </div>
    </motion.div>
  );
};

// ================= IMAGE CAROUSEL COMPONENT (No Thumbnails) =================
const ImageCarousel = ({ images, venueName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = useRef(null);

  const allImages = React.useMemo(() => {
    const imgList = [];
    if (images?.image) imgList.push(images.image);
    if (images?.images && images.images.length > 0) {
      images.images.forEach((img) => {
        if (!imgList.includes(img)) {
          imgList.push(img);
        }
      });
    }
    return imgList.length > 0
      ? imgList
      : [
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
        ];
  }, [images]);

  const totalImages = allImages.length;

  useEffect(() => {
    if (isPaused || totalImages <= 1) return;

    slideInterval.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 3000);

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isPaused, totalImages]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    resetTimer();
  };

  const resetTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalImages);
      }, 3000);
    }
  };

  if (totalImages === 0) return null;

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full aspect-video bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={allImages[currentIndex]}
            alt={`${venueName} - ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80";
            }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {totalImages > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-0.5 rounded-full text-[10px] backdrop-blur-sm">
            {currentIndex + 1} / {totalImages}
          </div>
        )}

        {totalImages > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronRight size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ================= MAIN COMPONENT =================
const Destinations = () => {
  const compRef = useRef(null);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");

  // States for API Data
  const [dynamicDestinations, setDynamicDestinations] = useState([]);
  const [allRawData, setAllRawData] = useState([]);
  const [featuredVenues, setFeaturedVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [venuesLoading, setVenuesLoading] = useState(true);

  // States for Filters
  const [filters, setFilters] = useState({
    country: "",
    state: "",
    city: "",
  });

  // Popup state
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCursorState = (variant, text = "") => {
    setCursorVariant(variant);
    setCursorText(text);
  };

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

  // Extract array safely from backend response
  const extractArray = (response) => {
    if (
      response &&
      response.data &&
      Array.isArray(response.data.destinations)
    ) {
      return response.data.destinations;
    } else if (response && Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response)) {
      return response;
    }
    return [];
  };

  // Extract venues from response
  const extractVenues = (response) => {
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (response && Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response)) {
      return response;
    }
    return [];
  };

  // Handle venue card click - open popup
  const handleVenueClick = (venueId) => {
    if (venueId) {
      setSelectedVenueId(venueId);
      setIsPopupOpen(true);
    }
  };

  // Close popup
  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedVenueId(null);
  };

  // 1. Initial Load: Fetch destinations and featured venues
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const destResponse = await destinationApi.getAll();
        setAllRawData(extractArray(destResponse));

        try {
          const venueResponse = await venueApi.getFeatured();
          const venues = extractVenues(venueResponse);
          setFeaturedVenues(venues.length > 0 ? venues : getFallbackVenues());
        } catch (venueError) {
          console.error("Failed to load featured venues:", venueError);
          setFeaturedVenues(getFallbackVenues());
        } finally {
          setVenuesLoading(false);
        }
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  // 2. Filter Load: Fetch data WHENEVER the filters change
  useEffect(() => {
    const fetchFilteredDestinations = async () => {
      try {
        setLoading(true);
        const activeFilters = {};
        if (filters.country) activeFilters.country = filters.country;
        if (filters.state) activeFilters.state = filters.state;
        if (filters.city) activeFilters.city = filters.city;

        const response = await destinationApi.getAll(activeFilters);
        const dataArray = extractArray(response);
        setDynamicDestinations(dataArray);
      } catch (error) {
        console.error("Failed to load filtered destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredDestinations();
  }, [filters]);

  // Fallback venues in case API fails
  const getFallbackVenues = () => {
    return [
      {
        _id: "1",
        name: "ANANTARA KOH SAMUI",
        location: "Koh Samui, Thailand",
        image:
          "https://images.unsplash.com/photo-1584132967335-2d5a7bda06f0?w=600&q=80",
        images: [
          "https://images.unsplash.com/photo-1584132967335-2d5a7bda06f0?w=600&q=80",
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
        ],
        category: "Luxury Resort",
        price: "₹65,000",
      },
      // ... other venues with images array
    ];
  };

  // GSAP Animations
  useEffect(() => {
    if (loading || !compRef.current) return;
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
      gsap.from(".floating-banner", {
        y: 100,
        opacity: 0,
        rotationX: 20,
        transformPerspective: 1000,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".floating-banner", start: "top 95%" },
      });
    }, compRef);
    return () => ctx.revert();
  }, [loading]);

  // --- Generate Dynamic Dropdown Options from allRawData ---
  const uniqueCountries = [
    ...new Set(allRawData.map((item) => item.country).filter(Boolean)),
  ];

  const uniqueStates = [
    ...new Set(
      allRawData
        .filter((item) => !filters.country || item.country === filters.country)
        .map((item) => item.state)
        .filter(Boolean),
    ),
  ];

  const uniqueCities = [
    ...new Set(
      allRawData
        .filter(
          (item) =>
            (!filters.country || item.country === filters.country) &&
            (!filters.state || item.state === filters.state),
        )
        .map((item) => item.city)
        .filter(Boolean),
    ),
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" && { state: "", city: "" }),
      ...(name === "state" && { city: "" }),
    }));
  };

  const clearFilters = () => {
    setFilters({ country: "", state: "", city: "" });
  };

  const hasActiveFilters = filters.country || filters.state || filters.city;

  // Display venues
  const displayVenues =
    featuredVenues.length > 0 ? featuredVenues : getFallbackVenues();

  return (
    <div
      ref={compRef}
      className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C58B48] selection:text-white pb-20 overflow-hidden md:cursor-none"
    >
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative w-full min-h-[90vh] flex items-center pt-24 lg:pt-32 pb-16 lg:pb-20 overflow-hidden"
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute top-0 right-[-5%] w-full lg:w-[70%] h-full z-0 pointer-events-none"
        >
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop"
            alt="Destination Wedding"
            className="w-full h-full object-cover opacity-95 scale-110"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 35%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 35%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
        </motion.div>

        <div
          className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-10"
          onMouseEnter={() => handleCursorState("explore", "EXPLORE")}
          onMouseLeave={() => handleCursorState("default")}
        />

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col justify-center h-full">
          <motion.div
            style={{ x: heroX, y: heroY }}
            className="w-full lg:w-[45%] pt-6 lg:pt-10 pl-0 md:pl-10"
          >
            <span className="hero-element font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              DESTINATION WEDDINGS
            </span>
            <h1 className="hero-element font-cormorant text-4xl sm:text-5xl lg:text-[72px] text-[#1F2937] leading-[1.1] mb-4">
              Where Your Love Story <br />
              <span className="italic text-[#C58B48]">
                Becomes an Unforgettable Journey
              </span>
            </h1>

            <p className="hero-element font-inter text-gray-600 text-[13px] leading-[1.8] max-w-[460px] mb-8 line-clamp-6 lg:line-clamp-none overflow-hidden">
              Some weddings are celebrated. Others become stories that are
              remembered for a lifetime. Violin Events LLP creates extraordinary
              destination weddings in some of the world's most captivating
              locations. From the glamour of Dubai and the timeless beauty of
              India to the tropical shores of Sri Lanka, Malaysia, Thailand and
              Vietnam, we bring together exceptional venues, entertainment and
              experiences to create celebrations that feel truly yours. Whether
              it is an intimate celebration by the sea, a grand palace wedding
              or a spectacular multi day celebration, every detail is
              thoughtfully brought together to make your wedding unforgettable.
            </p>

            <div className="hero-element flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Button
                onClick={() =>
                  (window.location.href = "/plan-your-celebration")
                }
                variant="champagne"
                size="md"
                className="font-montserrat text-[9px] tracking-[0.2em] shadow-none w-full sm:w-auto hover:scale-105 transition-transform"
              >
                PLAN YOUR CELEBRATION <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= POPULAR DESTINATIONS WITH FILTERS ================= */}
      <section className="py-24 relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          <div className="flex flex-col items-center justify-center mb-6">
            <h2 className="font-cormorant text-4xl md:text-5xl text-[#1F2937] mb-4 uppercase tracking-widest">
              Discover Extraordinary Destinations
            </h2>
            <div className="w-4 h-4 rounded-full border border-[#C58B48]/50 flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-[#C58B48] rounded-full opacity-30"></div>
            </div>
            <p className="font-inter text-sm text-gray-500 mt-4 max-w-2xl">
              From iconic palaces and private islands to breathtaking beaches
              and luxurious resorts, discover remarkable destinations across
              Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam, carefully
              selected to set the stage for unforgettable weddings and
              celebrations.
            </p>
          </div>

          {/* ----- FILTER SECTION ----- */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EBE3D5] mb-12 flex flex-col md:flex-row gap-4 items-center justify-center relative z-20">
            <div className="flex-1 w-full text-left">
              <label className="block text-xs font-montserrat font-bold tracking-widest text-gray-500 mb-2">
                COUNTRY
              </label>
              <select
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                className="w-full bg-[#FDFBF7] border border-[#EBE3D5] rounded-lg p-3 text-sm font-inter text-gray-700 focus:outline-none focus:border-[#C58B48]"
              >
                <option value="">All Countries</option>
                {uniqueCountries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 w-full text-left">
              <label className="block text-xs font-montserrat font-bold tracking-widest text-gray-500 mb-2">
                STATE
              </label>
              <select
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
                disabled={!uniqueStates.length}
                className="w-full bg-[#FDFBF7] border border-[#EBE3D5] rounded-lg p-3 text-sm font-inter text-gray-700 focus:outline-none focus:border-[#C58B48] disabled:opacity-50"
              >
                <option value="">All States</option>
                {uniqueStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 w-full text-left">
              <label className="block text-xs font-montserrat font-bold tracking-widest text-gray-500 mb-2">
                CITY
              </label>
              <select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                disabled={!uniqueCities.length}
                className="w-full bg-[#FDFBF7] border border-[#EBE3D5] rounded-lg p-3 text-sm font-inter text-gray-700 focus:outline-none focus:border-[#C58B48] disabled:opacity-50"
              >
                <option value="">All Cities</option>
                {uniqueCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <div className="md:mt-6 w-full md:w-auto">
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold tracking-widest hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <FilterX size={16} /> CLEAR
                </button>
              </div>
            )}
          </div>

          {/* ----- DESTINATIONS GRID ----- */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48]"></div>
            </div>
          ) : dynamicDestinations.length === 0 ? (
            <div className="py-20 text-gray-500 font-inter">
              No destinations found for the selected filters.
            </div>
          ) : (
            <div
              className="dest-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
              style={{ perspective: 1200 }}
            >
              {dynamicDestinations.map((dest, idx) => {
                const destId = dest._id || dest.id;
                return (
                  <div key={destId || idx} className="dest-card-wrapper h-full">
                    <Link
                      to={`/destination/${destId}`}
                      className="block h-full"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBE3D5] flex flex-col h-full group hover:border-[#C58B48]/40 transition-colors">
                        <div className="w-full aspect-[4/5] relative overflow-hidden">
                          <img
                            src={dest.image || FALLBACK_IMAGE}
                            alt={dest.city}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_IMAGE;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-6 text-center flex-grow flex flex-col justify-center bg-white z-10">
                          <h3 className="font-montserrat text-[11px] font-bold tracking-widest text-[#1F2937] mb-2 uppercase">
                            {dest.city}
                          </h3>
                          <p className="font-inter text-[10px] text-gray-500 uppercase">
                            {dest.category || dest.state}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ================= EXCLUSIVE VENUES ================= */}
      <section className="py-16 relative z-10 border-t border-[#EBE3D5]/50">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          <div className="flex flex-col items-center justify-center mb-6">
            <h2 className="font-cormorant text-4xl md:text-5xl text-[#1F2937] mb-4 uppercase tracking-widest">
              Discover Extraordinary Destinations
            </h2>
            <div className="w-4 h-4 rounded-full border border-[#C58B48]/50 flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-[#C58B48] rounded-full opacity-30"></div>
            </div>
            <p className="font-inter text-sm text-gray-500 mt-4 max-w-2xl">
              From iconic palaces and private islands to breathtaking beaches
              and luxurious resorts, discover remarkable destinations across
              Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam, carefully
              selected to set the stage for unforgettable weddings and
              celebrations.
            </p>
          </div>

          {venuesLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48]"></div>
            </div>
          ) : (
            <div
              className="venue-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12"
              style={{ perspective: 1200 }}
            >
              {displayVenues.map((venue, idx) => {
                const venueId = venue._id || venue.id;
                const venueName = venue.name || venue.title || "Venue";

                return (
                  <div key={venueId || idx} className="venue-card-wrapper">
                    <Premium3DCard
                      onMouseEnter={() => handleCursorState("view", "VIEW")}
                      onMouseLeave={() => handleCursorState("default")}
                      onClick={() => handleVenueClick(venueId)}
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBE3D5] flex flex-col h-full group hover:border-[#C58B48]/40 transition-colors">
                        <ImageCarousel
                          images={{
                            image: venue.image,
                            images: venue.images || [],
                          }}
                          venueName={venueName}
                        />

                        <div className="p-3 flex flex-col flex-grow">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-montserrat text-[10px] font-bold tracking-widest text-[#1F2937] uppercase leading-relaxed">
                              {venueName}
                            </h3>
                            {venue.featured && (
                              <Crown className="w-3 h-3 text-[#C58B48] flex-shrink-0" />
                            )}
                          </div>

                          {venue.location && (
                            <p className="font-inter text-[9px] text-gray-400 flex items-center gap-1">
                              <MapPin size={10} className="text-[#C58B48]" />
                              {venue.location}
                            </p>
                          )}

                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Users size={12} className="text-[#C58B48]" />
                              <span className="font-inter text-[9px] text-gray-500">
                                {venue.capacity || "100-500"}
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="font-montserrat text-[7px] border-[#EBE3D5] text-[#1F2937] hover:border-[#C58B48] px-3 py-1 h-auto"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleVenueClick(venueId);
                              }}
                            >
                              VIEW
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Premium3DCard>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-12">
            <Link to="/venues">
              <Button
                variant="outline"
                className="font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] hover:border-[#C58B48] group"
              >
                VIEW ALL VENUES{" "}
                <ArrowRight
                  size={14}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Venue Popup */}
      <VenuePopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        venueId={selectedVenueId}
      />
    </div>
  );
};

export default Destinations;