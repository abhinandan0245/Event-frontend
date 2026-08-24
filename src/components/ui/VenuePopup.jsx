// src/components/ui/VenuePopup.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Users,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Heart,
  Share2,
  Crown,
  Car,
  Wifi,
  Coffee,
  Utensils,
  Sparkles,
  Bath,
  Building,
  Waves,
  Hotel,
  TreePalm,
  Info,
  ChevronLeft,
  ChevronRight,
  Play,
  Video,
  Bed,
} from "lucide-react";
import Button from "./Button";
import { venueApi } from "../../api/venueApi";

// Fallback image
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80";

// Icon mapping for amenities
const amenityIcons = {
  WiFi: Wifi,
  "Wi-Fi": Wifi,
  Catering: Utensils,
  "Valet Parking": Car,
  Parking: Car,
  Pool: Bath,
  "Swimming Pool": Bath,
  Spa: Coffee,
  "Water Sports": Waves,
  "Private Villas": Hotel,
  "Infinity Pool": Bath,
  "Ocean Views": Waves,
  "Butler Service": Crown,
  "Lake Views": Waves,
  "Royal Suites": Crown,
  "Overwater Villas": Hotel,
  "Private Beach": TreePalm,
  "Airport Transfer": Car,
  Gym: Coffee,
  Restaurant: Utensils,
  Bar: Coffee,
  "Room Service": CheckCircle,
  "24/7 Support": CheckCircle,
  Security: CheckCircle,
};

