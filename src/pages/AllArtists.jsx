// src/pages/artist/AllArtists.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Users, Search, Filter, X } from "lucide-react";
import { artistPublicApi } from "../api/artistPublicApi";

const AllArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterFeatured, setFilterFeatured] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch categories
      const categoriesRes = await artistPublicApi.getCategories();
      if (categoriesRes.success) {
        setCategories(categoriesRes.data || []);
      }

      // Fetch artists
      const artistsRes = await artistPublicApi.getArtists({
        isActive: true,
      });
      if (artistsRes.success) {
        setArtists(artistsRes.data?.items || []);
      } else {
        setError("Failed to load artists");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter artists
  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artist.location &&
        artist.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      !filterCategory || artist.category === filterCategory;
    const matchesFeatured =
      filterFeatured === "" ||
      (filterFeatured === "true" ? artist.featured : !artist.featured);
    return matchesSearch && matchesCategory && matchesFeatured;
  });

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

  const handleReset = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterFeatured("");
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
            onClick={fetchData}
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-[#1F2937]">
            Our <span className="italic text-[#C58B48]">Artists</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mt-2">
            Discover extraordinary talent for your next event
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search artists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C58B48] focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C58B48] focus:border-transparent bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:w-40">
              <select
                value={filterFeatured}
                onChange={(e) => setFilterFeatured(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C58B48] focus:border-transparent bg-white"
              >
                <option value="">All Artists</option>
                <option value="true">Featured</option>
                <option value="false">Not Featured</option>
              </select>
            </div>
            {(searchTerm || filterCategory || filterFeatured) && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={18} />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-500">
          Showing {filteredArtists.length}{" "}
          {filteredArtists.length === 1 ? "artist" : "artists"}
        </div>

        {/* Artists Grid */}
        {filteredArtists.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Artists Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtists.map((artist) => (
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

export default AllArtists;
