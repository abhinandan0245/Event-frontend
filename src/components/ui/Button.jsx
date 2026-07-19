// import { motion } from "framer-motion";

// const Button = ({
//   children,
//   variant = "primary",
//   size = "md",
//   className = "",
//   ...props
// }) => {
//   const baseStyles = `
//     relative overflow-hidden
//     inline-flex
//     items-center
//     justify-center
//     gap-2
//     rounded-full
//     font-semibold
//     cursor-pointer
//     select-none
//     whitespace-nowrap
//     group
//     transition-all
//     duration-300
//   `;

//   const sizes = {
//     xs: "px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs",
//     sm: "px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm",
//     md: "px-6 py-3 text-sm sm:px-7 sm:py-3.5 sm:text-sm",
//     lg: "px-8 py-3.5 text-base sm:px-10 sm:py-4 sm:text-lg",
//     xl: "px-10 py-4 text-lg sm:px-12 sm:py-5 sm:text-xl",
//   };

//   const variants = {
//     primary: `
//       bg-gradient-to-r
//       from-pink-500
//       via-rose-500
//       to-orange-400
//       text-white
//       shadow-lg
//       shadow-pink-500/30
//     `,

//     secondary: `
//       bg-white
//       border-2
//       border-pink-500
//       text-pink-500
//       shadow-md
//     `,

//     outline: `
//       bg-transparent
//       border-2
//       border-white
//       text-white
//     `,
//   };

//   const hoverOverlay = {
//     primary: `
//       bg-gradient-to-r
//       from-pink-400
//       via-rose-400
//       to-orange-400
//     `,

//     secondary: `
//       bg-gradient-to-r
//       from-pink-400
//       via-rose-400
//       to-orange-400
//     `,

//     outline: `
//       bg-gradient-to-r
//       from-pink-400
//       via-rose-400
//       to-orange-400
//     `,
//   };

//   return (
//     <motion.button
//       whileHover={{
//         y: -3,
//         scale: 1.04,
//       }}
//       whileTap={{
//         scale: 0.97,
//       }}
//       transition={{
//         type: "spring",
//         stiffness: 350,
//         damping: 20,
//       }}
//       className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
//       {...props}
//     >
//       {/* Gold Fill Animation */}
//       <span
//         className={`
//           absolute
//           inset-0
//           rounded-full
//           origin-left
//           scale-x-0
//           group-hover:scale-x-100
//           transition-transform
//           duration-700
//           ease-out
//           ${hoverOverlay[variant]}
//         `}
//       />

//       {/* Shine Animation */}
//       <span
//         className="
//           absolute
//           inset-0
//           -translate-x-full
//           group-hover:translate-x-[180%]
//           transition-transform
//           duration-[1200ms]
//           ease-out
//           bg-gradient-to-r
//           from-transparent
//           via-white/40
//           to-transparent
//           skew-x-12
//         "
//       />

//       {/* Glow */}
//       <span
//         className="
//           absolute
//           inset-0
//           rounded-full
//           opacity-0
//           blur-xl
//           bg-yellow-400/40
//           group-hover:opacity-100
//           transition-opacity
//           duration-500
//         "
//       />

//       {/* Content */}
//       <span
//         className={`
//           relative z-10
//           inline-flex items-center gap-2
//           whitespace-nowrap
//           transition-colors
//           duration-500
//           ${
//             variant === "primary"
//               ? "text-white group-hover:text-black"
//               : "group-hover:text-black"
//           }
//         `}
//       >
//         {children}
//       </span>
//     </motion.button>
//   );
// };

// export default Button;

