import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  Calendar,
  MapPin,
  Star,
  Heart,
  ChevronRight,
  Sparkles,
  Trophy,
  Clock,
  Globe,
} from "lucide-react";
import Button from "../components/ui/Button";

const About = () => {
  const stats = [
    { icon: Calendar, number: "500+", label: "Events Planned" },
    { icon: MapPin, number: "50+", label: "Destinations" },
    { icon: Users, number: "100+", label: "Team Members" },
    { icon: Star, number: "4.9", label: "Client Rating" },
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Excellence",
      description:
        "We strive for perfection in every detail, ensuring your event exceeds expectations.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Our team pours their heart into creating memorable experiences for you.",
    },
    {
      icon: Trophy,
      title: "Innovation",
      description:
        "We bring fresh, creative ideas to make your celebration truly unique.",
    },
    {
      icon: Clock,
      title: "Punctuality",
      description:
        "Timely execution and flawless coordination are our hallmarks.",
    },
  ];

  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "Founder & Creative Director",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
      delay: 0,
    },
    {
      name: "Arjun Singh",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      delay: 0.1,
    },
    {
      name: "Meera Patel",
      role: "Senior Event Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      delay: 0.2,
    },
    {
      name: "Vikram Reddy",
      role: "Client Relations Manager",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      delay: 0.3,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mt-4">
              Crafting Dreams Into
              <span className="gradient-gold bg-clip-text text-transparent block">
                Timeless Celebrations
              </span>
            </h1>
            <p className="text-dark-200 text-lg mt-6">
              We are a team of passionate event planners dedicated to creating
              extraordinary experiences across India's most magnificent
              destinations.
            </p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <Button variant="primary">
                Meet Our Team
                <ChevronRight size={20} className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-gold-500" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-dark-900">
                  {stat.number}
                </div>
                <div className="text-dark-600 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-dark-900 mt-2 mb-4">
                Where It All Began
              </h2>
              <p className="text-dark-600 text-lg mb-4">
                Founded in 2015, VIOLIN EVENTS LLP started with a simple vision
                - to create unforgettable moments that tell a story.
              </p>
              <p className="text-dark-600">
                What began as a passion for crafting beautiful celebrations has
                grown into India's premier event planning company. We've had the
                privilege of planning over 500 events across 50+ destinations,
                from royal weddings in Rajasthan to intimate celebrations in
                Goa.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6"
              >
                <Button variant="secondary">
                  Our Journey
                  <ChevronRight size={20} className="ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop"
                  alt="Event planning"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400&h=300&fit=crop"
                  alt="Wedding decor"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop"
                  alt="Event celebration"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover -mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop"
                  alt="Luxury event"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
              </div>
              {/* Decorative Gold Circle */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-dark-900 mt-2">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold-500 transition-colors duration-300">
                  <value.icon className="w-7 h-7 text-gold-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-dark-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-dark-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-dark-900 mt-2">
              The Faces Behind the Magic
            </h2>
            <p className="text-dark-600 mt-4 max-w-2xl mx-auto">
              Meet the passionate professionals who bring your dreams to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: member.delay }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-dark-900">
                    {member.name}
                  </h3>
                  <p className="text-gold-500 text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-dark-900">
              Ready to Create Your Dream Event?
            </h2>
            <p className="text-dark-800 text-lg mt-4 mb-8 max-w-2xl mx-auto">
              Let's turn your vision into reality. Get in touch with our expert
              team today.
            </p>
            <Button
              variant="secondary"
              className="bg-white text-dark-900 hover:bg-dark-900 hover:text-white border-white"
            >
              Get Started
              <ChevronRight size={20} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
