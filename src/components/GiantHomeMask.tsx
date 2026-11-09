import React from "react";

export default function GiantHomeMask() {
  return (
    <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto text-center flex flex-col items-center justify-center space-y-6">
        {/* Subtitle Above */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.35em] text-zinc-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>BUILT, FURNISHED, HANDED OVER.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>

        {/* Giant HOME Mask Typography */}
        <div className="relative w-full flex items-center justify-center my-4 select-none">
          {/* Subtle outline glow behind the mask */}
          <div 
            className="absolute inset-0 flex items-center justify-center text-[22vw] md:text-[24vw] font-black tracking-tighter text-white/[0.03] blur-sm select-none"
            aria-hidden="true"
          >
            HOME
          </div>

          {/* The Clipped "HOME" Text Mask */}
          <h2
            className="text-[22vw] md:text-[24vw] font-black tracking-tight leading-none text-transparent bg-clip-text select-none transition-transform duration-700 hover:scale-[1.01]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center 45%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "contrast(1.15) brightness(1.1)",
            }}
          >
            HOME
          </h2>
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

