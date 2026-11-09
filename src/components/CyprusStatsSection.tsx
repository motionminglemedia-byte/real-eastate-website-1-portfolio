import React from "react";
import { Award, Building2, Calendar, ShieldCheck } from "lucide-react";

export default function CyprusStatsSection() {
  const stats = [
    {
      value: "407",
      label: "Homes delivered",
      description: "Across Limassol, Paphos, and the Akamas coast.",
      icon: Building2,
    },
    {
      value: "30",
      label: "Years building",
      description: "Continuous family architectural stewardship since 1996.",
      icon: Calendar,
    },
    {
      value: "95%",
      label: "Delivered on schedule",
      description: "Industry-leading milestone adherence and execution.",
      icon: Award,
    },
    {
      value: "12",
      label: "Year structural warranty",
      description: "Comprehensive structural integrity backing.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about" className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-28 md:py-36">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Heading & Narrative */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono tracking-[0.2em] uppercase">
            <span>08 • PROVEN HERITAGE</span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.08]">
            Building Cyprus{" "}
            <span className="font-serif italic font-normal text-amber-200/90 text-glow">
              since 1996.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300/90 font-light leading-relaxed">
            Three generations of builders, one vision: homes that outlast trends and weather.
          </p>

          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            We operate at the intersection of classical Mediterranean stonecraft and cutting-edge structural engineering. Every residence is built for micro-climates, sea winds, and generations of effortless family living.
          </p>

          <div className="pt-4 flex items-center gap-6 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>LICENSED CLASS A CONTRACTOR</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>EU REGULATORY COMPLIANT</span>
            </div>
          </div>
        </div>

        {/* Right Column: 2x2 Grid of Stat Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-amber-400/40 backdrop-blur-md p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-5xl sm:text-6xl font-normal text-white group-hover:text-amber-200 transition-colors">
                    {stat.value}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-serif italic text-xl text-zinc-100 font-normal mb-2">
                  {stat.label}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {stat.description}
                </p>

                {/* Subtle bottom glow line */}
                <div className="absolute bottom-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent group-hover:via-amber-400/60 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

