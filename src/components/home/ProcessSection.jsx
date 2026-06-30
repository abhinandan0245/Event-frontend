import { motion } from "framer-motion";
import {
  Compass,
  Palette,
  Calendar,
  PartyPopper,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "DISCOVER",
      description: "We get to know you and your vision.",
      icon: Compass,
      delay: 0,
    },
    {
      number: "02",
      title: "DESIGN",
      description: "We conceptualize your dream customization.",
      icon: Palette,
      delay: 0.1,
    },
    {
      number: "03",
      title: "PLAN",
      description: "We plan every detail feasibility.",
      icon: Calendar,
      delay: 0.2,
    },
    {
      number: "04",
      title: "EXECUTE",
      description: "We bring your dream to life.",
      icon: PartyPopper,
      delay: 0.3,
    },
    {
      number: "05",
      title: "CELEBRATE",
      description: "You have the opportunity to celebrate the moment.",
      icon: Sparkles,
      delay: 0.4,
    },
  ];

  return (
    <section className="w-full bg-white relative overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
      <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-rose-500/5 rounded-full blur-3xl" />

      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              OUR PROCESS
            </span>
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-dark-800 mt-2">
              Thoughtfully Crafted,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 block">
                Perfectly Planned
              </span>
            </h2>
          </motion.div>

          {/* Process Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 relative">
            {/* Connecting Line - Desktop */}
            <div className="hidden lg:block absolute left-[10%] right-[10%] top-[70px] h-0.5 bg-pink-200/50" />

            {/* Connecting Line - Tablet */}
            <div className="hidden sm:block lg:hidden absolute left-[10%] right-[10%] top-[70px] h-0.5 bg-pink-200/50" />

            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: step.delay }}
                  className="relative text-center"
                >
                  {/* Step Number */}
                  <div className="text-pink-500 font-playfair font-bold text-3xl sm:text-4xl md:text-5xl mb-2">
                    {step.number}
                  </div>

                  {/* Icon with Circle Background */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-r from-pink-100 to-rose-100 flex items-center justify-center mb-3 md:mb-4 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-pink-500" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-dark-800 mb-1 md:mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] sm:text-xs md:text-sm text-dark-500 max-w-[160px] sm:max-w-[180px] mx-auto leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connector Dot - Desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-[70px] w-3 h-3 rounded-full bg-pink-300/50 -translate-y-1/2" />
                  )}

                  {/* Connector Dot - Tablet */}
                  {index < steps.length - 1 && index % 2 === 0 && (
                    <div className="hidden sm:block lg:hidden absolute -right-3 top-[70px] w-3 h-3 rounded-full bg-pink-300/50 -translate-y-1/2" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* View Portfolio CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12 md:mt-16"
          >
            <Link to="/portfolio">
              <button className="group relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-pink-600 border-2 border-pink-300 hover:bg-pink-50 transition-all duration-300 text-sm sm:text-base">
                <span className="flex items-center gap-2">
                  View Our Portfolio
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
