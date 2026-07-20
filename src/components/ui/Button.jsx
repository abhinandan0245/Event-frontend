// import { motion } from "framer-motion";

// const Button = ({
//   children,
//   variant = "primary",
//   size = "md",
//   shape = "rectangle",
//   className = "",
//   ...props
// }) => {
//   // 1. Base Styles with Premium Depth
//   const baseStyles = `
//     relative overflow-hidden
//     inline-flex
//     items-center
//     justify-center
//     gap-2.5
//     font-sans
//     font-semibold
//     tracking-[0.18em]
//     uppercase
//     cursor-pointer
//     select-none
//     whitespace-nowrap
//     group
//     transition-all
//     duration-500
//     ring-1 ring-inset ring-white/10
//   `;

//   // 2. Size Variations
//   const sizes = {
//     xs: "px-5 py-2 text-[9px]",
//     sm: "px-6 py-2.5 text-[10px]",
//     md: "px-8 py-3.5 text-[11px]",
//     lg: "px-10 py-4 text-xs",
//     xl: "px-12 py-5 text-sm",
//   };

//   // 3. Color Variants
//   const variants = {
//     primary: `
//       bg-[#26221C]
//       text-[#FAF9F5]
//       border border-[#26221C]
//       shadow-md shadow-black/10
//     `,
//     secondary: `
//       bg-transparent
//       border border-neutral-300
//       text-neutral-800
//       hover:border-amber-700
//     `,
//     outline: `
//       bg-transparent
//       border border-white/40
//       text-white
//       hover:border-white
//       backdrop-blur-sm
//     `,
//   };

//   // 4. Standard Tailwind Shapes
//   const shapes = {
//     rectangle: "rounded-[3px]",
//     rounded: "rounded-xl",
//     pill: "rounded-full",
//     leaf: "rounded-tl-2xl rounded-br-2xl rounded-tr-[3px] rounded-bl-[3px]",
//     arch: "rounded-t-full rounded-b-[4px]",
//     // Custom clipped shapes mapped to empty strings here
//     cut: "",
//     tag: "",
//     shield: "",
//     skew: "",
//     blob: "",
//   };

//   // 5. Custom Inline Styles for Unique/Funny/Premium Shapes
//   let customShapeStyles = {};

//   if (shape === "cut") {
//     // Chamfered edges
//     customShapeStyles = {
//       clipPath:
//         "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
//     };
//   } else if (shape === "tag") {
//     // Pointed left edge like a premium brand tag (Quirky)
//     customShapeStyles = {
//       clipPath: "polygon(15px 0, 100% 0, 100% 100%, 15px 100%, 0 50%)",
//     };
//   } else if (shape === "shield") {
//     // Royal crest / badge look (Ultra Premium)
//     customShapeStyles = {
//       clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
//     };
//   } else if (shape === "skew") {
//     // Slanted parallelogram (Fun & Energetic)
//     customShapeStyles = {
//       clipPath: "polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)",
//     };
//   } else if (shape === "blob") {
//     // Organic jelly-like shape (Funny & Trendy High-End)
//     customShapeStyles = { borderRadius: "70% 30% 40% 60% / 50% 60% 40% 50%" };
//   }

//   // 6. Hover Effects
//   const hoverOverlay = {
//     primary: "bg-[#B48C50]",
//     secondary: "bg-[#26221C]",
//     outline: "bg-white",
//   };

//   const textColors = {
//     primary: "text-[#FAF9F5] group-hover:text-white",
//     secondary: "text-neutral-800 group-hover:text-[#FAF9F5]",
//     outline: "text-white group-hover:text-neutral-900",
//   };

//   return (
//     <motion.button
//       whileHover={{ y: -3, scale: 1.015 }}
//       whileTap={{ scale: 0.97 }}
//       transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${shapes[shape] || ""} ${className}`}
//       style={customShapeStyles}
//       {...props}
//     >
//       {/* Premium Hover Fill */}
//       <span
//         className={`
//           absolute inset-0 h-full w-full origin-bottom scale-y-0
//           group-hover:scale-y-100 transition-transform duration-500
//           ease-[0.22,1,0.36,1] ${hoverOverlay[variant]}
//         `}
//       />

