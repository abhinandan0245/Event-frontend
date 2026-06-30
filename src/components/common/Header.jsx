import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import DropdownMenu from "./DropdownMenu";
import Dropdown from "./Dropdown";
import MobileDestinationsAccordion from "./MobileDestinationsAccordion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const dropdownTimeout = useRef(null);
  const moreTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setIsDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setIsDropdownOpen(false), 200);
  };

  const handleMoreEnter = () => {
    if (moreTimeout.current) clearTimeout(moreTimeout.current);
    setIsMoreOpen(true);
  };
  const handleMoreLeave = () => {
    moreTimeout.current = setTimeout(() => setIsMoreOpen(false), 200);
  };

  // First 5 links shown directly on desktop
  const mainLinks = [
    { path: "/", label: "HOME" },
    { path: "/destinations", label: "DESTINATIONS", hasDropdown: true },
    { path: "/venues", label: "VENUES" },
    { path: "/services", label: "SERVICES" },
    { path: "/portfolio", label: "PORTFOLIO" },
  ];

  // Rest collapsed under "MORE" on desktop
  const moreLinks = [
    { path: "/plan-your-celebration", label: "Plan Your Celebration" },
    { path: "/journal", label: "Journal" },
    { path: "/about", label: "About" },
  ];

  const specialLink = { path: "/contact", label: "CONTACT US", special: true };

  // Full flat list for mobile menu (in order)
  const mobileLinks = [...mainLinks, ...moreLinks, specialLink];

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
            <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold">
              <span className="gradient-gold bg-clip-text text-transparent">VIOLIN</span>
              <span className="text-white text-[8px] sm:text-[10px] md:text-sm ml-1">
                EVENTS LLP
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - md and above */}
          <nav className="hidden md:flex items-center space-x-4 xl:space-x-8">
            {mainLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative"
                onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
                onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
              >
                {link.hasDropdown ? (
                  <div>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `text-xs xl:text-sm font-medium transition-all duration-300 relative group whitespace-nowrap flex items-center gap-1 ${
                          isActive ? "text-gold-500" : "text-white hover:text-gold-400"
                        }`
                      }
                    >
                      {link.label}
                      <motion.span animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-2.5 h-2.5 xl:w-3 xl:h-3" />
                      </motion.span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-gold transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>

                    <DropdownMenu isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-xs xl:text-sm font-medium transition-all duration-300 relative group whitespace-nowrap ${
                        isActive ? "text-gold-500" : "text-white hover:text-gold-400"
                      }`
                    }
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-gold transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                )}
              </motion.div>
            ))}

            {/* MORE dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: mainLinks.length * 0.05 }}
              className="relative"
              onMouseEnter={handleMoreEnter}
              onMouseLeave={handleMoreLeave}
            >
              <button
                className={`text-xs xl:text-sm font-medium transition-all duration-300 relative group whitespace-nowrap flex items-center gap-1 ${
                  isMoreOpen ? "text-gold-500" : "text-white hover:text-gold-400"
                }`}
              >
                MORE
                <motion.span animate={{ rotate: isMoreOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-2.5 h-2.5 xl:w-3 xl:h-3" />
                </motion.span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-gold transition-all duration-300 group-hover:w-full"></span>
              </button>

              <Dropdown isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} items={moreLinks} />
            </motion.div>

            {/* Contact Us - special CTA */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (mainLinks.length + 1) * 0.05 }}
              className="relative"
            >
              <NavLink
                to={specialLink.path}
                className={({ isActive }) =>
                  `relative group px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg font-semibold transition-all duration-300 inline-flex items-center ${
                    isActive
                      ? "text-dark-900 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 shadow-lg shadow-gold-500/40"
                      : "text-gold-400 hover:text-white"
                  }`
                }
              >
                <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-gold-400/60" />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-gold-400/60" />
                <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-gold-400/60" />
                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-gold-400/60" />
                <span className="relative z-10 flex items-center gap-1.5 xl:gap-2 text-xs xl:text-sm">
                  <Sparkles className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                  {specialLink.label}
                  <ArrowRight className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                </span>
              </NavLink>
            </motion.div>
          </nav>

          {/* Mobile Menu Button - below md */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-gold-500 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - below md */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <nav className="flex flex-col py-4">
            {mobileLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.path} className="border-b border-white/5">
                  <button
                    onClick={() => setMobileDestOpen(!mobileDestOpen)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-white hover:text-gold-400"
                  >
                    {link.label}
                    <motion.span animate={{ rotate: mobileDestOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={mobileDestOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <MobileDestinationsAccordion
                      onNavigate={() => {
                        setIsOpen(false);
                        setMobileDestOpen(false);
                      }}
                    />
                  </motion.div>
                </div>
              ) : (
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
                          ? "text-gold-400 hover:text-gold-300 border-2 border-gold-500/40 hover:bg-gold-500/15 transition-all duration-300 flex items-center justify-center mx-4 mt-2"
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
                  ) : (
                    link.label
                  )}
                </NavLink>
              )
            )}
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
