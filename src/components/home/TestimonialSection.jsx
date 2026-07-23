import React, { useState, useEffect } from "react";

// --- TESTIMONIAL DATA ---
const testimonials = [
  {
    type: "light",
    text: "The team's creativity, planning and execution were extraordinary. Our wedding was nothing short of a fairytale!",
    names: "MEGHA & KUNAL",
    location: "GOA",
    avatar:
      "https://images.unsplash.com/photo-1523419409543-a5e549c1faa5?w=100&q=80",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  },
  {
    type: "dark",
    text: "Professional, calm and incredibly organized. They handled everything so seamlessly that we could truly enjoy every moment.",
    names: "PRIYA & ARJUN",
    location: "JAIPUR",
    avatar:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=100&q=80",
  },
  {
    type: "light",
    text: "Our guests are still talking about the experience! Violin Events LLP created memories that will last a lifetime.",
    names: "NEHA & VIVEK",
    location: "BALI",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80",
  },
];

// We duplicate the array so the slider has enough cards to scroll through
const sliderCards = [...testimonials, ...testimonials, ...testimonials];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // --- AUTO-SLIDE LOGIC ---
  useEffect(() => {
    // If the user is hovering (isPaused is true), do nothing
    if (isPaused) return;

    // Set a timer to slide every 3.5 seconds
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // If we reach the end of the duplicated cards, rewind to the start
        if (prevIndex >= sliderCards.length - 3) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3500);

    // Cleanup the timer when the component unmounts or pauses
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative w-full min-h-screen bg-[#FDFBF7] font-sans overflow-hidden py-16 flex flex-col justify-between">
      {/* --- BACKGROUND IMAGE FIX --- */}
      {/* Positioned cleanly on the right with a soft gradient fade to the left */}
      <div className="absolute top-0 right-0 w-[90%] md:w-[65%] h-full z-0">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Palace Wedding Setup"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.80] pointer-events-none"
        />
        {/* Gradients to blend the image into the cream background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/30 via-transparent to-[#FDFBF7]" />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-16 flex flex-col h-full">
        {/* --- HEADER SECTION --- */}
        <div className="relative max-w-2xl mb-12 lg:mb-16 pt-10">
          <div
            className="absolute -top-12 left-32 text-[#F2EBE1] opacity-70 select-none pointer-events-none"
            style={{ fontSize: "200px", fontFamily: "serif", lineHeight: "1" }}
          >
            “
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#C58B48] text-xs font-semibold tracking-[0.25em] uppercase">
              TESTIMONIALS
            </span>
            <div className="flex items-center">
              <div className="w-8 h-[1px] bg-[#C58B48]" />
              <div className="w-2 h-2 rotate-45 border border-[#C58B48] mx-1" />
              <div className="w-8 h-[1px] bg-[#C58B48]" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-serif text-[#1F2937] leading-[1.2] mb-6">
            Stories of Trust. <br />
            Memories for a{" "}
            <span className="italic text-[#C58B48] font-cormorant">
              Lifetime.
            </span>
          </h2>

          <div className="w-16 h-[1px] bg-[#C58B48] mb-6" />

          <p className="font-sans text-sm font-medium leading-[1.8] text-gray-700 max-w-lg">
            Behind every celebration we create, there's a story of trust, care
            and unforgettable moments. Here's what our clients have to say about
            their journey with Violin Events LLP.
          </p>
        </div>

        {/* --- AUTO-SLIDING GALLERY (DISCRETE SLIDES) --- */}
        <div
          className="w-full overflow-hidden py-10 cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* 
            The wrapper translates based on the currentIndex.
            We use a fixed calc() to shift exactly one card width + gap per slide.
          */}
          <div
            className="flex items-center gap-6 md:gap-10 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(-${currentIndex} * (min(450px, 85vw) + 24px)))`, // Translates by card width + gap
            }}
          >
            {sliderCards.map((testimonial, idx) => (
              <div
                key={idx}
                // Set fixed widths so the slider math is perfectly accurate
                className="flex-shrink-0 w-[85vw] max-w-[320px] md:max-w-[450px]"
              >
                {/* LIGHT CARD STYLE */}
                {testimonial.type === "light" ? (
                  <div className="w-full h-[280px] bg-[#FDFBF7] rounded-md flex overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
                    <div className="w-1/2 p-5 md:p-6 flex flex-col justify-between">
                      <div>
                        <span className="font-serif text-5xl text-[#C58B48] leading-none mb-2 block">
                          “
                        </span>
                        <p className="text-[#1F2937] text-[10px] md:text-xs leading-relaxed font-medium">
                          {testimonial.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <img
                          src={testimonial.avatar}
                          alt="Avatar"
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-[9px] md:text-[10px] font-semibold tracking-wider text-[#1F2937] uppercase">
                            {testimonial.names}
                          </h4>
                          <p className="text-[8px] md:text-[9px] font-semibold tracking-widest text-[#C58B48] uppercase">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 h-full">
                      <img
                        src={testimonial.image}
                        alt="Event"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  /* DARK CARD STYLE */
                  <div className="w-full h-[320px] bg-[#1A1A1A] rounded-[12px] border border-[#C58B48]/60 p-6 md:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform scale-[1.02] md:scale-105 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2a1d10]/20 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                      <span className="font-serif text-5xl text-[#C58B48] leading-none mb-2 block">
                        “
                      </span>
                      <p className="text-[#E8E8E8] text-[11px] md:text-sm leading-[1.8] font-normal">
                        {testimonial.text}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between mt-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar}
                          alt="Avatar"
                          className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover ring-2 ring-[#C58B48]"
                        />
                        <div>
                          <h4 className="text-[10px] md:text-[11px] font-semibold tracking-wider text-[#E8E8E8] uppercase">
                            {testimonial.names}
                          </h4>
                          <p className="text-[8px] md:text-[9px] font-semibold tracking-widest text-[#C58B48] uppercase">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                      <span className="font-serif text-6xl md:text-7xl text-[#C58B48]/20 leading-none h-10 flex items-end">
                        ”
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- BOTTOM CITIES BAR --- */}
        <div className="w-full mt-10 pb-8 flex flex-col items-center">
          <p className="text-[#C58B48] text-[9px] md:text-[10px] font-semibold tracking-[0.3em] uppercase mb-6">
            CELEBRATED WITH AMAZING CLIENTS ACROSS
          </p>

          <div className="flex items-center justify-center w-full max-w-4xl relative">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:gap-x-8 text-[#1F2937] text-sm md:text-base font-serif">
              {[
                "Udaipur",
                "Jaipur",
                "Goa",
                "Dubai",
                "Bali",
                "Phuket",
                "Thailand",
              ].map((city, i, arr) => (
                <React.Fragment key={city}>
                  <span className="whitespace-nowrap">{city}</span>
                  {i < arr.length - 1 && (
                    <span className="text-[#C58B48]/30">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
