import React from "react";
import { motion } from "framer-motion";

const TrustedClients = () => {
  // Generate 20 logo paths
  const logos = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `/assets/tslogo/tslogo${i + 1}.png`,
    alt: `Client Logo ${i + 1}`,
  }));

  // Animation variants for cards
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateY: -10,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        delay: index * 0.03,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  // Hover animation variants
  const hoverVariants = {
    rest: {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      z: 0,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.08,
      rotateY: 8,
      rotateX: -4,
      z: 50,
      boxShadow:
        "0 20px 60px rgba(0,0,0,0.15), 0 8px 30px rgba(180, 83, 9, 0.12)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Glow effect variants
  const glowVariants = {
    rest: {
      opacity: 0,
      scale: 0.8,
    },
    hover: {
      opacity: 1,
      scale: 1.2,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="trusted-clients-section relative min-h-screen w-full bg-[#FAF8F5] text-[#1A1A1A] flex flex-col items-center justify-start pt-16 pb-20 overflow-hidden select-none">
      {/* Background Gradients */}
      <div
        className="absolute top-0 left-[60%] -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(217, 119, 6, 0.2) 0%, rgba(180, 83, 9, 0.08) 50%, transparent 80%)",
        }}
      />

      <div
        className="absolute bottom-0 right-0 w-[800px] h-[400px] pointer-events-none opacity-20 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 70% 100%, rgba(180, 83, 9, 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Decorative Lines */}
      <div className="absolute top-1/3 left-0 w-[1px] h-[200px] bg-gradient-to-b from-transparent via-amber-300/30 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[1px] h-[200px] bg-gradient-to-b from-transparent via-amber-300/30 to-transparent" />

      {/* Text Content Section */}
      <div className="relative z-20 text-center max-w-3xl px-6 space-y-3 mt-4">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.4em] font-medium text-amber-600/80"
        >
          Trusted Worldwide
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
        >
          Trusted by Exceptional Clients.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base text-neutral-600 font-light leading-relaxed max-w-xl mx-auto pt-2"
        >
          From luxury hotels and heritage palaces to destination wedding clients
          and global brands, Violin Events LLP delivers exceptional experiences
          with precision, creativity, and flawless execution.
        </motion.p>
      </div>

      {/* Grid Section */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 mt-12 md:mt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          className="trusted-clients-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="trusted-client-card-wrapper relative flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                variants={hoverVariants}
                className="trusted-client-card relative w-full aspect-square rounded-2xl bg-gradient-to-br from-[#F5F0EA] via-[#EFEAE3] to-[#E8E2D9] border border-amber-300/40 flex items-center justify-center p-4 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                {/* Inner Glow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "inset 0 1px 2px 0 rgba(251, 191, 36, 0.2), inset 0 0 30px 0 rgba(245, 158, 11, 0.05)",
                  }}
                />

                {/* Top Border Glow */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />

                {/* Bottom Border Glow */}
                <div className="absolute bottom-0 left-1/3 right-1/3 h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

                {/* Hover Glow Effect */}
                <motion.div
                  variants={glowVariants}
                  className="absolute inset-0 rounded-2xl pointer-events-none trusted-client-glow"
                />

                {/* Logo Image */}
                <motion.img
                  src={logo.src}
                  alt={logo.alt}
                  className="trusted-client-logo w-full h-full object-contain max-w-[80%] max-h-[80%] relative z-10"
                  style={{
                    filter: "brightness(0.9) saturate(0.9)",
                    transform: "translateZ(20px)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    filter: "brightness(1) saturate(1)",
                    transition: { duration: 0.3 },
                  }}
                  onError={(e) => {
                    // Fallback if image doesn't load
                    e.target.style.display = "none";
                    const parent = e.target.parentElement;
                    const fallback = document.createElement("div");
                    fallback.className = "text-4xl text-amber-500/40";
                    fallback.textContent = "✦";
                    parent?.appendChild(fallback);
                  }}
                />

                {/* Shine Effect on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden trusted-client-shine"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="trusted-client-shine-overlay absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="relative z-20 w-full flex justify-center mt-12">
        <div className="flex items-center gap-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-300/50" />
          <div className="w-2 h-2 rotate-45 border border-amber-400/40 bg-[#FAF8F5]" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-300/50" />
        </div>
      </div>
    </section>
  );
};

export default TrustedClients;
