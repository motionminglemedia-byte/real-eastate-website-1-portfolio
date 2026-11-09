"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, BedDouble, Maximize, MapPin, ShieldCheck, Sun, Compass, ArrowUpRight } from "lucide-react";

export interface ProjectDetail {
  id: string;
  name: string;
  type: string;
  location: string;
  bedrooms: number;
  area: string;
  status: string;
  image: string;
  description: string;
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#0c1017] border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 hover:bg-white/20 border border-white/15 text-zinc-300 hover:text-white transition-all focus:outline-none"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Banner */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-slate-900">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-[#0c1017]/40 to-transparent" />

          {/* Badges Overlay */}
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-zinc-200">
              {project.type}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300">
              {project.status}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{project.location}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal">
                {project.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 md:p-10 space-y-8">
          {/* Overview */}
          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            {project.description} Custom-calibrated for Mediterranean micro-climates with high-thermal limestone massing, solar shading cantilevers, and floor-to-ceiling acoustic glass framing infinite sea panoramas.
          </p>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1 flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-amber-400" />
                <span>Bedrooms</span>
              </div>
              <div className="font-serif text-2xl text-white font-medium">{project.bedrooms} Suites</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1 flex items-center gap-1.5">
                <Maximize className="w-3.5 h-3.5 text-amber-400" />
                <span>Living Area</span>
              </div>
              <div className="font-serif text-2xl text-white font-medium">{project.area}</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Energy Rating</span>
              </div>
              <div className="font-serif text-2xl text-amber-300 font-medium">A+ Net Zero</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Warranty</span>
              </div>
              <div className="font-serif text-2xl text-white font-medium">12 Years</div>
            </div>
          </div>

          {/* Architectural Inclusions */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
              ARCHITECTURAL HIGHLIGHTS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="text-amber-400">✦</span>
                <span>22m Heated saltwater infinity pool with sunken lounge</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">✦</span>
                <span>Automated Reynaers triple-glazed slimline facade</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">✦</span>
                <span>Hand-finished Cypriot quarried limestone walls</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">✦</span>
                <span>Sub-zero & Gaggenau integrated kitchen atelier</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-zinc-400">
              REF: PHEME-{project.id} // PRIVATE PORTFOLIO
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-white border border-white/15 hover:border-white/30 transition-colors"
              >
                Close
              </button>
              <a
                href={`mailto:consultation@pheme-estate.com?subject=Inquiry for ${encodeURIComponent(project.name)} (Ref: PHEME-${project.id})`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-black hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
              >
                <span>Inquire About Estate</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
