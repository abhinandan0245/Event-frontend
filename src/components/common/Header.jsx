// import { useState, useEffect, useRef } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Menu, X, Sparkles, ArrowRight, ChevronDown } from "lucide-react";
// import DropdownMenu from "./DropdownMenu";
// import Dropdown from "./Dropdown";
// import MobileDestinationsAccordion from "./MobileDestinationsAccordion";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMoreOpen, setIsMoreOpen] = useState(false);
//   const [mobileDestOpen, setMobileDestOpen] = useState(false);
//   const dropdownTimeout = useRef(null);
//   const moreTimeout = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleMouseEnter = () => {
//     if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
//     setIsDropdownOpen(true);
//   };
//   const handleMouseLeave = () => {
//     dropdownTimeout.current = setTimeout(() => setIsDropdownOpen(false), 200);
//   };

//   const handleMoreEnter = () => {
//     if (moreTimeout.current) clearTimeout(moreTimeout.current);
//     setIsMoreOpen(true);
//   };
//   const handleMoreLeave = () => {
//     moreTimeout.current = setTimeout(() => setIsMoreOpen(false), 200);
//   };

//   // First 5 links shown directly on desktop
//   const mainLinks = [
//     { path: "/", label: "HOME" },
//     { path: "/destinations", label: "DESTINATIONS", hasDropdown: true },
//     { path: "/venues", label: "VENUES" },
//     { path: "/services", label: "SERVICES" },
//     { path: "/portfolio", label: "PORTFOLIO" },
//   ];

//   // Rest collapsed under "MORE" on desktop
//   const moreLinks = [
//     { path: "/plan-your-celebration", label: "Plan Your Celebration" },
//     { path: "/journal", label: "Journal" },
//     { path: "/about", label: "About" },
//   ];

//   const specialLink = { path: "/contact", label: "CONTACT US", special: true };

//   // Full flat list for mobile menu (in order)
//   const mobileLinks = [...mainLinks, ...moreLinks, specialLink];

//   return (
//     <header
//       className={`fixed w-full z-50 transition-all duration-500 ${
//         isScrolled
//           ? "bg-dark-900/95 backdrop-blur-lg shadow-lg py-2"
//           : "bg-transparent py-3 md:py-4"
//       }`}
//     >
//       <div className="container-custom px-4 sm:px-6">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex items-center shrink-0"
//           >
//             <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold">
//               <span className="gradient-gold bg-clip-text text-transparent">VIOLIN</span>
//               <span className="text-white text-[8px] sm:text-[10px] md:text-sm ml-1">
//                 EVENTS LLP
//               </span>
//             </Link>
//           </motion.div>

//           {/* Desktop Navigation - md and above */}
//           <nav className="hidden md:flex items-center space-x-4 xl:space-x-8">
//             {mainLinks.map((link, index) => (
//               <motion.div
//                 key={link.path}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.05 }}
//                 className="relative"
//                 onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
//                 onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
//               >
//                 {link.hasDropdown ? (
//                   <div>
//                     <NavLink
//                       to={link.path}
//                       className={({ isActive }) =>
//                         `text-xs xl:text-sm font-medium transition-all duration-300 relative group whitespace-nowrap flex items-center gap-1 ${
//                           isActive ? "text-gold-500" : "text-white hover:text-gold-400"
//                         }`
//                       }
//                     >
//                       {link.label}
//                       <motion.span animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
//                         <ChevronDown className="w-2.5 h-2.5 xl:w-3 xl:h-3" />
//                       </motion.span>
//                       <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-gold transition-all duration-300 group-hover:w-full"></span>
//                     </NavLink>

//                     <DropdownMenu isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
//                   </div>
//                 ) : (
//                   <NavLink
//                     to={link.path}
//                     className={({ isActive }) =>
//                       `text-xs xl:text-sm font-medium transition-all duration-300 relative group whitespace-nowrap ${
//                         isActive ? "text-gold-500" : "text-white hover:text-gold-400"
//                       }`
//                     }
//                   >
//                     {link.label}
//                     <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-gold transition-all duration-300 group-hover:w-full"></span>
//                   </NavLink>
//                 )}
//               </motion.div>
//             ))}

