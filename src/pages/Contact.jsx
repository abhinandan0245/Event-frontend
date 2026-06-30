import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  User,
  MessageCircle,
  Heart,
  Star,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Button from "../components/ui/Button";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    destination: "",
    celebrationType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: "",
        destination: "",
        celebrationType: "",
        message: "",
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 98765 43210", "Mon – Sat | 10 AM – 7 PM"],
      highlight: "+91 98765 43210",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@violinevents.com", "We reply within 24 hours"],
      highlight: "hello@violinevents.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        "Violin Events LLP",
        "Ward, Mumbai – 400008",
        "Maharashtra, India",
      ],
      highlight: "Get Directions",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["+91 98765 43210", "Chat with our team"],
      highlight: "+91 98765 43210",
    },
  ];

  const whyChooseUs = [
    {
      icon: Heart,
      title: "Personalised Approach",
      description: "Every celebration is unique and we treat it that way.",
    },
    {
      icon: Sparkles,
      title: "Creative & Detail-Oriented",
      description: "We obsess over every detail to make your day perfect.",
    },
    {
      icon: Users,
      title: "Trusted by 100+ Families",
      description: "Our track record speaks for itself with happy clients.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&h=900&fit=crop&q=80"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-pink-300" />
              <span className="text-pink-200 text-xs sm:text-sm font-semibold tracking-wider">
                VIOLIN EVENTS LLP • CREATING TIMELESS CELEBRATIONS
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Let's Create
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 mt-2">
                Something Extraordinary
              </span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
              We would love to hear about your dream celebration. Reach out to
              us and let's start planning your unforgettable moments together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              We're Here For You
            </span>
            <h2 className="text-3xl font-bold text-black mt-2">Get in Touch</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-500 transition-colors duration-300">
                  <info.icon className="w-6 h-6 text-pink-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p
                    key={idx}
                    className={`text-black text-sm ${
                      idx === 0 ? "font-semibold" : "text-gray-500"
                    }`}
                  >
                    {detail}
                  </p>
                ))}
                {info.highlight && (
                  <button className="text-pink-500 text-xs font-semibold mt-2 flex items-center hover:gap-2 transition-all group-hover:gap-2">
                    {info.highlight}
                    <ChevronRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Let's Plan Your Celebration
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black mt-2">
              Schedule a Consultation
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    Thank You! 🎉
                  </h3>
                  <p className="text-gray-600">
                    Our team will get in touch with you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-pink-500 font-semibold hover:underline"
                  >
                    Send Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-1">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-1">
                        Your Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-1">
                        Number of Guests
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select range</option>
                        <option value="10-50">10-50</option>
                        <option value="50-100">50-100</option>
                        <option value="100-250">100-250</option>
                        <option value="250-500">250-500</option>
                        <option value="500+">500+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-1">
                        Preferred Destination
                      </label>
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="e.g., Udaipur, Goa"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-1">
                      Celebration Type
                    </label>
                    <select
                      name="celebrationType"
                      value={formData.celebrationType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Reception">Reception</option>
                      <option value="Sangeet">Sangeet</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-1">
                      Tell us about your dream celebration...
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Share your vision, special requests, or any questions..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3.5 shadow-lg shadow-pink-500/30 group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        SENDING...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        SEND ENQUIRY
                        <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Right Side - Map & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Map */}
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.681550258294!2d72.831111!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9a4a4c4c4c1%3A0x1c1c1c1c1c1c1c1c!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Office Address */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-black mb-2">
                  Find Our Office
                </h3>
                <p className="text-gray-600 text-sm">
                  Violin Events LLP
                  <br />
                  Office No. 12, 1st Floor,
                  <br />
                  Siddhivinayak Vision One,
                  <br />
                  Dr. Arvind Beant Road,
                  <br />
                  Ward, Mumbai – 400008
                </p>
                <button className="text-pink-500 font-semibold text-sm mt-3 flex items-center hover:gap-2 transition-all group">
                  GET DIRECTIONS
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-2xl border border-pink-100">
                <h3 className="text-lg font-bold text-black mb-4">
                  Why Client Love Working With Us
                </h3>
                <div className="space-y-4">
                  {whyChooseUs.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-pink-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black text-sm">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-bold text-black mb-3">
                PLAN YOUR CELEBRATION
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <button className="hover:text-pink-500 transition-colors">
                    Schedule a Consultation
                  </button>
                </li>
                <li>
                  <button className="hover:text-pink-500 transition-colors">
                    Download Brochure
                  </button>
                </li>
                <li>
                  <button className="hover:text-pink-500 transition-colors">
                    Wedding Checklist
                  </button>
                </li>
                <li>
                  <button className="hover:text-pink-500 transition-colors">
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-black mb-3">JOURNAL</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <button className="hover:text-pink-500 transition-colors">
                    Wedding Trends
                  </button>
                </li>
                <li>
                  <button className="hover:text-pink-500 transition-colors">
                    Planning Tips
                  </button>
                </li>
                <li>
                  <button className="hover:text-pink-500 transition-colors">
                    Real Weddings
                  </button>
                </li>
                <li>
                  <button className="hover:text-pink-500 transition-colors">
                    Inspiration
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-black mb-3">CONTACT</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-pink-500" />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-pink-500" />
                  hello@violinevents.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-pink-500" />
                  Mumbai, India
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-black mb-3">FOLLOW US</h4>
              <div className="flex gap-3">
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
                  <FaYoutube className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                We design and execute extraordinary weddings and celebrations
                across the world with creativity, elegance and perfection.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>© 2024 Violin Events LLP. All Rights Reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <button className="hover:text-pink-500 transition-colors">
                Privacy Policy
              </button>
              <span className="text-gray-300">|</span>
              <button className="hover:text-pink-500 transition-colors">
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
