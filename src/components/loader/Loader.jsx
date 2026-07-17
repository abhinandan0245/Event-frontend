import React from 'react';
import { motion } from 'framer-motion';

// This is the functional component for our animated loader.
// It will be a separate, importable component.
const Loader = () => {
  // We'll define some simple motion configurations for the Framer Motion animation.
  // This initial state defines where the animation starts.
  const loaderVariants = {
    initial: {
      opacity: 0, // Fully transparent
      scale: 0.5, // Half size
    },
    // This state defines the fully visible, full-size state we animate towards.
    visible: {
      opacity: 1, // Fully visible
      scale: 1, // Full size
      transition: {
        duration: 0.8, // Take 0.8 seconds to animate
        delay: 0.2, // Wait 0.2 seconds before starting
        ease: "easeInOut", // Use an ease-in-out easing function
        // This transition configuration applies specifically to the scaling animation.
        scale: {
            duration: 1, // Take 1 second to scale
            delay: 0, // Don't delay the scale
            ease: "circOut", // Use a specific circular easing function
        },
      }
    },
  };

  return (
    // We'll use a container `div` for centering and background.
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#FAF9F5]/60 backdrop-blur-sm rounded-full z-20">
      {/* 
        This is our animated element from Framer Motion.
        The `motion.div` allows us to define animations with the `initial`, `animate`, and `variants` props.
      */}
      <motion.div
        className="w-16 h-16 border-2 border-amber-700 border-t-transparent rounded-full"
        // These are the props connecting the component to our variants:
        initial="initial"
        animate="visible"
        variants={loaderVariants}
        style={{
            // This CSS animation provides the consistent spinning effect.
            animation: "loader-spin 1.2s infinite linear"
        }}
      />
      
      {/* Loading text with a standard CSS animation for a pulse effect. */}
      <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-amber-900/60 animate-pulse mt-3.5">
        Mapping Horizon...
      </span>
      
      {/* A simple keyframe animation defined right in the component. */}
      <style>{`
        @keyframes loader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// We must export our `Loader` component for it to be importable in other files.
export default Loader;