import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {
  User,
  Users,
  Mail,
  Phone,
  Sparkles,
  Calendar,
  MessageCircle,
  Send,
  CheckCircle,
  Loader2,
  PartyPopper,
  Gift,
  Star,
  ArrowRight,
  X,
} from "lucide-react";
import Button from "../ui/Button";

// Import DatePicker CSS
import "react-datepicker/dist/react-datepicker.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: null,
    date: null,
    guests: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shake, setShake] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);

  const eventOptions = [
    { value: "wedding", label: "💍 Wedding", emoji: "💍" },
    { value: "engagement", label: "💕 Engagement Party", emoji: "💕" },
    { value: "birthday", label: "🎂 Birthday Party", emoji: "🎂" },
    { value: "corporate", label: "🏢 Corporate Event", emoji: "🏢" },
    { value: "destination", label: "✈️ Destination Wedding", emoji: "✈️" },
    { value: "anniversary", label: "💑 Anniversary", emoji: "💑" },
    { value: "other", label: "🎉 Other", emoji: "🎉" },
  ];

  const guestOptions = [
    { value: "10-50", label: "👥 10 - 50 Guests" },
    { value: "50-100", label: "👥 50 - 100 Guests" },
    { value: "100-250", label: "👥 100 - 250 Guests" },
    { value: "250-500", label: "👥 250 - 500 Guests" },
    { value: "500+", label: "👥 500+ Guests" },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#F5B400" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(245, 180, 0, 0.2)" : "none",
      "&:hover": {
        borderColor: "#F5B400",
      },
      borderRadius: "0.75rem",
      padding: "0.25rem",
      minHeight: "52px",
      transition: "all 0.3s ease",
      background: state.isFocused
        ? "linear-gradient(to right, rgba(245, 180, 0, 0.05), white)"
        : "white",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#F5B400"
        : state.isFocused
          ? "#FFF9E6"
          : "white",
      color: state.isSelected ? "white" : "#1a1a1a",
      "&:hover": {
        backgroundColor: "#FFF9E6",
      },
      padding: "10px 16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.75rem",
      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
      overflow: "hidden",
    }),
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selected, name) => {
    setFormData({
      ...formData,
      [name]: selected,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Shake animation for errors
  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.eventType ||
      !formData.message
    ) {
      triggerShake();
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: null,
        date: null,
        guests: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  // Floating particles background
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2,
  }));

  return (
    <motion.div
      ref={formRef}
      className="relative bg-white p-8 rounded-3xl shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gold-500/10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Decorative Gold Line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Header with animated icons */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <PartyPopper className="w-8 h-8 text-gold-500" />
          </motion.div>
          <h2 className="text-3xl font-playfair font-bold text-dark-900">
            Send Us a Message
          </h2>
        </div>
        <p className="text-dark-600 ml-11">
          Fill in the details below and we'll get back to you within 24 hours.
        </p>
      </motion.div>

      {/* Success Message */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="relative z-10 mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-lg"
          >
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
              </motion.div>
              <div className="flex-1">
                <p className="font-semibold text-green-800 text-lg">
                  🎉 Thank you for reaching out!
                </p>
                <p className="text-green-700 text-sm">
                  We'll get back to you within 24 hours.
                </p>
                <motion.div
                  className="mt-2 flex gap-2 flex-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3" /> Expert team
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <Gift className="w-3 h-3" /> Special offer
                  </span>
                </motion.div>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-green-500 hover:text-green-700 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form with Shake Animation */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 space-y-5"
        animate={
          shake
            ? {
                x: [-10, 10, -10, 10, -5, 5, 0],
                transition: { duration: 0.5 },
              }
            : {}
        }
      >
        {/* Name & Email */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="group">
            <label className="block text-sm font-medium text-dark-700 mb-1 flex items-center gap-1">
              <User className="w-4 h-4 text-gold-500" />
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                required
                className={`w-full pl-4 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  focusedField === "name"
                    ? "border-gold-500 shadow-lg shadow-gold-500/20 scale-[1.02]"
                    : "border-gray-200 hover:border-gold-300"
                }`}
                placeholder="Enter your full name"
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focusedField === "name" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="group">
            <label className="block text-sm font-medium text-dark-700 mb-1 flex items-center gap-1">
              <Mail className="w-4 h-4 text-gold-500" />
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                required
                className={`w-full pl-4 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  focusedField === "email"
                    ? "border-gold-500 shadow-lg shadow-gold-500/20 scale-[1.02]"
                    : "border-gray-200 hover:border-gold-300"
                }`}
                placeholder="your@email.com"
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Phone & Event Type */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="group">
            <label className="block text-sm font-medium text-dark-700 mb-1 flex items-center gap-1">
              <Phone className="w-4 h-4 text-gold-500" />
              Phone Number *
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus("phone")}
                onBlur={handleBlur}
                required
                className={`w-full pl-4 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  focusedField === "phone"
                    ? "border-gold-500 shadow-lg shadow-gold-500/20 scale-[1.02]"
                    : "border-gray-200 hover:border-gold-300"
                }`}
                placeholder="+91 98765 43210"
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focusedField === "phone" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="group">
            <label className="block text-sm font-medium text-dark-700 mb-1 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-gold-500" />
              Event Type *
            </label>
            <Select
              options={eventOptions}
              value={formData.eventType}
              onChange={(selected) => handleSelectChange(selected, "eventType")}
              styles={customStyles}
              placeholder="🎯 Select event type"
              className="react-select-container"
              classNamePrefix="react-select"
              required
              onFocus={() => handleFocus("eventType")}
              onBlur={handleBlur}
            />
          </div>
        </motion.div>

        {/* Date & Guests */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="group">
            <label className="block text-sm font-medium text-dark-700 mb-1 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gold-500" />
              Event Date
            </label>
            <div className="relative">
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="📅 Select event date"
                className={`w-full pl-4 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 cursor-pointer ${
                  formData.date
                    ? "border-gold-500 bg-gold-50/30"
                    : "border-gray-200 hover:border-gold-300"
                }`}
                minDate={new Date()}
                popperPlacement="bottom-start"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={15}
                onFocus={() => handleFocus("date")}
                onBlur={handleBlur}
              />
              {formData.date && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </div>
          </div>
          <div className="group">
            <label className="block text-sm font-medium text-dark-700 mb-1 flex items-center gap-1">
              <Users className="w-4 h-4 text-gold-500" />
              Number of Guests
            </label>
            <Select
              options={guestOptions}
              value={formData.guests}
              onChange={(selected) => handleSelectChange(selected, "guests")}
              styles={customStyles}
              placeholder="👥 Select guest range"
              className="react-select-container"
              classNamePrefix="react-select"
              onFocus={() => handleFocus("guests")}
              onBlur={handleBlur}
            />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-dark-700 mb-1 flex items-center gap-1">
            <MessageCircle className="w-4 h-4 text-gold-500" />
            Your Message *
          </label>
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => handleFocus("message")}
              onBlur={handleBlur}
              required
              rows="4"
              className={`w-full pl-4 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 resize-none ${
                focusedField === "message"
                  ? "border-gold-500 shadow-lg shadow-gold-500/20 scale-[1.01]"
                  : "border-gray-200 hover:border-gold-300"
              }`}
              placeholder="✨ Tell us about your dream event..."
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Submit & Reset Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="flex-1 py-4 text-base group relative overflow-hidden"
          >
            <motion.span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </>
              )}
            </span>
          </Button>

          <motion.button
            type="reset"
            onClick={() => {
              setFormData({
                name: "",
                email: "",
                phone: "",
                eventType: null,
                date: null,
                guests: "",
                message: "",
              });
            }}
            className="px-6 py-3.5 border-2 border-gray-200 rounded-xl text-gray-500 hover:text-dark-700 hover:border-gold-300 transition-all duration-300 flex items-center justify-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            Clear All
          </motion.button>
        </motion.div>

        {/* Character Counter */}
        {formData.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-right text-xs text-gray-400"
          >
            {formData.message.length} characters
          </motion.div>
        )}

        {/* Trust Badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-500" />
            Secure & Confidential
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-500" />
            Response within 24hrs
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-500" />
            100% Satisfaction
          </span>
        </motion.div>
      </motion.form>

      {/* Custom CSS for DatePicker and Select */}
      <style jsx global>{`
        .react-select-container .react-select__control {
          min-height: 52px !important;
          border-radius: 0.75rem !important;
          border-width: 2px !important;
          transition: all 0.3s ease !important;
        }
        .react-select-container .react-select__control:hover {
          border-color: #f5b400 !important;
        }
        .react-select-container .react-select__control--is-focused {
          border-color: #f5b400 !important;
          box-shadow: 0 0 0 3px rgba(245, 180, 0, 0.2) !important;
        }
        .react-select-container .react-select__placeholder {
          color: #9ca3af !important;
        }
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker__header {
          background: linear-gradient(to right, #f5b400, #f7c333) !important;
          border-radius: 0.75rem 0.75rem 0 0 !important;
        }
        .react-datepicker__current-month,
        .react-datepicker__day-name {
          color: white !important;
        }
        .react-datepicker__day--selected {
          background-color: #f5b400 !important;
          border-radius: 50% !important;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: #f5b400 !important;
          border-radius: 50% !important;
        }
        .react-datepicker__day:hover {
          background-color: #fff9e6 !important;
          border-radius: 50% !important;
        }
        .react-datepicker {
          border-radius: 0.75rem !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
          border: none !important;
        }
        .react-datepicker__triangle {
          display: none !important;
        }
      `}</style>
    </motion.div>
  );
};

export default ContactForm;
