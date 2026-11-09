"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";
import { 
  Compass, 
  Layers, 
  ShieldCheck, 
  Hammer, 
  SunMedium, 
  ArrowRight,
  Sparkles 
} from "lucide-react";

const TOTAL_FRAMES = 50;

export default function PinnedScrollSequence() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Sync GSAP with Lenis smooth scrolling
  useLenis(() => {
    ScrollTrigger.update();
  });

  // 1. Preload the 50 PNG frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameNum}.png`;

      img.onload = () => {
        loadedCount++;
        // As soon as the first frame loads, paint it immediately
        if (i === 1) {
          drawFrame(0);
        }
        if (loadedCount >= TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // 2. Draw frame with high-performance object-fit: cover math
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate object-fit: cover
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

  // 3. Handle Canvas Resizing
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

  // 4. GSAP ScrollTrigger Pinned Sequence
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    let targetFrame = 0;
    let animatedFrame = 0;
    let animationId: number;

    const updateCanvasLoop = () => {
      // Smooth interpolation between frames for 60fps cinema feel
      animatedFrame += (targetFrame - animatedFrame) * 0.25;
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

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          targetFrame = progress * (TOTAL_FRAMES - 1);
        },
      });
    });

    return () => {
      cancelAnimationFrame(animationId);
      ctx.revert();
    };
  }, []);

  // Helper opacity calculators for smooth fading between the 5 story beats
  // Beat 1: 0.00 - 0.20 (Center)
  const beat1Opacity = Math.max(0, Math.min(1, (0.16 - scrollProgress) / 0.10));
  // Beat 2: 0.20 - 0.40 (Left)
  const beat2Opacity = Math.max(0, 1 - Math.abs(scrollProgress - 0.28) / 0.10);
  // Beat 3: 0.40 - 0.60 (Right)
  const beat3Opacity = Math.max(0, 1 - Math.abs(scrollProgress - 0.48) / 0.10);
  // Beat 4: 0.60 - 0.80 (Right)
  const beat4Opacity = Math.max(0, 1 - Math.abs(scrollProgress - 0.68) / 0.10);
  // Beat 5: 0.80 - 1.00 (Left)
  const beat5Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.80) / 0.10));

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "480vh" }} // 480vh provides generous, tactile scroll travel for 50 frames
    >
      {/* Sticky Fullscreen 3D Canvas Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden select-none">
        {/* Core Architecture Requirement 1: Canvas Container */}
        <div id="media-canvas-container" className="absolute inset-0 w-full h-full bg-[#090d14] -z-10">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
          />
        </div>

        {/* Cinematic Atmospheric Vignettes */}
        <div className="absolute inset-0 bg-[#090c10]/20 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#090c10]/80 via-[#090c10]/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#090c10] via-[#090c10]/50 to-transparent pointer-events-none" />

        {/* Frame / HUD Coordinate Indicator */}
        <div className="absolute top-28 left-8 hidden md:flex items-center gap-2 text-[10px] tracking-[0.25em] font-mono text-zinc-400 uppercase pointer-events-none z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>CYPRUS 34°40&apos;N 33°02&apos;E // 3D SCROLL SEQUENCE</span>
          <span className="text-zinc-600">•</span>
          <span className="text-amber-300 font-bold">
            FRAME {String(currentFrameRef.current + 1).padStart(2, "0")} / {TOTAL_FRAMES}
          </span>
        </div>

        {/* =========================================================================
            STORY TEXT OVERLAYS: Transformed smoothly in response to the 3D frames
           ========================================================================= */}

        {/* BEAT 1: "It starts on paper." (Progress 0.0 - 0.20) */}
        <div 
          className="absolute inset-0 flex items-center justify-between px-6 lg:px-16 max-w-7xl mx-auto z-10 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: beat1Opacity }}
        >
          <div className="max-w-xl space-y-6 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono tracking-[0.2em] uppercase">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>01 • THE PLAN</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-white leading-[1.05]">
              It starts{" "}
              <span className="font-serif italic font-normal text-amber-200/90 text-glow">
                on paper.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-zinc-300/90 font-light leading-relaxed">
              Every Pheme house starts with a blueprint... and ends with a masterpiece.
              Built before a single stone is laid.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-amber-300/80 tracking-widest pt-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>SCROLL TO BUILD YOUR ESTATE ↓</span>
            </div>
          </div>
        </div>

        {/* BEAT 2: "Rooted in the hill." (Progress 0.20 - 0.40) */}
        <div 
          className="absolute inset-0 flex items-center px-6 lg:px-16 max-w-7xl mx-auto z-10 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: beat2Opacity }}
        >
          <div className="max-w-xl space-y-6 pointer-events-auto">
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

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="px-3 py-1 rounded bg-black/40 border border-white/10">DEPTH: 8.5M BEDROCK ANCHOR</span>
              <span className="px-3 py-1 rounded bg-black/40 border border-white/10">SEISMIC GRADE A</span>
            </div>
          </div>
        </div>

        {/* BEAT 3: "Then it rises." (Progress 0.40 - 0.60) - Right Aligned */}
        <div 
          className="absolute inset-0 flex items-center justify-end px-6 lg:px-16 max-w-7xl mx-auto z-10 transition-opacity duration-300 pointer-events-none text-right"
          style={{ opacity: beat3Opacity }}
        >
          <div className="max-w-xl space-y-6 pointer-events-auto flex flex-col items-end">
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

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="px-3 py-1 rounded bg-black/40 border border-white/10">POST-TENSIONED SLABS</span>
              <span className="px-3 py-1 rounded bg-black/40 border border-white/10">18M CANTILEVER</span>
            </div>
          </div>
        </div>

        {/* BEAT 4: "Finished by hand." (Progress 0.60 - 0.80) - Right Aligned */}
        <div 
          className="absolute inset-0 flex items-center justify-end px-6 lg:px-16 max-w-7xl mx-auto z-10 transition-opacity duration-300 pointer-events-none text-right"
          style={{ opacity: beat4Opacity }}
        >
          <div className="max-w-xl space-y-6 pointer-events-auto flex flex-col items-end">
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

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="px-3 py-1 rounded bg-black/40 border border-white/10">CYPRIOT QUARRIED STONE</span>
              <span className="px-3 py-1 rounded bg-black/40 border border-white/10">BRUSHED AGED BRASS</span>
            </div>
          </div>
        </div>

        {/* BEAT 5: "Made for long summers." (Progress 0.80 - 1.00) - Left Aligned */}
        <div 
          className="absolute inset-0 flex items-center px-6 lg:px-16 max-w-7xl mx-auto z-10 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: beat5Opacity }}
        >
          <div className="max-w-xl space-y-6 pointer-events-auto">
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

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-400 text-black hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-amber-400/20"
              >
                <span>Explore the Estate</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-xs font-mono text-zinc-400">
                SCROLL DOWN TO UNVEIL PORTFOLIO ↓
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
