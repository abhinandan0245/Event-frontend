// src/pages/Journal.jsx
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  MapPin,
  Heart,
  Palette,
  Music,
  ConciergeBell,
  ArrowRight,
  Play,
  Mail,
  X,
  Calendar,
  Eye,
  Tag,
  User,
  Clock,
} from "lucide-react";
import Button from "../components/ui/Button";
import { FaInstagram } from "react-icons/fa";
import { journalApi } from "../api/journalApi";

// ================= PREMIUM 3D CARD WRAPPER =================
const Premium3DCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

// ================= STORY DETAILS POPUP =================
const StoryPopup = ({ isOpen, onClose, story }) => {
  if (!story) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute z-50 top-4 right-4 p-2.5 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <X size={20} />
        </button>

        {/* Image */}
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
              {story.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#1F2937] leading-[1.2] mb-3">
            {story.title}
          </h2>

          {/* Meta */}
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

          {/* Excerpt */}
          <div className="mb-6 bg-[#FDFBF7] p-4 rounded-xl border border-[#EBE3D5]">
            <p className="text-gray-600 font-inter text-sm leading-relaxed italic">
              "{story.excerpt}"
            </p>
          </div>

          {/* Content */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-[#C58B48]" />
              Full Story
            </h3>
            <div className="prose prose-sm max-w-none text-gray-600 font-inter leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-xl border border-gray-100">
              {story.content}
            </div>
          </div>

          {/* Tags */}
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

          {/* Gallery */}
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

          {/* Close Button */}
          <Button
            variant="champagne"
            className="w-full font-montserrat text-sm"
            onClick={onClose}
          >
            Close Story
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Journal = () => {
  const [items, setItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Popup state
  const [selectedStory, setSelectedStory] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const getCategoryIcon = (category) => {
    const iconMap = {
      "WEDDING TRENDS": Sparkles,
      "PLANNING TIPS": BookOpen,
      DESTINATIONS: MapPin,
      "REAL WEDDINGS": Heart,
      "DECOR & DESIGN": Palette,
      ENTERTAINMENT: Music,
      "FOOD & HOSPITALITY": ConciergeBell,
    };
    return iconMap[category?.toUpperCase()] || Sparkles;
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [itemsRes, featuredRes, categoriesRes] = await Promise.all([
          journalApi.getAll({ limit: 8 }),
          journalApi.getFeatured(),
          journalApi.getCategories(),
        ]);

        if (itemsRes.success) {
          setItems(itemsRes.data?.items || []);
        }
        if (featuredRes.success) {
          setFeaturedItems(featuredRes.data || []);
        }
        if (categoriesRes.success) {
          setCategories(categoriesRes.data || []);
        }
      } catch (err) {
        console.error("Error fetching journal data:", err);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Handle story click - open popup
  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setIsPopupOpen(true);
  };

  // ✅ Close popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedStory(null);
  };

  // Map categories from API or use fallback
  const categoryList =
    categories.length > 0
      ? categories.map((cat) => ({
          name: cat.toUpperCase(),
          icon: getCategoryIcon(cat),
        }))
      : [
          { name: "WEDDING TRENDS", icon: Sparkles },
          { name: "PLANNING TIPS", icon: BookOpen },
          { name: "DESTINATIONS", icon: MapPin },
          { name: "REAL WEDDINGS", icon: Heart },
          { name: "DECOR & DESIGN", icon: Palette },
          { name: "ENTERTAINMENT", icon: Music },
          { name: "FOOD & HOSPITALITY", icon: ConciergeBell },
        ];

  // Use API items for latest stories
  const latestStories =
    items.length > 0
      ? items.map((item) => ({
          ...item,
          date: item.date
            ? new Date(item.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Recent",
        }))
      : [];

  // Use featured items for love stories
  const loveStories =
    featuredItems.length > 0
      ? featuredItems.map((item) => ({
          ...item,
          couple: item.author || "Violin Events",
        }))
      : [];

  // Instagram images (static - keep as fallback)
  const instagramImages = [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583089892943-e02e5be026b9?q=80&w=300&auto=format&fit=crop",
  ];

  // Animation variants
  const fadeUp3D = {
    hidden: { opacity: 0, y: 60, rotateX: -15, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48] mb-4"></div>
          <p className="text-gray-500 font-inter text-sm">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C58B48] selection:text-white overflow-x-hidden">
        {/* ================= HERO SECTION ================= */}
        <section className="relative w-full min-h-[85vh] flex items-center pt-24 lg:pt-32 pb-16">
          <div className="absolute top-0 right-0 w-full lg:w-[65%] h-[85vh] z-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop"
              alt="Palace Wedding Decoration"
              className="w-full h-full object-cover opacity-90"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 30%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 30%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
          </div>

          <div className="absolute top-0 left-0 w-[400px] h-[400px] opacity-[0.08] pointer-events-none z-0 mix-blend-multiply grayscale">
            <img
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80"
              alt="Floral Decor"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col justify-center h-full">
            <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-40 hidden md:flex">
              <span className="font-montserrat text-[8px] font-bold tracking-widest text-[#1F2937]">
                01
              </span>
              <div className="w-[1px] h-8 bg-[#1F2937]"></div>
              <span className="font-montserrat text-[8px] font-bold tracking-widest text-[#1F2937]">
                08
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -40, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
              className="w-full lg:w-[45%] pt-10 pl-0 md:pl-8"
              style={{ perspective: 1000 }}
            >
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
                THE JOURNAL
              </span>
              <h1 className="font-cormorant text-5xl lg:text-[72px] text-[#1F2937] leading-[1.1] mb-6">
                Stories, Ideas & <br />
                <span className="italic text-[#C58B48]">Inspiration</span>
              </h1>

              <p className="font-inter text-gray-600 text-[13px] leading-[1.8] max-w-[340px] mb-10">
                Expert tips, real celebrations and curated inspiration to help
                you plan extraordinary moments.
              </p>

              <Button
                variant="champagne"
                size="md"
                className="font-montserrat text-[10px] tracking-[0.2em] shadow-none w-fit"
              >
                EXPLORE ARTICLES{" "}
                <ArrowRight
                  size={14}
                  className="ml-1 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ================= CATEGORY FILTER BAR ================= */}
        <section className="py-12 relative z-10">
          <div className="w-full max-w-[1400px] mx-auto px-6 text-center">
            <span className="font-montserrat text-[#C58B48] text-[8px] font-bold tracking-[0.25em] uppercase mb-8 block">
              EXPLORE BY CATEGORY
            </span>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex justify-center gap-8 lg:gap-16 overflow-x-auto no-scrollbar pb-4"
            >
              {categoryList.map((cat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp3D}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="flex flex-col items-center gap-3 cursor-pointer group min-w-[80px]"
                >
                  <div className="w-10 h-10 rounded-full border border-transparent group-hover:border-[#C58B48]/30 flex items-center justify-center transition-all duration-300 bg-white shadow-sm group-hover:shadow-md">
                    <cat.icon
                      className="w-4 h-4 text-[#C58B48]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="font-montserrat text-[8px] font-bold tracking-widest text-gray-400 group-hover:text-[#1F2937] transition-colors uppercase whitespace-nowrap">
                    {cat.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= FEATURED STORY ================= */}
        <section className="py-16 relative z-10" style={{ perspective: 2000 }}>
          <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
            <Premium3DCard>
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: -5 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                className="bg-white rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-[#EBE3D5] overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[450px] cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => {
                  const story =
                    featuredItems.length > 0 ? featuredItems[0] : null;
                  if (story) handleStoryClick(story);
                }}
              >
                <div className="w-full lg:w-[45%] p-10 lg:p-16 flex flex-col justify-center relative z-10 bg-white">
                  <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
                    FEATURED STORY
                  </span>
                  <h2 className="font-cormorant text-4xl lg:text-[46px] text-[#1F2937] leading-[1.1] mb-6">
                    {featuredItems.length > 0
                      ? featuredItems[0].title
                      : "A Regal Celebration at The City Palace, Udaipur"}
                  </h2>
                  <p className="font-inter text-[13px] text-gray-600 leading-relaxed mb-10 max-w-sm">
                    {featuredItems.length > 0
                      ? featuredItems[0].excerpt
                      : "A dreamy fusion wedding filled with royal charm, intricate details and timeless memories."}
                  </p>
                  <button className="font-montserrat text-[9px] font-bold tracking-[0.2em] text-[#C58B48] hover:text-amber-900 transition-colors flex items-center gap-2 uppercase justify-start group w-fit">
                    READ MORE{" "}
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </button>
                </div>

                <div className="w-full lg:w-[55%] h-[300px] lg:h-full relative overflow-hidden group">
                  <img
                    src={
                      featuredItems.length > 0
                        ? featuredItems[0].image
                        : "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=870&auto=format&fit=crop"
                    }
                    alt="Featured Story"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent w-[30%] hidden lg:block" />
                </div>
              </motion.div>
            </Premium3DCard>
          </div>
        </section>

        {/* ================= LATEST STORIES ================= */}
        <section className="py-16">
          <div
            className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center"
            style={{ perspective: 1200 }}
          >
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-12 block">
              LATEST STORIES
            </span>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {latestStories.length > 0 ? (
                latestStories.map((story, idx) => (
                  <div key={idx} onClick={() => handleStoryClick(story)}>
                    <Premium3DCard>
                      <motion.div
                        variants={fadeUp3D}
                        className="flex flex-col text-left group cursor-pointer h-full bg-white p-4 rounded-xl border border-transparent hover:border-[#EBE3D5] hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-500"
                      >
                        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-6 shadow-sm border border-[#EBE3D5]">
                          <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80";
                            }}
                          />
                        </div>
                        <h3 className="font-cormorant text-2xl text-[#1F2937] leading-[1.2] mb-3 group-hover:text-[#C58B48] transition-colors">
                          {story.title}
                        </h3>
                        <p className="font-inter text-[11px] text-gray-500 leading-[1.8] mb-5">
                          {story.excerpt}
                        </p>
                        <div className="mt-auto">
                          <button className="font-montserrat text-[9px] font-bold tracking-widest text-[#C58B48] group-hover:text-amber-900 transition-colors flex items-center gap-1 uppercase mb-4">
                            READ MORE{" "}
                            <ArrowRight
                              size={12}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </button>
                          <span className="font-inter text-[10px] text-gray-400">
                            {story.date}
                          </span>
                        </div>
                      </motion.div>
                    </Premium3DCard>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No stories available yet</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ================= PLANNING MADE SIMPLE BANNER ================= */}
        <section className="py-16">
          <div
            className="w-full max-w-[1400px] mx-auto px-6 lg:px-16"
            style={{ perspective: 1500 }}
          >
            <Premium3DCard>
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="w-full bg-white rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.04)] border border-[#EBE3D5] overflow-hidden flex flex-col md:flex-row h-auto md:h-[350px] relative group"
              >
                <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-multiply transition-opacity duration-700 group-hover:opacity-[0.25]">
                  <img
                    src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1600&q=80"
                    alt="flatlay"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full md:w-1/2 h-[200px] md:h-full relative z-10 p-6 md:p-12 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80"
                    alt="Journal"
                    className="w-full h-full object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>

                <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center items-start text-left relative z-10">
                  <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
                    WEDDING TIPS
                  </span>
                  <h2 className="font-cormorant text-4xl lg:text-[46px] text-[#1F2937] leading-[1.1] mb-6">
                    Planning Made Simple, <br />
                    <span className="italic text-[#C58B48]">
                      Celebrations Made Perfect
                    </span>
                  </h2>
                  <p className="font-inter text-xs text-gray-600 leading-[1.8] max-w-sm mb-8">
                    Expert advice, checklists and insider tips to make your
                    wedding planning journey smooth and stress-free.
                  </p>
                  <Button
                    variant="champagne"
                    size="sm"
                    className="font-montserrat text-[9px] tracking-[0.2em] shadow-none hover:shadow-lg transition-shadow"
                  >
                    EXPLORE TIPS <ArrowRight size={12} className="ml-1" />
                  </Button>
                </div>
              </motion.div>
            </Premium3DCard>
          </div>
        </section>

        {/* ================= REAL WEDDINGS (LOVE STORIES) ================= */}
        <section className="py-16">
          <div
            className="w-full max-w-[1400px] mx-auto px-6 lg:px-16"
            style={{ perspective: 1200 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
                  REAL WEDDINGS
                </span>
                <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937]">
                  Love Stories We've Brought to Life
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] hover:border-[#C58B48] mt-6 md:mt-0"
              >
                VIEW ALL REAL WEDDINGS <ArrowRight size={12} className="ml-1" />
              </Button>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {loveStories.length > 0 ? (
                loveStories.map((story, idx) => (
                  <div key={idx} onClick={() => handleStoryClick(story)}>
                    <Premium3DCard>
                      <motion.div
                        variants={fadeUp3D}
                        className="flex flex-col text-center group cursor-pointer"
                      >
                        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-5 relative shadow-md border border-[#EBE3D5]">
                          <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-lg transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out">
                              <Play className="w-4 h-4 text-[#C58B48] fill-[#C58B48] ml-1" />
                            </div>
                          </div>
                        </div>
                        <h3 className="font-montserrat text-[#1F2937] text-[10px] font-bold tracking-[0.1em] uppercase mb-1">
                          {story.title}
                        </h3>
                        <p className="font-inter text-[11px] text-gray-400">
                          {story.couple}
                        </p>
                      </motion.div>
                    </Premium3DCard>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No featured stories available</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ================= INSTAGRAM SECTION ================= */}
        <section className="py-16">
          <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-[25%] flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
                  FOLLOW OUR JOURNEY
                </span>
                <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937] mb-8">
                  @violinevents
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] hover:border-[#C58B48] w-fit"
                >
                  <FaInstagram size={12} className="mr-1" /> FOLLOW US ON
                  INSTAGRAM <ArrowRight size={12} className="ml-1" />
                </Button>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="w-full lg:w-[75%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3"
              >
                {instagramImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUp3D}
                    className="aspect-square rounded-md overflow-hidden relative group cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={`Instagram ${idx}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <FaInstagram
                        className="text-white w-6 h-6"
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= STORY POPUP ================= */}
      <StoryPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        story={selectedStory}
      />
    </>
  );
};

export default Journal;
