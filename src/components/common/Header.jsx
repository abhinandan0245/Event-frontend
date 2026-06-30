import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/destinations", label: "DESTINATIONS", hasDropdown: true },
    { path: "/venues", label: "VENUES" },
    { path: "/services", label: "SERVICES" },
    { path: "/portfolio", label: "PORTFOLIO" },
    { path: "/plan-your-celebration", label: "PLAN YOUR CELEBRATION" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT US", special: true },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-dark-900/95 backdrop-blur-lg shadow-lg py-2"
          : "bg-transparent py-3 md:py-4"
      }`}
    >
      <div className="container-custom px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center shrink-0"
          >
            <Link
              to="/"
              className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold"
            >
              <span className="gradient-gold bg-clip-text text-transparent">
                VIOLIN
              </span>
              <span className="text-white text-[8px] sm:text-[10px] md:text-sm ml-1">
                EVENTS LLP
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Visible on Large screens and above */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative"
                onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
                onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
              >
                {link.special ? (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative group px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg font-semibold transition-all duration-300 inline-flex items-center ${
                        isActive
                          ? "text-dark-900 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 shadow-lg shadow-gold-500/40"
                          : "text-gold-400 hover:text-white"
                      }`
                    }
                  >
                    <motion.span
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400"
                      animate={{
                        scaleX: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ transformOrigin: "left" }}
                    />
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400"
                      animate={{
                        scaleX: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      style={{ transformOrigin: "right" }}
                    />
                    <motion.span
                      className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-gold-400 via-gold-500 to-gold-400"
                      animate={{
                        scaleY: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      style={{ transformOrigin: "top" }}
                    />
                    <motion.span
                      className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-gold-400 via-gold-500 to-gold-400"
                      animate={{
                        scaleY: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                      }}
                      style={{ transformOrigin: "bottom" }}
                    />

                    <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-gold-400/60" />
                    <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-gold-400/60" />
                    <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-gold-400/60" />
                    <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-gold-400/60" />

                    <span className="relative z-10 flex items-center gap-1.5 xl:gap-2 text-xs xl:text-sm">
                      <motion.span
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Sparkles className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                      </motion.span>
                      {link.label}
                      <motion.span
                        animate={{
                          x: [0, 4, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                      </motion.span>
                    </span>

                    <motion.span
                      className="absolute inset-0 rounded-lg bg-gold-500/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      style={{ filter: "blur(12px)", zIndex: -1 }}
                    />
                    <motion.span
                      className="absolute -inset-0.5 rounded-lg border-2 border-gold-400/50"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </NavLink>
                ) : link.hasDropdown ? (
                  <div>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `text-xs xl:text-sm font-medium transition-all duration-300 relative group whitespace-nowrap flex items-center gap-1 ${
                          isActive
                            ? "text-gold-500"
                            : "text-white hover:text-gold-400"
                        }`
                      }
                    >
                      {link.label}
                      <motion.span
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-2.5 h-2.5 xl:w-3 xl:h-3" />
                      </motion.span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-gold transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>

                    <DropdownMenu
                      isOpen={isDropdownOpen}
                      onClose={() => setIsDropdownOpen(false)}
                    />
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-xs xl:text-sm font-medium transition-all duration-300 relative group whitespace-nowrap ${
                        isActive
                          ? "text-gold-500"
                          : "text-white hover:text-gold-400"
                      }`
                    }
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-gold transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button - Only visible on small screens (below lg) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-gold-500 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Only visible on small screens (below lg) */}
        <motion.div
          initial={false}
          animate={
            isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <nav className="flex flex-col space-y-2 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-300 px-4 py-2.5 rounded-lg ${
                    isActive
                      ? link.special
                        ? "text-gold-500 bg-gold-500/20 border-2 border-gold-500"
                        : "text-gold-500"
                      : link.special
                        ? "text-gold-400 hover:text-gold-300 border-2 border-gold-500/40 hover:bg-gold-500/15 transition-all duration-300 flex items-center justify-center"
                        : link.hasDropdown
                          ? "text-white hover:text-gold-400 flex items-center justify-between"
                          : "text-white hover:text-gold-400"
                  }`
                }
              >
                {link.special ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {link.label}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                ) : link.hasDropdown ? (
                  <span className="flex items-center justify-between w-full">
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </span>
                ) : (
                  link.label
                )}
              </NavLink>
            ))}
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
