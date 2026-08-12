import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
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
  MapPin
} from "lucide-react";
import Button from "../components/ui/Button";
import { destinationApi } from "../api/destinationApi";
import { venueApi } from "../api/venueApi";
import VenuePopup from "../components/ui/VenuePopup";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop";
const VENUE_FALLBACK = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80";

// ================= ENHANCED PREMIUM 3D CARD WITH GLARE =================
const Premium3DCard = ({ children, className, onMouseEnter, onMouseLeave, onClick }) => {
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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", cursor: "pointer" }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full relative rounded-xl overflow-hidden group">
        {children}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none rounded-xl transition-opacity duration-300"
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`
            )
          }}
        />
      </div>
    </motion.div>
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
    city: ""
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
    if (response && response.data && Array.isArray(response.data.destinations)) {
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
        image: "https://images.unsplash.com/photo-1584132967335-2d5a7bda06f0?w=600&q=80",
        category: "Luxury Resort",
        price: "₹65,000"
      },
      { 
        _id: "2",
        name: "ROSEWOOD PHUKET", 
        location: "Phuket, Thailand",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
        category: "Luxury Hotel",
        price: "₹75,000"
      },
      { 
        _id: "3",
        name: "JW MARRIOTT PHUKET", 
        location: "Phuket, Thailand",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424ffe2?w=600&q=80",
        category: "Resort",
        price: "₹55,000"
      },
      { 
        _id: "4",
        name: "SIX SENSES YAO NOI", 
        location: "Yao Noi, Thailand",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
        category: "Eco Resort",
        price: "₹85,000"
      },
      { 
        _id: "5",
        name: "BANYAN TREE PHUKET", 
        location: "Phuket, Thailand",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
        category: "Luxury Resort",
        price: "₹70,000"
      },
    ];
  };

  // GSAP Animations
  useEffect(() => {
    if (loading || !compRef.current) return;
    let ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 60, opacity: 0, rotationX: -20, transformPerspective: 1000,
        duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2,
      });
      gsap.from(".floating-banner", {
        y: 100, opacity: 0, rotationX: 20, transformPerspective: 1000,
        duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".floating-banner", start: "top 95%" },
      });
    }, compRef);
    return () => ctx.revert();
  }, [loading]); 

  // --- Generate Dynamic Dropdown Options from allRawData ---
  const uniqueCountries = [...new Set(allRawData.map(item => item.country).filter(Boolean))];
  
  const uniqueStates = [...new Set(allRawData
    .filter(item => !filters.country || item.country === filters.country)
    .map(item => item.state)
    .filter(Boolean)
  )];

  const uniqueCities = [...new Set(allRawData
    .filter(item => 
      (!filters.country || item.country === filters.country) && 
      (!filters.state || item.state === filters.state)
    )
    .map(item => item.city)
    .filter(Boolean)
  )];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'country' && { state: '', city: '' }),
      ...(name === 'state' && { city: '' })
    }));
  };

  const clearFilters = () => {
    setFilters({ country: "", state: "", city: "" });
  };

  const hasActiveFilters = filters.country || filters.state || filters.city;

  // Display venues
  const displayVenues = featuredVenues.length > 0 ? featuredVenues : getFallbackVenues();

  return (
    <div ref={compRef} className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C58B48] selection:text-white pb-20 overflow-hidden md:cursor-none">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[90vh] flex items-center pt-24 lg:pt-32 pb-32" style={{ perspective: 1200 }}>
        <motion.div style={{ x: bgX, y: bgY }} className="absolute top-0 right-[-5%] w-full lg:w-[70%] h-[110vh] z-0 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop" alt="Thailand Beach Wedding" className="w-full h-full object-cover opacity-95 scale-110" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 35%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 35%)" }}/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
        </motion.div>

        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-10" onMouseEnter={() => handleCursorState("explore", "EXPLORE")} onMouseLeave={() => handleCursorState("default")}/>

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col justify-center h-full">
          <motion.div style={{ x: heroX, y: heroY }} className="w-full lg:w-[45%] pt-10 pl-0 md:pl-10">
            <span className="hero-element font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">DESTINATION WEDDINGS IN</span>
            <h1 className="hero-element font-cormorant text-6xl lg:text-[80px] text-[#1F2937] leading-[1.1] mb-2 uppercase tracking-wide">Thailand</h1>
            <p className="hero-element font-cormorant text-3xl lg:text-[40px] text-[#C58B48] italic mb-8">Where Romance Meets Paradise</p>

            <div className="hero-element flex items-center justify-start mb-6">
              <div className="w-4 h-4 rounded-full border border-[#C58B48]/50 flex items-center justify-center p-0.5"><div className="w-full h-full bg-[#C58B48] rounded-full opacity-30"></div></div>
            </div>

            <p className="hero-element font-inter text-gray-600 text-[13px] leading-[1.8] max-w-[380px] mb-10">
              From turquoise waters to golden sunsets, Thailand offers the perfect backdrop for your dream wedding. Celebrate your love in a land of breathtaking beauty, warm hospitality and unforgettable experiences.
            </p>

            <div className="hero-element flex flex-col sm:flex-row items-center gap-6">
              <Button variant="champagne" size="md" className="font-montserrat text-[9px] tracking-[0.2em] shadow-none w-full sm:w-auto hover:scale-105 transition-transform">
                PLAN YOUR THAILAND WEDDING <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= POPULAR DESTINATIONS WITH FILTERS ================= */}
      <section className="py-24 relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          
          <div className="flex flex-col items-center justify-center mb-10">
            <h2 className="font-cormorant text-4xl text-[#1F2937] mb-4 uppercase tracking-widest">
              Explore Destinations
            </h2>
            <div className="w-4 h-4 rounded-full border border-[#C58B48]/50 flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-[#C58B48] rounded-full opacity-30"></div>
            </div>
          </div>

          {/* ----- FILTER SECTION ----- */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EBE3D5] mb-12 flex flex-col md:flex-row gap-4 items-center justify-center relative z-20">
            <div className="flex-1 w-full text-left">
              <label className="block text-xs font-montserrat font-bold tracking-widest text-gray-500 mb-2">COUNTRY</label>
              <select name="country" value={filters.country} onChange={handleFilterChange} className="w-full bg-[#FDFBF7] border border-[#EBE3D5] rounded-lg p-3 text-sm font-inter text-gray-700 focus:outline-none focus:border-[#C58B48]">
                <option value="">All Countries</option>
                {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex-1 w-full text-left">
              <label className="block text-xs font-montserrat font-bold tracking-widest text-gray-500 mb-2">STATE</label>
              <select name="state" value={filters.state} onChange={handleFilterChange} disabled={!uniqueStates.length} className="w-full bg-[#FDFBF7] border border-[#EBE3D5] rounded-lg p-3 text-sm font-inter text-gray-700 focus:outline-none focus:border-[#C58B48] disabled:opacity-50">
                <option value="">All States</option>
                {uniqueStates.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="flex-1 w-full text-left">
              <label className="block text-xs font-montserrat font-bold tracking-widest text-gray-500 mb-2">CITY</label>
              <select name="city" value={filters.city} onChange={handleFilterChange} disabled={!uniqueCities.length} className="w-full bg-[#FDFBF7] border border-[#EBE3D5] rounded-lg p-3 text-sm font-inter text-gray-700 focus:outline-none focus:border-[#C58B48] disabled:opacity-50">
                <option value="">All Cities</option>
                {uniqueCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {hasActiveFilters && (
              <div className="md:mt-6 w-full md:w-auto">
                <button onClick={clearFilters} className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold tracking-widest hover:bg-red-50 hover:text-red-600 transition-colors">
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
            <div className="dest-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6" style={{ perspective: 1200 }}>
              {dynamicDestinations.map((dest, idx) => {
                const destId = dest._id || dest.id;
                return (
                  <div key={destId || idx} className="dest-card-wrapper h-full">
                    <Link to={`/destination/${destId}`} className="block h-full">
                      <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBE3D5] flex flex-col h-full group hover:border-[#C58B48]/40 transition-colors">
                        <div className="w-full aspect-[4/5] relative overflow-hidden">
                          <img src={dest.image || FALLBACK_IMAGE} alt={dest.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-6 text-center flex-grow flex flex-col justify-center bg-white z-10">
                          <h3 className="font-montserrat text-[11px] font-bold tracking-widest text-[#1F2937] mb-2 uppercase">{dest.city}</h3>
                          <p className="font-inter text-[10px] text-gray-500 uppercase">{dest.category || dest.state}</p>
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

      {/* ================= EXCLUSIVE VENUES (Featured Venues from API) ================= */}
      <section className="py-16 relative z-10 border-t border-[#EBE3D5]/50">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          <div className="flex flex-col items-center justify-center mb-16">
            <h2 className="font-cormorant text-4xl text-[#1F2937] mb-4 uppercase tracking-widest">Exclusive Venues</h2>
            <div className="w-4 h-4 rounded-full border border-[#C58B48]/50 flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-[#C58B48] rounded-full opacity-30"></div>
            </div>
            <p className="font-inter text-sm text-gray-500 mt-2">
              {displayVenues.length} handpicked venues for your celebration
            </p>
          </div>

          {venuesLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48]"></div>
            </div>
          ) : (
            <div className="venue-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6" style={{ perspective: 1200 }}>
              {displayVenues.map((venue, idx) => {
                const venueId = venue._id || venue.id;
                const venueName = venue.name || venue.title || "Venue";
                const venueImage = venue.image || venue.img || VENUE_FALLBACK;
                const venueLocation = venue.location || venue.city || "";
                
                return (
                  <div key={venueId || idx} className="venue-card-wrapper">
                    <Premium3DCard 
                      onMouseEnter={() => handleCursorState("view", "VIEW")} 
                      onMouseLeave={() => handleCursorState("default")}
                      onClick={() => handleVenueClick(venueId)}
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBE3D5] flex flex-col h-full group hover:border-[#C58B48]/40 transition-colors">
                        <div className="w-full aspect-video relative overflow-hidden">
                          <img 
                            src={venueImage} 
                            alt={venueName} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            onError={(e) => { e.currentTarget.src = VENUE_FALLBACK; }}
                          />
                          {venue.featured && (
                            <div className="absolute top-3 left-3 bg-[#C58B48] text-white text-[8px] px-2 py-0.5 rounded-full font-semibold tracking-wider">
                              Featured
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-5 text-center flex-grow flex flex-col justify-center bg-white z-10">
                          <h3 className="font-montserrat text-[10px] font-bold tracking-widest text-[#1F2937] uppercase leading-relaxed">
                            {venueName}
                          </h3>
                          {venueLocation && (
                            <p className="font-inter text-[9px] text-gray-400 mt-1 flex items-center justify-center gap-1">
                              <MapPin size={10} className="text-[#C58B48]" />
                              {venueLocation}
                            </p>
                          )}
                          {venue.category && (
                            <p className="font-inter text-[8px] text-[#C58B48] mt-0.5 font-medium">
                              {venue.category}
                            </p>
                          )}
                          {venue.price && (
                            <p className="font-inter text-[9px] text-gray-500 mt-1">
                              From {venue.price}
                            </p>
                          )}
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
              <Button variant="outline" className="font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] hover:border-[#C58B48] group">
                VIEW ALL VENUES <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
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