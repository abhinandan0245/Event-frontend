// src/components/FloatingAudioPlayer.jsx
import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

const FloatingAudioPlayer = () => {
  // State to track if music is playing - default to true
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Ref to directly access the hidden HTML audio element
  const audioRef = useRef(null);

  // Auto-play on component mount
  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      // Try to play the audio
      const playPromise = audio.play();
      
      // Handle play promise (browsers may block autoplay)
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Auto-play succeeded
            setIsPlaying(true);
          })
          .catch(() => {
            // Auto-play was blocked by browser
            setIsPlaying(false);
            console.log("Autoplay was blocked by the browser. User interaction required.");
          });
      }
    }
  }, []);

  // Function to handle the play/pause logic
  const togglePlay = () => {
    const audio = audioRef.current;
    
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Try to play when user clicks
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Playback failed:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {/* 
        The hidden audio element. 
        Note: Place your mp3 file inside the "public" folder of your React app.
        For example: public/audio/event-music.mp3 
      */}
      <audio
        ref={audioRef}
        src="/audio/event-music.mpeg" 
        loop // This makes the music start over when it finishes
        preload="auto"
      />

      {/* The visible toggle button */}
      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-14 h-14 bg-[#C58B48] text-white rounded-full shadow-xl hover:bg-[#B07A3A] hover:scale-105 transition-all duration-300 border-2 border-white/20"
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          // Icon when music is playing
          <Volume2 size={24} />
        ) : (
          // Icon when music is paused/muted
          <VolumeX size={24} />
        )}
      </button>
    </div>
  );
};

export default FloatingAudioPlayer;