import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center text-sm";

  const variants = {
    primary:
      "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg shadow-pink-500/30",
    secondary:
      "border-2 border-pink-500 text-pink-500 hover:bg-pink-50 hover:border-pink-600",
    outline:
      "border-2 border-white text-white hover:bg-white hover:text-dark-900",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
