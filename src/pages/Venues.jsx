import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  Heart,
  Users,
  Calendar,
  Sparkles,
  Filter,
  ChevronRight,
  X,
  CheckCircle,
  Hotel,
  Crown,
  Trees,
  Waves,
  Mountain,
  Building,
  Home,
  ArrowRight,
  Palmtree,
  Castle,
  Landmark,
} from "lucide-react";
import Button from "../components/ui/Button";

const Venues = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const categories = [
    "All",
    "Palace",
    "Luxury Resort",
    "Heritage Hotel",
    "Beach",
    "Lake",
    "Mountain",
    "Garden",
  ];

  const venues = [
    {
      id: 1,
      name: "Jaipur Royal Palace",
      category: "Palace",
      location: "Jaipur, Rajasthan",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 128,
      capacity: 500,
      price: "₹1,50,000",
      description:
        "A magnificent 18th-century palace offering royal weddings with traditional Rajasthani hospitality.",
      amenities: [
        "Valet Parking",
        "Pool",
        "Spa",
        "Royal Suites",
        "Garden",
        "Banquet Hall",
      ],
      featured: true,
    },
    {
      id: 2,
      name: "Lake Palace Udaipur",
      category: "Palace",
      location: "Udaipur, Rajasthan",
      image:
        "https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 96,
      capacity: 350,
      price: "₹2,00,000",
      description:
        "A stunning palace on Lake Pichola offering breathtaking views and luxury amenities.",
      amenities: [
        "Lake View",
        "Boat Access",
        "Spa",
        "Fine Dining",
        "Heritage Rooms",
      ],
      featured: true,
    },
    {
      id: 3,
      name: "Goa Beach Resort",
      category: "Beach",
      location: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-9602d5de7a10?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 84,
      capacity: 400,
      price: "₹1,80,000",
      description:
        "Luxury beachfront resort with pristine sands, sunset views, and world-class amenities.",
      amenities: [
        "Private Beach",
        "Pool",
        "Spa",
        "Water Sports",
        "Beach Dining",
      ],
      featured: true,
    },
    {
      id: 4,
      name: "Kerala Backwater Resort",
      category: "Luxury Resort",
      location: "Kerala",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&h=600&fit=crop",
      rating: 4.6,
      reviews: 72,
      capacity: 300,
      price: "₹1,60,000",
      description:
        "Serene resort amidst backwaters with traditional Kerala architecture and Ayurvedic spa.",
      amenities: [
        "Backwater View",
        "Ayurveda Spa",
        "Houseboat",
        "Organic Dining",
        "Yoga",
      ],
      featured: true,
    },
    {
      id: 5,
      name: "Manali Mountain Resort",
      category: "Mountain",
      location: "Manali, Himachal Pradesh",
      image:
        "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",
      rating: 4.5,
      reviews: 63,
      capacity: 250,
      price: "₹1,40,000",
      description:
        "Cozy mountain resort with snow-capped views, fireplace, and adventure activities.",
      amenities: [
        "Mountain View",
        "Fireplace",
        "Adventure Sports",
        "Spa",
        "Bonfire",
      ],
      featured: false,
    },
    {
      id: 6,
      name: "Jodhpur Heritage Hotel",
      category: "Heritage Hotel",
      location: "Jodhpur, Rajasthan",
      image:
        "https://images.unsplash.com/photo-1590582007337-f5d55ec5aaf0?w=800&h=600&fit=crop",
      rating: 4.4,
      reviews: 58,
      capacity: 280,
      price: "₹1,30,000",
      description:
        "Heritage hotel near Mehrangarh Fort offering royal hospitality and stunning views.",
      amenities: ["Fort View", "Pool", "Spa", "Fine Dining", "Heritage Tours"],
      featured: false,
    },
    {
      id: 7,
      name: "Mumbai Luxury Hotel",
      category: "Luxury Resort",
      location: "Mumbai, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=600&fit=crop",
      rating: 4.3,
      reviews: 51,
      capacity: 600,
      price: "₹2,20,000",
      description:
        "5-star luxury hotel with panoramic city views, gourmet dining, and elegant event spaces.",
      amenities: ["City View", "Pool", "Spa", "Fine Dining", "Business Center"],
      featured: false,
    },
    {
      id: 8,
      name: "Uttarakhand Garden Venue",
      category: "Garden",
      location: "Rishikesh, Uttarakhand",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
      rating: 4.2,
      reviews: 45,
      capacity: 200,
      price: "₹1,10,000",
      description:
        "Beautiful garden venue with Ganges views, perfect for intimate and spiritual celebrations.",
      amenities: [
        "Garden",
        "River View",
        "Open Air",
        "Campfire",
        "Organic Food",
      ],
      featured: false,
    },
  ];

  const filteredVenues =
    selectedCategory === "All"
      ? venues
      : venues.filter((v) => v.category === selectedCategory);

  const featuredVenues = venues.filter((v) => v.featured);

  const getCategoryIcon = (category) => {
    const icons = {
      Palace: Castle,
      "Luxury Resort": Hotel,
      "Heritage Hotel": Landmark,
      Beach: Palmtree,
      Lake: Waves,
      Mountain: Mountain,
      Garden: Trees,
      All: MapPin,
    };
    return icons[category] || Home;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              Venues
            </span>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mt-4">
              Discover the Perfect
              <span className="gradient-gold bg-clip-text text-transparent block">
                Event Venue
              </span>
            </h1>
            <p className="text-dark-200 text-lg mt-6">
              Explore our curated collection of stunning venues across India,
              from royal palaces to pristine beaches.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Venues */}
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
                Featured Venues
              </span>
              <h2 className="text-3xl font-playfair font-bold text-dark-900 mt-1">
                Most Popular Venues
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedVenue(venue)}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-gold-500 text-dark-900 px-3 py-1 rounded-full text-xs font-bold">
                    Featured
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-bold text-xl">
                          {venue.name}
                        </h3>
                        <div className="flex items-center text-white/80 text-sm mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {venue.location}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 bg-dark-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                        <span className="text-white text-sm font-semibold">
                          {venue.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gold-500 font-semibold text-sm">
                      {venue.category}
                    </span>
                    <span className="text-gold-500 font-bold">
                      {venue.price}
                    </span>
                  </div>
                  <p className="text-dark-600 text-sm line-clamp-2 mb-3">
                    {venue.description}
                  </p>
                  <div className="flex items-center text-dark-500 text-xs">
                    <Users className="w-4 h-4 mr-1" />
                    Up to {venue.capacity} guests
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Venues */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
                Explore All
              </span>
              <h2 className="text-3xl font-playfair font-bold text-dark-900 mt-1">
                Our Venues
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
                  {categories.map((category) => {
                    const Icon = getCategoryIcon(category);
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                          selectedCategory === category
                            ? "bg-gold-50 text-gold-500 font-semibold"
                            : ""
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {category}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredVenues.map((venue) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="group bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedVenue(venue)}
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-lg">
                        {venue.name}
                      </h3>
                      <div className="flex items-center text-white/80 text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {venue.location}
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gold-500 font-semibold text-xs">
                        {venue.category}
                      </span>
                      <span className="text-gold-500 font-bold text-sm">
                        {venue.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-dark-500">
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {venue.capacity} guests
                      </span>
                      <span className="flex items-center">
                        <Star className="w-3 h-3 text-gold-500 fill-gold-500 mr-1" />
                        {venue.rating}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredVenues.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-dark-600 text-lg">
                No venues found in this category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                }}
                className="text-gold-500 font-semibold mt-2 hover:underline"
              >
                View all venues
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Venue Modal */}
      <AnimatePresence>
        {selectedVenue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm"
            onClick={() => setSelectedVenue(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedVenue(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-dark-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <img
                  src={selectedVenue.image}
                  alt={selectedVenue.name}
                  className="w-full h-80 object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-dark-900">
                      {selectedVenue.name}
                    </h2>
                    <div className="flex items-center text-dark-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedVenue.location}
                    </div>
                  </div>
                  <div className="flex items-center bg-gold-50 px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 text-gold-500 fill-gold-500 mr-1" />
                    <span className="font-semibold">
                      {selectedVenue.rating}
                    </span>
                    <span className="text-dark-500 text-sm ml-1">
                      ({selectedVenue.reviews})
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-dark-600">
                    <Users className="w-4 h-4 mr-2" />
                    Capacity: {selectedVenue.capacity} guests
                  </div>
                  <div className="flex items-center text-dark-600">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {selectedVenue.category}
                  </div>
                  <div className="flex items-center text-dark-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Available year-round
                  </div>
                </div>

                <p className="text-dark-600 mb-6">
                  {selectedVenue.description}
                </p>

                <h3 className="text-lg font-semibold text-dark-900 mb-3">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {selectedVenue.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-dark-600"
                    >
                      <CheckCircle className="w-4 h-4 text-gold-500 mr-2" />
                      {amenity}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-dark-500 text-sm">Starting Price</p>
                    <p className="text-2xl font-bold text-gold-500">
                      {selectedVenue.price}
                    </p>
                  </div>
                  <Button variant="primary">
                    Enquire Now
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              Find Your Perfect Venue
            </h2>
            <p className="text-dark-800 text-lg mt-4 mb-8 max-w-2xl mx-auto">
              Let us help you find the ideal venue for your dream celebration.
            </p>
            <Button
              variant="secondary"
              className="bg-white text-dark-900 hover:bg-dark-900 hover:text-white border-white"
            >
              Schedule a Site Visit
              <Hotel size={20} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Venues;
