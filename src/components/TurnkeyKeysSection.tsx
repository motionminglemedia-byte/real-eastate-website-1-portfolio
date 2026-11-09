import React from "react";
import { CheckCircle2, Shield, FileCheck, Clock } from "lucide-react";

export default function TurnkeyKeysSection() {
  const cards = [
    {
      title: "Fixed",
      subtitle: "price & timeline",
      description: "Guaranteed turnkey contract with zero cost overruns and defined handover date.",
      icon: Clock,
      badge: "Zero Overruns",
    },
    {
      title: "Deeded",
      subtitle: "freehold ownership",
      description: "Direct European Union freehold title deeds registered with Cyprus Land Registry.",
      icon: Shield,
      badge: "Clean Title",
    },
    {
      title: "One",
      subtitle: "contract, no surprises",
      description: "Unified architectural design, structural engineering, permits, and interior execution.",
      icon: FileCheck,
      badge: "Turnkey Sole Point",
    },
  ];

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-28 md:py-36">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading and Narrative */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-36">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono tracking-[0.2em] uppercase">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
            <span>06 • TURNKEY CERTAINTY</span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.08]">
            Your keys,{" "}
            <span className="font-serif italic font-normal text-amber-200/90 text-glow">
              ready.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300/90 font-light leading-relaxed">
            From first sketch to front door keys, a turnkey luxury estate delivered without friction.
          </p>

          <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="text-amber-400 font-semibold">100%</span>
            <span>TRANSPARENT ARCHITECTURAL GOVERNANCE</span>
          </div>
        </div>

        {/* Right Column: 3 Feature Spec Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-amber-400/40 backdrop-blur-md p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-4xl sm:text-5xl font-normal text-white group-hover:text-amber-200 transition-colors">
                      {card.title}
                    </span>
                    <span className="font-serif italic text-xl sm:text-2xl text-amber-300/80">
                      {card.subtitle}
                    </span>
                  </div>

                  <span className="self-start sm:self-auto text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 group-hover:border-amber-400/30">
                    {card.badge}
                  </span>
                </div>

                <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-xl">
                  {card.description}
                </p>

                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl pointer-events-none">
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-amber-400/10 rotate-45 group-hover:bg-amber-400/20 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

