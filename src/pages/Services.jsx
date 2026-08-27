import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarDays,
  CheckCircle,
  ArrowRight,
  Search,
  PenTool,
  GlassWater,
  ArrowDown
} from "lucide-react";
import Button from "../components/ui/Button";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ================= ENHANCED PREMIUM 3D CARD WITH GLARE =================
const Premium3DCard = ({ children, className, onMouseEnter, onMouseLeave, borderRadiusClass = "rounded-xl" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
    glareX.set((mouseX / width) * 100);
    glareY.set((mouseY / height) * 100);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        glareOpacity.set(1);
        if (onMouseEnter) onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        x.set(0);
        y.set(0);
        glareOpacity.set(0);
        if (onMouseLeave) onMouseLeave(e);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative h-full ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className={`w-full h-full relative ${borderRadiusClass} overflow-hidden group`}>
        {children}
        <motion.div
          className={`absolute inset-0 z-50 pointer-events-none ${borderRadiusClass} transition-opacity duration-300 mix-blend-overlay`}
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%)`
            )
          }}
        />
      </div>
    </motion.div>
  );
};

// ================= MAIN COMPONENT =================
const Services = () => {
  const compRef = useRef(null);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");

  const handleCursorState = (variant, text = "") => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  // Hero Parallax State
  const globalX = useMotionValue(0);
  const globalY = useMotionValue(0);
  const heroX = useTransform(globalX, [0, window.innerWidth], [15, -15]);
  const heroY = useTransform(globalY, [0, window.innerHeight], [15, -15]);
  const bgX = useTransform(globalX, [0, window.innerWidth], [-15, 15]);
  const bgY = useTransform(globalY, [0, window.innerHeight], [-15, 15]);

  useEffect(() => {
    const handleGlobalMouse = (e) => {
      globalX.set(e.clientX);
      globalY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleGlobalMouse);
    return () => window.removeEventListener("mousemove", handleGlobalMouse);
  }, [globalX, globalY]);

  // GSAP Animations
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Elements Animation
      gsap.from(".hero-element", {
        y: 60,
        opacity: 0,
        rotationX: -20,
        transformPerspective: 1000,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      // Intro Text Animation
      gsap.from(".intro-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top 80%",
        }
      });

      // Grid Cards Animation - Batched for better performance with 25 items
      gsap.utils.toArray(".service-card-wrapper").forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotationY: 10,
          transformPerspective: 1000,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });

      // Process Timeline
      gsap.from(".process-step", {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".process-container",
          start: "top 85%",
        },
      });
    }, compRef);

    return () => ctx.revert();
  }, []);

  // === UPDATED DATA ARRAYS WITH ALL 25 SERVICES AND LOCAL IMAGES ===
  const servicesList = [
    {
      title: "Wedding Planning & Management",
      desc: "End-to-end wedding planning covering concepts, budgets, vendors, timelines, guest management and flawless execution from beginning to celebration.",
      image: "/assets/service/Wedding Planning & Management.png",
    },
    {
      title: "Destination Weddings",
      desc: "Complete destination wedding management including venue selection, hospitality, transportation, décor, entertainment, guest experiences and on-ground coordination.",
      image: "/assets/service/DESTINATION WEDDING.png",
    },
    {
      title: "Corporate Events",
      desc: "Professional planning for conferences, seminars, launches, award ceremonies, annual events, exhibitions, networking meets and corporate celebrations.",
      image: "/assets/service/CORPORATE EVENTS.png",
    },
    {
      title: "Social & Private Events",
      desc: "Creating memorable birthdays, anniversaries, engagements, cocktail parties, reunions and private celebrations with personalized planning and execution.",
      image: "/assets/service/Social & Private Events.png",
    },
    {
      title: "Event Concept & Creative Design",
      desc: "Developing distinctive event concepts, themes and creative experiences that bring your vision to life through thoughtful design and storytelling.",
      image: "/assets/service/EVENT CONCEPT AND DESIGN.png",
    },
    {
      title: "Décor & Venue Styling",
      desc: "Transforming venues through customized décor, floral installations, furniture, lighting, stage design and thematic elements tailored to every occasion.",
      image: "/assets/service/Décor & Venue Styling.png",
    },
    {
      title: "Event Production",
      desc: "Managing complete technical production including stages, structures, sound, lighting, LED screens, power, rigging and professional event equipment.",
      image: "/assets/service/EVENT PRODUCTION.png",
    },
    {
      title: "Artist & Entertainment",
      desc: "Curating and managing singers, DJs, bands, dancers, celebrity performers, anchors, comedians and specialty artists for unforgettable entertainment experiences.",
      image: "/assets/service/Artist & Entertainment.png",
    },
    {
      title: "Hospitality & Guest Management",
      desc: "Delivering seamless guest experiences through welcome desks, hospitality teams, accommodation assistance, guest communication and personalized on-ground support.",
      image: "/assets/service/Hospitality & Guest Management.png",
    },
    {
      title: "Venue & Hotel Management",
      desc: "Sourcing, negotiating and coordinating hotels, resorts, banquet halls, convention centres and unique venues according to event requirements.",
      image: "/assets/service/Venue & Hotel Management.png",
    },
    {
      title: "Food & Beverage Management",
      desc: "Planning menus, catering services, beverage counters, live stations and dining experiences while coordinating quality, presentation and service standards.",
      image: "/assets/service/Food & Beverage Management.png",
    },
    {
      title: "Event Logistics & Transportation",
      desc: "Coordinating vehicles, airport transfers, guest movements, equipment transportation, vendor schedules and logistics to keep every event running smoothly.",
      image: "/assets/service/Event Logistics & Transportation.png",
    },
    {
      title: "Budget & Vendor Management",
      desc: "Planning budgets, negotiating with vendors, tracking expenses and coordinating multiple partners to deliver exceptional experiences within planned investments.",
      image: "/assets/service/Budget & Vendor Management.png",
    },
    {
      title: "Invitations & Event Collaterals",
      desc: "Creating bespoke invitations, stationery, signage, itineraries, welcome kits, menus, hampers and branded materials that complement your event identity.",
      image: "/assets/service/Invitations & Event Collaterals.png",
    },
    {
      title: "RSVP & Guest Communication",
      desc: "Managing invitations, confirmations, guest databases, reminders and communication to ensure accurate attendance information and smooth guest coordination.",
      image: "/assets/service/RSVP & Guest Communication.png",
    },
    {
      title: "Photography & Cinematography",
      desc: "Coordinating professional photography and cinematography teams to capture genuine emotions, important details and unforgettable moments throughout your event.",
      image: "/assets/service/Photography & Cinematography.png",
    },
    {
      title: "Branding & Corporate Identity",
      desc: "Creating event branding through creative themes, stage graphics, signage, digital assets, installations and visual elements aligned with your identity.",
      image: "/assets/service/BRANDING.png",
    },
    {
      title: "Exhibitions & Experiential Events",
      desc: "Planning exhibitions, stalls, brand activations and experiential spaces designed to attract audiences, communicate messages and create meaningful brand interactions.",
      image: "/assets/service/EXHIBITIONS.png",
    },
    {
      title: "Special Effects & Fireworks",
      desc: "Creating spectacular moments through fireworks, cold sparks, confetti, atmospheric effects, pyrotechnic experiences and customized visual productions.",
      image: "/assets/service/Special Effects & Fireworks.png",
    },
    {
      title: "Stage & Show Management",
      desc: "Managing stage programming, rehearsals, artist coordination, show flow, backstage operations and technical teams for professionally executed live experiences.",
      image: "/assets/service/STAGE MANAGEMENT.png",
    },
    {
      title: "Celebrity & VIP Management",
      desc: "Coordinating celebrity appearances, VIP movements, hospitality, security requirements, green rooms and personalized experiences for distinguished guests.",
      image: "/assets/service/Celebrity & VIP Management.png",
    },
    {
      title: "Brand Activations",
      desc: "Designing interactive brand experiences, promotional events, launches and consumer engagements that connect brands with audiences in memorable ways.",
      image: "/assets/service/BRAND ACTIVATIONS.png",
    },
    {
      title: "Conferences & MICE Events",
      desc: "Managing meetings, incentives, conferences and exhibitions with professional planning, delegate management, production, hospitality and destination coordination.",
      image: "/assets/service/Conferences & MICE Events.png",
    },
    {
      title: "Event Staffing & Manpower",
      desc: "Providing trained event professionals including coordinators, hospitality teams, registration staff, ushers, promoters and on-ground support personnel.",
      image: "/assets/service/EVENT STAFFING.png",
    },
    {
      title: "Complete Event Execution",
      desc: "Bringing every element together through centralized coordination, professional teams and detailed execution to deliver seamless events.",
      image: "/assets/service/COMPLETE EVENT EXECUTION.png",
    },
  ];

  const processSteps = [
    { step: "01", title: "DISCOVER", desc: "We get to know you and your vision.", icon: Search },
    { step: "02", title: "DESIGN", desc: "We conceptualize your dream celebration.", icon: PenTool },
    { step: "03", title: "PLAN", desc: "We plan every detail flawlessly.", icon: CalendarDays },
    { step: "04", title: "EXECUTE", desc: "We bring your dream to life.", icon: CheckCircle },
    { step: "05", title: "CELEBRATE", desc: "You live the moments, we handle the rest.", icon: GlassWater },
  ];

  return (
    <div ref={compRef} className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C58B48] selection:text-white pb-20 overflow-hidden md:cursor-none">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-screen flex items-center pt-24 lg:pt-32 pb-16" style={{ perspective: 1200 }}>
        
        {/* Parallax Background Image */}
        <motion.div style={{ x: bgX, y: bgY }} className="absolute top-0 right-[-5%] w-full lg:w-[70%] h-[110vh] z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop"
            alt="Wedding Celebration Arch"
            className="w-full h-full object-cover opacity-90 scale-110"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 30%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)' }}
          />
        </motion.div>

        {/* Decorative Floral Overlay Left */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] opacity-10 pointer-events-none z-0 mix-blend-multiply grayscale">
          <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80" alt="Floral Decor" className="w-full h-full object-cover" />
        </div>

        {/* Invisible Hover Zone for Cursor */}
        <div 
          className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-10"
          onMouseEnter={() => handleCursorState("explore", "EXPLORE")}
          onMouseLeave={() => handleCursorState("default")}
        />

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col justify-center h-full">
          
          <motion.div style={{ x: heroX, y: heroY }} className="w-full lg:w-[65%] pt-10 pl-0 md:pl-10">
            <span className="hero-element font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              OUR SERVICES
            </span>
            <h1 className="hero-element font-cormorant text-5xl lg:text-[72px] text-[#1F2937] leading-[1.1] mb-6">
              Creating Experiences. <br />
              <span className="italic text-[#C58B48]">Managing Every Detail.</span>
            </h1>
            
            <div className="hero-element flex items-center gap-2 mb-6 opacity-60">
               <div className="w-6 h-[1px] bg-[#C58B48]" />
               <div className="w-2 h-2 rotate-45 border border-[#C58B48]" />
               <div className="w-6 h-[1px] bg-[#C58B48]" />
            </div>

            <p className="hero-element font-inter text-gray-600 text-sm leading-[1.8] max-w-[600px] mb-6">
              Violin Events LLP is a full-service event management company specializing in weddings, destination weddings, corporate events, social celebrations and large-scale events. From creative event planning and décor to entertainment, hospitality, logistics and complete event execution, we bring every element together under one roof.
            </p>
            <p className="hero-element font-inter text-gray-600 text-sm leading-[1.8] max-w-[600px] mb-10">
              Whether you are planning an elegant wedding, a destination celebration, corporate conference, brand activation or private event, our team handles every detail with creativity, precision and seamless coordination.
            </p>

            <Button 
              variant="champagne" 
              size="md" 
              className="hero-element font-montserrat tracking-[0.2em] shadow-none hover:scale-105 transition-transform group"
              onMouseEnter={() => handleCursorState("default")}
              onClick={() => {
                document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              EXPLORE OUR SERVICES <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           transition={{ delay: 1.5, duration: 1 }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 opacity-60 z-20 pointer-events-none"
        >
           <span className="font-montserrat text-[8px] font-bold tracking-[0.2em] uppercase">SCROLL</span>
           <ArrowDown size={14} className="animate-bounce" strokeWidth={1.5} />
        </motion.div>
      </section>

      {/* ================= INTRODUCTORY CONTENT ================= */}
      <section className="intro-section pt-16 pb-10 px-6 lg:px-16 w-full max-w-[1000px] mx-auto text-center z-10 relative">
        <h2 className="intro-text font-cormorant text-3xl lg:text-[40px] text-[#1F2937] mb-6">
          Complete Event Management Services
        </h2>
        <p className="intro-text font-inter text-gray-600 text-sm leading-[1.8] mb-6">
          At Violin Events LLP, our services span everything from wedding planning, destination management, and corporate events to production, styling, and entertainment. With a focus on creativity, professionalism and flawless execution, we transform ideas into memorable experiences while ensuring every event is planned, managed and delivered seamlessly.
        </p>
        <p className="intro-text font-inter text-gray-600 text-sm leading-[1.8]">
          <strong>From Concept to Celebration:</strong> Whether it is an intimate gathering or a large-scale production, we provide end-to-end event management services that combine creative planning, trusted partnerships and experienced execution to create events that leave a lasting impression.
        </p>
      </section>

      {/* ================= WHAT WE OFFER (ARCHED GRID 3D) ================= */}
      <section id="services-grid" className="py-16 lg:py-24 relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          
          <div className="mb-16">
            <div className="flex items-center justify-center gap-2">
               <div className="w-12 h-[1px] bg-[#C58B48]/30" />
               <div className="w-1.5 h-1.5 rotate-45 border border-[#C58B48] bg-[#FDFBF7]" />
               <div className="w-12 h-[1px] bg-[#C58B48]/30" />
            </div>
          </div>

          {/* 3D Arched Cards Grid - Updated to 4/5 columns to fit 25 items better */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6" style={{ perspective: 1500 }}>
            {servicesList.map((service, index) => (
              <div key={index} className="service-card-wrapper h-full">
                <Premium3DCard 
                  borderRadiusClass="rounded-t-full rounded-b-xl"
                  onMouseEnter={() => handleCursorState("view", "VIEW")}
                  onMouseLeave={() => handleCursorState("default")}
                >
                  <div className="flex flex-col items-center text-center group cursor-pointer h-full bg-white border border-[#EBE3D5] rounded-t-full rounded-b-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-2 hover:border-[#C58B48]/40 transition-colors">
                    {/* Image Arch Container */}
                    <div className="w-full pt-[120%] relative rounded-t-full overflow-hidden mb-6 bg-gray-100 border border-[#EBE3D5] flex-shrink-0">
                      <div className="absolute inset-0 rounded-t-full overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-[#FDFBF7]/30 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                        
                       
                      </div>
                    </div>

                    {/* Text Content - Flex-grow ensures buttons align at the bottom */}
                    <div className="flex flex-col flex-grow w-full items-center">
                      <h3 className="font-montserrat text-[10px] lg:text-[11px] font-bold tracking-[0.1em] text-[#1F2937] mb-3 uppercase leading-relaxed h-10 flex items-center justify-center z-10 px-1">
                        {service.title}
                      </h3>
                      <p className="font-inter text-[10px] lg:text-[11px] text-gray-500 leading-relaxed mb-4 px-2 flex-grow z-10">
                        {service.desc}
                      </p>
                      
                      <div className="w-1.5 h-1.5 rotate-45 border border-[#C58B48]/50 mb-4 group-hover:bg-[#C58B48] transition-colors z-10 mt-auto" />
                    </div>
                  </div>
                </Premium3DCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR PROCESS TIMELINE ================= */}
      <section className="py-20 lg:py-28 relative z-10 border-t border-[#EBE3D5]/50 bg-white">
        <div className="process-container w-full max-w-[1200px] mx-auto px-6 text-center">
          
          <div className="mb-16">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
              OUR PROCESS
            </span>
            <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937] mb-4">
              Thoughtfully Crafted. Perfectly Planned.
            </h2>
            <div className="flex items-center justify-center gap-2">
               <div className="w-12 h-[1px] bg-[#C58B48]/30" />
               <div className="w-1.5 h-1.5 rotate-45 border border-[#C58B48]" />
               <div className="w-12 h-[1px] bg-[#C58B48]/30" />
            </div>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Connecting Dashed Line (Desktop) */}
            <div className="hidden md:block absolute top-[36px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-[#C58B48]/40 z-0" />
            
            {processSteps.map((step, index) => (
              <div key={index} className="process-step relative z-10 flex flex-col items-center text-center w-full md:w-[18%] mb-10 md:mb-0 group cursor-default">
                {/* 3D Hover Icon Badge */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotateY: 15, rotateX: 10 }}
                  className="w-[72px] h-[72px] rounded-full bg-[#FDFBF7] border border-[#EBE3D5] flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(0,0,0,0.03)] group-hover:border-[#C58B48]/50 transition-colors"
                >
                   <div className="w-[60px] h-[60px] rounded-full border border-[#C58B48]/30 flex items-center justify-center bg-white group-hover:bg-[#C58B48]/5 transition-colors">
                      <step.icon className="w-6 h-6 text-[#C58B48]" strokeWidth={1} />
                   </div>
                </motion.div>
                {/* Text Content */}
                <span className="font-cormorant text-2xl text-[#1F2937] mb-1">{step.step}</span>
                <h3 className="font-montserrat text-[10px] font-bold tracking-widest uppercase text-[#C58B48] mb-2">{step.title}</h3>
                <p className="font-inter text-[11px] text-gray-500 leading-relaxed max-w-[160px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION (3D) ================= */}
      <section className="py-12 px-6 lg:px-16 w-full max-w-[1400px] mx-auto mt-10" style={{ perspective: 1500 }}>
        <Premium3DCard>
          <div className="w-full bg-[#F5EFE6] rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#EBE3D5] relative z-10 group">
            
            {/* Left Text */}
            <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-20 bg-[#F5EFE6]">
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
                READY TO BEGIN?
              </span>
              <h2 className="font-cormorant text-4xl lg:text-[48px] text-[#1F2937] leading-[1.1] mb-6">
                Let's Create Something <br/>
                <span className="italic text-[#C58B48]">Extraordinary Together</span>
              </h2>
              <p className="font-inter text-sm text-gray-600 leading-relaxed mb-10 max-w-sm">
                Share your vision with us and let our experts craft a celebration that will be remembered for a lifetime.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button 
                  variant="champagne" 
                  size="md" 
                  className="font-montserrat text-[10px] w-full sm:w-max shadow-none hover:scale-105 transition-transform"
                  onClick={() => window.location.href = "/contact"}
                >
                  SCHEDULE A CONSULTATION <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 h-[300px] lg:h-auto relative z-10 overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop" 
                 alt="Luxury Palace Celebration" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
               />
               <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F5EFE6] hidden lg:block" />
               
               {/* Gold Stamp Overlay */}
               <motion.div 
                 whileHover={{ scale: 1.1, rotate: 10 }}
                 className="absolute top-10 right-10 w-28 h-28 rounded-full border border-[#D4AF37]/40 flex items-center justify-center opacity-80 backdrop-blur-md hidden md:flex cursor-pointer bg-white/10"
               >
                  <span className="font-cormorant text-4xl text-[#D4AF37]">V</span>
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]">
                    <path id="curve" d="M 50 15 A 35 35 0 1 1 49.9 15" fill="transparent" />
                    <text className="font-montserrat text-[8.5px] uppercase tracking-[0.2em] fill-[#D4AF37]">
                      <textPath href="#curve">Violin Events LLP • Crafting Timeless Celebrations •</textPath>
                    </text>
                  </svg>
               </motion.div>
            </div>

          </div>
        </Premium3DCard>
      </section>

    </div>
  );
};

export default Services;