import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ARRAY ───
const steps = [
  {
    num: "01",
    title: "DISCOVER",
    sub: "We begin with you.",
    desc: "Understanding your story, aspirations and dreams to create a vision that's uniquely yours.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
  },
  {
    num: "02",
    title: "DESIGN",
    sub: "Conceptualizing beauty.",
    desc: "Bespoke designs and concepts meticulously crafted to reflect your personality and the essence of celebration.",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
  },
  {
    num: "03",
    title: "CURATE",
    sub: "Bringing it to life.",
    desc: "Handpicking the finest elements, artisans, and experiences to bring every detail to life.",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  },
  {
    num: "04",
    title: "EXECUTE",
    sub: "Flawless in every moment.",
    desc: "Seamless coordination and precision execution where every element comes together to create magic beyond expectations.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
  },
  {
    num: "05",
    title: "CELEBRATE",
    sub: "Memories that last forever.",
    desc: "You enjoy every moment. We create memories that you and your guests will cherish for a lifetime and beyond.",
    image: "https://images.unsplash.com/photo-1530103862676-de3c9de59a9e?w=800&q=80",
  },
];

const ProcessSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const trackRef = useRef(null);
  const dotRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const currentStepRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollProxy = { p: 0 };
      const totalSteps = steps.length - 1;

      gsap.to(scrollProxy, {
        p: totalSteps,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, 
          start: "top top",
          end: "+=4000", // Smooth scrolling duration
          onUpdate: () => {
            const p = scrollProxy.p;
            
            const roundedP = Math.round(p);
            if (roundedP !== currentStepRef.current) {
              currentStepRef.current = roundedP;
              setActiveStep(roundedP);
            }

            // The 3D Fan Math
            cardsRef.current.forEach((card, index) => {
              if (!card) return;
              
              const diff = index - p;
              const absDiff = Math.abs(diff);
              const sign = Math.sign(diff);
              
              // Wider spread so background cards are clearly visible
              const xOffset = window.innerWidth < 1024 ? 100 : 210; 
              // Push them deeper into the background
              const zOffset = window.innerWidth < 1024 ? 150 : 280;
              // Angle them to face inward
              const rotateAmount = 28;

              const x = diff * xOffset;
              const z = -absDiff * zOffset;
              const rotateY = -sign * (absDiff * rotateAmount);
              const scale = 1 - (absDiff * 0.12);
              const opacity = 1 - (absDiff * 0.15); // Fade them less so they stay visible

              // Dynamic 3D shadows based on depth
              const boxShadow = absDiff === 0 
                ? "0 40px 100px rgba(0,0,0,0.9), 0 0 60px rgba(212,175,55,0.2)" // Glowing center
                : `${sign * 30}px 30px 60px rgba(0,0,0,0.8)`; // Deep directional shadows for side cards

              gsap.set(card, {
                x: x,
                z: z,
                rotateY: rotateY,
                scale: scale,
                opacity: opacity,
                xPercent: -50,
                yPercent: -50,
                boxShadow: boxShadow,
                zIndex: 50 - Math.abs(Math.round(diff * 10)),
              });
            });

            // Progress Dot Animation
            if (trackRef.current && dotRef.current) {
              const trackHeight = trackRef.current.clientHeight;
              const dotHeight = dotRef.current.clientHeight;
              const maxTravel = trackHeight - dotHeight;
              
              const yPos = (p / totalSteps) * maxTravel;
              gsap.set(dotRef.current, { y: yPos });
            }
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen max-h-screen overflow-hidden bg-[#0A0A0A] flex items-center justify-center box-border"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2A1D10]/40 via-[#0A0A0A] to-[#0A0A0A] pointer-events-none" />

      <div className="relative w-full h-full max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between">
        
        {/* ================= LEFT COLUMN: TEXT (25% Width) ================= */}
        <div className="w-full lg:w-1/4 h-full flex items-center relative z-20 pointer-events-none">
          <div className="pointer-events-auto flex items-center w-full mt-10 lg:mt-0">
            
            {/* Progress Track */}
            <div className="relative flex flex-col justify-between items-center w-8 h-[250px] lg:h-[400px] mr-6 lg:mr-10">
              <div ref={trackRef} className="absolute top-0 bottom-0 w-[1px] bg-white/20" />
              <div
                ref={dotRef}
                className="absolute top-0 w-3 h-3 rounded-full bg-[#C49A5A] shadow-[0_0_15px_#C49A5A] z-10"
              />
              <span className="absolute -top-8 text-[#C49A5A] text-xs font-serif">01</span>
              <span className="absolute -bottom-8 text-white/50 text-xs font-serif">06</span>
              {steps.map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30 z-0" />
              ))}
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              <h4 className="font-manrope text-[9px] lg:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C49A5A] mb-4">
                OUR METHODOLOGY
              </h4>
              
              <h2 className="flex flex-col mb-6">
                <span className="font-serif text-3xl lg:text-5xl xl:text-[56px] font-medium leading-[1.1] text-white lg:font-canela">
                  From Vision to
                </span>
                <span className="font-serif text-3xl lg:text-5xl xl:text-[56px] font-medium leading-[1.1] text-[#C58B48] lg:font-canela">
                  Masterpiece.
                </span>
              </h2>
              
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-1.5 w-1.5 rotate-45 border border-[#C58B48]" />
                 <div className="h-[1px] w-16 bg-[#C58B48]/40" />
              </div>

              <p className="font-manrope text-[11px] lg:text-[13px] font-normal leading-[1.7] text-white/60 max-w-[320px] mb-10">
                Every extraordinary celebration unfolds through a carefully orchestrated journey.
                Scroll to experience each chapter of our creative process.
              </p>

              {/* Watch Our Story Button */}
              <button className="flex items-center gap-4 text-[#C49A5A] hover:text-white transition-colors w-max group cursor-pointer pointer-events-auto">
                <div className="w-10 h-10 rounded-full border border-[#C49A5A] flex items-center justify-center group-hover:bg-[#C49A5A] group-hover:border-transparent transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span className="font-manrope text-[10px] font-semibold tracking-widest uppercase">
                  Watch Our Story
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* ================= RIGHT COLUMN: 3D CAROUSEL (75% Width) ================= */}
        <div 
          className="w-full lg:w-3/4 absolute lg:relative h-full flex items-center justify-center overflow-visible z-10"
          style={{ perspective: "1800px" }} // Higher perspective for a more natural 3D view
        >
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              // Tall, elegant monolith card dimensions
              className="absolute top-1/2 left-1/2 w-[220px] h-[400px] md:w-[260px] md:h-[480px] lg:w-[320px] lg:h-[580px] xl:w-[360px] xl:h-[660px] rounded-[16px] xl:rounded-[24px] flex flex-col items-center justify-center cursor-default transition-transform duration-300 ease-out"
              style={{
                transformStyle: "preserve-3d",
                // The thick 3D metallic edge
                background: "linear-gradient(145deg, #FFF1D0 0%, #C5A880 30%, #5C4018 80%, #2A1D10 100%)",
                padding: "4px", 
              }}
            >
              {/* Inner Dark Glass Canvas */}
              <div className="relative w-full h-full rounded-[13px] xl:rounded-[20px] bg-[#0A0A0A] overflow-hidden flex flex-col items-center ring-1 ring-inset ring-white/10">
                
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-[0.15] mix-blend-screen"
                />
                
                {/* Layered gradients for deep contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-transparent" />

                <div className="relative z-10 w-full h-full flex flex-col items-center text-center p-6 lg:p-8">
                  
                  {/* Stylized Number */}
                  <span className="font-serif text-[56px] lg:text-[80px] font-medium leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#E9C38A] to-[#855F37] mt-10 mb-auto lg:font-canela drop-shadow-md">
                    {step.num}
                  </span>

                  <div className="mt-auto pb-6 w-full flex flex-col items-center">
                    <h3 className="font-serif text-lg lg:text-[28px] font-medium tracking-tight text-white mb-2 lg:font-canela">
                      {step.title}
                    </h3>
                    <h4 className="font-cormorant text-xs lg:text-[18px] font-medium italic text-[#C99754] mb-4">
                      {step.sub}
                    </h4>
                    
                    <p className="font-manrope text-[9px] lg:text-[12px] font-normal leading-[1.6] text-white/60 max-w-[85%] mx-auto">
                      {step.desc}
                    </p>

                    {/* Small arrow icon at the bottom of the card */}
                    <div className="mt-8 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                       <ArrowRight className="w-3 h-3 text-white/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;