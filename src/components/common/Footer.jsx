import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MapPin, Phone, Mail, ChevronRight, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/destinations", label: "Destinations" },
    { path: "/venues", label: "Venues" },
    { path: "/services", label: "Services" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaYoutube, href: "#", label: "Youtube" },
  ];

  return (
    <footer
      className="relative w-full overflow-hidden text-neutral-800"
      style={{
        backgroundColor: "#FAF9F5", // Canvas luxury alabaster white
        borderTop: "1px solid rgba(180, 140, 80, 0.2)", // Fine golden top accent split
      }}
    >
      {/* Soft background ambient lighting map layer */}
      <div
        className="absolute top-0 left-1/4 w-[400px] h-[400px] pointer-events-none rounded-full blur-[100px] z-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(245,238,220,0.8) 0%, rgba(245,238,220,0) 70%)",
        }}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Presentation Deck */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-serif font-light tracking-[0.25em] text-neutral-900 uppercase">
                VIOLIN
                <span className="text-[10px] tracking-widest text-amber-800 font-sans font-semibold ml-2 block sm:inline">
                  EVENTS LLP
                </span>
              </h2>
            </Link>

            <p className="text-xs text-neutral-500 font-light leading-relaxed tracking-wide max-w-xs">
              Crafting extraordinary milestone experiences across India's most
              magnificent heritages. From royal palaces to serene horizons, we
              manifest architectural perfection.
            </p>

            {/* Premium Social Media Icons Grid */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-9 h-9 rounded-full bg-white border border-neutral-200/80 hover:border-amber-700/50 hover:bg-neutral-900 hover:text-white flex items-center justify-center text-neutral-600 transition-colors duration-300 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon size={13} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-3 bg-amber-700/40 rounded-full" />
              Navigation
            </h3>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs text-neutral-500 hover:text-amber-800 transition-colors flex items-center group font-light tracking-wide"
                  >
                    <ChevronRight
                      size={12}
                      className="mr-1.5 opacity-40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber-700 group-hover:opacity-100"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-3 bg-amber-700/40 rounded-full" />
              Inquiries
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3.5 text-xs text-neutral-500 font-light tracking-wide group">
                <div className="w-8 h-8 rounded-full bg-amber-950/5 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-800 group-hover:text-white transition-colors duration-300">
                  <MapPin
                    size={14}
                    className="text-amber-800 group-hover:text-white transition-colors"
                  />
                </div>
                <span className="mt-2">Jaipur, Rajasthan, India</span>
              </li>
              <li className="flex items-start space-x-3.5 text-xs text-neutral-500 font-light tracking-wide group">
                <div className="w-8 h-8 rounded-full bg-amber-950/5 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-800 group-hover:text-white transition-colors duration-300">
                  <Phone
                    size={14}
                    className="text-amber-800 group-hover:text-white transition-colors"
                  />
                </div>
                <span className="mt-2">+91 98765 43210</span>
              </li>
              <li className="flex items-start space-x-3.5 text-xs text-neutral-500 font-light tracking-wide group">
                <div className="w-8 h-8 rounded-full bg-amber-950/5 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-800 group-hover:text-white transition-colors duration-300">
                  <Mail
                    size={14}
                    className="text-amber-800 group-hover:text-white transition-colors"
                  />
                </div>
                <span className="mt-2">info@violinevents.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Time Framework Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-3 bg-amber-700/40 rounded-full" />
              Availability
            </h3>
            <div className="space-y-3.5 text-xs font-light tracking-wide text-neutral-500">
              <div className="flex justify-between border-b border-neutral-200/40 pb-2">
                <span>Mon — Sat</span>
                <span className="text-neutral-800 font-medium">
                  9:00 AM — 8:00 PM
                </span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Sunday</span>
                <span className="text-amber-700 font-medium">
                  By Appointment Only
                </span>
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-800 tracking-wider uppercase">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  <span>Concerted Concierge 24/7</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Metadata bar */}
        <div className="border-t border-neutral-200/60 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-neutral-400 font-light tracking-wider uppercase">
            © {currentYear}{" "}
            <span className="text-amber-800 font-medium tracking-widest">
              VIOLIN EVENTS LLP
            </span>
            . All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-[10px] tracking-widest uppercase font-medium text-neutral-400">
            <Link to="#" className="hover:text-amber-800 transition-colors">
              Privacy Policy
            </Link>
            <span className="opacity-30">|</span>
            <Link to="#" className="hover:text-amber-800 transition-colors">
              Terms of Service
            </Link>
            <span className="opacity-30">|</span>
            <Link to="#" className="hover:text-amber-800 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
