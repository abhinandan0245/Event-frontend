import React from "react";
import { motion } from "framer-motion";

const PremiumLoaderV3 = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#FDFBF7", // Updated to match website's main off-white cream background
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    overflow: "hidden",
  };

  const textStyle = {
    color: "#C58B48", // Theme Champagne Gold
    fontFamily: '"Montserrat", sans-serif', // Matching the website's subtitle font
    letterSpacing: "0.25em", // Wide tracking for luxury feel
    fontSize: "0.75rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: "2.5rem",
  };

  // Sparkle configuration for celebration vibe
  const sparkles = [
    { id: 1, size: 4, left: "35%", delay: 0 },
    { id: 2, size: 6, left: "50%", delay: 0.5 },
    { id: 3, size: 3, left: "65%", delay: 1.2 },
    { id: 4, size: 5, left: "42%", delay: 0.8 },
    { id: 5, size: 7, left: "58%", delay: 1.5 },
  ];

  return (
    <div style={containerStyle}>
      {/* Background Champagne Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          style={{
            position: "absolute",
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: "#C58B48", // Theme Champagne Gold
            borderRadius: "50%",
            left: sparkle.left,
            bottom: "40%", // Starts slightly below center
            opacity: 0.3, // Kept subtle so it doesn't overpower the logo
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            y: -120, // Floats upwards like champagne bubbles
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Custom Violin Events Logo Animation */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <motion.img
          src="/violin-logo.png"
          alt="Violin Events Logo"
          style={{
            width: "140px", // Adjust this value based on your actual logo's aspect ratio
            height: "auto",
            objectFit: "contain",
          }}
          // A luxurious, slow breathing/pulsing effect
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: [0.6, 1, 0.6], 
            scale: [0.98, 1, 0.98] 
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Elegant Pulsing Text */}
      <motion.p
        style={textStyle}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        Curating Moments
      </motion.p>
    </div>
  );
};

export default PremiumLoaderV3;