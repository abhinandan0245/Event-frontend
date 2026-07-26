import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// === FAQ DATA ===
const faqs = [
  {
    num: "01",
    question: "What services does Violin Events LLP offer?",
    answer:
      "Violin Events LLP provides end-to-end wedding and event planning, including venue sourcing, design & décor, hospitality management, entertainment, logistics, guest experiences, and on-site coordination.",
  },
  {
    num: "02",
    question: "How far in advance should we begin planning our wedding?",
    answer:
      "For destination weddings and large-scale celebrations, we recommend beginning the planning process 8–12 months in advance to ensure access to preferred venues and vendors.",
  },
  {
    num: "03",
    question: "Do you specialize in destination weddings?",
    answer:
      "Yes. We curate luxury destination weddings across India's most iconic locations and selected international destinations, ensuring a seamless experience for couples and guests alike.",
  },
  {
    num: "04",
    question: "Can you assist with venue selection and booking?",
    answer:
      "Absolutely. Our team helps identify, evaluate, and secure venues that align with your vision, guest requirements, and celebration style.",
  },
  {
    num: "05",
    question: "How do you personalize each celebration?",
    answer:
      "Every wedding is thoughtfully designed around the couple's story, preferences, traditions, and aspirations, resulting in a truly unique and memorable experience.",
  },
  {
    num: "06",
    question: "Do you manage weddings outside India?",
    answer:
      "Yes. We assist with both domestic and international celebrations, offering planning, coordination, and guest management services across multiple destinations.",
  },
];

// === INDIVIDUAL ACCORDION COMPONENT ===
const FAQItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="w-full bg-white/95 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-sm mb-4 transition-all duration-300 cursor-pointer hover:scale-[1.02] transform-gpu border border-[#F2EBE1]"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          {/* Golden Circle Number */}
          <div className="w-8 h-8 rounded-full bg-[#C58B48] flex items-center justify-center shrink-0">
            <span className="font-montserrat text-[11px] font-semibold text-white">
              {item.num}
            </span>
          </div>
          <h3 className="font-cormorant text-lg md:text-xl font-medium text-[#1F2937]">
            {item.question}
          </h3>
        </div>
        <div className="text-[#C58B48] shrink-0 ml-4">
          {isOpen ? (
            <Minus size={18} strokeWidth={1.5} />
          ) : (
            <Plus size={18} strokeWidth={1.5} />
          )}
        </div>
      </div>

      {/* Smooth Expand/Collapse Answer */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-5"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pt-4 border-t border-[#F2EBE1] ml-[52px]">
            <p className="font-inter text-[13px] leading-relaxed text-gray-600 pr-4">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// === MAIN SECTION COMPONENT ===
const FAQSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const faqListRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Text Entrance Animation
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // 2. FAQ Cards Staggered Entrance Animation
      gsap.fromTo(
        faqListRef.current.children,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faqListRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FDFBF7] py-20 lg:py-28 overflow-hidden"
    >
      {/* --- INJECT CUSTOM FONTS (Optional if already in global CSS) --- */}
      <style>
        {`
          .font-cormorant { font-family: 'Cormorant Garamond', serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          .font-montserrat { font-family: 'Montserrat', sans-serif; }
        `}
      </style>

      {/* === BACKGROUND ELEMENTS === */}
      {/* Left Floral Graphic Simulation */}
      <div className="absolute top-0 left-0 w-64 md:w-96 h-full opacity-20 pointer-events-none z-0">
        <img
          src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80"
          alt="Floral"
          className="w-full h-full object-cover mix-blend-multiply grayscale-[50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FDFBF7]" />
      </div>

      {/* Right Wedding Image Fading In */}
      <div className="absolute top-0 right-0 w-[45%] h-[80%] opacity-80 pointer-events-none z-0">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1000&q=80"
          alt="Wedding Setup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/30 via-transparent to-[#FDFBF7]" />
      </div>

      {/* === TOP CENTER LABEL === */}
      <div className="relative z-10 flex flex-col items-center mb-16 lg:mb-24">
        <span className="font-montserrat text-[#C58B48] tracking-[0.25em] text-[10px] font-bold uppercase">
          FAQS
        </span>
        <div className="w-16 h-[1px] bg-[#C58B48]/50 mt-3 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border border-[#C58B48] bg-[#FDFBF7]" />
        </div>
      </div>

      {/* === MAIN CONTENT GRID === */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left Column: Heading & Description */}
        <div ref={textRef} className="lg:col-span-5 flex flex-col pt-4">
          <h2 className="font-cormorant text-5xl lg:text-[64px] text-[#1F2937] leading-[1.1] mb-6">
            Frequently <br />
            <span className="italic text-[#C58B48]">Asked Questions</span>
          </h2>

          <div className="w-12 h-[1px] bg-[#C58B48]/40 mb-6" />

          <p className="font-inter text-sm lg:text-[15px] leading-relaxed text-gray-600 max-w-sm mb-16">
            Find answers to the most common questions about destination
            weddings, luxury celebrations, event planning, and our bespoke
            services.
          </p>

          {/* V Logo Watermark */}
          <div className="mt-auto opacity-70">
            <span className="font-cormorant text-6xl text-[#C58B48]">V</span>
            <div className="flex items-center gap-1 mt-2 opacity-50">
              <div className="w-2 h-2 rotate-45 border border-[#C58B48]" />
              <div className="w-1 h-1 rotate-45 bg-[#C58B48]" />
            </div>
          </div>
        </div>

        {/* Right Column: FAQ Accordion List */}
        <div ref={faqListRef} className="lg:col-span-7 flex flex-col z-20">
          {faqs.map((faq, index) => (
            <FAQItem key={index} item={faq} />
          ))}
        </div>
      </div>

      {/* === BOTTOM CTA SECTION === */}
      <div className="relative z-10 w-full mt-32 lg:mt-40 px-6 flex flex-col items-center text-center">
        <span className="font-montserrat text-[#C58B48] tracking-[0.2em] text-[10px] md:text-xs font-bold uppercase mb-4">
          STILL HAVE QUESTIONS?
        </span>

        <h3 className="font-cormorant text-4xl md:text-5xl text-[#1F2937] mb-4 max-w-2xl leading-tight">
          Let's Create Something{" "}
          <span className="italic text-[#C58B48]">Extraordinary</span> Together
        </h3>

        <p className="font-inter text-sm text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
          Connect with our team to discuss your vision and discover how we can
          bring your celebration to life.
        </p>

        <button className="px-8 py-3.5 bg-[#C58B48] text-white font-montserrat text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#A8753B] transition-colors shadow-md hover:shadow-xl transform hover:-translate-y-0.5">
          SCHEDULE A CONSULTATION
        </button>
      </div>
    </section>
  );
};

export default FAQSection;