//             {/* MORE dropdown */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: mainLinks.length * 0.05 }}
//               className="relative"
//               onMouseEnter={handleMoreEnter}
//               onMouseLeave={handleMoreLeave}
//             >
//               <button
//                 className={`text-xs xl:text-sm font-medium transition-all duration-300 relative group whitespace-nowrap flex items-center gap-1 ${
//                   isMoreOpen ? "text-gold-500" : "text-white hover:text-gold-400"
//                 }`}
//               >
//                 MORE
//                 <motion.span animate={{ rotate: isMoreOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
//                   <ChevronDown className="w-2.5 h-2.5 xl:w-3 xl:h-3" />
//                 </motion.span>
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-gold transition-all duration-300 group-hover:w-full"></span>
//               </button>

//               <Dropdown isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} items={moreLinks} />
//             </motion.div>

//             {/* Contact Us - special CTA */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: (mainLinks.length + 1) * 0.05 }}
//               className="relative"
//             >
//               <NavLink
//                 to={specialLink.path}
//                 className={({ isActive }) =>
//                   `relative group px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg font-semibold transition-all duration-300 inline-flex items-center ${
//                     isActive
//                       ? "text-dark-900 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 shadow-lg shadow-gold-500/40"
//                       : "text-gold-400 hover:text-white"
//                   }`
//                 }
//               >
//                 <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-gold-400/60" />
//                 <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-gold-400/60" />
//                 <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-gold-400/60" />
//                 <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-gold-400/60" />
//                 <span className="relative z-10 flex items-center gap-1.5 xl:gap-2 text-xs xl:text-sm">
//                   <Sparkles className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
//                   {specialLink.label}
//                   <ArrowRight className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
//                 </span>
//               </NavLink>
//             </motion.div>
//           </nav>

//           {/* Mobile Menu Button - below md */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden text-white hover:text-gold-500 transition-colors p-2"
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation - below md */}
//         <motion.div
//           initial={false}
//           animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="md:hidden overflow-hidden"
//         >
//           <nav className="flex flex-col py-4">
//             {mobileLinks.map((link) =>
//               link.hasDropdown ? (
//                 <div key={link.path} className="border-b border-white/5">
//                   <button
//                     onClick={() => setMobileDestOpen(!mobileDestOpen)}
//                     className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-white hover:text-gold-400"
//                   >
//                     {link.label}
//                     <motion.span animate={{ rotate: mobileDestOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
//                       <ChevronDown className="w-4 h-4" />
//                     </motion.span>
//                   </button>
//                   <motion.div
//                     initial={false}
//                     animate={mobileDestOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
//                     transition={{ duration: 0.25 }}
//                     className="overflow-hidden"
//                   >
//                     <MobileDestinationsAccordion
//                       onNavigate={() => {
//                         setIsOpen(false);
//                         setMobileDestOpen(false);
//                       }}
//                     />
//                   </motion.div>
//                 </div>
//               ) : (
//                 <NavLink
//                   key={link.path}
//                   to={link.path}
//                   onClick={() => setIsOpen(false)}
//                   className={({ isActive }) =>
//                     `text-sm font-medium transition-all duration-300 px-4 py-2.5 rounded-lg ${
//                       isActive
//                         ? link.special
//                           ? "text-gold-500 bg-gold-500/20 border-2 border-gold-500"
//                           : "text-gold-500"
//                         : link.special
//                           ? "text-gold-400 hover:text-gold-300 border-2 border-gold-500/40 hover:bg-gold-500/15 transition-all duration-300 flex items-center justify-center mx-4 mt-2"
//                           : "text-white hover:text-gold-400"
//                     }`
//                   }
//                 >
//                   {link.special ? (
//                     <span className="flex items-center gap-2">
//                       <Sparkles className="w-4 h-4" />
//                       {link.label}
//                       <ArrowRight className="w-4 h-4" />
//                     </span>
//                   ) : (
//                     link.label
//                   )}
//                 </NavLink>
//               )
//             )}
//           </nav>
//         </motion.div>
//       </div>
//     </header>
//   );
// };

