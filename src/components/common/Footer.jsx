import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/destinations", label: "Destinations" },
    { path: "/venues", label: "Venues" },
    { path: "/services", label: "Services" },
    { path: "/portfolio", label: "Portfolio" },
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
    <footer className="bg-dark-900 text-white">
      {/* Main Footer */}
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-playfair font-bold mb-4">
              <span className="gradient-gold bg-clip-text text-transparent">
                VIOLIN
              </span>
              <span className="text-sm ml-1">EVENTS LLP</span>
            </h2>
            <p className="text-dark-300 text-sm mb-6">
              Crafting extraordinary events across India's most magnificent
              destinations. From royal palaces to pristine beaches, we create
              memories that last forever.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className={`w-10 h-10 bg-dark-700 rounded-full flex items-center justify-center ${social.color} transition-all duration-300`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
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
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-300 hover:text-gold-500 transition-colors flex items-center group"
                  >
                    <ChevronRight
                      size={16}
                      className="mr-2 transition-transform group-hover:translate-x-1"
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
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-dark-300">
                <MapPin
                  size={20}
                  className="text-gold-500 flex-shrink-0 mt-1"
                />
                <span>Jaipur, Rajasthan, India</span>
              </li>
              <li className="flex items-center space-x-3 text-dark-300">
                <Phone size={20} className="text-gold-500 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-dark-300">
                <Mail size={20} className="text-gold-500 flex-shrink-0" />
                <span>info@violinevents.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-dark-300 text-sm mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-3 bg-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 gradient-gold text-dark-900 font-semibold rounded-lg hover:shadow-xl transition-all"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-dark-400 text-sm">
            © {currentYear} VIOLIN EVENTS LLP. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="#"
              className="text-dark-400 hover:text-gold-500 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-dark-400 hover:text-gold-500 text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
