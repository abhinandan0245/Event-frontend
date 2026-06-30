import { motion } from "framer-motion";
import { Sparkles, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const ExtraordinarySection = () => {
  return (
    <section className=" bg-gradient-to-b from-white to-pink-50/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />

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
          <Sparkles size={24 + Math.random() * 20} />
        </motion.div>
      ))}

      <div className="relative z-10">
        {/* Full Width Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden"
        >
          {/* Banner Image - Full Width */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[450px] w-full">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=600&fit=crop"
              alt="Extraordinary Celebrations"
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay - Dark on Left for Text */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/85 via-dark-900/60 to-dark-900/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 via-transparent to-transparent" />

            {/* Content on Left - Full Width Padding */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                <div className="max-w-xl text-left">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-pink-300 text-xs font-semibold border border-white/20">
                      <Heart className="w-3 h-3" />
                      FEATURED CELEBRATIONS
                    </span>
                  </motion.div>

                  {/* Heading */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mt-4 leading-tight"
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
                    className="text-gray-300 text-base md:text-lg mt-3 max-w-lg leading-relaxed"
                  >
                    Share your vision with us and let us craft a wedding that is
                    as unique as your love story.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-4 mt-6"
                  >
                    <Link to="/portfolio">
                      <Button
                        variant="primary"
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/30 group text-white"
                      >
                        View Our Portfolio
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/plan-your-celebration">
                      <Button
                        variant="outline"
                        className="border-white/50 text-white hover:bg-white/10 hover:border-white"
                      >
                        Plan Your Celebration
                        <Sparkles className="w-4 h-4 ml-2" />
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
              className="absolute bottom-4 right-8 text-white/10 text-7xl font-bold font-playfair hidden lg:block"
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
