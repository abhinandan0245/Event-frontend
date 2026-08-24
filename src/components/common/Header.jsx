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
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
      if (moreTimeout.current) clearTimeout(moreTimeout.current);
    };
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

  const mainLinks = [
    { path: "/", label: "HOME" },
    { path: "/destinations", label: "DESTINATIONS", hasDropdown: true },
    { path: "/venues", label: "VENUES" },
    { path: "/artist-categories", label: "ARTISTS" },
    { path: "/services", label: "SERVICES" },
    { path: "/portfolio", label: "PORTFOLIO" },
  ];
  
  const moreLinks = [
    { path: "/about", label: "ABOUT" },
    { path: "/journal", label: "JOURNAL" },
    { path: "/plan-your-celebration", label: "PLAN YOUR CELEBRATION" },
  ];

  const specialLink = { path: "/contact", label: "CONTACT US", special: true };
  const mobileLinks = [...mainLinks, ...moreLinks, specialLink];

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ease-out bg-transparent ${
        isScrolled ? "pt-3 md:pt-4" : "pt-5 md:pt-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Logo and Navigation Row - Added items-center for vertical alignment */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center shrink-0 bg-transparent px-4 py-2.5 rounded-full"
          >
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/violin-logo.png"
                alt="Violin Events"
                className="h-8 w-auto md:h-14 object-contain"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation - Added items-center for perfect vertical alignment */}
          <nav className="hidden md:flex items-center bg-[#FAF9F5]/75 backdrop-blur-xl border border-amber-900/10 px-6 py-2 rounded-full shadow-sm shadow-neutral-900/5 relative">
            {/* Inner container with flex items-center for perfect alignment */}
            <div className="flex items-center space-x-6 lg:space-x-8">
              {mainLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="relative group flex items-center py-1"
                  onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
                  onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
                >
                  {link.hasDropdown ? (
                    <>
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `font-manrope text-[11px] font-semibold tracking-[0.18em] transition-colors duration-300 flex items-center gap-1 ${
                            isActive
                              ? "text-amber-800"
                              : "text-neutral-700 hover:text-amber-700"
                          }`
                        }
                      >
                        {link.label}
                        <motion.span
                          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="opacity-60"
                        >
                          <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                        </motion.span>
                      </NavLink>
                      <span className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-amber-700 origin-center scale-x-0 group-hover:scale-x-75 transition-transform duration-300 ease-out" />
                      <DropdownMenu
                        isOpen={isDropdownOpen}
                        onClose={() => setIsDropdownOpen(false)}
                      />
                    </>
                  ) : (
                    <>
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `text-[11px] font-semibold tracking-[0.18em] transition-colors duration-300 ${
                            isActive
                              ? "text-amber-800"
                              : "text-neutral-700 hover:text-amber-700"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                      <span className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-amber-700 origin-center scale-x-0 group-hover:scale-x-75 transition-transform duration-300 ease-out" />
                    </>
                  )}
                </motion.div>
              ))}

              {/* More Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: mainLinks.length * 0.04 }}
                className="relative group flex items-center py-1"
                onMouseEnter={handleMoreEnter}
                onMouseLeave={handleMoreLeave}
              >
                <button
                  className={`text-[11px] font-semibold font-montserrat tracking-[0.18em] transition-colors duration-300 flex items-center gap-1 ${
                    isMoreOpen
                      ? "text-amber-800"
                      : "text-neutral-700 hover:text-amber-700"
                  }`}
                >
                  MORE
                  <motion.span
                    animate={{ rotate: isMoreOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="opacity-60"
                  >
                    <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                  </motion.span>
                </button>
                <span className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-amber-700 origin-center scale-x-0 group-hover:scale-x-75 transition-transform duration-300 ease-out" />
                <Dropdown
                  isOpen={isMoreOpen}
                  onClose={() => setIsMoreOpen(false)}
                  items={moreLinks}
                />
              </motion.div>

              {/* Contact Us Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: (mainLinks.length + 1) * 0.04,
                }}
                className="flex items-center"
              >
                <NavLink
                  to={specialLink.path}
                  className={({ isActive }) =>
                    `relative px-4 py-1.5 rounded-full font-manrope font-semibold tracking-[0.18em] text-[10px] uppercase transition-all duration-500 inline-flex items-center overflow-hidden border ${
                      isActive
                        ? "text-white bg-neutral-900 border-neutral-900 shadow-sm"
                        : "text-amber-800 border-neutral-300 hover:border-amber-700 hover:bg-neutral-900 hover:text-white"
                    }`
                  }
                >
                  <span className="relative z-10 flex items-center gap-1.5 font-montserrat">
                    <Sparkles className="w-3 h-3 stroke-[1.5]" />
                    {specialLink.label}
                    <ArrowRight className="w-3 h-3 stroke-[2]" />
                  </span>
                </NavLink>
              </motion.div>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden bg-[#FAF9F5]/75 backdrop-blur-xl border border-amber-900/10 w-11 h-11 rounded-full flex items-center justify-center shadow-sm z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-800 hover:text-amber-700 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={18} className="stroke-[2]" />
              ) : (
                <Menu size={18} className="stroke-[2]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <motion.div
          initial={false}
          animate={
            isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden overflow-hidden bg-[#FAF9F5]/95 backdrop-blur-2xl rounded-2xl mt-3 border border-neutral-200/40"
        >
          {/* Mobile Logo */}
          <div className="flex items-center justify-center py-4 border-b border-neutral-100">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
              <img
                src="/violin-logo.png"
                alt="Violin Events"
                className="h-10 w-auto object-contain"
              />
              <span className="font-cormorant text-xl font-medium tracking-[0.25em] text-neutral-900">
                VIOLIN
              </span>
            </Link>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col py-4 px-2">
            {mobileLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.path} className="border-b border-neutral-100">
                  <button
                    onClick={() => setMobileDestOpen(!mobileDestOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-800"
                  >
                    {link.label}
                    <motion.span
                      animate={{ rotate: mobileDestOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={
                      mobileDestOpen
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden bg-neutral-50/50"
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
                    `text-[11px] font-semibold tracking-[0.15em] uppercase px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? link.special
                          ? "text-white bg-neutral-900"
                          : "text-amber-800 bg-amber-950/5"
                        : link.special
                          ? "text-amber-800 border border-neutral-200 hover:border-amber-700 mx-4 mt-3 text-center flex items-center justify-center gap-2 py-3 rounded-full"
                          : "text-neutral-600 hover:text-amber-700"
                    }`
                  }
                >
                  {link.special ? (
                    <span className="flex items-center gap-2 justify-center">
                      <Sparkles className="w-3 h-3 text-amber-700" />
                      {link.label}
                      <ArrowRight className="w-3 h-3" />
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