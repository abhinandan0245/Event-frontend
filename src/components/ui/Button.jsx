import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles = `
    relative overflow-hidden
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-full
    font-semibold
    cursor-pointer
    select-none
    whitespace-nowrap
    group
    transition-all
    duration-300
  `;

  const sizes = {
    xs: "px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs",
    sm: "px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm",
    md: "px-6 py-3 text-sm sm:px-7 sm:py-3.5 sm:text-sm",
    lg: "px-8 py-3.5 text-base sm:px-10 sm:py-4 sm:text-lg",
    xl: "px-10 py-4 text-lg sm:px-12 sm:py-5 sm:text-xl",
  };

  const variants = {
    primary: `
      bg-gradient-to-r
      from-pink-500
      via-rose-500
      to-orange-400
      text-white
      shadow-lg
      shadow-pink-500/30
    `,

    secondary: `
      bg-white
      border-2
      border-pink-500
      text-pink-500
      shadow-md
    `,

    outline: `
      bg-transparent
      border-2
      border-white
      text-white
    `,
  };

  const hoverOverlay = {
    primary: `
      bg-gradient-to-r
      from-pink-400
      via-rose-400
      to-orange-400
    `,

    secondary: `
      bg-gradient-to-r
      from-pink-400
      via-rose-400
      to-orange-400
    `,

    outline: `
      bg-gradient-to-r
      from-pink-400
      via-rose-400
      to-orange-400
    `,
  };

  return (
    <motion.button
      whileHover={{
        y: -3,
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 20,
      }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Gold Fill Animation */}
      <span
        className={`
          absolute
          inset-0
          rounded-full
          origin-left
          scale-x-0
          group-hover:scale-x-100
          transition-transform
          duration-700
          ease-out
          ${hoverOverlay[variant]}
        `}
      />

      {/* Shine Animation */}
      <span
        className="
          absolute
          inset-0
          -translate-x-full
          group-hover:translate-x-[180%]
          transition-transform
          duration-[1200ms]
          ease-out
          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent
          skew-x-12
        "
      />

      {/* Glow */}
      <span
        className="
          absolute
          inset-0
          rounded-full
          opacity-0
          blur-xl
          bg-yellow-400/40
          group-hover:opacity-100
          transition-opacity
          duration-500
        "
      />

      {/* Content */}
      <span
        className={`
          relative z-10
          inline-flex items-center gap-2
          whitespace-nowrap
          transition-colors
          duration-500
          ${
            variant === "primary"
              ? "text-white group-hover:text-black"
              : "group-hover:text-black"
          }
        `}
      >
        {children}
      </span>
    </motion.button>
  );
};

export default Button;
