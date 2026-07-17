import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, MapPin, Calendar, Award } from "lucide-react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Award, value: "500+", label: "Weddings Planned" },
  { icon: MapPin, value: "50+", label: "Destinations" },
  { icon: Calendar, value: "12+", label: "Years of Excellence" },
];

const WelcomeSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const ringRef = useRef(null);

  // Fixed random values — sirf ek baar generate honge, re-render pe change nahi honge
  const heartPositions = useMemo(
    () =>
      [...Array(6)].map(() => ({
        left: 5 + Math.random() * 90,
        top: 5 + Math.random() * 90,
        size: 20 + Math.random() * 20,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 4,
      })),
    []
  );

  const particlePositions = useMemo(
    () =>
      [...Array(12)].map(() => ({
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        endX: Math.random() * 100,
        endY: Math.random() * 100,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 2,
      })),
    []
  );

  useGSAP(
    () => {
      const card = cardRef.current;
      const glow = glowRef.current;
      const ring = ringRef.current;

      // Glow pulse (yoyo — array syntax hata diya)
      gsap.to(glow, {
        scale: 1.3,
        opacity: 0.7,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Decorative ring — opposite direction rotation (parallax depth feel)
      gsap.to(ring, {
        rotate: -360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      const startRotation = () => {
        gsap.to(card, {
          rotateY: 360,
          rotateX: 15,
          duration: 20,
          repeat: -1,
          ease: "none",
          overwrite: true,
        });
      };

      const startFloat = () => {
        gsap.to(card, {
          y: -15,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          overwrite: "auto",
        });
      };

      const handleMouseEnter = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          y: 0,
          scale: 1.03,
          duration: 0.8,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, { scale: 1, duration: 0.5, ease: "power2.out" });
        startRotation();
        startFloat();
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      // Entrance — card
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.8, rotateY: 30, rotateX: 20 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => {
            startRotation();
            startFloat();
          },
        }
      );

      // Entrance — left text content (stagger)
      gsap.from(".welcome-stagger", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Stats counter
      gsap.utils.toArray(".stat-number").forEach((el) => {
        const target = parseFloat(el.dataset.value);
        const suffix = el.dataset.suffix || "";
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.8,
            ease: "power1.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: el, start: "top 85%" },
            onUpdate: function () {
              el.textContent = Math.ceil(this.targets()[0].textContent) + suffix;
            },
          }
        );
      });

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white relative overflow-hidden py-12 md:py-20 lg:py-24"
    >
      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-rose-500/5 rounded-full blur-3xl" />

      {/* Floating Hearts — fixed positions via useMemo */}
      {heartPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/20 pointer-events-none"
          style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: pos.duration,
            repeat: Infinity,
            delay: pos.delay,
          }}
        >
          <Heart size={pos.size} />
        </motion.div>
      ))}

      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="order-1">
              <span className="welcome-stagger text-pink-500 font-semibold text-sm uppercase tracking-widest inline-flex items-center gap-2">
                <Heart className="w-4 h-4" />
                WELCOME TO VIOLIN EVENTS LLP
              </span>

              <h2 className="welcome-stagger text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-playfair font-bold text-dark-800 mt-3 md:mt-4 leading-tight">
                Redefining Luxury
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 block">
                  Weddings & Celebrations
                </span>
              </h2>

              <p className="welcome-stagger text-dark-600 text-sm sm:text-base md:text-lg mt-4 md:mt-6 leading-relaxed">
                At Violin Events, we believe every celebration should be a
                masterpiece. With our passion for perfection and eye for
                detail, we curate weddings that blend tradition, elegance and
                unforgettable moments.
              </p>

              {/* Stats Row */}
              <div className="welcome-stagger mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                {stats.map(({ icon: Icon, value, label }, i) => {
                  const numMatch = value.match(/[\d.]+/)?.[0] || "0";
                  const suffix = value.replace(numMatch, "");
                  return (
                    <div
                      key={i}
                      className="text-center sm:text-left border-l-2 border-pink-100 pl-3 sm:pl-4"
                    >
                      <Icon className="w-4 h-4 text-pink-500 mx-auto sm:mx-0 mb-1" />
                      <div className="text-xl sm:text-2xl font-playfair font-bold text-dark-800">
                        <span
                          className="stat-number"
                          data-value={numMatch}
                          data-suffix={suffix}
                        >
                          0{suffix}
                        </span>
                      </div>
                      <div className="text-[11px] sm:text-xs text-dark-500 mt-0.5">
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="welcome-stagger mt-8 md:mt-10">
                <Link to="/about">
                  <Button
                    variant="secondary"
                    className="border-pink-300 text-pink-600 hover:bg-pink-50 group text-sm sm:text-base px-6 md:px-8 py-2.5 md:py-3"
                  >
                    Our Story
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Quote — visually distinct card style */}
              <div className="welcome-stagger mt-8 md:mt-10 relative pl-6 border-l-2 border-pink-300">
                <span className="absolute -left-[9px] top-0 text-3xl text-pink-300 font-playfair">
                  "
                </span>
                <p className="text-dark-800 text-sm sm:text-base md:text-lg font-playfair italic">
                  We don't just plan — we create memories
                </p>
              </div>
            </div>

            {/* Right Image - 3D Square Card */}
            <div className="order-2 flex justify-center items-center perspective-1200">
              <div className="relative w-full max-w-[400px] aspect-square">
                {/* Glow Effect */}
                <div
                  ref={glowRef}
                  className="absolute -inset-8 bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-pink-500/20 rounded-3xl blur-3xl"
                />

                {/* Rotating dashed ring — new decorative element */}
                <div
                  ref={ringRef}
                  className="absolute -inset-6 rounded-full border-2 border-dashed border-pink-300/40 pointer-events-none"
                />

                {/* 3D Card - Square Shape */}
                <div
                  ref={cardRef}
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer transform-gpu"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  {/* Image */}
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=800&fit=crop"
                    alt="Luxury Wedding"
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay - Subtle */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-transparent" />

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-shimmer" />

                  {/* 3D Border Layers */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-pink-400/20" />
                  <div className="absolute -inset-1 rounded-2xl border border-pink-400/10" />
                  <div className="absolute -inset-2 rounded-2xl border border-pink-400/5" />

                  {/* Corner Decorations */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-pink-400/30" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-pink-400/30" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-pink-400/30" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-pink-400/30" />

                  {/* Floating Particles — fixed positions via useMemo */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {particlePositions.map((p, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-pink-400/30 rounded-full"
                        initial={{
                          left: `${p.startX}%`,
                          top: `${p.startY}%`,
                          opacity: 0,
                        }}
                        animate={{
                          left: `${p.endX}%`,
                          top: `${p.endY}%`,
                          opacity: [0, 0.8, 0],
                          scale: [0, 2, 0],
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

                {/* Floating Decorative Elements */}
                <motion.div
                  className="absolute -top-3 -right-3 w-10 h-10 bg-pink-400/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-3 -left-3 w-14 h-14 bg-rose-400/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;