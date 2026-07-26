import React, { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

// === DATA ARRAY ===
const blogPosts = [
  {
    date: { day: "21", month: "MAY", year: "2024" },
    category: "REAL WEDDINGS",
    title: "A Royal Wedding Celebration in Udaipur",
    desc: "Step inside an unforgettable palace wedding where timeless traditions met contemporary luxury.",
    image:
      "https://images.unsplash.com/photo-1583089892943-e02e5be026b9?w=800&q=80",
  },
  {
    date: { day: "14", month: "MAY", year: "2024" },
    category: "PLANNING GUIDES",
    title: "How to Choose the Perfect Wedding Venue",
    desc: "Essential considerations for selecting a venue that reflects your vision and elevates the guest experience.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
  },
  {
    date: { day: "07", month: "MAY", year: "2024" },
    category: "WEDDING TRENDS",
    title: "Luxury Decor Trends Defining Modern Celebrations",
    desc: "Explore the design elements, floral concepts, and styling approaches shaping today's most elegant weddings.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
  },
  {
    date: { day: "30", month: "APR", year: "2024" },
    category: "DESTINATIONS",
    title: "Why Goa Remains a Dream Wedding Destination",
    desc: "From oceanfront ceremonies to luxury resorts, discover why couples continue choosing Goa for their celebrations.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  },
];

// Duplicate for continuous seamless scrolling loop
const marqueeBlogs = [...blogPosts, ...blogPosts, ...blogPosts];

const BlogSection = () => {
  // State to track if the user is hovering over the slider
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#FDFBF7] font-sans overflow-hidden py-16 lg:py-24 flex flex-col items-center">
      {/* === CUSTOM MARQUEE ANIMATION === */}
      <style>
        {`
          @keyframes smooth-scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-33.33333%); } /* Translates exactly 1 original array length */
          }
          .animate-smooth-scroll {
            animation: smooth-scroll 30s linear infinite;
          }
          /* Custom fonts */
          .font-cormorant { font-family: 'Cormorant Garamond', serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          .font-montserrat { font-family: 'Montserrat', sans-serif; }
        `}
      </style>

      {/* === BACKGROUND DECORATIVE ELEMENTS === */}
      {/* 1. Left Faded Palace */}
      <div className="absolute top-10 left-0 w-[200px] md:w-[350px] opacity-70 pointer-events-none z-0">
        <img
          src="https://images.unsplash.com/photo-1526761122248-b31c93f8b2f9?w=600&q=80"
          alt="Palace"
          className="w-full h-auto mix-blend-multiply opacity-50 grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FDFBF7]/80 to-[#FDFBF7]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/50 via-transparent to-[#FDFBF7]" />
      </div>

      {/* 2. Right Circular Stamp Logo */}
      <div className="absolute top-12 right-12 w-24 h-24 md:w-32 md:h-32 opacity-60 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-full h-full rounded-full border border-[#D4AF37]/30 flex items-center justify-center relative">
          <span className="absolute text-[8px] tracking-[0.2em] text-[#D4AF37] uppercase -top-2">
            Crafting Celebrations
          </span>
          <span className="font-cormorant text-4xl text-[#D4AF37]">V</span>
        </div>
      </div>

      {/* 3. Floral Corners */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle_at_bottom_left,#E5D9C5_0%,transparent_70%)] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_bottom_right,#E5D9C5_0%,transparent_70%)] opacity-40 pointer-events-none" />

      {/* === MAIN CONTENT WRAPPER === */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* HEADER */}
        <div className="text-center max-w-3xl px-4 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#C58B48]" />
            <span className="font-montserrat text-[#C58B48] text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase">
              OUR JOURNAL
            </span>
            <div className="w-8 h-[1px] bg-[#C58B48]" />
          </div>

          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[56px] text-[#222222] leading-[1.2] mb-4">
            Stories. Inspiration.{" "}
            <span className="italic text-[#C58B48]">Celebrations.</span>
          </h2>

          <p className="font-inter text-sm md:text-[15px] font-light leading-[1.8] text-gray-600 max-w-2xl mx-auto">
            Discover destination wedding insights, luxury planning inspiration,
            venue guides, and real celebration stories curated by Violin Events
            LLP.
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12 border-b border-gray-200 w-full max-w-5xl px-4 pb-2">
          {[
            "ALL",
            "REAL WEDDINGS",
            "PLANNING TIPS",
            "DESTINATIONS",
            "TRENDS & INSPIRATION",
          ].map((cat, i) => (
            <span
              key={i}
              className={`font-montserrat text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase cursor-pointer pb-2 relative transition-colors ${i === 0 ? "text-[#C58B48]" : "text-gray-500 hover:text-[#C58B48]"}`}
            >
              {cat}
              {i === 0 && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C58B48]" />
              )}
            </span>
          ))}
        </div>

        {/* === LUXURY AUTO-SLIDER (MARQUEE) === */}
        <div
          className="w-full overflow-hidden py-8 group/slider"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Bulletproof Pause using React State inline style */}
          <div
            className="flex w-max animate-smooth-scroll items-center gap-6 md:gap-8 px-4"
            style={{ animationPlayState: isHovered ? "paused" : "running" }}
          >
            {marqueeBlogs.map((blog, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[280px] md:w-[340px] lg:w-[380px] bg-white rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col cursor-pointer transition-all duration-500 group-hover/slider:opacity-50 hover:!opacity-100 hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)]"
              >
                {/* Image & Date Badge */}
                <div className="relative w-full h-[220px] overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />

                  {/* Date Badge */}
                  <div className="absolute top-0 left-0 bg-white/95 backdrop-blur-sm px-4 py-3 flex flex-col items-center justify-center border-b border-r border-gray-100 shadow-sm">
                    <span className="font-cormorant text-xl text-[#222222] leading-none mb-1">
                      {blog.date.day}
                    </span>
                    <span className="font-montserrat text-[8px] font-bold tracking-widest text-gray-500 uppercase leading-none mb-0.5">
                      {blog.date.month}
                    </span>
                    <span className="font-inter text-[9px] text-gray-400 leading-none">
                      {blog.date.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.2em] uppercase mb-3 block">
                    {blog.category}
                  </span>
                  <h3 className="font-cormorant text-2xl text-[#222222] leading-[1.3] mb-4">
                    {blog.title}
                  </h3>

                  {/* Subtle Diamond Separator */}
                  <div className="flex items-center justify-center w-full mb-4">
                    <div className="w-1.5 h-1.5 rotate-45 border border-[#C58B48]/50" />
                  </div>

                  <p className="font-inter text-[11px] md:text-xs text-gray-500 leading-[1.8] mb-6 flex-grow">
                    {blog.desc}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-[#C58B48] text-[10px] font-montserrat font-semibold tracking-widest uppercase group-hover:text-amber-900 transition-colors">
                    READ MORE{" "}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === NEWSLETTER SECTION === */}
        <div className="w-full max-w-[900px] mt-16 px-4">
          <div className="w-full bg-[#F5EFE6] rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-[#EBE3D5]">
            <div className="flex items-center gap-6 w-full md:w-1/2">
              <div className="w-12 h-12 rounded-full border border-[#C58B48] flex items-center justify-center shrink-0">
                <Mail className="text-[#C58B48] w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h4 className="font-cormorant text-xl text-[#222222] font-semibold mb-1 uppercase tracking-widest">
                  Stay Inspired
                </h4>
                <p className="font-inter text-[10px] md:text-[11px] text-gray-600 leading-relaxed">
                  Subscribe to get the latest wedding ideas, real stories and
                  expert tips straight to your inbox.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center h-12 shadow-sm">
              <input
                type="email"
                placeholder="Enter your email address"
                className="h-full w-full px-4 text-xs font-inter text-gray-700 bg-white border-y border-l border-white focus:outline-none placeholder:text-gray-400 rounded-l-sm"
              />
              <button className="h-full px-6 bg-[#C58B48] hover:bg-[#A87438] transition-colors text-white font-montserrat text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap rounded-r-sm">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM LINK */}
        <div className="mt-12 flex items-center justify-center gap-2 text-[#C58B48] text-[10px] font-montserrat font-bold tracking-[0.25em] uppercase cursor-pointer hover:text-amber-900 transition-colors group">
          VIEW ALL ARTICLES{" "}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
