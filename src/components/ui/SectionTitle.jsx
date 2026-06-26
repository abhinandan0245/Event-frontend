import { motion } from "framer-motion";

const SectionTitle = ({
  subtitle,
  title,
  description,
  className = "",
  subtitleColor = "text-pink-500",
  titleColor = "text-dark-800",
  descriptionColor = "text-dark-600",
}) => {
  return (
    <div className={`text-center max-w-3xl mx-auto ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${subtitleColor} font-semibold text-sm uppercase tracking-widest`}
      >
        {subtitle}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`text-3xl md:text-5xl font-playfair font-bold mt-2 mb-4 ${titleColor}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${descriptionColor} text-base md:text-lg max-w-2xl mx-auto`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
