import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Sparkles } from "lucide-react";
import ContactForm from "../components/contact/ContactForm";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Jaipur, Rajasthan", "India 302001"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 98765 43211"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@violinevents.com", "support@violinevents.com"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon-Sat: 9:00 AM - 8:00 PM", "Sunday: By Appointment"],
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
              Contact Us
            </span>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mt-4">
              Let's Create
              <span className="gradient-gold bg-clip-text text-transparent block">
                Something Beautiful
              </span>
            </h1>
            <p className="text-dark-200 text-lg mt-6">
              Have a vision for your perfect event? Reach out to us and let's
              make it happen together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="text-lg font-semibold text-dark-900 mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-dark-600 text-sm">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-dark-900 mb-4">
                  Find Us
                </h3>
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227821.9993703751!2d75.64187335000001!3d26.91243365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gold-50 to-amber-50 p-6 rounded-2xl border border-gold-200/30">
                <h3 className="text-lg font-semibold text-dark-900 mb-2">
                  ✨ Why Choose Us?
                </h3>
                <ul className="space-y-2 text-dark-600 text-sm">
                  <li className="flex items-center">
                    <Sparkles className="w-4 h-4 text-gold-500 mr-2" />
                    Over 500 successful events planned
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="w-4 h-4 text-gold-500 mr-2" />
                    Team of 100+ dedicated professionals
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="w-4 h-4 text-gold-500 mr-2" />
                    50+ stunning destinations across India
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="w-4 h-4 text-gold-500 mr-2" />
                    4.9/5 rating from 500+ happy clients
                  </li>
                </ul>
              </div>

              {/* Quick Contact Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark-900 p-6 rounded-2xl text-center"
              >
                <h3 className="text-white text-lg font-semibold mb-2">
                  Need Immediate Help?
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Call us directly for urgent inquiries
                </p>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 text-gold-500 font-semibold hover:text-gold-400 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +91 98765 43210
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              FAQ
            </span>
            <h2 className="text-3xl font-playfair font-bold text-dark-900 mt-2">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "How far in advance should I book?",
                a: "We recommend booking at least 6-12 months in advance for destination weddings and 3-6 months for local events to ensure availability.",
              },
              {
                q: "Do you offer destination wedding packages?",
                a: "Yes! We specialize in destination weddings across India. We handle everything from venue selection to guest accommodations.",
              },
              {
                q: "Can you work with my budget?",
                a: "Absolutely! We create customized packages that fit your vision and budget. Our team will work closely with you to maximize value.",
              },
              {
                q: "Do you provide all services in-house?",
                a: "Yes, we offer end-to-end services including venue selection, decor, catering, photography, entertainment, and guest management.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-dark-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-dark-600 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
