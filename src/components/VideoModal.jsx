// src/components/VideoModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, ExternalLink } from "lucide-react";
import Button from "./ui/Button";

const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract video ID from various YouTube URL formats
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    // Handle YouTube Shorts URLs
    // https://www.youtube.com/shorts/uWZV0-vzo8Q
    const shortsMatch = url.match(/youtube\.com\/shorts\/([^\/\?]+)/);
    if (shortsMatch) {
      return shortsMatch[1];
    }
    
    // Handle standard YouTube URLs
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    
    return null;
  };

  // Check if URL is a YouTube Shorts
  const isYouTubeShorts = (url) => {
    return url && url.includes('youtube.com/shorts/');
  };

  // Get YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;
    
    // For Shorts, we can use the same embed URL but it will work
    // We also add controls=1 and modestbranding=1 for better experience
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`;
  };

  // Extract video ID from Vimeo URL
  const getVimeoEmbedUrl = (url) => {
    if (!url) return null;
    
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match) {
      return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
    }
    
    return null;
  };

  // Get the actual embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    
    // YouTube (including Shorts)
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return getYouTubeEmbedUrl(url);
    }
    
    // Vimeo
    if (url.includes('vimeo.com')) {
      return getVimeoEmbedUrl(url);
    }
    
    // Direct video files
    if (url.match(/\.(mp4|webm|ogg|mov)$/i)) {
      return url;
    }
    
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const isYouTube = embedUrl?.includes('youtube.com/embed');
  const isVimeo = embedUrl?.includes('player.vimeo.com');
  const isDirectVideo = embedUrl?.match(/\.(mp4|webm|ogg|mov)$/i);
  const isShorts = isYouTubeShorts(videoUrl);
  const videoId = getYouTubeVideoId(videoUrl);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title */}
            {title && (
              <div className="absolute top-4 left-4 z-50">
                <h3 className="text-white font-cormorant text-xl md:text-2xl">
                  {title}
                </h3>
              </div>
            )}

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black">
              {isYouTube || isVimeo ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title || "Video Player"}
                />
              ) : isDirectVideo ? (
                <video
                  controls
                  autoPlay
                  className="w-full h-full"
                  poster="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80"
                >
                  <source src={videoUrl} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white p-8 text-center">
                  <Play className="w-16 h-16 text-white/50 mb-4" />
                  <p className="text-gray-400 text-lg">Unable to play video</p>
                  
                  {isShorts && videoId && (
                    <div className="mt-4 bg-white/5 rounded-lg p-4 max-w-md">
                      <p className="text-yellow-400 text-sm mb-2">
                        ⚠️ YouTube Shorts detected
                      </p>
                      <p className="text-gray-400 text-xs mb-3">
                        YouTube Shorts can't be embedded directly. Please use the button below to watch it on YouTube.
                      </p>
                    </div>
                  )}
                  
                  <p className="text-gray-500 text-sm mt-2 break-all max-w-md">
                    Video URL: {videoUrl}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    {isShorts && videoId ? (
                      <Button
                        variant="champagne"
                        className="text-white border-white/30 hover:bg-white/10"
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Watch on YouTube
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="text-white border-white/30 hover:bg-white/10"
                        onClick={() => window.open(videoUrl, '_blank')}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Open Video in New Tab
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;