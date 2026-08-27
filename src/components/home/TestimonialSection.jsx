import React, { useState, useEffect } from "react";

// --- TESTIMONIAL DATA ---
// Removed 'type' and 'image' properties as all cards will now be uniform
const testimonials = [
  {
    text: "The team's creativity, planning and execution were extraordinary. Our wedding was nothing short of a fairytale!",
    names: "MEGHA & KUNAL",
    location: "GOA",
    avatar:
      "https://images.unsplash.com/photo-1523419409543-a5e549c1faa5?w=100&q=80",
  },
  {
    text: "Professional, calm and incredibly organized. They handled everything so seamlessly that we could truly enjoy every moment.",
    names: "PRIYA & ARJUN",
    location: "JAIPUR",
    avatar:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=100&q=80",
  },
  {
    text: "Our guests are still talking about the experience! Violin Events LLP created memories that will last a lifetime.",
    names: "NEHA & VIVEK",
    location: "BALI",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
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

        {/* --- AUTO-SLIDING GALLERY --- */}
        <div
          className="w-full overflow-hidden py-10 cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex items-center gap-6 md:gap-10 transition-transform duration-700 ease-in-out"
            style={{
              // Adjusted the math slightly to match the new 400px max-width of the cards
              transform: `translateX(calc(-${currentIndex} * (min(400px, 85vw) + 24px)))`,
            }}
          >
            {sliderCards.map((testimonial, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[85vw] max-w-[320px] md:max-w-[400px]"
              >
                {/* UNIFIED WHITE CARD WITH GOLDEN SHADOW */}
                <div 
                  className="w-full h-[280px] bg-white rounded-xl p-6 md:p-8 flex flex-col justify-between border border-[#C58B48]/20 transition-transform hover:scale-[1.02]"
                  style={{
                    // Custom Golden Shadow 
                    boxShadow: "0 15px 40px rgba(197, 139, 72, 0.15)"
                  }}
                >
                  {/* Top: Quote Mark & Text */}
                  <div>
                    <span className="font-serif text-5xl text-[#C58B48] leading-none mb-2 block">
                      “
                    </span>
                    <p className="text-[#1F2937] text-sm leading-relaxed font-medium">
                      {testimonial.text}
                    </p>
                  </div>
                  
                  {/* Bottom: Avatar & Details */}
                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={testimonial.avatar}
                      alt="Avatar"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-[#C58B48]/40"
                    />
                    <div>
                      <h4 className="text-[10px] md:text-[11px] font-semibold tracking-wider text-[#1F2937] uppercase">
                        {testimonial.names}
                      </h4>
                      <p className="text-[8px] md:text-[9px] font-semibold tracking-widest text-[#C58B48] uppercase mt-0.5">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default TestimonialSection;