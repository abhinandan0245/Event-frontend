import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles = `
  relative overflow-hidden
  inline-flex
  items-center
  justify-center
  gap-2
  px-7 py-3.5
  rounded-full
  font-semibold
  text-sm
  cursor-pointer
  select-none
  whitespace-nowrap
  group
`;

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
      from-[#FFE9A3]
      via-[#FFD700]
      to-[#CFA200]
    `,

    secondary: `
      bg-gradient-to-r
      from-[#FFE9A3]
      via-[#FFD700]
      to-[#CFA200]
    `,

    outline: `
      bg-gradient-to-r
      from-[#FFE9A3]
      via-[#FFD700]
      to-[#CFA200]
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
      className={`${baseStyles} ${variants[variant]} ${className}`}
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
  animate-gold-flow
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
