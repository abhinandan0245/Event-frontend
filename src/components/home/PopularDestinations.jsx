import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Star, Heart, ChevronRight } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

const popularDestinations = [
  {
    id: 1,
    name: "Jaipur",
    state: "Rajasthan",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop",
    rating: 4.9,
    reviews: 128,
    price: "₹45,000",
    description: "Royal Heritage & Palaces",
    tags: ["Heritage", "Royal", "Palace"],
    emoji: "👑",
  },
  {
    id: 2,
    name: "Udaipur",
    state: "Rajasthan",
    image:
      "https://images.unsplash.com/photo-1592656094267-764a45160876?w=600&h=400&fit=crop",
    rating: 4.8,
    reviews: 96,
    price: "₹55,000",
    description: "City of Lakes & Romance",
    tags: ["Lakes", "Romantic", "Palace"],
    emoji: "💕",
  },
  {
    id: 3,
    name: "Jodhpur",
    state: "Rajasthan",
    image:
      "https://images.unsplash.com/photo-1590582007337-f5d55ec5aaf0?w=600&h=400&fit=crop",
    rating: 4.7,
    reviews: 84,
    price: "₹40,000",
    description: "Blue City & Forts",
    tags: ["Forts", "Blue City", "Heritage"],
    emoji: "🏰",
  },
];

const PopularDestinations = () => {
  const sectionRef = useRef(null);
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const cards = document.querySelectorAll(".destination-card");
    cards.forEach((card) => {
      gsap.to(card, {
        y: -15,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-pink-50/30 to-white relative overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionTitle
          subtitle="POPULAR DESTINATIONS"
          title="Royal Heritage. Timeless Celebrations"
          description="Extraordinary Weddings in Incredible India"
          subtitleColor="text-pink-500"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {popularDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              className="destination-card group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-pink-100/50"
            >
              <div className="relative overflow-hidden h-64">
                <motion.img
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 text-3xl">
                  {destination.emoji}
                </div>

                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                >
                  Starting {destination.price}
                </motion.div>

                <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-pink-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 text-pink-400 fill-pink-400" />
                  <span className="text-white text-sm font-semibold">
                    {destination.rating}
                  </span>
                  <span className="text-pink-200 text-sm">
                    ({destination.reviews} reviews)
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => toggleLike(destination.id)}
                  className="absolute top-4 right-16 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-pink-500 transition-all duration-300"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors duration-300 ${
                      liked[destination.id]
                        ? "fill-pink-500 text-pink-500"
                        : "text-dark-700"
                    }`}
                  />
                </motion.button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-800 group-hover:text-pink-500 transition-colors">
                  {destination.name}
                </h3>
                <div className="flex items-center text-dark-500 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {destination.state}
                </div>

                <p className="text-dark-600 text-sm mt-3 mb-3">
                  {destination.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-600 text-xs font-semibold rounded-full border border-pink-200/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="text-pink-500 font-semibold text-sm flex items-center group/btn hover:gap-2 transition-all">
                  Explore Destination
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="secondary"
            className="border-pink-300 text-pink-600 hover:bg-pink-50 group"
          >
            Explore All Destinations
            <ChevronRight
              size={18}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
