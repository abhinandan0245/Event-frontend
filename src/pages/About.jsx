import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Users,
  Star,
  Sparkles,
  Heart,
  Award,
  Clock,
  ArrowRight,
  Play,
  ChevronRight,
  Quote,
  Globe,
  Shield,
  User,
  Briefcase,
  Target,
  Eye,
} from "lucide-react";
import Button from "../components/ui/Button";

const About = () => {
  // === DATA ARRAYS ===
  const stats = [
    { icon: CalendarDays, number: "500+", label: "Events Planned" },
    { icon: MapPin, number: "50+", label: "Destinations" },
    { icon: Users, number: "100+", label: "Team Members" },
    { icon: Star, number: "4.9", label: "Client Rating" },
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Excellence",
      description: "We strive for perfection in every detail, ensuring every event exceeds expectations.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our team pours their heart into creating memorable experiences for you.",
    },
    {
      icon: Award,
      title: "Innovation",
      description: "We bring fresh, creative ideas to make every celebration truly unique.",
    },
    {
      icon: Clock,
      title: "Punctuality",
      description: "Timely execution and flawless coordination are our hallmarks.",
    },
  ];

  const brandPromises = [
    { icon: CalendarDays, number: "19+ YEARS", label: "Of experience in creating memorable celebrations" },
    { icon: Globe, number: "INDIA & BEYOND", label: "Delivering exceptional experiences across the globe" },
    { icon: Heart, number: "CLIENT FIRST", label: "Personalised service and relationships we cherish" },
    { icon: Shield, number: "TRUST & RELIABILITY", label: "Built on transparency and a commitment to deliver" },
  ];

  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop",
    },
    {
      name: "Arjun Singh",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    },
    {
      name: "Meera Joshi",
      role: "Design Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop",
    },
    {
      name: "Rohan Mehta",
      role: "Client Relations Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
    },
  ];

  // === ANIMATION VARIANTS ===
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C58B48] selection:text-white overflow-x-hidden pb-20">
     
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[85vh] flex items-center pt-24 lg:pt-32 pb-16 overflow-hidden">
        
        {/* Background Image Right Side */}
        <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
            alt="Luxury Event Setup"
            className="w-full h-full object-cover opacity-90"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 30%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
          <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/90 to-transparent" />
        </div>

        {/* Decorative Floral Overlay Left */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] opacity-[0.08] pointer-events-none z-0 mix-blend-multiply grayscale">
          <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80" alt="Floral Decor" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col justify-center h-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] pt-4 lg:pt-8 pl-0 md:pl-8"
          >
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              ABOUT US
            </span>
            <h1 className="font-cormorant text-5xl lg:text-[72px] text-[#1F2937] leading-[1.1] mb-6">
              Crafting Dreams Into <br />
              <span className="italic text-[#C58B48]">Timeless Celebrations</span>
            </h1>
            
            <p className="font-inter text-gray-600 text-sm leading-[1.8] max-w-[400px] mb-6">
              At Violin Events, we believe every celebration has a story. For over 19 years, we have been turning dreams into unforgettable experiences that stay in hearts forever.
            </p>

            <Button variant="champagne" size="md" className="font-montserrat text-[10px] tracking-[0.2em] shadow-none w-fit group">
              MEET OUR TEAM <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ================= FLOATING STATS BAR ================= */}
      <div className="w-full px-4 lg:px-16 max-w-[1400px] mx-auto -mt-16 relative z-30 flex justify-center">
        <div className="bg-white rounded-xl lg:rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#EBE3D5] p-6 lg:p-4 flex flex-col lg:flex-row justify-between items-center w-full max-w-[1000px] gap-6 lg:gap-0">
          {stats.map((stat, idx) => (
            <div key={idx} className={`flex items-center gap-4 px-6 w-full lg:w-auto justify-center lg:justify-start ${idx !== stats.length - 1 ? 'lg:border-r border-[#EBE3D5]' : ''}`}>
              <div className="w-12 h-12 rounded-full border border-[#C58B48]/30 flex items-center justify-center bg-[#FDFBF7] shrink-0">
                <stat.icon className="w-5 h-5 text-[#C58B48]" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h3 className="font-cormorant text-2xl text-[#1F2937] leading-none mb-1">{stat.number}</h3>
                <span className="font-montserrat text-[8px] font-bold tracking-widest text-gray-400 uppercase">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= OUR STORY SECTION ================= */}
      <section className="py-24 relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
                OUR STORY
              </span>
              <h2 className="font-cormorant text-4xl lg:text-[52px] text-[#1F2937] leading-[1.1] mb-6">
                Where It All <span className="italic text-[#C58B48]">Began</span>
              </h2>
              <div className="w-12 h-[1px] bg-[#C58B48]/50 mb-6" />
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-4">
                Founded with a simple vision to create unforgettable moments that tell a story, Violin Events has grown into a trusted name in the world of celebrations and experiences.
              </p>
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-4">
                What began as a passion for crafting beautiful celebrations has evolved through years of experience, creativity, relationships, and an unwavering commitment to excellence.
              </p>
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-8">
                Every celebration has taught us something new. Every client has added another chapter to our journey. And every experience has strengthened our belief that the most meaningful events are the ones that feel truly personal.
              </p>
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-10">
                Today, our journey continues with the same curiosity and passion that started it all.
              </p>
              <Button variant="outline" size="md" className="font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] hover:border-[#C58B48] w-fit group">
                EXPLORE OUR JOURNEY <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Right Images (Masonry-style) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] sm:h-[600px] w-full"
            >
              {/* Decorative Gold Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C58B48]/10 rounded-full blur-[80px]" />
              
              <div className="absolute top-0 right-4 w-[55%] h-[55%] rounded-xl overflow-hidden shadow-sm border border-[#EBE3D5] z-20">
                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80" alt="Event planning" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-4 right-0 w-[45%] h-[40%] rounded-xl overflow-hidden shadow-sm border border-[#EBE3D5] z-10">
                <img src="https://images.unsplash.com/photo-1530023367847-a683933f4172?w=600&q=80" alt="Wedding decor" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-12 left-4 w-[48%] h-[50%] rounded-xl overflow-hidden shadow-sm border border-[#EBE3D5] z-30">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80" alt="Event celebration" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= VISION & MISSION SECTION ================= */}
      <section className="py-24 bg-white border-y border-[#EBE3D5]/50">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
              VISION & MISSION
            </span>
            <h2 className="font-cormorant text-4xl lg:text-[46px] text-[#1F2937]">
              Our Purpose
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#FDFBF7] p-10 lg:p-12 rounded-2xl border border-[#EBE3D5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(197,139,72,0.06)] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-full border border-[#C58B48]/30 flex items-center justify-center bg-white mb-6">
                <Eye className="w-6 h-6 text-[#C58B48]" strokeWidth={1.5} />
              </div>
              <h3 className="font-cormorant text-3xl text-[#1F2937] mb-4">Our Vision</h3>
              <p className="font-inter text-sm text-gray-600 leading-relaxed">
                To be a global leader in the event industry by creating extraordinary experiences that inspire, connect, and leave lasting memories.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-[#FDFBF7] p-10 lg:p-12 rounded-2xl border border-[#EBE3D5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(197,139,72,0.06)] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-full border border-[#C58B48]/30 flex items-center justify-center bg-white mb-6">
                <Target className="w-6 h-6 text-[#C58B48]" strokeWidth={1.5} />
              </div>
              <h3 className="font-cormorant text-3xl text-[#1F2937] mb-4">Our Mission</h3>
              <p className="font-inter text-sm text-gray-600 leading-relaxed">
                To turn our clients' dreams into reality through creativity, precision, passion, and personalised service while continuously setting new benchmarks of excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= OUR VALUES ================= */}
      <section className="py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
            OUR VALUES
          </span>
          <h2 className="font-cormorant text-4xl lg:text-[46px] text-[#1F2937] mb-16">
            What Drives Us
          </h2>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-[#FDFBF7] p-8 lg:p-10 rounded-xl border border-[#EBE3D5] flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(197,139,72,0.08)] hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-full border border-[#C58B48]/30 flex items-center justify-center bg-white mb-6 group-hover:bg-[#C58B48] transition-colors duration-500">
                  <value.icon className="w-6 h-6 text-[#C58B48] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-cormorant text-2xl text-[#1F2937] mb-4">
                  {value.title}
                </h3>
                <p className="font-inter text-xs text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT THE FOUNDER ================= */}
      <section className="py-24 bg-white border-y border-[#EBE3D5]/50">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            
            {/* Left - Founder Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#EBE3D5] aspect-[3/4]">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" 
                  alt="Founder - Shubham Pancheshwar" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-[#C58B48]/20 rounded-full z-[-1]" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#C58B48]/10 rounded-full z-[-1]" />
            </motion.div>

            {/* Right - Founder Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
                ABOUT THE FOUNDER
              </span>
              <h2 className="font-cormorant text-4xl lg:text-[48px] text-[#1F2937] leading-[1.1] mb-6">
                The Vision Behind <br />
                <span className="italic text-[#C58B48]">Violin Events</span>
              </h2>
              <div className="w-12 h-[1px] bg-[#C58B48]/50 mb-6" />
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-4">
                Violin Events was founded by <strong>Mr. Shubham Pancheshwar</strong>, a creative thinker and passionate event professional with a vision to redefine the way experiences are created.
              </p>
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-4">
                With an eye for detail and a heart for people, he envisioned a company that goes beyond planning events. A company that creates emotions, connections, and meaningful memories.
              </p>
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-8">
                His leadership and values continue to shape Violin Events into a brand synonymous with trust, creativity, and impeccable execution.
              </p>

              {/* Founder's Quote */}
              <div className="bg-[#FDFBF7] border border-[#EBE3D5] rounded-xl p-6 mb-8">
                <Quote className="w-6 h-6 text-[#C58B48] mb-3" strokeWidth={1.5} />
                <p className="font-inter text-sm text-gray-700 italic leading-relaxed">
                  "We don't just plan events, we craft experiences that stay with you forever."
                </p>
              </div>

              <Button variant="outline" size="md" className="font-montserrat text-[9px] border-[#EBE3D5] text-[#1F2937] hover:border-[#C58B48] w-fit group">
                OUR JOURNEY <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= BRAND PROMISE / HIGHLIGHTS ================= */}
      <section className="py-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="bg-[#F5EFE6] rounded-2xl p-10 lg:p-16">
            <div className="text-center mb-12">
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
                OUR BRAND PROMISE
              </span>
              <h2 className="font-cormorant text-4xl lg:text-[46px] text-[#1F2937]">
                What Sets Us Apart
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {brandPromises.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 lg:p-8 text-center border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-full border border-[#C58B48]/30 flex items-center justify-center bg-white mx-auto mb-4">
                    <item.icon className="w-5 h-5 text-[#C58B48]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-montserrat text-[11px] font-bold tracking-widest text-[#1F2937] mb-2">
                    {item.number}
                  </h3>
                  <p className="font-inter text-xs text-gray-500 leading-relaxed">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE TEAM ================= */}
      <section className="py-24 relative">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
            OUR TEAM
          </span>
          <h2 className="font-cormorant text-4xl lg:text-[46px] text-[#1F2937] mb-4">
            The Faces Behind the Magic
          </h2>
          <p className="font-inter text-gray-500 text-sm max-w-xl mx-auto mb-16">
            Meet the passionate professionals who bring your dreams to life with creativity, dedication, and precision.
          </p>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="flex flex-col text-left group cursor-pointer"
              >
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden mb-5 relative shadow-sm border border-[#EBE3D5]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="font-cormorant text-2xl text-[#1F2937] leading-none mb-2">
                  {member.name}
                </h3>
                <p className="font-montserrat text-[8px] font-bold tracking-widest uppercase text-[#C58B48]">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-12 px-6 lg:px-16 w-full max-w-[1400px] mx-auto">
        <div className="w-full bg-[#F5EFE6] rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#EBE3D5]">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              READY TO BEGIN?
            </span>
            <h2 className="font-cormorant text-4xl lg:text-[48px] text-[#1F2937] leading-[1.1] mb-6">
              Let's Create Something <br/>
              <span className="italic text-[#C58B48]">Extraordinary Together</span>
            </h2>
            <p className="font-inter text-sm text-gray-600 leading-relaxed mb-10 max-w-sm">
              Let's turn your vision into reality. Get in touch with our expert team today and start planning an experience that feels uniquely yours.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button variant="champagne" size="md" className="font-montserrat text-[10px] w-full sm:w-auto shadow-none group">
                GET STARTED <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 h-[300px] lg:h-auto relative">
             <img 
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

export default About;