// src/pages/artist/ArtistsByCategory.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
  Play,
  Crown,
  Calendar,
} from "lucide-react";
import { artistPublicApi } from "../api/artistPublicApi";

// Exact category content from the text file - matched by lowercase category name
const CATEGORY_CONTENT = {
  "bollywood celebrities": {
    caption: "Bollywood Celebrities for Unforgettable Events",
    description:
      "Bring the glamour and star power of Bollywood to your celebration with Violin Events LLP. Discover renowned actors, actresses, celebrity personalities and influencers for luxury weddings, destination celebrations, corporate events, private parties and exclusive gatherings. From celebrity appearances and guest engagements to special performances, we help clients find the right Bollywood talent for events across Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam.",
  },
  "singers & vocalists": {
    caption: "Exceptional Singers & Vocalists for Every Celebration",
    description:
      "Set the perfect atmosphere with exceptional singers and vocalists curated for unforgettable occasions. Violin Events LLP connects you with Bollywood singers, playback artists, independent vocalists, Sufi singers, classical performers and contemporary musicians. Whether you are planning an intimate wedding ceremony, luxury reception, corporate gala or destination celebration, discover voices that bring emotion, energy and personality to your event across Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam.",
  },
  "dance & electronic arts": {
    caption: "Dance & Electronic Artists That Bring Events to Life",
    description:
      "Create an energetic and visually captivating experience with exceptional dance and electronic artists. From contemporary dancers and EDM performers to creative movement artists and electronic musicians, Violin Events LLP brings together talent for modern celebrations and luxury events. Our artists are suited for weddings, sangeet celebrations, private parties, club events, corporate experiences and destination celebrations across Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam.",
  },
  "artistes & hosts": {
    caption: "Charismatic Artistes & Hosts for Extraordinary Events",
    description:
      "The right host can transform an event from a gathering into an experience. Violin Events LLP connects you with professional wedding hosts, celebrity hosts, corporate emcees, presenters and multilingual artistes who know how to engage audiences and keep celebrations flowing seamlessly. From luxury destination weddings to corporate conferences, award ceremonies and gala evenings, find experienced personalities for events across Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam.",
  },
  "live bands": {
    caption: "Live Bands for Unforgettable Celebrations",
    description:
      "Bring your event to life with the energy of live music. Violin Events LLP connects you with exceptional Bollywood bands, fusion ensembles, acoustic groups, jazz bands, rock bands and contemporary live performers. Whether you are planning a luxury wedding, cocktail evening, private celebration, hotel event or corporate gala, discover live bands that create the right atmosphere for your guests across Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam.",
  },
  "sufi & qawwali artists": {
    caption: "Soulful Sufi & Qawwali Artists",
    description:
      "Add emotion, culture and timeless musical expression to your celebration with exceptional Sufi and Qawwali artists. Violin Events LLP brings together soulful singers, Qawwali ensembles, classical vocalists and traditional performers for deeply immersive musical experiences. Perfect for wedding celebrations, intimate gatherings, cultural occasions and luxury destination events, our artists bring authenticity and soul to celebrations across Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam.",
  },
  "wedding entertainment": {
    caption: "Extraordinary Wedding Entertainment for Celebrations That Matter",
    description:
      "Your wedding deserves entertainment as memorable as the occasion itself. Violin Events LLP offers a curated selection of singers, DJs, live bands, dancers, celebrity artists, hosts, instrumentalists and special performers for weddings of every style. From grand destination weddings in Dubai and Thailand to intimate celebrations in India, Sri Lanka, Malaysia and Vietnam, we help you discover entertainment that complements your wedding, venue and guests.",
  },
  "dance performers": {
    caption: "Dance Performers Who Command the Stage",
    description:
      "Make your celebration visually unforgettable with exceptional dance performers. From Bollywood and contemporary dance to classical, fusion, international and specialty performances, Violin Events LLP connects you with artists who know how to captivate an audience. Create spectacular moments for sangeet ceremonies, wedding celebrations, corporate events, stage shows, private parties and destination weddings across Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam.",
  },
  "special acts & stage shows": {
    caption: "Spectacular Special Acts & Stage Shows",
    description:
      "Give your guests something they never expected. Violin Events LLP brings together extraordinary performers and specialty acts including illusionists, magicians, acrobats, aerial performers, LED artists, immersive acts and visually captivating stage entertainment. Designed for luxury weddings, corporate celebrations, gala dinners, brand events and private occasions, these performances add surprise, excitement and unforgettable moments to events across Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam.",
  },
  "instrumental artists": {
    caption: "Instrumental Artists for Elegant Events",
    description:
      "Create an atmosphere of sophistication with exceptional instrumental musicians. Violin Events LLP connects you with talented violinists, saxophonists, pianists, guitarists, flautists, percussionists, cellists and other instrumental performers. Whether you need elegant music for a wedding ceremony, live entertainment for a cocktail evening or refined background music for a luxury dinner, discover musicians for events across Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam.",
  },
  "international talent": {
    caption: "International Talent for Global Celebrations",
    description:
      "Bring a truly international character to your event with exceptional artists from around the world. Violin Events LLP connects clients with international singers, musicians, DJs, dancers, cultural performers and specialty artists for extraordinary celebrations. Whether you are planning a destination wedding, luxury resort event, corporate gathering or international celebration, discover global entertainment for events in Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam.",
  },
  "corporate & luxury entertainment": {
    caption: "Premium Entertainment for Corporate & Luxury Events",
    description:
      "Exceptional events require entertainment that reflects their scale, audience and ambition. Violin Events LLP provides access to premium artists, celebrity appearances, live bands, luxury DJs, international performers, corporate hosts and specialty acts. From corporate galas and award ceremonies to luxury brand launches, VIP celebrations, conferences and exclusive private events, we curate entertainment experiences for discerning clients across Dubai, India, Sri Lanka, Malaysia, Thailand and Vietnam.",
  },
};

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
      available: "bg-green-500/20 text-green-400 border-green-500/30",
      busy: "bg-red-500/20 text-red-400 border-red-500/30",
      "on-tour": "bg-amber-500/20 text-amber-400 border-amber-500/30",
      unavailable: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    };
    return styles[availability] || styles.available;
  };

  // Get exact category content based on category name (case-insensitive)
  const getCategoryContent = () => {
    if (!category) return null;
    
    const categoryNameLower = category.name?.toLowerCase().trim() || "";
    
    // Try exact match by lowercase category name
    if (CATEGORY_CONTENT[categoryNameLower]) {
      return CATEGORY_CONTENT[categoryNameLower];
    }
    
    // Try partial match - find key that contains the category name
    const matchedKey = Object.keys(CATEGORY_CONTENT).find(
      key => categoryNameLower.includes(key) || key.includes(categoryNameLower)
    );
    if (matchedKey) {
      return CATEGORY_CONTENT[matchedKey];
    }
    
    // Fallback: use category data
    return {
      caption: `${category.name || "Artists"} for Unforgettable Events`,
      description: category.description || `Discover exceptional ${category.name || "artists"} for your celebration.`,
    };
  };

  const content = getCategoryContent();

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
    <>
      {/* ====== HERO SECTION ====== */}
      <section
        className="relative w-full min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden bg-[#FAF8F0]"
        style={{ perspective: 1200 }}
      >
        {/* Background Image */}
        <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
          <img
            src={category?.image || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80"}
            alt={category?.name || "Artists"}
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

            {/* Category Name - Main Heading */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[48px] text-[#1F2937] leading-[1.1] mb-2">
              {category?.name || "Artists"}
            </h1>

            {/* Caption */}
            <span className="font-montserrat text-[#C58B48] text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">
              {content?.caption || category?.name || "Artists"}
            </span>

            {/* Description */}
            <p className="font-inter text-gray-600 text-sm leading-[1.8] max-w-[560px] mb-3">
              {content?.description || category?.description || `Discover exceptional ${category?.name || "artists"} for your celebration.`}
            </p>

            <p className="text-sm text-[#C58B48] font-medium">
              {artists.length} {artists.length === 1 ? "Artist" : "Artists"} available
            </p>
          </div>
        </div>
      </section>

      {/* ====== ARTISTS GRID SECTION - PREMIUM CARDS WITH TRANSPARENT BLUR ====== */}
      <section className="bg-[#FAF8F0] py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
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
                  className="group relative overflow-hidden rounded-2xl transition-all duration-500 border-[3px] border-transparent hover:border-[#C58B48] hover:shadow-[0_0_40px_rgba(197,139,72,0.35)] hover:-translate-y-2"
                >
                  {/* Golden Glow Effect on Hover */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#C58B48]/0 via-[#C58B48]/0 to-[#C58B48]/0 group-hover:from-[#C58B48]/20 group-hover:via-[#C58B48]/10 group-hover:to-[#C58B48]/20 blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none" />

                  {/* Artist Image - Full Cover */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-200">
                    <img
                      src={
                        artist.image ||
                        "https://via.placeholder.com/600x800?text=🎵"
                      }
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/600x800?text=🎵";
                      }}
                    />
                    
                    {/* Dark gradient overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Featured Badge - Top Left */}
                    {artist.featured && (
                      <div className="absolute top-4 left-4 bg-[#C58B48] text-white px-3 py-1.5 rounded-full text-[10px] font-semibold flex items-center gap-1.5 shadow-lg z-10">
                        <Crown size={12} />
                        Featured
                      </div>
                    )}

                    {/* Availability Badge - Top Right */}
                    {artist.availability && (
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-medium border backdrop-blur-sm shadow-lg z-10 ${getAvailabilityBadge(
                          artist.availability
                        )}`}
                      >
                        {artist.availability.charAt(0).toUpperCase() +
                          artist.availability.slice(1)}
                      </div>
                    )}

                    {/* ====== CONTENT - TRANSPARENT BLUR BACKGROUND ====== */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      {/* Transparent Blur Container */}
                      <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 group-hover:border-[#C58B48]/40 transition-all duration-300 shadow-xl">
                        {/* Artist Name - Golden on Hover */}
                        <h3 className="font-serif text-lg font-semibold text-white group-hover:text-[#C58B48] transition-colors drop-shadow-lg">
                          {artist.name}
                        </h3>

                        {/* Location */}
                        {artist.location && (
                          <p className="text-sm text-white/80 flex items-center gap-1 mt-0.5 drop-shadow-md">
                            <MapPin size={14} className="text-[#C58B48]" />
                            {artist.location}
                          </p>
                        )}

                        {/* Tags */}
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {artist.languages && artist.languages.length > 0 && (
                            <span className="text-[10px] px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/90 border border-white/10">
                              {artist.languages.slice(0, 2).join(", ")}
                              {artist.languages.length > 2 &&
                                ` +${artist.languages.length - 2}`}
                            </span>
                          )}
                          {artist.experience > 0 && (
                            <span className="text-[10px] px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/90 border border-white/10 flex items-center gap-1">
                              <Calendar size={10} />
                              {artist.experience}+ yrs
                            </span>
                          )}
                        </div>

                        {/* Divider with Price and Rating */}
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                          <span className="font-semibold text-[#C58B48] text-sm drop-shadow-md">
                            {formatPrice(artist.price, artist.priceUnit)}
                          </span>
                          
                          {/* Rating */}
                          {artist.rating && (
                            <span className="flex items-center gap-1 text-white/80 text-xs">
                              <Star size={14} fill="#C58B48" stroke="#C58B48" />
                              {artist.rating}
                            </span>
                          )}
                        </div>

                        {/* View Details Link - Golden on Hover */}
                        <div className="mt-2 flex items-center justify-end text-xs font-medium text-[#C58B48]/70 group-hover:text-[#C58B48] transition-all">
                          <span>View Profile</span>
                          <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Golden Border Corner Accents */}
                  <div className="absolute -top-0.5 -left-0.5 w-7 h-7 border-t-[3px] border-l-[3px] border-[#C58B48] rounded-tl-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -top-0.5 -right-0.5 w-7 h-7 border-t-[3px] border-r-[3px] border-[#C58B48] rounded-tr-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -bottom-0.5 -left-0.5 w-7 h-7 border-b-[3px] border-l-[3px] border-[#C58B48] rounded-bl-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 border-b-[3px] border-r-[3px] border-[#C58B48] rounded-br-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
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
              Need More Options?
            </span>
            <div className="w-12 h-[1px] bg-[#C58B48]/50" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-[48px] text-white leading-[1.2] mb-4">
            Can't Find the Right <br />
            <span className="italic text-[#C58B48]">Artist?</span>
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base mb-8">
            We'll help you find the perfect artist for your event. Our team will
            curate a list of talented performers tailored to your needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#C58B48] text-white rounded-full font-semibold hover:bg-[#B07A3A] transition-colors flex items-center gap-2"
            >
              <Sparkles size={18} />
              Get Personalized Recommendations
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/artist-categories"
              className="px-8 py-3.5 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Play size={18} />
              Browse All Categories
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtistsByCategory;