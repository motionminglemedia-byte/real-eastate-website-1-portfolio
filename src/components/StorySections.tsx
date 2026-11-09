import React from "react";
import { ArrowRight, Layers, Hammer, SunMedium, ShieldCheck } from "lucide-react";

export default function StorySections() {
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 space-y-36 md:space-y-48 py-16">
      {/* 02: THE FOUNDATION (Frame 00:01) */}
      <section className="relative min-h-[75vh] flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono tracking-[0.2em] uppercase">
            <Layers className="w-3.5 h-3.5 text-amber-300" />
            <span>02 • THE FOUNDATION</span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.08]">
            Rooted{" "}
            <span className="font-serif italic font-normal text-amber-200/90 text-glow">
              in the hill.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300/90 font-light leading-relaxed">
            Solid foundations, poured deep into Cyprus rock. Built to withstand time, wind, and salt.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs font-mono text-zinc-400 tracking-wider">
            <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
              DEPTH: 8.5M BEDROCK ANCHOR
            </span>
            <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
              SEISMIC CLASS: GRADE A
            </span>
          </div>
        </div>
      </section>

      {/* 03: THE STRUCTURE (Frame 00:02 - 00:03) - Right Aligned */}
      <section className="relative min-h-[75vh] flex flex-col justify-center items-end text-right">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono tracking-[0.2em] uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>03 • THE STRUCTURE</span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.08]">
            Then it{" "}
            <span className="font-serif italic font-normal text-amber-200/90 text-glow">
              rises.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300/90 font-light leading-relaxed">
            Monolithic reinforced concrete engineered to defy seismic force while framing unobstructed horizon views of the Mediterranean.
          </p>

          <div className="pt-2 flex justify-end items-center gap-4 text-xs font-mono text-zinc-400 tracking-wider">
            <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
              POST-TENSIONED SLABS
            </span>
            <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
              18M CANTILEVER
            </span>
          </div>
        </div>
      </section>

      {/* 04: THE CRAFT (Frame 00:04) - Right Aligned */}
      <section className="relative min-h-[75vh] flex flex-col justify-center items-end text-right">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono tracking-[0.2em] uppercase">
            <Hammer className="w-3.5 h-3.5 text-amber-300" />
            <span>04 • THE CRAFT</span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.08]">
            Finished{" "}
            <span className="font-serif italic font-normal text-amber-200/90 text-glow">
              by hand.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300/90 font-light leading-relaxed">
            Local limestone, hand-brushed travertine, and thermal cedar crafted by veteran Mediterranean artisans.
          </p>

          <div className="pt-2 flex justify-end items-center gap-4 text-xs font-mono text-zinc-400 tracking-wider">
            <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
              CYPRIOT QUARRIED STONE
            </span>
            <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
              BRUSHED AGED BRASS
            </span>
          </div>
        </div>
      </section>

      {/* 05: THE LIVING (Frame 00:05 - 00:06) - Left Aligned */}
      <section className="relative min-h-[85vh] flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono tracking-[0.2em] uppercase">
            <SunMedium className="w-3.5 h-3.5 text-amber-300" />
            <span>05 • THE LIVING</span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.05]">
            Made for{" "}
            <span className="font-serif italic font-normal text-amber-200/90 text-glow">
              long summers.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300/90 font-light leading-relaxed">
            Seamless indoor-outdoor terraces, infinity saltwater pools, and panoramic glass framing Aegean sunsets.
          </p>

          <div className="pt-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/5 hover:bg-amber-400/15 border border-white/15 hover:border-amber-300/50 text-white hover:text-amber-200 transition-all duration-300"
            >
              <span>Explore this villa</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

