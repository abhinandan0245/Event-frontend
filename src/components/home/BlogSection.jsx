// src/components/sections/BlogSection.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ArrowRight,
  X,
  Calendar,
  Eye,
  Tag,
  User,
  Clock,
  BookOpen,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { journalApi } from "../../api/journalApi";
import Button from "../ui/Button";

// ================= STORY POPUP =================
const StoryPopup = ({ isOpen, onClose, story }) => {
  if (!story) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute z-50 top-4 right-4 p-2.5 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <X size={20} />
        </button>

        <div className="relative h-[280px] md:h-[320px] w-full overflow-hidden rounded-t-2xl">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {story.featured && (
            <div className="absolute top-4 left-4 bg-[#C58B48] text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <Heart size={14} />
              Featured
            </div>
          )}

          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
            <span className="text-xs font-semibold text-[#C58B48] uppercase tracking-wider">
              {story.category || "FEATURED"}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#1F2937] leading-[1.2] mb-3">
            {story.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-1.5">
              <User size={16} className="text-[#C58B48]" />
              {story.author || "Violin Events"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={16} className="text-[#C58B48]" />
              {story.date || "Recent"}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} className="text-[#C58B48]" />
              {story.readTime || "5 min read"}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye size={16} className="text-[#C58B48]" />
              {story.views || 0} views
            </span>
          </div>

          <div className="mb-6 bg-[#FDFBF7] p-4 rounded-xl border border-[#EBE3D5]">
            <p className="text-gray-600 font-inter text-sm leading-relaxed italic">
              "{story.excerpt || story.desc}"
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-[#C58B48]" />
              Full Story
            </h3>
            <div className="prose prose-sm max-w-none text-gray-600 font-inter leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-xl border border-gray-100">
              {story.content || story.desc}
            </div>
          </div>

          {story.tags && story.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Tag size={18} className="text-[#C58B48]" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-[#C58B48] hover:text-white transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {story.images && story.images.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {story.images.slice(0, 4).map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-[#C58B48] transition-colors cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=100&q=80";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            variant="champagne"
            className="w-full font-montserrat text-sm"
            onClick={onClose}
          >
            Close Story
          </Button>
        </div>
      </div>
    </div>
  );
};

// ================= MAIN COMPONENT =================
const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const [selectedStory, setSelectedStory] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ✅ Fetch journal items from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await journalApi.getAll({ limit: 12 });
        console.log("📡 Journal API Response:", response);

        if (response?.success && response?.data?.items) {
          const items = response.data.items;

          const validItems = items.filter((item) => item.image);

          if (validItems.length === 0) {
            setError("No blog posts with images available");
            setBlogPosts([]);
            setLoading(false);
            return;
          }

          const formattedPosts = validItems.map((item) => {
            let formattedDate = "Recent";
            if (item.date) {
              try {
                const date = new Date(item.date);
                if (!isNaN(date.getTime())) {
                  formattedDate = date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }
              } catch (e) {
                formattedDate = "Recent";
              }
            }

            return {
              id: item._id,
              title: item.title || "Untitled",
              category: item.category || "FEATURED",
              desc: item.excerpt || item.content?.substring(0, 120) + "...",
              excerpt: item.excerpt || item.content?.substring(0, 120) + "...",
              image: item.image,
              date: formattedDate,
              author: item.author || "Violin Events",
              readTime: item.readTime || "5 min read",
              views: item.views || 0,
              content: item.content || item.desc || "",
              tags: item.tags || [],
              featured: item.featured || false,
              isActive: item.isActive !== false,
              images: item.images || [],
              slug: item.slug,
              _id: item._id,
            };
          });

          setBlogPosts(formattedPosts);
        } else {
          setError("No blog posts found");
          setBlogPosts([]);
        }
      } catch (error) {
        console.error("❌ Error fetching blog posts:", error);
        setError("Failed to load blog posts. Please try again later.");
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleStoryClick = useCallback((story) => {
    setSelectedStory(story);
    setIsPopupOpen(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false);
    setSelectedStory(null);
  }, []);

  // ✅ CORRECT: Only ONE copy in JSX - CSS handles the infinite scroll
  // The key is using unique IDs for each item
  const marqueeItems = useMemo(() => {
    if (blogPosts.length === 0) return [];

    // We only need ONE copy in the JSX
    // The CSS animation with translateX(-50%) will create the infinite effect
    return blogPosts.map((post, index) => ({
      ...post,
      // Use a simple unique key
      _key: post.id || post._id || index,
    }));
  }, [blogPosts]);

  if (loading) {
    return (
      <section className="relative w-full min-h-screen bg-[#FDFBF7] font-sans overflow-hidden py-16 lg:py-24 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48] mb-4"></div>
          <p className="text-gray-500 font-inter text-sm">Loading stories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative w-full min-h-screen bg-[#FDFBF7] font-sans overflow-hidden py-16 lg:py-24 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center px-6 max-w-md">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Stories Available
          </h3>
          <p className="text-gray-500 font-inter text-sm mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="secondary"
            shape="pill"
            size="md"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <section className="relative w-full min-h-screen bg-[#FDFBF7] font-sans overflow-hidden py-16 lg:py-24 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center px-6 max-w-md">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Stories Yet
          </h3>
          <p className="text-gray-500 font-inter text-sm mb-6">
            We're curating beautiful stories for you. Check back soon!
          </p>
          <Link to="/journal">
            <Button variant="secondary" shape="pill" size="md">
              Explore Journal
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative w-full min-h-screen bg-[#FDFBF7] font-sans overflow-hidden py-16 lg:py-24 flex flex-col items-center">
        <style>
          {`
            @keyframes smooth-scroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
            .animate-smooth-scroll {
              animation: smooth-scroll 30s linear infinite;
            }
            .font-cormorant { font-family: 'Cormorant Garamond', serif; }
            .font-inter { font-family: 'Inter', sans-serif; }
            .font-montserrat { font-family: 'Montserrat', sans-serif; }
          `}
        </style>

        {/* Background Elements */}
        <div className="absolute top-10 left-0 w-[200px] md:w-[350px] opacity-70 pointer-events-none z-0">
          <img
            src="https://images.unsplash.com/photo-1526761122248-b31c93f8b2f9?w=600&q=80"
            alt="Palace"
            className="w-full h-auto mix-blend-multiply opacity-50 grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FDFBF7]/80 to-[#FDFBF7]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/50 via-transparent to-[#FDFBF7]" />
        </div>

        <div className="absolute top-12 right-12 w-24 h-24 md:w-32 md:h-32 opacity-60 pointer-events-none z-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full border border-[#D4AF37]/30 flex items-center justify-center relative">
            <span className="absolute text-[8px] tracking-[0.2em] text-[#D4AF37] uppercase -top-2">
              Crafting Celebrations
            </span>
            <span className="font-cormorant text-4xl text-[#D4AF37]">V</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle_at_bottom_left,#E5D9C5_0%,transparent_70%)] opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_bottom_right,#E5D9C5_0%,transparent_70%)] opacity-40 pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center">
          {/* HEADER */}
          <div className="text-center max-w-3xl px-4 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#C58B48]" />
              <span className="font-montserrat text-[#C58B48] text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase">
                OUR JOURNAL
              </span>
              <div className="w-8 h-[1px] bg-[#C58B48]" />
            </div>

            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[56px] text-[#222222] leading-[1.2] mb-4">
              Stories. Inspiration.{" "}
              <span className="italic text-[#C58B48]">Celebrations.</span>
            </h2>

            <p className="font-inter text-sm md:text-[15px] font-light leading-[1.8] text-gray-600 max-w-2xl mx-auto">
              Discover destination wedding insights, luxury planning
              inspiration, venue guides, and real celebration stories curated by
              Violin Events LLP.
            </p>
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12 border-b border-gray-200 w-full max-w-5xl px-4 pb-2">
            {[
              "ALL",
              "REAL WEDDINGS",
              "PLANNING TIPS",
              "DESTINATIONS",
              "TRENDS & INSPIRATION",
            ].map((cat, i) => (
              <span
                key={i}
                className={`font-montserrat text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase cursor-pointer pb-2 relative transition-colors ${i === 0 ? "text-[#C58B48]" : "text-gray-500 hover:text-[#C58B48]"}`}
              >
                {cat}
                {i === 0 && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C58B48]" />
                )}
              </span>
            ))}
          </div>

          {/* === MARQUEE - ONLY ONE COPY IN JSX === */}
          <div
            className="w-full overflow-hidden py-8 group/slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="flex w-max animate-smooth-scroll items-center gap-6 md:gap-8 px-4"
              style={{ animationPlayState: isHovered ? "paused" : "running" }}
            >
              {marqueeItems.map((blog) => (
                <div
                  key={blog._key}
                  onClick={() => handleStoryClick(blog)}
                  className="flex-shrink-0 w-[280px] md:w-[340px] lg:w-[380px] bg-white rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col transition-all duration-500 group-hover/slider:opacity-50 hover:!opacity-100 hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] cursor-pointer"
                >
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <img
                      src={
                        blog.image ||
                        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80"
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80";
                      }}
                    />

                    <div className="absolute top-0 left-0 bg-white/95 backdrop-blur-sm px-4 py-3 flex flex-col items-center justify-center border-b border-r border-gray-100 shadow-sm">
                      <span className="font-cormorant text-xl text-[#222222] leading-none mb-1">
                        {blog.date
                          ? blog.date.split(" ")[1]?.replace(",", "") || "01"
                          : "01"}
                      </span>
                      <span className="font-montserrat text-[8px] font-bold tracking-widest text-gray-500 uppercase leading-none mb-0.5">
                        {blog.date
                          ? blog.date.split(" ")[0]?.toUpperCase() || "JAN"
                          : "JAN"}
                      </span>
                      <span className="font-inter text-[9px] text-gray-400 leading-none">
                        {blog.date ? blog.date.split(" ")[2] || "2024" : "2024"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.2em] uppercase mb-3 block">
                      {blog.category || "FEATURED"}
                    </span>
                    <h3 className="font-cormorant text-2xl text-[#222222] leading-[1.3] mb-4">
                      {blog.title}
                    </h3>

                    <div className="flex items-center justify-center w-full mb-4">
                      <div className="w-1.5 h-1.5 rotate-45 border border-[#C58B48]/50" />
                    </div>

                    <p className="font-inter text-[11px] md:text-xs text-gray-500 leading-[1.8] mb-6 flex-grow">
                      {blog.desc}
                    </p>

                    <div className="mt-auto flex items-center gap-2 text-[#C58B48] text-[10px] font-montserrat font-semibold tracking-widest uppercase group-hover:text-amber-900 transition-colors">
                      READ MORE{" "}
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/journal"
            className="mt-12 flex items-center justify-center gap-2 text-[#C58B48] text-[10px] font-montserrat font-bold tracking-[0.25em] uppercase cursor-pointer hover:text-amber-900 transition-colors group"
          >
            VIEW ALL ARTICLES{" "}
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </section>

      <StoryPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        story={selectedStory}
      />
    </>
  );
};

export default BlogSection;
