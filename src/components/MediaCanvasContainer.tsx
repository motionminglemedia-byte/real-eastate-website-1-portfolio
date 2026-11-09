import React from "react";
import dynamic from "next/dynamic";

// Dynamically import client-only video scrubber to avoid SSR issues
const VideoScrollScrubber = dynamic(() => import("./VideoScrollScrubber"), {
  ssr: false,
});

export default function MediaCanvasContainer() {
  return (
    <div
      id="media-canvas-container"
      className="fixed inset-0 w-full h-full z-0 bg-[#090d14] overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* 
        Scroll-tied background video:
        Fixed to viewport, covers entire screen (object-cover), 
        sits behind all UI text with GSAP ScrollTrigger scrubbing
      */}
      <VideoScrollScrubber />

      {/* Subtle blueprint grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Subtle atmospheric gradients for header and footer transitions */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#090c10]/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#090c10]/80 to-transparent pointer-events-none" />

      {/* Subtle architectural coordinates HUD */}
      <div className="absolute top-28 left-8 hidden md:flex items-center gap-2 text-[10px] tracking-[0.25em] font-mono text-zinc-400 uppercase pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span>CYPRUS 34°40&apos;N 33°02&apos;E // 3D TIMELINE ACTIVE</span>
      </div>
      
      <div className="absolute bottom-24 right-8 hidden md:block text-right text-[10px] tracking-[0.25em] font-mono text-zinc-400 uppercase pointer-events-none">
        <span>ELEVATION: 140M // HORIZON VIEW</span>
      </div>
    </div>
  );
}
