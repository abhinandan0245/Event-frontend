import { motion } from "framer-motion";
import { Sparkles, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const ExtraordinarySection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-pink-50/30 relative overflow-hidden  ">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
      <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 bg-rose-500/5 rounded-full blur-3xl" />

      {/* Floating Sparkles */}
      {[...Array(4)].map((_, i) => (  
        <motion.div
          key={i}
          className="absolute text-pink-300/20"
          style={{
            left: 5 + Math.random() * 90 + "%",
            top: 5 + Math.random() * 90 + "%",  
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        >
          <Sparkles size={20 + Math.random() * 20} />
        </motion.div>
      ))}

      {/* Full Width Banner - No Container */}
      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-none sm:rounded-2xl shadow-2xl"
        >
          {/* Banner Image - Full Width */}
          <div className="relative w-full">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&h=600&fit=crop"
              alt="Extraordinary Celebrations"
              className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] xl:h-[460px] object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/85 via-dark-900/60 to-dark-900/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 via-transparent to-transparent" />

            {/* Content - Centered on Mobile, Left on Desktop */}
            <div className="absolute inset-0 flex items-center justify-center sm:justify-start">
              <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                <div className="max-w-xl text-center sm:text-left mx-auto sm:mx-0">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-pink-300 text-[8px] sm:text-xs font-semibold border border-white/20">
                      <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      FEATURED CELEBRATIONS
                    </span>
                  </motion.div>

                  {/* Heading */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold text-white mt-2 sm:mt-3 md:mt-4 leading-tight"
                  >
                    Extraordinary
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 block">
                      Together
                    </span>
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg mt-1.5 sm:mt-2 md:mt-3 max-w-lg leading-relaxed mx-auto sm:mx-0"
                  >
                    Share your vision with us and let us craft a wedding that is
                    as unique as your love story.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6 justify-center sm:justify-start"
                  >
                    <Link to="/portfolio" className="w-full sm:w-auto">
                      <Button
                        variant="primary"
                        size="xs"
                        className="w-full sm:w-auto"
                      >
                        View Our Portfolio
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link
                      to="/plan-your-celebration"
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="outline"
                        size="xs"
                        className="w-full sm:w-auto"
                      >
                        Plan Your Celebration
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Decorative Element - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 md:right-8 text-white/10 text-3xl sm:text-5xl md:text-7xl font-bold font-playfair hidden sm:block"
            >
              ✦
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExtraordinarySection;
