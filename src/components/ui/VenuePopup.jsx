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
  const popupRef = useRef(null);

  // Fetch venue details when popup opens
  useEffect(() => {
    if (isOpen && venueId) {
      fetchVenueDetails();
    }
  }, [isOpen, venueId]);

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

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const fetchVenueDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await venueApi.getById(venueId);
      if (response.success && response.data) {
        setVenue(response.data);
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
    if (venue?.images && venue.images.length > 0) {
      return venue.images;
    }
    return [venue?.image || FALLBACK_IMAGE];
  };

  // Get amenity icon
  const getAmenityIcon = (amenity) => {
    const Icon = amenityIcons[amenity] || CheckCircle;
    return Icon;
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return "Contact for pricing";
    return price;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
          style={{ minHeight: "100vh" }}
        >
          <motion.div
            ref={popupRef}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
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
                {/* Image Gallery */}
                <div className="relative h-[300px] md:h-[400px] bg-gray-900">
                  <img
                    src={getImages()[activeImage]}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = FALLBACK_IMAGE;
                    }}
                  />

                  {/* Image Navigation Dots */}
                  {getImages().length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {getImages().map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImage(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === activeImage
                              ? "bg-white w-6"
                              : "bg-white/50 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Featured Badge */}
                  {venue.featured && (
                    <div className="absolute top-4 left-4 bg-[#C58B48] text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5" />
                      Featured
                    </div>
                  )}

                  {/* Action Buttons */}
                  {/* <div className="absolute top-4 right-16 flex gap-2">
                    <button className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
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
                    {venue.price && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#C58B48] font-inter">
                          {formatPrice(venue.price)}
                        </p>
                        <p className="text-xs text-gray-400 font-inter">
                          Starting Price
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Quick Stats - Only show if data exists */}
                  {(venue.capacity || venue.featured) && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-[#FDFBF7] rounded-xl mb-6">
                      {venue.capacity && (
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-[#C58B48]" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 font-inter">
                              {venue.capacity}
                            </p>
                            <p className="text-xs text-gray-500">Capacity</p>
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

                  {/* Contact Information - Only show if data exists */}
                  {(venue.contactNumber || venue.phone || venue.email || venue.website) && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#FDFBF7] rounded-xl mb-6">
                      {(venue.contactNumber || venue.phone) && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-[#C58B48]" />
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="text-sm font-inter text-gray-900">
                              {venue.contactNumber || venue.phone}
                            </p>
                          </div>
                        </div>
                      )}
                      {venue.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-[#C58B48]" />
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-sm font-inter text-gray-900 truncate">
                              {venue.email}
                            </p>
                          </div>
                        </div>
                      )}
                      {venue.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-[#C58B48]" />
                          <div>
                            <p className="text-xs text-gray-500">Website</p>
                            <a
                              href={`https://${venue.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-inter text-[#C58B48] hover:underline truncate block"
                            >
                              {venue.website}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* <Button
                      variant="champagne"
                      className="flex-1 font-inter"
                      onClick={() =>
                        (window.location.href = `/venue/${venue._id}`)
                      }
                    >
                      View Full Details
                    </Button> */}
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