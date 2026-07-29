import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Play,
  Flower2,
  ConciergeBell,
  Music,
  Plane,
  Gift,
  Search,
  PenTool,
  GlassWater,
  MonitorSmartphone,
  Users,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Award,
  Settings
} from "lucide-react";
import Button from "../components/ui/Button";

const PlanYourCelebration = () => {
  // --- FORM STATE ---
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

  // --- TESTIMONIAL SLIDER STATE ---
  const [testiIndex, setTestiIndex] = useState(0);
  const [isTestiPaused, setIsTestiPaused] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "", email: "", phone: "", guests: "",
        destination: "", celebrationType: "", message: "",
      });
    }, 2000);
  };

  const processSteps = [
    { step: "01", title: "DISCOVER", desc: "We get to know you, your story and your vision.", icon: Search },
    { step: "02", title: "DESIGN", desc: "We conceptualize and curate your celebration experience.", icon: PenTool },
    { step: "03", title: "PLAN", desc: "We plan every detail flawlessly.", icon: CalendarDays },
    { step: "04", title: "EXECUTE", desc: "Our team brings your dream to life with perfection.", icon: CheckCircle },
    { step: "05", title: "CELEBRATE", desc: "You live the moments, we handle the rest.", icon: GlassWater },
  ];

  const services = [
    { icon: MapPin, title: "VENUE SELECTION", desc: "Handpicked venues that match your vision and style.", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80" },
    { icon: Flower2, title: "DESIGN & DÉCOR", desc: "Bespoke themes and stunning décor that tell your story.", img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80" },
    { icon: ConciergeBell, title: "HOSPITALITY", desc: "Exceptional guest experiences and luxury accommodations.", img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80" },
    { icon: Music, title: "ENTERTAINMENT", desc: "World-class entertainment for unforgettable moments.", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80" },
    { icon: Plane, title: "TRAVEL & LOGISTICS", desc: "Seamless travel, logistics and on-ground support.", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80" },
    { icon: Gift, title: "BESPOKE EXPERIENCES", desc: "Unique experiences curated exclusively for you.", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80" },
  ];

  // Expanded testimonials to allow for smooth 3-card sliding
  const testimonials = [
    { name: "Ananya & Rohan", loc: "Udaipur, Rajasthan", img: "https://images.unsplash.com/photo-1523419409543-a5e549c1faa5?w=100&q=80", text: "Violin Events made our dream wedding a beautiful reality. Every detail was flawless and truly unforgettable." },
    { name: "Isha & Arjun", loc: "Phuket, Thailand", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80", text: "From planning to execution, everything was perfect. Our guests are still talking about our wedding!" },
    { name: "Meera & Karan", loc: "Jaipur, Rajasthan", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=100&q=80", text: "Their creativity, professionalism and dedication are unmatched. Highly recommend Violin Events!" },
    { name: "Rhea & Vikram", loc: "Goa, India", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", text: "An absolute masterclass in luxury event planning. They brought our beachside celebration to life effortlessly." },
    { name: "Priya & Siddharth", loc: "Florence, Italy", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80", text: "Every moment was orchestrated with pure magic. Thank you for creating memories that will last a lifetime." },
  ];

  // --- AUTO-SLIDE LOGIC ---
  useEffect(() => {
    if (isTestiPaused) return;

    const timer = setInterval(() => {
      setTestiIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [isTestiPaused, testimonials.length]);

  const nextTestimonial = () => setTestiIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
  const prevTestimonial = () => setTestiIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C58B48] selection:text-white pb-20 overflow-x-hidden">
      

      {/* ================= HERO SECTION WITH FORM ================= */}
      <section className="relative w-full min-h-[90vh] flex items-center pt-24 lg:pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop"
            alt="Wedding Arch"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] pt-10"
          >
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              LET'S PLAN YOUR
            </span>
            <h1 className="font-cormorant text-5xl lg:text-[72px] text-[#1F2937] leading-[1.1] mb-6">
              Dream Celebration <br />
              <span className="italic text-[#C58B48]">
                Tailored to Perfection
              </span>
            </h1>
            <p className="font-inter text-gray-600 text-sm leading-[1.8] max-w-sm mb-12">
              Every love story is unique. Share your vision with us and our
              experts will craft a celebration that reflects your style, story
              and dreams.
            </p>

            <div className="flex items-start gap-8 lg:gap-12">
              <div className="flex flex-col items-center text-center max-w-[80px]">
                <HeartHandshake
                  className="w-8 h-8 text-[#C58B48] mb-3"
                  strokeWidth={1}
                />
                <span className="font-montserrat text-[9px] font-bold text-[#1F2937] tracking-wider">
                  Personalized Planning
                </span>
              </div>
              <div className="flex flex-col items-center text-center max-w-[80px]">
                <Award
                  className="w-8 h-8 text-[#C58B48] mb-3"
                  strokeWidth={1}
                />
                <span className="font-montserrat text-[9px] font-bold text-[#1F2937] tracking-wider">
                  Expert Guidance
                </span>
              </div>
              <div className="flex flex-col items-center text-center max-w-[80px]">
                <Settings
                  className="w-8 h-8 text-[#C58B48] mb-3"
                  strokeWidth={1}
                />
                <span className="font-montserrat text-[9px] font-bold text-[#1F2937] tracking-wider">
                  End-to-End Execution
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[50%] max-w-[500px]"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-white/50 p-8 lg:p-10 relative">
              <div className="flex flex-col items-center mb-8">
                <Flower2
                  className="w-6 h-6 text-[#C58B48] mb-2"
                  strokeWidth={1}
                />
                <h3 className="font-montserrat text-[#C58B48] text-[10px] font-bold tracking-[0.2em] uppercase text-center">
                  TELL US ABOUT YOUR CELEBRATION
                </h3>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle
                    className="w-12 h-12 text-[#C58B48] mx-auto mb-4"
                    strokeWidth={1.5}
                  />
                  <h4 className="font-cormorant text-3xl text-[#1F2937] mb-2">
                    Thank You!
                  </h4>
                  <p className="font-inter text-sm text-gray-500 mb-6">
                    We will get in touch with you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSubmitted(false)}
                    className="border-[#EBE3D5] text-[#1F2937]"
                  >
                    Send Another Enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full bg-[#FDFBF7] px-4 py-3.5 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-[#1F2937] placeholder:text-gray-400 rounded-sm"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="w-full bg-[#FDFBF7] px-4 py-3.5 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-[#1F2937] placeholder:text-gray-400 rounded-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                      className="w-full bg-[#FDFBF7] px-4 py-3.5 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-[#1F2937] placeholder:text-gray-400 rounded-sm"
                    />
                    <input
                      type="text"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      placeholder="Number of Guests"
                      className="w-full bg-[#FDFBF7] px-4 py-3.5 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-[#1F2937] placeholder:text-gray-400 rounded-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full bg-[#FDFBF7] px-4 py-3.5 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-gray-400 rounded-sm appearance-none"
                    >
                      <option value="">Preferred Destination</option>
                      <option value="Udaipur">Udaipur</option>
                      <option value="Goa">Goa</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Other">Other</option>
                    </select>
                    <select
                      name="celebrationType"
                      value={formData.celebrationType}
                      onChange={handleChange}
                      className="w-full bg-[#FDFBF7] px-4 py-3.5 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-gray-400 rounded-sm appearance-none"
                    >
                      <option value="">Celebration Type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Corporate">Corporate</option>
                    </select>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Tell us about your dream celebration..."
                      className="w-full bg-[#FDFBF7] px-4 py-3.5 border border-[#EBE3D5] focus:outline-none focus:border-[#C58B48] font-inter text-xs text-[#1F2937] placeholder:text-gray-400 rounded-sm resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="champagne"
                    size="md"
                    className="w-full mt-2 font-montserrat tracking-[0.2em] shadow-none"
                  >
                    {isSubmitting ? (
                      "SENDING..."
                    ) : (
                      <>
                        SUBMIT ENQUIRY{" "}
                        <ArrowRight
                          size={14}
                          className="ml-1 group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </Button>
                  <p className="font-inter text-center text-[9px] text-gray-400 mt-2">
                    Our team will get in touch with you within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= PROCESS TIMELINE ================= */}
      <section className="py-20 relative z-10 border-t border-[#EBE3D5]/50">
        <div className="w-full max-w-[1200px] mx-auto px-6 text-center">
          <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
            HOW WE PLAN YOUR CELEBRATION
          </span>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-[1px] bg-[#C58B48]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C58B48]" />
            <div className="w-10 h-[1px] bg-[#C58B48]/40" />
          </div>
          <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937] mb-16">
            A Seamless Journey from <br /> Vision to Celebration
          </h2>

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Connecting Dashed Line (Desktop) */}
            <div className="hidden md:block absolute top-[36px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-[#C58B48]/40 z-0" />

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center text-center w-full md:w-[18%] mb-10 md:mb-0"
              >
                <div className="w-[72px] h-[72px] rounded-full bg-[#FDFBF7] border border-[#EBE3D5] flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
                  <div className="w-[60px] h-[60px] rounded-full border border-[#C58B48]/30 flex items-center justify-center bg-white">
                    <step.icon
                      className="w-6 h-6 text-[#C58B48]"
                      strokeWidth={1}
                    />
                  </div>
                </div>
                <span className="font-cormorant text-2xl text-[#1F2937] mb-1">
                  {step.step}
                </span>
                <h3 className="font-montserrat text-[10px] font-bold tracking-widest uppercase text-[#C58B48] mb-2">
                  {step.title}
                </h3>
                <p className="font-inter text-[11px] text-gray-500 leading-relaxed max-w-[160px] mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHAT WE PLAN GRID ================= */}
      <section className="py-20 relative z-10 bg-white border-y border-[#EBE3D5]/50">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
            WHAT WE PLAN
          </span>
          <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937] mb-16">
            Every Detail. Beautifully Planned.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-md border border-[#EBE3D5] overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(197,139,72,0.08)] transition-all"
              >
                <div className="h-[180px] overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="relative pt-10 px-5 pb-8 text-center">
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center p-1 z-10 shadow-sm border border-[#EBE3D5]">
                    <div className="w-full h-full rounded-full border border-[#C58B48] flex items-center justify-center">
                      <service.icon
                        className="w-5 h-5 text-[#C58B48]"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                  <h3 className="font-montserrat text-[10px] font-bold tracking-widest uppercase text-[#C58B48] mb-3">
                    {service.title}
                  </h3>
                  <p className="font-inter text-[11px] text-gray-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONSULTATION CARDS ================= */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1600&q=80"
            alt="bg"
            className="w-full h-full object-cover mix-blend-multiply grayscale-[50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FDFBF7]/80 to-[#FDFBF7]" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center">
          <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
            LET'S CONNECT
          </span>
          <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937] mb-4">
            Choose Your Consultation
          </h2>
          <div className="flex items-center justify-center gap-2 mb-16">
            <div className="w-10 h-[1px] bg-[#C58B48]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C58B48]" />
            <div className="w-10 h-[1px] bg-[#C58B48]/40" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-md rounded-md border border-[#EBE3D5] p-8 lg:p-10 shadow-sm flex flex-col items-center"
            >
              <MonitorSmartphone
                className="w-8 h-8 text-[#C58B48] mb-4"
                strokeWidth={1}
              />
              <h3 className="font-montserrat text-[#1F2937] text-[11px] font-bold tracking-widest uppercase mb-3">
                VIRTUAL CONSULTATION
              </h3>
              <p className="font-inter text-gray-500 text-[11px] leading-relaxed mb-6">
                Connect with our experts from the comfort of your home.
              </p>
              <div className="font-montserrat text-[9px] font-bold tracking-widest text-[#1F2937] mb-2 uppercase">
                45 MINUTES
              </div>
              <div className="font-montserrat text-[8px] text-gray-400 tracking-widest mb-8 uppercase">
                COMPLIMENTARY
              </div>
              <Button
                variant="outline"
                size="sm"
                className="font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] w-full hover:border-[#C58B48]"
              >
                BOOK NOW <ArrowRight size={12} className="ml-1" />
              </Button>
            </motion.div>

            {/* Card 2 - POPULAR */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-md border border-[#C58B48]/40 p-10 lg:p-12 shadow-[0_15px_40px_rgba(197,139,72,0.08)] flex flex-col items-center relative scale-105 z-20"
            >
              <div className="absolute -top-3 right-6 bg-white border border-[#EBE3D5] px-3 py-1 font-montserrat text-[8px] font-bold text-[#C58B48] tracking-widest uppercase shadow-sm">
                POPULAR
              </div>
              <Users
                className="w-10 h-10 text-[#C58B48] mb-4"
                strokeWidth={1}
              />
              <h3 className="font-montserrat text-[#1F2937] text-[12px] font-bold tracking-widest uppercase mb-3">
                IN-PERSON CONSULTATION
              </h3>
              <p className="font-inter text-gray-500 text-[11px] leading-relaxed mb-6">
                Meet our planners and discuss your dream celebration in detail.
              </p>
              <div className="font-montserrat text-[9px] font-bold tracking-widest text-[#1F2937] mb-2 uppercase">
                90 MINUTES
              </div>
              <div className="font-montserrat text-[8px] text-gray-400 tracking-widest mb-8 uppercase">
                COMPLIMENTARY
              </div>
              <Button
                variant="champagne"
                size="sm"
                className="font-montserrat text-[9px] w-full shadow-none"
              >
                BOOK NOW <ArrowRight size={12} className="ml-1" />
              </Button>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-md rounded-md border border-[#EBE3D5] p-8 lg:p-10 shadow-sm flex flex-col items-center"
            >
              <MapPin className="w-8 h-8 text-[#C58B48] mb-4" strokeWidth={1} />
              <h3 className="font-montserrat text-[#1F2937] text-[11px] font-bold tracking-widest uppercase mb-3">
                DESTINATION EXPERIENCE
              </h3>
              <p className="font-inter text-gray-500 text-[11px] leading-relaxed mb-6">
                Visit our curated destinations and experience venues firsthand.
              </p>
              <div className="font-montserrat text-[9px] font-bold tracking-widest text-[#1F2937] mb-2 uppercase">
                CUSTOMIZED
              </div>
              <div className="font-montserrat text-[8px] text-gray-400 tracking-widest mb-8 uppercase">
                ON REQUEST
              </div>
              <Button
                variant="outline"
                size="sm"
                className="font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] w-full hover:border-[#C58B48]"
              >
                ENQUIRE NOW <ArrowRight size={12} className="ml-1" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS AUTO-SLIDER ================= */}
      <section className="py-20 bg-white border-y border-[#EBE3D5]/50 relative">
        <div className="w-full max-w-[1400px] mx-auto text-center overflow-hidden">
          <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
            LOVE NOTES
          </span>
          <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937] mb-16">
            Stories from Our Celebrations
          </h2>

          <div
            className="relative flex items-center justify-center px-6 lg:px-16"
            onMouseEnter={() => setIsTestiPaused(true)}
            onMouseLeave={() => setIsTestiPaused(false)}
          >
            {/* Left Arrow */}
            <button
              onClick={prevTestimonial}
              className="hidden lg:flex w-10 h-10 rounded-full border border-[#EBE3D5] items-center justify-center text-gray-400 hover:text-[#C58B48] hover:border-[#C58B48] transition-colors absolute left-4 z-10 bg-white shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Slider Container */}
            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out testi-track"
                style={{ "--slide-idx": testiIndex }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="w-full md:w-1/3 flex-shrink-0 px-3 box-border"
                  >
                    <div className="bg-[#FDFBF7] p-8 lg:p-10 rounded-md border border-[#EBE3D5] flex flex-col justify-between text-left h-full min-h-[220px]">
                      <p className="font-inter text-gray-600 text-[11px] leading-[1.8] mb-8">
                        "{t.text}"
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <img
                          src={t.img}
                          alt={t.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-montserrat text-[#1F2937] text-[10px] font-bold uppercase tracking-wider">
                            {t.name}
                          </h4>
                          <p className="font-montserrat text-[#C58B48] text-[8px] font-bold tracking-widest uppercase">
                            {t.loc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextTestimonial}
              className="hidden lg:flex w-10 h-10 rounded-full border border-[#EBE3D5] items-center justify-center text-gray-400 hover:text-[#C58B48] hover:border-[#C58B48] transition-colors absolute right-4 z-10 bg-white shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestiIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  testiIndex === i
                    ? "w-6 bg-[#C58B48]"
                    : "w-1.5 bg-[#EBE3D5] hover:bg-[#C58B48]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-12 px-6 lg:px-16 w-full max-w-[1400px] mx-auto">
        <div className="w-full bg-[#F5EFE6] rounded-xl overflow-hidden flex flex-col lg:flex-row shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
          {/* Left Text */}
          <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              READY TO BEGIN YOUR JOURNEY?
            </span>
            <h2 className="font-cormorant text-4xl lg:text-[48px] text-[#1F2937] leading-[1.1] mb-6">
              Let's create a celebration <br />
              <span className="italic">you'll cherish forever.</span>
            </h2>
            <p className="font-inter text-sm text-gray-600 leading-relaxed mb-10 max-w-sm">
              Share your vision with us and let our experts craft a celebration
              that's uniquely yours.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button
                variant="champagne"
                size="md"
                className="font-montserrat text-[10px] w-full sm:w-auto shadow-none"
              >
                SCHEDULE A CONSULTATION{" "}
                <ArrowRight size={14} className="ml-2" />
              </Button>

              <button className="flex items-center gap-3 font-montserrat text-[10px] font-bold tracking-widest text-[#1F2937] hover:text-[#C58B48] transition-colors group">
                <div className="w-8 h-8 rounded-full border border-[#1F2937] group-hover:border-[#C58B48] flex items-center justify-center transition-colors">
                  <Play className="w-3 h-3 ml-0.5 fill-current" />
                </div>
                WATCH SHOWREEL
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 h-[300px] lg:h-auto relative">
            <img
              /* 1. Replaced the broken link with a working luxury palace image */
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop"
              alt="Luxury Palace Celebration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F5EFE6] hidden lg:block" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanYourCelebration;