// src/pages/artist/ArtistDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronLeft,
  MapPin,
  Star,
  Calendar,
  Users,
  Music,
  Mic,
  Languages,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Play,
} from "lucide-react";
// ✅ Import social icons from react-icons
import { FaInstagram, FaFacebook, FaYoutube, FaGlobe } from "react-icons/fa";
import { artistPublicApi } from "../api/artistPublicApi";

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchArtist();
    }
  }, [id]);

  const fetchArtist = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await artistPublicApi.getArtistById(id);
      if (response.success) {
        setArtist(response.data);
      } else {
        setError("Artist not found");
      }
    } catch (err) {
      console.error("Error fetching artist:", err);
      setError("Failed to load artist details");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price, unit) => {
    if (!price && price !== 0) return "Price on Request";
    const unitMap = {
      lakh: "Lakh",
      thousand: "K",
      crore: "Cr",
    };
    return `₹ ${price} ${unitMap[unit] || "Lakh"}`;
  };

  const getAvailabilityBadge = (availability) => {
    const styles = {
      available: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Available",
      },
      busy: { bg: "bg-red-100", text: "text-red-800", label: "Busy" },
      "on-tour": {
        bg: "bg-amber-100",
        text: "text-amber-800",
        label: "On Tour",
      },
      unavailable: {
        bg: "bg-gray-100",
        text: "text-gray-600",
        label: "Unavailable",
      },
    };
    return styles[availability] || styles.available;
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#FAF8F0] py-20 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48] mb-4"></div>
          <p className="text-gray-500 font-inter text-sm">
            Loading artist details...
          </p>
        </div>
      </section>
    );
  }

  if (error || !artist) {
    return (
      <section className="min-h-screen bg-[#FAF8F0] py-20 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-4xl mb-4">😔</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Artist Not Found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {error || "The artist you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 bg-[#C58B48] text-white rounded-lg hover:bg-[#B07A3A] transition-colors"
          >
            Go Back
          </button>
        </div>
      </section>
    );
  }

  const availability = getAvailabilityBadge(artist.availability);

  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section
        className="relative w-full min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden bg-[#FAF8F0]"
        style={{ perspective: 1200 }}
      >
        {/* Background Image */}
        <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
          <img
            src={artist.image || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80"}
            alt={artist.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-[40%] lg:w-[50%] bg-gradient-to-r from-[#FAF8F0] via-[#FAF8F0]/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#FAF8F0] via-[#FAF8F0]/80 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#FAF8F0] to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="w-full lg:w-[50%]">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-[#C58B48] transition-colors mb-4"
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-medium">Back</span>
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase">
                Featured Artist
              </span>
              {artist.featured && (
                <span className="bg-[#C58B48] text-white px-3 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
                  <Star size={12} fill="white" />
                  Featured
                </span>
              )}
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-[#1F2937] leading-[1.1] mb-3">
              {artist.name}
            </h1>

            {artist.location && (
              <p className="font-inter text-gray-500 text-sm flex items-center gap-1.5 mb-3">
                <MapPin size={16} className="text-[#C58B48]" />
                {artist.location}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {artist.experience > 0 && (
                <span className="flex items-center gap-1.5">
                  <Briefcase size={16} className="text-[#C58B48]" />
                  {artist.experience}+ Years
                </span>
              )}
              {artist.languages && artist.languages.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <Languages size={16} className="text-[#C58B48]" />
                  {artist.languages.slice(0, 3).join(", ")}
                  {artist.languages.length > 3 && ` +${artist.languages.length - 3}`}
                </span>
              )}
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${availability.bg} ${availability.text}`}>
                {availability.label}
              </span>
            </div>

            <div className="mt-4">
              <span className="text-2xl font-bold text-[#C58B48]">
                {formatPrice(artist.price, artist.priceUnit)}
              </span>
              <span className="text-sm text-gray-400 ml-2">Starting price</span>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-[#C58B48] text-white rounded-full font-semibold hover:bg-[#B07A3A] transition-colors flex items-center gap-2 text-sm"
              >
                <Sparkles size={16} />
                Book Now
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/artists"
                className="px-6 py-2.5 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors text-sm"
              >
                Browse More Artists
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ARTIST DETAIL SECTION ====== */}
      <section className="bg-[#FAF8F0] py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Image Section */}
              <div className="md:col-span-1 relative aspect-square md:aspect-auto md:h-full bg-gray-100">
                <img
                  src={
                    artist.image || "https://via.placeholder.com/600x600?text=🎵"
                  }
                  alt={artist.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x600?text=🎵";
                  }}
                />
                {artist.featured && (
                  <div className="absolute top-4 left-4 bg-[#C58B48] text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                    <Star size={14} fill="white" />
                    Featured
                  </div>
                )}
                <div
                  className={`absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium ${availability.bg} ${availability.text}`}
                >
                  {availability.label}
                </div>
              </div>

              {/* Info Section */}
              <div className="md:col-span-2 p-6 md:p-8">
                {/* Stats */}
                <div className="flex flex-wrap gap-6 py-4 border-y border-gray-100">
                  {artist.experience > 0 && (
                    <div className="flex items-center gap-2">
                      <Briefcase size={18} className="text-[#C58B48]" />
                      <span className="text-sm">
                        {artist.experience}+ Years Experience
                      </span>
                    </div>
                  )}
                  {artist.languages && artist.languages.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Languages size={18} className="text-[#C58B48]" />
                      <span className="text-sm">
                        {artist.languages.join(", ")}
                      </span>
                    </div>
                  )}
                  {artist.views !== undefined && (
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-[#C58B48]" />
                      <span className="text-sm">{artist.views || 0} Views</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                {artist.bio && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800 mb-2">About</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {artist.bio}
                    </p>
                  </div>
                )}

                {/* Social Links */}
                {(artist.instagram ||
                  artist.facebook ||
                  artist.youtube ||
                  artist.website) && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-3">Connect</h3>
                    <div className="flex gap-3">
                      {artist.instagram && (
                        <a
                          href={artist.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors"
                        >
                          <FaInstagram size={20} />
                        </a>
                      )}
                      {artist.facebook && (
                        <a
                          href={artist.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors"
                        >
                          <FaFacebook size={20} />
                        </a>
                      )}
                      {artist.youtube && (
                        <a
                          href={artist.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
                        >
                          <FaYoutube size={20} />
                        </a>
                      )}
                      {artist.website && (
                        <a
                          href={artist.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <FaGlobe size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="relative w-full py-20 px-4 md:px-8 lg:px-16 bg-[#1F2937] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src={artist.image || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2937]/95 via-[#1F2937]/80 to-[#1F2937]/60" />

        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#C58B48]/50" />
            <span className="font-montserrat text-[#C58B48] text-xs font-semibold tracking-[0.25em] uppercase">
              Ready to Book?
            </span>
            <div className="w-12 h-[1px] bg-[#C58B48]/50" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-[48px] text-white leading-[1.2] mb-4">
            Bring Your Event to Life with <br />
            <span className="italic text-[#C58B48]">{artist.name}</span>
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base mb-8">
            Secure this extraordinary talent for your celebration. Our team will
            handle every detail of the booking process.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#C58B48] text-white rounded-full font-semibold hover:bg-[#B07A3A] transition-colors flex items-center gap-2"
            >
              <Sparkles size={18} />
              Book {artist.name}
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/artist-categories"
              className="px-8 py-3.5 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Play size={18} />
              Explore More Artists
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtistDetail;