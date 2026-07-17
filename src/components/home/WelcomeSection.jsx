import { useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, MapPin, Calendar, Award } from "lucide-react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { Tilt } from "react-tilt";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Award, value: "500+", label: "Weddings Planned" },
  { icon: MapPin, value: "50+", label: "Destinations" },
  { icon: Calendar, value: "12+", label: "Years of Excellence" },
];

const defaultOptions = {
  reverse: false,
  max: 20, // Max tilt rotation (degrees)
  perspective: 1500,
  scale: 1.03, // Zoom effect on hover
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const WelcomeSection = () => {
  const sectionRef = useRef(null);
  const cardContainerRef = useRef(null);
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const bgFrameRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Safely calculate random particles only once per mounting
  const particlePositions = useMemo(
    () =>
      [...Array(10)].map(() => ({
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        endX: Math.random() * 100,
        endY: Math.random() * 100,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    [],
  );

  useGSAP(
    () => {
      const card = cardRef.current;
      const glow = glowRef.current;
      const bgFrame = bgFrameRef.current;

      // Soft ambient pulsing glow
      gsap.to(glow, {
        scale: 1.25,
        opacity: 0.4,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Subtle rotation on the background luxury lines frame
      gsap.to(bgFrame, {
        rotate: 360,
        duration: 45,
        repeat: -1,
        ease: "none",
      });

      // Staggered entrance animation for left-side typography
      gsap.from(".welcome-stagger", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // High-Performance GSAP numeric counters
      gsap.utils.toArray(".welcome-stat-number").forEach((el) => {
        const target = parseFloat(el.dataset.value);
        const suffix = el.dataset.suffix || "";
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
            onUpdate: function () {
              el.textContent =
                Math.ceil(this.targets()[0].textContent) + suffix;
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  const handleMouseMove = (e) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden text-neutral-800"
      style={{
        backgroundColor: "#FAF9F5", // Dynamic warm light ivory theme
        paddingTop: "7rem",
        paddingBottom: "7rem",
      }}
    >
      {/* Ambient background light orbs */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] pointer-events-none rounded-full blur-[130px] z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(245,238,220,0.5) 0%, rgba(245,238,220,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] pointer-events-none rounded-full blur-[130px] z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(250,230,220,0.4) 0%, rgba(250,230,220,0) 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content Side */}
          <div className="order-1 flex flex-col justify-center">
            <span className="welcome-stagger text-amber-800 tracking-[0.35em] font-medium text-xs uppercase inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              WELCOME TO VIOLIN EVENTS
            </span>

            <h2 className="welcome-stagger text-4xl lg:text-5xl font-serif font-light tracking-tight text-neutral-900 leading-tight">
              Redefining luxury <br />
              <span className="italic font-normal text-amber-700">
                Weddings & Celebrations
              </span>
            </h2>

            <p className="welcome-stagger text-xs lg:text-sm text-neutral-500 font-light leading-relaxed tracking-wide mt-6 max-w-xl">
              At Violin Events, we believe every celebration should be a
              singular masterpiece. With a passion for perfection and an eye for
              architectural detail, we curate momentous celebrations that blend
              timeless traditions, uncompromised elegance, and unforgettable
              memories.
            </p>

            {/* Premium Stats Row */}
            <div className="welcome-stagger mt-10 grid grid-cols-3 gap-6 border-t border-neutral-200/60 pt-8">
              {stats.map(({ icon: Icon, value, label }, i) => {
                const numMatch = value.match(/[\d.]+/)?.[0] || "0";
                const suffix = value.replace(numMatch, "");
                return (
                  <div key={i} className="text-left">
                    <div className="w-8 h-8 rounded-full bg-amber-950/5 text-amber-800 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 stroke-[1.25]" />
                    </div>
                    <div className="text-xl sm:text-2xl font-serif tracking-tight text-neutral-950 font-semibold">
                      <span
                        className="welcome-stat-number"
                        data-value={numMatch}
                        data-suffix={suffix}
                      >
                        0{suffix}
                      </span>
                    </div>
                    <div className="text-[10px] tracking-widest text-neutral-400 uppercase mt-1">
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Redesigned Minimalist Quote block */}
            <div className="welcome-stagger mt-10 relative pl-6 border-l-2 border-amber-700/30">
              <span className="absolute -left-[5px] -top-2 text-3xl text-amber-700/30 font-serif italic">
                “
              </span>
              <p className="text-neutral-700 text-sm md:text-base font-serif italic leading-relaxed">
                We don't merely produce events — we manifest living tapestries
                of your imagination.
              </p>
            </div>

            {/* Elegant Redirect Link CTA */}
            <div className="welcome-stagger mt-10">
              <Link to="/about">
                <Button
                  variant="secondary"
                  className="border-neutral-300 text-amber-800 hover:bg-neutral-100 hover:border-amber-700 px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm"
                >
                  Our Story
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Architectural 3D Layered Card Frame */}
          {/* Right Side: Architectural 3D Layered Card Frame */}
          <div className="order-2 flex justify-center items-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5]">
              {/* Back Soft Glow */}
              <div
                ref={glowRef}
                className="absolute -inset-10 bg-gradient-to-tr from-amber-200/10 via-rose-200/10 to-transparent rounded-full blur-3xl opacity-50 z-0 pointer-events-none"
              />

              {/* Rotating background geometric line ring */}
              <div
                ref={bgFrameRef}
                className="absolute -inset-6 rounded-full border border-dashed border-amber-800/15 pointer-events-none z-0"
              />

              {/* NEW: Tilt Implementation */}
              <Tilt options={defaultOptions} className="relative w-full h-full">
                <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/60 transform-gpu z-10">
                  {/* Main Portrait Media Content */}
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=1000&fit=crop"
                    alt="Luxury Wedding Celebration"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Layers */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent z-10" />
                  <div className="absolute inset-4 rounded-[2.5rem] border border-white/20 pointer-events-none z-20" />

                  {/* Particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    {particlePositions.map((p, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-200/40 rounded-full"
                        initial={{
                          left: `${p.startX}%`,
                          top: `${p.startY}%`,
                          opacity: 0,
                        }}
                        animate={{
                          left: `${p.endX}%`,
                          top: `${p.endY}%`,
                          opacity: [0, 0.7, 0],
                          scale: [0, 2.5, 0],
                        }}
                        transition={{
                          duration: p.duration,
                          repeat: Infinity,
                          delay: p.delay,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Tilt>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
