import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Heart,
  ChevronRight,
  ArrowRight,
  Clock,
  Eye,
  Search,
  Sparkles,
  BookOpen,
  Star,
  Mail,
  MapPin,
  Camera,
} from "lucide-react";
import Button from "../components/ui/Button";
import { FaInstagram } from "react-icons/fa";

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const articles = [
    {
      id: 1,
      title: "A Regal Celebration at The City Palace, Udaipur",
      excerpt:
        "A dreamy luxury wedding filled with royal charm, intimate details and timeless memories.",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=500&fit=crop",
      category: "Wedding",
      date: "June 25, 2026",
      readTime: "8 min read",
      views: 1245,
      likes: 89,
      featured: true,
    },
    {
      id: 2,
      title: "7 Stunning Beach Wedding Ideas for Your Big Day",
      excerpt:
        "Sun, sand and unforgettable celebrations, here's how to plan the perfect beach wedding.",
      image:
        "https://images.unsplash.com/photo-1512343879784-9602d5de7a10?w=800&h=500&fit=crop",
      category: "Destination",
      date: "June 22, 2026",
      readTime: "10 min read",
      views: 987,
      likes: 76,
      featured: true,
    },
    {
      id: 3,
      title: "Elevate Your Reception with These Decor Trends",
      excerpt:
        "From elegant to playful, these trends will help you create the perfect celebration.",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=500&fit=crop",
      category: "Trends",
      date: "June 20, 2026",
      readTime: "6 min read",
      views: 1567,
      likes: 112,
      featured: true,
    },
    {
      id: 4,
      title: "Udaipur vs Jaipur: Which Destination Suits You?",
      excerpt:
        "Carnival-like entertainment, royal gardens, and a vibrant city life — Udaipur has it all.",
      image:
        "https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&h=500&fit=crop",
      category: "Destination",
      date: "June 18, 2026",
      readTime: "7 min read",
      views: 2341,
      likes: 156,
      featured: false,
    },
    {
      id: 5,
      title: "Bridal Skincare Tips for a Glowing Wedding Day",
      excerpt:
        "A comprehensive guide for brides to look and feel their best on their wedding day.",
      image:
        "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=500&fit=crop",
      category: "Tips",
      date: "June 15, 2026",
      readTime: "5 min read",
      views: 876,
      likes: 67,
      featured: false,
    },
  ];

  const loveStories = [
    {
      id: 1,
      title: "Palace Wedding in Udaipur",
      couple: "Arjun & Bride",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Beach Wedding in Phuket",
      couple: "Vikram & Bride",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Heritage Wedding in Jaipur",
      couple: "Mewar & Bride",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Luxury Wedding in Bali",
      couple: "One & Bride",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&h=900&fit=crop&q=80"
            alt="Stories, Ideas & Inspiration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/70 to-dark-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-pink-300" />
              <span className="text-pink-200 text-xs sm:text-sm font-semibold tracking-wider">
                VIOLIN EVENTS LLP
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Stories, Ideas
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 mt-2">
                & Inspiration
              </span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
              Expert tips, real celebrations and curated inspiration to help you
              plan extraordinary moments.
            </p>

            <div className="mt-8">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3.5 text-sm sm:text-base shadow-lg shadow-pink-500/30 group">
                EXPLORE ARTICLE
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-pink-500 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <button className="text-pink-500 font-semibold text-sm flex items-center hover:gap-2 transition-all group-hover:gap-2">
                    READ MORE
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Made Simple Section */}
      <section className="py-20 bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
              Planning Made Simple,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                Celebrations Made Perfect
              </span>
            </h2>
            <p className="text-gray-600 text-lg mt-4">
              Expert advice, checklist and insider tips to make your wedding
              planning journey smooth and stress-free.
            </p>
            <div className="mt-8">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3.5 shadow-lg shadow-pink-500/30 group">
                EXPLORE THIS
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Love Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Love Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2">
              We've Brought to Life
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {loveStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm">
                    {story.title}
                  </h3>
                  <p className="text-gray-300 text-xs">{story.couple}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=600&fit=crop&q=80"
            alt="Never Miss an Update"
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
            <span className="text-pink-400 font-semibold text-sm uppercase tracking-widest">
              Never Miss an Update
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Subscribe to Our Journal
            </h2>
            <p className="text-gray-300 text-lg mt-4">
              Receive the latest wedding trends, tips and real stories.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 max-w-md px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 shadow-lg shadow-pink-500/30 whitespace-nowrap">
                FOLLOW OUR JOURNAL
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 hover:border-white px-8 py-3"
              >
                <FaInstagram className="w-4 h-4 mr-2" />
                FOLLOW US ON INSTAGRAM
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Branding */}
      <section className="py-8 bg-dark-900 border-t border-white/10">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-white/80 text-xs sm:text-sm font-semibold tracking-wider">
                VIOLIN EVENTS LLP • CERTIFIED EVENT PLANNING AGENCY
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Journal;
