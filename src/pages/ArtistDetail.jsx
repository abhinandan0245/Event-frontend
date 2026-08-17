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
    <section className="min-h-screen bg-[#FAF8F0] py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#C58B48] transition-colors mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>

        {/* Artist Profile */}
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
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl text-[#1F2937]">
                    {artist.name}
                  </h1>
                  {artist.location && (
                    <p className="text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={16} />
                      {artist.location}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#C58B48]">
                    {formatPrice(artist.price, artist.priceUnit)}
                  </p>
                  <p className="text-xs text-gray-400">Starting price</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-4 py-4 border-y border-gray-100">
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

              {/* CTA */}
              <div className="mt-6 flex gap-3">
                <Link
                  to="/contact"
                  className="flex-1 px-6 py-3 bg-[#C58B48] text-white rounded-lg font-semibold hover:bg-[#B07A3A] transition-colors text-center"
                >
                  Book Now
                </Link>
                <Link
                  to="/artists"
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Browse More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistDetail;
