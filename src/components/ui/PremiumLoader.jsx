import React from "react";
import { motion } from "framer-motion";

const PremiumLoader = () => {
  // Inline styles for easy copy-pasting, you can move these to CSS/Tailwind later
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
  };

  const loaderWrapperStyle = {
    position: "relative",
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const ringStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    border: "2px solid transparent",
    borderTopColor: "#d4af37", // Premium Gold
    borderBottomColor: "#d4af37",
    borderRadius: "50%",
  };

  const innerRingStyle = {
    position: "absolute",
    width: "60%",
    height: "60%",
    border: "2px solid transparent",
    borderLeftColor: "#f3e5ab", // Light Gold / Champagne
    borderRightColor: "#f3e5ab",
    borderRadius: "50%",
  };

  const textStyle = {
    marginTop: "2rem",
    color: "#d4af37",
    fontFamily: "sans-serif", // Replace with your premium font
    letterSpacing: "0.2em",
    fontSize: "0.9rem",
    textTransform: "uppercase",
  };

  return (
    <div style={containerStyle}>
      <div style={loaderWrapperStyle}>
        {/* Outer Ring Animation */}
        <motion.div
          style={ringStyle}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />

        {/* Inner Ring Reverse Animation */}
        <motion.div
          style={innerRingStyle}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />

        {/* Center elegant dot */}
        <motion.div
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#d4af37",
            borderRadius: "50%",
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>

      {/* Pulsing Text */}
      <motion.p
        style={textStyle}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        Loading
      </motion.p>
    </div>
  );
};

export default PremiumLoader;
