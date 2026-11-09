"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BedDouble, Maximize, MapPin, ArrowUpRight } from "lucide-react";

interface Project {
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

const projects: Project[] = [
  {
    id: "01",
    name: "Villa Amara",
    type: "Seafront Estate",
    location: "Paphos Coastline",
    bedrooms: 6,
    area: "780 m²",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    description: "Cantilevered cliffside residence with private saltwater cove and helipad access.",
  },
  {
    id: "02",
    name: "Hillside Haven",
    type: "Panoramic Villa",
    location: "Limassol Heights",
    bedrooms: 5,
    area: "620 m²",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    description: "Dual-level glass pavilion perched 140 meters above the Mediterranean coastline.",
  },
  {
    id: "03",
    name: "Secret Haven",
    type: "Sanctuary Villa",
    location: "Akamas Peninsula",
    bedrooms: 4,
    area: "510 m²",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    description: "Preserved natural landscape setting with zero-emission geothermal conditioning.",
  },
  {
    id: "04",
    name: "Coast Villa",
    type: "Waterfront Residence",
    location: "Coral Bay",
    bedrooms: 7,
    area: "890 m²",
    status: "Ready for Delivery",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    description: "Seven-suite private compound featuring an Olympic-length infinity reflection pool.",
  },
  {
    id: "05",
    name: "Turnkey Interiors",
    type: "Bespoke Collection",
    location: "Limassol Marina",
    bedrooms: 4,
    area: "450 m²",
    status: "Exclusive Collection",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    description: "Hand-finished Italian marble surfaces, Poliform cabinetry, and integrated acoustic architecture.",
  },
];

export default function WhatWeBuildCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollMetrics = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const progress = scrollLeft / maxScroll;
      setScrollProgress(progress);
      const calculatedIndex = Math.min(
        projects.length - 1,
        Math.max(0, Math.round(progress * (projects.length - 1)))
      );
      setActiveIndex(calculatedIndex);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollMetrics, { passive: true });
    return () => container.removeEventListener("scroll", updateScrollMetrics);
  }, []);

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const cards = scrollContainerRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeIndex - 1);
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(projects.length - 1, activeIndex + 1);
    scrollToIndex(nextIdx);
  };

  return (
    <section id="projects" className="relative z-10 w-full py-28 md:py-36 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono tracking-[0.2em] uppercase">
            <span>07 • WHAT WE DO</span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.08]">
            What we{" "}
            <span className="font-serif italic font-normal text-amber-200/90 text-glow">
              build.
            </span>
          </h2>
        </div>

        {/* Counter and Navigation Controls */}
        <div className="flex items-center gap-6">
          {/* Active / Total counter */}
          <div className="text-right">
            <span className="font-serif text-3xl md:text-4xl text-amber-300 font-normal">
              0{activeIndex + 1}
            </span>
            <span className="text-zinc-500 font-mono text-sm tracking-widest mx-1.5">/</span>
            <span className="text-zinc-400 font-mono text-sm tracking-widest">
              0{projects.length}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="p-3 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-amber-400/40 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all focus:outline-none"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === projects.length - 1}
              className="p-3 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-amber-400/40 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all focus:outline-none"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth px-6 lg:px-12 pb-8 cursor-grab active:cursor-grabbing snap-x snap-mandatory"
        style={{ scrollPaddingLeft: "24px" }}
      >
        {projects.map((project, idx) => (
          <div
            key={project.id}
            onClick={() => scrollToIndex(idx)}
            className="flex-shrink-0 w-[310px] sm:w-[380px] md:w-[440px] aspect-[3/4] snap-center rounded-3xl overflow-hidden relative group border border-white/10 hover:border-amber-400/40 transition-all duration-500 bg-slate-900/60 shadow-2xl cursor-pointer"
          >
            {/* Background Thumbnail Image */}
            <div className="absolute inset-0">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 310px, 440px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090c10] via-black/40 to-black/20" />
            </div>

            {/* Top Badge Overlay */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-zinc-200">
                {project.type}
              </span>

              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300">
                {project.status}
              </span>
            </div>

            {/* Bottom Project Details Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 z-10 flex flex-col justify-end space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-mono tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{project.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl md:text-3xl text-white font-normal group-hover:text-amber-200 transition-colors">
                  {project.name}
                </h3>
                <div className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-zinc-300 group-hover:border-amber-400 group-hover:text-amber-300 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300/80 line-clamp-2 font-light">
                {project.description}
              </p>

              {/* Specs Row */}
              <div className="pt-3 border-t border-white/15 flex items-center gap-4 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5 text-amber-400" />
                  <span>{project.bedrooms} Beds</span>
                </div>
                <div className="w-[1px] h-3 bg-white/20" />
                <div className="flex items-center gap-1.5">
                  <Maximize className="w-3.5 h-3.5 text-amber-400" />
                  <span>{project.area}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Track Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-6">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 rounded-full transition-all duration-200"
            style={{
              width: `${(1 / projects.length) * 100}%`,
              transform: `translateX(${scrollProgress * (projects.length - 1) * 100}%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

