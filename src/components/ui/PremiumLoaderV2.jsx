import React from "react";
import { motion } from "framer-motion";

const PremiumLoaderV2 = () => {
  // Styles are kept inline for easy copy-pasting for now.
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#0a1128", // Deep luxury navy blue background
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    overflow: "hidden",
  };

  const stringsContainerStyle = {
    position: "relative",
    display: "flex",
    gap: "15px", // Gap between the 'strings'
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2rem",
  };

  const stringStyle = {
    width: "2px", // Very thin like strings
    backgroundColor: "#d4af37", // Premium Gold
    borderRadius: "2px",
  };

  // String animation variants for subtle vibration
  const stringVariants = {
    animate: (i) => ({
      scaleY: [1, 1.3, 1], // Expands vertically slightly
      opacity: [0.3, 1, 0.3], // Fades in and out
      transition: {
        repeat: Infinity,
        duration: 1.8,
        ease: "easeInOut",
        delay: i * 0.2, // Offset timing for organic feel
      },
    }),
  };

  const textStyle = {
    color: "#d4af37",
    fontFamily: "serif", // Elegant serif font for premium feel
    letterSpacing: "0.4em", // Wide spacing
    fontSize: "0.8rem",
    textTransform: "uppercase",
    marginTop: "1rem",
  };

  return (
    <div style={containerStyle}>
      {/* Background abstract element (Subtle golden glow) */}
      <motion.div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(10,17,40,0) 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      {/* Main Thematic Animation */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* The 'Bow' (Horizontal drawing line) */}
        <motion.div
          style={{
            position: "absolute",
            height: "1px", // Extremely thin bow line
            background:
              "linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.8) 50%, rgba(212,175,55,0) 100%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          initial={{ width: "0vw" }}
          animate={{ width: "100vw", opacity: [0, 1, 0] }} // Draws across full screen
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "circOut", // Starts fast, slows down
            repeatDelay: 0.5, // Short pause before next stroke
          }}
        />

        {/* The 'Strings' (Vertical lines) */}
        <div style={stringsContainerStyle}>
          {/* String 1 (G) - slightly different height */}
          <motion.div
            style={{ ...stringStyle, height: "60px" }}
            variants={stringVariants}
            animate="animate"
            custom={0}
          />
          {/* String 2 (D) */}
          <motion.div
            style={{ ...stringStyle, height: "70px" }}
            variants={stringVariants}
            animate="animate"
            custom={1}
          />
          {/* String 3 (A) */}
          <motion.div
            style={{ ...stringStyle, height: "65px" }}
            variants={stringVariants}
            animate="animate"
            custom={2}
          />
        </div>
      </div>

      {/* Pulsing Text */}
      <motion.p
        style={textStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        Tuning Experience
      </motion.p>
    </div>
  );
};

export default PremiumLoaderV2;
