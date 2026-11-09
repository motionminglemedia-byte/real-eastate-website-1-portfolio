"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { 
  Compass, 
  Layers, 
  ShieldCheck, 
  Hammer, 
  SunMedium, 
  ArrowRight,
  Sparkles,
  ArrowDown,
  CloudFog,
  Wind
} from "lucide-react";

const TOTAL_FRAMES = 160;

interface PhaseInfo {
  tag: string;
  titleRegular: string;
  titleItalic: string;
  description: string;
  meta: string[];
  align: "left" | "right" | "center";
}

const PHASES: PhaseInfo[] = [
  {
    tag: "01 • ARCHITECTURAL SCHEMATIC",
    titleRegular: "It starts",
    titleItalic: "on paper.",
    description: "Every line calculated before a single stone is placed. High-precision 3D structural blueprints engineered for seismic defiance and panoramic solar alignment.",
    meta: ["ELEVATION: 140M", "CAD MODEL: REV-04", "ORIENTATION: 34° SOUTH"],
    align: "left",
  },
  {
    tag: "02 • BEDROCK EXCAVATION",
    titleRegular: "Rooted",
    titleItalic: "in the hill.",
    description: "Deep foundation anchors poured directly into Mediterranean limestone. Engineered monolithic retaining walls built to withstand seismic force, coastal winds, and centuries of salt.",
    meta: ["DEPTH: 8.5M BEDROCK ANCHOR", "SEISMIC GRADE: CLASS A", "C40/50 CONCRETE"],
    align: "left",
  },
  {
    tag: "03 • MONOLITHIC SUPERSTRUCTURE",
    titleRegular: "Then it",
    titleItalic: "rises.",
    description: "Monolithic post-tensioned floor slabs and dramatic 18-meter cantilevers take shape. The architectural skeleton frames unobstructed horizon views of the surrounding peaks.",
    meta: ["18M CANTILEVER SLAB", "EXPANSIVE SPAN", "DUAL ATRIUM CORE"],
    align: "right",
  },
  {
    tag: "04 • ARTISANAL CRAFTSMANSHIP",
    titleRegular: "Finished",
    titleItalic: "by hand.",
    description: "Local quarried limestone, hand-brushed travertine, and thermal cedar crafted by veteran Mediterranean stonemasons. Infinity pool waters channeled into natural stone channels.",
    meta: ["HAND-CHISELLED LIMESTONE", "THERMAL CEDAR", "22M SALTWATER POOL"],
    align: "right",
  },
  {
    tag: "05 • THE FINISHED ESTATE",
    titleRegular: "Made for",
    titleItalic: "long summers.",
    description: "Floor-to-ceiling panoramic glass, heated saltwater reflection pool, and bespoke interior appointments come to life under twilight Mediterranean skies. Ready for effortless family living.",
    meta: ["TURNKEY DELIVERY", "NET ZERO A+", "PRIVATE HORIZON VISTA"],
    align: "left",
  },
];

