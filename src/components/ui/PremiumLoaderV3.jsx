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
    backgroundColor: "#0a1128", // Deep luxury navy background
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    overflow: "hidden",
  };

  const textStyle = {
    color: "#d4af37", // Premium Gold
    fontFamily: '"Playfair Display", serif', // Luxury serif font look
    letterSpacing: "0.3em",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    marginTop: "2.5rem",
  };

  // Sparkle configuration for celebration vibe
  const sparkles = [
    { id: 1, size: 4, left: "30%", delay: 0 },
    { id: 2, size: 6, left: "50%", delay: 0.5 },
    { id: 3, size: 3, left: "70%", delay: 1.2 },
    { id: 4, size: 5, left: "40%", delay: 0.8 },
    { id: 5, size: 7, left: "60%", delay: 1.5 },
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
            backgroundColor: "#f3e5ab", // Light Champagne Gold
            borderRadius: "50%",
            left: sparkle.left,
            bottom: "40%", // Starts slightly below center
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: -100, // Floats upwards
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* SVG Signature 'V' Animation */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle background track for the V */}
          <path
            d="M20 20 L50 85 L80 20"
            stroke="rgba(212, 175, 55, 0.15)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* The animated drawing V */}
          <motion.path
            d="M20 20 L50 85 L80 20"
            stroke="#d4af37" // Solid Gold
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 0.6, 1], // Controls the speed of drawing vs holding
            }}
          />
        </svg>
      </div>

      {/* Elegant Pulsing Text */}
      <motion.p
        style={textStyle}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        Curating Moments
      </motion.p>
    </div>
  );
};

export default PremiumLoaderV3;
