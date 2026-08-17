// src/components/modals/PortfolioDetailsModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Users,
  MapPin,
  Tag,
  Heart,
  Quote,
  Play,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  User,
  Clock,
  Pause,
  Maximize2,
  Minus,
  Plus,
} from "lucide-react";
import { portfolioApi } from "../api/portfolioApi";
import Button from "./ui/Button";

const PortfolioDetailsModal = ({ isOpen, onClose, itemId }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (isOpen && itemId) {
      fetchItemDetails();
      setShowVideo(false);
      setIsLightboxOpen(false);
    }
  }, [isOpen, itemId]);

  useEffect(() => {
    if (!isOpen) {
      setActiveImageIndex(0);
      setShowVideo(false);
      setIsLightboxOpen(false);
    }
  }, [isOpen]);

  const fetchItemDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await portfolioApi.getById(itemId);
      if (response.success && response.data) {
        setItem(response.data);
      } else {
        setError("Failed to load details");
      }
    } catch (err) {
      console.error("Error fetching item details:", err);
      setError("Failed to load details");
    } finally {
      setLoading(false);
    }
  };

  // Get all images for carousel
  const getAllImages = () => {
    if (!item) return [];
    const images = [];

    if (item.image) images.push(item.image);
    if (item.images && item.images.length > 0) {
      item.images.forEach((img) => {
        if (!images.includes(img)) images.push(img);
      });
    }

    return images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
        ];
  };

  const images = getAllImages();
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setActiveImageIndex(index);
  };

  // Lightbox functions
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Extract video ID from various YouTube URL formats
  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&]+)/,
      /(?:youtu\.be\/)([^?]+)/,
      /(?:youtube\.com\/embed\/)([^?]+)/,
      /(?:youtube\.com\/v\/)([^?]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return url;
  };

  const getEmbedUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  };

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  const embedUrl = item?.videoUrl ? getEmbedUrl(item.videoUrl) : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        if (e.key === "ArrowRight") nextLightboxImage();
        if (e.key === "ArrowLeft") prevLightboxImage();
        if (e.key === "Escape") closeLightbox();
      } else if (isOpen && !showVideo) {
        if (e.key === "ArrowRight" && hasMultipleImages) nextImage();
        if (e.key === "ArrowLeft" && hasMultipleImages) prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, isOpen, showVideo, hasMultipleImages]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Lightbox Modal */}
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
              >
                <X className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightboxImage();
                }}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightboxImage();
                }}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <div className="relative max-w-[90vw] max-h-[90vh]">
                <img
                  src={images[lightboxIndex]}
                  alt={`${item?.title} - ${lightboxIndex + 1}`}
                  className="max-w-[90vw] max-h-[85vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80";
                  }}
                />

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 px-4 py-2 rounded-full">
                  {lightboxIndex + 1} / {images.length}
                </div>

                {images.length > 1 && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto p-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIndex(idx);
                        }}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                          idx === lightboxIndex
                            ? "border-white"
                            : "border-transparent opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=100&q=80";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Main Modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              {loading ? (
                <div className="flex items-center justify-center h-[500px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48]"></div>
                </div>
              ) : error || !item ? (
                <div className="flex flex-col items-center justify-center h-[400px] p-8 text-center">
                  <p className="text-red-500 font-inter">
                    {error || "Item not found"}
                  </p>
                  <Button onClick={onClose} className="mt-4">
                    Close
                  </Button>
                </div>
              ) : (
                <div>
                  {/* Image Gallery / Video Player */}
                  <div className="relative h-[350px] md:h-[450px] bg-gray-900 overflow-hidden">
                    {showVideo && embedUrl ? (
                      // ✅ Video Player - Only shown when "Watch Film" is clicked
                      <div className="relative w-full h-full">
                        <iframe
                          src={embedUrl}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          frameBorder="0"
                          title={item.title}
                        />
                        <button
                          onClick={handleCloseVideo}
                          className="absolute top-4 left-4 z-30 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      // ✅ Image Gallery - Always shown by default
                      <>
                        <div className="relative w-full h-full">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={activeImageIndex}
                              src={images[activeImageIndex]}
                              alt={item.title}
                              className="w-full h-full object-cover cursor-pointer"
                              initial={{ opacity: 0, scale: 1.05 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.5 }}
                              onClick={() => openLightbox(activeImageIndex)}
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80";
                              }}
                            />
                          </AnimatePresence>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                          {item.featured && (
                            <div className="absolute top-4 left-4 bg-[#C58B48] text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 z-10">
                              <Heart size={14} />
                              Featured
                            </div>
                          )}

                          {/* Category Badge */}
                          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg z-10">
                            <span className="text-xs font-semibold text-[#C58B48] uppercase tracking-wider">
                              {item.category}
                            </span>
                          </div>

                          {/* Image Counter */}
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs backdrop-blur-sm z-10">
                            {activeImageIndex + 1} / {images.length}
                          </div>

                          {/* Expand Button */}
                          <button
                            onClick={() => openLightbox(activeImageIndex)}
                            className="absolute bottom-6 right-6 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors backdrop-blur-sm z-10"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>

                          {/* Navigation Arrows */}
                          {hasMultipleImages && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  prevImage();
                                }}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all hover:scale-110 z-10"
                              >
                                <ChevronLeft size={24} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  nextImage();
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all hover:scale-110 z-10"
                              >
                                <ChevronRight size={24} />
                              </button>
                            </>
                          )}

                          {/* Dot Indicators */}
                          {hasMultipleImages && (
                            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                              {images.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => goToImage(index)}
                                  className={`w-2 h-2 rounded-full transition-all ${
                                    index === activeImageIndex
                                      ? "bg-white w-6"
                                      : "bg-white/50 hover:bg-white/80"
                                  }`}
                                />
                              ))}
                            </div>
                          )}

                          {/* Thumbnail Strip */}
                          {hasMultipleImages && (
                            <div className="absolute bottom-20 left-0 right-0 px-4 z-10">
                              <div className="flex gap-2 overflow-x-auto justify-center pb-2">
                                {images.map((img, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => goToImage(idx)}
                                    className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                                      idx === activeImageIndex
                                        ? "border-white shadow-lg"
                                        : "border-transparent opacity-60 hover:opacity-100"
                                    }`}
                                  >
                                    <img
                                      src={img}
                                      alt={`Thumbnail ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.src =
                                          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=100&q=80";
                                      }}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h2 className="font-cormorant text-3xl md:text-4xl text-[#1F2937] leading-tight mb-2">
                      {item.title}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-500 mb-4">
                      <MapPin size={16} className="text-[#C58B48]" />
                      <span className="font-inter text-sm">
                        {item.location}
                      </span>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#FDFBF7] rounded-xl mb-6">
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-[#C58B48]" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {item.date}
                          </p>
                          <p className="text-xs text-gray-500">Date</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users size={18} className="text-[#C58B48]" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {item.guests}
                          </p>
                          <p className="text-xs text-gray-500">Guests</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Tag size={18} className="text-[#C58B48]" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {item.category}
                          </p>
                          <p className="text-xs text-gray-500">Category</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <ImageIcon size={18} className="text-[#C58B48]" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {images.length}
                          </p>
                          <p className="text-xs text-gray-500">Images</p>
                        </div>
                      </div>
                    </div>

                    {/* ✅ Watch Video Button - Only shown if video exists and video is not playing */}
                    {item.videoUrl && embedUrl && !showVideo && (
                      <button
                        onClick={handlePlayVideo}
                        className="w-full mb-6 px-4 py-3 bg-[#C58B48] text-white rounded-xl font-inter flex items-center justify-center gap-2 hover:bg-[#B07A3A] transition-colors"
                      >
                        <Play size={18} />
                        Watch Film
                      </button>
                    )}

                    {item.description && (
                      <div className="mb-6">
                        <h3 className="font-cormorant text-xl text-[#1F2937] mb-2">
                          About This Celebration
                        </h3>
                        <p className="font-inter text-gray-600 leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </div>
                    )}

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-cormorant text-xl text-[#1F2937] mb-3">
                          Highlights
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {item.highlights.map((highlight, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-[#FDFBF7] border border-[#EBE3D5] rounded-full text-xs text-gray-700 font-inter"
                            >
                              ✨ {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.clientTestimonial && (
                      <div className="mb-6 bg-[#FDFBF7] border border-[#EBE3D5] rounded-xl p-6">
                        <Quote size={24} className="text-[#C58B48] mb-3" />
                        <p className="font-inter text-sm text-gray-600 italic leading-relaxed">
                          "{item.clientTestimonial}"
                        </p>
                        {item.clientName && (
                          <p className="font-inter text-sm font-semibold text-[#1F2937] mt-3">
                            — {item.clientName}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {item.videoUrl && embedUrl && !showVideo && (
                        <Button
                          variant="champagne"
                          className="flex-1 font-inter flex items-center gap-2"
                          onClick={handlePlayVideo}
                        >
                          <Play size={16} />
                          Watch Film
                        </Button>
                      )}
                      {showVideo && (
                        <Button
                          variant="outline"
                          className="flex-1 font-inter flex items-center gap-2"
                          onClick={handleCloseVideo}
                        >
                          <X size={16} />
                          Close Video
                        </Button>
                      )}
                      <Button
                        variant="primary"
                        className="flex-1 font-inter"
                        onClick={() => (window.location.href = "/contact")}
                      >
                        Plan Similar Celebration
                      </Button>
                      <Button
                        variant="outline"
                        className="font-inter"
                        onClick={onClose}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PortfolioDetailsModal;
