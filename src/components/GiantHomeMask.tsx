import React from "react";

export default function GiantHomeMask() {
  return (
    <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto text-center flex flex-col items-center justify-center space-y-6">
        {/* Subtitle Above */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.35em] text-zinc-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>BUILT, FURNISHED, HANDED OVER.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>

        {/* 
          Giant HOME Mask Typography:
          Uses SVG knockout mask so the fixed background video inside #media-canvas-container 
          literally shines through the cutout letters of "HOME" as the user scrolls!
        */}
        <div className="relative w-full flex items-center justify-center my-4 select-none">
          {/* SVG Knockout Mask revealing the live background video */}
          <svg
            className="w-full max-w-5xl h-auto block select-none pointer-events-none"
            viewBox="0 0 1000 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="home-video-knockout">
                {/* White reveals background, Black cuts out window */}
                <rect width="100%" height="100%" fill="black" />
                <text
                  x="500"
                  y="245"
                  textAnchor="middle"
                  fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                  fontSize="280"
                  fontWeight="900"
                  letterSpacing="-8"
                  fill="white"
                >
                  HOME
                </text>
              </mask>
            </defs>

            {/* Glowing amber edge stroke around the cutout */}
            <text
              x="500"
              y="245"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontSize="280"
              fontWeight="900"
              letterSpacing="-8"
              stroke="rgba(245, 167, 20, 0.3)"
              strokeWidth="2"
              fill="transparent"
            >
              HOME
            </text>
          </svg>

          {/* HTML Overlay with mix-blend / background clip for ultra-vivid fallback */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2
              className="text-[22vw] md:text-[23vw] font-black tracking-tighter leading-none text-transparent select-none transition-transform duration-700 hover:scale-[1.01]"
              style={{
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
                backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              HOME
            </h2>
          </div>
        </div>

        {/* Narrative Subtitle Below */}
        <p className="font-serif text-xl sm:text-2xl md:text-3xl text-zinc-200/90 font-light italic max-w-2xl leading-relaxed">
          &ldquo;Everything in its place. Ready the day you arrive.&rdquo;
        </p>

        {/* Turnkey spec indicators */}
        <div className="pt-6 flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-zinc-400 uppercase tracking-widest">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="text-amber-400">✦</span> BESPOKE FURNITURE
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="text-amber-400">✦</span> CURATED ART INSTALLATION
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="text-amber-400">✦</span> SMART CLIMATE AUTOMATION
          </span>
        </div>
      </div>
    </section>
  );
}