const VenuePopup = ({ isOpen, onClose, venueId }) => {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  const slideInterval = useRef(null);

  // Fetch venue details when popup opens
  useEffect(() => {
    if (isOpen && venueId) {
      fetchVenueDetails();
      setShowVideo(false);
    }
  }, [isOpen, venueId]);

  // Auto-slide functionality
  useEffect(() => {
    const images = getImages();
    if (isOpen && images.length > 1 && !isPaused && !showVideo) {
      slideInterval.current = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % images.length);
      }, 3000);
    }

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isOpen, isPaused, venue, showVideo]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Handle click outside - fixed to only close when clicking outside the popup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      // Use mousedown with a small delay to prevent conflict with scroll
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 10);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen, onClose]);

  const fetchVenueDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await venueApi.getById(venueId);
      if (response.success && response.data) {
        setVenue(response.data);
        setActiveImage(0);
      } else {
        setError("Failed to load venue details");
      }
    } catch (err) {
      console.error("Error fetching venue details:", err);
      setError("Failed to load venue details");
    } finally {
      setLoading(false);
    }
  };

  // Get venue images array
  const getImages = () => {
    const images = [];
    if (venue?.image) {
      images.push(venue.image);
    }
    if (venue?.images && venue.images.length > 0) {
      venue.images.forEach((img) => {
        if (!images.includes(img)) {
          images.push(img);
        }
      });
    }
    return images.length > 0 ? images : [FALLBACK_IMAGE];
  };

  // Extract YouTube video ID
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1`;
      }
    }
    
    if (url.includes('youtube.com/embed')) {
      return url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    }
    
    return null;
  };

  // Check if video URL is valid
  const hasVideo = venue?.videoUrl && venue.videoUrl.trim() !== '';
  const videoEmbedUrl = hasVideo ? getYouTubeEmbedUrl(venue.videoUrl) : null;

  // Navigate to next image
  const nextImage = (e) => {
    e?.stopPropagation();
    const images = getImages();
    if (images.length > 1 && !showVideo) {
      setActiveImage((prev) => (prev + 1) % images.length);
      resetTimer();
    }
  };

  // Navigate to previous image
  const prevImage = (e) => {
    e?.stopPropagation();
    const images = getImages();
    if (images.length > 1 && !showVideo) {
      setActiveImage((prev) => (prev - 1 + images.length) % images.length);
      resetTimer();
    }
  };

  // Reset timer
  const resetTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      const images = getImages();
      if (images.length > 1 && !isPaused && !showVideo) {
        slideInterval.current = setInterval(() => {
          setActiveImage((prev) => (prev + 1) % images.length);
        }, 3000);
      }
    }
  };

  // Go to specific image
  const goToImage = (index) => {
    setActiveImage(index);
    setShowVideo(false);
    resetTimer();
  };

  // Toggle video
  const toggleVideo = () => {
    setShowVideo(!showVideo);
    if (!showVideo) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  };

  // Get amenity icon
  const getAmenityIcon = (amenity) => {
    const Icon = amenityIcons[amenity] || CheckCircle;
    return Icon;
  };

  // Handle scroll inside popup
  const handleWheel = (e) => {
    // Allow scroll inside popup content
    if (contentRef.current) {
      const container = contentRef.current;
      const isAtTop = container.scrollTop === 0;
      const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
      
      // If at top and scrolling up, or at bottom and scrolling down, prevent default
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    }
  };

  if (!isOpen) return null;

  const images = getImages();
  const hasMultipleImages = images.length > 1;
  const canShowVideo = hasVideo && videoEmbedUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
          style={{ minHeight: "100vh" }}
          onWheel={handleWheel}
        >
          <motion.div
            ref={popupRef}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {loading ? (
              <div className="flex items-center justify-center h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48]"></div>
              </div>
            ) : error || !venue ? (
              <div className="flex flex-col items-center justify-center h-[400px] p-8 text-center">
                <Info className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-red-500 font-inter">
                  {error || "Venue not found"}
                </p>
                <Button onClick={onClose} className="mt-4">
                  Close
                </Button>
              </div>
            ) : (
              <div className="bg-white">
                {/* Image/Video Gallery with Auto-Slide */}
                <div
                  className="relative h-[300px] md:h-[400px] bg-gray-900"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Video Player */}
                  {showVideo && canShowVideo ? (
                    <div className="w-full h-full">
                      <iframe
                        src={videoEmbedUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`${venue.name} Video`}
                      />
                    </div>
                  ) : (
                    /* Main Image with Animation */
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImage}
                        src={images[activeImage]}
                        alt={venue.name}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        onError={(e) => {
                          e.target.src = FALLBACK_IMAGE;
                        }}
                      />
                    </AnimatePresence>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Video Toggle Button */}
                  {canShowVideo && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVideo();
                      }}
                      className={`absolute top-4 right-16 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        showVideo
                          ? "bg-[#C58B48] text-white hover:bg-[#b07a3f]"
                          : "bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                      }`}
                    >
                      {showVideo ? (
                        <>
                          <X size={14} />
                          Close Video
                        </>
                      ) : (
                        <>
                          <Play size={14} />
                          Watch Video
                        </>
                      )}
                    </button>
                  )}

                  {/* Image Counter */}
                  {!showVideo && hasMultipleImages && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs backdrop-blur-sm z-10">
                      {activeImage + 1} / {images.length}
                    </div>
                  )}

                  {/* Video Indicator when showing video */}
                  {showVideo && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs backdrop-blur-sm z-10 flex items-center gap-1.5">
                      <Video size={14} />
                      Now Playing
                    </div>
                  )}

                  {/* Navigation Arrows (only for images) */}
                  {!showVideo && hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all hover:scale-110 z-10"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all hover:scale-110 z-10"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Pause/Play Indicator */}
                  {!showVideo && hasMultipleImages && (
                    <div className="absolute top-4 right-4 bg-black/50 text-white/80 text-[8px] px-2 py-1 rounded-full backdrop-blur-sm z-10">
                      {isPaused ? "⏸" : "▶"}
                    </div>
                  )}

                  {/* Featured Badge */}
                  {venue.featured && (
                    <div className="absolute top-4 left-4 bg-[#C58B48] text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 z-10">
                      <Crown className="w-3.5 h-3.5" />
                      Featured
                    </div>
                  )}

                  {/* Thumbnail Strip (only for images) */}
                  {!showVideo && hasMultipleImages && (
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === activeImage
                              ? "bg-white w-6"
                              : "bg-white/50 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div ref={contentRef} className="p-6 md:p-8 max-h-[50vh] overflow-y-auto">
                  {/* Name, Location, Category */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h2 className="font-cormorant text-3xl md:text-4xl text-[#1F2937] leading-tight">
                        {venue.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-2 text-gray-500">
                        <MapPin className="w-4 h-4 text-[#C58B48]" />
                        <span className="font-inter text-sm">
                          {venue.location}
                        </span>
                      </div>
                      {venue.category && (
                        <div className="mt-2">
                          <span className="text-sm text-[#C58B48] font-inter font-medium">
                            {venue.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats - Changed Capacity to Rooms */}
                  {(venue.rooms || venue.capacity || venue.featured) && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-[#FDFBF7] rounded-xl mb-6">
                      {(venue.rooms || venue.capacity) && (
                        <div className="flex items-center gap-3">
                          <Bed className="w-5 h-5 text-[#C58B48]" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 font-inter">
                              {venue.rooms || venue.capacity}
                            </p>
                            <p className="text-xs text-gray-500">Rooms</p>
                          </div>
                        </div>
                      )}
                      {venue.featured && (
                        <div className="flex items-center gap-3">
                          <Crown className="w-5 h-5 text-[#C58B48]" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 font-inter">
                              Featured
                            </p>
                            <p className="text-xs text-gray-500">Status</p>
                          </div>
                        </div>
                      )}
                      {canShowVideo && (
                        <div className="flex items-center gap-3">
                          <Video className="w-5 h-5 text-[#C58B48]" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 font-inter">
                              Has Video
                            </p>
                            <p className="text-xs text-gray-500">Watch Tour</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  {venue.description && (
                    <div className="mb-6">
                      <h3 className="font-cormorant text-xl text-[#1F2937] mb-2">
                        About {venue.name}
                      </h3>
                      <p className="font-inter text-gray-600 leading-relaxed text-sm">
                        {venue.description}
                      </p>
                    </div>
                  )}

                  {/* Amenities */}
                  {venue.amenities && venue.amenities.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-cormorant text-xl text-[#1F2937] mb-3">
                        Amenities & Services
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {venue.amenities.map((amenity, index) => {
                          const Icon = getAmenityIcon(amenity);
                          return (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDFBF7] border border-[#EBE3D5] rounded-full text-xs text-gray-700 font-inter"
                            >
                              <Icon className="w-3.5 h-3.5 text-[#C58B48]" />
                              {amenity}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {canShowVideo && !showVideo && (
                      <Button
                        variant="champagne"
                        className="flex-1 font-inter flex items-center gap-2"
                        onClick={toggleVideo}
                      >
                        <Play size={16} />
                        Watch Video Tour
                      </Button>
                    )}
                    <Button
                      variant="primary"
                      className="flex-1 font-inter"
                      onClick={() => (window.location.href = "/contact")}
                    >
                      Enquire Now
                    </Button>
                    <Button
                      variant="outline"
                      className="font-inter"
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VenuePopup;