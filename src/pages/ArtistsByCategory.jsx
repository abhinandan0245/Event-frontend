// src/pages/artist/ArtistsByCategory.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  MapPin,
  Star,
  Users,
  Calendar,
  Music,
  Mic,
} from "lucide-react";
import { artistPublicApi } from "../api/artistPublicApi";

const ArtistsByCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryId) {
      fetchArtistsByCategory();
    }
  }, [categoryId]);

  const fetchArtistsByCategory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await artistPublicApi.getArtistsByCategory(categoryId);
      if (response.success) {
        setArtists(response.data?.items || []);
        setCategory(response.data?.category || null);
      } else {
        setError("Failed to load artists");
      }
    } catch (err) {
      console.error("Error fetching artists:", err);
      setError("Failed to load artists. Please try again.");
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
      available: "bg-green-100 text-green-800",
      busy: "bg-red-100 text-red-800",
      "on-tour": "bg-amber-100 text-amber-800",
      unavailable: "bg-gray-100 text-gray-600",
    };
    return styles[availability] || styles.available;
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#FAF8F0] py-20 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48] mb-4"></div>
          <p className="text-gray-500 font-inter text-sm">Loading artists...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-[#FAF8F0] py-20 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-4xl mb-4">😔</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">{error}</p>
          <button
            onClick={fetchArtistsByCategory}
            className="mt-6 px-6 py-2 bg-[#C58B48] text-white rounded-lg hover:bg-[#B07A3A] transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FAF8F0] py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Back Button & Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#C58B48] transition-colors mb-4"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>

          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-[#1F2937]">
              {category?.name || "Artists"}
            </h1>
            {category?.description && (
              <p className="text-gray-600 mt-2">{category.description}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {artists.length} {artists.length === 1 ? "Artist" : "Artists"}{" "}
              available
            </p>
          </div>
        </div>

        {/* Artists Grid */}
        {artists.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Artists Found
            </h3>
            <p className="text-gray-500">
              No artists available in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artists.map((artist) => (
              <Link
                key={artist._id}
                to={`/artists/${artist._id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#C58B48]/40 hover:-translate-y-1"
              >
                {/* Artist Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={
                      artist.image ||
                      "https://via.placeholder.com/400x300?text=🎵"
                    }
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=🎵";
                    }}
                  />
                  {artist.featured && (
                    <div className="absolute top-3 left-3 bg-[#C58B48] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star size={12} fill="white" />
                      Featured
                    </div>
                  )}
                  {artist.availability && (
                    <div
                      className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityBadge(artist.availability)}`}
                    >
                      {artist.availability.charAt(0).toUpperCase() +
                        artist.availability.slice(1)}
                    </div>
                  )}
                </div>

                {/* Artist Info */}
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-[#1F2937] group-hover:text-[#C58B48] transition-colors">
                    {artist.name}
                  </h3>

                  {artist.location && (
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={14} />
                      {artist.location}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {artist.languages && artist.languages.length > 0 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                        {artist.languages.slice(0, 2).join(", ")}
                        {artist.languages.length > 2 &&
                          ` +${artist.languages.length - 2}`}
                      </span>
                    )}
                    {artist.experience > 0 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                        {artist.experience}+ yrs
                      </span>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-semibold text-[#C58B48]">
                      {formatPrice(artist.price, artist.priceUnit)}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Users size={12} />
                      {artist.views || 0}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtistsByCategory;