//       {/* Elegant Shimmer Effect */}
//       <span
//         className="
//           absolute inset-0 z-10 -translate-x-full skew-x-12
//           bg-gradient-to-r from-transparent via-white/20 to-transparent
//           transition-transform duration-[1200ms] ease-[0.22,1,0.36,1]
//           group-hover:translate-x-[200%]
//         "
//       />

//       {/* Background Glow */}
//       <span
//         className="
//           pointer-events-none absolute inset-0 bg-amber-500/15
//           opacity-0 blur-xl transition-opacity duration-700
//           group-hover:opacity-100
//         "
//       />

//       {/* Button Content (Text & Icons) */}
//       <span
//         className={`
//           relative z-20 inline-flex items-center gap-2 whitespace-nowrap
//           transition-colors duration-500 ease-out ${textColors[variant]}
//         `}
//       >
//         {children}
//       </span>
//     </motion.button>
//   );
// };

// export default Button;

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  shape = "rectangle",
  magnetic = true,
  className = "",
  ...props
}) => {
  const buttonRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 300,
    damping: 20,
  });

  const springY = useSpring(y, {
    stiffness: 300,
    damping: 20,
  });

  const handleMouseMove = (event) => {
    if (!magnetic) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const moveX = event.clientX - (rect.left + rect.width / 2);
    const moveY = event.clientY - (rect.top + rect.height / 2);

    x.set(moveX * 0.12);
    y.set(moveY * 0.12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Base Styles
  const baseStyles = `
    relative
    overflow-hidden
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
    ring-1
    ring-inset
    ring-white/10
  `;

  // Sizes
  const sizes = {
    xs: "px-5 py-2 text-[9px]",
    sm: "px-6 py-2.5 text-[10px]",
    md: "px-8 py-3.5 text-[11px]",
    lg: "px-10 py-4 text-xs",
    xl: "px-12 py-5 text-sm",
  };

  // Premium Variants
  const variants = {
    primary: `
      bg-[#26221C]
      text-[#FAF9F5]
      border
      border-[#26221C]
      shadow-[0_5px_18px_rgba(38,34,28,0.14)]
      hover:shadow-[0_10px_28px_rgba(38,34,28,0.20)]
    `,

    champagne: `
      bg-[#C9A96E]
      text-[#211D17]
      border
      border-[#C9A96E]
      shadow-[0_5px_18px_rgba(201,169,110,0.18)]
      hover:shadow-[0_10px_28px_rgba(201,169,110,0.28)]
    `,

    bronze: `
      bg-[#8D6742]
      text-[#FAF9F5]
      border
      border-[#8D6742]
      shadow-[0_5px_18px_rgba(141,103,66,0.16)]
      hover:shadow-[0_10px_28px_rgba(141,103,66,0.24)]
    `,

    emerald: `
      bg-[#193B35]
      text-[#F8F7F1]
      border
      border-[#193B35]
      shadow-[0_5px_18px_rgba(25,59,53,0.16)]
      hover:shadow-[0_10px_28px_rgba(25,59,53,0.25)]
    `,

    wine: `
      bg-[#4A202A]
      text-[#FAF9F5]
      border
      border-[#4A202A]
      shadow-[0_5px_18px_rgba(74,32,42,0.16)]
      hover:shadow-[0_10px_28px_rgba(74,32,42,0.25)]
    `,

    navy: `
      bg-[#182638]
      text-[#F8F7F1]
      border
      border-[#182638]
      shadow-[0_5px_18px_rgba(24,38,56,0.16)]
      hover:shadow-[0_10px_28px_rgba(24,38,56,0.25)]
    `,

    secondary: `
      bg-[#F7F5EF]
      border
      border-[#D8D3C8]
      text-[#26221C]
      shadow-[0_4px_14px_rgba(38,34,28,0.06)]
      hover:shadow-[0_8px_22px_rgba(38,34,28,0.12)]
    `,

    outline: `
      bg-transparent
      border
      border-white/40
      text-white
      backdrop-blur-sm
      shadow-[0_4px_16px_rgba(255,255,255,0.04)]
      hover:shadow-[0_8px_24px_rgba(255,255,255,0.10)]
    `,
  };

  // Shapes
  const shapes = {
    rectangle: "rounded-[3px]",

    rounded: "rounded-xl",

    pill: "rounded-full",

    leaf: `
      rounded-tl-2xl
      rounded-br-2xl
      rounded-tr-[3px]
      rounded-bl-[3px]
    `,

    arch: "rounded-t-full rounded-b-[4px]",

    roundedCut: "rounded-tl-2xl rounded-br-2xl",

    soft: "rounded-[18px_4px_18px_4px]",

    organic: "rounded-[45%_10%_45%_10%]",

    cut: "",

    tag: "",

    shield: "",

    skew: "",

    blob: "",

    diamond: "",

    ticket: "",

    hex: "",
  };

  // Custom Shapes
  let customShapeStyles = {};

  if (shape === "cut") {
    customShapeStyles = {
      clipPath:
        "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
    };
  }

  if (shape === "tag") {
    customShapeStyles = {
      clipPath:
        "polygon(15px 0, 100% 0, 100% 100%, 15px 100%, 0 50%)",
    };
  }

  if (shape === "shield") {
    customShapeStyles = {
      clipPath:
        "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
    };
  }

  if (shape === "skew") {
    customShapeStyles = {
      clipPath:
        "polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)",
    };
  }

  if (shape === "blob") {
    customShapeStyles = {
      borderRadius: "70% 30% 40% 60% / 50% 60% 40% 50%",
    };
  }

  if (shape === "diamond") {
    customShapeStyles = {
      clipPath:
        "polygon(12px 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0 50%)",
    };
  }

  if (shape === "ticket") {
    customShapeStyles = {
      clipPath:
        "polygon(0 0, 100% 0, 100% 35%, 96% 40%, 96% 60%, 100% 65%, 100% 100%, 0 100%, 0 65%, 4% 60%, 4% 40%, 0 35%)",
    };
  }

  if (shape === "hex") {
    customShapeStyles = {
      clipPath:
        "polygon(12px 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0 50%)",
    };
  }

  // Hover Fill
  const hoverOverlay = {
    primary: "bg-[#B48C50]",
    champagne: "bg-[#E1C58D]",
    bronze: "bg-[#B8895B]",
    emerald: "bg-[#285D52]",
    wine: "bg-[#713541]",
    navy: "bg-[#2C405A]",
    secondary: "bg-[#26221C]",
    outline: "bg-white",
  };

  // Text Color
  const textColors = {
    primary: "text-[#FAF9F5] group-hover:text-white",
    champagne: "text-[#211D17] group-hover:text-[#211D17]",
    bronze: "text-[#FAF9F5] group-hover:text-white",
    emerald: "text-[#F8F7F1] group-hover:text-white",
    wine: "text-[#FAF9F5] group-hover:text-white",
    navy: "text-[#F8F7F1] group-hover:text-white",
    secondary: "text-[#26221C] group-hover:text-[#FAF9F5]",
    outline: "text-white group-hover:text-[#26221C]",
  };

  return (
    <motion.button
      ref={buttonRef}
      style={{
        ...customShapeStyles,
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${shapes[shape] || ""}
        ${className}
      `}
      {...props}
    >
      {/* Cursor Glow */}
      <span
        className="
          pointer-events-none
          absolute
          -inset-10
          opacity-0
          blur-2xl
          transition-opacity
          duration-500
          group-hover:opacity-100
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_65%)]
        "
      />

      {/* Premium Fill */}
      <span
        className={`
          absolute
          inset-0
          origin-bottom
          scale-y-0
          group-hover:scale-y-100
          transition-transform
          duration-500
          ease-[0.22,1,0.36,1]
          ${hoverOverlay[variant]}
        `}
      />

      {/* Luxury Shimmer */}
      <span
        className="
          absolute
          inset-0
          z-10
          -translate-x-full
          skew-x-12
          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent
          transition-transform
          duration-[1200ms]
          ease-[0.22,1,0.36,1]
          group-hover:translate-x-[200%]
        "
      />

      {/* Soft Gold Glow */}
      <span
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#B48C50]/10
          opacity-0
          blur-xl
          transition-opacity
          duration-700
          group-hover:opacity-100
        "
      />

      {/* Content */}
      <span
        className={`
          relative
          z-20
          inline-flex
          items-center
          gap-2
          whitespace-nowrap
          transition-colors
          duration-500
          ease-out
          ${textColors[variant]}
        `}
      >
        {children}
      </span>
    </motion.button>
  );
};

export default Button;