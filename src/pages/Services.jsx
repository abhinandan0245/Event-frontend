import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Camera,
  Music,
  Utensils,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Palette,
  Gift,
  PenTool,
  Truck,
  Hotel,
  Mic,
  Heart,
} from "lucide-react";
import Button from "../components/ui/Button";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      icon: Calendar,
      title: "Full Event Planning",
      description:
        "From concept to execution, we handle every detail of your event.",
      features: [
        "Initial Consultation",
        "Budget Planning",
        "Timeline Management",
        "Vendor Coordination",
      ],
      price: "Starting ₹50,000",
      popular: true,
      delay: 0,
    },
    {
      id: 2,
      icon: MapPin,
      title: "Venue Selection & Design",
      description: "Find and design the perfect venue for your celebration.",
      features: [
        "Venue Sourcing",
        "Site Visits",
        "Layout Planning",
        "Theme Design",
      ],
      price: "Starting ₹30,000",
      popular: false,
      delay: 0.1,
    },
    {
      id: 3,
      icon: Palette,
      title: "Event Decor & Styling",
      description: "Transform your venue with stunning decor and styling.",
      features: [
        "Theme Development",
        "Floral Design",
        "Lighting Setup",
        "Furniture Styling",
      ],
      price: "Starting ₹40,000",
      popular: false,
      delay: 0.2,
    },
    {
      id: 4,
      icon: Users,
      title: "Guest Management",
      description:
        "Ensure your guests have a seamless experience from start to finish.",
      features: [
        "Guest List Management",
        "RSVP Tracking",
        "Concierge Service",
        "Transportation",
      ],
      price: "Starting ₹25,000",
      popular: false,
      delay: 0.3,
    },
    {
      id: 5,
      icon: Camera,
      title: "Photography & Film",
      description:
        "Capture every magical moment with professional photography.",
      features: [
        "Pre-event Shoot",
        "Event Coverage",
        "Cinematic Film",
        "Photo Albums",
      ],
      price: "Starting ₹60,000",
      popular: false,
      delay: 0.4,
    },
    {
      id: 6,
      icon: Music,
      title: "Entertainment & Events",
      description: "Curate unforgettable entertainment for your guests.",
      features: [
        "Live Music",
        "DJ Services",
        "Cultural Performances",
        "Interactive Activities",
      ],
      price: "Starting ₹35,000",
      popular: false,
      delay: 0.5,
    },
    {
      id: 7,
      icon: Utensils,
      title: "Catering & Culinary",
      description: "Delight your guests with exceptional cuisine and service.",
      features: [
        "Menu Planning",
        "Food Tasting",
        "Beverage Services",
        "Dining Setup",
      ],
      price: "Starting ₹45,000",
      popular: false,
      delay: 0.6,
    },
    {
      id: 8,
      icon: PenTool,
      title: "Destination Management",
      description: "Expertly handle all logistics for destination events.",
      features: [
        "Travel Arrangements",
        "Accommodation Booking",
        "Local Tours",
        "Welcome Events",
      ],
      price: "Starting ₹70,000",
      popular: false,
      delay: 0.7,
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "We understand your vision, preferences, and requirements.",
      icon: Heart,
    },
    {
      step: "02",
      title: "Planning",
      description:
        "We create a detailed plan with timelines, budgets, and vendors.",
      icon: PenTool,
    },
    {
      step: "03",
      title: "Execution",
      description: "We bring your vision to life with flawless coordination.",
      icon: CheckCircle,
    },
    {
      step: "04",
      title: "Celebration",
      description:
        "You enjoy your special day while we handle everything behind the scenes.",
      icon: Sparkles,
    },
  ];

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
              Our Services
            </span>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mt-4">
              Comprehensive Event
              <span className="gradient-gold bg-clip-text text-transparent block">
                Planning Solutions
              </span>
            </h1>
            <p className="text-dark-200 text-lg mt-6">
              From concept to execution, we offer end-to-end services to make
              your celebration truly extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-dark-900 mt-2">
              Tailored Services For Every Occasion
            </h2>
            <p className="text-dark-600 mt-4 max-w-2xl mx-auto">
              Choose from our comprehensive range of services or create a custom
              package that perfectly fits your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: service.delay }}
                whileHover={{ y: -8 }}
                className={`group bg-white rounded-2xl p-8 border-2 hover:shadow-xl transition-all duration-300 cursor-pointer relative ${
                  service.popular
                    ? "border-gold-500 shadow-lg"
                    : "border-gray-100 hover:border-gold-300"
                }`}
                onClick={() =>
                  setSelectedService(
                    selectedService === service.id ? null : service.id,
                  )
                }
              >
                {service.popular && (
                  <div className="absolute -top-3 right-6 bg-gold-500 text-dark-900 px-4 py-1 rounded-full text-xs font-bold">
                    Popular
                  </div>
                )}

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                    service.popular
                      ? "bg-gold-500"
                      : "bg-gold-50 group-hover:bg-gold-500"
                  } transition-colors duration-300`}
                >
                  <service.icon
                    className={`w-8 h-8 ${
                      service.popular
                        ? "text-white"
                        : "text-gold-500 group-hover:text-white"
                    } transition-colors duration-300`}
                  />
                </motion.div>

                <h3 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-gold-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-dark-600 text-sm mb-4">
                  {service.description}
                </p>

                <p className="text-gold-500 font-semibold text-sm mb-4">
                  {service.price}
                </p>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: selectedService === service.id ? "auto" : 0,
                    opacity: selectedService === service.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-sm text-dark-600"
                      >
                        <CheckCircle className="w-4 h-4 text-gold-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                    <Button variant="secondary" className="mt-2 w-full text-sm">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>

                <button className="text-gold-500 text-sm font-medium mt-2 flex items-center group-hover:gap-2 transition-all">
                  {selectedService === service.id ? "Show Less" : "Learn More"}
                  <ArrowRight
                    className={`w-4 h-4 ml-1 transition-transform ${
                      selectedService === service.id ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-dark-900 mt-2">
              How We Bring Your Vision to Life
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-4xl font-playfair font-bold text-gold-500 mb-4">
                  {step.step}
                </div>
                <div className="w-14 h-14 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-gold-500" />
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-dark-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Your Dream Event, Our Expertise
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Sparkles,
                  title: "15+ Years Experience",
                  description: "Trusted by hundreds of happy clients",
                },
                {
                  icon: Users,
                  title: "100+ Expert Team",
                  description: "Dedicated professionals at your service",
                },
                {
                  icon: Star,
                  title: "4.9/5 Client Rating",
                  description: "Based on 500+ satisfied clients",
                },
                {
                  icon: Gift,
                  title: "Custom Packages",
                  description: "Tailored solutions for every budget",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center mb-3">
                    <item.icon className="w-6 h-6 text-gold-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-900">
                    {item.title}
                  </h3>
                  <p className="text-dark-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gold-500/10 to-amber-500/10 p-8 rounded-2xl border border-gold-200/30">
                <h3 className="text-2xl font-playfair font-bold text-dark-900 mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-dark-600 mb-6">
                  Contact us today for a free consultation and let's start
                  planning your extraordinary event.
                </p>
                <Button variant="primary">
                  Schedule Consultation
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
