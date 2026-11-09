import React from "react";
import ArchitecturalCanvasRenderer from "./ArchitecturalCanvasRenderer";

export default function MediaCanvasContainer() {
  return (
    <div
      id="media-canvas-container"
      className="fixed inset-0 w-full h-full -z-10 bg-[#090d14] overflow-hidden pointer-events-none select-none transition-colors duration-700"
      aria-hidden="true"
    >
      {/* 3D Wireframe Villa & Perspective Architecture Canvas */}
      <ArchitecturalCanvasRenderer />

      {/* Dark slate architectural grid pattern placeholder */}
      <div 
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Atmospheric depth gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(20,30,45,0.4)_0%,rgba(9,13,20,0.85)_100%)]" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#090d14] via-[#090d14]/80 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#090d14] via-[#090d14]/80 to-transparent" />

      {/* Subtle architectural coordinates placeholder */}
      <div className="absolute top-28 left-8 hidden md:flex items-center gap-2 text-[10px] tracking-[0.25em] font-mono text-zinc-600 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 animate-pulse" />
        <span>CYPRUS 34°40&apos;N 33°02&apos;E // 3D CANVAS PIPELINE READY</span>
      </div>
      
      <div className="absolute bottom-24 right-8 hidden md:block text-right text-[10px] tracking-[0.25em] font-mono text-zinc-600 uppercase">
        <span>ELEVATION: 140M // HORIZON VIEW</span>
      </div>
    </div>
  );
}
