import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  Heart,
  Search,
  Filter,
  ChevronDown,
  Calendar,
  Users,
  Sparkles,
  ChevronRight,
  X,
} from "lucide-react";
import Button from "../components/ui/Button";

const Destinations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const categories = [
    "All",
    "Royal Heritage",
    "Beach & Luxury",
    "Backwaters & Traditions",
    "Mountains & Serenity",
    "Hills & Spirituality",
    "Scenic Beauty",
  ];

  const destinations = [
    {
      id: 1,
      name: "Jaipur",
      state: "Rajasthan",
      category: "Royal Heritage",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 128,
      price: "₹45,000",
      description:
        "Experience royal weddings in the Pink City with its magnificent palaces and forts.",
      tags: ["Palaces", "Heritage", "Royal"],
      featured: true,
    },
    {
      id: 2,
      name: "Udaipur",
      state: "Rajasthan",
      category: "Royal Heritage",
      image:
        "https://images.unsplash.com/photo-1592656094267-764a45160876?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 96,
      price: "₹55,000",
      description:
        "The City of Lakes offers romantic settings with stunning lake-facing palaces.",
      tags: ["Lakes", "Romantic", "Palace"],
      featured: true,
    },
    {
      id: 3,
      name: "Goa",
      state: "Goa",
      category: "Beach & Luxury",
      image:
        "https://images.unsplash.com/photo-1512343879784-9602d5de7a10?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 84,
      price: "₹50,000",
      description:
        "Beach weddings with golden sands, blue waters, and luxury resorts.",
      tags: ["Beach", "Luxury", "Sunset"],
      featured: true,
    },
    {
      id: 4,
      name: "Kerala",
      state: "Kerala",
      category: "Backwaters & Traditions",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&h=400&fit=crop",
      rating: 4.6,
      reviews: 72,
      price: "₹48,000",
      description:
        "God's Own Country offers serene backwaters, lush greenery, and cultural traditions.",
      tags: ["Backwaters", "Traditions", "Ayurveda"],
      featured: true,
    },
    {
      id: 5,
      name: "Kashmir",
      state: "Jammu & Kashmir",
      category: "Mountains & Serenity",
      image:
        "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?w=600&h=400&fit=crop",
      rating: 4.5,
      reviews: 63,
      price: "₹52,000",
      description:
        "Paradise on Earth with snow-capped mountains, gardens, and houseboats.",
      tags: ["Mountains", "Serenity", "Houseboats"],
      featured: false,
    },
    {
      id: 6,
      name: "Uttarakhand",
      state: "Uttarakhand",
      category: "Hills & Spirituality",
      image:
        "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&h=400&fit=crop",
      rating: 4.4,
      reviews: 58,
      price: "₹42,000",
      description:
        "Spiritual and scenic weddings in the foothills of the Himalayas.",
      tags: ["Hills", "Spirituality", "Temples"],
      featured: false,
    },
    {
      id: 7,
      name: "Himachal Pradesh",
      state: "Himachal Pradesh",
      category: "Scenic Beauty",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop",
      rating: 4.3,
      reviews: 51,
      price: "₹40,000",
      description:
        "Breathtaking mountain views and charming hill stations for intimate weddings.",
      tags: ["Mountains", "Scenic", "Adventure"],
      featured: false,
    },
    {
      id: 8,
      name: "Jodhpur",
      state: "Rajasthan",
      category: "Royal Heritage",
      image:
        "https://images.unsplash.com/photo-1590582007337-f5d55ec5aaf0?w=600&h=400&fit=crop",
      rating: 4.2,
      reviews: 45,
      price: "₹38,000",
      description:
        "The Blue City with its majestic Mehrangarh Fort and royal hospitality.",
      tags: ["Forts", "Blue City", "Heritage"],
      featured: false,
    },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory =
      selectedCategory === "All" || dest.category === selectedCategory;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.state.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredDestinations = destinations.filter((d) => d.featured);

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
              Destinations
            </span>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mt-4">
              Find Your Perfect
              <span className="gradient-gold bg-clip-text text-transparent block">
                Event Destination
              </span>
            </h1>
            <p className="text-dark-200 text-lg mt-6">
              From royal palaces to pristine beaches, discover India's most
              breathtaking locations for your celebration.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      {searchTerm === "" && selectedCategory === "All" && (
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
                  Featured
                </span>
                <h2 className="text-3xl font-playfair font-bold text-dark-900 mt-1">
                  Most Popular Destinations
                </h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDestinations.map((dest, index) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-gold-500 text-dark-900 px-3 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-dark-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                      <span className="text-white text-sm font-semibold">
                        {dest.rating}
                      </span>
                      <span className="text-gray-300 text-sm">
                        ({dest.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-dark-800 group-hover:text-gold-500 transition-colors">
                          {dest.name}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {dest.state}
                        </div>
                      </div>
                      <span className="text-gold-500 font-bold">
                        {dest.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">
                      {dest.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {dest.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gold-50 text-gold-600 text-xs font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Destinations */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
                Explore All
              </span>
              <h2 className="text-3xl font-playfair font-bold text-dark-900 mt-1">
                Our Destinations
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
                <ChevronDown className="w-4 h-4" />
              </button>
              {filterOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-2 min-w-[200px] z-10">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredDestinations.map((dest, index) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-dark-900/70 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                      <span className="text-white text-xs font-semibold">
                        {dest.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-dark-800 group-hover:text-gold-500 transition-colors">
                          {dest.name}
                        </h3>
                        <div className="flex items-center text-gray-500 text-xs mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {dest.state}
                        </div>
                      </div>
                      <span className="text-gold-500 font-bold text-sm">
                        {dest.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs mt-2 line-clamp-2">
                      {dest.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {dest.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gold-50 text-gold-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button className="text-gold-500 text-sm font-semibold flex items-center hover:gap-2 transition-all">
                        Explore More
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredDestinations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-dark-600 text-lg">
                No destinations found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                }}
                className="text-gold-500 font-semibold mt-2 hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-dark-900">
              Ready to Plan Your Dream Event?
            </h2>
            <p className="text-dark-800 text-lg mt-4 mb-8 max-w-2xl mx-auto">
              Let us help you choose the perfect destination for your special
              day.
            </p>
            <Button
              variant="secondary"
              className="bg-white text-dark-900 hover:bg-dark-900 hover:text-white border-white"
            >
              Schedule a Consultation
              <Calendar size={20} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
