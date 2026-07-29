import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
  PenTool,
} from "lucide-react";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";
import Button from "../components/ui/Button";

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
      title: "CALL US",
      details: ["+91 98765 43210"],
    },
    {
      icon: Mail,
      title: "EMAIL US",
      details: ["hello@violinevents.com", "We reply within 24 hours"],
    },
    {
      icon: MapPin,
      title: "VISIT US",
      details: ["Violin Events LLP", "Worli, Mumbai - 400018", "Maharashtra, India"],
    },
    {
      icon: MessageCircle,
      title: "WHATSAPP",
      details: ["+91 98765 43210", "Chat with our team"],
    },
    {
      icon: Clock,
      title: "OFFICE HOURS",
      details: ["Mon - Sat | 10 AM - 7 PM", "Sunday by appointment"],
    },
  ];

  const whyChooseUs = [
    {
      icon: Heart,
      title: "Personalized Approach",
    },
    {
      icon: PenTool,
      title: "Creative & Detail-Oriented",
    },
    {
      icon: Star,
      title: "Trusted by 100+ Families",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C58B48] selection:text-white">
     

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[60vh] flex items-center overflow-hidden pt-24 lg:pt-32 pb-16">
        {/* Background Floral Overlay */}
        <div className="absolute top-0 right-0 w-[60%] h-full z-0 opacity-90 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1780303864944-737d88c789f4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Wedding Setup"
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/70 to-transparent" /> */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/30 via-transparent to-[#FDFBF7]" /> */}
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-montserrat text-[#C58B48] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
                CONTACT US
              </span>
              <div className="w-12 h-[1px] bg-[#C58B48]/50" />
            </div>

            <h1 className="font-cormorant text-5xl md:text-6xl lg:text-[72px] text-[#1F2937] leading-[1.1] mb-6">
              Let's Create Something <br />
              <span className="italic text-[#C58B48]">Extraordinary</span>
            </h1>

            <p className="font-inter text-gray-600 text-sm md:text-[15px] leading-[1.8] max-w-md">
              We would love to hear about your dream celebration. Reach out to
              us and let's start planning your unforgettable moments together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT INFO CARDS ================= */}
      <section className="relative z-20 py-12">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-10">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-2 block">
              WE'RE HERE FOR YOU
            </span>
            <h2 className="font-cormorant text-4xl text-[#1F2937] mb-2">
              Get in Touch
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-[#EBE3D5] rounded-sm p-8 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(197,139,72,0.1)] transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full border border-[#C58B48]/30 flex items-center justify-center mb-5 bg-[#FDFBF7]">
                  <info.icon
                    className="w-5 h-5 text-[#C58B48]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-montserrat text-[#1F2937] text-[10px] font-bold tracking-widest uppercase mb-4">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p
                    key={idx}
                    className="font-inter text-gray-500 text-[11px] leading-relaxed"
                  >
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORM & IMAGE SPLIT SECTION ================= */}
      <section className="py-16 lg:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-sm overflow-hidden border border-[#EBE3D5]">
            {/* Left Image & Quote */}
            <div className="relative h-[400px] lg:h-auto bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80"
                alt="Journal and Flowers"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />

              {/* Overlapping Quote Box */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[320px] bg-white/95 backdrop-blur-sm p-8 lg:p-10 text-center shadow-xl border border-white/50">
                <span className="font-cormorant text-5xl text-[#C58B48] leading-none block mb-2">
                  “
                </span>
                <p className="font-cormorant text-xl lg:text-2xl text-[#1F2937] italic leading-relaxed">
                  Every celebration begins with a conversation. Let's bring your
                  vision to life.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white p-8 lg:p-14">
              <div className="mb-10 text-center lg:text-left">
                <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-2 block">
                  LET'S PLAN YOUR CELEBRATION
                </span>
                <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937]">
                  Schedule a Consultation
                </h2>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 rounded-full border border-[#C58B48] flex items-center justify-center mx-auto mb-6 bg-[#FDFBF7]">
                    <CheckCircle
                      className="w-8 h-8 text-[#C58B48]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-cormorant text-3xl text-[#1F2937] mb-3">
                    Thank You!
                  </h3>
                  <p className="font-inter text-gray-600 text-sm mb-8">
                    Our team will get in touch with you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="font-montserrat text-[#C58B48] text-[10px] font-bold tracking-widest uppercase hover:text-amber-900 transition-colors"
                  >
                    SEND ANOTHER ENQUIRY →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name *"
                        required
                        className="w-full bg-[#FDFBF7] px-5 py-4 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-[#1F2937] placeholder:text-gray-400 transition-colors rounded-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email *"
                        required
                        className="w-full bg-[#FDFBF7] px-5 py-4 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-[#1F2937] placeholder:text-gray-400 transition-colors rounded-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number *"
                        required
                        className="w-full bg-[#FDFBF7] px-5 py-4 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-[#1F2937] placeholder:text-gray-400 transition-colors rounded-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Preferred Destination"
                        className="w-full bg-[#FDFBF7] px-5 py-4 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-[#1F2937] placeholder:text-gray-400 transition-colors rounded-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full bg-[#FDFBF7] px-5 py-4 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-gray-500 transition-colors rounded-sm appearance-none"
                      >
                        <option value="">Number of Guests</option>
                        <option value="10-50">10-50</option>
                        <option value="50-100">50-100</option>
                        <option value="100-250">100-250</option>
                        <option value="250-500">250-500</option>
                        <option value="500+">500+</option>
                      </select>
                    </div>
                    <div>
                      <select
                        name="celebrationType"
                        value={formData.celebrationType}
                        onChange={handleChange}
                        className="w-full bg-[#FDFBF7] px-5 py-4 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-gray-500 transition-colors rounded-sm appearance-none"
                      >
                        <option value="">Celebration Type</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Corporate">Corporate Event</option>
                        <option value="Private">Private Gathering</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your dream celebration..."
                      className="w-full bg-[#FDFBF7] px-5 py-4 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-[#1F2937] placeholder:text-gray-400 transition-colors rounded-sm resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="champagne"
                    size="lg"
                    shape="shield"
                    className="w-full font-montserrat tracking-[0.2em]"
                  >
                    {isSubmitting ? (
                      "SENDING..."
                    ) : (
                      <>
                        SEND ENQUIRY{" "}
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </Button>
                  <p className="font-inter text-center text-[10px] text-gray-400 mt-4">
                    Our team will get in touch with you within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAP & ADDRESS SECTION ================= */}
      <section className="py-12">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FDFBF7]">
            {/* Address Card */}
            <div className="lg:col-span-4 bg-[#F5EFE6] p-10 lg:p-12 border border-[#EBE3D5] rounded-sm">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-5 h-5 text-[#C58B48]" strokeWidth={1.5} />
                <h3 className="font-cormorant text-3xl text-[#1F2937]">
                  Find Our Office
                </h3>
              </div>
              <div className="font-inter text-gray-600 text-sm leading-relaxed space-y-1 mb-8">
                <p className="font-semibold text-[#1F2937]">
                  Violin Events LLP
                </p>
                <p>Office No. 12, 1st Floor,</p>
                <p>Siddhivinayak Vision One,</p>
                <p>Dr. Annie Besant Road,</p>
                <p>Worli, Mumbai - 400018</p>
              </div>
              <button className="font-montserrat text-[#C58B48] text-[10px] font-bold tracking-widest uppercase hover:text-amber-900 transition-colors flex items-center gap-2 group">
                GET DIRECTIONS{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* Map iframe */}
            <div className="lg:col-span-8 h-[400px] rounded-sm overflow-hidden border border-[#EBE3D5] grayscale-[30%] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.669434199986!2d72.818469!3d19.006846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce7697424601%3A0x6b49e3cfcb2af893!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 border-t border-[#EBE3D5]">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-10 block">
            WHY CLIENTS LOVE WORKING WITH US
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#EBE3D5]">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center pt-6 md:pt-0"
              >
                <item.icon
                  className="w-6 h-6 text-[#C58B48] mb-4"
                  strokeWidth={1.5}
                />
                <h4 className="font-inter font-medium text-[#1F2937] text-sm tracking-wide">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;