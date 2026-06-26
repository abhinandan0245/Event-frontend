import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  Tag,
  Heart,
  ChevronRight,
  ArrowRight,
  Clock,
  Eye,
  MessageCircle,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  PenTool,
  Star,
  Share2,
  Bookmark,
} from "lucide-react";
import Button from "../components/ui/Button";

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const categories = [
    "All",
    "Wedding",
    "Destination",
    "Tips",
    "Trends",
    "Planning",
    "Inspiration",
  ];

  const articles = [
    {
      id: 1,
      title: "10 Tips for Planning a Royal Wedding in Rajasthan",
      excerpt:
        "Discover the secrets to planning a magnificent royal wedding in the heart of Rajasthan, from venue selection to traditional ceremonies.",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop",
      category: "Wedding",
      date: "June 25, 2026",
      author: "Priya Sharma",
      readTime: "8 min read",
      views: 1245,
      likes: 89,
      featured: true,
      tags: ["Royal Wedding", "Rajasthan", "Planning Tips"],
    },
    {
      id: 2,
      title: "Destination Wedding Guide: Best Locations in India",
      excerpt:
        "From the beaches of Goa to the mountains of Manali, explore the most stunning destination wedding locations across India.",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=500&fit=crop",
      category: "Destination",
      date: "June 22, 2026",
      author: "Arjun Singh",
      readTime: "10 min read",
      views: 987,
      likes: 76,
      featured: true,
      tags: ["Destination Wedding", "Travel", "Venues"],
    },
    {
      id: 3,
      title: "2026 Wedding Trends: What's Hot in Indian Weddings",
      excerpt:
        "Stay ahead of the curve with the latest wedding trends, from sustainable decor to fusion cuisine and technology integration.",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=500&fit=crop",
      category: "Trends",
      date: "June 20, 2026",
      author: "Meera Patel",
      readTime: "6 min read",
      views: 1567,
      likes: 112,
      featured: true,
      tags: ["Wedding Trends", "2026", "Innovation"],
    },
    {
      id: 4,
      title: "Budget-Friendly Wedding Planning: Save Without Compromising",
      excerpt:
        "Learn how to plan a stunning wedding on a budget with smart tips and creative solutions that don't compromise on quality.",
      image:
        "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=500&fit=crop",
      category: "Tips",
      date: "June 18, 2026",
      author: "Vikram Reddy",
      readTime: "7 min read",
      views: 2341,
      likes: 156,
      featured: false,
      tags: ["Budget", "Planning", "Tips"],
    },
    {
      id: 5,
      title: "The Ultimate Guide to Pre-Wedding Photoshoots",
      excerpt:
        "Get inspired with creative ideas for your pre-wedding photoshoot, from locations to poses and themes that tell your love story.",
      image:
        "https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&h=500&fit=crop",
      category: "Inspiration",
      date: "June 15, 2026",
      author: "Sana Khan",
      readTime: "5 min read",
      views: 876,
      likes: 67,
      featured: false,
      tags: ["Photoshoot", "Love Story", "Creative"],
    },
    {
      id: 6,
      title: "Sustainable Weddings: Eco-Friendly Celebration Ideas",
      excerpt:
        "Discover how to plan an eco-friendly wedding with sustainable decor, zero-waste practices, and ethical choices that make a difference.",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=500&fit=crop",
      category: "Trends",
      date: "June 12, 2026",
      author: "Priya Sharma",
      readTime: "9 min read",
      views: 654,
      likes: 54,
      featured: false,
      tags: ["Sustainable", "Eco-Friendly", "Green Wedding"],
    },
    {
      id: 7,
      title: "Wedding Photography: Capturing the Magic Moments",
      excerpt:
        "Expert tips on choosing the right photographer and ensuring your wedding memories are captured beautifully.",
      image:
        "https://images.unsplash.com/photo-1512343879784-9602d5de7a10?w=800&h=500&fit=crop",
      category: "Tips",
      date: "June 10, 2026",
      author: "Arjun Singh",
      readTime: "6 min read",
      views: 543,
      likes: 43,
      featured: false,
      tags: ["Photography", "Memories", "Tips"],
    },
    {
      id: 8,
      title: "Catering Ideas: Delicious Menus for Your Wedding",
      excerpt:
        "Explore creative catering ideas and menu options that will delight your guests and make your wedding memorable.",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&h=500&fit=crop",
      category: "Planning",
      date: "June 8, 2026",
      author: "Meera Patel",
      readTime: "7 min read",
      views: 432,
      likes: 38,
      featured: false,
      tags: ["Catering", "Food", "Menu"],
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter((a) => a.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              Journal
            </span>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mt-4">
              Stories & Insights
              <span className="gradient-gold bg-clip-text text-transparent block">
                For Your Celebration
              </span>
            </h1>
            <p className="text-dark-200 text-lg mt-6">
              Discover inspiration, tips, and trends to help you plan the
              perfect celebration.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
                Featured Stories
              </span>
              <h2 className="text-3xl font-playfair font-bold text-dark-900 mt-1">
                Must-Read Articles
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-gold-500 text-dark-900 px-3 py-1 rounded-full text-xs font-bold">
                    Featured
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-dark-800">
                        {article.category}
                      </span>
                      <span className="text-white/80 text-xs flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-gold-500 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-dark-600 text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-dark-500">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-dark-400">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {article.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {article.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
                Explore All
              </span>
              <h2 className="text-3xl font-playfair font-bold text-dark-900 mt-1">
                Latest Articles
              </h2>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>{selectedCategory}</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${filterOpen ? "rotate-90" : ""}`}
                />
              </button>
              {filterOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-2 min-w-[150px] z-10">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
                        selectedCategory === category
                          ? "bg-gold-50 text-gold-500 font-semibold"
                          : ""
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredArticles.map((article) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="group bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col md:flex-row"
                >
                  <div className="relative overflow-hidden md:w-56 h-48 md:h-auto flex-shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 via-transparent to-transparent md:bg-none" />
                    <div className="absolute bottom-3 left-3 md:hidden">
                      <span className="bg-gold-500 text-dark-900 px-2 py-0.5 rounded-full text-xs font-bold">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1">
                    <div className="hidden md:flex items-center gap-2 mb-2">
                      <span className="bg-gold-100 text-gold-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-dark-900 mb-2 group-hover:text-gold-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-dark-600 text-sm line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-dark-400 bg-white px-2 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-dark-400">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {article.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-dark-600 text-lg">
                No articles found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                }}
                className="text-gold-500 font-semibold mt-2 hover:underline"
              >
                View all articles
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <BookOpen className="w-12 h-12 text-dark-900 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-dark-900">
              Subscribe to Our Journal
            </h2>
            <p className="text-dark-800 text-lg mt-4 mb-8">
              Get the latest wedding tips, trends, and inspiration delivered to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-dark-900"
              />
              <Button
                variant="secondary"
                className="bg-white text-dark-900 hover:bg-dark-900 hover:text-white border-white"
              >
                Subscribe
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
            <p className="text-dark-700 text-sm mt-4">
              Join 5,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Journal;
