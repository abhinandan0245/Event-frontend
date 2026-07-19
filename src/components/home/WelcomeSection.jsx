import { useRef } from "react";
import {
  ArrowRight,
  Crown,
  Globe,
  Calendar,
  LayoutTemplate,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

const WelcomeSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".fade-up-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      tl.from(
        ".collage-img",
        {
          scale: 0.9,
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.6",
      );

      tl.from(
        ".quote-card",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      );

      tl.from(
        ".stat-item",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#f7ecef] px-6 py-12 lg:px-20 lg:py-16"
    >
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[15%] bg-gradient-to-r from-black/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-[1400px]">
        {/* TOP SECTION: Text & Collage */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* ================= LEFT: TEXT CONTENT ================= */}
          <div ref={textRef} className="lg:col-span-6 xl:col-span-5">
            {/* Eyebrow */}
            <div className="fade-up-text mb-4">
              <h4 className="font-manrope text-[12px] font-semibold uppercase leading-none tracking-[0.2em] text-[#A77942] lg:text-[13px]">
                Curators of Extraordinary Experiences
              </h4>
            </div>

            {/* Main Heading */}
            <h2 className="fade-up-text flex flex-col font-cormorant text-[48px] font-medium leading-[0.9] tracking-[-1.5px] text-[#171717] lg:text-[72px]">
              <span>Creating</span>
              <span>Icons of</span>
              <span className="italic tracking-[-1px] text-[#B5793F]">
                Celebration.
              </span>
            </h2>

            {/* Decorative Divider */}
            <div className="fade-up-text my-6 flex items-center gap-4 lg:my-8">
              <div className="h-px w-10 bg-[#B5793F]/40" />
              <div className="h-1.5 w-1.5 rotate-45 border border-[#B5793F]" />
              <div className="h-px w-10 bg-[#B5793F]/40" />
            </div>

            {/* Body Copy */}
            <p className="fade-up-text mb-8 max-w-[540px] font-manrope text-[15px] font-normal leading-[1.6] tracking-[-0.1px] text-[#555555] lg:text-[17px]">
              Every celebration carries a story. Our role is to shape it with
              architectural precision, cinematic artistry, and impeccable
              execution. From destination weddings and luxury social affairs to
              global corporate experiences, we create moments that become part
              of your legacy.
            </p>

            {/* CTA Buttons */}
            <div className="fade-up-text flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button className="flex  items-center rounded-[3px] justify-center gap-2 bg-[#171717] px-8 font-manrope text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#333]">
                Explore Our World
                <ArrowRight size={16} />
              </Button>

              <Button className="flex  items-center rounded-[3px] justify-center  border border-[#B5793F] px-8 font-manrope text-[13px] font-medium uppercase tracking-[0.1em] text-[#171717] transition-colors hover:bg-[#B5793F] hover:text-white">
                Schedule a Consultation
              </Button>
            </div>
          </div>

          {/* ================= RIGHT: IMAGE COLLAGE ================= */}
          <div
            ref={imagesRef}
            className="relative mt-10 h-[400px] w-full lg:mt-0 lg:col-span-6 lg:h-[500px] xl:col-span-7"
          >
            <div className="relative mx-auto h-full w-full max-w-[650px]">
              {/* Main Center Image */}
              <div className="collage-img absolute left-[20%] top-0 z-10 w-[55%] border-[6px] border-[#FAF9F5] bg-white shadow-xl lg:left-[25%] lg:w-[45%]">
                <div className="border border-[#A77942]/30 p-1">
                  <img
                    src="/assets/welcome.jpg"
                    alt="Grand Palace Event"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              </div>

              {/* Left Image */}
              <div className="collage-img absolute bottom-[10%] left-0 z-20 w-[40%] border-[6px] border-[#FAF9F5] bg-white shadow-lg lg:w-[35%]">
                <div className="border border-[#A77942]/30 p-1">
                  <img
                    src="/assets/welcome2.jpg"
                    alt="Luxury Table Setup"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </div>

              {/* Right Image */}
              <div className="collage-img absolute right-0 top-[10%] z-0 w-[40%] border-[6px] border-[#FAF9F5] bg-white shadow-lg lg:w-[32%]">
                <div className="border border-[#A77942]/30 p-1">
                  <img
                    src="/assets/heromobile.png"
                    alt="Grand Stage Setup"
                    className="aspect-[1/2] w-full object-cover"
                  />
                </div>
              </div>

              {/* Quote Card */}
              <div className="quote-card absolute bottom-[0%] right-[5%] z-30 w-[85%] max-w-[260px] rounded-sm bg-[#FAF9F5] p-5 shadow-xl lg:-right-4">
                <span className="font-cormorant text-4xl leading-none text-[#B5793F]">
                  &#8220;
                </span>
                <p className="mt-[-8px] font-cormorant text-[20px] font-normal italic leading-[1.3] text-[#252525] lg:text-[22px]">
                  Luxury isn't what you see. It's what your guests never have to
                  think about.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM: STATISTICS ================= */}
        <div
          ref={statsRef}
          className="relative mt-12 border-t border-[#D9D1C7] pt-8 lg:mt-20 lg:pt-10"
        >
          <div className="pointer-events-none absolute bottom-0 right-10 opacity-5">
            <span className="font-cormorant text-[180px] italic leading-none text-[#A77942]">
              V
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#D9D1C7]">
            {/* Stat 1 */}
            <div className="stat-item flex flex-col items-center justify-center px-2 text-center lg:px-4">
              <Crown className="mb-2 h-5 w-5 stroke-[1.5] text-[#A77942]" />
              <h3 className="font-cormorant text-[36px] font-medium tracking-[-1px] text-[#171717] lg:text-[48px]">
                500+
              </h3>
              <p className="mt-1 font-manrope text-[11px] font-semibold uppercase tracking-[0.2em] text-[#777777] lg:text-[12px]">
                Celebrations Crafted
              </p>
            </div>

            {/* Stat 2 */}
            <div className="stat-item flex flex-col items-center justify-center px-2 text-center lg:px-4">
              <Globe className="mb-2 h-5 w-5 stroke-[1.5] text-[#A77942]" />
              <h3 className="font-cormorant text-[36px] font-medium tracking-[-1px] text-[#171717] lg:text-[48px]">
                18+
              </h3>
              <p className="mt-1 font-manrope text-[11px] font-semibold uppercase tracking-[0.2em] text-[#777777] lg:text-[12px]">
                Countries & Destinations
              </p>
            </div>

            {/* Stat 3 */}
            <div className="stat-item flex flex-col items-center justify-center px-2 text-center lg:px-4">
              <Calendar className="mb-2 h-5 w-5 stroke-[1.5] text-[#A77942]" />
              <h3 className="font-cormorant text-[36px] font-medium tracking-[-1px] text-[#171717] lg:text-[48px]">
                12{" "}
                <span className="text-[20px] uppercase lg:text-[28px]">
                  Years
                </span>
              </h3>
              <p className="mt-1 font-manrope text-[11px] font-semibold uppercase tracking-[0.2em] text-[#777777] lg:text-[12px]">
                Creative Excellence
              </p>
            </div>

            {/* Stat 4 */}
            <div className="stat-item flex flex-col items-center justify-center px-2 text-center lg:px-4">
              <LayoutTemplate className="mb-2 h-5 w-5 stroke-[1.5] text-[#A77942]" />
              <h3 className="font-cormorant text-[28px] font-medium uppercase tracking-[-1px] text-[#171717] lg:text-[36px]">
                End-To-End
              </h3>
              <p className="mt-1 font-manrope text-[11px] font-medium uppercase tracking-[0.15em] text-[#777777] lg:text-[12px]">
                Planning &bull; Design &bull; Production
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
