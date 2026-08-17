// src/pages/Portfolio.jsx
import React, { useLayoutEffect, useRef, useState, useEffect, useCallback, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Heart,
  Users,
  Building2,
  Camera,
  GlassWater,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Flower2,
  Music,
  Calendar,
  User,
  Quote,
  Video,
  Image as ImageIcon,
} from "lucide-react";
import Button from "../components/ui/Button";
import { portfolioApi } from "../api/portfolioApi";
import { portfolioPageApi } from "../api/portfolioPageApi";
import { useNavigate } from "react-router-dom";
import VideoModal from "../components/VideoModal";
import PortfolioDetailsModal from "../components/PortfolioDetailsModal";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ================= PREMIUM 3D CARD =================
const Premium3DCard = ({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
    glareX.set((mouseX / width) * 100);
    glareY.set((mouseY / height) * 100);
  }, [x, y, glareX, glareY]);

  const handleMouseEnter = useCallback((e) => {
    glareOpacity.set(1);
    if (onMouseEnter) onMouseEnter(e);
  }, [glareOpacity, onMouseEnter]);

  const handleMouseLeave = useCallback((e) => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
    if (onMouseLeave) onMouseLeave(e);
  }, [x, y, glareOpacity, onMouseLeave]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        cursor: onClick ? "pointer" : "default",
      }}
      className={`relative ${className}`}
    >
      <div
        style={{ transform: "translateZ(30px)" }}
        className="w-full h-full relative rounded-xl overflow-hidden group"
      >
        {children}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none rounded-xl transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: glareOpacity,
            background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`,
          }}
        />
      </div>
    </motion.div>
  );
};

// ================= AUTO MARQUEE GALLERY =================
// ================= AUTO MARQUEE GALLERY =================
const AutoMarqueeGallery = ({ images }) => {
  if (!images || images.length === 0) return null;

  // Double the images for seamless scrolling
  const displayImages = [...images, ...images];

  return (
    <section className="py-12 lg:py-16 bg-[#FDFBF7] overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 mb-8">
        <div className="text-center">
          <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
            GALLERY
          </span>
          <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937]">
            Moments Captured
          </h2>
          <p className="font-inter text-sm text-gray-500 mt-2">
            A collection of beautiful memories from our celebrations
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-40 z-10 bg-gradient-to-r from-[#FDFBF7] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-40 z-10 bg-gradient-to-l from-[#FDFBF7] to-transparent pointer-events-none" />

        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {displayImages.map((image, index) => (
            <div
              key={`marquee-${index}`}
              className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= FEATURED CELEBRATIONS =================
const FeaturedCelebrations = ({ featuredItems, handleCursorState, navigate }) => {
  if (!featuredItems || featuredItems.length === 0) return null;

  return (
    <section className="py-20 lg:py-32 relative z-10">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
        <div
          className="portfolio-grid grid grid-cols-1 lg:grid-cols-4 gap-12"
          style={{ perspective: 1500 }}
        >
          <div className="lg:col-span-1 flex flex-col pt-10 relative">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              FEATURED CELEBRATIONS
            </span>
            <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937] leading-[1.1] mb-12">
              Timeless Moments <br /> Across the Globe
            </h2>

            <div className="absolute top-32 -left-10 w-64 h-64 opacity-20 pointer-events-none mix-blend-multiply grayscale">
              <img
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80"
                alt="Floral"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {featuredItems.map((project, index) => (
              <div
                key={project._id || project.id || index}
                className="portfolio-card h-full"
              >
                <Premium3DCard
                  onMouseEnter={() => handleCursorState("view", "VIEW")}
                  onMouseLeave={() => handleCursorState("default")}
                  className="h-full"
                >
                  <div className="group bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBE3D5] flex flex-col h-full hover:border-[#C58B48]/40 transition-colors">
                    <div className="relative overflow-hidden aspect-[3/4] rounded-lg mb-4 m-2">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div className="absolute top-4 left-4 bg-[#C58B48] text-white px-3 py-1 rounded-full text-[10px] font-semibold">
                        Featured
                      </div>
                      <button className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-20">
                        <Heart
                          className="w-5 h-5 drop-shadow-md"
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>

                    <div className="px-5 pb-5 flex items-center justify-between mt-auto bg-white z-10">
                      <div>
                        <h3 className="font-cormorant text-2xl text-[#1F2937] mb-1">
                          {project.title}
                        </h3>
                        <p className="font-inter text-[11px] text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {project.location}
                        </p>
                        {project.category && (
                          <p className="font-inter text-[10px] text-[#C58B48] mt-0.5">
                            {project.category}
                          </p>
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-full border border-[#EBE3D5] flex items-center justify-center text-gray-400 group-hover:border-[#C58B48] group-hover:text-[#C58B48] transition-colors shrink-0">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Premium3DCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ================= CELEBRATION SECTION =================
const CelebrationSection = ({ celebrationImages, handleCursorState }) => {
  const hasCelebrationImages = celebrationImages.leftImage ||
    celebrationImages.rightImage1 ||
    celebrationImages.rightImage2 ||
    celebrationImages.rightImage3;

  if (!hasCelebrationImages) return null;

  return (
    <section className="py-8 lg:py-16" style={{ perspective: 1500 }}>
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
        <Premium3DCard>
          <div className="bg-[#FDFBF7] border border-[#EBE3D5] rounded-xl overflow-hidden p-4 lg:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.04)] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FDFBF7]">
              <div
                className="lg:col-span-5 h-[400px] lg:h-[500px] relative rounded-lg overflow-hidden group cursor-none"
                onMouseEnter={() => handleCursorState("view", "PLAY")}
                onMouseLeave={() => handleCursorState("default")}
              >
                {celebrationImages.leftImage ? (
                  <img
                    src={celebrationImages.leftImage}
                    alt="Celebration"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden">
                  <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-[#C58B48] fill-[#C58B48] ml-1" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center px-4 lg:px-10 text-center lg:text-left py-10 lg:py-0">
                <h2 className="font-cormorant text-4xl lg:text-[46px] text-[#1F2937] leading-[1.1] mb-6">
                  A Celebration to <br />
                  <span className="italic text-[#C58B48]">Remember</span>
                </h2>
                <div className="w-10 h-[1px] bg-[#C58B48]/50 mx-auto lg:mx-0 mb-6" />
                <p className="font-inter text-xs text-gray-500 leading-relaxed mb-8">
                  Every love story is unique. We bring your dreams to life
                  with creativity, flawless execution and heartfelt moments.
                </p>
              </div>

              <div
                className="lg:col-span-3 flex flex-col gap-4 h-[400px] lg:h-[500px]"
                onMouseEnter={() => handleCursorState("view", "VIEW")}
                onMouseLeave={() => handleCursorState("default")}
              >
                <div className="h-1/3 rounded-lg overflow-hidden relative group cursor-none">
                  {celebrationImages.rightImage1 ? (
                    <img
                      src={celebrationImages.rightImage1}
                      alt="Moment 1"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="h-1/3 rounded-lg overflow-hidden relative group cursor-none">
                  {celebrationImages.rightImage2 ? (
                    <img
                      src={celebrationImages.rightImage2}
                      alt="Moment 2"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="h-1/3 rounded-lg overflow-hidden relative group cursor-none">
                  {celebrationImages.rightImage3 ? (
                    <img
                      src={celebrationImages.rightImage3}
                      alt="Moment 3"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Premium3DCard>
      </div>
    </section>
  );
};

// ================= VIDEO SECTION WITH PAGINATION =================
const VideoSection = ({ 
  videoItems, 
  videosLoading, 
  handleVideoClick, 
  handleCursorState,
  videoPage,
  videoTotalPages,
  onVideoPageChange,
  videoTotalItems,
  videoLimit
}) => {
  if (!videoItems || videoItems.length === 0) return null;

  const renderVideoPagination = () => {
    if (videoTotalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisible = 5;
    let startPage = Math.max(1, videoPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(videoTotalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => onVideoPageChange(videoPage - 1)}
          disabled={videoPage === 1}
          className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-[#C58B48] hover:text-[#C58B48] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => onVideoPageChange(1)}
              className="px-3.5 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-[#C58B48] hover:text-[#C58B48] transition-colors"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onVideoPageChange(page)}
            className={`px-3.5 py-2 rounded-lg border transition-colors ${
              videoPage === page
                ? "bg-[#C58B48] text-white border-[#C58B48]"
                : "border-gray-200 text-gray-600 hover:border-[#C58B48] hover:text-[#C58B48]"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < videoTotalPages && (
          <>
            {endPage < videoTotalPages - 1 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => onVideoPageChange(videoTotalPages)}
              className="px-3.5 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-[#C58B48] hover:text-[#C58B48] transition-colors"
            >
              {videoTotalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onVideoPageChange(videoPage + 1)}
          disabled={videoPage === videoTotalPages}
          className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-[#C58B48] hover:text-[#C58B48] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    );
  };

  return (
    <section className="py-16 relative z-10 bg-[#FAF8F0]">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
              FEATURED VIDEOS
            </span>
            <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937]">
              Cinematic Storytelling
            </h2>
            <p className="font-inter text-sm text-gray-500 mt-2">
              Showing {videoItems.length} of {videoTotalItems} videos
            </p>
          </div>
        </div>

        {videosLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48]"></div>
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{ perspective: 1200 }}
            >
              {videoItems.map((video, idx) => (
                <div key={video._id || video.id || idx} className="video-card">
                  <Premium3DCard
                    onMouseEnter={() => handleCursorState("view", "PLAY")}
                    onMouseLeave={() => handleCursorState("default")}
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="group bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBE3D5] hover:border-[#C58B48]/40 transition-all cursor-pointer">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={
                            video.image ||
                            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80"
                          }
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-2xl transform scale-90 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300 ease-out">
                            <Play className="w-6 h-6 text-[#C58B48] fill-[#C58B48] ml-1" />
                          </div>
                        </div>
                        {video.featured && (
                          <div className="absolute top-3 left-3 bg-[#C58B48] text-white text-[8px] px-2 py-0.5 rounded-full font-semibold tracking-wider">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-cormorant text-xl text-[#1F2937] mb-1">
                          {video.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {video.location}
                          </span>
                          {video.date && (
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {video.date}
                            </span>
                          )}
                        </div>
                        {video.category && (
                          <span className="inline-block mt-2 text-xs text-[#C58B48] font-medium">
                            {video.category}
                          </span>
                        )}
                        <div className="mt-3 flex items-center gap-2 text-[#C58B48] hover:text-[#1F2937] transition-colors font-inter text-sm font-medium">
                          <span>Watch Video</span>
                          <Play size={14} />
                        </div>
                      </div>
                    </div>
                  </Premium3DCard>
                </div>
              ))}
            </div>
            
            {renderVideoPagination()}
          </>
        )}
      </div>
    </section>
  );
};

// ================= FINAL CTA =================
const FinalCTA = ({ pageImages, navigate, handleCursorState }) => {
  return (
    <section
      className="py-12 px-6 lg:px-16 w-full max-w-[1400px] mx-auto mt-10"
      style={{ perspective: 1500 }}
    >
      <Premium3DCard>
        <div className="w-full bg-[#F5EFE6] rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/50 relative z-10 group">
          <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-20 bg-[#F5EFE6]">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              READY TO BEGIN YOUR JOURNEY?
            </span>
            <h2 className="font-cormorant text-4xl lg:text-[48px] text-[#1F2937] leading-[1.1] mb-6">
              Let's Create Your <br />
              <span className="italic text-[#C58B48]">
                Unforgettable Story
              </span>
            </h2>
            <p className="font-inter text-sm text-gray-600 leading-relaxed mb-10 max-w-md">
              Share your vision with us and let our experts craft a
              celebration that reflects your style and story.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button
                variant="champagne"
                size="md"
                className="font-montserrat text-[10px] w-full sm:w-auto shadow-none hover:scale-105 transition-transform"
                onClick={() => navigate("/contact")}
              >
                SCHEDULE A CONSULTATION{" "}
                <ArrowRight size={14} className="ml-2" />
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[300px] lg:h-auto relative z-10 overflow-hidden">
            {pageImages.footerBanner ? (
              <img
                src={pageImages.footerBanner}
                alt="Luxury Palace Celebration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F5EFE6] hidden lg:block" />

            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="absolute top-10 right-10 w-28 h-28 rounded-full border border-[#D4AF37]/40 flex items-center justify-center opacity-80 backdrop-blur-md hidden md:flex cursor-pointer bg-white/10"
            >
              <span className="font-cormorant text-4xl text-[#D4AF37]">
                V
              </span>
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]"
              >
                <path
                  id="curve"
                  d="M 50 15 A 35 35 0 1 1 49.9 15"
                  fill="transparent"
                />
                <text className="font-montserrat text-[8.5px] uppercase tracking-[0.2em] fill-[#D4AF37]">
                  <textPath href="#curve">
                    Violin Events LLP • Crafting Timeless Celebrations •
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </div>
        </div>
      </Premium3DCard>
    </section>
  );
};

// ================= PROJECT MODAL =================
const ProjectModal = ({ selectedProject, setSelectedProject }) => {
  if (!selectedProject) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2937]/80 backdrop-blur-sm"
      onClick={() => setSelectedProject(null)}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-[#FDFBF7] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#EBE3D5] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[300px] lg:h-[400px]">
          <img
            src={selectedProject.image}
            alt={selectedProject.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80";
            }}
          />
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1F2937] hover:bg-[#C58B48] hover:text-white transition-colors border border-[#EBE3D5]"
          >
            <X className="w-5 h-5" />
          </button>
          {selectedProject.featured && (
            <div className="absolute top-4 left-4 bg-[#C58B48] text-white px-4 py-1.5 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>
        <div className="p-8 lg:p-12">
          <div className="text-center">
            <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.2em] uppercase mb-3 block">
              {selectedProject.location}
            </span>
            <h2 className="font-cormorant text-4xl lg:text-5xl text-[#1F2937] mb-2">
              {selectedProject.title}
            </h2>
            {selectedProject.category && (
              <p className="text-sm text-[#C58B48] font-inter font-medium mb-4">
                {selectedProject.category}
              </p>
            )}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 font-inter mb-6">
              {selectedProject.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {selectedProject.date}
                </span>
              )}
              {selectedProject.guests && (
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {selectedProject.guests} Guests
                </span>
              )}
            </div>
            <div className="w-12 h-[1px] bg-[#C58B48]/50 mx-auto mb-6" />
            <p className="font-inter text-sm text-gray-600 leading-[1.8] max-w-xl mx-auto mb-8">
              {selectedProject.description ||
                "A beautiful celebration filled with love, laughter, and unforgettable moments. This project highlights our dedication to flawless execution and bespoke luxury."}
            </p>

            {selectedProject.highlights &&
              selectedProject.highlights.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-montserrat text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                    Highlights
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="bg-[#FDFBF7] border border-[#EBE3D5] px-3 py-1 rounded-full text-xs text-gray-600 font-inter"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {selectedProject.clientTestimonial && (
              <div className="bg-[#FDFBF7] border border-[#EBE3D5] rounded-xl p-6 mb-8">
                <Quote className="w-6 h-6 text-[#C58B48] mb-2 mx-auto" />
                <p className="font-inter text-sm text-gray-600 italic max-w-xl mx-auto">
                  "{selectedProject.clientTestimonial}"
                </p>
                {selectedProject.clientName && (
                  <p className="font-inter text-sm font-semibold text-[#1F2937] mt-2">
                    - {selectedProject.clientName}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ================= MAIN PORTFOLIO COMPONENT =================
const Portfolio = () => {
  // ========== ALL HOOKS IN CONSISTENT ORDER ==========
  
  // Refs
  const compRef = useRef(null);
  const windowSizeRef = useRef({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });

  // State hooks
  const [activeFilter, setActiveFilter] = useState("All Celebrations");
  const [selectedProject, setSelectedProject] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [videoItems, setVideoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videosLoading, setVideosLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Portfolio pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 9;
  
  // Video pagination
  const [videoPage, setVideoPage] = useState(1);
  const [videoTotalPages, setVideoTotalPages] = useState(1);
  const [videoTotalItems, setVideoTotalItems] = useState(0);
  const videoLimit = 3;
  
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [pageImages, setPageImages] = useState({
    heroBanner: null,
    footerBanner: null,
    centerImageMain: null,
    centerImage1: null,
    centerImage2: null,
    centerImage3: null,
    images: [],
  });
  const [imagesLoading, setImagesLoading] = useState(true);
  const [imagesError, setImagesError] = useState(false);

  // Motion values
  const globalX = useMotionValue(0);
  const globalY = useMotionValue(0);
  
  const heroX = useTransform(globalX, [0, windowSizeRef.current.width], [15, -15]);
  const heroY = useTransform(globalY, [0, windowSizeRef.current.height], [15, -15]);
  const bgX = useTransform(globalX, [0, windowSizeRef.current.width], [-15, 15]);
  const bgY = useTransform(globalY, [0, windowSizeRef.current.height], [-15, 15]);

  const navigate = useNavigate();

  // ========== useCallback hooks ==========
  
  const handleCursorState = useCallback((variant, text = "") => {
    setCursorVariant(variant);
    setCursorText(text);
  }, []);

  const handleVideoClick = useCallback((video) => {
    if (video.videoUrl) {
      setSelectedVideo(video);
      setIsVideoModalOpen(true);
    }
  }, []);

  const handleViewDetails = useCallback((item) => {
    setSelectedItemId(item._id || item.id);
    setIsDetailsModalOpen(true);
  }, []);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [totalPages]);

  const goToVideoPage = useCallback((page) => {
    if (page >= 1 && page <= videoTotalPages) {
      setVideoPage(page);
    }
  }, [videoTotalPages]);

  // ========== useEffect hooks ==========

  // Effect 1: Window resize handler
  useEffect(() => {
    const handleResize = () => {
      windowSizeRef.current = { 
        width: window.innerWidth, 
        height: window.innerHeight 
      };
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect 2: Global mouse move handler
  useEffect(() => {
    const handleGlobalMouse = (e) => {
      globalX.set(e.clientX);
      globalY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleGlobalMouse);
    return () => window.removeEventListener("mousemove", handleGlobalMouse);
  }, [globalX, globalY]);

  // Effect 3: Fetch ALL featured items
  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await portfolioApi.getFeatured();
        if (response.success && response.data) {
          const items = Array.isArray(response.data) ? response.data : [];
          setFeaturedItems(items);
        } else {
          setFeaturedItems([]);
        }
      } catch (err) {
        console.error("Error fetching featured items:", err);
        setFeaturedItems([]);
      }
    };
    fetchFeaturedItems();
  }, []);

  // Effect 4: Fetch portfolio items with pagination
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setLoading(true);
        const response = await portfolioApi.getAll({
          page: currentPage,
          limit: itemsPerPage,
        });

        if (response.success && response.data) {
          let items = [];
          let total = 0;

          if (response.data.items && Array.isArray(response.data.items)) {
            items = response.data.items;
            total = response.data.total || items.length;
          } else if (Array.isArray(response.data)) {
            items = response.data;
            total = items.length;
          } else if (response.data.portfolios) {
            items = response.data.portfolios;
            total = response.data.total || items.length;
          } else if (response.data.data) {
            items = response.data.data;
            total = response.data.total || items.length;
          }

          setPortfolioItems(items);
          setFilteredItems(items);
          setTotalPages(response.data.totalPages || Math.ceil(total / itemsPerPage));
          setTotalItems(response.data.total || total);
        } else {
          setError("No portfolio items found");
          setPortfolioItems([]);
          setFilteredItems([]);
        }
      } catch (err) {
        console.error("Error fetching portfolio items:", err);
        setError("Failed to load portfolio items");
        setPortfolioItems([]);
        setFilteredItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, [currentPage]);

  // Effect 5: Fetch portfolio page images
  useEffect(() => {
    const fetchPageImages = async () => {
      try {
        setImagesLoading(true);
        setImagesError(false);
        const response = await portfolioPageApi.getImages();

        if (response.success && response.data) {
          setPageImages({
            heroBanner: response.data.heroBanner || null,
            footerBanner: response.data.footerBanner || null,
            centerImageMain: response.data.centerImageMain || null,
            centerImage1: response.data.centerImage1 || null,
            centerImage2: response.data.centerImage2 || null,
            centerImage3: response.data.centerImage3 || null,
            images: response.data.images || [],
          });
        } else {
          console.warn("No images found in response");
          setImagesError(true);
        }
      } catch (err) {
        console.error("Error fetching page images:", err);
        setImagesError(true);
        setPageImages({
          heroBanner: null,
          footerBanner: null,
          centerImageMain: null,
          centerImage1: null,
          centerImage2: null,
          centerImage3: null,
          images: [],
        });
      } finally {
        setImagesLoading(false);
      }
    };

    fetchPageImages();
  }, []);

  // Effect 6: Fetch videos with pagination
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setVideosLoading(true);
        const response = await portfolioApi.getVideos({
          page: videoPage,
          limit: videoLimit,
        });

        if (response.success && response.data) {
          const data = response.data;
          setVideoItems(data.items || []);
          setVideoTotalPages(data.totalPages || 1);
          setVideoTotalItems(data.total || 0);
        } else {
          setVideoItems([]);
          setVideoTotalPages(1);
          setVideoTotalItems(0);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setVideoItems([]);
        setVideoTotalPages(1);
        setVideoTotalItems(0);
      } finally {
        setVideosLoading(false);
      }
    };

    fetchVideos();
  }, [videoPage]);

  // Effect 7: Filter items by category
  useEffect(() => {
    if (activeFilter === "All Celebrations") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(
        portfolioItems.filter(
          (item) =>
            item.category?.toLowerCase() === activeFilter.toLowerCase() ||
            item.category?.toLowerCase().includes(activeFilter.toLowerCase()),
        ),
      );
    }
  }, [activeFilter, portfolioItems]);

  // ========== useMemo hooks ==========

  const celebrationImages = useMemo(() => ({
    leftImage: pageImages.centerImageMain || pageImages.heroBanner || null,
    rightImage1: pageImages.centerImage1 || null,
    rightImage2: pageImages.centerImage2 || null,
    rightImage3: pageImages.centerImage3 || null,
  }), [pageImages]);

  const galleryImages = useMemo(() => pageImages.images || [], [pageImages]);

  const filters = useMemo(() => {
    const categories = new Set();
    portfolioItems.forEach((item) => {
      if (item.category) {
        categories.add(item.category);
      }
    });
    
    const filterNames = ["All Celebrations", ...Array.from(categories)];
    
    const iconMap = {
      "All Celebrations": Sparkles,
      Weddings: Heart,
      "Pre Wedding": Camera,
      "Destination Wedding": Camera,
      "Mehndi & Haldi": Flower2,
      Sangeet: Music,
      Reception: GlassWater,
      "Corporate Events": Building2,
      "Social Events": Users,
    };
    
    return filterNames.map((cat) => {
      let Icon = Sparkles;
      Object.keys(iconMap).forEach((key) => {
        if (
          cat.toLowerCase().includes(key.toLowerCase()) ||
          key.toLowerCase().includes(cat.toLowerCase())
        ) {
          Icon = iconMap[key];
        }
      });
      return { name: cat, icon: Icon };
    });
  }, [portfolioItems]);

  const displayItems = useMemo(() => 
    filteredItems.length > 0 ? filteredItems : portfolioItems,
  [filteredItems, portfolioItems]);

  // ========== RENDER PAGINATION ==========
  const renderPagination = useCallback(() => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-12">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-[#C58B48] hover:text-[#C58B48] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className="px-3.5 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-[#C58B48] hover:text-[#C58B48] transition-colors"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3.5 py-2 rounded-lg border transition-colors ${
              currentPage === page
                ? "bg-[#C58B48] text-white border-[#C58B48]"
                : "border-gray-200 text-gray-600 hover:border-[#C58B48] hover:text-[#C58B48]"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => goToPage(totalPages)}
              className="px-3.5 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-[#C58B48] hover:text-[#C58B48] transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-[#C58B48] hover:text-[#C58B48] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    );
  }, [currentPage, totalPages, goToPage]);

  // ========== EARLY RETURN FOR LOADING ==========
  if (loading || imagesLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48] mb-4"></div>
          <p className="text-gray-500 font-inter text-sm">
            Loading portfolio...
          </p>
        </div>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div
      ref={compRef}
      className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C58B48] selection:text-white pb-20 overflow-x-hidden md:cursor-none"
    >
      {/* HERO SECTION */}
      <section
        className="relative w-full min-h-[85vh] flex items-center pt-24 lg:pt-32 pb-24"
        style={{ perspective: 1200 }}
      >
        {pageImages.heroBanner ? (
          <motion.div
            style={{ x: bgX, y: bgY }}
            className="absolute top-0 right-[-5%] w-full lg:w-[65%] h-[110vh] z-0 pointer-events-none"
          >
            <img
              src={pageImages.heroBanner}
              alt="Beautiful Wedding Setup"
              className="w-full h-full object-cover opacity-90 scale-110"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 35%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 35%)",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
          </motion.div>
        ) : (
          <div className="absolute top-0 right-[-5%] w-full lg:w-[65%] h-[110vh] z-0 pointer-events-none bg-[#FDFBF7]" />
        )}

        <div
          className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-10"
          onMouseEnter={() => handleCursorState("explore", "EXPLORE")}
          onMouseLeave={() => handleCursorState("default")}
        />

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col justify-center h-full">
          <div className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-30 hidden md:flex">
            <span className="font-montserrat text-[8px] font-bold tracking-widest text-[#1F2937]">
              01
            </span>
            <div className="w-[1px] h-8 bg-[#1F2937]"></div>
            <span className="font-montserrat text-[8px] font-bold tracking-widest text-[#1F2937]">
              06
            </span>
          </div>

          <motion.div
            style={{ x: heroX, y: heroY }}
            className="w-full lg:w-[50%] pt-10 pl-0 md:pl-10"
          >
            <span className="hero-element font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-4 block">
              OUR PORTFOLIO
            </span>
            <h1 className="hero-element font-cormorant text-5xl lg:text-[72px] text-[#1F2937] leading-[1.1] mb-6">
              Stories we've <br />
              <span className="italic text-[#C58B48]">Beautifully Crafted</span>
            </h1>

            <p className="hero-element font-inter text-gray-600 text-sm leading-[1.8] max-w-[380px] mb-10">
              A glimpse of celebrations we've designed with passion, precision
              and perfection across breathtaking destinations.
            </p>

            <div className="hero-element flex flex-col sm:flex-row items-center gap-6">
              <Button
                variant="champagne"
                size="md"
                className="font-montserrat tracking-[0.2em] shadow-none w-full sm:w-auto hover:scale-105 transition-transform"
                onClick={() => navigate("/contact")}
              >
                EXPLORE OUR WORK <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-16 left-6 lg:left-24 flex flex-col items-center gap-2 text-gray-400 opacity-60 pointer-events-none"
        >
          <span className="font-montserrat text-[8px] font-bold tracking-[0.2em] uppercase">
            SCROLL
          </span>
          <ArrowDown size={14} className="animate-bounce" strokeWidth={1.5} />
        </motion.div>
      </section>

      {/* FILTER BAR */}
      <div className="w-full px-4 lg:px-16 max-w-[1400px] mx-auto -mt-16 relative z-30 flex justify-center">
        <div className="bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#EBE3D5] p-2 flex items-center overflow-x-auto no-scrollbar w-full max-w-[1100px]">
          {filters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(filter.name)}
              className={`flex flex-col items-center justify-center min-w-[110px] px-4 py-3 rounded-full transition-all duration-300 ${
                activeFilter === filter.name
                  ? "text-[#C58B48]"
                  : "text-gray-400 hover:text-[#C58B48]"
              }`}
            >
              <filter.icon className="w-5 h-5 mb-1.5" strokeWidth={1.5} />
              <span className="font-montserrat text-[8px] font-bold tracking-widest uppercase whitespace-nowrap">
                {filter.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED CELEBRATIONS - ALL ITEMS */}
      <FeaturedCelebrations 
        featuredItems={featuredItems} 
        handleCursorState={handleCursorState} 
        navigate={navigate} 
      />

      {/* ✅ AUTO MARQUEE GALLERY - SHOW ALL GALLERY IMAGES */}
      <AutoMarqueeGallery images={galleryImages} />

      {/* CELEBRATION SECTION */}
      <CelebrationSection 
        celebrationImages={celebrationImages} 
        handleCursorState={handleCursorState} 
      />

      {/* VIDEOS SECTION WITH PAGINATION */}
      <VideoSection 
        videoItems={videoItems}
        videosLoading={videosLoading}
        handleVideoClick={handleVideoClick}
        handleCursorState={handleCursorState}
        videoPage={videoPage}
        videoTotalPages={videoTotalPages}
        onVideoPageChange={goToVideoPage}
        videoTotalItems={videoTotalItems}
        videoLimit={videoLimit}
      />

      {/* ALL PORTFOLIO ITEMS WITH PAGINATION */}
      <section className="py-16">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="font-montserrat text-[#C58B48] text-[9px] font-bold tracking-[0.25em] uppercase mb-3 block">
                ALL CELEBRATIONS
              </span>
              <h2 className="font-cormorant text-4xl lg:text-[42px] text-[#1F2937]">
                Our Portfolio
              </h2>
              <p className="font-inter text-sm text-gray-500 mt-2">
                Showing {displayItems.length} of {totalItems} celebrations
              </p>
            </div>
          </div>

          {displayItems.length > 0 ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{ perspective: 1200 }}
            >
              {displayItems.map((item, idx) => (
                <div
                  key={item._id || item.id || idx}
                  className="portfolio-card"
                >
                  <Premium3DCard
                    onMouseEnter={() => handleCursorState("view", "VIEW")}
                    onMouseLeave={() => handleCursorState("default")}
                    onClick={() => handleViewDetails(item)}
                    className="h-full cursor-pointer"
                  >
                    <div className="group bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBE3D5] hover:border-[#C58B48]/40 transition-all h-full flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={
                            item.image ||
                            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80"
                          }
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80";
                          }}
                        />
                        {item.featured && (
                          <div className="absolute top-3 left-3 bg-[#C58B48] text-white px-2 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
                            <Heart size={12} />
                            Featured
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      <div className="p-5 flex flex-col flex-grow bg-white z-10">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-cormorant text-xl text-[#1F2937] leading-tight">
                            {item.title}
                          </h3>
                        </div>

                        <p className="font-inter text-[11px] text-gray-400 flex items-center gap-1 mb-2">
                          <MapPin size={12} className="text-[#C58B48]" />
                          {item.location}
                        </p>

                        <p className="font-inter text-[10px] text-[#C58B48] font-medium mb-3">
                          {item.category}
                        </p>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users size={12} />
                              {item.guests}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(item);
                            }}
                            className="text-[#C58B48] hover:text-[#1F2937] transition-colors text-xs font-medium flex items-center gap-1"
                          >
                            View Details
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Premium3DCard>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 font-inter">
                No portfolio items available
              </p>
            </div>
          )}

          {renderPagination()}
        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA 
        pageImages={pageImages}
        navigate={navigate}
        handleCursorState={handleCursorState}
      />

      {/* MODALS */}
      <AnimatePresence>
        <ProjectModal 
          selectedProject={selectedProject} 
          setSelectedProject={setSelectedProject} 
        />
      </AnimatePresence>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false);
          setSelectedVideo(null);
        }}
        videoUrl={selectedVideo?.videoUrl}
        title={selectedVideo?.title}
      />

      <PortfolioDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedItemId(null);
        }}
        itemId={selectedItemId}
      />
    </div>
  );
};

export default Portfolio;