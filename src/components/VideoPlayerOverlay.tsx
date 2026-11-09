"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, LayoutGrid, X } from "lucide-react";

export default function VideoPlayerOverlay() {
  const [isMuted, setIsMuted] = useState(true);
  const [specsModalOpen, setSpecsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(5);
  const [timeDisplay, setTimeDisplay] = useState("00:01");

  const toggleMute = () => {
    const video = document.querySelector("#media-canvas-container video") as HTMLVideoElement | null;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const video = document.querySelector("#media-canvas-container video") as HTMLVideoElement | null;
      if (video && video.duration && !isNaN(video.currentTime)) {
        const sec = Math.floor(video.currentTime);
        setTimeDisplay(`00:${sec < 10 ? "0" + sec : sec}`);
        setScrollProgress(Math.min(100, (video.currentTime / video.duration) * 100));
      } else {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const progress = Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100)));
          setScrollProgress(progress);
          const seconds = Math.min(20, Math.max(1, Math.floor((progress / 100) * 20)));
          setTimeDisplay(`00:${seconds < 10 ? "0" + seconds : seconds}`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 inset-x-6 md:inset-x-12 z-40 flex items-center justify-between pointer-events-none select-none">
        {/* Left: Audio & Scrubber Bar */}
        <div className="flex items-center gap-3 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 pointer-events-auto transition-colors">
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors group focus:outline-none"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-zinc-400 group-hover:text-amber-300 transition-colors" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400" />
            )}
            <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 group-hover:text-zinc-200">
              {isMuted ? "Mute" : "Sound"}
            </span>
          </button>

          <div className="w-[1px] h-3 bg-white/20 mx-1" />

          {/* Time Scrubber */}
          <div className="flex items-center gap-2.5">
            <div className="w-16 md:w-28 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full transition-all duration-150"
                style={{ width: `${Math.max(8, scrollProgress)}%` }}
              />
            </div>
            <span className="text-[10px] font-mono tracking-wider text-zinc-400 min-w-[32px]">
              {timeDisplay}
            </span>
          </div>
        </div>

        {/* Center: Scroll Hint (subtle) */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-mono text-zinc-500 bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/[0.05]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-ping" />
          <span>Scroll to scrub timeline</span>
        </div>

        {/* Right: Unlock Specs Button */}
        <button
          onClick={() => setSpecsModalOpen(true)}
          className="flex items-center gap-2 bg-black/40 hover:bg-black/60 hover:border-amber-400/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 pointer-events-auto text-zinc-300 hover:text-white transition-all duration-300 group shadow-lg shadow-black/20 focus:outline-none"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-300 transition-colors" />
          <span className="text-[11px] font-medium tracking-wider uppercase text-zinc-300 group-hover:text-amber-200">
            Unlock Specs
          </span>
        </button>
      </div>

      {/* Specs Modal Preview */}
      {specsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#0e131b] border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => setSpecsModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close specs modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-amber-400 uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Architectural Specifications
            </div>

            <h3 className="font-serif text-2xl text-white mb-2">
              The Hillside Horizon Villa
            </h3>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              Certified Eurocode 8 structural seismic resistance with integrated thermal limestone envelope and solar-powered climate circulation.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-left">
              <div className="bg-white/[0.02] border border-white/[0.06] p-3 rounded-lg">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Total Plot Area</div>
                <div className="text-lg font-serif text-zinc-100 font-semibold mt-0.5">1,450 m²</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.06] p-3 rounded-lg">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Internal Living</div>
                <div className="text-lg font-serif text-zinc-100 font-semibold mt-0.5">620 m²</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.06] p-3 rounded-lg">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Energy Class</div>
                <div className="text-lg font-serif text-amber-300 font-semibold mt-0.5">A+ Net Zero</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.06] p-3 rounded-lg">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Infinity Pool</div>
                <div className="text-lg font-serif text-zinc-100 font-semibold mt-0.5">22m Saltwater</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSpecsModalOpen(false)}
                className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-black hover:bg-amber-300 transition-colors"
              >
                Close Specifications
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
