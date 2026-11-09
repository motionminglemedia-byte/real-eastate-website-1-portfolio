import React from "react";
import Image from "next/image";
import { Compass, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section 
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 lg:px-12 pt-28 pb-20 max-w-7xl mx-auto z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Typography Block */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* Phase Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono tracking-[0.2em] uppercase">
            <Compass className="w-3.5 h-3.5 animate-spin-slow text-amber-300" />
            <span>01 • THE PLAN</span>
          </div>

          {/* Main Headline with Serif + Italic Pairing */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-white leading-[1.05] drop-shadow-sm">
            It starts{" "}
            <span className="font-serif italic font-normal text-amber-200/90 text-glow">
              on paper.
            </span>
          </h1>

          {/* Narrative Subtitle */}
          <p className="max-w-xl text-base sm:text-lg md:text-xl text-zinc-300/90 font-light leading-relaxed">
            Every Pheme house starts with a blueprint... and ends with a masterpiece.
            Built before a single stone is laid.
          </p>

          {/* Subtle Project Blueprint Meta */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400 tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>PROJECT REF: CY-094</span>
            </div>
            <div className="w-[1px] h-3 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span>LOCATION: LIMASSOL COAST</span>
            </div>
            <div className="w-[1px] h-3 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2 text-amber-300/80">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE 3D BLUEPRINT</span>
            </div>
          </div>
        </div>

        {/* Right Blueprint Frame Preview (matching the blueprint in the video) */}
        <div className="lg:col-span-5 relative group">
          <div className="relative mx-auto max-w-md w-full rounded-2xl overflow-hidden border border-white/15 bg-slate-900/40 backdrop-blur-md shadow-2xl p-2 transition-transform duration-500 hover:scale-[1.02]">
            {/* Top Blueprint Header Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
              <span className="text-amber-400">ARCHITECTURAL SCHEMATIC</span>
              <span>SCALE: 1:100</span>
            </div>

            {/* Blueprint Visual Representation */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#0d1525] border border-blue-400/20">
              {/* Cyan Blueprint Grid Lines */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(56, 189, 248, 0.25) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(56, 189, 248, 0.25) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Blueprint Image Visual */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative w-full h-full border border-sky-400/40 rounded-lg p-4 flex flex-col justify-between">
                  {/* Blueprint Floorplan Wireframe SVG */}
                  <svg className="w-full h-full text-sky-400/80" viewBox="0 0 400 250" fill="none" stroke="currentColor">
                    <rect x="20" y="20" width="360" height="210" strokeWidth="1.5" strokeDasharray="4 4" />
                    <rect x="40" y="40" width="220" height="170" strokeWidth="2" />
                    <rect x="280" y="40" width="100" height="90" strokeWidth="1.5" />
                    <rect x="280" y="145" width="100" height="65" strokeWidth="1.5" />
                    {/* Pool Outline */}
                    <rect x="60" y="60" width="120" height="60" strokeWidth="1.5" fill="rgba(56, 189, 248, 0.1)" />
                    <text x="75" y="95" fill="currentColor" fontSize="10" fontFamily="monospace" stroke="none">SALT INFINITY POOL</text>
                    {/* Living Room */}
                    <rect x="60" y="135" width="180" height="60" strokeWidth="1.5" />
                    <text x="80" y="170" fill="currentColor" fontSize="11" fontFamily="monospace" stroke="none">PRIMARY ATRIUM & SALON</text>
                    {/* Terrace */}
                    <path d="M 200 40 L 260 40 L 260 120" strokeWidth="1.5" strokeDasharray="2 2" />
                    {/* Compass North Arrow */}
                    <circle cx="340" cy="85" r="16" strokeWidth="1" />
                    <line x1="340" y1="73" x2="340" y2="97" strokeWidth="1.5" />
                    <text x="337" y="70" fill="#f59e0b" fontSize="10" fontWeight="bold" stroke="none">N</text>
                  </svg>
                </div>
              </div>

              {/* Bottom Badge inside Blueprint (Matching the "ROLL TO BUILD" tag from the video) */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-300">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  SCROLL TO BUILD
                </span>
                <span className="text-zinc-500">REV. 04 / FINAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