import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  shape = "rectangle", 
  className = "",
  ...props
}) => {
  // 1. Base Styles with Premium Depth
  const baseStyles = `
    relative overflow-hidden
    inline-flex
    items-center
    justify-center
    gap-2.5
    font-sans
    font-semibold
    tracking-[0.18em]
    uppercase
    cursor-pointer
    select-none
    whitespace-nowrap
    group
    transition-all
    duration-500
    ring-1 ring-inset ring-white/10
  `;

  // 2. Size Variations
  const sizes = {
    xs: "px-5 py-2 text-[9px]",
    sm: "px-6 py-2.5 text-[10px]",
    md: "px-8 py-3.5 text-[11px]",
    lg: "px-10 py-4 text-xs",
    xl: "px-12 py-5 text-sm",
  };

  // 3. Color Variants
  const variants = {
    primary: `
      bg-[#26221C]
      text-[#FAF9F5]
      border border-[#26221C]
      shadow-md shadow-black/10
    `,
    secondary: `
      bg-transparent
      border border-neutral-300
      text-neutral-800
      hover:border-amber-700
    `,
    outline: `
      bg-transparent
      border border-white/40
      text-white
      hover:border-white
      backdrop-blur-sm
    `,
  };

  // 4. Standard Tailwind Shapes
  const shapes = {
    rectangle: "rounded-[3px]",
    rounded: "rounded-xl",
    pill: "rounded-full",
    leaf: "rounded-tl-2xl rounded-br-2xl rounded-tr-[3px] rounded-bl-[3px]",
    arch: "rounded-t-full rounded-b-[4px]",
    // Custom clipped shapes mapped to empty strings here
    cut: "",
    tag: "",
    shield: "",
    skew: "",
    blob: "",
  };

  // 5. Custom Inline Styles for Unique/Funny/Premium Shapes
  let customShapeStyles = {};

  if (shape === "cut") {
    // Chamfered edges
    customShapeStyles = {
      clipPath:
        "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
    };
  } else if (shape === "tag") {
    // Pointed left edge like a premium brand tag (Quirky)
    customShapeStyles = {
      clipPath: "polygon(15px 0, 100% 0, 100% 100%, 15px 100%, 0 50%)",
    };
  } else if (shape === "shield") {
    // Royal crest / badge look (Ultra Premium)
    customShapeStyles = {
      clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
    };
  } else if (shape === "skew") {
    // Slanted parallelogram (Fun & Energetic)
    customShapeStyles = {
      clipPath: "polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)",
    };
  } else if (shape === "blob") {
    // Organic jelly-like shape (Funny & Trendy High-End)
    customShapeStyles = { borderRadius: "70% 30% 40% 60% / 50% 60% 40% 50%" };
  }

  // 6. Hover Effects
  const hoverOverlay = {
    primary: "bg-[#B48C50]",
    secondary: "bg-[#26221C]",
    outline: "bg-white",
  };

  const textColors = {
    primary: "text-[#FAF9F5] group-hover:text-white",
    secondary: "text-neutral-800 group-hover:text-[#FAF9F5]",
    outline: "text-white group-hover:text-neutral-900",
  };

  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${shapes[shape] || ""} ${className}`}
      style={customShapeStyles}
      {...props}
    >
      {/* Premium Hover Fill */}
      <span
        className={`
          absolute inset-0 h-full w-full origin-bottom scale-y-0
          group-hover:scale-y-100 transition-transform duration-500
          ease-[0.22,1,0.36,1] ${hoverOverlay[variant]}
        `}
      />

      {/* Elegant Shimmer Effect */}
      <span
        className="
          absolute inset-0 z-10 -translate-x-full skew-x-12
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          transition-transform duration-[1200ms] ease-[0.22,1,0.36,1]
          group-hover:translate-x-[200%]
        "
      />

      {/* Background Glow */}
      <span
        className="
          pointer-events-none absolute inset-0 bg-amber-500/15
          opacity-0 blur-xl transition-opacity duration-700
          group-hover:opacity-100
        "
      />

      {/* Button Content (Text & Icons) */}
      <span
        className={`
          relative z-20 inline-flex items-center gap-2 whitespace-nowrap
          transition-colors duration-500 ease-out ${textColors[variant]}
        `}
      >
        {children}
      </span>
    </motion.button>
  );
};

export default Button;