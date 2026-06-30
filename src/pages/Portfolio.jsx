import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Heart,
  Star,
  Users,
  Calendar,
  MapPin,
  ChevronRight,
  X,
  Eye,
  Sparkles,
  Play,
  Quote,
} from "lucide-react";
import Button from "../components/ui/Button";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All Destinations");
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    "All Destinations",
    "Weddings",
    "Pre-Wedding",
    "Memorial & Nolla",
    "Sangeet",
    "Reception",
    "Corporate Events",
    "Social Events",
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "Ananya & Rohan",
      location: "Udaipur, Rajasthan",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop",
      category: "Weddings",
      featured: true,
      date: "Dec 2024",
      guests: 350,
      rating: 4.9,
      description:
        "A magnificent royal wedding at a heritage palace with traditional Rajasthani decor and cultural performances.",
      highlights: [
        "Palace Venue",
        "Traditional Decor",
        "Cultural Performances",
        "Luxury Hospitality",
      ],
    },
    {
      id: 2,
      title: "Ishita & Arjun",
      location: "Phuket, Thailand",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
      category: "Destination Weddings",
      featured: true,
      date: "Jan 2025",
      guests: 200,
      rating: 4.8,
      description:
        "A stunning beach wedding with sunset vows, tropical decor, and a beachside reception.",
      highlights: [
        "Beach Venue",
        "Sunset Ceremony",
        "Tropical Theme",
        "Seafood Feast",
      ],
    },
    {
      id: 3,
      title: "Meera & Karan",
      location: "Jaipur, Rajasthan",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop",
      category: "Weddings",
      featured: true,
      date: "Feb 2025",
      guests: 280,
      rating: 4.7,
      description:
        "A fairytale wedding at a lake-facing palace with boat entries and magnificent fireworks.",
      highlights: ["Lake Palace", "Boat Entry", "Fireworks", "Royal Cuisine"],
    },
  ];

  const experienceCategories = [
    {
      id: 1,
      title: "Royal Weddings",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
      count: "24 Stories",
    },
    {
      id: 2,
      title: "Beach Weddings",
      image:
        "https://images.unsplash.com/photo-1512343879784-9602d5de7a10?w=400&h=300&fit=crop",
      count: "18 Stories",
    },
    {
      id: 3,
      title: "Destination Weddings",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      count: "32 Stories",
    },
    {
      id: 4,
      title: "Intimate Weddings",
      image:
        "https://images.unsplash.com/photo-1592656094267-764a45160876?w=400&h=300&fit=crop",
      count: "15 Stories",
    },
    {
      id: 5,
      title: "Luxury Celebrations",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=400&h=300&fit=crop",
      count: "28 Stories",
    },
    {
      id: 6,
      title: "Cultural Weddings",
      image:
        "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400&h=300&fit=crop",
      count: "21 Stories",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Nisha & Siddharth",
      text: "Valen Events turned our dream wedding into a reality. Every detail was beyond perfect!",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=100&h=100&fit=crop",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&h=900&fit=crop&q=80"
            alt="Stories we've Beautifully Crafted"
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Stories we've
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 mt-2">
                Beautifully Crafted
              </span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
              A glimpse of celebrations we've designed with passion, precision
              and perfection across breathtaking destinations.
            </p>

            {/* Explore Our Work Button */}
            <div className="mt-8">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3.5 text-sm sm:text-base shadow-lg shadow-pink-500/30 group">
                Explore Our Work
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 bg-white border-b border-gray-100 overflow-x-auto">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider whitespace-nowrap">
              Scroll
            </span>
            <div className="w-px h-6 bg-gray-300 mx-3"></div>
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeFilter === filter
                      ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                      : "bg-gray-100 text-dark-700 hover:bg-pink-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Celebrations */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
                Featured Celebrations
              </span>
              <h2 className="text-3xl font-bold text-dark-900 mt-1">
                Timeless Moments Across the Globe
              </h2>
            </div>
            <button className="text-pink-500 font-semibold text-sm flex items-center hover:gap-2 transition-all group">
              VIEW FULL PORTFOLIO
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-pink-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="w-10 h-10 text-white" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-white/80 text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {project.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by Experience */}
      <section className="py-16 bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Explore by Experience
            </span>
            <h2 className="text-3xl font-bold text-dark-900 mt-2">
              Find the Celebration that Inspires You
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {experienceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/30 to-transparent" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{category.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* A Celebration to Remember */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2">
              A Celebration to Remember
            </h2>
            <p className="text-gray-600 text-lg mt-4 leading-relaxed">
              Every love story is unique. We bring your dreams to life with
              creativity, flawless execution and heartfelt moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cinematic Films & Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Cinematic Films */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
                Cinematic Films
              </span>
              <h2 className="text-3xl font-bold text-dark-900 mt-2 mb-6">
                Words that Inspire Us
              </h2>
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-200 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=450&fit=crop"
                  alt="Cinematic Film"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark-900/40 flex items-center justify-center group-hover:bg-dark-900/50 transition-all">
                  <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-pink-50 p-8 rounded-2xl border border-pink-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-pink-500 fill-pink-500"
                  />
                ))}
              </div>
              <Quote className="w-8 h-8 text-pink-300 mb-4" />
              <p className="text-dark-800 text-lg leading-relaxed mb-6">
                "Valen Events turned our dream wedding into a reality. Every
                detail was beyond perfect!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=100&h=100&fit=crop"
                    alt="Nisha & Siddharth"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-dark-900">Nisha & Siddharth</h4>
                  <p className="text-dark-500 text-sm">Happy Couple</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=600&fit=crop&q=80"
            alt="Create Your Unforgettable Story"
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
              Let's Create Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 mt-2">
                Unforgettable Story
              </span>
            </h2>
            <p className="text-gray-300 text-lg mt-4">
              Share your vision and our expertise will craft a celebration that
              reflects your style and story.
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
                <Play className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
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
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-dark-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-80 object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-dark-900">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center text-dark-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedProject.location}
                    </div>
                  </div>
                  <div className="flex items-center bg-pink-50 px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 text-pink-500 fill-pink-500 mr-1" />
                    <span className="font-semibold">
                      {selectedProject.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-dark-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {selectedProject.date}
                  </div>
                  <div className="flex items-center text-dark-600">
                    <Users className="w-4 h-4 mr-2" />
                    {selectedProject.guests} Guests
                  </div>
                  <div className="flex items-center text-dark-600">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {selectedProject.category}
                  </div>
                </div>

                <p className="text-dark-600 mb-6">
                  {selectedProject.description}
                </p>

                <h3 className="text-lg font-semibold text-dark-900 mb-3">
                  Event Highlights
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-medium"
                    >
                      ✨ {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                    Plan Similar Event
                    <ChevronRight size={20} className="ml-2" />
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

export default Portfolio;
