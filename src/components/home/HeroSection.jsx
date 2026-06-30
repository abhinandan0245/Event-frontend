import { ChevronRight, Sparkles } from "lucide-react";
import Button from "../ui/Button";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen sm:min-h-[100svh] lg:min-h-screen items-center overflow-hidden">
      {/* Background */}
      {/* Background */}
<div className="absolute inset-0">
  {/* Desktop / Tablet Image */}
  <img
    src="/assets/home-hero-1.jpg"
    alt="Wedding Celebration"
    loading="eager"
    fetchPriority="high"
    className="
      hidden
      md:block
      absolute inset-0
      w-full h-full
      object-cover
      object-center
      scale-105
    "
  />

  {/* Mobile Image */}
  <img
    src="/assets/home-hero-mobile.png"
    alt="Wedding Celebration"
    loading="eager"
    fetchPriority="high"
    className="
      block
      md:hidden
      absolute inset-0
      w-full h-full
      object-cover
      object-center
    "
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/55 lg:bg-black/45" />

  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

  <div className="absolute inset-0 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/35 lg:to-transparent" />
</div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
        <div
          className="
            max-w-full
            sm:max-w-xl
            lg:max-w-2xl
            text-center
            lg:text-left
            py-16
            sm:py-20
            lg:py-0
          "
        >
          {/* Badge */}

          <div className="mb-5">
            <span
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-white/20
                bg-white/10
                backdrop-blur-md
                px-4 py-2
                sm:px-5 sm:py-2.5
                text-[11px]
                sm:text-sm
                font-semibold
                text-pink-300
              "
            >
              <Sparkles className="h-4 w-4" />

              <span className="sm:hidden">PERFECT MOMENTS</span>

              <span className="hidden sm:inline">
                CELEBRATING YOUR PERFECT MOMENTS
              </span>
            </span>
          </div>

          {/* Heading */}

          <h1 className="space-y-1">
            <span
              className="
                block
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                xl:text-8xl
                font-bold
                leading-none
                tracking-tight
                text-white
              "
            >
              Extraordinary
            </span>

            <span
              className="
                block
                bg-gradient-to-r
                from-pink-400
                via-rose-400
                to-pink-300
                bg-clip-text
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                xl:text-8xl
                font-bold
                leading-none
                tracking-tight
                text-transparent
              "
            >
              Weddings
            </span>

            <span
              className="
                mt-3
                block
                text-lg
                sm:text-xl
                md:text-2xl
                lg:text-3xl
                font-medium
                text-white/80
              "
            >
              in Incredible India
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-6
              max-w-xl
              mx-auto
              lg:mx-0
              text-sm
              sm:text-base
              md:text-lg
              leading-7
              text-gray-200
            "
          >
            From royal palaces to serene beaches, we design immersive wedding
            experiences that are as unique as your love story.
          </p>

          {/* Buttons */}

          <div
            className="
              mt-8
              flex
              flex-col
              sm:flex-row
              gap-4
              justify-center
              lg:justify-start
            "
          >
            <Button
              variant="primary"
              className="
                w-full
                sm:w-auto
                rounded-full
                bg-gradient-to-r
                from-pink-500
                to-rose-500
                px-8
                py-3.5
                text-white
                font-semibold
                shadow-lg
                shadow-pink-500/30
                hover:from-pink-600
                hover:to-rose-600
              "
            >
              <span className="flex items-center justify-center gap-2">
                Plan Your Celebration
                <ChevronRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Button>

            <Button
              variant="outline"
              className="
                w-full
                sm:w-auto
                rounded-full
                border
                border-white/40
                px-8
                py-3.5
                font-semibold
                text-white
                hover:bg-white/10
                hover:border-white
              "
            >
              Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
