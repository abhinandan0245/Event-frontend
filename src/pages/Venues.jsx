import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  Heart,
  Users,
  Calendar,
  Sparkles,
  ChevronRight,
  X,
  CheckCircle,
  Hotel,
  Crown,
  Trees,
  Waves,
  Mountain,
  Building,
  ArrowRight,
  Palmtree,
  Castle,
  Landmark,
  Search,
  Award,
  Globe,
  Shield,
} from "lucide-react";
import Button from "../components/ui/Button";

const Venues = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All Venues",
    "Palaces",
    "Resorts",
    "Beachfront",
    "Heritage",
    "Family & Gardens",
    "City Hotels",
  ];

  const venues = [
    {
      id: 1,
      name: "The Leela Palace",
      location: "Vikram, Rajasthan",
      category: "Palaces",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 128,
      capacity: "300 - 800",
      price: "₹1,50,000",
      description:
        "A magnificent palace offering royal weddings with traditional Rajasthani hospitality and grandeur.",
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
      name: "Taj Exotica Resort & Spa",
      location: "Goa",
      category: "Resorts",
      image:
        "https://images.unsplash.com/photo-1512343879784-9602d5de7a10?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 96,
      capacity: "300 - 800",
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
      id: 3,
      name: "Umaid Bhawan Palace",
      location: "Andhra Pradesh",
      category: "Heritage",
      image:
        "https://images.unsplash.com/photo-1590582007337-f5d55ec5aaf0?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 84,
      capacity: "300 - 800",
      price: "₹2,00,000",
      description:
        "Heritage palace offering royal hospitality and stunning views of the surrounding landscape.",
      amenities: ["Fort View", "Pool", "Spa", "Fine Dining", "Heritage Tours"],
      featured: true,
    },
    {
      id: 4,
      name: "Alila Villas Uluwatu",
      location: "Rajasthan",
      category: "Resorts",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&h=600&fit=crop",
      rating: 4.6,
      reviews: 72,
      capacity: "300 - 800",
      price: "₹1,60,000",
      description:
        "Luxury resort with stunning architecture, breathtaking views, and world-class amenities.",
      amenities: ["Ocean View", "Pool", "Spa", "Fine Dining", "Villas"],
      featured: true,
    },
    {
      id: 5,
      name: "The Oberoi Amarvilas",
      location: "Agra, Uttar Pradesh",
      category: "Palaces",
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 112,
      capacity: "300 - 800",
      price: "₹2,50,000",
      description:
        "Luxury palace hotel with uninterrupted views of the Taj Mahal and royal Mughal architecture.",
      amenities: ["Taj View", "Pool", "Spa", "Fine Dining", "Heritage Tours"],
      featured: false,
    },
    {
      id: 6,
      name: "ITC Grand Chola",
      location: "Chennai, Tamil Nadu",
      category: "City Hotels",
      image:
        "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 95,
      capacity: "300 - 800",
      price: "₹1,40,000",
      description:
        "Luxury hotel with grand architecture, world-class amenities, and exceptional service.",
      amenities: ["City View", "Pool", "Spa", "Fine Dining", "Business Center"],
      featured: false,
    },
    {
      id: 7,
      name: "Taj Lake Palace",
      location: "Udaipur, Rajasthan",
      category: "Palaces",
      image:
        "https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 156,
      capacity: "300 - 800",
      price: "₹2,20,000",
      description:
        "A stunning palace on Lake Pichola offering breathtaking views and luxury amenities.",
      amenities: [
        "Lake View",
        "Boat Access",
        "Spa",
        "Fine Dining",
        "Heritage Rooms",
      ],
      featured: false,
    },
    {
      id: 8,
      name: "The Lalit Golf & Spa",
      location: "Goa",
      category: "Resorts",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424ffe2?w=800&h=600&fit=crop",
      rating: 4.5,
      reviews: 78,
      capacity: "300 - 800",
      price: "₹1,30,000",
      description:
        "Luxury resort with golf course, spa, and pristine beach access.",
      amenities: ["Golf Course", "Pool", "Spa", "Beach Access", "Fine Dining"],
      featured: false,
    },
  ];

  const filteredVenues =
    selectedCategory === "All Venues"
      ? venues
      : venues.filter((v) => v.category === selectedCategory);

  const getCategoryIcon = (category) => {
    const icons = {
      Palaces: Castle,
      Resorts: Hotel,
      Beachfront: Palmtree,
      Heritage: Landmark,
      "Family & Gardens": Trees,
      "City Hotels": Building,
    };
    return icons[category] || MapPin;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&h=900&fit=crop&q=80"
            alt="Extraordinary Venues"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/70 to-dark-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center mx-auto"
          >
            {/* Badge - Added mt-16 to push it down from menu */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 mt-16 sm:mt-20 md:mt-24">
              <Sparkles className="w-4 h-4 text-pink-300" />
              <span className="text-pink-200 text-xs sm:text-sm font-semibold tracking-wider">
                EXTRAORDINARY VENUES
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Iconic Venues.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 mt-2">
                Unforgettable Celebrations
              </span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
              From royal palaces and heritage forts to luxury resorts and modern
              marvels, we bring you a handpicked collection of venues that set
              the stage for your most precious moments.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3.5 text-sm sm:text-base shadow-lg shadow-pink-500/30 group">
                EXPLORE DESTINATIONS
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Handpicked Venues
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2">
              Discover Our Exclusive Venues
            </h2>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category);
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category
                      ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                      : "bg-white text-dark-700 hover:bg-pink-50 border border-gray-200"
                  }`}
                >
                  {category !== "All Venues" && <Icon className="w-4 h-4" />}
                  {category}
                </button>
              );
            })}
          </div>

          {/* Venues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredVenues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedVenue(venue)}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-dark-900 text-xs font-semibold">
                        {venue.category}
                      </span>
                    </div>

                    {/* Like Button */}
                    <div className="absolute top-3 right-3">
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Capacity */}
                    <div className="absolute bottom-3 left-3 bg-dark-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <span className="text-white text-xs font-medium">
                        {venue.capacity} Guests
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-bold text-dark-900 group-hover:text-pink-500 transition-colors line-clamp-1">
                      {venue.name}
                    </h3>
                    <div className="flex items-center text-gray-500 text-xs mt-1">
                      <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                      {venue.location}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-pink-500 fill-pink-500" />
                        <span className="text-sm font-semibold text-dark-900">
                          {venue.rating}
                        </span>
                        <span className="text-gray-400 text-xs">
                          ({venue.reviews})
                        </span>
                      </div>
                      <button className="text-pink-500 text-xs font-semibold hover:gap-2 transition-all flex items-center">
                        VIEW VENUE
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </button>
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
                onClick={() => setSelectedCategory("All Venues")}
                className="text-pink-500 font-semibold mt-2 hover:underline"
              >
                View all venues
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
              More Than Just a Venue
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Handpicked Excellence",
                description:
                  "Curated for luxury, beauty & exceptional experiences.",
              },
              {
                icon: Globe,
                title: "Perfectly Matched",
                description:
                  "Venues that align with your vision & guest experience.",
              },
              {
                icon: Shield,
                title: "Exclusive Access",
                description: "Special arrangements & privileges at top venues.",
              },
              {
                icon: Calendar,
                title: "End-to-End Support",
                description: "From booking to execution, we handle it all.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500 transition-colors duration-300">
                  <item.icon className="w-8 h-8 text-pink-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venue Experiences */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Featured Venue Experiences
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2">
              A Glimpse Into Unforgettable Celebrations
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Royal Palace Wedding",
                location: "Udaipur, Rajasthan",
                image:
                  "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
              },
              {
                title: "Beachside Celebration",
                location: "Phuket, Thailand",
                image:
                  "https://images.unsplash.com/photo-1512343879784-9602d5de7a10?w=400&h=300&fit=crop",
              },
              {
                title: "Heritage Fort Wedding",
                location: "Jaipur, Rajasthan",
                image:
                  "https://images.unsplash.com/photo-1590582007337-f5d55ec5aaf0?w=400&h=300&fit=crop",
              },
              {
                title: "Luxury Resort Wedding",
                location: "Bali, Indonesia",
                image:
                  "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=400&h=300&fit=crop",
              },
            ].map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-base">
                    {experience.title}
                  </h3>
                  <p className="text-gray-300 text-sm flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {experience.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=600&fit=crop&q=80"
            alt="Perfect Venue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 to-dark-900/70" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Your Perfect Venue Awaits
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 mt-2">
                Let's Create Something Extraordinary
              </span>
            </h2>
            <p className="text-gray-300 text-lg mt-4">
              From the first conversation to the final celebration, we make
              every detail seamless and spectacular.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-10 py-4 text-base shadow-lg shadow-pink-500/30 group">
                PLAN YOUR CELEBRATION
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 hover:border-white px-10 py-4 text-base"
              >
                WATCH SHOWREEL
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
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
                    <h2 className="text-3xl font-bold text-dark-900">
                      {selectedVenue.name}
                    </h2>
                    <div className="flex items-center text-dark-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedVenue.location}
                    </div>
                  </div>
                  <div className="flex items-center bg-pink-50 px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 text-pink-500 fill-pink-500 mr-1" />
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
                      <CheckCircle className="w-4 h-4 text-pink-500 mr-2" />
                      {amenity}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-dark-500 text-sm">Starting Price</p>
                    <p className="text-2xl font-bold text-pink-500">
                      {selectedVenue.price}
                    </p>
                  </div>
                  <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                    Enquire Now
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Venues;
