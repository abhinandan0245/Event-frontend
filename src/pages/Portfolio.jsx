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
  Filter,
  X,
  Eye,
  Sparkles,
} from "lucide-react";
import Button from "../components/ui/Button";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const categories = [
    "All",
    "Wedding",
    "Engagement",
    "Birthday",
    "Corporate",
    "Destination",
  ];

  const projects = [
    {
      id: 1,
      title: "Royal Rajasthan Wedding",
      category: "Wedding",
      location: "Jaipur, Rajasthan",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
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
      featured: true,
    },
    {
      id: 2,
      title: "Beachside Dream Wedding",
      category: "Destination",
      location: "Goa",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
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
      featured: true,
    },
    {
      id: 3,
      title: "Udaipur Lake Wedding",
      category: "Destination",
      location: "Udaipur, Rajasthan",
      image:
        "https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&h=600&fit=crop",
      date: "Feb 2025",
      guests: 280,
      rating: 4.7,
      description:
        "A fairytale wedding at a lake-facing palace with boat entries and magnificent fireworks.",
      highlights: ["Lake Palace", "Boat Entry", "Fireworks", "Royal Cuisine"],
      featured: true,
    },
    {
      id: 4,
      title: "Corporate Gala Night",
      category: "Corporate",
      location: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=600&fit=crop",
      date: "Mar 2025",
      guests: 500,
      rating: 4.6,
      description:
        "A glamorous corporate awards night with live entertainment, gourmet dining, and networking.",
      highlights: [
        "Live Entertainment",
        "Gourmet Dining",
        "Awards Ceremony",
        "Networking",
      ],
      featured: false,
    },
    {
      id: 5,
      title: "Elegant Engagement Party",
      category: "Engagement",
      location: "Delhi",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      date: "Apr 2025",
      guests: 150,
      rating: 4.5,
      description:
        "An intimate engagement celebration with floral installations and personalized touches.",
      highlights: [
        "Intimate Setting",
        "Floral Decor",
        "Personalized Details",
        "Live Music",
      ],
      featured: false,
    },
    {
      id: 6,
      title: "Birthday Extravaganza",
      category: "Birthday",
      location: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=600&fit=crop",
      date: "May 2025",
      guests: 120,
      rating: 4.4,
      description:
        "A vibrant birthday celebration with themed decor, entertainment, and delicious cuisine.",
      highlights: [
        "Themed Decor",
        "Entertainment",
        "Custom Cake",
        "Photo Booth",
      ],
      featured: false,
    },
    {
      id: 7,
      title: "Kerala Backwaters Wedding",
      category: "Destination",
      location: "Kerala",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&h=600&fit=crop",
      date: "Jun 2025",
      guests: 180,
      rating: 4.7,
      description:
        "A serene wedding amidst the backwaters with traditional Kerala rituals and houseboat celebrations.",
      highlights: [
        "Backwaters",
        "Houseboat",
        "Traditional Rituals",
        "Seafood Cuisine",
      ],
      featured: false,
    },
    {
      id: 8,
      title: "Mountain View Wedding",
      category: "Destination",
      location: "Manali",
      image:
        "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",
      date: "Jul 2025",
      guests: 100,
      rating: 4.6,
      description:
        "An intimate mountain wedding with snow-capped views and cozy celebrations.",
      highlights: [
        "Mountain Views",
        "Intimate",
        "Cozy Setup",
        "Adventure Activities",
      ],
      featured: false,
    },
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const featuredProjects = projects.filter((p) => p.featured);

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
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mt-4">
              Creating
              <span className="gradient-gold bg-clip-text text-transparent block">
                Unforgettable Memories
              </span>
            </h1>
            <p className="text-dark-200 text-lg mt-6">
              Explore our collection of stunning events that showcase our
              expertise in creating extraordinary celebrations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
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
                Featured Work
              </span>
              <h2 className="text-3xl font-playfair font-bold text-dark-900 mt-1">
                Our Best Creations
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden h-72">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-transparent" />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-dark-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <Eye className="w-12 h-12 text-white mx-auto mb-2" />
                      <span className="text-white font-semibold">
                        View Project
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 bg-gold-500 text-dark-900 px-3 py-1 rounded-full text-xs font-bold">
                    Featured
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-white/80 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gold-500 font-semibold text-sm">
                      {project.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gold-500 fill-gold-500 mr-1" />
                      <span className="text-dark-600 text-sm">
                        {project.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-dark-600 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
                Explore All
              </span>
              <h2 className="text-3xl font-playfair font-bold text-dark-900 mt-1">
                Our Work
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="group bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-lg">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-white/80 text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {project.location}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gold-500 font-semibold text-xs">
                        {project.category}
                      </span>
                      <div className="flex items-center space-x-4 text-xs text-dark-500">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {project.date}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {project.guests}
                        </span>
                      </div>
                    </div>
                    <p className="text-dark-600 text-xs line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-dark-600 text-lg">
                No projects found in this category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                }}
                className="text-gold-500 font-semibold mt-2 hover:underline"
              >
                View all projects
              </button>
            </motion.div>
          )}
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
                    <h2 className="text-3xl font-playfair font-bold text-dark-900">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center text-dark-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedProject.location}
                    </div>
                  </div>
                  <div className="flex items-center bg-gold-50 px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 text-gold-500 fill-gold-500 mr-1" />
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
                      className="px-4 py-2 bg-gold-50 text-gold-600 rounded-full text-sm font-medium"
                    >
                      ✨ {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Button variant="primary">
                    Plan Similar Event
                    <ChevronRight size={20} className="ml-2" />
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
              Ready to Create Your Own Story?
            </h2>
            <p className="text-dark-800 text-lg mt-4 mb-8 max-w-2xl mx-auto">
              Let us bring your vision to life with the same passion and
              excellence.
            </p>
            <Button
              variant="secondary"
              className="bg-white text-dark-900 hover:bg-dark-900 hover:text-white border-white"
            >
              Start Your Journey
              <Heart size={20} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
