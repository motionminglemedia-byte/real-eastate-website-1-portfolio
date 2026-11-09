"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, LayoutGrid, X } from "lucide-react";

export default function VideoPlayerOverlay() {
  const [isMuted, setIsMuted] = useState(true);
  const [specsModalOpen, setSpecsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(5);
  const [timeDisplay, setTimeDisplay] = useState("00:01");

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  // Synthesize gentle Mediterranean sea breeze & ambient harmonic atmosphere via Web Audio
  const initAmbientAudio = () => {
    if (audioContextRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Synthesize ocean wave wash
      const bufferSize = ctx.sampleRate * 4;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555;
        b1 = 0.99332 * b1 + white * 0.0751;
        b2 = 0.96900 * b2 + white * 0.1539;
        output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.04;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(180, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      noise.connect(filter);
      filter.connect(masterGain);
      noise.start();

      // Soft architectural harmonic drone
      [146.83, 220.0].forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.015, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
      });
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  const toggleMute = () => {
    const video = document.querySelector("#media-canvas-container video") as HTMLVideoElement | null;
    const nextState = !isMuted;
    setIsMuted(nextState);

    // Sync HTML5 video audio track
    if (video) {
      video.muted = nextState;
    }

    // Control Web Audio atmospheric soundscape
    if (!nextState) {
      initAmbientAudio();
      const ctx = audioContextRef.current;
      const gain = masterGainRef.current;
      if (ctx && gain) {
        if (ctx.state === "suspended") ctx.resume();
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.2);
      }
    } else {
      const ctx = audioContextRef.current;
      const gain = masterGainRef.current;
      if (ctx && gain) {
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      }
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
            aria-label={isMuted ? "Unmute atmospheric sound" : "Mute atmospheric sound"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-zinc-400 group-hover:text-amber-300 transition-colors" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            )}
            <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 group-hover:text-zinc-200">
              {isMuted ? "Mute" : "Atmosphere"}
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
