import React, { useState } from "react";
import { motion } from "framer-motion";
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
  Diamond,
  Play,
  Quote,
} from "lucide-react";
import Button from "../components/ui/Button";

const PlanYourCelebration = () => {
  const [activeConsultation, setActiveConsultation] = useState(null);

  const processSteps = [
    {
      step: "01",
      title: "Discover",
      description: "We get to know you, your story and your vision.",
    },
    {
      step: "02",
      title: "Design",
      description: "We conceptualise and create your celebration experience.",
    },
    {
      step: "03",
      title: "Plan",
      description: "We plan every detail flawlessly.",
    },
    {
      step: "04",
      title: "Execute",
      description: "Our team brings your dream to life with perfection.",
    },
    {
      step: "05",
      title: "Celebrate",
      description: "You live the moments, we handle the rest.",
    },
  ];

  const services = [
    {
      icon: MapPin,
      title: "Venue Selection",
      description: "Handpicked venues that match your vision and style.",
    },
    {
      icon: Flower,
      title: "Design & Decor",
      description: "Design themes and colour palette that tell your story.",
    },
    {
      icon: Users,
      title: "Hospitality",
      description: "Exceptional guest experiences and luxury accommodations.",
    },
    {
      icon: Music,
      title: "Entertainment",
      description: "World-class entertainment for unforgettable moments.",
    },
    {
      icon: Plane,
      title: "Travel & Logistics",
      description: "Seamless travel, logistics and on-ground support.",
    },
    {
      icon: Gift,
      title: "Bespoke Experiences",
      description: "Unique experiences curated exclusively for you.",
    },
  ];

  const consultationTypes = [
    {
      id: 1,
      title: "Virtual Consultation",
      description: "Connect with our experts from the comfort of your home.",
      button: "BOOK NOW",
    },
    {
      id: 2,
      title: "In-Person Consultation",
      description:
        "Meet our planners and discuss your dream celebration in detail.",
      button: "BOOK NOW",
    },
    {
      id: 3,
      title: "Destination Experience",
      description:
        "Visit our curated destinations and experience venues firsthand.",
      button: "ENQUIRE NOW",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Aravinda & Rohan",
      location: "Udaipur, Rajasthan",
      text: "Violet Events made our dream wedding a beautiful reality. Every detail was flawless and truly unforgettable.",
      rating: 5,
    },
    {
      id: 2,
      name: "Ishita & Aditi",
      location: "Mumbai, Maharashtra",
      text: "From planning to execution, everything was perfect. Our guests are still talking about our wedding!",
      rating: 5,
    },
    {
      id: 3,
      name: "Meera & Karan",
      location: "Jaipur, Rajasthan",
      text: "Their creativity, professionalism and dedication are unmatched. Highly recommended Violet Events!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&h=900&fit=crop&q=80"
            alt="Plan Your Dream Celebration"
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
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-pink-300" />
              <span className="text-pink-200 text-xs sm:text-sm font-semibold tracking-wider">
                VIOLIN EVENTS LLP
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Let's Plan Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 mt-2">
                Dream Celebration
              </span>
              <span className="block text-white/80 text-2xl sm:text-3xl md:text-4xl mt-2">
                Tailored to Perfection
              </span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed">
              Every love story is unique. Share your vision with us and our
              experts will craft a celebration that reflects your style, story,
              and dreams.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { icon: CheckCircle, label: "Personalised Planning" },
                { icon: CheckCircle, label: "Expert Guidance" },
                { icon: CheckCircle, label: "End-to-End Execution" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-white/80"
                >
                  <item.icon className="w-4 h-4 text-pink-400" />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2">
              A Seamless Journey from
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                Vision to Celebration
              </span>
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
                <div className="text-5xl font-bold text-pink-100 group-hover:text-pink-500 transition-colors duration-300">
                  {step.step}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Every Detail. Beautifully Planned.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-pink-200 group"
              >
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-500 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-pink-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2 group-hover:text-pink-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="py-20 bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Choose Your Consultation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2">
              Let's Start Planning
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {consultationTypes.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-pink-200 group"
                onMouseEnter={() => setActiveConsultation(item.id)}
                onMouseLeave={() => setActiveConsultation(null)}
              >
                <h3 className="text-xl font-bold text-dark-900 mb-3 group-hover:text-pink-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6">{item.description}</p>
                <button className="text-pink-500 font-semibold text-sm flex items-center hover:gap-2 transition-all group-hover:gap-2">
                  {item.button}
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Stories from Our Celebrations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-pink-300 mb-4" />
                <p className="text-dark-800 text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-pink-500 fill-pink-500"
                    />
                  ))}
                </div>
                <div>
                  <h4 className="font-bold text-dark-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=600&fit=crop&q=80"
            alt="Create Your Celebration"
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
              Let's create a celebration
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 mt-2">
                you'll cherish forever.
              </span>
            </h2>
            <p className="text-gray-300 text-lg mt-4">
              Share your vision with us and let our experts craft a celebration
              that's uniquely yours.
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
                <Play className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PlanYourCelebration;
