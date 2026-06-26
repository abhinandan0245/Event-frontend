import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Sparkles } from "lucide-react";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.3",
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5",
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3",
        )
        .fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          "-=0.3",
        );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Full Background Image with Gradient */}
      <div className="absolute inset-0">
        {/* Background Color Fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/80 via-dark-900 to-dark-900" />

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=900&fit=crop&q=80')`,
          }}
        />

        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-dark-900/50 to-dark-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-dark-900/20" />
        <div className="absolute inset-0 bg-dark-900/30 md:bg-transparent" />
      </div>

      {/* Decorative Elements - Hidden on Mobile */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-20 left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 w-full px-4 sm:px-6">
        <div className="flex justify-center md:justify-start">
          <div className="w-full max-w-xl text-center md:text-left">
            {/* Badge */}
            <div
              ref={subtitleRef}
              className="opacity-0 mt-8 sm:mt-12 md:mt-20 mb-4 sm:mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-pink-300 text-xs sm:text-sm font-semibold border border-white/20">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">
                  CELEBRATING YOUR PERFECT MOMENTS
                </span>
                <span className="xs:hidden">✨ PERFECT MOMENTS</span>
              </span>
            </div>

            {/* Main Title */}
            <h1 ref={titleRef} className="opacity-0">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Extraordinary
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 mt-1">
                  Weddings
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/80 mt-2 block">
                  in Incredible India
                </span>
              </span>
            </h1>

            {/* Description */}
            <p
              ref={textRef}
              className="opacity-0 text-gray-300 text-sm sm:text-base md:text-lg max-w-lg mx-auto md:mx-0 mt-4 sm:mt-6 mb-6 sm:mb-8 leading-relaxed"
            >
              From royal palaces to serene beaches, we design immersive wedding
              experiences that are as unique as your love story.
            </p>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="opacity-0 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
            >
              <Button
                variant="primary"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/30 group relative overflow-hidden text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Plan Your Celebration
                  <ChevronRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
              <Button
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 hover:border-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
              >
                Our Story
              </Button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="opacity-0 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-10 border-t border-white/10 max-w-lg mx-auto md:mx-0"
            >
              {[
                { number: "10+", label: "Years Experience" },
                { number: "500+", label: "Celebrations" },
                { number: "20+", label: "Destinations" },
                { number: "100%", label: "Responsive" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-pink-400">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-[10px] sm:text-xs md:text-xs leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
          .xs\\:hidden {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
