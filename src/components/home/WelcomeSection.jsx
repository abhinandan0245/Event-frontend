import { useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WelcomeSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const frameRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Image reveal
        gsap.fromTo(
          imageRef.current,
          {
            scale: 1.15,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Frame reveal
        gsap.fromTo(
          frameRef.current,
          {
            opacity: 0,
            scale: 0.92,
            y: 40,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Image subtle floating
        gsap.to(imageRef.current, {
          y: -12,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FAF9F5] py-24 sm:py-32 lg:py-40"
    >
      {/* Subtle Background Texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-700 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* ================= LEFT CONTENT ================= */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-amber-700" />

              <span className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-800">
                Welcome to Violin Events LLP
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-playfair text-4xl font-medium leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Redefining Luxury
              <span className="block font-cormorant text-amber-700 italic">
                Weddings & Celebrations
              </span>
            </h2>

            {/* Description */}
            <p className="mt-8 max-w-xl font-manrope text-sm font-light leading-8 tracking-wide text-neutral-600 sm:text-base">
              At Violin Events, we believe every celebration deserves to be
              extraordinary. From intimate gatherings to grand destination
              weddings, we transform your vision into unforgettable experiences.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-neutral-200 pt-8">
              <div>
                <h3 className="font-cormorant text-4xl font-semibold text-amber-700 sm:text-5xl">
                  500+
                </h3>

                <p className="mt-2 font-manrope text-[9px] font-semibold uppercase tracking-[0.15em] text-neutral-500 sm:text-[10px]">
                  Weddings Planned
                </p>
              </div>

              <div>
                <h3 className="font-cormorant text-4xl font-semibold text-amber-700 sm:text-5xl">
                  50+
                </h3>

                <p className="mt-2 font-manrope text-[9px] font-semibold uppercase tracking-[0.15em] text-neutral-500 sm:text-[10px]">
                  Destinations
                </p>
              </div>

              <div>
                <h3 className="font-cormorant text-4xl font-semibold text-amber-700 sm:text-5xl">
                  12+
                </h3>

                <p className="mt-2 font-manrope text-[9px] font-semibold uppercase tracking-[0.15em] text-neutral-500 sm:text-[10px]">
                  Years of Excellence
                </p>
              </div>
            </div>

            {/* CTA */}
            <button className="group mt-10 inline-flex items-center gap-3 border-b border-amber-700 pb-2 font-manrope text-xs font-semibold uppercase tracking-[0.18em] text-amber-800 transition-all hover:gap-5">
              Discover Our Story
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </button>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative flex justify-center lg:justify-end">
            <div ref={frameRef} className="relative w-full max-w-[440px]">
              {/* Back Offset Frame */}
              <div className="absolute -right-4 -top-4 h-full w-full border border-amber-700/30" />

              {/* Main Frame */}
              <div className="relative border border-amber-700/60 bg-[#FAF9F5] p-3">
                {/* Inner Gold Line */}
                <div className="relative border border-amber-700/30 p-2">
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      ref={imageRef}
                      src="/assets/welcome.jpg"
                      alt="Luxury Wedding Celebration"
                      className="h-full w-full object-cover"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  </div>

                  {/* Corner Decorations */}
                  <span className="absolute -left-[1px] -top-[1px] h-8 w-8 border-l-2 border-t-2 border-amber-700" />

                  <span className="absolute -right-[1px] -top-[1px] h-8 w-8 border-r-2 border-t-2 border-amber-700" />

                  <span className="absolute -bottom-[1px] -left-[1px] h-8 w-8 border-b-2 border-l-2 border-amber-700" />

                  <span className="absolute -bottom-[1px] -right-[1px] h-8 w-8 border-b-2 border-r-2 border-amber-700" />
                </div>
              </div>

              {/* Floating Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-8 -left-5 max-w-[230px] border border-amber-700/20 bg-[#FAF9F5]/95 p-5 shadow-xl backdrop-blur-md sm:-left-10"
              >
                <p className="font-cormorant text-xl leading-tight text-neutral-800">
                  "We don't just plan — we create memories."
                </p>

                <div className="mt-3 h-px w-10 bg-amber-700" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
