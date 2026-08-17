// src/pages/artist/ArtistCategories.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Sparkles,
  Users,
  Music,
  Mic,
  Guitar,
  Headphones,
  Crown
} from "lucide-react";
import { artistPublicApi } from "../api/artistPublicApi";

// Category Icon Mapping
const getCategoryIcon = (name) => {
  const iconMap = {
    "Bollywood Celebrities": Crown,
    "Singers & Vocalists": Mic,
    "Dance & Electronic Arts": Music,
    "Artistes & Hosts": Users,
    "Live Bands": Guitar,
    "Sufi & Qawwali Artists": Music,
    "Wedding Entertainment": Sparkles,
    "Dance Performers": Users,
    "Folk & Cultural Artists": Music,
    "Special Acts & Stage Shows": Sparkles,
    "Instrumental Artists": Guitar,
    "International Talent": Headphones,
    "Corporate & Luxury Entertainment": Crown,
  };
  return iconMap[name] || Sparkles;
};

// Fallback image for categories
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80";

const ArtistCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await artistPublicApi.getCategories();

      if (response.success) {
        setCategories(response.data || []);
      } else {
        setError("Failed to load categories");
        setCategories([]);
      }
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
      setError("Failed to load categories. Please try again.");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cat.description &&
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  if (loading) {
    return (
      <section className="min-h-screen bg-[#FAF8F0] py-20 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48] mb-4"></div>
          <p className="text-gray-500 font-inter text-sm">
            Loading categories...
          </p>
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
            onClick={fetchCategories}
            className="mt-6 px-6 py-2 bg-[#C58B48] text-white rounded-lg hover:bg-[#B07A3A] transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FAF8F0] py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#C58B48]/50" />
            <span className="font-montserrat text-[#C58B48] text-xs font-semibold tracking-[0.25em] uppercase">
              Explore Artist Categories
            </span>
            <div className="w-12 h-[1px] bg-[#C58B48]/50" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1F2937] mb-4">
            Browse Artist <span className="italic text-[#C58B48]">Categories</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Choose from our wide range of artist categories and find the perfect match for your event.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for artists, categories or events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white border border-[#EBE3D5] rounded-full focus:outline-none focus:ring-2 focus:ring-[#C58B48]/50 focus:border-transparent shadow-sm text-sm"
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No categories found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filteredCategories.map((category, index) => {
              const Icon = getCategoryIcon(category.name);
              const number = String(index + 1).padStart(2, "0");
              const imageUrl = category.image || FALLBACK_IMAGE;

              return (
                <Link
                  key={category._id || index}
                  to={`/artists/category/${category._id}`}
                  className="group relative overflow-hidden bg-[#FFFDF9] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#F0EBE1] hover:border-[#C58B48]/40 hover:-translate-y-1 h-[360px] flex flex-col p-6"
                >
                  {/* Right-aligned Background Image with Gradient Mask */}
                  <div className="absolute top-0 right-0 bottom-0 w-[65%] z-0">
                    <img
                      src={imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    {/* Horizontal fade to blend image into background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9]/80 to-transparent" />
                    {/* Subtle bottom fade for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9]/50 via-transparent to-transparent" />
                  </div>

                  {/* Card Content Overlay */}
                  <div className="relative z-10 flex flex-col h-full w-[85%]">
                    {/* Top: Number & Icon */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-serif text-2xl text-[#C58B48] leading-none opacity-80">
                        {number}
                      </span>
                      <Icon size={18} className="text-[#C58B48] opacity-80" strokeWidth={1.5} />
                    </div>

                    {/* Bottom: Text Content */}
                    <div className="mt-auto mb-5">
                      <h3 className="font-serif text-[1.35rem] leading-tight font-medium text-[#1F2937] mb-3 group-hover:text-[#C58B48] transition-colors pr-2">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 pr-4">
                        {category.description ||
                          "Explore our specialized collection of talent for your events."}
                      </p>
                    </div>

                    {/* Link */}
                    <div className="flex items-center text-[#C58B48] text-xs font-medium transition-all">
                      <span>View Artists</span>
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtistCategories;