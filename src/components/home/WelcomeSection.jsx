import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const WelcomeSection = () => {
  return (
    <section className="w-full bg-white relative overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-rose-500/5 rounded-full blur-3xl" />

      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Grid Layout - Mobile: 1 column, Desktop: 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-1"
            >
              <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest inline-flex items-center gap-2">
                <Heart className="w-4 h-4" />
                WELCOME TO VIOLIN EVENTS LLP
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-playfair font-bold text-dark-800 mt-3 md:mt-4 leading-tight">
                Redefining Luxury
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 block">
                  Weddings & Celebrations
                </span>
              </h2>

              <p className="text-dark-600 text-sm sm:text-base md:text-lg mt-4 md:mt-6 leading-relaxed">
                At Violin Events, we believe every celebration should be a
                masterpiece. With our passion for perfection and eye for detail,
                we curate weddings that blend tradition, elegance and
                unforgettable moments.
              </p>

              <div className="mt-6 md:mt-8">
                <Link to="/about">
                  <Button
                    variant="secondary"
                    className="border-pink-300 text-pink-600 hover:bg-pink-50 group text-sm sm:text-base px-6 md:px-8 py-2.5 md:py-3"
                  >
                    Our Story
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-pink-100/50"
              >
                <p className="text-dark-800 text-sm sm:text-base md:text-lg font-playfair italic">
                  "We don't just plan — we create memories"
                </p>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2"
            >
              <div className="relative">
                {/* Decorative Frame Border */}
                <div className="absolute -inset-2 md:-inset-3 lg:-inset-4 border-2 border-pink-200/50 rounded-2xl" />
                <div className="absolute -inset-4 md:-inset-5 lg:-inset-6 border border-pink-100/30 rounded-2xl" />

                {/* Image Container */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop"
                    alt="Luxury Wedding"
                    className="w-full h-60 sm:h-72 md:h-80 lg:h-96 xl:h-[420px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 via-transparent to-transparent" />
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute -top-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-pink-300/50" />
                <div className="absolute -top-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-pink-300/50" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-pink-300/50" />
                <div className="absolute -bottom-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-pink-300/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
