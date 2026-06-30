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
  Heart,
  Globe,
  Plane,
  ChefHat,
  PartyPopper,
  Film,
  Award,
  ChevronRight,
} from "lucide-react";
import Button from "../components/ui/Button";

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 1,
      icon: Calendar,
      title: "Planning & Management",
      description:
        "Strategic planning, timelines and flawless execution - handled with perfection.",
      features: [
        "Initial Consultation",
        "Budget Planning",
        "Timeline Management",
        "Vendor Coordination",
      ],
      delay: 0,
    },
    {
      id: 2,
      icon: Palette,
      title: "Design & Decor",
      description:
        "Bespoke themes, stunning décor and immersive designs that bring your story to life.",
      features: [
        "Theme Development",
        "Floral Design",
        "Lighting Setup",
        "Furniture Styling",
      ],
      delay: 0.1,
    },
    {
      id: 3,
      icon: Users,
      title: "Hospitality & Guest Experience",
      description:
        "Curated hospitality and guest experiences that make your loved ones feel special.",
      features: [
        "Guest List Management",
        "RSVP Tracking",
        "Concierge Service",
        "Welcome Events",
      ],
      delay: 0.2,
    },
    {
      id: 4,
      icon: PartyPopper,
      title: "Entertainment & Production",
      description:
        "World-class entertainment and production for unforgettable celebrations.",
      features: [
        "Live Music",
        "DJ Services",
        "Cultural Performances",
        "Interactive Activities",
      ],
      delay: 0.3,
    },
    {
      id: 5,
      icon: Plane,
      title: "Logistics & Travel",
      description:
        "Seamless travel, logistics and on-ground support, anywhere in the world.",
      features: [
        "Travel Arrangements",
        "Accommodation Booking",
        "Local Tours",
        "Transportation",
      ],
      delay: 0.4,
    },
    {
      id: 6,
      icon: Award,
      title: "Bespoke Services & Concierge",
      description:
        "Personalized services and thoughtful touches that go beyond expectations.",
      features: [
        "Personal Shopping",
        "Spa Services",
        "Special Requests",
        "24/7 Support",
      ],
      delay: 0.5,
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discover",
      description: "We get to know you and your vision.",
    },
    {
      step: "02",
      title: "Design",
      description: "We conceptualize your dream celebration.",
    },
    {
      step: "03",
      title: "Plan",
      description: "We plan every detail flawlessly.",
    },
    {
      step: "04",
      title: "Execute",
      description: "We bring your dream to life.",
    },
    {
      step: "05",
      title: "Celebrate",
      description: "You live the moments, we handle the rest.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&h=900&fit=crop&q=80"
            alt="Our Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/70 to-dark-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-pink-300" />
              <span className="text-pink-200 text-xs sm:text-sm font-semibold tracking-wider">
                OUR SERVICES
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              End-to-End Wedding
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 mt-2">
                & Celebration Solutions
              </span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
              At Violin Events, we take care of every detail so you can
              celebrate every moment. From the first idea to the final farewell,
              we create experiences that are seamless, stunning and
              unforgettable.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3.5 text-sm sm:text-base shadow-lg shadow-pink-500/30 group">
                EXPLORE OUR SERVICES
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2">
              Comprehensive Services for Extraordinary Celebrations
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: service.delay }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-pink-200"
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-pink-500 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-pink-500 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-bold text-dark-900 mb-3 group-hover:text-pink-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <button className="text-pink-500 text-sm font-semibold flex items-center group-hover:gap-2 transition-all">
                  LEARN MORE
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2">
              Thoughtfully Crafted. Perfectly Planned.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative">
                  <div className="text-5xl font-bold text-pink-100 group-hover:text-pink-500 transition-colors duration-300">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-pink-100">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-pink-300 rounded-full" />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-500 transition-colors duration-300">
                    <div className="w-3 h-3 bg-pink-500 rounded-full group-hover:bg-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-dark-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Begin CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=600&fit=crop&q=80"
            alt="Ready to Begin"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 to-dark-900/70" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to Begin?
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 mt-2">
                Let's Create Something Extraordinary Together
              </span>
            </h2>
            <p className="text-gray-300 text-lg mt-4">
              Share your vision with us and let our experts craft a celebration
              that will be remembered for a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-10 py-4 text-base shadow-lg shadow-pink-500/30 group">
                SCHEDULE A CONSULTATION
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 hover:border-white px-10 py-4 text-base"
              >
                WATCH SHOWREEL
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
