import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const WelcomeSection = () => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;

    // Automatic 3D Rotation Animation - Round and Round
    gsap.to(card, {
      rotateY: 360,
      rotateX: 15,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    // Floating animation for card
    gsap.to(card, {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Glow pulse animation
    gsap.to(glow, {
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.7, 0.3],
      duration: 3,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Mouse interaction - pause rotation on hover
    const handleMouseEnter = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power2.out",
        overwrite: true,
      });
      gsap.to(card, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 360,
        rotateX: 15,
        duration: 20,
        repeat: -1,
        ease: "none",
        overwrite: true,
      });
      gsap.to(card, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        overwrite: true,
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    // Entrance animation
    gsap.fromTo(
      card,
      {
        opacity: 0,
        scale: 0.8,
        rotateY: 30,
        rotateX: 20,
      },
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
          // Start rotation after entrance
          gsap.to(card, {
            rotateY: 360,
            rotateX: 15,
            duration: 20,
            repeat: -1,
            ease: "none",
          });
          gsap.to(card, {
            y: -15,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(card);
    };
  }, []);

  return (
    <section className="w-full bg-white relative overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-rose-500/5 rounded-full blur-3xl" />

      {/* Floating Hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/20"
          style={{
            left: 5 + Math.random() * 90 + "%",
            top: 5 + Math.random() * 90 + "%",
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        >
          <Heart size={20 + Math.random() * 20} />
        </motion.div>
      ))}

      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-1"
            >
              <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest inline-flex items-center gap-2">
                <Heart className="w-4 h-4" />
                WELCOME TO VIOLIN EVENTS LLP
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-playfair font-bold text-dark-800 mt-3 md:mt-4 leading-tight">
                Redefining Luxury
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 block">
                  Weddings & Celebrations
                </span>
              </h2>

              <p className="text-dark-600 text-sm sm:text-base md:text-lg mt-4 md:mt-6 leading-relaxed">
                At Violin Events, we believe every celebration should be a
                masterpiece. With our passion for perfection and eye for detail,
                we curate weddings that blend tradition, elegance and
                unforgettable moments.
              </p>

              <div className="mt-6 md:mt-8">
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-pink-100/50"
              >
                <p className="text-dark-800 text-sm sm:text-base md:text-lg font-playfair italic">
                  "We don't just plan — we create memories"
                </p>
              </motion.div>
            </motion.div>

            {/* Right Image - 3D Square Card */}
            <div className="order-2 flex justify-center items-center perspective-1200">
              <div className="relative w-full max-w-[400px] aspect-square">
                {/* Glow Effect */}
                <div
                  ref={glowRef}
                  className="absolute -inset-8 bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-pink-500/20 rounded-3xl blur-3xl"
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

                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-pink-400/30 rounded-full"
                        initial={{
                          x: Math.random() * 100 + "%",
                          y: Math.random() * 100 + "%",
                          opacity: 0,
                        }}
                        animate={{
                          x: `${Math.random() * 100}%`,
                          y: `${Math.random() * 100}%`,
                          opacity: [0, 0.8, 0],
                          scale: [0, 2, 0],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 3,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Decorative Elements */}
                <motion.div
                  className="absolute -top-3 -right-3 w-10 h-10 bg-pink-400/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-3 -left-3 w-14 h-14 bg-rose-400/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
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
