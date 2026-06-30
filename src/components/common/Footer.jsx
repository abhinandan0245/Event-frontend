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
    {
      icon: FaFacebookF,
      href: "#",
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    {
      icon: FaInstagram,
      href: "#",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    {
      icon: FaTwitter,
      href: "#",
      label: "Twitter",
      color: "hover:bg-blue-400",
    },
    { icon: FaYoutube, href: "#", label: "Youtube", color: "hover:bg-red-600" },
  ];

  return (
    <footer className="bg-dark-900 text-white relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />

      {/* Main Footer */}
      <div className="container-custom relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-playfair font-bold">
                <span className="gradient-gold bg-clip-text text-transparent">
                  VIOLIN
                </span>
                <span className="text-white/60 text-sm ml-1">EVENTS LLP</span>
              </h2>
            </Link>
            <p className="text-dark-300 text-sm leading-relaxed max-w-xs">
              Crafting extraordinary events across India's most magnificent
              destinations. From royal palaces to pristine beaches, we create
              memories that last forever.
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-dark-700/50 backdrop-blur-sm rounded-full flex items-center justify-center ${social.color} transition-all duration-300 border border-white/5 hover:border-white/20`}
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-300 hover:text-gold-500 transition-colors flex items-center group text-sm"
                  >
                    <ChevronRight
                      size={14}
                      className="mr-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-500"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-dark-300 text-sm group">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <MapPin size={16} className="text-gold-500" />
                </div>
                <span className="mt-1.5">Jaipur, Rajasthan, India</span>
              </li>
              <li className="flex items-center space-x-3 text-dark-300 text-sm group">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <Phone size={16} className="text-gold-500" />
                </div>
                <span className="mt-0.5">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-dark-300 text-sm group">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <Mail size={16} className="text-gold-500" />
                </div>
                <span className="mt-0.5">info@violinevents.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Opening Hours / Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full" />
              Working Hours
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-dark-300">
                <span>Monday - Saturday</span>
                <span className="text-white/80">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between text-sm text-dark-300">
                <span>Sunday</span>
                <span className="text-gold-400">By Appointment</span>
              </div>
              <div className="pt-4 mt-2 border-t border-white/5">
                <div className="flex items-center gap-2 text-sm text-gold-400">
                  <Sparkles size={14} />
                  <span>Available 24/7 for inquiries</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-dark-400 text-sm">
            © {currentYear}{" "}
            <span className="text-gold-500">VIOLIN EVENTS LLP</span>. All rights
            reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              to="#"
              className="text-dark-400 hover:text-gold-500 text-xs transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <span className="text-dark-600 text-xs">|</span>
            <Link
              to="#"
              className="text-dark-400 hover:text-gold-500 text-xs transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <span className="text-dark-600 text-xs">|</span>
            <Link
              to="#"
              className="text-dark-400 hover:text-gold-500 text-xs transition-colors duration-300"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