export default function PinnedScrollSequence() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const scrollTriggerRef = useRef<any>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  // Ensure the page always starts from the top (0, 0) on load/refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Sync GSAP with Lenis smooth scrolling
  useLenis(() => {
    scrollTriggerRef.current?.update();
  });

  // 1. Preload the 80 JPG frames extracted from 11.mp4
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/frames/frame_${frameNum}.jpg`;

      img.onload = () => {
        // As soon as the first frame loads, paint it immediately
        if (i === 1) {
          drawFrame(0);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // 2. High-performance canvas drawing with object-fit: cover
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderWidth = canvasWidth;
    let renderHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - renderHeight) / 2;
    } else {
      renderWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  // 3. Canvas Responsive Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 4. GSAP ScrollTrigger Pinned Sequence (dynamically imported client-side only to prevent SSR/vendor-chunk issues)
  useEffect(() => {
    let animationId: number;
    let ctx: any;
    let isCancelled = false;

    const init = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (isCancelled) return;

      scrollTriggerRef.current = ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      if (!container) return;

      let targetFrame = 0;
      let animatedFrame = 0;

      const updateCanvasLoop = () => {
        // High-precision adaptive interpolation: silky smooth and zero sluggishness
        const delta = targetFrame - animatedFrame;
        animatedFrame += delta * 0.36;

        if (Math.abs(delta) < 0.04) {
          animatedFrame = targetFrame;
        }

        const rounded = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(animatedFrame))
        );

        if (rounded !== currentFrameRef.current) {
          currentFrameRef.current = rounded;
          drawFrame(rounded);
        }

        animationId = requestAnimationFrame(updateCanvasLoop);
      };
      animationId = requestAnimationFrame(updateCanvasLoop);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self: any) => {
            const progress = self.progress;
            setScrollProgress(progress);
            targetFrame = progress * (TOTAL_FRAMES - 1);

            // Calculate current phase index (0 to 4)
            const phase = Math.min(4, Math.floor(progress * 5));
            setActivePhaseIndex(phase);
          },
        });
      });
    };

    init();

    return () => {
      isCancelled = true;
      scrollTriggerRef.current = null;
      if (animationId) cancelAnimationFrame(animationId);
      if (ctx) ctx.revert();
    };
  }, []);

  // Calculate smooth fade-in / fade-out opacity and vertical drift for each phase
  const getPhaseStyles = (index: number) => {
    // Each phase covers 20% of scroll progress: [0-0.2], [0.2-0.4], [0.4-0.6], [0.6-0.8], [0.8-1.0]
    const phaseCenter = (index + 0.5) / 5;
    const distance = Math.abs(scrollProgress - phaseCenter);
    const maxDistance = 0.12;

    let opacity = 0;
    let translateY = 0;

    if (index === 0) {
      // Phase 0 fades in seamlessly as morning fog parts away (between 0.04 and 0.14)
      if (scrollProgress <= 0.04) {
        opacity = 0;
        translateY = 24;
      } else if (scrollProgress <= 0.13) {
        opacity = Math.min(1, (scrollProgress - 0.04) / 0.04);
        translateY = Math.max(0, (0.08 - scrollProgress) * 50);
      } else {
        opacity = Math.max(0, 1 - (scrollProgress - 0.13) / 0.07);
        translateY = -(scrollProgress - 0.13) * 120;
      }
    } else if (index === 4) {
      // Phase 4 stays visible toward end
      if (scrollProgress >= 0.82) {
        opacity = 1;
        translateY = 0;
      } else {
        opacity = Math.max(0, (scrollProgress - 0.74) / 0.08);
        translateY = (0.82 - scrollProgress) * 120;
      }
    } else {
      // Middle phases peak in center and fade smoothly
      opacity = Math.max(0, 1 - distance / maxDistance);
      translateY = (phaseCenter - scrollProgress) * 100;
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: (opacity > 0.4 ? "auto" : "none") as "auto" | "none",
      visibility: (opacity > 0.01 ? "visible" : "hidden") as "visible" | "hidden",
    };
  };

  // Fog Dissipation Physics: starts 100% dense on landing, dissipates as you scroll past 0.10
  const fogOpacity = Math.max(0, 1 - scrollProgress / 0.10);
  const fogScale = 1 + scrollProgress * 1.5;
  const fogPartLeft = -scrollProgress * 280;
  const fogPartRight = scrollProgress * 280;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "460vh" }} // 460vh provides fluid, balanced scroll travel for all 160 frames
    >
      {/* Sticky Fullscreen 3D Canvas Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden select-none">
        {/* Core Architecture: 3D Canvas Layer */}
        <div className="absolute inset-0 w-full h-full bg-[#090d14] z-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
          />
        </div>

        {/* Cinematic Atmospheric Vignettes */}
        <div className="absolute inset-0 bg-[#090c10]/20 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#090c10]/80 via-[#090c10]/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#090c10] via-[#090c10]/50 to-transparent pointer-events-none" />

        {/* =========================================================================
            VOLUMETRIC ATMOSPHERIC FOG: Deep morning mist that clears as you scroll
           ========================================================================= */}
        {fogOpacity > 0.005 && (
          <div 
            className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
            style={{
              opacity: fogOpacity,
            }}
          >
            {/* Dynamic Volumetric Blur */}
            <div 
              className="absolute inset-0 bg-[#090c10]/45" 
              style={{ backdropFilter: `blur(${fogOpacity * 16}px)` }}
            />

            {/* Left Dense Mist Bank (parts leftward as you scroll) */}
            <div 
              className="absolute inset-y-0 -left-1/3 w-full opacity-90 animate-fog-1"
              style={{
                transform: `translateX(${fogPartLeft}px) scale(${fogScale})`,
                background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(32, 44, 64, 0.92) 0%, rgba(18, 26, 40, 0.65) 55%, transparent 80%)",
              }}
            />

            {/* Right Dense Mist Bank (parts rightward as you scroll) */}
            <div 
              className="absolute inset-y-0 -right-1/3 w-full opacity-90 animate-fog-2"
              style={{
                transform: `translateX(${fogPartRight}px) scale(${fogScale})`,
                background: "radial-gradient(ellipse 75% 65% at 70% 50%, rgba(28, 40, 60, 0.92) 0%, rgba(15, 22, 36, 0.65) 55%, transparent 80%)",
              }}
            />

            {/* Sunbeam / God Ray Piercing through Mist */}
            <div 
              className="absolute -top-1/3 left-1/4 w-3/4 h-[160%] opacity-75 animate-light-pulse pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 80% 50% at 40% 30%, rgba(251, 191, 36, 0.22) 0%, rgba(245, 158, 11, 0.06) 40%, transparent 75%)",
                transform: `rotate(-12deg) scale(${fogScale})`,
              }}
            />

            {/* Creeping Ground Fog */}
            <div 
              className="absolute bottom-0 inset-x-0 h-2/3 opacity-95 animate-fog-1"
              style={{
                background: "linear-gradient(to top, rgba(9, 12, 16, 0.96) 0%, rgba(18, 26, 40, 0.8) 45%, transparent 100%)",
              }}
            />

            {/* Top Descending Cold Mountain Fog */}
            <div 
              className="absolute top-0 inset-x-0 h-1/2 opacity-90 animate-fog-2"
              style={{
                background: "linear-gradient(to bottom, rgba(9, 12, 16, 0.92) 0%, rgba(18, 26, 40, 0.65) 50%, transparent 100%)",
              }}
            />

            {/* Atmospheric Landing Presentation Cue */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none transition-transform duration-100"
              style={{
                opacity: Math.max(0, 1 - scrollProgress / 0.06),
                transform: `translateY(-${scrollProgress * 200}px)`,
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-400/30 backdrop-blur-xl text-amber-300 text-[11px] font-mono tracking-[0.25em] uppercase mb-4 shadow-2xl shadow-amber-400/10">
                <CloudFog className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>CYPRUS HIGHLANDS • 06:00 AM</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-white leading-[1.05] max-w-4xl drop-shadow-2xl">
                Shrouded in{" "}
                <span className="font-serif italic font-normal text-amber-200/90 text-glow">
                  morning mist.
                </span>
              </h1>

              <p className="mt-4 text-sm sm:text-base md:text-lg text-zinc-300/80 font-light max-w-xl leading-relaxed">
                Before the bedrock stirs, the estate lies concealed beneath Mediterranean fog.
              </p>

              <div className="mt-8 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-zinc-300 text-xs font-mono tracking-widest uppercase shadow-lg">
                <Wind className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Scroll down to part the fog & unveil the architecture</span>
                <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce ml-1" />
              </div>
            </div>
          </div>
        )}

        {/* Top Floating HUD Timeline & Phase Indicators */}
        <div className="absolute top-24 left-6 lg:left-12 right-6 lg:right-12 flex items-center justify-between pointer-events-none z-20">
          {/* Coordinates & Frame Counter */}
          <div className="flex items-center gap-2.5 text-[10px] tracking-[0.25em] font-mono text-zinc-300 uppercase bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>3D TIMELINE</span>
            <span className="text-zinc-600">•</span>
            <span className="text-amber-300 font-bold">
              FRAME {String(currentFrameRef.current + 1).padStart(2, "0")} / {TOTAL_FRAMES}
            </span>
          </div>

          {/* 5-Step Phase Milestone Pills */}
          <div className="hidden md:flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {PHASES.map((p, idx) => {
              const isActive = idx === activePhaseIndex;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                      : "text-zinc-500 hover:text-zinc-400"
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${isActive ? "bg-amber-400" : "bg-zinc-600"}`} />
                  <span>PHASE 0{idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            CINEMATIC NARRATIVE PHASES: Defining the house as you slowly scroll
           ========================================================================= */}
        {PHASES.map((phase, idx) => {
          const styles = getPhaseStyles(idx);
          const isRight = phase.align === "right";

          return (
            <div
              key={idx}
              className={`absolute inset-0 flex items-center px-6 lg:px-16 max-w-7xl mx-auto z-10 transition-opacity duration-300 ${
                isRight ? "justify-end text-right" : "justify-start text-left"
              }`}
              style={styles}
            >
              <div className={`max-w-xl space-y-6 ${isRight ? "flex flex-col items-end" : ""}`}>
                {/* Phase Tag Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono tracking-[0.2em] uppercase">
                  {idx === 0 && <Compass className="w-3.5 h-3.5 text-amber-300" />}
                  {idx === 1 && <Layers className="w-3.5 h-3.5 text-amber-300" />}
                  {idx === 2 && <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />}
                  {idx === 3 && <Hammer className="w-3.5 h-3.5 text-amber-300" />}
                  {idx === 4 && <SunMedium className="w-3.5 h-3.5 text-amber-300" />}
                  <span>{phase.tag}</span>
                </div>

                {/* Main Headline with Serif + Italic Signature */}
                <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-white leading-[1.05]">
                  {phase.titleRegular}{" "}
                  <span className="font-serif italic font-normal text-amber-200/90 text-glow">
                    {phase.titleItalic}
                  </span>
                </h2>

                {/* Defined Narrative Description */}
                <p className="text-base sm:text-lg md:text-xl text-zinc-300/90 font-light leading-relaxed">
                  {phase.description}
                </p>

                {/* Technical Specifications Pills */}
                <div className={`flex flex-wrap gap-2.5 pt-2 text-xs font-mono text-zinc-400 ${isRight ? "justify-end" : ""}`}>
                  {phase.meta.map((item, mIdx) => (
                    <span
                      key={mIdx}
                      className="px-3 py-1 rounded-full bg-black/50 border border-white/10 text-zinc-300 backdrop-blur-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Final Phase CTA prompting the user into the rest of the site */}
                {idx === 4 && (
                  <div className="pt-4 flex items-center gap-4">
                    <a
                      href="#projects"
                      className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-400 text-black hover:bg-amber-300 transition-all duration-300 shadow-xl shadow-amber-400/25"
                    >
                      <span>Explore Portfolio</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                      <span>Scroll to unveil full estate</span>
                      <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