// export default Header;


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
    { path: "/services", label: "SERVICES" },
    { path: "/portfolio", label: "PORTFOLIO" },
  ];

  const moreLinks = [
    { path: "/plan-your-celebration", label: "Plan Your Celebration" },
    { path: "/journal", label: "Journal" },
    { path: "/about", label: "About" },
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
        <div className="flex items-center justify-between">
          
          {/* ─── CAPSULE 1: THE LOGO ISLAND ─── */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center shrink-0 bg-[#FAF9F5]/75 backdrop-blur-xl border border-amber-900/10 px-5 py-2.5 rounded-full shadow-sm shadow-neutral-900/5 hover:border-amber-700/30 transition-colors duration-300"
          >
            <Link to="/" className="flex items-baseline gap-1.5 group">
              <h1 className="text-lg md:text-xl font-serif font-light tracking-[0.25em] text-neutral-900 transition-colors group-hover:text-amber-800">
                VIOLIN
              </h1>
              <span className="text-neutral-400 font-sans tracking-widest font-semibold text-[9px] md:text-[10px]">
                EVENTS LLP
              </span>
            </Link>
          </motion.div>

          {/* ─── CAPSULE 2: THE NAVIGATION ISLAND (DESKTOP) ─── */}
          <nav 
            className="hidden md:flex items-center space-x-6 lg:space-x-8 bg-[#FAF9F5]/75 backdrop-blur-xl border border-amber-900/10 px-6 py-2 rounded-full shadow-sm shadow-neutral-900/5 relative"
          >
            {mainLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="relative group py-1.5"
                onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
                onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
              >
                {link.hasDropdown ? (
                  <>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `text-[11px] font-semibold tracking-[0.18em] transition-colors duration-300 flex items-center gap-1 ${
                          isActive ? "text-amber-800" : "text-neutral-700 hover:text-amber-700"
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
                    <DropdownMenu isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
                  </>
                ) : (
                  <>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `text-[11px] font-semibold tracking-[0.18em] transition-colors duration-300 ${
                          isActive ? "text-amber-800" : "text-neutral-700 hover:text-amber-700"
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

            {/* MORE Dropdown inside navigation block */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: mainLinks.length * 0.04 }}
              className="relative group py-1.5"
              onMouseEnter={handleMoreEnter}
              onMouseLeave={handleMoreLeave}
            >
              <button
                className={`text-[11px] font-semibold tracking-[0.18em] transition-colors duration-300 flex items-center gap-1 ${
                  isMoreOpen ? "text-amber-800" : "text-neutral-700 hover:text-amber-700"
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
              <Dropdown isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} items={moreLinks} />
            </motion.div>

            {/* Contact Us Embedded Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: (mainLinks.length + 1) * 0.04 }}
              className="pl-2"
            >
              <NavLink
                to={specialLink.path}
                className={({ isActive }) =>
                  `relative px-4 py-1.5 rounded-full font-sans font-semibold tracking-[0.18em] text-[10px] uppercase transition-all duration-500 inline-flex items-center overflow-hidden border ${
                    isActive
                      ? "text-white bg-neutral-900 border-neutral-900 shadow-sm"
                      : "text-amber-800 border-neutral-300 hover:border-amber-700 hover:bg-neutral-900 hover:text-white"
                  }`
                }
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 stroke-[1.5]" />
                  {specialLink.label}
                  <ArrowRight className="w-3 h-3 stroke-[2]" />
                </span>
              </NavLink>
            </motion.div>
          </nav>

          {/* ─── CAPSULE 3: MOBILE INTERACTION TRIGGER ISLAND ─── */}
          <div className="md:hidden bg-[#FAF9F5]/75 backdrop-blur-xl border border-amber-900/10 w-11 h-11 rounded-full flex items-center justify-center shadow-sm z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-800 hover:text-amber-700 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} className="stroke-[2]" /> : <Menu size={18} className="stroke-[2]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer System */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden overflow-hidden bg-[#FAF9F5]/95 backdrop-blur-2xl rounded-2xl mt-3 border border-neutral-200/40"
        >
          <nav className="flex flex-col py-4 px-2">
            {mobileLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.path} className="border-b border-neutral-100">
                  <button
                    onClick={() => setMobileDestOpen(!mobileDestOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-800"
                  >
                    {link.label}
                    <motion.span animate={{ rotate: mobileDestOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={mobileDestOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
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