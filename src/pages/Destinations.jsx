import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  Heart,
  ChevronRight,
  Calendar,
  Users,
  Sparkles,
  Clock,
  Award,
  Globe,
  Camera,
} from "lucide-react";
import Button from "../components/ui/Button";

const Destinations = () => {
  const [activeDestination, setActiveDestination] = useState("Phuket");
  const [activeVenue, setActiveVenue] = useState(0);

  const destinations = [
    {
      id: "phuket",
      name: "Phuket",
      tag: "Vibrant & Exotic",
      image:
        "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=500&fit=crop",
      description:
        "Thailand's largest island, Phuket offers vibrant nightlife, stunning beaches, and luxury resorts perfect for an exotic wedding celebration.",
      features: [
        "White sandy beaches",
        "Luxury resorts",
        "Vibrant nightlife",
        "Island hopping",
      ],
    },
    {
      id: "koh-samui",
      name: "Koh Samui",
      tag: "Tropical & Serene",
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=500&fit=crop",
      description:
        "Koh Samui is a tropical paradise with coconut groves, crystal-clear waters, and a serene atmosphere for intimate and luxurious weddings.",
      features: [
        "Coconut groves",
        "Crystal waters",
        "Luxury villas",
        "Peaceful ambiance",
      ],
    },
    {
      id: "krabi",
      name: "Krabi",
      tag: "Scenic & Tranquil",
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=500&fit=crop",
      description:
        "Krabi's limestone cliffs, emerald waters, and tranquil beaches create a dramatic and romantic setting for your dream wedding.",
      features: [
        "Limestone cliffs",
        "Emerald waters",
        "Hidden beaches",
        "Romantic sunsets",
      ],
    },
    {
      id: "bangkok",
      name: "Bangkok",
      tag: "Modern & Dynamic",
      image:
        "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&h=500&fit=crop",
      description:
        "Bangkok offers a perfect blend of modern luxury and traditional Thai culture with world-class venues and vibrant city energy.",
      features: [
        "World-class venues",
        "Modern luxury",
        "Cultural experiences",
        "City vibrancy",
      ],
    },
    {
      id: "chiang-mai",
      name: "Chiang Mai",
      tag: "Cultural & Charming",
      image:
        "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&h=500&fit=crop",
      description:
        "Chiang Mai's ancient temples, lush mountains, and charming old city provide a culturally rich and spiritually meaningful wedding destination.",
      features: [
        "Ancient temples",
        "Mountain views",
        "Rich culture",
        "Spiritual ambiance",
      ],
    },
  ];

  const venues = [
    {
      name: "Anantara Koh Samui",
      image:
        "https://images.unsplash.com/photo-1584132967335-2d5a7bda06f0?w=400&h=300&fit=crop",
      rating: 4.9,
    },
    {
      name: "Rosewood Phuket",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      rating: 4.8,
    },
    {
      name: "JW Marriott Phuket",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424ffe2?w=400&h=300&fit=crop",
      rating: 4.7,
    },
    {
      name: "Six Senses Yao Noi",
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
      rating: 4.9,
    },
    {
      name: "Banyan Tree Phuket",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
      rating: 4.8,
    },
  ];

  const activeDest = destinations.find((d) => d.id === activeDestination);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Thailand Destination */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600&h=900&fit=crop&q=80"
            alt="Thailand Wedding Destination"
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
            className="max-w-3xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-pink-300" />
              <span className="text-pink-200 text-xs sm:text-sm font-semibold tracking-wider">
                DESTINATION WEDDINGS IN
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1]">
              <span className="block">THAILAND</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-pink-200 font-light mt-2">
              Where Romance Meets Paradise
            </p>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl mt-6 leading-relaxed">
              From turquoise waters to golden sunsets, Thailand offers the
              perfect backdrop for your dream wedding. Celebrate your love in a
              land of breathtaking beauty, warm hospitality and unforgettable
              experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                variant="primary"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/30 text-white px-8 py-3.5 text-sm sm:text-base group"
              >
                PLAN YOUR THAILAND WEDDING
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 hover:border-white px-8 py-3.5 text-sm sm:text-base"
              >
                <Camera className="w-4 h-4 mr-2" />
                WATCH THAILAND FILM
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/10">
              {[
                { icon: Globe, label: "Stunning Beach Destinations" },
                { icon: Award, label: "World Class Hospitality" },
                { icon: Star, label: "Rich Culture & Traditions" },
                { icon: Calendar, label: "Seamless Planning & Experiences" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <item.icon className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-xs sm:text-sm font-medium leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Explore
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2">
              Popular Destinations
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinations.map((dest) => (
              <motion.button
                key={dest.id}
                onClick={() => setActiveDestination(dest.id)}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl overflow-hidden aspect-[4/3] transition-all duration-300 ${
                  activeDestination === dest.id
                    ? "ring-4 ring-pink-500 ring-offset-2"
                    : "hover:shadow-xl"
                }`}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-dark-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <h3 className="text-white font-bold text-sm sm:text-base">
                    {dest.name}
                  </h3>
                  <p className="text-pink-300 text-xs sm:text-sm">{dest.tag}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Destination Details */}
      {activeDest && (
        <section className="py-20 bg-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
              key={activeDest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={activeDest.image}
                    alt={activeDest.name}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl shadow-lg">
                  <span className="text-sm font-semibold">Featured</span>
                </div>
              </div>
              <div>
                <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
                  Featured Destination
                </span>
                <h2 className="text-4xl font-bold text-dark-900 mt-2">
                  {activeDest.name}
                </h2>
                <p className="text-pink-400 text-lg font-medium mt-1">
                  {activeDest.tag}
                </p>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {activeDest.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {activeDest.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3">
                  Explore {activeDest.name}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Exclusive Venues */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Luxury
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2">
              Exclusive Venues
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {venues.map((venue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-pink-500 fill-pink-500" />
                    <span className="text-xs font-bold text-dark-900">
                      {venue.rating}
                    </span>
                  </div> */}
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-sm font-bold text-dark-900 group-hover:text-pink-500 transition-colors line-clamp-1">
                    {venue.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Plan Your Dream Wedding */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=600&fit=crop&q=80"
            alt="Dream Wedding"
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
              Let Us Plan Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                Dream Wedding in Thailand
              </span>
            </h2>
            <p className="text-gray-300 text-lg mt-4">
              Our experts are here to curate a celebration that reflects your
              love story.
            </p>
            <Button className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-10 py-4 text-base shadow-lg shadow-pink-500/30 group">
              SCHEDULE A CONSULTATION
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
