import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Sparkles,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Heart,
  Star,
  Gift,
  Camera,
  Music,
  Utensils,
  Flower,
  Crown,
  Plane,
  Home,
  Phone,
  Mail,
  User,
  MessageCircle,
  Clock,
  PartyPopper,
  Cake,
  Diamond
} from 'lucide-react';
import Button from '../components/ui/Button';

const PlanYourCelebration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: '',
    guests: '',
    budget: '',
    date: '',
    location: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { number: 1, label: 'Event Details', icon: Calendar },
    { number: 2, label: 'Your Info', icon: User },
    { number: 3, label: 'Confirmation', icon: CheckCircle },
  ];

  const eventTypes = [
    { icon: Heart, label: 'Wedding', desc: 'Your dream wedding' },
    { icon: PartyPopper, label: 'Engagement', desc: 'Celebrate love' },
    { icon: Cake, label: 'Birthday', desc: 'Special milestones' },
    { icon: Users, label: 'Corporate', desc: 'Professional events' },
    { icon: Plane, label: 'Destination', desc: 'Exotic locations' },
    { icon: Diamond, label: 'Anniversary', desc: 'Milestone celebrations' },
  ];

  const budgetRanges = [
    '₹1,00,000 - ₹3,00,000',
    '₹3,00,000 - ₹5,00,000',
    '₹5,00,000 - ₹10,00,000',
    '₹10,00,000 - ₹25,00,000',
    '₹25,00,000+'
  ];

  const guestRanges = [
    '10-50', '50-100', '100-250', '250-500', '500+'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setCurrentStep(3);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600')] bg-cover bg-center opacity-20"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              Plan Your Celebration
            </span>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mt-4">
              Start Planning Your
              <span className="gradient-gold bg-clip-text text-transparent block">
                Dream Event Today
              </span>
            </h1>
            <p className="text-dark-200 text-lg mt-6">
              Tell us about your vision, and we'll create a personalized plan 
              to bring it to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Planning Process Steps */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="flex justify-center items-center gap-4 md:gap-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step.number 
                      ? 'bg-gold-500 text-dark-900' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`hidden md:inline font-medium ${
                    currentStep >= step.number ? 'text-dark-900' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 max-w-[60px] ${
                    currentStep > step.number ? 'bg-gold-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              // Success Message
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl p-12 text-center shadow-xl"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-playfair font-bold text-dark-900 mb-4">
                  Thank You! 🎉
                </h2>
                <p className="text-dark-600 text-lg mb-4">
                  Your event planning request has been received!
                </p>
                <p className="text-dark-500 mb-8">
                  Our team will get back to you within 24 hours to discuss your celebration.
                </p>
                <div className="bg-gold-50 rounded-2xl p-6 border border-gold-200/30 max-w-md mx-auto">
                  <p className="text-sm text-dark-600">
                    📧 We've sent a confirmation to your email
                  </p>
                  <p className="text-sm text-dark-600 mt-1">
                    📞 Our experts will call you shortly
                  </p>
                </div>
                <Button 
                  variant="primary" 
                  className="mt-8"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setFormData({
                      eventType: '',
                      guests: '',
                      budget: '',
                      date: '',
                      location: '',
                      name: '',
                      email: '',
                      phone: '',
                      message: ''
                    });
                  }}
                >
                  Plan Another Event
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
              >
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Event Details */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-playfair font-bold text-dark-900">
                        Tell Us About Your Event
                      </h2>
                      <p className="text-dark-600">
                        Help us understand your vision so we can create the perfect plan.
                      </p>

                      {/* Event Type */}
                      <div>
                        <label className="block text-sm font-semibold text-dark-700 mb-3">
                          What type of event are you planning? *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {eventTypes.map((type) => (
                            <motion.button
                              key={type.label}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setFormData({...formData, eventType: type.label})}
                              className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                                formData.eventType === type.label
                                  ? 'border-gold-500 bg-gold-50 shadow-md'
                                  : 'border-gray-200 hover:border-gold-300'
                              }`}
                            >
                              <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                                formData.eventType === type.label ? 'text-gold-500' : 'text-gray-400'
                              }`} />
                              <div className={`text-sm font-semibold ${
                                formData.eventType === type.label ? 'text-dark-900' : 'text-dark-600'
                              }`}>
                                {type.label}
                              </div>
                              <div className="text-xs text-gray-400">{type.desc}</div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Guests & Budget */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-dark-700 mb-2">
                            Number of Guests *
                          </label>
                          <select
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select guest range</option>
                            {guestRanges.map((range) => (
                              <option key={range} value={range}>{range} guests</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-dark-700 mb-2">
                            Estimated Budget *
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select budget range</option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range}>{range}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Date & Location */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-dark-700 mb-2">
                            Preferred Date *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-dark-700 mb-2">
                            Preferred Location *
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                              placeholder="e.g., Jaipur, Goa, Udaipur"
                              required
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button type="button" variant="primary" onClick={nextStep}>
                          Next Step
                          <ChevronRight size={20} className="ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Your Info */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-playfair font-bold text-dark-900">
                        Your Contact Information
                      </h2>
                      <p className="text-dark-600">
                        We'll use this information to reach out and personalize your experience.
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-dark-700 mb-2">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                              required
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-dark-700 mb-2">
                              Email Address *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-dark-700 mb-2">
                              Phone Number *
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 98765 43210"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-dark-700 mb-2">
                            Additional Details
                          </label>
                          <div className="relative">
                            <MessageCircle className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Tell us more about your vision, special requests, or any questions..."
                              rows="4"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button type="button" variant="secondary" onClick={prevStep}>
                          Back
                        </Button>
                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              Submit Request
                              <Sparkles size={20} className="ml-2" />
                            </span>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Why Plan With Us */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-dark-900 mt-2">
              Your Dream Event, Our Promise
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Expert Planning',
                description: '15+ years of experience creating unforgettable events',
                color: 'from-purple-500/10 to-purple-500/5'
              },
              {
                icon: Gift,
                title: 'Custom Packages',
                description: 'Tailored solutions designed around your vision and budget',
                color: 'from-gold-500/10 to-gold-500/5'
              },
              {
                icon: Heart,
                title: 'Stress-Free Experience',
                description: 'We handle everything so you can enjoy your special day',
                color: 'from-pink-500/10 to-pink-500/5'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${item.color} p-8 rounded-2xl border border-gray-100 text-center`}
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <item.icon className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-2">{item.title}</h3>
                <p className="text-dark-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanYourCelebration;