import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";

/**
 * Reusable hover dropdown for simple nav-link lists.
 * Usage:
 * <Dropdown isOpen={open} onClose={...} items={[{ path, label }]} />
 */
const Dropdown = ({ isOpen, onClose, items = [], align = "left" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onMouseLeave={onClose}
          className={`absolute top-full mt-2 w-56 bg-dark-900/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="py-2">
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `block px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-gold-500 bg-white/5"
                      : "text-white hover:text-gold-400 hover:bg-white/5"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
