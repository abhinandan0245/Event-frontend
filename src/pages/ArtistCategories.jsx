// src/pages/artist/ArtistCategories.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Play } from "lucide-react";
import { artistPublicApi } from "../api/artistPublicApi";

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
    <>
      {/* ====== HERO SECTION ====== */}
      <section
        className="relative w-full min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#FAF8F0]"
        style={{ perspective: 1200 }}
      >
        {/* Background Image */}
        <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80"
            alt="Artists Stage"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-[40%] lg:w-[50%] bg-gradient-to-r from-[#FAF8F0] via-[#FAF8F0]/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#FAF8F0] via-[#FAF8F0]/80 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#FAF8F0] to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="w-full lg:w-[50%]">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              EXTRAORDINARY TALENT • DESTINATION EVENTS
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[64px] text-[#1F2937] leading-[1.1] mb-4">
              For Unforgettable <br />
              <span className="italic text-[#C58B48] whitespace-nowrap">
                Events Across the World
              </span>
            </h1>
            <p className="font-inter text-gray-600 text-sm leading-[1.8] max-w-[480px] mb-8">
              From the glamour of Dubai to the tropical celebrations of Sri
              Lanka, Malaysia, Thailand and Vietnam, and unforgettable occasions
              across India, Violin Events LLP connects you with exceptional
              artists and entertainment for weddings, corporate events, private
              celebrations and destination experiences.
              <br />
              <br />
              Discover extraordinary talent from Bollywood artists,
              international musicians and live bands to DJs, dancers, celebrity
              performers and event hosts, curated to make every celebration
              truly unforgettable.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search artists, performers, categories or events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C58B48] focus:border-transparent shadow-sm text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CATEGORIES SECTION ====== */}
      <section className="bg-[#FAF8F0] py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#C58B48]/50" />
              <span className="font-montserrat text-[#C58B48] text-xs font-semibold tracking-[0.25em] uppercase">
                Browse Artist Categories
              </span>
              <div className="w-12 h-[1px] bg-[#C58B48]/50" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1F2937] mb-2">
              Find Your Perfect{" "}
              <span className="italic text-[#C58B48]">Match</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Choose from our wide range of artist categories and find the
              perfect match for your event.
            </p>
          </div>

          {/* Categories Grid */}
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No categories found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => {
                const imageUrl = category.image || FALLBACK_IMAGE;

                return (
                  <Link
                    key={category._id || index}
                    to={`/artists/category/${category._id}`}
                    className="group relative overflow-hidden bg-[#FFFDF9] rounded-2xl shadow-sm transition-all duration-500 border-[6px] border-transparent hover:border-[#C58B48] hover:shadow-[0_0_40px_rgba(197,139,72,0.4)] hover:-translate-y-2 h-[360px] flex flex-col p-0"
                  >
                    {/* Golden Glow Effect on Hover */}
                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#C58B48]/0 via-[#C58B48]/0 to-[#C58B48]/0 group-hover:from-[#C58B48]/30 group-hover:via-[#C58B48]/15 group-hover:to-[#C58B48]/30 blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                    {/* Background Image - Full Card */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      {/* Black overlay behind text - bottom 40% */}
                      <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                      {/* Subtle overlay to darken image slightly for better text contrast */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-500" />
                    </div>

                    {/* Card Content - Overlay on Image */}
                    <div className="relative z-10 flex flex-col h-full w-full p-6">
                      {/* Top: Empty space */}
                      <div className="flex-1"></div>

                      {/* Bottom: Text Content with black overlay */}
                      <div className="mt-auto">
                        {/* Category Name - White with text shadow for readability */}
                        <h3 className="font-serif text-[1.5rem] leading-tight font-medium text-white mb-2 group-hover:text-[#C58B48] transition-colors drop-shadow-lg">
                          {category.name}
                        </h3>
                        
                        {/* Description - White with subtle opacity */}
                        <p className="text-sm text-white/90 leading-relaxed line-clamp-2 pr-4 drop-shadow-md">
                          {category.description ||
                            "Explore our specialized collection of talent for your events."}
                        </p>
                      </div>

                      {/* Bottom: View Artists Link */}
                      <div className="flex items-center text-white/90 text-xs font-medium transition-all mt-3 group-hover:text-[#C58B48]">
                        <span>View Artists</span>
                        <span className="ml-2 transition-transform group-hover:translate-x-2 group-hover:text-[#C58B48]">
                          →
                        </span>
                      </div>
                    </div>

                    {/* Golden Border Glow - Corner Accents with larger size */}
                    <div className="absolute -top-1 -left-1 w-8 h-8 border-t-[3px] border-l-[3px] border-[#C58B48] rounded-tl-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute -top-1 -right-1 w-8 h-8 border-t-[3px] border-r-[3px] border-[#C58B48] rounded-tr-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-[3px] border-l-[3px] border-[#C58B48] rounded-bl-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-[3px] border-r-[3px] border-[#C58B48] rounded-br-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="relative w-full py-20 px-4 md:px-8 lg:px-16 bg-[#1F2937] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2937]/95 via-[#1F2937]/80 to-[#1F2937]/60" />

        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#C58B48]/50" />
            <span className="font-montserrat text-[#C58B48] text-xs font-semibold tracking-[0.25em] uppercase">
              Need Help Finding the Right Artist?
            </span>
            <div className="w-12 h-[1px] bg-[#C58B48]/50" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-[48px] text-white leading-[1.2] mb-4">
            We'll Help You Find the <br />
            <span className="italic text-[#C58B48]">Perfect Artist</span>
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base mb-8">
            Let our experts guide you to the perfect artist for your
            celebration. From booking to performance, we handle everything.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#C58B48] text-white rounded-full font-semibold hover:bg-[#B07A3A] transition-colors flex items-center gap-2"
            >
              Book Your Artist
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/artists"
              className="px-8 py-3.5 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Play size={18} />
              Explore All Artists
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtistCategories;